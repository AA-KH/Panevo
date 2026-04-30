# PANEVO Website — Phase 3: Master QA & Refinement Prompt
**For: Replit AI Coding Agent**
**Version: Final · April 2026**

---

## 1. PROJECT CONTEXT

You are working on the PANEVO website — a premium Indian paneer startup whose brand identity is **Fresh | Flavoured | Ready**. The site is built as a 7-page brand platform for Shatkona Ventures Private Limited at **panevo.in**.

**Brand constants you must not alter:**
- Brand name: PANEVO (always uppercase)
- Tagline: Fresh │ Flavoured │ Ready
- Primary colour: Terracotta `#BF3D0B`
- Secondary colour: Forest Green `#1B4332`
- Accent: Saffron Gold `#C9A227` (badges only — never as background)
- Neutral: Warm Cream `#F2EEE5` (~60% of site)
- Near Black: `#1A1A1A` (display headlines)
- Muted Text: `#777777`
- Display font: Clash Display Bold (or Neue Haas Grotesk Display 75)
- Body font: DM Sans Regular 400, 17–18px, line-height 1.6
- Brand symbol: Shatkona △▽
- Brand signature: 45° angled notch on bottom-right corners of buttons and card elements

**The three buyer personas the site must serve simultaneously:**
1. **Q-Com Buyer** — wants one fast "Order Now" button and platform logos (Blinkit/Zepto/Swiggy Instamart)
2. **Subscription Household** — wants low-friction plan selection, pause/cancel reassurance, and weekly box framing
3. **Health/Gym Consumer** — wants protein numbers upfront (18g/100g), clean-label proof, and macro comparison

**Pages (7 total):** Home · Products · Nutrition & Protein · Subscribe · Recipes · Our Story · Find Us / Contact

**Phase 1 and Phase 2 are already built.** Do not rebuild or re-architect. Do not reopen strategy. Fix only what is broken, weak, inconsistent, off-brand, or inaccessible.

---

## 2. PHASE 3 GOAL

Deliver the site in final-review-ready condition. After this phase, only minor feedback-level changes should remain. Every fix must be targeted, high-value, and precisely executed.

**Success criteria:**
- A real consumer from each of the three personas can find their primary CTA within 2 scrolls on mobile
- No console errors, broken routes, or placeholder strings visible to end users
- The site feels premium, complete, and distinctly PANEVO — not templated or generic
- All animations, hover states, and transitions execute without jank
- All interactive elements are accessible by keyboard and screen reader
- Every form behaves correctly and every sticky element behaves correctly on all screen sizes

---

## 3. AUDIT SCOPE

Audit every page and every major component on both desktop (1440px wide reference) and mobile (375px and 390px reference). Test every route. Test every form. Simulate each persona's journey from entry to conversion. Do not skip any page or section.

**Pages to audit in full:**
1. Home (all 9 sections including footer)
2. Products (all 3 flavour cards + Coming Soon section)
3. Nutrition & Protein (all sections including comparison chart and FAQ)
4. Subscribe (plan cards + wizard + trust signals)
5. Recipes (grid + filter + individual recipe view)
6. Our Story (founder bios + Shatkona section + flavour roadmap)
7. Find Us / Contact (Q-Com links + store locator + trade form)

**Components to audit:**
- Global navigation (desktop + mobile hamburger)
- Sticky nav bar (desktop) and sticky bottom CTA bar (mobile)
- Footer
- All modal/overlay states
- All form states (empty, error, success)
- All hover and focus states

---

## 4. ISSUES TO LOOK FOR

### 4.1 Mobile Layout

- [ ] Any element overflowing its container horizontally — fix with `overflow-x: hidden` on the container and correct the root cause
- [ ] Any section with text that becomes unreadable below 375px — enforce a minimum font size of 15px on body text, 28px on section headings
- [ ] Sticky bottom bar (Q-Com order strip) overlapping page content — ensure it has a fixed height (minimum 64px), the body has matching `padding-bottom`, and no content is permanently hidden behind it
- [ ] Tap targets smaller than 44×44px — increase all interactive elements to minimum 44px height and width on mobile
- [ ] The subscription plan wizard: on screens below 390px, all three steps must stack cleanly and not require horizontal scrolling
- [ ] Product cards on the homepage and Products page: on mobile, cards must stack to single-column. Grid must not attempt 2-column below 400px viewport
- [ ] Navigation hamburger menu: overlay must cover full viewport, scroll within the menu must not affect the page behind, and close button must be clearly visible and minimum 44×44px
- [ ] Hero section on mobile: the CTA buttons must not be hidden below the fold. If the hero headline is long, reduce font size or truncate to ensure both CTAs are visible without scrolling on a 667px-height screen (iPhone SE baseline)
- [ ] The Shatkona △▽ animation must not cause layout shift on mobile. It must be `position: absolute` within a `position: relative` container that has defined dimensions before the animation fires
- [ ] Footer on mobile: columns must stack vertically. No two-column footer layout below 480px

