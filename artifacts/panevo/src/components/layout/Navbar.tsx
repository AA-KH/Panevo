import { Link, useLocation } from "wouter";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { QCOM_LINKS, BRAND } from "@/config/brand";
import { track } from "@/lib/analytics";
import { QComIcon, QComLabel } from "@/components/sections/QComIcon";

export function Navbar() {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileQcomOpen, setIsMobileQcomOpen] = useState(false);
  const [navState, setNavState] = useState<"top" | "visible" | "hidden">("top");
  const lastScrollY = useRef(0);
  const dropdownWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isDropdownOpen) return;
    const onDown = (e: MouseEvent) => {
      if (dropdownWrapRef.current && !dropdownWrapRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [isDropdownOpen]);

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

  useEffect(() => {
    if (!isMobileOpen && !isMobileQcomOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isMobileOpen, isMobileQcomOpen]);

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
    <>
      <nav
        aria-label="Main"
        className={`sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 transition-transform duration-200 ${navTransform} ${navShadow}`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link
            href="/"
            onClick={() => {
              if (location === "/") window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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

            <div className="relative" ref={dropdownWrapRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="cta-primary flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 font-bold text-sm notch-br outline-none focus-visible:ring-2 focus-visible:ring-primary"
                style={{ borderRadius: 4 }}
                aria-expanded={isDropdownOpen}
                aria-haspopup="menu"
              >
                Order Now
                <ChevronDown
                  className={`w-4 h-4 cta-arrow transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    key="qcom-dropdown"
                    role="menu"
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-56 bg-card border border-border py-1 flex flex-col z-50 origin-top-right"
                    style={{ borderRadius: 8, boxShadow: "var(--shadow-hover)" }}
                  >
                    {Object.entries(QCOM_LINKS).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        role="menuitem"
                        onClick={() => { handleQComClick(platform); setIsDropdownOpen(false); }}
                        className="qcom-shimmer px-4 py-2.5 text-sm text-foreground hover:bg-muted flex items-center gap-3 outline-none focus-visible:bg-muted"
                      >
                        <QComIcon platform={platform} size="sm" />
                        <span>Order on <QComLabel platform={platform} /></span>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
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
      </nav>

      {/* Mobile Full-screen Overlay — portalled to body to escape backdrop-filter containment */}
      {createPortal(
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              key="mobile-menu"
              className="fixed inset-0 top-16 z-[60] bg-secondary text-secondary-foreground flex flex-col p-6 md:hidden overflow-y-auto"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
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
                onClick={() => { setIsMobileQcomOpen(true); setIsMobileOpen(false); }}
                className="mt-8 cta-primary bg-primary text-primary-foreground py-4 font-bold text-lg notch-br"
                style={{ borderRadius: 4 }}
              >
                Order Now →
              </button>
              <div className="flex-1" />
              <p className="text-sm opacity-70 mt-12">Made in India ✦ Delivered in 10 minutes</p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Mobile Q-Com sheet — portalled to body to escape backdrop-filter containment */}
      {createPortal(
        <AnimatePresence>
          {isMobileQcomOpen && (
            <motion.div
              key="mobile-qcom"
              className="fixed inset-0 z-[60] md:hidden flex items-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileQcomOpen(false)}
            >
              <div className="absolute inset-0 bg-black/60" />
              <motion.div
                className="relative w-full bg-background p-6 pb-10"
                style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl text-foreground">Order Now</h3>
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
                      onClick={() => { handleQComClick(platform); setIsMobileQcomOpen(false); }}
                      className="qcom-shimmer bg-muted px-5 py-4 text-foreground font-bold flex items-center gap-4 outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      style={{ borderRadius: 8 }}
                    >
                      <QComIcon platform={platform} size="md" />
                      <span className="flex-1"><QComLabel platform={platform} /></span>
                      <span className="text-primary">→</span>
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
