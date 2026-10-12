// ─── Blog Registry ────────────────────────────────────────────────────────────
// To publish a new blog:
//   1. Drop your JSON file into src/data/blogs/
//   2. Import it below
//   3. Add it to the BLOGS array
// That's it. The engine handles everything else.

import carbonMarketsExplained from "./blogs/carbon-markets-explained.json";
import whatAreCarbonCredits from "./blogs/what-are-carbon-credits.json";

// Add future blogs here ↓
// import indiaCCTS from "./blogs/what-is-india-ccts.json";
// import scope123  from "./blogs/scope-1-2-3-emissions-explained.json";

export const BLOGS = [
  carbonMarketsExplained,   // Blog #2 — newest first
  whatAreCarbonCredits,     // Blog #1
  // indiaCCTS,
  // scope123,
];

export const getBlogBySlug = (slug) =>
  BLOGS.find((b) => b.slug === slug) || null;