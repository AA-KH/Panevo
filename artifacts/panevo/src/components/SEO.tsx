import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
  schema?: string;
  structuredData?: Record<string, any>[];
}

export function SEO({ title, description, ogImage, schema, structuredData }: SEOProps) {
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

    const scriptsToRemove: Element[] = [];

    if (schema) {
      let script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.textContent = schema;
      document.head.appendChild(script);
      scriptsToRemove.push(script);
    }

    if (structuredData && structuredData.length > 0) {
      structuredData.forEach((data) => {
        let script = document.createElement("script");
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
  }, [title, description, ogImage, schema, structuredData]);

  return null;
}
