import { useState } from "react";
import { Link } from "react-router-dom";
import { useReveal, useBentoGlow } from "../hooks";
import { useDemoModal } from "../context/DemoModalContext";
import { STATS, GAPS, HOW, PRICING, MQ_ITEMS, WHY_NOW, TAM, WHY_WIN } from "../data";
import AnimatedStat from "../components/AnimatedStat";
import CtaBand from "../components/CtaBand";
import Seo from "../components/Seo";

export default function Home() {
  const [gapTab, setGapTab] = useState(0);
  const { openDemo } = useDemoModal();
  useReveal([gapTab]);
  useBentoGlow();

  return (
    <>
      <Seo
        title="EtherTrack — Blockchain-Native Carbon Infrastructure Platform for India"
        description="Track emissions, trade carbon credits on a live order book, retire on-chain, and generate BRSR, CDP, TCFD, and GHG Protocol reports — all on one platform built for India's CCTS compliance market."
        path="/"
      />
      {/* ── Hero ── */}
      <section className="hero">
        <div className="eyebrow">INDIA'S BLOCKCHAIN-NATIVE CARBON INFRASTRUCTURE PLATFORM</div>
        <div className="hero-verb-row">TRACK · TOKENISE · TRADE · RETIRE · REPORT</div>
        <h1 className="h1">
          The Carbon Market<br/>
          <span className="g">India Deserves</span><br/>
          <span className="o">Finally Built.</span>
        </h1>
        <p className="hero-sub">
          From emission log to verified on-chain retirement — in one session.
          A platform that closes the entire carbon loop: live order book,
          hybrid AMM, full GHG inventory, and four regulatory reports, all in one place.
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

      {/* ── Market Opportunity ── */}
      <section className="section" style={{ background:"var(--surf)", borderTop:"1px solid var(--brd)" }}>
        <div className="s-label reveal">MARKET OPPORTUNITY</div>
        <h2 className="s-h2 reveal">Not a niche market<br/><span style={{ color:"var(--grn)" }}>A regulatory inevitability</span></h2>
        <p className="s-sub reveal">
          Every number below is a published third-party estimate based on enacted regulation —
          not speculation. The demand is non-discretionary. The infrastructure is what's missing.
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14, marginBottom:40 }}>
          {TAM.map((t,i) => (
            <div key={i} className="reveal" style={{
              background:"var(--surf2)", border:"1px solid var(--brd)",
              borderRadius:"var(--r-lg)", padding:"28px 30px",
              borderTop:`3px solid ${t.color}`,
            }}>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"var(--mut-lt)", letterSpacing:".12em", marginBottom:16 }}>{t.segment.toUpperCase()}</div>
              <div style={{ display:"flex", gap:32, marginBottom:16, alignItems:"flex-end", flexWrap:"wrap" }}>
                <div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--mut)", marginBottom:4 }}>2026 ESTIMATE</div>
                  <div style={{ fontFamily:"var(--font-head)", fontSize:26, fontWeight:900, color:t.color, lineHeight:1 }}>{t.now}</div>
                </div>
                <div style={{ color:"var(--mut)", fontSize:18, paddingBottom:4 }}>→</div>
                <div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--mut)", marginBottom:4 }}>{t.year} ESTIMATE</div>
                  <div style={{ fontFamily:"var(--font-head)", fontSize:26, fontWeight:900, color:"var(--txt)", lineHeight:1 }}>{t.future}</div>
                </div>
              </div>
              <div style={{ fontSize:13, color:"#7aaa8a", lineHeight:1.6, marginBottom:10 }}>{t.role}</div>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--mut2)" }}>Source: {t.source}</div>
            </div>
          ))}
        </div>
        <div className="reveal" style={{
          padding:"20px 28px", background:"rgba(0,224,80,.04)",
          border:"1px solid var(--grnd)", borderRadius:"var(--r-md)",
          fontFamily:"var(--font-mono)", fontSize:11, color:"var(--mut-lt)",
        }}>
          Market estimates are third-party published projections, not EtherTrack forecasts.
          Timing depends on CCTS enforcement pace and CERC Permitted Entity recognition timelines.
        </div>
      </section>

      {/* ── Market Gaps ── */}
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

      {/* ── How It Works ── */}
      <section className="section" id="how">
        <div className="s-label reveal">HOW IT WORKS</div>
        <h2 className="s-h2 reveal">From zero to compliant<br/><span style={{ color:"var(--grn)" }}>Four steps, one platform</span></h2>
        <p className="s-sub reveal">No consultants. No spreadsheets. No switching between tools. The entire carbon compliance workflow lives in a single session on EtherTrack.</p>
        <div className="how-grid">
          {HOW.map((s,i) => (
            <div key={i} className="how-step reveal">
              <div className="how-n">{s.n}</div>
              <div className="how-ttl">{s.title}</div>
              <p className="how-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="section" id="pricing" style={{ borderTop:"1px solid var(--brd)", borderBottom:"1px solid var(--brd)" }}>
        <div className="s-label reveal">PRICING</div>
        <h2 className="s-h2 reveal">Transparent pricing<br/><span style={{ color:"var(--grn)" }}>No surprises, ever</span></h2>
        <p className="s-sub reveal">One fixed platform fee, hardcoded in the smart contract and verifiable on Etherscan. As your usage grows, your fee rate drops.</p>
        <div className="pricing-grid">
          {PRICING.map((p) => (
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