import { useEffect } from "react";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA4_ID;

export default function GA4() {
  useEffect(() => {
    if (typeof window === "undefined" || !GA_MEASUREMENT_ID) {
      return;
    }

    // Track page views on route change
    const handleRouteChange = () => {
      if (window.gtag) {
        window.gtag("config", GA_MEASUREMENT_ID, { page_path: window.location.pathname });
      }
    };

    window.addEventListener("popstate", handleRouteChange);
    const originalPushState = history.pushState;
    history.pushState = function(...args) {
      originalPushState.apply(this, args);
      handleRouteChange();
    };
    const originalReplaceState = history.replaceState;
    history.replaceState = function(...args) {
      originalReplaceState.apply(this, args);
      handleRouteChange();
    };

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, []);

  return null;
}