import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { google } from 'googleapis'
import { Resend } from 'resend'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
    const token = process.env.SANITY_WRITE_TOKEN
    if (!token) {
        return NextResponse.json({ error: 'SANITY_WRITE_TOKEN em falta' }, { status: 500 })
    }

    const { appointmentId, cancelToken } = await req.json()

    if (!appointmentId && !cancelToken) {
        return NextResponse.json({ error: 'appointmentId ou cancelToken obrigatório' }, { status: 400 })
    }

    const client = createClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
        apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-01-22',
        token,
        useCdn: false,
    })

    try {
        let idToCancel = appointmentId as string | undefined

        if (!idToCancel && cancelToken) {
            const found = await client.fetch(
                `*[_type == "appointment" && cancelToken == $token][0]{_id}`,
                { token: cancelToken },
            )
            idToCancel = found?._id
        }

        if (!idToCancel) {
            return NextResponse.json({ error: 'Agendamento não encontrado' }, { status: 404 })
        }

        const appointment = await client.fetch(
            `*[_type == "appointment" && _id == $id][0]{customerEmail, calendarEventId, date, startTime, serviceName}`,
            { id: idToCancel },
        )

        await client.patch(idToCancel).set({ status: 'canceled' }).commit()

        if (appointment?.calendarEventId) {
            try {
                const calendarId = process.env.GOOGLE_CALENDAR_ID
                const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
                const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, '\n')

                if (calendarId && clientEmail && privateKey) {
                    const jwt = new google.auth.JWT({ email: clientEmail, key: privateKey, scopes: ['https://www.googleapis.com/auth/calendar'] })
                    const calendar = google.calendar({ version: 'v3', auth: jwt })
                    await calendar.events.delete({ calendarId, eventId: appointment.calendarEventId })
                }
            } catch (calendarErr) {
                console.error('Erro ao remover evento do Google Calendar:', calendarErr)
            }
        }

        if (appointment?.customerEmail && process.env.RESEND_API_KEY) {
            try {
                const resend = new Resend(process.env.RESEND_API_KEY)
                await resend.emails.send({
                    from: process.env.RESEND_FROM || 'Reiki <agendamentos@reiki.com>',
                    to: appointment.customerEmail,
                    subject: 'Agendamento cancelado',
                    text: `O seu agendamento para ${appointment.date} às ${appointment.startTime} foi cancelado.`,
                })
            } catch (emailErr) {
                console.error('Erro ao enviar email de cancelamento:', emailErr)
            }
        }

        return NextResponse.json({ ok: true })
    } catch (err: unknown) {
        console.error('Erro ao cancelar agendamento:', err)
        return NextResponse.json({ error: 'Falha ao cancelar' }, { status: 500 })
    }
}