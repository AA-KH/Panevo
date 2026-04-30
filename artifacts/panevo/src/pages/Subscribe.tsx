import { SEO } from "@/components/SEO";
import { useState, useEffect } from "react";
import { track } from "@/lib/analytics";
import { Check, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";
import { useLocation } from "wouter";
import { PLAN_IDS } from "@/config/brand";
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Subscribe() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(
    new URLSearchParams(window.location.search).get("plan") || null
  );
  const [selectedSize, setSelectedSize] = useState<"200g" | "500g">("500g");
  const [flavours, setFlavours] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", line1: "", city: "", state: "", pincode: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    track("page_view", { page: "/subscribe" });
    if (step === 1) track("subscription_wizard_start", {});
  }, [step]);

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
    setStep(2);
    track("subscription_step_complete", { step: 1, plan });
    document.getElementById("wizard")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFlavourToggle = (flavour: string) => {
    setFlavours(prev => 
      prev.includes(flavour) ? prev.filter(f => f !== flavour) : [...prev, flavour]
    );
  };

  const proceedToStep3 = () => {
    if (flavours.length === 0) {
      toast.error("Please select at least one flavour.");
      return;
    }
    setStep(3);
    track("subscription_step_complete", { step: 2, flavours });
    
    // Inject Razorpay script if not present
    if (!document.getElementById("razorpay-script")) {
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    track("subscription_payment_initiated", { plan: selectedPlan, size: selectedSize, flavours });

    try {
      const planKeyFlavour = flavours.length > 1 ? "mixed" : (
        flavours[0] === "Black Pepper" ? "bp" :
        flavours[0] === "Red Chilli Flakes" ? "rc" :
        flavours[0] === "Oregano" ? "or" : "mixed"
      );
      
      const planId = PLAN_IDS.get(selectedPlan || "weekly", selectedSize, planKeyFlavour);

      const res = await fetch("/api/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: {
              line1: formData.line1,
              city: formData.city,
              state: formData.state,
              pincode: formData.pincode
            }
          }
        })
      });

      if (!res.ok) throw new Error("Failed to create subscription");
      const data = await res.json();

      if (data.mock) {
        toast.success("Razorpay credentials not configured — this is a Phase 1 demo of the wizard");
        setLocation("/subscribe/thank-you");
        return;
      }

      const options = {
        key: data.razorpayKeyId,
        subscription_id: data.subscriptionId,
        name: "PANEVO",
        description: "Weekly Paneer Box",
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        handler: function (response: any) {
          toast.success("Payment successful!");
          setLocation("/subscribe/thank-you");
        },
        theme: {
          color: "#BF3D0B"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("An error occurred during checkout.");
    } finally {
      setIsSubmitting(false);
    }
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
          <Reveal>
            <h1 className="text-5xl md:text-7xl mb-6 text-foreground">Your Weekly Paneer Box.<br/><span className="text-primary">Cancel Any Time.</span></h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">Stop thinking about paneer. Start eating it.</p>
          </Reveal>

          <Reveal delay={200}>
            <ul className="flex flex-wrap justify-center gap-3 mb-10 list-none">
              {["No lock-in", "Pause any time", "Fresh every delivery"].map((label) => (
                <li key={label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary text-secondary text-sm font-semibold tracking-wide">
                  <Check className="w-4 h-4" /> {label}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={280}>
            <button onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })} className="cta-primary bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg notch-br inline-flex items-center gap-2">
              See Plans <ArrowRight className="w-5 h-5 cta-arrow" />
            </button>
          </Reveal>
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
              <Reveal key={plan.id} delay={0}>
                <div className={`card-lift bg-card border-2 ${plan.color} p-8 relative flex flex-col h-full`} style={{ borderRadius: 12, boxShadow: "var(--shadow-rest)" }}>
                  {plan.badge && (
                    <div className="absolute top-0 right-0 translate-x-2 -translate-y-2 bg-accent text-accent-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider notch-br" style={{ borderRadius: 100 }}>
                      {plan.badge}
                    </div>
                  )}
                  <h3 className="text-3xl mb-4 text-foreground">{plan.title}</h3>
                  <p className="text-muted-foreground mb-8 flex-1">{plan.desc}</p>
                  <button onClick={() => handlePlanSelect(plan.id)} className={`cta-primary w-full py-3 font-bold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary notch-br ${plan.btnClass}`} style={{ borderRadius: 4 }}>
                    Subscribe {plan.title}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WIZARD */}
      <section id="wizard" className="py-24 bg-background">
        <div className="container px-4 max-w-3xl">
          <div className="mb-8 flex justify-between items-center border-b border-border pb-4" aria-live="polite">
            <h2 className="text-2xl text-foreground">Build Your Box</h2>
            <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest bg-muted px-3 py-1" style={{ borderRadius: 100 }}>Step {step} of 3</span>
          </div>

          <div className="bg-card border border-border p-6 md:p-10" style={{ borderRadius: 12, boxShadow: "var(--shadow-rest)" }}>
            
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-8 wizard-step-enter">
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
                    <button onClick={() => setSelectedSize("200g")} className={`p-4 rounded-lg border-2 font-bold transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary ${selectedSize === "200g" ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-background text-muted-foreground hover:border-foreground/20'}`}>
                      200g
                      <p className="text-xs font-normal mt-1 opacity-80">Weeknights</p>
                    </button>
                    <button onClick={() => setSelectedSize("500g")} className={`p-4 rounded-lg border-2 font-bold transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary ${selectedSize === "500g" ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-background text-muted-foreground hover:border-foreground/20'}`}>
                      500g
                      <p className="text-xs font-normal mt-1 opacity-80">Family / Prep</p>
                    </button>
                  </div>
                </div>

                <button onClick={() => selectedPlan && setStep(2)} disabled={!selectedPlan} className="w-full bg-foreground text-background py-4 rounded-md font-bold hover:bg-foreground/90 disabled:opacity-50 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary">
                  Next: Choose Flavours
                </button>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-8 wizard-step-enter">
                <div>
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-xl font-bold text-foreground">Select Flavours</h3>
                    <button onClick={() => setStep(1)} className="text-sm font-medium text-muted-foreground hover:text-foreground">Change Plan</button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">Select one or more flavours. We'll mix them up in your deliveries.</p>
                  
                  <div className="space-y-3">
                    {["Black Pepper", "Red Chilli Flakes", "Oregano", "Surprise Me (Mixed)"].map(f => (
                      <label key={f} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary ${flavours.includes(f) ? 'border-primary bg-primary/5' : 'border-border bg-background hover:bg-muted'}`}>
                        <input type="checkbox" checked={flavours.includes(f)} onChange={() => handleFlavourToggle(f)} className="w-5 h-5 accent-primary rounded border-border" />
                        <span className="ml-3 font-bold text-foreground">{f}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button onClick={proceedToStep3} className="w-full bg-foreground text-background py-4 rounded-md font-bold hover:bg-foreground/90 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary">
                  Next: Delivery Details
                </button>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-8 wizard-step-enter">
                <div className="flex justify-between items-baseline border-b border-border pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Delivery Details</h3>
                    <p className="text-sm text-muted-foreground mt-1 capitalize">{selectedPlan} · {selectedSize} · {flavours.join(", ")}</p>
                  </div>
                  <button onClick={() => setStep(2)} className="text-sm font-medium text-muted-foreground hover:text-foreground">Edit Box</button>
                </div>

                <form onSubmit={handlePayment} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="subName" className="text-sm font-bold text-foreground">Full Name</label>
                    <input id="subName" required type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subEmail" className="text-sm font-bold text-foreground">Email</label>
                    <input id="subEmail" required type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subPhone" className="text-sm font-bold text-foreground">Phone</label>
                    <input id="subPhone" required type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:border-primary" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subAddress" className="text-sm font-bold text-foreground">Address Line 1</label>
                    <input id="subAddress" required type="text" placeholder="House/Flat No., Building, Street" value={formData.line1} onChange={e => setFormData({...formData, line1: e.target.value})} className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:border-primary" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="subCity" className="text-sm font-bold text-foreground">City</label>
                      <input id="subCity" required type="text" placeholder="City" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:border-primary" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subState" className="text-sm font-bold text-foreground">State</label>
                      <input id="subState" required type="text" placeholder="State" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:border-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subPin" className="text-sm font-bold text-foreground">Pincode</label>
                    <input id="subPin" required type="text" placeholder="Pincode" value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:border-primary" />
                  </div>
                  
                  <div className="pt-4">
                    <button disabled={isSubmitting} type="submit" className="w-full bg-primary text-primary-foreground py-4 rounded-md font-bold hover:bg-primary/90 transition-colors notch-br flex items-center justify-center gap-2 disabled:opacity-50">
                      {isSubmitting ? "Processing..." : "Continue to Payment"} {!isSubmitting && <ArrowRight className="w-5 h-5" />}
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