// case-bowtie.ts: the incident bow-tie at the head of /cases/<id>, one per
// case, generated at build time from its record in data/cases.ts (a per-item
// visual: not registered in data/figures.ts). Reading left to right (top to
// bottom on a phone):
//
//   controls -> the incident (the gate diamond) -> harms -> evidence
//
// The controls come from the case's incident note when it has one, by moment
// (preventive, detective, responsive: an empty moment is left out); a case
// without a note draws the patterns of "Which control would have caught it"
// as one panel. The harms are the case's rows of the harms atlas
// (data/harms.ts), each linked to its card; the evidence panel is always last
// (the kit's terminal panel: document-with-check glyph in the layer colour).
//
// The drawn labels are short (VISUAL-GUIDE §1.4: at most four words, nouns);
// the full wording stays in each item's name (its tooltip and link name) and
// in the table. A harm or an artefact is drawn by its head phrase
// (labels.ts), so "Policy card for the risk model listing ..." draws "Policy
// card". Nothing is typed by hand: every word comes from the record.
import { bowTie, type ChartOutput, type EvidenceItem, type FlowItem } from '../charts';
import { layerWord } from '../charts/core';
import { harms, levelLabel, type ControlRef } from '../../data/harms';
import { patternPath } from '../../data/patterns';
import type { IncidentCase } from '../../data/cases';
import { patternById } from '../cross-links';
import { headPhrase } from './labels';

/** Wide: a row across the page container (CaseBowTie.astro lets the figure
 *  out of the reading column once the container is at full width), 100 units
 *  per panel beyond five and never under 900, so a short bow-tie does not
 *  spread thin. Narrow: the phone column, also shown in the reading column
 *  below that width. */
export const bowTieWidth = (panels: number): number => Math.max(900, 500 + 100 * panels);
export const BOWTIE_NARROW = 340;
/** Items drawn per panel: every item the cases record today (at most five
 *  controls or artefacts), so the evidence panel shows every artefact. */
const MAX_ITEMS = 5;

/** The first sentence of a prose field, without its [n] citation markers. */
export function firstSentence(prose: string): string {
  const plain = prose.replace(/\s*\[\d+(?:\s*[,-]\s*\d+)*\]/g, '').trim();
  const stop = plain.search(/[.!?](\s|$)/);
  return stop > 0 ? plain.slice(0, stop + 1) : plain;
}

const control = (ref: ControlRef): FlowItem => {
  const pattern = ref.patternId ? patternById(ref.patternId) : undefined;
  if (ref.patternId && !pattern) throw new Error(`case-bowtie: unknown pattern "${ref.patternId}"`);
  return {
    label: ref.name,
    ...(pattern ? { href: patternPath(pattern), detail: layerWord(pattern.layer) } : {}),
  };
};

export interface CaseBowTie {
  wide: ChartOutput;
  narrow: ChartOutput;
  /** The panels drawn before the incident, for the caption. */
  byMoment: boolean;
}

/** The bow-tie of one case, as a wide row and a narrow column. */
export function caseBowTie(entry: IncidentCase): CaseBowTie {
  const byMoment =
    entry.preventiveControls !== undefined ||
    entry.detectiveControls !== undefined ||
    entry.responsiveControls !== undefined;
  const caseHarms = entry.harms.map((id) => {
    const harm = harms.find((h) => h.id === id);
    if (!harm) throw new Error(`case-bowtie: "${entry.id}" names unknown harm "${id}"`);
    return harm;
  });
  const evidence: EvidenceItem[] = entry.evidenceArtefacts.map((a) => ({
    label: headPhrase(a.artefact),
    name: a.artefact,
    layer: a.layerN,
  }));
  const input = {
    title: `${entry.short}: controls, harms and evidence`,
    desc: byMoment
      ? `The controls that act before, during and after the incident, the harms it caused and the ${entry.evidenceArtefacts.length} evidence artefacts that would have existed.`
      : `The controls that would have caught the incident, the harms it caused and the ${entry.evidenceArtefacts.length} evidence artefacts that would have existed.`,
    source: 'the engineering analysis on this page',
    maxItems: MAX_ITEMS,
    tableCaption: `Bow-tie of the case: ${entry.short}`,
    preventive: (byMoment ? (entry.preventiveControls ?? []) : entry.control.controls).map(control),
    detective: byMoment ? (entry.detectiveControls ?? []).map(control) : [],
    responsive: byMoment ? (entry.responsiveControls ?? []).map(control) : [],
    event: [{ label: entry.short, detail: firstSentence(entry.failureMode[0] ?? '') }],
    harms: caseHarms.map((h) => ({
      label: headPhrase(h.harmType),
      name: h.harmType,
      href: `/resources/harms#harm-${h.id}`,
      detail: levelLabel[h.level],
    })),
    evidence,
    kickers: {
      ...(byMoment ? {} : { preventive: 'Would have caught it' }),
      event: 'Incident',
    },
  };
  // The event and the evidence, plus every non-empty control and harm stage.
  const panels = 2 + [input.preventive, input.detective, input.responsive, input.harms].filter((list) => list.length).length;
  return {
    wide: bowTie({ ...input, id: `bt-${entry.id}-w`, width: bowTieWidth(panels), orientation: 'row' }),
    narrow: bowTie({ ...input, id: `bt-${entry.id}-n`, width: BOWTIE_NARROW, orientation: 'column' }),
    byMoment,
  };
}
