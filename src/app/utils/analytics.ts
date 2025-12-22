// Google Analytics tracking functions
export const trackGAEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

// Facebook Pixel tracking functions
export const trackFbEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, parameters);
  }
};

// Common tracking events
export const trackPageView = (url: string) => {
  trackGAEvent("page_view", "navigation", url);
  trackFbEvent("PageView", { url });
};

export const trackButtonClick = (buttonName: string, page: string) => {
  trackGAEvent("click", "button", buttonName, undefined);
  trackFbEvent("ButtonClick", { button_name: buttonName, page });
};

export const trackFormSubmission = (formName: string) => {
  trackGAEvent("form_submit", "form", formName);
  trackFbEvent("Lead", { form_name: formName });
};

export const trackPurchase = (value: number, currency: string = "INR") => {
  trackGAEvent("purchase", "ecommerce", undefined, value);
  trackFbEvent("Purchase", { value, currency });
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
  }
}
