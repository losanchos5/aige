// seo-title.ts: when a search-phrased page title still takes the site name.
//
// Seo.astro appends ` · AI Governance Engineer` (25 characters) to every title
// unless a page passes `titleSuffix={false}`. The search titles written for the
// chapters (`seoTitle` frontmatter) and the retitled hubs run to 55 characters,
// so the suffix would push them past the 70 characters tests/seo-basics.spec.ts
// allows and Google shows. The rule from the 2026-09-25 on-page audit (F5): keep
// the suffix only when the whole title fits, and let og:site_name and the
// WebSite node carry the brand otherwise.
import { site } from '../data/site';

/** The longest document title, suffix included. */
export const MAX_DOCUMENT_TITLE = 70;

/** True when `<title> · <site name>` fits in MAX_DOCUMENT_TITLE characters. */
export function fitsSiteSuffix(title: string): boolean {
  return `${title} · ${site.name}`.length <= MAX_DOCUMENT_TITLE;
}
