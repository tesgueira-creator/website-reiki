# 🎨 SANITY STUDIO - CONFIGURAÇÃO COMPLETA

**Data:** 22 de Janeiro de 2026  
**Projeto ID:** `q0bdmt5v`  
**Dataset:** `production`  
**Status:** ✅ **CONFIGURADO E PRONTO**

---

## 🚀 ACESSO AO STUDIO

O Sanity Studio está integrado no website Next.js e acessível em:

**URL Local:** http://localhost:3000/studio  
**URL Produção:** https://[seu-dominio.com]/studio

### Login
- Autenticação via **GitHub** (já configurado)
- Ou Google/Email conforme preferência

---

## 📁 SCHEMAS CRIADOS

### 1. Service (Serviços/Terapias)
**Path:** `src/sanity/schemaTypes/serviceType.ts`

**Campos Principais:**
- ✅ `title` - Nome do serviço
- ✅ `slug` - URL amigável (auto-gerado)
- ✅ `shortDescription` - Resumo para cards (160 chars)
- ✅ `fullDescription` - Descrição completa com rich text
- ✅ `category` - Filtros (reiki, leituras, holísticas, corpo, formação, pacotes)
- ✅ `duration` - Duração em minutos
- ✅ `price` - Preço em euros
- ✅ `benefits` - Lista de benefícios
- ✅ `whatToExpect` - Passos da sessão
- ✅ `featuredImage` - Imagem principal
- ✅ `gallery` - Galeria de fotos
- ✅ `featured` - Destacar na homepage
- ✅ `availableOnline` - Disponível remotamente
- ✅ `orderRank` - Ordem de exibição
- ✅ `seo` - Meta tags personalizados

**Preview:**
```
[Imagem] Reiki Kundalini
         reiki • €50
```

---

### 2. Testimonial (Depoimentos)
**Path:** `src/sanity/schemaTypes/testimonialType.ts`

**Campos Principais:**
- ✅ `clientName` - Nome do cliente
- ✅ `clientPhoto` - Foto do cliente (opcional)
- ✅ `testimonialText` - Texto do depoimento (50-500 chars)
- ✅ `rating` - Avaliação 1-5 estrelas
- ✅ `serviceName` - Nome do serviço experimentado
- ✅ `serviceReference` - Link para o serviço (opcional)
- ✅ `location` - Cidade/região
- ✅ `date` - Data do depoimento
- ✅ `featured` - Destacar na homepage
- ✅ `verified` - Marcador de autenticidade

**Preview:**
```
[Foto] Maria Silva
       ★★★★★ • Reiki Kundalini
```

---

### 3. Author (Perfil da Terapeuta)
**Path:** `src/sanity/schemaTypes/authorType.ts`

**Campos Principais:**
- ✅ `name` - Nome completo (Rafaella Kally)
- ✅ `slug` - URL slug
- ✅ `photo` - Foto profissional
- ✅ `shortBio` - Bio curta (200 chars)
- ✅ `fullBio` - Biografia completa com rich text
- ✅ `certifications` - Lista de certificações/cursos
- ✅ `specialties` - Áreas de especialização
- ✅ `yearsOfExperience` - Anos de experiência
- ✅ `contactInfo` - Email, telefone, WhatsApp, morada
- ✅ `socialMedia` - Instagram, Facebook, LinkedIn, YouTube
- ✅ `coverImage` - Imagem de capa (1200x600)
- ✅ `seo` - Meta tags personalizados

**Preview:**
```
[Foto] Rafaella Kally
       15 anos de experiência
```

---

## 🗂️ ESTRUTURA DE FICHEIROS

```
/workspaces/website-reiki/
├── sanity.cli.ts                    # Configuração CLI
├── sanity.config.ts                 # Configuração Studio
├── .env.local                       # Variáveis de ambiente
│
├── src/
│   ├── app/
│   │   └── studio/
│   │       └── [[...tool]]/
│   │           └── page.tsx         # Rota do Studio (/studio)
│   │
│   └── sanity/
│       ├── env.ts                   # Variáveis Sanity
│       ├── structure.ts             # Estrutura do Studio
│       ├── lib/
│       │   ├── client.ts            # Cliente Sanity
│       │   └── image.ts             # Image URL builder
│       │
│       ├── schemas/                 # Schemas antigos (JS)
│       │   ├── service.js
│       │   ├── testimonial.js
│       │   └── author.js
│       │
│       └── schemaTypes/             # ✅ Schemas TypeScript (ATIVOS)
│           ├── index.ts             # Export principal
│           ├── serviceType.ts       # Schema serviços
│           ├── testimonialType.ts   # Schema depoimentos
│           └── authorType.ts        # Schema terapeuta
```

