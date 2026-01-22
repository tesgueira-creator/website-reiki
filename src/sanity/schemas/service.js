const serviceSchema = {
  name: "service",
  type: "document",
  title: "Serviço / Terapia",
  description: "Defina os serviços e terapias oferecidas pela Rafaella Kally",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Título do Serviço",
      description: "Nome da terapia ou serviço (ex: Reiki Kundalini, Leitura de Aura)",
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: "slug",
      type: "slug",
      title: "URL Slug",
      description: "Identificador único para URL (auto-gerado a partir do título)",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "shortDescription",
      type: "text",
      title: "Descrição Curta",
      description: "Breve descrição para cards e listagens (max 160 caracteres)",
      rows: 3,
      validation: (Rule) => Rule.required().max(160),
    },
    {
      name: "fullDescription",
      type: "array",
      title: "Descrição Completa",
      description: "Descrição detalhada com rich text (blocos, parágrafos, listas)",
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
              { title: "Underline", value: "underline" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                type: "link",
                name: "link",
                title: "Link",
                icon: null,
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                    validation: (Rule) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Texto Alternativo",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "price",
      type: "number",
      title: "Preço (€)",
      description: "Preço em euros",
      validation: (Rule) =>
        Rule.required().positive().precision(2),
    },
    {
      name: "duration",
      type: "string",
      title: "Duração",
      description: "Ex: 60 minutos, 1.5 horas, etc.",
      validation: (Rule) => Rule.required().max(50),
    },
    {
      name: "coverImage",
      type: "image",
      title: "Imagem de Capa",
      description: "Imagem principal que aparece na listagem de serviços",
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
        {
          name: "caption",
          type: "string",
          title: "Legenda",
          description: "Legenda opcional para a imagem",
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "benefits",
      type: "array",
      title: "Benefícios",
      description: "Lista de benefícios principais do serviço",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "category",
      type: "string",
      title: "Categoria do Serviço",
      description: "Classifique o tipo de serviço para organização no site",
      options: {
        list: [
          { title: "🔍 Diagnóstico & Harmonização (Radiestesia)", value: "diagnosis" },
          { title: "💖 Cura pelo Coração (Multidimensional)", value: "consciousness" },
          { title: "⚡ Energia & Vitalidade (Reiki)", value: "energy-healing" },
          { title: "📦 Pack/Combo", value: "package" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "targetAudience",
      type: "array",
      title: "Para quem é indicado?",
      description: "Sintomas ou situações onde este serviço ajuda",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      placeholder: "Ex: Bloqueios energéticos, Tristeza profunda, Falta de energia",
    },
    {
      name: "isPopular",
      type: "boolean",
      title: "Destaque (Popular)",
      description: "Marque para destacar este serviço no site",
      initialValue: false,
    },
    {
      name: "seo",
      type: "object",
      title: "SEO",
      description: "Otimização para motores de busca",
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
          description: "Separadas por vírgula",
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
      title: "title",
      subtitle: "duration",
      media: "coverImage",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title,
        subtitle: subtitle ? `${subtitle}` : "Sem duração definida",
        media: media,
      };
    },
  },
};

export default serviceSchema;
