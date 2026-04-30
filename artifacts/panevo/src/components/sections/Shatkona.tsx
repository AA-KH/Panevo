import React from "react";
import { cn } from "@/lib/utils";

interface ShatkonaProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function Shatkona({ className, ...props }: ShatkonaProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-12 h-12 text-current", className)}
      {...props}
    >
      {/* Upward Triangle (Fire) */}
      <polygon points="50,10 90,80 10,80" stroke="currentColor" strokeWidth="4" fill="none" />
      {/* Downward Triangle (Water) */}
      <polygon points="50,90 10,20 90,20" stroke="currentColor" strokeWidth="4" fill="none" />
    </svg>
  );
}
