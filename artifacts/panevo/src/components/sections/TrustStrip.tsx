import { ShieldCheck, Truck, Sparkles, Heart } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

interface StatItemProps {
  icon: React.ElementType;
  numericValue?: number;
  suffix?: string;
  prefix?: string;
  staticStat?: string;
  label: string;
  delay?: number;
}

function StatItem({ icon: Icon, numericValue, suffix = "", prefix = "", staticStat, label, delay = 0 }: StatItemProps) {
  const revealRef = useReveal<HTMLLIElement>({ threshold: 0.4 });
  const { ref: countRef, value } = useCountUp(numericValue ?? 0, 1000);

  return (
    <li
      ref={revealRef as React.Ref<HTMLLIElement>}
      className="reveal flex items-center gap-3 md:justify-center"
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      <span className="bg-primary/10 text-primary p-2 rounded-full shrink-0">
        <Icon className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
      </span>
      <div className="leading-tight">
        <div
          ref={numericValue !== undefined ? (countRef as React.Ref<HTMLDivElement>) : undefined}
          className="text-foreground font-bold tabnums"
          style={{ fontFamily: "var(--app-font-display)", letterSpacing: "0.02em" }}
        >
          {staticStat ?? `${prefix}${value}${suffix}`}
        </div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </li>
  );
}

export function TrustStrip() {
  return (
    <section aria-label="Trust signals" className="bg-background border-y border-border/60">
      <div className="container px-4 py-6 md:py-8">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-2 list-none p-0 m-0">
          <StatItem icon={Sparkles} staticStat="NDRI Incubated" label="Made with science and love" delay={0} />
          <StatItem icon={Sparkles} numericValue={0} label="Preservatives, ever" delay={50} />
          <StatItem icon={Heart} numericValue={76} suffix="%" label="First-time tasters reorder" delay={100} />
          <StatItem icon={Truck} numericValue={10} suffix=" min" label="Q-Commerce delivery" delay={150} />
        </ul>
      </div>
    </section>
  );
}
