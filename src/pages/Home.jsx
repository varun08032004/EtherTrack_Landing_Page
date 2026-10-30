import { useState } from "react";
import { Link } from "react-router-dom";
import { useReveal, useBentoGlow } from "../hooks";
import { useDemoModal } from "../hooks/useDemoModal";
import { STATS, GAPS, HOW, MQ_ITEMS, WHY_NOW, WHY_WIN } from "../data";
import AnimatedStat from "../components/AnimatedStat";
import CtaBand from "../components/CtaBand";
import Seo from "../components/Seo";

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
  useReveal([gapTab]);
  useBentoGlow();

  return (
    <>
      <Seo
        title="EtherTrack | India's Carbon Infrastructure Platform"
        description="India's blockchain-native carbon platform: track emissions, trade credits on a live order book, retire on-chain, generate BRSR/CDP/TCFD/GRI/GHG reports."
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
        <style>{`
          .moat-grid {
            display: grid;
            grid-template-columns: 56px 1fr 1fr;
            gap: 28px;
            align-items: start;
            padding: 28px 32px;
            background: var(--surf2);
            border: 1px solid var(--brd);
            border-radius: var(--r-lg);
          }
          .moat-grid .moat-icon {
            width: 52px; height: 52px; border-radius: 50%;
            background: var(--bg); border: 1px solid var(--brd);
            display: flex; align-items: center; justify-content: center;
            font-size: 22px; flex-shrink: 0;
          }
          .moat-grid .moat-title-row {
            font-family: var(--font-mono); font-size: 9px; letter-spacing: .15em; margin-bottom: 8px;
          }
          .moat-grid h3 {
            font-family: var(--font-head); font-size: 15px; font-weight: 700; margin-bottom: 10px; line-height: 1.3;
          }
          .moat-grid .moat-desc {
            font-size: 13px; color: #9abba6; line-height: 1.75; font-weight: 300;
          }
          .moat-grid .moat-moat {
            border-left: 1px solid var(--brd); padding-left: 28px;
          }
          .moat-grid .moat-moat-label {
            font-family: var(--font-mono); font-size: 9px; color: var(--mut-lt); letter-spacing: .12em; margin-bottom: 8px;
          }
          .moat-grid .moat-moat-text {
            font-size: 13px; color: var(--txt); line-height: 1.75; font-weight: 300;
          }
          @media (max-width: 900px) {
            .moat-grid {
              grid-template-columns: 1fr;
              gap: 16px;
              padding: 24px;
            }
            .moat-grid .moat-icon {
              width: 48px; height: 48px; font-size: 20px;
            }
            .moat-grid .moat-moat {
              border-left: none; padding-left: 0; border-top: 1px solid var(--brd); padding-top: 16px; margin-top: 8px;
            }
          }
        `}</style>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {WHY_WIN.map((w,i) => (
            <div key={i} className="reveal moat-grid" style={{ borderColor: `${w.color}33` }}>
              <div className="moat-icon" style={{ borderColor: `${w.color}33` }}>{w.icon}</div>
              <div>
                <div className="moat-title-row" style={{ color: w.color }}>ADVANTAGE {w.n}</div>
                <h3>{w.title}</h3>
                <div className="moat-desc">{w.desc}</div>
              </div>
              <div className="moat-moat">
                <div className="moat-moat-label">WHY IT'S HARD TO REPLICATE</div>
                <div className="moat-moat-text">{w.moat}</div>
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
        <style>{`
          .why-now-grid {
            display: grid;
            grid-template-columns: 40px 1fr 1fr;
            gap: 24px;
            align-items: start;
            padding: 24px 28px;
            background: var(--surf);
            border: 1px solid var(--brd);
            border-radius: var(--r-lg);
            border-left: 3px solid var(--grn);
          }
          .why-now-grid .wn-icon { font-size: 24px; flex-shrink: 0; }
          .why-now-grid .wn-col {
            min-width: 0;
          }
          .why-now-grid .wn-label {
            font-family: var(--font-mono); font-size: 9px; letter-spacing: .15em; margin-bottom: 8px;
          }
          .why-now-grid .wn-text {
            font-size: 14px; line-height: 1.7; font-weight: 300;
          }
          .why-now-grid .wn-after {
            border-left: 1px solid var(--brd); padding-left: 24px;
          }
          .why-now-grid .wn-after-label {
            font-family: var(--font-mono); font-size: 9px; letter-spacing: .15em; margin-bottom: 8px; font-weight: 400;
          }
          .why-now-grid .wn-after-text {
            font-size: 14px; color: var(--txt); line-height: 1.7; font-weight: 400;
          }
          @media (max-width: 900px) {
            .why-now-grid {
              grid-template-columns: 1fr;
              gap: 16px;
              padding: 20px;
            }
            .why-now-grid .wn-after {
              border-left: none; padding-left: 0; border-top: 1px solid var(--brd); padding-top: 16px; margin-top: 8px;
            }
            .why-now-grid .wn-icon { font-size: 28px; }
          }
        `}</style>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {WHY_NOW.map((item,i) => (
            <div key={i} className="reveal why-now-grid" style={{ borderLeftColor: item.color }}>
              <div className="wn-icon">{item.icon}</div>
              <div className="wn-col">
                <div className="wn-label" style={{ color: "var(--mut-lt)" }}>{item.label} — BEFORE</div>
                <div className="wn-text" style={{ color: "var(--mut-lt)" }}>{item.before}</div>
              </div>
              <div className="wn-col wn-after">
                <div className="wn-after-label" style={{ color: item.color }}>STATUS TODAY</div>
                <div className="wn-after-text">{item.after}</div>
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
        <div className="pricing-grid">
          {/* FREE */}
          <div className="price-card reveal">
            <div className="price-tier">FREE</div>
            <div className="price-name">Free</div>
            <div className="price-tag">Start exploring today</div>
            <div className="price-desc">Ideal for individuals, students, and companies that want to understand carbon trading before committing.</div>
            <div className="price-amt-row">
              <span className="price-amt">₹0</span>
              <span className="price-per">forever</span>
            </div>
            <div className="price-pills">
              <span className="price-pill"><span className="price-pill-dot" style={{ background:"var(--org)" }} />2% trading fee</span>
              <span className="price-pill"><span className="price-pill-dot" style={{ background:"var(--blu)" }} />1 seat</span>
            </div>
            <div className="price-divider" />
            <div className="price-feats">
              <div className="price-feat locked"><span className="price-feat-icon">🔒</span>Portfolio management</div>
              <div className="price-feat locked"><span className="price-feat-icon">🔒</span>List & sell credits</div>
              <div className="price-feat locked"><span className="price-feat-icon">🔒</span>Credit retirement</div>
              <div className="price-feat locked"><span className="price-feat-icon">🔒</span>Portfolio export</div>
              <div className="price-feat locked"><span className="price-feat-icon">🔒</span>Emission tracking</div>
              <div className="price-feat locked"><span className="price-feat-icon">🔒</span>Compliance dashboard</div>
              <div className="price-feat locked"><span className="price-feat-icon">🔒</span>Team management</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>Buy credits from the marketplace</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>Browse live listings & real-time prices</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>On-chain transaction receipt</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>Basic carbon footprint calculator</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>Wallet & trading history</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>Email support</div>
            </div>
            <button className="price-cta" onClick={openDemo}>Get Started →</button>
          </div>

          {/* STARTER */}
          <div className="price-card reveal">
            <div className="price-tier">STARTER</div>
            <div className="price-name">Starter</div>
            <div className="price-tag">For active traders</div>
            <div className="price-desc">Freelancers, ESG consultants, small NGOs, and active credit traders who need the full marketplace experience.</div>
            <div className="price-amt-row">
              <span className="price-amt">₹11,999</span>
              <span className="price-per">/yr</span>
            </div>
            <div className="price-gst">+ 18% GST</div>
            <div className="price-save">Save ₹0 vs monthly billing</div>
            <div className="price-pills">
              <span className="price-pill"><span className="price-pill-dot" style={{ background:"var(--org)" }} />1% trading fee</span>
              <span className="price-pill"><span className="price-pill-dot" style={{ background:"var(--blu)" }} />3 seats</span>
            </div>
            <div className="price-divider" />
            <div className="price-feats">
              <div className="price-feat locked"><span className="price-feat-icon">🔒</span>Emission tracking (Growth+)</div>
              <div className="price-feat locked"><span className="price-feat-icon">🔒</span>Compliance dashboard (Corporate)</div>
              <div className="price-feat locked"><span className="price-feat-icon">🔒</span>Team management (Corporate)</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>Everything in Free</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>Full portfolio management</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>List & sell credits on the marketplace</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>On-chain credit retirement</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>Portfolio export (CSV)</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>Blockchain audit trail PDF</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>3 seats included</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>Priority email support</div>
            </div>
            <button className="price-cta" onClick={openDemo}>Get Started →</button>
          </div>

          {/* GROWTH */}
          <div className="price-card reveal popular">
            <div className="price-badge">★ MOST POPULAR</div>
            <div className="price-tier">GROWTH</div>
            <div className="price-name">Growth</div>
            <div className="price-tag">Most popular</div>
            <div className="price-desc">MSMEs, growing businesses, and serious ESG teams that need full GHG tracking and regulatory reporting.</div>
            <div className="price-amt-row">
              <span className="price-amt">₹1,56,000</span>
              <span className="price-per">/yr</span>
            </div>
            <div className="price-gst">+ 18% GST</div>
            <div className="price-save">Save ₹0 vs monthly billing</div>
            <div className="price-pills">
              <span className="price-pill"><span className="price-pill-dot" style={{ background:"var(--org)" }} />0.75% trading fee</span>
              <span className="price-pill"><span className="price-pill-dot" style={{ background:"var(--blu)" }} />10 seats</span>
            </div>
            <div className="price-divider" />
            <div className="price-feats">
              <div className="price-feat locked"><span className="price-feat-icon">🔒</span>Compliance dashboard (Corporate)</div>
              <div className="price-feat locked"><span className="price-feat-icon">🔒</span>Team management (Corporate)</div>
              <div className="price-feat locked"><span className="price-feat-icon">🔒</span>BRSR/CDP/TCFD/GRI reports (Corporate)</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>Everything in Starter</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>Scope 1 + 2 full tracking</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>Basic Scope 3 (5 categories)</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>GHG inventory ledger</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>CSV export + analytics dashboard</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>Carbon intensity metrics</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>Basic decarbonisation scenarios</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>GHG Protocol PDF report</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>10 seats included</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>Chat support</div>
            </div>
            <button className="price-cta solid" onClick={openDemo}>Get Started →</button>
          </div>

          {/* CORPORATE */}
          <div className="price-card reveal">
            <div className="price-badge org">ENTERPRISE</div>
            <div className="price-tier">CORPORATE</div>
            <div className="price-name">Corporate</div>
            <div className="price-tag">For listed companies</div>
            <div className="price-desc">SEBI-listed companies, BRSR filers, large ESG teams, and organisations with CDP/TCFD obligations.</div>
            <div className="price-amt-row">
              <span className="price-amt">Contact Sales</span>
            </div>
            <div className="price-pills">
              <span className="price-pill"><span className="price-pill-dot" style={{ background:"var(--org)" }} />0.5% trading fee</span>
              <span className="price-pill"><span className="price-pill-dot" style={{ background:"var(--blu)" }} />Unlimited seats</span>
            </div>
            <div className="price-divider" />
            <div className="price-feats">
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>Everything in Growth</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>Full Scope 3 — all 15 GHG Protocol categories</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>BRSR Core · CDP Climate · TCFD · GRI · GHG Protocol PDF exports</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>Blockchain audit trail + verifier integration</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>BV, DNV, EY, Deloitte, TÜV SÜD, BSI, KPMG supported</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>GEI / BEE CCTS compliance module</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>PAT scheme + CCTS Forms A–E2</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>5-year science-based decarbonisation plan</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>MRV calendar + SBTi target setting</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>Supplier data portal</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>Multi-entity consolidation</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>Carbon neutrality certificate</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>Regulatory deadline alerts</div>
              <div className="price-feat unlocked"><span className="price-feat-icon">✓</span>Custom seats · custom pricing</div>
            </div>
            <button className="price-cta" onClick={openDemo}>Contact Sales</button>
          </div>
        </div>
        <div className="price-app-note reveal">
          <span style={{ color:"var(--grn)" }}>●</span>&nbsp;
          All prices exclude GST where noted · Trading fee hardcoded in Marketplace.sol · Verifiable on Etherscan
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