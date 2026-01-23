#!/usr/bin/env node
// Validate required environment secrets for staging/production workflows

const required = [
    'SANITY_WRITE_TOKEN',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'RESEND_API_KEY',
    'GOOGLE_SERVICE_ACCOUNT_EMAIL',
    'GOOGLE_SERVICE_ACCOUNT_KEY',
    'NEXTAUTH_SECRET',
    'VERCEL_TOKEN',
    'VERCEL_PROJECT_ID',
    'PRODUCTION_DOMAIN',
    'SLACK_WEBHOOK_URL',
]

const missing = required.filter((k) => !process.env[k])
if (missing.length === 0) {
    console.log('All required environment variables are present.')
    process.exit(0)
}

console.log('Missing the following environment variables:')
missing.forEach((m) => console.log(' -', m))
console.log('\nPlease add them to your environment or GitHub Secrets before proceeding.')
process.exit(1)
