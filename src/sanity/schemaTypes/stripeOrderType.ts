import { defineField, defineType } from 'sanity'

export const stripeOrderType = defineType({
    name: 'stripeOrder',
    type: 'document',
    title: 'Stripe Order',
    description: 'Registo de Sessões criadas/confirmadas via Stripe (gerado pelo webhook)',
    fields: [
        defineField({
            name: 'sessionId',
            type: 'string',
            title: 'Stripe Checkout Session ID',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'amount_total',
            type: 'number',
            title: 'Montante (cêntimos)',
            description: 'Valor total recebido (em cêntimos)',
            validation: (Rule) => Rule.integer().min(0),
        }),
        defineField({
            name: 'currency',
            type: 'string',
            title: 'Currency',
            initialValue: 'eur',
        }),
        defineField({
            name: 'payment_status',
            type: 'string',
            title: 'Payment Status',
            options: {
                list: [
                    { title: 'paid', value: 'paid' },
                    { title: 'unpaid', value: 'unpaid' },
                    { title: 'no_payment_required', value: 'no_payment_required' },
                    { title: 'failed', value: 'failed' },
                    { title: 'pending', value: 'pending' },
                ],
            },
        }),
        defineField({
            name: 'customer_email',
            type: 'string',
            title: 'Customer Email',
            validation: (Rule) => Rule.email(),
        }),
        defineField({
            name: 'metadata',
            type: 'object',
            title: 'Metadata',
            description: 'Metadados associados (ex: serviceId, serviceName, duration)',
            fields: [
                { name: 'serviceId', type: 'string', title: 'Service ID / Slug' },
                { name: 'serviceName', type: 'string', title: 'Service Name' },
                { name: 'duration', type: 'string', title: 'Duration' },
                { name: 'raw', type: 'text', title: 'Raw metadata (JSON string)', rows: 4 },
            ],
        }),
        defineField({
            name: 'receivedAt',
            type: 'datetime',
            title: 'Received At',
            description: 'Timestamp when webhook was processed',
        }),
        defineField({
            name: 'rawEvent',
            type: 'object',
            title: 'Raw Event',
            description: 'Raw Stripe event object (useful for debugging)',
            fields: [{ name: 'payload', type: 'text', title: 'Payload (stringified)' }],
        }),
    ],
    preview: {
        select: {
            title: 'sessionId',
            subtitle: 'customer_email',
            amount: 'amount_total',
        },
        prepare(selection) {
            const { title, subtitle, amount } = selection
            return {
                title: title || 'Stripe Session',
                subtitle: subtitle ? `${subtitle} — ${amount ? `${amount / 100} ${'EUR'}` : ''}` : `${amount ? `${amount / 100} EUR` : ''}`,
            }
        },
    },
})
