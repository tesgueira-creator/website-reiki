# 🎯 Fase 4 - Checklist Executável

**Use este documento como guia prático durante a execução.**

---

## 🔧 PARTE 1: Setup GA4 (10 min)

### Passo 1.1: Criar/Aceder Conta GA4
- [ ] Ir para https://analytics.google.com/
- [ ] Login com conta Google
- [ ] Se não tem propriedade GA4: Admin → Create Property

### Passo 1.2: Obter Measurement ID
- [ ] Admin → Data Streams
- [ ] Clicar no stream web (ou criar novo)
- [ ] Copiar **Measurement ID** (formato: `G-XXXXXXXXX`)

### Passo 1.3: Configurar .env.local
```bash
# Adicionar esta linha ao arquivo .env.local:
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXX
```
- [ ] Abrir `/workspaces/website-reiki/.env.local`
- [ ] Adicionar linha acima
- [ ] Salvar arquivo

### Passo 1.4: Reiniciar Servidor
```bash
# No terminal:
npm run dev
```
- [ ] Parar servidor atual (Ctrl+C)
- [ ] Rodar `npm run dev`
- [ ] Aguardar inicialização
- [ ] Abrir http://localhost:3000

### Passo 1.5: Ativar DebugView
- [ ] Abrir nova aba: https://analytics.google.com/
- [ ] Admin → DebugView
- [ ] Deixar aba aberta

### Passo 1.6: Ativar Debug Mode
**Escolher UMA opção:**

