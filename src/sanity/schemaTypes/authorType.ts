import { UserIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Perfil da Terapeuta',
  type: 'document',
  icon: UserIcon,
  description: 'Informações sobre Rafaella Kally - a terapeuta holística',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nome Completo',
      description: 'Nome profissional (ex: Rafaella Kally)',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'URL Slug',
      description: 'Identificador único para URL',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      type: 'image',
      title: 'Foto de Perfil',
      description: 'Foto profissional da terapeuta',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortBio',
      type: 'text',
      title: 'Biografia Curta',
      description: 'Breve apresentação (para cards e metadados)',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'fullBio',
      type: 'array',
      title: 'Biografia Completa',
      description: 'História profissional detalhada com rich text',
      of: [
        defineArrayMember({
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
            ],
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'certifications',
      type: 'array',
      title: 'Certificações e Formações',
      description: 'Lista de cursos, diplomas e certificados',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Título da Certificação' },
            { name: 'institution', type: 'string', title: 'Instituição' },
            { name: 'year', type: 'number', title: 'Ano de Conclusão' },
            { name: 'certificateUrl', type: 'url', title: 'Link do Certificado (opcional)' },
          ],
        },
      ],
    }),
    defineField({
      name: 'specialties',
      type: 'array',
      title: 'Especialidades',
      description: 'Áreas de especialização (ex: Reiki, Tarot, Massagens)',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.min(1).max(10),
    }),
    defineField({
      name: 'yearsOfExperience',
      type: 'number',
      title: 'Anos de Experiência',
      description: 'Quantos anos atua como terapeuta',
      validation: (Rule) => Rule.integer().min(0).max(50),
    }),
    defineField({
      name: 'contactInfo',
      type: 'object',
      title: 'Informações de Contacto',
      fields: [
        { name: 'email', type: 'string', title: 'Email' },
        { name: 'phone', type: 'string', title: 'Telefone' },
        { name: 'whatsapp', type: 'string', title: 'WhatsApp' },
        { name: 'address', type: 'text', title: 'Morada' },
      ],
    }),
    defineField({
      name: 'socialMedia',
      type: 'object',
      title: 'Redes Sociais',
      fields: [
        { name: 'instagram', type: 'url', title: 'Instagram' },
        { name: 'facebook', type: 'url', title: 'Facebook' },
        { name: 'linkedin', type: 'url', title: 'LinkedIn' },
        { name: 'youtube', type: 'url', title: 'YouTube' },
      ],
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      title: 'Imagem de Capa',
      description: 'Imagem grande para página "Sobre" (1200x600)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'seo',
      type: 'object',
      title: 'SEO Meta Tags',
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
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'photo',
      years: 'yearsOfExperience',
    },
    prepare({ title, media, years }) {
      return {
        title,
        subtitle: years ? `${years} anos de experiência` : 'Terapeuta Holística',
        media,
      }
    },
  },
})
