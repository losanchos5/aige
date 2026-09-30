// pattern-neighbourhood.ts: the ego network of one pattern page
// (/patterns/<slug>) for the kit's relationRadial. The pattern sits at the
// centre; around it:
//   - Related patterns: the "## Related patterns" list of its own Markdown
//     file, in its layer colour, drawn as related (dashed, outlined);
//   - Obligations: register rows whose "Patterns that build it" names it
//     (lib/cross-links.ts obligationsEvidencedBy);
//   - Controls: open controls that list it (controlsForPattern);
//   - Cases: incident cases that name it as the control that would have
//     caught them (casesCallingFor).
// The last three name the pattern themselves, so they are drawn as direct
// (solid, filled). Every relation is a join over data that already exists;
// nothing here adds a fact. Labels that do not fit a node are shortened by
// the shared shortener (labels.ts: on a word boundary with an ellipsis; the
// full name stays in the tooltip and in the table).
import { relationRadial, type ChartOutput, type RelationFamily } from '../charts';
import { textWidth } from '../charts/core';
import { centreLabel, shortenToFit } from './labels';
import { patterns, type PatternDef } from '../../data/patterns';
import { controlHref } from '../../data/controls';
import { obligationPath } from '../../data/frameworks';
import { casesCallingFor, controlsForPattern, obligationsEvidencedBy } from '../cross-links';
import { frameworkOf } from '../obligations';
import { instrumentClause, obligationHeading } from '../obligation-title';

/** Widest node label: the room a 640-wide radial leaves each label column
 *  (the 340-wide list gives 266). */
export const NODE_LABEL_MAX = 176;
const LIST_LABEL_MAX = 260;
const NODE_PX = 13;

/** `full`, or the shared shortener's form of it that fits `max` px. */
const fitLabel = (full: string, max: number): string => shortenToFit(full, max, NODE_PX);

/** Slugs linked under "## Related patterns" in a pattern's Markdown body, in order. */
export function relatedPatternSlugs(body: string): string[] {
  const section = body.split(/^## Related patterns\s*$/m)[1]?.split(/^(?:## |\*\*Maps to)/m)[0] ?? '';
  const slugs = [...section.matchAll(/\]\(\/patterns\/([a-z0-9-]+)\)/g)].map((m) => m[1]);
  return slugs.filter((slug, i) => slugs.indexOf(slug) === i);
}

/** The four families of a pattern's neighbourhood (empty ones included). */
export function neighbourhoodFamilies(def: PatternDef, body: string, max = NODE_LABEL_MAX): RelationFamily[] {
  const related = relatedPatternSlugs(body)
    .map((slug) => patterns.find((p) => p.slug === slug))
    .filter((p): p is PatternDef => p !== undefined && p.slug !== def.slug);
  return [
    {
      label: 'Related patterns',
      layered: true,
      items: related.map((p) => ({
        label: fitLabel(p.title, max),
        name: p.title,
        href: `/patterns/${p.slug}`,
        strength: 'related' as const,
        tone: p.layer,
      })),
    },
    {
      label: 'Obligations',
      items: obligationsEvidencedBy(def.id).map((row) => {
        const full = instrumentClause(row);
        return {
          label: textWidth(full, NODE_PX) <= max ? full : fitLabel(frameworkOf(row).short, max),
          name: obligationHeading(row),
          href: obligationPath(row),
        };
      }),
    },
    {
      label: 'Controls',
      items: controlsForPattern(def.slug).map((c) => ({
        label: fitLabel(c.title, max),
        name: `${c.id} ${c.title}`,
        href: controlHref(c.id),
      })),
    },
    {
      label: 'Cases',
      items: casesCallingFor(def.id).map((c) => ({ label: fitLabel(c.short, max), name: c.title, href: `/cases/${c.id}` })),
    },
  ];
}

/** The wide (640) and narrow (340) neighbourhood, or null under three relations. */
export function patternNeighbourhood(def: PatternDef, body: string): { wide: ChartOutput; narrow: ChartOutput } | null {
  const base = {
    title: `Around ${def.title}`,
    desc: `The patterns ${def.title} is listed with, and the obligations, open controls and incident cases that name it.`,
    tableCaption: `What ${def.title} connects to`,
    source: 'the pattern catalogue, the obligation register, the open controls and the cases',
    centre: { label: centreLabel(def.title) },
    relationLabels: { core: 'Names this pattern', related: 'Related pattern' },
  };
  const wide = relationRadial({ ...base, id: 'pp-hood-w', families: neighbourhoodFamilies(def, body) });
  if (!wide) return null;
  const narrow = relationRadial({ ...base, id: 'pp-hood-n', width: 340, families: neighbourhoodFamilies(def, body, LIST_LABEL_MAX) });
  return { wide, narrow: narrow! };
}
