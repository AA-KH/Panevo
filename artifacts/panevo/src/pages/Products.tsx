import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { products } from "@/data/products";
import { QCOM_LINKS } from "@/config/platforms";
import { useState, useEffect } from "react";
import { ArrowRight, X, Printer } from "lucide-react";
import { track } from "@/lib/analytics";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";
import { Reveal } from "@/components/motion/Reveal";
import { Shatkona } from "@/components/sections/Shatkona";
import { motion, AnimatePresence } from "framer-motion";

const VegSymbol = () => (
  <div className="flex items-center gap-1.5 border border-green-600/30 px-2 py-0.5 rounded bg-green-50/50 w-fit shadow-sm">
    <div className="w-2.5 h-2.5 border border-green-600 flex items-center justify-center p-0.5 bg-white">
      <div className="w-full h-full bg-green-600 rounded-full" />
    </div>
    <span className="text-[10px] font-bold text-green-700 uppercase tracking-tighter">100% Veg</span>
  </div>
);

const TICKER_SLIDES: {
  label: string;
  lines: string[];
  sub: string;
  chips?: string[];
  color: string;
  rgba: string;
}[] = [
  {
    label: "Our Flavours",
    lines: ["Three Flavours.", "One Rule.", "Zero Marination."],
    sub: "Pick your PANEVO. Cook it in under 10 minutes. Eat better every day.",
    color: "#F97316",
    rgba: "249, 115, 22",
  },
  {
    label: "Nutrition First",
    lines: ["The Protein You've", "Been Underestimating."],
    sub: "Paneer has always been India's best-kept protein secret. PANEVO makes it impossible to ignore.",
    color: "#16a34a",
    rgba: "22, 163, 74",
  },
  {
    label: "Clean Label",
    lines: ["If you can't pronounce it,", "it's not in PANEVO."],
    sub: "That's it. The whole ingredient list.",
    chips: ["Milk", "Salt", "Spice", "Citric Acid"],
    color: "#6366f1",
    rgba: "99, 102, 241",
  },
];

const NUTRITION_ROWS = [
  { label: "Energy (kcal)", value: "~260" },
  { label: "Protein (g)",   value: "~18",  highlight: true },
  { label: "Total Fat (g)", value: "~20" },
  { label: "Carbohydrates (g)", value: "~3" },
  { label: "Calcium (mg)",  value: "~480" },
  { label: "Sodium (mg)",   value: "~35" },
];

const FLAVOUR_INGREDIENTS: Record<string, string> = {
  oregano:           "Milk, Salt, Oregano, Citric Acid",
  "red-chilli-flakes": "Milk, Salt, Red Chilli Flakes, Citric Acid",
  "black-pepper":    "Milk, Salt, Black Pepper, Citric Acid",
};

const CLEAN_BADGES = ["No Artificial Flavours", "No Preservatives", "No Additives", "Vegetarian", "FSSAI Compliant"];

