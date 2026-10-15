import dashboardImg from "./assets/dashboard.png";
import portfolioImg from "./assets/portfolio.png";
import marketImg from "./assets/market.png";
import carbonIntelligenceImg from "./assets/carbonintelligence.png";
import walletImg from "./assets/wallet.png";

/* ─── DATA ─────────────────────────────────────────────────────── */

export const STATS = [
  {
    num: "70+",
    lbl: "EMISSION FACTORS · DEFRA 2024 / CEA V20.0",
    src: "All 15 GHG Protocol Scope 3 categories. Updated Dec 2024.",
    color: "var(--grn)",
  },
  {
    num: "490",
    lbl: "CCTS-MANDATED ENTITIES FROM FY2026",
    src: "Source: BEE / MoP gazette notification, Jan 2026",
    color: "var(--org)",
  },
  {
    num: "0.5–1.5%",
    lbl: "TIERED PLATFORM FEE — HARDCODED IN SMART CONTRACT",
    src: "Verifiable on Etherscan. No hidden charges, ever.",
    color: "var(--blu)",
  },
  {
    num: "5",
    lbl: "REGULATORY REPORTS — ONE CLICK EACH",
    src: "BRSR Core · CDP Climate · TCFD · GRI · GHG Protocol ISO 14064-1",
    color: "var(--vio)",
  },
];

