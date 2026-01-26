import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from 'next-sanity';
import { Resend } from 'resend';
import { google } from 'googleapis';
import crypto from 'crypto';

// Use Node runtime for stripe signature verification
export const runtime = 'nodejs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-12-15.clover',
});

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function addMinutes(time: string, minutesToAdd: number) {
    const [h, m] = time.split(':').map(Number);
    const total = h * 60 + m + minutesToAdd;
    const hh = Math.floor(total / 60) % 24;
    const mm = total % 60;
    return `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}`;
}

async function createGoogleCalendarEvent(options: {
    date: string;
    startTime: string;
    endTime: string;
    summary: string;
    description?: string;
    attendeeEmail?: string;
}) {
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, '\n');

    if (!calendarId || !clientEmail || !privateKey) {
        console.warn('Google Calendar não configurado (variáveis em falta)');
        return null;
    }

    const jwt = new google.auth.JWT({
        email: clientEmail,
        key: privateKey,
        scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth: jwt });

    const startDateTime = `${options.date}T${options.startTime}:00Z`;
    const endDateTime = `${options.date}T${options.endTime}:00Z`;

    const event = await calendar.events.insert({
        calendarId,
        requestBody: {
            summary: options.summary,
            description: options.description,
            start: { dateTime: startDateTime, timeZone: 'Europe/Lisbon' },
            end: { dateTime: endDateTime, timeZone: 'Europe/Lisbon' },
            attendees: options.attendeeEmail
                ? [{ email: options.attendeeEmail }]
                : undefined,
        },
    });

    return event.data.id || null;
}

export async function POST(req: NextRequest) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    // Read raw body for signature verification
    const buf = await req.arrayBuffer();
    const body = Buffer.from(buf);
    const sig = req.headers.get('stripe-signature') || '';

    try {
        let event: Stripe.Event;
        if (webhookSecret) {
            event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
        } else {
            // No webhook secret configured — try parsing without verification (less safe)
            event = JSON.parse(body.toString());
        }

        // Handle the event types we care about
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;

                // Optionally write an order record in Sanity if write token is available
                const sanityToken = process.env.SANITY_WRITE_TOKEN;
                if (sanityToken) {
                    const client = createClient({
                        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
                        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
                        apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-01-22',
                        token: sanityToken,
                        useCdn: false,
                    });

                    try {
                        // Avoid duplicate orders on webhook retry by using a stable _id
                        await client.createIfNotExists({
                            _id: `stripeOrder_${session.id}`,
                            _type: 'stripeOrder',
                            sessionId: session.id,
                            amount_total: (session.amount_total ?? 0),
                            currency: session.currency,
                            payment_status: session.payment_status,
                            customer_email: session.customer_email || null,
                            metadata: session.metadata || {},
                            receivedAt: new Date().toISOString(),
                            rawEvent: { payload: JSON.stringify(event) },
                        });

                        // Criar agendamento associado ao pagamento
                        const metadata = session.metadata || {};
                        const slotDate = metadata.slotDate;
                        const slotTime = metadata.slotTime;

                        if (slotDate && slotTime) {
                            const appointmentId = `appointment_${session.id}`;

                            // Evitar overbooking: não cria se já existir agendamento ativo para o slot
                            const existingSlot = await client.fetch(
                                `*[_type == "appointment" && status != "canceled" && date == $date && startTime == $time][0]{_id}`,
                                { date: slotDate, time: slotTime },
                            );

                            if (!existingSlot?._id) {
                                const cancelToken = crypto.randomUUID();

                                const endTime = addMinutes(slotTime, Number(metadata.duration || 90));

                                await client.createIfNotExists({
                                    _id: appointmentId,
                                    _type: 'appointment',
                                    status: 'booked',
                                    date: slotDate,
                                    startTime: slotTime,
                                    endTime,
                                    durationMinutes: Number(metadata.duration || 90),
                                    serviceName: metadata.serviceName || metadata.serviceId || 'Serviço',
                                    serviceId: metadata.serviceId || '',
                                    customerName: metadata.customerName || session.customer_details?.name || '',
                                    customerEmail: metadata.customerEmail || session.customer_details?.email || session.customer_email || '',
                                    customerPhone: metadata.customerPhone || session.customer_details?.phone || '',
                                    mode: metadata.sessionType || 'presencial',
                                    notes: metadata.notes || '',
                                    stripeSessionId: session.id,
                                    stripePaymentStatus: session.payment_status,
                                    cancelToken,
                                });

                                try {
                                    const calendarEventId = await createGoogleCalendarEvent({
                                        date: slotDate,
                                        startTime: slotTime,
                                        endTime,
                                        summary: metadata.serviceName || 'Sessão',
                                        description: metadata.notes,
                                        attendeeEmail: metadata.customerEmail || (session.customer_email as string | undefined),
                                    });

                                    if (calendarEventId) {
                                        await client.patch(appointmentId).set({ calendarEventId }).commit();
                                    }
                                } catch (calendarErr) {
                                    console.error('Erro ao criar evento no Google Calendar:', calendarErr);
                                }

                                // Enviar emails via Resend (se configurado)
                                if (resend && (metadata.customerEmail || session.customer_email)) {
                                    try {
                                        await resend.emails.send({
                                            from: process.env.RESEND_FROM || 'Reiki <agendamentos@reiki.com>',
                                            to: metadata.customerEmail || (session.customer_email as string),
                                            subject: 'Agendamento confirmado',
                                            text: `A sua sessão está confirmada para ${slotDate} às ${slotTime}. Caso precise cancelar: ${(process.env.NEXT_PUBLIC_SITE_URL || 'https://site.local').replace(/\/$/, '')}/cancelar?token=${cancelToken}`,
                                        });
                                    } catch (emailErr) {
                                        console.error('Falha ao enviar email Resend:', emailErr);
                                    }
                                }
                            } else {
                                console.warn('Slot já ocupado, não foi criado agendamento');
                            }
                        } else {
                            console.warn('Sessão Stripe sem slotDate/slotTime na metadata');
                        }
                    } catch (err: unknown) {
                        console.error('Error writing order to Sanity:', err);
                    }
                } else {
                    console.log('Webhook received, no SANITY_WRITE_TOKEN set — event:', event.type);
                }

                break;
            }

            default:
                // Unexpected event type
                console.log(`Unhandled event type ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error('Webhook error:', msg);
        return NextResponse.json({ error: 'Invalid webhook' }, { status: 400 });
    }
}
