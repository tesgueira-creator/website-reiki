# 🛡️ Auditoria Técnica Detalhada & Review de Código
**Data:** 23 de Janeiro de 2026
**Autor:** GitHub Copilot
**Escopo:** Frontend, Backend API, Segurança, Integrações.

---

## 🚨 Descobertas Críticas & Correções Realizadas

### 1. Segurança de Pagamentos (Corrigido) 🟢
**Problema Identificado:**
O endpoint `/api/checkout` aceitava cegamente o preço enviado pelo cliente no corpo da requisição JSON. Isso permitiria que um atacante alterasse o preço para €0.01 via Postman/cURL.

**Ação Tomada:**
Implementada uma camada de validação robusta em `src/app/api/checkout/route.ts`:
1.  **Consulta ao Sanity:** O sistema agora tenta buscar o preço real do serviço no CMS usando o ID.
2.  **Mapa de Fallback:** Se não encontrar no CMS (ex: dados de teste), verifica um mapa estático seguro (`FALLBACK_PRICES`).
3.  **Validação Rígida:** Se o preço enviado não corresponder ao preço verificado (com margem mínima de erro de arredondamento), a transação é rejeitada ou alertada.

### 2. Rotas de API & Webhooks
#### ✅ Webhook do Stripe (`/api/webhook/stripe`) — Schema criado
**Status:** Resolvido.
**Ação:** Criei o schema `stripeOrder` e registrei em `src/sanity/schemaTypes/stripeOrderType.ts` e `src/sanity/schemaTypes/index.ts`.
**Detalhes:** O webhook agora pode persistir ordens no Sanity sem erro de esquema. Campos incluídos: `sessionId`, `amount_total`, `currency`, `payment_status`, `customer_email`, `metadata`, `receivedAt` e `rawEvent` (úteis para auditoria).
**Sanity Studio:** Adicionei uma entrada no menu (`Stripe Orders`) em `src/sanity/structure.ts` para visualizar facilmente os pedidos.
**Idempotência:** O webhook grava agora usando `createIfNotExists` com `_id: stripeOrder_{sessionId}` para evitar duplicados em reenvios.
**Observação:** Garanta que `SANITY_WRITE_TOKEN` esteja configurado em produção para permitir a gravação segura.

#### 🟡 Formulário de Contacto (`/api/contact`)
**Status:** Funcional (Simulado).
**Observação:** O código possui rate limiting em memória (bom) e honeypot (bom), mas **não envia email**.
**Recomendação:** Integrar com um provedor de email transacional como **Resend** ou **SendGrid** para entrega real.

---

## 🏗️ Análise de Arquitetura

### Frontend (Next.js & React)
*   **Qualidade:** ⭐⭐⭐⭐⭐
*   **Estrutura:** Bem organizada com App Router.
*   **Componentização:** Uso eficaz de composants UI reutilizáveis (`ServiceCard`, `SectionTitle`).
*   **Performance:** `next/image` otimizado, fontes carregadas via `next/font`.
*   **Melhoria Sugerida:** O ficheiro `src/app/page.tsx` é muito longo. Considerar extrair as secções (Hero, Services Grid, Testimonials) para componentes dedicados em `src/components/page-sections/`.

### Backend (Sanity CMS)
*   **Qualidade:** ⭐⭐⭐⭐
*   **Schemas:** Bem definidos para `service`, `testimonial`, `author`.
*   **Resiliência:** O ficheiro `sanity-queries.ts` possui excelente tratamento de erros e dados de fallback, garantindo que o site nunca "quebre" mesmo se o Sanity estiver offline ou não configurado.

### Integração Stripe
*   **Qualidade:** ⭐⭐⭐
*   **Preços:** Atualmente usa um mix de preços inline e IDs.
*   **Recomendação:** Migrar totalmente para Stripe Product IDs antes do lançamento final para facilitar a gestão de contabilidade no painel do Stripe.

---

## 📋 Próximos Passos (Checklist Técnica)

1.  ✅ **Concluído:** Schema `stripeOrder` criado em `src/sanity/schemaTypes/stripeOrderType.ts` e registado no `schemaTypes` (webhook pode agora persistir ordens).
2.  **Urgente:** Configurar provedor de email real em `/api/contact`.
3.  **Deploy:** Configurar variáveis de ambiente de produção:
    *   `SANITY_WRITE_TOKEN` (para webhook).
    *   `STRIPE_WEBHOOK_SECRET`.
    *   `NEXT_PUBLIC_SANITY_PROJECT_ID`.

---

## 💡 Conclusão
O projeto tem uma base técnica sólida e moderna. A falha de segurança crítica no checkout foi mitigada. Os restantes pontos são de implementação de funcionalidades faltantes (email, persistência de pedidos) e não defeitos estruturais.
