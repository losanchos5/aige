// register-clock-rows.ts: register rows (src/data/frameworks.ts) as the input
// of the regulatory clock (src/lib/page-charts/regulatory-clock.ts), for the
// per-pattern clock on /patterns/<slug> and the audience calendar on
// /for/<slug>. Every date, status and step is the row's own; the as-of date
// is registerAsOf of the rows drawn (their newest `reviewed` date), so the
// chart moves only when the register does, never with the build clock.
//
// A first date is drawn in the site-wide status encoding (appliesStatusMark:
// the same shape and drawing as on the /obligations clock and isotype and
// the /obligations/<id> strip), so no two statuses ever share a mark.
import { regulatoryClock, CLOCK_LABEL_MAX, type ClockRow } from '../page-charts/regulatory-clock';
import { NARROW_WIDTH, textWidth, type ChartOutput } from '../charts/core';
import {
  appliesStatusLabels,
  appliesStatusMark,
  obligationPath,
  registerAsOf,
  type AppliesStatus,
  type Obligation,
} from '../../data/frameworks';
import { frameworkOf } from '../obligations';
import { instrumentClause, obligationHeading } from '../obligation-title';

/** Dates before it share the "Before 2024" column: the AI Act entered into
 *  force on 2024-08-01, and the window keeps its dates legible. */
export const CLOCK_WINDOW_FROM = '2024-01-01';

const EU = 'eu-ai-act';
const fits = (label: string) => textWidth(label, 12.5) <= CLOCK_LABEL_MAX;

/** The chip label: the clause for an EU AI Act row, else instrument and
 *  clause, or the instrument alone when that does not fit a chip. */
export function clockLabel(row: Obligation): string {
  if (row.frameworkId === EU) return row.clause;
  const full = instrumentClause(row);
  return fits(full) ? full : frameworkOf(row).short;
}

/** The dates a row is drawn at (its first date and its steps). */
const datesOf = (row: Obligation): string[] => [...(row.appliesFrom ? [row.appliesFrom] : []), ...(row.milestones ?? []).map((m) => m.date)];

/**
 * The chip labels of `rows`: clockLabel, except where two rows would show the
 * same label on one date (two clauses of one instrument cut to its short
 * name). Those fall back to the instrument's first word and the clause
 * ("Korea Art. 31(1)"), then to the clause alone.
 */
function labelsOf(rows: readonly Obligation[]): string[] {
  const labels = rows.map(clockLabel);
  const clashing = rows.map((row, i) =>
    rows.some((other, j) => j !== i && labels[j] === labels[i] && datesOf(other).some((d) => datesOf(row).includes(d))),
  );
  return rows.map((row, i) => {
    if (!clashing[i]) return labels[i];
    const head = frameworkOf(row).short.split(/\s+/)[0];
    return [`${head} ${row.clause}`, row.clause].find(fits) ?? labels[i];
  });
}

export function clockRows(rows: readonly Obligation[]): ClockRow[] {
  const labels = labelsOf(rows);
  return rows.map((row, i) => ({
    label: labels[i],
    name: obligationHeading(row),
    short: instrumentClause(row),
    href: obligationPath(row),
    ...appliesStatusMark[row.appliesStatus],
    status: appliesStatusLabels[row.appliesStatus],
    first: row.appliesFrom,
    steps: row.milestones?.map((m) => ({ date: m.date, note: m.note })),
  }));
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
  const statuses = (Object.keys(appliesStatusLabels) as AppliesStatus[]).map((s) => ({ ...appliesStatusMark[s], label: appliesStatusLabels[s] }));
  const asOf = registerAsOf(rows);
  const base = {
    title: copy.title,
    desc: copy.desc,
    tableCaption: copy.tableCaption,
    source: 'the obligation register (/obligations)',
    asOf,
    today: asOf,
    rows: clockRows(rows),
    statuses,
    windowFrom: CLOCK_WINDOW_FROM,
  };
  return {
    wide: regulatoryClock({ ...base, id: `${copy.id}-w` }),
    narrow: regulatoryClock({ ...base, id: `${copy.id}-n`, width: NARROW_WIDTH, orientation: 'vertical' }),
  };
}
