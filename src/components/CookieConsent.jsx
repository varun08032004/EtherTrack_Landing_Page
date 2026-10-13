import { useState } from "react";

const CONSENT_KEY = "et_cookie_consent";

function getInitialShow() {
  try {
    const consent = localStorage.getItem(CONSENT_KEY);
    return !consent;
  } catch {
    return true;
  }
}

export default function CookieConsent() {
  const [show, setShow] = useState(getInitialShow);

  function acceptAll() {
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: true, marketing: false, timestamp: Date.now() })); } catch { /* ignore */ }
    setShow(false);
  }

  function acceptAnalytics() {
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: true, marketing: false, timestamp: Date.now() })); } catch { /* ignore */ }
    setShow(false);
  }

  function decline() {
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: false, marketing: false, timestamp: Date.now() })); } catch { /* ignore */ }
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="cookie-banner" style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000,
      background: "var(--surf)", borderTop: "1px solid var(--brd)",
      padding: "20px 24px", boxShadow: "0 -4px 24px rgba(0,0,0,.3)"
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <p style={{ margin: 0, fontSize: 14, color: "var(--txt)", lineHeight: 1.6 }}>
            We use cookies to improve your experience and analyze traffic. By clicking "Accept All", you consent to our use of cookies.{' '}
            <a href="/#cookie-policy" style={{ color: "var(--grn)", textDecoration: "underline" }}>Learn more</a>
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button onClick={decline} className="btn-g" style={{ padding: "10px 18px", fontSize: 12 }}>Decline</button>
          <button onClick={acceptAnalytics} className="btn-g" style={{ padding: "10px 18px", fontSize: 12 }}>Analytics Only</button>
          <button onClick={acceptAll} className="btn-p" style={{ padding: "10px 18px", fontSize: 12 }}>Accept All</button>
        </div>
      </div>
    </div>
  );
}