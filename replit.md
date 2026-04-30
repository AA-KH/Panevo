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

  **Post-import polish (April 30, 2026):**
  - Auto scroll-to-top on every route change via new `<ScrollToTop />` component (`src/components/ScrollToTop.tsx`); preserves native anchor jumps when URL contains a hash.
  - PANEVO logo in Navbar now smooth-scrolls to top when clicked while already on `/`.
  - Fixed CTA hover: replaced `background-color: color-mix(... white)` (which made white text disappear on a peach background) with `filter: brightness(0.92) saturate(1.05)`. Now darkens uniformly across `bg-primary`, `bg-secondary`, `bg-white` and text-only CTAs without colour conflicts.
  - Hero gradient rebuilt: removed muddy mix-blend overlays; now uses a clean dark vignette + terracotta radial glow from bottom-left + subtle saffron highlight from top-right.
  - Home → "Your Weekly Paneer Box. Sorted." section: Weekly / Fortnightly / Monthly are now real `<button role="radio">` controls in a radiogroup. Heading, body copy and CTA label all update live based on selection. CTA deep-links to `/subscribe?frequency=…`, which Subscribe.tsx now reads as a fallback for the `?plan=` param.
  - Fixed pre-existing TS7030 in Navbar.tsx (early-return in body-scroll-lock effect).

  **Engagement / conversion additions (April 30, 2026):**
  - New `TrustStrip` (`src/components/sections/TrustStrip.tsx`): 4-stat horizontal band on Home (10-min delivery, 76% reorder, 0 preservatives, FSSAI). Sits between hero and Q-Com strip.
  - New `PincodeChecker` (`src/components/sections/PincodeChecker.tsx`): interactive widget on Home that validates 6-digit pincode against serviceable prefixes (160 / 140 / 134 / 122). On hit → reveals Q-Com platform buttons (tracked as `qcom_click` with `pincode_check_hit`). On miss → notify-me email form (tracked as `coming_soon_signup`). Uses framer-motion AnimatePresence for state transitions.
  - New `TestimonialsCarousel` (`src/components/sections/TestimonialsCarousel.tsx`): replaced static 3-card grid with autoplay carousel (6s interval, pauses on hover/focus, respects `prefers-reduced-motion`), prev/next arrows, dot pagination, 5 testimonials with author + city + flavour.
  - New `NewsletterSignup` (`src/components/sections/NewsletterSignup.tsx`): added as 4th column in Footer (`md:col-span-4`). Email capture with sonner toast, fires `waitlist_signup` analytics with `source: footer_newsletter`. 600ms simulated delay — wire to MSG91/Mailchimp endpoint in Phase 2.
  - Home FAQ accordion: 5 hand-picked objection-handling questions from `data/faqs.ts` (no marination, pause anytime, zero preservatives, kid-friendly, city availability) using existing Radix Accordion. Includes "Still curious? Chat with us" link to `/contact`.
  - Navbar Order-Now dropdown polish: outside-click + Escape key close, framer-motion enter/exit (`origin-top-right` scale+fade), chevron rotation, `aria-haspopup="menu"`, `role="menu"`/`menuitem`.

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
