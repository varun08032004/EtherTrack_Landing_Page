import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Generate/retrieve anonymous ID for like tracking
function getAnonId() {
  let id = localStorage.getItem("et_anon_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("et_anon_id", id);
  }
  return id;
}

/* ── Like Button ───────────────────────────────────────────────── */
function LikeButton({ slug }) {
  const [count, setCount]   = useState(0);
  const [liked, setLiked]   = useState(false);
  const [loading, setLoading] = useState(false);
  const anonId = getAnonId();

  useEffect(() => {
    async function load() {
      const [{ count: total }, { data: mine }] = await Promise.all([
        supabase.from("blog_likes").select("*", { count: "exact", head: true }).eq("slug", slug),
        supabase.from("blog_likes").select("id").eq("slug", slug).eq("anon_id", anonId).maybeSingle(),
      ]);
      setCount(total || 0);
      setLiked(!!mine);
    }
    load();
  }, [slug]);

  const toggle = async () => {
    if (loading) return;
    setLoading(true);
    if (liked) {
      await supabase.from("blog_likes").delete().eq("slug", slug).eq("anon_id", anonId);
      setCount(c => c - 1);
      setLiked(false);
    } else {
      await supabase.from("blog_likes").insert({ slug, anon_id: anonId });
      setCount(c => c + 1);
      setLiked(true);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "12px 24px",
        background: liked ? "rgba(0,224,80,.1)" : "var(--surf)",
        border: `1px solid ${liked ? "var(--grn)" : "var(--brd)"}`,
        borderRadius: "var(--r-md)",
        cursor: loading ? "wait" : "pointer",
        transition: "all .2s",
        outline: "none",
      }}
    >
      <span style={{ fontSize: 22, lineHeight: 1, transition: "transform .2s", transform: liked ? "scale(1.2)" : "scale(1)" }}>
        {liked ? "❤️" : "🤍"}
      </span>
      <div style={{ textAlign: "left" }}>
        <div style={{ fontFamily: "var(--font-head)", fontSize: 18, fontWeight: 700, color: liked ? "var(--grn)" : "var(--txt)", lineHeight: 1 }}>
          {count}
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--mut)", letterSpacing: ".1em", marginTop: 3 }}>
          {liked ? "LIKED · CLICK TO UNLIKE" : "FOUND THIS USEFUL?"}
        </div>
      </div>
    </button>
  );
}

