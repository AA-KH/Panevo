# PANEVO — Phase 2 Master Design Prompt
## Visual System, Motion Language, and Premium Polish
### For Replit AI Coding Agent — Apply in Full

---

## 1. PROJECT CONTEXT

The PANEVO website is already built and live. Eight pages exist with functional structure, core conversion paths, and a stubbed brand system: Home, Products, Nutrition, Subscribe, Recipes (with dynamic detail pages), Our Story, Find Us, Contact, and legal placeholders.

**Phase 2 is not a rebuild. It is a full visual and experiential elevation of what already exists.**

Do not alter page architecture. Do not introduce new sections unless explicitly instructed below. Do not touch backend logic, payment flows, or data structures unless a visual change depends on it. Preserve all existing content and routing. Treat the existing build as complete in structure — Phase 2 completes it in feel.

---

## 2. DESIGN GOAL

Make the PANEVO website feel like a real, premium, launch-ready D2C food brand — not a startup template, not a food blog, not a generic product page.

The site must feel:
- Complete and polished on first scroll
- Emotionally warm but visually confident
- Indian in soul, global in sensibility
- Protein-credible and food-desirable simultaneously
- Fast and conversion-ready on mobile

Every visual decision in Phase 2 serves one of three outcomes: first impression impact, product desirability, or conversion confidence.

---

## 3. BRAND MOOD AND VISUAL DIRECTION

**The resolved mood:** Warm challenger. Like Chobani meets Epigamia — editorial product confidence, real-food warmth, unapologetic category claim.

**Primary influences to extract:**
- Chobani: product as hero, nutrition data worn with pride, photography grounded in real kitchens
- Epigamia: Indian brand, global sensibility, bold type over clean layout, seamless Q-Com integration
- Oatly: disruptive headline type, confident white space, copy that reads like conviction
- MyProtein: macros as primary copy, not footnotes

**What this means in practice:**
- Large, unapologetic typography as the first thing eyes find
- Photography-first layouts: the product pack and food shot are the design
- Cream as the resting state, Terracotta as the interrupt
- Protein data treated with the same visual weight as the product name
- No decoration for decoration's sake — every element earns its position

---

## 4. RESEARCH-BASED DESIGN DECISIONS

The following decisions resolve multi-option areas from the brand documents. Each is final. Do not preserve alternates.

**Hero copy direction:** Option A (Bold/Challenger) — "No Marination. No Prep. Just Paneer." Short, punchy, disruptive. This is the one that stops a scroll on mobile. The warm-narrative and health-led variants underperform on first impression; they work better deeper in the page.

**Problem section direction:** Hybrid A+B — use Option A's three-column structure (Clock / Tick / Flame icons on Forest Green) but write column headlines in Option B's warmer framing. The structure converts; the warmth retains.

**Comparison strip:** Option A — clean side-by-side table (Plain Paneer vs PANEVO). Structured data outperforms narrative in decision-making moments. Keep it tight: four rows maximum.

**Product cards:** Option A — "Pick Your Flavour. Cook in Minutes." Bold, direct. Subcopy from Option A. Each card: flavour name, one sharp line, price, CTA. Do not lead with protein data on product cards — that belongs on Nutrition page and card hover state only.

**Proof strip:** Option B stat mix — include the 76% trial-to-commitment stat, the market size figure, and the prep-time claim. These three together are the most credible combination.

**Testimonials:** Mix A + B — Priya S. (Option A), Anand K. (Option B), Arjun V. (Option B). The meal-prepper and the 25-year cook are the most converting testimonials for the subscription persona.

**Subscription teaser:** Option A — "Your Weekly Paneer Box. Sorted." Simplest and most confident. The health variant overexplains. The narrative variant undersells.

**Nutrition page hero:** Option A — "The Protein You've Been Underestimating." This is the right emotional trigger for a page built to convert the gym/health segment. Option C's stat-lead headline belongs as a sub-section, not a hero.

**Clean label section:** Hybrid A+C — use Option A's headline ("If you can't pronounce it, it's not in PANEVO.") with Option C's precise ingredient list and allergen note. Trust requires both emotion and precision.

**Our Story hero:** Option B — "Tradition Transformed." with Shatkona symbol explanation as the opening visual anchor. This is the most brand-distinct option and uses the Shatkona symbol most meaningfully.

**Subscribe hero:** Option A — "Your Weekly Paneer Box. Cancel Any Time." The trust signals (No lock-in · Pause anytime · Fresh every delivery) run directly below in a single line.

**Subscribe plan cards:** Option A structure with Option B's warmth on card 1 — "The one 500+ households already depend on." The social proof inside the card itself is a strong conversion device.

**Subscription wizard tagline:** Option A — "Three steps. Three minutes. Done."

**Find Us hero:** Option B — "In Your Kitchen in 10 Minutes. Or at Your Corner Store." This framing covers both channels in one line.

**Contact hero:** Option B — "We're Real People. Get in Touch." Warmest and most approachable; appropriate for a startup building trust.

**Recipes hero:** Option B — "The Recipes That Prove Paneer Doesn't Need 30 Minutes." This framing makes the zero-marination benefit the entire premise of the page.

**Footer tagline:** Option A — "Made in India ✦ Delivered in 10 minutes." Clean, proud, dual-claim.

**Shatkona symbol section:** Option B — narrative treatment. "Look closely at the PANEVO logo. The A and V are not letters. They are triangles." This is the most distinctive brand storytelling on the site.

**Flavour roadmap:** Option A — "The Bold Roadmap" with four-phase grid. Confident and brand-consistent.

**Team section:** Option B — full warm bios. This is an Our Story page; emotional depth is the right register.

**Coming Soon (Phase 2 flavours):** Option A — "PANEVO's Next Chapter Is Coming." Blurred/locked cards with visible flavour names + email capture.

**Protein comparison chart:** Option A framing with Option C's source citations in small type below the chart.

**FAQ sections:** Use Option A for all FAQ sections across the site. Direct, clear, conversion-oriented.

---

## 5. VISUAL SYSTEM

### 5.1 Colour Rules

Apply these rules across every page and component without exception:

