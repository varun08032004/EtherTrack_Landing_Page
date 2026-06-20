import { Helmet } from "react-helmet-async";

const SITE_URL = "https://ethertrack.in";

/**
 * Drop this at the top of every page component.
 * `path` must match the route exactly, e.g. "/", "/platform", "/solutions".
 * This sets a canonical link so Google consolidates all indexing signals
 * onto this one URL — no www vs non-www, no trailing-slash, no query-param duplicates.
 */
export default function Seo({ title, description, path }) {
  const canonicalUrl = `${SITE_URL}${path === "/" ? "" : path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="EtherTrack" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}