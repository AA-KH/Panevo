# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Artifacts

- **panevo** (`/`) — PANEVO website (Phase 3 QA pass complete). Brand site for India's first pre-flavoured fresh paneer (Shatkona Ventures Pvt Ltd). 8 pages: Home, Products, Our Story, Nutrition, Subscribe, Find Us, Contact, Recipes (+ dynamic recipe detail). Three personas (Q-Com buyers, subscription households, health/gym). All integrations (Razorpay, Google Maps, GA4/Hotjar, MSG91 webhook) are stubbed in Phase 1 — wire real endpoints in Phase 2. See `attached_assets/PANEVO_Phase1_Master_Build_Prompt_*.md` for the full spec and `attached_assets/PANEVO_Phase3_MasterQA_Prompt_*.md` for the Phase 3 QA pass.

  **Phase 3 QA fixes applied:**
  - Footer: replaced "Pending"/"Coming Soon" placeholder strings with FSSAI ("FSSAI licensed — licence number displayed on pack") + company info per spec; added panevoindia/trade emails + nav aria-label.
  - StickyBottomBar: bumped to ≥64px height with `env(safe-area-inset-bottom)` padding; added `role="navigation"` + `aria-label="Quick order"`. App `<main>` padding-bottom now matches via `.main-with-sticky-bar` CSS.
  - Skip-to-content link added in App.tsx; `<main id="main-content">`.
  - 404/Legal pages re-skinned to brand (no more grey template / "Phase 1 Placeholder").
  - SEO component now emits per-page canonical, `og:*`, twitter, `robots`. Page titles updated to spec §8 wording.
  - Subscribe: added required body copy "Cancel or pause from your account dashboard in one click — no emails, no calls, no fine print." above the wizard.
  - Home: India's First badge now also on first product card (per spec §9.1); product grid now `<ul>/<li>` semantic.
  - Contact: Trade form now displays "Our team responds within 48 hours." adjacent to submit.
  - CSS: Hover effects on `.card-lift`, `.recipe-lift`, `.cta-primary`, `.qcom-shimmer` gated behind `@media (hover: hover)`. Global `:focus-visible` 2px Terracotta outline with 2px offset. `scroll-margin-top: 80px` on `section[id]`. Fluid clamp() for unsized headings.

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
