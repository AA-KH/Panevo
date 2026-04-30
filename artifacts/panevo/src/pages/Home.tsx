import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { Shatkona } from "@/components/sections/Shatkona";
import { QCOM_LINKS } from "@/config/brand";
import { products } from "@/data/products";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle, Clock, Flame } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { useCountUp } from "@/hooks/useCountUp";

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const { ref: proteinRef, value: proteinCount } = useCountUp(18, 800);

  return (
    <div className="w-full">
      <SEO
        title="PANEVO — India's First Pre-Flavoured Fresh Paneer | Order on Blinkit, Zepto"
        description="Open the pack. Cook in under 10 minutes. No marination. No prep. PANEVO is India's first pre-flavoured fresh paneer — order on Blinkit, Zepto and Swiggy Instamart."
      />

      {/* HERO — stagger sequence per spec §8.1 */}
      <section className="relative min-h-[100dvh] bg-foreground text-background flex flex-col justify-center pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-foreground/70 via-foreground/80 to-foreground/95 mix-blend-multiply"></div>
        {/* Placeholder for lifestyle photo — warm-toned tawa shot */}
        <div className="absolute inset-0 z-[-1] bg-[url('https://images.unsplash.com/photo-1631452180519-c014fe946bc0?q=80&w=2000')] bg-cover bg-center opacity-40 grayscale sepia mix-blend-overlay"></div>
        {/* Terracotta accent gradient at bottom-left per spec §9.1 */}
        <div className="absolute bottom-0 left-0 w-2/3 h-1/2 bg-gradient-to-tr from-primary/30 via-primary/10 to-transparent pointer-events-none" />

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
            {products.map((product, i) => (
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
                  <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-secondary/15 via-primary/10 to-accent/20">
                    <div className="absolute inset-0 group-hover:scale-[1.04] transition-transform duration-500 flex flex-col items-center justify-center gap-3">
                      <Shatkona className="w-16 h-16 text-primary/40" />
                      <span className="text-foreground/60 font-bold uppercase tracking-widest text-sm" style={{ fontFamily: "var(--app-font-display)" }}>{product.name}</span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-2xl mb-2 text-foreground">{product.name}</h3>
                    <p className="text-muted-foreground mb-6 flex-1">{product.tagline}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                      <span className="text-sm font-bold text-foreground tabnums">200g ₹125 · 500g ₹275</span>
                      <span className="text-primary font-bold text-sm flex items-center gap-1 cta-primary">
                        View <ArrowRight className="w-4 h-4 cta-arrow" />
                      </span>
                    </div>
                  </div>
                </Link>
                </li>
              </Reveal>
            ))}
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

      {/* SOCIAL PROOF */}
      <section className="bg-background py-20 border-t border-border">
        <div className="container px-4">
          <Reveal>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl mb-8 text-foreground">What People Are Saying</h2>
              <p className="text-2xl md:text-3xl text-primary italic leading-tight" style={{ fontFamily: "var(--app-font-display)", letterSpacing: "0.01em" }}>
                "76% of first-time tasters committed to buying weekly or daily."
              </p>
              <p className="text-sm text-muted-foreground mt-4 uppercase tracking-wider">Source: Sampling Event, Chitkara University</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { text: "Made paneer tikka in 8 minutes flat. The black pepper flavour is spot on — tasted like it had been marinating for hours.", author: "Priya S.", loc: "Chandigarh" },
              { text: "Finally a paneer that saves time without compromising on taste. My kids love the oregano one.", author: "Rahul M.", loc: "Gurgaon" },
              { text: "I use it for my meal prep every Sunday. 500g block, done in one go. Consistent every single time.", author: "Sneha T.", loc: "Mohali" }
            ].map((testimonial, i) => (
              <Reveal key={i} delay={i * 80}>
                <div
                  className="card-lift bg-card p-8 border border-border relative h-full"
                  style={{ borderRadius: 12, boxShadow: "var(--shadow-rest)" }}
                >
                  <div className="text-5xl text-primary/20 absolute top-4 left-6 font-serif leading-none">"</div>
                  <p className="text-foreground relative z-10 font-medium leading-relaxed mb-6 pt-4">
                    {testimonial.text}
                  </p>
                  <div className="mt-auto">
                    <p className="font-bold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.loc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SUBSCRIPTION TEASER */}
      <section className="bg-background py-20 border-t border-border/50">
        <div className="container px-4 max-w-4xl text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl mb-6 text-foreground">Your Weekly Paneer Box. Sorted.</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg text-muted-foreground mb-12">Pick your flavours. Choose your frequency. Delivered fresh, on schedule, every week. Cancel any time — no questions, no fuss.</p>
          </Reveal>

          <Reveal delay={160}>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <div className="bg-card border-2 border-primary px-6 py-3 font-bold text-foreground flex items-center justify-center gap-2 relative overflow-hidden notch-br" style={{ borderRadius: 4 }}>
                <div className="absolute top-0 right-0 w-8 h-8 bg-accent rotate-45 translate-x-4 -translate-y-4"></div>
                Weekly
              </div>
              <div className="bg-card border border-border px-6 py-3 font-medium text-muted-foreground" style={{ borderRadius: 4 }}>Fortnightly</div>
              <div className="bg-card border border-border px-6 py-3 font-medium text-muted-foreground" style={{ borderRadius: 4 }}>Monthly</div>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <Link href="/subscribe" className="cta-primary bg-secondary text-secondary-foreground px-8 py-4 rounded-full font-bold text-lg inline-flex items-center gap-2 notch-br">
              Start Your Weekly Box <ArrowRight className="w-5 h-5 cta-arrow" />
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
