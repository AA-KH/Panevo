# PANEVO WEBSITE — PHASE 1 MASTER BUILD PROMPT
### For: Replit AI Coding Agent
### Scope: Architecture · Functionality · Integrations · Responsiveness · SEO · Analytics · Conversion
### Phase: 1 of 3 (Structure and Function — no final visual polish)

---

## 1. PROJECT OVERVIEW

Build the Phase 1 foundation of panevo.in — the official website for PANEVO (Shatkona Ventures Private Limited), India's first pre-flavoured fresh paneer brand.

**What this build must deliver:**
- A 7-page, mobile-first brand and conversion website
- Full CTA hierarchy serving three buyer personas simultaneously
- Q-Commerce deep-link integration (Blinkit, Zepto, Swiggy Instamart)
- Razorpay Subscriptions payment flow (3-step wizard)
- WhatsApp floating contact button
- Google Maps store locator
- Lead/waitlist capture (email + city)
- Google Analytics 4 + Hotjar event tracking
- SEO-ready metadata and semantic HTML structure
- Scalable component system for Phase 2 styling and Phase 3 additions

**Launch target:** 1 June 2026
**Domain:** panevo.in
**Primary business action:** Drive trial via Q-Commerce and initiate subscription conversions.

---

## 2. BRAND POSITIONING

Implement the following identity constraints precisely. Do not deviate.

**Brand name:** PANEVO — always uppercase. Never alter casing in UI.
**Tagline:** Fresh │ Flavoured │ Ready
**Category claim:** India's first pre-flavoured fresh paneer
**Core promise:** Open the pack. Cook in under 10 minutes. No marination. No prep.
**Parent company:** Shatkona Ventures Private Limited
**Symbol:** Shatkona △▽ — appears in hero, brand signature section, footer, and as a loadable SVG asset

**Colour tokens — pixel-verified, use as CSS custom properties:**
```
--color-terracotta: #BF3D0B       /* CTAs, hero accents, primary buttons */
--color-forest-green: #1B4332     /* Our Story, subscription page, footer background */
--color-saffron-gold: #C9A227     /* Badges only: 'India's First', 'Most Popular', hover accents */
--color-warm-cream: #F2EEE5       /* Default page background (~60% of site) */
--color-white: #FFFFFF            /* Product cards, nutrition tables */
--color-near-black: #1A1A1A       /* Display headlines */
--color-muted-text: #777777       /* Captions, secondary labels */
```

**Typography:**
- Display/Hero: Clash Display Bold (preferred) or Bebas Neue (fallback) — load via Google Fonts if Clash Display unavailable
- Body: DM Sans Regular 400 — Google Fonts
- Section headlines: 60–80px desktop, 36–48px mobile
- Body text: 17–18px, line-height 1.6
- Nutrition/data tables: tabular-nums font-variant
- Never use Inter, Poppins, Nunito, or Montserrat for headings

**Logo variants needed as SVG assets:**
1. Terracotta on cream (primary)
2. White on forest green (footer)
3. White on terracotta (dark backgrounds)

**Brand signature element:** 45° angled notch on bottom-right corner of cards, section dividers, and primary CTA buttons. Implement as CSS clip-path on applicable elements.

**Tone enforcement:** All copy uses direct, confident, short sentences. No passive voice. No "premium quality", "farm-fresh", "authentic", "world-class". Copy is written. Do not auto-generate filler.

---

## 3. TARGET PERSONAS AND CONVERSION PATHS

Three personas must be served simultaneously on every page. No page is a dead end.

### Persona 1 — Q-Com Buyer (Age 25–50)
- **Pain point:** Wants convenient, quality food without extra effort. Already uses Blinkit/Zepto 3–4x/week.
- **Decision trigger:** Product visible on their platform, looks premium, has social proof.
- **Primary CTA:** Order on Blinkit → / Order on Zepto → / Order on Instamart →
- **Conversion path:** Landing on homepage → sees Q-Com strip → clicks platform → leaves to external platform to purchase.
- **Key element:** Sticky bottom bar on mobile with Q-Com buttons. This is the most-seen element on the entire site on mobile.

### Persona 2 — Subscription Household (Age 28–45)
- **Pain point:** Paneer 2–3x per week. Decision fatigue. Wants routine and reliability.
- **Decision trigger:** Flexible plans, easy cancel, pack variety, savings messaging.
- **Primary CTA:** Start Your Weekly Box →
- **Conversion path:** Homepage subscription teaser → Subscribe page → 3-step wizard → Razorpay → confirmation.

### Persona 3 — Health/Gym Consumer (Age 19–40)
- **Pain point:** Macro-tracking. Wants clean protein sources without compromise.
- **Decision trigger:** ~18g protein per 100g prominent, clean ingredient list, no preservatives badge.
- **Primary CTA:** Shop High-Protein Paneer →
- **Conversion path:** Homepage protein moment → Nutrition & Protein page → Products page → Q-Com order or Subscribe.

**Global CTA rule:** Every page must have at least one visible primary CTA above the fold on mobile without scrolling. The sticky navigation carries "Order Now" in terracotta on all pages, always visible.

---

## 4. SITE ARCHITECTURE

### 4.1 Page List and Routes

```
/                    → Home
/products            → Products (all 3 flavours + coming soon)
/nutrition           → Nutrition & Protein
/subscribe           → Subscribe
/recipes             → Recipes
/our-story           → Our Story
/find-us             → Find Us / Where to Buy
/contact             → Contact
```

**Routing:** Use client-side routing (React Router or Next.js routing). All routes are static/SSG at launch for SEO and performance.

**[Assumption]:** Build in Next.js 14 (App Router) + Vercel deployment. Rationale: This is the correct choice from the three options presented (Next.js vs Webflow vs Shopify). Next.js wins because: (1) Replit is a code environment — Webflow requires a visual editor, not a code agent. (2) Shopify positions the site as e-commerce-first; PANEVO's D2C revenue at launch is subscription + Q-Com referral, not a cart. (3) Next.js delivers best SEO, fastest performance, full design control, and the codebase scales for Phase 2 (Sanity CMS) and Phase 3 (D2C cart if needed). Use Next.js App Router with static generation for all pages.

### 4.2 Navigation Structure

