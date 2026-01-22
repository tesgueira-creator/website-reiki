# 🔧 QUERIES GROQ IMPLEMENTADAS

## Arquivo: `src/lib/sanity-queries.ts`

Função assíncrona centralizada para buscar dados da homepage com tratamento robusto de erros.

---

## 📊 QUERIES GROQ DETALHADAS

### 1️⃣ Query de Serviços (TOP 3)

```groq
*[_type == "service"] | order(isPopular desc, _createdAt desc)[0..2] {
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  price,
  duration,
  isPopular,
  benefits,
  "image": coverImage.asset->url
}
```

**O que faz:**
- Busca todos os documentos do tipo "service"
- Ordena por: `isPopular` (popular primeiro), depois `_createdAt` (mais novos)
- Retorna apenas os primeiros 3 resultados (índices 0, 1, 2)
- Mapeia campo slug para `slug.current`
- Mapeia imagem para URL completa via `.asset->url`

**Resultado esperado:**
```json
[
  {
    "_id": "abc123",
    "title": "Sessão de Reiki Kundalini (Presencial)",
    "slug": "reiki-kundalini",
    "shortDescription": "Experiência imersiva...",
    "price": 60,
    "duration": "60 min",
    "isPopular": true,
    "benefits": ["Liberta bloqueios...", "Reequilibra seu sistema..."],
    "image": "https://cdn.sanity.io/images/..."
  },
  ...
]
```

---

### 2️⃣ Query de Testemunhos (TOP 3)

```groq
*[_type == "testimonial"] | order(featured desc, publishedAt desc)[0..2] {
  _id,
  clientName,
  testimonialText,
  rating,
  featured,
  "image": clientPhoto.asset->url
}
```

**O que faz:**
- Busca todos os documentos do tipo "testimonial"
- Ordena por: `featured` (destacados primeiro), depois `publishedAt` (mais recentes)
- Retorna apenas os primeiros 3 resultados
- Mapeia foto para URL completa

**Resultado esperado:**
```json
[
  {
    "_id": "xyz789",
    "clientName": "Maria Silva",
    "testimonialText": "A sessão foi transformadora...",
    "rating": 5,
    "featured": true,
    "image": "https://cdn.sanity.io/images/..."
  },
  ...
]
```

---

### 3️⃣ Query do Autor (Terapeuta Principal)

```groq
*[_type == "author"][0] {
  name,
  shortBio,
  longBio,
  specializations,
  certifications[]{
    title,
    institution,
    year
  },
  "image": photo.asset->url
}
```

**O que faz:**
- Busca o primeiro (e único) documento de tipo "author"
- Retorna todos os campos da bio
- Expande certificações com seus subfields
- Mapeia foto para URL completa

**Resultado esperado:**
```json
{
  "name": "Rafaella Kally",
  "shortBio": "Terapeuta holística especializada...",
  "longBio": "Sou Rafaella Kally...",
  "specializations": ["Reiki Kundalini", "Limpeza Energética", ...],
  "certifications": [
    {
      "title": "Mestrado em Reiki Kundalini",
      "institution": "Instituto Energia Pura",
      "year": 2020
    }
  ],
  "image": "https://cdn.sanity.io/images/..."
}
```

---

## 🛡️ Tratamento de Erros

### Validações Implementadas:

1. **Check do projectId**
   ```typescript
   if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 
       process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "replace_me") {
     // Usa fallback mockado
   }
   ```

2. **Promise.all com catch individual**
   ```typescript
   const [servicesData, testimonialsData, authorData] = await Promise.all([
     client.fetch(SERVICES_QUERY).catch(err => {
       console.error("Erro ao buscar serviços:", err);
       return null;
     }),
     // ... outras queries
   ]);
   ```

3. **Verificação de dados vazios**
   ```typescript
   const finalServices = servicesData && servicesData.length > 0 
     ? servicesData 
     : fallbackServices;
   ```

4. **Fallback Final em Caso de Erro Total**
   ```typescript
   return {
     services: fallbackServices,
     testimonials: fallbackTestimonials,
     author: fallbackAuthor,
     isFromSanity: false,
     error: "Erro ao conectar ao Sanity..."
   };
   ```

---

## 📋 Tipos TypeScript Exportados

