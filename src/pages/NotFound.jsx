import { Link } from "react-router-dom";
import { useDemoModal } from "../hooks/useDemoModal";
import Seo from "../components/Seo";

export default function NotFound() {
  const { openDemo } = useDemoModal();

  return (
    <>
      <Seo
        title="Page Not Found — EtherTrack"
        description="The page you're looking for doesn't exist or has been moved."
        path="/404"
        noindex={true}
      />
      <section className="page-hero">
        <div className="eyebrow">404</div>
        <h1 className="page-h1">Page Not Found<br/><span style={{ color: "var(--org)" }}>That path doesn't exist</span></h1>
        <p className="page-sub">
          The page you're looking for may have been moved, removed, or never existed.
          Let's get you back on track.
        </p>
        <div className="actions">
          <Link to="/" className="btn-p">← BACK TO HOME</Link>
          <button className="btn-g" onClick={openDemo}>REQUEST A DEMO →</button>
        </div>
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <p style={{ color: "var(--mut-lt)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
            Quick links:
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 16, fontFamily: "var(--font-mono)", fontSize: 12 }}>
            <Link to="/platform" style={{ color: "var(--mut-lt)", transition: "color .2s" }} onMouseEnter={e => e.currentTarget.style.color = "var(--grn)"} onMouseLeave={e => e.currentTarget.style.color = "var(--mut-lt)"}>Platform</Link>
            <Link to="/solutions" style={{ color: "var(--mut-lt)", transition: "color .2s" }} onMouseEnter={e => e.currentTarget.style.color = "var(--grn)"} onMouseLeave={e => e.currentTarget.style.color = "var(--mut-lt)"}>Solutions</Link>
            <Link to="/industries" style={{ color: "var(--mut-lt)", transition: "color .2s" }} onMouseEnter={e => e.currentTarget.style.color = "var(--grn)"} onMouseLeave={e => e.currentTarget.style.color = "var(--mut-lt)"}>Industries</Link>
            <Link to="/about" style={{ color: "var(--mut-lt)", transition: "color .2s" }} onMouseEnter={e => e.currentTarget.style.color = "var(--grn)"} onMouseLeave={e => e.currentTarget.style.color = "var(--mut-lt)"}>About</Link>
            <Link to="/insights" style={{ color: "var(--mut-lt)", transition: "color .2s" }} onMouseEnter={e => e.currentTarget.style.color = "var(--grn)"} onMouseLeave={e => e.currentTarget.style.color = "var(--mut-lt)"}>Insights</Link>
            <Link to="/careers" style={{ color: "var(--mut-lt)", transition: "color .2s" }} onMouseEnter={e => e.currentTarget.style.color = "var(--grn)"} onMouseLeave={e => e.currentTarget.style.color = "var(--mut-lt)"}>Careers</Link>
          </div>
        </div>
      </section>
    </>
  );
}