### 4.2 Sticky Elements

- [ ] Desktop sticky nav: must not obscure anchor-linked section headings — add `scroll-margin-top` equal to nav height on all anchor target sections
- [ ] Mobile sticky bottom bar: test that it does not conflict with iOS Safari's bottom browser chrome — use `env(safe-area-inset-bottom)` in the `padding-bottom` calculation
- [ ] On the Subscribe page, if a sticky plan summary bar is present, verify it does not conflict with the mobile sticky CTA bar
- [ ] On scroll past the hero, verify the sticky nav switches to its scrolled state (reduced height, background fills) without a flash or jump

### 4.3 Animation and Motion

- [ ] The hero staggered text reveal (600ms total): brand name → tagline → CTAs. Verify the sequence fires on page load, not on scroll. Verify it does not replay on tab switch
- [ ] Scroll-reveal animations (24px slide-up + fade): verify they use `IntersectionObserver` or equivalent — not `scroll` event listeners. If JS is used, ensure `will-change: transform, opacity` is set only during animation, then removed
- [ ] Product card hover (lift 6px, shadow deepen, image scale to 102%): verify 250ms ease-out. Verify there is no hover state on touch devices — use `@media (hover: hover)` to gate all hover effects
- [ ] Macro counter animation (numbers count up to 18 on scroll): verify it fires exactly once when the section enters the viewport. Verify it completes at the correct final value regardless of scroll speed. Add `prefers-reduced-motion` fallback that shows the final number immediately without animation
- [ ] Q-Com button shimmer sweep: verify it uses CSS `background-position` animation, not JavaScript. Verify it does not cause repaints on the main thread
- [ ] Verify `prefers-reduced-motion: reduce` is globally respected — all scroll reveals, count-ups, and shimmer effects must be disabled when this media query is active

---

## 5. FIX PRIORITIES

Resolve issues in this order. Do not move to a lower priority until higher-priority issues are fixed.

**P1 — Blocking (must fix before any review):**
- Broken routes or 404 pages
- Visible placeholder text (any `[INSERT...]`, `[LAB CONFIRM]`, `[PLACEHOLDER]` strings in the live UI)
- Forms that do not submit or produce console errors
- Sticky bottom bar hiding primary CTAs on mobile
- Hero CTA buttons not visible on mobile without scrolling
- Any animation causing layout shift (CLS)

**P2 — High impact (fix in same pass):**
- Copy repetition: if any claim appears verbatim in more than two sections on the same page, remove the weaker instance
- CTA hierarchy violations (more than two competing CTAs visible at once on any screen)
- Trust signals missing before the subscription wizard (see Section 9)
- Contrast failures (see Section 8)
- Hover states firing on touch devices

**P3 — Polish (fix after P1 and P2 are clean):**
- Spacing inconsistencies (see Section 10)
- Icon inconsistency
- Card shadow/radius inconsistency
- Footer completeness
- Edge states and empty states

---

## 6. PERSONA-BASED REVIEW

Simulate each of the following journeys in full and verify every step resolves correctly.

### Persona 1 — Q-Com Buyer (Age 25–50, mobile-first)
**Entry:** Direct to homepage on iPhone 14 (390×844px)
**Journey:** Land → see hero → see Q-Com strip or sticky bottom bar → tap "Order on Blinkit" → land on Blinkit product page (or placeholder page with correct URL structure if not yet live)
**Checks:**
- Blinkit, Zepto, and Swiggy Instamart buttons/links are present and visible within first 2 visible screen heights on mobile
- Sticky bottom bar is visible on every scroll position on every page
- The sticky bar shows all three platform names or icons — not collapsed below 320px
- No full-screen overlays or modals appear within the first 30 seconds that interrupt this journey

