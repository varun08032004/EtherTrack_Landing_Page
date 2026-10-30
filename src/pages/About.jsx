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
            ["⛓️","Why Blockchain Is Not Optional","A private database can be edited. A retirement record in someone's SQL table is not a retirement — it is a promise. On-chain retirement to the Polygon mainnet null address is permanent, public, and verifiable by anyone in the world without contacting us. That is the only standard that should exist for carbon accountability.","var(--vio)"],
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
          <h3 style={{ fontFamily:"var(--font-head)", fontSize:22, fontWeight:700, marginBottom:16, color:"var(--txt)" }}>Big Ambitions. A Beginning From Scratch.</h3>
          <p style={{ fontSize:15, color:"var(--mut-lt)", lineHeight:1.8, marginBottom:16 }}>
            Every meaningful company begins with a belief that something can be done better. EtherTrack began with that belief. EtherTrack Technologies Private Limited was incorporated on <strong style={{color:"var(--txt)"}}>13 July 2026</strong> by a solo founder, <strong style={{color:"var(--txt)"}}>Varun Girish Deshmukh</strong>, at the age of <strong style={{color:"var(--txt)"}}>22</strong>. The ambition was bigger than the company itself: to contribute to India's journey towards a net-zero future.
          </p>
          <p style={{ fontSize:15, color:"var(--mut-lt)", lineHeight:1.8, marginBottom:16 }}>
            There was no established playbook to follow. No legacy to inherit. Just a vision, the willingness to learn, and the determination to turn an idea into something real. Building a company from the ground up means confronting the distance between what you imagine and what you can actually build. It means making decisions with limited resources, figuring things out as you go, solving problems nobody sees, and showing up again when progress takes longer than expected.
          </p>
          <p style={{ fontSize:15, color:"var(--mut-lt)", lineHeight:1.8, marginBottom:16 }}>
            We are at the beginning of that journey. But we believe that the size of an ambition should not be limited by the size of the team that starts it.
          </p>
        </div>

        <div className="reveal" style={{ marginTop:40 }}>
          <h3 style={{ fontFamily:"var(--font-head)", fontSize:22, fontWeight:700, marginBottom:16, color:"var(--txt)" }}>Built on Conviction. Driven by Possibility.</h3>
          <p style={{ fontSize:15, color:"var(--mut-lt)", lineHeight:1.8, marginBottom:16 }}>
            India's net-zero journey will be one of the defining transformations of our generation. We believe the companies building its future infrastructure have an opportunity to create something that lasts.
          </p>
          <p style={{ fontSize:15, color:"var(--mut-lt)", lineHeight:1.8, marginBottom:16 }}>
            That belief is what drives EtherTrack. We are not here simply to follow a trend. We are here to build a company that grows alongside India's carbon economy, earns the trust of the people it serves, and creates lasting value through the work it does.
          </p>
          <p style={{ fontSize:15, color:"var(--mut-lt)", lineHeight:1.8, marginBottom:16 }}>
            Every milestone is a beginning. Every challenge is part of the process. And every improvement brings the vision closer to reality.
          </p>
        </div>

        <div className="reveal" style={{ marginTop:40 }}>
          <h3 style={{ fontFamily:"var(--font-head)", fontSize:22, fontWeight:700, marginBottom:16, color:"var(--txt)" }}>The Journey Starts Here.</h3>
          <p style={{ fontSize:15, color:"var(--mut-lt)", lineHeight:1.8, marginBottom:16 }}>
            <span data-nosnippet>Today, EtherTrack is an early-stage company with a long road ahead and a clear ambition for where it wants to go. We know that trust must be earned, that meaningful progress takes time, and that ambition only matters when it is matched by execution.</span>
          </p>
          <p style={{ fontSize:15, color:"var(--mut-lt)", lineHeight:1.8, marginBottom:16 }}>
            We intend to build with that understanding. <strong>Started with a vision. Built through persistence. Driven by India's net-zero ambition.</strong>
          </p>
          <p style={{ fontSize:15, color:"var(--mut-lt)", lineHeight:1.8, marginBottom:16 }}>
            This is the beginning of EtherTrack's story. We intend to make what comes next count.
          </p>
        </div>
      </section>

      {/* ── Company Details Cards ── */}
      <section className="section" style={{ marginTop:16 }}>
        <div className="reveal" style={{ marginTop:16, padding:"28px 32px", background:"rgba(0,224,80,.04)", border:"1px solid var(--grnd)", borderRadius:"var(--r-lg)", display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:24 }}>
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
      <section className="section" style={{ background:"var(--surf)", borderTop:"1px solid var(--brd)", marginTop:16, paddingTop:16 }}>
        <div className="s-label reveal">FROM THE FOUNDER</div>
        <h2 className="s-h2 reveal">Built for a market<br/><span style={{ color:"var(--grn)" }}>that deserved better</span></h2>
        <div className="founder-card reveal" style={{ maxWidth:"100%", display:"grid", gridTemplateColumns:"1fr", gap:24, alignItems:"start", marginTop:24 }}>
          <div className="founder-photo reveal" style={{ width:160, height:160, borderRadius:"50%", overflow:"hidden", marginBottom:16, background:"var(--bg)", border:"1px solid var(--brd)", justifySelf:"center" }}>
            <img
              src={founderImg}
              alt="Varun Girish Deshmukh, Founder — EtherTrack Technologies"
              style={{ width:160, height:160, objectFit:"cover" }}
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
          <div style={{ textAlign:"center" }}>
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
            <div style={{ marginTop:24, display:"flex", alignItems:"center", gap:12, flexWrap:"wrap", justifyContent:"center" }}>
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
      <section className="section" style={{ background:"var(--surf)", borderTop:"1px solid var(--brd)", marginTop:16 }} id="ccts">
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