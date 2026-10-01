// layer-matrix.ts: the data of the two LayerMatrix grids (OpenSpec
// page-visuals-2, block E), drawn by src/components/LayerMatrix.astro:
//
//   stackLayerMatrix       /stack: what fills each layer, the five layers x
//                          six kinds of record (obligations, patterns,
//                          controls, tools, path nodes, workflows)
//   pathStageLayerMatrix   /path: where each stage sits in the stack, the four
//                          stages x the five layers (and the cross-cutting
//                          nodes that name no layer)
//
// Every count is read from its register; nothing adds a fact. Counting rule of
// the stack grid: a record with a home layer counts once, in that layer
// (patterns and controls, which /patterns and /controls also group by home
// layer); a record that names several layers with no home among them counts
// in each (obligations and tools, which their layer filters also match on any
// layer named); the one workflow that spans every layer counts in each; a
// path node without a layer is cross-cutting and counts in none.
import { obligations } from '../../data/frameworks';
import { patterns } from '../../data/patterns';
import { controls } from '../../data/controls';
import { allTools, layers, type LayerNumber } from '../../data/stack';
import { nodeHref, nodes, stages, type PathKind } from '../../data/path';
import { workflows } from '../../data/role';

export type LayerTone = 1 | 2 | 3 | 4 | 5;

export interface MatrixAxis {
  key: string;
  /** Visible heading ("Obligations", "Foundations"). */
  label: string;
  /** Two-digit number printed before the label ("01"). */
  num?: string;
  /** Stack layer colour of the row or column (only when it IS a layer). */
  tone?: LayerTone;
}

export interface MatrixCell {
  value: number;
  /** The filtered view or the first record of the cell; none when empty. */
  href?: string;
  /** What the number counts, for the cell's accessible name
   *  ("obligations in layer 01"): "<value> <label>". */
  label: string;
  /** Unit glyphs in reading order (path nodes by kind); a bar otherwise. */
  marks?: PathKind[];
}

export interface LayerMatrixData {
  rowHeader: string;
  rows: MatrixAxis[];
  columns: MatrixAxis[];
  /** cells[row][column] */
  cells: MatrixCell[][];
}

const pad = (n: number) => String(n).padStart(2, '0');
const LAYERS: readonly LayerNumber[] = [1, 2, 3, 4, 5];
const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);

interface StackColumn {
  key: string;
  label: string;
  one: string;
  many: string;
  count: (n: LayerNumber) => number;
  href?: (n: LayerNumber) => string;
}

const tools = allTools();

const STACK_COLUMNS: readonly StackColumn[] = [
  {
    key: 'obligations',
    label: 'Obligations',
    one: 'obligation',
    many: 'obligations',
    count: (n) => obligations.filter((o) => o.layerN.includes(n)).length,
    href: (n) => `/resources/frameworks#ob-layer-${n}`,
  },
  {
    key: 'patterns',
    label: 'Patterns',
    one: 'pattern',
    many: 'patterns',
    count: (n) => patterns.filter((p) => p.layer === n).length,
    href: (n) => `/patterns#layer-${pad(n)}`,
  },
  {
    key: 'controls',
    label: 'Controls',
    one: 'control',
    many: 'controls',
    count: (n) => controls.filter((c) => c.layer === n).length,
    href: (n) => `/controls#layer-${n}`,
  },
  {
    key: 'tools',
    label: 'Tools',
    one: 'tool',
    many: 'tools',
    count: (n) => tools.filter((t) => t.layers.includes(n)).length,
    href: (n) => `/resources/tools?layers=${n}`,
  },
  {
    key: 'path',
    label: 'Path nodes',
    one: 'learning-path node',
    many: 'learning-path nodes',
    count: (n) => nodes.filter((node) => node.layerN === n).length,
  },
  {
    key: 'workflows',
    label: 'Workflows',
    one: 'workflow',
    many: 'workflows',
    count: (n) => workflows.filter((w) => w.layerN === n || w.layerN === 'all').length,
  },
];

/** /stack: the five layers x six kinds of record. */
export function stackLayerMatrix(): LayerMatrixData {
  return {
    rowHeader: 'Layer',
    rows: layers.map((layer) => ({ key: `l${layer.n}`, label: layer.name, num: pad(layer.n), tone: layer.n })),
    columns: STACK_COLUMNS.map((c) => ({ key: c.key, label: c.label })),
    cells: layers.map((layer) =>
      STACK_COLUMNS.map((c) => {
        const value = c.count(layer.n);
        return {
          value,
          href: value > 0 && c.href ? c.href(layer.n) : undefined,
          label: `${plural(value, c.one, c.many)} in layer ${pad(layer.n)}`,
        };
      }),
    ),
  };
}

/** The register sizes the /stack caption names. */
export const stackMatrixTotals = {
  obligations: obligations.length,
  patterns: patterns.length,
  controls: controls.length,
  tools: tools.length,
  nodes: nodes.length,
  crossCuttingNodes: nodes.filter((node) => node.layerN === undefined).length,
  workflows: workflows.length,
};

const KIND_WORD: Record<PathKind, [string, string]> = {
  core: ['core', 'core'],
  alternative: ['alternative', 'alternatives'],
  optional: ['optional', 'optional'],
};
const KINDS: readonly PathKind[] = ['core', 'alternative', 'optional'];

/** /path: the four stages x the five layers, plus the cross-cutting nodes. */
export function pathStageLayerMatrix(): LayerMatrixData {
  const columns: { key: string; label: string; num?: string; tone?: LayerTone; layer?: LayerNumber }[] = [
    ...LAYERS.map((n) => ({ key: `l${n}`, label: `Layer ${pad(n)}`, tone: n, layer: n })),
    { key: 'none', label: 'Cross-cutting' },
  ];
  return {
    rowHeader: 'Stage',
    rows: stages.map((stage) => ({ key: stage.id, label: stage.title, num: pad(stage.n) })),
    columns: columns.map(({ key, label, tone }) => ({ key, label, tone })),
    cells: stages.map((stage) =>
      columns.map((column) => {
        const here = nodes.filter((node) => node.stage === stage.id && node.layerN === column.layer);
        const where = column.layer ? `layer ${pad(column.layer)}` : 'no layer (cross-cutting)';
        const kinds = KINDS.map((k) => [k, here.filter((node) => node.kind === k).length] as const)
          .filter(([, n]) => n > 0)
          .map(([k, n]) => `${n} ${KIND_WORD[k][n === 1 ? 0 : 1]}`);
        return {
          value: here.length,
          href: here.length ? nodeHref(here[0].id) : undefined,
          label: `${plural(here.length, 'node', 'nodes')} in ${stage.title}, ${where}${kinds.length ? `: ${kinds.join(', ')}` : ''}`,
          marks: here.map((node) => node.kind),
        };
      }),
    ),
  };
}
