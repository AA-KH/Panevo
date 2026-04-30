import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
  schema?: string;
}

export function SEO({ title, description, ogImage, schema }: SEOProps) {
  useEffect(() => {
    document.title = `${title} | PANEVO`;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    if (ogImage) {
      let ogImgMeta = document.querySelector('meta[property="og:image"]');
      if (!ogImgMeta) {
        ogImgMeta = document.createElement("meta");
        ogImgMeta.setAttribute("property", "og:image");
        document.head.appendChild(ogImgMeta);
      }
      ogImgMeta.setAttribute("content", ogImage);
    }

    if (schema) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        document.head.appendChild(script);
      }
      script.textContent = schema;
    }

    return () => {
      // Cleanup script tag on unmount
      if (schema) {
        const script = document.querySelector('script[type="application/ld+json"]');
        if (script) {
          document.head.removeChild(script);
        }
      }
    };
  }, [title, description, ogImage, schema]);

  return null;
}
