# Adicionar secrets via CLI (guia rápido)

Este guia mostra duas formas de adicionar os secrets necessários ao repositório `tesgueira-creator/website-reiki` usando o GitHub CLI (`gh`). Use o método interactivo (`scripts/add-secrets.sh`) ou os comandos `gh secret set` se preferires um fluxo não-interactivo.

## Pré-requisitos
- `gh` (GitHub CLI) instalado e autenticado com uma conta que tenha permissão para gerir **repository secrets**.
  - Autenticar: `gh auth login` (segue as instruções e garante `repo` scope).
- Ter o token Vercel (Personal Token) à mão para `VERCEL_TOKEN_STAGING`.

---

## Método 1 — Interactivo (recomendado)
Existe um script utilitário incluído: `scripts/add-secrets.sh`.

1. Torna o script executável (opcional) e executa:

```bash
bash scripts/add-secrets.sh
```

2. O script pedirá sequencialmente os valores (alguns valores podem ser opcionais).
3. O script define automaticamente nomes úteis para workflows (por exemplo: `VERCEL_TOKEN_STAGING` e `VERCEL_PROJECT_ID_STAGING`).

Benefícios: prompts seguros, suporta ficheiro JSON para a Google Service Account e validações básicas.

---

## Método 2 — Não-interactivo (com `gh`) — exemplo
Se preferires definir manualmente cada secret (por exemplo a partir de um script CI seguro), usa `gh secret set`.

Exemplo (substitui `<value>` pelo valor real):

```bash
# Token Vercel (staging)
echo -n "<YOUR_VERCEL_TOKEN>" | gh secret set VERCEL_TOKEN_STAGING --repo tesgueira-creator/website-reiki

echo -n "prj_apnmfPtBZBv9OP4xnupMIwN8vQ8A" | gh secret set VERCEL_PROJECT_ID_STAGING --repo tesgueira-creator/website-reiki

echo -n "tesgueira-creator" | gh secret set VERCEL_ORG_ID_STAGING --repo tesgueira-creator/website-reiki

# Outros exemplos
echo -n "<SANITY_WRITE_TOKEN>" | gh secret set SANITY_WRITE_TOKEN --repo tesgueira-creator/website-reiki --env staging
echo -n "<STRIPE_SECRET_KEY>" | gh secret set STRIPE_SECRET_KEY --repo tesgueira-creator/website-reiki --env staging
```

Observação: usar `--env <environment>` define a secret para um environment (ex.: `staging/preview`) se preferires scoping por ambiente; omitindo `--env` define a secret ao nível do repositório.

---

## Depois de adicionar os secrets
- Dispara o workflow manualmente via GitHub Actions UI ou com `gh workflow run`:

```bash
# Trigger via gh (se permissionada)
gh workflow run sync-vercel-envs-staging.yml --repo tesgueira-creator/website-reiki --field environment=preview
# ou força um push vazio para disparar a pipeline
git commit --allow-empty -m "retry staging deploy" && git push origin staging
```

---

## Segurança & boas práticas
- Nunca cometes tokens em texto claro no repositório; usa placeholders e mantenha os tokens apenas em GitHub Secrets. Já removemos um token em texto claro nos documentos e substituímos por `REDACTED`.
- Concede ao token Vercel os scopes mínimos necessários (deploys / project / env) e revoga tokens desnecessários.

Se quiseres, eu posso: (A) aguardar enquanto adicionas os secrets e depois eu dispare o deploy e monitorizo, ou (B) fornecer os comandos exatos para cada secret que queres definir agora. Diz-me qual preferes. :)