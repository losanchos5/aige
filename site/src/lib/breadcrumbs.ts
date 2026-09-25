// breadcrumbs.ts: the shared model + JSON-LD builder for the site's breadcrumbs.
// A crumb is a label with an optional href (the current page's crumb omits it).
// breadcrumbJsonLd prepends Home and emits a schema.org BreadcrumbList with
// absolute item URLs built the same way Seo.astro builds canonicals.
// linkBreadcrumbs gives the page's BreadcrumbList its stable
// `<page url>#breadcrumb` @id and points the page's WebPage node at it; Seo.astro
// applies it to every graph, so no caller has to know its own URL.
import { site } from '../data/site';

export interface Crumb {
  label: string;
  /** Omitted on the current page (the last crumb). */
  href?: string;
}

/** The stable @id of the BreadcrumbList on the page at `pageUrl`. */
export function breadcrumbId(pageUrl: string): string {
  return `${pageUrl.replace(/#.*$/, '')}#breadcrumb`;
}

/**
 * Build a schema.org BreadcrumbList for `items`, with Home in position 1 and
 * absolute item URLs (a crumb without an href (the current page) omits `item`).
 * With `pageUrl` the list carries its `<pageUrl>#breadcrumb` @id; without it,
 * Seo.astro adds the same @id from the page's own URL (linkBreadcrumbs).
 */
export function breadcrumbJsonLd(items: Crumb[], pageUrl?: string): Record<string, unknown> {
  const all: Crumb[] = [{ label: 'Home', href: '/' }, ...items];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    ...(pageUrl ? { '@id': breadcrumbId(pageUrl) } : {}),
    itemListElement: all.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: new URL(crumb.href, site.url).href } : {}),
    })),
  };
}

// schema.org WebPage and the subtypes that take a `breadcrumb` property. An
// Article, a Book or a DefinedTermSet does not.
const WEB_PAGE_TYPES = new Set([
  'WebPage',
  'CollectionPage',
  'ProfilePage',
  'AboutPage',
  'ContactPage',
  'ItemPage',
  'FAQPage',
  'QAPage',
  'SearchResultsPage',
]);

type Node = Record<string, unknown>;

function isWebPage(node: Node): boolean {
  const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];
  return types.some((type) => typeof type === 'string' && WEB_PAGE_TYPES.has(type));
}

/**
 * Give each BreadcrumbList in `graph` without an @id the page's
 * `<pageUrl>#breadcrumb` (a second list, which no page emits today, gets
 * `#breadcrumb-2`), then set `breadcrumb` on the page's own WebPage node (the
 * one whose `url` is `pageUrl`) when it has none. Returns new nodes; the input
 * is left as it was.
 */
export function linkBreadcrumbs(graph: readonly Node[], pageUrl: string): Node[] {
  let count = 0;
  const withIds = graph.map((node) => {
    if (node['@type'] !== 'BreadcrumbList') return node;
    count += 1;
    if (typeof node['@id'] === 'string') return node;
    const id = breadcrumbId(pageUrl) + (count === 1 ? '' : `-${count}`);
    return { '@id': id, ...node };
  });

  const list = withIds.find((node) => node['@type'] === 'BreadcrumbList');
  if (!list) return withIds;
  const ref = { '@id': list['@id'] as string };
  return withIds.map((node) =>
    isWebPage(node) && node.url === pageUrl && node.breadcrumb === undefined
      ? { ...node, breadcrumb: ref }
      : node,
  );
}