export const GAPS = [
  {
    tabLabel: "PRICE DISCOVERY",
    problem: "Carbon prices in India are set by brokers, not markets",
    problemDesc: "Today, two Indian companies buying identical Verra credits in the same week can pay prices 40% apart — because every deal is negotiated bilaterally by email. There is no public order book. There is no price transparency. Brokers profit from that opacity, and buyers have no way to know if they're getting a fair deal.",
    tagP: "tp", tagS: "ts",
    solution: "A live double-sided on-chain order book",
    solutionDesc: "EtherTrack's order book shows every bid, every ask, the spread, and full market depth — visible to every participant simultaneously. When your order matches, it settles on Ethereum. The price is set by the market, the record is permanent, and no broker can manipulate either.",
    facts: [
      "Every bid and ask visible to all participants in real time",
      "Price determined by the market — no intermediary markup",
      "Every matched trade settled on Ethereum and visible on Etherscan",
    ],
    tagLabel: "ETHERTRACK SOLUTION",
  },
  {
    tabLabel: "INTEGRATED WORKFLOW",
    problem: "Emissions, credits, and reports live in three different places",
    problemDesc: "The average Indian compliance team uses Excel for emissions, a broker for credits, and a consultant for ESG reports. Three vendors. Three invoices. Three chances for a number to get lost between them. When the SEBI deadline arrives, they spend three weeks assembling data that should have been one click.",
    tagP: "tp", tagS: "ts-star",
    solution: "The complete carbon loop — start to finish, one platform",
    solutionDesc: "Log an emission entry → your credit gap updates instantly → buy the credits without leaving the dashboard → retire on-chain → download your BRSR PDF. Every step feeds the next. No spreadsheets, no consultants, no reconciliation. This end-to-end workflow does not exist anywhere else for Indian compliance requirements.",
    facts: [
      "Emissions → gap → purchase → retirement → report in one session",
      "70+ emission factors · DEFRA 2024 · CEA V20.0 0.727 tCO₂/MWh",
      "All data syncs across every module in real time — zero reconciliation",
    ],
    tagLabel: "OUR CORE DIFFERENTIATOR",
  },
  {
    tabLabel: "DOUBLE COUNTING",
    problem: "Retirement records stored in private databases can be altered",
    problemDesc: "On every existing Indian carbon platform, retirement records live in a private SQL database controlled by that company. There is no public URL to verify a retirement. An auditor who wants to confirm a credit was actually retired must contact the platform and trust their response. That is not verification — it is faith.",
    tagP: "tp", tagS: "ts",
    solution: "On-chain burn to 0x000…000 — permanent, public, provable",
    solutionDesc: "When you retire a credit on EtherTrack, the token is sent to the Ethereum null address — 0x000...000. It cannot be recovered by anyone, including us. An ISO 14064-3 certificate is generated with a QR code that resolves directly to the public Etherscan record. Any auditor, any assessor, anywhere in the world, verifies it in seconds without creating an account.",
    facts: [
      "Token burned to 0x000...000 — unrecoverable by anyone, including EtherTrack",
      "ISO 14064-3 certificate with direct public Etherscan verification link",
      "TX hash automatically embedded in every BRSR, CDP, and TCFD export",
    ],
    tagLabel: "ETHERTRACK SOLUTION",
  },
  {
    tabLabel: "CCTS TOOLING",
    problem: "490 entities face CCTS from FY2026 with nowhere purpose-built to trade",
    problemDesc: "India's Carbon Credit Trading Scheme mandates compliance for 490 entities across 9 gazetted sectors starting FY2026. GEI calculation under the gazette formula is non-trivial. Most existing platforms were built for voluntary markets — they do not track BEE methodologies, calculate GEI, distinguish CCC from VCU credits, or enforce the ₹600–₹1,200 CCTS price band.",
    tagP: "tp", tagS: "ts",
    solution: "The only platform built for CCTS from the ground up",
    solutionDesc: "EtherTrack enforces the ₹600–₹1,200 CCTS price band at the smart contract level — no override possible. All 8 BEE-approved methodologies are supported. GEI is calculated using the gazette Scope 1 + Scope 2 formula. CCC and VCU credits are tracked separately. GSTIN and CIN are linked on-chain to every trade for full regulatory traceability.",
    facts: [
      "₹600–₹1,200 CCTS price band hardcoded in Marketplace.sol — cannot be overridden",
      "GEI calculated using the official gazette formula for all 9 CCTS sectors",
      "GSTIN + CIN linked on-chain to every trade for BEE/CERC traceability",
    ],
    tagLabel: "ETHERTRACK SOLUTION",
  },
  {
    tabLabel: "MARKET ACCESS",
    problem: "Verified projects with under 10,000 credits have no viable exit",
    problemDesc: "Every major carbon broker in India imposes minimum order sizes — typically 10,000 credits or more. A rural solar plant with 300 verified Verra credits cannot find a buyer through conventional channels. Its credits expire worthless. Meanwhile, the companies that need those credits have no way to find them. The market fails both sides simultaneously.",
    tagP: "tp", tagS: "ts",
    solution: "Hybrid AMM — any project, any size, instant liquidity",
    solutionDesc: "Orders of 100 credits or fewer execute instantly against EtherTrack's AMM liquidity pool, 24 hours a day, 7 days a week — no counterparty required, no wait. Orders above 100 credits are automatically routed to the live order book. A 50-credit rural cookstove project has the same market access as a 50,000-credit industrial portfolio.",
    facts: [
      "Orders ≤100 credits execute instantly via AMM — 24/7, no counterparty",
      "Orders >100 credits auto-route to the live order book for best price",
      "No minimum order size. No broker. No wait.",
    ],
    tagLabel: "ETHERTRACK SOLUTION",
  },
  {
    tabLabel: "REPORTING COSTS",
    problem: "Indian companies spend ₹5–15 lakh a year on ESG report consultants",
    problemDesc: "CDP Climate, BRSR Core, TCFD, GRI, and GHG Protocol each require a different format, different calculations, and — typically — a different consultant. The average Indian listed company assembles these reports manually across six weeks, at a cost that makes the exercise prohibitive for most MSMEs. The result: most Indian companies either file nothing or file late.",
    tagP: "tp", tagS: "ts",
    solution: "Five audit-ready regulatory reports — one click, zero consultants",
    solutionDesc: "Because EtherTrack already holds your emission logs, credit purchases, and retirement records, it can generate BRSR Core (SEBI format), CDP Climate, TCFD, GRI, and GHG Protocol (ISO 14064-1) reports automatically. CEA V20.0 2024 factors are embedded. Dual Scope 2 (location-based and market-based) is calculated simultaneously. Blockchain TX hashes are included in every export for auditor verification.",
    facts: [
      "BRSR Core · CDP Climate · TCFD · GRI · GHG Protocol — all five, one click each",
      "CEA V20.0 Dec 2024 · DEFRA 2024 · IPCC AR6 factors pre-embedded",
      "Dual Scope 2 · auditor-ready · blockchain TX hashes in every PDF",
    ],
    tagLabel: "ETHERTRACK SOLUTION",
  },
];

export const HOW = [
  {
    n: "01",
    title: "Register & Complete KYC",
    desc: "KYC in under 10 minutes. Aadhaar/PAN hashed, never stored raw. Trading access in 1–2 business days.",
  },
  {
    n: "02",
    title: "Log Your Emissions",
    desc: "Log Scope 1, 2, and 3 manually or via bulk CSV. Auto-calculated with DEFRA 2024 and CEA V20.0 factors.",
  },
  {
    n: "03",
    title: "Credits Get Tokenised",
    desc: "Every verified credit is minted on-chain with full metadata — standard, vintage, VCS serial, SDG tags.",
  },
  {
    n: "04",
    title: "Buy or List Credits",
    desc: "Trade on the live order book, or use the AMM for instant fills under 100 credits. Pay in INR via UPI.",
  },
  {
    n: "05",
    title: "Retire On-Chain & Report",
    desc: "Retire with one click — permanently burned on-chain. Download your BRSR, CDP, TCFD, GRI, or GHG Protocol PDF instantly.",
  },
];

