import { useState } from "react";
import { Link } from "react-router-dom";
import { useReveal, useBentoGlow, usePricing } from "../hooks";
import { useDemoModal } from "../hooks/useDemoModal";
import { STATS, GAPS, HOW, MQ_ITEMS, WHY_NOW, WHY_WIN } from "../data";
import AnimatedStat from "../components/AnimatedStat";
import CtaBand from "../components/CtaBand";
import Seo from "../components/Seo";

function formatPercent(value) {
  if (value === null || value === undefined) return '—';
  return Number(value).toFixed(5).replace(/\.?0+$/, '') + '%';
}

/* ─── ON THE RECORD — badge grid ────────────────────────────────────
   Drop official logo files into /public/badges/ and point each `logo`
   path below at them. Flip `status` per item once each one is
   confirmed — everything ships as "Application filed" until then.
   ──────────────────────────────────────────────────────────────── */
const ON_THE_RECORD = [
  { name: "DPIIT",          short: "DPIIT", full: "Startup India Recognition",     logo: "/badges/dpiit.png",  status: "approved" },
  { name: "GRID-India ICM", short: "GI",    full: "Carbon Credit Registry",         logo: "/badges/grid.png",   status: "filed" },
  { name: "CERC",           short: "CERC",  full: "Permitted Entity, Sec 9(3)",     logo: "/badges/cerc.png",   status: "filed" },
  { name: "Verra",          short: "VCS",   full: "VCS Registry Integration",       logo: "/badges/verra.png",  status: "filed" },
  { name: "Gold Standard",  short: "GS",    full: "GS4GG Registry Integration",     logo: "/badges/gold.png",   status: "filed" },
];

const STATUS_META = {
  filed:    { label: "Application filed", color: "var(--org)" },
  approved: { label: "Recognised",        color: "var(--grn)" },
};

