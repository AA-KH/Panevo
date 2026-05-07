import { SEO } from "@/components/SEO";
import { Shatkona } from "@/components/sections/Shatkona";
import { roadmap } from "@/data/roadmap";
import { useState, useEffect, useRef } from "react";
import { track } from "@/lib/analytics";
import { toast } from "sonner";
import { Reveal } from "@/components/motion/Reveal";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChalkCowHead, ChalkHerbs, ChalkMilkSplash, ChalkStarburst } from "@/components/sections/ChalkIllustrations";

const STORY_SLIDES = [
  {
    label: "ORIGIN",
    heading: "Tradition",
    headingAccent: "Transformed.",
    sub: "India's most-loved protein — reimagined from the ground up for the modern kitchen.",
    color: "#9A3412",
    colorDark: "#7C2D12",
    rgba: "154, 52, 18",
    shapes: [
      { size: 120, top: "12%", left: "8%", opacity: 0.13, delay: 0 },
      { size: 60, top: "70%", left: "85%", opacity: 0.1, delay: 0.3 },
      { size: 36, top: "30%", left: "78%", opacity: 0.18, delay: 0.15 },
    ],
  },
  {
    label: "INCUBATION",
    heading: "NDRI",
    headingAccent: "Incubated.",
    sub: "Backed by ICAR-NDRI — India's most trusted dairy research institute. Science-first, always.",
    color: "#1E40AF",
    colorDark: "#1E3A8A",
    rgba: "30, 64, 175",
    shapes: [
      { size: 90, top: "18%", left: "80%", opacity: 0.12, delay: 0.1 },
      { size: 50, top: "65%", left: "6%", opacity: 0.15, delay: 0.25 },
      { size: 28, top: "45%", left: "90%", opacity: 0.2, delay: 0 },
    ],
  },
  {
    label: "VALIDATION",
    heading: "Process",
    headingAccent: "Validated.",
    sub: "Every bite tested. Every batch certified. Held to the highest dairy standards — no exceptions.",
    color: "#6B21A8",
    colorDark: "#581C87",
    rgba: "107, 33, 168",
    shapes: [
      { size: 100, top: "8%", left: "75%", opacity: 0.11, delay: 0.2 },
      { size: 44, top: "72%", left: "10%", opacity: 0.16, delay: 0 },
      { size: 22, top: "38%", left: "5%", opacity: 0.22, delay: 0.35 },
    ],
  },
  {
    label: "QUALITY",
    heading: "Quality",
    headingAccent: "Assured.",
    sub: "From the first drop of milk to the seal on your pack — consistent, clean, certified.",
    color: "#166534",
    colorDark: "#14532D",
    rgba: "22, 101, 52",
    shapes: [
      { size: 80, top: "15%", left: "82%", opacity: 0.14, delay: 0.05 },
      { size: 55, top: "68%", left: "7%", opacity: 0.12, delay: 0.2 },
      { size: 32, top: "28%", left: "12%", opacity: 0.2, delay: 0.4 },
    ],
  },
];

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
  const [storyIndex, setStoryIndex] = useState(0);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineIsInView = useInView(lineRef, { once: true });

  useEffect(() => {
    track("page_view", { page: "/our-story" });
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setStoryIndex((i) => (i + 1) % STORY_SLIDES.length);
    }, 5000);
    return () => clearInterval(id);
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

      {/* HERO — animated ticker */}
      <section className="relative bg-secondary text-secondary-foreground overflow-hidden" style={{ minHeight: "85vh" }}>

        {/* Animated background gradient per slide */}
        <AnimatePresence>
          <motion.div
            key={`story-bg-${storyIndex}`}
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8 }}
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 50% -10%, rgba(${STORY_SLIDES[storyIndex].rgba}, 0.28), transparent 65%),
                radial-gradient(ellipse 50% 40% at 95% 80%, rgba(${STORY_SLIDES[storyIndex].rgba}, 0.10), transparent 60%)
              `,
            }}
          />
        </AnimatePresence>

        {/* Giant watermark label behind everything */}
        <AnimatePresence mode="wait">
          <motion.span
            key={`watermark-${storyIndex}`}
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--app-font-display)",
              fontSize: "clamp(6rem, 22vw, 22rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: `rgba(${STORY_SLIDES[storyIndex].rgba}, 0.07)`,
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {STORY_SLIDES[storyIndex].label}
          </motion.span>
        </AnimatePresence>

        {/* Floating geometric circles */}
        <AnimatePresence>
          {STORY_SLIDES[storyIndex].shapes.map((shape, si) => (
            <motion.div
              key={`shape-${storyIndex}-${si}`}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: shape.size,
                height: shape.size,
                top: shape.top,
                left: shape.left,
                background: `rgba(${STORY_SLIDES[storyIndex].rgba}, ${shape.opacity})`,
                border: `1.5px solid rgba(${STORY_SLIDES[storyIndex].rgba}, ${shape.opacity * 1.6})`,
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.8, delay: shape.delay, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </AnimatePresence>

        <div
          className="container px-4 relative z-10 flex flex-col items-center justify-center text-center"
          style={{ minHeight: "85vh", paddingTop: "7rem", paddingBottom: "5rem" }}
        >
          {/* Shatkona logo */}
          <Reveal>
            <Shatkona className="w-14 h-14 mx-auto mb-8 text-secondary-foreground/80" />
          </Reveal>


          {/* Two-part heading: white + coloured accent word */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`story-heading-${storyIndex}`}
              className="leading-[1.0] text-secondary-foreground mb-6 max-w-4xl"
              style={{ fontSize: "clamp(3.5rem, 12vw, 8rem)" }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            >
              <div className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                >
                  {STORY_SLIDES[storyIndex].heading}
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  className="block"
                  style={{ color: STORY_SLIDES[storyIndex].color }}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                >
                  {STORY_SLIDES[storyIndex].headingAccent}
                </motion.span>
              </div>
            </motion.h1>
          </AnimatePresence>

          {/* Coloured accent divider line */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`divider-${storyIndex}`}
              className="mb-6 rounded-full"
              style={{
                height: 3,
                background: `linear-gradient(90deg, transparent, ${STORY_SLIDES[storyIndex].color}, transparent)`,
              }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 120, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            />
          </AnimatePresence>

          {/* Sub text */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`story-sub-${storyIndex}`}
              className="text-lg sm:text-xl text-secondary-foreground/65 max-w-md mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, delay: 0.28 }}
            >
              {STORY_SLIDES[storyIndex].sub}
            </motion.p>
          </AnimatePresence>

          {/* Slide dot + progress controls */}
          <div className="flex items-center gap-3 mt-12">
            {STORY_SLIDES.map((s, i) => (
              <button
                key={i}
                onClick={() => setStoryIndex(i)}
                aria-label={s.label}
                className="relative rounded-full overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition-all duration-300"
                style={{
                  width: i === storyIndex ? 44 : 10,
                  height: 10,
                  backgroundColor: i === storyIndex ? "transparent" : "rgba(255,255,255,0.2)",
                  border: i === storyIndex ? `1.5px solid rgba(${s.rgba}, 0.6)` : "none",
                }}
              >
                {i === storyIndex && (
                  <motion.div
                    key={`story-bar-${storyIndex}`}
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ backgroundColor: s.color, transformOrigin: "left center" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 5, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="bg-background py-20 md:py-32 relative overflow-hidden">
        {/* Large faint cow head — far right, halfway down */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none hidden xl:block" aria-hidden="true">
          <ChalkCowHead className="w-72 h-72 text-foreground opacity-[0.04]" />
        </div>
        {/* Herb cluster — left side, lower */}
        <div className="absolute left-0 bottom-16 pointer-events-none hidden lg:block" aria-hidden="true">
          <ChalkHerbs className="w-32 h-36 text-foreground opacity-[0.05]" />
        </div>
        <div className="container px-4 max-w-3xl mx-auto prose prose-lg md:prose-xl text-foreground font-sans prose-headings:text-foreground prose-p:text-muted-foreground">
          <Reveal>
            <p className="lead font-medium text-foreground text-2xl">
              We love paneer. Every Indian household does. But we hated the process. The chopping,
              the marination, the messy hands, the 30-minute wait before you even turn on the stove.
              We realised we were treating a great protein like a weekend project.
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
              So we started experimenting in our kitchen. We tried marinating, but it only coated the
              surface. We needed the flavour inside. We collaborated with dairy technologists and
              researchers at <span className="text-foreground font-bold">ICAR-NDRI</span> (Indian Council of Agricultural Research - National Dairy
              Research Institute) to figure out how to infuse real spices into the milk exactly at the
              point of curdling.
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
              The result? <span className="text-foreground font-bold">Oregano</span> that transforms a simple wrap. <span className="text-foreground font-bold">Black Pepper</span> that bites back. <span className="text-foreground font-bold">Red Chilli Flakes</span> with deep, sustained heat.
            </p>
          </Reveal>

          <Reveal>
            <p>
              We then took it to market test — sliced the paneer right out of the pack. No masala box.
              No waiting. Within hours, we sold out. 76% of people who tasted it asked where they
              could buy it daily or weekly. That's when we knew we hadn't just made a better paneer;
              we had fixed the category.
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-16 pt-16 border-t border-border">
              <p className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                PANEVO is not improving paneer — it is redefining how India consumes it.
              </p>
              <p className="text-primary font-bold uppercase tracking-widest text-sm mt-4">
                The answer for CATEGORY EVOLUTION
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SHATKONA SYMBOL */}
      <section className="bg-secondary text-secondary-foreground py-24 text-center border-t border-border/20 relative overflow-hidden">
        {/* Milk splash — top-right corner accent */}
        <div className="absolute top-6 right-8 pointer-events-none hidden md:block" aria-hidden="true">
          <ChalkMilkSplash className="w-16 h-20 text-secondary-foreground opacity-[0.12]" />
        </div>
        <div className="absolute bottom-6 left-8 pointer-events-none hidden md:block" aria-hidden="true">
          <ChalkStarburst className="w-8 h-8 text-secondary-foreground opacity-[0.12]" />
        </div>
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
                title: "Business & Partnerships",
                bio: "Drives PANEVO's business strategy, partnerships, and institutional relationships — turning bold ideas into operational reality.",
              },
              {
                name: "Shweta",
                title: "Branding & Marketing",
                bio: "The creative force behind PANEVO's identity, crafting the brand's voice, visual world, and consumer story — making sure every pack, post, and product leaves a lasting impression.",
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
