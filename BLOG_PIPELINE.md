# EtherTrack Blog Pipeline
> How to go from topic idea → live published blog. Every time.

---

## The File Structure

```
src/
├── data/
│   ├── blogsRegistry.js              ← Add one import line per blog
│   └── blogs/
│       ├── what-are-carbon-credits.json    ← Blog #1 (live)
│       ├── how-carbon-trading-works.json   ← Blog #2 (when ready)
│       └── ...
├── pages/
│   ├── Insights.jsx                  ← Blog listing page (never edit)
│   └── BlogPost.jsx                  ← Blog renderer (never edit)
```

---

## Publishing a New Blog — 4 Steps

### Step 1: Copy the template
Copy `BLOG_TEMPLATE.json` and rename it to your slug:
```
cp BLOG_TEMPLATE.json src/data/blogs/your-blog-slug.json
```

### Step 2: Fill in the JSON
Open the new file. Fill every field. Rules:
- Paragraphs in `content` fields: separate with `\n\n` (not actual line breaks)
- Never leave placeholder text in — fill every field or remove it
- `slug` must match the filename (without `.json`)
- `publishedDate` format: `YYYY-MM-DD`
- `readingTime`: count words ÷ 200, round up, add " min"
- `status` in relatedArticles: `"published"` if the slug exists, `"upcoming"` if not

### Step 3: Register it
Open `src/data/blogsRegistry.js` and add two lines:

```js
// Line 1 — import at the top (with the other imports)
import yourBlogSlug from "./blogs/your-blog-slug.json";

// Line 2 — add to the BLOGS array
export const BLOGS = [
  whatAreCarbonCredits,
  yourBlogSlug,          // ← add here
];
```

**Blogs appear on /insights in the order they're listed in BLOGS.**
Put newest first.

### Step 4: Test locally, then push
```bash
npm run dev
# Check /insights → your article should appear
# Check /insights/your-blog-slug → full article renders

git add .
git commit -m "blog: publish 'Your Blog Title'"
git push
```
Vercel auto-deploys. Done.

---

## Supported Content Block Types

Add any of these inside a `section` object:

| Field | What renders | When to use |
|---|---|---|
| `content` | Flowing prose paragraphs | Every section — the main text |
| `infoBox` | Coloured callout box | Definitions, warnings, key points |
| `table` | Styled data table | Comparisons, data, sector lists |
| `mythVsFact` | Side-by-side myth/fact grid | Debunking common misconceptions |
| `caseStudy` | Structured case study card | Real or representative examples |
| `items` (array) | Numbered key takeaways | Final section summarising article |
| `diagramDescription` | Text description of a diagram | Placeholder until diagram is made |

You can combine multiple blocks in one section — e.g. `content` + `infoBox` + `table` all in the same section object.

---

## Info Box Types

| type | Colour | Use for |
|---|---|---|
| `definition` | Green | Defining a term |
| `process` | Blue | Explaining a process or steps |
| `important` | Orange | Things reader must not miss |
| `warning` | Yellow | Caveats, nuances |
| `alert` | Red | Regulatory deadlines, compliance urgency |
| `critical` | Red | Hard rules, things that cannot be ignored |
| `cta-soft` | Green | Soft product mention within an article |

---

## Blog Quality Checklist (before publishing)

- [ ] `slug` matches filename and `canonicalUrl`
- [ ] `metaTitle` is under 60 characters
- [ ] `metaDescription` is under 155 characters and includes `focusKeyword`
- [ ] `publishedDate` is set correctly
- [ ] `readingTime` is accurate
- [ ] Introduction has no bullet points — flowing prose only
- [ ] Every section has `id` and `heading`
- [ ] `tableOfContents` entries match section `heading` values exactly
- [ ] All `\n\n` separators are escaped correctly in JSON
- [ ] `relatedArticles` have correct `status` values
- [ ] `references` have real, verifiable URLs
- [ ] `heroImage.imagePrompt` is filled in (for generating the image separately)
- [ ] CTA `headline` is specific to this article's topic, not generic
- [ ] No placeholder text remains in any field
- [ ] JSON is valid — paste into jsonlint.com to check before pushing

---

## Planned Blog Queue