### Persona 2 — Subscription Household (Age 28–45, desktop or tablet)
**Entry:** Homepage → Subscribe page
**Journey:** Land → see subscription teaser section → tap CTA "Start Your Weekly Box" → land on Subscribe page → see plan cards → select a plan → enter wizard → see flavour selector → see delivery input → see payment step
**Checks:**
- Subscribe page hero trust signals are present: "No lock-in · Pause anytime · Fresh every delivery" visible above the plan cards
- Three plan cards (Weekly, Fortnightly, Monthly) are all visible without horizontal scrolling on desktop 1440px and tablet 768px
- "Weekly" card has a Terracotta "Most Popular" badge
- Pause/cancel language appears in plain body copy — not only in fine print or tooltip
- Wizard steps are clearly numbered (1 of 3, 2 of 3, 3 of 3)
- No forced account creation before step 3 (payment)
- Razorpay integration stub is present and labelled correctly — if not yet live, show a clear "Coming Soon — join waitlist" state rather than a broken payment form

### Persona 3 — Health/Gym Consumer (Age 19–40, mobile or desktop)
**Entry:** Homepage → Nutrition & Protein page
**Journey:** Land → see protein stat on homepage (18g/100g) → tap "See Full Nutrition →" → land on Nutrition page → see macro table → see protein comparison chart → see clean label → see fitness recipes
**Checks:**
- Protein stat (18g) is displayed as a large display number on the homepage, not buried in body copy
- The macro counter animation plays on scroll and resolves to the correct value
- On the Nutrition page: macro table is fully visible on mobile without horizontal scrolling — use a stacked layout below 480px if the table is wider than the viewport
- Protein comparison bar chart: bars are labelled (PANEVO · Chicken Breast · Eggs · Tofu · Soya Chunks) and values are readable at 375px width
- Clean label section shows three trust badges: "No Artificial Flavours · No Preservatives · No Additives"
- CTA "Shop PANEVO →" is present and in Terracotta at the bottom of the page

---

## 7. MOBILE AND DESKTOP CHECKS

### Mobile (375px–430px viewport width, test at 375px and 390px)

- [ ] No horizontal scroll at any point on any page
- [ ] All section headings are 28–40px on mobile (not 60–80px desktop sizes — implement responsive type scale)
- [ ] Product cards: 1-column stack with at least 16px padding on each side of card
- [ ] Q-Com strip: below hero, platform logos are visible without scrolling. On sticky bar: all three logos fit in a single row — use icon + short name or icon only if space requires
- [ ] Recipe filter: if filter tabs exist, they must scroll horizontally within their container with visible overflow indication (fade-out edge), not wrap to multiple rows
- [ ] Subscription wizard: each step occupies the full width of the screen. Input fields are minimum 48px height
- [ ] Store locator map: must render at full width and 300px minimum height on mobile. Map pins must be tappable (minimum 44px tap area)
- [ ] Navigation: hamburger icon must be in top-right, minimum 44×44px tap area. Menu must close on backdrop tap and on Escape key

### Desktop (1280px–1440px viewport width)

- [ ] Hero section: headline must not wrap to more than 2 lines at 1280px. Reduce font size if wrapping to 3+ lines
- [ ] Product cards: 3-column grid with consistent card heights. Cards in the same row must be equal height regardless of content length — use CSS Grid `align-items: stretch` with internal flexbox on card content
- [ ] Subscription plan cards: 3-column, equal height, equal width. The "Most Popular" badge on Weekly plan must not break the card height alignment
- [ ] Comparison table (plain paneer vs PANEVO): 2-column table must not exceed 800px max-width. Centre-align within the section. Table cell padding minimum 12px
- [ ] Nutrition macro comparison chart: container must not exceed 900px max-width. Bar labels must be readable at this width — minimum 13px font on axis labels

---

## 8. ACCESSIBILITY AND SEO CHECKS

### Contrast

- [ ] All body text on cream `#F2EEE5` background: foreground must be `#1A1A1A` or `#777777` (captions only). Verify both pass WCAG AA (4.5:1 for body text)
- [ ] Terracotta `#BF3D0B` buttons with white text: verify contrast ratio ≥ 4.5:1 (critical — terracotta on white passes but white on terracotta must be verified at the actual rendered button size)
- [ ] Saffron Gold `#C9A227` used on dark backgrounds for badge text: verify the specific background colour used and confirm ≥ 3:1 for large text badges
- [ ] Any text placed over a lifestyle photograph: must have a semi-transparent dark overlay (`rgba(0,0,0,0.45)` minimum) behind it. Do not rely on the photo background for text legibility

