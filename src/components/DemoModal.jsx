import { useState } from "react";
import emailjs from "@emailjs/browser";
import { isValidEmail } from "../utils";

const EMAILJS_SERVICE_ID = "service_lsq2fy2";
const EMAILJS_TEMPLATE_ID = "template_tdqb7h4";          // notifies founder@
const EMAILJS_AUTOREPLY_TEMPLATE_ID = "template_xhoujfa"; // replies to the lead
const EMAILJS_PUBLIC_KEY = "ClBYGxIeqR4j9AAjZ";

/* ─── DEMO MODAL ─────────────────────────────────────────────────── */
export default function DemoModal({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", company: "", role: "" });
  const [sent, setSent] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");

  const set = k => e => {
    setForm(p => ({ ...p, [k]: e.target.value }));
    if (k === "email") setEmailError(false);
  };

  const handleSend = async () => {
    if (!isValidEmail(form.email)) {
      setEmailError(true);
      return;
    }
    setServerError("");
    setSending(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        company: form.company,
        role: form.role,
      };

      // 1. Notify founder@ethertrack.in
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, payload, EMAILJS_PUBLIC_KEY);

      // 2. Auto-reply to the lead (fire-and-forget — don't block success on this)
      emailjs
        .send(EMAILJS_SERVICE_ID, EMAILJS_AUTOREPLY_TEMPLATE_ID, payload, EMAILJS_PUBLIC_KEY)
        .catch(err => console.error("Auto-reply failed:", err));

      setSent(true);
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setServerError("Couldn't send your request. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        {sent ? (
          <div className="modal-success">
            <div className="modal-check">✓</div>
            <h3 style={{ fontFamily:"var(--font-head)", fontSize:"1.3rem", marginBottom:".75rem" }}>Request received</h3>
            <p style={{ color:"var(--mut)", fontSize:14, lineHeight:1.7 }}>We'll reach out within 24 hours to schedule your 30-minute walkthrough.</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom:"1.75rem" }}>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"var(--grn)", letterSpacing:".15em" }}>EARLY ACCESS</div>
              <h3 style={{ fontFamily:"var(--font-head)", fontSize:"1.4rem", fontWeight:700, marginTop:".5rem" }}>Request a Demo</h3>
              <p style={{ color:"var(--mut)", fontSize:13, marginTop:".4rem" }}>30-minute walkthrough · No commitment</p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
              {[["name","Full name","Priya Sharma","text"],["email","Work email","priya@company.com","email"],["company","Company","Tata Steel / Adani Ports…","text"],["role","Role","Head of Sustainability / CFO…","text"]].map(([k,l,ph,t])=>(
                <div key={k}>
                  <label>{l.toUpperCase()}</label>
                  <input type={t} placeholder={ph} value={form[k]} onChange={set(k)} style={k === "email" && emailError ? { borderColor: "var(--red)" } : undefined} />
                  {k === "email" && emailError && <p style={{ color:"var(--red)", fontFamily:"var(--font-mono)", fontSize:10, marginTop:6 }}>Enter a valid email address</p>}
                </div>
              ))}
              {serverError && <p style={{ color:"var(--red)", fontFamily:"var(--font-mono)", fontSize:10 }}>{serverError}</p>}
              <button className="btn-p" style={{ marginTop:".5rem", opacity: sending ? 0.6 : 1 }} onClick={handleSend} disabled={sending}>
                {sending ? "SENDING…" : "SEND REQUEST →"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}