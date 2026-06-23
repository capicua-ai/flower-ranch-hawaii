# SOUPED.md

This file tracks every decision made on this project regarding the Souped suite — any tool, skill, or agent under the `souped` plugin (auth, design, Chalk, Carte, Spark, Shelf, Fond, and anything added later).

## USE IT AS A GUIDE, NOT AS GROUND TRUTH

It speeds up agents by pointing at what was done previously and where to look. But it can drift: someone may have changed signup restrictions, added a Chalk table, or rotated a Vercel domain outside of the orchestrator's flow.

**Rules for ANY agent or skill in the `souped` plugin:**

1. **Read this file at the start of every session** for orientation about prior decisions.
2. **Before acting on a specific value, verify it against the real source** — the appropriate Souped MCP tool, the codebase, or the database. Example: if a recent entry says signup restriction is `open` and you need that value to do something, call the Glaze MCP and confirm. **Do not assume.**
3. **If verification reveals a mismatch:** corroborate the new value with a second source so you're confident it's real, then append a `drift detected` entry to the log (see format below) **in the same change as your action**.
4. **After ANY Souped operation, append one entry to the Decisions log below.** This is the only structured place you record what happened — there are no per-subsystem sections to fill in. The log itself is the project's memory.

---

## Project meta

- **Name:** Flower Ranch Hawaii
- **SOUPED.md created on:** 2026-06-23
- **Repo URL:** https://github.com/capicua-ai/flower-ranch-hawaii
- **Souped project ID:** 5c68ad6f-b655-450e-9f71-cde30db3551c
- **Workspace slug:** ws-blue-moss-N6xAsK (Pablo's Workspace)

Anything else (Vercel project, primary domain, current auth scope, registered Chalk tables, Carte pages, Shelf buckets, design contract location, env-var names, etc.) lives in the Decisions log. Don't carve out subsystem sections here — let the log be the single timeline.

---

## Decisions log

Append-only. Newest entries at the bottom. One entry per Souped operation.

**Format:**

```
YYYY-MM-DD — <tool-or-subsystem> — <short title>
<1–3 sentences explaining what happened and why. Mention values an agent might
want to verify later (route patterns, table names, role names, domain, env
var names — never values).>
```

**Examples** (illustrative — replace with real entries as the project evolves):

```
2026-06-19 — scaffolder — initial scaffold
Cloned from souped-boilerplate. Stack: Next.js 16 + Prisma 7 + Souped auth.

2026-06-19 — souped-mcp — Souped project created
Project ID abc123 in workspace acme. Audience: webapp:abc123.

2026-06-19 — auth-scaffolder — DB-backed users wired
auth_scope=global (matcher unchanged). Added Prisma User model with roles
enum [admin, member]. requireRole helper in src/lib/auth.ts.

2026-06-19 — chalk — registered 'faqs' table
Collection of FAQ items. Consumed by /about page (FaqList component).
Editable from Souped → Chalk.

2026-06-19 — carte — registered '/' SEO entry
Public landing. Robots: index. OG image at /og/landing.png.

2026-06-19 — spark — first deploy
Vercel project: acme-app. URL: https://acme-app.vercel.app. Env vars set:
DATABASE_URL, SOUPED_CLIENT_ID, SOUPED_CLIENT_SECRET, SOUPED_SESSION_SECRET.

2026-06-19 — drift detected — signup restriction
SOUPED.md log implied 'open' (no prior entry stating otherwise). Glaze MCP
returned 'domain-allowlist' (acme.com). Confirmed via dashboard. Logging
correction so future sessions see the current state.
```

### Entries

- 2026-06-23 — meta — SOUPED.md initialized from boilerplate. Will track every Souped-suite decision on this project from now on.
- 2026-06-23 — scaffolder — initial scaffold. Cloned souped-boilerplate (Next.js 16 + Prisma 7 + Souped auth). Repo: capicua-ai/flower-ranch-hawaii (private). Local: /Users/capicua/Desktop/Claude/flower-ranch-hawaii.
- 2026-06-23 — souped-mcp — Souped project created. ID 5c68ad6f-b655-450e-9f71-cde30db3551c (slug pj-kind-lake-zLSLSF) in workspace ws-blue-moss-N6xAsK. client_id/secret issued; not yet placed in env (auth wiring pending).
- 2026-06-23 — spark — database created. Neon Postgres provisioned for the project. DATABASE_URL stored in local .env.local only.
- 2026-06-23 — spark — deploy DEFERRED. create_vercel_project failed: Vercel token on Hobby plan can't deploy a private org-owned repo (capicua-ai). User chose to defer Vercel + deploy until billing is resolved. No Vercel project exists yet.
- 2026-06-23 — design — design contract locked (see DESIGN.md). Palette: lime #8ED85F (action only), deep teal #004655 (dark surfaces/ink), pale teal wash #E8FCFF + neutral teal-gray border #CDE3E6 (structural — vivid never on structural tokens, per v2 retrospective). Fonts: Inter + JetBrains Mono (matching v1). Applied to src/app/globals.css + layout.tsx.
- 2026-06-23 — environment — project lives in DEV Souped, not prod. The connected Souped/Spark MCP (e1f77d53) targets the dev environment, so project 5c68ad6f + its database are dev-only. Confirmed: visible in dev Souped dashboard, not prod. Fine while building locally (deploy deferred). When promoting to prod: connect the prod Souped plugin, recreate project + DB in prod, wire prod SOUPED_* creds. Do not assume the project ID/DB carry over to prod.
- 2026-06-23 — prisma — migration init_storefront_content. Added models: SiteSettings (singleton), Product, BlogPost, Benefit, DeliveryStep (tables site_settings, products, blog_posts, benefits, delivery_steps). Seeded via spark run_sql. Note: prisma CLI loads .env not .env.local — pass DATABASE_URL inline for migrate/generate. After migrate, RESTART the dev server (it caches the generated client).
- 2026-06-23 — chalk — registered 5 tables for the storefront. site_settings (singleton: hero copy + contact email), products (collection, full CRUD; specs/gallery kept as code-managed JSON), blog_posts (collection, full CRUD, body=markdown), benefits (collection, create/delete LOCKED — fixed 5, icon=select), delivery_steps (collection, create/delete LOCKED — fixed 5, icon=select). Pages read from DB via src/lib/store-data.ts (now DB-backed); icon strings → lucide via src/lib/icon-map.ts. Editable at Souped → Chalk.