/* ── Comments ──────────────────────────────────────────────────── */
function Comments({ slug }) {
  const [comments, setComments] = useState([]);
  const [name, setName]         = useState("");
  const [message, setMessage]   = useState("");
  const [status, setStatus]     = useState("idle"); // idle | sending | done | error
  const bottomRef = useRef(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("blog_comments")
        .select("id, name, message, created_at")
        .eq("slug", slug)
        .eq("approved", true)
        .order("created_at", { ascending: true });
      setComments(data || []);
    }
    load();
  }, [slug]);

  const submit = async () => {
    if (!name.trim() || !message.trim()) return;
    setStatus("sending");
    const { error } = await supabase
      .from("blog_comments")
      .insert({ slug, name: name.trim(), message: message.trim() });
    if (error) {
      setStatus("error");
      return;
    }
    const newComment = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      created_at: new Date().toISOString(),
    };
    setComments(prev => [...prev, newComment]);
    setName("");
    setMessage("");
    setStatus("done");
    setTimeout(() => setStatus("idle"), 4000);
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".14em", color: "var(--mut)" }}>
          COMMENTS {comments.length > 0 && `· ${comments.length}`}
        </div>
      </div>

      {/* Comment list */}
      {comments.length === 0 ? (
        <div style={{
          padding: "28px 24px", textAlign: "center",
          background: "var(--surf)", border: "1px solid var(--brd)",
          borderRadius: "var(--r-md)", marginBottom: 20,
        }}>
          <div style={{ fontSize: 24, marginBottom: 10 }}>💬</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--mut-lt)", letterSpacing: ".1em" }}>
            BE THE FIRST TO COMMENT
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {comments.map((c) => (
            <div key={c.id} style={{
              background: "var(--surf)", border: "1px solid var(--brd)",
              borderRadius: "var(--r-md)", padding: "16px 20px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: "var(--bg)", border: "1px solid var(--brd)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-head)", fontWeight: 700,
                    fontSize: 13, color: "var(--grn)",
                  }}>
                    {c.name.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ fontFamily: "var(--font-head)", fontSize: 13, fontWeight: 700, color: "var(--txt)" }}>
                    {c.name}
                  </div>
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--mut)", letterSpacing: ".06em" }}>
                  {formatDate(c.created_at)}
                </div>
              </div>
              <div style={{ fontSize: 13, color: "var(--mut-lt)", lineHeight: 1.75, fontWeight: 300 }}>
                {c.message}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      )}

      {/* Comment form */}
      <div style={{
        background: "var(--surf)", border: "1px solid var(--brd)",
        borderRadius: "var(--r-lg)", padding: "24px",
      }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: ".14em", color: "var(--mut)", marginBottom: 16 }}>
          LEAVE A COMMENT
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: ".12em", color: "var(--mut-lt)", display: "block", marginBottom: 6 }}>
              YOUR NAME
            </label>
            <input
              type="text"
              placeholder="Priya Sharma"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{
                width: "100%", background: "var(--bg)",
                border: "1px solid var(--brd)", borderRadius: "var(--r-md)",
                padding: "10px 14px", color: "var(--txt)", fontSize: 13,
                fontFamily: "inherit", outline: "none", boxSizing: "border-box",
                transition: "border-color .2s",
              }}
              onFocus={e => e.target.style.borderColor = "var(--grn)"}
              onBlur={e => e.target.style.borderColor = "var(--brd)"}
            />
          </div>

          <div>
            <label style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: ".12em", color: "var(--mut-lt)", display: "block", marginBottom: 6 }}>
              YOUR COMMENT
            </label>
            <textarea
              placeholder="Share your thoughts, questions, or experience with carbon credits..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={4}
              style={{
                width: "100%", background: "var(--bg)",
                border: "1px solid var(--brd)", borderRadius: "var(--r-md)",
                padding: "10px 14px", color: "var(--txt)", fontSize: 13,
                fontFamily: "inherit", outline: "none", resize: "vertical",
                boxSizing: "border-box", lineHeight: 1.7,
                transition: "border-color .2s",
              }}
              onFocus={e => e.target.style.borderColor = "var(--grn)"}
              onBlur={e => e.target.style.borderColor = "var(--brd)"}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            {status === "done" && (
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--grn)", letterSpacing: ".1em" }}>
                ✓ COMMENT POSTED
              </div>
            )}
            {status === "error" && (
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--red)", letterSpacing: ".1em" }}>
                SOMETHING WENT WRONG · TRY AGAIN
              </div>
            )}
            {(status === "idle" || status === "sending") && (
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--mut)", letterSpacing: ".06em" }}>
                No email required · No account needed
              </div>
            )}
            <button
              className="btn-p"
              onClick={submit}
              disabled={status === "sending" || !name.trim() || !message.trim()}
              style={{ opacity: (!name.trim() || !message.trim()) ? 0.5 : 1 }}
            >
              {status === "sending" ? "POSTING…" : "POST COMMENT →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Export ───────────────────────────────────────────────── */
export default function BlogEngagement({ slug }) {
  return (
    <div style={{ marginBottom: 48 }}>
      {/* Divider */}
      <div style={{ borderTop: "1px solid var(--brd)", margin: "48px 0 32px" }} />

      {/* Like + share row */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40, flexWrap: "wrap" }}>
        <LikeButton slug={slug} />
        <div style={{ flex: 1, minWidth: 120 }}>
          <div style={{ fontSize: 12, color: "var(--mut-lt)", lineHeight: 1.6 }}>
            If this article was useful, share it with a colleague in sustainability, finance, or operations.
          </div>
        </div>
      </div>

      {/* Comments */}
      <Comments slug={slug} />
    </div>
  );
}