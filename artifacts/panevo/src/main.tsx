import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const ga4Id = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined;
const hotjarId = import.meta.env.VITE_HOTJAR_ID as string | undefined;

if (ga4Id) {
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", ga4Id);
}

if (hotjarId) {
  const numericId = parseInt(hotjarId, 10);
  if (!Number.isNaN(numericId)) {
    window._hjSettings = { hjid: numericId, hjsv: 6 };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hjFn: any = function hj(...args: any[]) {
      (hjFn.q = hjFn.q || []).push(args);
    };
    window.hj = window.hj || hjFn;
    const head = document.getElementsByTagName("head")[0];
    if (head) {
      const r = document.createElement("script");
      r.async = true;
      r.src = `https://static.hotjar.com/c/hotjar-${window._hjSettings.hjid}.js?sv=${window._hjSettings.hjsv}`;
      head.appendChild(r);
    }
  }
}

const rootEl = document.getElementById("root");
if (rootEl) {
  createRoot(rootEl).render(<App />);
}
