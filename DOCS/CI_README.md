# CI & Deploy — Guia Rápido

Este ficheiro descreve o workflow de CI (GitHub Actions) que foi adicionado ao repositório e explica as regras para evitar erros comuns em deploys.

## O que o workflow faz
- Em PRs contra `main`: roda TypeScript `tsc --noEmit`, ESLint e a suíte de testes (Vitest).
- Em push para `main`: além dos passos acima, faz `npm run build` e valida que as variáveis de ambiente críticas estão presentes (falha se alguma faltar).

## Variáveis críticas verificadas (exigidas no `main`)
- SANITY_WRITE_TOKEN
- STRIPE_SECRET_KEY
- RESEND_API_KEY
- GOOGLE_SERVICE_ACCOUNT_EMAIL
- GOOGLE_SERVICE_ACCOUNT_KEY
- NEXTAUTH_SECRET

> Observação: O check de segredos é executado somente no `push` para `main` (para evitar falhas em PRs/forks onde os secrets não estão disponíveis). Isto previne merges para `main` sem configuração de ambiente.

## Recomendações para evitar erros futuros
- Adicione todas as variáveis listadas em GitHub Secrets para os ambientes `staging` e `production` antes de merge.
- Proteja a branch `main` usando as opções de Branch Protection do GitHub e exija que o job `test` passe antes de merge.
- Configure um ambiente `staging` idêntico ao `production` para testar webhooks e integrações com credenciais reais.

## Próximos passos opcionais (posso implementar)
- Workflow de deploy automático para Vercel/production que só dispara após checks passarem. (implementado: `.github/workflows/deploy-to-vercel.yml` — requer `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` em GitHub Secrets)
- Adicionar testes E2E (Playwright) que usem um ambiente de staging seguro.
- Implementado: workflow de Smoke tests + rollback automático em produção `.github/workflows/smoke-and-rollback.yml` (usa `VERCEL_TOKEN`, `VERCEL_PROJECT_ID`, `PRODUCTION_DOMAIN`, `SLACK_WEBHOOK_URL`).
- Playwright E2E: implementado testes minimalistas (verifica páginas e `GET /api/availability`) e integrado no workflow de smoke (requer `PLAYWRIGHT`/node dependencies).
- Implementado: workflow de staging `deploy-to-vercel-staging.yml` + `smoke-and-rollback-staging.yml` para deploys em branch `staging` (requer novos secrets de staging listados no docs).


> Criei também um template de Issue para checklist de deploy em `.github/ISSUE_TEMPLATE/deploy_checklist.md`. Use-o para coordenar verificações manuais antes/apos o deploy.

**Nota:** O workflow de deploy é acionado automaticamente quando o workflow `CI` termina com sucesso na branch `main`. Em `Settings > Secrets` adicione os segredos: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
