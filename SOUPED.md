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
- 2026-06-23 — auth — wired Souped auth (scope: specific routes). Enabled auth on dev project; redirect URI http://localhost:3000/api/auth/callback. SOUPED_* + SOUPED_SESSION_SECRET in .env.local (NOT yet on Vercel — deploy deferred). Added Prisma User model (table users, migration add_user) synced from JWT sub/email/roles. src/lib/auth.ts: getOrCreateUser (lazy upsert), requireUser, requireRole. Protected routes: /account, /checkout, /orders (NOT in proxy publicRoutes); storefront stays public. Verified: /account & /checkout → 307 /api/auth/login; public routes 200. The scaffolder agent was launched but paused on approval and could not be resumed (no resume tool surfaced); orchestrator completed the wiring directly per the agent's stated plan.
- 2026-06-23 — chalk — registered 5 tables for the storefront. site_settings (singleton: hero copy + contact email), products (collection, full CRUD; specs/gallery kept as code-managed JSON), blog_posts (collection, full CRUD, body=markdown), benefits (collection, create/delete LOCKED — fixed 5, icon=select), delivery_steps (collection, create/delete LOCKED — fixed 5, icon=select). Pages read from DB via src/lib/store-data.ts (now DB-backed); icon strings → lucide via src/lib/icon-map.ts. Editable at Souped → Chalk.
- 2026-06-23 — deploy constraint (IMPORTANT) — this v2 build MUST NOT replace or overwrite the existing v1 reference site. v1 is a SEPARATE project: code at ~/Documents/Antigravity/flower-ranch-hawaii, its own repo, live at https://flower-ranch-hawaii.vercel.app, its own Vercel project. v2 = repo capicua-ai/flower-ranch-hawaii, not yet deployed. When deploying v2: create a NEW Vercel project with a DISTINCT name + NEW URL; never deploy into v1's Vercel project and never reassign v1's `flower-ranch-hawaii.vercel.app` domain (or any v1 domain) to v2 unless the user EXPLICITLY says so. We have only ever read v1 as a design reference — never written to it.
- 2026-06-24 — auth — `/checkout` made PUBLIC (temporary). Added `/checkout` to proxy `publicRoutes` so the new client-side cart review (no payment, no sensitive data — cart lives in localStorage) is reachable without login. `/account` and `/orders` stay protected. Revert (remove `/checkout` from publicRoutes) when a real payment/account flow lands. See note in src/proxy.ts.
- 2026-06-24 — feature — functional cart added (no payments). Client cart context (src/components/store/cart-context.tsx, persisted to localStorage key `fr-cart-v1`) + cart-drawer, card-add-button, product-buy-buttons, checkout-client. Header shows live count; /checkout is a preview review with a placeholder "Place order" (clears cart, no charge). Real payment (Stripe or other) DEFERRED until provider/shipping/tax are decided.
- 2026-06-24 — spark — v2 DEPLOYED to its OWN NEW Vercel project (v1 untouched, per the deploy constraint above). Project name `flower-ranch-hawaii-v2`, Vercel id prj_Oft0iNzPGsq19VhfgSXc2uH01yMg, Souped project 5c68ad6f. Live URL: https://flower-ranch-hawaii-v2.dev.getsouped.app. All 9 env vars (DATABASE_URL [dev Neon], NEXT_PUBLIC_APP_URL, SOUPED_URL/CLIENT_ID/CLIENT_SECRET/APP_ID/AUDIENCE/ISSUER/SESSION_SECRET) set on Vercel. DB is still the DEV Neon (shared preview, not prod). Deploy flow: auto-deploy triggers on pushes to `main` only; we work on `pablo/ecommerce-storefront`, so to deploy we fast-forward main to it (`git push origin pablo/ecommerce-storefront:main`). The Spark manual-deploy tool rejected `ref` (target error), so main-push is the working path. Build fix needed: cast Prisma Json fields via `unknown` in store-data.ts (next build type-checks; Turbopack dev did not). AUTH redirect URIs in Souped NOT yet updated for this URL — /account & /orders login will fail until https://flower-ranch-hawaii-v2.dev.getsouped.app/api/auth/callback is added via glaze_update_redirect_uris; storefront + cart + /checkout are public and work without it.
- 2026-06-25 — glaze — redirect URIs updated (login now works on the live v2). allowedRedirectUris now = ["http://localhost:3000/api/auth/callback", "https://flower-ranch-hawaii-v2.dev.getsouped.app/api/auth/callback"]. authEnabled=true confirmed. NOTE: glaze_update_redirect_uris REPLACES the whole list — include every URI when editing. Login UX = account icon → /account (gated → Souped login); /account shows email + "Sign out" (/api/auth/logout). No separate Sign-in button in the nav by design.
- 2026-06-25 — spark — v2 redeployed (design iteration batch). Pushed commit 51afa6b to `pablo/ecommerce-storefront` then fast-forwarded `main` (the working deploy path). Vercel deployment dpl_7USthjwksawKob8DzBDhDXwRU1Q9 → state READY, build 28s (compiled + TypeScript OK, 15 routes; /products now ƒ dynamic due to `?q=` search). Changes: hero_video2 bg @0.65x + 0.25px blur (HeroVideo client component forces play()), floating closing CTA (banner.png) inside the story section, numbered roadmap + dimensional mint circles, benefits bento icons removed + shorter cards, nutrition tile = 4 equal count-up stats (2×2, vertical divider), navbar in-pill animated search → /products?q= with filtering + empty state, orchard video = placeholder_video. v1 untouched. Live: https://flower-ranch-hawaii-v2.dev.getsouped.app
- 2026-06-25 — drift detected — Spark MCP workspace. SOUPED.md records this project under workspace ws-blue-moss-N6xAsK. One connected Spark MCP now reports different workspaces (ws-eager-ash-kNWYj3, ws-past-isle-7_h1G0) with no Vercel creds; the deployment-logs call only succeeds via the MCP instance still bound to ws-blue-moss-N6xAsK. Future sessions: use the ws-blue-moss-N6xAsK-bound Spark connection for this project's Vercel ops, or reconfigure credentials.
- 2026-06-26 — spark — v2 redeployed (motion + mesh batch). Commit 249b04f → main (FF). Vercel dpl_2Z156KtCQq5DLAvKfJ8di8PapExk → READY, build 20s (compiled + TS OK, 15 routes). Changes: seamless ping-pong hero loop (hero_video2_loop.mp4, generated via ffmpeg fwd+reverse concat) + 0.25px blur; new MeshBackground component (grainy aurora mesh — lime/green/teal blobs blur(100px) + film grain, intensity 0.5, grain 0.8) on Benefits & Our Story, Products/Blog kept white for rhythm; new InView component (subtle scroll-reveal on section headers/grids); RoadmapSteps client component (flowing dashed connector via fr-flow keyframe + staggered 01→05 reveal, flat circles, cream halo removed); pill CTAs dropped the arrow icon (kept on text links). New CSS in globals.css: fr-search-in, fr-flow, fr-step/fr-steps-in, fr-inview (all gated by .js + reduced-motion). Note: Turbopack dev needs a `.next` clear + restart to pick up new globals.css rules. v1 untouched. Live: https://flower-ranch-hawaii-v2.dev.getsouped.app
- 2026-06-26 — spark — v2 redeployed (botanical illustrations). Commit c22e490 → main (FF). Vercel dpl_6hZz4GERpdUnFJS5pH7fLvAPcdoM → READY, build 23s. New CornerBotanical component (corner-anchored edge-bleeding decorative art, aria-hidden, -z-10, hidden on mobile). Added user-supplied painterly PNGs (public/assets/bg-asset-1..4.png, transparent): a new "Rooted in Hawaiʻi / Grown on the Hāmākua Coast" 2-col editorial band (image farm-bg.png + text) framed by branch art on fr-wash bg; subtle corner accents on Blog (leaf + fruit cluster) and on the Benefits bento (low-opacity branches over the mesh). Sizing via inline style — Turbopack dev doesn't reliably generate arbitrary `w-[%]` classes. v1 untouched. Live: https://flower-ranch-hawaii-v2.dev.getsouped.app
- 2026-06-26 — spark — v2 redeployed (interior-header art). Commit 7a8875a → main (FF). Vercel dpl_64FugbSxm5LAzG1YfoepE2gTGKCi → READY, build 22s. Added CornerBotanical (bg-asset-2 branch) bleeding from the right of the teal page headers on /products and /blog (relative isolate overflow-hidden, content set relative). /wholesale skipped (video-bg hero, hidden from nav). v1 untouched. Live: https://flower-ranch-hawaii-v2.dev.getsouped.app
