import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  type: 'document',
  title: 'Depoimento / Testemunha',
  description: 'Depoimentos de clientes sobre as terapias',
  fields: [
    defineField({
      name: 'clientName',
      type: 'string',
      title: 'Nome do Cliente',
      description: 'Nome completo do cliente que deixa o depoimento',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'clientPhoto',
      type: 'image',
      title: 'Foto do Cliente',
      description: 'Foto opcional do cliente (será exibida como avatar)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo',
          description: 'Descrição da imagem para acessibilidade',
        },
      ],
    }),
    defineField({
      name: 'testimonialText',
      type: 'text',
      title: 'Texto do Depoimento',
      description: 'O que o cliente tem a dizer sobre a experiência',
      rows: 5,
      validation: (Rule) => Rule.required().min(50).max(500),
    }),
    defineField({
      name: 'rating',
      type: 'number',
      title: 'Avaliação',
      description: 'Classificação de 1 a 5 estrelas',
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(1)
          .max(5)
          .error('A classificação deve ser entre 1 e 5'),
      initialValue: 5,
    }),
    defineField({
      name: 'serviceName',
      type: 'string',
      title: 'Nome do Serviço',
      description: 'Qual terapia/serviço o cliente experimentou',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'serviceReference',
      type: 'reference',
      title: 'Referência ao Serviço',
      description: 'Link para o serviço relacionado (opcional)',
      to: [{ type: 'service' }],
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Localização',
      description: 'Cidade/região do cliente (ex: Lisboa, Porto)',
    }),
    defineField({
      name: 'date',
      type: 'date',
      title: 'Data do Depoimento',
      description: 'Quando o depoimento foi recebido',
      validation: (Rule) => Rule.required(),
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Destacar na Homepage',
      description: 'Exibir este depoimento na seção principal da página inicial',
      initialValue: false,
    }),
    defineField({
      name: 'verified',
      type: 'boolean',
      title: 'Verificado',
      description: 'Marca se o depoimento foi verificado como autêntico',
      initialValue: true,
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Data de Publicação',
      description: 'Quando o depoimento foi publicado no site',
    }),
  ],
  preview: {
    select: {
      title: 'clientName',
      rating: 'rating',
      service: 'serviceName',
      media: 'clientPhoto',
    },
    prepare({ title, rating, service, media }) {
      const stars = '★'.repeat(rating || 0) + '☆'.repeat(5 - (rating || 0))
      return {
        title,
        subtitle: `${stars} • ${service || 'Sem serviço'}`,
        media,
      }
    },
  },
})
