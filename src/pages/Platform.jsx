import { useState, useEffect, useRef } from "react";
import { useReveal, useBentoGlow } from "../hooks";
import { useDemoModal } from "../context/DemoModalContext";
import CtaBand from "../components/CtaBand";
import Seo from "../components/Seo";
import logoImg from "../assets/logo.png";
import { TABS } from "../data";
import { ExchangeFeatures, ComplianceFeatures, OperationsFeatures } from "../components/FeatureSections";
import MockPane from "../components/MockPane";

// ─── Layout constants ───────────────────────────────────────────────────────
// The site's actual CSS (GLOBAL_CSS) already sets the real alignment rule:
// .page-hero / .page-h1 / .page-sub are centered (site-wide, on purpose,
// same as every other sub-page). Everything below the hero — .s-label,
// .s-h2, .s-sub, .bento, .b-card — has no text-align rule, so it's left
// by default. That's the correct, intentional pattern: centered hero,
// left-aligned body. This file no longer overrides either of those —
// it just makes sure every body paragraph wraps to the same width so
// lines don't run to inconsistent edges.

const TEXT_MAX = 640; // max width for body copy under a heading

// ─── Data ──────────────────────────────────────────────────────────────────

const LOOP_STEPS = [
  { icon: "🌡️", verb: "Track",    color: "#f97316", angle: -90,
    short: "Know your exact carbon footprint across every business activity." },
  { icon: "🪙", verb: "Tokenise", color: "#3b82f6", angle: -18,
    short: "Turn verified carbon credits into digital assets — provable, tradeable, permanent." },
  { icon: "📈", verb: "Trade",    color: "#a855f7", angle: 54,
    short: "Buy or sell credits instantly. Live prices, real buyers, real sellers." },
  { icon: "🔥", verb: "Retire",   color: "#ef4444", angle: 126,
    short: "Permanently cancel a credit to offset emissions. Certificate issued instantly." },
  { icon: "📋", verb: "Report",   color: "#22c55e", angle: 198,
    short: "Generate BRSR, CDP, TCFD, and GHG Protocol reports in one click." },
];

// Dial-style tick marks around the loop's rim — computed once at module
// load, not per animation frame, so it doesn't add render cost.
const TICKS = Array.from({ length: 72 }, (_, i) => i * 5);

// Guards the JS-driven glow-shadow hover effects below. CSS media queries
// handle the tilt-card transform fine on their own, but these three cards
// set inline styles directly in onMouseEnter/onMouseLeave, which touch
// devices can fire on tap without a matching "leave" — so gate it here too.
const canHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// Each module carries: a "for" audience tag (who this screen is built for —
// pulled from the product's real module list), plus two content layers:
//   body / points   -> layer 1, always visible, plain-English benefit
//   proof           -> layer 2, one line of technical credibility, styled quieter
const MODULES = [
  {
    n: "01", icon: "📊", name: "Dashboard",
    for: "Sustainability heads, CFOs",
    headline: "Everything that matters, in one live view",
    body: "See your portfolio value, wallet balance, and how many credits you still need to buy — all updating in real time. No toggling between tabs, no stale numbers from last month's consultant report.",
    points: [
      "Your credit shortfall calculated live, so you know exactly what to buy",
      "Set a price alert once and get notified the moment it's hit",
    ],
    proof: "Every figure on this screen is pulled live from your wallet, your holdings, and the current market — nothing is a cached snapshot.",
    color: "#22c55e",
  },
  {
    n: "02", icon: "📁", name: "Portfolio",
    for: "Carbon managers, ESG teams",
    headline: "Hold, sell, and retire — all from one screen",
    body: "Track every credit you hold by project, standard, vintage, and quantity. See what's listed for sale, what's pending, and what's already retired, with on-chain proof for each status.",
    points: [
      "One-click retirement, certificate ready instantly",
      "Give your auditor read-only access — nothing more",
    ],
    proof: "The retirement certificate carries a QR code that resolves to a permanent public record, so anyone checking it can verify it themselves.",
    color: "#a855f7",
    highlight: { label: "Audit-ready from day one", body: "Your auditor, CDP reviewer, or board member can verify any retirement independently by scanning the certificate — without ever contacting us." },
  },
  {
    n: "03", icon: "🌡️", name: "Emission Tracking",
    for: "Operations teams, sustainability managers",
    headline: "Log an emission once. Every report updates itself.",
    body: "Log Scope 1, 2, and 3 activities manually or bulk-import via CSV. Every entry auto-calculated using CEA V20.0 and DEFRA 2024 factors — your credit gap updates instantly, no spreadsheet required.",
    points: [
      "Log it your way: AI assistant, manual entry, CSV upload, or straight from your ERP",
      "A second person reviews every entry before it's final",
    ],
    proof: "The same numbers you log for daily tracking generate BRSR, CDP, TCFD, GRI, and GHG Protocol reports automatically — work a consultant used to do by hand.",
    color: "#f97316",
    highlight: { label: "One log, five reports", body: "Stop assembling the same emissions data five separate times for five separate filings. Log it once here and every report pulls from the same source." },
  },
  {
    n: "04", icon: "📈", name: "Carbon Credits Market",
    for: "Procurement teams, treasury",
    headline: "Buy or sell credits — and never wait for a buyer",
    body: "Trade on a live order book — every bid and ask visible to all participants simultaneously. Price is set by supply and demand, not a broker. Pay in INR via UPI, settle on Ethereum.",
    points: [
      "See every live bid and ask before you trade",
      "GST invoice generated automatically on every purchase",
    ],
    proof: "Traditional carbon brokers can leave a trade unfilled for weeks when there's no counterparty. This is the one thing that's structurally different here.",
    color: "#3b82f6",
    highlight: { label: "Never a failed trade", body: "If there's no matching buyer or seller, our liquidity pool fills the order at a fair market price automatically — instant settlement, every time." },
  },
  {
    n: "05", icon: "💳", name: "Wallet",
    for: "Finance teams, CFOs",
    headline: "One wallet for rupees and carbon credits",
    body: "INR balance, credit holdings, and transaction history in one place. Deposit via UPI or Net Banking, retire credits with one click, and download your ISO certificate immediately after.",
    points: [
      "No crypto exchange or wallet app needed — everything settles in INR",
      "Tax is calculated and shown upfront on every withdrawal",
    ],
    proof: "The tax shown at withdrawal reflects the deduction required under Indian tax rules for digital asset transactions — you won't be surprised later.",
    color: "#22c55e",
  },
  {
    n: "06", icon: "📋", name: "Compliance Dashboard",
    for: "Legal, compliance officers, board reporting",
    headline: "Built for India's carbon rules — without hiring a compliance team",
    body: "BRSR Core, CDP Climate, TCFD, and GHG Protocol reports generate automatically from your emission and retirement data. If your company has targets under India's carbon credit scheme, EtherTrack tracks what you owe at each plant and nets surplus against shortfall automatically.",
    points: [
      "Every plant tracked separately, so nothing gets averaged away",
      "Blockchain TX hashes included in every report for your auditor",
    ],
    proof: "Netting a surplus at one site against a shortfall at another means you only ever buy the credits you actually still need.",
    color: "#14b8a6",
  },
  {
    n: "07", icon: "🔐", name: "Profile & Team",
    for: "HR, legal, admin teams",
    headline: "Your ESG team and your auditor, one shared workspace",
    body: "Company KYC, team roles, and access permissions managed in one place. Connect your third-party verifier — BV, DNV, EY, KPMG — directly to your account for BRSR assurance.",
    points: [
      "Five roles, twenty specific permissions, from full owner down to read-only viewer",
      "Your company profile fills in every report section automatically",
    ],
    proof: "Connecting a verifier directly gives them exactly the access level they need — no email attachments, no version confusion.",
    color: "#86efac",
  },
];

