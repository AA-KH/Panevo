interface QComIconProps {
  platform: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const PLATFORM_CONFIG: Record<string, { bg: string; text: string; label: string; letter: string }> = {
  blinkit: {
    bg: "#F7E200",
    text: "#1A1A1A",
    label: "Blinkit",
    letter: "B",
  },
  zepto: {
    bg: "#9B30FF",
    text: "#ffffff",
    label: "Zepto",
    letter: "Z",
  },
  instamart: {
    bg: "#FC8019",
    text: "#ffffff",
    label: "Instamart",
    letter: "I",
  },
};

const SIZE_MAP = {
  sm: { outer: "w-7 h-7", text: "text-xs" },
  md: { outer: "w-9 h-9", text: "text-sm" },
  lg: { outer: "w-12 h-12", text: "text-base" },
};

export function QComIcon({ platform, size = "md", className = "" }: QComIconProps) {
  const cfg = PLATFORM_CONFIG[platform.toLowerCase()];
  if (!cfg) return null;
  const sz = SIZE_MAP[size];

  return (
    <span
      className={`${sz.outer} rounded-lg flex items-center justify-center font-black shrink-0 ${sz.text} ${className}`}
      style={{ backgroundColor: cfg.bg, color: cfg.text }}
      aria-hidden="true"
      title={cfg.label}
    >
      {cfg.letter}
    </span>
  );
}

export function QComLabel({ platform }: { platform: string }) {
  const cfg = PLATFORM_CONFIG[platform.toLowerCase()];
  return <>{cfg?.label ?? platform}</>;
}
