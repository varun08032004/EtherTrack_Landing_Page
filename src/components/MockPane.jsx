export default function MockPane({ id }) {
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