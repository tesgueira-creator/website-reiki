# Guia de Configuração das Integrações 🔌

Este documento lista todas as **variáveis de ambiente**, passos e notas para configurar Stripe, Sanity, Resend, Google Calendar e NextAuth para o sistema de agendamentos.

---

## Variáveis de ambiente necessárias (exemplo `.env.local`) 📋

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_sanity_write_token

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx  # opcional em dev, recomendado em prod

# Resend (email)
RESEND_API_KEY=re_...
RESEND_FROM="Reiki <agendamentos@seu-dominio.com>"

# Google Calendar (service account for server-to-server)
GOOGLE_CALENDAR_ID=primary_or_calendar_id@group.calendar.google.com
GOOGLE_SERVICE_ACCOUNT_EMAIL=service-account@project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"

# NextAuth
NEXTAUTH_SECRET=alguma_chave_secreta
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Site
NEXT_PUBLIC_SITE_URL=https://seu-site.exemplo
```

> Observação: ao inserir a chave privada do Google no `.env`, substitua quebras de linha por `\n` (já foi tratado no código: `.replace(/\\n/g,'\n')`).

---

## Stripe: configuração de Webhook
1. Crie o endpoint de webhook em: `https://<seu-site>/api/webhook/stripe`.
2. Configure o webhook no Dashboard Stripe para enviar `checkout.session.completed`.
3. Copie o secret (`STRIPE_WEBHOOK_SECRET`) e coloque nas suas variáveis de ambiente.

> Em ambiente de desenvolvimento local, pode testar com `stripe listen` para encaminhar webhooks.

---

## Resend (Email)
1. Crie conta em https://resend.com e gere `RESEND_API_KEY`.
2. Defina `RESEND_FROM` com um email verificado (p.ex. `Reiki <agendamentos@...>`).
3. Notas: o envio é condicional (apenas se `RESEND_API_KEY` estiver definido) — em dev o envio não ocorrerá se faltar.

---

## Google Calendar (Service Account)
1. No Google Cloud Console, crie um Service Account com permissões para Calendar API (`roles/calendar.eventAdmin`).
2. Gere uma chave JSON e copie os campos:
   - `client_email` -> `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` -> `GOOGLE_SERVICE_ACCOUNT_KEY` (substitua newlines por `\n`)
3. Crie/obtenha o `GOOGLE_CALENDAR_ID` (p.ex. calendario do administrador) e partilhe com a service account como "Make changes and manage sharing".
4. No ambiente, garanta `GOOGLE_SERVICE_ACCOUNT_KEY` com newlines escapados.

---

## Sanity
- Geração do token de escrita: use o Sanity Studio ou a CLI para gerar um token com permissão de `write`. Defina em `SANITY_WRITE_TOKEN`.
- O projeto usa `createIfNotExists` e `patch` para updates (evitar duplicados).

---

## NextAuth (Google + Email via Resend)
- `NEXTAUTH_SECRET` é obrigatório para sessões seguras.
- Para Google provider, configure `GOOGLE_CLIENT_ID` e `GOOGLE_CLIENT_SECRET` em [APIs & Services].
- Para login por email, o provider usa a função `sendVerificationRequest` com Resend; necessita de `RESEND_API_KEY` e `RESEND_FROM`.

---

## Testes Locais 📦
- Rode `npm install` para instalar dependências (`googleapis`, `resend`, `next-auth` adicionados).
- Variáveis mínimas para teste do webhook local: `STRIPE_SECRET_KEY` e `SANITY_WRITE_TOKEN` (o teste atual usa parse sem webhook secret).
- Para testar integração completa: configurar `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, Google service account e SANITY token.

---

Se quiser, eu crio um script passo-a-passo para configurar tudo numa máquina local (incluindo `stripe listen` e exemplo de `service account key`), ou posso gerar um `README` de deploy para Vercel com as variáveis de ambiente necessárias. Quer que eu gere esse README também? 📝