function OnTheRecord() {
  return (
    <section className="section" id="on-the-record" style={{ paddingTop: 28, paddingBottom: 28 }}>
      <div className="s-label reveal">REGULATORY STANDING</div>
      <h2 className="s-h2 reveal">
        Building credibility<br/>
        <span style={{ color: "var(--grn)" }}>with every registry that matters</span>
      </h2>
      <p className="s-sub reveal">
        Applications filed with India's core carbon and startup registries — status tracked openly, not overstated.
      </p>

      <style>{`
        @keyframes otr-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes otr-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes otr-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .otr-wrap {
          animation: otr-in .5s ease-out both;
        }
        .otr-logo-shape {
          animation: otr-float 3.6s ease-in-out infinite;
          transition: transform .25s ease;
        }
        .otr-item:hover .otr-logo-shape {
          transform: scale(1.05);
        }
        .otr-track {
          display: flex;
          width: max-content;
          animation: otr-scroll 18s linear infinite;
        }
        .otr-ticker:hover .otr-track {
          animation-play-state: paused;
        }
      `}</style>

      <div className="otr-ticker reveal" style={{
        overflow: "hidden", width: "100%",
        maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}>
        <div className="otr-track">
          {[0, 1].map(pass => ON_THE_RECORD.map((item, i) => {
            const meta = STATUS_META[item.status];
            return (
              <div
                key={`${pass}-${i}`}
                className="otr-item"
                style={{
                  flexShrink: 0,
                  width: 700, display: "flex", justifyContent: "center", alignItems: "center",
                }}
              >
                <div
                  className="otr-logo-shape"
                  style={{
                    animationDelay: `${i * 0.4}s`,
                    width: 600, height: 320,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <img
                    src={item.logo}
                    alt={`${item.name} logo`}
                    style={{ width: 560, height: 280, objectFit: "contain", position: "absolute" }}
                    onLoad={(e) => {
                      const fallback = e.currentTarget.nextElementSibling;
                      if (fallback) fallback.style.display = "none";
                    }}
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                  <span style={{
                    fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 90,
                    color: meta.color, position: "absolute",
                  }}>
                    {item.short}
                  </span>
                </div>
              </div>
            );
          }))}
        </div>
      </div>

      <div className="reveal" style={{
        marginTop: 24, padding: "14px 28px",
        background: "rgba(0,224,80,.04)", border: "1px solid var(--grnd)",
        borderRadius: "var(--r-md)", fontFamily: "var(--font-mono)",
        fontSize: 11, color: "var(--mut-lt)", lineHeight: 1.8,
      }}>
        Five registries in progress. One compliance backbone, built into EtherTrack from day one.
      </div>
    </section>
  );
}

export default function Home() {
  const [gapTab, setGapTab] = useState(0);
  const { openDemo } = useDemoModal();
  const { pricing, loading: pricingLoading } = usePricing();
  useReveal([gapTab]);
  useBentoGlow();

  // Build pricing cards from live data + static config for Free/Corporate
  const pricingCards = pricing ? [
    {
      tier: "FREE", name: "Free", tag: "Start exploring today",
      desc: "Ideal for individuals, students, and companies that want to understand carbon trading before committing.",
      price: "₹0", period: "forever", gst: null, save: null,
      fee: formatPercent(pricing.free?.buyer_fee_percent), seats: "1 seat", popular: false,
      locked: ["Portfolio management", "List & sell credits", "Credit retirement", "Portfolio export", "Emission tracking", "Compliance dashboard", "Team management"],
      unlocked: ["Buy credits from the marketplace", "Browse live listings & real-time prices", "On-chain transaction receipt", "Basic carbon footprint calculator", "Wallet & trading history", "Email support"],
      cta: "Get Started", solid: false,
    },
    {
      tier: "STARTER", name: "Starter", tag: "For active traders",
      desc: "Freelancers, ESG consultants, small NGOs, and active credit traders who need the full marketplace experience.",
      price: `₹${pricing.starter.annual.toLocaleString()}`, period: "/yr", gst: "+ 18% GST", save: `Save ₹${(pricing.starter.monthly * 12 - pricing.starter.annual).toLocaleString()} vs monthly billing`,
      fee: formatPercent(pricing.starter?.buyer_fee_percent), seats: "3 seats", popular: false,
      locked: ["Emission tracking (Growth+)", "Compliance dashboard (Corporate)", "Team management (Corporate)"],
      unlocked: ["Everything in Free", "Full portfolio management", "List & sell credits on the marketplace", "On-chain credit retirement", "Portfolio export (CSV)", "Blockchain audit trail PDF", "3 seats included", "Priority email support"],
      cta: "Get Started", solid: false,
    },
    {
      tier: "GROWTH", name: "Growth", tag: "Most popular",
      desc: "MSMEs, growing businesses, and serious ESG teams that need full GHG tracking and regulatory reporting.",
      price: `₹${pricing.growth.annual.toLocaleString()}`, period: "/yr", gst: "+ 18% GST", save: `Save ₹${(pricing.growth.monthly * 12 - pricing.growth.annual).toLocaleString()} vs monthly billing`,
      fee: formatPercent(pricing.growth?.buyer_fee_percent), seats: "10 seats", popular: true,
      locked: ["Compliance dashboard (Corporate)", "Team management (Corporate)", "BRSR/CDP/TCFD/GRI reports (Corporate)"],
      unlocked: ["Everything in Starter", "Scope 1 + 2 full tracking", "Basic Scope 3 (5 categories)", "GHG inventory ledger", "CSV export + analytics dashboard", "Carbon intensity metrics", "Basic decarbonisation scenarios", "GHG Protocol PDF report", "10 seats included", "Chat support"],
      cta: "Get Started", solid: true,
    },
    {
      tier: "CORPORATE", name: "Corporate", tag: "For listed companies",
      desc: "SEBI-listed companies, BRSR filers, large ESG teams, and organisations with CDP/TCFD obligations.",
      price: "Contact Sales", period: "", gst: null, save: null,
      fee: formatPercent(pricing.corporate?.buyer_fee_percent), seats: "Unlimited seats", popular: false,
      locked: [],
      unlocked: [
        "Everything in Growth",
        "Full Scope 3 — all 15 GHG Protocol categories",
        "BRSR Core · CDP Climate · TCFD · GRI · GHG Protocol PDF exports",
        "Blockchain audit trail + verifier integration",
        "BV, DNV, EY, Deloitte, TÜV SÜD, BSI, KPMG supported",
        "GEI / BEE CCTS compliance module",
        "PAT scheme + CCTS Forms A–E2",
        "5-year science-based decarbonisation plan",
        "MRV calendar + SBTi target setting",
        "Supplier data portal",
        "Multi-entity consolidation",
        "Carbon neutrality certificate",
        "Regulatory deadline alerts",
        "Custom seats · custom pricing",
      ],
      cta: "Contact Sales", solid: false,
    },
  ] : [];

  return (
    <>
      <Seo
        title="EtherTrack — Blockchain-Native Carbon Infrastructure Platform for India"
        description="Track emissions, trade carbon credits on a live order book, retire on-chain, and generate BRSR, CDP, TCFD, GRI, and GHG Protocol reports — all on one platform built for India's CCTS compliance market."
        path="/"
      />
      {/* ── Hero ── */}
      <section className="hero">
        <div className="eyebrow">INDIA'S BLOCKCHAIN-NATIVE CARBON INFRASTRUCTURE PLATFORM</div>
        <div className="hero-verb-row">TRACK · TOKENISE · TRADE · RETIRE · REPORT</div>
        <style>{`
          .hero-h1-line {
            display: block;
            white-space: nowrap;
          }
          @media (max-width: 640px) {
            .hero-h1 {
              font-size: 2rem !important;
              line-height: 1.25 !important;
            }
            .hero-h1-line {
              white-space: normal !important;
            }
          }
        `}</style>
        <h1 className="h1 hero-h1" style={{ fontSize: "clamp(1.9rem, 3.8vw, 3.5rem)", lineHeight: 1.15 }}>
          <span className="hero-h1-line">The Carbon Infrastructure</span>
          <span className="g hero-h1-line">India Deserves</span>
          <span className="o hero-h1-line">Finally Built.</span>
        </h1>
        <p className="hero-sub">
          From emission log to verified on-chain retirement — in one session.
          A platform that closes the entire carbon loop: live order book,
          hybrid AMM, full GHG inventory, and five regulatory reports, all in one place.
        </p>
        <div className="actions">
          <button className="btn-p" onClick={openDemo}>REQUEST A DEMO →</button>
          <a className="btn-g" href="https://app.ethertrack.in" target="_blank" rel="noopener noreferrer">EXPLORE LIVE TESTNET ↗</a>
        </div>
        <p className="hero-note">Live on Ethereum Sepolia testnet · Real smart contracts · Real workflows · No financial value yet</p>
      </section>

      {/* ── Marquee ── */}
      <div className="mq-wrap">
        <div className="mq-track">
          {[0,1].map(pass => MQ_ITEMS.map((item,i) => (
            <div key={`${pass}-${i}`} className="mq-item">
              {item.dot && <span style={{ color:item.dot }}>●</span>}
              {item.text}
            </div>
          )))}
        </div>
      </div>

      {/* ── Stats ── */}
      <section className="section" style={{ paddingBottom:0 }}>
        <div className="stats-row reveal">
          {STATS.map((s,i) => (
            <div key={i} className="s-cell">
              <AnimatedStat value={s.num} color={s.color} />
              <div className="s-lbl">{s.lbl}</div>
              <div className="s-src">{s.src}</div>
            </div>
          ))}
        </div>
      </section>


      <section className="section" id="market-gap">
        <div className="s-label reveal">WHY ETHERTRACK EXISTS</div>
        <h2 className="s-h2 reveal">India's carbon market has six<br/><span style={{ color:"var(--grn)" }}>fundamental problems — we solved them</span></h2>
        <p className="s-sub reveal">Every solution below is live on Ethereum Sepolia testnet today. Not a roadmap. Not a promise. Working software.</p>
        <div className="gap-tabs">
          {GAPS.map((g,i) => (
            <button key={i} className={`gap-tab-btn${gapTab === i ? " on" : ""}`} onClick={() => setGapTab(i)}>
              <span className="gap-tab-n">0{i+1}</span>{g.tabLabel}
            </button>
          ))}
        </div>
        <div className="gap-grid">
          {(() => {
            const g = GAPS[gapTab];
            return (
              <div className="gap-card reveal">
                <div className="gap-num">0{gapTab+1}</div>
                <div>
                  <div className={`gtag ${g.tagP}`}>THE PROBLEM</div>
                  <div className="g-title">{g.problem}</div>
                  <div className="g-desc">{g.problemDesc}</div>
                </div>
                <div>
                  <div className={`gtag ${g.tagS}`}>{g.tagLabel}</div>
                  <div className="g-title" style={gapTab === 1 ? { color:"var(--grn)" } : {}}>{g.solution}</div>
                  <div className="g-desc">{g.solutionDesc}</div>
                  <div className="gap-facts">
                    {g.facts.map((f,j) => <div key={j} className="gap-fact">{f}</div>)}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>


      <section className="section" id="how" style={{ background:"var(--surf)", borderTop:"1px solid var(--brd)" }}>
        <div className="s-label reveal">HOW IT WORKS</div>
        <h2 className="s-h2 reveal">From zero to compliant<br/><span style={{ color:"var(--grn)" }}>{HOW.length} steps, one platform</span></h2>
        <p className="s-sub reveal">No consultants. No spreadsheets. No switching between tools. The entire carbon compliance workflow lives in a single session on EtherTrack.</p>
        <style>{`
          .how-grid-5 { grid-template-columns: repeat(5, 1fr); }
          .how-grid-5::before { left: 10%; right: 10%; }
          @media (max-width: 1024px) {
            .how-grid-5 {
              grid-template-columns: 1fr;
              gap: 28px;
              max-width: 480px;
              margin: 0 auto;
            }
            .how-grid-5::before { display: none; }
            .how-grid-5 .how-step { text-align: left; padding: 0; }
            .how-grid-5 .how-n {
              width: 56px; height: 56px; font-size: 18px;
              margin: 0 0 12px 0;
            }
          }
          @media (max-width: 480px) {
            .how-grid-5 { gap: 20px; }
            .how-grid-5 .how-n { width: 48px; height: 48px; font-size: 16px; }
            .how-grid-5 .how-ttl { font-size: 13px; }
            .how-grid-5 .how-desc { font-size: 12px; }
          }
        `}</style>
        <div className="how-grid how-grid-5">
          {HOW.map((s,i) => (
            <div key={i} className="how-step reveal">
              <div className="how-n">{s.n}</div>
              <div className="how-ttl">{s.title}</div>
              <p className="how-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── On the Record ── */}
<OnTheRecord />

       {/* ── Why We Win ── */}
       <section className="section" style={{ background:"var(--surf)", borderTop:"1px solid var(--brd)" }}>
        <div className="s-label reveal">STRUCTURAL ADVANTAGES</div>
        <h2 className="s-h2 reveal">Six moats, not features<br/><span style={{ color:"var(--grn)" }}>Built into the architecture</span></h2>
        <p className="s-sub reveal">
          Features can be copied. These six advantages compound over time and become harder to replicate
          the longer EtherTrack operates. None of them rest on being first with a feature alone.
        </p>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {WHY_WIN.map((w,i) => (
            <div key={i} className="reveal" style={{
              background:"var(--surf2)", border:"1px solid var(--brd)",
              borderRadius:"var(--r-lg)", padding:"28px 32px",
              display:"grid", gridTemplateColumns:"56px 1fr 1fr", gap:28, alignItems:"start",
            }}>
              <div style={{
                width:52, height:52, borderRadius:"50%",
                background:"var(--bg)", border:`1px solid ${w.color}33`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:22, flexShrink:0,
              }}>{w.icon}</div>
              <div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:w.color, letterSpacing:".15em", marginBottom:8 }}>ADVANTAGE {w.n}</div>
                <div style={{ fontFamily:"var(--font-head)", fontSize:15, fontWeight:700, marginBottom:10, lineHeight:1.3 }}>{w.title}</div>
                <div style={{ fontSize:13, color:"#9abba6", lineHeight:1.75, fontWeight:300 }}>{w.desc}</div>
              </div>
              <div style={{ borderLeft:"1px solid var(--brd)", paddingLeft:28 }}>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--mut-lt)", letterSpacing:".12em", marginBottom:8 }}>WHY IT'S HARD TO REPLICATE</div>
                <div style={{ fontSize:13, color:"var(--txt)", lineHeight:1.75, fontWeight:300 }}>{w.moat}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

{/* ── Why Now — Five Conditions ── */}
      <section className="section">
        <div className="s-label reveal">WHY NOW AND NOT TWO YEARS AGO</div>
        <h2 className="s-h2 reveal">Five conditions had to converge<br/><span style={{ color:"var(--grn)" }}>They all did — between 2022 and 2026</span></h2>
        <p className="s-sub reveal">
          EtherTrack could not have existed before 2022. Every one of the conditions below
          had to be true simultaneously — and they all became true in a four-year window
          that is still open, but narrowing fast.
        </p>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {WHY_NOW.map((item,i) => (
            <div key={i} className="reveal" style={{
              display:"grid", gridTemplateColumns:"40px 1fr 1fr", gap:24,
              background:"var(--surf)", border:"1px solid var(--brd)",
              borderRadius:"var(--r-lg)", padding:"24px 28px", alignItems:"start",
              borderLeft:`3px solid ${item.color}`,
            }}>
              <div style={{ fontSize:24 }}>{item.icon}</div>
              <div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:".15em", color:"var(--mut-lt)", marginBottom:8 }}>{item.label} — BEFORE</div>
                <div style={{ fontSize:14, color:"var(--mut-lt)", lineHeight:1.7, fontWeight:300 }}>{item.before}</div>
              </div>
              <div style={{ borderLeft:"1px solid var(--brd)", paddingLeft:24 }}>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:".15em", color:item.color, marginBottom:8 }}>STATUS TODAY</div>
                <div style={{ fontSize:14, color:"var(--txt)", lineHeight:1.7, fontWeight:400 }}>{item.after}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="reveal" style={{
          marginTop:16, padding:"20px 28px",
          background:"rgba(0,224,80,.04)", border:"1px solid var(--grnd)",
          borderRadius:"var(--r-md)", fontFamily:"var(--font-mono)",
          fontSize:12, color:"var(--grn)", lineHeight:1.8,
        }}>
          → These five conditions activating together between 2022 and 2026 created a non-discretionary compliance market.
          Companies building their carbon infrastructure now will have established baselines, audit trails,
          and regulatory records before enforcement pressure intensifies.
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="section" id="pricing" style={{ borderTop:"1px solid var(--brd)", borderBottom:"1px solid var(--brd)" }}>
        <div className="s-label reveal">PRICING</div>
        <h2 className="s-h2 reveal">Transparent pricing<br/><span style={{ color:"var(--grn)" }}>No surprises, ever</span></h2>
        <p className="s-sub reveal">One fixed platform fee, hardcoded in the smart contract and verifiable on Etherscan. As your usage grows, your fee rate drops.</p>
        {pricingLoading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: 60 }}>
            <div style={{ width: 32, height: 32, border: "3px solid var(--brd)", borderTopColor: "var(--grn)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
          </div>
        ) : (
          <div className="pricing-grid">
            {pricingCards.map((p) => (
              <div key={p.tier} className={`price-card reveal${p.popular ? " popular" : ""}`}>
                {p.popular && <div className="price-badge">★ MOST POPULAR</div>}
                {p.tier === "CORPORATE" && <div className="price-badge org">ENTERPRISE</div>}
                <div className="price-tier">{p.tier}</div>
                <div className="price-name">{p.name}</div>
                <div className="price-tag">{p.tag}</div>
                <div className="price-desc">{p.desc}</div>
                <div className="price-amt-row">
                  <span className="price-amt">{p.price}</span>
                  {p.period && <span className="price-per">{p.period}</span>}
                </div>
                {p.gst && <div className="price-gst">{p.gst}</div>}
                {p.save && <div className="price-save">{p.save}</div>}
                <div className="price-pills">
                  <span className="price-pill"><span className="price-pill-dot" style={{ background:"var(--org)" }} />{p.fee} trading fee</span>
                  <span className="price-pill"><span className="price-pill-dot" style={{ background:"var(--blu)" }} />{p.seats}</span>
                </div>
                <div className="price-divider" />
                <div className="price-feats">
                  {p.locked.map((f,j) => <div key={`l${j}`} className="price-feat locked"><span className="price-feat-icon">🔒</span>{f}</div>)}
                  {p.unlocked.map((f,j) => <div key={`u${j}`} className="price-feat unlocked"><span className="price-feat-icon">✓</span>{f}</div>)}
                </div>
                <button className={`price-cta${p.solid ? " solid" : ""}`} onClick={openDemo}>{p.cta}{p.cta === "Get Started" ? " →" : ""}</button>
              </div>
            ))}
          </div>
        )}
        <div className="price-app-note reveal">
          <span style={{ color:"var(--grn)" }}>●</span>&nbsp;
          All prices exclude GST where noted · Trading fee hardcoded in Marketplace.sol · Verifiable on Etherscan
          {pricing && !pricingLoading && <span style={{ marginLeft: 16, color: "var(--mut-lt)", fontFamily: "var(--font-mono)", fontSize: 11 }}>· Sourced from ERP</span>}
        </div>
      </section>

      {/* ── Explore more ── */}
      <section className="section">
        <div className="s-label reveal">EXPLORE ETHERTRACK</div>
        <h2 className="s-h2 reveal">Built for your role<br/><span style={{ color:"var(--grn)" }}>See what's relevant to you</span></h2>
        <div className="bento">
          <Link to="/platform" className="b-card c4 reveal" style={{ textDecoration:"none" }}>
            <span className="b-icon">🧩</span>
            <div className="b-title">Platform</div>
            <div className="b-desc">The full technical breakdown — order book, AMM, GHG engine, compliance module, named smart contracts, and live product screenshots.</div>
            <div className="b-tag">EXPLORE THE PLATFORM →</div>
          </Link>
          <Link to="/solutions" className="b-card c4 reveal" style={{ textDecoration:"none" }}>
            <span className="b-icon">🧭</span>
            <div className="b-title">Solutions</div>
            <div className="b-desc">Different workflows for corporates, MSMEs, project developers, consultants, and CCTS compliance officers. See yours.</div>
            <div className="b-tag">FIND YOUR SOLUTION →</div>
          </Link>
          <Link to="/industries" className="b-card c4 reveal" style={{ textDecoration:"none" }}>
            <span className="b-icon">🏗️</span>
            <div className="b-title">Industries</div>
            <div className="b-desc">Every CCTS-gazetted sector, every voluntary-market segment, and the advisors that serve them — all covered.</div>
            <div className="b-tag">SEE YOUR INDUSTRY →</div>
          </Link>
        </div>
      </section>

      <CtaBand
        eyebrow="THE CCTS DEADLINE IS NOW"
        title={<>490 entities, FY2026<br/><span style={{ color:"var(--org)" }}>The clock is already running</span></>}
        subtitle="India's Carbon Credit Trading Scheme is not a future obligation — it is live. If your company is in one of the nine gazetted sectors, your GEI baseline period has already started. Request a demo and get ahead of it."
        note="No commitment · 30-minute live walkthrough on testnet · Response within 24 hours"
      />
    </>
  );
}