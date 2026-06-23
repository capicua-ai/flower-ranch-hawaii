# Flower Ranch Hawaii — Design Contract

Design foundation for the eCommerce storefront + `/wholesale` B2B page.
Derived from the client's reference (Hawaiian Host / Mauna Loa), the eCommerce
mockup PDF, and the existing v1 wholesale site.

## Brand profile

- **Domain:** premium Hawaiian longan — DTC eCommerce + B2B wholesale
- **Positioning:** premium, transparent, family-farm heritage
- **Archetype:** Caregiver / Host — warm, trustworthy, generous
- **Energy:** calm-to-warm; tropical, organic, not loud
- **Reference:** hawaiianhost.com/pages/maunaloa (teal + lime, playful-premium)

## Color tokens (see `src/app/globals.css`)

| Token | Hex | Use |
|---|---|---|
| `--fr-lime` (primary) | `#8ED85F` | CTAs, links, active states — **ONLY** |
| `--fr-teal` | `#004655` | dark sections (hero base, footer, product) |
| `--fr-teal-deep` / ink | `#00343F` | headings + body text |
| `--fr-wash` (secondary) | `#E8FCFF` | light section fills, soft cards |
| `--fr-cream` | `#FBFDF8` | warm alt-section background |
| `--fr-border` | `#CDE3E6` | borders — **neutral teal-gray, never a lime tint** |
| `--fr-muted` | `#4A6B73` | secondary text |

**Critical rule (from the v2 retrospective):** the vivid color (lime) must never
land on structural tokens (`--border`, `--secondary`). Lime is reserved for
interactive elements. Structure uses pale teal wash + neutral teal-gray.

## Typography

- **Sans (headings + body):** Inter — matches v1
- **Mono (uppercase labels, spec values, prices):** JetBrains Mono — matches v1
- Wired via `next/font/google` in `src/app/layout.tsx` (`--font-sans`, `--font-mono`)

## Product Tree

```
app/
├── (store)                       ← public, no auth
│   ├── page.tsx                  ← Home: hero, benefits, product cards, video, delivery journey, blog teaser, footer
│   ├── products/page.tsx         ← Catalog grid (Fresh Longan, Fresh Lychee, Dried Longan)
│   ├── products/[slug]/page.tsx  ← Product detail: gallery, nutrition, add-to-cart, specs
│   ├── blog/page.tsx             ← Blog index (3 articles)
│   ├── blog/[slug]/page.tsx      ← Article
│   └── wholesale/page.tsx        ← B2B landing (v1 content, restyled to new palette)
│
├── (shop-auth)                   ← authenticated (Souped)
│   ├── checkout/page.tsx         ← Cart → checkout
│   ├── account/page.tsx          ← Profile
│   └── orders/[id]/page.tsx      ← Order history + detail
│
└── not-found.tsx                 ← 404 with brand personality
```

Auth boundary: `/checkout`, `/account/*`, `/orders/*` protected via `src/proxy.ts` matcher.
Everything else public.

## Responsive

Mobile-first. Breakpoints: sm 640 / md 768 / lg 1024 / xl 1280. Touch targets ≥44px.
Honor `prefers-reduced-motion` for all hero/scroll motion (carry over v1 approach).

## Assets

Reused from v1 (`public/assets/`): hero videos, longan/lychee photos, badge stamp,
logos, packaging shots, social icons, story imagery.
