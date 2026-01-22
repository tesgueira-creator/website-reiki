# 📋 SANITY CMS - GUIA COMPLETO

## 🎯 Visão Geral

O Sanity.io é um **CMS Headless** que permite à Rafaella gerenciar todo o conteúdo do website (serviços, depoimentos, bio, etc.) através de uma interface intuitiva.

## 🚀 Setup Inicial do Sanity

### Passo 1: Criar Projeto

1. Acesse [sanity.io/manage](https://sanity.io/manage)
2. Clique em "Create project"
3. Nome do projeto: `website-reiki`
4. Dataset: `production`
5. Copie o **Project ID**

### Passo 2: Configurar Variáveis de Ambiente

Crie `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=seu_project_id_aqui
NEXT_PUBLIC_SANITY_DATASET=production
```

### Passo 3: Verificar Conexão

```bash
npm run dev
# Acesse http://localhost:3000
# Se ver dados, a conexão está OK!
```

---

## 📊 Estrutura de Dados - Schemas

### 1️⃣ AUTHOR - Perfil da Terapeuta

#### Localização
`src/sanity/schemas/author.js`

#### Campos
| Campo                | Tipo      | Obrigatório | Descrição                                |
| -------------------- | --------- | ----------- | ---------------------------------------- |
| name                 | String    | ✅           | Nome profissional (ex: Rafaella Kally)   |
| slug                 | Slug      | ✅           | URL identificador                        |
| photo                | Image     | ✅           | Foto profissional (com hotspot)          |
| shortBio             | Text      | ✅           | Bio curta (max 200 chars)                |
| longBio              | Rich Text | ✅           | Bio completa (pode ter headings, listas) |
| specializations      | Tags      | ✅           | Áreas de atuação                         |
| certifications       | Array     | ❌           | Certificações (título, instituição, ano) |
| socialLinks          | Object    | ✅           | Links redes sociais                      |
| aboutValues          | Array     | ❌           | Pilares da filosofia                     |
| testimonialHighlight | Boolean   | ❌           | Mostrar depoimentos na página bio        |
| seo                  | Object    | ❌           | Meta description e keywords              |

#### Exemplo de Entrada
```json
{
  "name": "Rafaella Kally",
  "slug": "rafaella-kally",
  "shortBio": "Terapeuta holística especializada em Reiki Kundalini e espiritualidade",
  "specializations": ["Reiki Kundalini", "Cura Holística", "Meditação"],
  "socialLinks": {
    "instagram": "https://instagram.com/rafaellakally",
    "facebook": "https://facebook.com/rafaella.kally",
    "whatsapp": "+351912345678",
    "email": "rafaella@example.com"
  }
}
```

---

### 2️⃣ SERVICE - Serviços & Terapias

#### Localização
`src/sanity/schemas/service.js`

#### Campos
| Campo            | Tipo      | Obrigatório | Descrição                      |
| ---------------- | --------- | ----------- | ------------------------------ |
| title            | String    | ✅           | Nome da terapia/serviço        |
| slug             | Slug      | ✅           | URL identificador              |
| shortDescription | Text      | ✅           | Resumo (max 160 chars)         |
| fullDescription  | Rich Text | ✅           | Descrição completa com imagens |
| price            | Number    | ✅           | Preço em euros                 |
| duration         | String    | ✅           | Ex: "60 minutos", "1.5 horas"  |
| coverImage       | Image     | ✅           | Imagem principal do card       |
| benefits         | Tags      | ❌           | Lista de benefícios            |
| isPopular        | Boolean   | ❌           | Badge "Popular" no card        |
| seo              | Object    | ❌           | Meta description e keywords    |

#### Exemplo de Entrada
```json
{
  "title": "Reiki Kundalini",
  "slug": "reiki-kundalini",
  "shortDescription": "Desbloqueie a sua energia vital e desperte o seu potencial interior",
  "price": 80,
  "duration": "60 minutos",
  "benefits": ["Energia vital", "Equilíbrio emocional", "Clareza mental"],
  "isPopular": true
}
```

#### Tipos de Descrição
- **Rich Text com Blocks**: Pode adicionar:
  - Parágrafos (Normal, Heading 2, Heading 3, Quote)
  - Listas (Bullet, Numbered)
  - Formatação (Bold, Italic, Underline)
  - Links internos/externos
  - Imagens inline

---

### 3️⃣ TESTIMONIAL - Depoimentos de Clientes

#### Localização
`src/sanity/schemas/testimonial.js`

#### Campos
| Campo           | Tipo      | Obrigatório | Descrição                     |
| --------------- | --------- | ----------- | ----------------------------- |
| clientName      | String    | ✅           | Nome completo do cliente      |
| clientPhoto     | Image     | ❌           | Foto do cliente (avatar)      |
| testimonialText | Text      | ✅           | Depoimento (50-500 chars)     |
| rating          | Number    | ✅           | Classificação 1-5 estrelas    |
| service         | Reference | ❌           | Link para serviço relacionado |
| publishedAt     | DateTime  | ✅           | Data de publicação (auto)     |
| featured        | Boolean   | ❌           | Destaque na homepage          |

#### Exemplo de Entrada
```json
{
  "clientName": "Maria Silva",
  "testimonialText": "A Rafaella transformou completamente a minha vida. Sinto-me mais equilibrada e com uma conexão espiritual muito profunda.",
  "rating": 5,
  "service": "reiki-kundalini",
  "featured": true,
  "publishedAt": "2026-01-20T10:00:00Z"
}
```

---

## 🎨 Como Adicionar Conteúdo

### Via Studio (Interface Gráfica)

1. Acesse [seu-projeto.sanity.studio](https://your-project.sanity.studio)
2. Login com credenciais
3. Selecione o tipo de documento (Author, Service, Testimonial)
4. Clique "Create new"
5. Preencha os campos
6. Clique "Publish"

### Via API (Programático)

```javascript
import { client } from "@/lib/sanity";

// Criar novo serviço
const newService = await client.create({
  _type: "service",
  title: "Nova Terapia",
  slug: { current: "nova-terapia" },
  price: 75,
  duration: "60 minutos"
});

// Atualizar existente
await client
  .patch("document-id")
  .set({ title: "Título Atualizado" })
  .commit();

// Deletar
await client.delete("document-id");
```

---

## 🔍 Consultas GROQ

### Buscar Todos os Serviços

```groq
*[_type == "service"] | order(isPopular desc, _createdAt desc) {
  _id,
  title,
  slug,
  price,
  duration,
  shortDescription,
  "coverImage": coverImage.asset->url,
  isPopular,
  benefits
}
```

### Buscar Serviço por Slug

```groq
*[_type == "service" && slug.current == "reiki-kundalini"][0] {
  _id,
  title,
  fullDescription,
  price,
  duration,
  benefits[],
  "coverImage": coverImage.asset->url
}
```

### Buscar Todos os Depoimentos

```groq
*[_type == "testimonial"] | order(publishedAt desc) {
  _id,
  clientName,
  testimonialText,
  rating,
  featured,
  "clientPhoto": clientPhoto.asset->url,
  "service": service->title
}
```

### Buscar Depoimentos em Destaque

```groq
*[_type == "testimonial" && featured == true] | order(_createdAt desc)[0...3] {
  clientName,
  testimonialText,
  rating,
  "clientPhoto": clientPhoto.asset->url
}
```

### Buscar Perfil da Terapeuta

```groq
*[_type == "author"][0] {
  name,
  shortBio,
  longBio,
  specializations[],
  "photo": photo.asset->url,
  socialLinks,
  certifications[]
}
```

---

## 🖼️ Gerenciamento de Imagens

### Upload de Imagens

1. No Studio, clique em campo de imagem
2. Clique "Upload"
3. Selecione arquivo (JPG, PNG, WebP)
4. Espere upload completar

### Otimizações de Imagem

- **Tamanho**: Comprima a ~2MB
- **Dimensões**: 
  - Cover images: 1200x800px
  - Avatares: 400x400px
  - Fotos: 1500x2000px
- **Formato**: WebP é ideal

### Hotspot (Área Focal)

1. Após upload, clique "Edit"
2. Ajuste o círculo (hotspot) na área importante
3. Use para zoom em mobile

---

## 🔐 Permissões & Segurança

### Roles (Papéis)

- **Admin**: Acesso total ao Studio
- **Editor**: Criar/editar documentos
- **Viewer**: Visualizar apenas

### Configurar Acesso

1. Vá para [sanity.io/manage](https://sanity.io/manage)
2. Selecione projeto
3. Aba "Members"
4. Adicione email e escolha role

---

## ⚙️ Configurações Avançadas

### Estrutura de Queries

```typescript
// Em componentes, buscar dados assim:
import { client } from "@/lib/sanity";

const data = await client.fetch(`
  *[_type == "service"] {
    _id,
    title,
    slug
  }
`);
```

### Caching

```typescript
// Revalidar dados a cada 1 hora
export const revalidate = 3600;

async function getServices() {
  return await client.fetch('*[_type == "service"]');
}
```

### Webhook (Notificações)

Pode configurar webhooks para:
- Revalidar página quando conteúdo muda
- Enviar emails quando novo depoimento é publicado
- Atualizar cache automaticamente

---

## 📱 Aplicativo Móvel

O Sanity tem app mobile para iOS/Android para gerenciar conteúdo on-the-go:

1. Baixe "Sanity: Collaborate" app
2. Login
3. Edite conteúdo mesmo sem desktop

---

## 🆘 Troubleshooting

### "Projeto não encontrado"
- ✅ Verifique `NEXT_PUBLIC_SANITY_PROJECT_ID` em `.env.local`
- ✅ Copie exatamente do Sanity dashboard

### "Imagens não carregam"
- ✅ Verifique se imagem foi publicada
- ✅ Verifique conexão internet
- ✅ Limpe cache do browser

### "Dados não aparecem"
- ✅ Publicou os documentos?
- ✅ Verifica query GROQ está correta?
- ✅ Verifique `_type` está correto

### "Erro de permissões"
- ✅ Verifique API token em variáveis de ambiente
- ✅ Verifique role do usuário no Studio

---

## 📚 Recursos

- [Sanity Docs](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Image API](https://www.sanity.io/docs/image-api)
- [Studio Documentation](https://www.sanity.io/docs/studio)

---

**Última Atualização**: Janeiro 2026
