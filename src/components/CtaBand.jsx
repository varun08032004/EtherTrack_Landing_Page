import { useState } from "react";
import { isValidEmail } from "../utils";

export default function CtaBand({
  eyebrow = "EARLY ACCESS",
  title,
  subtitle,
  note = "No commitment · 30-minute walkthrough · Response within 24 hours",
}) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const submit = () => {
    if (isValidEmail(email)) { setSent(true); setError(false); }
    else setError(true);
  };

  return (
    <section className="cta-sect" id="demo">
      <div style={{ fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:".2em", color:"var(--mut)", marginBottom:16 }}>{eyebrow}</div>
      <h2 className="cta-h2">{title}</h2>
      <p className="cta-sub">{subtitle}</p>
      {sent
        ? <p style={{ fontFamily:"var(--font-mono)", fontSize:12, color:"var(--grn)", letterSpacing:".1em" }}>✓ RECEIVED — we'll respond within 24 hours</p>
        : (
          <>
            <div className="cta-form">
              <input
                className="cta-inp"
                type="email"
                placeholder="your@company.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(false); }}
                style={error ? { borderColor: "var(--red)" } : undefined}
              />
              <button className="btn-p" onClick={submit}>REQUEST DEMO →</button>
            </div>
            {error && <p style={{ color:"var(--red)", fontFamily:"var(--font-mono)", fontSize:11, marginTop:10 }}>Enter a valid email address</p>}
          </>
        )
      }
      <p className="cta-note">{note}</p>
    </section>
  );
}