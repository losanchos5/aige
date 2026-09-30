// coverage.ts: the build-time numbers behind a crosswalk coverage map (first
// used by /resources/frontier-safety-crosswalk, OpenSpec change
// frontier-coverage-map). For every topic x column it derives one cell state
// from the refs and the documented gaps, then per-row consensus, per-column
// totals and the labs/standards divergence the "Labs vs standards" lens marks.
//
// A cell is coverage, not conformity: `core` counts sections mainly about the
// topic, `related` sections that touch it; more sections is not better
// coverage. States, in priority order:
//   gap     - a documented gap for one of the column's frameworks
//   core    - at least one core ref (level = min(core count, 3))
//   related - refs, none of them core
//   none    - neither refs nor a gap (allowed for non-lab columns)
//
// Types only from the data modules, so the function stays pure and generic
// over the general crosswalk too.
import type { ColumnGroup, CrosswalkColumn, CrosswalkRef, Topic } from '../data/crosswalk';

export type CoverageState = 'gap' | 'core' | 'related' | 'none';

export interface CoverageGap {
  topic: string;
  framework: string;
  note: string;
}

export interface CoverageCell {
  col: string;
  state: CoverageState;
  core: number;
  related: number;
  /** 1-3 for core cells (3 = three or more core refs), 0 otherwise. */
  level: 0 | 1 | 2 | 3;
  gapNote?: string;
}

/** 'labs' when every lab column has a core ref and some other column does not;
 *  'standards' when a non-lab column has a core ref and some lab column does not. */
export type Divergence = 'labs' | 'standards';

export interface CoverageRow {
  topic: string;
  cells: CoverageCell[];
  /** Columns with at least one core ref. */
  consensus: number;
  divergence: Divergence[];
}

export interface CoverageColumnTotal {
  col: string;
  /** Topics with any ref in the column. */
  covered: number;
  /** Topics with at least one core ref in the column. */
  core: number;
}

export interface Coverage {
  rows: CoverageRow[];
  columns: CoverageColumnTotal[];
}

const LAB_GROUP: ColumnGroup = 'labs';

export function computeCoverage(input: {
  topics: readonly Topic[];
  columns: readonly CrosswalkColumn[];
  refs: readonly CrosswalkRef[];
  gaps?: readonly CoverageGap[];
}): Coverage {
  const { topics, columns, refs, gaps = [] } = input;

  const rows: CoverageRow[] = topics.map((topic) => {
    const cells: CoverageCell[] = columns.map((column) => {
      const inCol = (fw: string) => column.frameworks.includes(fw);
      const cellRefs = refs.filter((r) => r.topic === topic.id && inCol(r.framework));
      const core = cellRefs.filter((r) => r.strength === 'core').length;
      const related = cellRefs.length - core;
      const gap = gaps.find((g) => g.topic === topic.id && inCol(g.framework));
      if (gap) return { col: column.id, state: 'gap', core, related, level: 0, gapNote: gap.note };
      if (core > 0) {
        const level = Math.min(core, 3) as 1 | 2 | 3;
        return { col: column.id, state: 'core', core, related, level };
      }
      return { col: column.id, state: related > 0 ? 'related' : 'none', core, related, level: 0 };
    });

    const isLab = (i: number) => columns[i].group === LAB_GROUP;
    const hasCore = (c: CoverageCell) => c.state === 'core';
    const labCells = cells.filter((_, i) => isLab(i));
    const otherCells = cells.filter((_, i) => !isLab(i));
    const divergence: Divergence[] = [];
    if (labCells.length && otherCells.length) {
      if (labCells.every(hasCore) && !otherCells.every(hasCore)) divergence.push('labs');
      if (otherCells.some(hasCore) && !labCells.every(hasCore)) divergence.push('standards');
    }

    return {
      topic: topic.id,
      cells,
      consensus: cells.filter(hasCore).length,
      divergence,
    };
  });

  const totals: CoverageColumnTotal[] = columns.map((column, i) => ({
    col: column.id,
    covered: rows.filter((r) => r.cells[i].core + r.cells[i].related > 0).length,
    core: rows.filter((r) => r.cells[i].state === 'core').length,
  }));

  return { rows, columns: totals };
}
