# 🔧 GUIA TÉCNICO AVANÇADO - Website Rafaella Kally

## 📚 Índice
1. [Arquitetura do Projeto](#arquitetura)
2. [Componentes Reutilizáveis](#componentes)
3. [Sistema de Cores](#cores)
4. [Sanity CMS - Guia Completo](#sanity)
5. [Otimizações de Performance](#performance)
6. [Deployment](#deployment)

---

## 🏗️ Arquitetura do Projeto {#arquitetura}

### Stack Tecnológico

```
Frontend:
├── Next.js 15 (App Router, SSR/SSG)
├── React 19
├── TypeScript 5
├── Tailwind CSS 4
├── Framer Motion 12
└── Lucide React (Icons)

CMS:
└── Sanity.io

Deployment:
└── Vercel (Recomendado)
```

### Princípios de Arquitetura

1. **Component-Based**: Todos os elementos são componentes reutilizáveis
2. **Server Components**: Maximizar uso de React Server Components
3. **Type Safety**: TypeScript em todo o projeto
4. **Design Tokens**: Sistema de cores/tipografia centralizado
5. **Mobile-First**: Responsive design começando no mobile

---

## 🧩 Componentes Reutilizáveis {#componentes}

### Layout Components

#### Header.tsx
```typescript
// Navbar com efeito glass ao scroll
// Features:
// - Menu mobile responsivo
// - Animação ao entrar
// - Estado de scroll (glass effect)
// - Links de navegação dinâmicos

import { Header } from "@/components/layout/Header";

<Header />
```

#### Footer.tsx
```typescript
// Rodapé com múltiplas secções
// Features:
// - Links organizados por categoria
// - Contacto e redes sociais
// - Copyright automático
// - SEO-friendly

import { Footer } from "@/components/layout/Footer";

<Footer />
```

### Hero Sections

#### Hero.tsx
```typescript
// Secção hero da homepage
// Features:
// - Animações Framer Motion
// - Blurred background decorativo
// - CTA buttons primário e secundário
// - Responsivo

import { Hero } from "@/components/layout/Hero";

<Hero />
```

#### AboutHeroSection.tsx
```typescript
// Hero customizado para página "Sobre"
// Features:
// - Subtítulo e descrição
// - Animação ao scroll
// - Estilo clean e minimalista

import { AboutHeroSection } from "@/components/layout/AboutHeroSection";

<AboutHeroSection />
```

### Content Sections

#### ServicesSection.tsx
```typescript
// Grid de serviços com 6 cards
// Features:
// - Cards com hover animations
// - Badge "Popular" para destaques
// - Preço e duração visíveis
// - Links para detalhe de cada serviço

import { ServicesSection } from "@/components/layout/ServicesSection";

<ServicesSection />
```

#### TestimonialsSection.tsx
```typescript
// Grid de depoimentos
// Features:
// - Classificação por estrelas
// - Avatar do cliente
// - Staggered animations
// - Link para mais depoimentos

import { TestimonialsSection } from "@/components/layout/TestimonialsSection";

<TestimonialsSection />
```

#### ValuesSection.tsx
```typescript
// Grid de 4 pilares principais
// Features:
// - Ícones Lucide React
// - Animações ao scroll
// - Layout responsivo
// - Hover effects

import { ValuesSection } from "@/components/layout/ValuesSection";

<ValuesSection />
```

#### CTASection.tsx
```typescript
// Call-to-action para agendamento
// Features:
// - Dois buttons (primário + secundário)
// - Contacto destacado
// - Fundo com gradient subtil

import { CTASection } from "@/components/layout/CTASection";

<CTASection />
```

### UI Components (Shadcn)

#### Button.tsx
```typescript
// Botão customizado (Shadcn/ui)
// Variantes: default, destructive, outline, secondary, ghost, link
// Tamanhos: sm, default, lg

import { Button } from "@/components/ui/button";

<Button variant="outline">Clique aqui</Button>
```

#### ServiceCard.tsx
```typescript
// Card de serviço individual
// Props:
// - title: string
// - description: string
// - duration: string
// - price: number
// - image?: string
// - slug?: string
// - isPopular?: boolean

import { ServiceCard } from "@/components/ui/ServiceCard";

<ServiceCard
  title="Reiki Kundalini"
  description="..."
  duration="60 minutos"
  price={80}
  isPopular={true}
/>
```

#### TestimonialCard.tsx
```typescript
// Card de depoimento individual
// Props:
// - name: string
// - text: string
// - rating: number (1-5)
// - image?: string

import { TestimonialCard } from "@/components/ui/TestimonialCard";

<TestimonialCard
  name="Maria Silva"
  text="A Rafaella transformou minha vida..."
  rating={5}
/>
```

#### SectionTitle.tsx
```typescript
// Título reutilizável para secções
// Props:
// - label?: string (badge pequena)
// - title: string (heading principal)
// - subtitle?: string
// - centered?: boolean

import { SectionTitle } from "@/components/ui/SectionTitle";

<SectionTitle
  label="Ofertas"
  title="Serviços & Terapias"
  subtitle="Abordagens personalizadas..."
  centered={true}
/>
```

---

## 🎨 Sistema de Cores {#cores}

### Variáveis CSS

Definidas em `src/app/globals.css`:

```css
:root {
  /* Primary Colors */
  --primary: #C5A059;              /* Dourado Muted */
  --primary-light: #D4B896;        /* Dourado Light */
  --primary-dark: #A67E3A;         /* Dourado Dark */

  /* Secondary Colors */
  --secondary: #8A9A5B;            /* Verde Sálvia */
  --secondary-light: #A5B87A;      /* Verde Light */
  --secondary-dark: #6F7E47;       /* Verde Dark */

  /* Backgrounds & Text */
  --background: #F9F9F9;           /* Creme */
  --foreground: #333333;           /* Texto Dark */
  --text-main: #333333;
  --text-secondary: #666666;
  --text-muted: #999999;

  /* Semânticas */
  --success: #4CAF50;
  --warning: #FF9800;
  --error: #F44336;
  --info: #2196F3;

  /* Borders & Shadows */
  --border: #E5E5E5;
  --muted: #F0F0F0;
  --muted-foreground: #8B8B8B;
}
```

### Utilitários Tailwind

```html
<!-- Cores -->
<div class="bg-primary text-white">Dourado</div>
<div class="bg-secondary text-white">Verde</div>
<div class="text-primary">Texto Dourado</div>

<!-- Variações -->
<button class="bg-primary hover:bg-primary-dark">Botão</button>

<!-- Gradients -->
<div class="bg-gradient-to-r from-primary to-secondary">Gradient</div>
```

### Glass Effect

```css
/* Classe customizada em globals.css */
.glass-effect {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
}

.glass-effect-gold {
  background-color: rgba(197, 160, 89, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(197, 160, 89, 0.2);
}
```

---

## 🗂️ Sanity CMS - Guia Completo {#sanity}

### Setup Inicial

```bash
# 1. Criar projeto em sanity.io
# 2. Copiar Project ID e Dataset
# 3. Adicionar em .env.local:
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
```

### Consultas GROQ

#### Buscar Todos os Serviços
```groq
*[_type == "service"] | order(isPopular desc) {
  _id,
  title,
  slug,
  price,
  duration,
  coverImage,
  shortDescription,
  isPopular
}
```

#### Buscar Serviço Específico
```groq
*[_type == "service" && slug.current == "reiki-kundalini"][0] {
  _id,
  title,
  fullDescription,
  price,
  duration,
  benefits[]
}
```

#### Buscar Perfil da Terapeuta
```groq
*[_type == "author"][0] {
  name,
  shortBio,
  photo,
  socialLinks,
  specializations[]
}
```

#### Buscar Depoimentos em Destaque
```groq
*[_type == "testimonial" && featured == true] | order(publishedAt desc) {
  clientName,
  testimonialText,
  rating,
  clientPhoto
}
```

### Componente com Dados do Sanity

```typescript
import { client } from "@/lib/sanity";

async function ServicesGrid() {
  const services = await client.fetch(`
    *[_type == "service"] {
      _id,
      title,
      slug,
      price,
      duration,
      isPopular
    }
  `);

  return (
    <div className="grid gap-8">
      {services.map(service => (
        <ServiceCard key={service._id} {...service} />
      ))}
    </div>
  );
}
```

---

## ⚡ Otimizações de Performance {#performance}

### Image Optimization

```typescript
import Image from "next/image";

// ✅ Correto
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
/>

// ❌ Evitar
<img src="/hero.jpg" alt="Hero" />
```

### Lazy Loading

```typescript
// Componentes lazy carregam ao scroll
const ServicesSection = dynamic(() => 
  import("@/components/layout/ServicesSection"),
  { loading: () => <Skeleton /> }
);
```

### Code Splitting

```typescript
// Pages são automaticamente code-split em Next.js
// Cada rota carrega apenas o JS necessário
```

### Font Optimization

```css
/* Usar font-display para evitar FOUT */
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap");
```

### Metadados & SEO

```typescript
// Em cada página
export const metadata = {
  title: "Serviços | Rafaella Kally",
  description: "Conheça os serviços de terapia holística...",
  openGraph: {
    title: "Serviços",
    description: "...",
    images: ["/og-image.jpg"],
  },
};
```

---

## 🚀 Deployment {#deployment}

### Vercel (Recomendado)

```bash
# 1. Connect GitHub repo
# 2. Configure variáveis de ambiente
NEXT_PUBLIC_SANITY_PROJECT_ID=...
# 3. Deploy automático ao push em main
```

### Ambiente de Produção

```bash
# Build otimizado
npm run build

# Start em produção
npm run start

# Ou com PM2
pm2 start npm --name "website-reiki" -- start
```

### Environment Checklist

- [ ] `.env.local` configurado
- [ ] Sanity API configurada
- [ ] Images otimizadas
- [ ] Meta tags em todas as páginas
- [ ] Formulário de contacto testado
- [ ] Mobile responsivo verificado
- [ ] Lighthouse score 90+
- [ ] Analytics configurado

---

## 📖 Recursos Adicionais

- [Next.js 15 Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Sanity CMS Docs](https://www.sanity.io/docs)
- [Shadcn/ui Docs](https://ui.shadcn.com/)

---

**Última Atualização**: Janeiro 2026
