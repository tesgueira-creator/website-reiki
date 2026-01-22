import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from 'next-sanity';

// Use Node runtime for stripe signature verification
export const runtime = 'nodejs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

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
            await client.create({
              _type: 'stripeOrder',
              sessionId: session.id,
              amount_total: (session.amount_total ?? 0),
              currency: session.currency,
              payment_status: session.payment_status,
              customer_email: session.customer_email || null,
              metadata: session.metadata || {},
            });
          } catch (err) {
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
  } catch (err: any) {
    console.error('Webhook error:', err.message || err);
    return NextResponse.json({ error: 'Invalid webhook' }, { status: 400 });
  }
}
