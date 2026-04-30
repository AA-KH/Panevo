import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { products } from "@/data/products";
import { QCOM_LINKS } from "@/config/platforms";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { track } from "@/lib/analytics";

export default function Products() {
  const [email, setEmail] = useState("");

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    track("waitlist_signup", { source: "phase2-flavour" });
    // TODO: POST to API route in Phase 2
    console.log("Waitlist signup:", email);
    alert("Thanks for signing up!");
    setEmail("");
  };

  const handleQComClick = (platform: string) => {
    track("qcom_click", { platform, source_page: "/products", source_element: "product_card" });
  };

  return (
    <div className="w-full">
      <SEO
        title="Our Flavours"
        description="Three bold flavours. One rule: zero marination. Pick your PANEVO."
      />

      {/* PAGE HERO */}
      <section className="bg-primary text-primary-foreground py-24 text-center">
        <div className="container px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Three Flavours. One Rule. Zero Marination.</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">Pick your PANEVO. Cook it in under 10 minutes. Eat better every day.</p>
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
              <div className="w-full md:w-1/2 aspect-square bg-card border border-border rounded-xl flex items-center justify-center relative overflow-hidden">
                {/* Image placeholder */}
                <div className="absolute inset-0 bg-secondary/5 flex flex-col items-center justify-center">
                   <span className="font-bold text-xl uppercase text-muted-foreground">{product.name} Pack Shot</span>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-4xl md:text-5xl font-bold mb-2 uppercase text-foreground">{product.name}</h2>
                <p className="text-xl text-primary font-bold mb-6 italic">"{product.tagline}"</p>

                <div className="flex gap-4 mb-6 font-bold text-foreground">
                  <span className="bg-card px-3 py-1 rounded border border-border">200g — ₹125</span>
                  <span className="bg-card px-3 py-1 rounded border border-border">500g — ₹275</span>
                </div>

                <p className="text-lg leading-relaxed text-muted-foreground mb-8">{product.description}</p>

                <div className="mb-8">
                  <h4 className="font-bold mb-2 text-foreground uppercase tracking-wider text-sm">Best Used For</h4>
                  <div className="flex gap-2 flex-wrap">
                    {product.bestUsedFor.map(tag => (
                      <span key={tag} className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg border border-border mb-8 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-foreground">Protein</p>
                    <p className="text-primary font-bold text-xl tabular-nums">[LAB CONFIRM]g / 100g</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Storage: 1–4°C</p>
                    <p className="text-xs text-muted-foreground">Use within 5 days of opening</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative group">
                    <button className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg notch-br flex items-center justify-center gap-2">
                      Order Now <ArrowRight className="w-5 h-5" />
                    </button>
                     {/* Hover Dropdown for platforms */}
                    <div className="absolute hidden group-hover:flex flex-col top-full left-0 mt-2 w-48 bg-card rounded-md shadow-lg border border-border py-1 z-50">
                      {Object.entries(QCOM_LINKS).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleQComClick(platform)}
                          className="px-4 py-2 text-sm text-foreground hover:bg-muted capitalize font-medium"
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
             <button type="submit" className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg notch-br hover:bg-primary/90 transition-colors">
               Notify Me When It Launches →
             </button>
          </form>
        </div>
      </section>

    </div>
  );
}
