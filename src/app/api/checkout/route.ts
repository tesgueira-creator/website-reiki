import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripePriceMap } from "@/lib/stripe-prices";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-12-15.clover",
});

export async function POST(req: NextRequest) {
    try {
        const { serviceId, serviceName, price, duration } = await req.json();

        // Validação
        if (!serviceName || !price) {
            return NextResponse.json(
                { error: "Dados do serviço incompletos" },
                { status: 400 }
            );
        }

        // Determine price by price id mapping (preferred) or fallback to inline price_data
        const slug = serviceId || undefined;
        const mappedPriceId = slug ? stripePriceMap[slug] : undefined;

        const line_items = mappedPriceId
            ? [{ price: mappedPriceId, quantity: 1 }]
            : [{
                price_data: {
                    currency: "eur",
                    product_data: {
                        name: serviceName,
                        description: `Sessão de ${duration || "60 min"}`,
                        images: [
                            `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/og-image.jpg`,
                        ],
                    },
                    unit_amount: Math.round(price * 100), // Converter para centavos
                },
                quantity: 1,
            }];

        // Criar sessão de checkout do Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/pagamento/sucesso?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/pagamento/cancelado`,
            metadata: {
                serviceId: serviceId || "",
                serviceName,
                duration: duration || "",
            },
            billing_address_collection: "required",
            phone_number_collection: {
                enabled: true,
            },
            customer_email: undefined, // Cliente preenche no checkout
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (error: any) {
        console.error("Erro ao criar sessão Stripe:", error);
        return NextResponse.json(
            { error: error.message || "Erro ao processar pagamento" },
            { status: 500 }
        );
    }
}
