import { defineField, defineType } from 'sanity'

export const appointmentType = defineType({
    name: 'appointment',
    title: 'Agendamento',
    type: 'document',
    fields: [
        defineField({
            name: 'status',
            title: 'Estado',
            type: 'string',
            options: {
                list: [
                    { title: 'Reservado', value: 'booked' },
                    { title: 'Cancelado', value: 'canceled' },
                ],
                layout: 'radio',
            },
            initialValue: 'booked',
        }),
        defineField({
            name: 'date',
            title: 'Data',
            type: 'date',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'startTime',
            title: 'Hora de início',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'endTime',
            title: 'Hora de fim',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'durationMinutes',
            title: 'Duração (minutos)',
            type: 'number',
            initialValue: 90,
        }),
        defineField({
            name: 'serviceName',
            title: 'Serviço',
            type: 'string',
        }),
        defineField({
            name: 'serviceId',
            title: 'Service ID/slug',
            type: 'string',
        }),
        defineField({
            name: 'customerName',
            title: 'Cliente',
            type: 'string',
        }),
        defineField({
            name: 'customerEmail',
            title: 'Email',
            type: 'string',
        }),
        defineField({
            name: 'customerPhone',
            title: 'Telefone',
            type: 'string',
        }),
        defineField({
            name: 'mode',
            title: 'Modalidade',
            type: 'string',
            options: {
                list: [
                    { title: 'Presencial', value: 'presencial' },
                    { title: 'Online', value: 'online' },
                ],
            },
        }),
        defineField({
            name: 'notes',
            title: 'Notas',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'stripeSessionId',
            title: 'Stripe Session ID',
            type: 'string',
        }),
        defineField({
            name: 'stripePaymentStatus',
            title: 'Pagamento Stripe',
            type: 'string',
        }),
        defineField({
            name: 'calendarEventId',
            title: 'Google Calendar Event ID',
            type: 'string',
        }),
        defineField({
            name: 'cancelToken',
            title: 'Token de cancelamento',
            type: 'string',
        }),
        defineField({
            name: 'createdAt',
            title: 'Criado em',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            title: 'serviceName',
            subtitle: 'date',
        },
    },
})