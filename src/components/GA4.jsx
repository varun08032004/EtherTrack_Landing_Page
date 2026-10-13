import { useEffect } from "react";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA4_ID || "G-XXXXXXXXXX";

export default function GA4() {
  useEffect(() => {
    if (typeof window === "undefined" || !GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.startsWith("G-XXXX")) {
      return;
    }

    // Load gtag script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });

    // Track page views on route change
    const handleRouteChange = () => {
      gtag("config", GA_MEASUREMENT_ID, { page_path: window.location.pathname });
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