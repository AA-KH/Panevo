import { Link } from "wouter";
import { QCOM_LINKS } from "@/config/platforms";
import { track } from "@/lib/analytics";
import { Shatkona } from "../sections/Shatkona";

export function Footer() {
  const handleSocialClick = (platform: string) => {
    track(`${platform}_click`, { source_element: "footer" });
  };

  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
             <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="font-bold text-3xl tracking-tight uppercase" style={{ fontFamily: 'var(--app-font-sans)' }}>PANEVO</span>
            </Link>
            <p className="text-sm opacity-80 mb-4">Made in India ✦ Delivered in 10 minutes</p>
            <div className="flex gap-4">
              <a href="https://instagram.com/panevoindia" target="_blank" rel="noopener noreferrer" onClick={() => handleSocialClick('instagram')} className="opacity-80 hover:opacity-100">
                Instagram
              </a>
              <a href="https://wa.me/918975016500" target="_blank" rel="noopener noreferrer" onClick={() => handleSocialClick('whatsapp')} className="opacity-80 hover:opacity-100">
                WhatsApp
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/products">Products</Link></li>
              <li><Link href="/our-story">Our Story</Link></li>
              <li><Link href="/nutrition">Nutrition & Protein</Link></li>
              <li><Link href="/subscribe">Subscribe</Link></li>
              <li><Link href="/recipes">Recipes</Link></li>
              <li><Link href="/find-us">Find Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Use</Link></li>
              <li><Link href="/refund-policy">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>FSSAI Licence No. [PLACEHOLDER]</li>
              <li>Shatkona Ventures Private Limited</li>
              <li>[REGISTERED ADDRESS PLACEHOLDER]</li>
              <li>CIN: [PLACEHOLDER]</li>
              <li>GST: [PLACEHOLDER]</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs opacity-60">© 2026 PANEVO. All rights reserved.</p>
          <div className="mt-4 md:mt-0 opacity-40">
             <Shatkona className="w-8 h-8" />
          </div>
        </div>
      </div>
    </footer>
  );
}
