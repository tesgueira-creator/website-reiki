# Managing Vercel Secrets & Stripe Webhooks

This project uses Vercel environment variables and Stripe for payments. For production security and maintainability we recommend the following:

1. Named Secrets in Vercel (recommended)

- Create the following **Secrets** in Vercel Dashboard (Project → Settings → Environment Variables → Add):
  - `sanity-project-id` → value: `q0bdmt5v` (or your project id)
  - `sanity-dataset` → value: `production`
  - `stripe-secret-key` → value: your `sk_test_...` or `sk_live_...`
  - `stripe-publishable-key` → value: your `pk_test_...` / `pk_live_...`
  - `stripe-webhook-secret` → value: your webhook signing secret (set after creating webhook in Stripe)

- After creating the secrets, the `vercel.json` references will work (the file uses `@sanity-project-id`, `@stripe-secret-key`, etc.).

2. Add SANITY write token (for webhook support)

- In Sanity UI: Project → Settings → API → Tokens → Create token with `datasets.write` for `production`
- Add this token to Vercel as `SANITY_WRITE_TOKEN` (Production + Preview + Development).

3. Stripe Webhook setup

- In Stripe Dashboard → Developers → Webhooks → Add endpoint:
  - Endpoint URL: `https://<your-vercel-domain>/api/webhook/stripe`
  - Events to send: `checkout.session.completed` (and others you need)
- Copy the webhook *signing secret* and add it to Vercel as `stripe-webhook-secret` (set as secret)

4. Notes & Testing

- Local testing: use `stripe listen --forward-to localhost:3000/api/webhook/stripe` and run `stripe trigger checkout.session.completed` to simulate events.
- Once `SANITY_WRITE_TOKEN` is set, webhook handler will record orders into Sanity (document type `stripeOrder`).

---

If you want, I can create the named secrets in your Vercel project for you — I might need a Vercel API token with the necessary scopes. Otherwise, you can create them quickly in the Dashboard (it takes 1–2 minutes).