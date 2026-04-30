import { Link } from "wouter";
import { BRAND } from "@/config/brand";
import { track } from "@/lib/analytics";
import { Shatkona } from "../sections/Shatkona";
import { NewsletterSignup } from "../sections/NewsletterSignup";

export function Footer() {
  const handleSocialClick = (platform: string) => {
    track(`${platform}_click` as any, { source_element: "footer" });
  };

  return (
    <footer className="bg-secondary text-secondary-foreground" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-8">
          <div className="md:col-span-3">
             <Link href="/" className="flex items-center gap-2 mb-4 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
              <span className="text-3xl tracking-tight uppercase" style={{ fontFamily: 'var(--app-font-display)', letterSpacing: "0.02em" }}>{BRAND.name}</span>
            </Link>
            <p className="text-sm opacity-80 mb-4">Made in India ✦ Delivered in 10 minutes</p>
            <div className="flex gap-4 text-sm">
              <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" onClick={() => handleSocialClick('instagram')} aria-label="PANEVO on Instagram" className="opacity-80 hover:opacity-100 hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded transition-opacity">
                Instagram
              </a>
              <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => handleSocialClick('whatsapp')} aria-label="PANEVO on WhatsApp" className="opacity-80 hover:opacity-100 hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded transition-opacity">
                WhatsApp
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="md:col-span-2">
            <h4 className="mb-4 text-lg uppercase" style={{ fontFamily: 'var(--app-font-display)', letterSpacing: "0.02em" }}>Explore</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link href="/" className="hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Home</Link></li>
              <li><Link href="/products" className="hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Products</Link></li>
              <li><Link href="/our-story" className="hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Our Story</Link></li>
              <li><Link href="/nutrition" className="hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Nutrition & Protein</Link></li>
              <li><Link href="/subscribe" className="hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Subscribe</Link></li>
              <li><Link href="/recipes" className="hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Recipes</Link></li>
              <li><Link href="/find-us" className="hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Find Us</Link></li>
              <li><Link href="/contact" className="hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Contact</Link></li>
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h4 className="mb-4 text-lg uppercase" style={{ fontFamily: 'var(--app-font-display)', letterSpacing: "0.02em" }}>Legal & Contact</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link href="/privacy" className="hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Terms of Use</Link></li>
              <li><Link href="/refund-policy" className="hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Refund Policy</Link></li>
              <li className="pt-2"><a href={`mailto:${BRAND.emails[0]}`} className="hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">{BRAND.emails[0]}</a></li>
              <li><a href={`mailto:${BRAND.emails[1]}`} className="hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">{BRAND.emails[1]}</a></li>
              <li className="pt-3 font-semibold opacity-90">{BRAND.parentCompany}</li>
              <li className="text-xs opacity-70">{BRAND.placeholders.address} · {BRAND.placeholders.fssai}</li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <NewsletterSignup />
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs opacity-60">© 2026 {BRAND.name}. All rights reserved. Made in India.</p>
          <div className="opacity-40" aria-hidden="true">
             <Shatkona className="w-8 h-8" />
          </div>
        </div>
      </div>
    </footer>
  );
}
