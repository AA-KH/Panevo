import { Link } from "wouter";
import { Shatkona } from "@/components/sections/Shatkona";
import { SEO } from "@/components/SEO";

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found — PANEVO"
        description="The page you’re looking for has moved or doesn’t exist. Head back to PANEVO — India’s first pre-flavoured fresh paneer."
        robots="noindex, follow"
      />
      <section className="min-h-[70vh] flex items-center justify-center bg-background py-20 px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Shatkona className="w-12 h-12 opacity-70" />
          </div>
          <p
            className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4"
            style={{ fontFamily: "var(--app-font-display)" }}
          >
            404 · Page Not Found
          </p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl uppercase mb-6 leading-tight"
            style={{ fontFamily: "var(--app-font-display)", letterSpacing: "0.02em" }}
          >
            This page has wandered off
          </h1>
          <p className="text-base md:text-lg text-foreground/80 mb-8">
            The link you followed may be broken or the page may have moved. Let’s
            get you back to fresh, flavoured, ready paneer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="cta-primary inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold notch-br outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Back to Home
              <span className="cta-arrow">→</span>
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 border-2 border-secondary text-secondary px-6 py-3 rounded-md font-semibold outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Explore Flavours
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
