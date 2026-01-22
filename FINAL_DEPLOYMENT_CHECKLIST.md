# FINAL DEPLOYMENT CHECKLIST — Website Reiki

Resumo: vou listar o que já está configurado, o que falta configurar, instruções passo-a-passo e comandos/testes práticos para concluir o deploy seguro e o fluxo de pagamentos com Stripe.

---

## ✅ O que já está configurado (estado atual)
- Site construído e deployado em produção: https://website-reiki.vercel.app ✅
- Next.js 16 + Turbopack, Tailwind v4, TypeScript compilam localmente ✅
- Stripe: conta de teste conectada (conta: `RAFAELLA KALLY TAROT WEBSITE sandbox`, `acct_1SpAFIH...`) e chaves de teste já presentes no Vercel env ✅
- Produtos e Prices criados no Stripe (test mode) para todos os serviços. Price IDs adicionados ao mapa: `src/lib/stripe-prices.json` ✅
- API `/api/checkout` atualizada para preferir `priceId` (usa `src/lib/stripe-prices.ts` / .json) ✅
- Sanity:
  - `service` schema tem novo campo `stripePriceId` ✅
  - Services foram upsertados no Sanity com `stripePriceId` preenchido (scripts: `scripts/create_services_in_sanity.js` e `scripts/update_stripe_prices.js`) ✅
- Webhook handler criado em `src/app/api/webhook/stripe/route.ts` (verifica assinatura quando `STRIPE_WEBHOOK_SECRET` disponível; grava `stripeOrder` quando `SANITY_WRITE_TOKEN` configurado) ✅
- `SANITY_WRITE_TOKEN` já foi adicionado às envs do Vercel ✅
- `AI_GATEWAY_API_KEY` adicionado ao Vercel ✅

---

## ⚠️ O que falta configurar (prioridade alta)
1. Criar os *named secrets* no Vercel (Production + Preview + Development):
   - `sanity-project-id` = `q0bdmt5v`
   - `sanity-dataset` = `production`
   - `stripe-secret-key` = `sk_test_...` (ou `sk_live_...` em produção)
   - `stripe-publishable-key` = `pk_test_...` / `pk_live_...`
   - `stripe-webhook-secret` = `whsec_...` (obter após criar webhook na Stripe)
2. Criar o **Webhook** na Stripe apontando para: `https://<your-domain>/api/webhook/stripe` e copiar o *Signing secret* (`whsec_...`) para `stripe-webhook-secret` no Vercel.
3. Reintroduzir referências a secrets em `vercel.json` (usar `@secret` ou garantir que env vars nomeados existem) e redeploy.
4. Testar end-to-end:
   - Criar sessão de checkout → pagar (cartão teste) → verificar evento `checkout.session.completed` na Stripe → verificar `stripeOrder` no Sanity.
5. Segurança: se tokens / chaves foram expostas, *rotacionar* (re-gerar em Stripe e Sanity) e atualizar envs no Vercel.

---

## Instruções passo-a-passo (com comandos) — **FAZER NA ORDEM**

### A — Criar secrets no Vercel (Dashboard — recomendado)
1. Vercel → Project → Settings → Environment Variables → Add New
2. Para cada variável, escolher **Environment** Production/Preview/Development e marcar como *Encrypted/Secret* quando aplicável.

Nomes exatos a criar como *secrets* (recomendado):
- `sanity-project-id` = `q0bdmt5v`
- `sanity-dataset` = `production`
- `stripe-secret-key` = `<sk_test_...>`
- `stripe-publishable-key` = `<pk_test_...>`
- `stripe-webhook-secret` = `<whsec_...>` (depois de criar webhook)
- `SANITY_WRITE_TOKEN` = `<token_write>` (se ainda não estiver)

CLI (opcional):
- vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID production
- vercel env add NEXT_PUBLIC_SANITY_DATASET production
- vercel secrets add stripe-secret-key <value>
- vercel env add STRIPE_SECRET_KEY production

