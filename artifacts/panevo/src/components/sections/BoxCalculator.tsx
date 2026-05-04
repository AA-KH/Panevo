import { useMemo } from "react";
import { Minus, Plus, ShoppingBag, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FLAVOURS = [
  {
    id: "oregano",
    name: "Oregano",
    emoji: "🌿",
    desc: "Aromatic & mild",
    color: "bg-green-700 text-white",
    barColor: "bg-green-600",
    border: "border-green-200",
    activeBorder: "border-green-600",
    activeBg: "bg-green-50",
  },
  {
    id: "red-chilli",
    name: "Red Chilli Flakes",
    emoji: "🌶️",
    desc: "Deep heat",
    color: "bg-red-600 text-white",
    barColor: "bg-red-500",
    border: "border-red-200",
    activeBorder: "border-red-500",
    activeBg: "bg-red-50",
  },
  {
    id: "black-pepper",
    name: "Black Pepper",
    emoji: "🖤",
    desc: "Bold & sharp",
    color: "bg-slate-900 text-white",
    barColor: "bg-slate-800",
    border: "border-slate-300",
    activeBorder: "border-slate-900",
    activeBg: "bg-slate-50",
  },
  {
    id: "surprise",
    name: "Surprise Me",
    emoji: "✨",
    desc: "Mixed rotation",
    color: "bg-amber-500 text-white",
    barColor: "bg-amber-400",
    border: "border-amber-200",
    activeBorder: "border-amber-500",
    activeBg: "bg-amber-50",
  },
];

const PACK_PRICES: Record<string, number> = {
  "200g": 89,
  "500g": 189,
};

const FREQUENCY_CONFIG: Record<string, { label: string; deliveries: number; discount: number }> = {
  weekly: { label: "Weekly", deliveries: 4, discount: 0 },
  fortnightly: { label: "Fortnightly", deliveries: 2, discount: 5 },
  monthly: { label: "Monthly", deliveries: 1, discount: 10 },
};

export interface BoxQuantities {
  [flavourId: string]: number;
}

interface BoxCalculatorProps {
  quantities: BoxQuantities;
  onChange: (quantities: BoxQuantities) => void;
  selectedSize: "200g" | "500g";
  selectedPlan: string;
}

export function BoxCalculator({ quantities, onChange, selectedSize, selectedPlan }: BoxCalculatorProps) {
  const packPrice = PACK_PRICES[selectedSize] ?? 89;
  const freqConfig = FREQUENCY_CONFIG[selectedPlan] ?? FREQUENCY_CONFIG.weekly;

  const totalPacks = useMemo(
    () => Object.values(quantities).reduce((sum, q) => sum + q, 0),
    [quantities]
  );

  const perDeliveryBase = totalPacks * packPrice;
  const discountAmount = Math.round(perDeliveryBase * freqConfig.discount / 100);
  const perDelivery = perDeliveryBase - discountAmount;
  const perMonth = perDelivery * freqConfig.deliveries;

  const handleChange = (id: string, delta: number) => {
    const current = quantities[id] ?? 0;
    const next = Math.max(0, Math.min(5, current + delta));
    onChange({ ...quantities, [id]: next });
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground mb-4">
          Pick how many packs of each flavour you'd like per delivery (up to 5 each). Mix and match freely.
        </p>

        <div className="space-y-3">
          {FLAVOURS.map((f) => {
            const qty = quantities[f.id] ?? 0;
            const isActive = qty > 0;

            return (
              <motion.div
                key={f.id}
                layout
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-colors ${
                  isActive ? `${f.activeBorder} ${f.activeBg}` : `${f.border} bg-background`
                }`}
              >
                <div className={`w-10 h-10 rounded-full ${f.color} flex items-center justify-center text-lg shrink-0 shadow-sm`}>
                  {f.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-foreground text-sm">{f.name}</div>
                  <div className="text-xs text-muted-foreground">{f.desc}</div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => handleChange(f.id, -1)}
                    disabled={qty === 0}
                    aria-label={`Remove ${f.name}`}
                    className="w-8 h-8 rounded-full border-2 border-border bg-background flex items-center justify-center text-foreground hover:border-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <motion.span
                    key={qty}
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                    className="w-6 text-center font-bold text-lg tabular-nums text-foreground"
                  >
                    {qty}
                  </motion.span>
                  <button
                    onClick={() => handleChange(f.id, +1)}
                    disabled={qty === 5}
                    aria-label={`Add ${f.name}`}
                    className="w-8 h-8 rounded-full border-2 border-foreground bg-foreground text-background flex items-center justify-center hover:bg-foreground/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Visual flavour bar */}
      <AnimatePresence>
        {totalPacks > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Your mix</p>
            <div className="flex rounded-full overflow-hidden h-3 gap-0.5">
              {FLAVOURS.map((f) => {
                const qty = quantities[f.id] ?? 0;
                if (qty === 0) return null;
                const pct = (qty / totalPacks) * 100;
                return (
                  <motion.div
                    key={f.id}
                    initial={{ flexGrow: 0 }}
                    animate={{ flexGrow: pct }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className={`${f.barColor} rounded-full`}
                    title={`${f.name}: ${qty} pack${qty > 1 ? "s" : ""}`}
                    style={{ flexGrow: pct }}
                  />
                );
              })}
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              {FLAVOURS.filter((f) => (quantities[f.id] ?? 0) > 0).map((f) => (
                <span key={f.id} className="text-xs text-muted-foreground">
                  {f.emoji} {quantities[f.id]}× {f.name}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live price summary */}
      <AnimatePresence>
        {totalPacks > 0 ? (
          <motion.div
            key="price"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="bg-foreground text-background rounded-xl p-5 space-y-3"
          >
            <div className="flex items-center gap-2 mb-1">
              <ShoppingBag className="w-4 h-4 opacity-70" />
              <span className="text-sm font-bold uppercase tracking-widest opacity-70">Your box summary</span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-sm opacity-70">{totalPacks} pack{totalPacks > 1 ? "s" : ""} × ₹{packPrice}</span>
              <span className="font-bold tabular-nums">₹{perDeliveryBase}</span>
            </div>

            {freqConfig.discount > 0 && (
              <div className="flex justify-between items-baseline text-green-400">
                <span className="text-sm">{freqConfig.label} discount ({freqConfig.discount}% off)</span>
                <span className="font-bold tabular-nums">−₹{discountAmount}</span>
              </div>
            )}

            <div className="border-t border-white/20 pt-3 flex justify-between items-baseline">
              <span className="font-bold">Per delivery</span>
              <motion.span
                key={perDelivery}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold tabular-nums"
                style={{ fontFamily: "var(--app-font-display)" }}
              >
                ₹{perDelivery}
              </motion.span>
            </div>

            <div className="flex justify-between items-baseline opacity-70">
              <span className="text-sm">{freqConfig.deliveries} delivery/month · ~₹{Math.round(perMonth / totalPacks / packPrice * packPrice)} per pack</span>
              <span className="font-bold tabular-nums">₹{perMonth}/mo</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="border-2 border-dashed border-border rounded-xl p-6 text-center text-muted-foreground"
          >
            <Sparkles className="w-6 h-6 mx-auto mb-2 opacity-40" />
            <p className="text-sm">Add flavours above to see your price</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function flavoursFromQuantities(quantities: BoxQuantities): string[] {
  return FLAVOURS.filter((f) => (quantities[f.id] ?? 0) > 0).map((f) => f.name);
}
