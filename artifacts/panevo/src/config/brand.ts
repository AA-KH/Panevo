export const BRAND = {
  name: "PANEVO",
  tagline: "Fresh │ Flavoured │ Ready",
  categoryClaim: "India's first pre-flavoured fresh paneer",
  corePromise: "Open the pack. Cook in under 10 minutes. No marination. No prep.",
  parentCompany: "Shatkona Ventures Private Limited",
  phones: ["+91 89750 16500"],
  emails: ["hello@panevo.in", "trade@panevo.in"],
  whatsapp: "https://wa.me/918975016500?text=Hi%20PANEVO%20team,%20I%20have%20a%20question%20about...",
  instagram: "https://instagram.com/panevoindia",
  placeholders: {
    fssai: "FSSAI Licence — Pending",
    cin: "CIN — Coming Soon",
    gst: "GST — Coming Soon",
    address: "Chandigarh, India"
  }
};

export const COLORS = {
  terracotta: "#BF3D0B",
  forestGreen: "#1B4332",
  saffronGold: "#C9A227",
  warmCream: "#F2EEE5",
  white: "#FFFFFF",
  nearBlack: "#1A1A1A",
  mutedText: "#777777"
};

export const QCOM_LINKS = {
  blinkit: import.meta.env.VITE_BLINKIT_URL || "#",
  zepto: import.meta.env.VITE_ZEPTO_URL || "#",
  instamart: import.meta.env.VITE_INSTAMART_URL || "#"
};

export const SOCIAL_PROOF_STAT = "76% of first-time tasters committed to buying weekly or daily.";

export const PLAN_IDS = {
  "weekly_200g_bp": import.meta.env.VITE_RAZORPAY_PLAN_WEEKLY_200G_BP || "mock_weekly_200g_bp",
  // ... expand as needed or use a helper
  get: (frequency: string, size: string, flavour: string) => {
    return import.meta.env[`VITE_RAZORPAY_PLAN_${frequency.toUpperCase()}_${size.toUpperCase()}_${flavour.toUpperCase()}`] || `mock_${frequency}_${size}_${flavour}`;
  }
};
