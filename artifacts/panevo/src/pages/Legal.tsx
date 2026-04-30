import { SEO } from "@/components/SEO";

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
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">{titles[type]}</h1>
        <div className="bg-card border border-border p-12 rounded-xl text-muted-foreground">
           <p className="font-mono text-sm uppercase tracking-wider mb-4">Phase 1 Placeholder</p>
           <p className="text-lg">Legal text to be supplied by Shatkona Ventures Private Limited.</p>
        </div>
      </div>
    </div>
  );
}
