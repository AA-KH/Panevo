import { useLocation } from "wouter";
import { QCOM_LINKS } from "@/config/platforms";
import { track } from "@/lib/analytics";

export function StickyBottomBar() {
  const [location] = useLocation();

  if (location === "/subscribe") return null;

  const handleQComClick = (platform: string) => {
    track("qcom_click", { platform, source_page: location, source_element: "sticky_bottom_bar" });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-primary h-14 md:hidden flex border-t border-primary-foreground/10">
      {Object.entries(QCOM_LINKS).map(([platform, url]) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleQComClick(platform)}
          className="flex-1 flex flex-col items-center justify-center border-r last:border-r-0 border-primary-foreground/20 active:bg-primary-foreground/10"
        >
          <span className="text-primary-foreground text-xs font-bold capitalize">{platform}</span>
        </a>
      ))}
    </div>
  );
}
