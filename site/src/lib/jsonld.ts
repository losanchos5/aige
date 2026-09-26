// jsonld.ts: the site-wide structured-data graph. Every page emits exactly one
// <script type="application/ld+json"> (Seo.astro renders it in the head); this
// module builds the two nodes that hold on every page (the Organization behind
// the site and the WebSite itself) and merges whatever a page contributes into
// that same @graph, so no component ever emits a second block.
//
// Person nodes carry only what data/site.ts states: name, url, sameAs, and the
// jobTitle, description and knowsAbout restated from the preface. Never
// worksFor: the preface names no employer, and nothing is claimed beyond it.
import { site } from '../data/site';
import { gitDate } from './reading';

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
    ...(author.jobTitle ? { jobTitle: author.jobTitle } : {}),
    ...(author.description ? { description: author.description } : {}),
    ...(author.knowsAbout && author.knowsAbout.length
      ? { knowsAbout: [...author.knowsAbout] }
      : {}),
    ...(author.sameAs && author.sameAs.length ? { sameAs: [...author.sameAs] } : {}),
  }),
);

/** References to `authorNodes`, for an `author` / `creator` property. */
export const authorRefs: readonly { '@id': string }[] = authorNodes.map((person) => ({
  '@id': person['@id'] as string,
}));

// The site's own presences only: the project repository, from data/site.ts.
// The author's personal profiles (LinkedIn, the GitHub account) stay on the
// Person node, so engines never read the person and the project as one entity;
// the Zenodo DOIs identify the Book, not the organisation. Add the project's
// own LinkedIn Page here once data/site.ts states one.
const orgSameAs = [site.github].filter((url) => url && !url.startsWith(origin));

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
  // The site is one person's project: its sole author founded it (/about).
  ...(authorRefs.length ? { founder: authorRefs[0] } : {}),
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

