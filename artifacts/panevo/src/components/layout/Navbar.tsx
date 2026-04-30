import { Link, useLocation } from "wouter";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { QCOM_LINKS, BRAND } from "@/config/brand";
import { track } from "@/lib/analytics";

export function Navbar() {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileQcomOpen, setIsMobileQcomOpen] = useState(false);
  const [navState, setNavState] = useState<"top" | "visible" | "hidden">("top");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 8) {
        setNavState("top");
      } else if (y < lastScrollY.current) {
        setNavState("visible");
      } else if (y > lastScrollY.current && y > 80) {
        setNavState("hidden");
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while mobile menu open
  useEffect(() => {
    if (!isMobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileOpen]);

  // Close menus on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setIsDropdownOpen(false);
    setIsMobileQcomOpen(false);
  }, [location]);

  const links = [
    { href: "/products", label: "Products" },
    { href: "/nutrition", label: "Nutrition" },
    { href: "/subscribe", label: "Subscribe" },
    { href: "/recipes", label: "Recipes" },
    { href: "/our-story", label: "Our Story" },
    { href: "/find-us", label: "Find Us" },
  ];

  const handleQComClick = (platform: string) => {
    track("qcom_click", { platform, source_page: location, source_element: "navbar" });
  };

  const navTransform =
    navState === "hidden" ? "-translate-y-full" : "translate-y-0";
  const navShadow = navState === "top" ? "" : "shadow-[var(--shadow-nav)]";

  return (
    <nav
      aria-label="Main"
      className={`sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 transition-transform duration-200 ${navTransform} ${navShadow}`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          onClick={() => {
            if (location === "/") {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          aria-label={`${BRAND.name} — Home`}
        >
          <span
            className="text-2xl tracking-tight text-foreground"
            style={{ fontFamily: "var(--app-font-display)" }}
          >
            {BRAND.name}
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = location === link.href || location.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-sm font-medium text-foreground hover:text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary rounded ${isActive ? "is-active text-primary" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="cta-primary flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 font-bold text-sm notch-br outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{ borderRadius: 4 }}
              aria-expanded={isDropdownOpen}
            >
              Order Now <ChevronDown className="w-4 h-4 cta-arrow" />
            </button>

            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-52 bg-card border border-border py-1 flex flex-col z-50"
                style={{ borderRadius: 8, boxShadow: "var(--shadow-hover)" }}
              >
                {Object.entries(QCOM_LINKS).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      handleQComClick(platform);
                      setIsDropdownOpen(false);
                    }}
                    className="qcom-shimmer px-4 py-2 text-sm text-foreground hover:bg-muted capitalize outline-none focus-visible:bg-muted"
                  >
                    Order on {platform}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setIsMobileQcomOpen(true)}
            className="cta-primary bg-primary text-primary-foreground px-4 py-2 font-bold text-xs notch-br outline-none focus-visible:ring-2 focus-visible:ring-primary"
            style={{ borderRadius: 4 }}
          >
            Order
          </button>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary rounded p-1"
            aria-label="Toggle menu"
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Full-screen Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-secondary text-secondary-foreground flex flex-col p-6 md:hidden overflow-y-auto">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className="text-3xl py-4 border-b border-white/15 outline-none focus-visible:text-primary"
              style={{ fontFamily: "var(--app-font-display)", letterSpacing: "0.02em" }}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setIsMobileQcomOpen(true);
              setIsMobileOpen(false);
            }}
            className="mt-8 cta-primary bg-primary text-primary-foreground py-4 font-bold text-lg notch-br"
            style={{ borderRadius: 4 }}
          >
            Order Now →
          </button>
          <div className="flex-1" />
          <p className="text-sm opacity-70 mt-12">Made in India ✦ Delivered in 10 minutes</p>
        </div>
      )}

      {/* Mobile Q-Com sheet */}
      {isMobileQcomOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex items-end" onClick={() => setIsMobileQcomOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="relative w-full bg-background p-6 pb-10"
            style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl text-foreground">Order on Q-Commerce</h3>
              <button
                onClick={() => setIsMobileQcomOpen(false)}
                className="text-foreground p-1"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {Object.entries(QCOM_LINKS).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    handleQComClick(platform);
                    setIsMobileQcomOpen(false);
                  }}
                  className="qcom-shimmer bg-muted px-5 py-4 text-foreground font-bold capitalize flex justify-between items-center outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  style={{ borderRadius: 8 }}
                >
                  {platform} <span className="text-primary">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
