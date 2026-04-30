import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { QCOM_LINKS } from "@/config/platforms";
import { track } from "@/lib/analytics";

export function Navbar() {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-2xl tracking-tight text-foreground uppercase" style={{ fontFamily: 'var(--app-font-sans)' }}>PANEVO</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-sm notch-br hover:bg-primary/90 transition-colors"
            >
              Order Now <ChevronDown className="w-4 h-4" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-lg border border-border py-1 flex flex-col z-50">
                {Object.entries(QCOM_LINKS).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => { handleQComClick(platform); setIsDropdownOpen(false); }}
                    className="px-4 py-2 text-sm text-foreground hover:bg-muted capitalize"
                  >
                    Order on {platform}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-primary text-primary-foreground px-3 py-1.5 rounded-full font-bold text-xs notch-br"
          >
            Order
          </button>
          <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="text-foreground">
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-background flex flex-col p-4 md:hidden overflow-y-auto">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className="text-lg font-bold py-4 border-b border-border text-foreground"
            >
              {link.label}
            </Link>
          ))}
          {isDropdownOpen && (
             <div className="py-4 flex flex-col gap-2">
                <p className="text-sm text-muted-foreground font-bold uppercase tracking-wider mb-2">Order on Q-Commerce</p>
                {Object.entries(QCOM_LINKS).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => { handleQComClick(platform); setIsMobileOpen(false); }}
                    className="bg-muted px-4 py-3 rounded-md text-foreground font-medium capitalize flex justify-between items-center"
                  >
                    {platform} <span>→</span>
                  </a>
                ))}
             </div>
          )}
        </div>
      )}
    </nav>
  );
}
