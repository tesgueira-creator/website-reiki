/**
 * Script: scripts/create_services_in_sanity.js
 * Purpose: Create or update `service` documents in Sanity using the hardcoded services
 * Usage:
 *   SANITY_API_TOKEN=your_token node scripts/create_services_in_sanity.js
 * Notes:
 * - Requires a write token with `datasets.write` permission
 * - Will set `stripePriceId` from src/lib/stripe-prices.json when available
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('next-sanity');

const mappingPath = path.join(__dirname, '..', 'src', 'lib', 'stripe-prices.json');
if (!fs.existsSync(mappingPath)) {
    console.error('Mapping file not found:', mappingPath);
    process.exit(1);
}
const priceMap = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));

const services = [
    {
        title: 'Reiki Kundalini',
        slug: 'reiki-kundalini',
        description:
            'Desbloqueie a sua energia vital e desperte o seu potencial interior através da energia Kundalini.',
        duration: 60,
        price: 80,
        isPopular: true,
    },
    {
        title: 'Leitura de Aura',
        slug: 'leitura-aura',
        description: 'Compreenda os padrões energéticos que influenciam a sua vida e bem-estar.',
        duration: 45,
        price: 60,
    },
    {
        title: 'Cura Holística',
        slug: 'cura-holistca',
        description: 'Uma abordagem integrativa para o equilíbrio corpo-mente-espírito.',
        duration: 90,
        price: 120,
    },
    {
        title: 'Consultoria Energética',
        slug: 'consultoria-energetica',
        description: 'Sessões de orientação profunda para desbloquear padrões emocionais e espirituais.',
        duration: 75,
        price: 100,
    },
    {
        title: 'Meditação Guiada',
        slug: 'meditacao-guiada',
        description: 'Práticas de meditação personalizadas para equilibrar chakras e encontrar paz interior.',
        duration: 50,
        price: 50,
    },
    {
        title: 'Limpeza Energética',
        slug: 'limpeza-energetica',
        description: 'Removiment de bloqueios energéticos e purificação do espaço sagrado pessoal.',
        duration: 60,
        price: 75,
    },
];

async function main() {
    const token = process.env.SANITY_API_TOKEN;
    if (!token) {
        console.error('ERROR: SANITY_API_TOKEN is not set. Export it before running.');
        process.exit(1);
    }

    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
    const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-01-22';

    if (!projectId) {
        console.error('ERROR: projectId not set in environment (NEXT_PUBLIC_SANITY_PROJECT_ID)');
        process.exit(1);
    }

    const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

    for (const s of services) {
        const docId = `service-${s.slug}`;
        const doc = {
            _id: docId,
            _type: 'service',
            title: s.title,
            slug: { _type: 'slug', current: s.slug },
            shortDescription: s.description.slice(0, 160),
            fullDescription: [
                {
                    _type: 'block',
                    style: 'normal',
                    children: [{ _type: 'span', text: s.description }],
                },
            ],
            category: 'holisticas',
            duration: s.duration,
            price: s.price,
            featured: !!s.isPopular,
            stripePriceId: priceMap[s.slug] || undefined,
        };

        try {
            // Create or replace ensures idempotency
            console.log(`Upserting ${docId} (${s.title})`);
            const res = await client.createOrReplace(doc);
            console.log(`  → Upserted: ${res._id}`);
        } catch (err) {
            console.error(`  → Error upserting ${docId}:`, err.message || err);
        }
    }

    console.log('\nDone.');
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