export const TABS = [
  { id: "dashboard",   label: "Dashboard",           url: "app.ethertrack.in/dashboard",          badge: "TESTNET", imgSrc: dashboardImg },
  { id: "portfolio",   label: "Portfolio",            url: "app.ethertrack.in/portfolio",          badge: "TESTNET", imgSrc: portfolioImg },
  { id: "market",      label: "Market",               url: "app.ethertrack.in/exchange",           badge: "TESTNET", imgSrc: marketImg },
  { id: "carbonintel", label: "Carbon Intelligence",  url: "app.ethertrack.in/carbon-intelligence", badge: "TESTNET", imgSrc: carbonIntelligenceImg },
  { id: "wallet",      label: "Wallet",               url: "app.ethertrack.in/wallet",             badge: "TESTNET", imgSrc: walletImg },
];

export const PRICING = [
  {
    tier: "FREE", name: "Free", tag: "Start exploring today",
    desc: "Ideal for individuals, students, and companies that want to understand carbon trading before committing.",
    price: "₹0", period: "/yr", gst: null, save: null,
    fee: "1.50%", seats: "1 seat", popular: false,
    platformFeeNote: "Platform fee on trades",
    locked: ["Portfolio management", "List & sell credits", "Credit retirement", "Portfolio export", "Emission tracking", "Compliance dashboard", "Team management"],
    unlocked: ["Buy credits from the marketplace", "Browse live listings & real-time prices", "On-chain transaction receipt", "Basic carbon footprint calculator", "Wallet & trading history", "Email support"],
    cta: "Get Started", solid: false,
  },
  {
    tier: "STARTER", name: "Starter", tag: "For active traders",
    desc: "Freelancers, ESG consultants, small NGOs, and active credit traders who need the full marketplace experience.",
    price: "Base price", period: "/yr", gst: "+ 18% GST", save: "Set via etpl_ops",
    fee: "1.00%", seats: "3 seats", popular: false,
    platformFeeNote: "Platform fee on trades",
    locked: ["Emission tracking (Growth+)", "Compliance dashboard (Corporate)", "Team management (Corporate)"],
    unlocked: ["Everything in Free", "Full portfolio management", "List & sell credits on the marketplace", "On-chain credit retirement", "Portfolio export (CSV)", "Blockchain audit trail PDF", "3 seats included", "Priority email support"],
    cta: "Get Started", solid: false,
  },
  {
    tier: "GROWTH", name: "Growth", tag: "Most popular",
    desc: "MSMEs, growing businesses, and serious ESG teams that need full GHG tracking and regulatory reporting.",
    price: "Base price", period: "/yr", gst: "+ 18% GST", save: "Set via etpl_ops",
    fee: "0.75%", seats: "10 seats", popular: true,
    platformFeeNote: "Platform fee on trades",
    locked: ["Compliance dashboard (Corporate)", "Team management (Corporate)", "BRSR/CDP/TCFD/GRI reports (Corporate)"],
    unlocked: ["Everything in Starter", "Scope 1 + 2 full tracking", "Basic Scope 3 (5 categories)", "GHG inventory ledger", "CSV export + analytics dashboard", "Carbon intensity metrics", "Basic decarbonisation scenarios", "GHG Protocol PDF report", "10 seats included", "Chat support"],
    cta: "Get Started", solid: true,
  },
  {
    tier: "CORPORATE", name: "Corporate", tag: "For listed companies",
    desc: "SEBI-listed companies, BRSR filers, large ESG teams, and organisations with CDP/TCFD obligations.",
    price: "Starting from", period: "/yr", gst: "+ 18% GST", save: "Set via etpl_ops",
    fee: "0.50%", seats: "Unlimited seats", popular: false,
    isStartingFrom: true,
    platformFeeNote: "Platform fee on trades",
    locked: [],
    unlocked: [
      "Everything in Growth",
      "Full Scope 3 — all 15 GHG Protocol categories",
      "BRSR Core · CDP Climate · TCFD · GRI · GHG Protocol PDF exports",
      "Blockchain audit trail + verifier integration",
      "BV, DNV, EY, Deloitte, TÜV SÜD, BSI, KPMG supported",
      "GEI / BEE CCTS compliance module",
      "PAT scheme + CCTS Forms A–E2",
      "5-year science-based decarbonisation plan",
      "MRV calendar + SBTi target setting",
      "Supplier data portal",
      "Multi-entity consolidation",
      "Carbon neutrality certificate",
      "Regulatory deadline alerts",
      "Custom seats · custom pricing",
    ],
    cta: "Contact Sales", solid: false,
  },
];

