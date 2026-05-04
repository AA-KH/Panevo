import { useLocation } from "wouter";
import { QCOM_LINKS } from "@/config/brand";
import { track } from "@/lib/analytics";
import { QComIcon } from "@/components/sections/QComIcon";

export function StickyBottomBar() {
  const [location] = useLocation();

  if (location === "/subscribe" || location === "/subscribe/thank-you") return null;

  const handleQComClick = (platform: string) => {
    track("qcom_click", { platform, source_page: location, source_element: "sticky_bottom_bar" });
  };

  return (
    <nav
      role="navigation"
      aria-label="Quick order"
      className="sticky-bottom-bar fixed bottom-0 left-0 right-0 bg-primary md:hidden flex border-t border-primary-foreground/10"
      style={{
        minHeight: 64,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        zIndex: 100,
        boxShadow: "var(--shadow-nav)",
      }}
    >
      {Object.entries(QCOM_LINKS).map(([platform, url]) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleQComClick(platform)}
          className="qcom-shimmer flex-1 flex flex-col items-center justify-center gap-1 border-r last:border-r-0 border-primary-foreground/20 active:bg-primary-foreground/10 outline-none focus-visible:bg-primary-foreground/10 min-h-[64px]"
          aria-label={`Order on ${platform}`}
        >
          <QComIcon platform={platform} size="sm" />
          <span className="text-primary-foreground text-[10px] uppercase tracking-wider font-bold leading-none">
            {platform === "instamart" ? "Instamart" : platform.charAt(0).toUpperCase() + platform.slice(1)}
          </span>
        </a>
      ))}
    </nav>
  );
}
