import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { products } from "@/data/products";
import { QCOM_LINKS } from "@/config/platforms";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { track } from "@/lib/analytics";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";
import { Reveal } from "@/components/motion/Reveal";

export default function Products() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    track("product_view", {});
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
    } catch (err) {
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
        title="Our Flavours"
        description="Three bold flavours. One rule: zero marination. Pick your PANEVO."
        structuredData={structuredData}
      />

      {/* PAGE HERO */}
      <section className="bg-background text-foreground py-24 text-center">
        <div className="container px-4">
          <Reveal>
            <h1 className="text-5xl md:text-7xl mb-6">Three Flavours. One Rule. Zero Marination.</h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">Pick your PANEVO. Cook it in under 10 minutes. Eat better every day.</p>
          </Reveal>
        </div>
      </section>

      {/* PRODUCT DETAIL SECTIONS */}
      {products.map((product, index) => (
        <section
          key={product.id}
          id={product.id}
          className={`py-24 ${index % 2 === 0 ? 'bg-background' : 'bg-muted'}`}
        >
          <div className="container px-4">
            <div className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
              <Reveal className="w-full md:w-1/2">
                <div className="aspect-square bg-card border border-border flex items-center justify-center relative overflow-hidden" style={{ borderRadius: 12, boxShadow: "var(--shadow-rest)" }}>
                  <div className="absolute inset-0 bg-secondary/5 flex flex-col items-center justify-center">
                    <span className="font-bold text-xl uppercase text-muted-foreground">{product.name} Pack Shot</span>
                  </div>
                </div>
              </Reveal>
              <div className="w-full md:w-1/2">
                <Reveal>
                  <h2 className="text-4xl md:text-5xl mb-2 text-foreground">{product.name}</h2>
                </Reveal>
                <Reveal delay={80}>
                  <p className="text-xl text-primary mb-6 italic" style={{ fontFamily: "var(--app-font-display)", letterSpacing: "0.01em" }}>"{product.tagline}"</p>
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

                <Reveal delay={400}>
                  <div className="bg-card p-4 border border-border mb-8 flex justify-between items-center" style={{ borderRadius: 12, boxShadow: "var(--shadow-rest)" }}>
                    <div>
                      <p className="font-bold text-foreground">Protein</p>
                      <p className="text-primary font-bold text-xl tabnums">[LAB CONFIRM]g / 100g</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Storage: 1–4°C</p>
                      <p className="text-xs text-muted-foreground">Use within 5 days of opening</p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={400}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative group">
                      <button className="cta-primary w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg notch-br flex items-center justify-center gap-2">
                        Order Now <ArrowRight className="w-5 h-5 cta-arrow" />
                      </button>
                      <div className="absolute hidden group-hover:flex flex-col top-full left-0 mt-2 w-48 bg-card border border-border py-1 z-50" style={{ borderRadius: 8, boxShadow: "var(--shadow-hover)" }}>
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
                    <Link href="/find-us" className="w-full sm:w-auto bg-transparent border-2 border-primary text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/5 transition-colors flex items-center justify-center text-center">
                      Find in Store
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* SHARED NUTRITION STRIP */}
      <section className="bg-secondary text-secondary-foreground py-8 border-y border-border/20">
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

      {/* SIZE COMPARISON */}
      <section className="bg-background py-20">
        <div className="container px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-10 text-center text-foreground">Which size is right for you?</h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
             <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="p-4 font-bold text-foreground">Size</th>
                  <th className="p-4 font-bold text-foreground">Price</th>
                  <th className="p-4 font-bold text-foreground">Ideal For</th>
                  <th className="p-4 font-bold text-foreground">Servings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-4 font-bold text-foreground">200g</td>
                  <td className="p-4 font-medium text-muted-foreground">₹125</td>
                  <td className="p-4 text-muted-foreground">Solo meals, weeknight dinners, meal prep</td>
                  <td className="p-4 text-muted-foreground">2-3</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-foreground">500g</td>
                  <td className="p-4 font-medium text-muted-foreground">₹275 <span className="text-primary text-xs ml-1 bg-primary/10 px-2 py-0.5 rounded-full">SAVE 12%</span></td>
                  <td className="p-4 text-muted-foreground">Families, batch cooking, weekend gatherings</td>
                  <td className="p-4 text-muted-foreground">5-6</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
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
          <p className="text-lg opacity-80 mb-16 max-w-2xl mx-auto">We're not stopping at three. Four new flavours are in development — each one bolder than the last.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16">
            {['Gochujang', 'Mala (Sichuan)', 'Chipotle-Lime', "Za'atar"].map(flavour => (
              <div key={flavour} className="bg-white/5 border border-white/10 rounded-xl p-6 aspect-square flex items-center justify-center relative overflow-hidden backdrop-blur-sm">
                 <div className="absolute inset-0 bg-black/40 z-10 backdrop-blur-md"></div>
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
             <button disabled={isSubmitting} type="submit" className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg notch-br hover:bg-primary/90 transition-colors disabled:opacity-50">
               {isSubmitting ? "Submitting..." : "Notify Me When It Launches →"}
             </button>
          </form>
        </div>
      </section>

    </div>
  );
}