**Opção A: Extensão Chrome** (Mais fácil)
- [ ] Instalar [GA Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
- [ ] Clicar no ícone para ativar

**Opção B: URL Parameter**
- [ ] Navegar para: http://localhost:3000?debug_mode=true

**Opção C: Console**
```javascript
localStorage.setItem('ga_debug', 'true');
location.reload();
```

---

## 🧪 PARTE 2: Testes Básicos (15 min)

### Teste 2.1: Page Views
- [ ] Abrir http://localhost:3000
- [ ] Aceitar cookies (marcar "Analíticos" ✓)
- [ ] Clicar "Guardar preferências"
- [ ] Navegar para `/servicos`
- [ ] Navegar para `/sobre`
- [ ] Navegar para `/contacto`

**No DebugView, verificar:**
- [ ] Evento `page_view` para cada navegação
- [ ] Parâmetro `page_location` correto
- [ ] Parâmetro `page_title` correto

### Teste 2.2: CTA Clicks
- [ ] Homepage → clicar "Agendar Consulta"
- [ ] Homepage → clicar "Ver Serviços"
- [ ] Página de serviço → clicar num serviço

**No DebugView, verificar:**
- [ ] Evento `cta_click` aparece
- [ ] Parâmetro `label` com nome do CTA
- [ ] Evento `service_view` com nome do serviço

### Teste 2.3: Contacto
- [ ] Ir para `/contacto`
- [ ] Clicar botão WhatsApp
- [ ] Clicar botão Telefone

**No DebugView, verificar:**
- [ ] Evento `whatsapp_click`
- [ ] Evento `phone_click`

---

## 📅 PARTE 3: Agendamento (20 min)

### Teste 3.1: Happy Path
- [ ] Ir para `/agendar`
- [ ] Preencher:
  - Nome: "Teste GA4"
  - Email: "teste@exemplo.pt"
  - Telefone: "+351912345678"
- [ ] Selecionar data/hora
- [ ] Clicar "Submeter"

**No DebugView, verificar:**
- [ ] `booking_step` com `action: form_start`
- [ ] `booking_step` com `action: date_selected`
- [ ] `booking_step` com `action: submit_attempt`
- [ ] `contact_form_submit` (sucesso ou erro)

**No Console do Browser (F12):**
- [ ] Verificar se há erros
- [ ] Ver resposta da API

### Teste 3.2: Validação
- [ ] Ir para `/agendar`
- [ ] Deixar campos vazios
- [ ] Tentar submeter

**Resultado esperado:**
- [ ] Validação HTML5 impede submit
- [ ] Mensagens de erro aparecem
- [ ] No DebugView: `booking_step` com `form_start` apenas

---

## 💳 PARTE 4: Checkout Stripe (20 min)

### Teste 4.1: Pagamento Bem-Sucedido
- [ ] Ir para `/servicos`
- [ ] Selecionar serviço com preço
- [ ] Clicar "Comprar" / "Agendar com Pagamento"
- [ ] Redirecionar para Stripe Checkout
- [ ] Preencher:
  - Email: "teste@exemplo.pt"
  - Cartão: `4242 4242 4242 4242`
  - Data: `12/34`
  - CVC: `123`
  - ZIP: `12345`
- [ ] Clicar "Pay"
- [ ] Aguardar redirecionamento

**No DebugView, verificar:**
- [ ] `service_view`
- [ ] `cta_click` ao clicar "Comprar"
- [ ] `checkout_success` após pagamento
  - [ ] `custom_data.serviceName`
  - [ ] `custom_data.price`

**No Terminal do servidor:**
- [ ] Ver log do webhook Stripe
- [ ] Confirmar `checkout.session.completed`

### Teste 4.2: Pagamento Falhado
- [ ] Repetir fluxo
- [ ] Usar cartão: `4000 0000 0000 0002`
- [ ] Tentar pagar

**No DebugView, verificar:**
- [ ] `checkout_error`
- [ ] `action: payment_failed`
- [ ] `label` com mensagem de erro

---

## 🧩 PARTE 5: Edge Cases (15 min)

### Teste 5.1: Formulário de Contacto
- [ ] Ir para `/contacto`
- [ ] Preencher todos os campos
- [ ] Submeter

**No DebugView:**
- [ ] `contact_form_start`
- [ ] `contact_form_submit`

### Teste 5.2: Mobile
- [ ] Abrir DevTools (F12)
- [ ] Toggle device toolbar (Ctrl+Shift+M)
- [ ] Selecionar "iPhone 12 Pro"
- [ ] Navegar pelo site
- [ ] Testar menu mobile
- [ ] Clicar CTAs

**Verificar:**
- [ ] Site responsivo
- [ ] Eventos rastreados igual desktop
- [ ] Cookie banner funcional em mobile

### Teste 5.3: Cookie Consent
- [ ] Abrir aba anónima (Ctrl+Shift+N)
- [ ] Ir para http://localhost:3000
- [ ] Banner de cookies aparece
- [ ] Clicar "Recusar analíticos"
- [ ] Navegar pelo site

**No DebugView:**
- [ ] Nenhum evento deve aparecer (analytics desabilitado)

- [ ] Recarregar página
- [ ] Limpar localStorage (F12 → Application → Clear)
- [ ] Recarregar novamente
- [ ] Banner aparece de novo
- [ ] Clicar "Aceitar todos"

**No DebugView:**
- [ ] Evento `heatmap_consent` com `action: accepted`
- [ ] Eventos começam a aparecer

---

## ✅ CHECKLIST FINAL

### Eventos Testados com Sucesso
- [ ] `page_view`
- [ ] `cta_click`
- [ ] `service_view`
- [ ] `whatsapp_click`
- [ ] `phone_click`
- [ ] `booking_step`
- [ ] `contact_form_submit`
- [ ] `checkout_success`
- [ ] `checkout_error`
- [ ] `heatmap_consent`

### Fluxos Completos
- [ ] Navegação básica (homepage, serviços, sobre, contacto)
- [ ] Agendamento (happy path)
- [ ] Checkout Stripe (sucesso + erro)
- [ ] Cookie consent (aceitar + recusar)
- [ ] Mobile/responsivo

### Documentação
- [ ] Screenshots do DebugView salvos
- [ ] Problemas anotados
- [ ] Criar `FASE_4_RESULTADOS.md` com:
  - [ ] Lista de eventos testados
  - [ ] Status (✅/❌)
  - [ ] Issues encontrados
  - [ ] Recomendações

---

## 🐛 Problemas Comuns

**Nenhum evento aparece no DebugView:**
1. Verificar Measurement ID em `.env.local`
2. Reiniciar servidor dev
3. Aceitar cookies "Analíticos"
4. Aguardar 1-2 minutos
5. Verificar console do browser (erros?)

**Eventos duplicados:**
- Normal em desenvolvimento (React Strict Mode)
- Não afeta produção

**Build ainda não funciona:**
- OK para esta fase
- Usar apenas `npm run dev`

---

## 📊 Tempo Gasto (Preencher)

| Tarefa         | Tempo Real |
| -------------- | ---------- |
| Setup GA4      | _____ min  |
| Testes básicos | _____ min  |
| Agendamento    | _____ min  |
| Checkout       | _____ min  |
| Edge cases     | _____ min  |
| Documentação   | _____ min  |
| **TOTAL**      | _____ min  |

---

**Status**: Pronto para executar  
**Próximo**: Começar Parte 1 (Setup GA4)  
**Após conclusão**: Criar `FASE_4_RESULTADOS.md`
