import { useReveal } from "../hooks";
import { TL } from "../data";
import founderImg from "../assets/founder.jpg";
import CtaBand from "../components/CtaBand";
import Seo from "../components/Seo";

export default function About() {
  useReveal();

  return (
    <>
      <Seo
        title="About EtherTrack — Carbon Infrastructure for India"
        description="EtherTrack Technologies Private Limited builds blockchain-native carbon infrastructure for India's CCTS compliance market. Read our story and regulatory timeline."
        path="/about"
      />
      {/* ── Hero Section Only ── */}
      <section className="page-hero">
        <div className="eyebrow">ABOUT ETHERTRACK</div>
        <h1 className="page-h1">We built what India's<br/><span style={{ color:"var(--grn)" }}>carbon market was missing</span></h1>
        <p className="page-sub" style={{ marginTop: 16, fontSize: 16, color: "var(--mut)", fontWeight: 400 }}>
          EtherTrack Technologies Private Limited is a DPIIT recognised carbon infrastructure company. 
          We exist because India's carbon market — one of the largest in the world by credit supply —
          had no transparent, verifiable, integrated exchange worthy of its scale.
        </p>
      </section>

      {/* ── Mission Pillars (3 Cards) ── */}
      <section className="section" style={{ paddingTop:0 }}>
        <div className="bento">
          {[
            ["🎯","The Problem We Exist to Solve","India supplied 17% of all global voluntary carbon credits between 2010 and 2022. There was no domestic exchange where those credits could be priced transparently, traded without a broker, or retired in a way any auditor could verify independently. EtherTrack is the answer to that absence.","var(--grn)"],
            ["⛓️","Why Blockchain Is Not Optional","A private database can be edited. A retirement record in someone's SQL table is not a retirement — it is a promise. On-chain retirement to the Ethereum null address is permanent, public, and verifiable by anyone in the world without contacting us. That is the only standard that should exist for carbon accountability.","var(--vio)"],
            ["🇮🇳","Why Now Is the Only Time That Matters","490 entities face mandatory CCTS compliance from FY2026. SEBI BRSR Core GHG assurance is legally required for India's top 1,000 listed companies. CBAM is applying to Indian steel, aluminium, and cement exports. The regulatory window is not opening — it is already open.","var(--org)"],
          ].map(([icon,title,desc,c],i)=>(
            <div key={i} className="b-card c4 reveal">
              <span className="b-icon">{icon}</span>
              <div className="b-title">{title}</div>
              <div className="b-desc">{desc}</div>
              <div style={{ marginTop:16, width:32, height:3, borderRadius:2, background:c }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── About the Company: Our Story ── */}
      <section className="section" style={{ background:"var(--surf)", borderTop:"1px solid var(--brd)" }}>
        <div className="s-label reveal">ABOUT THE COMPANY</div>
        <h2 className="s-h2 reveal">Our Story<br/><span style={{ color:"var(--grn)" }}>Powering India's Net Zero Ambition</span></h2>
        <div className="company-story reveal" style={{ marginTop:32 }}>
          <h3 style={{ fontFamily:"var(--font-head)", fontSize:22, fontWeight:700, marginBottom:16, color:"var(--txt)" }}>The Founding Vision</h3>
          <p style={{ fontSize:15, color:"var(--mut-lt)", lineHeight:1.8, marginBottom:16 }}>
            EtherTrack Technologies Private Limited was incorporated on <strong style={{color:"var(--txt)"}}>13 July 2026</strong> by a solo founder, <strong style={{color:"var(--txt)"}}>Varun Girish Deshmukh</strong>, at the age of <strong style={{color:"var(--txt)"}}>22</strong>. 
          </p>
          <p style={{ fontSize:15, color:"var(--mut-lt)", lineHeight:1.8, marginBottom:16 }}>
            The vision was clear from day one: <strong style={{color:"var(--txt)"}}>power India's net zero ambition with transparent, verifiable carbon infrastructure</strong>. 
          </p>
          <p style={{ fontSize:15, color:"var(--mut-lt)", lineHeight:1.8, marginBottom:16 }}>
            India's carbon market is projected to exceed <strong style={{color:"var(--txt)"}}>₹20,000 crore by 2030</strong>. 490 entities face mandatory CCTS compliance from FY2026. SEBI BRSR Core GHG assurance is legally required for India's top 1,000 listed companies. 
            CBAM is applying to Indian steel, aluminium, and cement exports. The regulatory window is not opening — it is already open.
          </p>
          <p style={{ fontSize:15, color:"var(--mut-lt)", lineHeight:1.8, marginBottom:16 }}>
            What this market has never had is infrastructure worthy of its scale. That is what we are building.
          </p>
        </div>

        {/* ── Why EtherTrack: Our Manifesto ── */}
        <div className="reveal" style={{ marginTop:48 }}>
          <h3 style={{ fontFamily:"var(--font-head)", fontSize:22, fontWeight:700, marginBottom:16, color:"var(--txt)" }}>Why EtherTrack Exists</h3>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:24, marginTop:24 }}>
            <div style={{ padding:"24px", background:"var(--bg)", border:"1px solid var(--brd)", borderRadius:"var(--r-lg)", borderLeft:"3px solid var(--grn)" }}>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:".12em", color:"var(--grn)", marginBottom:8 }}>01 / TRANSPARENCY OVER TRUST</div>
              <h4 style={{ fontFamily:"var(--font-head)", fontSize:16, fontWeight:700, color:"var(--txt)", marginBottom:8 }}>No Black Boxes</h4>
              <p style={{ fontSize:14, color:"var(--mut-lt)", lineHeight:1.7 }}>
                Every credit, every transaction, every retirement is on-chain. Auditors verify directly on Etherscan — no calls to us, no PDFs to trust. The infrastructure is the proof.
              </p>
            </div>
            <div style={{ padding:"24px", background:"var(--bg)", border:"1px solid var(--brd)", borderRadius:"var(--r-lg)", borderLeft:"3px solid var(--vio)" }}>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:".12em", color:"var(--vio)", marginBottom:8 }}>02 / INTEGRATED BY DESIGN</div>
              <h4 style={{ fontFamily:"var(--font-head)", fontSize:16, fontWeight:700, color:"var(--txt)", marginBottom:8 }}>One Platform, Zero Reconciliation</h4>
              <p style={{ fontSize:14, color:"var(--mut-lt)", lineHeight:1.7 }}>
                Emissions logged once flow into GHG inventory, credit gap, marketplace orders, retirement certificates, and BRSR/CDP/TCFD reports automatically. One source of truth.
              </p>
            </div>
            <div style={{ padding:"24px", background:"var(--bg)", border:"1px solid var(--brd)", borderRadius:"var(--r-lg)", borderLeft:"3px solid var(--org)" }}>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:".12em", color:"var(--org)", marginBottom:8 }}>03 / INDIA-FIRST ARCHITECTURE</div>
              <h4 style={{ fontFamily:"var(--font-head)", fontSize:16, fontWeight:700, color:"var(--txt)", marginBottom:8 }}>Built for CCTS, BRSR, CBAM</h4>
              <p style={{ fontSize:14, color:"var(--mut-lt)", lineHeight:1.7 }}>
                CEA V20.0 grid factors, BEE Form 1, CCTS GEI formulas, Forms A–E2, 194S TDS, UPI/NEFT rails — every India-specific rule encoded natively, not patched.
              </p>
            </div>
            <div style={{ padding:"24px", background:"var(--bg)", border:"1px solid var(--brd)", borderRadius:"var(--r-lg)", borderLeft:"3px solid var(--blu)" }}>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:".12em", color:"var(--blu)", marginBottom:8 }}>04 / LIQUIDITY FOR EVERY SCALE</div>
              <h4 style={{ fontFamily:"var(--font-head)", fontSize:16, fontWeight:700, color:"var(--txt)", marginBottom:8 }}>From 1 Credit to 1 Million</h4>
              <p style={{ fontSize:14, color:"var(--mut-lt)", lineHeight:1.7 }}>
                Hybrid AMM gives instant liquidity under 100 credits. Live order book for larger sizes. A 50-credit cookstove project has the same market access as a 50,000-credit industrial portfolio.
              </p>
            </div>
          </div>
        </div>

        {/* ── Our Commitments ── */}
        <div className="reveal" style={{ marginTop:48 }}>
          <h3 style={{ fontFamily:"var(--font-head)", fontSize:22, fontWeight:700, marginBottom:16, color:"var(--txt)" }}>What We Stand For</h3>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", gap:16, marginTop:24 }}>
            {[
              ["🛡️","Radical Transparency","Every number traceable. Every assumption declared. Every methodology documented."],
              ["🔬","Scientific Rigour","CEA factors, IPCC AR6 GWPs, GHG Protocol boundaries — no shortcuts, no hidden assumptions."],
              ["🤝","Founder-Led Accountability","Solo founder, 22 at incorporation. My name, my reputation, my code on every line."],
              ["🇮🇳","India-First, Always","Built in Pune, for India. CEA factors, BEE forms, CCTS rules, UPI rails — native, not adapted."],
              ["♾️","Permanence Over Hype","On-chain retirement to 0x0. Permanent. Immutable. Auditable by anyone, forever."],
              ["🚀","Build for the Long Game","Pre-revenue by choice. 7 modules, 7 contracts, Sepolia-tested. Mainnet when ready, not when funded."],
            ].map(([icon,title,desc],i)=>(
              <div key={i} style={{ padding:"20px 24px", background:"var(--bg)", border:"1px solid var(--brd)", borderRadius:"var(--r-lg)", transition:"all .2s" }} style={{ boxShadow:"0 1px 3px rgba(0,0,0,.1)" }}>
                <span style={{ fontSize:24, display:"block", marginBottom:12 }}>{icon}</span>
                <h4 style={{ fontFamily:"var(--font-head)", fontSize:15, fontWeight:700, color:"var(--txt)", marginBottom:8 }}>{title}</h4>
                <p style={{ fontSize:13, color:"var(--mut-lt)", lineHeight:1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Company Details Cards ── */}
      <section className="section">
        <div className="reveal" style={{ marginTop:48, padding:"28px 32px", background:"rgba(0,224,80,.04)", border:"1px solid var(--grnd)", borderRadius:"var(--r-lg)", display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:24 }}>
          <div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:".12em", color:"var(--grn)", marginBottom:8 }}>COMPANY DETAILS</div>
            <div style={{ fontSize:13, color:"var(--mut-lt)", lineHeight:1.8 }}>
              <div><strong style={{color:"var(--txt)"}}>Legal Name:</strong> EtherTrack Technologies Private Limited</div>
              <div><strong style={{color:"var(--txt)"}}>Incorporated:</strong> 13 July 2026</div>
              <div><strong style={{color:"var(--txt)"}}>CIN:</strong> U62090PN2026PTC257708</div>
              <div><strong style={{color:"var(--txt)"}}>PAN:</strong> AAJCE8329G</div>
              <div><strong style={{color:"var(--txt)"}}>GSTIN:</strong> 27AAJCE8329G1ZD</div>
              <div><strong style={{color:"var(--txt)"}}>Registered Office:</strong> Flat 306, Truspace Prima Angulus, Patil Wasti, Patil Nagar, Baner Gaon, Balewadi, Pune, Maharashtra 411045, India</div>
            </div>
          </div>
          <div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:".12em", color:"var(--grn)", marginBottom:8 }}>RECOGNITION</div>
            <div style={{ fontSize:13, color:"var(--mut-lt)", lineHeight:1.8 }}>
              <div><strong style={{color:"var(--grn)"}}>DPIIT Recognised Startup</strong> under Startup India initiative</div>
              <div style={{marginTop:8}}><strong style={{color:"var(--txt)"}}>DPIIT Certificate:</strong> Recognised</div>
            </div>
          </div>
          <div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:".12em", color:"var(--grn)", marginBottom:8 }}>STATUS</div>
            <div style={{ fontSize:13, color:"var(--mut-lt)", lineHeight:1.8 }}>
              <div><strong style={{color:"var(--org)"}}>Pre-revenue, Testnet-only</strong></div>
              <div style={{marginTop:8}}>7 modules confirmed working on Ethereum Sepolia</div>
              <div>7 smart contracts deployed and Etherscan-verifiable</div>
              <div>Polygon mainnet pending security audit</div>
            </div>
          </div>
          <div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:".12em", color:"var(--grn)", marginBottom:8 }}>FOUNDER</div>
            <div style={{ fontSize:13, color:"var(--mut-lt)", lineHeight:1.8 }}>
              <div><strong style={{color:"var(--txt)"}}>Varun Girish Deshmukh</strong></div>
              <div>Age at founding: <strong style={{color:"var(--txt)"}}>22</strong></div>
              <div>Solo founder</div>
              <div style={{marginTop:8}}><strong style={{color:"var(--grn)"}}>Vision:</strong> Powering India's net zero ambition</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── From the Founder (Full Width) ── */}
      <section className="section" style={{ background:"var(--surf)", borderTop:"1px solid var(--brd)" }}>
        <div className="s-label reveal">FROM THE FOUNDER</div>
        <h2 className="s-h2 reveal">Built for a market<br/><span style={{ color:"var(--grn)" }}>that deserved better</span></h2>
        <div className="founder-card reveal" style={{ maxWidth:"100%", display:"grid", gridTemplateColumns:"200px 1fr", gap:48, alignItems:"start", marginTop:32 }}>
          <div className="founder-photo reveal" style={{ width:200, height:200, borderRadius:"50%", overflow:"hidden", marginBottom:16, background:"var(--bg)", border:"1px solid var(--brd)" }}>
            <img
              src={founderImg}
              alt="Varun Girish Deshmukh, Founder — EtherTrack Technologies"
              style={{ width:200, height:200, objectFit:"cover" }}
              onError={e => {
                const p = e.target.parentElement;
                p.style.background = "var(--surf2)";
                p.style.display = "flex";
                p.style.alignItems = "center";
                p.style.justifyContent = "center";
                e.target.remove();
                p.innerHTML = '<span style="color:var(--grn);font-family:var(--font-mono);font-size:22px;font-weight:700">VGD</span>';
              }}
            />
          </div>
          <div>
            <p className="f-quote" style={{ fontSize:16, color:"var(--mut-lt)", lineHeight:1.8, marginBottom:16, fontStyle:"italic" }}>
              "India supplied <strong style={{ color:"var(--txt)" }}>17% of all global voluntary carbon credits</strong> between
              2010 and 2022 — yet had no domestic blockchain exchange to price, trade, or retire them
              transparently. The CCTS compliance mechanism now covers{" "}
              <strong style={{ color:"var(--txt)" }}>490 industrial entities</strong> from FY2026, and
              India's carbon market is projected to exceed{" "}
              <strong style={{ color:"var(--txt)" }}>₹20,000 crore by 2030</strong>. What this market
              has never had is infrastructure worthy of its scale. That is what we are building."
            </p>
            <p className="f-source" style={{ fontSize:12, color:"var(--mut)", marginBottom:16 }}>Sources: Verra registry data (2023) · BEE / MoP gazette notification, Jan 2026 · CEEW / FICCI market projections 2024</p>
            <div className="f-name" style={{ fontFamily:"var(--font-head)", fontSize:18, fontWeight:700, color:"var(--txt)", marginBottom:4 }}>Varun Girish Deshmukh</div>
            <div className="f-role" style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"var(--mut)", letterSpacing:".1em", marginBottom:8 }}>FOUNDER · ETHERTRACK TECHNOLOGIES PRIVATE LIMITED</div>
            <div style={{ fontSize:13, color:"var(--mut-lt)", lineHeight:1.8, marginBottom:8 }}>
              Incorporated <strong style={{color:"var(--txt)"}}>13 July 2026</strong> at age <strong style={{color:"var(--txt)"}}>22</strong>. Solo founder.
            </div>
            <div style={{ fontSize:13, color:"var(--mut-lt)", lineHeight:1.8 }}>
              Vision: <strong style={{color:"var(--grn)"}}>Powering India's net zero ambition</strong> with transparent, verifiable carbon infrastructure.
            </div>
            <div style={{ marginTop:24, display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
              <a className="f-email" href="mailto:founder@ethertrack.in" style={{ display:"inline-flex", alignItems:"center", gap:8, color:"var(--grn)", fontFamily:"var(--font-mono)", fontSize:11, letterSpacing:".1em" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}>
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                founder@ethertrack.in
              </a>
              <a href="https://linkedin.com/in/varungirishdeshmukh" target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:8, color:"var(--blu)", fontFamily:"var(--font-mono)", fontSize:11, letterSpacing:".1em" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink:0 }}>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.141-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.657v11.433zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a href="https://twitter.com/varungirishd" target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:8, color:"var(--blu)", fontFamily:"var(--font-mono)", fontSize:11, letterSpacing:".1em" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink:0 }}>
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
                Twitter
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CCTS Timeline ── */}
      <section className="section" style={{ background:"var(--surf)", borderTop:"1px solid var(--brd)" }} id="ccts">
        <div className="s-label reveal">THE REGULATORY TIMELINE</div>
        <h2 className="s-h2 reveal">The window opened —<br/><span style={{ color:"var(--org)" }}>most companies haven't noticed yet</span></h2>
        <p className="s-sub reveal">India's carbon compliance regime has been activating quietly since 2022. The pace is about to become impossible to ignore.</p>
        <div className="tl">
          {TL.map((t,i) => (
            <div key={i} className={`tl-item ${t.cls} reveal`}>
              <div className="tl-yr">{t.yr}</div>
              <div style={{ paddingLeft:32 }}>
                <div className="tl-dot" />
                <div className={`tl-tag ${t.tag}`}>{t.tagLbl}</div>
                <div className="tl-ttl">{t.title}</div>
                <p className="tl-desc">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        eyebrow="JOIN THE EARLY ACCESS LIST"
        title={<>We're pre-launch —<br/><span style={{ color:"var(--grn)" }}>now is exactly the right time</span></>}
        subtitle="Polygon mainnet is coming. Early-access companies get priority onboarding, direct founder support, and first access to the live order book when it opens. Request a demo to get on the list."
        note="No commitment · Direct founder walkthrough · Response within 24 hours"
      />
    </>
  );
}