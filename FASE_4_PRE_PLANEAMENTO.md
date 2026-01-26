# 🎯 Fase 4: Pré-Planeamento - GA4 + Testes de Fluxo

**Data de Criação**: 26/01/2026  
**Status**: 📋 PRÉ-PLANEAMENTO  
**Duração Estimada**: 60-90 minutos  
**Fase Atual do Projeto**: 40% → 100%  

---

## 📊 Contexto Atual

### ✅ Completado
- [x] Fase 1: Setup inicial e testes básicos
- [x] Fase 2: Correção de 7 erros de linting (0 erros, 52 warnings)
- [x] TypeScript type check
- [x] Unit tests (Stripe webhook)

### ⚠️ Pendente/Bloqueado
- [ ] Build Next.js (terminando com código 143 - timeout/OOM)
- [ ] Testes E2E Playwright

### 🎯 Objetivo da Fase 4
Testar e validar eventos de analytics (GA4), fluxos de utilizador e integrações, mesmo sem build completo, usando dev server.

---

## 🔧 Pré-Requisitos

### 1. Google Analytics 4 - Configuração

#### Status Atual
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID = NÃO CONFIGURADO
```

**Ações Necessárias**:

1. **Obter GA4 Measurement ID**
   - Aceder a: https://analytics.google.com/
   - Criar propriedade GA4 (se ainda não existe)
   - Admin → Data Streams → Web → Copiar Measurement ID (formato: `G-XXXXXXXXX`)

2. **Adicionar ao .env.local**
   ```bash
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXX
   ```

3. **Verificar que Analytics.tsx já está implementado**
   - ✅ Componente GoogleAnalytics pronto
   - ✅ Eventos customizados definidos
   - ✅ Cookie consent implementado
   - ✅ 15+ tipos de eventos prontos

#### Eventos GA4 Já Implementados

```typescript
// Disponíveis em src/components/shared/Analytics.tsx
✅ page_view
✅ cta_click
✅ service_view
✅ contact_form_start
✅ contact_form_submit
✅ whatsapp_click
✅ phone_click
✅ testimonial_view
✅ filter_change
✅ scroll_depth
✅ booking_step
✅ checkout_error
✅ checkout_success
✅ heatmap_consent
```

---

### 2. Microsoft Clarity (Opcional)

```bash
NEXT_PUBLIC_CLARITY_ID = NÃO CONFIGURADO
```

**Se quiser ativar**:
1. Criar conta em: https://clarity.microsoft.com/
2. Adicionar site
3. Copiar Project ID
4. Adicionar ao `.env.local`:
   ```bash
   NEXT_PUBLIC_CLARITY_ID=xxxxxxxxx
   ```

---

### 3. Servidor de Desenvolvimento

**Opção A: Dev Server (Recomendado para esta fase)**
```bash
npm run dev
# Aceder a http://localhost:3000
```

**Opção B: Build + Start (Bloqueado)**
```bash
npm run build  # ⚠️ Terminando com código 143
npm start
```

**Decisão para Fase 4**: Usar `npm run dev` para contornar problema de build.

---

## 🧪 Plano de Testes - Fase 4

### Estrutura de Testes

```
Fase 4 (60-90 min)
├── Parte 1: Configuração GA4 (10 min)
├── Parte 2: Testes Básicos de Tracking (15 min)
├── Parte 3: Fluxo de Agendamento (20 min)
├── Parte 4: Fluxo de Checkout/Stripe (20 min)
└── Parte 5: Testes de Erro e Edge Cases (15 min)
```

---

## 📋 Parte 1: Configuração GA4 (10 minutos)

### Checklist de Setup

- [ ] **1.1** Criar conta GA4 (se não existe)
- [ ] **1.2** Criar propriedade e data stream
- [ ] **1.3** Copiar Measurement ID (G-XXXXXXXXX)
- [ ] **1.4** Adicionar a `.env.local`
- [ ] **1.5** Reiniciar servidor dev (`npm run dev`)
- [ ] **1.6** Abrir GA4 DebugView: https://analytics.google.com/ → Admin → DebugView
- [ ] **1.7** Ativar modo debug no browser (Chrome DevTools)

### Como Ativar Debug Mode

**Opção A: Chrome Extension** (Recomendado)
1. Instalar: [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
2. Ativar extensão
3. Navegar no site

**Opção B: URL Parameter**
```
http://localhost:3000?debug_mode=true
```

**Opção C: Console do Browser**
```javascript
// Executar no console
localStorage.setItem('ga_debug', 'true');
location.reload();
```

---

## 📋 Parte 2: Testes Básicos de Tracking (15 minutos)

### 2.1 Page View Tracking

**Objetivo**: Validar que navegação entre páginas gera eventos.

**Passos**:
1. [ ] Abrir http://localhost:3000
2. [ ] Aceitar cookies (selecionar "Analíticos" ✓)
3. [ ] Navegar para `/servicos`
4. [ ] Navegar para `/sobre`
5. [ ] Navegar para `/contacto`

**Validação no GA4 DebugView**:
- ✅ Eventos `page_view` para cada navegação
- ✅ `page_location` correto
- ✅ `page_title` correto

---

### 2.2 CTA Click Tracking

**Objetivo**: Validar cliques em CTAs principais.

**Passos**:
1. [ ] Homepage → clicar "Agendar Consulta"
2. [ ] Homepage → clicar "Ver Serviços"
3. [ ] Serviços → clicar em qualquer serviço
4. [ ] Contacto → clicar WhatsApp
5. [ ] Contacto → clicar telefone

**Validação no GA4 DebugView**:
- ✅ Evento `cta_click` com `label` correto
- ✅ Evento `whatsapp_click`
- ✅ Evento `phone_click`
- ✅ Evento `service_view` com nome do serviço

---

### 2.3 Cookie Consent Tracking

**Objetivo**: Validar que consentimento é rastreado.

**Passos**:
1. [ ] Abrir site em aba anónima
2. [ ] Banner de cookies aparece
3. [ ] Testar "Recusar analíticos" → recarregar → GA4 não deve rastrear
4. [ ] Limpar localStorage
5. [ ] Testar "Aceitar todos" → GA4 deve começar a rastrear

**Validação**:
- ✅ Evento `heatmap_consent` com `action: accepted` ou `rejected`
- ✅ localStorage tem `cookie-consent` salvo

---

## 📋 Parte 3: Fluxo de Agendamento (20 minutos)

### 3.1 Happy Path - Agendamento Completo

**Objetivo**: Testar fluxo completo de agendamento.

**Passos**:
1. [ ] Navegar para `/agendar` ou `/servicos` → selecionar serviço
2. [ ] Preencher formulário:
   - Nome: "Teste GA4"
   - Email: "teste@exemplo.pt"
   - Telefone: "+351912345678"
   - Data/hora: Selecionar slot disponível
3. [ ] Submeter formulário
4. [ ] Observar resposta (sucesso/erro)

**Eventos GA4 Esperados**:
- ✅ `page_view` em `/agendar`
- ✅ `booking_step` com `action: form_start`
- ✅ `booking_step` com `action: date_selected`
- ✅ `booking_step` com `action: submit_attempt`
- ✅ `contact_form_submit` com `action: submit_success` ou `submit_error`

**Debug**: Verificar console do browser para erros.

---

### 3.2 Erro Simulado - Campos Vazios

**Objetivo**: Testar validação de formulário.

**Passos**:
1. [ ] Ir para `/agendar`
2. [ ] Clicar "Submeter" sem preencher
3. [ ] Observar validação HTML5

**Eventos GA4 Esperados**:
- ✅ `booking_step` com `action: form_start`
- ❌ Sem `submit_attempt` (validação bloqueia)

---

## 📋 Parte 4: Fluxo de Checkout/Stripe (20 minutos)

### 4.1 Happy Path - Checkout Stripe

**Objetivo**: Testar integração Stripe end-to-end.

**Passos**:
1. [ ] Ir para `/servicos` → selecionar serviço com preço
2. [ ] Clicar "Comprar" / "Agendar com Pagamento"
3. [ ] Redirecionar para Stripe Checkout
4. [ ] Usar cartão de teste: `4242 4242 4242 4242`
   - Data: qualquer futura (ex: 12/34)
   - CVC: qualquer 3 dígitos (ex: 123)
   - ZIP: qualquer (ex: 12345)
5. [ ] Completar pagamento
6. [ ] Redirecionar de volta ao site (success page)

**Eventos GA4 Esperados**:
- ✅ `service_view` ao ver serviço
- ✅ `cta_click` ao clicar "Comprar"
- ✅ `checkout_success` após pagamento bem-sucedido
  - Com `custom_data`: serviceId, serviceName, price

**Webhook Stripe**: Verificar logs no terminal do dev server.

---

### 4.2 Erro Simulado - Pagamento Falhado

**Objetivo**: Testar erro de pagamento.

**Passos**:
1. [ ] Repetir fluxo de checkout
2. [ ] Usar cartão que falha: `4000 0000 0000 0002`
3. [ ] Tentar completar pagamento
4. [ ] Observar erro do Stripe

**Eventos GA4 Esperados**:
- ✅ `checkout_error` com `action: payment_failed`
- ✅ `label` com mensagem de erro

---

## 📋 Parte 5: Testes de Erro e Edge Cases (15 minutos)

### 5.1 Formulário de Contacto

**Passos**:
1. [ ] Ir para `/contacto`
2. [ ] Preencher formulário
3. [ ] Submeter

**Eventos GA4**:
- ✅ `contact_form_start`
- ✅ `contact_form_submit`

---

### 5.2 Newsletter Signup

**Passos**:
1. [ ] Procurar campo de newsletter (footer ou página dedicada)
2. [ ] Inserir email
3. [ ] Submeter

**Eventos GA4**:
- ✅ Evento customizado (se implementado)

---

### 5.3 Navegação Mobile

**Passos**:
1. [ ] Abrir DevTools → Toggle device toolbar (Ctrl+Shift+M)
2. [ ] Selecionar iPhone ou Android
3. [ ] Navegar pelo site
4. [ ] Testar menu mobile
5. [ ] Clicar CTAs

**Validação**:
- ✅ Eventos são rastreados igual a desktop
- ✅ Responsive design funciona
- ✅ Cookies banner visível e funcional

---

## 📊 Validação e Reporting

### Como Usar GA4 DebugView

1. **Aceder**:
   - https://analytics.google.com/
   - Admin → DebugView
   - Selecionar propriedade correta

2. **Visualização**:
   - Ver eventos em tempo real
   - Cada evento mostra parâmetros
   - Filtrar por tipo de evento

3. **Verificar**:
   - Nome do evento correto
   - Parâmetros presentes
   - Valores fazem sentido

---

### Checklist de Validação GA4

**Eventos Básicos** (Mínimo):
- [ ] `page_view` em todas as páginas
- [ ] `cta_click` nos botões principais
- [ ] `whatsapp_click` / `phone_click`

**Eventos de Conversão** (Crítico):
- [ ] `booking_step` (agendamento)
- [ ] `checkout_success` (pagamento)
- [ ] `contact_form_submit`

**Eventos de Erro** (Importante):
- [ ] `checkout_error`
- [ ] Validações de formulário

**Eventos Avançados** (Opcional):
- [ ] `scroll_depth`
- [ ] `testimonial_view`
- [ ] `filter_change`

---

## 🐛 Troubleshooting

### Problema: GA4 não rastreia nada

**Soluções**:
1. [ ] Verificar `NEXT_PUBLIC_GA_MEASUREMENT_ID` em `.env.local`
2. [ ] Reiniciar servidor dev
3. [ ] Verificar console do browser (erros de script?)
4. [ ] Aceitar cookies "Analíticos" no banner
5. [ ] Verificar que GA script carregou (Network tab)

---

### Problema: DebugView não mostra eventos

**Soluções**:
1. [ ] Ativar debug mode (extensão ou `?debug_mode=true`)
2. [ ] Aguardar 1-2 minutos (delay normal)
3. [ ] Verificar que Measurement ID está correto
4. [ ] Limpar cache do browser

---

### Problema: Eventos duplicados

**Causa**: React Strict Mode em desenvolvimento.

**Solução**: Normal em dev, não acontece em produção.

---

### Problema: Build ainda termina (código 143)

**Contorno**: Usar `npm run dev` para todos os testes desta fase.

**Investigação futura**:
- Aumentar RAM do devcontainer
- Desabilitar Turbopack (`next.config.ts`)
- Rodar build em máquina local fora do container

---

## 📈 Métricas de Sucesso da Fase 4

### Critérios de Aceitação

**Mínimo (Passar)**:
- [ ] GA4 configurado e a rastrear `page_view`
- [ ] 3+ tipos de eventos funcionando
- [ ] Consentimento de cookies funcional
- [ ] Pelo menos 1 fluxo completo testado

**Ideal (Excelente)**:
- [ ] 10+ tipos de eventos validados
- [ ] Agendamento completo testado (happy path)
- [ ] Checkout Stripe testado (happy + erro)
- [ ] DebugView mostra todos os eventos esperados
- [ ] Documentação de resultados criada

---

## 📁 Outputs Esperados

### Documentos a Criar

1. **`FASE_4_RESULTADOS.md`**
   - Eventos testados e status
   - Screenshots do DebugView
   - Issues encontrados
   - Recomendações

2. **`GA4_SETUP_GUIDE.md`** (Opcional)
   - Guia passo-a-passo para configurar GA4
   - Troubleshooting comum
   - Eventos customizados disponíveis

---

## ⏱️ Timeline Detalhado

| Tarefa                                | Duração    | Acumulado |
| ------------------------------------- | ---------- | --------- |
| Setup GA4 (criar conta, adicionar ID) | 10 min     | 10 min    |
| Testes básicos (page view, CTA)       | 15 min     | 25 min    |
| Fluxo agendamento                     | 20 min     | 45 min    |
| Fluxo Stripe checkout                 | 20 min     | 65 min    |
| Edge cases e erros                    | 15 min     | 80 min    |
| Documentação de resultados            | 10 min     | 90 min    |
| **TOTAL**                             | **90 min** | **1h30**  |

---

## 🚀 Próximos Passos Após Fase 4

### Se Build for Resolvido
1. [ ] Rodar `npm run build` bem-sucedido
2. [ ] Executar `npm run test:e2e` (Playwright)
3. [ ] Deploy para staging/preview
4. [ ] Testar em ambiente de produção

### Se Build Continuar Bloqueado
1. [ ] Investigar logs completos do build
2. [ ] Testar build fora do container
3. [ ] Considerar alternativas (deploy direto do dev?)
4. [ ] Abrir issue com Next.js/Turbopack

---

## ✅ Checklist Rápido de Execução

### Antes de Começar
- [ ] Ler este documento completo
- [ ] Criar conta GA4 (se necessário)
- [ ] Obter Measurement ID
- [ ] Adicionar a `.env.local`
- [ ] Servidor dev rodando (`npm run dev`)

### Durante Testes
- [ ] DebugView aberto em aba separada
- [ ] Console do browser aberto (F12)
- [ ] Anotar eventos que aparecem/não aparecem
- [ ] Screenshots de sucessos/erros

### Após Testes
- [ ] Criar `FASE_4_RESULTADOS.md`
- [ ] Listar eventos validados
- [ ] Documentar problemas encontrados
- [ ] Atualizar `TEST_EXECUTION_REPORT.md`

---

## 📞 Suporte

**Documentação GA4**:
- https://developers.google.com/analytics/devguides/collection/ga4

**Stripe Test Cards**:
- https://stripe.com/docs/testing

**Next.js Analytics**:
- https://nextjs.org/docs/app/building-your-application/optimizing/analytics

---

**Status**: 📋 PRÉ-PLANEAMENTO COMPLETO  
**Próximo**: Executar Parte 1 (Setup GA4)  
**Criado em**: 26/01/2026  
**Duração Estimada**: 90 minutos  
**Progresso do Projeto**: 40% → 100% (após conclusão)
