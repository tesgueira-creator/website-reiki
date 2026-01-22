# 🚀 GUIA DE DEPLOYMENT - WEBSITE RAFAELLA KALLY

**Status:** Pronto para deploy  
**Data:** 20 Janeiro 2026  
**Hosting Recomendado:** Vercel + Sanity.io

---

## 📋 PRÉ-REQUISITOS

- [ ] Conta GitHub ativa (para Vercel)
- [ ] Conta Vercel (grátis em vercel.com)
- [ ] Conta Sanity.io (grátis em sanity.io)
- [ ] Domain registado (opcional, recomendado)

---

## 🔧 PASSO 1: Configurar Sanity.io

### 1.1 Criar Projeto Sanity

```bash
# Se ainda não tem Sanity instalado
npm install -g @sanity/cli

# Criar novo projeto
sanity init

# Selecionar opções:
# - Project name: "website-reiki"
# - Use default dataset config? Yes
# - Select project template: "Clean project with schema types"
```

### 1.2 Copiar Schemas para seu Projeto Sanity

Os schemas já estão em `/workspaces/website-reiki/src/sanity/schemas/`

**Copie para:** `sanity/schemas/` no seu projeto Sanity (se criar novo)

```
author.js
service.js
testimonial.js
```

### 1.3 Obter as Credenciais

Após criar projeto Sanity:

```
Project ID: abc123def456ghi789
Dataset: production
```

Guardar estes valores!

---

## 🔐 PASSO 2: Configurar Variáveis de Ambiente

### 2.1 No Repositório GitHub

Ir a: **Settings → Secrets and variables → Actions**

Adicionar estas secrets:

```
NEXT_PUBLIC_SANITY_PROJECT_ID = "abc123def456ghi789"
NEXT_PUBLIC_SANITY_DATASET = "production"
```

⚠️ **Importante:** O prefixo `NEXT_PUBLIC_` torna estas públicas no navegador (é ok, não contêm API keys)

### 2.2 Localmente (para desenvolvimento)

Criar arquivo `.env.local` na raiz do projeto:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123def456ghi789
NEXT_PUBLIC_SANITY_DATASET=production
```

⚠️ **NÃO commitar .env.local** - já está no `.gitignore`

---

## 📦 PASSO 3: Publicar dados no Sanity

### 3.1 Aceder ao Sanity Studio

```bash
cd seu-projeto-sanity
sanity start

# Abre em http://localhost:3333
```

### 3.2 Criar Documentos

No Sanity Studio, criar:

#### 1 documento "Author" (Rafaella):
```json
{
  "name": "Rafaella Kally",
  "shortBio": "Terapeuta holística especializada...",
  "longBio": "Sou Rafaella Kally...",
  "specializations": [
    "Reiki Kundalini",
    "Limpeza Energética",
    "Leitura de Aura",
    "Mentoria Espiritual"
  ],
  "certifications": [
    {
      "title": "Mestrado em Reiki Kundalini",
      "institution": "Instituto Energia Pura",
      "year": 2020
    },
    {
      "title": "Terapeuta Holístico Certificado",
      "institution": "Academia de Bem-estar Integral",
      "year": 2018
    }
  ],
  "photo": { /* upload imagem */ }
}
```

#### 3 documentos "Service":
Usar os textos de `COPYWRITING_IMPLEMENTADO.md`

```json
{
  "title": "Sessão de Reiki Kundalini (Presencial)",
  "slug": "reiki-kundalini",
  "shortDescription": "Experiência imersiva de cura energética...",
  "price": 60,
  "duration": "60 min",
  "isPopular": true,
  "benefits": [
    "Liberta bloqueios emocionais...",
    "Reequilibra seu sistema energético..."
  ],
  "coverImage": { /* upload imagem */ }
}
```

#### 3 documentos "Testimonial":
```json
{
  "clientName": "Maria Silva",
  "testimonialText": "A sessão de Reiki com Rafaella foi transformadora...",
  "rating": 5,
  "featured": true,
  "publishedAt": "2025-01-15",
  "clientPhoto": { /* upload imagem */ }
}
```

### 3.3 Publicar documentos

No Sanity Studio:
- [ ] Publish todos os documentos
- [ ] Verificar em "Vision" que estão corretos
- [ ] Testar queries em "Query" tab:

```groq
*[_type == "service"] | order(isPopular desc)[0..2]
*[_type == "testimonial"] | order(featured desc)[0..2]
*[_type == "author"][0]
```

---

## 🌐 PASSO 4: Deploy em Vercel

### 4.1 Conectar Repositório GitHub

1. Ir a https://vercel.com
2. Fazer login com GitHub
3. Click "New Project"
4. Selecionar repositório `website-reiki`
5. Click "Import"

### 4.2 Configurar Variáveis de Ambiente

Na página de configuração:

1. Expandir "Environment Variables"
2. Adicionar:

```
NEXT_PUBLIC_SANITY_PROJECT_ID = abc123def456ghi789
NEXT_PUBLIC_SANITY_DATASET = production
```

3. Click "Deploy"

### 4.3 Esperar Deploy Completar

Vercel compilará o projeto. Depois de ~2 min:
- ✅ Deploy completo
- ✅ Website ao vivo em `https://website-reiki.vercel.app`
- ✅ URL no Vercel dashboard

