import { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { GLOBAL_CSS } from "../styles";
import logoImg from "../assets/logo.png";
import { DemoModalProvider } from "../context/DemoModalContext";
import { useDemoModal } from "../hooks/useDemoModal";
import GA4 from "./GA4";
import CookieConsent from "./CookieConsent";

const NAV_PAGES = [
  ["Platform",  "/platform"],
  ["Solutions", "/solutions"],
  ["Industries","/industries"],
  ["Blogs",     "/blogs"],
  ["About",     "/about"],
  ["Careers",   "/careers"],
];

const NAV_RESPONSIVE_CSS = `
  @media (max-width: 640px) {
    .nav-cta {
      font-size: 10px !important;
      padding: 6px 10px !important;
      white-space: nowrap !important;
    }
    .nav-right {
      gap: 8px !important;
    }
    .nav-status {
      display: none !important;
    }
  }
`;

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      };
      const t = setTimeout(tryScroll, 80);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function NavBar({ onOpenMobile }) {
  const { openDemo } = useDemoModal();
  return (
    <nav className="nav">
      <Link to="/" className="nav-logo">
        <img src={logoImg} alt="EtherTrack" onError={e => { e.target.style.display = "none"; }} />
        ETHERTRACK
      </Link>
      <div className="nav-links">
        {NAV_PAGES.map(([label, to]) => (
          <NavLink key={label} to={to} className={({ isActive }) => (isActive ? "active" : undefined)}>
            {label.toUpperCase()}
          </NavLink>
        ))}
      </div>
      <div className="nav-right">
        <div className="nav-status"><div className="nav-status-dot" />TESTNET LIVE</div>
        <button className="nav-cta" onClick={openDemo}>REQUEST DEMO</button>
        <button className="nav-hamburger" onClick={onOpenMobile} aria-label="Open menu" aria-expanded={false}><span/><span/><span/></button>
      </div>
    </nav>
  );
}

function MobileNav({ open, onClose }) {
  const { openDemo } = useDemoModal();
  return (
    <div className={`mobile-nav${open ? " open" : ""}`}>
      <button className="mobile-close" onClick={onClose}>✕ CLOSE</button>
      {NAV_PAGES.map(([label, to]) => (
        <NavLink key={label} to={to} onClick={onClose} className={({ isActive }) => (isActive ? "active" : undefined)}>
          {label.toUpperCase()}
        </NavLink>
      ))}
      <button className="btn-p" style={{ marginTop:8 }} onClick={() => { onClose(); openDemo(); }}>REQUEST DEMO →</button>
    </div>
  );
}

function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(() => {
    try { return window.localStorage.getItem("et_ann_dismissed") === "1"; } catch { return false; }
  });

  const dismiss = () => {
    setDismissed(true);
    try { window.localStorage.setItem("et_ann_dismissed", "1"); } catch { /* ignore */ }
  };

  if (dismissed) return null;
  return (
    <div className="ann">
      <div className="ann-dot" />
      <span style={{ color:"var(--org)" }}>SEPOLIA TESTNET LIVE</span>
      &nbsp;·&nbsp; All modules operational · Polygon mainnet pending security audit &nbsp;·&nbsp;
      <span style={{ color:"var(--grn)" }}>SECURITY AUDIT IN PROGRESS →</span>
      <button className="ann-close" onClick={dismiss} aria-label="Dismiss announcement">✕</button>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <img src={logoImg} alt="EtherTrack" style={{ height:32, width:"auto", objectFit:"contain", marginBottom:4 }} onError={e=>{e.target.style.display="none";}} />
          <p className="footer-brand-desc">India's blockchain-native carbon infrastructure platform — track emissions, tokenise verified credits, trade transparently, retire on-chain. Polygon mainnet pending security audit.</p>
          <div className="footer-network"><div className="footer-net-dot" />ETHEREUM SEPOLIA · SMART CONTRACT ACTIVE</div>
        </div>
        <div>
          <div className="footer-col-head">FEATURES</div>
          <ul className="footer-col-links">
            {["Exchange & Order Book","Compliance & Reporting","Operations & KYC","Screenshots"].map(l=><li key={l}><Link to="/platform">{l}</Link></li>)}
            <li><a href="https://app.ethertrack.in" target="_blank" rel="noopener noreferrer">Live Testnet App ↗</a></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-head">COMPANY</div>
          <ul className="footer-col-links">
            <li><Link to="/solutions">Solutions</Link></li>
            <li><Link to="/industries">Industries</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/about#ccts">India CCTS</Link></li>
            <li><Link to="/blogs">Insights</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><a href="mailto:support@ethertrack.in">support@ethertrack.in</a></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-head">LEGAL</div>
          <ul className="footer-col-links">
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/disclaimer">Disclaimer</Link></li>
          </ul>
          <div style={{ marginTop:20, fontFamily:"var(--font-mono)", fontSize:8, color:"var(--mut2)", lineHeight:2 }}>
            <div>Amoy Testnet · Pre-Launch</div>
            <div>Polygon Mainnet Pending Security Audit</div>
            <div>Incorporated in India (MCA)</div>
            <div>CIN: U62090PN2026PTC257708</div>
            <div>PAN: AAJCE8329G</div>
            <div>GSTIN: 27AAJCE8329G1ZD</div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© 2026 ETHERTRACK TECHNOLOGIES PRIVATE LIMITED · MADE WITH 🌿 IN INDIA</div>
        <div className="footer-socials">
          <a href="https://www.instagram.com/ethertrack_official/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
          <a href="https://www.linkedin.com/company/ethertrack-technologies-private-limited/" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
          <a href="https://x.com/EtherTrack" target="_blank" rel="noopener noreferrer">TWITTER / X</a>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <DemoModalProvider>
      <GA4 />
      <CookieConsent />
      <style>{GLOBAL_CSS}</style>
      <style>{NAV_RESPONSIVE_CSS}</style>
      <div className="orb orb1" /><div className="orb orb2" /><div className="orb orb3" />
      <ScrollManager />
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <AnnouncementBar />
      <NavBar onOpenMobile={() => setMobileOpen(true)} />
      <Outlet />
      <SiteFooter />
    </DemoModalProvider>
  );
}