function NutritionModal({ productId, productName, onClose }: { productId: string; productName: string; onClose: () => void }) {
  const ingredients = FLAVOUR_INGREDIENTS[productId] ?? "Milk, Salt, Spices, Citric Acid";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <motion.div
        className="relative z-10 w-full sm:max-w-lg bg-background border border-border overflow-y-auto max-h-[92dvh] sm:max-h-[85dvh]"
        style={{ borderRadius: "12px 12px 0 0", borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border sticky top-0 bg-background z-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-0.5">Nutrition Facts</p>
            <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--app-font-display)" }}>
              PANEVO {productName}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              aria-label="Print"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              aria-label="Close"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-border transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Macro table */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Per 100g serving</p>
            <div className="border border-border overflow-hidden" style={{ borderRadius: 10 }}>
              <table className="w-full text-sm tabnums">
                <tbody className="divide-y divide-border">
                  {NUTRITION_ROWS.map((row) => (
                    <tr key={row.label} className={row.highlight ? "bg-primary/5" : ""}>
                      <td className={`px-4 py-3 font-medium ${row.highlight ? "text-primary font-bold" : "text-muted-foreground"}`}>
                        {row.label}
                      </td>
                      <td className={`px-4 py-3 text-right font-bold ${row.highlight ? "text-primary" : "text-foreground"}`}>
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-muted-foreground mt-2">
              Lab-tested at NABL-accredited facility. Values are approximate and may vary per batch.
            </p>
          </div>

          {/* Ingredients */}
          <div className="bg-muted rounded-xl p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Ingredients</p>
            <p className="text-base font-semibold text-foreground leading-snug">{ingredients}</p>
            <p className="text-xs text-muted-foreground mt-2 italic">That's it. The whole list.</p>
          </div>

          {/* Clean label badges */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Certifications</p>
            <div className="flex flex-wrap gap-2">
              {CLEAN_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 bg-card border border-border px-3 py-1.5 rounded-full text-xs font-bold text-foreground"
                >
                  <span className="text-primary">✓</span> {badge}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2 border-t border-border">
            <Link
              href="/products"
              onClick={onClose}
              className="cta-primary w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-bold text-center flex items-center justify-center gap-2 notch-br"
            >
              Order {productName} <ArrowRight className="w-4 h-4 cta-arrow" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Products() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [nutritionModal, setNutritionModal] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    track("product_view", {});
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setTickerIndex((i) => (i + 1) % TICKER_SLIDES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "phase2-flavour" })
      });
      if (!res.ok) throw new Error("Failed to join waitlist");
      track("waitlist_signup", { source: "phase2-flavour" });
      toast.success("Thanks for signing up!");
      setEmail("");
    } catch {
      toast.error("Failed to join waitlist. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQComClick = (platform: string) => {
    track("qcom_click", { platform, source_page: "/products", source_element: "product_card" });
  };

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://panevo.in" },
        { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://panevo.in/products" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.products.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
      }))
    },
    ...products.map(p => ({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": `PANEVO ${p.name}`,
      "image": "https://panevo.in/opengraph.jpg",
      "description": p.description,
      "brand": { "@type": "Brand", "name": "PANEVO" },
      "offers": [
        { "@type": "Offer", "priceCurrency": "INR", "price": "125", "availability": "https://schema.org/InStock", "itemCondition": "https://schema.org/NewCondition" },
        { "@type": "Offer", "priceCurrency": "INR", "price": "275", "availability": "https://schema.org/InStock", "itemCondition": "https://schema.org/NewCondition" }
      ]
    }))
  ];

  return (
    <div className="w-full">
      <SEO
        title="PANEVO Flavoured Paneer — Black Pepper, Red Chilli, Oregano | ₹125 for 200g"
        description="Three bold pre-flavoured paneer variants — Black Pepper, Red Chilli Flakes and Oregano — at ₹125 for 200g. Zero marination, ready to cook in minutes."
        structuredData={structuredData}
      />

      {/* NUTRITION MODAL */}
      <AnimatePresence>
        {nutritionModal && (
          <NutritionModal
            productId={nutritionModal.id}
            productName={nutritionModal.name}
            onClose={() => setNutritionModal(null)}
          />
        )}
      </AnimatePresence>

      {/* HERO — vibrant animated ticker */}
      <section
        className="relative bg-background text-foreground overflow-hidden"
        style={{ minHeight: "82vh" }}
      >
        {/* Animated background glow — shifts colour per slide */}
        <AnimatePresence>
          <motion.div
            key={`prod-glow-${tickerIndex}`}
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{
              background: `radial-gradient(ellipse 85% 60% at 50% -8%, rgba(${TICKER_SLIDES[tickerIndex].rgba}, 0.14), transparent 68%)`,
            }}
          />
        </AnimatePresence>

        <div
          className="container px-4 relative z-10 flex flex-col justify-center"
          style={{ minHeight: "82vh", paddingTop: "9rem", paddingBottom: "6rem" }}
        >
          {/* Coloured label pill */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`prod-label-${tickerIndex}`}
              className="mb-8"
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 18 }}
              transition={{ duration: 0.3 }}
            >
              <span
                className="inline-flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full"
                style={{
                  color: TICKER_SLIDES[tickerIndex].color,
                  backgroundColor: `rgba(${TICKER_SLIDES[tickerIndex].rgba}, 0.13)`,
                  border: `1.5px solid rgba(${TICKER_SLIDES[tickerIndex].rgba}, 0.4)`,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-current"
                  style={{ animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }}
                />
                {TICKER_SLIDES[tickerIndex].label}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Heading — fixed-height wrapper prevents layout shift */}
          <div className="relative h-[9.5rem] sm:h-[14rem] md:h-[19rem] lg:h-[23.5rem] mb-8">
            <AnimatePresence mode="wait">
              <motion.h1
                key={`prod-heading-${tickerIndex}`}
                className="absolute top-0 left-0 w-full max-w-5xl text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] text-foreground"
                style={{ lineHeight: 1.05 }}
                exit={{ opacity: 0, y: -24, transition: { duration: 0.22, ease: [0.7, 0, 1, 0.4] } }}
              >
                {TICKER_SLIDES[tickerIndex].lines.map((line, li) => {
                  const isLast = li === TICKER_SLIDES[tickerIndex].lines.length - 1;
                  return (
                    <div key={`${tickerIndex}-${li}`} className="overflow-hidden" style={{ lineHeight: 1.08 }}>
                      <motion.span
                        className="block"
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1], delay: li * 0.1 }}
                        style={isLast ? { color: TICKER_SLIDES[tickerIndex].color } : undefined}
                      >
                        {line}
                      </motion.span>
                    </div>
                  );
                })}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Sub text + ingredient chips — fixed min-height reserves space */}
          <div className="min-h-[7rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`prod-sub-${tickerIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <p className="text-xl sm:text-2xl text-muted-foreground max-w-xl leading-relaxed mb-5">
                  {TICKER_SLIDES[tickerIndex].sub}
                </p>
                {TICKER_SLIDES[tickerIndex].chips && (
                  <div className="flex flex-wrap gap-3">
                    {TICKER_SLIDES[tickerIndex].chips!.map((chip, ci) => (
                      <motion.span
                        key={chip}
                        initial={{ opacity: 0, scale: 0.82, y: 14 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.52 + ci * 0.08, duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-flex items-center px-6 py-3 text-lg font-bold rounded-2xl border-2"
                        style={{
                          borderColor: `rgba(${TICKER_SLIDES[tickerIndex].rgba}, 0.55)`,
                          color: TICKER_SLIDES[tickerIndex].color,
                          backgroundColor: `rgba(${TICKER_SLIDES[tickerIndex].rgba}, 0.09)`,
                          letterSpacing: "0.02em",
                        }}
                      >
                        {chip}
                      </motion.span>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Thin progress bar — no dots */}
          <div className="mt-14 w-56 h-[2px] bg-border rounded-full overflow-hidden">
            <motion.div
              key={`prod-progress-${tickerIndex}`}
              className="h-full rounded-full"
              style={{
                backgroundColor: TICKER_SLIDES[tickerIndex].color,
                transformOrigin: "left center",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 5, ease: "linear" }}
            />
          </div>
        </div>
      </section>

      {/* SHARED NUTRITION STRIP */}
      <section className="bg-secondary text-secondary-foreground py-6 md:py-8 border-y border-border/20">
        <div className="container px-4">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-center font-bold uppercase tracking-wider text-sm">
            <span>✓ No Preservatives</span>
            <span>✓ No Artificial Colours</span>
            <span>✓ No Artificial Flavours</span>
            <span>✓ High Protein</span>
            <span>✓ Source of Calcium</span>
          </div>
        </div>
      </section>

      {/* PRODUCT DETAIL SECTIONS */}
      {products.map((product, index) => (
        <section
          key={product.id}
          id={product.id}
          className={`py-24 ${index % 2 === 0 ? "bg-background" : "bg-muted"}`}
        >
          <div className="container px-4">
            <div className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 0 ? "" : "md:flex-row-reverse"}`}>
              <Reveal className="w-full md:w-1/2">
                <div
                  className="aspect-square border border-border flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-secondary/15 via-primary/10 to-accent/25"
                  style={{ borderRadius: 12, boxShadow: "var(--shadow-rest)" }}
                >
                  <div className="absolute top-4 left-4 z-20">
                    <VegSymbol />
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <Shatkona className="w-20 h-20 md:w-24 md:h-24 text-primary/50" />
                    <span className="font-bold text-2xl md:text-3xl uppercase text-foreground/70 tracking-widest" style={{ fontFamily: "var(--app-font-display)" }}>
                      {product.name}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">Fresh Paneer · 200g / 500g</span>
                  </div>
                </div>
              </Reveal>

              <div className="w-full md:w-1/2">
                <Reveal>
                  <h2 className="text-4xl md:text-5xl mb-2 text-foreground">{product.name}</h2>
                </Reveal>
                <Reveal delay={80}>
                  <p className="text-xl text-primary mb-6 italic" style={{ fontFamily: "var(--app-font-display)", letterSpacing: "0.01em" }}>
                    "{product.tagline}"
                  </p>
                </Reveal>

                <Reveal delay={160}>
                  <div className="flex gap-4 mb-6 font-bold text-foreground">
                    <span className="bg-card px-3 py-1 border border-border tabnums" style={{ borderRadius: 4 }}>200g — ₹125</span>
                    <span className="bg-card px-3 py-1 border border-border tabnums" style={{ borderRadius: 4 }}>500g — ₹275</span>
                  </div>
                </Reveal>

                <Reveal delay={240}>
                  <p className="text-lg leading-relaxed text-muted-foreground mb-8">{product.description}</p>
                </Reveal>

                <Reveal delay={320}>
                  <div className="mb-8">
                    <h4 className="font-bold mb-2 text-foreground uppercase tracking-wider text-sm">Best Used For</h4>
                    <div className="flex gap-2 flex-wrap">
                      {product.bestUsedFor.map(tag => (
                        <span key={tag} className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">{tag}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>

                {/* Protein card + Nutrition Facts button */}
                <Reveal delay={400}>
                  <div
                    className="bg-card p-4 border border-border mb-8 flex justify-between items-center"
                    style={{ borderRadius: 12, boxShadow: "var(--shadow-rest)" }}
                  >
                    <div>
                      <p className="font-bold text-foreground">Protein</p>
                      <p className="text-primary font-bold text-xl tabnums">~18g / 100g</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <p className="text-xs text-muted-foreground">Storage: 1–4°C</p>
                      <p className="text-xs text-muted-foreground">Use within 5 days</p>
                      <button
                        onClick={() => setNutritionModal({ id: product.id, name: product.name })}
                        className="mt-1 text-xs font-bold text-primary hover:underline flex items-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                      >
                        View Nutrition Facts <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={400}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative group">
                      <button className="cta-primary w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg notch-br flex items-center justify-center gap-2">
                        Order Now <ArrowRight className="w-5 h-5 cta-arrow" />
                      </button>
                      <div
                        className="absolute hidden group-hover:flex flex-col top-full left-0 mt-2 w-48 bg-card border border-border py-1 z-50"
                        style={{ borderRadius: 8, boxShadow: "var(--shadow-hover)" }}
                      >
                        {Object.entries(QCOM_LINKS).map(([platform, url]) => (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleQComClick(platform)}
                            className="qcom-shimmer px-4 py-2 text-sm text-foreground hover:bg-muted capitalize font-medium"
                          >
                            Order on {platform}
                          </a>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => setNutritionModal({ id: product.id, name: product.name })}
                      className="w-full sm:w-auto bg-transparent border-2 border-primary text-primary px-6 py-4 rounded-full font-bold text-base hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      Nutrition Facts
                    </button>
                    <Link
                      href="/find-us"
                      className="w-full sm:w-auto bg-transparent border-2 border-foreground/30 text-foreground/70 px-6 py-4 rounded-full font-bold text-base hover:border-foreground hover:text-foreground transition-colors flex items-center justify-center"
                    >
                      Find in Store
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      ))}



      {/* FAQ */}
      <section className="bg-muted py-24 border-t border-border">
        <div className="container px-4 max-w-3xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Product FAQ</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.products.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-left font-bold text-lg hover:text-primary transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* COMING SOON */}
      <section className="bg-near-black text-warm-cream py-24">
        <div className="container px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">PANEVO's Next Chapter Is Coming.</h2>
          <p className="text-lg opacity-80 mb-16 max-w-2xl mx-auto">
            We're not stopping at three. Four new flavours are in development — each one bolder than the last.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16">
            {["Gochujang", "Mala (Sichuan)", "Chipotle-Lime", "Za'atar"].map(flavour => (
              <div key={flavour} className="bg-white/5 border border-white/10 rounded-xl p-6 aspect-square flex items-center justify-center relative overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 bg-black/40 z-10 backdrop-blur-md" />
                <h3 className="relative z-20 font-bold text-xl uppercase tracking-widest text-white">{flavour}</h3>
                <div className="absolute top-4 right-4 z-20 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase">Locked</div>
              </div>
            ))}
          </div>

          <form onSubmit={handleWaitlistSubmit} className="max-w-md mx-auto flex flex-col gap-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-white/10 border border-white/20 text-white placeholder:text-white/50 px-6 py-4 rounded-full w-full focus:outline-none focus:border-primary"
            />
            <button
              disabled={isSubmitting}
              type="submit"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg notch-br hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Notify Me When It Launches →"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
