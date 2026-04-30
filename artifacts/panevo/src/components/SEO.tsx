import { useEffect } from "react";
import { useLocation } from "wouter";

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: string;
  robots?: string;
  canonical?: string;
  schema?: string;
  structuredData?: Record<string, any>[];
}

const SITE_ORIGIN = "https://panevo.in";
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/opengraph.jpg`;

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function SEO({
  title,
  description,
  ogImage,
  ogType = "website",
  robots = "index, follow",
  canonical,
  schema,
  structuredData,
}: SEOProps) {
  const [location] = useLocation();

  useEffect(() => {
    const fullTitle = title.includes("PANEVO") ? title : `${title} | PANEVO`;
    document.title = fullTitle;

    const url =
      canonical ||
      `${SITE_ORIGIN}${location === "/" ? "" : location.replace(/\/$/, "")}`;
    const image = ogImage || DEFAULT_OG_IMAGE;

    setMeta("name", "description", description);
    setMeta("name", "robots", robots);

    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", image);
    setMeta("property", "og:site_name", "PANEVO");

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);

    setLink("canonical", url);

    const scriptsToRemove: Element[] = [];

    if (schema) {
      const script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.textContent = schema;
      document.head.appendChild(script);
      scriptsToRemove.push(script);
    }

    if (structuredData && structuredData.length > 0) {
      structuredData.forEach((data) => {
        const script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
        scriptsToRemove.push(script);
      });
    }

    return () => {
      scriptsToRemove.forEach((script) => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      });
    };
  }, [
    title,
    description,
    ogImage,
    ogType,
    robots,
    canonical,
    schema,
    structuredData,
    location,
  ]);

  return null;
}
