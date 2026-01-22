const testimonialSchema = {
  name: "testimonial",
  type: "document",
  title: "Depoimento / Testemunha",
  description: "Depoimentos de clientes sobre as terapias",
  fields: [
    {
      name: "clientName",
      type: "string",
      title: "Nome do Cliente",
      description: "Nome completo do cliente que deixa o depoimento",
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: "clientPhoto",
      type: "image",
      title: "Foto do Cliente",
      description: "Foto opcional do cliente (será exibida como avatar)",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texto Alternativo",
          description: "Descrição da imagem para acessibilidade",
        },
      ],
    },
    {
      name: "testimonialText",
      type: "text",
      title: "Texto do Depoimento",
      description: "O que o cliente tem a dizer sobre a experiência",
      rows: 5,
      validation: (Rule) => Rule.required().min(50).max(500),
    },
    {
      name: "rating",
      type: "number",
      title: "Avaliação",
      description: "Classificação de 1 a 5 estrelas",
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(1)
          .max(5)
          .error("A classificação deve ser entre 1 e 5"),
      initialValue: 5,
    },
    {
      name: "service",
      type: "reference",
      title: "Serviço Relacionado",
      description: "Qual serviço/terapia este depoimento refere-se",
      to: [{ type: "service" }],
    },
    {
      name: "publishedAt",
      type: "datetime",
      title: "Data de Publicação",
      description: "Data em que o depoimento foi adicionado",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "featured",
      type: "boolean",
      title: "Destaque na Homepage",
      description: "Selecione para mostrar este depoimento na página inicial",
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: "clientName",
      subtitle: "testimonialText",
      media: "clientPhoto",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title,
        subtitle: subtitle ? subtitle.substring(0, 60) + "..." : "Sem texto",
        media: media,
      };
    },
  },
};

export default testimonialSchema;
