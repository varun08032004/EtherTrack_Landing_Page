import { useState, useEffect, useRef } from "react";
import founderImg from "./assets/founder.png";
import logoImg from "./assets/logo.png";
import dashboardImg from "./assets/dashboard.png";
import portfolioImg from "./assets/portfolio.png";
import marketImg from "./assets/market.png";
import carbonIntelligenceImg from "./assets/carbonintelligence.png";
import walletImg from "./assets/wallet.png";

const GLOBAL_CSS = `
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
    --mut:  #4a7a5a;
    --mut-lt: #7cb393;
    --mut2: #2a4a35;
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
    font-family: var(--font-mono); font-size: 11px; letter-spacing: .1em; color: var(--mut);
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
  .nav-links a { font-family:var(--font-mono);font-size:12px;letter-spacing:.08em;color:var(--mut-lt);transition:color .2s; }
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
  .mobile-nav a { font-family:var(--font-mono);font-size:13px;letter-spacing:.14em;color:var(--mut); }
  .mobile-nav a:hover { color:var(--grn); }
  .mobile-close { position:absolute;top:20px;right:20px;font-family:var(--font-mono);font-size:11px;color:var(--mut);padding:8px 14px;border:1px solid var(--brd2);border-radius:6px;cursor:pointer;background:transparent; }

  .hero { position:relative;z-index:1;min-height:88vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 48px 60px;text-align:center;overflow:hidden; }
  .eyebrow { font-family:var(--font-mono);font-size:10px;letter-spacing:.25em;color:var(--mut);margin-bottom:20px;display:flex;align-items:center;justify-content:center;gap:10px; }
  .eyebrow::before,.eyebrow::after { content:'';width:40px;height:1px;background:var(--mut2); }
  .hero-verb-row { font-family:var(--font-mono);font-size:11px;letter-spacing:.2em;color:var(--grn);margin-bottom:16px; }
  .h1 { font-family:var(--font-head);font-size:clamp(36px,5.5vw,72px);font-weight:900;line-height:1.05;letter-spacing:-.02em;max-width:960px;margin:0 auto 24px; }
  .h1 .g { color:var(--grn); }
  .h1 .o { color:var(--org); }
  .hero-sub { font-size:18px;color:#7aaa8a;max-width:560px;margin:0 auto 36px;font-weight:300;line-height:1.7; }
  .actions { display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap; }
  .btn-p { padding:14px 32px;border-radius:8px;background:var(--grn);color:var(--bg);font-family:var(--font-mono);font-size:12px;font-weight:700;letter-spacing:.12em;border:none;cursor:pointer;transition:all .2s;display:inline-block; }
  .btn-p:hover { background:#00ff60;transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,224,80,.3); }
  .btn-g { padding:14px 32px;border-radius:8px;background:transparent;border:1px solid var(--grn);color:var(--grn);font-family:var(--font-mono);font-size:12px;letter-spacing:.12em;cursor:pointer;transition:all .2s;display:inline-block; }
  .btn-g:hover { background:var(--grn);color:var(--bg); }
  .hero-note { margin-top:16px;font-family:var(--font-mono);font-size:9px;letter-spacing:.1em;color:var(--mut); }

  .mq-wrap { position:relative;z-index:1;border-top:1px solid var(--brd);border-bottom:1px solid var(--brd);background:var(--surf);overflow:hidden;padding:14px 0; }
  .mq-track { display:flex;gap:60px;white-space:nowrap;animation:marquee 30s linear infinite; }
  .mq-item { display:flex;align-items:center;gap:10px;font-family:var(--font-mono);font-size:11px;color:var(--mut);letter-spacing:.08em;flex-shrink:0; }
  @keyframes marquee { 0%{transform:translateX(0);}100%{transform:translateX(-50%);} }

  .section { position:relative;z-index:1;padding:100px 48px; }
  .s-label { font-family:var(--font-mono);font-size:11px;letter-spacing:.22em;color:var(--mut-lt);margin-bottom:16px;display:flex;align-items:center;gap:10px; }
  .s-label::before { content:'';width:24px;height:1px;background:var(--grn); }
  .s-h2 { font-family:var(--font-head);font-size:clamp(26px,3.5vw,46px);font-weight:900;line-height:1.1;letter-spacing:-.02em;margin-bottom:16px; }
  .s-sub { font-size:17px;color:#7aaa8a;max-width:560px;font-weight:300;line-height:1.7;margin-bottom:60px; }

  .stats-row { display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--brd);border:1px solid var(--brd);border-radius:var(--r-md);overflow:hidden;margin-bottom:80px; }
  .s-cell { background:var(--surf);padding:32px 28px;position:relative;overflow:hidden; }
  .s-cell::before { content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--brd2); }
  .s-cell:nth-child(1)::before { background:var(--grn); }
  .s-cell:nth-child(2)::before { background:var(--org); }
  .s-cell:nth-child(3)::before { background:var(--blu); }
  .s-cell:nth-child(4)::before { background:var(--vio); }
  .s-num { font-family:var(--font-head);font-size:36px;font-weight:900;color:var(--grn);line-height:1;margin-bottom:6px;font-variant-numeric:tabular-nums; }
  .s-lbl { font-family:var(--font-mono);font-size:11px;color:var(--mut);letter-spacing:.1em; }
  .s-src { font-family:var(--font-mono);font-size:8px;color:var(--mut2);letter-spacing:.06em;margin-top:5px; }

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
  .g-desc { font-size:13.5px;color:#9abba6;line-height:1.75;font-weight:300; }
  .gap-facts { margin-top:16px;display:flex;flex-direction:column;gap:7px; }
  .gap-fact { display:flex;align-items:baseline;gap:10px;font-size:13px;color:#7aaa8a;line-height:1.5; }
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
  .b-desc { font-size:13px;color:#7aaa8a;line-height:1.7;font-weight:300; }
  .b-tag { margin-top:14px;font-family:var(--font-mono);font-size:9px;letter-spacing:.1em;color:var(--grn); }
  .c4{grid-column:span 4;}.c6{grid-column:span 6;}.c8{grid-column:span 8;}.c12{grid-column:span 12;}
  .kyc-steps { margin-top:16px;display:flex;flex-direction:column;gap:6px; }
  .kyc-step { display:flex;align-items:center;gap:10px;padding:8px 12px;background:var(--bg);border-radius:6px;border:1px solid var(--brd);font-family:var(--font-mono);font-size:9px;color:var(--mut); }
  .ks-dot { width:6px;height:6px;border-radius:50%;flex-shrink:0; }

  /* ── HOW IT WORKS ── */
  .how-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:0;position:relative; }
  .how-grid::before { content:'';position:absolute;top:48px;left:12.5%;right:12.5%;height:1px;background:linear-gradient(90deg,transparent,var(--brd2),var(--brd2),transparent);z-index:0; }
  .how-step { padding:0 24px;text-align:center;position:relative;z-index:1; }
  .how-n { width:96px;height:96px;border-radius:50%;background:var(--surf);border:1px solid var(--brd2);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-family:var(--font-head);font-size:28px;font-weight:900;transition:all .3s; }
  .how-step:hover .how-n { border-color:var(--grn);color:var(--grn);box-shadow:0 0 40px rgba(0,224,80,.15); }
  .how-ttl { font-family:var(--font-head);font-size:14px;font-weight:700;margin-bottom:8px; }
  .how-desc { font-size:13px;color:#7aaa8a;font-weight:300;line-height:1.6; }

  /* ── PRICING ── */
  .pricing-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px; }
  .price-card { background:var(--surf);border:1px solid var(--brd);border-radius:var(--r-lg);padding:28px 26px;display:flex;flex-direction:column;position:relative;transition:border-color .3s,transform .2s; }
  .price-card:hover { transform:translateY(-3px); }
  .price-card.popular { border-color:var(--grnd);background:linear-gradient(160deg,var(--surf2),var(--surf)); }
  .price-badge { position:absolute;top:-11px;right:24px;font-family:var(--font-mono);font-size:9px;font-weight:700;letter-spacing:.1em;padding:4px 10px;border-radius:20px;background:var(--grn);color:var(--bg); }
  .price-badge.org { background:var(--org); }
  .price-tier { font-family:var(--font-mono);font-size:9px;letter-spacing:.18em;color:var(--mut);margin-bottom:14px; }
  .price-name { font-family:var(--font-head);font-size:22px;font-weight:900;margin-bottom:4px; }
  .price-tag { font-size:12px;color:var(--mut);font-weight:300;margin-bottom:14px; }
  .price-desc { font-size:13px;color:#7aaa8a;line-height:1.6;font-weight:300;margin-bottom:22px;min-height:40px; }
  .price-amt-row { display:flex;align-items:baseline;gap:6px;margin-bottom:4px; }
  .price-amt { font-family:var(--font-head);font-size:30px;font-weight:900; }
  .price-per { font-size:12px;color:var(--mut);font-weight:300; }
  .price-gst { font-family:var(--font-mono);font-size:9px;color:var(--mut);margin-bottom:6px; }
  .price-save { font-family:var(--font-mono);font-size:10px;color:var(--grn);margin-bottom:14px; }
  .price-pills { display:flex;gap:8px;margin-bottom:22px;flex-wrap:wrap; }
  .price-pill { font-family:var(--font-mono);font-size:9px;padding:5px 11px;border-radius:20px;border:1px solid var(--brd2);color:var(--mut);display:flex;align-items:center;gap:5px; }
  .price-pill-dot { width:5px;height:5px;border-radius:50%; }
  .price-divider { height:1px;background:var(--brd);margin-bottom:18px; }
  .price-feats { display:flex;flex-direction:column;gap:9px;flex:1;margin-bottom:22px; }
  .price-feat { display:flex;align-items:flex-start;gap:9px;font-size:12.5px;line-height:1.5; }
  .price-feat.locked { color:var(--mut2); }
  .price-feat.unlocked { color:#c8e6d2; }
  .price-feat-icon { flex-shrink:0;font-size:10px;margin-top:2px; }
  .price-feat.locked .price-feat-icon { color:var(--mut2); }
  .price-feat.unlocked .price-feat-icon { color:var(--grn); }
  .price-cta { padding:13px;border-radius:8px;text-align:center;font-family:var(--font-mono);font-size:11px;font-weight:700;letter-spacing:.1em;cursor:pointer;border:1px solid var(--grn);background:transparent;color:var(--grn);transition:all .2s; }
  .price-cta:hover { background:var(--grn);color:var(--bg); }
  .price-cta.solid { background:var(--grn);color:var(--bg); }
  .price-cta.solid:hover { background:#00ff60; }
  .price-app-note { display:flex;align-items:center;gap:8px;justify-content:center;margin-top:32px;font-family:var(--font-mono);font-size:10px;color:var(--mut);letter-spacing:.06em; }

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
  .ss-url { flex:1;background:var(--surf);border:1px solid var(--brd);border-radius:4px;padding:4px 10px;font-family:var(--font-mono);font-size:9px;color:var(--mut);max-width:320px; }
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
  .tl-desc { font-size:13px;color:#7aaa8a;font-weight:300;line-height:1.6; }

  /* ── FOUNDER ── */
  .founder-card { background:var(--surf);border:1px solid var(--brd);border-radius:var(--r-lg);padding:60px;display:grid;grid-template-columns:auto 1fr;gap:48px;align-items:center; }
  .founder-photo { width:200px;height:200px;border-radius:50%;border:3px solid rgba(0,224,80,.5);overflow:hidden;flex-shrink:0;box-shadow:0 0 48px rgba(0,224,80,.18),0 0 0 6px rgba(0,224,80,.07); }
  .founder-photo img { width:100%;height:100%;object-fit:cover;object-position:center top;display:block; }
  .f-quote { font-size:19px;font-weight:300;font-style:italic;line-height:1.75;color:#9abba7;margin-bottom:12px; }
  .f-source { font-family:var(--font-mono);font-size:9px;color:var(--mut);letter-spacing:.06em;margin-bottom:16px; }
  .f-name { font-family:var(--font-head);font-size:15px;font-weight:700; }
  .f-role { font-family:var(--font-mono);font-size:11px;color:var(--mut);margin-top:4px; }
  .f-email { font-family:var(--font-mono);font-size:11px;color:var(--grn);margin-top:8px;display:inline-block; }

  /* ── CTA ── */
  .cta-sect { text-align:center;padding:120px 48px;background:radial-gradient(ellipse at 50% 0,rgba(0,224,80,.06),transparent 60%);border-top:1px solid var(--brd);position:relative;z-index:1; }
  .cta-h2 { font-family:var(--font-head);font-size:clamp(30px,4vw,54px);font-weight:900;line-height:1.1;letter-spacing:-.02em;margin-bottom:16px; }
  .cta-sub { font-size:17px;color:#7aaa8a;max-width:480px;margin:0 auto 40px;font-weight:300;line-height:1.7; }
  .cta-form { display:flex;gap:10px;max-width:420px;margin:0 auto; }
  .cta-inp { flex:1;padding:14px 18px;border-radius:8px;background:var(--surf);border:1px solid var(--brd2);color:var(--txt);font-family:var(--font-body);font-size:14px;outline:none;transition:border-color .2s; }
  .cta-inp:focus { border-color:var(--grn); }
  .cta-inp::placeholder { color:var(--mut); }
  .cta-note { font-family:var(--font-mono);font-size:10px;color:var(--mut);margin-top:14px;letter-spacing:.06em; }

  /* ── MODAL ── */
  .modal-bg { position:fixed;inset:0;background:rgba(0,0,0,.8);backdrop-filter:blur(8px);z-index:2000;display:flex;align-items:center;justify-content:center;padding:1rem; }
  .modal { background:var(--surf2);border:1px solid var(--grnd);border-radius:var(--r-lg);padding:2.5rem;width:100%;max-width:480px;position:relative; }
  .modal-close { position:absolute;top:1.25rem;right:1.25rem;background:none;border:none;color:var(--mut);font-size:20px;cursor:pointer; }
  .modal label { font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;color:var(--mut);display:block;margin-bottom:6px; }
  .modal input { width:100%;background:var(--bg);border:1px solid var(--brd2);border-radius:6px;padding:10px 14px;color:var(--txt);font-family:var(--font-body);font-size:14px;outline:none;transition:border-color .2s; }
  .modal input:focus { border-color:var(--grn); }
  .modal-success { text-align:center;padding:2rem 0; }
  .modal-check { width:56px;height:56px;border-radius:50%;background:var(--grnd);border:1px solid var(--grn);display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;font-size:24px; }

  /* ── FOOTER ── */
  footer { border-top:1px solid var(--brd);background:var(--surf);padding:64px 48px 32px;position:relative;z-index:1; }
  .footer-top { display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;margin-bottom:48px; }
  .footer-brand-desc { font-size:14px;line-height:1.7;color:var(--mut);margin:16px 0 24px;max-width:260px;font-weight:300; }
  .footer-network { display:flex;align-items:center;gap:8px;font-family:var(--font-mono);font-size:10px;color:var(--mut);letter-spacing:.08em; }
  .footer-net-dot { width:6px;height:6px;border-radius:50%;background:var(--grn);box-shadow:0 0 6px var(--grn);animation:pip 2s infinite;flex-shrink:0; }
  @keyframes pip { 0%,100%{opacity:1;}50%{opacity:.5;} }
  .footer-col-head { font-family:var(--font-mono);font-size:11px;letter-spacing:.1em;color:var(--mut-lt);margin-bottom:16px; }
  .footer-col-links { list-style:none;display:flex;flex-direction:column;gap:10px; }
  .footer-col-links a { font-size:14px;color:rgba(232,245,232,.4);transition:color .2s;font-weight:300; }
  .footer-col-links a:hover { color:var(--grn); }
  .footer-bottom { display:flex;justify-content:space-between;align-items:center;padding-top:24px;border-top:1px solid var(--brd);font-family:var(--font-mono);font-size:10px;color:var(--mut);letter-spacing:.04em;flex-wrap:wrap;gap:12px; }
  .footer-socials { display:flex;gap:20px; }
  .footer-socials a { color:var(--mut);letter-spacing:.08em;transition:color .2s; }
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
`;

