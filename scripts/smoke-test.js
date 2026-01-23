#!/usr/bin/env node
// Simple smoke tests for the site. Expects BASE_URL env var or arg
// Usage: BASE_URL=https://site.example node scripts/smoke-test.js

const base = process.env.BASE_URL || process.argv[2]
if (!base) {
    console.error('BASE_URL required (set BASE_URL env or pass as arg)')
    process.exit(2)
}

const tests = []

async function check(path, expectJson = false) {
    const url = `${base.replace(/\/$/, '')}${path}`
    const res = await fetch(url, { method: 'GET' })
    if (!res.ok) throw new Error(`${path} returned ${res.status}`)
    if (expectJson) {
        const json = await res.json().catch(() => null)
        if (!json) throw new Error(`${path} did not return JSON`)
    }
    return true
}

; (async () => {
    try {
        console.log('Smoke testing', base)
        await check('/')
        console.log('  / ok')
        await check('/api/availability', true)
        console.log('  /api/availability ok')
        await check('/agendar')
        console.log('  /agendar ok')
        console.log('All smoke tests passed')
        process.exit(0)
    } catch (err) {
        console.error('Smoke tests failed:', err.message || err)
        process.exit(1)
    }
})()
