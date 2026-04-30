import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { Shatkona } from "@/components/sections/Shatkona";
import { QCOM_LINKS } from "@/config/brand";
import { products } from "@/data/products";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ArrowRight, CheckCircle, Clock, Flame } from "lucide-react";

export default function Home() {
  const [proteinCount, setProteinCount] = useState(0);
  const proteinRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (shouldReduceMotion) {
            setProteinCount(18);
          } else {
            let start = 0;
            const end = 18;
            const duration = 800;
            const increment = end / (duration / 16);
            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                setProteinCount(end);
                clearInterval(timer);
              } else {
                setProteinCount(Math.floor(start));
              }
            }, 16);
          }
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (proteinRef.current) observer.observe(proteinRef.current);
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  return (
    <div className="w-full">
      <SEO
        title="India's First Pre-Flavoured Fresh Paneer"
        description="Open the pack. Cook in under 10 minutes. No marination. No prep. PANEVO is India's first pre-flavoured fresh paneer brand."
      />

      {/* HERO */}
      <section className="relative min-h-[100dvh] bg-foreground text-background flex flex-col justify-center pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-foreground/80 to-foreground/90 mix-blend-multiply"></div>
        {/* Placeholder for lifestyle photo */}
        <div className="absolute inset-0 z-[-1] bg-[url('https://images.unsplash.com/photo-1631452180519-c014fe946bc0?q=80&w=2000')] bg-cover bg-center opacity-40 grayscale sepia mix-blend-overlay"></div>

        <div className="container relative z-10 px-4 flex flex-col items-center text-center">
          <motion.div
             initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.45 }}
             className="mb-6 bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 notch-br"
          >
            <span>✦</span> India's First Pre-Flavoured Paneer
          </motion.div>

          <motion.h1
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            className="text-6xl md:text-8xl font-bold mb-4 max-w-4xl"
          >
            No Marination. No Prep. Just Paneer.
          </motion.h1>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-xl md:text-2xl text-muted/80 mb-10 max-w-2xl"
          >
            Bold. Ready. India's first pre-flavoured fresh paneer.
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/products" className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg notch-br hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              Order Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/products" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-white">
              See Our Flavours
            </Link>
          </motion.div>

          <motion.div
             initial={shouldReduceMotion ? { opacity: 0.5, scale: 1 } : { opacity: 0, scale: 0.8 }}
             animate={{ opacity: 0.5, scale: 1 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="mt-16"
          >
            <Shatkona className="w-24 h-24" />
          </motion.div>
        </div>
      </section>

      {/* Q-COMMERCE STRIP (Hidden on mobile) */}
      <section className="hidden md:block bg-primary text-primary-foreground py-6">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold uppercase tracking-wide">In Your Kitchen in 10 Minutes.</h2>
              <p className="text-sm opacity-90 mt-1">Available now in Chandigarh Tri-City and Gurgaon</p>
            </div>
            <div className="flex gap-12">
              {Object.entries(QCOM_LINKS).map(([platform, url]) => (
                <div key={platform} className="flex flex-col items-center gap-2">
                  <div className="h-8 w-24 bg-white/20 rounded flex items-center justify-center text-xs font-bold">{platform} LOGO</div>
                  <a href={url} className="text-sm font-medium hover:underline flex items-center gap-1">Order Now <ArrowRight className="w-3 h-3" /></a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="bg-secondary text-secondary-foreground py-20">
        <div className="container px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Why PANEVO Exists</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <Clock className="w-12 h-12 mb-6 text-primary" />
              <h3 className="text-xl font-bold mb-4">No More Marinating</h3>
              <p className="opacity-90 leading-relaxed">Every paneer recipe used to start the same way — marination, seasoning, waiting. We removed 30 minutes from your kitchen routine.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <CheckCircle className="w-12 h-12 mb-6 text-primary" />
              <h3 className="text-xl font-bold mb-4">Consistent, Every Time</h3>
              <p className="opacity-90 leading-relaxed">Same texture. Same flavour. Same result — whether it's a Tuesday dinner or a weekend gathering.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Flame className="w-12 h-12 mb-6 text-primary" />
              <h3 className="text-xl font-bold mb-4">Bold Flavour, Built In</h3>
              <p className="opacity-90 leading-relaxed">Black Pepper. Red Chilli Flakes. Oregano. Crafted into the paneer itself, not added on top.</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON STRIP */}
      <section className="bg-background py-20">
        <div className="container px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">The Difference Is Built In.</h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
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
        </div>
      </section>

      {/* PRODUCT SHOWCASE */}
      <section className="bg-background py-20 border-t border-border/50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Pick Your Flavour. Cook in Minutes.</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Three bold flavours. Two sizes — 200g for weeknights, 500g for the whole family.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link key={product.id} href={`/products#${product.id}`} className="group bg-card rounded-xl border border-border overflow-hidden hover:-translate-y-1.5 hover:shadow-md transition-all duration-250 flex flex-col">
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-secondary/10 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                    <span className="text-muted-foreground font-bold uppercase tracking-widest">{product.name} MOCKUP</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold mb-2 uppercase text-foreground">{product.name}</h3>
                  <p className="text-muted-foreground mb-6 flex-1">{product.tagline}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                    <span className="text-sm font-bold text-foreground">200g ₹125 · 500g ₹275</span>
                    <span className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">View <ArrowRight className="w-4 h-4" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROTEIN MOMENT */}
      <section className="bg-card text-card-foreground py-24" ref={proteinRef}>
        <div className="container px-4 text-center">
          <div className="text-8xl md:text-[12rem] font-bold text-primary leading-none mb-4 tracking-tighter" style={{ fontVariantNumeric: 'tabular-nums' }}>
            ~{proteinCount}g
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase">Protein per 100g.</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-xl mx-auto">More than most. Clean, real, fresh.</p>

          <div className="flex flex-nowrap md:flex-wrap overflow-x-auto pb-4 md:pb-0 justify-start md:justify-center gap-4 mb-12 snap-x">
            {['18g Protein', '~260 kcal', 'Zero Preservatives', 'No Artificial Additives'].map((stat) => (
              <div key={stat} className="snap-center shrink-0 bg-muted px-6 py-3 rounded-full text-sm font-bold text-foreground whitespace-nowrap">
                {stat}
              </div>
            ))}
          </div>

          <Link href="/nutrition" className="inline-flex items-center gap-2 text-primary font-bold hover:underline text-lg">
            See Full Nutrition <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-background py-20 border-t border-border">
        <div className="container px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-foreground">What People Are Saying</h2>
            <p className="text-2xl md:text-3xl font-bold text-primary italic leading-tight">
              "76% of first-time tasters committed to buying weekly or daily."
            </p>
            <p className="text-sm text-muted-foreground mt-4 uppercase tracking-wider">Source: Sampling Event, Chitkara University</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                text: "Made paneer tikka in 8 minutes flat. The black pepper flavour is spot on — tasted like it had been marinating for hours.",
                author: "Priya S.",
                loc: "Chandigarh"
              },
              {
                text: "Finally a paneer that saves time without compromising on taste. My kids love the oregano one.",
                author: "Rahul M.",
                loc: "Gurgaon"
              },
              {
                text: "I use it for my meal prep every Sunday. 500g block, done in one go. Consistent every single time.",
                author: "Sneha T.",
                loc: "Mohali"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-card p-8 rounded-xl border border-border relative">
                <div className="text-4xl text-primary/20 absolute top-4 left-6 font-serif">"</div>
                <p className="text-foreground relative z-10 font-medium leading-relaxed mb-6">
                  {testimonial.text}
                </p>
                <div className="mt-auto">
                  <p className="font-bold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.loc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBSCRIPTION TEASER */}
      <section className="bg-background py-20 border-t border-border/50">
        <div className="container px-4 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Your Weekly Paneer Box. Sorted.</h2>
          <p className="text-lg text-muted-foreground mb-12">Pick your flavours. Choose your frequency. Delivered fresh, on schedule, every week. Cancel any time — no questions, no fuss.</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <div className="bg-card border border-primary px-6 py-3 rounded-md font-bold text-foreground flex items-center justify-center gap-2 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-8 h-8 bg-accent rotate-45 translate-x-4 -translate-y-4"></div>
               Weekly
            </div>
            <div className="bg-card border border-border px-6 py-3 rounded-md font-medium text-muted-foreground">Fortnightly</div>
            <div className="bg-card border border-border px-6 py-3 rounded-md font-medium text-muted-foreground">Monthly</div>
          </div>

          <Link href="/subscribe" className="bg-secondary text-secondary-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-secondary/90 transition-colors inline-flex items-center gap-2 notch-br">
            Start Your Weekly Box <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* BRAND SIGNATURE */}
      <section className="bg-foreground text-background py-32 text-center flex flex-col items-center">
        <div className="container px-4">
          <Shatkona className="w-32 h-32 mx-auto mb-12 text-primary opacity-90" />
          <h2 className="text-2xl md:text-4xl font-medium tracking-wide uppercase max-w-3xl mx-auto leading-relaxed mb-12">
            Raw + Ready.<br />
            Ancient + Modern.<br />
            India's Protein. Evolved.
          </h2>
          <Link href="/our-story" className="inline-flex items-center gap-2 text-background font-bold border-b-2 border-primary pb-1 hover:text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary rounded p-1">
            Our Story <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* PAGE-CLOSING CTA BANNER */}
      <section className="bg-secondary text-secondary-foreground py-20 text-center">
        <div className="container px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Cook Differently?</h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">Find PANEVO at your nearest store or order for delivery in minutes.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/find-us" className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2 notch-br outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary">
              Find Near You <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/products" className="bg-transparent border-2 border-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-white">
              Explore All Flavours
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
