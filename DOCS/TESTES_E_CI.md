# Testes e CI (Vitest + Recomendações) ✅

## Como executar testes localmente 🧪
- Instale dependências: `npm install`
- Execute a suíte de testes: `npm test -- --reporter=dot`

Observações:
- Os testes unitários criados (ex.: `src/__tests__/webhook.spec.ts`) usam mocks para `next-sanity`, `resend` e `googleapis`.
- Para testes de integração do webhook com Stripe, configure `STRIPE_SECRET_KEY` e, se quiser validar assinatura, `STRIPE_WEBHOOK_SECRET`.

---

## Recomendações de CI (GitHub Actions) ⚙️
Sugestão de workflow `ci/test.yml` (exemplo):

```yaml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install
        run: npm ci
      - name: Run tests
        run: npm test -- --reporter=dot
```

Notas de segurança:
- Não colocar segredos (ex.: SANITY_WRITE_TOKEN, STRIPE keys) directamente no repositório; use GitHub Secrets.
- Para teste de webhooks/integrações a partir da CI, prefira testes com mocks ou utilise um ambiente de staging com credenciais seguras.

---

## Testes adicionais a adicionar (sugestões) 🧭
- E2E do fluxo completo: frontend -> `POST /api/checkout` -> Stripe test checkout -> webhook -> verificar `appointment` gravado no Sanity.
- Testes de concorrência para validar lock/checagem de overbooking.
- Testes para o endpoint de cancelamento e remoção de evento no Google Calendar (mockando API).

---

Se quiser, posso: 
- Gerar o ficheiro GitHub Actions `ci/test.yml` e adicioná-lo ao repositório; 
- Escrever testes E2E de exemplo (Playwright / Cypress) para o fluxo de agendamento.

Quer que eu crie o workflow CI agora? 🔁