> Nota: se não conseguires criar secrets com `-` via CLI, usa o Dashboard (GUI) para criar secrets com os nomes exatos.


### B — Criar Webhook na Stripe
1. Stripe Dashboard → Developers → Webhooks → Add endpoint
2. Endpoint URL: `https://website-reiki.vercel.app/api/webhook/stripe`
3. Events: at least `checkout.session.completed` (add others as desired)
4. Copia o **Signing secret** (whsec_...) e cria `stripe-webhook-secret` em Vercel (secret)

Testar webhook (opcional local):
- `stripe listen --forward-to localhost:3000/api/webhook/stripe`
- `stripe trigger checkout.session.completed`


### C — Reintroduzir `@secret` references em `vercel.json` e redeploy
1. Repor as refs no `vercel.json` (exemplo):
```json
"env": {
  "NEXT_PUBLIC_SANITY_PROJECT_ID": "@sanity-project-id",
  "NEXT_PUBLIC_SANITY_DATASET": "@sanity-dataset",
  "STRIPE_SECRET_KEY": "@stripe-secret-key",
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY": "@stripe-publishable-key",
  "STRIPE_WEBHOOK_SECRET": "@stripe-webhook-secret"
}
```
2. Commit + push e redeploy (ou `vercel --prod --yes`)


### D — Testes finais (end-to-end)
1. Criar sessão de checkout (exemplo CURL):
```bash
curl -s -X POST https://website-reiki.vercel.app/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"serviceId":"reiki-kundalini","serviceName":"Reiki Kundalini","price":80,"duration":"60 minutos"}'
```
2. Abrir URL retornada → testar pagamento usando cartão teste `4242 4242 4242 4242`.
3. Verificar na Stripe (Dashboard → Developers → Events) que `checkout.session.completed` foi enviado.
4. Verificar no Sanity Studio se `stripeOrder` foi criado (ou buscar via query CLI):
```bash
node -e "const {createClient}=require('next-sanity'); const c=createClient({projectId:'q0bdmt5v',dataset:'production',apiVersion:'2026-01-22',useCdn:true}); c.fetch('*[_type==\"stripeOrder\"]{_id,sessionId,amount_total,currency,payment_status,customer_email,metadata}').then(r=>console.log(JSON.stringify(r,null,2)))"
```

---

## Arquivos importantes (onde alterar / verificar)
- `vercel.json` — build settings & secret refs
- `src/app/api/checkout/route.ts` — cria sessões Stripe (usa price IDs se disponíveis)
- `src/app/api/webhook/stripe/route.ts` — webhook handler (assina/verifica)
- `src/lib/stripe-prices.json` — mapeamento slug → priceId
- `src/lib/stripe-prices.ts` — (export map used by server code)
- `src/sanity/schemaTypes/serviceType.ts` — adiciona `stripePriceId`
- `scripts/create_services_in_sanity.js` — cria/upserts docs `service-<slug>`
- `scripts/update_stripe_prices.js` — patch scripts to set `stripePriceId`

---

## Segurança & boas práticas ⚠️
- Rotaciona qualquer token ou chave que tenhas partilhado publicamente.
- Usa *test keys* em Preview/Dev e *live keys* em Production apenas quando tudo estiver validado.
- Só mantenha `SANITY_WRITE_TOKEN` com permissões estritamente necessárias.

---

Se queres, eu prossigo com:
- [ ] (opcional) Criar os secrets no Vercel (se me deres token Vercel) e restaurar `@secret` refs e redeploy; ou
- [ ] Acompanhar-te passo-a-passo enquanto executas (guiar por cada clique); ou
- [ ] Fazer um teste final quando me disseres que o webhook está criado e o `stripe-webhook-secret` está configurado.

Diz como queres seguir: `Faço eu (com token)`, `Guia-me` ou `Eu já criei e podes verificar`.

---

Arquivo gerado automaticamente: `FINAL_DEPLOYMENT_CHECKLIST.md` (na raiz do projecto)
