import { ShieldCheck, Truck, Sparkles, Heart } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const ITEMS = [
  {
    icon: Truck,
    stat: "10 min",
    label: "Q-Commerce delivery",
  },
  {
    icon: Heart,
    stat: "76%",
    label: "First-time tasters reorder",
  },
  {
    icon: Sparkles,
    stat: "0",
    label: "Preservatives, ever",
  },
  {
    icon: ShieldCheck,
    stat: "FSSAI",
    label: "Licensed & cold-chain handled",
  },
];

export function TrustStrip() {
  return (
    <section
      aria-label="Trust signals"
      className="bg-background border-y border-border/60"
    >
      <div className="container px-4 py-6 md:py-8">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-2 list-none p-0 m-0">
          {ITEMS.map(({ icon: Icon, stat, label }, i) => (
            <Reveal key={label} delay={i * 50}>
              <li className="flex items-center gap-3 md:justify-center">
                <span className="bg-primary/10 text-primary p-2 rounded-full shrink-0">
                  <Icon className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </span>
                <div className="leading-tight">
                  <div
                    className="text-foreground font-bold tabnums"
                    style={{ fontFamily: "var(--app-font-display)", letterSpacing: "0.02em" }}
                  >
                    {stat}
                  </div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
