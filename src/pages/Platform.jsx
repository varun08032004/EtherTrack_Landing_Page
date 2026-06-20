import { useState, useEffect } from "react";
import { useReveal, useBentoGlow } from "../hooks";
import { TABS } from "../data";
import { ExchangeFeatures, ComplianceFeatures, OperationsFeatures } from "../components/FeatureSections";
import MockPane from "../components/MockPane";
import CtaBand from "../components/CtaBand";
import Seo from "../components/Seo";

const MODULES = [
  {
    icon: "📊",
    name: "Dashboard",
    for: "Sustainability heads, CFOs",
    value: "Your entire carbon position in one view — total emissions, credits held, credits retired, credit gap, and trend across the last six months. Every number is live, not a snapshot from last month's consultant report.",
    color: "var(--grn)",
  },
  {
    icon: "📁",
    name: "Portfolio",
    for: "Carbon managers, ESG teams",
    value: "Track every credit you hold by project, standard, vintage, and quantity. See what's listed for sale, what's pending, and what's already retired — with on-chain proof for each status.",
    color: "var(--vio)",
  },
  {
    icon: "🌡️",
    name: "Emission Tracking",
    for: "Operations teams, sustainability managers",
    value: "Log Scope 1, 2, and 3 activities manually or bulk-import via CSV. Every entry auto-calculated using CEA V20.0 and DEFRA 2024 factors. Your credit gap updates instantly — no spreadsheet required.",
    color: "var(--org)",
  },
  {
    icon: "📈",
    name: "Carbon Credits Market",
    for: "Procurement teams, treasury",
    value: "Buy or sell carbon credits on a live order book — every bid and ask visible to all participants simultaneously. Price is set by supply and demand, not a broker. Pay in INR via UPI. Settle on Ethereum.",
    color: "var(--blu)",
  },
  {
    icon: "💳",
    name: "Wallet",
    for: "Finance teams, CFOs",
    value: "INR balance, credit holdings, and transaction history in one place. Deposit via UPI or Net Banking. Retire credits with one click — permanently burned on-chain. Download your ISO certificate immediately after.",
    color: "var(--grn)",
  },
  {
    icon: "📋",
    name: "Compliance Dashboard",
    for: "Legal, compliance officers, board reporting",
    value: "BRSR Core, CDP Climate, TCFD, and GHG Protocol reports generated automatically from your emission and retirement data. One click each. CEA V20.0 factors embedded. Blockchain TX hashes included for your auditor.",
    color: "var(--vio)",
  },
  {
    icon: "🔐",
    name: "Profile & Team",
    for: "HR, legal, admin teams",
    value: "Company KYC, team roles, and access permissions managed in one place. Five roles with 20 specific permissions. Connect your third-party verifier — BV, DNV, EY, KPMG — directly to your account for BRSR assurance.",
    color: "var(--org)",
  },
];

