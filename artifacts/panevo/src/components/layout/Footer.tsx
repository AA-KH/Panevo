import { Link } from "wouter";
import { BRAND } from "@/config/brand";
import { track } from "@/lib/analytics";
import { Shatkona } from "../sections/Shatkona";
import { NewsletterSignup } from "../sections/NewsletterSignup";
import { FooterIllustration } from "./FooterIllustration";
import panevoStacked from "@assets/chk_04_square_stacked_terracotta_1778837617882.png";
import panevoCircle from "@assets/AV-UPSIDE_1778837617882.png";

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export function Footer() {
  const handleSocialClick = (platform: string) => {
    track(`${platform}_click` as any, { source_element: "footer" });
  };

  return (
    <footer className="bg-secondary text-secondary-foreground overflow-hidden" style={{ paddingTop: 80, paddingBottom: 0 }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-8">
          <div className="md:col-span-3">
            <Link href="/" className="inline-block mb-5 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg" aria-label={`${BRAND.name} — Home`}>
              <img
                src={panevoStacked}
                alt="PANEVO"
                draggable={false}
                className="w-24 h-24 object-cover rounded-lg"
              />
            </Link>
            <p className="text-sm opacity-80 mb-4">Made in India ✦ Soon to be delivered in 10 minutes</p>
            <div className="flex gap-4">
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleSocialClick('instagram')}
                aria-label="PANEVO on Instagram"
                className="opacity-70 hover:opacity-100 hover:text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary rounded transition-opacity"
              >
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleSocialClick('whatsapp')}
                aria-label="PANEVO on WhatsApp"
                className="opacity-70 hover:opacity-100 hover:text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary rounded transition-opacity"
              >
                <WhatsAppIcon className="w-6 h-6" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="md:col-span-2">
            <h4 className="mb-4 text-lg uppercase" style={{ fontFamily: 'var(--app-font-display)', letterSpacing: "0.02em" }}>Explore</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link href="/" className="hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Home</Link></li>
              <li><Link href="/products" className="hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Products</Link></li>
              <li><Link href="/subscribe" className="hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Subscribe</Link></li>
              <li><Link href="/recipes" className="hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Recipes</Link></li>
              <li><Link href="/our-story" className="hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Our Story</Link></li>
              <li><Link href="/find-us" className="hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Find Us</Link></li>
              <li><Link href="/contact" className="hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Contact</Link></li>
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h4 className="mb-4 text-lg uppercase" style={{ fontFamily: 'var(--app-font-display)', letterSpacing: "0.02em" }}>Legal &amp; Contact</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link href="/privacy" className="hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Terms of Use</Link></li>
              <li><Link href="/refund-policy" className="hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Refund Policy</Link></li>
              {BRAND.emails.map((email, idx) => (
                <li key={email} className={idx === 0 ? "pt-2" : ""}>
                  <a href={`mailto:${email}`} className="hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
                    {email}
                  </a>
                </li>
              ))}
              <li className="pt-3 font-semibold opacity-90">{BRAND.parentCompany}</li>
              <li className="text-xs opacity-70">{BRAND.placeholders.address} · {BRAND.placeholders.fssai}</li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <NewsletterSignup />
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4 pb-8">
          <p className="text-xs opacity-60">© 2026 {BRAND.name}. All rights reserved. Made in India.</p>
          <div aria-hidden="true">
            <img src={panevoCircle} alt="" draggable={false} className="w-8 h-8 object-contain rounded-full opacity-50" />
          </div>
        </div>
      </div>

      {/* Farm-to-table illustration strip */}
      <div className="w-full" aria-hidden="true">
        <FooterIllustration className="text-secondary-foreground" />
      </div>
    </footer>
  );
}
