# Plano de Correção de Linting - 7 Erros Críticos

## 🎯 Objetivo
Corrigir os 7 erros bloqueadores identificados no linting para permitir build/deploy sem warnings de erro.

---

## Erro 1 & 2: setState em useEffect (Performance)

### Arquivos Afetados
- `src/components/shared/Analytics.tsx` (linhas 239, 324)
- `src/components/shared/DarkModeToggle.tsx` (linha 18)

### Problema
Chamar `setState` sincrônamente dentro de `useEffect` causa re-renders em cascata.

### Solução
Usar `useLayoutEffect` em vez de `useEffect` para sincronizar com DOM antes de renderizar, OU usar callback assíncrono.

**Exemplo de correção**:
```typescript
// ❌ ERRADO
useEffect(() => {
  setIsDark(shouldBeDark);
}, []);

// ✅ CORRETO - Opção 1: useLayoutEffect
useLayoutEffect(() => {
  setIsDark(shouldBeDark);
}, [shouldBeDark]);

// ✅ CORRETO - Opção 2: useCallback + useEffect
useEffect(() => {
  const handler = () => setIsDark(shouldBeDark);
  window.addEventListener('load', handler);
  return () => window.removeEventListener('load', handler);
}, [shouldBeDark]);
```

---

## Erro 3: Tipo `any` em GoogleReviews

### Arquivo
`src/components/shared/GoogleReviews.tsx` (linha 16)

### Problema
```typescript
// ❌ ERRADO
const [reviews, setReviews] = useState<any[]>([]);
```

### Solução
Criar interface correta para reviews do Google:

```typescript
// ✅ CORRETO
interface GoogleReview {
  id: string;
  reviewer: string;
  rating: number;
  text: string;
  time: string;
  [key: string]: unknown; // Para campos adicionais se necessário
}

const [reviews, setReviews] = useState<GoogleReview[]>([]);
```

---

## Erro 4 & 5: @ts-ignore em LiveChat

### Arquivo
`src/components/shared/LiveChat.tsx` (linhas 15, 17)

### Problema
```typescript
// ❌ ERRADO
// @ts-ignore
window.Intercom = ...

// @ts-ignore
Intercom('boot', {...})
```

### Solução
Usar `@ts-expect-error` (mais seguro, falha se erro for resolvido) OU tipar corretamente:

```typescript
// ✅ CORRETO - Opção 1: @ts-expect-error
// @ts-expect-error Intercom global type not available
window.Intercom = ...

// @ts-expect-error Intercom type not available
Intercom('boot', {...})

// ✅ CORRETO - Opção 2: Estender tipos
declare global {
  function Intercom(action: string, data?: unknown): void;
  interface Window {
    Intercom?: typeof Intercom;
  }
}
```

---

## 📋 Checklist de Execução

- [ ] **Analytics.tsx**: Alterar `useEffect` → `useLayoutEffect` e validar estado
- [ ] **DarkModeToggle.tsx**: Mesmo padrão que Analytics
- [ ] **GoogleReviews.tsx**: Criar `GoogleReview` interface e aplicar
- [ ] **LiveChat.tsx**: Substituir `@ts-ignore` por `@ts-expect-error`
- [ ] Executar `npm run lint` e confirmar 0 erros
- [ ] Executar `npm run typecheck` (deve passar)
- [ ] Executar `npm run build` para validar
- [ ] Commit com mensagem: "fix: linting errors - analytics, darkmode, reviews, livechat"

---

## ⏱️ Tempo Estimado
**30-45 minutos** para:
1. Leitura do código e entendimento (10 min)
2. Implementação de correções (20 min)
3. Testes/validação (10 min)

---

## 🔍 Validação Pós-Correção

```bash
# 1. Verificar erros (deve retornar 0 erros, ~50 warnings)
npm run lint

# 2. Verificar tipos
npm run typecheck

# 3. Tentar build
npm run build

# 4. Se tudo passar
git add .
git commit -m "fix: resolve 7 critical linting errors"
git push origin staging
```

---

**Gerado em**: 26/01/2026  
**Próxima etapa**: Executar este plano de correção