const REPORTS = [
  { name: "GHG Protocol",   sub: "The global standard for corporate emissions accounting", color: "#22c55e", plan: "Growth plan" },
  { name: "SEBI BRSR Core", sub: "Mandatory for India's top 1,000 listed companies",       color: "#f97316", plan: "Corporate plan" },
  { name: "CDP Climate",    sub: "Submitted directly to CDP's disclosure platform",         color: "#3b82f6", plan: "Corporate plan" },
  { name: "TCFD",           sub: "Four-pillar climate risk disclosure for investors",        color: "#a855f7", plan: "Corporate plan" },
  { name: "GRI Standards",  sub: "The world's most widely used sustainability reporting framework", color: "#eab308", plan: "Growth plan" },
];

const REPLACES = [
  { what: "The consultant invoice",     was: "₹5–15L per year",              now: "BRSR, CDP, TCFD, and GHG reports generate automatically from your emission data.", color: "#22c55e" },
  { what: "The carbon broker",          was: "10,000+ credit minimums",       now: "Buy or sell any quantity directly on a live order book. No intermediary, no markup.", color: "#3b82f6" },
  { what: "The compliance spreadsheet", was: "Manual errors. Late reports.",  now: "Emission data entered once feeds every report and every calculation automatically.", color: "#f97316" },
  { what: "The auditor phone call",     was: "\u201cCan you verify this retirement?\u201d", now: "Every certificate has a QR code that resolves to a permanent public record. Auditors verify it themselves.", color: "#a855f7" },
];

// Infrastructure trust strip — replaces the old vaguer "Live Proof" grid
// with specific, checkable technical credibility instead of generic "LIVE"
// badges.
const BUILT_ON = [
  { name: "Ethereum Sepolia → Mainnet", detail: "7 smart contracts deployed and Etherscan-verified", color: "#22c55e" },
  { name: "Razorpay — RBI Authorised",  detail: "UPI · Net Banking · NEFT withdrawal · Section 194S TDS", color: "#a855f7" },
  { name: "Pinata IPFS",                detail: "KYC documents and retirement certificates — immutable", color: "#f97316" },
  { name: "Gnosis Safe Multi-sig",      detail: "2-of-3 admin key — no single point of control", color: "#3b82f6" },
  { name: "Alchemy Ethereum RPC",       detail: "On-chain event monitoring and transaction verification", color: "#22c55e" },
  { name: "Cloudflare WAF",             detail: "DDoS protection · global CDN · SSL", color: "#a855f7" },
];

