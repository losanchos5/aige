// compare-links.ts: the "<A> vs <B>" comparison pages (src/data/comparisons.ts)
// that treat one instrument, for the "Compared side by side" lines on the
// glossary terms, the obligation pages and /resources/frameworks (ONPAGE R2 and
// SXO-R2-02 of the 2026-09-25 round-2 audit: each comparison page was linked
// only from inside the crosswalk cluster). A join over data that already
// exists: the anchor is the page's own "<A> vs <B>" name, the order is the
// comparisons' order.
import { comparisons, comparisonPath } from '../data/comparisons';

export interface CompareLink {
  /** "ISO 42001 vs EU AI Act", the query the page answers. */
  label: string;
  /** /resources/crosswalk/<slug>. */
  href: string;
}

/** Every comparison page, in catalogue order. */
export const compareLinks: readonly CompareLink[] = comparisons.map((c) => ({
  label: `${c.aName} vs ${c.bName}`,
  href: comparisonPath(c),
}));

/** The comparison pages that compare the instrument with this frameworks.ts id. */
export function comparisonsFor(frameworkId: string): CompareLink[] {
  return comparisons
    .filter((c) => c.a === frameworkId || c.b === frameworkId)
    .map((c) => ({ label: `${c.aName} vs ${c.bName}`, href: comparisonPath(c) }));
}

/**
 * The glossary terms (page slug, lib/glossary.ts termSlug) that name a compared
 * instrument, with that instrument's frameworks.ts id. The glossary template
 * fails the build if one of these slugs stops being a term.
 */
export const termFrameworks: Readonly<Record<string, string>> = {
  'ai-act-eu': 'eu-ai-act',
  'iso-iec-42001': 'iso-42001',
  'nist-ai-rmf': 'nist-ai-rmf',
};

/** The comparison pages for a glossary term, or none when it names no compared instrument. */
export function comparisonsForTerm(slug: string): CompareLink[] {
  const frameworkId = termFrameworks[slug];
  return frameworkId ? comparisonsFor(frameworkId) : [];
}
