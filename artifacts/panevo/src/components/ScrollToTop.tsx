import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Scrolls the window to the top whenever the route (pathname) changes.
 * If the URL contains a hash (e.g. /products#tikka-mix), the browser's
 * native anchor behaviour is preserved and we skip the auto-scroll.
 */
export function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return null;
}
