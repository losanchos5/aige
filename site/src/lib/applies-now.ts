// applies-now.ts: "what applies now" under the EU AI Act, computed from the
// obligation register (src/data/frameworks.ts) and nothing else. Two readings:
//
// - `inForce(today)`: the EU AI Act rows whose `appliesFrom` is on or before
//   `today` (the duties that already apply);
// - `nextDates(today, n)`: the next `n` dates after `today` on which something
//   switches on, each with what it switches on. A date collects two kinds of
//   event: rows whose `appliesFrom` is that date (grouped under the system class
//   they share) and dated `milestones` of any row (grouped by their note).
//
// The dates, notes and clauses are the register's own, so the home band and
// the audience hubs can never disagree with /obligations. `today` is the build
// date by default: the site is rebuilt on every push, and a date that has
// passed drops out on the next build. Tests pass a fixed date.
import {
  obligations,
  obligationPath,
  systemClassLabels,
  type Obligation,
  type SystemClass,
} from '../data/frameworks';

const EU_ID = 'eu-ai-act';
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Today's date as YYYY-MM-DD (UTC), the default reference date. */
export function isoToday(): string {
  return new Date().toISOString().slice(0, 10);
}

/** `2026-12-02` -> `2 Dec 2026`, the prose date format of STYLEGUIDE §2. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) throw new Error(`applies-now: not an ISO date: "${iso}"`);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** The EU AI Act rows of the register, in register order. */
export function euRows(): Obligation[] {
  return obligations.filter((row) => row.frameworkId === EU_ID);
}

/** The EU AI Act rows that already apply on `today`, in register order. */
export function inForce(today: string = isoToday()): Obligation[] {
  return euRows().filter((row) => row.appliesFrom !== undefined && row.appliesFrom <= today);
}

/** One thing that switches on at a date, with the rows it concerns. */
export interface AppliesItem {
  /** What switches on, in the register's words. */
  note: string;
  rows: Obligation[];
}

/** A date on which something under the EU AI Act switches on. */
export interface AppliesDate {
  /** YYYY-MM-DD. */
  date: string;
  items: AppliesItem[];
}

/** The system class every row shares, taking the first row's order; undefined when none. */
function sharedClass(rows: readonly Obligation[]): SystemClass | undefined {
  const first = rows[0]?.systemClass ?? [];
  return first.find((cls) => rows.every((row) => row.systemClass?.includes(cls)));
}

/**
 * The next `count` dates strictly after `today` on which an EU AI Act row, or
 * a dated step of one, starts to apply. Items on a date: first the rows that
 * start to apply (one item), then each distinct milestone note, in the order
 * the register first names it.
 */
export function nextDates(today: string = isoToday(), count = 3): AppliesDate[] {
  const byDate = new Map<string, { starting: Obligation[]; notes: Map<string, Obligation[]> }>();
  const slot = (date: string) => {
    let entry = byDate.get(date);
    if (!entry) {
      entry = { starting: [], notes: new Map() };
      byDate.set(date, entry);
    }
    return entry;
  };

  for (const row of euRows()) {
    if (row.appliesFrom && row.appliesFrom > today) slot(row.appliesFrom).starting.push(row);
    for (const step of row.milestones ?? []) {
      if (step.date <= today) continue;
      const notes = slot(step.date).notes;
      const rows = notes.get(step.note) ?? [];
      if (!rows.includes(row)) rows.push(row);
      notes.set(step.note, rows);
    }
  }

  return [...byDate.keys()]
    .sort()
    .slice(0, count)
    .map((date) => {
      const { starting, notes } = byDate.get(date)!;
      const items: AppliesItem[] = [];
      if (starting.length) {
        const cls = sharedClass(starting);
        const what = cls ? `${systemClassLabels[cls]} obligations` : 'Obligations';
        items.push({ note: `${what} start to apply`, rows: starting });
      }
      for (const [note, rows] of notes) items.push({ note, rows });
      return { date, items };
    });
}

/** A clause as a short reference label: `Art. 49 / Art. 71` -> `49/71`. */
export function articleLabel(row: Pick<Obligation, 'clause'>): string {
  return row.clause.replace(/Art\.\s*/g, '').replace(/\s*\/\s*/g, '/');
}

/** A linked reference to a row: its short article label, its page and its name. */
export interface ClauseLink {
  label: string;
  href: string;
  name: string;
}

export function clauseLinks(rows: readonly Obligation[]): ClauseLink[] {
  return rows.map((row) => ({
    label: articleLabel(row),
    href: obligationPath(row),
    name: row.obligation,
  }));
}

/** The newest `reviewed` date among the EU AI Act rows (the band's "as reviewed" stamp). */
export function euReviewed(): string {
  return euRows().reduce((max, row) => (row.reviewed > max ? row.reviewed : max), '');
}
