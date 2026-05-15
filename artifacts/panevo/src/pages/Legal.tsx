import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/motion/Reveal";
import { BRAND } from "@/config/brand";
import { PrivacyPolicy, TermsOfUse, RefundPolicy } from "@/components/legal-docs";

export default function Legal({ type }: { type: "privacy" | "terms" | "refund" }) {
  const meta = {
    privacy: {
      title: "Privacy Policy",
      summary:
        "How PANEVO collects, uses and safeguards the personal information you share with us, in line with the Digital Personal Data Protection Act, 2023.",
    },
    terms: {
      title: "Terms of Use",
      summary:
        "The terms that govern your use of panevo.in, our subscriptions and our quick-commerce listings.",
    },
    refund: {
      title: "Refund Policy",
      summary:
        "How returns, replacements and refunds work for PANEVO orders placed via Blinkit, Zepto, Swiggy Instamart or our subscription service.",
    },
  };

  const { title, summary } = meta[type];

  return (
    <div className="w-full bg-background min-h-[70vh]">
      <SEO
        title={title}
        description={summary}
        robots="noindex, follow"
      />

      <div className="container px-4 py-24 max-w-3xl mx-auto">
        <Reveal>
          <h1 className="text-4xl md:text-5xl mb-6 text-foreground text-center">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-base md:text-lg text-foreground/80 text-center mb-10">
            {summary}
          </p>
        </Reveal>
        <Reveal delay={150}>
          <div className="bg-muted p-6 md:p-8 rounded-xl border border-border mb-8 text-sm md:text-base text-foreground/80 space-y-2">
            <h2 className="text-xl font-bold text-foreground mb-4 uppercase tracking-wider">PANEVO Legal Documents</h2>
            <p><strong>Published by:</strong> {BRAND.parentCompany}</p>
            <p><strong>Registered Office:</strong> {BRAND.placeholders.address}</p>
            <p><strong>Email:</strong> {BRAND.emails[0]} | <strong>Phone:</strong> {BRAND.phones[0]}</p>
            <p><strong>DPIIT Recognised Startup</strong> | <strong>FSSAI Status:</strong> Applied for (application under process with FSSAI)</p>
            <p className="pt-4 border-t border-border/50">These documents govern the use of the PANEVO website (panevo.in), mobile application, and all products sold under the PANEVO brand. Please read all three documents carefully before using our platform or purchasing our products.</p>
          </div>
        </Reveal>
        <Reveal delay={180}>
          <div
            className="bg-card border border-border p-8 md:p-12"
            style={{ borderRadius: 12, boxShadow: "var(--shadow-rest)" }}
          >
            {type === "privacy" && <PrivacyPolicy />}
            {type === "terms" && <TermsOfUse />}
            {type === "refund" && <RefundPolicy />}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
