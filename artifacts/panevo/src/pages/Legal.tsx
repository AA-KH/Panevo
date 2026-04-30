import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/motion/Reveal";
import { BRAND } from "@/config/brand";

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
        <Reveal delay={180}>
          <div
            className="bg-card border border-border p-8 md:p-12"
            style={{ borderRadius: 12, boxShadow: "var(--shadow-rest)" }}
          >
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Coming soon
            </p>
            <p className="text-base md:text-lg text-foreground/90 mb-6">
              Our full {title.toLowerCase()} is being finalised by{" "}
              {BRAND.parentCompany}. In the meantime, if you have any
              questions about how we handle data, orders or returns, please
              reach out and we will be happy to help.
            </p>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>
                <span className="font-semibold">Email:</span>{" "}
                <a
                  href={`mailto:${BRAND.emails[0]}`}
                  className="underline underline-offset-4 hover:text-primary"
                >
                  {BRAND.emails[0]}
                </a>
              </li>
              <li>
                <span className="font-semibold">Trade enquiries:</span>{" "}
                <a
                  href={`mailto:${BRAND.emails[1]}`}
                  className="underline underline-offset-4 hover:text-primary"
                >
                  {BRAND.emails[1]}
                </a>
              </li>
              <li>
                <span className="font-semibold">Registered office:</span>{" "}
                {BRAND.placeholders.address}
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
