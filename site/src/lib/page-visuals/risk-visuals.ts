// risk-visuals.ts: the charts of /resources/threats and /resources/harms,
// each computed from its data module (data/threats.ts, data/harms.ts); nothing
// here is typed by hand but the column headings.
//
// /resources/threats
//   threatFlow  catalogue -> stack layer -> test tool (flow, three columns).
//               A row may sit in two layers and name checks in two tools, so
//               the flow counts pairs, not rows:
//                 catalogue -> layer: one pair per (threat, layer), so a
//                   threat whose control spans two layers flows into both;
//                 layer -> tool: one pair per (threat, layer, tool), the
//                   threats of that layer that name at least one check in
//                   that tool (two checks in the same tool count once).
//               A block's count is the larger of its in and out pairs; the
//               table lists every link with its pairs. Order is the data's
//               (catalogues as listed, layers 1 to 5, tools as EvalTool).
//   threatGrid  catalogue x control-framework id (heatGrid): the threats of
//               each catalogue that name each CSA AICM domain or each ISO/IEC
//               42001 Annex A control of the lookup table. Only the ids some
//               row names get a column (all 18 AICM domains as empty columns
//               would pass the 12 KB budget); the rest come back as `unnamed`
//               for the page to list under the grid. A threat names one to
//               three ids, so a row's cells may add up to more than its
//               threats: no totals drawn.
//
// /resources/harms
//   harmTarget  harm levels as rings (individual inside, environment
//               outside) x the seven MIT domains as sectors
//               (concentricRings): one mark per harm, in its level's ring and
//               the sector of the first MIT code its row lists (four rows
//               list codes in two domains; their card names both), coloured
//               by the layer of the control that catches it (layerN[0]; every
//               row names one layer). Each mark links to its card.
//   harmFlow    mechanism -> level -> layer (flow, three columns). A harm
//               with two mechanisms flows from both, so mechanism -> level
//               counts (harm, mechanism) pairs and level -> layer one pair per
//               (harm, layer). Mechanisms are ordered by the mean level of
//               their harms (ties in data order), levels and layers keep their
//               own order.
import {
  NARROW_WIDTH,
  concentricRings,
  flow,
  heatGrid,
  type ChartMode,
  type ChartOutput,
  type SankeyLink,
  type SankeyNode,
  type Tone,
} from '../charts';
import {
  threats,
  taxonomies,
  aicmDomains,
  iso42001Controls,
  THREATS_AS_OF,
  type EvalTool,
  type Threat,
} from '../../data/threats';
import { harms, levelOrder, levelLabel, mechanismLabel, mitDomains, type HarmMechanism } from '../../data/harms';
import { layers } from '../../data/stack';

export interface Pair {
  wide: ChartOutput;
  narrow: ChartOutput;
}

const MODE: ChartMode = 'figc';
const WIDE = 720;
const LAYERS = [1, 2, 3, 4, 5] as const;
const TOOLS: readonly EvalTool[] = ['Inspect', 'promptfoo', 'garak', 'custom'];
const TOOL_LABEL: Readonly<Record<EvalTool, string>> = {
  Inspect: 'Inspect',
  promptfoo: 'promptfoo',
  garak: 'garak',
  custom: 'Write your own',
};

const layerOf = (n: number) => layers.find((l) => l.n === n)!;
/** "L2 Inventory": the layer's name up to its first " & ", so it fits a block. */
const layerLabel = (n: number) => `L${n} ${layerOf(n).name.split(' & ')[0]}`;
const layerName = (n: number) => `L${n} ${layerOf(n).name}`;

/** Count each key, keeping the first-seen order. */
function tally(keys: string[]): Map<string, number> {
  const out = new Map<string, number>();
  for (const k of keys) out.set(k, (out.get(k) ?? 0) + 1);
  return out;
}

function toLinks(counts: Map<string, number>): SankeyLink[] {
  return [...counts].map(([key, value]) => {
    const [from, to] = key.split('>');
    return { from, to, value };
  });
}