export default function Platform() {
  const [featureTab, setFeatureTab] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [ssImgError, setSsImgError] = useState(false);
  useReveal([featureTab]);
  useBentoGlow([featureTab]);
  useEffect(() => { setSsImgError(false); }, [activeTab]);

  return (
    <>
      <Seo
        title="Platform — EtherTrack Carbon Trading & Compliance Modules"
        description="Seven modules covering emissions tracking, on-chain credit trading, retirement, and four regulatory reports — BRSR Core, CDP Climate, TCFD, and GHG Protocol."
        path="/platform"
      />
      <section className="page-hero">
        <div className="eyebrow">THE PLATFORM</div>
        <h1 className="page-h1">Everything your team needs<br/><span style={{ color:"var(--grn)" }}>to manage carbon — one platform</span></h1>
        <p className="page-sub">
          Seven modules covering emissions tracking, credit trading, on-chain retirement,
          and four regulatory reports — designed so your sustainability, finance, and
          compliance teams can all work from the same data, without switching tools.
        </p>
      </section>

      {/* ── 7 Modules — business value first ── */}
      <section className="section" style={{ paddingTop:0 }}>
        <div className="s-label reveal">THE 7 MODULES</div>
        <h2 className="s-h2 reveal">What each module<br/><span style={{ color:"var(--grn)" }}>actually does for your business</span></h2>
        <p className="s-sub reveal">
          Every module below is live on testnet. Each one is designed around
          a specific person in your organisation and the job they need to get done.
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12 }}>
          {MODULES.map((m,i) => (
            <div key={i} className="reveal" style={{
              background:"var(--surf)", border:"1px solid var(--brd)",
              borderRadius:"var(--r-lg)", padding:"26px 28px",
              borderLeft:`3px solid ${m.color}`,
              display:"grid", gridTemplateColumns:"auto 1fr", gap:20, alignItems:"start",
            }}>
              <span style={{ fontSize:26 }}>{m.icon}</span>
              <div>
                <div style={{ display:"flex", alignItems:"baseline", gap:12, marginBottom:6, flexWrap:"wrap" }}>
                  <div style={{ fontFamily:"var(--font-head)", fontSize:15, fontWeight:700 }}>{m.name}</div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--mut-lt)", letterSpacing:".1em" }}>FOR {m.for.toUpperCase()}</div>
                </div>
                <div style={{ fontSize:13.5, color:"#9abba6", lineHeight:1.75, fontWeight:300 }}>{m.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Deep-dive tabs ── */}
      <section className="section" style={{ background:"var(--surf)", borderTop:"1px solid var(--brd)" }}>
        <div className="s-label reveal">CAPABILITY DEEP-DIVE</div>
        <h2 className="s-h2 reveal">Under every module<br/><span style={{ color:"var(--grn)" }}>The detail that matters to compliance</span></h2>
        <div className="feat-tabs">
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

      {/* ── Business value summary ── */}
      <section className="section">
        <div className="s-label reveal">WHY IT MATTERS</div>
        <h2 className="s-h2 reveal">What EtherTrack replaces<br/><span style={{ color:"var(--grn)" }}>for your business</span></h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12 }}>
          {[
            [
              "The consultant invoice",
              "₹5–15L/yr",
              "BRSR Core, CDP, TCFD, and GHG Protocol reports are generated automatically from your emission and retirement data. The data your consultant was assembling manually already lives in EtherTrack.",
              "var(--grn)",
            ],
            [
              "The broker relationship",
              "10,000+ credit minimums",
              "The order book and AMM give any company — regardless of size — direct access to the carbon credit market. Buy 50 credits or 50,000. Pay in INR. No intermediary required.",
              "var(--vio)",
            ],
            [
              "The spreadsheet",
              "Manual errors. Late reports.",
              "Emission data entered once feeds the GHG inventory, the credit gap calculation, the order recommendation, and all four regulatory PDFs simultaneously. There is no reconciliation step.",
              "var(--org)",
            ],
            [
              "The auditor's phone call",
              "'Can you verify this retirement?'",
              "Every retirement certificate includes a QR code that resolves to a public Etherscan record. Any auditor, assessor, or CDP reviewer verifies it independently — without contacting EtherTrack.",
              "var(--blu)",
            ],
          ].map(([what, old, new_, color], i) => (
            <div key={i} className="reveal" style={{
              background:"var(--surf)", border:"1px solid var(--brd)",
              borderRadius:"var(--r-lg)", padding:"26px 28px",
            }}>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--mut-lt)", letterSpacing:".1em", marginBottom:8 }}>REPLACES</div>
              <div style={{ fontFamily:"var(--font-head)", fontSize:15, fontWeight:700, marginBottom:4 }}>{what}</div>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:11, color:color, marginBottom:14 }}>{old}</div>
              <div style={{ fontSize:13.5, color:"#9abba6", lineHeight:1.75, fontWeight:300 }}>{new_}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Built on (compact trust strip, not a tech breakdown) ── */}
      <section className="section" style={{ background:"var(--surf)", borderTop:"1px solid var(--brd)", paddingTop:48, paddingBottom:48 }}>
        <div className="s-label reveal">BUILT ON</div>
        <div className="reveal" style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
          {[
            ["Ethereum Sepolia → Mainnet", "7 smart contracts deployed and Etherscan-verified", "var(--grn)"],
            ["Razorpay — RBI Authorised", "UPI · Net Banking · NEFT withdrawal · Section 194S TDS", "var(--vio)"],
            ["Pinata IPFS", "KYC documents and retirement certificates — immutable", "var(--org)"],
            ["Gnosis Safe Multi-sig", "2-of-3 admin key — no single point of control", "var(--blu)"],
            ["Alchemy Ethereum RPC", "On-chain event monitoring and transaction verification", "var(--grn)"],
            ["Cloudflare WAF", "DDoS protection · global CDN · SSL", "var(--vio)"],
          ].map(([name, detail, color], i) => (
            <div key={i} style={{
              flex:"1 1 280px", background:"var(--surf2)", border:"1px solid var(--brd)",
              borderRadius:"var(--r-md)", padding:"14px 18px",
              display:"flex", alignItems:"center", gap:14,
            }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:color, flexShrink:0 }} />
              <div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"var(--txt)", fontWeight:700 }}>{name}</div>
                <div style={{ fontSize:12, color:"var(--mut-lt)", marginTop:2 }}>{detail}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Screenshots ── */}
      <section className="ss-section" id="screenshots">
        <div className="s-label reveal">THE PRODUCT</div>
        <h2 className="s-h2 reveal">Every module — <span style={{ color:"var(--grn)" }}>live on testnet</span></h2>
        <p className="s-sub reveal" style={{ marginBottom:32 }}>
          Real screenshots from the live Sepolia build. Click any tab to explore.
        </p>
        <div className="ss-tabs">
          {TABS.map((t,i) => (
            <button key={t.id} className={`ss-tab${activeTab === i ? " on" : ""}`} onClick={() => setActiveTab(i)}>{t.label}</button>
          ))}
        </div>
        <div className="ss-frame">
          <div className="ss-bar">
            <div className="ss-dots">
              {["#FF5F57","#FEBC2E","#28C840"].map((c,i)=><div key={i} className="ss-dot" style={{ background:c }} />)}
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
        eyebrow="SEE IT LIVE"
        title={<>A 30-minute walkthrough covers<br/><span style={{ color:"var(--grn)" }}>every module end to end</span></>}
        subtitle="We'll walk through the order book, emission tracking, CCTS module, and regulatory exports live on testnet — using your company's sector and obligations as the example."
        note="No commitment · Live on real testnet · Response within 24 hours"
      />
    </>
  );
}