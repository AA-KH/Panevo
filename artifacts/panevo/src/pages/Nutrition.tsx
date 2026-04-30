import { SEO } from "@/components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";
import { faqs } from "@/data/faqs";
import { track } from "@/lib/analytics";
import { ArrowRight, Printer } from "lucide-react";
import { useEffect } from "react";

export default function Nutrition() {
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
      <section className="bg-primary text-primary-foreground py-24 text-center">
        <div className="container px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">The Protein You've Been Underestimating.</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto mb-10">Paneer has always been India's best-kept protein secret. PANEVO makes it impossible to ignore.</p>
          <Link href="/products" className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg notch-br hover:bg-white/90 transition-colors inline-flex items-center gap-2">
            Shop Now <ArrowRight className="w-5 h-5" />
          </Link>
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

          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left font-mono text-sm sm:text-base tabular-nums">
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
                  { label: "Energy (kcal)", bp: "[LAB CONFIRM]", rc: "[LAB CONFIRM]", or: "[LAB CONFIRM]" },
                  { label: "Protein (g)", bp: "[LAB CONFIRM]", rc: "[LAB CONFIRM]", or: "[LAB CONFIRM]", highlight: true },
                  { label: "Total Fat (g)", bp: "[LAB CONFIRM]", rc: "[LAB CONFIRM]", or: "[LAB CONFIRM]" },
                  { label: "Carbohydrates (g)", bp: "[LAB CONFIRM]", rc: "[LAB CONFIRM]", or: "[LAB CONFIRM]" },
                  { label: "Calcium (mg)", bp: "[LAB CONFIRM]", rc: "[LAB CONFIRM]", or: "[LAB CONFIRM]" },
                  { label: "Sodium (mg)", bp: "[LAB CONFIRM]", rc: "[LAB CONFIRM]", or: "[LAB CONFIRM]" },
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
          <p className="text-xs text-muted-foreground mt-4 text-center">All values are per 100g. Lab-tested at NABL-accredited facility. <span className="text-red-500 font-bold">REPLACE with NABL-certified values before go-live</span></p>
        </div>
      </section>

      {/* PROTEIN COMPARISON CHART */}
      <section className="bg-muted py-20 border-y border-border">
        <div className="container px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">Paneer Belongs in the Protein Conversation.</h2>
          
          <div className="space-y-6">
            {[
              { name: "PANEVO Paneer", value: 18, color: "bg-primary", width: "35%" },
              { name: "Chicken Breast (grilled)", value: 31, color: "bg-secondary", width: "60%" },
              { name: "Eggs (whole raw)", value: 13, color: "bg-secondary/60", width: "25%" },
              { name: "Tofu", value: 8, color: "bg-secondary/40", width: "15%" },
              { name: "Soya Chunks (dry)", value: 52, color: "bg-secondary", width: "100%" },
            ].map(item => (
              <div key={item.name} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <div className="w-full sm:w-48 font-bold text-foreground text-sm sm:text-right">{item.name}</div>
                <div className="flex-1 flex items-center gap-4">
                  <div className="h-8 bg-border rounded-r-md w-full relative">
                    <div className={`absolute top-0 left-0 h-full ${item.color} rounded-r-md`} style={{ width: item.width }}></div>
                  </div>
                  <div className="w-16 font-mono font-bold text-foreground">~{item.value}g</div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-8 text-center italic">Citation: IFCT 2017 / USDA FoodData Central</p>
          <p className="text-lg font-bold text-center mt-8 text-foreground max-w-2xl mx-auto">On a cooked, ready-to-eat basis, paneer is the clear winner for vegetarians. PANEVO makes it easier to eat daily.</p>
        </div>
      </section>

      {/* CLEAN LABEL */}
      <section className="bg-background py-24 text-center">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">If you can't pronounce it, it's not in PANEVO.</h2>
          
          <div className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-12 tracking-tight">
            Milk <span className="text-primary">·</span> Salt <span className="text-primary">·</span> Spice <span className="text-primary">·</span> Citric Acid
          </div>
          
          <p className="text-xl text-muted-foreground mb-16 italic">That's it. That's the whole ingredient list.</p>

          <div className="flex flex-wrap justify-center gap-4">
            {['No Artificial Flavours', 'No Preservatives', 'No Additives', 'Vegetarian', 'FSSAI Compliant'].map(badge => (
              <div key={badge} className="bg-card border border-border px-6 py-3 rounded-full text-foreground font-bold text-sm flex items-center gap-2">
                <span className="text-primary">✓</span> {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FITNESS RECIPES PREVIEW */}
      <section className="bg-secondary text-secondary-foreground py-20">
        <div className="container px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Built for your macros.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Black Pepper Salad Bowl", desc: "The post-workout bowl.", cal: 380, pro: 28, time: "5 min" },
              { title: "Oregano Stir-Fry", desc: "The clean bulk meal.", cal: 290, pro: 22, time: "8 min" },
              { title: "Red Chilli Tikka", desc: "The cutting phase favourite.", cal: 310, pro: 26, time: "10 min" }
            ].map((recipe, i) => (
              <div key={i} className="bg-white text-near-black rounded-xl overflow-hidden p-6 relative">
                 <div className="absolute top-0 right-0 w-12 h-12 bg-primary text-white font-bold flex items-center justify-center rounded-bl-xl">{recipe.time}</div>
                 <h3 className="text-xl font-bold mb-2 pr-8">{recipe.title}</h3>
                 <p className="text-muted-foreground text-sm mb-6">{recipe.desc}</p>
                 <div className="flex justify-between items-center mb-6 pt-4 border-t border-border">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground uppercase font-bold">Kcal</p>
                      <p className="font-mono font-bold text-lg">{recipe.cal}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground uppercase font-bold">Protein</p>
                      <p className="font-mono font-bold text-lg text-primary">{recipe.pro}g</p>
                    </div>
                 </div>
                 <Link href="/recipes" className="text-sm font-bold text-primary flex items-center gap-1 hover:underline">
                   View Full Recipe <ArrowRight className="w-4 h-4" />
                 </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background py-24">
        <div className="container px-4 max-w-3xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Frequently Asked Questions</h2>
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