export const TL = [
  {
    cls: "done", yr: "2022", tag: "ts", tagLbl: "ENACTED",
    title: "Energy Conservation Amendment Act",
    desc: "Parliament enacted the legal foundation for India's mandatory carbon market — the single most significant climate legislation in Indian history. Without it, CCTS cannot exist.",
  },
  {
    cls: "done", yr: "Jun 2023", tag: "ts", tagLbl: "NOTIFIED",
    title: "CCTS Framework Notified by Ministry of Power",
    desc: "Nine sectors. GEI-based compliance targets. CERC as market regulator. BEE as the technical standard-setter. The architecture of India's carbon market is now legally defined.",
  },
  {
    cls: "done", yr: "FY2023–24", tag: "ts", tagLbl: "MANDATORY",
    title: "SEBI BRSR Core Becomes Mandatory",
    desc: "India's top 1,000 listed companies are now legally required to obtain third-party assurance on GHG disclosures — on par with a financial audit. Penalties for non-compliance apply.",
  },
  {
    cls: "done", yr: "Dec 2024", tag: "ts", tagLbl: "PUBLISHED",
    title: "CEA V20.0 Grid Emission Factor Updated",
    desc: "India's official grid emission factor updated to 0.727 tCO₂/MWh. EtherTrack's GHG engine was updated the same day — every Scope 2 calculation reflects the current legal factor.",
  },
  {
    cls: "upcoming", yr: "Jan 2026", tag: "tp", tagLbl: "ACTIVE NOW",
    title: "490 Entities Mandated + CBAM Full Enforcement Begins",
    desc: "The demand side of India's carbon market activates. Simultaneously, Indian exporters of steel, aluminium, and cement begin paying the full EU carbon border adjustment — making export competitiveness directly dependent on verified decarbonisation.",
  },
  {
    cls: "upcoming", yr: "Mid 2026", tag: "tp", tagLbl: "IMMINENT",
    title: "Indian Carbon Market Portal Live — First CCC Trades Expected",
    desc: "Grid-India's ICM registry (Prakriti 2026, New Delhi) goes live with CERC as trading regulator. The first Carbon Credit Certificates are expected to trade mid-2026. EtherTrack's Grid-India registry sync is already built.",
  },
];

export const MQ_ITEMS = [
  { dot: "var(--org)", text: "SEPOLIA TESTNET LIVE — ALL MODULES OPERATIONAL" },
  { text: "70+ EMISSION FACTORS · DEFRA 2024 · CEA V20.0 2024" },
  { dot: "var(--grn)", text: "CONFIGURABLE PLATFORM FEE · PER TIER · SET VIA ERP" },
  { text: "BRSR CORE · CDP CLIMATE · TCFD · GRI · GHG PROTOCOL" },
  { dot: "var(--org)", text: "490 ENTITIES MANDATED · CCTS FY2026" },
  { text: "VCS · GOLD STANDARD · CDM · ACR · BEE CCTS" },
  { text: "ISO 14064-3 RETIREMENT CERTIFICATES · ETHERSCAN VERIFIABLE" },
  { dot: "var(--grn)", text: "ETHEREUM BLOCKCHAIN · MARKETPLACE.SOL · HYBRID AMM" },
];

