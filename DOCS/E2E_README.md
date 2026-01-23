# Playwright E2E — Guia Rápido

O repositório contém testes E2E básicos com Playwright em `tests/e2e` e configuração em `playwright.config.ts`.

Como executar localmente:
1. Instala dependências: `npm ci`
2. Instala browsers: `npx playwright install --with-deps`
3. Executa: `BASE_URL=http://localhost:3000 npm run test:e2e`

No CI o job faz `npx playwright install --with-deps` antes de correr os testes.

Testes actuais:
- `tests/e2e/booking.spec.ts` — Verifica:
  - `GET /` (status 200)
  - `GET /api/availability` (JSON)
  - Carregamento da página `/agendar` e título

Melhorias possíveis:
- Adicionar testes que interajam com o UI (selecionar slot, iniciar checkout em staging com mock de Stripe)
- Testes de fluxo completo usando credenciais de staging para Stripe/Sanity