### Keyboard Navigation

- [ ] Tab order on every page must follow visual reading order (top-left to bottom-right)
- [ ] All interactive elements must be reachable by Tab and activatable by Enter or Space
- [ ] No keyboard focus traps except intentional modal dialogs (the subscription wizard modal if applicable — must trap focus inside and release on close)
- [ ] Skip-to-main-content link must be present and be the first focusable element on every page

### Focus States

- [ ] Remove any `outline: none` or `outline: 0` declarations that are not replaced by a visible custom focus indicator
- [ ] Custom focus state: use a 2px `outline` in Terracotta `#BF3D0B` with a 2px offset. Apply universally via `:focus-visible` (not `:focus`)
- [ ] Verify focus is visible on: nav links, CTA buttons, product cards (if they are `<a>` or `<button>`), form inputs, subscription wizard steps, filter tabs on Recipes page, and all footer links

### Semantic HTML

- [ ] Each page must have exactly one `<h1>`
- [ ] Section headings must use `<h2>` — do not use `<h3>` where `<h2>` is appropriate
- [ ] All product cards must use `<article>` or `<li>` within a `<ul>` — not bare `<div>` chains
- [ ] Navigation must use `<nav aria-label="Main">` (global nav) and `<nav aria-label="Footer">` (footer nav)
- [ ] Q-Com platform buttons must have `aria-label="Order on Blinkit"` (etc.) — logo-only buttons are not accessible without it
- [ ] All icons that are the sole content of a button must have either `aria-label` on the button or a visually hidden `<span>` inside it
- [ ] The sticky bottom bar must have `role="navigation"` and `aria-label="Quick order"`

### Forms

- [ ] Every form input must have an associated `<label>` — either visible or `visually-hidden` via CSS (not `display:none` or `visibility:hidden`)
- [ ] Error states must be announced to screen readers: use `aria-describedby` linking the input to its error message element, and `aria-invalid="true"` on the input when an error is present
- [ ] Trade enquiry form and city notification form: success state must be visible in the UI and include `role="alert"` so screen readers announce it
- [ ] The Razorpay subscription integration: if a payment iframe or redirect is used, the trigger button must have descriptive text ("Subscribe — Weekly Plan · ₹[price]") not just "Pay Now"

### SEO

- [ ] Every page must have a unique `<title>` tag and `<meta name="description">` that includes the primary keyword for that page:
  - Home: "PANEVO — India's First Pre-Flavoured Fresh Paneer | Order on Blinkit, Zepto"
  - Products: "PANEVO Flavoured Paneer — Black Pepper, Red Chilli, Oregano | ₹125 for 200g"
  - Nutrition: "Paneer Protein Per 100g — PANEVO Nutrition Facts & Comparison"
  - Subscribe: "PANEVO Weekly Paneer Subscription — Fresh, Pre-Flavoured, Delivered"
  - Recipes: "High-Protein PANEVO Recipes — Under 15 Minutes, Zero Marination"
  - Our Story: "About PANEVO — India's First Pre-Flavoured Paneer Brand"
  - Find Us: "Where to Buy PANEVO — Blinkit, Zepto, Instamart, Chandigarh Stores"
