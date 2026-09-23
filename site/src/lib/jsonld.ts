// jsonld.ts: the site-wide structured-data graph. Every page emits exactly one
// <script type="application/ld+json"> (Seo.astro renders it in the head); this
// module builds the two nodes that hold on every page — the Organization behind
// the site and the WebSite itself — and merges whatever a page contributes into
// that same @graph, so no component ever emits a second block.
//
// Person nodes are minimal: name plus any known url / sameAs. Never jobTitle or
// worksFor — nothing is claimed that data/site.ts does not state.
import { site } from '../data/site';

/** Page-level JSON-LD as a page may pass it: one node, a list, or a @graph. */
export type JsonLdInput = Record<string, unknown> | unknown[];

/** The canonical origin with its trailing slash, e.g. `https://example.com/`. */
const origin = new URL('/', site.url).href;

/** Stable @ids other nodes reference (`publisher`, `isPartOf`, `creator`). */
export const ORG_ID = `${site.url}/#org`;
export const WEBSITE_ID = `${site.url}/#website`;

/** `AI Governance Engineer` -> `ai-governance-engineer`, for Person @ids. */
function personSlug(name: string): string {
  return name
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Person nodes for the site's authors, @id'd on the canonical origin so the
 * same identity is referenced from every page's graph.
 */
export const authorNodes: readonly Record<string, unknown>[] = site.authorDetails.map(
  (author) => ({
    '@type': 'Person',
    '@id': `${site.url}/#person-${personSlug(author.name)}`,
    name: author.name,
    ...(author.url ? { url: author.url } : {}),
    ...(author.sameAs && author.sameAs.length ? { sameAs: [...author.sameAs] } : {}),
  }),
);

/** References to `authorNodes`, for an `author` / `creator` property. */
export const authorRefs: readonly { '@id': string }[] = authorNodes.map((person) => ({
  '@id': person['@id'] as string,
}));

// The site's own presences: the project repository plus the profile links the
// site already states for its authors. Nothing invented — every URL comes from
// data/site.ts.
const orgSameAs = [
  site.github,
  ...site.authorDetails.flatMap((author) => [
    ...(author.url ? [author.url] : []),
    ...(author.sameAs ?? []),
  ]),
].filter((url, i, all) => all.indexOf(url) === i);

// The logo is the 180x180 PNG the site already serves for the home-screen icon;
// it is a real, rasterised mark, which Organization.logo requires (an SVG
// favicon is not accepted by most consumers).
const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: site.name,
  url: origin,
  description: site.description,
  logo: {
    '@type': 'ImageObject',
    url: new URL('/apple-touch-icon.png', site.url).href,
    width: 180,
    height: 180,
  },
  ...(orgSameAs.length ? { sameAs: orgSameAs } : {}),
};

// No potentialAction/SearchAction: search is a Pagefind dialog available on every
// page (components/SearchDialog.astro), not a route that accepts a query string.
const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: origin,
  name: site.name,
  description: site.description,
  inLanguage: 'en',
  publisher: { '@id': ORG_ID },
};

/** A copy of `node` without its own `@context` (the graph carries one). */
function stripContext(node: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(node).filter(([key]) => key !== '@context'));
}

/** Flatten page JSON-LD — a node, a list or a nested @graph — into bare nodes. */
function nodesOf(input?: JsonLdInput): Record<string, unknown>[] {
  if (!input) return [];
  if (Array.isArray(input)) return input.flatMap((node) => nodesOf(node as JsonLdInput));
  const node = input as Record<string, unknown>;
  const graph = node['@graph'];
  if (Array.isArray(graph)) return graph.flatMap((child) => nodesOf(child as JsonLdInput));
  const bare = stripContext(node);
  return Object.keys(bare).length ? [bare] : [];
}

/**
 * The single @graph a page emits: Organization and WebSite first, then the
 * page's own nodes. Nodes repeating an `@id` already in the graph are dropped
 * (first wins), so a page may reference ORG_ID / WEBSITE_ID freely.
 */
export function siteGraph(pageJsonLd?: JsonLdInput): Record<string, unknown> {
  const seen = new Set<string>();
  const graph = [organization, website, ...nodesOf(pageJsonLd)].filter((node) => {
    const id = node['@id'];
    if (typeof id !== 'string') return true;
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
  return { '@context': 'https://schema.org', '@graph': graph };
}
