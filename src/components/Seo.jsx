import { Helmet } from "react-helmet-async";

const SITE_URL = "https://ethertrack.in";

const navigationItems = [
  { name: "Platform", url: "/platform" },
  { name: "Solutions", url: "/solutions" },
  { name: "Industries", url: "/industries" },
  { name: "Blogs", url: "/blogs" },
  { name: "About", url: "/about" },
  { name: "Careers", url: "/careers" },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}#organization`,
  name: "EtherTrack Technologies Private Limited",
  alternateName: "EtherTrack",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sameAs: [
    "https://www.linkedin.com/company/ethertrack-technologies-private-limited/",
    "https://x.com/EtherTrack",
    "https://www.instagram.com/ethertrack_official/",
  ],
  email: "support@ethertrack.in",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
  },
  foundingDate: "2026-07-13",
  knowsAbout: [
    "Carbon Credit Trading",
    "Blockchain Technology",
    "GHG Protocol",
    "SEBI BRSR Compliance",
    "India CCTS",
    "Ethereum Smart Contracts",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "EtherTrack",
  alternateName: "EtherTrack Carbon Infrastructure",
  url: SITE_URL,
  description: "India's blockchain-native carbon infrastructure platform. Track emissions, trade carbon credits on a live order book, retire on-chain, and generate BRSR, CDP, TCFD, GRI, and GHG Protocol reports.",
  publisher: {
    "@id": `${SITE_URL}#organization`,
  },
};

const navigationSchema = {
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  name: "Main Navigation",
  "@id": `${SITE_URL}#navigation`,
  navigationItems: navigationItems.map(item => ({
    "@type": "ListItem",
    position: navigationItems.indexOf(item) + 1,
    item: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${item.url}#page`,
      name: item.name,
      url: `${SITE_URL}${item.url}`,
    },
  })),
};

export default function Seo({ title, description, path, type = "WebPage", noindex = false, ogImage }) {
  const canonicalUrl = `${SITE_URL}${path === "/" ? "" : path}`;
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${canonicalUrl}#page`,
    name: title,
    description: description,
    url: canonicalUrl,
    isPartOf: { "@id": `${SITE_URL}#website` },
    publisher: { "@id": `${SITE_URL}#organization` },
    mainEntityOfPage: { "@id": `${canonicalUrl}#page` },
  };

  const ogImageUrl = ogImage ? `${SITE_URL}${ogImage}` : `${SITE_URL}/logo.png`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type === "BlogPosting" ? "article" : "website"} />
      <meta property="og:site_name" content="EtherTrack" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:image" content={ogImageUrl} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            organizationSchema,
            websiteSchema,
            navigationSchema,
            pageSchema,
          ],
        })}
      </script>
    </Helmet>
  );
}