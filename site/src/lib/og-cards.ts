// og-cards.ts: the titles of the shared Open Graph cards served at
// /og/<slug>.png (src/pages/og/[...slug].png.ts renders them from this map).
// Seo.astro reads the same map, so a page that borrows a section card states
// in og:image:alt what the card shows rather than the page's own title.
import { chaptersOrdered } from '../data/chapters';
import { comparisons, type ComparisonDef } from '../data/comparisons';

/** Top-level cards: /og/<slug>.png -> the title printed on the card. */
export const OG_ROUTE_TITLES: Readonly<Record<string, string>> = {
  default: 'AI Governance Engineering',
  // The pillar page's own card: it names the query the page answers.
  'ai-governance': 'What is AI governance?',
  thesis: 'The Thesis',
  bok: 'Body of Knowledge',
  role: 'The AI Governance Engineer',
  stack: 'The five-layer stack',
  path: 'The AIGE learning path',
  resources: 'Resources & reading list',
  map: 'The map of the discipline',
  about: 'About this site',
  toolkit: 'Toolkit: governance tools in your browser',
  obligations: 'The obligation register',
  figures: 'Figures of the Body of Knowledge',
  data: 'Open data and API',
  mcp: 'The Body of Knowledge in your AI assistant',
  for: 'Routes by audience',
};

/** Card slug of a framework comparison page (/resources/crosswalk/<slug>). */
const comparisonCardSlug = (c: Pick<ComparisonDef, 'slug'>) => `crosswalk-${c.slug}`;

/**
 * The card of a framework comparison page: like the pillar's, it names the
 * query the page answers ("ISO 42001 vs EU AI Act").
 */
export function comparisonOgImage(c: Pick<ComparisonDef, 'slug'>): string {
  return `/og/${comparisonCardSlug(c)}.png`;
}

/**
 * Every card of /og/<slug>.png with its title: the top-level cards, one per
 * Body of Knowledge chapter (`bok-<slug>`, titled with the chapter title) and
 * one per framework comparison (`crosswalk-<slug>`, titled "<A> vs <B>").
 */
export function ogCards(): { slug: string; title: string }[] {
  return [
    ...Object.entries(OG_ROUTE_TITLES).map(([slug, title]) => ({ slug, title })),
    ...chaptersOrdered.map((chapter) => ({ slug: `bok-${chapter.slug}`, title: chapter.title })),
    ...comparisons.map((c) => ({ slug: comparisonCardSlug(c), title: `${c.aName} vs ${c.bName}` })),
  ];
}

/**
 * The title printed on the card at `image` (a site path or absolute URL), or
 * undefined for any other image (the per-entity cards under /og/<kind>/ render
 * the page's own title).
 */
export function ogCardTitle(image: string): string | undefined {
  const match = /^(?:https?:\/\/[^/]+)?\/og\/([a-z0-9-]+)\.png$/.exec(image);
  if (!match) return undefined;
  return ogCards().find((card) => card.slug === match[1])?.title;
}
