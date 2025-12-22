import { useCallback } from "react";
import {
  trackGAEvent,
  trackFbEvent,
  trackPageView,
  trackButtonClick,
  trackFormSubmission,
  trackPurchase
} from "../utils/analytics";

export const useAnalytics = () => {
  const trackEvent = useCallback(
    (action: string, category: string, label?: string, value?: number) => {
      trackGAEvent(action, category, label, value);
    },
    []
  );

  const trackFbEventCustom = useCallback(
    (eventName: string, parameters?: Record<string, any>) => {
      trackFbEvent(eventName, parameters);
    },
    []
  );

  const trackPageViewCustom = useCallback((url: string) => {
    trackPageView(url);
  }, []);

  const trackButtonClickCustom = useCallback(
    (buttonName: string, page: string) => {
      trackButtonClick(buttonName, page);
    },
    []
  );

  const trackFormSubmissionCustom = useCallback((formName: string) => {
    trackFormSubmission(formName);
  }, []);

  const trackPurchaseCustom = useCallback(
    (value: number, currency: string = "INR") => {
      trackPurchase(value, currency);
    },
    []
  );

  return {
    trackEvent,
    trackFbEvent: trackFbEventCustom,
    trackPageView: trackPageViewCustom,
    trackButtonClick: trackButtonClickCustom,
    trackFormSubmission: trackFormSubmissionCustom,
    trackPurchase: trackPurchaseCustom
  };
};
