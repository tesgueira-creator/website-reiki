import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rafaellakally.com";
    const currentDate = new Date();

    // Páginas principais estáticas
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/servicos`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/sobre`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/depoimentos`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contacto`,
            lastModified: currentDate,
            changeFrequency: "yearly",
            priority: 0.8,
        },
    ];

    // Páginas de serviços individuais (futuro)
    const servicePages: MetadataRoute.Sitemap = [
        "reiki-kundalini",
        "mesa-radionica",
        "terapia-multidimensional",
        "leitura-aura",
        "limpeza-energetica",
        "pack-alinhamento-total",
    ].map((slug) => ({
        url: `${baseUrl}/servicos/${slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...staticPages, ...servicePages];
}
