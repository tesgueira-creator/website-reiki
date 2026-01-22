# 🚀 Deployment Guide - Vercel

## Pré-requisitos

- Conta no [Vercel](https://vercel.com)
- Conta no [Stripe](https://stripe.com)
- Conta no [Sanity](https://sanity.io)
- GitHub repository configurado

---

## 1. Setup Stripe

### Obter API Keys:

1. Acesse [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Copie as chaves:
   - **Publishable key**: `pk_test_...`
   - **Secret key**: `sk_test_...`

### Configurar Webhooks (Opcional):

1. Vá para [Webhooks](https://dashboard.stripe.com/test/webhooks)
2. Adicione endpoint: `https://seu-dominio.vercel.app/api/webhook/stripe`
3. Selecione eventos:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`

---

## 2. Deploy no Vercel

### Opção A: Via Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Opção B: Via GitHub Integration

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Clique em "Add New Project"
3. Importe o repositório GitHub
4. Configure variáveis de ambiente (ver abaixo)
5. Clique em "Deploy"

---

## 3. Variáveis de Ambiente no Vercel

Adicione as seguintes variáveis em **Project Settings → Environment Variables**:

### Sanity CMS:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=q0bdmt5v
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-01-22
```

### Stripe Payment:
```
STRIPE_SECRET_KEY=sk_test_seu_secret_key_aqui
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_seu_publishable_key_aqui
```

### Site Config:
```
NEXT_PUBLIC_SITE_URL=https://seu-dominio.vercel.app
NEXT_PUBLIC_WHATSAPP_NUMBER=+351912345678
```

### Google Analytics (Opcional):
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 4. Configurar Domínio Customizado

1. No Vercel Dashboard, vá para **Settings → Domains**
2. Adicione seu domínio (ex: `rafaellakally.com`)
3. Configure DNS no seu registrar:

### DNS Records:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. Aguarde propagação DNS (5-60 minutos)

---

## 5. Testar Pagamento Stripe

### Cartões de Teste:

#### Sucesso:
- **Número**: `4242 4242 4242 4242`
- **Data**: Qualquer data futura
- **CVC**: Qualquer 3 dígitos
- **ZIP**: Qualquer código postal

#### Falha (Cartão Recusado):
- **Número**: `4000 0000 0000 0002`

#### Autenticação 3D Secure:
- **Número**: `4000 0027 6000 3184`

---

## 6. Verificação Pós-Deploy

### Checklist:

- [ ] Site acessível no domínio Vercel
- [ ] Imagens carregando corretamente
- [ ] Formulário de contacto funcionando
- [ ] Botão "Agendar e Pagar" redirecionando para Stripe
- [ ] Página de sucesso carregando após pagamento teste
- [ ] Página de cancelamento funcionando
- [ ] Headers de segurança configurados
- [ ] SSL/HTTPS ativo
- [ ] Performance score > 90 (Google Lighthouse)

---

## 7. Comandos Úteis

```bash
# Build local
npm run build

# Verificar build
npm start

# Deploy preview (staging)
vercel

# Deploy production
vercel --prod

# Ver logs
vercel logs

# Remover deployment
vercel remove [deployment-url]
```

---

## 8. Monitoramento

### Analytics:
- **Vercel Analytics**: Habilitado automaticamente
- **Google Analytics**: Configurar GA_MEASUREMENT_ID

### Performance:
- **Vercel Speed Insights**: Dashboard → Analytics

### Errors:
- **Vercel Logs**: Dashboard → Deployments → View Function Logs

---

## 9. Rollback

Se algo der errado:

```bash
# Via CLI
vercel rollback [deployment-url]

# Via Dashboard
1. Vá para Deployments
2. Encontre deployment anterior estável
3. Clique nos 3 pontos → "Promote to Production"
```

---

## 10. Modo Produção vs Teste

### Stripe Test Mode:
- Usa `pk_test_...` e `sk_test_...`
- Apenas cartões de teste funcionam
- Sem cobranças reais

### Stripe Live Mode:
- Usa `pk_live_...` e `sk_live_...`
- Cartões reais funcionam
- Cobranças reais são feitas

**⚠️ IMPORTANTE**: Sempre teste completamente antes de ativar Live Mode!

---

## 11. Troubleshooting

### Build Falha:
```bash
# Limpar cache
vercel --force

# Ver logs detalhados
vercel logs --follow
```

### Variáveis não Encontradas:
- Verifique se estão em Production & Preview
- Redeploy após adicionar variáveis

### Stripe não Funciona:
- Verifique se STRIPE_SECRET_KEY está configurado
- Confirme que Site URL está correto
- Teste em modo incognito

---

## 12. Segurança

### Headers Configurados:
- ✅ Content Security Policy
- ✅ X-Frame-Options
- ✅ X-Content-Type-Options
- ✅ Referrer-Policy
- ✅ HTTPS Enforcement

### Rate Limiting:
- Implementado em `/api/contact`
- 5 requests por 15 minutos

---

## 13. Performance Optimization

### Já Implementado:
- ✅ Next.js Image Optimization
- ✅ Font Optimization (next/font)
- ✅ Code Splitting
- ✅ Dynamic Imports
- ✅ Static Generation onde possível

### CDN:
- Vercel CDN global automático
- Assets servidos de edge locations

---

## 14. Support

### Vercel:
- [Documentation](https://vercel.com/docs)
- [Community](https://github.com/vercel/vercel/discussions)

### Stripe:
- [Documentation](https://stripe.com/docs)
- [Support](https://support.stripe.com)

---

## ✅ Deploy Checklist Final

Antes de ir para produção:

- [ ] Testar todos os pagamentos em Stripe Test Mode
- [ ] Verificar emails de confirmação
- [ ] Testar em mobile, tablet, desktop
- [ ] Verificar todas as páginas (404, 500, success, cancel)
- [ ] Configurar Google Analytics
- [ ] Adicionar domínio customizado
- [ ] SSL/HTTPS ativo
- [ ] Backup do código no GitHub
- [ ] Monitoramento configurado
- [ ] Equipe notificada sobre go-live

---

**Status**: Ready for Production 🚀  
**Last Updated**: January 2026
