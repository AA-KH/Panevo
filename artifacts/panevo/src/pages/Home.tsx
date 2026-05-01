import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { Shatkona } from "@/components/sections/Shatkona";
import { QCOM_LINKS } from "@/config/brand";
import { products } from "@/data/products";
import { faqs } from "@/data/faqs";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle, Clock, Flame, Check } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { useCountUp } from "@/hooks/useCountUp";
import { useState } from "react";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { PincodeChecker } from "@/components/sections/PincodeChecker";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HOME_TESTIMONIALS = [
  {
    text: "Made paneer tikka in 8 minutes flat. The black pepper flavour is spot on — tasted like it had been marinating for hours.",
    author: "Priya S.",
    loc: "Chandigarh",
    flavour: "Black Pepper",
  },
  {
    text: "Finally a paneer that saves time without compromising on taste. My kids love the oregano one — it's now in our weekly box.",
    author: "Rahul M.",
    loc: "Gurgaon",
    flavour: "Oregano",
  },
  {
    text: "I use it for my meal prep every Sunday. 500g block, done in one go. Consistent every single time.",
    author: "Sneha T.",
    loc: "Mohali",
    flavour: "Red Chilli Flakes",
  },
  {
    text: "Hits 30g of protein per meal without the effort. The texture holds up beautifully in the air-fryer.",
    author: "Arjun K.",
    loc: "Chandigarh",
    flavour: "Black Pepper",
  },
  {
    text: "Honestly, I haven't bought regular paneer in two months. Why would I? This is just better.",
    author: "Meera B.",
    loc: "Panchkula",
    flavour: "Oregano",
  },
];

const HOME_FAQS = [
  faqs.products[0],
  faqs.subscription[1],
  faqs.products[2],
  faqs.nutrition[4],
  faqs.findUs[1],
];

type Frequency = "weekly" | "fortnightly" | "monthly";

