// breadcrumbs.ts: the shared model + JSON-LD builder for the site's breadcrumbs.
// A crumb is a label with an optional href (the current page's crumb omits it).
// breadcrumbJsonLd prepends Home and emits a schema.org BreadcrumbList with
// absolute item URLs built the same way Seo.astro builds canonicals.
import { site } from '../data/site';

export interface Crumb {
  label: string;
  /** Omitted on the current page (the last crumb). */
  href?: string;
}

/**
 * Build a schema.org BreadcrumbList for `items`, with Home in position 1 and
 * absolute item URLs (a crumb without an href — the current page — omits `item`).
 */
export function breadcrumbJsonLd(items: Crumb[]): Record<string, unknown> {
  const all: Crumb[] = [{ label: 'Home', href: '/' }, ...items];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: new URL(crumb.href, site.url).href } : {}),
    })),
  };
}
