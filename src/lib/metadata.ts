import { Metadata } from "next";

const siteConfig = {
    name: "Rafaella Kally",
    title: "Rafaella Kally - Terapeuta Holística & Reiki Kundalini",
    description:
        "Cura emocional e reequilíbrio energético em Portugal. Terapeuta especializada em Reiki Kundalini, Terapia Multidimensional, Mesa Radiónica e Limpeza Energética. Sessões presenciais e online.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://rafaellakally.com",
    ogImage: "/og-image.jpg",
    locale: "pt_PT",
    creator: "Rafaella Kally",
    keywords: [
        "Reiki Kundalini",
        "Terapeuta Holística",
        "Terapia Energética",
        "Cura Emocional",
        "Limpeza Energética",
        "Mesa Radiónica",
        "Terapia Multidimensional",
        "Leitura de Aura",
        "Chakras",
        "Equilíbrio Energético",
        "Terapias Alternativas",
        "Portugal",
        "Sessões Online",
        "Bem-estar",
        "Espiritualidade",
    ],
    author: {
        name: "Rafaella Kally",
        url: "https://rafaellakally.com",
    },
    social: {
        instagram: "@rafaellakally",
        facebook: "rafaellakally",
        whatsapp: "+351912345678",
    },
};

export function generateBaseMetadata(): Metadata {
    return {
        metadataBase: new URL(siteConfig.url),
        title: {
            default: siteConfig.title,
            template: `%s | ${siteConfig.name}`,
        },
        description: siteConfig.description,
        keywords: siteConfig.keywords,
        authors: [siteConfig.author],
        creator: siteConfig.creator,
        publisher: siteConfig.name,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        openGraph: {
            type: "website",
            locale: siteConfig.locale,
            url: siteConfig.url,
            siteName: siteConfig.name,
            title: siteConfig.title,
            description: siteConfig.description,
            images: [
                {
                    url: siteConfig.ogImage,
                    width: 1200,
                    height: 630,
                    alt: `${siteConfig.name} - Terapeuta Holística & Reiki Kundalini`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: siteConfig.title,
            description: siteConfig.description,
            images: [siteConfig.ogImage],
            creator: siteConfig.social.instagram,
        },
        alternates: {
            canonical: siteConfig.url,
            languages: {
                "pt-PT": siteConfig.url,
                "pt-BR": siteConfig.url,
            },
        },
        category: "health",
        verification: {
            google: process.env.GOOGLE_SITE_VERIFICATION,
            // yandex: process.env.YANDEX_VERIFICATION,
            // bing: process.env.BING_VERIFICATION,
        },
        other: {
            "theme-color": "#C5A059",
            "apple-mobile-web-app-capable": "yes",
            "apple-mobile-web-app-status-bar-style": "default",
            "format-detection": "telephone=no",
        },
    };
}

export function generatePageMetadata(
    title: string,
    description: string,
    path: string = "",
    image?: string
): Metadata {
    const pageUrl = `${siteConfig.url}${path}`;
    const pageImage = image || siteConfig.ogImage;

    return {
        title,
        description,
        alternates: {
            canonical: pageUrl,
        },
        openGraph: {
            title: `${title} | ${siteConfig.name}`,
            description,
            url: pageUrl,
            images: [
                {
                    url: pageImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            title: `${title} | ${siteConfig.name}`,
            description,
            images: [pageImage],
        },
    };
}

// Schema.org JSON-LD generators
export function generateLocalBusinessSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${siteConfig.url}/#business`,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        image: `${siteConfig.url}${siteConfig.ogImage}`,
        telephone: siteConfig.social.whatsapp,
        email: "contato@rafaellakally.com",
        address: {
            "@type": "PostalAddress",
            addressCountry: "PT",
            addressLocality: "Portugal",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 38.7223, // Lisboa
            longitude: -9.1393,
        },
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:00",
                closes: "18:00",
            },
        ],
        priceRange: "€€",
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "200",
            bestRating: "5",
            worstRating: "1",
        },
        sameAs: [
            `https://instagram.com/${siteConfig.social.instagram.replace("@", "")}`,
            `https://facebook.com/${siteConfig.social.facebook}`,
        ],
    };
}

export function generatePersonSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: "Rafaella Kally",
        jobTitle: "Terapeuta Holística",
        description:
            "Terapeuta especializada em Reiki Kundalini e Terapias Holísticas com mais de 10 anos de experiência.",
        url: siteConfig.url,
        image: `${siteConfig.url}/rafaella-profile.png`,
        knowsAbout: [
            "Reiki Kundalini",
            "Terapia Holística",
            "Limpeza Energética",
            "Leitura de Aura",
            "Chakras",
            "Meditação",
        ],
        hasCredential: [
            {
                "@type": "EducationalOccupationalCredential",
                name: "Mestrado em Reiki Kundalini",
                credentialCategory: "certificate",
            },
            {
                "@type": "EducationalOccupationalCredential",
                name: "Terapeuta Holístico Certificado",
                credentialCategory: "certificate",
            },
        ],
    };
}

export function generateServiceSchema(service: {
    name: string;
    description: string;
    price: number;
    duration: string;
    slug: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteConfig.url}/servicos/${service.slug}`,
        name: service.name,
        description: service.description,
        provider: {
            "@type": "Person",
            "@id": `${siteConfig.url}/#person`,
        },
        areaServed: {
            "@type": "Country",
            name: "Portugal",
        },
        offers: {
            "@type": "Offer",
            price: service.price,
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
        },
        serviceType: "Terapia Holística",
    };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
}

export function generateBreadcrumbSchema(
    items: { name: string; url: string }[]
) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

export { siteConfig };
