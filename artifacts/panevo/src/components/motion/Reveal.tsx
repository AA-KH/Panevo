import { useReveal } from "@/hooks/useReveal";
import { CSSProperties, ElementType, ReactNode } from "react";

interface RevealProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  style?: CSSProperties;
  id?: string;
}

export function Reveal({
  as: Tag = "div",
  children,
  className = "",
  delay = 0,
  threshold = 0.15,
  style,
  id,
}: RevealProps) {
  const ref = useReveal<HTMLElement>({ threshold });
  return (
    <Tag
      ref={ref as any}
      id={id}
      className={`reveal ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
    >
      {children}
    </Tag>
  );
}

interface StaggerChildrenProps {
  children: ReactNode;
  step?: number;
  className?: string;
  startDelay?: number;
}

/**
 * Wraps children in Reveals with incrementing delays. Pass plain elements (not Reveal).
 */
export function StaggerReveal({ children, step = 80, className, startDelay = 0 }: StaggerChildrenProps) {
  const arr = Array.isArray(children) ? children : [children];
  const capped = Math.min(arr.length, 5); // cap stagger chain per spec §8.7
  return (
    <>
      {arr.map((child, i) => (
        <Reveal key={i} delay={startDelay + Math.min(i, capped - 1) * step} className={className}>
          {child}
        </Reveal>
      ))}
    </>
  );
}
