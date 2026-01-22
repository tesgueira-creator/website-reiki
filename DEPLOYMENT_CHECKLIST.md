# ✅ DEPLOYMENT CHECKLIST & GUIA DE LANÇAMENTO

## 🎯 Pré-Requisitos

- [ ] Node.js 18+ instalado localmente
- [ ] Git configurado e repositório criado
- [ ] Conta GitHub criada
- [ ] Conta Sanity.io criada com projeto
- [ ] Conta Vercel criada (grátis)
- [ ] Domínio personalizado (opcional)

---

## 📋 Fase 1: Preparação Local (PRE-DEPLOY)

### 1.1 Validar Código

```bash
# Verificar build
npm run build

# Deve terminar com sucesso sem erros

# Verificar TypeScript
npm run type-check

# Verificar linting
npm run lint
```

- [ ] Build sucesso
- [ ] Sem erros TypeScript
- [ ] Sem warnings lint

### 1.2 Testar Localmente

```bash
npm run dev
# Acesse http://localhost:3000

# Verificar:
- [ ] Homepage carrega corretamente
- [ ] Navbar é responsiva
- [ ] Menu mobile funciona
- [ ] Links de navegação funcionam
- [ ] Animações são suaves
- [ ] Imagens carregam
- [ ] Footer aparece
```

### 1.3 Configuração de Variáveis de Ambiente

```bash
# Verifique .env.local
cat .env.local

# Deve conter:
# NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
# NEXT_PUBLIC_SANITY_DATASET=production

# ⚠️ NUNCA COMMIT .env.local!
```

- [ ] `.env.local` configurado
- [ ] `.env.local` em `.gitignore`
- [ ] Variáveis Sanity corretas

### 1.4 SEO & Metadados

```bash
# Verificar metadados em cada página
# Abra DevTools > Elements > <head>

# Deve ter:
- [ ] <title> único em cada página
- [ ] <meta name="description"> 160 chars max
- [ ] <meta property="og:image"> para redes sociais
- [ ] <meta property="og:title">
- [ ] <link rel="canonical">
- [ ] <meta name="viewport"> responsivo
```

### 1.5 Performance

```bash
# Verá Lighthouse no DevTools

# Scorecard esperado:
- [ ] Performance: 90+
- [ ] Accessibility: 90+
- [ ] Best Practices: 90+
- [ ] SEO: 95+
```

---

## 🔧 Fase 2: Preparação Repository

### 2.1 Git Setup

```bash
# Verifique se já tem git
git status

# Se não tiver, inicializar:
git init
git add .
git commit -m "Initial commit: Website Rafaella Kally"
```

- [ ] Repositório git criado
- [ ] Commit inicial feito

### 2.2 Push para GitHub

```bash
# Create new repo em https://github.com/new
# Nome: website-reiki
# Descrição: Website profissional de Rafaella Kally

# Depois:
git remote add origin https://github.com/SEU_USER/website-reiki.git
git branch -M main
git push -u origin main
```

- [ ] Repositório GitHub criado
- [ ] Código pushed para main
- [ ] README.md visível no GitHub

---

## 🚀 Fase 3: Deploy em Vercel

### 3.1 Conectar Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Login com GitHub
3. Clique "New Project"
4. Selecione `website-reiki` repository
5. Clique "Import"

### 3.2 Configurar Variáveis de Ambiente

Na tela de configuração:

```
Environment Variables:

Nome: NEXT_PUBLIC_SANITY_PROJECT_ID
Valor: seu_project_id

Nome: NEXT_PUBLIC_SANITY_DATASET
Valor: production
```

- [ ] NEXT_PUBLIC_SANITY_PROJECT_ID adicionada
- [ ] NEXT_PUBLIC_SANITY_DATASET adicionada

### 3.3 Deploy

Clique "Deploy" e aguarde ~2 minutos.

```bash
# Saberá que funcionou quando vir:
# "Congratulations! Your deployment is ready"
```

- [ ] Deploy bem-sucedido
- [ ] URL .vercel.app recebida

### 3.4 Testar Deploy

```bash
# Acesse o URL gerado (ex: https://website-reiki-abc123.vercel.app)

# Verifique:
- [ ] Homepage carrega
- [ ] Navegação funciona
- [ ] Imagens carregam
- [ ] Sem erros console
- [ ] Mobile responsivo
```

---

## 🌐 Fase 4: Configurar Domínio Personalizado

### 4.1 Comprar Domínio

