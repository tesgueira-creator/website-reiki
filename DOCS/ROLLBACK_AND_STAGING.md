# Staging, Smoke Tests & Rollback Automático

Resumo das ações implementadas para proteção de production e rollout seguro.

## O que foi adicionado
- Smoke test script: `scripts/smoke-test.js` executa testes básicos em `/`, `/agendar` e `/api/availability`.
- Script para obter deployment: `scripts/get-latest-deployment.js` usa Vercel API para identificar a última deployment READY.
- Script de rollback: `scripts/attempt-rollback.js` tenta usar o Vercel CLI para re-alias do deployment anterior para o domínio de produção.
- Workflow: `.github/workflows/smoke-and-rollback.yml` que roda após `deploy-to-vercel` completado com sucesso e realiza smoke tests; se falhar, tenta rollback e cria uma issue com logs.

## Segredos necessários
- VERCEL_TOKEN
- VERCEL_PROJECT_ID
- PRODUCTION_DOMAIN (o domínio de produção a re-alias)

**Segredos de Staging (recomenda-se separar dos de produção)**
- VERCEL_TOKEN_STAGING
- VERCEL_PROJECT_ID_STAGING
- VERCEL_ORG_ID_STAGING
- STAGING_DOMAIN (domínio do staging para alias/rollback)
- SLACK_WEBHOOK_URL (pode ser o mesmo usado em produção)

## Como funciona
1. Após deploy em `main`, `deploy-to-vercel` executa (já existente). Quando esse workflow termina com sucesso, `smoke-and-rollback` roda.
2. O workflow obtém a URL do deployment, executa `node scripts/smoke-test.js` com BASE_URL=<url>.
3. Se falhar, `scripts/attempt-rollback.js` tenta re-apontar (alias) o domínio de produção para o deployment READY anterior usando `npx vercel alias`.
4. O workflow cria uma issue automática para notificar a equipa e inclui logs.

## Avisos e limitações
- O rollback usa `vercel alias` via CLI; para que funcione, `VERCEL_TOKEN` deve ter permissões suficientes. Teste em staging antes de confiar no processo.
- Em casos de setup de DNS complexo/pipelines com infra externa, o alias pode demorar ou não ser suficiente para reverter o estado cliente. Risco residual existe.

## Próximos passos recomendados
- Configurar um ambiente staging com as mesmas credenciais para validar o mecanismo.
- Adicionar testes E2E (Playwright) que validem fluxo completo (checkout -> webhook -> sanity) em staging antes de habilitar produção.

