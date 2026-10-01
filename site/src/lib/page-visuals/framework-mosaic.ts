// framework-mosaic.ts: the instrument mosaic of /resources/frameworks, a
// treemap computed from data/frameworks.ts: one group per instrument type
// (law, standard, framework, code, controls), one tile per instrument, tile
// area = the obligation rows filed under it (obligations[].frameworkId). Each
// tile links to the instrument's row in the table on the same page
// (#fw-<id>); a "+N" tile of small instruments links to the table itself.
//
// An instrument with no obligation row has no area to draw: a tile of any
// size would claim rows it does not have. It stays out of the treemap and
// the page lists it in one line under the chart (withoutObligations()).
// minTile 40 merges the long tail of one-row instruments sooner, which keeps
// every linked tile inside the 12 KB SVG budget.
import { NARROW_WIDTH, treemap, type ChartMode, type ChartOutput } from '../charts';
import { frameworks, obligations, type Framework, type FrameworkType } from '../../data/frameworks';

export interface Pair {
  wide: ChartOutput;
  narrow: ChartOutput;
}

const MODE: ChartMode = 'figc';
/** The anchor of the frameworks table, the target of every "+N" tile. */
export const FRAMEWORK_TABLE_ID = 'framework-table';

const TYPE_LABEL: Readonly<Record<FrameworkType, string>> = {
  law: 'Laws',
  standard: 'Standards',
  framework: 'Frameworks',
  code: 'Codes',
  controls: 'Control sets',
};

const rowsOf = (fw: Framework) => obligations.filter((o) => o.frameworkId === fw.id).length;

/** Instruments with no obligation row, in table order. */
export function withoutObligations(): Framework[] {
  return frameworks.filter((fw) => rowsOf(fw) === 0);
}

const total = (g: { items: { value: number }[] }) => g.items.reduce((n, it) => n + it.value, 0);

export function frameworkMosaic(): Pair {
  const types = [...new Set(frameworks.map((fw) => fw.type))];
  const groups = types
    .map((type) => ({
      label: TYPE_LABEL[type],
      href: `#${FRAMEWORK_TABLE_ID}`,
      items: frameworks
        .filter((fw) => fw.type === type && rowsOf(fw) > 0)
        .map((fw) => ({ label: fw.short, name: fw.name, value: rowsOf(fw), href: `#fw-${fw.id}` })),
    }))
    .filter((g) => g.items.length > 0)
    // Most rows first: the narrow variant stacks the groups in this order.
    .sort((a, b) => total(b) - total(a));
  const drawn = groups.reduce((n, g) => n + g.items.length, 0);
  const base = {
    title: 'Instruments by type, sized by obligations',
    desc: `The ${drawn} instruments with obligation rows, grouped by type, each tile as large as its number of obligation rows.`,
    source: 'the obligation index on this page',
    mode: MODE,
    groups,
    unit: 'obligations',
    unitOne: 'obligation',
    groupHeader: 'Type',
    itemHeader: 'Instrument',
    valueHeader: 'Obligations',
    minTile: 40,
    tableCaption: 'Obligation rows per instrument, by type',
  };
  return {
    wide: treemap({ ...base, id: 'fw-mosaic-w', width: 760, plotHeight: 520 }),
    narrow: treemap({ ...base, id: 'fw-mosaic-n', width: NARROW_WIDTH, layout: 'narrow', plotHeight: 560 }),
  };
}
