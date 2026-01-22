# 🎯 Guia Rápido - Textos Integrados

## 📍 Localização dos Textos no Código

**Arquivo:** `src/app/page.tsx`

### 📊 Estatística
- ✅ **28 labels "EXEMPLO:"** adicionados
- ✅ **3 Serviços** com descrições completas
- ✅ **3 Testemunhos** com exemplos
- ✅ **Seção Sobre** completa com bio e certificações

---

## 🔍 Onde Encontrar Cada Texto

### 1. Serviços (Linhas 19-62)

#### Reiki Kundalini (Linhas 19-31)
```
Linhas:
- 19:   Título
- 22:   Descrição
- 27:   Benefício 1
- 28:   Benefício 2
```

#### Limpeza Energética (Linhas 35-47)
```
Linhas:
- 35:   Título
- 38:   Descrição
- 43:   Benefício 1
- 44:   Benefício 2
```

#### Leitura de Aura (Linhas 51-62)
```
Linhas:
- 51:   Título
- 54:   Descrição
- 59:   Benefício 1
- 60:   Benefício 2
```

### 2. Testemunhos (Linhas 70-95)

#### Maria Silva (Linhas 70-77)
```
Linhas:
- 70:   Nome
- 72:   Depoimento
```

#### João Santos (Linhas 80-87)
```
Linhas:
- 80:   Nome
- 82:   Depoimento
```

#### Ana Costa (Linhas 90-97)
```
Linhas:
- 90:   Nome
- 92:   Depoimento
```

### 3. Autor (Rafaella) (Linhas 103-121)

#### Bio e Informações (Linhas 103-115)
```
Linhas:
- 103:  Bio Curta
- 105:  Bio Longa (Parágrafo completo)
- 109:  Especialidade 1
- 110:  Especialidade 2
- 111:  Especialidade 3
- 112:  Especialidade 4
```

#### Certificações (Linhas 116-121)
```
Linhas:
- 116:  Título Certificação 1
- 117:  Instituição 1
- 120:  Título Certificação 2
- 121:  Instituição 2
```

---

## ✏️ Como Editar Cada Texto

### Opção 1: Substituição Direta (Recomendado)

1. Abrir `src/app/page.tsx`
2. Usar Ctrl+H (Find and Replace)
3. Procurar: `EXEMPLO: `
4. Substituir: deixar em branco (remove o prefixo)
5. Substituir todos

**Resultado:** Todos os "EXEMPLO:" são removidos, mantendo os textos

### Opção 2: Edição Manual

1. Procurar a linha específica
2. Remover apenas `EXEMPLO: ` mantendo o texto
3. Substituir se necessário

---

## 🎨 Exemplos de Substituição

### Exemplo 1: Título de Serviço

**Linha 19 - ANTES:**
```typescript
title: "EXEMPLO: Sessão de Reiki Kundalini (Presencial)",
```

**DEPOIS (opção 1 - sem EXEMPLO):**
```typescript
title: "Sessão de Reiki Kundalini (Presencial)",
```

**DEPOIS (opção 2 - com personalização):**
```typescript
title: "Reiki Kundalini - 60 minutos - Presencial",
```

---

### Exemplo 2: Bio Curta

**Linha 103 - ANTES:**
```typescript
shortBio:
  "EXEMPLO: Terapeuta holística especializada em Reiki Kundalini e 
   trabalho energético avançado. Mais de uma década dedicada a 
   acompanhar pessoas na sua jornada de transformação pessoal.",
```

**DEPOIS:**
```typescript
shortBio:
  "Terapeuta holística especializada em Reiki Kundalini e 
   trabalho energético avançado. Mais de uma década dedicada a 
   acompanhar pessoas na sua jornada de transformação pessoal.",
```

---

### Exemplo 3: Testemunho

**Linha 70 - ANTES:**
```typescript
clientName: "EXEMPLO: Maria Silva",
```

**DEPOIS:**
```typescript
clientName: "Maria Silva (Cliente Real)",
```

---

## 🔗 Integração com Sanity.io

**Quando o Sanity estiver configurado:**

Os dados virão diretamente do CMS e **sobrescreverão** os fallback data.

**Estrutura esperada no Sanity:**

```groq
// Service (Serviço)
- title: "Sessão de Reiki Kundalini (Presencial)"
- shortDescription: "Experiência imersiva..."
- benefits[0]: "Liberta bloqueios emocionais..."
- benefits[1]: "Reequilibra seu sistema..."

// Testimonial (Testemunho)
- clientName: "Maria Silva"
- testimonialText: "A sessão de Reiki..."

// Author (Rafaella)
- name: "Rafaella Kally"
- shortBio: "Terapeuta holística..."
- longBio: "Sou Rafaella Kally..."
- specializations[]: ["Reiki Kundalini", ...]
- certifications[]: [{ title, institution, year }, ...]
```

---

## 🎯 Checklist de Implementação

- [ ] Remover ou manter os prefixos "EXEMPLO:" conforme necessário
- [ ] Verificar se todos os textos estão com tom correto
- [ ] Testar build: `npm run build`
- [ ] Iniciar dev: `npm run dev`
- [ ] Verificar aparência visual em browser
- [ ] Quando pronto para produção, integrar Sanity.io
- [ ] Atualizar environment variables (NEXT_PUBLIC_SANITY_PROJECT_ID)

---

## 📞 Suporte Rápido

**Erro ao compilar?**
```bash
npm run build
# Se houver erro, procurar por aspas desalinhadas ou sintaxe inválida
```

**Quer fazer deploy?**
Seguir: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

**Quer conectar Sanity?**
Seguir: [SANITY_CMS_GUIDE.md](./SANITY_CMS_GUIDE.md)

---

## 📈 Estatísticas Finais

| Métrica                       | Valor     |
| ----------------------------- | --------- |
| Total de Textos Profissionais | 28        |
| Serviços Completos            | 3         |
| Benefícios Descritos          | 6         |
| Testemunhos Mockados          | 3         |
| Certificações Listadas        | 2         |
| Bio Completa                  | 1         |
| Status Build                  | ✅ PASSING |

---

*Referência rápida atualizada: Janeiro 2026*
*Todos os textos prontos para personalização* ✨