| Colour | Hex | Usage Rule |
|---|---|---|
| Terracotta | #BF3D0B | Hero CTAs, sticky nav button, section interrupts, active states. Use sparingly — when it appears it must stop the eye. Maximum 2–3 appearances per page. |
| Forest Green | #1B4332 | Our Story background, footer background, Problem section background, subscription teaser. Full-bleed backgrounds only. |
| Saffron Gold | #C9A227 | Badges ONLY — "India's First", "Most Popular", hover border accents. Never as a fill or text colour at scale. |
| Warm Cream | #F2EEE5 | Default page background (~60% of all page area). Product cards, subscription cards, recipe cards. |
| Pure White | #FFFFFF | Product card faces, nutrition tables, comparison charts. Use where maximum legibility is needed against cream. |
| Near Black | #1A1A1A | All display headlines. Full weight, full presence. |
| Muted Text | #777777 | Captions, secondary labels, metadata, ingredient small-print. |

**Colour rhythm rule:** Every page should follow a pattern of cream → dark interrupt → cream → light (white/cream) → dark closer. Never two full-bleed dark sections in a row. Cream is the breathing room that makes dark sections land harder.

**Never:** use Terracotta as a background colour for body sections. Never use Saffron Gold as a text colour on cream — fails contrast. Never use blue, purple, or any out-of-palette colour.

### 5.2 Border Radius Logic

- Buttons: 4px radius — slight rounding, not pill-shaped. Modern and tactile.
- Product cards: 12px radius.
- Badges and trust pills: 100px (fully rounded — visually distinct from cards).
- Nutrition table cells: 0px — clinical precision requires hard edges.
- Modals and overlays: 16px.
- Form input fields: 8px.

**Never use round (50%) radius on rectangles. Never mix pill and rounded-rect buttons on the same page.**

### 5.3 Shadow Logic

- Cards at rest: `box-shadow: 0 2px 8px rgba(0,0,0,0.06)` — barely visible, just enough to lift from the cream background.
- Cards on hover: `box-shadow: 0 8px 24px rgba(0,0,0,0.12)` — deepens smoothly on hover (250ms ease).
- Sticky header: `box-shadow: 0 1px 4px rgba(0,0,0,0.08)` — barely there, just to separate from page.
- Modals: `box-shadow: 0 24px 64px rgba(0,0,0,0.18)`.
- Never use coloured shadows. Never use shadows on full-bleed sections.

### 5.4 Icon Style

- Line icons only. Stroke weight: 1.5px.
- Style: Lucide or Phosphor icon set. Consistent family across all pages.
- Size: 24px in body contexts, 32px in feature sections.
- Never use filled/solid icons alongside line icons on the same page.
- Brand-relevant icons: clock (prep time), check/tick (trust), flame (heat/cooking), leaf (clean label), package (subscription).
- No emoji in the UI except in the footer tagline (✦) where specified.

### 5.5 Brand Motif Usage

The Shatkona △▽ symbol has three uses:
1. **Hero animation** — appears at 600ms on page load, centred above or beside headline. Animates in with fade + 4px upward movement.
2. **Section divider** — used as a small 16px separator between the Brand Signature section and footer. Single instance only.
3. **Our Story page** — large centred decorative use on the Shatkona symbol section. 120px, Forest Green or Terracotta.

The 45° angled notch (bottom-right corner of logo) carries through to:
- CTA buttons — applied as a 4px cut on bottom-right corner via `clip-path: polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)`.
- Product card bottom-right corner — same clip treatment, subtle.
- Section divider badges.

This notch is the signature brand element. Apply it consistently but not exhaustively — maximum one notched element per visual cluster.

---

## 6. TYPOGRAPHY

### 6.1 Typeface Decisions

**Display / Hero:** Clash Display Bold (preferred) or Bebas Neue (fallback — free on Google Fonts). Load via CDN or self-host. This is non-negotiable — standard system fonts destroy the brand's category claim.

**Body:** DM Sans Regular 400. Available free on Google Fonts. Clean, modern, highly legible at 17–18px on mobile.

**Nutrition / Tabular data:** DM Sans with `font-variant-numeric: tabular-nums` applied to all number columns. Digits must align vertically in macro tables.

**Never use:** Poppins, Nunito, Inter, Montserrat, or Arial for any headline. These are generic and undermine PANEVO's challenger positioning.

### 6.2 Type Scale

| Level | Size (desktop) | Size (mobile) | Weight | Line Height |
|---|---|---|---|---|
| Hero display | 72–96px | 48–60px | Bold | 1.05 |
| Section headline | 48–64px | 36–44px | Bold | 1.1 |
| Sub-headline | 28–36px | 22–26px | SemiBold | 1.2 |
| Body copy | 17–18px | 16–17px | Regular | 1.65 |
| Caption / label | 13–14px | 12–13px | Regular | 1.4 |
| Badge / pill text | 12–13px | 11–12px | SemiBold | 1 |
| Nutrition data | 15–16px | 14–15px | Regular (tabular) | 1.5 |

### 6.3 Headline Rules

