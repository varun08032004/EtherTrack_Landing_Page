import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useReveal } from "../hooks";
import Seo from "../components/Seo";

const ETPL_OPS_API = (import.meta.env.VITE_ETPL_OPS_API || 'https://etpl-ops.onrender.com').replace(/\/$/, '');

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [application, setApplication] = useState({
    full_name: '', email: '', phone: '', linkedin: '', portfolio: '',
    resume_file: null, cover_letter_file: null, answers: {}
  });
  const [appStatus, setAppStatus] = useState('idle');
  const [appError, setAppError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const reveal = useReveal([jobs.length]);

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      setLoading(true);
      const res = await fetch(`${ETPL_OPS_API}/api/public/jobs`);
      if (!res.ok) throw new Error('Failed to fetch jobs');
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (err) {
      console.error('[Careers] fetchJobs error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function openJob(job) {
    setSelectedJob(job);
    setShowForm(false);
    setApplication({ full_name: '', email: '', phone: '', linkedin: '', portfolio: '', resume_file: null, cover_letter_file: null, answers: {} });
    setAppStatus('idle');
    setAppError(null);
    setFormErrors({});
    document.body.style.overflow = 'hidden';
  }

  function closeJob() {
    setSelectedJob(null);
    setShowForm(false);
    document.body.style.overflow = '';
  }

  function showApplyForm() {
    setShowForm(true);
  }

  function handleChange(e) {
    const { name, value, files } = e.target;
    setApplication(prev => ({ ...prev, [name]: files ? files[0] : value }));
  }

  function validateForm() {
    const errors = {};
    if (!application.full_name.trim()) errors.full_name = 'Full name is required';
    if (!application.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(application.email)) errors.email = 'Invalid email format';
    if (!application.resume_file) errors.resume_file = 'Resume PDF is required';
    else if (application.resume_file.type !== 'application/pdf') errors.resume_file = 'Resume must be a PDF file';
    if (!application.cover_letter_file) errors.cover_letter_file = 'Cover letter PDF is required';
    else if (application.cover_letter_file.type !== 'application/pdf') errors.cover_letter_file = 'Cover letter must be a PDF file';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleApply(e) {
    e.preventDefault();
    if (!selectedJob) return;
    if (!validateForm()) return;
    setAppStatus('submitting');
    setAppError(null);
    try {
      const formData = new FormData();
      formData.append('job_id', selectedJob.id);
      formData.append('full_name', application.full_name);
      formData.append('email', application.email);
      formData.append('phone', application.phone);
      formData.append('linkedin', application.linkedin);
      formData.append('portfolio', application.portfolio);
      formData.append('resume', application.resume_file);
      formData.append('cover_letter', application.cover_letter_file);

      const res = await fetch(`${ETPL_OPS_API}/api/public/jobs/${selectedJob.id}/apply`, {
        method: 'POST',
        body: formData
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Application failed');
      }
      setAppStatus('success');
      setApplication({ full_name: '', email: '', phone: '', linkedin: '', portfolio: '', resume_file: null, cover_letter_file: null, answers: {} });
      setShowForm(false);
    } catch (err) {
      setAppStatus('error');
      setAppError(err.message);
    }
  }

  function formatSalary(min, max) {
    if (!min && !max) return 'Competitive';
    const fmt = (n) => `₹${(n/100000).toFixed(1)}L`;
    if (min && max) return `${fmt(min)} - ${fmt(max)}/yr`;
    if (min) return `From ${fmt(min)}/yr`;
    return `Up to ${fmt(max)}/yr`;
  }

  function formatExperience(min, max) {
    if (!min && !max) return 'Any experience';
    if (min && max) return `${min} - ${max} years`;
    if (min) return `${min}+ years`;
    return `Up to ${max} years`;
  }

  // Render job list based on state
  let jobsContent;
  if (loading) {
    jobsContent = (
      <div style={{ display: "flex", justifyContent: "center", padding: 60 }}>
        <div style={{ width: 32, height: 32, border: "3px solid var(--brd)", borderTopColor: "var(--grn)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      </div>
    );
  } else if (error) {
    jobsContent = (
      <div className="reveal" style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", padding: 40, background: "var(--surf)", border: "1px solid var(--brd)", borderRadius: "var(--r-lg)" }}>
        <div style={{ color: "var(--red)", marginBottom: 12 }}>⚠️ Unable to load jobs</div>
        <div style={{ color: "var(--mut-lt)", marginBottom: 16 }}>{error}</div>
        <button className="btn-p" onClick={fetchJobs}>Retry</button>
      </div>
    );
  } else if (jobs.length === 0) {
    jobsContent = (
      <div className="reveal" style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", padding: 60, background: "var(--surf)", border: "1px solid var(--brd)", borderRadius: "var(--r-lg)" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
        <div className="b-title" style={{ fontFamily: "var(--font-head)", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>No open roles right now</div>
        <div style={{ color: "var(--mut-lt)", marginBottom: 20 }}>We're fully staffed for this cycle. Check back soon — we grow in steps, not spurts.</div>
        <Link to="/" className="btn-p">← Back to Home</Link>
      </div>
    );
  } else {
    jobsContent = (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 900, margin: "0 0 0 0" }}>
        {jobs.map((job, i) => (
          <div key={job.id} className="reveal job-card" style={{ 
            background: "var(--surf)", 
            border: "1px solid var(--brd)", 
            borderRadius: "var(--r-lg)", 
            padding: "24px 28px", 
            display: "grid", 
            gridTemplateColumns: "1fr auto", 
            gap: 16, 
            alignItems: "center", 
            textAlign: "left", 
            cursor: "pointer", 
            transition: "border-color .3s, transform .2s, box-shadow .2s",
            minHeight: 120,
            width: "100%",
            minWidth: 0,
            boxSizing: "border-box"
          }} onClick={() => openJob(job)}>
            <div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8, alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--grn)", background: "rgba(0,224,80,.1)", padding: "2px 8px", borderRadius: "var(--r-sm)", border: "1px solid var(--grn)33" }}>
                  {job.type.toUpperCase()}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--blu)", background: "rgba(59,130,246,.1)", padding: "2px 8px", borderRadius: "var(--r-sm)", border: "1px solid var(--blu)33" }}>
                  {job.department}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--org)", background: "rgba(249,115,22,.1)", padding: "2px 8px", borderRadius: "var(--r-sm)", border: "1px solid var(--org)33" }}>
                  {job.location}
                </span>
              </div>
              <div style={{ fontFamily: "var(--font-head)", fontSize: 20, fontWeight: 700, color: "var(--txt)", marginBottom: 8, lineHeight: 1.3 }}>
                {job.title}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, fontSize: 13, color: "var(--mut-lt)", fontFamily: "var(--font-mono)", marginTop: 8 }}>
                <span>💰 {formatSalary(job.salary_min, job.salary_max)}</span>
                <span>📈 Fresher friendly (0-2 yrs)</span>
                {job.openings_count && job.openings_count > 1 && <span style={{ color: "var(--grn)", fontWeight: 600 }}>👥 {job.openings_count} roles available</span>}
                <span>📅 Posted {new Date(job.posted_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
            <button onClick={(e) => { e.stopPropagation(); openJob(job); }} style={{
              background: "var(--grn)", 
              color: "var(--bg)", 
              border: "none", 
              padding: "10px 20px", 
              borderRadius: 6, 
              fontFamily: "var(--font-mono)", 
              fontSize: 11, 
              fontWeight: 700, 
              letterSpacing: ".12em", 
              cursor: "pointer", 
              transition: "all .2s", 
              whiteSpace: "nowrap", 
              height: "fit-content",
              flexShrink: 0
            }}>APPLY NOW</button>
          </div>
        ))}
      </div>
    );

  return (
    <>
      <Seo
        title="Careers — EtherTrack"
        description="Join the team building India's blockchain-native carbon infrastructure. Open roles across engineering, product, carbon markets, and operations."
        path="/careers"
      />

      {/* ── Hero ── matches all page-heroes exactly */}
      <section className="page-hero reveal">
        <div className="eyebrow">CAREERS</div>
        <h1 className="page-h1">Build the carbon infrastructure<br/><span style={{ color: "var(--grn)" }}>India deserves</span></h1>
        <p className="page-sub">
          We're a small, high-trust team shipping real blockchain carbon infrastructure for India's compliance market.
          No consultants, no middlemen — just engineers, carbon experts, and operators solving hard problems together.
        </p>
        <div className="hero-note" style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 8, color: "var(--mut-lt)" }}>
          <span>{jobs.length} open role{jobs.length !== 1 ? 's' : ''}</span>
          <span style={{ color: "var(--brd2)" }}>·</span>
          <span>Remote-first</span>
          <span style={{ color: "var(--brd2)" }}>·</span>
          <span>Competitive equity</span>
          <span style={{ color: "var(--brd2)" }}>·</span>
          <span>30-day notice buyout support</span>
        </div>
      </section>

      {/* ── Open Roles ── uses standard section + card pattern */}
      <section className="section" id="open-roles">
        <div className="reveal" style={{ width: "100%", maxWidth: "none", margin: "0 0 40px 0", textAlign: "left" }}>
          <div className="s-label">OPEN ROLES</div>
          <h2 className="s-h2">Positions we're hiring for</h2>
        </div>

        {jobsContent}

        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </section>

      {/* ── Application Modal ── two-step: Job Details → Apply Form */}
      {selectedJob && (
        <div className="modal-bg" onClick={closeJob}>
          <div className="modal" style={{ maxWidth: 720, maxHeight: "90vh", overflow: "auto" }} onClick={e => e.stopPropagation()}>
            <div className="modal-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "24px 28px 16px", borderBottom: "1px solid var(--brd)" }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--grn)", marginBottom: 4 }}>
                  {selectedJob.type.toUpperCase()} · {selectedJob.department} · {selectedJob.location}
                </div>
                <div style={{ fontFamily: "var(--font-head)", fontSize: 22, fontWeight: 700 }}>{selectedJob.title}</div>
              </div>
              <button onClick={closeJob} className="modal-close" aria-label="Close">✕</button>
            </div>

            <div className="modal-body" style={{ padding: 24 }}>
              {appStatus === 'success' ? (
                <div className="modal-success" style={{ textAlign: "center", padding: "40px 24px" }}>
                  <div className="modal-check" style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--grnd)", border: "1px solid var(--grn)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: 24 }}>✅</div>
                  <div className="success-title" style={{ fontFamily: "var(--font-head)", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Application Submitted!</div>
                  <div className="success-desc" style={{ color: "var(--mut-lt)", marginBottom: 24 }}>Thanks for your interest. Our team will review and get back within 3 business days.</div>
                  <button className="btn-p" onClick={closeJob}>Close</button>
                </div>
              ) : !showForm ? (
                <>
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                      <div className="modal-section-title">Role Details</div>
                      {selectedJob.pdf_url && (
                        <a href={selectedJob.pdf_url} target="_blank" rel="noopener noreferrer" style={{
                          display: "inline-flex", alignItems: "center", gap: 6,
                          padding: "8px 16px", background: "var(--grn)", color: "var(--bg)",
                          borderRadius: 6, fontFamily: "var(--font-mono)", fontSize: 11,
                          fontWeight: 700, letterSpacing: ".1em", textDecoration: "none"
                        }}>
                          📄 Download Job Description (PDF)
                        </a>
                      )}
                    </div>
                    <div className="job-desc" style={{ fontSize: 14, color: "var(--mut-lt)", lineHeight: 1.8, marginBottom: 16, whiteSpace: "pre-wrap" }}>
                      {selectedJob.description || 'No description provided.'}
                    </div>
                    {selectedJob.requirements?.length && (
                      <div style={{ marginBottom: 12 }}>
                        <div className="modal-section-title">Requirements</div>
                        <ul className="job-list" style={{ margin: 0, paddingLeft: 20, color: "var(--txt)", lineHeight: 1.8 }}>
                          {selectedJob.requirements.map((r, i) => <li key={i}>{r}</li>)}
                        </ul>
                      </div>
                    )}
                    {selectedJob.responsibilities?.length && (
                      <div style={{ marginBottom: 12 }}>
                        <div className="modal-section-title">Responsibilities</div>
                        <ul className="job-list" style={{ margin: 0, paddingLeft: 20, color: "var(--txt)", lineHeight: 1.8 }}>
                          {selectedJob.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                        </ul>
                      </div>
                    )}
                    {selectedJob.benefits?.length && (
                      <div>
                        <div className="modal-section-title">Benefits</div>
                        <ul className="job-list" style={{ margin: 0, paddingLeft: 20, color: "var(--txt)", lineHeight: 1.8 }}>
                          {selectedJob.benefits.map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                      </div>
                    )}

                    <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 24, paddingTop: 24, borderTop: "1px solid var(--brd)" }}>
                      <button type="button" className="btn-g" onClick={closeJob}>Cancel</button>
                      <button type="button" className="btn-p" onClick={showApplyForm}>Apply for This Role →</button>
                    </div>
                  </div>
                </>
              ) : (
                <form onSubmit={handleApply} className="apply-form" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div className="modal-section-title">Apply for This Role</div>
                    <button type="button" className="btn-g" style={{ padding: "6px 12px", fontSize: 11 }} onClick={() => setShowForm(false)}>← Back to Job Details</button>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input name="full_name" value={application.full_name} onChange={handleChange} required className={`form-input${formErrors.full_name ? ' error' : ''}`} placeholder="Your full name" />
                      {formErrors.full_name && <span style={{ color: "var(--red)", fontSize: 11, marginTop: 4, display: "block" }}>{formErrors.full_name}</span>}
                    </div>
                    <div>
                      <label className="form-label">Email *</label>
                      <input name="email" type="email" value={application.email} onChange={handleChange} required className={`form-input${formErrors.email ? ' error' : ''}`} placeholder="you@example.com" />
                      {formErrors.email && <span style={{ color: "var(--red)", fontSize: 11, marginTop: 4, display: "block" }}>{formErrors.email}</span>}
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label className="form-label">Phone</label>
                      <input name="phone" value={application.phone} onChange={handleChange} className="form-input" placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div>
                      <label className="form-label">LinkedIn</label>
                      <input name="linkedin" value={application.linkedin} onChange={handleChange} className="form-input" placeholder="linkedin.com/in/yourprofile" />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label className="form-label">Portfolio / GitHub</label>
                      <input name="portfolio" value={application.portfolio} onChange={handleChange} className="form-input" placeholder="https://github.com/yourname" />
                    </div>
                    <div>
                      <label className="form-label">Resume (PDF) *</label>
                      <input name="resume_file" type="file" accept="application/pdf" onChange={handleChange} required className={`form-input${formErrors.resume_file ? ' error' : ''}`} />
                      {application.resume_file && <span style={{ color: "var(--grn)", fontSize: 11, marginTop: 4, display: "block" }}>✓ {application.resume_file.name} ({(application.resume_file.size / 1024).toFixed(1)} KB)</span>}
                      {formErrors.resume_file && <span style={{ color: "var(--red)", fontSize: 11, marginTop: 4, display: "block" }}>{formErrors.resume_file}</span>}
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Cover Letter (PDF) *</label>
                    <input name="cover_letter_file" type="file" accept="application/pdf" onChange={handleChange} required className={`form-input${formErrors.cover_letter_file ? ' error' : ''}`} />
                    {application.cover_letter_file && <span style={{ color: "var(--grn)", fontSize: 11, marginTop: 4, display: "block" }}>✓ {application.cover_letter_file.name} ({(application.cover_letter_file.size / 1024).toFixed(1)} KB)</span>}
                    {formErrors.cover_letter_file && <span style={{ color: "var(--red)", fontSize: 11, marginTop: 4, display: "block" }}>{formErrors.cover_letter_file}</span>}
                    <p style={{ fontSize: 12, color: "var(--mut)", marginTop: 8 }}>Upload a PDF explaining why you're excited about carbon infrastructure and why EtherTrack.</p>
                  </div>

                  {appError && <div style={{ background: "rgba(239,68,68,.1)", border: "1px solid var(--red)33", borderRadius: "var(--r-md)", padding: "12px 16px", color: "var(--red)", fontSize: 13 }}>{appError}</div>}

                  <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 8 }}>
                    <button type="button" className="btn-g" onClick={() => setShowForm(false)} disabled={appStatus === 'submitting'}>Cancel</button>
                    <button type="submit" className="btn-p" disabled={appStatus === 'submitting'}>
                      {appStatus === 'submitting' ? 'Submitting...' : 'Submit Application →'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── CTA ── matches global .cta-sect pattern */}
      <section className="cta-sect reveal" style={{ background: "var(--surf)", borderTop: "1px solid var(--brd)" }}>
        <h2 className="cta-h2">We're always looking for exceptional people</h2>
        <p className="cta-sub">If you're obsessed with carbon markets, blockchain, or Indian regulatory tech — email us anyway. We create roles for the right people.</p>
        <a href="mailto:careers@ethertrack.in" className="btn-p" style={{ marginTop: 16, display: "inline-block" }}>EMAIL CAREERS@ETHERTRACK.IN →</a>
      </section>
    </>
  );
}
}