# Sistema de Agendamentos e Encomendas — Implementação (Resumo) ✅

## Visão geral ✨
Este documento descreve as **novas implementações** feitas no projeto para suportar:
- Agendamentos com slots de 90 minutos (com buffer)
- Persistência dos agendamentos em **Sanity** (documento `appointment`)
- Checkout Stripe -> webhook -> criação idempotente de agendamento
- Envio de emails com **Resend** (confirm/ cancel)
- Criação de evento no **Google Calendar** para cada agendamento
- Área de Cliente com autenticação **NextAuth** (Google + magic link por email)
- Bloqueio do fluxo de encomendas até catálogo real (flag temporária)

---

## Arquitetura (resumida) 🔧
- Banco principal de conteúdo: **Sanity** (mantém documentos `service`, `stripeOrder`, `appointment`).
- APIs serverless no Next.js (App Router):
  - `GET /api/availability` -> devolve dias e slots livres/ocupados
  - `POST /api/checkout` -> cria sessão Stripe (adiciona metadata do slot e cliente)
  - `POST /api/webhook/stripe` -> processa `checkout.session.completed`, cria `stripeOrder` e `appointment` idempotente, envia email e agenda evento no Google Calendar
  - `POST /api/appointments/cancel` -> cancela agendamento (patch em Sanity), remove evento do Google Calendar, envia email de cancelamento
  - `GET /api/appointments/by-email` -> devolve agendamentos do utilizador autenticado
  - `GET /api/orders` -> placeholder, devolve `{ enabled: false }` até o catálogo real

---

## Schema Sanity (principais campos) 🗂️
O novo tipo `appointment` inclui campos:
- `_id` (por ex. `appointment_{stripeSessionId}`)
- `status` (`booked` | `canceled`)
- `date`, `startTime`, `endTime`, `durationMinutes`
- `serviceName`, `serviceId`
- `customerName`, `customerEmail`, `customerPhone`
- `stripeSessionId`, `stripePaymentStatus`
- `calendarEventId`, `cancelToken`, `createdAt`

O design usa `createIfNotExists` para garantir idempotência no webhook (evitar duplicados em retries).

---

## Regras de disponibilidade e prevenção de Overbooking 🛡️
- Slots: 90 minutos por sessão + 15 minutos buffer (configuração no código). Horário padrão: 09:00–19:00.
- `GET /api/availability` gera os próximos 14 dias úteis (exclui fins de semana) e marca slots ocupados consultando `appointment` com `status != canceled`.
- `POST /api/checkout` verifica se o slot já está ocupado antes de criar a sessão Stripe (responde 409 se ocupado).
- No webhook, ao criar `appointment`, também se valida novamente a ocupação para evitar races em casos extremos.

---

## Fluxo de pagamento → agendamento 🧾
1. Cliente seleciona slot e confirma dados na UI (`/agendar`).
2. Front chama `POST /api/checkout` com `slotDate`, `slotTime` e dados do cliente.
3. API cria sessão Stripe com metadata do slot.
4. Ao completar o pagamento, Stripe chama `POST /api/webhook/stripe`.
5. Webhook grava `stripeOrder` e cria `appointment` (idempotente), cria evento no Google Calendar (se configurado) e envia email de confirmação (Resend).

---

## Cancelamentos e Atualizações 🔄
- Endpoint de cancelamento: `POST /api/appointments/cancel` aceitando `appointmentId` ou `cancelToken`.
- A ação marca `status: canceled`, tenta remover `calendarEventId` do Google Calendar e envia email de cancelamento via Resend.
- O front (Área de Cliente) recarrega automaticamente os slots quando um cancelamento é efetuado.

---

## UI / Frontend (arquivos alterados) 🎨
- `src/app/agendar/page.tsx`: substituí mocks por chamadas a `GET /api/availability`, construção do checkout e redireccionamento para Stripe.
- `src/app/cliente/page.tsx`: autenticação com NextAuth; listagem de agendamentos do utilizador, botão de cancelamento por `cancelToken`; separador de encomendas bloqueado por flag.

---

## Notas de segurança 🛡️
- Stripe: use `STRIPE_WEBHOOK_SECRET` em produção e verifique a assinatura dos eventos.
- Sanity write operations exigem `SANITY_WRITE_TOKEN` no ambiente do servidor.
- Google Service Account: armazene a chave privada segura e substitua quebras de linha por `\n` quando usar variáveis de ambiente.
- Proteja rotas sensíveis com NextAuth sessions.

---

## Pontos pendentes / Recomendações ✓
- Reforçar testes end-to-end do fluxo Stripe (com ambiente de testes do Stripe).
- Criar uma interface de admin (ou `/admin/agenda`) para gerir regras (horários, buffers, feriados) e ver agendas.
- Monitorização de falhas de email/Calendar (alertas).

---

> Arquivo criado automaticamente pelo script de implementação. Se quiser, adiciono um guia separado para a configuração passo a passo das integrações (Stripe/Google/Resend/Sanity). ✍️
