// ─── Blog Registry ────────────────────────────────────────────────────────────
// To publish a new blog:
//   1. Drop your JSON file into src/data/blogs/
//   2. Import it below
//   3. Add it to the BLOGS array
// That's it. The engine handles everything else.

import whatAreCarbonCredits from "./blogs/what-are-carbon-credits.json";

// Add future blogs here ↓
// import howCarbonTradingWorks from "./blogs/how-carbon-credit-trading-works.json";
// import indiaCCTS            from "./blogs/what-is-india-ccts.json";

export const BLOGS = [
  whatAreCarbonCredits,
  // howCarbonTradingWorks,
  // indiaCCTS,
];

export const getBlogBySlug = (slug) =>
  BLOGS.find((b) => b.slug === slug) || null;