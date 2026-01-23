/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Script: scripts/update_stripe_prices.js
 * Purpose: Patch Sanity `service` documents to include `stripePriceId` field
 * Usage:
 *   SANITY_API_TOKEN=your_token node scripts/update_stripe_prices.js
 * Requirements: a write token with `datasets.write` permission for the project
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('next-sanity');

async function main() {
    const token = process.env.SANITY_API_TOKEN;
    if (!token) {
        console.error('ERROR: SANITY_API_TOKEN is not set. Export it before running.');
        process.exit(1);
    }

    const mappingPath = path.join(__dirname, '..', 'src', 'lib', 'stripe-prices.json');
    if (!fs.existsSync(mappingPath)) {
        console.error(`Mapping file not found: ${mappingPath}`);
        process.exit(1);
    }

    const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));

    // Create a client with write token
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
    const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-01-22';
    console.log('Sanity client config:', { projectId, dataset, apiVersion });

    const client = createClient({
        projectId,
        dataset,
        apiVersion,
        token,
        useCdn: false,
    });

    for (const [slug, priceId] of Object.entries(mapping)) {
        try {
            console.log(`Searching service with slug: ${slug}`);
            const service = await client.fetch('*[_type == "service" && slug.current == $slug][0]{_id, title, slug, stripePriceId}', { slug });
            if (!service) {
                console.warn(`  → No service document found for slug '${slug}'. Skipping.`);
                continue;
            }

            if (service.stripePriceId === priceId) {
                console.log(`  → Already set to ${priceId}. Skipping.`);
                continue;
            }

            console.log(`  → Patching ${service._id} (${service.title}) with stripePriceId=${priceId}`);
            const res = await client.patch(service._id).set({ stripePriceId: priceId }).commit({ autoGenerateArrayKeys: true });
            console.log(`  → Patched: ${res._id}`);
        } catch (err) {
            console.error(`  → Error patching ${slug}:`, err.message || err);
        }
    }

    console.log('\nDone.');
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
