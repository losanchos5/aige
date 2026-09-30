// template-visuals.ts: the two charts of /resources/templates, computed from
// the published schemas through getSchemas() (lib/schemas-library.ts), never
// from the JSON files by hand:
//
//   ring    the records ring (lifecycleRing): each schema in its lifecycle
//           stage (x-lifecycle-stage, labels and order from data/templates.ts),
//           circle area = its fields, inner disc = the share of them that is
//           required; the 'organisation' stage, which spans every stage, sits
//           in the centre. Wide ring and a narrow list per stage.
//   matrix  record x instrument: how many x-evidences marks each schema
//           carries per instrument, the record's own and its fields' together
//           (SchemaSummary.evidenceMarks), rows in the page's reading order,
//           each linked to its row in the table, with totals per row and per
//           instrument. Drawn with evidenceMatrix (./evidence-matrix.ts): the
//           kit's heatGrid gives each of the 24 x 7 cells its own rect and
//           tooltip, about 39 KB, far past the 12 KB budget.
//
// Prefix normalisation (instrumentOf): a mark is "<instrument> <reference>",
// e.g. "EU AI Act Art. 13(3)(b)" or "ISO/IEC 42001 A.6". The instrument is the
// longest entry of INSTRUMENT_PREFIXES the mark equals or starts with,
// followed by a space or a comma ("ISO/IEC 42005" alone cites the whole
// standard; "GPAI Code of Practice, Safety and Security, ..." a part). It
// names the instrument's id in data/frameworks.ts, whose `short` label heads
// the column. A mark whose prefix is not listed throws, so a new instrument in
// a schema fails the build until it is listed here.
import { NARROW_WIDTH, lifecycleRing, type ChartMode, type ChartOutput } from '../charts';
import { evidenceMatrix } from './evidence-matrix';
import { getSchemas, type SchemaSummary } from '../schemas-library';
import { schemaOrder, stages, type LifecycleStage } from '../../data/templates';
import { frameworks } from '../../data/frameworks';

export interface Pair {
  wide: ChartOutput;
  narrow: ChartOutput;
}

const MODE: ChartMode = 'figc';
const SOURCE = 'the JSON Schemas on this page (public/schemas)';
/** The stage drawn in the centre: records every stage shares. */
const CENTRE: LifecycleStage = 'organisation';

/** Mark prefix -> frameworks.ts id. */
const INSTRUMENT_PREFIXES: Readonly<Record<string, string>> = {
  'EU AI Act': 'eu-ai-act',
  'GPAI Code of Practice': 'gpai-code-of-practice',
  GDPR: 'gdpr',
  'ISO/IEC 42001': 'iso-42001',
  'ISO/IEC 42005': 'iso-42005',
  'ISO/IEC 23894': 'iso-23894',
  'NIST AI RMF': 'nist-ai-rmf',
};

/** The frameworks.ts id of the instrument an x-evidences mark cites. */
export function instrumentOf(mark: string): string {
  const prefix = Object.keys(INSTRUMENT_PREFIXES)
    .filter((p) => mark.startsWith(p) && /^(?:$|[ ,])/.test(mark.slice(p.length)))
    .sort((a, b) => b.length - a.length)[0];
  if (!prefix) throw new Error(`template-visuals: x-evidences mark "${mark}" cites no known instrument; add its prefix to INSTRUMENT_PREFIXES`);
  return INSTRUMENT_PREFIXES[prefix];
}

const rank = (name: string) => {
  const i = schemaOrder.indexOf(name);
  return i === -1 ? schemaOrder.length : i;
};

/** The schemas in the page's reading order (stage, then schemaOrder). */
function ordered(): SchemaSummary[] {
  const stageRank = (s: SchemaSummary) => stages.findIndex((st) => st.id === s.stage);
  return [...getSchemas()].sort((a, b) => stageRank(a) - stageRank(b) || rank(a.name) - rank(b.name));
}

const schemaHref = (s: SchemaSummary) => `#schema-${s.name}`;

export function recordsRing(): Pair {
  const schemas = ordered();
  const record = (s: SchemaSummary) => ({
    label: s.title,
    size: s.fieldCount,
    fill: s.requiredCount / s.fieldCount,
    href: schemaHref(s),
  });
  const cycle = stages.filter((st) => st.id !== CENTRE && schemas.some((s) => s.stage === st.id));
  const centre = stages.find((st) => st.id === CENTRE)!;
  const base = {
    title: 'The records ring',
    desc: `The ${schemas.length} record schemas in their lifecycle stage, each circle as large as its number of fields with an inner disc for the share that is required; the organisation-wide records sit in the centre.`,
    source: SOURCE,
    mode: MODE,
    stages: cycle.map((st) => ({ key: st.id, label: st.label, href: `#stage-${st.id}` })),
    nodes: schemas.filter((s) => s.stage !== CENTRE).map((s) => ({ ...record(s), stage: s.stage })),
    centre: { label: centre.label, nodes: schemas.filter((s) => s.stage === CENTRE).map(record) },
    sizeLabel: 'Fields',
    fillLabel: 'Required (%)',
    tableCaption: 'Record schemas by lifecycle stage, with their fields and the share required',
  };
  return {
    wide: lifecycleRing({ ...base, id: 'tpl-ring-w', width: 800 }),
    narrow: lifecycleRing({ ...base, id: 'tpl-ring-n', width: NARROW_WIDTH, layout: 'list' }),
  };
}

export function recordInstrumentGrid(): Pair {
  const schemas = ordered();
  const perSchema = schemas.map((s) => {
    const counts = new Map<string, number>();
    for (const mark of s.evidenceMarks) {
      const id = instrumentOf(mark);
      counts.set(id, (counts.get(id) ?? 0) + 1);
    }
    return counts;
  });
  // Columns: the instruments cited, most marks first, ties in listing order.
  const listed = Object.values(INSTRUMENT_PREFIXES);
  const total = (id: string) => perSchema.reduce((sum, c) => sum + (c.get(id) ?? 0), 0);
  const ids = listed.filter((id) => total(id) > 0).sort((a, b) => total(b) - total(a) || listed.indexOf(a) - listed.indexOf(b));
  const short = (id: string) => {
    const fw = frameworks.find((f) => f.id === id);
    if (!fw) throw new Error(`template-visuals: no framework "${id}" in data/frameworks.ts`);
    return fw.short;
  };
  const marks = perSchema.reduce((sum, c) => sum + [...c.values()].reduce((a, b) => a + b, 0), 0);
  const base = {
    title: 'Evidence marks, record by instrument',
    desc: `How many x-evidences marks each of the ${schemas.length} record schemas carries for each of ${ids.length} instruments, ${marks} in all, the record's own and its fields' counted together.`,
    source: SOURCE,
    mode: MODE,
    rowHeader: 'Record',
    rows: schemas.map((s, i) => ({ label: s.title, href: schemaHref(s), values: ids.map((id) => perSchema[i].get(id) ?? 0) })),
    columns: ids.map(short),
    unit: 'marks',
    tableCaption: 'x-evidences marks per record schema and instrument',
  };
  return {
    wide: evidenceMatrix({ ...base, id: 'tpl-matrix-w', width: 640 }),
    narrow: evidenceMatrix({ ...base, id: 'tpl-matrix-n', width: NARROW_WIDTH }),
  };
}
