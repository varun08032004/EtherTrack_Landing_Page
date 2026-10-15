import { Link, useSearchParams } from "react-router-dom";
import { useReveal } from "../hooks";
import { BLOGS } from "../data/blogsRegistry";
import Seo from "../components/Seo";
import CtaBand from "../components/CtaBand";

const POSTS_PER_PAGE = 6;

export default function Blogs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const totalPages = Math.ceil(BLOGS.length / POSTS_PER_PAGE);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const paginatedBlogs = BLOGS.slice(start, end);

  useReveal();

  return (
    <>
      <Seo
        title="Blogs — Carbon Markets, CCTS & ESG | EtherTrack"
        description="In-depth articles on carbon credits, India's Carbon Credit Trading Scheme, BRSR reporting, GHG accounting, and what net zero means for Indian businesses."
        path="/blogs"
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
            .blogs-row {
              grid-template-columns: 48px 1fr !important;
              gap: 14px !important;
              padding: 20px 0 !important;
            }
            .blogs-num { font-size: 36px !important; }
            .blogs-title { font-size: 16px !important; }
            .blogs-arrow { display: none !important; }
          }
        `}</style>
        {BLOGS.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--mut-lt)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
            First article coming soon.
          </div>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {paginatedBlogs.map((blog, i) => (
                <Link
                  key={blog.slug}
                  to={`/blogs/${blog.slug}`}
                  className="reveal blogs-row"
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
                  <div className="blogs-num" style={{
                    fontFamily: "var(--font-head)",
                    fontSize: 42,
                    fontWeight: 900,
                    color: "rgba(255,255,255,0.18)",
                    lineHeight: 1,
                    paddingTop: 4,
                    userSelect: "none",
                    minWidth: 60,
                  }}>
                    {String(start + i + 1).padStart(2, "0")}
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{
                display: "flex", justifyContent: "center", alignItems: "center",
                gap: 8, marginTop: 32, flexWrap: "wrap"
              }}>
                <button
                  onClick={() => setSearchParams({ page: String(currentPage - 1) })}
                  disabled={currentPage === 1}
                  className="btn-g"
                  style={{ padding: "8px 16px", fontSize: 11, opacity: currentPage === 1 ? 0.4 : 1 }}
                >
                  ← Prev
                </button>
                <span style={{ display: "flex", gap: 4, alignItems: "center", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--mut-lt)" }}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      onClick={() => setSearchParams({ page: String(p) })}
                      style={{
                        width: 32, height: 32, borderRadius: "var(--r-md)",
                        border: "1px solid " + (p === currentPage ? "var(--grn)" : "var(--brd)"),
                        background: p === currentPage ? "var(--grn)" : "transparent",
                        color: p === currentPage ? "var(--bg)" : "var(--mut-lt)",
                        fontFamily: "var(--font-mono)", fontSize: 11, cursor: "pointer",
                        transition: "all .2s"
                      }}
                    >{p}</button>
                  ))}
                </span>
                <button
                  onClick={() => setSearchParams({ page: String(currentPage + 1) })}
                  disabled={currentPage === totalPages}
                  className="btn-g"
                  style={{ padding: "8px 16px", fontSize: 11, opacity: currentPage === totalPages ? 0.4 : 1 }}
                >
                  Next →
                </button>
              </div>
            )}
          </>
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