const FREQUENCY_COPY: Record<Frequency, { label: string; copy: string; cta: string }> = {
  weekly: {
    label: "Weekly",
    copy: "Pick your flavours. Delivered fresh, on schedule, every week. Cancel any time — no questions, no fuss.",
    cta: "Start Your Weekly Box",
  },
  fortnightly: {
    label: "Fortnightly",
    copy: "Pick your flavours. Delivered fresh every two weeks — perfect for couples and small households. Cancel any time.",
    cta: "Start Your Fortnightly Box",
  },
  monthly: {
    label: "Monthly",
    copy: "Pick your flavours. A monthly top-up of your favourites, delivered fresh on the same day each month. Cancel any time.",
    cta: "Start Your Monthly Box",
  },
};

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const { ref: proteinRef, value: proteinCount } = useCountUp(18, 800);
  const [frequency, setFrequency] = useState<Frequency>("weekly");

  return (
    <div className="w-full">
      <SEO
        title="PANEVO — India's First Pre-Flavoured Fresh Paneer | Order on Blinkit, Zepto"
        description="Open the pack. Cook in under 10 minutes. No marination. No prep. PANEVO is India's first pre-flavoured fresh paneer — order on Blinkit, Zepto and Swiggy Instamart."
      />

      {/* HERO — stagger sequence per spec §8.1 */}
      <section className="relative min-h-[100dvh] bg-foreground text-background flex flex-col justify-center pt-16 overflow-hidden">
        {/* Lifestyle photo background (warm-toned tawa shot) */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1631452180519-c014fe946bc0?q=80&w=2000')",
          }}
          aria-hidden="true"
        />
        {/* Dark vignette so text always reads */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, hsl(var(--near-black) / 0.78) 0%, hsl(var(--near-black) / 0.72) 45%, hsl(var(--near-black) / 0.92) 100%)",
          }}
          aria-hidden="true"
        />
        {/* Terracotta radial glow — soft fade from bottom-left per spec §9.1 */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 18% 100%, hsl(var(--primary) / 0.55) 0%, hsl(var(--primary) / 0.18) 35%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        {/* Subtle saffron highlight from top-right for depth */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 90% 0%, hsl(var(--accent) / 0.18) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />

        <div className="container relative z-10 px-4 flex flex-col items-center text-center">
          {/* 1. Shatkona symbol — 0ms */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0.85, y: 0 } : { opacity: 0, y: 4 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ duration: 0.4, delay: 0, ease: "easeOut" }}
            className="mb-6"
          >
            <Shatkona className="w-10 h-10 text-white" />
          </motion.div>

          {/* 2. Hero headline — 200ms */}
          <motion.h1
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="text-4xl sm:text-6xl md:text-8xl mb-6 max-w-4xl"
            style={{ letterSpacing: "0.02em" }}
          >
            No Marination. No Prep. Just Paneer.
          </motion.h1>

          {/* 3. Sub-headline — 450ms */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ duration: 0.35, delay: 0.45, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl text-white mb-10 max-w-2xl px-2"
          >
            Bold. Ready. India's first pre-flavoured fresh paneer.
          </motion.p>

          {/* 4. CTAs — 550ms */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.55, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/products"
              className="cta-primary bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg notch-br flex items-center justify-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Order Now <ArrowRight className="w-5 h-5 cta-arrow" />
            </Link>
            <Link
              href="/products"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              See Our Flavours
            </Link>
          </motion.div>

          {/* 5. Saffron Gold badge — 650ms */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.65, ease: "easeOut" }}
            className="mt-10 bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2"
          >
            <span>✦</span> India's First Pre-Flavoured Paneer
          </motion.div>
        </div>
      </section>

      {/* TRUST STRIP — runs across desktop & mobile */}
      <TrustStrip />

      {/* Q-COMMERCE STRIP (Hidden on mobile — sticky bottom bar covers mobile) */}
      <section className="hidden md:block bg-primary text-primary-foreground py-6">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl">In Your Kitchen in 10 Minutes.</h2>
              <p className="text-sm opacity-90 mt-1">Available now in Chandigarh Tri-City and Gurgaon</p>
            </div>
            <div className="flex gap-8">
              {Object.entries(QCOM_LINKS).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="qcom-shimmer flex items-center gap-3 px-4 py-2 bg-white/10 border border-white/20"
                  style={{ borderRadius: 4 }}
                >
                  <span className="text-xs font-bold capitalize text-white">{platform}</span>
                  <span className="text-sm font-medium flex items-center gap-1">Order Now <ArrowRight className="w-3 h-3" /></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION (Forest Green full-bleed) */}
      <section className="bg-secondary text-secondary-foreground py-20">
        <div className="container px-4">
          <Reveal>
            <h2 className="text-4xl md:text-5xl mb-16 text-center">Why PANEVO Exists</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Reveal delay={0}>
              <div className="flex flex-col items-center text-center">
                <Clock className="w-8 h-8 mb-6 text-primary" strokeWidth={1.5} />
                <h3 className="text-xl mb-4">No More Marinating</h3>
                <p className="opacity-90 leading-relaxed">Every paneer recipe used to start the same way — marination, seasoning, waiting. We removed 30 minutes from your kitchen routine.</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="flex flex-col items-center text-center">
                <CheckCircle className="w-8 h-8 mb-6 text-primary" strokeWidth={1.5} />
                <h3 className="text-xl mb-4">Consistent, Every Time</h3>
                <p className="opacity-90 leading-relaxed">Same texture. Same flavour. Same result — whether it's a Tuesday dinner or a weekend gathering.</p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="flex flex-col items-center text-center">
                <Flame className="w-8 h-8 mb-6 text-primary" strokeWidth={1.5} />
                <h3 className="text-xl mb-4">Bold Flavour, Built In</h3>
                <p className="opacity-90 leading-relaxed">Black Pepper. Red Chilli Flakes. Oregano. Crafted into the paneer itself, not added on top.</p>
              </div>
            </Reveal>
          </div>
          {/* Saffron Gold divider per spec §9.1 */}
          <Reveal delay={240}>
            <div className="mt-16 mx-auto h-px w-2/5 bg-accent/60" />
          </Reveal>
        </div>
      </section>

      {/* COMPARISON STRIP */}
      <section className="bg-background py-20">
        <div className="container px-4 max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl mb-12 text-center text-foreground">The Difference Is Built In.</h2>
          </Reveal>
          <Reveal>
          <div className="bg-card border border-border overflow-hidden" style={{ borderRadius: 12, boxShadow: "var(--shadow-rest)" }}>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="p-4 md:p-6 font-bold text-muted-foreground w-1/3"></th>
                  <th className="p-4 md:p-6 font-bold text-foreground text-lg w-1/3">Plain Paneer</th>
                  <th className="p-4 md:p-6 font-bold text-primary text-lg w-1/3">PANEVO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm md:text-base">
                <tr>
                  <td className="p-4 md:p-6 font-medium text-foreground">Prep Time</td>
                  <td className="p-4 md:p-6 text-muted-foreground">30+ min marination</td>
                  <td className="p-4 md:p-6 text-foreground font-medium">Zero. Open the pack and cook.</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 font-medium text-foreground">Flavour</td>
                  <td className="p-4 md:p-6 text-muted-foreground">Depends on your marinade — inconsistent</td>
                  <td className="p-4 md:p-6 text-foreground font-medium">Infused into every block. Same result every time.</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 font-medium text-foreground">Result</td>
                  <td className="p-4 md:p-6 text-muted-foreground">Variable — some days great, some days flat</td>
                  <td className="p-4 md:p-6 text-foreground font-medium">Consistent, restaurant-quality, every pack.</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 font-medium text-foreground">Protein</td>
                  <td className="p-4 md:p-6 text-muted-foreground">Same fresh dairy nutrition</td>
                  <td className="p-4 md:p-6 text-foreground font-medium">Same fresh dairy nutrition — nothing removed or added.</td>
                </tr>
              </tbody>
            </table>
          </div>
          </Reveal>
        </div>
      </section>

      {/* PRODUCT SHOWCASE */}
      <section className="bg-background py-20 border-t border-border/50">
        <div className="container px-4">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-4 text-foreground">Pick Your Flavour. Cook in Minutes.</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Three bold flavours. Two sizes — 200g for weeknights, 500g for the whole family.</p>
            </div>
          </Reveal>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 list-none p-0">
            {products.map((product, i) => {
              const flavourGrad = [
                "from-slate-900/30 via-slate-700/15 to-slate-500/10",
                "from-red-800/30 via-red-600/15 to-orange-500/10",
                "from-green-900/30 via-green-700/15 to-emerald-500/10",
              ][i] ?? "from-secondary/15 via-primary/10 to-accent/20";
              const flavourDot = ["bg-slate-700", "bg-red-600", "bg-green-700"][i] ?? "bg-primary";
              return (
              <Reveal key={product.id} delay={i * 80}>
                <li className="h-full">
                <Link
                  href={`/products#${product.id}`}
                  className="card-lift group bg-card border border-border overflow-hidden flex flex-col h-full relative"
                  style={{ borderRadius: 12, boxShadow: "var(--shadow-rest)" }}
                >
                  {i === 0 && (
                    <span
                      className="absolute top-3 left-3 z-10 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                      aria-label="India's First Pre-Flavoured Paneer"
                    >
                      <span aria-hidden="true">✦</span> India's First
                    </span>
                  )}
                  <div className={`aspect-[4/3] relative overflow-hidden bg-gradient-to-br ${flavourGrad}`}>
                    <div className="absolute inset-0 group-hover:scale-[1.04] transition-transform duration-500 flex flex-col items-center justify-center gap-3">
                      <Shatkona className="w-16 h-16 text-primary/40" />
                      <span className="text-foreground/60 font-bold uppercase tracking-widest text-sm" style={{ fontFamily: "var(--app-font-display)" }}>{product.name}</span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${flavourDot}`} aria-hidden="true" />
                      <h3 className="text-2xl text-foreground">{product.name}</h3>
                    </div>
                    <p className="text-muted-foreground mb-6 flex-1">{product.tagline}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                      <span className="text-sm font-bold text-foreground tabnums">200g · 500g</span>
                      <span className="text-primary font-bold text-sm flex items-center gap-1 cta-primary">
                        View <ArrowRight className="w-4 h-4 cta-arrow" />
                      </span>
                    </div>
                  </div>
                </Link>
                </li>
              </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* PROTEIN MOMENT */}
      <section className="bg-card text-card-foreground py-24">
        <div className="container px-4 text-center">
          <div
            ref={proteinRef as any}
            className="text-8xl md:text-[12rem] text-primary leading-none mb-4 tracking-tighter tabnums"
            style={{ fontFamily: "var(--app-font-display)" }}
          >
            ~{proteinCount}g
          </div>
          <Reveal>
            <h2 className="text-3xl md:text-5xl mb-4">Protein per 100g.</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-xl text-muted-foreground mb-12 max-w-xl mx-auto">More than most. Clean, real, fresh.</p>
          </Reveal>

          <Reveal delay={160}>
            <div className="flex flex-nowrap md:flex-wrap overflow-x-auto pb-4 md:pb-0 justify-start md:justify-center gap-4 mb-12 snap-x">
              {['18g Protein', '~260 kcal', 'Zero Preservatives', 'No Artificial Additives'].map((stat) => (
                <div key={stat} className="snap-center shrink-0 bg-muted px-6 py-3 rounded-full text-sm font-bold text-foreground whitespace-nowrap">
                  {stat}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={240}>
            <Link href="/nutrition" className="cta-primary inline-flex items-center gap-2 text-primary font-bold text-lg">
              See Full Nutrition <ArrowRight className="w-5 h-5 cta-arrow" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* SOCIAL PROOF — autoplay carousel */}
      <section className="bg-background py-20 border-t border-border">
        <div className="container px-4">
          <Reveal>
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h2 className="text-4xl mb-6 text-foreground">What People Are Saying</h2>
              <p className="text-xl md:text-2xl text-primary italic leading-tight" style={{ fontFamily: "var(--app-font-display)", letterSpacing: "0.01em" }}>
                "76% of first-time tasters committed to buying weekly or daily."
              </p>
              <p className="text-xs text-muted-foreground mt-3 uppercase tracking-wider">Source: Sampling Event, Chitkara University</p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <TestimonialsCarousel testimonials={HOME_TESTIMONIALS} />
          </Reveal>
        </div>
      </section>

      {/* DELIVERY CHECKER — interactive conversion driver */}
      <section className="bg-background py-20 border-t border-border/50">
        <div className="container px-4 max-w-3xl">
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl mb-3 text-foreground">Find PANEVO Near You</h2>
              <p className="text-lg text-muted-foreground">Two taps. Real-time delivery check.</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <PincodeChecker />
          </Reveal>
        </div>
      </section>

      {/* SUBSCRIPTION TEASER */}
      <section className="bg-background py-20 border-t border-border/50">
        <div className="container px-4 max-w-4xl text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl mb-6 text-foreground">
              Your{" "}
              <span className="text-primary transition-colors">
                {FREQUENCY_COPY[frequency].label}
              </span>{" "}
              Paneer Box. Sorted.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg text-muted-foreground mb-12 transition-opacity">
              {FREQUENCY_COPY[frequency].copy}
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div
              role="radiogroup"
              aria-label="Choose delivery frequency"
              className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
            >
              {(Object.keys(FREQUENCY_COPY) as Frequency[]).map((freq) => {
                const isActive = frequency === freq;
                return (
                  <button
                    key={freq}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    onClick={() => setFrequency(freq)}
                    className={`relative overflow-hidden px-6 py-3 font-bold transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                      isActive
                        ? "bg-card border-2 border-primary text-foreground notch-br shadow-[var(--shadow-rest)]"
                        : "bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                    style={{ borderRadius: 4 }}
                  >
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute top-0 right-0 w-8 h-8 bg-accent rotate-45 translate-x-4 -translate-y-4"
                      />
                    )}
                    <span className="inline-flex items-center gap-2">
                      {isActive && <Check className="w-4 h-4 text-primary" strokeWidth={3} />}
                      {FREQUENCY_COPY[freq].label}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={240}>
            <Link
              href={`/subscribe?frequency=${frequency}`}
              className="cta-primary bg-secondary text-secondary-foreground px-8 py-4 rounded-full font-bold text-lg inline-flex items-center gap-2 notch-br"
            >
              {FREQUENCY_COPY[frequency].cta} <ArrowRight className="w-5 h-5 cta-arrow" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* BRAND SIGNATURE */}
      <section className="bg-foreground text-background py-32 text-center flex flex-col items-center">
        <div className="container px-4">
          <Reveal>
            <Shatkona className="w-32 h-32 mx-auto mb-12 text-primary opacity-90" />
          </Reveal>
          <Reveal delay={120}>
            <h2 className="text-2xl md:text-4xl max-w-3xl mx-auto leading-relaxed mb-12" style={{ letterSpacing: "0.04em" }}>
              Raw + Ready.<br />
              Ancient + Modern.<br />
              India's Protein. Evolved.
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <Link href="/our-story" className="cta-primary inline-flex items-center gap-2 text-background font-bold border-b-2 border-primary pb-1 hover:text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary rounded p-1">
              Our Story <ArrowRight className="w-4 h-4 cta-arrow" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FAQ — answers the top 5 objections to subtly drive conversion */}
      <section className="bg-background py-20 border-t border-border/50">
        <div className="container px-4 max-w-3xl">
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl mb-3 text-foreground">Quick Questions, Real Answers.</h2>
              <p className="text-muted-foreground">
                Everything you'd ask before opening the pack.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Accordion type="single" collapsible className="bg-card border border-border divide-y divide-border" style={{ borderRadius: 12, boxShadow: "var(--shadow-rest)" }}>
              {HOME_FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-b-0 px-5">
                  <AccordionTrigger className="text-left text-base md:text-lg font-bold text-foreground py-5 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-5 pr-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
          <Reveal delay={200}>
            <div className="text-center mt-8">
              <Link
                href="/contact"
                className="cta-primary inline-flex items-center gap-2 text-primary font-bold text-sm"
              >
                Still curious? Chat with us <ArrowRight className="w-4 h-4 cta-arrow" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PAGE-CLOSING CTA BANNER */}
      <section className="bg-secondary text-secondary-foreground py-20 text-center">
        <div className="container px-4">
          <Reveal>
            <h2 className="text-4xl md:text-5xl mb-6">Ready to Cook Differently?</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">Find PANEVO at your nearest store or order for delivery in minutes.</p>
          </Reveal>
          <Reveal delay={160}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/find-us" className="cta-primary bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg inline-flex items-center justify-center gap-2 notch-br outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary">
                Find Near You <ArrowRight className="w-5 h-5 cta-arrow" />
              </Link>
              <Link href="/products" className="bg-transparent border-2 border-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-white">
                Explore All Flavours
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
