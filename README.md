# 🌟 Rafaella Kally - Website Profissional de Terapeuta Holística

Website moderno e premium para **Rafaella Kally**, especialista em **Reiki Kundalini**, **Terapias Holísticas** e **Espiritualidade**.

## 📋 Visão Geral do Projeto

Este é um **website de alta qualidade** construído com as tecnologias mais modernas, mantendo uma **estética minimalista, premium e serena** que reflete o espírito do trabalho terapêutico.

### ✨ Características Principais

- ✅ **Next.js 15** com App Router (SSR/SSG)
- ✅ **Tailwind CSS v4** com sistema de cores personalizado
- ✅ **Shadcn/ui** para componentes reutilizáveis
- ✅ **Framer Motion** para animações suaves
- ✅ **Sanity.io CMS** para gerenciamento de conteúdo
- ✅ **TypeScript** para segurança de tipos
- ✅ **Responsive Design** - Mobile First
- ✅ **Performance Otimizada** - Next.js 16 Turbopack
- ✅ **SEO Pronto** - Metadados dinâmicos

## 🎨 Design & Paleta de Cores

### Cores Corporativas
- **Creme (#F9F9F9)** - Background principal
- **Dourado Muted (#C5A059)** - Primary (Buttons, Links)
- **Verde Sálvia (#8A9A5B)** - Secondary (Accents)
- **Cinzento Escuro (#333333)** - Texto principal

### Tipografia
- **Headings**: Playfair Display (Serif)
- **Body**: Montserrat (Sans-Serif)

### Efeitos Especiais
- `.glass-effect` - Efeito vidro com blur para navbar
- `.text-gradient` - Gradient de texto
- Animações fluidas com Framer Motion

## 📁 Estrutura do Projeto

```
website-reiki/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Layout root com Header/Footer
│   │   ├── page.tsx                # Home (Hero, Serviços, Depoimentos, etc)
│   │   ├── globals.css             # Estilos globais e variáveis CSS
│   │   ├── servicos/
│   │   │   └── page.tsx            # Catálogo completo de serviços
│   │   ├── sobre/
│   │   │   └── page.tsx            # Bio, formações e filosofia
│   │   ├── depoimentos/
│   │   │   └── page.tsx            # Grid de depoimentos de clientes
│   │   └── contacto/
│   │       └── page.tsx            # Formulário de contacto
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Navbar com menu responsivo
│   │   │   ├── Footer.tsx          # Rodapé com links
│   │   │   ├── Hero.tsx            # Secção hero animada
│   │   │   ├── ServicesSection.tsx # Grid de serviços
│   │   │   ├── TestimonialsSection.tsx # Depoimentos
│   │   │   ├── ValuesSection.tsx   # Valores e filosofia
│   │   │   ├── AboutHeroSection.tsx # Hero da página sobre
│   │   │   └── CTASection.tsx      # Call-to-action
│   │   └── ui/
│   │       ├── button.tsx          # Botão Shadcn
│   │       ├── ServiceCard.tsx     # Card de serviço
│   │       ├── TestimonialCard.tsx # Card de depoimento
│   │       └── SectionTitle.tsx    # Título de secção reutilizável
│   │
│   ├── lib/
│   │   ├── sanity.ts               # Cliente Sanity CMS
│   │   └── utils.ts                # Utilitários (cn, etc)
│   │
│   └── sanity/
│       └── schemas/
│           ├── author.js           # Schema do perfil da terapeuta
│           ├── service.js          # Schema dos serviços
│           └── testimonial.js      # Schema dos depoimentos
│
├── public/                         # Assets estáticos
├── tailwind.config.ts              # Configuração Tailwind
├── tsconfig.json                   # Configuração TypeScript
├── next.config.ts                  # Configuração Next.js
├── package.json
└── .env.local.example              # Template variáveis de ambiente
```

## 🚀 Guia de Instalação & Configuração

### Pré-requisitos
- **Node.js 18+** (recomendado 20 LTS)
- **npm** ou **yarn**
- **Conta Sanity.io** (opcional, para CMS)

### 1. Instalação Inicial

```bash
# Clone o repositório
git clone https://github.com/tesgueira-creator/website-reiki.git
cd website-reiki

# Instale as dependências
npm install
```

### 2. Configuração de Variáveis de Ambiente

Crie um ficheiro `.env.local` na raiz do projeto:

```bash
cp .env.local.example .env.local
```

Depois edite `.env.local` com seus valores:

```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=seu_project_id_aqui
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Desenvolvimento Local

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# O site estará disponível em http://localhost:3000
```

### 4. Build para Produção

```bash
# Construir versão otimizada
npm run build

# Testar a build localmente
npm run start
```

## 🎯 Páginas Disponíveis

| Página      | Rota           | Descrição                            |
| ----------- | -------------- | ------------------------------------ |
| Home        | `/`            | Hero, serviços, depoimentos, valores |
| Serviços    | `/servicos`    | Catálogo completo com FAQ            |
| Sobre       | `/sobre`       | Bio, formações, filosofia            |
| Depoimentos | `/depoimentos` | Grid de depoimentos                  |
| Contacto    | `/contacto`    | Formulário de contacto               |

## 🗂️ Sanity CMS - Schemas

### author.js - Perfil da Terapeuta
```javascript
export default {
  name: "author",
  title: "Perfil da Terapeuta",
  fields: [
    { name: "name", type: "string" },
    { name: "photo", type: "image" },
    { name: "shortBio", type: "text" },
    { name: "longBio", type: "array" },
    { name: "specializations", type: "array" },
    { name: "certifications", type: "array" },
    { name: "socialLinks", type: "object" }
  ]
}
```

### service.js - Serviços
```javascript
export default {
  name: "service",
  title: "Serviço / Terapia",
  fields: [
    { name: "title", type: "string" },
    { name: "slug", type: "slug" },
    { name: "shortDescription", type: "text" },
    { name: "fullDescription", type: "array" },
    { name: "price", type: "number" },
    { name: "duration", type: "string" },
    { name: "coverImage", type: "image" },
    { name: "benefits", type: "array" },
    { name: "isPopular", type: "boolean" }
  ]
}
```

### testimonial.js - Depoimentos
```javascript
export default {
  name: "testimonial",
  title: "Depoimento",
  fields: [
    { name: "clientName", type: "string" },
    { name: "clientPhoto", type: "image" },
    { name: "testimonialText", type: "text" },
    { name: "rating", type: "number" },
    { name: "service", type: "reference" },
    { name: "featured", type: "boolean" }
  ]
}
```

## 🌐 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Outras Plataformas
- Netlify
- AWS Amplify
- GitHub Pages
- DigitalOcean

## 📊 Performance & SEO

✅ **Lighthouse Score**: 90+
✅ **Core Web Vitals**: Otimizados
✅ **Meta Tags**: Dinâmicos
✅ **Open Graph**: Configurado
✅ **Responsive**: Mobile-first

## 💡 Customização

### Alterar Cores
Edite `src/app/globals.css`:
```css
:root {
  --primary: #C5A059;
  --secondary: #8A9A5B;
  --background: #F9F9F9;
}
```

### Adicionar Novas Secções
1. Crie componente em `src/components/layout/`
2. Importe em `src/app/page.tsx`
3. Customize com Framer Motion

## 📞 Contacto

**Rafaella Kally**
- 📧 Email: rafaella@example.com
- 📱 WhatsApp: +351 91 234 5678

## 📄 Licença

© 2026 Rafaella Kally. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para transformação espiritual**