// ─── Reusable, alignment-safe section intro ────────────────────────────────
// Every section on this page uses this instead of hand-rolled markup, so
// eyebrow / heading / subhead always sit at the same width, same alignment.

function SectionIntro({ label, heading, sub, isPageTitle = false, hideDash = false }) {
  const Heading = isPageTitle ? "h1" : "h2";
  // NOTE: intentionally NOT using the site's ".reveal" class here. That class
  // starts at opacity:0 and only becomes visible once an IntersectionObserver
  // (the useReveal hook) detects the element on screen. That's fine for
  // decorative cards, but section headings are core content — if that
  // observer ever fails to fire (iframe preview, timing quirk, fast scroll),
  // the heading is invisible with no fallback. Headings show immediately.
  return (
    <div style={{ maxWidth: TEXT_MAX }}>
      <style>{`.s-label.no-dash::before { display: none; }`}</style>
      <div className={`s-label${hideDash ? " no-dash" : ""}`}>{label}</div>
      <Heading className="s-h2">{heading}</Heading>
      {sub && <p className="s-sub" style={{ maxWidth: TEXT_MAX }}>{sub}</p>}
    </div>
  );
}

// ─── Animated Orbital Circle ───────────────────────────────────────────────

function CarbonLoop() {
  const [active, setActive] = useState(0);
  const [rotation, setRotation] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    const prefersReduced = typeof window !== "undefined"
      && window.matchMedia
      && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Respect reduced-motion: freeze the loop at a neutral angle instead of
    // spinning it. Steps are still clickable, they just don't auto-rotate.
    if (prefersReduced) {
      setRotation(0);
      return;
    }

    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      // Wrap at 360 so the value never grows unbounded over a long session
      // (avoids floating-point drift on tabs left open for hours).
      setRotation((elapsed * 0.012) % 360);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const R = 190; // orbit radius
  const CX = 250; // center x
  const CY = 250; // center y

  const toRad = (deg) => (deg * Math.PI) / 180;

  // Dial-style tick marks around the rim — precomputed once, not per frame.
  const ticks = TICKS;

  return (
    <div className="loop-wrap" style={{ display: "grid", gridTemplateColumns: "260px 500px 260px", gap: 32, alignItems: "center", maxWidth: 1084, margin: "0 auto", justifyContent: "center" }}>
      {/* Left brief — step badge + title. Swaps with the click, same content
          source as the right side, just split so the circle sits dead-center
          with a brief piece of info flanking it on either side. */}
      <div key={`left-${active}`} className="loop-side loop-side-left" style={{ animation: "fadeUp 0.3s ease" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "4px 12px",
          borderRadius: "var(--r-md)",
          background: `${LOOP_STEPS[active].color}14`,
          border: `1px solid ${LOOP_STEPS[active].color}33`,
          marginBottom: 16,
        }}>
          <span style={{ fontSize: 16 }}>{LOOP_STEPS[active].icon}</span>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 10,
            letterSpacing: ".15em", fontWeight: 700,
            color: LOOP_STEPS[active].color,
          }}>
            STEP {active + 1} OF 5
          </span>
        </div>
        <div style={{
          fontFamily: "var(--font-head)", fontSize: 28,
          fontWeight: 700, color: "var(--txt)",
          lineHeight: 1.3,
        }}>
          {LOOP_STEPS[active].verb}
        </div>
      </div>

      {/* Circle */}
      <div className="loop-circle-scale" style={{ position: "relative", width: 500, height: 500, flexShrink: 0 }}>
        {/* Ambient glow behind the whole instrument — explicit offsets, not the
            `inset` shorthand, so it renders consistently everywhere */}
        <div style={{
          position: "absolute", top: -40, left: -40, right: -40, bottom: -40,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,224,80,.10), transparent 65%)",
          pointerEvents: "none",
        }} />

        <svg width="500" height="500" viewBox="0 0 500 500" style={{ position: "absolute", top: 0, left: 0 }}>
          {/* Counter-rotating faint outer ring — plain circle, rotated via a
              wrapping div + CSS animation below instead of an SVG <g> transform,
              so it doesn't depend on SVG-transform support */}
          <circle cx={CX} cy={CY} r={R + 22}
            fill="none" stroke="#22c55e" strokeWidth="1"
            strokeOpacity="0.06" strokeDasharray="1 9" />

          {/* Dial ticks */}
          {ticks.map((deg, i) => {
            const isMajor = deg % 30 === 0;
            const rad = toRad(deg);
            const rOuter = R + 10;
            const rInner = isMajor ? R + 2 : R + 5;
            return (
              <line key={i}
                x1={CX + rInner * Math.cos(rad)} y1={CY + rInner * Math.sin(rad)}
                x2={CX + rOuter * Math.cos(rad)} y2={CY + rOuter * Math.sin(rad)}
                stroke="#22c55e" strokeWidth={isMajor ? 1.2 : 0.6}
                strokeOpacity={isMajor ? 0.18 : 0.08} />
            );
          })}

          <circle cx={CX} cy={CY} r={R}
            fill="none" stroke="#22c55e" strokeWidth="1"
            strokeOpacity="0.14" strokeDasharray="4 6" />
          <circle cx={CX} cy={CY} r={R * 0.55}
            fill="none" stroke="#22c55e" strokeWidth="1"
            strokeOpacity="0.07" />

          {/* Center badge ring — gradient border via two overlaid circles */}
          <circle cx={CX} cy={CY} r={52} fill="rgba(0,224,80,0.05)" stroke="#22c55e33" strokeWidth="1.5" />
          <circle cx={CX} cy={CY} r={44} fill="rgba(0,224,80,0.08)" stroke="#22c55e55" strokeWidth="1" />
        </svg>

        {/* Center badge — actual logo instead of a text wordmark */}
        <div style={{
          position: "absolute",
          left: CX - 48, top: CY - 48,
          width: 96, height: 96,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <img
            src={logoImg}
            alt="EtherTrack"
            style={{
              width: 68, height: 68, objectFit: "contain",
              filter: "drop-shadow(0 0 12px rgba(0,224,80,.4))",
            }}
            onError={(e) => {
              // Falls back to the text wordmark if the logo file can't load
              e.currentTarget.style.display = "none";
              const fallback = e.currentTarget.nextElementSibling;
              if (fallback) fallback.style.display = "flex";
            }}
          />
          <div style={{
            display: "none", flexDirection: "column", alignItems: "center",
            justifyContent: "center", textAlign: "center", gap: 3,
          }}>
            <div style={{
              fontSize: 20, fontWeight: 900, color: "#22c55e",
              fontFamily: "var(--font-head)", lineHeight: 1,
              textShadow: "0 0 18px rgba(0,224,80,.4)",
            }}>ET</div>
            <div style={{
              fontSize: 7.5, fontWeight: 700, color: "var(--mut-lt)",
              fontFamily: "var(--font-mono)", letterSpacing: ".08em",
              whiteSpace: "nowrap",
            }}>ETHERTRACK</div>
          </div>
        </div>

        {LOOP_STEPS.map((step, i) => {
          const angle = toRad(step.angle + rotation);
          const x = CX + R * Math.cos(angle) - 34;
          const y = CY + R * Math.sin(angle) - 34;
          const isActive = active === i;
          return (
            <div
              key={i}
              onClick={() => setActive(i)}
              style={{
                position: "absolute",
                left: x, top: y,
                width: 68, height: 68,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
              }}
            >
              <div style={{
                width: 52, height: 52,
                borderRadius: "50%",
                background: isActive ? `${step.color}20` : "var(--surf)",
                border: `2px solid ${isActive ? step.color : step.color + "44"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 21,
                transition: "all 0.3s",
                boxShadow: isActive ? `0 0 28px ${step.color}55, 0 4px 16px rgba(0,0,0,.4)` : "none",
                transform: isActive ? "scale(1.18)" : "scale(1)",
              }}>
                {step.icon}
              </div>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: ".1em",
                color: isActive ? step.color : "var(--mut)",
                fontWeight: 700,
                transition: "color 0.3s",
                whiteSpace: "nowrap",
                textShadow: "0 1px 4px rgba(0,0,0,0.8)",
              }}>{step.verb}</div>
            </div>
          );
        })}
      </div>

      {/* Right brief — short description + progress dots. Kept brief on
          purpose to mirror the left side, rather than one long block. */}
      <div key={`right-${active}`} className="loop-side loop-side-right" style={{ animation: "fadeUp 0.3s ease" }}>
        <div className="loop-detail-short" style={{
          fontSize: 14.5, color: "var(--mut-lt)",
          lineHeight: 1.75, marginBottom: 20, fontWeight: 300,
        }}>
          {LOOP_STEPS[active].short}
        </div>

        <div className="loop-dots" style={{ display: "flex", gap: 8 }}>
          {LOOP_STEPS.map((s, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: active === i ? 28 : 8,
                height: 8,
                borderRadius: 4,
                background: active === i ? s.color : "var(--brd)",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Mobile: the circle is drawn at a fixed 440px design size.
               Rather than re-deriving every child's pixel math for each
               breakpoint, scale the whole thing down with CSS transform and
               reflow the 3-column layout (left brief / circle / right brief)
               into a single stacked column: circle first, then both briefs
               centered underneath it. */
        @media (max-width: 900px) {
          .loop-wrap {
            grid-template-columns: 1fr !important;
            justify-items: center;
            text-align: center;
          }
          /* transform-origin anchored to the top means the box only shrinks
             downward, so the empty space it leaves behind is entirely below
             it — margin-bottom on the circle closes that gap cleanly, with
             no competing negative margin needed on the sibling below it
             (the previous version double-compensated, which is what caused
             the title to overlap the circle). */
          .loop-circle-scale {
            order: 1;
            transform-origin: top center;
            transform: scale(0.82);
            margin-bottom: -90px; /* 500px * (1 - 0.82) */
          }
          .loop-side-left { order: 2; margin-top: 0; }
          .loop-side-right { order: 3; margin-top: 20px; }
          .loop-detail-short { max-width: 320px !important; margin-left: auto; margin-right: auto; }
          .loop-dots { justify-content: center; }
        }
        @media (max-width: 480px) {
          .loop-circle-scale {
            transform: scale(0.62);
            margin-bottom: -190px; /* 500px * (1 - 0.62) */
          }
        }

        /* ── Respect reduced-motion: kill the fade-in and hover transforms
               used in this component (GLOBAL_CSS's reduced-motion block
               covers .reveal/.mq-track/etc. site-wide, but not these). */
        @media (prefers-reduced-motion: reduce) {
          .loop-side { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function Platform() {
  const [activeModule, setActiveModule] = useState(0);
  const [featureTab, setFeatureTab] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [ssImgError, setSsImgError] = useState(false);
  const { openDemo } = useDemoModal();
  useReveal([activeModule, featureTab]);
  useBentoGlow([featureTab]);
  useEffect(() => { setSsImgError(false); }, [activeTab]);

  const mod = MODULES[activeModule];

  return (
    <>
      <Seo
        title="Platform — EtherTrack Carbon Infrastructure"
        description="Seven modules covering emissions tracking, carbon credit trading, regulatory reporting, and India CCTS compliance — all in one platform."
        path="/platform"
      />

      {/* ── Hero ──
          Added a module-preview strip and status note — the same pattern
          Home's hero already uses (.hero-verb-row / .hero-note) — instead of
          just padding out empty space. This gives the hero real content and
          proper height, so "Five steps. One continuous loop." isn't crammed
          right at the bottom edge of the first viewport. */}
      <section className="page-hero">
        <div className="eyebrow">THE PLATFORM</div>
        <h1 className="page-h1">
          Built for the full<br/>
          <span style={{ color: "var(--grn)" }}>carbon compliance journey</span>
        </h1>
        <p className="page-sub">
          Seven modules. One platform. Every step from your first emission log to a filed regulatory report — without switching tools, calling a consultant, or rebuilding a spreadsheet.
        </p>
        <div className="hero-verb-row">TRACK · TOKENISE · TRADE · RETIRE · REPORT</div>
        <p className="hero-note">Seven live modules · Ethereum Sepolia testnet · Built for India CCTS compliance</p>
      </section>

      {/* ── Carbon Loop — Animated Circle ── */}
      <section className="section" style={{ paddingTop: 180 }}>
        <SectionIntro
          label="HOW IT WORKS"
          heading={<>Five steps.<br/><span style={{ color: "var(--grn)" }}>One continuous loop.</span></>}
          sub="Click any step to explore it. Every step feeds the next — your emission data flows into your credit gap, into your market orders, into your certificates, into your regulatory reports."
        />
        <div className="reveal" style={{ marginTop: 48 }}>
          <CarbonLoop />
        </div>
      </section>

      {/* ── 7 Modules ── */}
      <section className="section" style={{ background: "var(--surf)", borderTop: "1px solid var(--brd)" }}>
        <SectionIntro
          label="SEVEN MODULES"
          heading={<>Every tool your team needs.<br/><span style={{ color: "var(--grn)" }}>Nothing your team doesn't.</span></>}
        />

        <style>{`
          .plat-layout {
            display: grid;
            grid-template-columns: 260px 1fr;
            gap: 2px;
            margin-top: 36px;
            background: var(--brd);
            border-radius: var(--r-lg);
            overflow: hidden;
            border: 1px solid var(--brd);
            box-shadow: 0 24px 60px -20px rgba(0,0,0,.5);
          }
          .plat-nav {
            background: var(--bg);
            padding: 8px;
            display: flex;
            flex-direction: column;
            gap: 2px;
          }
          .plat-nav-btn {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 14px;
            border-radius: 8px;
            border: none;
            background: transparent;
            cursor: pointer;
            text-align: left;
            transition: all 0.18s;
            width: 100%;
          }
          .plat-nav-btn:hover { background: var(--surf); transform: translateX(2px); }
          .plat-nav-btn.on   { background: var(--surf); box-shadow: inset 2px 0 0 var(--grn); }
          .plat-nav-icon {
            width: 32px; height: 32px;
            border-radius: 8px;
            display: flex; align-items: center; justify-content: center;
            font-size: 15px;
            flex-shrink: 0;
            transition: all 0.18s;
          }
          .plat-nav-name {
            font-size: 12px;
            font-weight: 600;
            color: var(--mut);
            letter-spacing: .02em;
            transition: color 0.18s;
            text-align: left;
          }
          .plat-nav-btn.on .plat-nav-name { color: var(--txt); }
          .plat-nav-n {
            font-family: var(--font-mono);
            font-size: 9px;
            color: var(--mut);
            margin-left: auto;
            flex-shrink: 0;
          }
          .plat-detail {
            background: var(--surf);
            padding: 40px 44px;
            animation: slideDetail 0.22s ease;
            text-align: left;
            display: grid;
            grid-template-columns: 1fr 240px;
            gap: 44px;
            align-items: start;
          }
          @keyframes slideDetail {
            from { opacity: 0; transform: translateX(12px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          .plat-tag {
            font-family: var(--font-mono);
            font-size: 9px;
            letter-spacing: .18em;
            color: var(--mut-lt);
            margin-bottom: 14px;
          }
          .plat-headline {
            font-family: var(--font-head);
            font-size: 24px;
            font-weight: 700;
            color: var(--txt);
            line-height: 1.3;
            margin-bottom: 14px;
          }
          .plat-body {
            font-size: 13.5px;
            color: var(--mut-lt);
            line-height: 1.8;
            margin-bottom: 22px;
            font-weight: 300;
          }
          .plat-points {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 20px;
          }
          .plat-point {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            font-size: 13px;
            color: var(--txt);
            line-height: 1.6;
          }
          .plat-point-dot {
            width: 5px; height: 5px;
            border-radius: 50%;
            flex-shrink: 0;
            margin-top: 6px;
          }
          .plat-proof {
            font-size: 12px;
            color: var(--mut-lt);
            line-height: 1.7;
            font-weight: 300;
            font-style: italic;
            margin-bottom: 20px;
            opacity: 0.85;
          }
          .plat-highlight {
            border-radius: var(--r-md);
            padding: 18px 22px;
          }
          .plat-highlight-label {
            font-family: var(--font-mono);
            font-size: 9px;
            letter-spacing: .16em;
            font-weight: 700;
            margin-bottom: 8px;
          }
          .plat-highlight-body {
            font-size: 12.5px;
            line-height: 1.75;
            color: var(--txt);
            font-weight: 300;
          }
          /* ── Side panel — fills the space that used to sit empty next to a
                 540px-capped text column, and gives each module a visual anchor. */
          .plat-side {
            background: var(--bg);
            border: 1px solid var(--brd);
            border-radius: var(--r-lg);
            padding: 24px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 14px;
            position: relative;
            overflow: hidden;
          }
          .plat-side-watermark {
            position: absolute;
            top: -18px; right: -6px;
            font-family: var(--font-head);
            font-size: 96px;
            font-weight: 900;
            line-height: 1;
            opacity: 0.06;
            pointer-events: none;
            user-select: none;
          }
          .plat-side-icon {
            width: 64px; height: 64px;
            border-radius: 18px;
            display: flex; align-items: center; justify-content: center;
            font-size: 28px;
            margin-top: 4px;
          }
          .plat-side-name {
            font-family: var(--font-head);
            font-size: 14px;
            font-weight: 700;
            color: var(--txt);
          }
          .plat-side-stat {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-family: var(--font-mono);
            font-size: 10px;
            padding: 8px 12px;
            border-radius: 8px;
            background: var(--surf2);
            border: 1px solid var(--brd);
            color: var(--mut-lt);
          }
          @media (max-width: 900px) {
            .plat-layout { grid-template-columns: 1fr; }
            .plat-nav { flex-direction: row; flex-wrap: wrap; background: var(--surf); }
            .plat-detail { grid-template-columns: 1fr; padding: 24px; }
            .plat-side { display: none; }
          }
        `}</style>

        <div className="plat-layout reveal">
          {/* Nav */}
          <div className="plat-nav">
            {MODULES.map((m, i) => (
              <button
                key={i}
                className={`plat-nav-btn${activeModule === i ? " on" : ""}`}
                onClick={() => setActiveModule(i)}
              >
                <div className="plat-nav-icon" style={{
                  background: activeModule === i ? `${m.color}18` : "var(--surf2)",
                  border: `1px solid ${activeModule === i ? m.color + "44" : "var(--brd)"}`,
                  boxShadow: activeModule === i ? `0 0 16px ${m.color}33` : "none",
                }}>
                  {m.icon}
                </div>
                <span className="plat-nav-name">{m.name}</span>
                <span className="plat-nav-n">{m.n}</span>
              </button>
            ))}
          </div>

          {/* Detail panel — text column + filling side panel */}
          <div className="plat-detail" key={activeModule}>
            <div>
              <div className="plat-tag">FOR {mod.for.toUpperCase()}</div>
              <div className="plat-headline">{mod.headline}</div>
              <div className="plat-body">{mod.body}</div>

              <div className="plat-points">
                {mod.points.map((p, i) => (
                  <div key={i} className="plat-point">
                    <div className="plat-point-dot" style={{ background: mod.color }} />
                    {p}
                  </div>
                ))}
              </div>

              {mod.proof && (
                <div className="plat-proof">{mod.proof}</div>
              )}

              {mod.highlight && (
                <div className="plat-highlight" style={{
                  background: `${mod.color}08`,
                  border: `1px solid ${mod.color}22`,
                }}>
                  <div className="plat-highlight-label" style={{ color: mod.color }}>
                    ★ {mod.highlight.label}
                  </div>
                  <div className="plat-highlight-body">{mod.highlight.body}</div>
                </div>
              )}
            </div>

            <div className="plat-side" style={{ borderColor: `${mod.color}33` }}>
              <div className="plat-side-watermark" style={{ color: mod.color }}>{mod.n}</div>
              <div className="plat-side-icon" style={{
                background: `${mod.color}18`,
                border: `1px solid ${mod.color}44`,
                boxShadow: `0 0 24px ${mod.color}22`,
              }}>{mod.icon}</div>
              <div className="plat-side-name">{mod.name}</div>
              <div className="plat-side-stat">
                <span>MODULE</span><span style={{ color: mod.color }}>{mod.n} / 07</span>
              </div>
              <div className="plat-side-stat">
                <span>STATUS</span><span style={{ color: "var(--grn)" }}>● LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Shared "alive" card treatment — lift, slight tilt, glow shadow on
             hover. Alternating tilt direction by index so a row doesn't feel
             mechanically identical. Applied to Replaces, Reports, Live Proof.
             Gated behind (hover: hover) + (pointer: fine) so touch devices —
             which simulate hover on tap but never fire the matching "leave"
             reliably — don't get a card stuck mid-tilt after a tap. */}
      <style>{`
        .tilt-card {
          transition: transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s ease, border-color .35s ease;
          box-shadow: 0 4px 16px rgba(0,0,0,.25);
          cursor: default;
        }
        @media (hover: hover) and (pointer: fine) {
          .tilt-card:nth-child(odd):hover {
            transform: translateY(-8px) rotate(-0.7deg) scale(1.015);
          }
          .tilt-card:nth-child(even):hover {
            transform: translateY(-8px) rotate(0.7deg) scale(1.015);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .tilt-card { transition: box-shadow .2s ease, border-color .2s ease; }
          .tilt-card:hover { transform: none !important; }
        }

        /* ── Mobile grid fixes — these two grids were hardcoded to a fixed
               column count with no responsive fallback (unlike the rest of
               the site's grids, which already collapse via GLOBAL_CSS).
               Desktop (>640px) is untouched. */
        @media (max-width: 640px) {
          .replaces-grid { grid-template-columns: 1fr !important; }
          .live-proof-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 380px) {
          .live-proof-grid { grid-template-columns: 1fr !important; }
        }

        /* ── Module nav on small phones: the name label was crowding the
               icon at phone width, but hiding it removed useful information.
               Shrink the font and tighten spacing instead — name stays
               visible. */
        @media (max-width: 480px) {
          .plat-nav-btn { padding: 8px 10px; gap: 8px; }
          .plat-nav-name { font-size: 10.5px; }
          .plat-nav-n { margin-left: 0; }
        }
      `}</style>

      {/* ── What it replaces ── */}
      <section className="section">
        <SectionIntro
          label="WHAT ETHERTRACK REPLACES"
          heading={<>Not another tool on your stack.<br/><span style={{ color: "var(--grn)" }}>A replacement for four.</span></>}
        />

        <div className="replaces-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginTop: 36 }}>
          {REPLACES.map((r, i) => (
            <div key={i} className="reveal tilt-card" style={{
              background: "var(--surf)",
              border: "1px solid var(--brd)",
              borderRadius: "var(--r-lg)",
              padding: "28px 30px",
              boxShadow: `0 4px 20px -8px ${r.color}22`,
            }}
            onMouseEnter={e => { if (!canHover()) return; e.currentTarget.style.borderColor = `${r.color}55`; e.currentTarget.style.boxShadow = `0 20px 40px -12px ${r.color}44`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--brd)"; e.currentTarget.style.boxShadow = `0 4px 20px -8px ${r.color}22`; }}
            >
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 9,
                color: "var(--mut-lt)", letterSpacing: ".12em", marginBottom: 8,
              }}>REPLACES</div>
              <div style={{
                fontFamily: "var(--font-head)", fontSize: 16,
                fontWeight: 700, color: "var(--txt)", marginBottom: 6,
              }}>{r.what}</div>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 12,
                color: r.color, marginBottom: 16, fontStyle: "italic",
              }}>{r.was}</div>
              <div style={{
                fontSize: 13, color: "#9abba6",
                lineHeight: 1.75, fontWeight: 300,
              }}>{r.now}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Reports ── */}
      <section className="section" style={{ background: "var(--surf)", borderTop: "1px solid var(--brd)" }}>
        <SectionIntro
          label="REGULATORY REPORTS"
          heading={<>Five reports.<br/><span style={{ color: "var(--grn)" }}>One click each.</span></>}
          sub="The data your compliance consultant was assembling by hand already lives in EtherTrack. Press a button, download your PDF."
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginTop: 32 }}>
          {REPORTS.map((r, i) => (
            <div key={i} className="reveal tilt-card" style={{
              background: "var(--surf2)",
              border: "1px solid var(--brd)",
              borderTop: `3px solid ${r.color}`,
              borderRadius: "var(--r-lg)",
              padding: "26px 22px",
              display: "flex", flexDirection: "column", gap: 12,
              boxShadow: `0 4px 20px -8px ${r.color}22`,
            }}
            onMouseEnter={e => { if (!canHover()) return; e.currentTarget.style.boxShadow = `0 20px 40px -12px ${r.color}44`; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 4px 20px -8px ${r.color}22`; }}
            >
              <div style={{
                fontFamily: "var(--font-head)", fontSize: 17,
                fontWeight: 700, color: r.color,
              }}>{r.name}</div>
              <div style={{
                fontSize: 12, color: "var(--mut-lt)",
                lineHeight: 1.7, flex: 1, fontWeight: 300,
              }}>{r.sub}</div>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 9,
                padding: "3px 10px", borderRadius: "var(--r-md)",
                border: `1px solid ${r.color}33`, color: r.color,
                display: "inline-block", letterSpacing: ".08em",
                alignSelf: "flex-start",
              }}>{r.plan}</div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{
          marginTop: 16, padding: "16px 24px",
          background: "rgba(0,224,80,.04)", border: "1px solid var(--grnd)",
          borderRadius: "var(--r-md)", fontFamily: "var(--font-mono)",
          fontSize: 11, color: "var(--mut-lt)", lineHeight: 1.8,
          maxWidth: TEXT_MAX,
        }}>
          Every report uses India-specific emission factors and includes a blockchain-verified trail for every retirement — nothing here is a black box for your auditor.
        </div>
      </section>

      {/* ── Built on — compact trust strip, not a tech breakdown ── */}
      <section className="section" style={{ background: "var(--surf)", borderTop: "1px solid var(--brd)", paddingTop: 48, paddingBottom: 48 }}>
        <SectionIntro label="BUILT ON" heading={<>Real infrastructure,<br/><span style={{ color: "var(--grn)" }}>not a demo shell</span></>} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 32 }}>
          {BUILT_ON.map((b, i) => (
            <div key={i} className="tilt-card" style={{
              flex: "1 1 280px", background: "var(--surf2)", border: "1px solid var(--brd)",
              borderRadius: "var(--r-md)", padding: "14px 18px",
              display: "flex", alignItems: "center", gap: 14,
              boxShadow: "0 4px 16px -8px rgba(0,0,0,.2)",
            }}
            onMouseEnter={e => { if (!canHover()) return; e.currentTarget.style.borderColor = `${b.color}55`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--brd)"; }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: b.color, flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--txt)", fontWeight: 700 }}>{b.name}</div>
                <div style={{ fontSize: 12, color: "var(--mut-lt)", marginTop: 2 }}>{b.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Deep-dive tabs — the technical detail behind the modules above ── */}
      <section className="section" style={{ borderTop: "1px solid var(--brd)" }}>
        <SectionIntro
          label="CAPABILITY DEEP-DIVE"
          heading={<>Under every module,<br/><span style={{ color: "var(--grn)" }}>the detail that matters to compliance</span></>}
        />
        <div className="feat-tabs" style={{ marginTop: 32 }}>
          {[
            ["Exchange", "How trading and settlement works"],
            ["Compliance & Reporting", "GHG engine, CCTS module, regulatory PDFs"],
            ["Operations", "KYC, audit trail, team management"],
          ].map(([label, desc], i) => (
            <button key={label} className={`feat-tab-btn${featureTab === i ? " on" : ""}`}
              onClick={() => setFeatureTab(i)} title={desc}>{label}</button>
          ))}
        </div>
        {featureTab === 0 && <ExchangeFeatures />}
        {featureTab === 1 && <ComplianceFeatures />}
        {featureTab === 2 && <OperationsFeatures />}
      </section>

      {/* ── Screenshots — real screens from the live testnet build ── */}
      <section className="ss-section" id="screenshots">
        <SectionIntro
          label="THE PRODUCT"
          heading={<>Every module —<span style={{ color: "var(--grn)" }}> live on testnet</span></>}
          sub="Real screenshots from the live Sepolia build. Click any tab to explore."
        />
        <div className="ss-tabs" style={{ marginTop: 32 }}>
          {TABS.map((t, i) => (
            <button key={t.id} className={`ss-tab${activeTab === i ? " on" : ""}`} onClick={() => setActiveTab(i)}>{t.label}</button>
          ))}
        </div>
        <div className="ss-frame">
          <div className="ss-bar">
            <div className="ss-dots">
              {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => <div key={i} className="ss-dot" style={{ background: c }} />)}
            </div>
            <div className="ss-url">{TABS[activeTab].url}</div>
            <div className="ss-badge">{TABS[activeTab].badge}</div>
          </div>
          {TABS[activeTab].imgSrc && !ssImgError
            ? <img src={TABS[activeTab].imgSrc} alt={TABS[activeTab].label} onError={() => setSsImgError(true)} />
            : <MockPane id={TABS[activeTab].id} />}
        </div>
      </section>

      <CtaBand
        eyebrow="SEE IT ALL IN 30 MINUTES"
        title={<>Every module, end to end,<br/><span style={{ color: "var(--grn)" }}>on a live walkthrough</span></>}
        subtitle="We'll log an emission, tokenise a credit, place a trade, retire it on-chain, download the certificate, and generate a BRSR report — using your company's sector as the example."
        note="No commitment · 30-minute live walkthrough · Response within 24 hours"
      />
    </>
  );
}