import { SEO } from "@/components/SEO";
import { Shatkona } from "@/components/sections/Shatkona";
import { roadmap } from "@/data/roadmap";
import { useState, useEffect, useRef } from "react";
import { track } from "@/lib/analytics";
import { toast } from "sonner";
import { Reveal } from "@/components/motion/Reveal";
import { motion, useInView } from "framer-motion";

const STATUS_CONFIG: Record<
  string,
  {
    label: string;
    dotColor: string;
    cardBg: string;
    cardBorder: string;
    labelBg: string;
    labelText: string;
    headingColor: string;
    bodyColor: string;
    bulletColor: string;
    pulse: boolean;
    dimmed: boolean;
  }
> = {
  live: {
    label: "LIVE",
    dotColor: "bg-accent",
    cardBg: "bg-white/[0.10]",
    cardBorder: "border-accent/70",
    labelBg: "bg-accent",
    labelText: "text-white",
    headingColor: "text-white",
    bodyColor: "text-white/75",
    bulletColor: "bg-accent",
    pulse: true,
    dimmed: false,
  },
  upcoming: {
    label: "NEXT UP",
    dotColor: "bg-primary",
    cardBg: "bg-primary/[0.14]",
    cardBorder: "border-primary",
    labelBg: "bg-primary",
    labelText: "text-white",
    headingColor: "text-white",
    bodyColor: "text-white/65",
    bulletColor: "bg-primary",
    pulse: false,
    dimmed: false,
  },
  planned: {
    label: "COMING",
    dotColor: "bg-white/25",
    cardBg: "bg-white/[0.04]",
    cardBorder: "border-white/12",
    labelBg: "bg-white/10",
    labelText: "text-white/50",
    headingColor: "text-white/55",
    bodyColor: "text-white/35",
    bulletColor: "bg-white/25",
    pulse: false,
    dimmed: true,
  },
};

