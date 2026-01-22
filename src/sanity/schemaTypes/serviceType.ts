import { defineField, defineType } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  type: 'document',
  title: 'Serviço / Terapia',
  description: 'Defina os serviços e terapias oferecidas pela Rafaella Kally',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Título do Serviço',
      description: 'Nome da terapia ou serviço (ex: Reiki Kundalini, Leitura de Aura)',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'URL Slug',
      description: 'Identificador único para URL (auto-gerado a partir do título)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      type: 'text',
      title: 'Descrição Curta',
      description: 'Breve descrição para cards e listagens (max 160 caracteres)',
      rows: 3,
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'fullDescription',
      type: 'array',
      title: 'Descrição Completa',
      description: 'Descrição detalhada com rich text (blocos, parágrafos, listas)',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Padrão', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Negrito', value: 'strong' },
              { title: 'Itálico', value: 'em' },
              { title: 'Sublinhado', value: 'underline' },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Categoria',
      description: 'Tipo de terapia para filtros (ex: energética, espiritual, física)',
      options: {
        list: [
          { title: 'Reiki & Energia', value: 'reiki' },
          { title: 'Leituras Espirituais', value: 'leituras' },
          { title: 'Terapias Holísticas', value: 'holisticas' },
          { title: 'Massagens & Corpo', value: 'corpo' },
          { title: 'Workshops & Cursos', value: 'formacao' },
          { title: 'Pacotes & Programas', value: 'pacotes' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      type: 'number',
      title: 'Duração (minutos)',
      description: 'Tempo estimado da sessão em minutos',
      validation: (Rule) => Rule.integer().min(15).max(300),
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Preço (€)',
      description: 'Valor do serviço em euros',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'priceNote',
      type: 'string',
      title: 'Nota sobre Preço',
      description: 'Informação adicional (ex: "Pacote 3 sessões: €120")',
    }),
    defineField({
      name: 'benefits',
      type: 'array',
      title: 'Benefícios',
      description: 'Lista de benefícios ou resultados esperados',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.min(1).max(8),
    }),
    defineField({
      name: 'whatToExpect',
      type: 'array',
      title: 'O Que Esperar',
      description: 'Passos ou etapas da sessão',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'step', type: 'string', title: 'Passo' },
            { name: 'description', type: 'text', title: 'Descrição', rows: 2 },
          ],
        },
      ],
    }),
    defineField({
      name: 'featuredImage',
      type: 'image',
      title: 'Imagem Principal',
      description: 'Imagem de destaque para o serviço (cards e páginas)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo',
          description: 'Descrição da imagem para acessibilidade',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Galeria de Imagens',
      description: 'Fotos adicionais do serviço/sessão',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto Alternativo',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Legenda',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Destacar na Homepage',
      description: 'Exibir este serviço na seção de destaques da página inicial',
      initialValue: false,
    }),
    defineField({
      name: 'availableOnline',
      type: 'boolean',
      title: 'Disponível Online',
      description: 'Indica se o serviço pode ser realizado à distância',
      initialValue: false,
    }),
    defineField({
      name: 'orderRank',
      type: 'number',
      title: 'Ordem de Exibição',
      description: 'Número para ordenar (menor = aparece primeiro)',
      initialValue: 999,
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: 'seo',
      type: 'object',
      title: 'SEO Meta Tags',
      description: 'Metadados para otimização de buscadores',
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          rows: 2,
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'keywords',
          type: 'array',
          title: 'Keywords',
          of: [{ type: 'string' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      price: 'price',
      media: 'featuredImage',
    },
    prepare({ title, category, price, media }) {
      return {
        title,
        subtitle: `${category || 'Sem categoria'} ${price ? `• €${price}` : ''}`,
        media,
      }
    },
  },
})