```typescript
export interface Service {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  price: number;
  duration: string;
  isPopular: boolean;
  benefits: string[];
  image?: string;
}

export interface Testimonial {
  _id: string;
  clientName: string;
  testimonialText: string;
  rating: number;
  featured?: boolean;
  image?: string;
}

export interface Author {
  name: string;
  shortBio: string;
  longBio: string;
  specializations: string[];
  certifications: Array<{
    title: string;
    institution: string;
    year: number;
  }>;
  image?: string;
}
```

---

## 🚀 Como Usar no Componente

```typescript
import { fetchHomepageData } from "@/lib/sanity-queries";

export default function Home() {
  const [services, setServices] = useState<Service[]>(FALLBACK_SERVICES);
  
  useEffect(() => {
    async function fetchData() {
      const data = await fetchHomepageData(
        FALLBACK_SERVICES,
        FALLBACK_TESTIMONIALS,
        FALLBACK_AUTHOR
      );
      
      setServices(data.services);
      setTestimonials(data.testimonials);
      setAuthor(data.author);
      
      if (data.isFromSanity) {
        console.log("✅ Dados do Sanity carregados!");
      } else {
        console.log("ℹ️  Usando fallback mockado:", data.error);
      }
    }
    
    fetchData();
  }, []);
}
```

---

## 📊 Logging e Debugging

### Mensagens Console Implementadas:

```typescript
// Sanity não configurado
"⚠️  Sanity não está configurado. Usando dados mockados de fallback."

// Erro em query específica
"❌ Erro ao buscar serviços: [error message]"

// Nenhum dado encontrado
"⚠️  Nenhum dado encontrado no Sanity. Usando dados mockados."

// Erro crítico
"❌ Erro crítico ao buscar dados do Sanity: [error message]"
```

Estas mensagens ajudam no debugging em produção sem expor erros sensíveis.

---

## ✅ Checklist de Implementação

- ✅ Função `fetchHomepageData` centralizada e reutilizável
- ✅ Queries GROQ otimizadas (com índices, filtros, ordenação)
- ✅ Tratamento de erros em 3 níveis (config, query, final)
- ✅ Fallback elegante com dados mockados
- ✅ TypeScript types completos e tipados
- ✅ Logging estruturado para debugging
- ✅ Comentários JSDoc explicativos
- ✅ Integração na página homepage sem quebra

---

## 🔄 Fluxo de Dados

```
┌─────────────────────────────────────────┐
│   Home Page (page.tsx)                  │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│   useEffect: fetchData()                │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│   fetchHomepageData() (sanity-queries)  │
└───────────────┬─────────────────────────┘
                │
        ┌───────┴───────┐
        │               │
        ▼               ▼
   ✅ Sanity?    ❌ Fallback?
   └───┬──────────────┬───┘
       │              │
       ▼              ▼
   [Promise.all]  [Return Mock]
   3 Queries      [Logged Error]
   
   ├─ Services Query
   ├─ Testimonials Query
   └─ Author Query
   
   └─ Error Handling para cada
   └─ Validação de dados
   └─ Return final com flag
```

---

## 📝 Schemas do Sanity Necessários

Para que as queries funcionem corretamente, você precisa ter estes schemas configurados no Sanity:

### Service Schema
```javascript
{
  name: 'service',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug' },
    { name: 'shortDescription', type: 'text' },
    { name: 'price', type: 'number' },
    { name: 'duration', type: 'string' },
    { name: 'isPopular', type: 'boolean' },
    { name: 'benefits', type: 'array', of: [{ type: 'string' }] },
    { name: 'coverImage', type: 'image' }
  ]
}
```

### Testimonial Schema
```javascript
{
  name: 'testimonial',
  type: 'document',
  fields: [
    { name: 'clientName', type: 'string' },
    { name: 'testimonialText', type: 'text' },
    { name: 'rating', type: 'number' },
    { name: 'featured', type: 'boolean' },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'clientPhoto', type: 'image' }
  ]
}
```

### Author Schema
```javascript
{
  name: 'author',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'shortBio', type: 'text' },
    { name: 'longBio', type: 'text' },
    { name: 'specializations', type: 'array', of: [{ type: 'string' }] },
    { 
      name: 'certifications', 
      type: 'array', 
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string' },
          { name: 'institution', type: 'string' },
          { name: 'year', type: 'number' }
        ]
      }]
    },
    { name: 'photo', type: 'image' }
  ]
}
```

---

✨ **Queries GROQ Completas e Documentadas!**