export const SOLUTIONS = [
  {
    icon: "🏢",
    audience: "FOR SEBI-LISTED & CORPORATE FILERS",
    title: "Your BRSR Core, CDP, and TCFD reports — without the consultant",
    pain: "Third-party assured BRSR Core is now a legal requirement for India's top 1,000 listed companies. Most still pay ₹5–15 lakh a year to assemble data that sits in six different spreadsheets across four departments. EtherTrack replaces that entire process.",
    fits: [
      "Full GHG inventory across all 3 scopes and all 15 Scope 3 categories",
      "BRSR Core, CDP, TCFD, GRI, and GHG Protocol PDFs generated in one click",
      "Audit trail + verifier integration for BV, DNV, EY, Deloitte, KPMG",
      "Blockchain TX hashes embedded in every export for SEBI assessors",
    ],
    cta: "Talk to Sales",
  },
  {
    icon: "🌱",
    audience: "FOR MSMEs & GROWING BUSINESSES",
    title: "Track, offset, and report — without hiring a sustainability team",
    pain: "Most Indian MSMEs have no formal carbon tracking. EU buyers, domestic lenders, and supply-chain partners are starting to ask for emissions data — and CCTS compliance deadlines are approaching. EtherTrack makes compliance achievable without a dedicated team.",
    fits: [
      "Scope 1 + 2 full tracking with Scope 3 across 5 categories",
      "Bulk CSV import — onboard 2,000 emission records in minutes",
      "GHG Protocol PDF report included on the Growth plan",
      "Chat support and 10 seats — enough for most MSME sustainability teams",
    ],
    cta: "See Growth Plan",
  },
  {
    icon: "♻️",
    audience: "FOR CARBON PROJECT DEVELOPERS",
    title: "Sell your verified credits directly — no broker, no minimum",
    pain: "Indian brokers typically require 10,000+ credit minimums. A rural solar plant with 300 verified Verra credits has no viable exit. EtherTrack's AMM gives any project — regardless of size — immediate, 24/7 liquidity.",
    fits: [
      "AMM pool executes orders of 100 credits or fewer instantly — 24/7",
      "List directly on the order book with no broker or intermediary",
      "On-chain tokenisation with full VCS serial, vintage, and SDG metadata",
      "Transparent public price discovery — buyers can find you independently",
    ],
    cta: "List Your Credits",
  },
  {
    icon: "🧮",
    audience: "FOR ESG CONSULTANTS & ADVISORS",
    title: "Scale your practice without scaling your headcount",
    pain: "Managing multiple clients' emissions data across email threads and Excel files caps how many clients you can serve profitably. EtherTrack gives each client their own structured environment — and you a single dashboard across all of them.",
    fits: [
      "Starter plan designed for multi-client portfolio management",
      "Blockchain audit trail PDF for every client engagement — defensible records",
      "CSV export for easy handoff to client finance teams",
      "Priority email support and 3 seats — ideal for boutique advisory firms",
    ],
    cta: "Start on Starter",
  },
  {
    icon: "📋",
    audience: "FOR CCTS COMPLIANCE OFFICERS",
    title: "Built for the 490 — every BEE requirement, out of the box",
    pain: "GEI calculation under the gazette formula is technically specific. Most platforms weren't built for it. Finding a tool that correctly handles CCC vs VCU distinction, BEE methodology tracking, and the CCTS price band simultaneously is genuinely hard.",
    fits: [
      "GEI calculator built exactly to the gazette Scope 1 + Scope 2 formula",
      "All 8 BEE-approved CCTS methodologies supported out of the box",
      "Forms A–E2, ACVA verification workflow, and BEE MRV JSON export",
      "₹600–₹1,200 CCTS price band enforced at the smart contract level — no override",
    ],
    cta: "Explore CCTS Module",
  },
];

