import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onDone: () => void;
}

export function SplashScreen({ onDone }: SplashScreenProps) {
  const [phase, setPhase] = useState<"enter" | "hold" | "split" | "exit">("enter");

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      onDone();
      return;
    }
    const t1 = setTimeout(() => setPhase("hold"), 500);
    const t2 = setTimeout(() => setPhase("split"), 1100);
    const t3 = setTimeout(() => setPhase("exit"), 1850);
    const t4 = setTimeout(onDone, 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onDone]);

  const isSplit = phase === "split" || phase === "exit";

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "hsl(0 0% 10%)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeIn" } }}
          transition={{ duration: 0.35 }}
        >
          {/* Orange radial glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "enter" ? 0 : phase === "hold" ? 0.55 : 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: "radial-gradient(ellipse 60% 60% at 50% 50%, hsl(17 89% 40% / 0.7) 0%, transparent 70%)",
            }}
          />

          {/* Upward triangle (Fire △) */}
          <motion.div
            className="absolute"
            initial={{ opacity: 0, y: 0, rotate: 0, scale: 0.85 }}
            animate={
              isSplit
                ? { opacity: 0, y: -280, rotate: 150, scale: 1.5, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } }
                : { opacity: phase === "enter" ? 0 : 1, y: 0, rotate: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
            }
          >
            <svg
              viewBox="0 0 100 100"
              className="w-36 h-36 sm:w-44 sm:h-44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="50,10 90,80 10,80"
                stroke="hsl(17 89% 40%)"
                strokeWidth="3.5"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </motion.div>

          {/* Downward triangle (Water ▽) */}
          <motion.div
            className="absolute"
            initial={{ opacity: 0, y: 0, rotate: 0, scale: 0.85 }}
            animate={
              isSplit
                ? { opacity: 0, y: 280, rotate: -150, scale: 1.5, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } }
                : { opacity: phase === "enter" ? 0 : 1, y: 0, rotate: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut", delay: 0.06 } }
            }
          >
            <svg
              viewBox="0 0 100 100"
              className="w-36 h-36 sm:w-44 sm:h-44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="50,90 10,20 90,20"
                stroke="hsl(17 89% 40%)"
                strokeWidth="3.5"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </motion.div>

          {/* Brand name beneath logo */}
          <motion.div
            className="absolute"
            style={{ top: "calc(50% + 90px)" }}
            initial={{ opacity: 0, y: 8 }}
            animate={
              isSplit
                ? { opacity: 0, y: 20, transition: { duration: 0.3 } }
                : { opacity: phase === "enter" ? 0 : 0.9, y: 0, transition: { duration: 0.4, delay: 0.15 } }
            }
          >
            <span
              className="text-3xl sm:text-4xl tracking-[0.2em] text-white/90 select-none"
              style={{ fontFamily: "var(--app-font-display)" }}
            >
              PANEVO
            </span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
