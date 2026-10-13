import { useReveal } from "../hooks";
import { Link } from "react-router-dom";
import { SOLUTIONS } from "../data";
import { useDemoModal } from "../hooks/useDemoModal";
import CtaBand from "../components/CtaBand";
import Seo from "../components/Seo";

// Short, ID-safe slug for each persona so the quick-jump chips can scroll
// straight to a card instead of making someone scan all five.
const slugify = (audience) => audience.toLowerCase().replace(/[^a-z]+/g, "-").replace(/(^-|-$)/g, "");

export default function Solutions() {
  const { openDemo } = useDemoModal();
  useReveal();

  return (
    <>
      <Seo
        title="Solutions — EtherTrack for Corporates, MSMEs & Project Developers"
        description="Carbon infrastructure built around how you actually work — corporate BRSR filers, MSMEs, project developers, ESG consultants, and CCTS compliance officers."
        path="/solutions"
      />
      <section className="page-hero">
        <div className="eyebrow">SOLUTIONS</div>
        <h1 className="page-h1">Carbon infrastructure<br/><span style={{ color:"var(--grn)" }}>built for your actual workflow</span></h1>
        <p className="page-sub">
          EtherTrack is not a generic carbon SaaS. Every workflow — from how you log emissions
          to how you retire credits to which report you download — is designed around the specific
          way you actually work. Find your role below.
        </p>
      </section>

      {/* ── Customer solutions ── */}
      <section className="section" style={{ paddingTop:0 }}>
        <div className="reveal" style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:28 }}>
          {SOLUTIONS.map((s,i) => (
            <a
              key={i}
              href={`#${slugify(s.audience)}`}
              style={{
                display:"inline-flex", alignItems:"center", gap:8,
                padding:"8px 16px", borderRadius:"20px",
                border:"1px solid var(--brd2)", color:"var(--mut-lt)",
                fontFamily:"var(--font-mono)", fontSize:11, letterSpacing:".04em",
                textDecoration:"none", transition:"all .2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--grn)"; e.currentTarget.style.color = "var(--grn)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--brd2)"; e.currentTarget.style.color = "var(--mut-lt)"; }}
            >
              <span>{s.icon}</span>{s.audience.replace(/^FOR /, "")}
            </a>
          ))}
        </div>

        <style>{`
          .solutions-grid > .solution-card:last-child {
            grid-column: 1 / -1;
          }
          @media (max-width: 768px) {
            .solutions-grid > .solution-card:last-child { grid-column: auto; }
          }
        `}</style>
        <div className="solutions-grid">
          {SOLUTIONS.map((s,i) => (
            <div key={i} id={slugify(s.audience)} className="solution-card reveal" style={{ scrollMarginTop: 100 }}>
              <span className="solution-icon">{s.icon}</span>
              <div className="solution-audience">{s.audience}</div>
              <div className="solution-title">{s.title}</div>
              <p className="solution-pain">{s.pain}</p>
              <div className="solution-fits">
                {s.fits.map((f,j) => <div key={j} className="solution-fit">{f}</div>)}
              </div>
              <button className="solution-cta" onClick={openDemo}>{s.cta} →</button>
            </div>
          ))}
        </div>

        
        <div className="reveal" style={{
          marginTop: 32, textAlign: "center",
          fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--mut-lt)",
        }}>
          Not ready to talk to sales yet? <Link to="/platform" style={{ color: "var(--grn)" }}>Explore the full platform →</Link>
        </div>
      </section>

{/* ── ESG Consulting Channel Partner section ── */}
      <section className="section" style={{ background:"var(--surf)", borderTop:"1px solid var(--brd)" }}>
        <div className="s-label reveal">ONE MORE WAY TO WORK WITH US</div>
        <div className="s-label reveal" style={{ marginTop: -8 }}>CHANNEL PARTNER PROGRAMME</div>
        <h2 className="s-h2 reveal">For ESG consulting firms<br/><span style={{ color:"var(--grn)" }}>EtherTrack makes you more valuable, not less</span></h2>
        <p className="s-sub reveal">
          Already found your fit above as a customer? This section is for ESG consulting and audit firms.
          If that's you, EtherTrack is not a competitor — it's your highest-leverage distribution
          channel. One partnership with a mid-size ESG firm can bring 20–50 corporate clients immediately.
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:32 }}>
          {[
            ["🤝","Why Firms Partner with EtherTrack","EtherTrack reduces the labour cost per client engagement while increasing the quality of the audit trail you deliver. You continue to charge for the advisory service — EtherTrack is the infrastructure layer you use to deliver it, with blockchain-verified records your clients' auditors already accept."],
            ["📊","What Partners Get","Platform access for all your clients under a single partner agreement. Blockchain audit trail PDFs for every ISO 14064-3 verification engagement. Structured emission data instead of client spreadsheets. Revenue share on subscriptions originating from your referrals."],
            ["🏛️","Target Partner Firms","Big 4 climate and sustainability practices. Boutique ESG advisory firms. ISO 14064-3 accredited verifiers. Any firm that currently charges clients for manual BRSR, CDP, or TCFD work that EtherTrack automates."],
            ["📈","The Partnership Economics","One ESG firm partner = 20–100 corporate clients without building a direct sales team. Revenue share on SaaS subscriptions. Platform licensing fee per client served. Partners become more profitable per engagement, not less relevant."],
          ].map(([icon,title,desc],i) => (
            <div key={i} className="reveal" style={{
              background:"var(--surf2)", border:"1px solid var(--brd)",
              borderRadius:"var(--r-lg)", padding:"26px 28px",
            }}>
              <div style={{ fontSize:24, marginBottom:14 }}>{icon}</div>
              <div style={{ fontFamily:"var(--font-head)", fontSize:14, fontWeight:700, marginBottom:10, lineHeight:1.35 }}>{title}</div>
              <div style={{ fontSize:13, color:"#9abba6", lineHeight:1.75, fontWeight:300 }}>{desc}</div>
            </div>
          ))}
        </div>
        <div className="reveal" style={{
          padding:"24px 32px", background:"rgba(0,224,80,.04)",
          border:"1px solid var(--grnd)", borderRadius:"var(--r-lg)",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          gap:24, flexWrap:"wrap",
        }}>
          <div>
            <div style={{ fontFamily:"var(--font-head)", fontSize:16, fontWeight:700, marginBottom:6 }}>
              Interested in a partner agreement?
            </div>
            <div style={{ fontSize:14, color:"var(--mut-lt)", fontWeight:300 }}>
              We're signing founding partner agreements now — before Polygon mainnet. First three partners get preferential revenue-share terms.
            </div>
          </div>
          <button className="btn-p" onClick={openDemo} style={{ whiteSpace:"nowrap" }}>DISCUSS PARTNERSHIP →</button>
        </div>
      </section>

      <CtaBand
        eyebrow="FIND YOUR FIT"
        title={<>Not sure which solution<br/><span style={{ color:"var(--grn)" }}>applies to you?</span></>}
        subtitle="A 30-minute walkthrough is faster than reading a comparison table. We'll map your specific compliance obligations to the exact EtherTrack workflow that covers them."
        note="No commitment · Tailored to your sector and obligations · Response within 24 hours"
      />
    </>
  );
}