---

## ⚙️ VARIÁVEIS DE AMBIENTE

### `.env.local` (Atual)
```env
NEXT_PUBLIC_SANITY_PROJECT_ID="q0bdmt5v"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2026-01-22"

NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_GA_MEASUREMENT_ID=""
NEXT_PUBLIC_WHATSAPP_NUMBER="+351"
```

### Para Produção (Vercel)
Adicionar no dashboard da Vercel:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` = `q0bdmt5v`
- `NEXT_PUBLIC_SANITY_DATASET` = `production`
- `NEXT_PUBLIC_SANITY_API_VERSION` = `2026-01-22`
- `NEXT_PUBLIC_SITE_URL` = `https://rafaellakally.com`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` = (ID do Google Analytics)
- `NEXT_PUBLIC_WHATSAPP_NUMBER` = (número com código país)

---

## 📝 COMO ADICIONAR CONTEÚDO

### 1. Aceder ao Studio
```
http://localhost:3000/studio
```

### 2. Criar Primeiro Serviço
1. Clicar em **"Service"** no menu lateral
2. Clicar em **"Create"** (ícone +)
3. Preencher campos:
   - **Título:** Reiki Kundalini
   - **Slug:** Clicar em "Generate" (auto-preenche)
   - **Descrição Curta:** "Energia vital para equilíbrio físico, mental e espiritual"
   - **Descrição Completa:** Adicionar blocos de texto rico
   - **Categoria:** Selecionar "Reiki & Energia"
   - **Duração:** 60
   - **Preço:** 50
   - **Benefícios:** Adicionar lista (ex: "Reduz stress", "Aumenta energia")
   - **Imagem:** Upload de foto
4. Clicar em **"Publish"**

### 3. Criar Primeiro Depoimento
1. Clicar em **"Testimonial"** no menu lateral
2. Clicar em **"Create"**
3. Preencher:
   - **Nome:** Maria Silva
   - **Foto:** Upload (opcional)
   - **Texto:** "Experiência transformadora! Senti uma paz profunda..."
   - **Avaliação:** 5 estrelas
   - **Serviço:** Reiki Kundalini
   - **Localização:** Lisboa
   - **Data:** Selecionar data
   - **Destacar:** ✓ (se quiser na homepage)
4. Clicar em **"Publish"**

### 4. Criar Perfil da Terapeuta
1. Clicar em **"Author"** → **"Create"**
2. Preencher:
   - **Nome:** Rafaella Kally
   - **Foto:** Upload foto profissional
   - **Bio Curta:** Resumo de 2-3 linhas
   - **Bio Completa:** História profissional detalhada
   - **Certificações:** Adicionar cursos/diplomas
   - **Especialidades:** Reiki, Tarot, Massagens, etc.
   - **Anos de Experiência:** 15
   - **Contactos:** Email, telefone, WhatsApp
   - **Redes Sociais:** URLs do Instagram, Facebook, etc.
3. Clicar em **"Publish"**

---

## 🔌 INTEGRAÇÃO COM NEXT.JS

### Queries GROQ
**Path:** `src/lib/sanity-queries.ts`

```typescript
// Buscar todos os serviços destacados
export const SERVICES_QUERY = `*[_type == "service" && featured == true] | order(orderRank asc) {
  _id,
  title,
  slug,
  shortDescription,
  category,
  duration,
  price,
  featuredImage,
  benefits
}`

// Buscar todos os depoimentos
export const TESTIMONIALS_QUERY = `*[_type == "testimonial" && featured == true] | order(date desc) {
  _id,
  clientName,
  clientPhoto,
  testimonialText,
  rating,
  serviceName,
  date
}`

// Buscar perfil da terapeuta
export const AUTHOR_QUERY = `*[_type == "author"][0] {
  name,
  photo,
  shortBio,
  fullBio,
  certifications,
  specialties,
  yearsOfExperience,
  contactInfo,
  socialMedia
}`
```

