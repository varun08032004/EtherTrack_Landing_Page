import { useReveal } from "../hooks";
import { INDUSTRIES } from "../data";
import CtaBand from "../components/CtaBand";
import Seo from "../components/Seo";

export default function Industries() {
  useReveal();

  return (
    <>
      <Seo
        title="Industries — EtherTrack for CCTS-Gazetted Sectors"
        description="Iron & steel, cement, aluminium, petrochemicals, textiles, pulp & paper, fertiliser, renewable energy, and ESG advisory — every CCTS-gazetted sector covered."
        path="/industries"
      />
      <section className="page-hero">
        <div className="eyebrow">INDUSTRIES</div>
        <h1 className="page-h1">Every sector India's carbon<br/><span style={{ color:"var(--grn)" }}>market touches — all covered</span></h1>
        <p className="page-sub">
          Nine CCTS-gazetted sectors face mandatory compliance from FY2026.
          Voluntary-market sellers are locked out by broker minimums.
          Advisors need transparent, verifiable infrastructure.
          EtherTrack is built for all three groups simultaneously.
        </p>
      </section>

      {/* ── CCTS urgency banner ── */}
      <section className="section" style={{ paddingTop:0, paddingBottom:0 }}>
        <div className="reveal" style={{
          background:"linear-gradient(135deg,rgba(255,140,0,.07),rgba(255,140,0,.03))",
          border:"1px solid var(--orgd)", borderRadius:"var(--r-lg)",
          padding:"28px 36px", display:"flex", alignItems:"center",
          gap:24, flexWrap:"wrap",
        }}>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:28, color:"var(--org)" }}>⚠</div>
          <div style={{ flex:1, minWidth:260 }}>
            <div style={{ fontFamily:"var(--font-head)", fontSize:15, fontWeight:700, marginBottom:6, color:"var(--txt)" }}>
              CCTS GEI baseline measurement is already underway
            </div>
            <div style={{ fontSize:13.5, color:"#9abba6", fontWeight:300, lineHeight:1.7 }}>
              If your company is in one of the nine gazetted sectors, your GEI performance baseline period has already started.
              Companies that begin tracking now will have a defensible compliance record.
              Those that wait will be working from estimates — and regulators will know the difference.
            </div>
          </div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"var(--org)", border:"1px solid var(--orgd)", borderRadius:6, padding:"8px 16px", whiteSpace:"nowrap" }}>
            490 ENTITIES MANDATED
          </div>
        </div>
      </section>

      {/* ── Industry cards ── */}
      <section className="section">
        <div className="s-label reveal">ALL COVERED SECTORS</div>
        <div className="industries-grid">
          {INDUSTRIES.map((ind,i) => (
            <div key={i} className="industry-card reveal">
              <span className="industry-icon">{ind.icon}</span>
              <div className="industry-title">{ind.title}</div>
              <p className="industry-desc">{ind.desc}</p>
              <div className="industry-tags">
                {ind.tags.map((t,j) => <span key={j} className="industry-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What EtherTrack handles for every sector ── */}
      <section className="section" style={{ background:"var(--surf)", borderTop:"1px solid var(--brd)" }}>
        <div className="s-label reveal">WHAT WE HANDLE FOR EVERY SECTOR</div>
        <h2 className="s-h2 reveal">One platform —<br/><span style={{ color:"var(--grn)" }}>every obligation</span></h2>
        <div className="stats-row reveal" style={{ marginBottom:0 }}>
          {[
            { num:"GEI",  lbl:"CALCULATION TO GAZETTE FORMULA", src:"Scope 1 + Scope 2 · all 9 CCTS sectors", color:"var(--grn)" },
            { num:"BEE",  lbl:"ALL 8 APPROVED METHODOLOGIES", src:"Forms A–E2 · ACVA workflow · MRV JSON export", color:"var(--org)" },
            { num:"CBAM", lbl:"ELIGIBLE CREDIT METADATA", src:"Art 6.2 status · SDG tags · country of origin", color:"var(--blu)" },
            { num:"INR",  lbl:"NATIVE PAYMENT — NO CRYPTO NEEDED", src:"UPI · Net Banking · Razorpay · TDS auto-deducted", color:"var(--vio)" },
          ].map((s,i)=>(
            <div key={i} className="s-cell">
              <div className="s-num" style={{ color:s.color, fontSize:28 }}>{s.num}</div>
              <div className="s-lbl">{s.lbl}</div>
              <div className="s-src">{s.src}</div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        eyebrow="YOUR SECTOR. YOUR OBLIGATIONS."
        title={<>See exactly how EtherTrack<br/><span style={{ color:"var(--grn)" }}>maps to your requirements</span></>}
        subtitle="Every sector has different GEI targets, BEE methodologies, and reporting obligations. In 30 minutes we'll map your specific situation to the exact EtherTrack workflow that covers it."
        note="No commitment · Sector-specific walkthrough · Response within 24 hours"
      />
    </>
  );
}