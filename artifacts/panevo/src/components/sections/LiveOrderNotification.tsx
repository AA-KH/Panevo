import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";

const NOTIFICATIONS = [
  { name: "Priya", city: "Chandigarh", item: "Black Pepper 500g" },
  { name: "Rahul", city: "Gurgaon", item: "Oregano 500g" },
  { name: "Sneha", city: "Mohali", item: "Red Chilli Flakes 200g" },
  { name: "Arjun", city: "Panchkula", item: "Weekly box · 2 flavours" },
  { name: "Meera", city: "Chandigarh", item: "Oregano 200g" },
  { name: "Dev", city: "Gurgaon", item: "Black Pepper 200g" },
];

export function LiveOrderNotification() {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const showNext = (i: number) => {
      setIndex(i % NOTIFICATIONS.length);
      setVisible(true);
      setTimeout(() => setVisible(false), 3200);
    };

    const initial = setTimeout(() => showNext(0), 3500);
    const interval = setInterval(() => {
      setIndex(prev => {
        const next = (prev + 1) % NOTIFICATIONS.length;
        setVisible(true);
        setTimeout(() => setVisible(false), 3200);
        return next;
      });
    }, 7000);

    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, []);

  const n = NOTIFICATIONS[index];

  return (
    <div className="absolute bottom-8 left-4 sm:left-8 z-20 pointer-events-none" aria-live="polite" aria-atomic="true">
      <AnimatePresence>
        {visible && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="flex items-center gap-3 bg-card/90 backdrop-blur-sm border border-border/60 rounded-xl px-4 py-3 shadow-lg max-w-[240px]"
          >
            <span className="w-8 h-8 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
              <ShoppingBag className="w-4 h-4" />
            </span>
            <div className="leading-tight">
              <p className="text-xs font-bold text-foreground">{n.name} in {n.city}</p>
              <p className="text-xs text-muted-foreground">just ordered {n.item}</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-green-400 shrink-0 animate-pulse" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
