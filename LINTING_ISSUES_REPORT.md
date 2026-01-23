# 🧹 LINTING ISSUES FOUND & FIX STRATEGY

## Summary
- **Total Warnings:** 44
- **Total Errors:** 0
- **Severity:** LOW (all unused imports/variables)

## Issues by Category

### 1. Unused Imports (30 issues)
These are safe to remove - they're imported but not used.

**Files Affected:**
- `src/app/agendar/page.tsx` - 3 unused imports (Calendar, Clock, ChevronDown)
- `src/app/blog/[articleId]/page.tsx` - 3 unused imports
- `src/app/cartao-presente/page.tsx` - 5 unused imports
- `src/app/cliente/configuracoes/page.tsx` - 1 unused import
- `src/app/eventos/[eventId]/page.tsx` - 1 unused import
- `src/app/eventos/page.tsx` - 2 unused imports
- `src/app/membros/page.tsx` - 1 unused import
- `src/app/newsletter/page.tsx` - 1 unused import
- `src/app/questionario/page.tsx` - 2 unused imports
- `src/app/recursos/page.tsx` - 1 unused import
- `src/app/sessoes-online/page.tsx` - 2 unused imports
- `src/app/cliente/page.tsx` - 1 unused import
- `src/app/loja/page.tsx` - 1 unused import
- `src/app/carrinho/page.tsx` - 1 unused import
- `src/components/ui/ServiceFilter.tsx` - 1 unused import

### 2. Unused Variables (12 issues)
These variables are assigned but never used - can be removed or prefixed with underscore.

**Files Affected:**
- `scripts/populate_service_content.js` - 'result' unused
- `scripts/smoke-test.js` - 'tests' unused
- `src/__tests__/webhook.spec.ts` - '_' unused
- `src/app/agendar/page.tsx` - 'TimeSlot' unused
- `src/app/api/appointments/by-email/route.ts` - '_req' parameter
- `src/app/api/orders/route.ts` - '_req' parameter
- `src/app/cartao-presente/page.tsx` - 'step', 'setStep' unused
- `src/app/cliente/page.tsx` - 'loadingAppointments' unused
- `src/app/faq/page.tsx` - 'index' unused (2 occurrences)

### 3. Image Optimization (5 issues)
Using `<img>` instead of Next.js `<Image />` component.

**Files Affected:**
- `src/app/eventos/[eventId]/page.tsx` - 1 issue
- `src/app/eventos/page.tsx` - 2 issues
- `src/app/recursos/page.tsx` - 1 issue
- `src/app/sessoes-online/page.tsx` - 2 issues

---

## Recommended Fixes

### Priority 1: QUICK WINS (Remove unused imports)
```typescript
// Example: src/app/agendar/page.tsx
// REMOVE these lines:
import { Calendar, Clock, ChevronDown } from "lucide-react";
// They're not used in the render
```

### Priority 2: FIX IMAGE OPTIMIZATION
```tsx
// CHANGE FROM:
<img src="..." alt="..." />

// CHANGE TO:
<Image src="..." alt="..." width={600} height={400} />
```

### Priority 3: REMOVE UNUSED VARIABLES
```typescript
// CHANGE FROM:
const result = await someFunction();

// CHANGE TO:
const _result = await someFunction();
// OR:
await someFunction(); // remove variable entirely
```

---

## Impact Assessment

| Category           | Count  | Impact    | Fix Time    |
| ------------------ | ------ | --------- | ----------- |
| Unused imports     | 30     | Very Low  | 5 min       |
| Unused variables   | 12     | Very Low  | 3 min       |
| Image optimization | 5      | Low       | 10 min      |
| **TOTAL**          | **47** | **Minor** | **~20 min** |

---

## Action Items

- [ ] Run automated cleanup: `npm run lint -- --fix` (if available)
- [ ] Manual review of image components
- [ ] Re-run linting: `npm run lint`
- [ ] Commit with message: "chore: fix linting warnings (unused imports and image optimization)"
- [ ] Verify no functional changes occurred

---

**Status:** NOT BLOCKING  
These warnings don't affect functionality - they're code quality issues.  
Recommended to fix before production deployment.
