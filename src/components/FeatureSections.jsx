export function ExchangeFeatures() {
  return (
    <div className="bento feat-panel">
      {/* Wide: Order Book + AMM */}
      <div className="b-card c8 reveal" style={{ border:"1px solid var(--grnd)", padding:36 }}>
        <span className="b-icon">📊</span>
        <div className="b-title">Live On-Chain Order Book + Hybrid AMM</div>
        {/* FIX: removed "The only Indian carbon marketplace" absolute claim */}
        <div className="b-desc">A live double-sided order book combined with AMM liquidity pools. Market, limit, and bid orders. ETH locked in on-chain escrow for bids. AMM pools for instant small-order execution. Auto-matching fires the moment prices cross.</div>
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

export function ComplianceFeatures() {
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
        <div className="b-desc">Every emission log, edit, credit submission, retirement, and verifier action anchored as a real Polygon transaction. SHA-256 hash-chained entries — any tampering breaks the chain. Public verifyChain() callable by anyone without login.</div>
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

export function OperationsFeatures() {
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
        <div className="b-desc">Every credit tokenised on Polygon with full metadata — Token ID, VCS serial, vintage, Art.6.2 status, SDG co-benefits, CBAM eligibility. Portfolio tracks held, listed, partially listed, retired, and pending states.</div>
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