- [ ] `<meta name="robots" content="index, follow">` must be present on all public pages
- [ ] Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`) must be present on Home, Products, and Nutrition pages at minimum
- [ ] `<link rel="canonical">` must be present on every page pointing to its own URL
- [ ] Product structured data: implement `schema.org/Product` JSON-LD for each of the three flavours on the Products page (name, description, image, offers with price and priceCurrency)
- [ ] Verify Google Analytics 4 measurement ID is present and firing on all pages. Verify Hotjar tracking ID is present. Neither should fire until cookie consent is given if a consent banner is implemented
- [ ] XML sitemap must be present at `/sitemap.xml` and submitted to Google Search Console

---

## 9. TRUST AND CONVERSION CHECKS

### Homepage Trust

- [ ] The testimonials section must include: full first name, city, and a specific product reference. Generic quotes ("Great product!") do not build trust. Verify all three testimonials follow the format used in Option A of the source document
- [ ] The stat "76% of first-time tasters committed to buying weekly or daily" must include its source in small muted text beneath it: "(Sampling event, Chitkara University)" — unattributed statistics erode trust
- [ ] The India's First badge (Saffron Gold) must appear in the hero and at least once more on a product card — this is a primary category claim and must be seen on first scroll

### Product Page Trust

- [ ] Until NABL lab values are confirmed, all protein/macro values on product pages must display as "~18g protein per 100g (approx.)" — never as a precise value that has not been laboratory confirmed. Remove any `[LAB CONFIRM]` placeholder that is still visible in the UI
- [ ] Storage instruction must appear on every product card or product detail view: "Refrigerate at 1–4°C. Consume within 5 days of opening."
- [ ] FSSAI licence number: if the number is not yet confirmed, show "FSSAI licensed — licence number displayed on pack" rather than leaving a blank or a placeholder string

### Subscription Page Trust

- [ ] The three trust signals must appear above the plan cards — not below them: "No lock-in · Pause anytime · Fresh every delivery"
- [ ] Pause/cancel must appear in plain body copy on the page — not just in an FAQ or tooltip. The exact phrase "Cancel or pause from your account dashboard in one click" must be visible without expanding any accordion
- [ ] If subscription is not yet live: replace the payment step with a "Join the waitlist for early subscriber pricing →" CTA that captures email. Do not leave a broken Razorpay form

### Find Us / Contact Trust

- [ ] All Q-Commerce order links must either: (a) point to a live product listing URL, or (b) show a clear in-UI message: "PANEVO is being listed — search 'PANEVO' or 'pre-flavoured paneer' on [platform]". Never show a dead link or a 404
- [ ] Store directory table: if stores are not yet confirmed, show "Coming soon — sign up to be notified" rather than a list with empty addresses
- [ ] Trade enquiry form: response time promise ("Our team responds within 48 hours") must appear directly adjacent to the submit button — not only in the copy above the form
- [ ] Contact email `panevoindia@gmail.com` and trade email `trade@panevo.in` must be present in the footer as accessible `<a href="mailto:...">` links

### Footer Trust

- [ ] Footer must contain: PANEVO logo (white on Forest Green) · Page links · Social links · FSSAI licence statement · Registered company name (Shatkona Ventures Private Limited) · Registered address · Copyright line · "Made in India" mark
- [ ] Privacy Policy and Terms of Service pages must exist (even as stubs) and be linked from the footer — required for DPDP Act 2023 compliance
- [ ] If cookie consent / analytics banner is implemented, it must not cover the sticky mobile CTA bar

---

## 10. FINAL POLISH CHECKS

### Typography

- [ ] Display headlines (hero, section headings): Clash Display Bold. Verify the font is loading correctly — check for FOUT (flash of unstyled text). Implement `font-display: swap` on the `@font-face` declaration
- [ ] Body copy: DM Sans Regular 400, 17–18px, line-height 1.6. Verify this is applied globally and not overridden by component-level styles
- [ ] Section headlines on desktop: 60–80px. On mobile: 32–44px. Implement a fluid type scale using `clamp()` — e.g., `clamp(32px, 5vw, 72px)` for primary section headings
- [ ] Nutrition table: apply `font-variant-numeric: tabular-nums` to all numeric cells so digits align cleanly
- [ ] Muted secondary text (`#777777`) must not be used at sizes below 14px — this combination fails WCAG AA

### Spacing and Rhythm

- [ ] Establish a consistent vertical rhythm: section padding should be 80px top and bottom on desktop, 48px on mobile. Audit every section and normalize any that deviate significantly
- [ ] Inter-section spacing must be consistent. If one section ends with a 32px gap and the next starts with 16px, normalize to a single value
- [ ] Card grids: gap between cards must be consistent (24px desktop, 16px mobile). Audit all card grids (product cards, recipe cards, plan cards)

### Cards

- [ ] All product cards must have identical border-radius (recommend 12px) — audit for any card that uses a different value
- [ ] All cards must have identical shadow tokens — use one shadow definition for default state and one for hover state. Do not use bespoke shadows per card
- [ ] Card image areas: use `object-fit: cover` and a fixed aspect ratio (3:4 recommended for product packs, 4:3 for recipes). No stretched or squashed images

### Icons

- [ ] Audit all icon usage: every icon must come from one icon set. Do not mix Heroicons, Lucide, and Font Awesome on the same page
- [ ] Icon size must be consistent: 24px for inline body icons, 32px for feature icons in the Problem section columns
- [ ] Icons used without labels (platform logos excepted) must have `aria-label` or adjacent visible text