/* ─── DATA ─────────────────────────────────────────────────────── */

// FIX: fee is 0.5%, not 1%
const STATS = [
  { num: "70+",  lbl: "EMISSION FACTORS · DEFRA 2024 / CEA V20.0", src: "All 15 GHG Protocol Scope 3 categories covered", color: "var(--grn)" },
  { num: "490",  lbl: "CCTS OBLIGATED ENTITIES FROM FY2026",        src: "Source: BEE / MoP notification, Jan 2026",        color: "var(--org)" },
  { num: "0.5%", lbl: "PLATFORM FEE · FIXED IN SMART CONTRACT",     src: "Hardcoded in Marketplace.sol · publicly verifiable", color: "var(--blu)" },
  { num: "4",    lbl: "REGULATORY PDF EXPORTS · ONE CLICK EACH",    src: "BRSR Core · CDP Climate · TCFD · GHG Protocol",  color: "var(--vio)" },
];

// Redesigned: replaced heavy code proof blocks with clean facts array.
// Fixed: removed absolute "No other Indian platform" claims.
const GAPS = [
  {
    tabLabel: "PRICE DISCOVERY",
    problem: "No transparent price discovery",
    problemDesc: "Carbon credit prices in India are typically negotiated bilaterally via email — two buyers can pay very different amounts for identical credits. No public order book exists anywhere in India — only indicative prices set by intermediaries.",
    tagP: "tp", tagS: "ts",
    solution: "Live double-sided on-chain order book",
    solutionDesc: "Every ask, every bid, the spread, and market depth visible to all simultaneously. Price is set by market forces — not a broker. Every trade permanently on Etherscan.",
    facts: ["Every ask and bid visible to all simultaneously", "Price set by market forces, not a broker", "Every trade permanently on Etherscan"],
    tagLabel: "ETHERTRACK SOLUTION",
  },
  {
    tabLabel: "INTEGRATED WORKFLOW",
    problem: "Emissions and credits live on separate platforms",
    problemDesc: "Companies track emissions in Excel. Buy credits from a broker. Generate ESG reports with a consultant. The data lives in three separate places and must be manually assembled. Manual errors, slow reporting, broken accountability.",
    tagP: "tp", tagS: "ts-star",
    solution: "The complete closed loop — one session",
    solutionDesc: "Log emissions → credit gap auto-calculated → buy on the same platform → retire on-chain → BRSR PDF generates. We have not identified a major competitor offering this integrated workflow for Indian compliance requirements.",
    facts: ["Log, buy, retire, and report without switching tools", "70+ factors · DEFRA 2024 · CEA V20.0 (0.727 tCO₂/MWh)", "All values sync in real time across one platform"],
    tagLabel: "OUR CORE DIFFERENTIATOR",
  },
  {
    tabLabel: "DOUBLE COUNTING",
    problem: "Retirement records can be edited — double counting is possible",
    problemDesc: "Every existing Indian platform stores retirement records in a private, editable database. No platform provides a public URL where anyone can verify a retirement without contacting the company.",
    tagP: "tp", tagS: "ts",
    solution: "Irreversible on-chain burn · public Etherscan proof",
    solutionDesc: "Token sent to 0x000...000 — permanently destroyed. ISO 14064-3 formatted certificate with QR code resolves to the permanent Ethereum record. Any auditor verifies in seconds — no login required.",
    facts: ["Token burned to 0x000...000 — unrecoverable by anyone", "ISO 14064-3 certificate with public Etherscan link", "TX hash auto-embedded in BRSR, CDP, and TCFD PDFs"],
    tagLabel: "ETHERTRACK SOLUTION",
  },
  {
    tabLabel: "CCTS TOOLING",
    // FIX: removed "zero CCTS-specific tooling" absolute claim
    problem: "No CCTS-native trading infrastructure in India",
    problemDesc: "490 obligated CCTS entities from FY2026. Most existing exchanges currently have limited CCTS-specific tooling — no BEE methodology tracking, no GEI calculation, no CCC portfolio management built in.",
    tagP: "tp", tagS: "ts",
    solution: "CCTS-ready from day one",
    solutionDesc: "₹600–₹1,200 price band enforced at smart contract level. All 8 BEE-approved methodologies. CCC vs VCU credit types distinguished. GSTIN and CIN linked on-chain to every trade.",
    facts: ["₹600–₹1,200 price band enforced in smart contract", "GEI calculation for all 9 gazetted CCTS sectors", "GSTIN + CIN linked on-chain to every trade record"],
    tagLabel: "ETHERTRACK SOLUTION",
  },
  {
    tabLabel: "MARKET ACCESS",
    problem: "Small projects are locked out of the market",
    problemDesc: "Brokers require 10,000+ credit minimums. A rural solar plant with 200 credits has no viable market access. Thousands of Indian climate projects generate zero revenue from their verified credits.",
    tagP: "tp", tagS: "ts",
    solution: "Hybrid AMM — no minimum order size",
    solutionDesc: "Orders ≤100 credits execute instantly against the AMM pool — no counterparty needed, 24/7. Orders >100 auto-route to the order book. A 50-credit project finds the same liquidity as a 50,000-credit one.",
    facts: ["Orders ≤100 credits execute instantly via AMM, 24/7", "Orders >100 auto-route to the live order book", "No minimum order size, no broker required"],
    tagLabel: "ETHERTRACK SOLUTION",
  },
  {
    tabLabel: "REPORTING COSTS",
    problem: "ESG reporting costs ₹5–15L per year in consultant fees",
    problemDesc: "Separate consultants for CDP, BRSR, GRI 305, and TCFD. Data lives in incompatible spreadsheets. Most Indian SMEs skip disclosure entirely because the cost and complexity are prohibitive.",
    tagP: "tp", tagS: "ts",
    solution: "Four regulatory PDFs — one click each",
    solutionDesc: "BRSR Core (SEBI format), CDP Climate, TCFD, and GHG Protocol (ISO 14064-1) generated automatically from your emission logs. CEA V20.0 factors embedded. Blockchain TX hashes included. No assembly required.",
    facts: ["BRSR Core · CDP Climate · TCFD · GHG Protocol", "CEA V20.0 Dec 2024 · DEFRA 2024 · IPCC AR6 factors", "Auditor-ready · Dual Scope 2 (location + market)"],
    tagLabel: "ETHERTRACK SOLUTION",
  },
];

