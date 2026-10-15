import { useRef } from "react";
import { useReveal } from "../hooks";
import CtaBand from "../components/CtaBand";
import Seo from "../components/Seo";
import { legalContent, legalMeta } from "../data/legal";
import { parseMarkdown } from "../utils/markdown.jsx";

export function LegalPage({ type }) {
  const { title, description, path } = legalMeta[type];
  const markdown = legalContent[type];
  useReveal();
  const contentRef = useRef(null);

  return (
    <>
      <Seo title={title} description={description} path={path} />
      <style>{`
        .legal-page {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 24px 80px;
        }
        .legal-header {
          margin-bottom: 48px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--brd);
        }
        .legal-h1 {
          font-family: var(--font-head);
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 800;
          color: var(--txt);
          line-height: 1.2;
          margin-bottom: 16px;
        }
        .legal-meta {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--mut-lt);
          letter-spacing: 0.06em;
        }
        .legal-h2 {
          font-family: var(--font-head);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--txt);
          margin-top: 40px;
          margin-bottom: 16px;
          padding-top: 8px;
        }
        .legal-h3 {
          font-family: var(--font-head);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--txt);
          margin-top: 28px;
          margin-bottom: 12px;
        }
        .legal-p {
          font-size: 14px;
          color: var(--mut-lt);
          line-height: 1.85;
          margin-bottom: 16px;
          font-weight: 300;
        }
        .legal-bold {
          font-weight: 600;
          color: var(--txt);
        }
        .legal-list {
          margin: 16px 0 16px 20px;
          padding-left: 8px;
        }
        .legal-list-item {
          font-size: 14px;
          color: var(--mut-lt);
          line-height: 1.85;
          margin-bottom: 8px;
          font-weight: 300;
        }
        .legal-code-block {
          background: var(--surf);
          border: 1px solid var(--brd);
          border-radius: var(--r-md);
          padding: 16px 20px;
          margin: 16px 0;
          overflow-x: auto;
        }
        .legal-code-block code {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--mut-lt);
        }
        .legal-hr {
          border: none;
          border-top: 1px solid var(--brd);
          margin: 32px 0;
        }
        .legal-spacer {
          margin: 12px 0;
        }
        .legal-link {
          color: var(--grn);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }
        .legal-link:hover {
          border-bottom-color: var(--grn);
        }
        .legal-back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 32px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--mut);
          text-decoration: none;
          transition: color 0.2s;
        }
        .legal-back-link:hover {
          color: var(--grn);
        }
        .legal-content strong {
          color: var(--txt);
          font-weight: 600;
        }
        .legal-content em {
          color: var(--mut-lt);
          font-style: italic;
        }
        .legal-content code {
          font-family: var(--font-mono);
          font-size: 12px;
          background: var(--surf);
          padding: 2px 6px;
          border-radius: 4px;
          color: var(--grn);
        }
        @media (max-width: 640px) {
          .legal-page { padding: 24px 16px 60px; }
          .legal-h1 { font-size: 1.5rem; }
          .legal-h2 { font-size: 1.2rem; }
        }
      `}</style>

      <section className="page-hero" style={{ paddingBottom: 24 }}>
        <div className="eyebrow">LEGAL</div>
        <h1 className="page-h1">{title}</h1>
        <p className="page-sub">
          Last updated: 15 October 2026 · EtherTrack Technologies Private Limited
        </p>
      </section>

      <div className="legal-page">
        <a href="/" className="legal-back-link">← Back to Home</a>
        <div className="legal-header">
          <h1 className="legal-h1">{title}</h1>
          <div className="legal-meta">Last updated: 15 October 2026</div>
        </div>
        <div className="legal-content" ref={contentRef}>
          {parseMarkdown(markdown)}
        </div>
      </div>

      <CtaBand
        eyebrow="QUESTIONS?"
        title={<>Legal questions?<br/><span style={{ color:"var(--grn)" }}>We're here to help</span></>}
        subtitle="Contact our team for clarification on any legal document or policy."
        note="Email: contact@ethertrack.in · Response within 24 hours"
      />
    </>
  );
}

export default LegalPage;