function TimelineCard({
  phase,
  index,
}: {
  phase: (typeof roadmap)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const cfg = STATUS_CONFIG[phase.status] ?? STATUS_CONFIG.planned;
  const isLeft = index % 2 === 0;

  return (
    <div className="relative flex items-center justify-center">
      {/* Timeline dot */}
      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 z-10">
        <div className={`w-4 h-4 rounded-full border-[3px] border-[hsl(0_0%_13%)] ${cfg.dotColor} relative`}>
          {cfg.pulse && (
            <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-50" />
          )}
        </div>
      </div>

      {/* Desktop layout: two half-width columns */}
      <div className="hidden md:block w-5/12" />
      <div className="hidden md:block w-[8%]" />

      {/* Card */}
      <motion.div
        ref={ref}
        className={`w-full md:w-5/12 ml-10 md:ml-0 ${isLeft ? "md:order-first" : ""}`}
        initial={{ opacity: 0, x: isLeft ? -48 : 48 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.05 }}
      >
        <div
          className={`border ${cfg.cardBg} ${cfg.cardBorder} p-6 hover:scale-[1.02] transition-transform duration-200 ${cfg.dimmed ? "opacity-55" : ""}`}
          style={{
            borderRadius: 12,
            boxShadow: cfg.dimmed ? undefined : "0 2px 20px hsl(0 0% 0% / 0.25)",
          }}
        >
          <div className="flex items-start justify-between mb-4 gap-3">
            <h3
              className={`text-lg leading-tight ${cfg.headingColor}`}
              style={{ fontFamily: "var(--app-font-display)", letterSpacing: "0.02em" }}
            >
              {phase.phase}
            </h3>
            <span
              className={`text-[10px] font-black uppercase tracking-[0.12em] px-2.5 py-1 rounded-full shrink-0 ${cfg.labelBg} ${cfg.labelText}`}
            >
              {cfg.label}
            </span>
          </div>

          <ul className="space-y-2">
            {phase.flavours.map((f) => (
              <li key={f} className={`flex items-center gap-2.5 text-sm font-medium ${cfg.bodyColor}`}>
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.bulletColor}`} />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

export default function OurStory() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineIsInView = useInView(lineRef, { once: true });

  useEffect(() => {
    track("page_view", { page: "/our-story" });
  }, []);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "roadmap-phase2" }),
      });
      if (!res.ok) throw new Error("Failed to join waitlist");
      track("waitlist_signup", { source: "roadmap-phase2" });
      toast.success("Thanks! We'll keep you updated.");
      setEmail("");
    } catch (err) {
      toast.error("Failed to join waitlist. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://panevo.in" },
        { "@type": "ListItem", position: 2, name: "Our Story", item: "https://panevo.in/our-story" },
      ],
    },
  ];

  return (
    <div className="w-full">
      <SEO
        title="About PANEVO — India's First Pre-Flavoured Paneer Brand"
        description="The story behind PANEVO — India's first pre-flavoured paneer brand from Shatkona Ventures. How a kitchen frustration became a category-defining product."
        structuredData={structuredData}
      />

      {/* HERO */}
      <section className="bg-secondary text-secondary-foreground py-24 text-center">
        <div className="container px-4">
          <Reveal>
            <Shatkona className="w-16 h-16 mx-auto mb-6 text-secondary-foreground" />
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl mb-6">Tradition Transformed.</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-lg sm:text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              The Shatkona is the ancient Indian symbol of union — fire and water, energy and
              nourishment, raw and ready. It's also the story of PANEVO.
            </p>
          </Reveal>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="bg-background py-20 md:py-32">
        <div className="container px-4 max-w-3xl mx-auto prose prose-lg md:prose-xl text-foreground font-sans prose-headings:text-foreground prose-p:text-muted-foreground">
          <Reveal>
            <p className="lead font-medium text-foreground text-2xl">
              We love paneer. Every Indian household does. But we hated the process. The chopping,
              the marination, the messy hands, the 30-minute wait before you even turn on the stove.
              We realised we were treating a convenient protein like a weekend project.
            </p>
          </Reveal>

          <Reveal>
            <blockquote
              className="border-l-4 border-primary pl-6 my-12 text-2xl italic text-foreground"
              style={{ fontFamily: "var(--app-font-display)", letterSpacing: "0.01em" }}
            >
              "Why is the most consumed vegetarian protein in the country still stuck in its raw,
              unseasoned format?"
            </blockquote>
          </Reveal>

          <Reveal>
            <p>
              We looked at the dairy aisle. Ten brands selling the exact same white block. They
              competed on terms like "farm-fresh" and "creamy," but nobody was actually innovating
              the product itself. They were just changing the packaging.
            </p>
          </Reveal>

          <Reveal>
            <p>
              So we started experimenting in our kitchen. We tried marinating, but it only coated
              the surface. We needed the flavour inside. We collaborated with dairy technologists at
              Kamdhenu Hitkari Manch and researchers at ICAR-NDRI Karnal to figure out how to infuse
              real spices into the milk exactly at the point of curdling.
            </p>
          </Reveal>

          <Reveal>
            <div
              className="bg-muted p-8 my-12 border border-border border-l-4 border-l-secondary"
              style={{ borderRadius: 12, boxShadow: "var(--shadow-rest)" }}
            >
              <h3
                className="text-foreground mt-0 uppercase"
                style={{ fontFamily: "var(--app-font-display)", letterSpacing: "0.02em" }}
              >
                DPIIT Recognised
              </h3>
              <p className="mb-0 text-muted-foreground text-base">
                Our innovative infusion process earned PANEVO formal recognition as an innovative
                startup by the Department for Promotion of Industry and Internal Trade (DPIIT),
                Government of India.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <p>
              The result? Oregano that transforms a simple wrap into a café-worthy meal. Red Chilli
              Flakes with deep, sustained heat. Black Pepper that bites back.
            </p>
          </Reveal>

          <Reveal>
            <p>
              We took it to Chitkara University. We set up a tawa, sliced the paneer right out of
              the pack, and pan-fried it with a drop of oil. No masala box. No waiting. Within
              hours, we sold out. 76% of people who tasted it asked where they could buy it weekly.
              That's when we knew we hadn't just made a better paneer; we had fixed the category.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SHATKONA SYMBOL */}
      <section className="bg-secondary text-secondary-foreground py-24 text-center border-t border-border/20">
        <div className="container px-4">
          <Reveal>
            <Shatkona className="w-32 h-32 mx-auto mb-12 text-primary" />
          </Reveal>
          <Reveal delay={120}>
            <h2 className="text-3xl mb-8">The Union of Opposites</h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
              <span className="text-primary font-bold">△ is fire.</span> The heat, the spice, the
              transformation.
              <br />
              <br />
              <span className="text-[#3b82f6] font-bold">▽ is water.</span> The milk, the cool, the
              nourishment.
              <br />
              <br />
              Together: the Shatkona — the union of opposites.
            </p>
          </Reveal>
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-background py-24">
        <div className="container px-4">
          <Reveal>
            <h2 className="text-4xl mb-16 text-center text-foreground">The People Behind the Paneer</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Harviinder",
                title: "Co-Founder",
                bio: "Obsessed with food systems and consumer behavior. Saw the gap in the dairy aisle and decided to build the bridge.",
              },
              {
                name: "Shwetta",
                title: "Co-Founder",
                bio: "The operational force. Turns bold ideas into scalable, consistent products that taste the same in every single pack.",
              },
              {
                name: "Palvit",
                title: "Head of Operations & R&D",
                bio: "The flavour architect. Spends his days balancing milk temperatures and spice densities to achieve the perfect infusion.",
              },
              {
                name: "Sandeep",
                title: "Mentor & Senior Advisor",
                bio: "Industry veteran guiding the strategic vision and institutional partnerships.",
              },
            ].map((member, idx) => (
              <Reveal key={member.name} delay={Math.min(idx, 4) * 80}>
                <div
                  className="card-lift bg-card border border-border overflow-hidden text-center group h-full"
                  style={{ borderRadius: 12, boxShadow: "var(--shadow-rest)" }}
                >
                  <div className="aspect-square bg-muted flex items-center justify-center text-muted-foreground text-4xl font-bold font-serif group-hover:bg-primary/5 transition-colors">
                    {member.name[0]}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl mb-1 text-foreground">{member.name}</h3>
                    <p className="text-primary text-sm font-bold uppercase tracking-wider mb-4">
                      {member.title}
                    </p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP — cinematic animated timeline */}
      <section className="py-28 border-t border-border" style={{ backgroundColor: "hsl(0 0% 11%)" }}>
        <div className="container px-4 max-w-4xl">
          <Reveal>
            <div className="text-center mb-20">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-4">
                Flavour Roadmap
              </p>
              <h2
                className="text-4xl md:text-5xl text-white mb-4"
                style={{ fontFamily: "var(--app-font-display)" }}
              >
                The Bold Roadmap
              </h2>
              <p className="text-white/45 text-lg">
                We're just getting started. Four phases. Twenty flavours. One mission.
              </p>
            </div>
          </Reveal>

          {/* Timeline track */}
          <div className="relative" ref={lineRef}>
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-white/8 overflow-hidden">
              <motion.div
                className="w-full bg-gradient-to-b from-primary via-primary/50 to-transparent"
                initial={{ height: "0%" }}
                animate={lineIsInView ? { height: "100%" } : {}}
                transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
              />
            </div>

            <div className="space-y-12 md:space-y-16">
              {roadmap.map((phase, i) => (
                <TimelineCard key={i} phase={phase} index={i} />
              ))}
            </div>
          </div>

          {/* Phase 2 waitlist */}
          <Reveal>
            <div
              className="mt-20 border p-8 text-center"
              style={{
                borderRadius: 12,
                backgroundColor: "hsl(0 0% 16%)",
                borderColor: "hsl(0 0% 22%)",
              }}
            >
              <p className="text-xs font-black uppercase tracking-[0.15em] text-primary mb-3">
                Early Access
              </p>
              <h3 className="text-xl md:text-2xl text-white mb-2">
                Want to be the first to taste Phase 2?
              </h3>
              <p className="text-white/45 text-sm mb-6">
                Gochujang, Mala, Chipotle-Lime and Za'atar. Sign up to get early access.
              </p>
              <form
                onSubmit={handleWaitlistSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 border text-white placeholder:text-white/35 px-4 py-3 focus:outline-none focus:border-primary"
                  style={{
                    borderRadius: 8,
                    backgroundColor: "hsl(0 0% 20%)",
                    borderColor: "hsl(0 0% 28%)",
                  }}
                />
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="cta-primary bg-primary text-primary-foreground px-6 py-3 font-bold hover:bg-primary/90 transition-colors whitespace-nowrap disabled:opacity-50 notch-br"
                  style={{ borderRadius: 4 }}
                >
                  {isSubmitting ? "Submitting…" : "Notify Me"}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
