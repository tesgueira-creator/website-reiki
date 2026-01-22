const authorSchema = {
  name: "author",
  type: "document",
  title: "Perfil da Terapeuta",
  description: "Informações sobre Rafaella Kally - a terapeuta holística",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Nome Completo",
      description: "Nome profissional (ex: Rafaella Kally)",
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: "slug",
      type: "slug",
      title: "URL Slug",
      description: "Identificador único para URL",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "photo",
      type: "image",
      title: "Foto de Perfil",
      description: "Foto profissional da terapeuta",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texto Alternativo",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "shortBio",
      type: "text",
      title: "Biografia Curta",
      description: "Breve apresentação (para cards e metadados)",
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    },
    {
      name: "longBio",
      type: "array",
      title: "Biografia Completa",
      description: "Histórico, formação, especialidades e filosofia",
      of: [
        {
          type: "block",
          styles: [
            { title: "Padrão", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "specializations",
      type: "array",
      title: "Especializações",
      description: "Áreas principais de atuação",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "certifications",
      type: "array",
      title: "Certificações & Formações",
      description: "Cursos, certificados e formações profissionais",
      of: [
        {
          type: "object",
          title: "Certificação",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Título da Certificação",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "institution",
              type: "string",
              title: "Instituição / Entidade",
              description: "Organização que emitiu a certificação",
            },
            {
              name: "year",
              type: "number",
              title: "Ano",
              description: "Ano de conclusão",
            },
          ],
        },
      ],
    },
    {
      name: "socialLinks",
      type: "object",
      title: "Redes Sociais & Contactos",
      description: "Links para redes sociais e formas de contacto",
      fields: [
        {
          name: "instagram",
          type: "url",
          title: "Instagram",
          description: "URL do perfil Instagram",
        },
        {
          name: "facebook",
          type: "url",
          title: "Facebook",
          description: "URL da página Facebook",
        },
        {
          name: "whatsapp",
          type: "string",
          title: "WhatsApp",
          description: "Número WhatsApp com código de país (ex: +351912345678)",
        },
        {
          name: "email",
          type: "email",
          title: "Email",
          description: "Email de contacto profissional",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "phone",
          type: "string",
          title: "Telefone",
          description: "Número de telefone de contacto",
        },
        {
          name: "website",
          type: "url",
          title: "Website Pessoal",
          description: "Outro website ou portfolio (opcional)",
        },
      ],
    },
    {
      name: "aboutValues",
      type: "array",
      title: "Valores & Filosofia",
      description: "Princípios fundamentais do trabalho da terapeuta",
      of: [
        {
          type: "object",
          title: "Valor",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Título do Valor",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              type: "text",
              title: "Descrição",
              rows: 3,
            },
            {
              name: "icon",
              type: "string",
              title: "Ícone/Emoji",
              description: "Um emoji ou símbolo que representa este valor",
              initialValue: "✨",
            },
          ],
        },
      ],
    },
    {
      name: "testimonialHighlight",
      type: "boolean",
      title: "Mostrar Depoimentos na Bio",
      description: "Exibir secção de depoimentos na página de perfil",
      initialValue: true,
    },
    {
      name: "seo",
      type: "object",
      title: "SEO & Metadados",
      description: "Configurações para otimização em motores de busca",
      fields: [
        {
          name: "metaDescription",
          type: "text",
          title: "Meta Description",
          description: "Descrição para SEO (max 160 caracteres)",
          rows: 2,
          validation: (Rule) => Rule.max(160),
        },
        {
          name: "keywords",
          type: "array",
          title: "Palavras-chave",
          of: [{ type: "string" }],
          options: {
            layout: "tags",
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "shortBio",
      media: "photo",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title,
        subtitle: subtitle ? subtitle.substring(0, 60) + "..." : "Sem bio",
        media: media,
      };
    },
  },
};
export default authorSchema;