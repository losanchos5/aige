// term-visuals.ts: the two per-term visuals of /glossary/<slug>, generated
// inside their components (per-item visuals: not registered in
// data/figures.ts), each as a wide and a narrow variant with one table.
//
// - termFootprintChart: the term's footprint in the Body of Knowledge, one
//   slot per chapter the glossary's usage index reads (every chapter but the
//   glossary itself), bar height = mentions (lib/glossary.ts termUsage), the
//   chapters the entry cross-references drawn solid. Null when no chapter
//   names the term (the page keeps its sentence).
// - termNeighbourhood: the ego network of the term: related terms (solid),
//   the terms it is contrasted with (dashed: "do not confuse") and the
//   patterns that use it most (layer colour), from relatedTerms, the entry's
//   contrast list and patternsUsingTerm. Null under three relations, so the
//   page keeps its list only.
import { relationRadial, textWidth, wrapText, type ChartOutput } from '../charts';
import { termFootprint, type FootprintChapter } from '../page-charts/term-footprint';
import { chaptersOrdered } from '../../data/chapters';
import { patternPath } from '../../data/patterns';
import { site } from '../../data/site';
import { getGlossary, relatedTerms, termUsage, type GlossaryEntry } from '../glossary';
import { patternsUsingTerm } from '../cross-links';
import { fitName } from './labels';

export interface TermVisual {
  wide: ChartOutput;
  narrow: ChartOutput;
}

/** The footprint's wide variant fits the 72ch reading column (its chart
 *  switches to it from 640 px), one 24 px-plus slot per chapter. */
export const FOOTPRINT_WIDE = 600;
/** The neighbourhood's wide variant: two label columns of at least
 *  NODE_LABEL_PX; the page lets it out of the reading column. */
export const NEIGHBOURHOOD_WIDE = 880;
export const NARROW = 340;
/** One node label line: the label column of the narrow list (340 wide), which
 *  the wide layout at NEIGHBOURHOOD_WIDE also clears. */
const NODE_LABEL_PX = 266;
/** The centre box of the wide layout at its narrowest (132) less its
 *  padding: the term wraps to at most three lines of it. */
const CENTRE_PX = 116;
/** Patterns drawn in the neighbourhood: those that use the term most. */
export const NEIGHBOURHOOD_PATTERNS = 6;
/** Related terms: relatedTerms' own cap, all drawn. */
const MAX_NODES = 8;

/** Every chapter the usage index reads, in reading order ("00" to "23"). */
export function footprintSlots(): { number: string; title: string }[] {
  return chaptersOrdered
    .filter((c) => c.slug !== 'glossary')
    .map((c) => ({ number: String(c.order).padStart(2, '0'), title: c.shortTitle }));
}

export function termFootprintChart(entry: GlossaryEntry): TermVisual | null {
  const usage = termUsage(entry.slug);
  if (!usage.length) return null;
  const slots = footprintSlots();
  for (const ref of entry.chapterRefs) {
    if (!slots.some((s) => s.number === ref)) throw new Error(`term-visuals: "${entry.term}" cross-references chapter ${ref}, which has no slot`);
  }
  const chapters: FootprintChapter[] = slots.map((s) => {
    const use = usage.find((u) => u.chapter === s.number);
    return {
      number: s.number,
      title: s.title,
      count: use?.count ?? 0,
      ...(use ? { href: use.href } : {}),
      referenced: entry.chapterRefs.includes(s.number),
    };
  });
  const total = usage.reduce((sum, u) => sum + u.count, 0);
  const base = {
    title: `${entry.term}: mentions per chapter`,
    desc: `${total} ${total === 1 ? 'mention' : 'mentions'} of the term across ${usage.length} of the ${slots.length} chapters of the Body of Knowledge; the chapters the glossary cross-references are drawn solid.`,
    source: `the Body of Knowledge v${site.bokVersion}`,
    tableCaption: `Mentions of ${entry.term} per chapter`,
    chapters,
  };
  return {
    wide: termFootprint({ ...base, id: `fp-${entry.slug}-w`, width: FOOTPRINT_WIDE }),
    narrow: termFootprint({ ...base, id: `fp-${entry.slug}-n`, width: NARROW }),
  };
}

/** The term in the centre box: whole when it wraps to three lines, else
 *  without its trailing "(...)" gloss. */
function centreLabel(term: string): string {
  const widest = Math.max(...term.split(/\s+/).map((word) => textWidth(word, 13.5)));
  const lines = wrapText(term, Math.max(CENTRE_PX, widest), 13.5, 'body', Infinity, 'centre label');
  return lines.length <= 3 ? term : term.replace(/\s*\([^)]*\)$/, '');
}

export function termNeighbourhood(entry: GlossaryEntry): TermVisual | null {
  const bySlug = new Map(getGlossary().map((e) => [e.slug, e]));
  const term = (other: GlossaryEntry, strength: 'core' | 'related') => ({
    label: fitName(other.term, NODE_LABEL_PX),
    name: other.term,
    href: other.url,
    strength,
  });
  const contrast = entry.contrast.map((slug) => {
    const other = bySlug.get(slug);
    if (!other) throw new Error(`term-visuals: "${entry.term}" contrasts with unknown term "${slug}"`);
    return term(other, 'related');
  });
  // The page's "Related terms" list: relatedTerms without the contrast terms.
  const related = relatedTerms(entry.slug)
    .filter((r) => !entry.contrast.includes(r.slug))
    .map((r) => term(r, 'core'));
  const uses = patternsUsingTerm(entry.slug);
  const patterns = uses
    .slice(0, NEIGHBOURHOOD_PATTERNS)
    .map(({ pattern, count }) => ({
      label: fitName(pattern.title, NODE_LABEL_PX),
      name: `${pattern.title}, ${count} ${count === 1 ? 'mention' : 'mentions'}`,
      href: patternPath(pattern),
      tone: pattern.layer,
    }));
  const base = {
    title: `${entry.term}: related terms and patterns`,
    desc: `The term at the centre; related terms on solid edges, the terms it is contrasted with on dashed edges, and the patterns that use it most in the colour of their layer.`,
    tableCaption: `Neighbourhood of ${entry.term}`,
    centre: { label: centreLabel(entry.term) },
    relationLabels: { core: 'Related', related: 'Contrast' },
    maxPerFamily: MAX_NODES,
    families: [
      { label: 'Related terms', items: related },
      { label: 'Contrast with', items: contrast },
      { label: uses.length > NEIGHBOURHOOD_PATTERNS ? 'Patterns using it most' : 'Patterns using it', layered: true, items: patterns, relationLabels: { core: 'Uses the term', related: 'Uses the term' } },
    ],
  };
  const wide = relationRadial({ ...base, id: `nb-${entry.slug}-w`, width: NEIGHBOURHOOD_WIDE, layout: 'radial' });
  const narrow = relationRadial({ ...base, id: `nb-${entry.slug}-n`, width: NARROW, layout: 'list' });
  return wide && narrow ? { wide, narrow } : null;
}
