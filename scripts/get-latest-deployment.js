#!/usr/bin/env node
// Outputs the latest READY deployment url for the given project and target (production/preview)
// Usage: node scripts/get-latest-deployment.js production

const projectId = process.env.VERCEL_PROJECT_ID
const token = process.env.VERCEL_TOKEN
const target = process.argv[2] || 'production'

if (!projectId || !token) {
    console.error('VERCEL_PROJECT_ID and VERCEL_TOKEN are required')
    process.exit(2)
}

; (async () => {
    try {
        const url = `https://api.vercel.com/v6/deployments?projectId=${projectId}&limit=10`
        const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
        const json = await res.json()
        const items = json.deployments || json
        if (!Array.isArray(items) || items.length === 0) {
            console.error('No deployments found')
            process.exit(3)
        }

        // prefer target: production or preview
        const filtered = items.filter((d) => d.readyState === 'READY' && (d.target === target || (target === 'production' ? d.production !== false : true)))
        const pick = filtered[0] || items.find((d) => d.readyState === 'READY')
        if (!pick) {
            console.error('No ready deployments found')
            process.exit(4)
        }

        console.log(pick.url)
    } catch (err) {
        console.error('Error fetching deployments', err)
        process.exit(5)
    }
})()
