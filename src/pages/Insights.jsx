import { Link } from "react-router-dom";
import { useReveal } from "../hooks";
import { BLOGS } from "../data/blogsRegistry";
import Seo from "../components/Seo";
import CtaBand from "../components/CtaBand";

export default function Insights() {
  useReveal();

  return (
    <>
      <Seo
        title="Blogs — Carbon Markets, CCTS & ESG | EtherTrack"
        description="In-depth articles on carbon credits, India's Carbon Credit Trading Scheme, BRSR reporting, GHG accounting, and what net zero means for Indian businesses."
        path="/insights"
      />

      {/* ── Hero ── */}
      <section className="page-hero">
        <div className="eyebrow">BLOGS</div>
        <h1 className="page-h1">
          Carbon markets, explained<br/>
          <span style={{ color: "var(--grn)" }}>without the jargon</span>
        </h1>
        <p className="page-sub">
          Deep reference articles on carbon credits, India's CCTS, GHG accounting, BRSR reporting, and what the energy transition means for Indian businesses. Written by practitioners, not press teams.
        </p>
      </section>

      {/* ── Articles ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <style>{`
          @media (max-width: 640px) {
            .insights-row {
              grid-template-columns: 48px 1fr !important;
              gap: 14px !important;
              padding: 20px 0 !important;
            }
            .insights-num { font-size: 36px !important; }
            .insights-title { font-size: 16px !important; }
            .insights-arrow { display: none !important; }
          }
        `}</style>
        {BLOGS.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--mut-lt)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
            First article coming soon.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {BLOGS.map((blog, i) => (
              <Link
                key={blog.slug}
                to={`/insights/${blog.slug}`}
                className="reveal insights-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr auto",
                  gap: 24,
                  alignItems: "start",
                  padding: "28px 0",
                  borderBottom: "1px solid var(--brd)",
                  textDecoration: "none",
                  transition: "background .2s",
                }}
              >
                {/* Index number */}
                <div className="insights-num" style={{
                  fontFamily: "var(--font-head)",
                  fontSize: 42,
                  fontWeight: 900,
                  color: "rgba(255,255,255,0.18)",
                  lineHeight: 1,
                  paddingTop: 4,
                  userSelect: "none",
                  minWidth: 60,
                }}>
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: 9,
                      letterSpacing: ".14em", color: "var(--grn)",
                      padding: "2px 8px", border: "1px solid var(--grnd)",
                      borderRadius: "var(--r-md)",
                    }}>{blog.articleInfo.category.toUpperCase()}</span>
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: 9,
                      letterSpacing: ".1em", color: "var(--mut)",
                    }}>{blog.articleInfo.readingTime} read</span>
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: 9,
                      letterSpacing: ".1em", color: "var(--mut)",
                    }}>{new Date(blog.articleInfo.publishedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                  <div style={{
                    fontFamily: "var(--font-head)",
                    fontSize: 20, fontWeight: 700,
                    color: "var(--txt)", lineHeight: 1.35,
                    marginBottom: 10,
                  }}>
                    {blog.articleInfo.h1}
                  </div>
                  <div style={{
                    fontSize: 13, color: "var(--mut-lt)",
                    lineHeight: 1.7, fontWeight: 300,
                    maxWidth: 620,
                  }}>
                    {blog.articleInfo.subtitle}
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 12 }}>
                    {blog.articleInfo.tags.slice(0, 4).map((tag) => (
                      <span key={tag} style={{
                        fontFamily: "var(--font-mono)", fontSize: 9,
                        padding: "2px 8px",
                        background: "var(--surf)",
                        border: "1px solid var(--brd)",
                        borderRadius: "var(--r-md)",
                        color: "var(--mut)",
                        letterSpacing: ".06em",
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: 16,
                  color: "var(--mut)", paddingTop: 4,
                  transition: "color .2s, transform .2s",
                }}>↗</div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <CtaBand
        eyebrow="WANT IT IN YOUR INBOX?"
        title={<>Carbon market intelligence,<br/><span style={{ color: "var(--grn)" }}>every two weeks</span></>}
        subtitle="New articles on carbon credits, CCTS updates, BRSR requirements, and what's changing in India's climate regulatory landscape — straight to your inbox."
        note="No spam · Unsubscribe anytime · Written for practitioners, not press teams"
      />
    </>
  );
}