const HOW = [
  { n: "01", title: "Register & KYC", desc: "4-step KYC with Aadhaar/PAN. Documents stored on IPFS. Identity cryptographically hashed. Trading access granted within 1–2 business days after admin approval." },
  { n: "02", title: "Log Your Emissions", desc: "Enter Scope 1, 2, and 3 activities manually or bulk-import via CSV. Auto-calculated using DEFRA 2024 and CEA V20.0 2024 factors. Dashboard shows exactly how many credits you need." },
  { n: "03", title: "Buy or List Credits", desc: "Browse the live order book, place market or limit orders, or use the AMM for instant execution. Pay in INR via UPI — no crypto wallet required for payment." },
  { n: "04", title: "Retire & Report", desc: "Retire on-chain — permanently burned on Ethereum. Download BRSR Core, CDP, or TCFD PDF. Certificate QR code verifiable by anyone on Etherscan, no login needed." },
];

const TABS = [
  { id: "dashboard",   label: "Dashboard",          url: "app.ethertrack.in/dashboard",          badge: "TESTNET", imgSrc: dashboardImg },
  { id: "portfolio",   label: "Portfolio",          url: "app.ethertrack.in/portfolio",          badge: "TESTNET", imgSrc: portfolioImg },
  { id: "market",      label: "Market",             url: "app.ethertrack.in/exchange",           badge: "TESTNET", imgSrc: marketImg },
  { id: "carbonintel", label: "Carbon Intelligence",url: "app.ethertrack.in/carbon-intelligence", badge: "TESTNET", imgSrc: carbonIntelligenceImg },
  { id: "wallet",      label: "Wallet",             url: "app.ethertrack.in/wallet",             badge: "TESTNET", imgSrc: walletImg },
];

// Pricing — mirrors the in-app billing tiers.
const PRICING = [
  {
    tier: "FREE", name: "Free", tag: "Start exploring",
    desc: "Individuals, students, companies just exploring",
    price: "₹0", period: "forever", gst: null, save: null,
    fee: "1.5%", seats: "1 seat", popular: false,
    locked: ["Portfolio management", "List & sell credits", "Credit retirement", "Portfolio export", "Emission tracking", "Compliance dashboard", "Team management"],
    unlocked: ["Buy credits from marketplace", "Browse listings & real-time prices", "On-chain transaction receipt", "Basic carbon footprint calculator", "Wallet & trading history", "Email support"],
    cta: "Get Started", solid: false,
  },
  {
    tier: "STARTER", name: "Starter", tag: "For active traders",
    desc: "Freelancers, ESG consultants, small NGOs, active traders",
    price: "₹14,990", period: "/yr", gst: "+ 18% GST", save: "Save ₹2,998.00/yr vs monthly",
    fee: "1%", seats: "3 seats", popular: false,
    locked: ["Emission tracking (Growth+)", "Compliance dashboard (Corporate)", "Team management (Corporate)"],
    unlocked: ["Everything in Free", "Full portfolio management", "List & sell credits on marketplace", "Credit retirement", "Portfolio export (CSV)", "Blockchain audit trail PDF", "3 seats", "Priority email support"],
    cta: "Get Started", solid: false,
  },
  {
    tier: "GROWTH", name: "Growth", tag: "Most popular",
    desc: "MSMEs, growing businesses, serious ESG teams",
    price: "₹79,990", period: "/yr", gst: "+ 18% GST", save: "Save ₹15,998.00/yr vs monthly",
    fee: "0.75%", seats: "10 seats", popular: true,
    locked: ["Compliance dashboard (Corporate)", "Team management (Corporate)", "BRSR/CDP/TCFD reports (Corporate)"],
    unlocked: ["Everything in Starter", "Scope 1 + 2 full tracking", "Basic Scope 3 (5 categories)", "GHG inventory ledger", "CSV export + analytics dashboard", "Carbon intensity metrics", "Basic decarbonisation scenarios", "GHG Protocol PDF report", "10 seats", "Chat support"],
    cta: "Get Started", solid: true,
  },
  {
    tier: "CORPORATE", name: "Corporate", tag: "For listed companies",
    desc: "SEBI-listed cos, BRSR filers, ESG teams, CDP/TCFD filers",
    price: "Contact Sales", period: "", gst: null, save: null,
    fee: "0.5%", seats: "∞ seats", popular: false,
    locked: [],
    unlocked: ["Everything in Growth", "Full Scope 3 (all 15 categories)", "BRSR/CDP/TCFD/GHG PDF reports", "Audit trail + verifier integration", "BV, DNV, EY, Deloitte, TÜV SÜD, BSI, KPMG", "GEI/BEE compliance", "PAT scheme + CCTS (forms A–E2)", "5-year decarbonisation plan", "MRV calendar + SBTi target setting", "Supplier data portal", "Multi-entity consolidation", "Carbon neutrality certificate", "Regulatory deadline alerts", "Custom seats · Custom pricing"],
    cta: "Contact Sales", solid: false,
  },
];

