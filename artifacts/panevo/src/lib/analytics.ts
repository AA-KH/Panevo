export const track = (eventName: string, props?: Record<string, any>) => {
  // Replace with GA4 + Hotjar in Phase 2 — gtag() + window.hj() calls.
  console.log(`[Analytics] Tracked event: ${eventName}`, props || {});
};
