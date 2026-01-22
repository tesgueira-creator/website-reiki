import { createClient } from "next-sanity";

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "not-configured",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    useCdn: false,
});

// Image URL builder - sem import direto
export function urlFor(source: unknown) {
    if (!source) return null;

    // Implementação simples para Sanity image URLs
    if (typeof source === 'object' && source !== null && '_ref' in source) {
        const ref = (source as Record<string, unknown>)._ref as string;
        const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "not-configured";
        const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
        return `https://cdn.sanity.io/images/${projectId}/${dataset}/${ref}`;
    }

    return null;
}