const TL = [
  { cls: "done",     yr: "2022",      tag: "ts", tagLbl: "ENACTED",   title: "Energy Conservation Amendment Act",          desc: "Legal foundation for mandatory carbon market. Game-changing legislation that enables CCTS." },
  { cls: "done",     yr: "Jun 2023",  tag: "ts", tagLbl: "NOTIFIED",  title: "CCTS Notified by Ministry of Power",          desc: "9 sectors. GEI-based compliance. CERC as regulator." },
  { cls: "done",     yr: "FY2023–24", tag: "ts", tagLbl: "MANDATORY", title: "SEBI BRSR Core Mandatory",                    desc: "Top 1,000 listed companies. Third-party assured GHG disclosures legally equivalent to financial audit." },
  { cls: "done",     yr: "Dec 2024",  tag: "ts", tagLbl: "PUBLISHED", title: "CEA V20.0 Grid Emission Factor",               desc: "0.727 tCO₂/MWh India grid factor published. EtherTrack updated immediately." },
  { cls: "upcoming", yr: "Jan 2026",  tag: "tp", tagLbl: "ACTIVE",    title: "490 Entities Mandated + CBAM Full Enforcement", desc: "Demand side activated. Indian exporters of steel, aluminium, and cement face EU carbon border obligations." },
  { cls: "upcoming", yr: "Mar 2026",  tag: "tp", tagLbl: "LIVE",      title: "Indian Carbon Market Portal Launched",          desc: "Grid-India registry live (Prakriti 2026 conference, New Delhi). CERC as trading regulator, BEE for sector targets. First CCC trades expected mid-2026." },
];

// FIX: 0.5% fee in marquee
const MQ_ITEMS = [
  { dot: "var(--org)", text: "SEPOLIA TESTNET LIVE" },
  { text: "70+ EMISSION FACTORS · DEFRA 2024 · CEA V20.0 2024" },
  { dot: "var(--grn)", text: "0.5% PLATFORM FEE · SMART CONTRACT" },
  { text: "BRSR CORE · CDP · TCFD · GHG PROTOCOL" },
  { dot: "var(--org)", text: "CCTS READY · 490 OBLIGATED ENTITIES" },
  { text: "VCS · GOLD STANDARD · CDM · ACR · BEE" },
  { text: "ISO 14064-3 RETIREMENT CERTIFICATES · ETHERSCAN VERIFIED" },
  { text: "ETHEREUM BLOCKCHAIN · MARKETPLACE.SOL · AMM POOLS" },
];

/* ─── VALIDATION ───────────────────────────────────────────────── */
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((email || "").trim());

/* ─── HOOKS ────────────────────────────────────────────────────── */
function useReveal(deps = []) {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting)
          setTimeout(() => entry.target.classList.add("visible"), i * 60);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// Accept deps so bento glow re-attaches when feature tab changes
function useBentoGlow(deps = []) {
  useEffect(() => {
    const cards = document.querySelectorAll(".b-card");
    const handlers = [];
    cards.forEach(card => {
      const fn = e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
        card.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
      };
      card.addEventListener("mousemove", fn);
      handlers.push({ card, fn });
    });
    return () => handlers.forEach(({ card, fn }) => card.removeEventListener("mousemove", fn));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/* ─── ANIMATED STAT (scrambles into place once on scroll, then settles) ── */
function AnimatedStat({ value, color }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);
  const playedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = typeof window !== "undefined" && window.matchMedia
      && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setDisplay(value); return; }
    const chars = "0123456789";
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !playedRef.current) {
          playedRef.current = true;
          const totalFrames = 16;
          let frame = 0;
          const interval = setInterval(() => {
            frame++;
            if (frame >= totalFrames) {
              clearInterval(interval);
              setDisplay(value);
              return;
            }
            const lockRatio = frame / totalFrames;
            const scrambled = value.split("").map((ch) => {
              if (/[0-9]/.test(ch) && Math.random() > lockRatio) {
                return chars[Math.floor(Math.random() * chars.length)];
              }
              return ch;
            }).join("");
            setDisplay(scrambled);
          }, 45);
        }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return <div ref={ref} className="s-num" style={{ color }}>{display}</div>;
}

/* ─── MOCK SCREENSHOT PANES ─────────────────────────────────────── */
function MockPane({ id }) {
  const panes = {
    dashboard: (
      <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "10px" }}>
          {[["Net Emissions","142 tCO₂","var(--red)"],["Credits Held","320","var(--grn)"],["Retired","180","var(--vio)"],["Credit Gap","0","var(--blu)"]].map(([l,v,c])=>(
            <div key={l} style={{ background:"var(--bg)", borderRadius:8, padding:"14px", border:"1px solid var(--brd)" }}>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--mut)", marginBottom:6 }}>{l.toUpperCase()}</div>
              <div style={{ fontFamily:"var(--font-head)", fontSize:"1.4rem", color:c, fontWeight:900 }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ background:"var(--bg)", borderRadius:8, border:"1px solid var(--brd)", padding:"16px" }}>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--mut)", marginBottom:12 }}>EMISSION TREND — LAST 6 MONTHS</div>
          <div style={{ display:"flex", alignItems:"flex-end", gap:8, height:80 }}>
            {[65,80,55,90,45,30].map((h,i)=>(
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                <div style={{ width:"100%", height:`${h}%`, background:"linear-gradient(to top,rgba(0,224,80,.5),rgba(0,224,80,.1))", borderRadius:"3px 3px 0 0" }} />
                <span style={{ fontFamily:"var(--font-mono)", fontSize:8, color:"var(--mut2)" }}>{["J","F","M","A","M","J"][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    portfolio: (
      <div style={{ padding:"24px", display:"flex", flexDirection:"column", gap:8 }}>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--mut)", marginBottom:4 }}>YOUR CREDIT HOLDINGS</div>
        {[["Solar — Rajasthan","VCS1234","2023",120,"var(--grn)"],["Biogas — Punjab","GS5678","2022",80,"var(--vio)"],["Wind — Tamil Nadu","VCS9012","2024",60,"var(--blu)"],["Cookstoves — MP","CDM3456","2023",60,"var(--org)"]].map(([name,id,v,qty,c])=>(
          <div key={id} style={{ background:"var(--bg)", borderRadius:8, padding:"12px 16px", border:"1px solid var(--brd)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ fontWeight:700, fontSize:13, marginBottom:2 }}>{name}</div>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--mut)" }}>{id} · Vintage {v}</div>
            </div>
            <div style={{ fontFamily:"var(--font-head)", fontSize:"1.1rem", color:c, fontWeight:900 }}>{qty}<span style={{ fontSize:9, fontFamily:"var(--font-mono)" }}> tCO₂</span></div>
          </div>
        ))}
      </div>
    ),
    market: (
      <div style={{ padding:"24px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--red)", marginBottom:6 }}>ASKS</div>
          {[["₹1,842","2,400",35],["₹1,838","1,100",20],["₹1,835","800",12]].map(([p,v,b],i)=>(
            <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr", padding:"6px 10px", background:"rgba(255,68,68,.04)", borderRadius:4, fontSize:12, position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", left:0, top:0, bottom:0, width:`${b}%`, background:"rgba(255,68,68,.1)" }} />
              <span style={{ color:"var(--red)", position:"relative" }}>{p}</span>
              <span style={{ color:"var(--mut)", textAlign:"right", position:"relative" }}>{v}</span>
            </div>
          ))}
          <div style={{ display:"flex", justifyContent:"center", padding:"8px", background:"var(--bg)", borderRadius:4, gap:12, margin:"4px 0" }}>
            <span style={{ fontSize:15, fontWeight:700, color:"var(--grn)" }}>₹1,832</span>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--mut)" }}>SPREAD ₹14</span>
          </div>
          {[["₹1,818","3,200",48],["₹1,815","900",14],["₹1,810","600",8]].map(([p,v,b],i)=>(
            <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr", padding:"6px 10px", background:"rgba(0,224,80,.04)", borderRadius:4, fontSize:12, position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", left:0, top:0, bottom:0, width:`${b}%`, background:"rgba(0,224,80,.08)" }} />
              <span style={{ color:"var(--grn)", position:"relative" }}>{p}</span>
              <span style={{ color:"var(--mut)", textAlign:"right", position:"relative" }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--mut)", marginBottom:4 }}>PLACE ORDER</div>
          {[["Order Type","Limit"],["Credits","100 tCO₂"],["Price","₹1,830"],["Total","₹1,83,000"]].map(([l,v])=>(
            <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 12px", background:"var(--bg)", borderRadius:6, border:"1px solid var(--brd)" }}>
              <span style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"var(--mut)" }}>{l}</span>
              <span style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"var(--txt)" }}>{v}</span>
            </div>
          ))}
          <button className="btn-p" style={{ marginTop:"auto", fontSize:11 }}>BUY 100 tCO₂ →</button>
        </div>
      </div>
    ),
    emissions: (
      <div style={{ padding:"24px", display:"flex", flexDirection:"column", gap:10 }}>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--mut)", marginBottom:4 }}>GHG INVENTORY — FY 2025–26</div>
        {[["Scope 1","Direct — Diesel generators, company vehicles","48 tCO₂","var(--org)","34%"],["Scope 2","Indirect — Grid electricity (CEA 0.727 kgCO₂/kWh)","67 tCO₂","var(--vio)","47%"],["Scope 3","Value chain — Business travel, freight, waste","27 tCO₂","var(--blu)","19%"]].map(([scope,desc,val,c,pct])=>(
          <div key={scope} style={{ background:"var(--bg)", borderRadius:8, padding:"14px 16px", border:"1px solid var(--brd)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:c, letterSpacing:".1em", marginBottom:2 }}>{scope}</div>
                <div style={{ fontSize:12, color:"var(--mut)" }}>{desc}</div>
              </div>
              <div style={{ fontFamily:"var(--font-head)", fontSize:"1.1rem", color:c, fontWeight:900, whiteSpace:"nowrap" }}>{val}</div>
            </div>
            <div style={{ height:3, background:"var(--brd)", borderRadius:2 }}>
              <div style={{ height:"100%", background:c, width:pct, borderRadius:2 }} />
            </div>
          </div>
        ))}
        <div style={{ background:"rgba(0,224,80,.06)", borderRadius:8, padding:"12px 16px", border:"1px solid var(--grnd)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"var(--grn)" }}>TOTAL FOOTPRINT</span>
          <span style={{ fontFamily:"var(--font-head)", fontSize:"1.3rem", color:"var(--grn)", fontWeight:900 }}>142 tCO₂</span>
        </div>
      </div>
    ),
    wallet: (
      <div style={{ padding:"24px", display:"flex", flexDirection:"column", gap:10 }}>
        <div style={{ background:"linear-gradient(135deg,var(--surf2),var(--surf))", borderRadius:12, padding:"20px", border:"1px solid var(--grnd)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--mut)", marginBottom:6 }}>WALLET BALANCE</div>
            <div style={{ fontFamily:"var(--font-head)", fontSize:"2rem", color:"var(--grn)", fontWeight:900 }}>320 tCO₂</div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--mut2)", marginTop:4 }}>0x7f3a...9e2d · SEPOLIA</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--mut)", marginBottom:6 }}>INR VALUE</div>
            <div style={{ fontFamily:"var(--font-head)", fontSize:"1.3rem", fontWeight:900 }}>₹5,86,240</div>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
          <button className="btn-p" style={{ borderRadius:8, padding:12 }}>BUY CREDITS<br/><small style={{ fontWeight:400, fontSize:9 }}>UPI · INR</small></button>
          <button style={{ background:"var(--org)", color:"var(--bg)", border:"none", borderRadius:8, padding:12, cursor:"pointer", fontFamily:"var(--font-mono)", fontSize:11, fontWeight:700 }}>RETIRE ON-CHAIN<br/><small style={{ fontWeight:400, fontSize:9 }}>Burn permanently</small></button>
        </div>
        {[["Retired","50 tCO₂","ISO cert issued","var(--grn)","✓"],["Bought","100 tCO₂","₹1,832/credit","var(--vio)","↓"],["Retired","130 tCO₂","ISO cert issued","var(--grn)","✓"]].map(([type,amt,note,c,icon],i)=>(
          <div key={i} style={{ display:"flex", alignItems:"center", gap:10, background:"var(--bg)", borderRadius:6, padding:"8px 12px", border:"1px solid var(--brd)" }}>
            <div style={{ width:26, height:26, borderRadius:"50%", background:"rgba(0,0,0,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:c, flexShrink:0 }}>{icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:12, fontWeight:600 }}>{type} · {amt}</div>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--mut)" }}>{note}</div>
            </div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--mut)" }}>Etherscan ↗</div>
          </div>
        ))}
      </div>
    ),
  };
  return panes[id] || null;
}

