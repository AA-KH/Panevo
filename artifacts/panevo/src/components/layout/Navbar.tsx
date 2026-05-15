import { Link, useLocation } from "wouter";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND } from "@/config/brand";
import { WaitlistPopup } from "@/components/WaitlistPopup";
import panevoCircle from "@assets/AV-UPSIDE_1778837617882.png";
import panevoWordmark from "@assets/PANEVO_LOGO-CLEAR_1778837617882.png";

export function Navbar() {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [navState, setNavState] = useState<"top" | "visible" | "hidden">("top");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 8) {
        setNavState("top");
      } else {
        setNavState("visible");
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isMobileOpen]);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const links = [
    { href: "/products", label: "Products" },
    { href: "/subscribe", label: "Subscribe" },
    { href: "/recipes", label: "Recipes" },
    { href: "/our-story", label: "Our Story" },
    { href: "/find-us", label: "Find Us" },
  ];

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
            className="flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            aria-label={`${BRAND.name} - Home`}
          >
            <img
              src={panevoCircle}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="h-9 w-9 object-contain rounded-full flex-shrink-0"
            />
            <img
              src={panevoWordmark}
              alt="PANEVO"
              draggable={false}
              className="h-7 md:h-8 w-auto object-contain"
            />
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
              <WaitlistPopup>
                <button
                  className="cta-primary flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 font-bold text-sm notch-br outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  style={{ borderRadius: 4 }}
                >
                  Join the waitlist
                </button>
              </WaitlistPopup>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <WaitlistPopup>
              <button
                className="cta-primary bg-primary text-primary-foreground px-4 py-2 font-bold text-xs notch-br outline-none focus-visible:ring-2 focus-visible:ring-primary"
                style={{ borderRadius: 4 }}
              >
                Join waitlist
              </button>
            </WaitlistPopup>
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

      {/* Mobile Full-screen Overlay - portalled to body to escape backdrop-filter containment */}
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
              <WaitlistPopup>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="mt-8 cta-primary bg-primary text-primary-foreground py-4 font-bold text-lg notch-br w-full"
                  style={{ borderRadius: 4 }}
                >
                  Join the waitlist →
                </button>
              </WaitlistPopup>
              <div className="flex-1" />
              <p className="text-sm opacity-70 mt-12">Made in India ✦ Soon to be delivered in 10 minutes</p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Mobile Q-Com sheet removed since waitlist takes over */}
    </>
  );
}
