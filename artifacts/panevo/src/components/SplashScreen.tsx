import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onDone: () => void;
}

export function SplashScreen({ onDone }: SplashScreenProps) {
  const [phase, setPhase] = useState<"enter" | "hold" | "drift" | "exit">("enter");

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { onDone(); return; }
    const t1 = setTimeout(() => setPhase("hold"),  700);
    const t2 = setTimeout(() => setPhase("drift"), 1900);
    const t3 = setTimeout(() => setPhase("exit"),  2650);
    const t4 = setTimeout(onDone, 3100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onDone]);

  const isDrift = phase === "drift" || phase === "exit";
  const isVisible = phase === "hold" || phase === "drift";

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#F9F5EC" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } }}
          transition={{ duration: 0.4 }}
        >
          {/* Subtle warm radial bloom — like sunlight through cream */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{
              background:
                "radial-gradient(ellipse 65% 65% at 50% 52%, hsl(35 80% 78% / 0.45) 0%, hsl(17 89% 55% / 0.12) 45%, transparent 72%)",
            }}
          />

          {/* Upward triangle (Fire △) — drifts gently upward */}
          <motion.div
            className="absolute"
            initial={{ opacity: 0, y: 4, scale: 0.88 }}
            animate={
              isDrift
                ? { opacity: 0, y: -220, x: 18, rotate: 30, scale: 1.18,
                    transition: { duration: 0.85, ease: [0.32, 0, 0.67, 0] } }
                : { opacity: phase === "enter" ? 0 : 1, y: 0, x: 0, rotate: 0, scale: 1,
                    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
            }
          >
            <svg viewBox="0 0 100 100" className="w-36 h-36 sm:w-44 sm:h-44" fill="none">
              <polygon
                points="50,10 90,80 10,80"
                stroke="hsl(17 89% 40%)"
                strokeWidth="3"
                strokeLinejoin="round"
                fill="hsl(17 89% 40% / 0.05)"
              />
            </svg>
          </motion.div>

          {/* Downward triangle (Water ▽) — drifts gently downward */}
          <motion.div
            className="absolute"
            initial={{ opacity: 0, y: -4, scale: 0.88 }}
            animate={
              isDrift
                ? { opacity: 0, y: 220, x: -18, rotate: -30, scale: 1.18,
                    transition: { duration: 0.85, ease: [0.32, 0, 0.67, 0] } }
                : { opacity: phase === "enter" ? 0 : 1, y: 0, x: 0, rotate: 0, scale: 1,
                    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.07 } }
            }
          >
            <svg viewBox="0 0 100 100" className="w-36 h-36 sm:w-44 sm:h-44" fill="none">
              <polygon
                points="50,90 10,20 90,20"
                stroke="hsl(17 89% 40%)"
                strokeWidth="3"
                strokeLinejoin="round"
                fill="hsl(17 89% 40% / 0.05)"
              />
            </svg>
          </motion.div>

          {/* PANEVO wordmark */}
          <motion.div
            className="absolute"
            style={{ top: "calc(50% + 96px)" }}
            initial={{ opacity: 0, y: 6 }}
            animate={
              isDrift
                ? { opacity: 0, y: 18, transition: { duration: 0.4, ease: "easeIn" } }
                : { opacity: phase === "enter" ? 0 : 0.85, y: 0,
                    transition: { duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] } }
            }
          >
            <span
              className="text-3xl sm:text-4xl select-none"
              style={{
                fontFamily: "var(--app-font-display)",
                letterSpacing: "0.22em",
                color: "hsl(17 89% 35%)",
              }}
            >
              PANEVO
            </span>
          </motion.div>

          {/* Tagline beneath wordmark */}
          <motion.div
            className="absolute"
            style={{ top: "calc(50% + 148px)" }}
            initial={{ opacity: 0 }}
            animate={
              isDrift
                ? { opacity: 0, transition: { duration: 0.3 } }
                : { opacity: phase === "enter" ? 0 : 0.5,
                    transition: { duration: 0.5, delay: 0.32, ease: "easeOut" } }
            }
          >
            <span
              className="text-xs sm:text-sm select-none tracking-[0.25em] uppercase"
              style={{ color: "hsl(17 50% 45%)", fontFamily: "var(--app-font-display)" }}
            >
              Made in India
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