export const INDUSTRIES = [
  {
    icon: "🏭",
    title: "Iron & Steel",
    desc: "India's most CBAM-exposed sector faces a double compliance burden: GEI-based CCTS obligations domestically and verified decarbonisation data for EU export customers. EtherTrack handles both on one platform.",
    tags: ["CCTS Gazetted", "CBAM Exposed", "High Scope 1+2"],
  },
  {
    icon: "🧱",
    title: "Cement",
    desc: "Process emissions from clinker production and high grid electricity intensity make cement one of the hardest sectors to decarbonise — and one where accurate GEI tracking directly determines whether a plant is a buyer or seller of carbon credits.",
    tags: ["CCTS Gazetted", "Process Emissions", "GEI Critical"],
  },
  {
    icon: "⚙️",
    title: "Aluminium",
    desc: "Energy-intensive smelting creates among the highest Scope 2 intensities of any CCTS sector. With CBAM applying to aluminium exports from 2026, Indian producers need verified, auditor-ready emission records — not estimates.",
    tags: ["CCTS Gazetted", "CBAM Exposed", "Energy Intensive"],
  },
  {
    icon: "🛢️",
    title: "Petrochemicals & Refining",
    desc: "Multi-site operations, complex Scope 3 supply chains, and high product diversity make emissions accounting genuinely difficult. EtherTrack's 70+ factor library and bulk CSV import are built for exactly this complexity.",
    tags: ["CCTS Gazetted", "Complex Scope 3", "Multi-Site"],
  },
  {
    icon: "🧵",
    title: "Textiles",
    desc: "A CCTS-gazetted, MSME-heavy sector where EU buyers are already demanding Scope 3 supplier data — years ahead of any formal carbon-border requirement. The compliance window is narrower than most textile companies realise.",
    tags: ["CCTS Gazetted", "MSME-Heavy", "Buyer-Driven"],
  },
  {
    icon: "📄",
    title: "Pulp & Paper",
    desc: "Forestry-linked operations create genuine offset opportunities alongside mandatory CCTS reporting obligations. EtherTrack's integrated marketplace means a paper company can track, offset, and report in the same session.",
    tags: ["CCTS Gazetted", "Offset Potential"],
  },
  {
    icon: "🧪",
    title: "Fertiliser & Chlor-Alkali",
    desc: "High energy intensity and process emissions from nitrogen production place fertiliser producers among the most GEI-burdened CCTS sectors. BEE methodology compliance is non-negotiable and technically specific.",
    tags: ["CCTS Gazetted", "Process Heavy", "BEE Methodology"],
  },
  {
    icon: "🌾",
    title: "Renewable Energy & Agriculture",
    desc: "Rural solar, biogas, afforestation, and cookstove projects generate verified voluntary credits — but have historically been locked out by broker minimums. EtherTrack's AMM gives every project immediate liquidity, regardless of size.",
    tags: ["Voluntary Market", "Credit Sellers", "No Minimum"],
  },
  {
    icon: "📊",
    title: "Financial Services & ESG Advisory",
    desc: "Auditors, verifiers, brokers, and ESG consultants who use EtherTrack as shared transparent infrastructure — rather than a competitor — to serve their own clients more credibly on the same immutable data layer.",
    tags: ["Enablers", "Verifiers & Brokers", "Auditors"],
  },
];

export const WHY_NOW = [
  {
    before: "No legal authority to mandate carbon trading",
    after: "Energy Conservation (Amendment) Act 2022 created the legal foundation. CCTS notified June 2023. 490 entities mandated January 2026.",
    icon: "⚖️",
    label: "LEGAL FRAMEWORK",
    color: "var(--grn)",
  },
  {
    before: "No mandatory GHG reporting. BRSR voluntary for most companies.",
    after: "SEBI BRSR Core mandatory for top 1,000 listed companies from FY2023–24 with third-party assurance. Legally equivalent to a financial audit.",
    icon: "📋",
    label: "GHG DISCLOSURE MANDATE",
    color: "var(--vio)",
  },
  {
    before: "India grid emission factor from 2015 — 0.82 tCO₂/MWh — significantly overstated.",
    after: "CEA V20.0 December 2024 published at 0.727 tCO₂/MWh. EtherTrack updated immediately.",
    icon: "⚡",
    label: "CURRENT EMISSION FACTOR",
    color: "var(--org)",
  },
  {
    before: "Indian exporters faced no financial obligation to document embedded carbon.",
    after: "CBAM full enforcement began January 2026. Steel, aluminium, and cement exporters now face real EU customs obligations based on verified carbon content.",
    icon: "🌍",
    label: "CBAM ENFORCEMENT",
    color: "var(--blu)",
  },
  {
    before: "No INR on-ramp for blockchain carbon trading. Companies required MetaMask and ETH — a non-starter for Indian CFOs.",
    after: "Razorpay RBI-authorised payment rails allow INR deposits via UPI and Net Banking. Carbon trades settle in rupees without requiring ETH or a crypto wallet — making blockchain carbon trading accessible to any Indian company.",
    icon: "💳",
    label: "INR PAYMENT RAILS",
    color: "var(--grn)",
  },
];

export const TAM = [
  {
    segment: "India CCTS Compliance",
    now: "₹1,800–2,200 Cr/yr",
    future: "₹8,000–12,000 Cr/yr",
    year: "2030",
    role: "Trading and compliance infrastructure for 490 obligated entities",
    source: "BEE / MoEFCC estimates",
    color: "var(--grn)",
  },
  {
    segment: "SEBI BRSR Tools",
    now: "₹200–400 Cr/yr",
    future: "₹1,500 Cr/yr",
    year: "2030",
    role: "GHG tracking and regulatory report generation for top 1,000 listed companies",
    source: "SEBI circular projections",
    color: "var(--vio)",
  },
  {
    segment: "Global VCM — Asia-Pacific",
    now: "USD 600M–1B",
    future: "USD 3–5B",
    year: "2030",
    role: "India voluntary carbon credit tokenisation and exchange",
    source: "BloombergNEF",
    color: "var(--org)",
  },
  {
    segment: "PAT ESCert Trading",
    now: "₹300–500 Cr/yr",
    future: "₹2,000 Cr/yr",
    year: "2030 (CCTS merger)",
    role: "All 13 PAT sectors — ESCert to CCC transition platform",
    source: "BEE India",
    color: "var(--blu)",
  },
];