### Uso nos Componentes
```typescript
import { client } from '@/lib/sanity'
import { SERVICES_QUERY } from '@/lib/sanity-queries'

export default async function ServicesPage() {
  const services = await client.fetch(SERVICES_QUERY)
  
  return (
    <div>
      {services.map((service) => (
        <ServiceCard key={service._id} {...service} />
      ))}
    </div>
  )
}
```

---

## 🎨 CONFIGURAÇÃO DO STUDIO

### Cor do Tema
Editar `sanity.config.ts` para personalizar cores:
```typescript
export default defineConfig({
  // ...
  theme: {
    colors: {
      default: {
        primary: '#8B7355', // Tom terroso para Reiki
        accent: '#C9A868',  // Dourado suave
      }
    }
  }
})
```

### Estrutura de Navegação
**Path:** `src/sanity/structure.ts`

Personalizar ordenação e agrupamento de schemas no menu lateral.

---

## 📊 CORS & SEGURANÇA

### CORS Configurado
✅ `http://localhost:3000` (desenvolvimento)
✅ Adicionar domínio de produção via dashboard Sanity.io

### Tokens de API
Para queries server-side em produção, criar token:
1. Ir para [sanity.io/manage](https://www.sanity.io/manage)
2. Selecionar projeto `q0bdmt5v`
3. Settings → API → Tokens
4. Create token com permissões `Viewer` ou `Editor`
5. Adicionar ao `.env.local`:
   ```env
   SANITY_API_TOKEN="sk..."
   ```

---

## 🚀 DEPLOY DO STUDIO

### Opção 1: Integrado no Next.js (Atual)
✅ Studio acessível em `/studio` automaticamente
✅ Deploy junto com o site no Vercel
✅ SSO e autenticação Sanity geridos automaticamente

**Vantagens:**
- Uma única aplicação
- Mesma autenticação
- Mesma infraestrutura

### Opção 2: Studio Standalone
Se preferir Studio separado:
```bash
cd studio-rafaella-kally
npm run deploy
```

Escolher URL custom: `rafaella-kally.sanity.studio`

---

## 📚 PRÓXIMOS PASSOS

### Imediato (Hoje)
- [ ] Fazer login em http://localhost:3000/studio
- [ ] Criar 1 perfil de terapeuta (Author)
- [ ] Criar 3-5 serviços de exemplo
- [ ] Criar 2-3 depoimentos de teste

### Curto Prazo (Esta Semana)
- [ ] Upload de imagens profissionais
- [ ] Preencher todos os campos SEO
- [ ] Configurar ordem de exibição (orderRank)
- [ ] Marcar serviços destacados (featured)

### Médio Prazo (Próximo Mês)
- [ ] Adicionar imagens de alta qualidade
- [ ] Expandir descrições completas
- [ ] Coletar depoimentos reais de clientes
- [ ] Criar galeria de fotos para cada serviço

---

## 🆘 TROUBLESHOOTING

### Studio não carrega
```bash
# Limpar cache e reinstalar
rm -rf .next node_modules
npm install
npm run dev
```

### Erro "Missing environment variable"
Verificar que `.env.local` tem:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

### Imagens não aparecem
- Verificar CORS configurado para o domínio
- Confirmar que `@sanity/image-url` está instalado

### Schema não atualiza
```bash
# Reiniciar servidor
Ctrl+C
npm run dev
```

---

## 📖 RECURSOS

- **Documentação Sanity:** https://www.sanity.io/docs
- **GROQ Cheat Sheet:** https://www.sanity.io/docs/query-cheat-sheet
- **Schemas TypeScript:** https://www.sanity.io/docs/schema-types
- **Dashboard Projeto:** https://www.sanity.io/manage/personal/project/q0bdmt5v

---

## ✅ CONCLUSÃO

O Sanity Studio está **100% configurado** e pronto para uso!

**Próximo passo:** Aceder a http://localhost:3000/studio e começar a criar conteúdo! 🎉

---

**Configurado com sucesso** ✨
