import { useReveal } from "../hooks";
import { TL, FOUNDER_DOMAINS } from "../data";
import { useDemoModal } from "../context/DemoModalContext";
import founderImg from "../assets/founder.jpg";
import CtaBand from "../components/CtaBand";
import Seo from "../components/Seo";

export default function About() {
  useReveal();
  const { openDemo } = useDemoModal();

  return (
    <>
      <Seo
        title="About EtherTrack — Carbon Infrastructure for India"
        description="EtherTrack Technologies Private Limited builds blockchain-native carbon infrastructure for India's CCTS compliance market. Read our story and regulatory timeline."
        path="/about"
      />
      <section className="page-hero">
        <div className="eyebrow">ABOUT ETHERTRACK</div>
        <h1 className="page-h1">We built what India's<br/><span style={{ color:"var(--grn)" }}>carbon market was missing</span></h1>
        <p className="page-sub">
          EtherTrack Technologies Private Limited is a blockchain-native carbon infrastructure company.
          We exist because India's carbon market — one of the largest in the world by credit supply —
          had no transparent, verifiable, integrated exchange worthy of its scale.
        </p>
      </section>

      {/* ── Mission pillars ── */}
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

      {/* ── Founder ── */}
      <section className="section" style={{ background:"var(--surf)", borderTop:"1px solid var(--brd)" }}>
        <div className="s-label reveal">FROM THE FOUNDER</div>
        <h2 className="s-h2 reveal">Built for a market<br/><span style={{ color:"var(--grn)" }}>that deserved better</span></h2>
        <div className="founder-card reveal">
          <div className="founder-photo">
            <img
              src={founderImg}
              alt="Varun Girish Deshmukh, Founder — EtherTrack Technologies"
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
            <p className="f-quote">
              "India supplied <strong style={{ color:"var(--txt)" }}>17% of all global voluntary carbon credits</strong> between
              2010 and 2022 — yet had no domestic blockchain exchange to price, trade, or retire them
              transparently. The CCTS compliance mechanism now covers{" "}
              <strong style={{ color:"var(--txt)" }}>490 industrial entities</strong> from FY2026, and
              India's carbon market is projected to exceed{" "}
              <strong style={{ color:"var(--txt)" }}>₹20,000 crore by 2030</strong>. What this market
              has never had is infrastructure worthy of its scale. That is what we are building."
            </p>
            <p className="f-source">Sources: Verra registry data (2023) · BEE / MoP gazette notification, Jan 2026 · CEEW / FICCI market projections 2024</p>
            <div className="f-name">Varun Girish Deshmukh</div>
            <div className="f-role">FOUNDER · ETHERTRACK TECHNOLOGIES PRIVATE LIMITED</div>
            <a className="f-email" href="mailto:founder@ethertrack.in">founder@ethertrack.in</a>
          </div>
        </div>
      </section>

      {/* ── The solo-build story ── */}
      <section className="section">
        <div className="s-label reveal">THE BUILD</div>
        <h2 className="s-h2 reveal">7 modules · 3 domains<br/><span style={{ color:"var(--grn)" }}>One person, all working</span></h2>
        <p className="s-sub reveal">
          EtherTrack was built by a single founder simultaneously across three technical domains
          that are rarely combined — carbon market regulation, Solidity smart contract engineering,
          and full-stack product development. Every module below is confirmed working on testnet.
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
          {FOUNDER_DOMAINS.map((d,i) => (
            <div key={i} className="reveal" style={{
              background:"var(--surf)", border:"1px solid var(--brd)",
              borderRadius:"var(--r-lg)", padding:"28px 26px",
              borderTop:`3px solid ${d.color}`,
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
                <span style={{ fontSize:22 }}>{d.icon}</span>
                <div style={{ fontFamily:"var(--font-head)", fontSize:13, fontWeight:700, lineHeight:1.3 }}>{d.domain}</div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {d.items.map((item,j) => (
                  <div key={j} style={{ display:"flex", alignItems:"baseline", gap:8, fontSize:12.5, color:"#9abba6", lineHeight:1.5 }}>
                    <span style={{ color:d.color, fontFamily:"var(--font-mono)", fontSize:10, flexShrink:0 }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pre-revenue honesty ── */}
        <div className="reveal" style={{
          marginTop:24, padding:"28px 32px",
          background:"rgba(255,140,0,.04)", border:"1px solid var(--orgd)",
          borderRadius:"var(--r-lg)", display:"grid",
          gridTemplateColumns:"auto 1fr", gap:20, alignItems:"start",
        }}>
          <div style={{ fontSize:28 }}>📋</div>
          <div>
            <div style={{ fontFamily:"var(--font-head)", fontSize:15, fontWeight:700, marginBottom:10, color:"var(--org)" }}>
              Transparency Disclosure
            </div>
            <div style={{ fontSize:13.5, color:"#9abba6", lineHeight:1.8, fontWeight:300 }}>
              EtherTrack is <strong style={{ color:"var(--txt)" }}>pre-revenue and testnet-only</strong>. No paying customers.
              No LOIs signed. Revenue is zero. The platform is real — 7 modules confirmed working on Ethereum Sepolia,
              7 smart contracts deployed and Etherscan-verifiable. What comes before mainnet:
              smart contract security audit (Certik / OpenZeppelin), company incorporation, Razorpay production account,
              FEMA legal opinion, and 5 founding project developer partnerships.
              We disclose this transparently because the companies we want to work with value honesty over marketing copy.
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
        subtitle="Mainnet is coming. Early-access companies get priority onboarding, direct founder support, and first access to the live order book when it opens. Request a demo to get on the list."
        note="No commitment · Direct founder walkthrough · Response within 24 hours"
      />
    </>
  );
}