**Desktop Nav (sticky, top):**
- Logo (left) — links to /
- Links: Products · Nutrition · Subscribe · Recipes · Our Story · Find Us
- Right: "Order Now" pill button (terracotta, #BF3D0B) — opens a dropdown with 3 Q-Com platform links

**Mobile Nav:**
- Hamburger icon opens full-screen menu overlay
- Same links as desktop
- "Order Now" pill always visible in mobile nav bar

**Mobile Sticky Bottom Bar (fixed, z-index top, all pages):**
- Three platform logos: Blinkit | Zepto | Swiggy Instamart
- Each is a direct external link to the product page URL (use placeholder `#` until live URLs provided)
- Background: terracotta (#BF3D0B)
- Text: white, 13px, bold
- Height: 56px. Sits above any OS navigation chrome.
- This bar does NOT show on the Subscribe page (it would interrupt the conversion wizard).

**Footer:**
- Background: forest green (#1B4332)
- Logo: white variant
- Navigation links: Home · Products · Our Story · Nutrition & Protein · Subscribe · Recipes · Find Us · Contact
- Legal: FSSAI Licence No. [PLACEHOLDER] · Shatkona Ventures Private Limited · [REGISTERED ADDRESS PLACEHOLDER] · CIN: [PLACEHOLDER] · GST: [PLACEHOLDER]
- Copyright: © 2026 PANEVO. All rights reserved.
- Links: Privacy Policy · Terms of Use · Refund Policy (create placeholder pages for these — legal text to be supplied)
- Social: Instagram icon → @panevoindia (link when handle confirmed)
- WhatsApp icon → wa.me/918975016500
- Footer tagline: Made in India ✦ Delivered in 10 minutes

---

## 5. PAGE-BY-PAGE BUILD SPECIFICATION

**Selected copy approach for all pages: Option A (Bold/Challenger)**

Rationale for selecting Option A over B and C across all primary sections:
- Option A is the highest-conversion tone for the primary audience (Q-Com buyer, first impression, mobile).
- Option B (Warm/Narrative) is appropriate for the Our Story page full brand story — use Option B's long-form content there only.
- Option C (Scientific/Health) is appropriate for the Nutrition page macro table annotation and FAQ — use Option C framing for those specific sub-sections only.
- On every other page and section, Option A wins on clarity, directness, mobile readability, and CTA conversion.

---

### PAGE 1: HOME (/)

**Purpose:** Brand entry + simultaneous conversion hub for all 3 personas.

**Section order:**

#### 1.1 HERO
- Full viewport (100vh), dark near-black (#1A1A1A) background
- Background: warm-toned lifestyle photo placeholder (PANEVO Black Pepper sizzling on cast-iron tawa) — use a CSS gradient placeholder until photo asset is supplied
- Shatkona △▽ SVG animates in on load: fade + scale, 600ms, delay 200ms
- Saffron Gold badge (top right of hero): ✦ India's First Pre-Flavoured Paneer
- **Headline:** No Marination. No Prep. Just Paneer.
- **Sub-headline:** Bold. Ready. India's first pre-flavoured fresh paneer.
- **CTA 1 (primary, terracotta pill with angled notch):** Order Now →
  - On click: opens bottom sheet on mobile / dropdown on desktop with 3 platform links
- **CTA 2 (outline pill, white):** See Our Flavours → (links to /products)
- Hero text stagger animation: headline fades in first (0ms), sub-headline (150ms), CTAs (300ms), badge (450ms)

#### 1.2 Q-COMMERCE STRIP
- Full-width terracotta (#BF3D0B) band, immediately below hero
- **Headline:** In Your Kitchen in 10 Minutes.
- Three platform logos (PNG assets, placeholder SVG rectangles until assets supplied): Blinkit | Zepto | Swiggy Instamart
- Under each logo: "Order Now →" as a white text link → external product URL
- Sub-copy: Available now in Chandigarh Tri-City and Gurgaon
- On mobile: this section is NOT shown (replaced by sticky bottom bar which is always visible)

#### 1.3 PROBLEM SECTION
- Full-bleed forest green (#1B4332) background, white text
- **Section headline:** Why PANEVO Exists
- Three-column icon layout (single column on mobile, stacked):
  - Column 1 (Clock icon): "No More Marinating" — Every paneer recipe used to start the same way — marination, seasoning, waiting. We removed 30 minutes from your kitchen routine.
  - Column 2 (Tick icon): "Consistent, Every Time" — Same texture. Same flavour. Same result — whether it's a Tuesday dinner or a weekend gathering.
  - Column 3 (Flame icon): "Bold Flavour, Built In" — Black Pepper. Red Chilli Flakes. Oregano. Crafted into the paneer itself, not added on top.
- Icons: use simple SVG icons (clock, checkmark, flame). Do not use icon libraries with large bundle sizes.

#### 1.4 COMPARISON STRIP
- Light cream (#F2EEE5) background
- **Strip headline:** The Difference Is Built In.
- Simple 2-column table (Plain Paneer | PANEVO):
  - Prep Time: 30+ min marination | Zero. Open the pack and cook.
  - Flavour: Depends on your marinade — inconsistent | Infused into every block. Same result every time.
  - Result: Variable — some days great, some days flat | Consistent, restaurant-quality, every pack.
  - Protein: Same fresh dairy nutrition | Same fresh dairy nutrition — nothing removed or added.
- Table uses semantic `<table>` element for accessibility and SEO.

#### 1.5 PRODUCT SHOWCASE
- Cream (#F2EEE5) background
- **Section headline:** Pick Your Flavour. Cook in Minutes.
- **Sub-copy:** Three bold flavours. Two sizes — 200g for weeknights, 500g for the whole family.
- 3-column product card grid (desktop), 2-column (tablet), 1-column stacked (mobile)
- Each card: pack image placeholder → flavour name → one-line descriptor → "200g ₹125 · 500g ₹275" → "View Product →" (links to /products#[flavour-slug])
- Hover state: card lifts 6px, box-shadow deepens, image scales to 102%. 250ms transition.
- Card 1 — Black Pepper: Bold. Sharp. The one that started it all.
- Card 2 — Red Chilli Flakes: Heat that builds. Stays with you.
- Card 3 — Oregano: Mediterranean meets Modern India.

#### 1.6 PROTEIN MOMENT
- White (#FFFFFF) background
- Large display number "~18g" in terracotta
- **Headline:** Protein per 100g.
- **Sub-copy:** More than most. Clean, real, fresh.
- Stat pills (horizontal scroll on mobile): 18g Protein · ~260 kcal · Zero Preservatives · No Artificial Additives
- Counter animation: number counts up from 0 to 18 in 800ms when section enters viewport (use IntersectionObserver)
- **CTA:** See Full Nutrition → (links to /nutrition)

#### 1.7 SOCIAL PROOF
- White (#FFFFFF) background
- **Headline:** What People Are Saying
- Large stat: "76% of first-time tasters committed to buying weekly or daily." (source: sampling event, Chitkara University)
- Three testimonial cards (horizontal on desktop, vertical stack on mobile):
  - "Made paneer tikka in 8 minutes flat. The black pepper flavour is spot on — tasted like it had been marinating for hours." — Priya S., Chandigarh
  - "Finally a paneer that saves time without compromising on taste. My kids love the oregano one." — Rahul M., Gurgaon
  - "I use it for my meal prep every Sunday. 500g block, done in one go. Consistent every single time." — Sneha T., Mohali
- Instagram UGC feed placeholder: implement as a static 3-photo grid with placeholder images. Note in code: "Replace with Instagram Basic Display API integration in Phase 3 — API credentials and @panevoindia handle required."

#### 1.8 SUBSCRIPTION TEASER
- Cream (#F2EEE5) background
- **Headline:** Your Weekly Paneer Box. Sorted.
- **Sub-copy:** Pick your flavours. Choose your frequency. Delivered fresh, on schedule, every week. Cancel any time — no questions, no fuss.
- Three plan badges (non-interactive, display only): Weekly · Fortnightly · Monthly
- **CTA:** Start Your Weekly Box → (forest green button, links to /subscribe)

#### 1.9 BRAND SIGNATURE
- Dark full-bleed section (near-black #1A1A1A)
- Shatkona △▽ SVG centred, large (128px)
- One line: Raw + Ready. Ancient + Modern. India's Protein. Evolved.
- **CTA:** Our Story → (links to /our-story)

#### 1.10 PAGE-CLOSING CTA BANNER
- Forest green background
- **Headline:** Ready to Cook Differently?
- **Sub-copy:** Find PANEVO at your nearest store or order for delivery in minutes.
- CTA 1 (terracotta): Find Near You → (links to /find-us)
- CTA 2 (outline white): Explore All Flavours → (links to /products)

---

### PAGE 2: PRODUCTS (/products)

**Purpose:** Full product range, Q-Com purchase trigger per flavour.

#### 2.0 PAGE HERO
- **Headline:** Three Flavours. One Rule. Zero Marination.
- **Sub-copy:** Pick your PANEVO. Cook it in under 10 minutes. Eat better every day.
- Terracotta background with pack image

#### 2.1–2.3 PRODUCT DETAIL SECTIONS (one per flavour)
Use `id` anchors: `#black-pepper`, `#red-chilli-flakes`, `#oregano`

Each section layout:
- Full-bleed image (pack + lifestyle photo placeholder), alternating left/right on desktop, stacked on mobile
- Flavour name + tagline
- Sizes & MRP: 200g — ₹125 | 500g — ₹275
- Long description (use Option A copy from documents for each)
- "Best Used For" tag list
- Nutrition snapshot: [LAB CONFIRM] g protein per 100g — placeholder shown, note to replace with NABL values
- Storage: Refrigerate at 1–4°C. Consume within 5 days of opening.
- Universal cooking instructions (collapsible on mobile)
- **Primary CTA:** Order Now → (opens platform selector modal/bottom-sheet with Blinkit/Zepto/Instamart links)
- **Secondary CTA:** Find in Store → (links to /find-us)

#### 2.4 COMING SOON — PHASE 2 FLAVOURS
- **Section headline:** PANEVO's Next Chapter Is Coming.
- **Sub-copy:** We're not stopping at three. Four new flavours are in development — each one bolder than the last.
- 4 cards displayed as blurred/locked. Show flavour name only, rest visually obscured with CSS blur.
  - Gochujang · Mala (Sichuan) · Chipotle-Lime · Za'atar
- Email capture input + CTA: Notify Me When It Launches →
- Form submits to: POST to a Next.js API route `/api/waitlist` → writes to Google Sheets via webhook (see Integration section). Field: email + pre-tagged source "phase2-flavour"

#### 2.5 SHARED ELEMENTS
- Size guide comparison table (200g vs 500g) — semantic `<table>`
- Nutritional highlights strip (all SKUs): No preservatives · No artificial colours · No artificial flavours · High protein · Source of calcium

---

### PAGE 3: OUR STORY (/our-story)

**Purpose:** Brand depth, trust, founder credibility, flavour roadmap excitement.

#### 3.0 PAGE HERO
- **Headline:** How We Decided to Fix Paneer.
- **Sub-copy:** A brand doesn't start with a product. It starts with a problem nobody else is bothered to solve.
- Background: warm cream or terracotta-tinted image

#### 3.1 BRAND STORY — MAIN BODY
Use **Option A (full 600-word version)** from Master Document Section 06. This is the only section where the long narrative is appropriate. Divide into the 5 parts as structured. Use large pull-quotes for scannable rhythm.

#### 3.2 SHATKONA SYMBOL
- Animated SVG of △▽ forming the Shatkona — CSS animation, no JavaScript
- Use **Option A copy** for the symbol explanation section
- "△ is the ancient symbol for fire. ▽ is the symbol for water. Together: the Shatkona — the union of opposites."

#### 3.3 TEAM SECTION
- **Section headline:** The People Behind the Paneer
- Use **Option B copy** (warmer bios, more complete context):
  - Harviinder — Co-Founder
  - Shwetta — Co-Founder
  - Palvit — Head of Operations & R&D
  - Sandeep [CONFIRM FULL NAME] — Mentor & Senior Advisor (placeholder name in code)
- Each card: name, title, bio, photo placeholder (show a cream placeholder with initials)
- Cards do NOT require social links at launch

#### 3.4 FLAVOUR ROADMAP
- **Section headline:** The Bold Roadmap
- Timeline display (vertical on mobile, horizontal on desktop):
  - Launch (FY26–27): Black Pepper · Red Chilli Flakes · Oregano
  - Phase 2 (FY27–28): Gochujang · Mala (Sichuan) · Chipotle-Lime · Za'atar
  - Phase 3 (FY28–29): Shichimi Togarashi · White Miso-Sesame · Aji Amarillo · Berbere
  - Phase 4 (FY29+): Truffle Reserve · Rose Harissa · Yuzu Kosho · Smoked Pimentón
- Phase 2 cards are highlighted. Phases 3 and 4 are muted/greyed.
- **CTA:** Notify me when Phase 2 launches → (email capture, tags source "roadmap-phase2")

#### 3.5 INSTITUTIONAL CREDENTIALS
- Manufacturing partnership: Kamdhenu Hitkari Manch
- Research collaboration: ICAR-NDRI Karnal
- DPIIT-recognised startup
- Display as trust badge strip. No dedicated section — embed within story flow.

---

### PAGE 4: NUTRITION & PROTEIN (/nutrition)

**Purpose:** SEO-first health/gym audience capture. No Indian paneer brand has this page — first-mover advantage.

#### 4.0 PAGE HERO
- Terracotta background
- **Headline:** The Protein You've Been Underestimating.
- **Sub-copy:** Paneer has always been India's best-kept protein secret. PANEVO makes it impossible to ignore.
- **CTA:** Shop Now → (links to /products)

#### 4.1 MACRO TABLE
- Use **Option C annotation** (scientific framing with source references) for this section only.
- Clean white-background `<table>`, tabular-nums
- All three SKUs side by side
- Rows: Energy (kcal) · Protein (g) · Total Fat (g) · Carbohydrates (g) · Calcium (mg) · Sodium (mg)
- All cells show [LAB CONFIRM] placeholder — add inline comment in code: "REPLACE with NABL-certified values before go-live"
- Note under table: "All values are per 100g. Lab-tested at NABL-accredited facility."
- "Designed to be screenshotted" — add a lightweight "Copy table" or "Download PDF" button that triggers browser print for this section only

#### 4.2 PROTEIN COMPARISON CHART
- **Section headline:** Paneer Belongs in the Protein Conversation.
- Horizontal bar chart (render as SVG or using a lightweight charting lib — recharts or plain SVG):
  - PANEVO Paneer: ~18g / 100g (Terracotta bar)
  - Chicken Breast (grilled): ~31g / 100g
  - Eggs (whole raw): ~13g / 100g
  - Tofu: ~8g / 100g
  - Soya Chunks (dry): ~52g / 100g
- Citation note: IFCT 2017 / USDA FoodData Central
- Closing line: "On a cooked, ready-to-eat basis, paneer is the clear winner for vegetarians. PANEVO makes it easier to eat daily."

#### 4.3 CLEAN LABEL SECTION
- **Headline:** If you can't pronounce it, it's not in PANEVO.
- Ingredient list in large type (32px+): Milk · Salt · [Black Pepper / Red Chilli Flakes / Oregano] · Citric Acid
- Closing: "That's it. That's the whole ingredient list."
- Trust badges (icon + text, horizontal row):
  ✓ No Artificial Flavours · ✓ No Preservatives · ✓ No Additives · ✓ Vegetarian · ✓ FSSAI Compliant

#### 4.4 FITNESS RECIPES (preview only)
- Three recipe cards with macro data:
  - Black Pepper Salad Bowl: 380 kcal · 28g protein · 5 min · The post-workout bowl.
  - Oregano Stir-Fry: 290 kcal · 22g protein · 8 min · The clean bulk meal.
  - Red Chilli Tikka: 310 kcal · 26g protein · 10 min · The cutting phase favourite.
- Each: full macro table per serving + "View Full Recipe →" (links to /recipes#[recipe-slug])

#### 4.5 FAQ SECTION (SEO-optimised)
- Implement as accordion. Each question is an `<h3>`. Use FAQ JSON-LD schema markup.
- 5 questions (use Option A answers):
  - Is paneer good for weight loss?
  - Can I eat paneer daily?
  - How does PANEVO compare to plain paneer for protein?
  - Is PANEVO suitable for keto?
  - Is PANEVO suitable for children?

---

### PAGE 5: SUBSCRIBE (/subscribe)

**Purpose:** Dedicated subscription conversion page. No dead ends. Sticky mobile bottom bar is OFF on this page.

#### 5.0 PAGE HERO
- **Headline:** Your Weekly Paneer Box. Cancel Any Time.
- **Sub-copy:** Stop thinking about paneer. Start eating it.
- Trust signals inline: No lock-in · Pause any time · Fresh every delivery
- **CTA:** See Plans → (smooth scroll to plan cards)
- Background: cream with terracotta accent

#### 5.1 PLAN CARDS
- Three cards in a row (desktop), stacked (mobile)
- **Weekly** (Most Popular — saffron gold badge): Delivered every 7 days. Pick your flavour each time. Best for households that eat paneer 2–3x/week. → Subscribe Weekly →
- **Fortnightly**: Delivered every 14 days. Two-pack option available. Best for smaller households. → Subscribe Fortnightly →
- **Monthly**: One delivery per month. Best for families who batch-cook. → Subscribe Monthly →
- Each card CTA scrolls to / activates step 1 of the wizard below, pre-selecting the chosen plan.

#### 5.2 SUBSCRIPTION WIZARD (3 steps, no full page reload)
Implement as a multi-step form component with local state. Do not use full page routing for steps.

- **Step 1 — Choose Your Plan:** Weekly / Fortnightly / Monthly selector (pre-filled from card click). Size: 200g or 500g.
- **Step 2 — Select Flavours:** Checkbox group: Black Pepper · Red Chilli Flakes · Oregano · Mixed (one of each 200g). At least one required.
- **Step 3 — Delivery & Payment:** Name · Phone · Email · Delivery address fields. "Continue to Payment" → opens Razorpay subscription modal.
- No forced account creation until post-payment. Account is created on Razorpay confirmation webhook.
- Progress indicator: Step 1 of 3 / Step 2 of 3 / Step 3 of 3 — visible above wizard.
- Form validation: HTML5 native validation + JS guard before advancing steps.

#### 5.3 TRUST SIGNALS STRIP
- Below wizard
- ✓ No lock-in contract · ✓ Pause or cancel any time · ✓ Fresh cold-chain delivery · ✓ Mix and match flavours
- Testimonials (2): subscription-specific testimonials from Social Proof pool

#### 5.4 SUBSCRIPTION FAQ (collapsible)
- Can I change my flavour between deliveries?
- Can I pause my subscription?
- How fresh is the paneer on delivery?
- How do I cancel?
- What payment methods are accepted?

---

### PAGE 6: FIND US (/find-us)

**Purpose:** Q-Com purchase gateway + GT store locator + trade enquiry.

#### 6.0 PAGE HERO
- **Headline:** PANEVO is Closer Than You Think.
- **Sub-copy:** Delivered in 10 minutes on Blinkit, Zepto, and Swiggy Instamart — or find us at your nearest store across Chandigarh Tri-City and Gurgaon.

#### 6.1 Q-COMMERCE SECTION
- **Headline:** Delivered in 10 Minutes.
- Three large platform logo tiles (full-width on mobile, 3-col on desktop)
- Each tile: platform logo + "Order Now →" button → external product URL
- Sub-copy: Search "PANEVO" or "flavoured paneer" on any platform.
- Availability note: Currently available in Chandigarh Tri-City and Gurgaon
- All 3 URLs: placeholder (#) — add inline comment: "REPLACE with live product listing URLs once approved on each platform"

#### 6.2 GT STORE LOCATOR
- **Headline:** Find Us at Your Nearest Store.
- City filter tabs: All | Chandigarh | Mohali | Zirakpur | Panchkula | Gurgaon
- Google Maps embed (JavaScript API) with pins for each confirmed store location
- Below map: filterable store list table with: Store name | Location | City
- Confirmed launch store data (hardcoded at launch, dynamic later):
  - Reliance SMART Bazaar — Elante Mall, Chandigarh
  - Reliance SMART Bazaar — Paras Downtown Mall, Zirakpur
  - Reliance Fresh — SCO-9 Sector 16, Panchkula
  - Reliance Fresh — 506–508 Himalaya Marg Sector 70, Mohali
  - DMart — Chattbir Road, Zirakpur
  - DMart — Peer Muchalla Road, Zirakpur/Panchkula
  - M.G. Supermarket — Sector 11, Chandigarh
  - RLCR-7 Super Market — Sector 7, Chandigarh
  - Fresh Signature — Phase 10, Mohali
  - Holly Mart — Sector 11, Panchkula
- Store list is hardcoded JSON initially. Mark in code for CMS migration in Phase 2.

#### 6.3 COMING TO MORE CITIES
- **Headline:** PANEVO is Growing.
- City expansion display: Currently live → Chandigarh Tri-City · Gurgaon | Coming → Delhi · Mumbai · Bangalore (FY27-28) | Global → UAE · UK · USA
- **CTA:** Tell us your city → (email + city name form)
- Submits to `/api/waitlist` with source tag "city-expansion"

#### 6.4 TRADE/DISTRIBUTOR ENQUIRY
- **Headline:** Want to Stock PANEVO?
- **Sub-copy:** We're looking for distribution partners, premium kirana stores, and Modern Trade buyers. Our team responds within 48 hours.
- Enquiry form fields: Name · Business Name · City/Area · Type (dropdown: GT / MT / HoReCa / Distributor) · Monthly Volume Estimate · Message
- Submits to trade@panevo.in via Next.js API route `/api/trade-enquiry`

---

### PAGE 7: CONTACT (/contact)

**Purpose:** All-enquiry gateway. Lightweight investor/press gateway until Phase 2 investor page is built.

#### 7.0 PAGE HERO
- **Headline:** Talk to Us.
- **Sub-copy:** We're a small team. We read everything. We reply fast.

#### 7.1 CONTACT FORM
- Fields: Name · Email · Phone (optional) · Subject (dropdown: General Enquiry / Trade & Distribution / Press & Media / Investor Relations / Careers / Other) · Message
- **CTA button:** Send Message (terracotta)
- Routing logic on submit:
  - Subject = Trade & Distribution → routes to trade@panevo.in
  - Subject = Press or Investor → routes to harviinder@panevo.in
  - All others → routes to info@panevo.in
- Implement via `/api/contact` Next.js route using Nodemailer or Resend (whichever is pre-configured in environment)

#### 7.2 DIRECT CONTACTS
- Harviinder: harviinder@panevo.in · +91 89750 16500 · +91 87795 67496
- General: info@panevo.in
- Trade: trade@panevo.in
- WhatsApp: wa.me/918975016500
- Note: Instagram DMs open at @panevo (handle pending confirmation)

#### 7.3 REGISTERED DETAILS
- Shatkona Ventures Private Limited
- [REGISTERED ADDRESS — PLACEHOLDER]
- CIN: [PLACEHOLDER] · FSSAI: [PLACEHOLDER] · GST: [PLACEHOLDER]
- Display clearly in footer of this page and site-wide footer

---

### RECIPES PAGE (/recipes)

**Purpose:** SEO content hub. Long-term organic traffic driver for fitness and food keywords.

#### R.0 PAGE HERO
- **Headline:** 10 Minutes. Three Flavours. Infinite Meals.
- **Sub-copy:** Every PANEVO recipe starts the same way: open the pack. From there, it's up to you.

#### R.1 FILTER STRIP
- Horizontal filter pills: All · Black Pepper · Red Chilli Flakes · Oregano · Under 10 min · High Protein
- Client-side filtering (no page reload)
- On mobile: horizontally scrollable filter row

#### R.2 RECIPE GRID
- 2-column desktop, 1-column mobile
- Each recipe card: photo placeholder · recipe title · SKU badge · time · difficulty · serves · "View Recipe →"
- Clicking a card opens the full recipe — implement as a dynamic route `/recipes/[slug]`

**6 Launch Recipes (all data from documents — exact content):**

1. **Tawa Black Pepper Paneer Tikka** — 8 min · Easy · PANEVO Black Pepper · Serves 2
2. **Quick Red Chilli Paneer Bhurji** — 10 min · Easy · PANEVO Red Chilli Flakes · Serves 2
3. **Oregano Paneer Pizza Topping** — 12 min · Easy · PANEVO Oregano · Serves 2
4. **Pepper Paneer Wrap** — 7 min · Easy · PANEVO Black Pepper · Serves 2
5. **Spicy Paneer Chilli — Restaurant Style** — 12 min · Medium · PANEVO Red Chilli Flakes · Serves 4
6. **Herb Oregano Paneer Salad Bowl** — 5 min · Easy · PANEVO Oregano · Serves 2

Each recipe detail page includes: full ingredient list + method + chef's tip + macro data (placeholder pending NABL) + "Order This Flavour →" CTA

#### R.3 RECIPE PAGE SEO
Each recipe page gets:
- `<title>`: [Recipe Name] — PANEVO Recipes
- `<meta description>`: [N] minute recipe using PANEVO [Flavour]. High-protein. Zero marination.
- Recipe JSON-LD schema with all fields populated
- `og:image` placeholder using recipe photo

---

### FAQ PAGE
**[Assumption]:** Build as a section within /products and /nutrition pages using the FAQ accordion component. Do not create a standalone /faq route at launch. The 21 FAQs are distributed: Product FAQs on /products, Nutrition FAQs on /nutrition, Cooking FAQs on /recipes, Storage + Where to Buy + Quality FAQs on /find-us.

---

## 6. COMPONENT SYSTEM

Build a shared component library. All components go in `/src/components/`. Use this structure:

```
/src/components/
  /ui/
    Button.tsx         — primary, secondary, outline variants + angled notch clip-path
    Badge.tsx          — Saffron Gold badge (India's First, Most Popular, etc.)
    Card.tsx           — product card, recipe card, plan card variants
    StatPill.tsx       — macro stats: "18g Protein", "Zero Preservatives"
    TrustBadge.tsx     — checkmark + label trust signals
    FAQAccordion.tsx   — accessible accordion, keyboard navigable
    Wizard.tsx         — multi-step form with step indicator
  /layout/
    Navbar.tsx         — sticky top nav, desktop + mobile hamburger
    Footer.tsx         — forest green, all links, legal
    StickyBottomBar.tsx — Q-Com platform bar, mobile-only, hidden on /subscribe
    WhatsAppButton.tsx  — floating bottom-right, all pages
  /sections/
    Hero.tsx           — reusable hero with background, headline, sub, CTAs, badge
    ProductCard.tsx    — flavour card for homepage + products page
    PlanCard.tsx       — subscription plan card
    RecipeCard.tsx     — recipe thumbnail card
    ComparisonTable.tsx — PANEVO vs Plain Paneer semantic table
    MacroTable.tsx     — tabular nutrition data
    ProteinChart.tsx   — horizontal bar chart SVG
    StoreLocator.tsx   — Google Maps + city filter + store list
    TestimonialCard.tsx — quote, name, city
    SocialProofStrip.tsx — stat + testimonials section
  /forms/
    ContactForm.tsx
    WaitlistForm.tsx   — email + optional city, reused on multiple pages
    TradeEnquiryForm.tsx
    SubscriptionWizard.tsx — 3-step subscription flow
```

**Component rules:**
- All components are TypeScript
- Props typed with interfaces
- No hardcoded colours — use CSS custom properties only
- All interactive elements have focus states for accessibility
- Mobile-first responsive: design for 375px width, scale up

---

## 7. CONVERSION FLOWS

### Flow 1 — Q-Com Buyer (fastest path)
1. User lands on any page
2. Sees sticky nav "Order Now" or sticky bottom bar (mobile)
3. Taps → platform selector (bottom sheet on mobile, popover on desktop)
4. Three options: Blinkit | Zepto | Swiggy Instamart
5. Taps platform → opens external URL in new tab
6. **GA4 Event:** `qcom_click` with properties: platform (blinkit/zepto/instamart), source_page, source_element (nav/bottom-bar/product-card/hero-cta)

### Flow 2 — Subscription Conversion
1. User arrives on Homepage or /subscribe
2. Sees subscription teaser or plan cards
3. Clicks plan CTA → scrolled to wizard on /subscribe
4. Step 1: selects plan + size
5. Step 2: selects flavours
6. Step 3: enters delivery details → clicks "Continue to Payment"
7. Razorpay Subscription modal opens
8. On success: redirect to /subscribe/thank-you (static confirmation page)
9. **GA4 Events:** `subscription_wizard_start`, `subscription_step_complete` (step: 1/2/3), `subscription_payment_initiated`, `subscription_payment_success`

### Flow 3 — Health/Gym Persona (content → commerce)
1. User finds Nutrition page via search (SEO-driven)
2. Reads protein comparison, macro table, clean label
3. Clicks "Shop High-Protein Paneer →" → /products
4. Views Black Pepper or Oregano product detail
5. Clicks "Order Now →" → platform selector → Q-Com purchase
6. OR clicks "Start Your Weekly Box →" → /subscribe → Wizard
7. **GA4 Events:** `nutrition_page_view`, `protein_chart_view`, `product_cta_click`

### Flow 4 — Waitlist/Lead Capture
1. Multiple entry points: Coming Soon flavours, City Expansion form, Roadmap
2. User enters email (+ optional city)
3. POST to `/api/waitlist` → writes to Google Sheets via webhook URL (stored in env variable `WAITLIST_WEBHOOK_URL`)
4. Response: success message inline, no page reload
5. MSG91 WhatsApp automation picks up from sheet (existing system — integrate webhook, do not rebuild)
6. **GA4 Event:** `waitlist_signup` with property: source (phase2-flavour/city-expansion/roadmap-phase2)

---

## 8. INTEGRATIONS

### 8.1 Razorpay Subscriptions
- Library: `razorpay` npm package (server-side) + Razorpay checkout JS (client-side via script tag)
- **API route:** `POST /api/create-subscription`
  - Accepts: plan_id, customer details
  - Creates Razorpay subscription
  - Returns subscription_id and Razorpay order details
- **Client:** Opens `Razorpay.open()` with subscription details in Step 3 of wizard
- **Webhook:** `POST /api/razorpay-webhook`
  - Verifies Razorpay signature
  - On `subscription.charged` or `subscription.activated`: save subscriber data, trigger Klaviyo welcome sequence
  - On `subscription.cancelled`: mark subscriber inactive
- **Plans to pre-create in Razorpay dashboard (before launch):**
  - Weekly 200g plans per flavour
  - Weekly 500g plans per flavour
  - Fortnightly 200g plans per flavour
  - Fortnightly 500g plans per flavour
  - Monthly 500g plans per flavour
- **Store plan IDs as environment variables:** `RAZORPAY_PLAN_WEEKLY_200G_BP`, etc.
- **Environment variables needed:** `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`
- **[Assumption]:** Razorpay account must be set up and verified by client before integration can be activated. Code is built and ready; activation requires live credentials.

### 8.2 WhatsApp Floating Button
- Fixed position: bottom-right, 72px from right, 80px from bottom (above sticky bottom bar on mobile)
- WhatsApp icon (SVG)
- Link: `https://wa.me/918975016500`
- Opens WhatsApp in new tab
- Pre-filled message: "Hi PANEVO team, I have a question about..."
- Encoded: `https://wa.me/918975016500?text=Hi%20PANEVO%20team%2C%20I%20have%20a%20question%20about...`
- Display on all pages except /subscribe (where it would interrupt checkout)
- **GA4 Event:** `whatsapp_click` with source_page property

### 8.3 Q-Commerce Deep Links
- Stored as environment variables or a config file `/src/config/platforms.ts`:
  ```typescript
  export const QCOM_LINKS = {
    blinkit: process.env.NEXT_PUBLIC_BLINKIT_URL || '#',
    zepto: process.env.NEXT_PUBLIC_ZEPTO_URL || '#',
    instamart: process.env.NEXT_PUBLIC_INSTAMART_URL || '#',
  }
  ```
- All Q-Com CTAs reference this config — one place to update when URLs go live
- All links open in `target="_blank"` with `rel="noopener noreferrer"`

### 8.4 Google Maps — Store Locator
- Use Google Maps JavaScript API
- API key stored in `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` env variable
- Restrict key to panevo.in domain in Google Cloud Console (note this in README)
- Map shows pins for all confirmed GT stores
- Store data stored as a JSON array in `/src/data/stores.ts` — hardcoded at launch, structured for future CMS
- City filter updates which pins are visible and which rows are shown in the table below the map
- Map fallback: if API fails or key not set, show a styled text list of stores

### 8.5 Waitlist / Lead Capture
- API route: `POST /api/waitlist`
- Accepts: email, city (optional), source (string)
- Sends HTTP POST to Google Sheets webhook URL (n8n or Google Apps Script — use whichever is already live per documents)
- Environment variable: `WAITLIST_WEBHOOK_URL`
- Response: 200 on success, inline success message in form, no redirect
- Rate limit: one submission per IP per 60 seconds (use simple in-memory or Vercel Edge rate limit)

### 8.6 Google Analytics 4
- Install via `@next/third-parties/google` or manual script in `/app/layout.tsx`
- Measurement ID stored in `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
- Implement a `trackEvent(eventName, properties)` utility function in `/src/lib/analytics.ts`
- All custom events route through this function for consistent implementation
- **Events to track (minimum launch set):**
  - `page_view` (automatic via GA4 script)
  - `qcom_click` — platform, source_page, source_element
  - `whatsapp_click` — source_page
  - `waitlist_signup` — source
  - `subscription_wizard_start`
  - `subscription_step_complete` — step (1/2/3)
  - `subscription_payment_initiated`
  - `subscription_payment_success`
  - `product_view` — flavour_name
  - `recipe_view` — recipe_name, flavour
  - `nutrition_page_view`
  - `trade_enquiry_submit`
  - `contact_form_submit` — subject_category

### 8.7 Hotjar
- Install Hotjar embed in `/app/layout.tsx`
- Site ID stored in `NEXT_PUBLIC_HOTJAR_ID`
- Enable session recording on /subscribe page (highest priority for conversion analysis)
- No additional configuration at Phase 1 — just ensure the script loads

### 8.8 Klaviyo (Email Marketing)
- Waitlist capture feeds Klaviyo via webhook (Google Sheets → Klaviyo via Zapier or n8n — mark in code as "[CONFIGURE: Klaviyo webhook from Google Sheets]")
- Subscription confirmation (from Razorpay webhook) triggers Klaviyo "Subscription Welcome" event via Klaviyo API
- Environment variable: `KLAVIYO_API_KEY`
- Implement a `/src/lib/klaviyo.ts` utility with: `addToList(email, listId, properties)` and `trackEvent(email, eventName, properties)`
- List IDs to configure: waitlist, subscribers — store as env variables

### 8.9 Instagram UGC Feed
- **[Deferred to Phase 3]:** Instagram Basic Display API requires app review. Build a static placeholder grid (3 photos) at launch. In code, add comment: "// TODO Phase 3: Replace with Instagram Basic Display API — requires approved app + @panevoindia credentials"

### 8.10 Contact Form Email Routing
- Use Resend (preferred, simple API) or Nodemailer in `/api/contact`
- Environment variable: `RESEND_API_KEY` or SMTP credentials
- From address: noreply@panevo.in (configure domain in Resend/email provider)

---

## 9. RESPONSIVE BEHAVIOR

**Breakpoints:**
```css
--mobile: < 768px    /* Design target: 375px minimum */
--tablet: 768–1023px
--desktop: ≥ 1024px
```

**Mobile-first rules:**
- Write all CSS for mobile first, use `min-width` media queries to scale up
- No horizontal scroll at any breakpoint
- Tap targets minimum 44×44px (WCAG AA)
- Body text minimum 16px on mobile (17–18px on desktop)
- Section padding: 48px vertical on mobile, 96px on desktop

**Specific mobile behaviors:**
- Sticky bottom bar (Q-Com): visible on all pages except /subscribe, persists through all scroll
- Navigation: hamburger menu, full-screen overlay
- Product cards: 2-column at 375px minimum, 1-column if needed
- Plan cards: stacked vertically, full width
- Comparison table: horizontally scrollable if columns overflow
- Hero: full-screen height (100svh, use `svh` units for mobile browser chrome)
- Hero CTAs: stacked vertically on mobile, side-by-side on desktop
- Wizard: full-width on mobile, max-width 560px centered on desktop
- Store map: 280px height on mobile, 400px on desktop

**Animation rules:**
- Page load hero stagger: only on first viewport, disabled if `prefers-reduced-motion` is set
- Scroll reveals: `@keyframes slideUp` with IntersectionObserver, 24px translate, 300ms ease
- Counter animation (protein section): IntersectionObserver, disable if `prefers-reduced-motion`
- Product card hover: only on devices with `hover: hover` (pointer devices) — no hover effects on touch
- Never auto-play any video
- Never use carousels on mobile
- No pop-ups or modals within 30 seconds of any page load

---

## 10. SEO REQUIREMENTS

### 10.1 Metadata Structure

Every page requires:
```typescript
export const metadata: Metadata = {
  title: '[Page Title] — PANEVO | India's First Pre-Flavoured Fresh Paneer',
  description: '[Page-specific meta description, 150–160 chars]',
  canonical: 'https://panevo.in/[route]',
  openGraph: {
    title: '...',
    description: '...',
    image: '/og/[page]-og.jpg', // 1200×630px placeholder
    url: 'https://panevo.in/[route]',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '...',
    description: '...',
    image: '/og/[page]-og.jpg',
  },
}
```

**Page-specific metadata targets:**

| Page | Title Target | Primary Keyword |
|------|-------------|-----------------|
| Home | PANEVO — India's First Pre-Flavoured Fresh Paneer | pre-flavoured paneer India |
| Products | Buy PANEVO Flavoured Paneer — Black Pepper, Red Chilli, Oregano | flavoured paneer buy online |
| Nutrition | Paneer Protein Per 100g — PANEVO Nutrition Facts | paneer protein per 100g |
| Subscribe | Weekly Paneer Subscription Delivery — PANEVO | paneer weekly subscription delivery |
| Recipes | Quick Paneer Recipes Under 15 Minutes — PANEVO | high protein paneer recipes |
| Our Story | Our Story — PANEVO, India's First Pre-Flavoured Paneer Brand | — |
| Find Us | Buy PANEVO in Chandigarh, Mohali, Gurgaon — Online and In-Store | fresh paneer Chandigarh |

### 10.2 Structured Data (JSON-LD)

Implement on launch:
- **Organization** schema: site-wide in layout.tsx
- **Product** schema: one per SKU on /products — name, description, image, brand, offers (price, priceCurrency, availability)
- **FAQPage** schema: on /nutrition and /products
- **Recipe** schema: on each /recipes/[slug] page
- **BreadcrumbList** schema: on all inner pages

### 10.3 Technical SEO
- `robots.txt`: Allow all, disallow /api/
- `sitemap.xml`: Auto-generated via `next-sitemap` package
- All internal links use semantic `<a>` elements, not onClick handlers
- `<img>` elements: all have `alt` attributes, loaded with `next/image` for automatic optimization
- Semantic HTML throughout: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`, `<h1>`–`<h6>` hierarchy
- One `<h1>` per page
- Google Search Console: submit sitemap on launch (note in launch checklist, not in code)

---

## 11. ANALYTICS AND TRACKING

### 11.1 Event Tracking Plan

All events implemented via `trackEvent()` utility in `/src/lib/analytics.ts`. The function sends to GA4 via `gtag('event', ...)`.

```typescript
// /src/lib/analytics.ts
export function trackEvent(eventName: string, properties?: Record<string, string | number | boolean>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
}
```

**Complete event list:**

| Event Name | Trigger | Key Properties |
|-----------|---------|----------------|
| `qcom_click` | Any Q-Com CTA click | platform, source_page, source_element |
| `whatsapp_click` | WhatsApp button click | source_page |
| `waitlist_signup` | Waitlist form submit success | source |
| `subscription_wizard_start` | Wizard step 1 render | — |
| `subscription_step_complete` | User advances wizard step | step (1/2/3), plan_type |
| `subscription_payment_initiated` | Razorpay modal opens | plan_type, flavour_selection |
| `subscription_payment_success` | Razorpay success callback | plan_type |
| `product_view` | Recipe detail page load | flavour_name |
| `recipe_view` | Recipe detail page load | recipe_name, flavour |
| `nutrition_page_view` | /nutrition page load | — |
| `trade_enquiry_submit` | Trade form submit success | enquiry_type |
| `contact_form_submit` | Contact form submit success | subject_category |
| `coming_soon_signup` | Phase 2 flavour email capture | — |

### 11.2 Conversion Goals (configure in GA4)
- Subscription payment success
- Q-Com click (any platform)
- Waitlist signup

---

## 12. PERFORMANCE AND ACCESSIBILITY

### 12.1 Performance Targets
- Lighthouse mobile score: ≥ 85
- Largest Contentful Paint: < 2.5s
- Total Blocking Time: < 300ms
- Cumulative Layout Shift: < 0.1

**Implementations:**
- All images: `next/image` with `priority` on hero images, lazy loading on all others
- Hero background image: preloaded with `<link rel="preload">` in `<head>`
- Web fonts: use `next/font` with `display: swap`
- No render-blocking scripts: Google Maps and Hotjar loaded with `strategy="afterInteractive"` via `next/script`
- CSS animations: use `will-change: transform` only on actively animating elements. Remove after animation.
- No third-party JS loaded synchronously in `<head>`
- Razorpay checkout JS: loaded on demand only when user reaches wizard Step 3

### 12.2 Accessibility (WCAG AA)
- All interactive elements focusable via keyboard in logical tab order
- Focus visible: custom focus ring using `outline: 2px solid var(--color-terracotta)` — never `outline: none` without replacement
- All images have descriptive `alt` text (empty `alt=""` for decorative images)
- All form fields have `<label>` elements (or `aria-label`)
- Accordion FAQ uses proper ARIA: `aria-expanded`, `aria-controls`, `id` pairing
- Wizard form: `aria-live="polite"` on step indicator for screen reader announcements
- Colour contrast: all text passes AA ratio (pre-verified against brand palette — near-black #1A1A1A on cream #F2EEE5 passes easily)
- No content conveyed by colour alone
- Mobile sticky bar and WhatsApp button have `aria-label` attributes

---

## 13. LAUNCH SCOPE VS FUTURE SCOPE

### 13.1 Must Exist on Launch Day (Phase 1)

- [ ] All 7 pages fully built and responsive
- [ ] Sticky nav with Order Now dropdown
- [ ] Sticky mobile bottom bar on all pages except /subscribe
- [ ] WhatsApp floating button on all pages except /subscribe
- [ ] All Q-Com deep links configured (URLs inserted when live)
- [ ] Subscription wizard functional with Razorpay
- [ ] Waitlist/email capture forms working (all variants)
- [ ] Contact form routing to correct inboxes
- [ ] Trade enquiry form working
- [ ] Google Maps store locator with all launch store pins
- [ ] GA4 + Hotjar installed and tracking
- [ ] All 6 recipes with full content
- [ ] All 21 FAQs distributed across pages
- [ ] Nutrition page complete with placeholder lab values flagged clearly
- [ ] All brand colours, typography, and spacing implemented
- [ ] Hero animations working (respects prefers-reduced-motion)
- [ ] Protein counter animation
- [ ] Product card hover states
- [ ] Footer complete with legal placeholders marked
- [ ] SEO metadata on all pages
- [ ] robots.txt and sitemap.xml
- [ ] JSON-LD: Organization + Product + FAQ schemas
- [ ] Privacy Policy, Terms of Use, Refund Policy pages (content placeholder, structure complete)
- [ ] All placeholder content clearly marked with `[PLACEHOLDER]` comments in code

### 13.2 Deferred to Phase 2 (Design + CMS)
- Final photography assets (professional shoot in Week 2 of build timeline)
- Sanity CMS integration for non-developer content editing
- Instagram UGC feed (requires API approval)
- Dedicated Investor/B2B page
- Klaviyo full email sequence setup
- Store locator dynamic data from CMS

### 13.3 Deferred to Phase 3 (QA + Scale)
- D2C cart (if Razorpay subscription model expands to one-time purchases)
- City-specific landing pages for SEO (/paneer-chandigarh, /paneer-gurgaon)
- YouTube recipe video integration
- International shipping/export flow
- Multi-language support
- Subscription account dashboard
- HoReCa/B2B portal

### 13.4 Explicitly Out of Scope for Phase 1
- Any inventory management system
- Any order management or fulfilment system
- Shopify or any e-commerce platform integration
- Customer login/account area (Razorpay handles subscription management)
- Blog CMS
- Push notifications
- Native mobile app

---

## 14. BUILD CONSTRAINTS

1. **Build mobile-first.** Design and test at 375px first. Desktop is an enhancement.
2. **No final visual polish.** Implement colours, typography, spacing, and layout accurately. Visual refinement (shadows, gradients, exact illustration treatment) comes in Phase 2.
3. **No unnecessary dependencies.** Evaluate every npm package before adding. Prefer native browser APIs and Next.js built-ins. Recharts is acceptable for the protein comparison chart. No other charting library.
4. **One source of truth for brand data.** Create `/src/config/brand.ts` with all colours, platform links, contact details, store data — import everywhere. Never hardcode brand values in components.
5. **Placeholder discipline.** Every missing asset (photo, FSSAI number, NABL lab value, Q-Com URL, registered address) must be: (a) visually represented (placeholder box/colour/text), (b) marked in code with `// [PLACEHOLDER: description]` comment, (c) listed in a `/PLACEHOLDERS.md` file at project root.
6. **API routes are server-side only.** Never expose Razorpay secret key, email credentials, or webhook secrets to the client. All sensitive operations happen in `/app/api/` routes.
7. **Environment variables.** All third-party credentials go in `.env.local`. Include a `.env.example` with all required keys listed but values empty. Never commit `.env.local`.
8. **No carousels on mobile.** Any horizontal content is scrollable with `overflow-x: auto` and no scroll indicators. Carousels on desktop only if genuinely needed.
9. **Reusable components only.** If a UI element appears on more than one page, it must be a shared component. No copy-pasting JSX between pages.
10. **TypeScript strict mode.** Enable strict TypeScript. No `any` types.

---

## 15. ACCEPTANCE CRITERIA

The Phase 1 build is complete when:

**Functionality:**
- [ ] All 7 pages render correctly on iPhone 14 (375px), iPad (768px), and 1440px desktop
- [ ] Sticky bottom bar visible on mobile on Home, Products, Nutrition, Recipes, Our Story, Find Us, Contact — hidden on Subscribe
- [ ] WhatsApp button opens correct pre-filled WhatsApp URL
- [ ] Q-Com CTA dropdown shows all 3 platforms with correct links (placeholder or live)
- [ ] Subscription wizard completes all 3 steps without errors
- [ ] Razorpay modal opens on Step 3 (test mode if live credentials not yet provided)
- [ ] All forms submit successfully and show inline confirmation messages
- [ ] Google Maps renders with store pins on /find-us
- [ ] City filter on store locator correctly shows/hides stores
- [ ] Recipe filter correctly shows/hides recipe cards
- [ ] FAQ accordion opens and closes correctly
- [ ] All internal links resolve to correct pages (no 404s)
- [ ] All external links open in new tab with rel="noopener noreferrer"

**Performance:**
- [ ] Lighthouse mobile score ≥ 85 on homepage
- [ ] No console errors on any page
- [ ] Images all loading with next/image

**SEO:**
- [ ] Each page has unique `<title>` and `<meta description>`
- [ ] JSON-LD schema present on Home (Organization), Products (Product), Nutrition (FAQ), Recipes (Recipe)
- [ ] sitemap.xml accessible at panevo.in/sitemap.xml
- [ ] robots.txt accessible at panevo.in/robots.txt

**Tracking:**
- [ ] GA4 events firing in GA4 DebugView for all events listed in Section 11
- [ ] Hotjar session recording active on /subscribe

**Code quality:**
- [ ] TypeScript strict mode passes with no errors
- [ ] All placeholder content documented in /PLACEHOLDERS.md
- [ ] .env.example contains all required environment variable keys
- [ ] No hardcoded brand values outside /src/config/brand.ts

**Accessibility:**
- [ ] All interactive elements reachable by keyboard
- [ ] No visible focus lost on tab navigation
- [ ] Screen reader can navigate FAQ accordion
- [ ] Subscription wizard step changes announced via aria-live

---

## APPENDIX: ENVIRONMENT VARIABLES REQUIRED

```
# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=

# Razorpay Plan IDs (pre-create in Razorpay dashboard)
RAZORPAY_PLAN_WEEKLY_200G_BP=
RAZORPAY_PLAN_WEEKLY_200G_RCF=
RAZORPAY_PLAN_WEEKLY_200G_ORG=
RAZORPAY_PLAN_WEEKLY_500G_BP=
RAZORPAY_PLAN_WEEKLY_500G_RCF=
RAZORPAY_PLAN_WEEKLY_500G_ORG=
RAZORPAY_PLAN_FORTNIGHTLY_200G_BP=
RAZORPAY_PLAN_FORTNIGHTLY_200G_RCF=
RAZORPAY_PLAN_FORTNIGHTLY_200G_ORG=
RAZORPAY_PLAN_FORTNIGHTLY_500G_BP=
RAZORPAY_PLAN_FORTNIGHTLY_500G_RCF=
RAZORPAY_PLAN_FORTNIGHTLY_500G_ORG=
RAZORPAY_PLAN_MONTHLY_500G_BP=
RAZORPAY_PLAN_MONTHLY_500G_RCF=
RAZORPAY_PLAN_MONTHLY_500G_ORG=

# Q-Commerce (insert when listings approved)
NEXT_PUBLIC_BLINKIT_URL=
NEXT_PUBLIC_ZEPTO_URL=
NEXT_PUBLIC_INSTAMART_URL=

# Analytics
NEXT_PUBLIC_GA4_MEASUREMENT_ID=
NEXT_PUBLIC_HOTJAR_ID=

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

# Waitlist Webhook (Google Sheets via n8n or Apps Script)
WAITLIST_WEBHOOK_URL=

# Email
RESEND_API_KEY=

# Klaviyo
KLAVIYO_API_KEY=
KLAVIYO_LIST_ID_WAITLIST=
KLAVIYO_LIST_ID_SUBSCRIBERS=
```

---

## APPENDIX: CRITICAL BLOCKERS BEFORE LAUNCH

The following must be resolved before the site can go live. Do not block build on these — use placeholders and mark clearly:

1. **FSSAI licence number** — required on every page footer and product descriptions
2. **NABL lab values** — protein/macro values for all 3 SKUs. All nutrition placeholders must be replaced.
3. **Blinkit, Zepto, Swiggy Instamart live product URLs** — required before driving any social traffic to the site
4. **Razorpay account verification** — required before subscription payments can go live
5. **Q-Com platform onboarding** — must be approved on each platform
6. **Professional product photography** — all 3 SKUs, lifestyle shots, ingredient flat-lays
7. **Sandeep [full surname]** — required for team page
8. **Registered company address** — required for footer legal section
9. **Privacy Policy, Terms of Use, Refund Policy** — legal text to be supplied by client
10. **Google Maps API key** — restricted to panevo.in domain in Google Cloud Console