Recomendados:
- [namecheap.com](https://namecheap.com)
- [godaddy.com](https://godaddy.com)
- [google.com/domains](https://google.com/domains)

Opções:
- `rafaellakally.pt` (Portugal)
- `rafaellakally.com`

- [ ] Domínio comprado

### 4.2 Conectar a Vercel

1. Em Vercel Project Settings > Domains
2. Adicione seu domínio
3. Siga instruções de DNS
4. Aguarde propagação (~24h)

- [ ] Domínio adicionado em Vercel
- [ ] DNS configurado
- [ ] Certificado SSL automático

### 4.3 Email Personalizado

Para email profissional:

Opção 1: Gmail Business
- 6€/mês por usuário
- [workspace.google.com](https://workspace.google.com)

Opção 2: Zoho Mail
- Gratuito até 5 usuários
- [zoho.com/mail](https://zoho.com/mail)

- [ ] Email profissional configurado (opcional)

---

## 📊 Fase 5: Monitoramento & Analytics

### 5.1 Google Analytics

1. Acesse [analytics.google.com](https://analytics.google.com)
2. Crie nova propriedade para seu domínio
3. Copie ID de rastreamento
4. Adicione script em `src/app/layout.tsx`:

```typescript
import Script from "next/script";

<Script
  strategy="afterInteractive"
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXX`}
/>
<Script
  id="google-analytics"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXX');
    `,
  }}
/>
```

- [ ] Google Analytics configurado

### 5.2 Search Console

1. Acesse [search.google.com/search-console](https://search.google.com/search-console)
2. Adicione propriedade com seu domínio
3. Verify com TXT record DNS
4. Envie sitemap

- [ ] Search Console ativo

### 5.3 Email de Notificações Vercel

Verifique email para receber alertas de:
- Deployments
- Erros em produção
- Performance issues

- [ ] Email configurado em Vercel

---

## 🔐 Fase 6: Segurança & HTTPS

```bash
# Verify HTTPS:
- [ ] URL começa com https://
- [ ] Certificado SSL válido
- [ ] Sem warnings de segurança
```

### Headers de Segurança

Em `next.config.ts`:

```typescript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN'
        }
      ]
    }
  ]
}
```

- [ ] Headers de segurança configurados

---

## 📱 Fase 7: Testes Finais

### 7.1 Desktop

```bash
# Chrome, Firefox, Safari
- [ ] Layout correto
- [ ] Fonte legível
- [ ] Cores exatas
- [ ] Animações suaves
- [ ] Links funcionam
```

### 7.2 Mobile (iPhone)

```bash
- [ ] Responsivo
- [ ] Menu mobile funciona
- [ ] Imagens escaladas
- [ ] Touch-friendly buttons
- [ ] Sem horizontal scroll
```

### 7.3 Mobile (Android)

```bash
- [ ] Mesmo que iPhone
- [ ] Testar em 2-3 dispositivos
```

### 7.4 Performance Mobile

```bash
# Use Google PageSpeed Insights
https://pagespeed.web.dev

- [ ] Score mobile: 90+
- [ ] Core Web Vitals: GREEN
```

---

## 📢 Fase 8: Comunicação & Marketing

### 8.1 Social Media

- [ ] Instale Google My Business
- [ ] Crie página Instagram
- [ ] Crie página Facebook
- [ ] LinkedIn (opcional)
- [ ] Atualize links em todas

### 8.2 Email Marketing

Envie email para contactos:

```
Assunto: Site Online! 🌟

Oi,

Alegra-me partilhar que meu novo website profissional está no ar:

🌐 [seu-dominio.com]

Lá encontrará:
✨ Descrição de serviços
💼 Depoimentos de clientes
📞 Formas de contacto

Fico feliz em vos receber!

Com paz e luz,
Rafaella Kally
```

- [ ] Email enviado

### 8.3 Google Business Profile

1. Acesse [google.com/business](https://google.com/business)
2. Crie perfil (gratuito)
3. Adicione serviços
4. Peça reviews a clientes

- [ ] Google Business Profile criado

---

## 🎉 Fase 9: Lançamento Oficial

### 9.1 Checklist Final

- [ ] Website online em domínio
- [ ] HTTPS funcionando
- [ ] Analytics rastreando
- [ ] Formulários funcionam
- [ ] Mobile responsivo
- [ ] SEO indexado
- [ ] Email profissional ativo
- [ ] Social media links atualizados

### 9.2 Announce

```bash
📣 Website Launch Announcement:

"Alegra-me apresentar meu novo website!

🌟 www.seu-dominio.com

Oferecendo:
• Reiki Kundalini
• Leitura de Aura
• Cura Holística
• + Terapias

Agende sua sessão hoje! ✨"
```

- [ ] Anúncio feito nas redes sociais
- [ ] Amigos/Família notificados

---

## 📈 Fase 10: Pós-Lançamento (Manutenção)

### 10.1 Semanal

- [ ] Verificar Google Analytics
- [ ] Responder enquiries
- [ ] Atualizar serviços se necessário

### 10.2 Mensal

- [ ] Revisar performance Lighthouse
- [ ] Atualizar depoimentos
- [ ] Publicar conteúdo novo

### 10.3 Trimestral

- [ ] Analisar keywords em Search Console
- [ ] Otimizar para SEO
- [ ] Atualizar preços/descrições

### 10.4 Backups

```bash
# Backup do repositório (automático em GitHub)
# Backup de dados Sanity (automático)

# Manual:
# 1. Exporte dados de Sanity mensalmente
# 2. Guarde backup local
```

---

## 🆘 Troubleshooting Common Issues

### "Deploy falhou"
1. Verificar console Vercel por erros
2. Pode ser falta de variável de ambiente
3. Verificar `.env.local` não está commited

### "Imagens não carregam"
1. Verificar Sanity images têm URLs válidas
2. Limpar cache browser
3. Revalidar build

### "Domínio não funciona"
1. Aguarde propagação DNS (até 48h)
2. Verificar registros DNS em provider
3. Contactar suporte Vercel

### "Performance baixa"
1. Verificar Lighthouse metrics
2. Otimizar imagens (WebP)
3. Considerar CDN premium

---

## 📞 Suporte & Recursos

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Sanity Support**: [sanity.io/support](https://sanity.io/support)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)

---

**✨ Parabéns pelo lançamento! Que o website da Rafaella inspire e transforme muitas vidas!**

**Data de Lançamento**: _____________
**URL do Website**: _____________
**Domínio Personalizado**: _____________
