---
name: Deploy checklist
about: Checklist para verificar antes e depois do deploy em produção
---

## Checklist de Deploy 🚀

- [ ] CI (typecheck / lint / tests) passou na branch `main`
- [ ] Secrets críticos configurados no repositório (veja abaixo)
- [ ] Ambiente de staging atualizado e validado (webhooks, envs)
- [ ] Testes manuais rápidos: flow de agendamento (checkout -> webhook -> sanity) ✅
- [ ] Verificar envio de emails (Resend) e criação de evento no Google Calendar ✅
- [ ] Webhooks Stripe configurados e testados (`checkout.session.completed`)
- [ ] Logs e monitorização prontos (Sentry / Log sink)
- [ ] Pushed release notes / changelog e link para PR
- [ ] Após deploy: realizar smoke checks (homepage, agendar, cliente, cancelamento)

### Secrets críticos a confirmar
- SANITY_WRITE_TOKEN
- STRIPE_SECRET_KEY
- RESEND_API_KEY
- GOOGLE_SERVICE_ACCOUNT_EMAIL
- GOOGLE_SERVICE_ACCOUNT_KEY
- NEXTAUTH_SECRET
- VERCEL_TOKEN
- VERCEL_ORG_ID
- VERCEL_PROJECT_ID

> Use este template numa Issue para coordenar o deploy e registar confirmações.  