export const WHY_WIN = [
  {
    n: "01",
    title: "Regulatory Depth Barrier",
    desc: "Correctly implementing SEBI BRSR ISF Dec 2024, GHG Protocol Corporate Standard, BEE PAT rules, CCTS GEI Target Rules 2025, CDP questionnaire C4/C6/C6.5, TCFD, ISO 14064-1 and 14064-3, CEA V20.0 Dec 2024, and Indian company law validation simultaneously in one platform.",
    moat: "A new entrant needs to learn, map, and implement all of these correctly before writing a single line of product code. One wrong emission factor or Scope 3 boundary invalidates the compliance output. EtherTrack has implemented and tested every requirement.",
    icon: "⚖️",
    color: "var(--grn)",
  },
  {
    n: "02",
    title: "Integrated Workflow Switching Costs",
    desc: "Each annual BRSR cycle completed on EtherTrack creates compounding lock-in. Emission baseline on-chain. Audit trail on-chain. Retirement certificates with Etherscan TX hashes already accepted by the company auditor. BRSR PDF already submitted to SEBI.",
    moat: "Switching mid-cycle means losing on-chain audit trail continuity, asking auditors to accept a new verification method, and re-entering two years of emission history. The switching cost compounds with every compliance cycle completed.",
    icon: "🔗",
    color: "var(--vio)",
  },
  {
    n: "03",
    title: "Blockchain Verification as Structural Property",
    desc: "Any auditor verifies any EtherTrack retirement on Etherscan using only the TX hash or the QR code on the certificate. No login. No EtherTrack account. No API call to our servers. The record exists independently of EtherTrack.",
    moat: "Moving to a comparable model would represent a substantial architectural shift for a centralised platform — not an incremental feature addition. It requires rebuilding the data layer from scratch.",
    icon: "⛓️",
    color: "var(--org)",
  },
  {
    n: "04",
    title: "Two-Sided Network Effects",
    desc: "More project developers listed attracts more corporate buyers — better inventory, better prices. More corporate buyers attracts more project developers — better liquidity, faster sales. Classic marketplace compounding dynamics.",
    moat: "Network effects require the network to exist first. A competitor starting today starts from zero on both sides, with no structural advantage to offer either side while EtherTrack already has both.",
    icon: "🔄",
    color: "var(--blu)",
  },
  {
    n: "05",
    title: "CERC Recognition First-Mover",
    desc: "The CERC Permitted Entity application process under Section 9(3) of CERC CCC Regulations 2026 is estimated at 12–24 months. EtherTrack starts that process with a fully built, technically compliant platform. The CCTS price band is already enforced in Marketplace.sol.",
    moat: "A competitor entering this space would need to build both technical infrastructure and regulatory engagement capabilities simultaneously — starting from a position EtherTrack has already moved past.",
    icon: "🏛️",
    color: "var(--grn)",
  },
  {
    n: "06",
    title: "India-Specific Architecture",
    desc: "CEA V20.0 Dec 2024 at exactly 0.727 tCO₂/MWh. SEBI BRSR Core P6-E2/E3/E4 field structure. BEE Form 1 CSV export. CCTS GEI gazette formula. Section 194S TDS on VDA withdrawals. Razorpay UPI/Net Banking INR rails. All tested, not documented.",
    moat: "A foreign competitor entering India faces substantial compliance mapping before building anything. An Indian competitor starting today faces the same build effort EtherTrack has already completed and confirmed working on testnet.",
    icon: "🇮🇳",
    color: "var(--org)",
  },
];

