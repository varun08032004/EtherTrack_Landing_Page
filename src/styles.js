export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Unbounded:wght@400;700;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  :root {
    --bg:   #040904;
    --surf: #070d07;
    --surf2:#0a120a;
    --brd:  #0f2a1a;
    --brd2: #163520;
    --grn:  #00e050;
    --grn2: #00b840;
    --grnd: #00e05033;
    --org:  #ff8c00;
    --orgd: #ff8c0022;
    --blu:  #3a7fff;
    --blud: #3a7fff22;
    --vio:  #a78bfa;
    --txt:  #e8f5e9;
    --mut:  #7cb393;
    --mut-lt: #9cd4ad;
    --mut2: #3a5a45;
    --red:  #ff4444;
    --font-mono: 'JetBrains Mono', monospace;
    --font-head: 'Unbounded', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    --r-sm: 8px;
    --r-md: 12px;
    --r-lg: 16px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  html, body { overflow-x: hidden; }
  body { background: var(--bg); color: var(--txt); font-family: var(--font-body); overflow-y: auto; line-height: 1.6; }
  #root { overflow: visible !important; height: auto !important; }
  a { text-decoration: none; color: inherit; }

  body::before {
    content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image: linear-gradient(rgba(0,224,80,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,224,80,.02) 1px, transparent 1px);
    background-size: 48px 48px;
  }

  .orb { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; filter: blur(100px); }
  .orb1 { width:700px;height:700px;background:radial-gradient(circle,rgba(0,224,80,.05),transparent 70%);top:-300px;left:-200px; }
  .orb2 { width:500px;height:500px;background:radial-gradient(circle,rgba(58,127,255,.04),transparent 70%);top:40%;right:-150px; }
  .orb3 { width:400px;height:400px;background:radial-gradient(circle,rgba(255,140,0,.03),transparent 70%);bottom:15%;left:25%; }

  .reveal { opacity: 0; transform: translateY(24px); transition: opacity .65s ease, transform .65s ease; }
  @media (prefers-reduced-motion: reduce) {
    .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
    .mq-track, .ann-dot, .footer-net-dot { animation: none !important; }
    * { scroll-behavior: auto !important; }
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  .ann {
    position: relative; z-index: 10;
    background: linear-gradient(90deg, var(--bg), #051a0a, var(--bg));
    border-bottom: 1px solid var(--brd); padding: 10px 24px;
    display: flex; align-items: center; justify-content: center; gap: 12px;
    font-family: var(--font-mono); font-size: 11px; letter-spacing: .1em; color: #9cd4ad;
  }
  .ann-dot { width:6px;height:6px;border-radius:50%;background:var(--org);animation:pulse 2s infinite;flex-shrink:0; }
  @keyframes pulse { 0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(255,140,0,.5);}50%{opacity:.7;box-shadow:0 0 0 6px rgba(255,140,0,0);} }
  .ann-close { position:absolute;right:14px;top:50%;transform:translateY(-50%);background:transparent;border:none;color:var(--mut);font-family:var(--font-mono);font-size:12px;line-height:1;cursor:pointer;padding:6px 8px;transition:color .2s; }
  .ann-close:hover { color:var(--txt); }

  .nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(4,9,4,.92); backdrop-filter: blur(24px);
    border-bottom: 1px solid var(--brd); padding: 0 48px; height: 64px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-logo { display:flex;align-items:center;gap:10px;font-family:var(--font-head);font-size:14px;font-weight:700; }
  .nav-logo img { height:36px;width:auto;object-fit:contain; }
  .nav-links { display:flex;align-items:center;gap:32px; }
  .nav-links a { font-family:var(--font-mono);font-size:12px;letter-spacing:.08em;color:#9cd4ad;transition:color .2s; }
  .nav-links a:hover { color:var(--grn); }
  .nav-right { display:flex;align-items:center;gap:10px; }
  .nav-status { font-family:var(--font-mono);font-size:9px;letter-spacing:.1em;color:var(--org);padding:5px 10px;border:1px solid var(--orgd);border-radius:4px;display:flex;align-items:center;gap:5px; }
  .nav-status-dot { width:5px;height:5px;border-radius:50%;background:var(--org); }
  .nav-cta { padding:9px 22px;border-radius:6px;background:transparent;border:1px solid var(--grn);color:var(--grn);font-family:var(--font-mono);font-size:11px;letter-spacing:.12em;cursor:pointer;transition:all .2s;font-weight:700; }
  .nav-cta:hover { background:var(--grn);color:var(--bg); }
  .nav-hamburger { display:none;flex-direction:column;gap:5px;padding:6px;border:1px solid var(--brd2);border-radius:6px;cursor:pointer;background:transparent; }
  .nav-hamburger span { width:20px;height:2px;background:var(--mut);border-radius:2px; }

  .mobile-nav { display:none;position:fixed;inset:0;z-index:200;background:rgba(4,9,4,.98);backdrop-filter:blur(20px);flex-direction:column;align-items:center;justify-content:center;gap:28px; }
  .mobile-nav.open { display:flex; }
  .mobile-nav a { font-family:var(--font-mono);font-size:13px;letter-spacing:.14em;color:#9cd4ad; }
  .mobile-nav a:hover { color:var(--grn); }
  .mobile-close { position:absolute;top:20px;right:20px;font-family:var(--font-mono);font-size:11px;color:var(--mut);padding:8px 14px;border:1px solid var(--brd2);border-radius:6px;cursor:pointer;background:transparent; }

  .hero { position:relative;z-index:1;min-height:88vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 48px 60px;text-align:center;overflow:hidden; }
  .eyebrow { font-family:var(--font-mono);font-size:10px;letter-spacing:.25em;color:var(--mut);margin-bottom:20px;display:flex;align-items:center;justify-content:center;gap:10px; }
  .eyebrow::before,.eyebrow::after { content:'';width:40px;height:1px;background:var(--mut2); }
  .hero-verb-row { font-family:var(--font-mono);font-size:11px;letter-spacing:.2em;color:var(--grn);margin-bottom:16px; }
  .h1 { font-family:var(--font-head);font-size:clamp(36px,5.5vw,72px);font-weight:900;line-height:1.05;letter-spacing:-.02em;max-width:960px;margin:0 auto 24px; }
  .h1 .g { color:var(--grn); }
  .h1 .o { color:var(--org); }
  .hero-sub { font-size:18px;color:#a0c8b0;max-width:560px;margin:0 auto 36px;font-weight:300;line-height:1.7; }
  .actions { display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap; }
  .btn-p { padding:14px 32px;border-radius:8px;background:var(--grn);color:var(--bg);font-family:var(--font-mono);font-size:12px;font-weight:700;letter-spacing:.12em;border:none;cursor:pointer;transition:all .2s;display:inline-block; }
  .btn-p:hover { background:#00ff60;transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,224,80,.3); }
  .btn-g { padding:14px 32px;border-radius:8px;background:transparent;border:1px solid var(--grn);color:var(--grn);font-family:var(--font-mono);font-size:12px;letter-spacing:.12em;cursor:pointer;transition:all .2s;display:inline-block; }
  .btn-g:hover { background:var(--grn);color:var(--bg); }
  .hero-note { margin-top:16px;font-family:var(--font-mono);font-size:9px;letter-spacing:.1em;color:#9cd4ad; }

  .mq-wrap { position:relative;z-index:1;border-top:1px solid var(--brd);border-bottom:1px solid var(--brd);background:var(--surf);overflow:hidden;padding:14px 0; }
  .mq-track { display:flex;gap:60px;white-space:nowrap;animation:marquee 30s linear infinite; }
  .mq-item { display:flex;align-items:center;gap:10px;font-family:var(--font-mono);font-size:11px;color:#9cd4ad;letter-spacing:.08em;flex-shrink:0; }
  @keyframes marquee { 0%{transform:translateX(0);}100%{transform:translateX(-50%);} }

  .section { position:relative;z-index:1;padding:100px 48px; }
  .s-label { font-family:var(--font-mono);font-size:11px;letter-spacing:.22em;color:#9cd4ad;margin-bottom:16px;display:flex;align-items:center;gap:10px; }
  .s-label::before { content:'';width:24px;height:1px;background:var(--grn); }
  .s-h2 { font-family:var(--font-head);font-size:clamp(26px,3.5vw,46px);font-weight:900;line-height:1.1;letter-spacing:-.02em;margin-bottom:16px; }
  .s-sub { font-size:17px;color:#a0c8b0;max-width:560px;font-weight:300;line-height:1.7;margin-bottom:60px; }

  .stats-row { display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--brd);border:1px solid var(--brd);border-radius:var(--r-md);overflow:hidden;margin-bottom:80px; }
  .s-cell { background:var(--surf);padding:32px 28px;position:relative;overflow:hidden; }
  .s-cell::before { content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--brd2); }
  .s-cell:nth-child(1)::before { background:var(--grn); }
  .s-cell:nth-child(2)::before { background:var(--org); }
  .s-cell:nth-child(3)::before { background:var(--blu); }
  .s-cell:nth-child(4)::before { background:var(--vio); }
  .s-num { font-family:var(--font-head);font-size:36px;font-weight:900;color:var(--grn);line-height:1;margin-bottom:6px;font-variant-numeric:tabular-nums; }
  .s-lbl { font-family:var(--font-mono);font-size:11px;color:#9cd4ad;letter-spacing:.1em; }
  .s-src { font-family:var(--font-mono);font-size:8px;color:#3a5a45;letter-spacing:.06em;margin-top:5px; }

  /* ── REDESIGNED GAP CARDS ── */
  .gap-grid { display:grid;grid-template-columns:1fr;gap:10px; }
  .gap-card {
    background:var(--surf); border:1px solid var(--brd); border-radius:var(--r-lg);
    padding:32px 36px; display:grid; grid-template-columns:1fr 1fr; gap:40px;
    align-items:start; position:relative; overflow:hidden; transition:border-color .3s;
  }
  .gap-card::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--brd2);transition:background .3s; }
  .gap-card:hover { border-color:var(--grnd); }
  .gap-card:hover::before { background:var(--grn); }
  .gap-num {
    position:absolute; top:18px; right:24px;
    font-family:var(--font-head); font-size:52px; font-weight:900;
    color:var(--brd2); line-height:1; pointer-events:none; user-select:none;
  }
  .gtag { font-family:var(--font-mono);font-size:9px;font-weight:700;letter-spacing:.18em;padding:4px 10px;border-radius:4px;display:inline-block;margin-bottom:12px; }
  .tp  { background:#2a0a0a;color:#f87171;border:1px solid #f8717133; }
  .ts  { background:#0a2a14;color:var(--grn);border:1px solid var(--grnd); }
  .ts-star { background:#051208;color:#00ff60;border:1px solid #00ff6033; }
  .g-title { font-family:var(--font-head);font-size:15px;font-weight:700;margin-bottom:10px;line-height:1.35;color:#f0f0f0; }
  .g-desc { font-size:13.5px;color:#a0c8b0;line-height:1.75;font-weight:300; }
  .gap-facts { margin-top:16px;display:flex;flex-direction:column;gap:7px; }
  .gap-fact { display:flex;align-items:baseline;gap:10px;font-size:13px;color:#a0c8b0;line-height:1.5; }
  .gap-fact::before { content:'→';color:var(--grn);font-family:var(--font-mono);font-size:10px;flex-shrink:0; }

  /* ── GAP TABS ── */
  .gap-tabs { display:flex;gap:0;border-bottom:1px solid var(--brd);margin-bottom:24px;overflow-x:auto;scrollbar-width:none; }
  .gap-tabs::-webkit-scrollbar { display:none; }
  .gap-tab-btn {
    padding:12px 22px; border:none; background:transparent; cursor:pointer;
    font-family:var(--font-mono); font-size:12px; letter-spacing:.08em;
    color:var(--mut-lt); border-bottom:2px solid transparent;
    transition:all .2s; margin-bottom:-1px; white-space:nowrap; display:flex; align-items:center; gap:8px;
  }
  .gap-tab-btn:hover { color:var(--txt); }
  .gap-tab-btn.on { color:var(--grn); border-bottom-color:var(--grn); }
  .gap-tab-n { font-family:var(--font-head);font-size:11px;color:var(--mut); }
  .gap-tab-btn.on .gap-tab-n { color:var(--grn); }

  /* ── TABBED FEATURES ── */
  .feat-tabs { display:flex;gap:0;border-bottom:1px solid var(--brd);margin-bottom:24px; }
  .feat-tab-btn {
    padding:12px 28px; border:none; background:transparent; cursor:pointer;
    font-family:var(--font-mono); font-size:12px; letter-spacing:.1em;
    color:var(--mut-lt); border-bottom:2px solid transparent;
    transition:all .2s; margin-bottom:-1px;
  }
  .feat-tab-btn:hover { color:var(--txt); }
  .feat-tab-btn.on { color:var(--grn); border-bottom-color:var(--grn); }
  .feat-panel { animation:fadeUp .3s ease; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);} }

  /* ── BENTO ── */
  .bento { display:grid;grid-template-columns:repeat(12,1fr);gap:12px; }
  .b-card { background:var(--surf);border:1px solid var(--brd);border-radius:14px;padding:28px;position:relative;overflow:hidden;transition:border-color .3s,transform .2s; }
  .b-card:hover { border-color:var(--grnd);transform:translateY(-3px); }
  .b-card::after { content:'';position:absolute;inset:0;border-radius:14px;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(0,224,80,.04),transparent 60%);pointer-events:none;opacity:0;transition:opacity .3s; }
  .b-card:hover::after { opacity:1; }
  .b-icon { font-size:28px;margin-bottom:16px;display:block; }
  .b-title { font-family:var(--font-head);font-size:15px;font-weight:700;margin-bottom:8px;line-height:1.3; }
  .b-desc { font-size:13px;color:#a0c8b0;line-height:1.7;font-weight:300; }
  .b-tag { margin-top:14px;font-family:var(--font-mono);font-size:9px;letter-spacing:.1em;color:var(--grn); }
  .c4{grid-column:span 4;}.c6{grid-column:span 6;}.c8{grid-column:span 8;}.c12{grid-column:span 12;}
  .kyc-steps { margin-top:16px;display:flex;flex-direction:column;gap:6px; }
  .kyc-step { display:flex;align-items:center;gap:10px;padding:8px 12px;background:var(--bg);border-radius:6px;border:1px solid var(--brd);font-family:var(--font-mono);font-size:9px;color:#a0c8b0; }
  .ks-dot { width:6px;height:6px;border-radius:50%;flex-shrink:0; }

  /* ── HOW IT WORKS ── */
  .how-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:0;position:relative; }
  .how-grid::before { content:'';position:absolute;top:48px;left:12.5%;right:12.5%;height:1px;background:linear-gradient(90deg,transparent,var(--brd2),var(--brd2),transparent);z-index:0; }
  .how-step { padding:0 24px;text-align:center;position:relative;z-index:1; }
  .how-n { width:96px;height:96px;border-radius:50%;background:var(--surf);border:1px solid var(--brd2);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-family:var(--font-head);font-size:28px;font-weight:900;transition:all .3s; }
  .how-step:hover .how-n { border-color:var(--grn);color:var(--grn);box-shadow:0 0 40px rgba(0,224,80,.15); }
  .how-ttl { font-family:var(--font-head);font-size:14px;font-weight:700;margin-bottom:8px; }
  .how-desc { font-size:13px;color:#a0c8b0;font-weight:300;line-height:1.6; }

  /* ── PRICING ── */
  .pricing-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px; }
  .price-card { background:var(--surf);border:1px solid var(--brd);border-radius:var(--r-lg);padding:28px 26px;display:flex;flex-direction:column;position:relative;transition:border-color .3s,transform .2s; }
  .price-card:hover { transform:translateY(-3px); }
  .price-card.popular { border-color:var(--grnd);background:linear-gradient(160deg,var(--surf2),var(--surf)); }
  .price-badge { position:absolute;top:-11px;right:24px;font-family:var(--font-mono);font-size:9px;font-weight:700;letter-spacing:.1em;padding:4px 10px;border-radius:20px;background:var(--grn);color:var(--bg); }
  .price-badge.org { background:var(--org); }
  .price-tier { font-family:var(--font-mono);font-size:9px;letter-spacing:.18em;color:#9cd4ad;margin-bottom:14px; }
  .price-name { font-family:var(--font-head);font-size:22px;font-weight:900;margin-bottom:4px; }
  .price-tag { font-size:12px;color:var(--mut);font-weight:300;margin-bottom:14px; }
  .price-desc { font-size:13px;color:#a0c8b0;line-height:1.6;font-weight:300;margin-bottom:22px;min-height:40px; }
  .price-amt-row { display:flex;align-items:baseline;gap:6px;margin-bottom:4px; }
  .price-amt { font-family:var(--font-head);font-size:30px;font-weight:900; }
  .price-per { font-size:12px;color:var(--mut);font-weight:300; }
  .price-gst { font-family:var(--font-mono);font-size:9px;color:#9cd4ad;margin-bottom:6px; }
  .price-save { font-family:var(--font-mono);font-size:10px;color:var(--grn);margin-bottom:14px; }
  .price-pills { display:flex;gap:8px;margin-bottom:22px;flex-wrap:wrap; }
  .price-pill { font-family:var(--font-mono);font-size:9px;padding:5px 11px;border-radius:20px;border:1px solid var(--brd2);color:#9cd4ad;display:flex;align-items:center;gap:5px; }
  .price-pill-dot { width:5px;height:5px;border-radius:50%; }
  .price-divider { height:1px;background:var(--brd);margin-bottom:18px; }
  .price-feats { display:flex;flex-direction:column;gap:9px;flex:1;margin-bottom:22px; }
  .price-feat { display:flex;align-items:flex-start;gap:9px;font-size:12.5px;line-height:1.5; }
  .price-feat.locked { color:#3a5a45; }
  .price-feat.unlocked { color:#c8e6d2; }
  .price-feat-icon { flex-shrink:0;font-size:10px;margin-top:2px; }
  .price-feat.locked .price-feat-icon { color:#3a5a45; }
  .price-feat.unlocked .price-feat-icon { color:var(--grn); }
  .price-cta { padding:13px;border-radius:8px;text-align:center;font-family:var(--font-mono);font-size:11px;font-weight:700;letter-spacing:.1em;cursor:pointer;border:1px solid var(--grn);background:transparent;color:var(--grn);transition:all .2s; }
  .price-cta:hover { background:var(--grn);color:var(--bg); }
  .price-cta.solid { background:var(--grn);color:var(--bg); }
  .price-cta.solid:hover { background:#00ff60; }
  .price-app-note { display:flex;align-items:center;gap:8px;justify-content:center;margin-top:32px;font-family:var(--font-mono);font-size:10px;color:#9cd4ad;letter-spacing:.06em; }

  /* ── SCREENSHOTS ── */
  .ss-section { position:relative;z-index:1;padding:80px 48px;background:var(--surf);border-top:1px solid var(--brd);border-bottom:1px solid var(--brd); }
  .ss-tabs { display:flex;gap:4px;margin-bottom:24px;border-bottom:1px solid var(--brd);flex-wrap:wrap; }
  .ss-tab { padding:10px 20px;border:none;background:transparent;cursor:pointer;font-family:var(--font-mono);font-size:12px;letter-spacing:.08em;color:var(--mut-lt);border-bottom:2px solid transparent;transition:all .2s;margin-bottom:-1px; }
  .ss-tab:hover { color:var(--txt); }
  .ss-tab.on { color:var(--grn);border-bottom-color:var(--grn); }
  .ss-frame { border-radius:var(--r-md);overflow:hidden;border:1px solid var(--brd2);box-shadow:0 20px 60px rgba(0,0,0,.6); }
  .ss-frame img { width:100%;display:block;background:var(--bg); }
  .ss-bar { background:var(--bg);border-bottom:1px solid var(--brd);padding:10px 16px;display:flex;align-items:center;gap:12px; }
  .ss-dots { display:flex;gap:5px; }
  .ss-dot { width:9px;height:9px;border-radius:50%; }
  .ss-url { flex:1;background:var(--surf);border:1px solid var(--brd);border-radius:4px;padding:4px 10px;font-family:var(--font-mono);font-size:9px;color:#9cd4ad;max-width:320px; }
  .ss-badge { font-family:var(--font-mono);font-size:8px;letter-spacing:.1em;padding:3px 8px;border-radius:3px;background:var(--orgd);color:var(--org);border:1px solid var(--orgd); }

  /* ── TIMELINE ── */
  .tl { position:relative; }
  .tl::before { content:'';position:absolute;left:120px;top:0;bottom:0;width:1px;background:linear-gradient(var(--brd),var(--brd2),var(--brd)); }
  .tl-item { display:grid;grid-template-columns:120px 1fr;gap:32px;padding:28px 0;border-bottom:1px solid var(--brd);position:relative; }
  .tl-item:last-child { border-bottom:none; }
  .tl-yr { font-family:var(--font-head);font-size:14px;font-weight:800;color:#fff;padding-top:2px;padding-right:16px;text-align:right;letter-spacing:.05em; }
  .done .tl-yr { color:var(--grn); }
  .upcoming .tl-yr { color:var(--org); }
  .tl-dot { position:absolute;left:112px;top:32px;width:17px;height:17px;border-radius:50%;border:2px solid var(--brd2);background:var(--bg);z-index:1; }
  .done .tl-dot { background:var(--grn);border-color:var(--grn);box-shadow:0 0 12px rgba(0,224,80,.4); }
  .upcoming .tl-dot { background:var(--org);border-color:var(--org);box-shadow:0 0 12px rgba(255,140,0,.3); }
  .tl-tag { font-family:var(--font-mono);font-size:9px;letter-spacing:.12em;padding:3px 8px;border-radius:3px;display:inline-block;margin-bottom:8px; }
  .tl-ttl { font-size:15px;font-weight:500;margin-bottom:4px; }
  .tl-desc { font-size:13px;color:#a0c8b0;font-weight:300;line-height:1.6; }

  /* ── FOUNDER ── */
  .founder-card { background:var(--surf);border:1px solid var(--brd);border-radius:var(--r-lg);padding:60px;display:grid;grid-template-columns:auto 1fr;gap:48px;align-items:center; }
  .founder-photo { width:200px;height:200px;border-radius:50%;border:3px solid rgba(0,224,80,.5);overflow:hidden;flex-shrink:0;box-shadow:0 0 48px rgba(0,224,80,.18),0 0 0 6px rgba(0,224,80,.07); }
  .founder-photo img { width:100%;height:100%;object-fit:cover;object-position:center top;display:block; }
  .f-quote { font-size:19px;font-weight:300;font-style:italic;line-height:1.75;color:#a0c8b0;margin-bottom:12px; }
  .f-source { font-family:var(--font-mono);font-size:9px;color:var(--mut);letter-spacing:.06em;margin-bottom:16px; }
  .f-name { font-family:var(--font-head);font-size:15px;font-weight:700; }
  .f-role { font-family:var(--font-mono);font-size:11px;color:var(--mut);margin-top:4px; }
  .f-email { font-family:var(--font-mono);font-size:11px;color:var(--grn);margin-top:8px;display:inline-block; }

  /* ── CTA ── */
  .cta-sect { text-align:center;padding:120px 48px;background:radial-gradient(ellipse at 50% 0,rgba(0,224,80,.06),transparent 60%);border-top:1px solid var(--brd);position:relative;z-index:1; }
  .cta-h2 { font-family:var(--font-head);font-size:clamp(30px,4vw,54px);font-weight:900;line-height:1.1;letter-spacing:-.02em;margin-bottom:16px; }
  .cta-sub { font-size:17px;color:#a0c8b0;max-width:480px;margin:0 auto 40px;font-weight:300;line-height:1.7; }
  .cta-form { display:flex;gap:10px;max-width:420px;margin:0 auto; }
  .cta-inp { flex:1;padding:14px 18px;border-radius:8px;background:var(--surf);border:1px solid var(--brd2);color:var(--txt);font-family:var(--font-body);font-size:14px;outline:none;transition:border-color .2s; }
  .cta-inp:focus { border-color:var(--grn); }
  .cta-inp::placeholder { color:var(--mut); }
  .cta-note { font-family:var(--font-mono);font-size:10px;color:#9cd4ad;margin-top:14px;letter-spacing:.06em; }

  /* ── MODAL ── */
  .modal-bg { position:fixed;inset:0;background:rgba(0,0,0,.8);backdrop-filter:blur(8px);z-index:2000;display:flex;align-items:center;justify-content:center;padding:1rem; }
  .modal { background:var(--surf2);border:1px solid var(--grnd);border-radius:var(--r-lg);padding:2.5rem;width:100%;max-width:480px;position:relative; }
  .modal-close { position:absolute;top:1.25rem;right:1.25rem;background:none;border:none;color:var(--mut);font-size:20px;cursor:pointer; }
  .modal label { font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;color:#9cd4ad;display:block;margin-bottom:6px; }
  .modal input { width:100%;background:var(--bg);border:1px solid var(--brd2);border-radius:6px;padding:10px 14px;color:var(--txt);font-family:var(--font-body);font-size:14px;outline:none;transition:border-color .2s; }
  .modal input:focus { border-color:var(--grn); }
  .modal-success { text-align:center;padding:2rem 0; }
  .modal-check { width:56px;height:56px;border-radius:50%;background:var(--grnd);border:1px solid var(--grn);display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;font-size:24px; }

  /* ── FOOTER ── */
  footer { border-top:1px solid var(--brd);background:var(--surf);padding:64px 48px 32px;position:relative;z-index:1; }
  .footer-top { display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;margin-bottom:48px; }
  .footer-brand-desc { font-size:14px;line-height:1.7;color:#a0c8b0;margin:16px 0 24px;max-width:260px;font-weight:300; }
  .footer-network { display:flex;align-items:center;gap:8px;font-family:var(--font-mono);font-size:10px;color:#a0c8b0;letter-spacing:.08em; }
  .footer-net-dot { width:6px;height:6px;border-radius:50%;background:var(--grn);box-shadow:0 0 6px var(--grn);animation:pip 2s infinite;flex-shrink:0; }
  @keyframes pip { 0%,100%{opacity:1;}50%{opacity:.5;} }
  .footer-col-head { font-family:var(--font-mono);font-size:11px;letter-spacing:.1em;color:#a0c8b0;margin-bottom:16px; }
  .footer-col-links { list-style:none;display:flex;flex-direction:column;gap:10px; }
  .footer-col-links a { font-size:14px;color:#9cd4ad;transition:color .2s;font-weight:300; }
  .footer-col-links a:hover { color:var(--grn); }
  .footer-bottom { display:flex;justify-content:space-between;align-items:center;padding-top:24px;border-top:1px solid var(--brd);font-family:var(--font-mono);font-size:10px;color:#9cd4ad;letter-spacing:.04em;flex-wrap:wrap;gap:12px; }
  .footer-socials { display:flex;gap:20px; }
  .footer-socials a { color:#9cd4ad;letter-spacing:.08em;transition:color .2s; }
  .footer-socials a:hover { color:var(--grn); }

  /* ── RESPONSIVE ── */
  @media(max-width:1024px){
    .nav { padding:0 24px; }
    .nav-links,.nav-status { display:none; }
    .nav-hamburger { display:flex; }
    .section,.ss-section { padding:80px 24px; }
    .hero { padding:60px 24px 40px; }
    .h1 { font-size:clamp(32px,7vw,52px); }
    .stats-row { grid-template-columns:repeat(2,1fr); }
    .bento .c4 { grid-column:span 6; }
    .bento .c8 { grid-column:span 12; }
    .bento .c6 { grid-column:span 12; }
    .how-grid { grid-template-columns:repeat(2,1fr);gap:40px; }
    .how-grid::before { display:none; }
    .pricing-grid { grid-template-columns:repeat(2,1fr); }
    .founder-card { grid-template-columns:1fr;text-align:center; }
    .founder-photo { margin:0 auto; }
    .gap-card { grid-template-columns:1fr;gap:20px; }
    .gap-num { display:none; }
    .footer-top { grid-template-columns:1fr 1fr; }
    .cta-sect { padding:80px 24px; }
    footer { padding:48px 24px 24px; }
    .feat-tab-btn { padding:10px 16px; }
  }
  @media(max-width:640px){
    .stats-row { grid-template-columns:1fr 1fr; }
    .bento .c4,.bento .c6,.bento .c8 { grid-column:span 12; }
    .h1 { font-size:32px; }
    .actions { flex-direction:column;width:100%;max-width:300px;margin:0 auto; }
    .btn-p,.btn-g { width:100%;text-align:center; }
    .how-grid { grid-template-columns:1fr; }
    .pricing-grid { grid-template-columns:1fr; }
    .cta-form { flex-direction:column; }
    .footer-top { grid-template-columns:1fr; }
    .footer-bottom { flex-direction:column;text-align:center; }
    .ss-tabs { flex-wrap:wrap; }
    .founder-photo { width:150px;height:150px; }
    .feat-tabs { flex-wrap:wrap; }
  }

  /* ── HOVER LIFT (stat cards) ── */
  .s-cell { transition: transform .25s ease, background .25s ease; cursor: default; }
  .s-cell:hover { transform: translateY(-5px); background: var(--surf2); }

  /* ── NAV ACTIVE STATE ── */
  .nav-links a.active { color: var(--grn); }
  .mobile-nav a.active { color: var(--grn); }

  /* ── PAGE HERO (sub-pages) ── */
  .page-hero { position:relative;z-index:1;padding:120px 48px 60px;text-align:center; }
  .page-h1 { font-family:var(--font-head);font-size:clamp(32px,4.5vw,56px);font-weight:900;line-height:1.1;letter-spacing:-.02em;max-width:760px;margin:0 auto 18px; }
  .page-sub { font-size:16px;color:#a0c8b0;max-width:560px;margin:0 auto;font-weight:300;line-height:1.7; }

  /* ── SOLUTIONS ── */
  .solutions-grid { display:grid;grid-template-columns:repeat(2,1fr);gap:16px; }
  .solution-card { background:var(--surf);border:1px solid var(--brd);border-radius:var(--r-lg);padding:32px;transition:border-color .3s,transform .2s;display:flex;flex-direction:column; }
  .solution-card:hover { border-color:var(--grnd);transform:translateY(-3px); }
  .solution-icon { font-size:30px;margin-bottom:14px;display:block; }
  .solution-title { font-family:var(--font-head);font-size:18px;font-weight:700;margin-bottom:8px;line-height:1.35; }
  .solution-audience { font-family:var(--font-mono);font-size:10px;color:var(--mut-lt);letter-spacing:.1em;margin-bottom:14px; }
  .solution-pain { font-size:13.5px;color:#a0c8b0;line-height:1.75;margin-bottom:16px;font-weight:300; }
  .solution-fits { display:flex;flex-direction:column;gap:8px;margin-bottom:22px;flex:1; }
  .solution-fit { display:flex;align-items:baseline;gap:10px;font-size:13px;color:#a0c8b0;line-height:1.5; }
  .solution-fit::before { content:'✓';color:var(--grn);font-family:var(--font-mono);font-size:11px;flex-shrink:0; }
  .solution-cta { align-self:flex-start;padding:10px 24px;border-radius:8px;border:1px solid var(--grn);color:var(--grn);font-family:var(--font-mono);font-size:11px;font-weight:700;letter-spacing:.1em;cursor:pointer;background:transparent;transition:all .2s; }
  .solution-cta:hover { background:var(--grn);color:var(--bg); }

  /* ── INDUSTRIES ── */
  .industries-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:14px; }
  .industry-card { background:var(--surf);border:1px solid var(--brd);border-radius:14px;padding:26px;transition:border-color .3s,transform .2s; }
  .industry-card:hover { border-color:var(--grnd);transform:translateY(-3px); }
  .industry-icon { font-size:26px;margin-bottom:14px;display:block; }
  .industry-title { font-family:var(--font-head);font-size:15px;font-weight:700;margin-bottom:8px; }
  .industry-desc { font-size:13px;color:#a0c8b0;line-height:1.7;font-weight:300;margin-bottom:14px; }
  .industry-tags { display:flex;flex-wrap:wrap;gap:6px; }
  .industry-tag { font-family:var(--font-mono);font-size:9px;padding:4px 9px;border-radius:4px;background:var(--bg);border:1px solid var(--brd2);color:var(--mut-lt); }

  @media(max-width:1024px){
    .industries-grid { grid-template-columns:repeat(2,1fr); }
  }
  @media(max-width:768px){
    .solutions-grid { grid-template-columns:1fr; }
  }
  @media(max-width:640px){
    .industries-grid { grid-template-columns:1fr; }
    .page-hero { padding:100px 24px 40px; }
  }
`;