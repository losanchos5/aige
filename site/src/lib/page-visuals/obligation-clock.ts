// obligation-clock.ts: register rows (src/data/frameworks.ts) as the input of
// the regulatory clock (src/lib/page-charts/regulatory-clock.ts), for the
// per-pattern clock on /patterns/<slug> and the audience calendar on
// /for/<slug>. Every date, status and step is the row's own; the as-of date
// is the newest `reviewed` date among the rows drawn, so the chart moves only
// when the register does, never with the build clock.
//
//   state by status: in force solid, grace period dashed, applies later
//   outlined, deferred hatched (voluntary outlined and draft dashed too; the
//   clock throws if two statuses on one fill ever meet in one chart).
import { regulatoryClock, CLOCK_LABEL_MAX, type ClockRow } from '../page-charts/regulatory-clock';
import { textWidth, type ChartOutput, type MarkState } from '../charts/core';
import { appliesStatusLabels, obligationPath, type AppliesStatus, type Obligation } from '../../data/frameworks';
import { frameworkOf } from '../obligations';
import { instrumentClause, obligationHeading } from '../obligation-title';

/** Fill of each status, in the legend's order. */
export const CLOCK_STATE: Readonly<Record<AppliesStatus, MarkState>> = {
  'in-force': 'filled',
  grace: 'dashed',
  'applies-later': 'outline',
  deferred: 'hatched',
  voluntary: 'outline',
  pending: 'dashed',
};

/** Dates before it share the "Before 2024" column: the AI Act entered into
 *  force on 2024-08-01, and the window keeps its dates legible. */
export const CLOCK_WINDOW_FROM = '2024-01-01';

const EU = 'eu-ai-act';

/** The chip label: the clause for an EU AI Act row, else instrument and
 *  clause, or the instrument alone when that does not fit a chip. */
export function clockLabel(row: Obligation): string {
  if (row.frameworkId === EU) return row.clause;
  const full = instrumentClause(row);
  return textWidth(full, 12.5) <= CLOCK_LABEL_MAX ? full : frameworkOf(row).short;
}

export function clockRows(rows: readonly Obligation[]): ClockRow[] {
  return rows.map((row) => ({
    label: clockLabel(row),
    name: obligationHeading(row),
    short: instrumentClause(row),
    href: obligationPath(row),
    state: CLOCK_STATE[row.appliesStatus],
    status: appliesStatusLabels[row.appliesStatus],
    first: row.appliesFrom,
    steps: row.milestones?.map((m) => ({ date: m.date, note: m.note })),
  }));
}

/** The newest review date among the rows: the clock's as-of date. */
export function clockAsOf(rows: readonly Obligation[]): string {
  return rows.reduce((max, row) => (row.reviewed > max ? row.reviewed : max), '');
}

/** True when at least one row has a date to draw. */
export function hasClock(rows: readonly Obligation[]): boolean {
  return rows.some((row) => row.appliesFrom || row.milestones?.length);
}

export interface ClockCopy {
  /** Prefix of the two SVG ids (`<prefix>-w`, `<prefix>-n`). */
  id: string;
  title: string;
  desc: string;
  tableCaption: string;
}

/** The wide and narrow clock of `rows`, or null when no row has a date. */
export function obligationClock(rows: readonly Obligation[], copy: ClockCopy): { wide: ChartOutput; narrow: ChartOutput } | null {
  if (!hasClock(rows)) return null;
  const statuses = (Object.keys(appliesStatusLabels) as AppliesStatus[]).map((s) => ({ state: CLOCK_STATE[s], label: appliesStatusLabels[s] }));
  const base = {
    title: copy.title,
    desc: copy.desc,
    tableCaption: copy.tableCaption,
    source: 'the obligation register (/obligations)',
    asOf: clockAsOf(rows),
    today: clockAsOf(rows),
    rows: clockRows(rows),
    statuses,
    windowFrom: CLOCK_WINDOW_FROM,
  };
  return {
    wide: regulatoryClock({ ...base, id: `${copy.id}-w` }),
    narrow: regulatoryClock({ ...base, id: `${copy.id}-n`, width: 340, orientation: 'vertical' }),
  };
}
