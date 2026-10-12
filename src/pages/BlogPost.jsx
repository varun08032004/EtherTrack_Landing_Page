import { useParams, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { getBlogBySlug } from "../data/blogsRegistry";
import { useDemoModal } from "../context/DemoModalContext";
import Seo from "../components/Seo";
import BlogEngagement from "../components/BlogEngagement";

/* ─── Utility ────────────────────────────────────────────────────────────── */
const slugify = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const parseParagraphs = (text) =>
  (text || "").split("\n\n").map((p, i) => (
    <p key={i} style={{ marginBottom: 20, lineHeight: 1.85, fontSize: 15, color: "var(--txt)", fontWeight: 300 }}>
      {p}
    </p>
  ));

/* ─── Info Box ───────────────────────────────────────────────────────────── */
const INFO_STYLES = {
  definition: { bg: "rgba(34,197,94,.06)", border: "#22c55e33", label: "DEFINITION",  accent: "#22c55e" },
  process:    { bg: "rgba(59,130,246,.06)", border: "#3b82f633", label: "PROCESS",     accent: "#3b82f6" },
  important:  { bg: "rgba(249,115,22,.06)", border: "#f9731633", label: "IMPORTANT",   accent: "#f97316" },
  warning:    { bg: "rgba(234,179,8,.06)",  border: "#eab30833", label: "NOTE",        accent: "#eab308" },
  alert:      { bg: "rgba(239,68,68,.06)",  border: "#ef444433", label: "⚠ ALERT",    accent: "#ef4444" },
  critical:   { bg: "rgba(239,68,68,.06)",  border: "#ef444433", label: "CRITICAL",    accent: "#ef4444" },
  "cta-soft": { bg: "rgba(34,197,94,.06)",  border: "#22c55e33", label: "TRY IT LIVE", accent: "#22c55e" },
};

function InfoBox({ box }) {
  const s = INFO_STYLES[box.type] || INFO_STYLES.important;
  return (
    <div style={{
      background: s.bg, border: `1px solid ${s.border}`,
      borderLeft: `3px solid ${s.accent}`,
      borderRadius: "var(--r-md)", padding: "18px 22px",
      margin: "28px 0",
    }}>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 9,
        letterSpacing: ".16em", color: s.accent,
        fontWeight: 700, marginBottom: 8,
      }}>{s.label}</div>
      <div style={{ fontFamily: "var(--font-head)", fontSize: 14, fontWeight: 700, color: "var(--txt)", marginBottom: 6 }}>
        {box.title}
      </div>
      <div style={{ fontSize: 13, color: "var(--mut-lt)", lineHeight: 1.75, fontWeight: 300 }}>
        {box.content}
      </div>
    </div>
  );
}

