# Decisões de Secrets — resumo e justificativa 📋

> Estado: decisões tomadas e gravadas em ficheiros de suporte. Nunca grave valores reais neste repositório; use os scripts para injectar os valores em GitHub.

---

## 1) Decisão principal
- A opção escolhida foi criar um **script interativo** (`scripts/add-secrets.sh`) que pede cada valor e executa `gh secret set` automaticamente.
- Por defeito o script adiciona os segredos ao **environment `staging`** (em vez de repo-level ou `production`) para reduzir risco de exposição e permitir testes com chaves de *test* (ex: Stripe test keys).

## 2) Porquê estas decisões
- Interativo: protege contra vazamento acidental (o utilizador insere os valores localmente) e admite validação antes de executar os comandos.
- `staging` por defeito: é a prática segura para testes; dados reais de produção devem ser adicionados manualmente e com cuidado (review, restrições de environment no GitHub).
- Google key em base64: evita quebras de linha e problemas com JSON em variáveis de ambiente.

## 3) Ficheiros criados
- `scripts/add-secrets.sh` — script interativo (permite override do `--env` e suporta leitura de ficheiro para a Google key).
- `scripts/add-secrets-template.sh` — template não-interativo com placeholders (útil para pipelines CI que já têm os valores disponíveis).
- `DOCS/ADICIONAR_SECRETS.md` — já existente (contém exemplos), mantido com `PLACEHOLDER_...`.
- `DOCS/SECRETS_DECISIONS.md` — este ficheiro (decisões e justificativa).

## 4) Fluxo recomendado (rápido)
1. Executar localmente: `bash scripts/add-secrets.sh` e seguir prompts. (Recomendado: use `staging`.)
2. Validar com: `node scripts/validate-secrets.js` (verifica que a app tem todos os segredos necessários).
3. Disparar deploy de staging via workflow: `gh workflow run deploy-to-vercel-staging.yml --repo tesgueira-creator/website-reiki`.

## 5) Notas sobre produção
- Para `production`: crie um environment `production` no GitHub com restrições (quem pode aprovar deploys). Adicione os segredos de produção manualmente ou usando o template não-interactivo com cuidado.

## 6) Segurança & Boas práticas
- Nunca partilhe segredos em canais não-encriptados.
- Roteie as permissões do `VERCEL_TOKEN` ao mínimo necessário (deploy + alias para rollback quando estritamente necessário).
- Rotacione chaves regularmente e armazene uma nota de auditoria para alterações de `production`.

---

Se quiseres, posso agora: 1) executar o script interativo aqui (se me forneceres os valores) ou 2) apenas gravar os ficheiros (feito). Diz-me se queres que eu crie um commit separado para estes ficheiros e faça push para a branch `staging`.
