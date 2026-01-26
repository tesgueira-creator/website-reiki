#!/usr/bin/env bash
# Interactive script to add GitHub secrets to a repository environment (defaults to 'staging')
# Usage: bash scripts/add-secrets.sh

set -euo pipefail
IFS=$'\n\t'

REPO="tesgueira-creator/website-reiki"
DEFAULT_ENV="staging"

function check_prereqs() {
  if ! command -v gh &> /dev/null; then
    echo "Erro: é necessário o GitHub CLI (gh). Instala: https://cli.github.com/"
    exit 1
  fi
}

function ask_secret() {
  local name="$1"
  local masked="${2:-true}"
  local value
  if [ "$masked" = true ]; then
    read -rsp "Valor para $name: " value
    echo
  else
    read -rp "Valor para $name: " value
  fi
  echo "$value"
}

function set_secret() {
  local name="$1"
  local value="$2"
  local env_flag="$3" # "--env $ENV" or ""

  if [ -z "$value" ]; then
    echo "Aviso: valor vazio para $name — saltando."
    return
  fi

  # Use gh to set secret; if env_flag is not empty it contains "--env <env>"
  if ! gh secret set "$name" --body "$value" --repo "$REPO" $env_flag; then
    echo "Erro ao definir $name"
    exit 1
  fi
  echo "Definido: $name"
}

check_prereqs

read -rp "Repo (enter para usar $REPO): " input_repo
REPO=${input_repo:-$REPO}

read -rp "Environment (enter para usar $DEFAULT_ENV) — use 'repo' para repo-level: " input_env
ENV=${input_env:-$DEFAULT_ENV}

if [ "$ENV" = "repo" ]; then
  ENV_FLAG=""
else
  ENV_FLAG="--env $ENV"
fi

echo "=== Vamos adicionar os segredos ao repo: $REPO (env: ${ENV:-repo}) ==="
read -rp "Confirmas? (y/N) " confirm
if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
  echo "Abortado pelo utilizador."
  exit 0
fi

# Ask for secrets (interactive)
SANITY_WRITE_TOKEN=$(ask_secret "SANITY_WRITE_TOKEN")
STRIPE_SECRET_KEY=$(ask_secret "STRIPE_SECRET_KEY")
STRIPE_WEBHOOK_SECRET=$(ask_secret "STRIPE_WEBHOOK_SECRET")
RESEND_API_KEY=$(ask_secret "RESEND_API_KEY")
GOOGLE_SERVICE_ACCOUNT_EMAIL=$(ask_secret "GOOGLE_SERVICE_ACCOUNT_EMAIL" false)

# For Google key we accept a filepath or raw JSON; we'll detect if file exists
read -rp "Path to GOOGLE_SERVICE_ACCOUNT_KEY JSON file (enter to paste JSON directly): " gsa_path
if [[ -n "$gsa_path" && -f "$gsa_path" ]]; then
  # Encode to base64 without line breaks
  GOOGLE_SERVICE_ACCOUNT_KEY_BASE64=$(base64 -w 0 "$gsa_path")
else
  echo "Cola o JSON da Google service account e depois ENTER (linha única ou multi-line, CTRL+D para terminar):"
  GSA_JSON=$(</dev/stdin)
  GOOGLE_SERVICE_ACCOUNT_KEY_BASE64=$(echo -n "$GSA_JSON" | base64 -w 0)
fi

NEXTAUTH_SECRET=$(ask_secret "NEXTAUTH_SECRET")
VERCEL_TOKEN=$(ask_secret "VERCEL_TOKEN")
VERCEL_PROJECT_ID=$(ask_secret "VERCEL_PROJECT_ID")
# Optional org id used by some automation (set both plain and _STAGING names)
VERCEL_ORG_ID=$(ask_secret "VERCEL_ORG_ID" false)
PRODUCTION_DOMAIN=$(ask_secret "PRODUCTION_DOMAIN" false)
SLACK_WEBHOOK_URL=$(ask_secret "SLACK_WEBHOOK_URL" false)
STRIPE_PUBLISHABLE_KEY=$(ask_secret "STRIPE_PUBLISHABLE_KEY" false)

# Set secrets (order)
echo "A definir segredos..."
set_secret "SANITY_WRITE_TOKEN" "$SANITY_WRITE_TOKEN" "$ENV_FLAG"
set_secret "STRIPE_SECRET_KEY" "$STRIPE_SECRET_KEY" "$ENV_FLAG"
set_secret "STRIPE_WEBHOOK_SECRET" "$STRIPE_WEBHOOK_SECRET" "$ENV_FLAG"
set_secret "RESEND_API_KEY" "$RESEND_API_KEY" "$ENV_FLAG"
set_secret "GOOGLE_SERVICE_ACCOUNT_EMAIL" "$GOOGLE_SERVICE_ACCOUNT_EMAIL" "$ENV_FLAG"
set_secret "GOOGLE_SERVICE_ACCOUNT_KEY" "$GOOGLE_SERVICE_ACCOUNT_KEY_BASE64" "$ENV_FLAG"
set_secret "NEXTAUTH_SECRET" "$NEXTAUTH_SECRET" "$ENV_FLAG"
# Set Vercel tokens both as generic names and as staging-specific names used in workflows
set_secret "VERCEL_TOKEN" "$VERCEL_TOKEN" "$ENV_FLAG"
set_secret "VERCEL_TOKEN_STAGING" "$VERCEL_TOKEN" "$ENV_FLAG"
set_secret "VERCEL_PROJECT_ID" "$VERCEL_PROJECT_ID" "$ENV_FLAG"
set_secret "VERCEL_PROJECT_ID_STAGING" "$VERCEL_PROJECT_ID" "$ENV_FLAG"
if [ -n "$VERCEL_ORG_ID" ]; then
  set_secret "VERCEL_ORG_ID" "$VERCEL_ORG_ID" "$ENV_FLAG"
  set_secret "VERCEL_ORG_ID_STAGING" "$VERCEL_ORG_ID" "$ENV_FLAG"
fi
set_secret "PRODUCTION_DOMAIN" "$PRODUCTION_DOMAIN" "$ENV_FLAG"
set_secret "SLACK_WEBHOOK_URL" "$SLACK_WEBHOOK_URL" "$ENV_FLAG"
if [ -n "$STRIPE_PUBLISHABLE_KEY" ]; then
  set_secret "STRIPE_PUBLISHABLE_KEY" "$STRIPE_PUBLISHABLE_KEY" "$ENV_FLAG"
fi

# Optionally validate secrets and run staging workflow
read -rp "Executar node scripts/validate-secrets.js agora? (y/N) " do_validate
if [[ "$do_validate" =~ ^[Yy]$ ]]; then
  if command -v node &> /dev/null && [ -f scripts/validate-secrets.js ]; then
    node scripts/validate-secrets.js || echo "validate-secrets falhou — verifica valores e permissions."
  else
    echo "Ignorado: node ou script validate-secrets não disponível."
  fi
fi

read -rp "Disparar workflow 'deploy-to-vercel-staging.yml' agora? (y/N) " do_dispatch
if [[ "$do_dispatch" =~ ^[Yy]$ ]]; then
  gh workflow run deploy-to-vercel-staging.yml --repo "$REPO" && echo "Workflow disparado."
fi

echo "Concluído. Verifica GitHub Actions / Vercel para confirmar deploys e logs." 