/* ─── Table ──────────────────────────────────────────────────────────────── */
function BlogTable({ table }) {
  return (
    <div style={{ margin: "28px 0", overflowX: "auto" }}>
      {table.title && (
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".12em", color: "var(--grn)", marginBottom: 12 }}>
          {table.title.toUpperCase()}
        </div>
      )}
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr>
            {table.headers.map((h, i) => (
              <th key={i} style={{
                padding: "10px 14px", textAlign: "left",
                background: "var(--surf)", color: "var(--mut-lt)",
                fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: ".1em", fontWeight: 700,
                borderBottom: "1px solid var(--brd)",
              }}>{h.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "var(--bg)" : "var(--surf)" }}>
              {row.map((cell, j) => (
                <td key={j} style={{
                  padding: "10px 14px", color: j === 0 ? "var(--txt)" : "var(--mut-lt)",
                  fontWeight: j === 0 ? 600 : 300, lineHeight: 1.5,
                  borderBottom: "1px solid var(--brd)",
                }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {table.footnote && (
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--mut)", marginTop: 8, lineHeight: 1.6 }}>
          * {table.footnote}
        </div>
      )}
    </div>
  );
}

/* ─── Myth vs Fact ───────────────────────────────────────────────────────── */
function MythVsFact({ items }) {
  return (
    <div style={{ margin: "28px 0", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".14em", color: "var(--grn)", marginBottom: 4 }}>
        MYTH VS FACT
      </div>
      {items.map((item, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2,
          borderRadius: "var(--r-md)", overflow: "hidden",
        }}>
          <div style={{ background: "rgba(239,68,68,.06)", border: "1px solid #ef444422", padding: "16px 18px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#ef4444", letterSpacing: ".12em", marginBottom: 6 }}>✗ MYTH</div>
            <div style={{ fontSize: 13, color: "var(--txt)", lineHeight: 1.65, fontWeight: 300 }}>{item.myth}</div>
          </div>
          <div style={{ background: "rgba(34,197,94,.06)", border: "1px solid #22c55e22", padding: "16px 18px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#22c55e", letterSpacing: ".12em", marginBottom: 6 }}>✓ FACT</div>
            <div style={{ fontSize: 13, color: "var(--txt)", lineHeight: 1.65, fontWeight: 300 }}>{item.fact}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Case Study ─────────────────────────────────────────────────────────── */
function CaseStudy({ cs }) {
  return (
    <div style={{
      margin: "28px 0",
      background: "var(--surf)", border: "1px solid var(--brd)",
      borderLeft: "3px solid var(--org)", borderRadius: "var(--r-lg)",
      padding: "28px 32px",
    }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: ".16em", color: "var(--org)", marginBottom: 10 }}>
        CASE STUDY
      </div>
      <div style={{ fontFamily: "var(--font-head)", fontSize: 17, fontWeight: 700, color: "var(--txt)", marginBottom: 20, lineHeight: 1.35 }}>
        {cs.title}
      </div>
      {[
        { label: "SITUATION", content: cs.situation, color: "var(--mut-lt)" },
        { label: "ACTION TAKEN", content: cs.action, color: "var(--mut-lt)" },
        { label: "OUTCOME", content: cs.outcome, color: "var(--txt)" },
        { label: "KEY LESSON", content: cs.lesson, color: "var(--grn)" },
      ].map((item) => (
        <div key={item.label} style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: ".12em", color: "var(--mut)", marginBottom: 6 }}>
            {item.label}
          </div>
          <div style={{ fontSize: 13, color: item.color, lineHeight: 1.75, fontWeight: 300 }}>
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Key Takeaways ──────────────────────────────────────────────────────── */
function KeyTakeaways({ items }) {
  return (
    <div style={{ margin: "28px 0" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".14em", color: "var(--grn)", marginBottom: 16 }}>
        KEY TAKEAWAYS
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((item, i) => (
          <div key={i} style={{
            display: "flex", gap: 14, alignItems: "flex-start",
            background: "var(--surf)", border: "1px solid var(--brd)",
            borderRadius: "var(--r-md)", padding: "14px 18px",
          }}>
            <div style={{
              fontFamily: "var(--font-head)", fontSize: 18, fontWeight: 900,
              color: "var(--grn)", flexShrink: 0, lineHeight: 1,
              paddingTop: 1,
            }}>{String(i + 1).padStart(2, "0")}</div>
            <div style={{ fontSize: 13, color: "var(--txt)", lineHeight: 1.75, fontWeight: 300 }}>{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── FAQs ───────────────────────────────────────────────────────────────── */
function FAQs({ faqs }) {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {faqs.map((faq, i) => (
        <div key={i} style={{
          border: "1px solid var(--brd)",
          borderRadius: "var(--r-md)",
          overflow: "hidden",
        }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: "100%", display: "flex",
              justifyContent: "space-between", alignItems: "center",
              gap: 16, padding: "16px 20px",
              background: open === i ? "var(--surf)" : "var(--bg)",
              border: "none", cursor: "pointer", textAlign: "left",
              transition: "background .2s",
            }}
          >
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--txt)", lineHeight: 1.4 }}>
              {faq.question}
            </div>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 16,
              color: "var(--grn)", flexShrink: 0,
              transform: open === i ? "rotate(45deg)" : "rotate(0)",
              transition: "transform .25s",
            }}>+</div>
          </button>
          {open === i && (
            <div style={{
              padding: "0 20px 18px",
              background: "var(--surf)",
              fontSize: 13, color: "var(--mut-lt)",
              lineHeight: 1.8, fontWeight: 300,
              animation: "faqOpen .2s ease",
            }}>
              {faq.answer}
            </div>
          )}
        </div>
      ))}
      <style>{`@keyframes faqOpen { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }`}</style>
    </div>
  );
}

/* ─── Illustration Components ────────────────────────────────────────────── */

// Type: "stat" — big pull-quote style number/fact
function StatCallout({ items }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${Math.min(items.length, 3)}, 1fr)`,
      gap: 12, margin: "28px 0",
    }}>
      {items.map((item, i) => (
        <div key={i} style={{
          background: "var(--surf)", border: "1px solid var(--brd)",
          borderTop: `3px solid ${item.color || "var(--grn)"}`,
          borderRadius: "var(--r-lg)", padding: "24px 20px",
          textAlign: "center",
        }}>
          <div style={{
            fontFamily: "var(--font-head)", fontSize: 38,
            fontWeight: 900, color: item.color || "var(--grn)",
            lineHeight: 1, marginBottom: 10,
          }}>{item.value}</div>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 9,
            letterSpacing: ".12em", color: "var(--mut)",
            marginBottom: 8,
          }}>{item.label?.toUpperCase()}</div>
          {item.sub && (
            <div style={{ fontSize: 11, color: "var(--mut-lt)", lineHeight: 1.6, fontWeight: 300 }}>
              {item.sub}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Type: "compare" — two-column side-by-side comparison
function CompareCard({ left, right }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, margin: "28px 0", borderRadius: "var(--r-lg)", overflow: "hidden" }}>
      {[left, right].map((side, i) => (
        <div key={i} style={{
          background: "var(--surf)", border: "1px solid var(--brd)",
          borderTop: `3px solid ${side.color}`,
          padding: "24px 22px",
        }}>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 9,
            letterSpacing: ".14em", color: side.color,
            fontWeight: 700, marginBottom: 14,
          }}>{side.label?.toUpperCase()}</div>
          <div style={{ fontFamily: "var(--font-head)", fontSize: 16, fontWeight: 700, color: "var(--txt)", marginBottom: 12 }}>
            {side.title}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {side.points?.map((p, j) => (
              <div key={j} style={{ display: "flex", gap: 8, fontSize: 12, color: "var(--mut-lt)", lineHeight: 1.6 }}>
                <span style={{ color: side.color, flexShrink: 0, marginTop: 2 }}>→</span>
                {p}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Type: "flow" — horizontal step flow diagram
function FlowDiagram({ steps }) {
  return (
    <div style={{ margin: "28px 0" }}>
      <style>{`
        @media (max-width: 640px) {
          .flow-wrap { flex-direction: column !important; }
          .flow-arrow { transform: rotate(90deg) !important; }
        }
      `}</style>
      <div className="flow-wrap" style={{ display: "flex", alignItems: "stretch", gap: 0 }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{
              flex: 1, background: "var(--surf)",
              border: `1px solid ${step.color || "var(--brd)"}`,
              borderRadius: "var(--r-md)", padding: "16px 14px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{step.icon}</div>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 8,
                letterSpacing: ".12em", color: step.color || "var(--grn)",
                marginBottom: 6, fontWeight: 700,
              }}>STEP {i + 1}</div>
              <div style={{ fontFamily: "var(--font-head)", fontSize: 12, fontWeight: 700, color: "var(--txt)", marginBottom: 4 }}>
                {step.label}
              </div>
              <div style={{ fontSize: 10, color: "var(--mut-lt)", lineHeight: 1.5, fontWeight: 300 }}>
                {step.desc}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="flow-arrow" style={{
                fontFamily: "var(--font-mono)", fontSize: 14,
                color: "var(--mut)", padding: "0 6px", flexShrink: 0,
              }}>→</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Type: "image" — AI-generated image inline
function InlineImage({ src, alt, caption }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <div style={{ margin: "28px 0" }}>
      <img
        src={src} alt={alt}
        style={{
          width: "100%", borderRadius: "var(--r-lg)",
          display: "block", objectFit: "cover",
        }}
        onError={() => setFailed(true)}
      />
      {caption && (
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 9,
          color: "var(--mut)", textAlign: "center",
          marginTop: 8, lineHeight: 1.6,
        }}>{caption}</div>
      )}
    </div>
  );
}

// Illustration dispatcher
function Illustration({ data }) {
  if (!data) return null;
  if (data.type === "stat")    return <StatCallout items={data.items} />;
  if (data.type === "compare") return <CompareCard left={data.left} right={data.right} />;
  if (data.type === "flow")    return <FlowDiagram steps={data.steps} />;
  if (data.type === "image")   return <InlineImage src={data.src} alt={data.alt} caption={data.caption} />;
  return null;
}

/* ─── Section Renderer ───────────────────────────────────────────────────── */
function Section({ section }) {
  return (
    <div id={slugify(section.heading)} style={{ marginBottom: 56 }}>
      <h2 style={{
        fontFamily: "var(--font-head)", fontSize: 24,
        fontWeight: 700, color: "var(--txt)",
        lineHeight: 1.3, marginBottom: 20,
        paddingTop: 8,
      }}>
        {section.heading}
      </h2>

      {section.content && parseParagraphs(section.content)}
      {section.illustration && <Illustration data={section.illustration} />}
      {section.infoBox && <InfoBox box={section.infoBox} />}
      {section.table && <BlogTable table={section.table} />}
      {section.mythVsFact && <MythVsFact items={section.mythVsFact} />}
      {section.caseStudy && <CaseStudy cs={section.caseStudy} />}
      {section.items && <KeyTakeaways items={section.items} />}
    </div>
  );
}

/* ─── Main BlogPost Component ────────────────────────────────────────────── */
export default function BlogPost() {
  const { slug } = useParams();
  const { openDemo } = useDemoModal();
  const blog = getBlogBySlug(slug);

  if (!blog) return <Navigate to="/insights" replace />;

  const { seo, articleInfo, tableOfContents, article, faqs, references, relatedArticles, cta } = blog;
  const info = articleInfo;

  return (
    <>
      <Seo
        title={seo.metaTitle}
        description={seo.metaDescription}
        path={`/insights/${blog.slug}`}
      />

      <style>{`
        .blog-body h3 {
          font-family: var(--font-head);
          font-size: 18px;
          font-weight: 700;
          color: var(--txt);
          margin: 28px 0 12px;
          line-height: 1.35;
        }
        .blog-body strong { color: var(--txt); font-weight: 600; }
        .blog-body em { color: var(--mut-lt); font-style: italic; }
        .blog-toc-link:hover { color: var(--grn) !important; }
        @media (max-width: 1024px) {
          .blog-layout { grid-template-columns: 1fr !important; }
          .blog-sidebar { display: none !important; }
        }
        @media (max-width: 640px) {
          .blog-hero-h1 { font-size: 1.5rem !important; line-height: 1.3 !important; }
            .blog-body p { font-size: 14px !important; }
            .blog-layout { padding: 0 16px 60px !important; }
            .myth-grid { grid-template-columns: 1fr !important; }
            .ct-row { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="page-hero" style={{ paddingBottom: 40 }}>
        {/* Category + meta */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: ".14em",
            color: "var(--grn)", padding: "3px 10px",
            border: "1px solid var(--grnd)", borderRadius: "var(--r-md)",
          }}>{info.category.toUpperCase()}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--mut)", letterSpacing: ".1em", paddingTop: 3 }}>
            {info.readingTime} read
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--mut)", letterSpacing: ".1em", paddingTop: 3 }}>
            {new Date(info.publishedDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </span>
        </div>

        {/* H1 */}
        <h1 className="blog-hero-h1" style={{
          fontFamily: "var(--font-head)", fontSize: "clamp(1.7rem, 3.5vw, 2.8rem)",
          fontWeight: 800, color: "var(--txt)", lineHeight: 1.2,
          marginBottom: 20, maxWidth: 760, marginLeft: "auto", marginRight: "auto",
        }}>
          {info.h1}
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 16, color: "var(--mut-lt)", lineHeight: 1.75,
          maxWidth: 640, margin: "0 auto 28px",
          fontWeight: 300,
        }}>{info.subtitle}</p>

        {/* Tags */}
        <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
          {info.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: ".06em",
              padding: "2px 8px", background: "var(--surf)",
              border: "1px solid var(--brd)", borderRadius: "var(--r-md)",
              color: "var(--mut)",
            }}>{tag}</span>
          ))}
        </div>
      </section>

      {/* ── Hero Image ── */}
      {info.heroImage?.src && (
        <div style={{ maxWidth: 900, margin: "0 auto 56px", padding: "0 24px" }}>
          <img
            src={info.heroImage.src}
            alt={info.heroImage.alt}
            style={{
              width: "100%", borderRadius: "var(--r-lg)",
              display: "block", objectFit: "cover",
              aspectRatio: "21/9",
            }}
            onError={(e) => { e.currentTarget.parentElement.style.display = "none"; }}
          />
          {info.heroImage.caption && (
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 9,
              color: "var(--mut)", textAlign: "center",
              marginTop: 10, lineHeight: 1.6,
            }}>{info.heroImage.caption}</div>
          )}
        </div>
      )}

      {/* ── Body layout: content + sidebar TOC ── */}
      <div className="blog-layout" style={{
        maxWidth: 1100, margin: "0 auto",
        padding: "0 24px 80px",
        display: "grid",
        gridTemplateColumns: "1fr 260px",
        gap: 60,
        alignItems: "start",
      }}>

        {/* ── Main content ── */}
        <div>
          {/* Author */}
          <div style={{
            display: "flex", gap: 14, alignItems: "center",
            padding: "18px 20px",
            background: "var(--surf)", border: "1px solid var(--brd)",
            borderRadius: "var(--r-md)", marginBottom: 40,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "var(--bg)", border: "1px solid var(--brd)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, flexShrink: 0,
            }}>
              <img
                src={info.author.photo}
                alt={info.author.name}
                style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }}
                onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextElementSibling.style.display = "block"; }}
              />
              <span style={{ display: "none" }}>👤</span>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-head)", fontSize: 14, fontWeight: 700, color: "var(--txt)" }}>
                {info.author.name}
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--mut-lt)", letterSpacing: ".06em" }}>
                {info.author.designation}
              </div>
            </div>
            <div style={{ marginLeft: "auto", textAlign: "right" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--mut)" }}>
                {new Date(info.publishedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </div>
              {info.updatedDate !== info.publishedDate && (
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--mut)", marginTop: 2 }}>
                  Updated {new Date(info.updatedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </div>
              )}
            </div>
          </div>

          {/* Introduction */}
          <div className="blog-body" style={{ marginBottom: 40 }}>
            {parseParagraphs(article.introduction.content)}
          </div>

          {/* Sections */}
          <div className="blog-body">
            {article.sections.map((section) => (
              <Section key={section.id} section={section} />
            ))}
          </div>

          {/* Key Takeaways standalone if at top level */}
          {article.keyTakeaways && <KeyTakeaways items={article.keyTakeaways} />}

          {/* Divider */}
          <div style={{ borderTop: "1px solid var(--brd)", margin: "48px 0" }} />

          {/* FAQs */}
          {faqs?.length > 0 && (
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".14em", color: "var(--grn)", marginBottom: 20 }}>
                FREQUENTLY ASKED QUESTIONS
              </div>
              <FAQs faqs={faqs} />
            </div>
          )}

          {/* References */}
          {references?.length > 0 && (
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".14em", color: "var(--mut)", marginBottom: 16 }}>
                REFERENCES & SOURCES
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {references.map((ref) => (
                  <div key={ref.id} style={{ display: "flex", gap: 12, fontSize: 11, color: "var(--mut-lt)", lineHeight: 1.6 }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--mut)", flexShrink: 0, paddingTop: 2 }}>
                      [{ref.id}]
                    </span>
                    <span>
                      {ref.citation}
                      {ref.url && (
                        <a href={ref.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--grn)", marginLeft: 6, fontFamily: "var(--font-mono)", fontSize: 9 }}>
                          ↗
                        </a>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          <div style={{
            padding: "24px 26px",
            background: "var(--surf)", border: "1px solid var(--brd)",
            borderRadius: "var(--r-lg)", marginBottom: 48,
          }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: ".14em", color: "var(--mut)", marginBottom: 12 }}>
              ABOUT THE AUTHOR
            </div>
            <div style={{ fontFamily: "var(--font-head)", fontSize: 15, fontWeight: 700, color: "var(--txt)", marginBottom: 6 }}>
              {info.author.name}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--grn)", letterSpacing: ".08em", marginBottom: 10 }}>
              {info.author.designation}
            </div>
            <div style={{ fontSize: 12.5, color: "var(--mut-lt)", lineHeight: 1.8, fontWeight: 300 }}>
              {info.author.bio}
            </div>
          </div>

          {/* CTA */}
          {cta && (
            <div style={{
              padding: "32px 36px",
              background: "rgba(0,224,80,.04)", border: "1px solid var(--grnd)",
              borderRadius: "var(--r-lg)", textAlign: "center",
              marginBottom: 48,
            }}>
              <div style={{ fontFamily: "var(--font-head)", fontSize: 20, fontWeight: 700, color: "var(--txt)", lineHeight: 1.4, marginBottom: 10 }}>
                {cta.headline}
              </div>
              <div style={{ fontSize: 13, color: "var(--mut-lt)", lineHeight: 1.75, marginBottom: 22, fontWeight: 300, maxWidth: 480, margin: "0 auto 22px" }}>
                {cta.subheadline}
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 14 }}>
                <button className="btn-p" onClick={openDemo}>{cta.primaryButton.label} →</button>
                {cta.secondaryButton && (
                  <a className="btn-g" href={cta.secondaryButton.url} target="_blank" rel="noopener noreferrer">
                    {cta.secondaryButton.label} ↗
                  </a>
                )}
              </div>
              {cta.note && (
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--mut)", letterSpacing: ".06em" }}>
                  {cta.note}
                </div>
              )}
            </div>
          )}

          {/* Engagement — likes + comments */}
          <BlogEngagement slug={blog.slug} />

          {/* Related Articles */}
          {relatedArticles?.length > 0 && (
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".14em", color: "var(--mut)", marginBottom: 16 }}>
                RELATED ARTICLES
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {relatedArticles.map((rel) => (
                  rel.status === "upcoming" ? (
                    <div key={rel.slug} style={{
                      padding: "16px 20px", background: "var(--surf)",
                      border: "1px solid var(--brd)", borderRadius: "var(--r-md)",
                      opacity: 0.6,
                    }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--mut)", letterSpacing: ".1em", padding: "1px 6px", border: "1px solid var(--brd)", borderRadius: 4 }}>
                          COMING SOON
                        </span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--mut)" }}>{rel.readingTime} read</span>
                      </div>
                      <div style={{ fontFamily: "var(--font-head)", fontSize: 14, fontWeight: 700, color: "var(--txt)", marginBottom: 4 }}>
                        {rel.title}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--mut-lt)", lineHeight: 1.6, fontWeight: 300 }}>{rel.description}</div>
                    </div>
                  ) : (
                    <Link key={rel.slug} to={`/insights/${rel.slug}`} style={{
                      padding: "16px 20px", background: "var(--surf)",
                      border: "1px solid var(--brd)", borderRadius: "var(--r-md)",
                      textDecoration: "none", display: "block",
                      transition: "border-color .2s",
                    }}>
                      <div style={{ fontFamily: "var(--font-head)", fontSize: 14, fontWeight: 700, color: "var(--txt)", marginBottom: 4 }}>
                        {rel.title} ↗
                      </div>
                      <div style={{ fontSize: 12, color: "var(--mut-lt)", lineHeight: 1.6, fontWeight: 300 }}>{rel.description}</div>
                    </Link>
                  )
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Sticky Sidebar TOC ── */}
        <div className="blog-sidebar" style={{ position: "sticky", top: 100 }}>
          <div style={{
            background: "var(--surf)", border: "1px solid var(--brd)",
            borderRadius: "var(--r-lg)", padding: "20px",
          }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: ".14em", color: "var(--mut)", marginBottom: 14 }}>
              TABLE OF CONTENTS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {tableOfContents.map((item, i) => (
                <a
                  key={i}
                  href={`#${slugify(item)}`}
                  className="blog-toc-link"
                  style={{
                    fontSize: 11, color: "var(--mut-lt)",
                    textDecoration: "none", lineHeight: 1.5,
                    padding: "4px 0 4px 10px",
                    borderLeft: "1px solid var(--brd)",
                    transition: "color .2s, border-color .2s",
                    display: "flex", alignItems: "flex-start", gap: 8,
                  }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--mut)", flexShrink: 0, paddingTop: 2 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item}
                </a>
              ))}
            </div>

            <div style={{ borderTop: "1px solid var(--brd)", marginTop: 16, paddingTop: 14 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--mut)", marginBottom: 8 }}>
                {info.readingTime.toUpperCase()} READ
              </div>
              <Link to="/insights" style={{
                fontFamily: "var(--font-mono)", fontSize: 9,
                color: "var(--grn)", textDecoration: "none",
                letterSpacing: ".08em",
              }}>
                ← ALL ARTICLES
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}