### Priority 1 — Core Education (rank for high-volume keywords)
| # | Title | Focus Keyword | Status |
|---|---|---|---|
| 1 | What Are Carbon Credits? A Complete Beginner's Guide | what are carbon credits | ✅ Published |
| 2 | How Carbon Credit Trading Works — Order Books, AMMs, Price Discovery | how carbon credit trading works | 📝 Next |
| 3 | What Is India's Carbon Credit Trading Scheme (CCTS)? | India carbon credit trading scheme | 📝 Queue |
| 4 | Scope 1, 2, and 3 Emissions Explained for Indian Businesses | scope 1 2 3 emissions India | 📝 Queue |
| 5 | Compliance vs Voluntary Carbon Markets — Complete Comparison | compliance vs voluntary carbon market | 📝 Queue |
| 6 | What Is BRSR Core? India's Mandatory ESG Disclosure Framework | BRSR Core India | 📝 Queue |
| 7 | Carbon Credit Price in India — What Determines It in 2026? | carbon credit price India | 📝 Queue |
| 8 | What Is Additionality? The Concept Carbon Credits Depend On | additionality carbon credits | 📝 Queue |

### Priority 2 — India Regulatory Deep Dives
| # | Title | Focus Keyword | Status |
|---|---|---|---|
| 9 | BEE Designated Consumers — Is Your Facility Covered? | BEE designated consumer India | 📝 Queue |
| 10 | The 9 Sectors Under India's CCTS — Obligations, Targets, Timeline | CCTS sectors India | 📝 Queue |
| 11 | GHG Protocol vs BRSR vs CDP vs TCFD — Which Report Does What? | GHG Protocol BRSR CDP TCFD difference | 📝 Queue |
| 12 | IEX vs PXIL — Where to Trade Carbon Credits in India | IEX PXIL carbon credit trading | 📝 Queue |
| 13 | CERC Carbon Market Regulations 2024 — Plain English Guide | CERC carbon market regulations | 📝 Queue |
| 14 | GRID-India ICM Registry — How It Works and Who Needs It | GRID-India ICM carbon registry | 📝 Queue |

### Priority 3 — Industry-Specific (SEO long-tail)
| # | Title | Focus Keyword | Status |
|---|---|---|---|
| 15 | Carbon Credits for Steel Companies in India — CCTS Guide | carbon credits steel companies India | 📝 Queue |
| 16 | Carbon Credits for Cement Companies in India | carbon credits cement India | 📝 Queue |
| 17 | Carbon Credits for Fertiliser Plants — CCTS Obligations | carbon credits fertiliser India | 📝 Queue |
| 18 | How SMEs Can Participate in India's Carbon Market | carbon credits SME India | 📝 Queue |
| 19 | Net Zero for Indian Businesses — What It Actually Means | net zero India business | 📝 Queue |
| 20 | Supply Chain Decarbonisation — A Practical Guide for Indian Manufacturers | supply chain decarbonisation India | 📝 Queue |

### Priority 4 — Technical & Platform
| # | Title | Focus Keyword | Status |
|---|---|---|---|
| 21 | What Is MRV? The Backbone of Carbon Credit Credibility | MRV carbon credits | 📝 Queue |
| 22 | On-Chain Carbon Credits — Why Blockchain Improves Market Integrity | blockchain carbon credits | 📝 Queue |
| 23 | What Is ISO 14064-3? The Verification Standard Behind Retirement Certificates | ISO 14064-3 | 📝 Queue |
| 24 | What Is a Retirement Certificate for Carbon Credits? | carbon credit retirement certificate | 📝 Queue |

---

## Notes on Writing Quality

**Write like a practitioner, not a press release.**
- Use specific numbers, regulation names, dates
- Cite real sources — BEE, CERC, IPCC, Verra, GHG Protocol
- Acknowledge complexity and genuine disagreement where it exists
- Never claim "India's first" or similar superlative/first-mover language
- The credibility of the blog = the credibility of EtherTrack

**Structure every article to serve two readers simultaneously:**
1. The scanner — reads H2s, info boxes, tables, and key takeaways only
2. The deep reader — reads every word of the prose

Both should leave knowing what they came to learn.
