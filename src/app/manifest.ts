import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Rafaella Kally - Terapeuta Holística",
        short_name: "Rafaella Kally",
        description:
            "Cura emocional e reequilíbrio energético através de Reiki Kundalini e Terapias Holísticas",
        start_url: "/",
        display: "standalone",
        background_color: "#F9F9F9",
        theme_color: "#C5A059",
        orientation: "portrait",
        categories: ["health", "lifestyle", "wellness"],
        lang: "pt-PT",
        icons: [
            {
                src: "/icon-192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable",
            },
            {
                src: "/icon-512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "/apple-touch-icon.png",
                sizes: "180x180",
                type: "image/png",
            },
        ],
        screenshots: [
            {
                src: "/screenshot-wide.png",
                sizes: "1280x720",
                type: "image/png",
                form_factor: "wide" as const,
            },
            {
                src: "/screenshot-mobile.png",
                sizes: "750x1334",
                type: "image/png",
                form_factor: "narrow" as const,
            },
        ],
    };
}
