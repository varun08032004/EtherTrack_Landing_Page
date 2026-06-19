import { useReveal } from "../hooks";
import { SOLUTIONS } from "../data";
import { useDemoModal } from "../context/DemoModalContext";
import CtaBand from "../components/CtaBand";

export default function Solutions() {
  const { openDemo } = useDemoModal();
  useReveal();

  return (
    <>
      <section className="page-hero">
        <div className="eyebrow">SOLUTIONS</div>
        <h1 className="page-h1">Carbon infrastructure<br/><span style={{ color:"var(--grn)" }}>built for your actual workflow.</span></h1>
        <p className="page-sub">
          EtherTrack is not a generic carbon SaaS. Every workflow — from how you log emissions
          to how you retire credits to which report you download — is designed around the specific
          way you actually work. Find your role below.
        </p>
      </section>

      {/* ── Customer solutions ── */}
      <section className="section" style={{ paddingTop:0 }}>
        <div className="solutions-grid">
          {SOLUTIONS.map((s,i) => (
            <div key={i} className="solution-card reveal">
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
      </section>

      {/* ── ESG Consulting Channel Partner section ── */}
      <section className="section" style={{ background:"var(--surf)", borderTop:"1px solid var(--brd)" }}>
        <div className="s-label reveal">CHANNEL PARTNER PROGRAMME</div>
        <h2 className="s-h2 reveal">For ESG consulting firms.<br/><span style={{ color:"var(--grn)" }}>EtherTrack makes you more valuable, not less.</span></h2>
        <p className="s-sub reveal">
          ESG consulting and audit firms are not EtherTrack's competitors — they are our highest-leverage
          distribution channel. One partnership with a mid-size ESG firm can bring 20–50 corporate clients immediately.
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
              We're signing founding partner agreements now — before mainnet. First three partners get preferential revenue-share terms.
            </div>
          </div>
          <button className="btn-p" onClick={openDemo} style={{ whiteSpace:"nowrap" }}>DISCUSS PARTNERSHIP →</button>
        </div>
      </section>

      {/* ── Trust signals ── */}
      <section className="section">
        <div className="s-label reveal">WHY TRUST ETHERTRACK</div>
        <h2 className="s-h2 reveal">Not promises.<br/><span style={{ color:"var(--grn)" }}>Verifiable proof.</span></h2>
        <p className="s-sub reveal">Every claim we make about our platform is publicly verifiable. No marketing speak. No vaporware.</p>
        <div className="bento">
          {[
            ["🔗","On-Chain or It Didn't Happen","Every trade, every retirement, every audit log is anchored as a real Ethereum transaction. You can verify any of it on Etherscan right now — no login, no contact with us."],
            ["📐","Built to Indian Regulatory Standards","SEBI BRSR Core, BEE CCTS methodology, CEA V20.0 grid factor, DEFRA 2024 — every Indian regulatory requirement is embedded, not bolted on. We built for India's compliance landscape from day one."],
            ["🏦","INR-Native — No Crypto Required","You pay in rupees. UPI, PhonePe, GPay, or Net Banking via Razorpay (RBI authorised). 1% TDS auto-deducted under Section 194S. Your accountant will not be confused."],
            ["🔐","Privacy-First KYC","Aadhaar and PAN numbers are cryptographically hashed before storage — the raw digits never exist in our database. Documents go to IPFS. The same identity cannot register twice."],
            ["📜","ISO 14064-3 Certificates","Every on-chain retirement produces an ISO 14064-3 certificate with a QR code that resolves to the public Etherscan record. Your SEBI assessor and CDP reviewer can verify it independently."],
            ["⚖️","Fee Hardcoded in the Contract","Our platform fee is hardcoded in Marketplace.sol. We cannot change it without deploying a new contract. You can verify it on Etherscan this minute."],
          ].map(([icon, title, desc], i) => (
            <div key={i} className="b-card c4 reveal">
              <span className="b-icon">{icon}</span>
              <div className="b-title">{title}</div>
              <div className="b-desc">{desc}</div>
            </div>
          ))}
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