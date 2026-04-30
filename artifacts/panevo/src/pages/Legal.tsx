import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/motion/Reveal";

export default function Legal({ type }: { type: "privacy" | "terms" | "refund" }) {
  const titles = {
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    refund: "Refund Policy"
  };

  return (
    <div className="w-full bg-background min-h-[70vh]">
      <SEO title={titles[type]} description={`PANEVO ${titles[type]}`} />
      
      <div className="container px-4 py-24 max-w-3xl mx-auto text-center">
        <Reveal>
          <h1 className="text-4xl md:text-5xl mb-8 text-foreground">{titles[type]}</h1>
        </Reveal>
        <Reveal delay={120}>
          <div className="bg-card border border-border p-12 text-muted-foreground" style={{ borderRadius: 12, boxShadow: "var(--shadow-rest)" }}>
            <p className="tabnums text-sm uppercase tracking-wider mb-4">Phase 1 Placeholder</p>
            <p className="text-lg">Legal text to be supplied by Shatkona Ventures Private Limited.</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
