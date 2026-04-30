import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export type Testimonial = {
  text: string;
  author: string;
  loc: string;
  flavour?: string;
};

interface Props {
  testimonials: Testimonial[];
  autoplayMs?: number;
}

export function TestimonialsCarousel({ testimonials, autoplayMs = 6000 }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const goTo = useCallback(
    (next: number) => {
      const total = testimonials.length;
      setIndex(((next % total) + total) % total);
    },
    [testimonials.length]
  );

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (paused || reduceMotion || testimonials.length <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, autoplayMs);
    return () => clearInterval(t);
  }, [paused, reduceMotion, autoplayMs, testimonials.length]);

  const current = testimonials[index];

  return (
    <div
      className="relative max-w-3xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      <div
        className="relative bg-card border border-border overflow-hidden min-h-[260px] md:min-h-[220px] p-8 md:p-12"
        style={{ borderRadius: 16, boxShadow: "var(--shadow-rest)" }}
      >
        <Quote
          className="absolute top-6 left-6 w-12 h-12 text-primary/10"
          strokeWidth={1}
          aria-hidden="true"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative z-10"
            aria-live="polite"
          >
            <p className="text-foreground text-lg md:text-xl font-medium leading-relaxed mb-6 pl-2 md:pl-6">
              "{current.text}"
            </p>
            <div className="flex items-center gap-3 pl-2 md:pl-6">
              <div
                className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold uppercase"
                style={{ fontFamily: "var(--app-font-display)" }}
                aria-hidden="true"
              >
                {current.author.charAt(0)}
              </div>
              <div className="leading-tight">
                <div className="font-bold text-foreground">{current.author}</div>
                <div className="text-sm text-muted-foreground">
                  {current.loc}
                  {current.flavour ? ` · ${current.flavour}` : ""}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6 px-2">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous testimonial"
          className="bg-card border border-border p-2 rounded-full text-foreground hover:bg-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2" role="tablist">
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              type="button"
              aria-selected={i === index}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => goTo(i)}
              className={`transition-all rounded-full ${
                i === index
                  ? "bg-primary w-6 h-2"
                  : "bg-border hover:bg-muted-foreground/40 w-2 h-2"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next testimonial"
          className="bg-card border border-border p-2 rounded-full text-foreground hover:bg-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