/** Flatten page JSON-LD (a node, a list or a nested @graph) into bare nodes. */
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
  const nodes = [organization, website, ...nodesOf(pageJsonLd)].filter((node) => {
    const id = node['@id'];
    if (typeof id !== 'string') return true;
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
  // The Organization's `founder` (and any page's `author` or `creator`) points
  // at a Person by @id; the Person node rides in the same graph, so every
  // reference resolves on the page that makes it.
  const serialised = JSON.stringify(nodes);
  const people = authorNodes.filter((person) => {
    const id = person['@id'] as string;
    return !seen.has(id) && serialised.includes(`"@id":"${id}"`);
  });
  return { '@context': 'https://schema.org', '@graph': [...nodes, ...people] };
}

/** @id of the obligation register as a schema.org DefinedTermSet (/obligations). */
export const OBLIGATION_REGISTER_ID = `${site.url}/obligations#register`;

/** @id of the open-data catalogue as a schema.org DataCatalog (/resources/data). */
export const DATA_CATALOG_ID = `${site.url}/resources/data#catalog`;

/** @id of the Body of Knowledge as a schema.org Book (/bok and every chapter). */
export const BOOK_ID = `${site.url}/bok#book`;

/** @id of the author's profile page, a schema.org ProfilePage (/about). */
export const PROFILE_PAGE_ID = `${site.url}/about#page`;

/**
 * A DOI as a schema.org PropertyValue: `value` is the bare DOI and `url` its
 * resolver link, so a consumer can match either form.
 */
export function doiIdentifier(doi: string, description?: string): Record<string, unknown> {
  return {
    '@type': 'PropertyValue',
    propertyID: 'DOI',
    value: doi,
    url: `https://doi.org/${doi}`,
    ...(description ? { description } : {}),
  };
}

/** The Zenodo record page of a Zenodo DOI (`10.5281/zenodo.<n>` -> /records/<n>). */
function zenodoRecord(doi: string): string | undefined {
  const match = /^10\.5281\/zenodo\.(\d+)$/.exec(doi);
  return match ? `https://zenodo.org/records/${match[1]}` : undefined;
}

/**
 * `identifier` and `sameAs` for the archived work (the Body of Knowledge and its
 * open data): the version DOI of this release and the concept DOI that always
 * resolves to the latest one (data/site.ts), plus their Zenodo record pages.
 * Spread into the Book, DataCatalog and Dataset nodes.
 */
export const workDoi: { identifier: Record<string, unknown>[]; sameAs: string[] } = (() => {
  const concept = {
    doi: site.conceptDoi,
    label: 'Concept DOI: resolves to the latest archived version',
  };
  const dois =
    site.doi === site.conceptDoi
      ? [concept]
      : [{ doi: site.doi, label: `Version DOI: v${site.bokVersion}` }, concept];
  return {
    identifier: dois.map(({ doi, label }) => doiIdentifier(doi, label)),
    sameAs: dois.flatMap(({ doi }) => {
      const record = zenodoRecord(doi);
      return [`https://doi.org/${doi}`, ...(record ? [record] : [])];
    }),
  };
})();

/**
 * The Body of Knowledge as a schema.org Book. The chapter template
 * (pages/bok/[slug].astro) declares the same node under BOOK_ID; /bok, the
 * book's own URL, declares it from here.
 */
export const bookNode: Record<string, unknown> = {
  '@type': 'Book',
  '@id': BOOK_ID,
  name: 'AI Governance Engineering: The Thesis and Body of Knowledge',
  url: `${site.url}/bok`,
  version: site.bokVersion,
  inLanguage: 'en',
  author: [...authorRefs],
  publisher: { '@id': ORG_ID },
  isPartOf: { '@id': WEBSITE_ID },
  ...(site.licenseUrl ? { license: site.licenseUrl } : {}),
  ...workDoi,
};

/**
 * Newest git commit date (YYYY-MM-DD) across the files that build a page, for
 * its `dateModified`. Same rule, and the same source lists, as the sitemap's
 * `lastmod` (astro.config.ts SOURCE_BY_PATH); paths are relative to `site/`.
 */
export function lastModified(...files: string[]): string {
  // ISO dates sort lexicographically, so the newest is a plain string max.
  return files.map(cachedGitDate).reduce((newest, date) => (date > newest ? date : newest));
}

// gitDate shells out to `git log`; hundreds of term pages share one source, so
// each path is asked for once per build.
const gitDates = new Map<string, string>();
function cachedGitDate(file: string): string {
  const cached = gitDates.get(file);
  if (cached !== undefined) return cached;
  const date = gitDate(file);
  gitDates.set(file, date);
  return date;
}

/** One child of a hub page, for the hub's ItemList. */
export interface CollectionItem {
  name: string;
  /** Site path (`/patterns/x`, `/resources/tools#cat-x`) or absolute URL. */
  url?: string;
}

/**
 * A hub page as a schema.org CollectionPage: `@id` `<url>#page`, bound to the
 * WebSite, authored and published like every other page, dated by
 * `dateModified`, with its children as an ItemList `mainEntity` when given.
 * `extra` adds page-specific properties (`about`, `hasPart`, `license`...).
 */
export function collectionPage(input: {
  path: string;
  name: string;
  description?: string;
  dateModified: string;
  items?: readonly CollectionItem[];
  extra?: Record<string, unknown>;
}): Record<string, unknown> {
  const url = new URL(input.path, site.url).href;
  return {
    '@type': 'CollectionPage',
    '@id': `${url}#page`,
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    url,
    inLanguage: 'en',
    isPartOf: { '@id': WEBSITE_ID },
    author: [...authorRefs],
    publisher: { '@id': ORG_ID },
    dateModified: input.dateModified,
    ...(input.items && input.items.length
      ? {
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: input.items.length,
            itemListElement: input.items.map((item, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: item.name,
              ...(item.url ? { url: new URL(item.url, site.url).href } : {}),
            })),
          },
        }
      : {}),
    ...(input.extra ?? {}),
  };
}

/** @id of the glossary as a schema.org DefinedTermSet (the book index, /bok/glossary). */
export const GLOSSARY_SET_ID = `${site.url}/bok/glossary#glossary`;

/**
 * The glossary as a DefinedTermSet: the set is identified by the book index
 * (/bok/glossary#glossary) and each term by its own page (/glossary/<slug>#term),
 * the same @ids the term pages carry. `dateModified` is the glossary chapter's.
 */
export function glossaryTermSet(
  entries: readonly { term: string; definition: string; url: string }[],
  dateModified: string,
): Record<string, unknown> {
  return {
    '@type': 'DefinedTermSet',
    '@id': GLOSSARY_SET_ID,
    name: `Glossary · ${site.name}`,
    url: `${site.url}/bok/glossary`,
    inLanguage: 'en',
    isPartOf: { '@id': WEBSITE_ID },
    author: [...authorRefs],
    publisher: { '@id': ORG_ID },
    dateModified,
    ...(site.licenseUrl ? { license: site.licenseUrl } : {}),
    hasDefinedTerm: entries.map((entry) => {
      const termUrl = new URL(entry.url, site.url).href;
      return {
        '@type': 'DefinedTerm',
        '@id': `${termUrl}#term`,
        name: entry.term,
        description: entry.definition,
        url: termUrl,
        inDefinedTermSet: { '@id': GLOSSARY_SET_ID },
      };
    }),
  };
}