function flowPair(base: {
  id: string;
  title: string;
  desc: string;
  source: string;
  asOf?: string;
  columns: { key: string; label: string }[];
  nodes: SankeyNode[];
  links: SankeyLink[];
  tableCaption: string;
}): Pair {
  const { id, ...rest } = base;
  const used = new Set(rest.links.flatMap((l) => [l.from, l.to]));
  const common = { ...rest, nodes: rest.nodes.filter((n) => used.has(n.id)), unit: 'pairs', unitOne: 'pair', mode: MODE, order: 'input' as const };
  return {
    wide: flow({ ...common, id: `${id}-w`, width: WIDE, layout: 'wide' }),
    narrow: flow({ ...common, id: `${id}-n`, width: NARROW_WIDTH, layout: 'narrow' }),
  };
}

// ------------------------------------------------------------- threats -- //

export function threatFlow(): Pair {
  const stage1 = tally(threats.flatMap((t) => t.layers.map((n) => `c-${t.taxonomy}>l-${n}`)));
  const stage2 = tally(threats.flatMap((t) => t.layers.flatMap((n) => [...new Set(t.evals.map((e) => e.tool))].map((tool) => `l-${n}>t-${tool}`))));
  const nodes: SankeyNode[] = [
    ...taxonomies.map((t) => ({ id: `c-${t.id}`, column: 'catalogue', label: t.short, name: t.name, href: `#tb-${t.id}` })),
    ...LAYERS.map((n) => ({ id: `l-${n}`, column: 'layer', label: layerLabel(n), name: layerName(n), tone: n as Tone })),
    ...TOOLS.map((tool) => ({ id: `t-${tool}`, column: 'tool', label: TOOL_LABEL[tool] })),
  ];
  return flowPair({
    id: 'tb-flow',
    title: 'Catalogue, layer and test tool',
    desc: `The ${threats.length} threat rows flow from their catalogue to the stack layers their controls live in, then to the tools that test them, counted as pairs.`,
    source: 'threat bridge rows on this page',
    asOf: THREATS_AS_OF,
    columns: [
      { key: 'catalogue', label: 'Catalogue' },
      { key: 'layer', label: 'Stack layer' },
      { key: 'tool', label: 'Test tool' },
    ],
    nodes,
    links: [...toLinks(stage1), ...toLinks(stage2)],
    tableCaption: 'Threat-layer pairs per catalogue and threat-layer-tool pairs per layer',
  });
}

export type Framework = 'aicm' | 'iso';

export interface FrameworkGrid {
  chart: ChartOutput;
  /** Ids no threat row names, in the lookup table's order, with their titles. */
  unnamed: { id: string; name: string }[];
}

export function threatGrid(framework: Framework): FrameworkGrid {
  const lookup: Readonly<Record<string, string>> = framework === 'aicm' ? aicmDomains : iso42001Controls;
  const named = (t: Threat): readonly string[] => (framework === 'aicm' ? t.aicm : t.iso42001);
  const ids = Object.keys(lookup).filter((id) => threats.some((t) => named(t).includes(id)));
  const label = framework === 'aicm' ? 'CSA AICM v1.1 domain' : 'ISO/IEC 42001 Annex A control';
  const chart = heatGrid({
    id: `tb-grid-${framework}`,
    title: framework === 'aicm' ? 'Threats per CSA AICM domain' : 'Threats per ISO/IEC 42001 control',
    desc: `For each catalogue, how many of its threat rows name each ${label}.`,
    source: 'threat bridge rows on this page',
    asOf: THREATS_AS_OF,
    mode: MODE,
    rowHeader: 'Catalogue',
    rows: taxonomies.map((t) => ({ label: t.short, href: `#tb-${t.id}` })),
    columns: ids.map((id) => ({ label: id })),
    values: taxonomies.map((t) => ids.map((id) => threats.filter((row) => row.taxonomy === t.id && named(row).includes(id)).length)),
    unit: 'threats',
    tableCaption: `Threat rows of each catalogue that name each ${label}`,
  });
  const unnamed = Object.keys(lookup)
    .filter((id) => !ids.includes(id))
    .map((id) => ({ id, name: lookup[id] }));
  return { chart, unnamed };
}