export const TECH_STACK = [
  {
    layer: "BLOCKCHAIN",
    items: [
      { name: "Ethereum Sepolia (Testnet) → Polygon (Mainnet)", detail: "Production-identical testnet. All contracts deployed and Etherscan-verified on Sepolia." },
      { name: "Marketplace.sol", detail: "Order book, 0.5% fee deduction, atomic settlement. CCTS price band enforced." },
      { name: "AMM Pool", detail: "x·y=k constant product. Instant execution up to 100 credits, 24/7." },
      { name: "KYC Registry", detail: "On-chain wallet credentialing. Duplicate identity rejected at hash level." },
      { name: "Carbon Credit ERC Token", detail: "Mint, transfer, burn. Full metadata: vintage, serial, SDG, Art.6.2, CBAM." },
      { name: "Retirement Burn", detail: "Irreversible destroy to 0x000...000 + event emit. Cannot be reversed by anyone." },
    ],
    color: "var(--grn)",
    icon: "⛓️",
  },
  {
    layer: "SECURITY",
    items: [
      { name: "Gnosis Safe 2-of-3 Multi-sig", detail: "No single person controls the admin key. 2 of 3 signers required for all admin calls." },
      { name: "Cloudflare WAF + DDoS", detail: "Web Application Firewall, global CDN, SSL, and DDoS protection." },
      { name: "HMAC-SHA256 Payment Verification", detail: "Server-side Razorpay signature verification on every INR transaction." },
      { name: "SHA-256 Hash Chain", detail: "Every emission log hash-chained. Any tampering breaks the chain and is detected." },
    ],
    color: "var(--red)",
    icon: "🔐",
  },
  {
    layer: "INFRASTRUCTURE",
    items: [
      { name: "React on Vercel Pro", detail: "CI/CD on every GitHub push. Global CDN. Web Vitals monitoring." },
      { name: "Node.js + Express on Railway Pro", detail: "RESTful API. Auto-deploy from GitHub. Handles business logic and blockchain event indexing." },
      { name: "PostgreSQL on Supabase", detail: "Atomic transactions for all INR operations. Balance before/after recorded per transaction." },
      { name: "Alchemy Ethereum RPC", detail: "300M compute units/month. Webhook support for on-chain event monitoring." },
      { name: "Pinata IPFS", detail: "KYC documents, tokenisation proofs, and retirement certificates. Immutable and decentralised." },
      { name: "Firebase Auth", detail: "Email/password, Google OAuth. Phone OTP for KYC. KYC expiry auto-suspends trading." },
    ],
    color: "var(--blu)",
    icon: "🖥️",
  },
  {
    layer: "PAYMENTS & DATA",
    items: [
      { name: "Razorpay — RBI Authorised", detail: "UPI (0% fee), Net Banking (2% + GST). INR deposits and NEFT/IMPS withdrawal." },
      { name: "Section 194S TDS Auto-deduction", detail: "1% TDS auto-deducted on VDA withdrawals. ITNS Challan 281 compliant." },
      { name: "CoinGecko Price Feed", detail: "Live ETH/INR rate. 60-second cache. Slippage guard on every trade settlement." },
    ],
    color: "var(--vio)",
    icon: "💳",
  },
];

export const FOUNDER_DOMAINS = [
  {
    domain: "Carbon Market Regulation",
    icon: "📋",
    color: "var(--grn)",
    items: [
      "GHG Protocol Scope 1 + 2 + 3 — all 15 categories",
      "SEBI BRSR Core — P6-E2/E3/E4 field structure",
      "BEE PAT scheme — ESCert calculation and BEE Form 1",
      "CCTS GEI compliance — gazette formula, all 9 sectors",
      "CDP Climate — C4/C6/C6.5 questionnaire mapping",
      "TCFD four-pillar disclosure",
      "GRI Standards — universal sustainability reporting",
      "ISO 14064-3 retirement certification",
      "CEA V20.0 Dec 2024 · DEFRA 2024 · IPCC AR6 GWP100",
    ],
  },
  {
    domain: "Blockchain Engineering",
    icon: "⛓️",
    color: "var(--vio)",
    items: [
      "7 smart contracts — deployed and Etherscan-verified",
      "Marketplace.sol — order book, fee deduction, atomic settlement",
      "AMM Pool — x·y=k constant product formula",
      "KYC Registry — on-chain wallet credentialing",
      "Carbon Credit ERC Token — mint, transfer, burn",
      "Retirement Burn — irreversible destroy + event emit",
      "Gnosis Safe 2-of-3 multi-sig admin key",
    ],
  },
  {
    domain: "Full-Stack Product Engineering",
    icon: "🖥️",
    color: "var(--org)",
    items: [
      "React frontend on Vercel Pro — CI/CD, global CDN",
      "Node.js + Express API on Railway Pro",
      "PostgreSQL — atomic INR balance transactions",
      "Firebase Auth — email, Google OAuth, phone OTP",
      "Alchemy Ethereum RPC — 300M compute units/month",
      "Pinata IPFS — KYC, tokenisation, certificate storage",
      "Razorpay UPI/Net Banking deposits + NEFT withdrawals",
      "CoinGecko price feed with slippage guard",
    ],
  },
];