- Every hero headline is a standalone statement — should be legible at 3 metres.
- Line breaks should be deliberate. "No Marination. / No Prep. / Just Paneer." — each fragment lands on its own line on mobile.
- Track hero headlines at +0.02em. Track body text at 0. Never negative tracking on body text.
- Near Black (#1A1A1A) for headlines on cream. White for headlines on dark backgrounds. Never use Terracotta as a headline colour at large scale — it reduces readability.

---

## 7. LAYOUT AND SPACING

### 7.1 Grid System

- Desktop: 12-column grid, 80px outer gutter, 24px column gap. Max content width: 1280px.
- Tablet (768–1024px): 8-column, 40px gutter, 20px gap.
- Mobile (<768px): 4-column, 20px gutter, 16px gap.
- Full-bleed sections (Forest Green, Terracotta strips, hero): extend edge-to-edge. Content inside uses the standard grid.

### 7.2 Spacing Scale

Use an 8px base unit throughout. All margins, paddings, and gaps should be multiples of 8.

| Token | Value | Use |
|---|---|---|
| space-xs | 8px | Icon-to-label gaps, badge padding |
| space-sm | 16px | Internal card padding, list item gaps |
| space-md | 24px | Section internal element spacing |
| space-lg | 48px | Between section sub-elements |
| space-xl | 80px | Section top/bottom padding (desktop) |
| space-2xl | 120px | Hero top/bottom padding |

Mobile section padding: 48px top/bottom. Desktop section padding: 80–120px top/bottom.

### 7.3 Section Rhythm

The page should breathe in a predictable rhythm:
- **Hero** (100vh, dark/lifestyle photo) → fade to cream
- **Q-Com Strip** (full-width Terracotta) → rhythm interrupt
- **Problem** (Forest Green full-bleed) → emotional depth
- **Comparison** (cream, structured table) → logic/conversion
- **Product Cards** (cream, 3-column grid) → desire
- **Protein/Stats** (white or near-white) → credibility
- **Testimonials** (cream) → social proof
- **Subscription teaser** (cream) → conversion
- **Closing CTA** (near-black) → final push
- **Footer** (Forest Green) → anchor

No two consecutive sections should share the same background. Every section transition should feel deliberate.

---

## 8. MOTION AND INTERACTION

### 8.1 Page Load Sequence — Hero Only

On every page load, the hero executes this stagger sequence:
1. Shatkona △▽ symbol: fade in + 4px upward shift — 0ms delay, 400ms duration, ease-out
2. Hero headline (line 1): fade in + 8px upward shift — 200ms delay, 400ms duration
3. Hero headline (line 2, if exists): 350ms delay
4. Sub-headline: 450ms delay, 350ms duration
5. CTAs: 550ms delay, 300ms duration
6. Badge (Saffron Gold "India's First"): 650ms delay, 200ms duration

Total sequence: ~900ms. Do not animate background images or page chrome.

### 8.2 Scroll Reveal — All Sections

Every section below the hero uses scroll-triggered entrance:
- Property: `opacity: 0 → 1` + `translateY(20px → 0)`
- Trigger: when 15% of element enters viewport
- Duration: 400ms, ease-out cubic-bezier(0.25, 0.1, 0.25, 1)
- Implementation: Intersection Observer API — no JavaScript library required
- Stagger: for multi-column grids (product cards, testimonials), stagger children by 80ms per item

### 8.3 Hover States

**Product cards:**
- Transform: `translateY(-6px)`
- Shadow: deepen from rest state to hover state (see §5.3)
- Pack image: `scale(1.02)`
- Transition: 250ms ease
- Optional: Saffron Gold thin border (1px) appears on hover

**CTA buttons (Terracotta):**
- Background lightens 8% on hover
- Transform: none (no lift — reserve that for cards)
- Text and icon shift 2px right on hover
- Transition: 180ms ease

**Q-Com platform buttons:**
- Subtle shimmer sweep: linear-gradient from transparent → rgba(255,255,255,0.15) → transparent, sweeping left-to-right in 600ms on hover
- Implementation: `::after` pseudo-element with animated `background-position`

**Nav links:**
- Terracotta underline slides in from left, 200ms ease

**Recipe cards:**
- Image scales to 1.04, overflow hidden
- Card lifts 4px
- Duration: 250ms

**Footer links:**
- Opacity 0.7 → 1 on hover, 150ms

### 8.4 Macro Counter Animation

On the Nutrition page and on the homepage Protein Moment section:
- Numbers count up from 0 to final value when section scrolls into viewport
- Protein: 0 → 18 over 800ms, ease-out
- Stat pills below: fade in sequentially after the number completes
- Implementation: `requestAnimationFrame` counter with IntersectionObserver trigger
- Use tabular numbers to prevent layout shift during counting

### 8.5 Tab and Filter Transitions

On the Recipes page filter strip (All / Black Pepper / Red Chilli Flakes / Oregano / Under 10min / High Protein):
- Active tab: Terracotta background, white text, 6px radius
- Switching tabs: filter cards fade out (150ms) then fade in (200ms) with stagger 40ms per card
- No sliding or page-level transitions — simple opacity crossfade only

### 8.6 Subscription Wizard Steps

Step indicator at top:
- Completed steps: Terracotta fill, white tick icon
- Current step: Terracotta border, Terracotta number
- Upcoming steps: grey border, grey number
- Transition between steps: slide left (completed) / slide right (new) at 300ms ease
- No animation inside individual step — just entrance/exit of the step panels

### 8.7 What to Avoid

- No auto-play video anywhere
- No carousels on mobile
- No parallax scrolling on product images (parallax on background colour overlays only, if used at all)
- No pop-ups within first 30 seconds of any page
- No looping background animations
- No spinning, bouncing, or elastic animation curves
- No motion that triggers mid-paragraph as user reads
- No staggered lists with more than 5 items staggered — cap the delay chain

---

## 9. PAGE-BY-PAGE VISUAL TREATMENT

### 9.1 Homepage

**Visual intent:** Brand entry + simultaneous conversion for three personas. The page must feel complete within the first two scrolls and functional within the first screen.

**Hero section:**
- 100vh full-bleed. Background: warm-toned lifestyle photo of PANEVO Black Pepper sizzling on a cast-iron tawa. Photo should feel warm, not clinical — amber tones, visible steam, natural light.
- If photography is placeholder: use a near-black (#1A1A1A) background with Terracotta accent gradient at bottom-left.
- Shatkona △▽ symbol: 40px, white, positioned above the headline, left-aligned on desktop, centred on mobile.
- Headline: "No Marination. No Prep. Just Paneer." — Clash Display, white, 72px desktop / 48px mobile. Three-line treatment on mobile.
- Sub-headline: "Bold. Ready. India's first pre-flavoured fresh paneer." — DM Sans, white, 20px, opacity 0.85.
- CTA row: Terracotta pill → "Order Now →" / White outline pill → "See Our Flavours →". 16px gap between buttons. Stack vertically on mobile.
- Badge: Saffron Gold pill, bottom-right of headline cluster: "✦ India's First Pre-Flavoured Paneer". 12px DM Sans SemiBold.
- No scroll indicator arrow.

**Q-Com Strip:**
- Full-width Terracotta (#BF3D0B) band, 80px tall on desktop / 64px on mobile.
- Three platform logos (Blinkit, Zepto, Swiggy Instamart) centred horizontally with equal spacing.
- Under each logo: "Order Now →" in white, 13px, DM Sans SemiBold.
- On mobile: becomes fixed sticky bottom bar — fixed to viewport bottom, z-index 100. Background Terracotta. Logos replaced with platform name text. "Order Now →" remains. Height: 56px.
- The sticky bar is the most important mobile element on the site. It must always be visible when scrolling.

**Problem section (Forest Green):**
- Full-bleed Forest Green (#1B4332).
- Section headline: "Why PANEVO Exists" — white, Clash Display, 48px desktop.
- Three columns (stack on mobile):
  - Clock icon → "No More Marinating" → body copy
  - Tick icon → "Consistent, Every Time" → body copy  
  - Flame icon → "Bold Flavour, Built In" → body copy
- Icons: 32px, white stroke, Lucide style.
- Body copy: white, DM Sans, 16px, opacity 0.85.
- Bottom of section: thin Saffron Gold horizontal divider, 1px, 40% width, centred.

**Comparison strip:**
- Cream background. Table headline: "The Difference Is Built In." — Near Black, Clash Display, 40px.
- 2-column table: Plain Paneer (left, muted) vs PANEVO (right, Near Black with subtle Terracotta highlight on row).
- Four rows: Prep Time / Flavour / Result / Protein.
- PANEVO column cells have a very subtle Terracotta left-border accent (2px).
- Table is white (#FFFFFF) on cream background with 8px radius and rest-state shadow.

**Product Showcase:**
- Cream background. Section headline: "Pick Your Flavour. Cook in Minutes."
- Three cards in a row (desktop), 2-column (tablet), 1-column (mobile, full width with scroll).
- Each card: White background, 12px radius, bottom-right notch on CTA.
  - Product pack image: top half of card, full width, object-fit cover.
  - Flavour name: Clash Display, 28px, Near Black.
  - One-line flavour descriptor.
  - Price: DM Sans SemiBold, 16px — "200g ₹125  |  500g ₹275".
  - CTA: "View Product →" — Terracotta text, no background, with right-arrow icon.
- Card hover: lifts 6px, shadow deepens, pack image scales 1.02.

**Protein Moment:**
- Near-white or white section.
- Large animated counter: "18g" — Clash Display, 96px desktop, Terracotta colour.
- Below: "Protein per 100g. More than most. Clean, real, fresh." — DM Sans, 20px.
- Three stat pills in a row: "18g Protein · ~260 kcal · Zero Preservatives" — Saffron Gold outlined pills, 12px text.
- CTA: "See Full Nutrition →" — Terracotta text link with arrow.
- Counter animates 0→18 on scroll entry.

**Social proof:**
- Cream section. Large opening stat: "76% of first-time tasters committed to buying weekly or daily" — Clash Display, 40px, Near Black. Source in muted text below.
- Three testimonial cards (white background, 12px radius): name, city, quote. City shown as a small location-pin tag.
- No star ratings (no verified review data yet — avoid the credibility trap).

**Subscription teaser:**
- Cream section. Headline: "Your Weekly Paneer Box. Sorted."
- Three plan badges in a horizontal strip: Weekly · Fortnightly · Monthly — cream pills with Forest Green text.
- One CTA: "Start Your Weekly Box →" — Forest Green background, white text, 4px radius with notch.
- No prices shown here — drives to Subscribe page.

**Brand Signature / Closing section:**
- Near-black full-bleed (#1A1A1A).
- Shatkona △▽ centred, 80px, Terracotta.
- One line below: "Raw + Ready. Ancient + Modern. India's Protein. Evolved." — white, DM Sans, 18px, tracking +0.05em.
- CTA: "Our Story →" — white outline button.

**Footer:**
- Forest Green (#1B4332). PANEVO logo in white, top-left.
- Four-column layout desktop, single-column mobile:
  - Col 1: Logo + tagline "Made in India ✦ Delivered in 10 minutes"
  - Col 2: Page links
  - Col 3: Social handles, contact email
  - Col 4: FSSAI licence, registered address, CIN, GST
- All text white, 14px. Link hover: opacity 0.7.
- Legal bar at very bottom: Privacy Policy · Terms · Refund Policy — muted green text on slightly darker strip.

---

### 9.2 Products Page

**Visual intent:** Product selection and desire. Each flavour gets a defined character. The page should feel like a product catalogue, not a feature list.

**Page hero:**
- Cream background (no dark hero for this page — keep it light and product-forward).
- Headline: "Three Flavours. One Rule. Zero Marination." — Clash Display, 64px, Near Black.
- Sub: "Pick your PANEVO. Cook it in under 10 minutes. Eat better every day." — DM Sans, 18px.

**Product section structure (repeat for each of 3 flavours):**
- Alternating layout: image left/text right on desktop (reverse on flavour 2). Stack image top/text below on mobile.
- Product image: full bleed on its side, warm lighting, on dark marble or warm cream surface.
- Flavour tagline: Clash Display, 40px, Near Black. (e.g. "Bold. Sharp. Unmistakably PANEVO.")
- Flavour note: DM Sans, 17px, 2–3 sentences max.
- Specs row: Best Used For / Sizes & MRP / Storage — displayed as three small labelled pills, grey background.
- Protein badge: Saffron Gold filled pill — "~18g Protein/100g" — positioned near the product name.
- CTA buttons: "Order on Blinkit →" (Terracotta) + "Order on Zepto →" (Near Black outline). Stack on mobile.
- "View Full Recipe →" text link below CTAs.

**Coming Soon section:**
- Cream background. Headline: "PANEVO's Next Chapter Is Coming."
- Four cards in a 2×2 grid (desktop), 1-column (mobile):
  - Each card: blurred/frosted overlay on a placeholder food-tone background.
  - Flavour name visible through blur: Gochujang / Mala / Chipotle-Lime / Za'atar.
  - Saffron Gold "Coming Soon" badge on each card.
  - Lock icon (16px, muted) top-right.
- Email capture below grid: single-field input + "Notify Me →" CTA.

**Universal cooking instructions:**
- Forest Green full-bleed strip.
- Four-step numbered list: white text, large numbers in Clash Display as decorative background elements.
- Steps: Open / Cut / Cook / Serve.
- Minimal — under 20 words per step.

---

### 9.3 Nutrition Page

**Visual intent:** Credibility, precision, desirability. This page must feel scientific enough for the gym audience and approachable enough for the home cook.

**Page hero:**
- Terracotta full-bleed. White headline: "The Protein You've Been Underestimating." — Clash Display.
- Sub: "Paneer has always been India's best-kept protein secret. PANEVO makes it impossible to ignore."
- CTA: "Shop Now →" — white filled button (Terracotta text to maintain contrast).

**Macro table:**
- White card, 12px radius, generous padding (32px).
- Headline above table: "Every gram accounted for. Nothing hidden."
- Three-column table: Black Pepper / Red Chilli Flakes / Oregano.
- Rows: Energy / Protein / Total Fat / Carbohydrates / Calcium / Sodium.
- Protein row: bold, Terracotta text to highlight.
- Tabular numbers throughout. Clean horizontal lines between rows only (no vertical gridlines inside table).
- Note below: NABL certification line in 13px muted text.
- This table should feel like something worth screenshotting — high-contrast, clean, trustworthy.

**Protein comparison chart:**
- White section. Headline: "Paneer Belongs in the Protein Conversation."
- Horizontal bar chart. Bars:
  - PANEVO Paneer: Terracotta bar
  - Chicken Breast: Near Black bar (longer — honest, no deception)
  - Whole Eggs: Dark grey
  - Tofu: Medium grey
  - Soya Chunks (hydrated): Light grey
- Each bar has label left, value right (g per 100g), bar in middle.
- Note below in muted 13px: "Comparison uses cooked/ready-to-eat weights. Source: IFCT 2017 / USDA FoodData Central."
- Closing line: "For protein-conscious vegetarians, paneer is the most complete and accessible option in the Indian diet."

**Clean label section:**
- Cream background. Headline: "If you can't pronounce it, it's not in PANEVO."
- Ingredient list in large DM Sans 28px: "Milk  ·  Salt  ·  [Spice]  ·  Citric Acid" — centred, Near Black.
- Below: "That's it. That's the whole ingredient list." — italic, muted.
- Four trust badges in a row (white pills, Saffron Gold border, checkmark icon): No Artificial Flavours / No Preservatives / No Additives / 100% Vegetarian.
- FSSAI + allergen note in 13px muted below.

**Fitness recipes:**
- Three recipe cards in a row. Each: food image, recipe name, macro stat bar (kcal + protein), time badge, "View Full Recipe →" CTA.
- Cards on cream background, white card face, 12px radius.

**FAQ:**
- Cream or white. Accordion style: question visible, answer expands on click.
- + icon rotates to × on open. 200ms ease.
- Five questions. Each question in DM Sans SemiBold 17px.

---

### 9.4 Subscribe Page

**Visual intent:** Trust-first conversion. Calm, structured, reassuring. Remove every reason not to subscribe.

**Page hero:**
- Cream background (the calmness signals safety for a subscription commitment).
- Headline: "Your Weekly Paneer Box. Cancel Any Time." — Clash Display, 56px.
- Trust strip directly below headline: three pills in a row — "No lock-in · Pause any time · Fresh every delivery" — Forest Green text on cream, thin Forest Green border.

**Plan cards (3 cards in a row):**
- White background, 12px radius, rest shadow.
- Card 1 (Weekly): "Most Popular" badge — Terracotta background, white text, top-right corner.
- Card structure: Frequency label (bold) / Target household type (one line) / One trust proof line / CTA "Subscribe Weekly →" (Terracotta).
- Active/selected card state: Terracotta border (2px), rest cards dim to 80% opacity.

**Subscription wizard:**
- Three-step progress indicator at top of wizard area.
- Steps use Terracotta for active/completed state, grey for upcoming.
- Step 1: Plan selector (radio cards — Weekly/Fortnightly/Monthly).
- Step 2: Flavour selection (three flavour option tiles with food image, flavour name, checkbox). Multi-select allowed.
- Step 3: Address + Razorpay. Note above: "Account created automatically — no registration required before this step."
- Back/Next buttons: Next = Terracotta filled; Back = outline.

**Trust section:**
- Below the wizard. Headline: "We made cancel-anytime mean cancel-anytime."
- Two testimonials from subscription persona (Arjun V. + one other).
- Four trust points in two columns: No-penalty cancel / Fresh cold-chain / Razorpay secure / Flavour change per cycle.

---

### 9.5 Recipes Page

**Visual intent:** Content-rich but not chaotic. Food photography as the lead. Utility (time, flavour, macros) as the filter layer.

**Page hero:**
- Warm lifestyle image — overhead shot of multiple PANEVO dishes on a table. If placeholder: Forest Green background with white headline.
- Headline: "The Recipes That Prove Paneer Doesn't Need 30 Minutes." — Clash Display, white.
- Sub: "Every PANEVO recipe starts the same way: open the pack. From there, it's up to you."

**Filter strip:**
- Sticky below the hero when scrolling. Cream background, thin bottom border.
- Pills: All / Black Pepper / Red Chilli Flakes / Oregano / Under 10 min / High Protein.
- Active pill: Terracotta background, white text. Inactive: cream background, Near Black text.
- Horizontal scroll on mobile (no wrapping).

**Recipe grid:**
- 3-column desktop, 2-column tablet, 1-column mobile.
- Each recipe card: food image (top, 60% of card height) / recipe name / time badge / flavour tag / protein/calorie strip at bottom / "View Recipe →" CTA.
- Time badge: small white pill on food image, top-left corner — "8 min".
- Flavour tag: Terracotta text, 12px — "Black Pepper".
- Card hover: image scales 1.04, card lifts 4px.

---

### 9.6 Recipe Detail Pages

**Visual intent:** Clean cooking reference. Usability over branding.

**Layout:**
- Wide hero image (full-width, 45vh).
- Two-column below on desktop: ingredients left (sticky on desktop scroll), method right.
- Mobile: single column, ingredients above method.
- Time / Difficulty / Serves / SKU: four info pills in a horizontal row below the hero.
- Chef's tip: Forest Green background block, white text, italic quote style.
- At bottom: "Shop PANEVO [Flavour] →" CTA (Terracotta) + two related recipe suggestions.

---

### 9.7 Our Story Page

**Visual intent:** Brand conviction and emotional depth. This page earns trust through narrative, not conversion.

**Page hero:**
- Forest Green full-bleed. White headline: "Tradition Transformed." — Clash Display, 64px.
- Shatkona △▽ symbol: 64px, white, centred above the headline.
- Sub: "The Shatkona is the ancient Indian symbol of union — fire and water, energy and nourishment, raw and ready. It's also the story of PANEVO."

**Brand story body:**
- Cream background. Full text in DM Sans 18px, line-height 1.7.
- Split into 5 labelled parts with small Terracotta part numbers: "01 · The Observation" etc.
- Large pull-quote for Part 3 (The Solution): "Not a coating. Not a sachet. The flavour is in the paneer itself." — Clash Display, 32px, indented, Terracotta accent bar on left.

**Shatkona symbol section:**
- Near-black full-bleed.
- Large Shatkona △▽ symbol: 120px, Terracotta, centred.
- Narrative below: Option B — "Look closely at the PANEVO logo. The A and V are not letters. They are triangles."
- △ / ▽ meanings displayed as two floating labels with connecting lines.

**Flavour roadmap:**
- Cream background. Headline: "The Bold Roadmap".
- Four-phase timeline. Horizontal on desktop, vertical on mobile.
- Each phase: pill with phase label / year range / flavour names in a wrapped list.
- Current phase (Launch): Terracotta background pill. Future phases: cream pill with Near Black text.
- Dimming progression: Phase 2 = 80% opacity, Phase 3 = 60%, Phase 4 = 40% — visual suggestion of future.

**Team section:**
- White cards on cream. 3-column desktop, 1-column mobile.
- Each card: photo (rounded square, not circle), name, title, bio.
- No social handles unless confirmed.

---

### 9.8 Find Us Page

**Visual intent:** Fast utility. User wants to act in under 20 seconds.

**Page hero:**
- Compact — 40vh only. Cream background.
- Headline: "In Your Kitchen in 10 Minutes. Or at Your Corner Store." — Clash Display, 52px.

**Q-Com section:**
- Three large platform logo tiles (not buttons — tiles) in a row. Each: logo, "Available Now" or "Order Now →" CTA. White background, Terracotta CTA.
- Visual hierarchy: Q-Com section comes FIRST — it converts fastest.

**GT Store locator:**
- Google Maps embed with store pins below the Q-Com section.
- City filter tabs above the map: Chandigarh / Mohali / Panchkula / Zirakpur / Gurgaon.
- Active tab: Terracotta. Inactive: outline.
- Store list below map updates on filter. Each store: name, address, area tag.

**Expansion section:**
- Compact. Forest Green strip. "PANEVO is Growing." + city list. Email capture.

**Trade enquiry:**
- Cream. Form with labelled fields. Terracotta submit CTA.

---

### 9.9 Contact Page

**Visual intent:** Accessible, human, fast.

**Layout:**
- Cream background throughout.
- Headline: "We're Real People. Get in Touch." — Clash Display, 48px.
- Sub: "We're a small team. We read everything. We reply fast."
- Contact form left / Direct contacts right — two-column desktop, stacked mobile.
- Form: white card, 12px radius. Fields: Name / Email / Phone (optional) / Subject (dropdown) / Message.
- Subject dropdown includes: General / Trade / Press / Investor / Careers / Other.
- CTA: "Send Message →" — Terracotta filled, full width on mobile.
- Direct contacts section: name → role → email + phone in styled list. Clean, no cards.
- WhatsApp floating button: bottom-right, Forest Green circle, WhatsApp icon. 56px.

---

### 9.10 Legal Pages

- Minimal. Cream background. Near Black body text. DM Sans 16px, line-height 1.7.
- PANEVO nav and footer present — same as all pages.
- No visual treatment beyond clean typography. Last updated date at top.

---

## 10. COMPONENT STYLING

### 10.1 Primary CTA Button
- Background: Terracotta (#BF3D0B)
- Text: White, DM Sans SemiBold 15px
- Padding: 14px 28px
- Border radius: 4px with bottom-right notch (clip-path)
- Hover: background lightens 8%, text shifts 2px right
- Arrow icon: 16px, white, right of text, shifts 4px right on hover

### 10.2 Secondary / Outline Button
- Border: 2px solid (Near Black or White depending on background)
- Text: Near Black or White
- Background: transparent
- Hover: background fills to 8% of text colour
- Same radius and padding as primary

### 10.3 Product Cards
- White background, 12px radius, rest shadow
- Image zone: top 55% of card, image fills entirely, overflow hidden
- Content zone: padding 20px
- Flavour badge: Terracotta text, 12px, top of content zone
- Name: Clash Display, 24px
- Descriptor: DM Sans, 15px, 2 lines max
- Price: DM Sans SemiBold, 15px, muted colour
- CTA: Terracotta text link with arrow, bottom of card
- Bottom-right corner: apply brand notch clip-path

### 10.4 Nutrition Table
- White background, 0 border-radius (clinical)
- Table header: Near Black, SemiBold, 14px
- Table body: DM Sans, 15px, tabular-nums
- Alternating row backgrounds: white / #F8F8F8
- Protein row: slightly bold, Terracotta value text
- Bottom border: 1px #E5E5E5 between rows. No vertical borders.
- Responsive: horizontal scroll container on mobile (do not collapse)

### 10.5 Trust Badges
- Saffron Gold border (1px), cream or white fill
- Checkmark icon: Saffron Gold, 14px, Lucide check-circle
- Text: Near Black, DM Sans SemiBold, 13px
- Padding: 8px 16px
- Radius: 100px (pill)
- On dark backgrounds (Forest Green): white fill, Forest Green text

### 10.6 Recipe Cards
- Cream background, white card face
- Image: top 60%, rounded-top corners matching card radius
- Time badge: white pill on image, top-left, absolute position
- Flavour tag: Terracotta text, 12px
- Title: DM Sans SemiBold, 18px
- Macro strip: "Xkcal · Xg protein" — muted text, 13px
- CTA: "View Recipe →" text link, Terracotta

### 10.7 FAQ Block
- Cream or white background
- Each item: question line (DM Sans SemiBold 17px) + toggle icon (+ / ×)
- On open: answer expands below with 12px top padding, DM Sans 16px
- Thin bottom border between items
- Toggle icon rotates 45° (+ to ×): 200ms ease

### 10.8 Subscription Plan Card
- White background, 12px radius
- "Most Popular" badge: absolute top-right, Terracotta background, white text, 100px radius
- Plan name: Clash Display, 28px
- One trust proof line: italic, muted
- CTA: full-width Terracotta button inside card

### 10.9 Sticky Bottom Bar (Mobile Only)
- Fixed to viewport bottom
- Height: 56px
- Background: Terracotta (#BF3D0B)
- Content: three platform logos with "Order" text, equally spaced
- z-index: 100
- Safe area padding for devices with home indicator
- This is always visible on mobile across all pages except checkout

### 10.10 WhatsApp Floating Button
- Bottom-right, 20px from edges
- Green circle (#25D366), 56px diameter
- WhatsApp icon: white, 28px
- Shadow: 0 4px 12px rgba(0,0,0,0.18)
- z-index: 99 (below sticky bar if both visible)

### 10.11 Navigation
- Cream background with rest-state shadow (very subtle)
- Logo: left
- Links: centre (hide on mobile, hamburger menu)
- "Order Now": Terracotta pill button, right
- Sticky: scroll-triggered stickiness, slides down from top with 200ms ease when user scrolls up
- Mobile hamburger menu: full-screen overlay, Forest Green background, white links, Clash Display

---

## 11. TRUST AND PREMIUM PRESENTATION

### 11.1 Product Shot Standards
- All product images on warm surfaces (dark marble, warm wood, cream linen). Never pure white backgrounds on the website (reserve for print).
- Every product image should show context: a hand holding the pack, or pack beside a plated dish, or pack on a tawa-adjacent surface.
- Consistent lighting across all three SKUs — same warmth, same direction.
- If photography is unavailable at build time: use the pack image on a warm gradient background (#F2EEE5 to #E8D8C0). Better than white.

### 11.2 Ingredient Storytelling
- On the Nutrition page clean label section: the ingredient list in large type IS the design. Don't decorate around it. Let the brevity of the list be the entire visual argument.
- On product cards: do not list ingredients. Show them only on product detail and nutrition pages.
- On the Our Story page: the Shatkona symbol explanation is ingredient storytelling at the brand level — make it feel sacred without being overwrought.

### 11.3 Macro and Nutrition Presentation Rules
- 18g protein is the single most important number on the site. Every page it appears on should treat it as a primary visual element, not a footnote.
- On mobile, the protein count should be in the first two visible sections of the Nutrition page without scrolling.
- The comparison chart (paneer vs chicken) must be visible and legible at mobile width — horizontal bars, not vertical — and must include honest data (chicken breast IS higher than paneer per 100g — acknowledge and reframe for vegetarian context).

### 11.4 Trust Without Clutter
- Maximum four trust badges in any single section. More than four creates visual noise and dilutes each claim.
- Trust signals work best adjacent to the conversion action. Place trust badges within 80px of the relevant CTA.
- FSSAI licence number must appear in the footer of every page and on the product detail pages. Do not bury it in legal pages only.
- "India's First" claim is a Saffron Gold badge — use it in the hero and once on the Products page. Do not repeat it on every page.

### 11.5 Making Claims Feel Credible
- Round numbers feel invented. Where data is approximate ("~18g protein"), use the tilde prefix consistently and add NABL certification note.
- "76% of first-time tasters" — always cite source in muted text: "(sampling event, Chitkara University, 2026)".
- Never write "world-class" or "finest quality" — these are instant credibility destroyers for a discerning audience.
- Let the ingredient list, FSSAI badge, and clean copy do the work.

---

## 12. RESPONSIVE BEHAVIOR

### 12.1 Mobile-First Rules

Every component is designed for 375px width minimum and scales up, not down.

- Hero: 100vh on all devices. Headline font reduces from 72px → 48px.
- Product cards: full-width (single column) on mobile. Horizontal scroll is permitted only for filter chips, not for product cards.
- Comparison table: horizontal scroll container on mobile. Minimum column width 120px. Pinned left column (attribute name).
- Nutrition table: horizontal scroll on mobile. Do not collapse rows.
- Footer: single column stack on mobile. Logo top, links in a 2-column grid, legal below.
- Nav: hamburger menu on mobile. Full-screen Forest Green overlay.
- Subscription wizard: full-screen on mobile, one step visible at a time.
- Q-Com sticky bar: mobile only. Remove on tablet and desktop.

### 12.2 Breakpoints

| Name | Width | Behaviour change |
|---|---|---|
| Mobile | <768px | Single column, sticky Q-Com bar, hamburger nav |
| Tablet | 768–1024px | 2-column grids, full nav, no sticky Q-Com bar |
| Desktop | >1024px | 3-column grids, full nav, standard layout |
| Wide | >1440px | Max-width container (1280px) centred, outer gutters expand |

### 12.3 Touch Targets

- All interactive elements: minimum 44×44px touch target
- Buttons: minimum 48px height
- Filter pills: minimum 36px height with adequate horizontal padding
- Card tap areas: entire card is tappable, not just the CTA text

---

## 13. ACCESSIBILITY AND PERFORMANCE

### 13.1 Colour Contrast

- Body text on cream (#777777 on #F2EEE5): ensure minimum 4.5:1 ratio — use #666666 if muted text fails
- White text on Terracotta: acceptable — passes at most sizes above 14px
- Saffron Gold text: NEVER on cream backgrounds — use only as decorative border or in badges with dark text
- All CTAs: check contrast for both hover and rest states

### 13.2 Font Loading

- Load Clash Display (or Bebas Neue) and DM Sans via `<link rel="preconnect">` and `font-display: swap`
- Preload the hero headline font weight only — defer loading decorative weights
- System font stack fallback: `system-ui, -apple-system, BlinkMacSystemFont, sans-serif`

### 13.3 Image Performance

- All product images: serve WebP with JPEG fallback
- Hero image: preloaded with `<link rel="preload">`, 1920px max width
- Recipe card images: lazy-loaded with `loading="lazy"`
- Product card images: eager-load the first row, lazy-load remaining

### 13.4 Animation Performance

- All scroll animations use `will-change: transform, opacity` only on the animated element
- Use `transform` and `opacity` only — never animate `margin`, `padding`, `width`, `height`
- Respect `prefers-reduced-motion`: wrap all scroll-triggered animations in a media query check. If reduced motion is preferred, skip entrance animations entirely.
- Counter animation: use `requestAnimationFrame`, not `setInterval`

### 13.5 Semantic HTML

- Landmark roles: `<header>`, `<main>`, `<nav>`, `<footer>` on all pages
- Product names in `<h1>` on detail pages; section headlines in `<h2>`; card titles in `<h3>`
- Trust badges: use `<ul>` with `<li>` items, not unstyled `<div>` stacks
- FAQ: use `<details>` / `<summary>` or ARIA-compliant accordion pattern
- Form labels: always visible, always associated. No placeholder-only labels.

---

## 14. WHAT TO AVOID

**Visual:**
- Do not use Terracotta as a large section background — it will overwhelm and feel like a warning colour
- Do not use more than two font families anywhere on the site
- Do not use stock photography of smiling people pointing at food
- Do not use cartoon or illustrated food
- Do not use oversaturated colour-grade on food photography
- Do not use more than four trust badges per section
- Do not use gradient overlays on photographs unless the text legibility requires it
- Do not use decorative dividers between every section — let cream-to-colour transitions do the work

**Motion:**
- Do not add carousels anywhere on mobile
- Do not auto-play any video
- Do not use parallax on product images
- Do not stack more than three entrance animations in the same viewport
- Do not use spring/bounce easing on entrance animations — ease-out only
- Do not add motion to elements the user has not interacted with (no idle animations)

**Typography:**
- Do not use Poppins, Inter, Nunito, Montserrat, or any rounded geometric sans for headlines
- Do not use display typeface at body size (below 24px)
- Do not use light font weights (300) for body text — minimum 400 weight for legibility on mobile

**Content:**
- Do not add sections not specified in this prompt without marking them clearly in code comments
- Do not change copy from the resolved decisions above
- Do not remove [PLACEHOLDER] markers — leave them clearly visible for the content team to replace

**Architecture:**
- Do not change page routing
- Do not add new pages
- Do not alter the subscription wizard's business logic — only its visual presentation

---

## 15. PHASE 3 BOUNDARIES

Phase 3 (not part of this prompt) will cover:
- Cross-browser QA and edge case fixing
- PageSpeed optimisation (target: >85 mobile Lighthouse score)
- Accessibility audit pass
- Real photography swap-in (replacing any placeholder images)
- NABL lab value replacement for all [LAB CONFIRM] fields
- FSSAI licence number insertion
- Q-Commerce URL activation (once listings go live on Blinkit/Zepto/Instamart)
- GA4 + Hotjar installation and event tracking setup
- Klaviyo integration activation
- Final copyedit pass
- Micro-copy polish (button states, error messages, empty states)

Do not attempt any Phase 3 work in this implementation. Do not touch analytics or third-party integration scripts.

---

## 16. ACCEPTANCE CRITERIA

Phase 2 is complete when all of the following are true:

**Visual system:**
- [ ] All brand colours (#BF3D0B, #1B4332, #C9A227, #F2EEE5, #1A1A1A) applied consistently with the usage rules above
- [ ] Clash Display (or Bebas Neue) loaded and applied to all display headlines
- [ ] DM Sans applied to all body copy
- [ ] Type scale (72px hero → 13px captions) applied consistently across all pages
- [ ] 8px spacing grid used throughout — no arbitrary spacing values
- [ ] Border radius rules applied (4px buttons, 12px cards, 100px badges)
- [ ] Box shadow rules applied (rest vs hover states)

**Motion:**
- [ ] Hero stagger sequence executes on page load (all 8 pages)
- [ ] Scroll reveal (opacity + translateY) on all sections below hero
- [ ] Product card hover: lift 6px + shadow deepen + image scale 1.02
- [ ] Q-Com button shimmer on hover
- [ ] Macro counter animates on Nutrition page and Homepage Protein section
- [ ] Recipe filter tab transitions work (crossfade, 150ms + 200ms)
- [ ] Subscription wizard step transitions (slide 300ms)
- [ ] prefers-reduced-motion check implemented

**Pages:**
- [ ] Home page: all 8 sections styled per specification
- [ ] Products page: alternating product sections + Coming Soon + cooking strip
- [ ] Nutrition page: macro table + comparison chart + clean label + fitness recipes + FAQ
- [ ] Subscribe page: plan cards + wizard + trust section
- [ ] Recipes page: filter strip + recipe grid + cards
- [ ] Recipe detail pages: two-column layout + sticky ingredients + chef tip block
- [ ] Our Story page: hero + brand story parts + Shatkona section + roadmap + team
- [ ] Find Us page: Q-Com tiles + map + expansion + trade form
- [ ] Contact page: form + direct contacts + WhatsApp button
- [ ] Legal pages: clean typographic layout

**Components:**
- [ ] Sticky Q-Com bottom bar active on mobile across all pages
- [ ] WhatsApp floating button visible on all pages
- [ ] Nav: sticky scroll behaviour + Terracotta "Order Now" button + hamburger mobile overlay
- [ ] Footer: Forest Green background + all legal copy placeholder visible
- [ ] Saffron Gold badges rendering correctly

**Responsive:**
- [ ] All layouts functional and non-broken at 375px, 768px, 1024px, 1440px
- [ ] No horizontal overflow at any breakpoint (except intentional scroll containers)
- [ ] Touch targets minimum 44px on all interactive elements

**Standards:**
- [ ] Semantic HTML structure on all pages
- [ ] Colour contrast passes on all text/background combinations
- [ ] No broken images (placeholders acceptable, broken img tags not)
- [ ] All [PLACEHOLDER] and [LAB CONFIRM] markers preserved in markup

**The site is Phase 2 complete when a designer, a brand manager, and a first-time visitor can all look at it and independently describe it as: premium, clear, and Indian-but-global. If any of these three descriptors would not be immediate, Phase 2 is not finished.**