// --------------------------------------------------------------- harms -- //

const mitKey = (code: string) => `mit-${code.split('.')[0]}`;

export function harmTarget(): Pair {
  const used = [...new Set(harms.map((h) => h.layerN[0]))].sort((a, b) => a - b);
  const base = {
    title: 'Where each harm lands',
    desc: `The ${harms.length} harms of the atlas, each in the ring of the level it lands on and the sector of its MIT AI Risk Repository domain, coloured by the stack layer of the control that catches it.`,
    source: 'harms atlas; MIT AI Risk Repository domains (CC BY 4.0)',
    mode: MODE,
    rings: levelOrder.map((level) => ({ key: level, label: levelLabel[level], href: `#level-${level}` })),
    sectors: Object.entries(mitDomains).map(([n, label]) => ({ key: `mit-${n}`, label })),
    marks: harms.map((h) => ({
      label: h.harmType,
      ring: h.level,
      sector: mitKey(h.mitTaxonomy[0]),
      tone: h.layerN[0] as Tone,
      href: `#harm-${h.id}`,
    })),
    centre: { label: 'AI system' },
    legend: used.map((n) => ({ label: layerLabel(n), tone: n as Tone })),
    itemHeader: 'Harm',
    ringHeader: 'Level',
    sectorHeader: 'MIT domain',
    tableCaption: 'Each harm with its level, MIT domain and the layer of its control',
  };
  return {
    wide: concentricRings({ ...base, id: 'hm-target-w', width: WIDE, layout: 'wide' }),
    narrow: concentricRings({ ...base, id: 'hm-target-n', width: NARROW_WIDTH, layout: 'narrow' }),
  };
}

export function harmFlow(): Pair {
  const stage1 = tally(harms.flatMap((h) => h.mechanism.map((m) => `m-${m}>v-${h.level}`)));
  const stage2 = tally(harms.flatMap((h) => h.layerN.map((n) => `v-${h.level}>l-${n}`)));
  // Mechanisms by the mean level of their harms, ties in data order.
  const mechanisms = (Object.keys(mechanismLabel) as HarmMechanism[])
    .map((m, i) => {
      const at = harms.filter((h) => h.mechanism.includes(m)).map((h) => levelOrder.indexOf(h.level));
      return { m, i, mean: at.length ? at.reduce((s, x) => s + x, 0) / at.length : Infinity };
    })
    .sort((a, b) => a.mean - b.mean || a.i - b.i)
    .map((x) => x.m);
  const nodes: SankeyNode[] = [
    ...mechanisms.map((m) => ({ id: `m-${m}`, column: 'mechanism', label: mechanismLabel[m] })),
    ...levelOrder.map((level) => ({ id: `v-${level}`, column: 'level', label: levelLabel[level], href: `#level-${level}` })),
    ...LAYERS.map((n) => ({ id: `l-${n}`, column: 'layer', label: layerLabel(n), name: layerName(n), tone: n as Tone })),
  ];
  return flowPair({
    id: 'hm-flow',
    title: 'Mechanism, level and layer',
    desc: `How the mechanisms behind the ${harms.length} harms lead to the level each lands on, and the stack layer of the control that catches it, counted as pairs.`,
    source: 'harms atlas rows on this page',
    columns: [
      { key: 'mechanism', label: 'Mechanism' },
      { key: 'level', label: 'Level' },
      { key: 'layer', label: 'Control layer' },
    ],
    nodes,
    links: [...toLinks(stage1), ...toLinks(stage2)],
    tableCaption: 'Harm-mechanism pairs per level and harm-layer pairs per level',
  });
}
