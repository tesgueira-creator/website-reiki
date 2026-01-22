/**
 * Sanity GROQ Queries para Homepage
 * Queries otimizadas para buscar serviços, testemunhos e dados do terapeuta
 */

import { client } from "./sanity";

export type ServiceCategory = 'diagnosis' | 'consciousness' | 'energy-healing' | 'package';

export interface Service {
    _id: string;
    title: string;
    slug: string;
    shortDescription: string;
    price: number;
    duration: string;
    isPopular: boolean;
    benefits: string[];
    image?: string;
    category?: ServiceCategory;
    targetAudience?: string[];
}

export interface Testimonial {
    _id: string;
    clientName: string;
    testimonialText: string;
    rating: number;
    featured?: boolean;
    image?: string;
}

export interface Author {
    name: string;
    shortBio: string;
    longBio: string;
    specializations: string[];
    certifications: Array<{ title: string; institution: string; year: number }>;
    image?: string;
}

/**
 * Busca os 3 principais serviços (marcados como populares primeiro)
 * Com suporte a categorias para filtro frontend
 */
const SERVICES_QUERY = `*[_type == "service"] | order(isPopular desc, _createdAt desc)[0..2] {
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  price,
  duration,
  isPopular,
  benefits,
  "image": coverImage.asset->url,
  category,
  targetAudience
}`;



/**
 * Busca os 3 principais testemunhos (featured primeiro, depois por data)
 */
const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(featured desc, publishedAt desc)[0..2] {
  _id,
  clientName,
  testimonialText,
  rating,
  featured,
  "image": clientPhoto.asset->url
}`;

/**
 * Busca dados do terapeuta (autor principal)
 */
const AUTHOR_QUERY = `*[_type == "author"][0] {
  name,
  shortBio,
  longBio,
  specializations,
  certifications[]{
    title,
    institution,
    year
  },
  "image": photo.asset->url
}`;

/**
 * Função assíncrona para buscar todos os dados da homepage do Sanity
 * Com tratamento robusto de erros e fallback automático
 */
export async function fetchHomepageData(
    fallbackServices: Service[],
    fallbackTestimonials: Testimonial[],
    fallbackAuthor: Author,
): Promise<{
    services: Service[];
    testimonials: Testimonial[];
    author: Author;
    isFromSanity: boolean;
    error?: string;
}> {
    try {
        // Verificar se Sanity está configurado
        if (
            !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
            process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "replace_me"
        ) {
            console.warn(
                "⚠️  Sanity não está configurado. Usando dados mockados de fallback.",
            );
            return {
                services: fallbackServices,
                testimonials: fallbackTestimonials,
                author: fallbackAuthor,
                isFromSanity: false,
                error:
                    "Sanity não configurado. Configure NEXT_PUBLIC_SANITY_PROJECT_ID no .env.local",
            };
        }

        // Buscar dados em paralelo
        const [servicesData, testimonialsData, authorData] = await Promise.all([
            client.fetch<Service[]>(SERVICES_QUERY).catch((err) => {
                console.error("❌ Erro ao buscar serviços:", err.message);
                return null;
            }),
            client.fetch<Testimonial[]>(TESTIMONIALS_QUERY).catch((err) => {
                console.error("❌ Erro ao buscar testemunhos:", err.message);
                return null;
            }),
            client.fetch<Author>(AUTHOR_QUERY).catch((err) => {
                console.error("❌ Erro ao buscar dados do terapeuta:", err.message);
                return null;
            }),
        ]);

        // Usar fallback se alguma query falhar
        const finalServices =
            servicesData && servicesData.length > 0
                ? servicesData
                : fallbackServices;
        const finalTestimonials =
            testimonialsData && testimonialsData.length > 0
                ? testimonialsData
                : fallbackTestimonials;
        const finalAuthor = authorData || fallbackAuthor;

        // Verificar se conseguimos dados de alguma fonte
        const isFromSanity =
            (servicesData && servicesData.length > 0) ||
            (testimonialsData && testimonialsData.length > 0) ||
            (authorData !== null);

        if (!isFromSanity) {
            console.warn(
                "⚠️  Nenhum dado encontrado no Sanity. Usando dados mockados.",
            );
        }

        return {
            services: finalServices,
            testimonials: finalTestimonials,
            author: finalAuthor,
            isFromSanity,
        };
    } catch (error) {
        console.error(
            "❌ Erro crítico ao buscar dados do Sanity:",
            error instanceof Error ? error.message : String(error),
        );

        // Fallback final - sempre retorna dados mesmo em caso de erro
        return {
            services: fallbackServices,
            testimonials: fallbackTestimonials,
            author: fallbackAuthor,
            isFromSanity: false,
            error: "Erro ao conectar ao Sanity. Usando dados mockados.",
        };
    }
}
