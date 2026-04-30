type EventNames = 
  | "page_view"
  | "qcom_click"
  | "whatsapp_click"
  | "waitlist_signup"
  | "subscription_wizard_start"
  | "subscription_step_complete"
  | "subscription_payment_initiated"
  | "subscription_payment_success"
  | "product_view"
  | "recipe_view"
  | "nutrition_page_view"
  | "trade_enquiry_submit"
  | "contact_form_submit"
  | "coming_soon_signup";

export const track = (eventName: EventNames, props?: Record<string, any>) => {
  if (import.meta.env.DEV) {
    console.log(`[Analytics] Tracked event: ${eventName}`, props || {});
  }
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, props);
  }
};