---

## 🎯 PASSO 5: Configurar Custom Domain (Opcional)

### 5.1 Se tiver domínio próprio

**Exemplo:** `rafaellakally.com`

Na Vercel:
1. Project Settings → Domains
2. Adicionar domínio personalizado
3. Configurar DNS (instruções automáticas da Vercel)

---

## ✅ PASSO 6: Validação Pós-Deploy

### Checklist de Verificação:

- [ ] Website abre sem erros
- [ ] Hero section visível com correto
- [ ] Serviços carregam (de Sanity ou fallback)
- [ ] Testemunhos aparecem
- [ ] Responsividade OK (testar mobile)
- [ ] Imagens carregam corretamente
- [ ] Animações funcionam (botões, scroll)
- [ ] Header/Footer OK
- [ ] Links internos funcionam
- [ ] Nenhum console error (abrir DevTools - F12)

### Teste em Navegadores:

- [ ] Chrome/Edge (desktop)
- [ ] Firefox (desktop)
- [ ] Safari (desktop + iOS)
- [ ] Chrome Mobile (Android)

### Teste de Performance:

```
Abrir: https://pagespeed.web.dev/
Inserir URL do site
Verificar score (ideal > 90)
```

---

## 🔄 PASSO 7: Fluxo de Updates Futuro

### Quando precisar atualizar conteúdo:

**Opção A: Via Sanity Studio (Recomendado)**
1. Ir a Sanity Studio
2. Editar documentos (Service, Testimonial, Author)
3. Publish
4. Site atualiza automaticamente em ~1 min

**Opção B: Via GitHub (para código)**
1. Fazer changes no repositório
2. Push para `main` branch
3. Vercel detecta automaticamente
4. Deploy automático em ~2 min

---

## 🐛 TROUBLESHOOTING

### Erro: "Sanity projectId inválido"

```
Solução:
1. Verificar NEXT_PUBLIC_SANITY_PROJECT_ID está correto
2. Verificar em Vercel Environment Variables
3. Aguardar 5 min e fazer redeploy
4. Limpar cache do navegador (Ctrl+Shift+Del)
```

### Erro: "Imagens não carregam"

```
Solução:
1. Verificar que imagens foram upload no Sanity
2. Verificar URLs em Vision
3. Testar imagem URL diretamente no navegador
4. Se usar imagens externas, adicionar a next.config.ts:

images: {
  remotePatterns: [
    { hostname: "images.unsplash.com" },
    { hostname: "cdn.sanity.io" }
  ]
}
```

### Erro: "Dados não carregam"

```
Solução:
1. Verificar que projectId está correto
2. Verificar que dataset é "production"
3. Testar queries em Sanity Query tab
4. Se fallback aparecer, é ok (Sanity não configurado)
5. Verificar browser console (F12 → Console)
```

### Site muito lento

```
Solução:
1. Verificar em PageSpeed Insights
2. Otimizar imagens (WebP, comprimidas)
3. Considerar CDN para imagens
4. Verificar Vercel analytics
```

---

## 📊 Monitoramento Pós-Launch

### Recomendado instalar:

1. **Google Analytics**
   ```bash
   npm install next-gtag
   ```

2. **Sentry (error tracking)**
   ```bash
   npm install @sentry/nextjs
   ```

3. **Hotjar (user behavior)**
   Integração via script tag no header

---

## 📝 Documentação Útil

- Vercel Docs: https://vercel.com/docs
- Sanity Docs: https://www.sanity.io/docs
- Next.js Docs: https://nextjs.org/docs
- Tailwind: https://tailwindcss.com/docs

---

## 🎉 Pronto!

Após seguir estes passos:

✅ Site ao vivo em Vercel  
✅ Conteúdo gerido em Sanity CMS  
✅ Atualizações automáticas  
✅ Responsivo em todos devices  
✅ Performance otimizado  
✅ Profissional e pronto para negócio  

---

## 💬 Suporte

Se tiver dúvidas:
1. Verificar Vercel logs (Deployments tab)
2. Verificar Sanity error logs
3. Consultar browser DevTools (F12)
4. Testar em incognito mode (sem cache)

---

**Website Rafaella Kally — Pronto para o Mundo! 🌍✨**

*Deployment Guide v1.0*  
*20 Janeiro 2026*
