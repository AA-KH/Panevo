import { Link } from "wouter";
import { QCOM_LINKS, BRAND } from "@/config/brand";
import { track } from "@/lib/analytics";
import { Shatkona } from "../sections/Shatkona";

export function Footer() {
  const handleSocialClick = (platform: string) => {
    track(`${platform}_click` as any, { source_element: "footer" });
  };

  return (
    <footer className="bg-secondary text-secondary-foreground" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
             <Link href="/" className="flex items-center gap-2 mb-4 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
              <span className="text-3xl tracking-tight uppercase" style={{ fontFamily: 'var(--app-font-display)', letterSpacing: "0.02em" }}>{BRAND.name}</span>
            </Link>
            <p className="text-sm opacity-80 mb-4">Made in India ✦ Delivered in 10 minutes</p>
            <div className="flex gap-4 text-sm">
              <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" onClick={() => handleSocialClick('instagram')} className="opacity-80 hover:opacity-100 hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded transition-opacity">
                Instagram
              </a>
              <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => handleSocialClick('whatsapp')} className="opacity-80 hover:opacity-100 hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded transition-opacity">
                WhatsApp
              </a>
            </div>
          </div>

          <div>
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
          </div>

          <div>
            <h4 className="mb-4 text-lg uppercase" style={{ fontFamily: 'var(--app-font-display)', letterSpacing: "0.02em" }}>Legal</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link href="/privacy" className="hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Terms of Use</Link></li>
              <li><Link href="/refund-policy" className="hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg uppercase" style={{ fontFamily: 'var(--app-font-display)', letterSpacing: "0.02em" }}>Company</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>{BRAND.placeholders.fssai}</li>
              <li>{BRAND.parentCompany}</li>
              <li>{BRAND.placeholders.address}</li>
              <li>{BRAND.placeholders.cin}</li>
              <li>{BRAND.placeholders.gst}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs opacity-60">© 2026 {BRAND.name}. All rights reserved.</p>
          <div className="mt-4 md:mt-0 opacity-40">
             <Shatkona className="w-8 h-8" />
          </div>
        </div>
      </div>
    </footer>
  );
}
