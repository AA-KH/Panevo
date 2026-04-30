import { SEO } from "@/components/SEO";
import { useState } from "react";
import { track } from "@/lib/analytics";
import { Check, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";

export default function Subscribe() {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<"200g" | "500g">("500g");
  const [flavours, setFlavours] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: ""
  });

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
    setStep(2);
    track("subscription_step_complete", { step: 1, plan });
    // Scroll to wizard
    document.getElementById("wizard")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFlavourToggle = (flavour: string) => {
    setFlavours(prev => 
      prev.includes(flavour) ? prev.filter(f => f !== flavour) : [...prev, flavour]
    );
  };

  const proceedToStep3 = () => {
    if (flavours.length === 0) {
      alert("Please select at least one flavour.");
      return;
    }
    setStep(3);
    track("subscription_step_complete", { step: 2, flavours });
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    track("subscription_payment_initiated", { plan: selectedPlan, size: selectedSize, flavours });
    alert("Razorpay integration pending — TODO Phase 2. \n\nForm Data: " + JSON.stringify(formData));
  };

  return (
    <div className="w-full bg-background min-h-screen">
      <SEO
        title="Subscribe"
        description="Your weekly paneer box. Cancel any time. Stop thinking about paneer. Start eating it."
      />

      {/* HERO */}
      <section className="bg-background pt-24 pb-16 text-center border-b border-border">
        <div className="container px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">Your Weekly Paneer Box.<br/><span className="text-primary">Cancel Any Time.</span></h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">Stop thinking about paneer. Start eating it.</p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-foreground mb-10 uppercase tracking-wider">
            <span className="flex items-center gap-1"><Check className="w-4 h-4 text-primary" /> No lock-in</span>
            <span className="flex items-center gap-1"><Check className="w-4 h-4 text-primary" /> Pause any time</span>
            <span className="flex items-center gap-1"><Check className="w-4 h-4 text-primary" /> Fresh every delivery</span>
          </div>

          <button onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })} className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg notch-br hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
            See Plans <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="py-20 bg-muted">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { id: "weekly", title: "Weekly", desc: "Delivered every 7 days. Best for households that eat paneer 2–3x/week.", badge: "Most Popular", color: "border-accent", btnClass: "bg-primary text-white" },
              { id: "fortnightly", title: "Fortnightly", desc: "Delivered every 14 days. Two-pack option available. Best for smaller households.", color: "border-border", btnClass: "bg-foreground text-background" },
              { id: "monthly", title: "Monthly", desc: "One delivery per month. Best for families who batch-cook.", color: "border-border", btnClass: "bg-foreground text-background" }
            ].map(plan => (
              <div key={plan.id} className={`bg-card border-2 ${plan.color} p-8 rounded-xl shadow-sm relative flex flex-col`}>
                {plan.badge && (
                  <div className="absolute top-0 right-0 translate-x-2 -translate-y-2 bg-accent text-accent-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider rounded notch-br shadow-sm">
                    {plan.badge}
                  </div>
                )}
                <h3 className="text-3xl font-bold mb-4 text-foreground uppercase">{plan.title}</h3>
                <p className="text-muted-foreground mb-8 flex-1">{plan.desc}</p>
                <button onClick={() => handlePlanSelect(plan.id)} className={`w-full py-3 rounded-md font-bold transition-colors ${plan.btnClass}`}>
                  Subscribe {plan.title}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WIZARD */}
      <section id="wizard" className="py-24 bg-background">
        <div className="container px-4 max-w-3xl">
          <div className="mb-8 flex justify-between items-center border-b border-border pb-4">
            <h2 className="text-2xl font-bold text-foreground">Build Your Box</h2>
            <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest bg-muted px-3 py-1 rounded">Step {step} of 3</span>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 md:p-10 shadow-sm">
            
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">Selected Plan</h3>
                  <div className="bg-muted p-4 rounded-lg flex justify-between items-center">
                    <span className="font-bold text-lg capitalize text-foreground">{selectedPlan || "None selected"}</span>
                    {!selectedPlan && <span className="text-sm text-destructive">Please select a plan above</span>}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">Pack Size</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setSelectedSize("200g")} className={`p-4 rounded-lg border-2 font-bold transition-all ${selectedSize === "200g" ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-background text-muted-foreground hover:border-foreground/20'}`}>
                      200g
                      <p className="text-xs font-normal mt-1 opacity-80">Weeknights</p>
                    </button>
                    <button onClick={() => setSelectedSize("500g")} className={`p-4 rounded-lg border-2 font-bold transition-all ${selectedSize === "500g" ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-background text-muted-foreground hover:border-foreground/20'}`}>
                      500g
                      <p className="text-xs font-normal mt-1 opacity-80">Family / Prep</p>
                    </button>
                  </div>
                </div>

                <button onClick={() => selectedPlan && setStep(2)} disabled={!selectedPlan} className="w-full bg-foreground text-background py-4 rounded-md font-bold hover:bg-foreground/90 disabled:opacity-50 transition-colors">
                  Next: Choose Flavours
                </button>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div>
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-xl font-bold text-foreground">Select Flavours</h3>
                    <button onClick={() => setStep(1)} className="text-sm font-medium text-muted-foreground hover:text-foreground">Change Plan</button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">Select one or more flavours. We'll mix them up in your deliveries.</p>
                  
                  <div className="space-y-3">
                    {["Black Pepper", "Red Chilli Flakes", "Oregano", "Surprise Me (Mixed)"].map(f => (
                      <label key={f} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${flavours.includes(f) ? 'border-primary bg-primary/5' : 'border-border bg-background hover:bg-muted'}`}>
                        <input type="checkbox" checked={flavours.includes(f)} onChange={() => handleFlavourToggle(f)} className="w-5 h-5 accent-primary rounded border-border" />
                        <span className="ml-3 font-bold text-foreground">{f}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button onClick={proceedToStep3} className="w-full bg-foreground text-background py-4 rounded-md font-bold hover:bg-foreground/90 transition-colors">
                  Next: Delivery Details
                </button>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex justify-between items-baseline border-b border-border pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Delivery Details</h3>
                    <p className="text-sm text-muted-foreground mt-1 capitalize">{selectedPlan} · {selectedSize} · {flavours.join(", ")}</p>
                  </div>
                  <button onClick={() => setStep(2)} className="text-sm font-medium text-muted-foreground hover:text-foreground">Edit Box</button>
                </div>

                <form onSubmit={handlePayment} className="space-y-4">
                  <input required type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:border-primary" />
                  <input required type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:border-primary" />
                  <input required type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:border-primary" />
                  <textarea required placeholder="Full Delivery Address" rows={3} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:border-primary resize-none" />
                  
                  <div className="pt-4">
                    <button type="submit" className="w-full bg-primary text-primary-foreground py-4 rounded-md font-bold hover:bg-primary/90 transition-colors notch-br flex items-center justify-center gap-2">
                      Continue to Payment <ArrowRight className="w-5 h-5" />
                    </button>
                    <p className="text-xs text-center text-muted-foreground mt-4 flex items-center justify-center gap-1">
                      <Check className="w-3 h-3" /> Secure payment via Razorpay. Account created automatically.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* TRUST SIGNALS & FAQ */}
      <section className="bg-secondary text-secondary-foreground py-20">
        <div className="container px-4 max-w-3xl">
          <h2 className="text-3xl font-bold mb-10 text-center text-white">Subscription FAQ</h2>
          <Accordion type="single" collapsible className="w-full border border-white/20 rounded-xl overflow-hidden bg-background/5">
            {faqs.subscription.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-white/10 px-6">
                <AccordionTrigger className="text-left font-bold text-lg hover:text-white transition-colors py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed pb-4">
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
