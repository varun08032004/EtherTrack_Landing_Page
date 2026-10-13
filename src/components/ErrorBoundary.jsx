import { useState, useEffect } from "react";

export default function ErrorBoundary({ children, fallback }) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    const handler = (event) => {
      console.error("[ErrorBoundary]", event.error);
      setError(event.error);
      setErrorInfo(event.error?.stack || "");
      setHasError(true);
    };
    window.addEventListener("error", handler);
    window.addEventListener("unhandledrejection", (event) => {
      console.error("[ErrorBoundary]", event.reason);
      setError(event.reason);
      setErrorInfo(event.reason?.stack || "");
      setHasError(true);
    });
    return () => {
      window.removeEventListener("error", handler);
    };
  }, []);

  if (hasError) {
    if (fallback) return fallback;
    return (
      <section className="page-hero">
        <div className="eyebrow">SOMETHING WENT WRONG</div>
        <h1 className="page-h1">We caught an error<br/><span style={{ color: "var(--org)" }}>Our team has been notified</span></h1>
        <p className="page-sub">
          This shouldn't happen. The error has been logged. Please try refreshing the page
          or <a href="/" style={{ color: "var(--grn)" }}>return to the homepage</a>.
        </p>
        <div className="actions">
          <button className="btn-p" onClick={() => window.location.reload()}>REFRESH PAGE</button>
        </div>
        <details style={{ marginTop: 24, textAlign: "left", maxWidth: 600, margin: "24px auto 0" }}>
          <summary style={{ cursor: "pointer", color: "var(--mut-lt)", fontFamily: "var(--font-mono)", fontSize: 11 }}>Technical details (for support)</summary>
          <pre style={{ marginTop: 12, padding: 16, background: "var(--surf)", border: "1px solid var(--brd)", borderRadius: "var(--r-md)", overflow: "auto", fontSize: 11, color: "var(--mut-lt)" }}>
            {error && error.toString()}
            {errorInfo}
          </pre>
        </details>
      </section>
    );
  }
  return children;
}