/* ─── DEMO MODAL ─────────────────────────────────────────────────── */
function DemoModal({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", company: "", role: "" });
  const [sent, setSent] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const set = k => e => {
    setForm(p => ({ ...p, [k]: e.target.value }));
    if (k === "email") setEmailError(false);
  };
  const handleSend = () => {
    if (isValidEmail(form.email)) setSent(true);
    else setEmailError(true);
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
              <button className="btn-p" style={{ marginTop:".5rem" }} onClick={handleSend}>SEND REQUEST →</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── FEATURE TAB CONTENT ────────────────────────────────────────── */
function ExchangeFeatures() {
  return (
    <div className="bento feat-panel">
      {/* Wide: Order Book + AMM */}
      <div className="b-card c8 reveal" style={{ border:"1px solid var(--grnd)", padding:36 }}>
        <span className="b-icon">📊</span>
        <div className="b-title">Live On-Chain Order Book + Hybrid AMM</div>
        {/* FIX: removed "The only Indian carbon marketplace" absolute claim */}
        <div className="b-desc">To our knowledge, no other Indian carbon marketplace currently combines a live double-sided order book with AMM liquidity pools. Market, limit, and bid orders. ETH locked in on-chain escrow for bids. AMM pools for instant small-order execution. Auto-matching fires the moment prices cross.</div>
        <div style={{ marginTop:16, background:"var(--bg)", border:"1px solid var(--brd)", borderRadius:6, padding:"10px 12px", fontFamily:"var(--font-mono)", fontSize:9, lineHeight:2 }}>
          <div style={{ display:"grid", gridTemplateColumns:"80px 1fr 50px", gap:8, color:"var(--mut)", marginBottom:4 }}><span>PRICE</span><span>DEPTH</span><span>QTY</span></div>
          {[["var(--red)",80,"400"],["var(--red)",55,"293"]].map(([c,w,q],i)=>(
            <div key={i} style={{ display:"grid", gridTemplateColumns:"80px 1fr 50px", gap:8, alignItems:"center" }}>
              <span style={{ color:c }}>₹650</span>
              <div style={{ height:3, background:"rgba(255,68,68,.3)", borderRadius:2, width:`${w}%` }} />
              <span style={{ color:"var(--mut)" }}>{q}</span>
            </div>
          ))}
          <div style={{ textAlign:"center", padding:4, fontFamily:"var(--font-head)", fontSize:14, fontWeight:700, color:"var(--grn)", background:"rgba(0,224,80,.04)", borderRadius:3, margin:"3px 0" }}>₹650 MID</div>
          <div style={{ display:"grid", gridTemplateColumns:"80px 1fr 50px", gap:8, alignItems:"center" }}>
            <span style={{ color:"var(--grn)" }}>₹650</span>
            <div style={{ height:3, background:"rgba(0,224,80,.3)", borderRadius:2, width:"65%" }} />
            <span style={{ color:"var(--mut)" }}>218</span>
          </div>
        </div>
        <div className="b-tag">ORDER BOOK · LIMIT ORDERS · BID ESCROW · AUTO-MATCHING · AMM POOLS</div>
      </div>
      {/* INR Wallet */}
      <div className="b-card c4 reveal">
        <span className="b-icon">💳</span>
        <div className="b-title">INR Wallet — No Crypto Needed</div>
        <div className="b-desc">Deposit via UPI (GPay, PhonePe, Paytm) or Net Banking through Razorpay — RBI authorised. Trade carbon credits in rupees without holding ETH. Withdraw directly to your bank via IMPS/NEFT.</div>
        <div className="kyc-steps">
          {[["var(--grn)","Deposit via UPI — 0% fee · instant settlement"],["var(--blu)","PAY WITH toggle — INR Wallet or MetaMask ETH"],["var(--org)","Withdraw to bank via IMPS/NEFT · 1–2 days"],["var(--red)","1% TDS auto-deducted under Section 194S"]].map(([c,t],i)=>(
            <div key={i} className="kyc-step"><div className="ks-dot" style={{ background:c }} />{t}</div>
          ))}
        </div>
        <div className="b-tag">RAZORPAY · RBI AUTHORISED · STATEMENT PDF</div>
      </div>
    </div>
  );
}

function ComplianceFeatures() {
  return (
    <div className="bento feat-panel">
      {/* Wide: GHG Engine */}
      <div className="b-card c8 reveal" style={{ padding:36 }}>
        <span className="b-icon">🌡️</span>
        <div className="b-title">Full GHG Inventory Engine</div>
        <div className="b-desc">70+ emission factors across all 3 scopes and all 15 GHG Protocol Scope 3 categories. DEFRA 2024, CEA V20.0 2024 (0.727 tCO₂/MWh), IPCC AR6. Dual Scope 2 (location + market-based). PAT scheme. Bulk CSV import up to 2,000 records.</div>
        <div style={{ marginTop:16, display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
            {[["Diesel Combustion","2.68 kgCO₂e/L","var(--org)"],["Grid India — CEA V20.0","0.727 tCO₂/MWh","var(--blu)"],["Refrigerant R-410A","2,088 kgCO₂e/kg","var(--vio)"],["Natural Gas","2.04 kgCO₂e/m³","var(--org)"]].map(([l,v,c])=>(
              <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"5px 10px", background:"var(--bg)", borderRadius:5, border:"1px solid var(--brd)", fontFamily:"var(--font-mono)", fontSize:8.5 }}>
                <span style={{ color:"var(--mut)" }}>{l}</span><span style={{ color:c }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {[["Scope 1","Direct emissions","34%","var(--org)"],["Scope 2","Grid electricity","47%","var(--vio)"],["Scope 3","15 categories","19%","var(--blu)"]].map(([s,d,p,c])=>(
              <div key={s} style={{ background:"var(--bg)", borderRadius:6, padding:"10px 12px", border:"1px solid var(--brd)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                  <span style={{ fontFamily:"var(--font-mono)", fontSize:9, color:c }}>{s}</span>
                  <span style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--mut)" }}>{p}</span>
                </div>
                <div style={{ height:2, background:"var(--brd)", borderRadius:2 }}>
                  <div style={{ height:"100%", width:p, background:c, borderRadius:2 }} />
                </div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:8, color:"var(--mut2)", marginTop:3 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="b-tag">DEFRA 2024 · CEA V20.0 2024 · IPCC AR6 · BEE PAT · DUAL SCOPE 2</div>
      </div>
      {/* PDF Exports */}
      <div className="b-card c4 reveal">
        <span className="b-icon">📈</span>
        <div className="b-title">Four Regulatory PDF Exports</div>
        <div className="b-desc">BRSR Core (SEBI format), CDP Climate, TCFD, and GHG Protocol PDFs in one click each. CEA V20.0 factors embedded. Blockchain TX hashes included automatically. Auditor-ready, dual Scope 2.</div>
        <div style={{ marginTop:14, display:"flex", flexDirection:"column", gap:5 }}>
          {[["SEBI BRSR CORE"],["GHG PROTOCOL (ISO 14064-1)"],["CDP CLIMATE"],["TCFD / IFRS S2"]].map(([l])=>(
            <div key={l} style={{ display:"flex", justifyContent:"space-between", fontFamily:"var(--font-mono)", fontSize:9, padding:"6px 10px", background:"var(--bg)", borderRadius:4, border:"1px solid var(--brd)" }}>
              <span style={{ color:"var(--mut)" }}>{l}</span><span style={{ color:"var(--grn)" }}>LIVE ✓</span>
            </div>
          ))}
        </div>
        <div className="b-tag">CEA V20.0 2024 · BLOCKCHAIN TX HASHES EMBEDDED</div>
      </div>
      {/* CCTS */}
      <div className="b-card c6 reveal" style={{ background:"linear-gradient(135deg,var(--surf),#051208)" }}>
        <span className="b-icon">🇮🇳</span>
        <div className="b-title">CCTS Compliance Module</div>
        <div className="b-desc">490 entities across 9 sectors face mandatory CCTS compliance from FY2026. GEI tracker, Forms A–E2, ACVA verification workflow, BEE MRV JSON export (RECPDCL-compatible), sector targets for all 9 gazetted sectors, Grid-India registry sync.</div>
        <div style={{ marginTop:14, fontFamily:"var(--font-mono)", fontSize:10, color:"var(--mut)", lineHeight:2.2 }}>
          <div><span style={{ color:"var(--grn)" }}>✓</span>&nbsp; GEI calculator — Scope 1 + Scope 2 only (gazette formula)</div>
          <div><span style={{ color:"var(--grn)" }}>✓</span>&nbsp; All 8 BEE-approved CCTS methodologies</div>
          <div><span style={{ color:"var(--grn)" }}>✓</span>&nbsp; Grid-India ICM Portal integration (Mar 2026)</div>
          <div><span style={{ color:"var(--org)" }}>⏳</span>&nbsp; CERC recognition — engagement in progress (BETA)</div>
        </div>
        <div className="b-tag">BEE · CCTS · MoEFCC · GRID-INDIA · CBAM ELIGIBLE</div>
      </div>
      {/* Blockchain Audit Trail */}
      <div className="b-card c6 reveal">
        <span className="b-icon">🔗</span>
        <div className="b-title">Blockchain Audit Trail</div>
        <div className="b-desc">Every emission log, edit, credit submission, retirement, and verifier action anchored as a real Ethereum transaction. SHA-256 hash-chained entries — any tampering breaks the chain. Public verifyChain() callable by anyone without login.</div>
        <div style={{ marginTop:14, display:"flex", flexDirection:"column", gap:5 }}>
          {[["Entry hash","#a3f...c2d","var(--grn)"],["Prev hash","#8b1...f9a","var(--vio)"],["Block","7,234,891","var(--blu)"],["Chain status","Verified ✓","var(--grn)"]].map(([l,v,c])=>(
            <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"5px 10px", background:"var(--bg)", borderRadius:5, border:"1px solid var(--brd)", fontFamily:"var(--font-mono)", fontSize:8.5 }}>
              <span style={{ color:"var(--mut)" }}>{l}</span><span style={{ color:c }}>{v}</span>
            </div>
          ))}
        </div>
        <div className="b-tag">SHA-256 CHAIN · ETHERSCAN · ISO 14064-3 VERIFIERS</div>
      </div>
    </div>
  );
}

function OperationsFeatures() {
  return (
    <div className="bento feat-panel">
      {/* KYC */}
      <div className="b-card c6 reveal">
        <span className="b-icon">🔐</span>
        <div className="b-title">Cryptographic KYC</div>
        <div className="b-desc">Aadhaar/PAN hashed cryptographically — raw number never stored. Documents on IPFS via Pinata. Firebase phone OTP. The same ID cannot register twice — enforced at the hash level.</div>
        <div className="kyc-steps">
          {[["var(--grn)","Identity hash — raw ID never stored anywhere"],["var(--blu)","Document → Pinata IPFS · immutable"],["var(--org)","Phone OTP via Firebase · 60s window"],["var(--red)","Duplicate attempt → HTTP 409 rejected"]].map(([c,t],i)=>(
            <div key={i} className="kyc-step"><div className="ks-dot" style={{ background:c }} />{t}</div>
          ))}
        </div>
        <div className="b-tag">DPDP ACT 2023 · UIDAI GUIDELINES · PINATA IPFS</div>
      </div>
      {/* On-Chain Credit Tokens */}
      <div className="b-card c6 reveal">
        <span className="b-icon">🪙</span>
        <div className="b-title">On-Chain Credit Tokens</div>
        <div className="b-desc">Every credit tokenised on Ethereum with full metadata — Token ID, VCS serial, vintage, Art.6.2 status, SDG co-benefits, CBAM eligibility. Portfolio tracks held, listed, partially listed, retired, and pending states.</div>
        <div style={{ marginTop:14, background:"var(--bg)", borderRadius:8, padding:"12px 14px", border:"1px solid var(--brd)", fontFamily:"var(--font-mono)", fontSize:9, lineHeight:2 }}>
          {[["Standard","Verra VCS"],["Serial","VCS-2023-1234-5678"],["Vintage","2023"],["Art.6.2 CA","Not issued"],["SDG tags","SDG 7 · SDG 13"],["CBAM","Eligible ✓"]].map(([l,v])=>(
            <div key={l} style={{ display:"flex", justifyContent:"space-between" }}>
              <span style={{ color:"var(--mut)" }}>{l}</span><span style={{ color:"var(--grn)" }}>{v}</span>
            </div>
          ))}
        </div>
        <div className="b-tag">VCS · GOLD STANDARD · CDM · ACR · BEE CCTS</div>
      </div>
      {/* ISO 14064-3 Retirement */}
      <div className="b-card c6 reveal">
        <span className="b-icon">📜</span>
        <div className="b-title">ISO 14064-3 Retirement Certificate</div>
        <div className="b-desc">Every on-chain retirement generates a certificate with Certificate ID, blockchain TX hash, QR code, and public Etherscan verification URL. Any auditor, SEBI assessor, or CDP reviewer verifies without contacting EtherTrack.</div>
        <div style={{ marginTop:14, background:"linear-gradient(135deg,var(--surf2),#051208)", borderRadius:8, padding:"16px", border:"1px solid var(--grnd)", fontFamily:"var(--font-mono)", fontSize:9, lineHeight:2.2 }}>
          <div><span style={{ color:"var(--grn)" }}>CERT-2026-</span><span style={{ color:"var(--mut)" }}>ETH-0042</span></div>
          <div><span style={{ color:"var(--mut)" }}>TX: </span><span style={{ color:"var(--vio)" }}>0x7f3a...9e2d</span></div>
          <div><span style={{ color:"var(--mut)" }}>Amount: </span><span style={{ color:"var(--txt)" }}>100 tCO₂</span></div>
          <div><span style={{ color:"var(--mut)" }}>Burnt to: </span><span style={{ color:"var(--red)" }}>0x0000...0000</span></div>
          <div style={{ marginTop:6 }}><span style={{ color:"var(--org)" }}>QR → Etherscan · No login required</span></div>
        </div>
        <div className="b-tag">ISO 14064-3 · PERMANENT · ETHERSCAN VERIFIABLE</div>
      </div>
      {/* Team & RBAC */}
      <div className="b-card c6 reveal">
        <span className="b-icon">👥</span>
        <div className="b-title">Team Management & RBAC</div>
        <div className="b-desc">Owner, Admin, Manager, Auditor, Viewer roles with 20 specific permissions. Connect Bureau Veritas, DNV, EY Climate, KPMG, or TUV SUD as third-party verifiers for BRSR assurance. Multi-entity consolidation in beta.</div>
        <div style={{ marginTop:14, display:"flex", flexDirection:"column", gap:5 }}>
          {[["Owner","Full access + billing","var(--grn)"],["Admin","All operations","var(--blu)"],["Manager","Log + manage credits","var(--vio)"],["Auditor","Read + sign-off","var(--org)"],["Viewer","Read-only dashboards","var(--mut)"]].map(([role,perm,c])=>(
            <div key={role} style={{ display:"flex", justifyContent:"space-between", padding:"5px 10px", background:"var(--bg)", borderRadius:5, border:"1px solid var(--brd)", fontFamily:"var(--font-mono)", fontSize:8.5 }}>
              <span style={{ color:c }}>{role}</span><span style={{ color:"var(--mut)" }}>{perm}</span>
            </div>
          ))}
        </div>
        <div className="b-tag">5 ROLES · 20 PERMISSIONS · VERIFIER API</div>
      </div>
    </div>
  );
}

/* ─── APP ────────────────────────────────────────────────────────── */
export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modal, setModal]           = useState(false);
  const [activeTab, setActiveTab]   = useState(0);
  const [featureTab, setFeatureTab] = useState(0);
  const [gapTab, setGapTab]         = useState(0);
  const [ctaEmail, setCtaEmail]     = useState("");
  const [ctaSent, setCtaSent]       = useState(false);
  const [ctaError, setCtaError]     = useState(false);
  const [annDismissed, setAnnDismissed] = useState(false);
  const [ssImgError, setSsImgError] = useState(false);

  useReveal([featureTab, gapTab]);
  useBentoGlow([featureTab]);

  useEffect(() => {
    try {
      if (window.localStorage.getItem("et_ann_dismissed") === "1") setAnnDismissed(true);
    } catch { /* localStorage unavailable, ignore */ }
  }, []);

  useEffect(() => { setSsImgError(false); }, [activeTab]);

  const dismissAnn = () => {
    setAnnDismissed(true);
    try { window.localStorage.setItem("et_ann_dismissed", "1"); } catch { /* ignore */ }
  };

  const openDemo = () => setModal(true);

  const submitCta = () => {
    if (isValidEmail(ctaEmail)) { setCtaSent(true); setCtaError(false); }
    else setCtaError(true);
  };

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div className="orb orb1" /><div className="orb orb2" /><div className="orb orb3" />
      {modal && <DemoModal onClose={() => setModal(false)} />}

      {/* ── Mobile nav ── */}
      <div className={`mobile-nav${mobileOpen ? " open" : ""}`}>
        <button className="mobile-close" onClick={() => setMobileOpen(false)}>✕ CLOSE</button>
        {[["FEATURES","#features"],["HOW IT WORKS","#how"],["PRICING","#pricing"],["PLATFORM","#screenshots"],["CCTS TIMELINE","#ccts"],["CONTACT","#demo"]].map(([l,h])=>(
          <a key={l} href={h} onClick={() => setMobileOpen(false)}>{l}</a>
        ))}
        <button className="btn-p" style={{ marginTop:8 }} onClick={() => { setMobileOpen(false); openDemo(); }}>REQUEST DEMO →</button>
      </div>

      {/* ── Announcement bar ── */}
      {!annDismissed && (
        <div className="ann">
          <div className="ann-dot" />
          <span style={{ color:"var(--org)" }}>SEPOLIA TESTNET LIVE</span>
          &nbsp;·&nbsp; All modules operational · Mainnet deployment in progress &nbsp;·&nbsp;
          <span style={{ color:"var(--grn)" }}>MAINNET COMING SOON →</span>
          <button className="ann-close" onClick={dismissAnn} aria-label="Dismiss announcement">✕</button>
        </div>
      )}

      {/* ── Nav ── */}
      <nav className="nav">
        <div className="nav-logo">
          <img src={logoImg} alt="EtherTrack" onError={e => { e.target.style.display = "none"; }} />
          ETHERTRACK
        </div>
        <div className="nav-links">
          {[["FEATURES","#features"],["HOW IT WORKS","#how"],["PRICING","#pricing"],["PLATFORM","#screenshots"],["CCTS TIMELINE","#ccts"]].map(([l,h])=>(
            <a key={l} href={h}>{l}</a>
          ))}
        </div>
        <div className="nav-right">
          <div className="nav-status"><div className="nav-status-dot" />TESTNET LIVE</div>
          <button className="nav-cta" onClick={openDemo}>REQUEST DEMO</button>
          <button className="nav-hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu" aria-expanded={mobileOpen}><span/><span/><span/></button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="eyebrow">INDIA'S BLOCKCHAIN-NATIVE CARBON INFRASTRUCTURE PLATFORM</div>
        <div className="hero-verb-row">TRACK · TOKENISE · TRADE · RETIRE · REPORT</div>
        <h1 className="h1">
          The Carbon Market<br/>
          <span className="g">India Deserves</span><br/>
          <span className="o">Finally Built.</span>
        </h1>
        <p className="hero-sub">On-chain order book. Hybrid AMM. Full GHG inventory to ESG reporting. One platform that closes the loop from emission log to verified on-chain retirement.</p>
        <div className="actions">
          <button className="btn-p" onClick={openDemo}>REQUEST DEMO →</button>
          <a className="btn-g" href="https://app.ethertrack.in" target="_blank" rel="noopener noreferrer">SEE LIVE TESTNET APP ↗</a>
        </div>
        <p className="hero-note">Running on Ethereum Sepolia testnet · Real app · Real smart contracts · No real financial value yet</p>
      </section>

      {/* ── Marquee ── */}
      <div className="mq-wrap">
        <div className="mq-track">
          {[0,1].map(pass => MQ_ITEMS.map((item,i) => (
            <div key={`${pass}-${i}`} className="mq-item">
              {item.dot && <span style={{ color:item.dot }}>●</span>}
              {item.text}
            </div>
          )))}
        </div>
      </div>

      {/* ── Stats ── */}
      <section className="section" style={{ paddingBottom:0 }}>
        <div className="stats-row reveal">
          {STATS.map((s,i) => (
            <div key={i} className="s-cell">
              <AnimatedStat value={s.num} color={s.color} />
              <div className="s-lbl">{s.lbl}</div>
              <div className="s-src">{s.src}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Market Gaps — TABBED ── */}
      <section className="section" id="platform">
        <div className="s-label reveal">THE MARKET GAP</div>
        <h2 className="s-h2 reveal">Current market is broken.<br/><span style={{ color:"var(--grn)" }}>We fixed six things.</span></h2>
        <p className="s-sub reveal">Every solution below is live and confirmed working on Ethereum Sepolia testnet.</p>
        <div className="gap-tabs">
          {GAPS.map((g,i) => (
            <button key={i} className={`gap-tab-btn${gapTab === i ? " on" : ""}`} onClick={() => setGapTab(i)}>
              <span className="gap-tab-n">0{i+1}</span>{g.tabLabel}
            </button>
          ))}
        </div>
        <div className="gap-grid">
          {(() => {
            const g = GAPS[gapTab];
            return (
              <div className="gap-card reveal">
                <div className="gap-num">0{gapTab+1}</div>
                {/* Problem */}
                <div>
                  <div className={`gtag ${g.tagP}`}>THE PROBLEM</div>
                  <div className="g-title">{g.problem}</div>
                  <div className="g-desc">{g.problemDesc}</div>
                </div>
                {/* Solution */}
                <div>
                  <div className={`gtag ${g.tagS}`}>{g.tagLabel}</div>
                  <div className="g-title" style={gapTab === 1 ? { color:"var(--grn)" } : {}}>{g.solution}</div>
                  <div className="g-desc">{g.solutionDesc}</div>
                  <div className="gap-facts">
                    {g.facts.map((f,j) => <div key={j} className="gap-fact">{f}</div>)}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ── Platform Features — TABBED ── */}
      <section className="section" id="features">
        <div className="s-label reveal">PLATFORM CAPABILITIES</div>
        <h2 className="s-h2 reveal">Everything carbon.<br/><span style={{ color:"var(--grn)" }}>One infrastructure.</span></h2>
        <p className="s-sub reveal">Built from the ground up for India's voluntary market, CCTS compliance, and the corporate ESG mandate.</p>
        <div className="feat-tabs">
          {["Exchange","Compliance & Reporting","Operations"].map((t,i) => (
            <button key={t} className={`feat-tab-btn${featureTab === i ? " on" : ""}`} onClick={() => setFeatureTab(i)}>{t}</button>
          ))}
        </div>
        {featureTab === 0 && <ExchangeFeatures />}
        {featureTab === 1 && <ComplianceFeatures />}
        {featureTab === 2 && <OperationsFeatures />}
      </section>

      {/* ── How It Works ── */}
      <section className="section" id="how">
        <div className="s-label reveal">HOW IT WORKS</div>
        <h2 className="s-h2 reveal">From onboarding to net zero.<br/><span style={{ color:"var(--grn)" }}>Four steps.</span></h2>
        <div className="how-grid">
          {HOW.map((s,i) => (
            <div key={i} className="how-step reveal">
              <div className="how-n">{s.n}</div>
              <div className="how-ttl">{s.title}</div>
              <p className="how-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="section" id="pricing" style={{ background:"var(--surf)", borderTop:"1px solid var(--brd)", borderBottom:"1px solid var(--brd)" }}>
        <div className="s-label reveal">PRICING</div>
        <h2 className="s-h2 reveal">Built for every size.<br/><span style={{ color:"var(--grn)" }}>From solo to SEBI-listed.</span></h2>
        <p className="s-sub reveal">Lower trading fees and deeper compliance tooling as you grow. All plans include on-chain settlement on Ethereum.</p>
        <div className="pricing-grid">
          {PRICING.map((p,i) => (
            <div key={p.tier} className={`price-card reveal${p.popular ? " popular" : ""}`}>
              {p.popular && <div className="price-badge">★ MOST POPULAR</div>}
              {p.tier === "CORPORATE" && <div className="price-badge org">ENTERPRISE</div>}
              <div className="price-tier">{p.tier}</div>
              <div className="price-name">{p.name}</div>
              <div className="price-tag">{p.tag}</div>
              <div className="price-desc">{p.desc}</div>
              <div className="price-amt-row">
                <span className="price-amt">{p.price}</span>
                {p.period && <span className="price-per">{p.period}</span>}
              </div>
              {p.gst && <div className="price-gst">{p.gst}</div>}
              {p.save && <div className="price-save">{p.save}</div>}
              <div className="price-pills">
                <span className="price-pill"><span className="price-pill-dot" style={{ background:"var(--org)" }} />{p.fee} fee</span>
                <span className="price-pill"><span className="price-pill-dot" style={{ background:"var(--blu)" }} />{p.seats}</span>
              </div>
              <div className="price-divider" />
              <div className="price-feats">
                {p.locked.map((f,j) => (
                  <div key={`l${j}`} className="price-feat locked"><span className="price-feat-icon">🔒</span>{f}</div>
                ))}
                {p.unlocked.map((f,j) => (
                  <div key={`u${j}`} className="price-feat unlocked"><span className="price-feat-icon">✓</span>{f}</div>
                ))}
              </div>
              <button className={`price-cta${p.solid ? " solid" : ""}`} onClick={openDemo}>{p.cta}{p.cta === "Get Started" ? " →" : ""}</button>
            </div>
          ))}
        </div>
        <div className="price-app-note reveal">
          <span style={{ color:"var(--grn)" }}>●</span> Live in the EtherTrack app · Prices shown exclude GST where noted
        </div>
      </section>

      {/* ── Screenshots ── */}
      <section className="ss-section" id="screenshots">
        <div className="s-label reveal">THE PRODUCT</div>
        <h2 className="s-h2 reveal">Every feature. <span style={{ color:"var(--grn)" }}>One platform.</span></h2>
        <p className="s-sub reveal" style={{ marginBottom:32 }}>Live screens from the Ethereum Sepolia testnet build — no mockups.</p>
        <div className="ss-tabs">
          {TABS.map((t,i) => (
            <button key={t.id} className={`ss-tab${activeTab === i ? " on" : ""}`} onClick={() => setActiveTab(i)}>{t.label}</button>
          ))}
        </div>
        <div className="ss-frame">
          <div className="ss-bar">
            <div className="ss-dots">
              {["#FF5F57","#FEBC2E","#28C840"].map((c,i)=><div key={i} className="ss-dot" style={{ background:c }} />)}
            </div>
            <div className="ss-url">{TABS[activeTab].url}</div>
            <div className="ss-badge">{TABS[activeTab].badge}</div>
          </div>
          {TABS[activeTab].imgSrc && !ssImgError
            ? <img src={TABS[activeTab].imgSrc} alt={TABS[activeTab].label} onError={() => setSsImgError(true)} />
            : <MockPane id={TABS[activeTab].id} />}
        </div>
      </section>

      {/* ── Founder ── */}
      <section className="section" style={{ background:"var(--surf)", borderTop:"1px solid var(--brd)" }}>
        <div className="s-label reveal">FROM THE FOUNDER</div>
        <h2 className="s-h2 reveal">Built for a market<br/><span style={{ color:"var(--grn)" }}>deserving the best.</span></h2>
        <div className="founder-card reveal">
          <div className="founder-photo">
            <img src={founderImg} alt="Varun Girish Deshmukh, Founder EtherTrack"
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
            <p className="f-quote">"India supplied <strong style={{ color:"var(--txt)" }}>17% of all global voluntary carbon credits</strong> between 2010 and 2022 — yet had no domestic blockchain exchange to price, trade, or retire them transparently. The CCTS compliance mechanism now covers <strong style={{ color:"var(--txt)" }}>490 industrial entities</strong> from FY2026, and India's carbon market is projected to exceed <strong style={{ color:"var(--txt)" }}>₹20,000 crore by 2030</strong>. What this market has never had is infrastructure worthy of its scale."</p>
            <p className="f-source">Sources: Verra registry data (2023) · BEE / MoP notification Jan 2026 · CEEW / FICCI market estimates 2024</p>
            <div className="f-name">Varun Girish Deshmukh</div>
            <div className="f-role">FOUNDER · ETHERTRACK TECHNOLOGIES PRIVATE LIMITED · BLOCKCHAIN + CLIMATE</div>
            <a className="f-email" href="mailto:founder@ethertrack.in">founder@ethertrack.in</a>
          </div>
        </div>
      </section>

      {/* ── CCTS Timeline ── */}
      <section className="section" id="ccts">
        <div className="s-label reveal">CCTS TIMELINE</div>
        <h2 className="s-h2 reveal">Why the window is <span style={{ color:"var(--org)" }}>open right now.</span></h2>
        <p className="s-sub reveal">India's carbon compliance regime is activating faster than most companies realise.</p>
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

      {/* ── CTA ── */}
      <section className="cta-sect" id="demo">
        <div style={{ fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:".2em", color:"var(--mut)", marginBottom:16 }}>EARLY ACCESS</div>
        <h2 className="cta-h2">The CCTS deadline<br/><span style={{ color:"var(--org)" }}>is not waiting.</span></h2>
        <p className="cta-sub">490 entities face mandatory CCTS compliance from FY2026. Request a demo and see how EtherTrack can help your company prepare.</p>
        {ctaSent
          ? <p style={{ fontFamily:"var(--font-mono)", fontSize:12, color:"var(--grn)", letterSpacing:".1em" }}>✓ RECEIVED — we'll respond within 24 hours</p>
          : (
            <>
              <div className="cta-form">
                <input className="cta-inp" type="email" placeholder="your@company.com" value={ctaEmail} onChange={e => { setCtaEmail(e.target.value); setCtaError(false); }} style={ctaError ? { borderColor: "var(--red)" } : undefined} />
                <button className="btn-p" onClick={submitCta}>REQUEST DEMO →</button>
              </div>
              {ctaError && <p style={{ color:"var(--red)", fontFamily:"var(--font-mono)", fontSize:11, marginTop:10 }}>Enter a valid email address</p>}
            </>
          )
        }
        <p className="cta-note">No commitment · 30-minute walkthrough · Response within 24 hours</p>
      </section>

      {/* ── Footer ── */}
      <footer>
        <div className="footer-top">
          <div>
            <img src={logoImg} alt="EtherTrack" style={{ height:32, width:"auto", objectFit:"contain", marginBottom:4 }} onError={e=>{e.target.style.display="none";}} />
            <p className="footer-brand-desc">India's blockchain-native carbon infrastructure platform — track emissions, tokenise verified credits, trade transparently, retire on-chain. Mainnet coming soon.</p>
            <div className="footer-network"><div className="footer-net-dot" />ETHEREUM SEPOLIA · SMART CONTRACT ACTIVE</div>
          </div>
          <div>
            <div className="footer-col-head">PLATFORM</div>
            <ul className="footer-col-links">
              {["Emissions Tracking","Credit Exchange","Portfolio Manager","ESG Reports"].map(l=><li key={l}><a href="#platform">{l}</a></li>)}
              <li><a href="https://app.ethertrack.in" target="_blank" rel="noopener noreferrer">Live Testnet App ↗</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-head">COMPANY</div>
            <ul className="footer-col-links">
              {[["India CCTS","#ccts"],["Pricing","#pricing"],["Screenshots","#screenshots"],["How It Works","#how"],["Request Demo","#demo"]].map(([l,h])=><li key={l}><a href={h}>{l}</a></li>)}
              <li><a href="mailto:support@ethertrack.in">support@ethertrack.in</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-head">LEGAL</div>
            <ul className="footer-col-links">
              {/* TODO: add real links once pages are built */}
              {["Privacy Policy","Terms of Service","Disclaimer"].map(l=><li key={l}><a href="#" style={{ opacity:.4, cursor:"default" }}>{l} (coming soon)</a></li>)}
            </ul>
            <div style={{ marginTop:20, fontFamily:"var(--font-mono)", fontSize:8, color:"var(--mut2)", lineHeight:2 }}>
              <div>Sepolia Testnet · Pre-Launch</div>
              <div>Mainnet Pending Security Audit</div>
              <div>Incorporating: India (MCA)</div>
              <div>CIN: Pending incorporation</div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 ETHERTRACK TECHNOLOGIES PRIVATE LIMITED · MADE WITH 🌿 IN INDIA</div>
          <div className="footer-socials">
            <a href="https://www.instagram.com/ethertrack.in/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
            <a href="https://www.linkedin.com/company/ethertrack-technologies-private-limited/" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
            <a href="https://x.com/EtherTrack" target="_blank" rel="noopener noreferrer">TWITTER / X</a>
          </div>
        </div>
      </footer>
    </>
  );
}