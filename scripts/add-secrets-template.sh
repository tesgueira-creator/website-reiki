#!/usr/bin/env bash
# Non-interactive template for adding secrets. Edit the values below and run the script.
# This script uses the GitHub CLI and will add secrets to the chosen environment (default: staging).

set -euo pipefail
IFS=$'\n\t'

# CONFIGURE THESE BEFORE RUNNING
REPO="tesgueira-creator/website-reiki" # repository
ENV="staging" # or 'production' or leave empty for repo-level (REPO scope)
ENV_FLAG="--env $ENV"

SANITY_WRITE_TOKEN="PLACEHOLDER_SANITY_WRITE_TOKEN"
STRIPE_SECRET_KEY="PLACEHOLDER_STRIPE_SECRET_KEY"
STRIPE_WEBHOOK_SECRET="PLACEHOLDER_STRIPE_WEBHOOK_SECRET"
RESEND_API_KEY="PLACEHOLDER_RESEND_API_KEY"
GOOGLE_SERVICE_ACCOUNT_EMAIL="PLACEHOLDER_GOOGLE_SERVICE_ACCOUNT_EMAIL"
# GOOGLE_SERVICE_ACCOUNT_KEY must be base64 encoded single-line
GOOGLE_SERVICE_ACCOUNT_KEY="PLACEHOLDER_GOOGLE_SERVICE_ACCOUNT_KEY_BASE64"
NEXTAUTH_SECRET="PLACEHOLDER_NEXTAUTH_SECRET"
VERCEL_TOKEN="PLACEHOLDER_VERCEL_TOKEN"
VERCEL_PROJECT_ID="PLACEHOLDER_VERCEL_PROJECT_ID"
PRODUCTION_DOMAIN="PLACEHOLDER_PRODUCTION_DOMAIN"
SLACK_WEBHOOK_URL="PLACEHOLDER_SLACK_WEBHOOK_URL"
STRIPE_PUBLISHABLE_KEY="PLACEHOLDER_STRIPE_PUBLISHABLE_KEY"

function set_secret() {
  local name="$1"
  local value="$2"
  if [ -z "$value" ]; then
    echo "Skipping $name (empty)"
    return
  fi
  gh secret set "$name" --body "$value" --repo "$REPO" $ENV_FLAG && echo "Set $name"
}

set_secret "SANITY_WRITE_TOKEN" "$SANITY_WRITE_TOKEN"
set_secret "STRIPE_SECRET_KEY" "$STRIPE_SECRET_KEY"
set_secret "STRIPE_WEBHOOK_SECRET" "$STRIPE_WEBHOOK_SECRET"
set_secret "RESEND_API_KEY" "$RESEND_API_KEY"
set_secret "GOOGLE_SERVICE_ACCOUNT_EMAIL" "$GOOGLE_SERVICE_ACCOUNT_EMAIL"
set_secret "GOOGLE_SERVICE_ACCOUNT_KEY" "$GOOGLE_SERVICE_ACCOUNT_KEY"
set_secret "NEXTAUTH_SECRET" "$NEXTAUTH_SECRET"
set_secret "VERCEL_TOKEN" "$VERCEL_TOKEN"
set_secret "VERCEL_PROJECT_ID" "$VERCEL_PROJECT_ID"
set_secret "PRODUCTION_DOMAIN" "$PRODUCTION_DOMAIN"
set_secret "SLACK_WEBHOOK_URL" "$SLACK_WEBHOOK_URL"
set_secret "STRIPE_PUBLISHABLE_KEY" "$STRIPE_PUBLISHABLE_KEY"

echo "Template run complete. Run node scripts/validate-secrets.js to validate."}