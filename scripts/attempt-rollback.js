#!/usr/bin/env node
// Attempt to alias the previous READY deployment to the production domain using Vercel CLI
// Usage: node scripts/attempt-rollback.js <production-domain>

const projectId = process.env.VERCEL_PROJECT_ID
const token = process.env.VERCEL_TOKEN
const productionDomain = process.argv[2] || process.env.PRODUCTION_DOMAIN

if (!projectId || !token || !productionDomain) {
    console.error('VERCEL_PROJECT_ID, VERCEL_TOKEN and production domain are required')
    process.exit(2)
}

; (async () => {
    try {
        const url = `https://api.vercel.com/v6/deployments?projectId=${projectId}&limit=10`
        const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
        const json = await res.json()
        const items = json.deployments || json
        // find current production deployment (first with alias matching productionDomain)
        const prodIndex = items.findIndex((d) => Array.isArray(d.aliases) && d.aliases.some(a => a === productionDomain) && d.readyState === 'READY')
        // find previous READY deployment not same as current
        const prev = items.find((d, i) => d.readyState === 'READY' && i !== prodIndex && (!Array.isArray(d.aliases) || !d.aliases.includes(productionDomain)))
        if (!prev) {
            console.error('No previous ready deployment to rollback to')
            process.exit(3)
        }

        const prevUrl = prev.url
        console.log('Promoting previous deployment:', prevUrl)

        // Use Vercel CLI to alias previous deployment to production domain
        /* eslint-disable @typescript-eslint/no-require-imports */
        const { spawnSync } = require('child_process')
        const cmd = `npx vercel alias ${prevUrl} ${productionDomain} --token ${token} --yes`
        console.log('Running:', cmd)
        const out = spawnSync('npx', ['vercel', 'alias', prevUrl, productionDomain, '--token', token, '--yes'], { stdio: 'inherit' })
        if (out.status !== 0) {
            console.error('Alias command failed')
            process.exit(4)
        }

        console.log('Rollback / alias succeeded')
        process.exit(0)
    } catch (err) {
        console.error('Error during rollback attempt', err)
        process.exit(5)
    }
})()
