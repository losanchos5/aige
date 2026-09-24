// Which built pages the sitemap lists. Every HTML page the build writes is in
// the sitemap except the ones below: the generated Open Graph cards (/og/*),
// the static diagram viewers (/diagrams/*), the 404, and the pages that are not
// their own canonical URL. astro.config.ts filters with `inSitemap`, and
// tests/seo-infra.spec.ts counts the indexable routes with the same function,
// so the two can never disagree.

/** Built pages that are not destinations of their own, with the reason. */
export const NOT_IN_SITEMAP: readonly { path: string; reason: string }[] = [
  {
    path: '/resources/glossary',
    reason: 'the host answers 301 to /bok/glossary (public/_redirects); built for local previews only',
  },
  {
    path: '/resources/reading-list',
    reason: 'a filtered view of /bok/reading-list, which it declares as rel=canonical',
  },
];

const EXCLUDED = new Set(NOT_IN_SITEMAP.map((entry) => entry.path));

/** True when the clean pathname (no `.html`, no trailing slash) belongs in the sitemap. */
export function inSitemap(pathname: string): boolean {
  return !/^\/(og|diagrams)\//.test(pathname) && pathname !== '/404' && !EXCLUDED.has(pathname);
}