### Hover States

- [ ] Product cards: `transform: translateY(-6px)` + shadow deepens. Transition: 250ms ease-out. Only on `@media (hover: hover)`
- [ ] CTA buttons: lightens/darkens by 10% or uses the angled-notch brand detail as an animated reveal. Transition: 200ms ease
- [ ] Navigation links: underline reveal or colour shift to Terracotta. Transition: 150ms ease
- [ ] Platform logos (Q-Com strip): subtle opacity lift (0.85 → 1.0) on hover. No scale or translate — these are trust marks, not interactive cards
- [ ] All hover states must have a matching focus state (`:focus-visible`) so keyboard users see the same affordance

### Footer

- [ ] Footer columns must align to the same grid as the rest of the page content
- [ ] Social icons in footer: minimum 32px, use brand-correct colours, aria-labels required
- [ ] "Made in India ✦ Delivered in 10 minutes" line must appear in the footer body copy — not just as a tooltip

### Empty and Edge States

- [ ] Instagram UGC feed: if no posts are tagged or the API call fails, show a static fallback grid of 3–6 branded images — not an empty white box
- [ ] Recipe filter: if no recipes match a filter combination, show "No recipes for this filter yet — explore all recipes →" rather than an empty grid
- [ ] Store locator map: if the user's city is not a launch city, show "PANEVO is not yet available in your city — sign up to be notified" with an email capture below the map
- [ ] Any loading state that takes >300ms must show a skeleton screen or spinner — not a blank page section

---

## 11. WHAT NOT TO CHANGE

Do not alter any of the following unless a specific bug or accessibility failure requires it:

- The brand colour palette (hex values confirmed as pixel-verified from source)
- The 7-page site structure
- The chosen copy direction (Option A — Bold/Challenger — is the primary chosen tone; Option B is acceptable for emotional sections like Our Story and subscription; do not rewrite sections to Option C scientific framing unless the Nutrition page requires it)
- The Phase 1 integration architecture (GA4, Hotjar, Razorpay, Klaviyo stubs, Instagram API)
- The Phase 2 visual system (type scale, motion spec, card hover behaviour, scroll reveal direction)
- The Shatkona △▽ symbol and its 600ms load animation
- The Q-Com sticky bottom bar on mobile — this is the highest-priority mobile element and must not be removed or restyled
- The Forest Green footer background
- Any copy that contains confirmed brand facts: "India's first pre-flavoured fresh paneer", "Zero marination", "3 bold flavours", the 76% sampling statistic with its source

Do not add new pages, new features, new integrations, or new sections that were not in the Phase 1/2 spec. This phase is repair and polish only.

---

## 12. ACCEPTANCE CRITERIA

The build passes Phase 3 when every item below is true:

1. **Zero visible placeholders** — no `[INSERT...]`, `[LAB CONFIRM]`, `[PLACEHOLDER]`, or dummy content is visible at any viewport size on any page
2. **Zero broken routes** — every internal link resolves to its intended page with correct content
3. **Zero console errors** — no JavaScript errors, failed network requests for critical resources, or missing asset warnings in the browser console on any page
4. **Zero layout breaks** — no horizontal overflow, no content clipped by sticky elements, no overlapping elements at 375px, 390px, 768px, 1280px, and 1440px viewports
5. **Zero contrast failures** — all text/background combinations pass WCAG AA (4.5:1 for body, 3:1 for large text and UI components)
6. **Zero keyboard dead ends** — every interactive element is reachable by Tab, every modal/overlay is closeable by Escape, skip-to-content link is present
7. **CTA hierarchy is clean** — on any given screen, no more than 2 CTAs compete for attention. The primary CTA is always the most visually dominant
8. **Each persona converts** — a user entering as Persona 1 can reach a Q-Com platform in ≤2 taps on mobile; Persona 2 can reach the subscription wizard in ≤3 taps; Persona 3 can reach the full macro table in ≤2 taps
9. **Trust is established before commitment** — FSSAI claim, clean-label badges, and testimonials are visible before any "Subscribe Now" or "Order" CTA on the Subscribe and Products pages
10. **The site feels complete** — no empty states, no broken animations, no mismatched type scales, no orphaned sections, no generic template residue. Every element feels intentionally PANEVO

---

*End of Phase 3 Master QA / Refinement Prompt*
*PANEVO · Shatkona Ventures Private Limited · panevo.in · Confidential · April 2026*
