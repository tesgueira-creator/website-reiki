# Guia: Adicionar GitHub Secrets (PLACEHOLDERS) 🔐

> Este ficheiro contém todas as instruções necessárias para adicionar os *GitHub Secrets* que a aplicação precisa. Por enquanto **use placeholders** (substituir por valores reais depois).

---

## 1. Resumo rápido ✅
- Substitua os valores `PLACEHOLDER_*` pelos valores reais.
- Pode adicionar os segredos ao repositório (repo-level) ou ao **environment** (por exemplo `staging` / `production`).
- Para Google service account, recomendamos guardar o JSON como *base64* e usá-lo como valor do secret.

---

## 2. Segredos necessários (lista) ⚠️
- **SANITY_WRITE_TOKEN** — token com permissão de escrita para Sanity (usar staging token para `staging`).
- **STRIPE_SECRET_KEY** — chave secreta Stripe (teste para staging).
- **STRIPE_WEBHOOK_SECRET** — secret do webhook Stripe.
- **RESEND_API_KEY** — chave API do Resend para enviar emails.
- **GOOGLE_SERVICE_ACCOUNT_EMAIL** — email da service account (ex: service-account@project.iam.gserviceaccount.com).
- **GOOGLE_SERVICE_ACCOUNT_KEY** — JSON da chave privada da service account (use *base64* para evitar quebras de linha).
- **NEXTAUTH_SECRET** — secret para NextAuth (gerar com crypto.randomBytes(32)).
- **VERCEL_TOKEN** — token de API Vercel (permite deploys e aliasing para rollback).
- **VERCEL_PROJECT_ID** — ID do projeto Vercel.
- **PRODUCTION_DOMAIN** — domínio de produção (ex: example.com).
- **SLACK_WEBHOOK_URL** — URL do webhook do Slack para notificações.
- (Opcional) **STRIPE_PUBLISHABLE_KEY** — chave publiquevel caso precise no client.

---

## 3. Exemplos de comandos `gh` (repo-level) 💻
Substitua `tesgueira-creator/website-reiki` pelo repositório correto quando necessário.

```bash
# Exemplo: adicionar segredos ao repositório
gh secret set SANITY_WRITE_TOKEN --body "PLACEHOLDER_SANITY_WRITE_TOKEN" --repo tesgueira-creator/website-reiki
gh secret set STRIPE_SECRET_KEY --body "PLACEHOLDER_STRIPE_SECRET_KEY" --repo tesgueira-creator/website-reiki
gh secret set STRIPE_WEBHOOK_SECRET --body "PLACEHOLDER_STRIPE_WEBHOOK_SECRET" --repo tesgueira-creator/website-reiki
gh secret set RESEND_API_KEY --body "PLACEHOLDER_RESEND_API_KEY" --repo tesgueira-creator/website-reiki
gh secret set NEXTAUTH_SECRET --body "PLACEHOLDER_NEXTAUTH_SECRET" --repo tesgueira-creator/website-reiki
gh secret set VERCEL_TOKEN --body "PLACEHOLDER_VERCEL_TOKEN" --repo tesgueira-creator/website-reiki
gh secret set VERCEL_PROJECT_ID --body "PLACEHOLDER_VERCEL_PROJECT_ID" --repo tesgueira-creator/website-reiki
gh secret set PRODUCTION_DOMAIN --body "PLACEHOLDER_PRODUCTION_DOMAIN" --repo tesgueira-creator/website-reiki
gh secret set SLACK_WEBHOOK_URL --body "PLACEHOLDER_SLACK_WEBHOOK_URL" --repo tesgueira-creator/website-reiki
```

---

## 4. Exemplos para *environment* (staging / production) 🧪
Recomendado: coloque as credenciais reais do ambiente (ex: Stripe test keys in `staging`, live keys in `production`).

```bash
# Adicionar um secret apenas ao environment 'staging'
gh secret set SANITY_WRITE_TOKEN --body "PLACEHOLDER_SANITY_WRITE_TOKEN" --repo tesgueira-creator/website-reiki --env staging
gh secret set STRIPE_SECRET_KEY --body "PLACEHOLDER_STRIPE_SECRET_KEY" --repo tesgueira-creator/website-reiki --env staging
# ... repetir para outros segredos
```

> Nota: se a versão do `gh` instalada não suportar `--env`, adiciona os segredos via GitHub UI em Settings → Environments.

---

## 5. Google Service Account (JSON) — *recomendação* 🔁
Para evitar problemas com quebras de linha, encode o JSON em base64 e guarde o base64 como secret. Exemplo:

```bash
# Encode e enviar
export GSA_JSON_FILE=./service-account.json
export GSA_BASE64=$(base64 -w 0 $GSA_JSON_FILE)
gh secret set GOOGLE_SERVICE_ACCOUNT_KEY --body "$GSA_BASE64" --repo tesgueira-creator/website-reiki --env staging
# Set the service account email too
gh secret set GOOGLE_SERVICE_ACCOUNT_EMAIL --body "PLACEHOLDER_GOOGLE_SERVICE_ACCOUNT_EMAIL" --repo tesgueira-creator/website-reiki --env staging
```

No código, o servidor deve decodificar com `Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY, 'base64').toString()` antes de parsear o JSON.

---

## 6. Gerar `NEXTAUTH_SECRET` 🔑
Exemplo para gerar um secret seguro (local):

```bash
# Node
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# ou OpenSSL
openssl rand -hex 32
```

Adicione o valor resultante em `NEXTAUTH_SECRET`.

---

## 7. Validar segredos e disparar staging ✨
Depois de adicionar os segredos, execute:

```bash
# Validar que a app vê todos os segredos (script presente no repo)
node scripts/validate-secrets.js

# Disparar workflow de deploy em staging (ou use GitHub UI)
gh workflow run deploy-to-vercel-staging.yml --repo tesgueira-creator/website-reiki

# Opcional: executar os E2E locais
npm run test:e2e
```

---

## 8. Boas práticas e notas finais 💡
- Use chaves de teste em `staging` (Stripe test keys).
- Não partilhe secrets em canais inseguros; use GitHub Actions environments com restrições para `production`.
- Mantenha `VERCEL_TOKEN` com permissões minimamente necessárias (deploy + alias para rollback).
- Se precisar, posso substituir os `PLACEHOLDER_...` pelos comandos já com os valores reais se me fornecer os valores aqui (ou executar `gh` localmente no teu ambiente).

---

**Arquivo criado como rascunho com placeholders — substitui os valores e segue os passos. ✅**
