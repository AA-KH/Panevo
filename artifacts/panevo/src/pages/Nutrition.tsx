import { SEO } from "@/components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";
import { faqs } from "@/data/faqs";
import { track } from "@/lib/analytics";
import { ArrowRight, Printer } from "lucide-react";
import { useEffect } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { useCountUp } from "@/hooks/useCountUp";

export default function Nutrition() {
  const { ref: paneerBarRef, value: paneerBarValue } = useCountUp(18, 800);

  useEffect(() => {
    track("nutrition_page_view", {});
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.nutrition.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <div className="w-full">
      <SEO
        title="Nutrition & Protein"
        description="The protein you've been underestimating. Lab-tested macros and clean ingredients."
        schema={JSON.stringify(faqSchema)}
      />

      {/* HERO */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24 text-center">
        <div className="container px-4">
          <Reveal>
            <h1 className="text-4xl sm:text-5xl md:text-7xl mb-6">The Protein You've Been Underestimating.</h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-lg sm:text-xl md:text-2xl opacity-90 max-w-2xl mx-auto mb-10">Paneer has always been India's best-kept protein secret. PANEVO makes it impossible to ignore.</p>
          </Reveal>
          <Reveal delay={240}>
            <Link href="/products" className="cta-primary bg-white text-primary px-8 py-4 rounded-full font-bold text-lg notch-br inline-flex items-center gap-2">
              Shop Now <ArrowRight className="w-5 h-5 cta-arrow" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* MACRO TABLE */}
      <section className="bg-background py-20">
        <div className="container px-4 max-w-5xl">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold text-foreground">Nutritional Information</h2>
            <button onClick={handlePrint} className="text-primary flex items-center gap-2 font-bold hover:underline print:hidden">
              <Printer className="w-4 h-4" /> Copy Table
            </button>
          </div>

          <Reveal>
          <div className="bg-card border border-border overflow-hidden" style={{ borderRadius: 12, boxShadow: "var(--shadow-rest)" }}>
            <table className="w-full text-left text-sm sm:text-base tabnums">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="p-4 font-bold text-foreground font-sans">Per 100g</th>
                  <th className="p-4 font-bold text-foreground font-sans">Black Pepper</th>
                  <th className="p-4 font-bold text-foreground font-sans">Red Chilli Flakes</th>
                  <th className="p-4 font-bold text-foreground font-sans">Oregano</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { label: "Energy (kcal)", bp: "~260", rc: "~260", or: "~260" },
                  { label: "Protein (g)", bp: "~18", rc: "~18", or: "~18", highlight: true },
                  { label: "Total Fat (g)", bp: "~20", rc: "~20", or: "~20" },
                  { label: "Carbohydrates (g)", bp: "~3", rc: "~3", or: "~3" },
                  { label: "Calcium (mg)", bp: "~480", rc: "~480", or: "~480" },
                  { label: "Sodium (mg)", bp: "~35", rc: "~35", or: "~35" },
                ].map((row, i) => (
                  <tr key={i} className={row.highlight ? "bg-primary/5" : ""}>
                    <td className={`p-4 font-sans ${row.highlight ? "font-bold text-primary" : "text-muted-foreground"}`}>{row.label}</td>
                    <td className={`p-4 ${row.highlight ? "font-bold text-primary" : "text-foreground"}`}>{row.bp}</td>
                    <td className={`p-4 ${row.highlight ? "font-bold text-primary" : "text-foreground"}`}>{row.rc}</td>
                    <td className={`p-4 ${row.highlight ? "font-bold text-primary" : "text-foreground"}`}>{row.or}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </Reveal>
          <p className="text-xs text-muted-foreground mt-4 text-center">All values are per 100g. Lab-tested at NABL-accredited facility. Final values certified per batch.</p>
        </div>
      </section>

      {/* PROTEIN COMPARISON CHART (animated bars + macro counter) */}
      <section className="bg-muted py-20 border-y border-border" ref={paneerBarRef as any}>
        <div className="container px-4 max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl mb-4 text-center text-foreground">Paneer Belongs in the Protein Conversation.</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-center text-7xl md:text-8xl text-primary mb-10 tabnums" style={{ fontFamily: "var(--app-font-display)" }}>
              ~{paneerBarValue}g
            </p>
          </Reveal>

          <div className="space-y-6">
            {[
              { name: "PANEVO Paneer", value: 18, color: "bg-primary", width: 35, isHero: true },
              { name: "Chicken Breast (grilled)", value: 31, color: "bg-secondary", width: 60 },
              { name: "Eggs (whole raw)", value: 13, color: "bg-secondary/60", width: 25 },
              { name: "Tofu", value: 8, color: "bg-secondary/40", width: 15 },
              { name: "Soya Chunks (dry)", value: 52, color: "bg-secondary", width: 100 },
            ].map((item, i) => (
              <Reveal key={item.name} delay={Math.min(i, 4) * 80}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className={`w-full sm:w-48 font-bold text-sm sm:text-right ${item.isHero ? "text-primary" : "text-foreground"}`}>{item.name}</div>
                  <div className="flex-1 flex items-center gap-4">
                    <div className="h-8 bg-border w-full relative overflow-hidden" style={{ borderRadius: 4 }}>
                      <div
                        className={`absolute top-0 left-0 h-full ${item.color} transition-[width] ease-out`}
                        style={{
                          width: `${paneerBarValue > 0 ? item.width : 0}%`,
                          transitionDuration: "800ms",
                          transitionDelay: `${Math.min(i, 4) * 80}ms`,
                          borderRadius: 4,
                        }}
                      />
                    </div>
                    <div className="w-16 tabnums font-bold text-foreground">~{item.value}g</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <p className="text-xs text-muted-foreground mt-8 text-center italic">Citation: IFCT 2017 / USDA FoodData Central</p>
            <p className="text-lg font-bold text-center mt-8 text-foreground max-w-2xl mx-auto">On a cooked, ready-to-eat basis, paneer is the clear winner for vegetarians. PANEVO makes it easier to eat daily.</p>
          </Reveal>
        </div>
      </section>

      {/* CLEAN LABEL */}
      <section className="bg-background py-24 text-center">
        <div className="container px-4">
          <Reveal>
            <h2 className="text-3xl md:text-4xl mb-12 text-foreground">If you can't pronounce it, it's not in PANEVO.</h2>
          </Reveal>

          <Reveal delay={120}>
            <div className="text-4xl md:text-6xl text-foreground leading-tight mb-12" style={{ fontFamily: "var(--app-font-display)" }}>
              Milk <span className="text-primary">·</span> Salt <span className="text-primary">·</span> Spice <span className="text-primary">·</span> Citric Acid
            </div>
          </Reveal>

          <Reveal delay={240}>
            <p className="text-xl text-muted-foreground mb-16 italic">That's it. That's the whole ingredient list.</p>
          </Reveal>

          <Reveal delay={320}>
            <div className="flex flex-wrap justify-center gap-4">
              {['No Artificial Flavours', 'No Preservatives', 'No Additives', 'Vegetarian', 'FSSAI Compliant'].map(badge => (
                <div key={badge} className="bg-card border border-border px-6 py-3 rounded-full text-foreground font-bold text-sm flex items-center gap-2">
                  <span className="text-primary">✓</span> {badge}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FITNESS RECIPES PREVIEW */}
      <section className="bg-secondary text-secondary-foreground py-20">
        <div className="container px-4">
          <Reveal>
            <h2 className="text-3xl mb-12 text-center text-white">Built for your macros.</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Black Pepper Salad Bowl", desc: "The post-workout bowl.", cal: 380, pro: 28, time: "5 min" },
              { title: "Oregano Stir-Fry", desc: "The clean bulk meal.", cal: 290, pro: 22, time: "8 min" },
              { title: "Red Chilli Tikka", desc: "The cutting phase favourite.", cal: 310, pro: 26, time: "10 min" }
            ].map((recipe, i) => (
              <Reveal key={i} delay={Math.min(i, 4) * 80}>
                <div className="card-lift bg-white text-near-black overflow-hidden p-6 relative h-full" style={{ borderRadius: 12, boxShadow: "var(--shadow-rest)" }}>
                  <div className="absolute top-0 right-0 w-14 h-14 bg-primary text-white font-bold flex items-center justify-center text-sm" style={{ borderBottomLeftRadius: 12 }}>{recipe.time}</div>
                  <h3 className="text-xl mb-2 pr-12">{recipe.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{recipe.desc}</p>
                  <div className="flex justify-between items-center mb-6 pt-4 border-t border-border">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground uppercase font-bold">Kcal</p>
                      <p className="tabnums font-bold text-lg">{recipe.cal}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground uppercase font-bold">Protein</p>
                      <p className="tabnums font-bold text-lg text-primary">{recipe.pro}g</p>
                    </div>
                  </div>
                  <Link href="/recipes" className="cta-primary text-sm font-bold text-primary flex items-center gap-1">
                    View Full Recipe <ArrowRight className="w-4 h-4 cta-arrow" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background py-24">
        <div className="container px-4 max-w-3xl">
          <Reveal>
            <h2 className="text-3xl mb-12 text-center text-foreground">Frequently Asked Questions</h2>
          </Reveal>
          <Accordion type="single" collapsible className="w-full">
            {faqs.nutrition.map((faq, index) => (
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
    </div>
  );
}
