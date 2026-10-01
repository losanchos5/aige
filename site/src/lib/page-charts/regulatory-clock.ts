// regulatory-clock.ts: when a set of obligations starts to bite, drawn from
// their own dates. Each date is a station; each obligation is a chip (a mark
// and a short label) at the station of the date it first applies and of each
// later dated step. The first-date mark carries the row's status as a shape
// and a drawing (the site-wide encoding the caller passes in, as on the
// /obligations clock: never colour alone); a later step is a square, filled
// once its date is on or before the as-of date and outlined while ahead, the
// same meaning the square has on /obligations and /obligations/<id>. A dashed
// line marks the as-of date of the data (never the build clock), and the two
// counts beside it say how many obligations already apply and how many are
// still to come. Rows without a date are counted on a line of their own and
// listed in the table.
//
//   horizontal (wide, 560 by default): a staircase. One row per station, top
//     to bottom in date order, the date at the left; the station's dot sits
//     at its true x on a shared time axis (time left to right, year rules
//     through every row) and its chips flow beside it, right of the dot or,
//     near the end of the axis, left of it, wrapping onto further lines.
//     Dates before `windowFrom` share one "Before YYYY" row whose dot sits
//     behind a break at the start of the axis, so a 1938 statute does not
//     squash the 2024 to 2030 window into a sliver.
//   vertical (narrow, NARROW_WIDTH): the same stations as an agenda, chips flowing in
//     rows under each date, the as-of line between the two sides.
//
// A station draws at most `maxPerStation` chips, then a "+N more" line; the
// table lists every event: Date | Obligation | Step | Status. First-date
// chips link to their obligation; a chip's hit box is the whole chip, 24 px
// tall, so linked chips keep the WCAG 2.5.8 pointer-target size.
//
// Built on the chart kit's shell and helpers (src/lib/charts/core.ts); no
// runtime imports and no data imports (src/lib/page-visuals/register-clock-rows.ts
// maps register rows onto it).
import { legendGroups } from './legend-groups';
import {
  NARROW_WIDTH,
  asOfLabel,
  asOfMark,
  minText,
  assemble,
  fitText,
  markStyles,
  nonEmpty,
  parseDay,
  r1,
  shape,
  table,
  targets,
  text,
  textWidth,
  timeScale,
  type ChartBase,
  type ChartOutput,
  type MarkState,
} from '../charts/core';

export interface ClockRow {
  /** Drawn chip label: one short line (throws when wider than CLOCK_LABEL_MAX). */
  label: string;
  /** Full name, for the table. */
  name: string;
  /** Short name for the chip's tooltip and link name (default: the label). */
  short?: string;
  href?: string;
  /** The row's status as a mark state (legend: `statuses`). */
  state: MarkState;
  /** The row's status as a first-date shape (default circle; legend: `statuses`). */
  shape?: 'circle' | 'triangle';
  /** Wording of the status ("Deferred"). */
  status: string;
  /** YYYY-MM-DD the row first applies; undefined: no date. */
  first?: string;
  /** Later dated steps. */
  steps?: readonly { date: string; note: string }[];
}

export interface RegulatoryClockInput extends ChartBase {
  rows: ClockRow[];
  /** The as-of date of the data: the dashed line, labelled "As of <today>"
   *  (core asOfMark). */
  today: string;
  /** The legend of first-date marks, in order; only the statuses of dated
   *  rows are drawn, and two of them on one shape and fill throw. */
  statuses: { state: MarkState; shape?: 'circle' | 'triangle'; label: string }[];
  /** Dates before it share the "Before YYYY" station. */
  windowFrom?: string;
  orientation?: 'horizontal' | 'vertical';
  /** Chips per station before a "+N more" line (default 6). */
  maxPerStation?: number;
}

const L = 12;
const PITCH = 24;
const CHIP_PX = 12.5;
const GAP = 8;
/** Widest chip label. */
export const CLOCK_LABEL_MAX = 132;

const WORDS = {
  first: 'Applies from',
  step: 'Later step',
  firstHead: 'First applies',
  stepHead: 'Later step',
  pinHead: 'Date',
  pin: 'its place on the time axis',
  reached: 'Reached',
  ahead: 'Ahead',
  before: (d: string) => `Before ${d.slice(0, 4)}`,
  now: (n: number) => (n === 1 ? 'already applies' : 'already apply'),
  later: 'still to come',
  undated: (n: number) => `${n} without a date`,
  more: (n: number) => `+${n} more`,
  noDate: 'No date',
  date: 'Date',
  obligation: 'Obligation',
  stepCol: 'Step',
  status: 'Status',
};

interface Event {
  row: ClockRow;
  date: string;
  kind: 'first' | 'step';
  note?: string;
}

interface Station {
  /** Header: the date, or "Before YYYY". */
  head: string;
  /** Axis date (the window start for the Before station). */
  at: string;
  earlier: boolean;
  events: Event[];
  /** On or before the as-of date. */
  now: boolean;
}

const byCode = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

/** Stations in date order; within one, first dates before steps, then by label. */
function stationsOf(input: RegulatoryClockInput): Station[] {
  const events: Event[] = [];
  for (const row of input.rows) {
    if (row.first) events.push({ row, date: row.first, kind: 'first' });
    for (const step of row.steps ?? []) events.push({ row, date: step.date, kind: 'step', note: step.note });
  }
  for (const e of events) parseDay(e.date, `clock event ${e.row.label}`);
  const from = input.windowFrom;
  const map = new Map<string, Station>();
  for (const e of events) {
    const earlier = Boolean(from && e.date < from);
    const key = earlier ? '' : e.date; // '' sorts first
    if (!map.has(key)) {
      map.set(key, { head: earlier ? WORDS.before(from!) : e.date, at: earlier ? from! : e.date, earlier, events: [], now: e.date <= input.today });
    }
    map.get(key)!.events.push(e);
  }
  const stations = [...map.entries()].sort(([a], [b]) => byCode(a, b)).map(([, s]) => s);
  for (const s of stations) {
    s.events.sort(
      (a, b) =>
        byCode(a.date, b.date) ||
        (a.kind === b.kind ? 0 : a.kind === 'first' ? -1 : 1) ||
        byCode(a.row.label, b.row.label) ||
        byCode(a.row.name, b.row.name),
    );
  }
  return stations;
}

export function regulatoryClock(input: RegulatoryClockInput): ChartOutput {
  const where = `regulatoryClock ${input.id}`;
  nonEmpty(input.rows, 'rows', where);
  parseDay(input.today, 'clock today');
  const vertical = input.orientation === 'vertical';
  const W = input.width ?? (vertical ? NARROW_WIDTH : 560);
  const sm = minText(W);
  const max = input.maxPerStation ?? 6;
  const stations = stationsOf(input);
  const events = stations.flatMap((s) => s.events);
  if (!events.length) throw new Error(`charts(${where}): no row has a date; draw no clock`);
  const undated = input.rows.filter((r) => !r.first && !(r.steps ?? []).length);
  const drawn = input.rows.filter((r) => !undated.includes(r));
  // The legend names the marks the first dates use; two statuses on one
  // shape and fill would make it ambiguous, so that throws.
  const look = (x: { shape?: 'circle' | 'triangle'; state: MarkState }) => `${x.state} ${x.shape ?? 'circle'}`;
  for (const r of drawn) {
    if (!input.statuses.some((s) => look(s) === look(r) && s.label === r.status)) {
      throw new Error(`charts(${where}): status "${r.status}" (${look(r)}) of "${r.label}" is not in the legend`);
    }
  }
  const used = input.statuses.filter((s) => drawn.some((r) => r.status === s.label));
  const fills = new Map<string, string>();
  for (const s of used) {
    if (fills.has(look(s))) throw new Error(`charts(${where}): statuses "${fills.get(look(s))}" and "${s.label}" share the ${look(s)} mark`);
    fills.set(look(s), s.label);
  }
  // Two rows with one label at one station could not be told apart.
  for (const s of stations) {
    const seen = new Map<string, ClockRow>();
    for (const e of s.events) {
      const other = seen.get(e.row.label);
      if (other && other !== e.row) throw new Error(`charts(${where}): two rows at ${s.head} share the chip label "${e.row.label}"`);
      seen.set(e.row.label, e.row);
    }
  }
  const undatedLine = () => {
    const statuses = input.statuses.map((s) => s.label).filter((label, i, all) => all.indexOf(label) === i && undated.some((r) => r.status === label));
    const line = `${WORDS.undated(undated.length)} (${statuses.join(', ')})`;
    fitText(line, W - 2 * L, 12.5, 'body', 'undated');
    return line;
  };
  const marks = markStyles(input.id);
  const hits = targets(where);
  const out: string[] = [];

  // A later step is solid once its date is on or before the as-of date.
  const reached = (e: Event) => e.date <= input.today;
  const stepState = (e: Event): MarkState => (reached(e) ? 'filled' : 'outline');
  // Legend: the first-date marks in use (the status), then the later-step
  // squares in use (reached or ahead).
  const steps = events.filter((e) => e.kind === 'step');
  const firsts = used.filter((s) => events.some((e) => e.kind === 'first' && e.row.status === s.label));
  const lg = legendGroups(
    [
      { head: WORDS.firstHead, entries: firsts.map((s) => ({ label: s.label, shape: s.shape ?? ('circle' as const), state: s.state })) },
      {
        head: WORDS.stepHead,
        entries: [
          ...(steps.some(reached) ? [{ label: WORDS.reached, shape: 'square' as const, state: 'filled' as const }] : []),
          ...(steps.some((e) => !reached(e)) ? [{ label: WORDS.ahead, shape: 'square' as const, state: 'outline' as const }] : []),
        ],
      },
      // The staircase pins each date on the time axis with a solid bar.
      { head: WORDS.pinHead, entries: vertical ? [] : [{ label: WORDS.pin, swatch: 'pin' as const }] },
    ],
    L,
    16,
    W - L,
    marks,
    sm,
  );
  out.push(...lg.els);
  let y = lg.bottom + 10;

  // Count obligations, not events: a row applies now when its first date (or,
  // without one, its earliest step) is on or before the as-of date.
  const firstDate = (r: ClockRow) => r.first ?? [...(r.steps ?? [])].map((s) => s.date).sort(byCode)[0];
  const nNow = drawn.filter((r) => firstDate(r)! <= input.today).length;
  const nLater = drawn.length - nNow;
  const todayText = asOfLabel(input.today, input.lang);
  fitText(todayText, W - 2 * L, sm, 'mono', 'as-of label');

  const chipW = (e: Event) => 16 + textWidth(e.row.label, CHIP_PX);
  const tipOf = (e: Event) => `${e.row.short ?? e.row.label} · ${WORDS.first.toLowerCase()} ${e.date} · ${e.row.status}`;
  /** Horizontal only: the as-of x, so a chip it crosses gets a mask. */
  let maskAt: number | undefined;
  /** One chip: the mark at (x + 6, cy) and the label after it. A first date
   *  links its row, named by its tooltip; a later step is plain (the same
   *  row's first chip links it, and the table gives the step's note), which
   *  keeps per-item pages light. */
  const chip = (e: Event, x: number, cy: number) => {
    fitText(e.row.label, CLOCK_LABEL_MAX, CHIP_PX, 'body', 'chip label');
    const kind = e.kind === 'first' ? (e.row.shape ?? 'circle') : 'square';
    const attrs = marks.attrs(e.kind === 'first' ? e.row.state : stepState(e), 0);
    const w = chipW(e);
    const mask = maskAt !== undefined && maskAt > x - 2 && maskAt < x + w + 2 ? `<rect class="hatch-bg" x="${r1(x - 2)}" y="${r1(cy - 9)}" width="${r1(w + 4)}" height="18"/>` : '';
    const draw = (inner: string) => mask + shape(kind, x + 6, cy, 5.5, attrs, inner) + text(x + 16, cy + 4.5, e.row.label, { size: CHIP_PX, where: 'chip label' });
    if (e.kind === 'step' || !e.row.href) return draw('');
    const box = { x, y: cy - PITCH / 2, w: Math.max(PITCH, w), h: PITCH };
    return hits.mark(draw, tipOf(e), box, { href: e.row.href });
  };
  const shown = (s: Station) => s.events.slice(0, max);
  const extra = (s: Station) => Math.max(0, s.events.length - max);
  /** The drawn items of a station: its chips, then "+N more". */
  const items = (s: Station): { w: number; e?: Event; more?: string }[] => [
    ...shown(s).map((e) => ({ w: chipW(e), e })),
    ...(extra(s) ? [{ w: textWidth(WORDS.more(extra(s)), 12.5) + 4, more: WORDS.more(extra(s)) }] : []),
  ];
  /** Greedy lines of `list` within `room` px; null when one item is wider. */
  const flow = <T extends { w: number }>(list: T[], room: number): T[][] | null => {
    if (list.some((it) => it.w > room)) return null;
    const lines: T[][] = [[]];
    let used = 0;
    for (const it of list) {
      const line = lines[lines.length - 1];
      if (line.length && used + GAP + it.w > room) {
        lines.push([it]);
        used = it.w;
      } else {
        used += (line.length ? GAP : 0) + it.w;
        line.push(it);
      }
    }
    return lines;
  };
  const sideHead = (n: number, word: string, x: number, yy: number, anchor: 'start' | 'end') => {
    const numW = textWidth(String(n), 18, 'disp');
    const x0 = anchor === 'start' ? x : x - numW - 6 - textWidth(word, 12.5);
    return (
      text(x0, yy, n, { size: 18, cls: 'disp num', where: 'count' }) +
      text(x0 + numW + 6, yy, word, { size: 12.5, where: 'count label' })
    );
  };
  const headW = (n: number, word: string) => textWidth(String(n), 18, 'disp') + 6 + textWidth(word, 12.5);
  const drawItem = (it: { e?: Event; more?: string }, x: number, cy: number) =>
    it.e ? chip(it.e, x, cy) : text(x, cy + 4.5, it.more!, { size: 12.5, cls: 'ink2', where: 'more' });

  let bottom: number;
  if (!vertical) {
    const hasEarlier = stations[0].earlier;
    const dateW = Math.max(...stations.map((s) => textWidth(s.head, sm, 'mono'))) + 14;
    const x0 = L + dateW; // start of the time area
    const ax0 = x0 + (hasEarlier ? 22 : 8);
    const ax1 = W - L - 6;
    const years = [...stations.filter((s) => !s.earlier).map((s) => s.at), input.today].map((d) => Number(d.slice(0, 4)));
    const ts = timeScale(`${Math.min(...years)}-01-01`, `${Math.max(...years) + 1}-01-01`, [ax0, ax1]);
    const asOf = asOfMark(ts, input.today, input.lang, { width: W, axis: 'x', pad: L });
    const asX = asOf.at;
    maskAt = asX;
    const dotX = (s: Station) => (s.earlier ? x0 + 7 : ts.map(s.at));

    // The two counts, either side of the as-of line.
    y += 22;
    if (nNow > 0) {
      const fits = headW(nNow, WORDS.now(nNow)) <= asX - 8 - L;
      out.push(sideHead(nNow, WORDS.now(nNow), fits ? asX - 8 : L, y, fits ? 'end' : 'start'));
    }
    if (nLater > 0) {
      const fits = headW(nLater, WORDS.later) <= W - L - (asX + 8);
      if (!fits && nNow > 0) throw new Error(`charts(${where}): the counts do not fit beside the as-of line`);
      out.push(sideHead(nLater, WORDS.later, fits ? asX + 8 : L, y, 'start'));
    }
    // The axis on top: years, ticks down into the rows.
    y += 26;
    const axisY = y;
    // The break before the window (when a Before station exists) sits just
    // left of the axis start: a tick label that would reach over it starts at
    // its tick instead of centring on it.
    const bx = ax0 - 11;
    for (const t of ts.ticks) {
      const tx = ts.map(t.date);
      const clash = hasEarlier && tx - textWidth(t.label, sm, 'mono') / 2 < bx + 10;
      out.push(text(tx, axisY - 6, t.label, { size: sm, cls: 'num muted', anchor: clash ? 'start' : 'middle', where: 'tick' }));
    }
    out.push(`<line class="axis" x1="${r1(ax0)}" y1="${r1(axisY)}" x2="${r1(ax1)}" y2="${r1(axisY)}"/>`);
    if (hasEarlier) {
      out.push(`<line class="axis" x1="${r1(x0)}" y1="${r1(axisY)}" x2="${r1(bx - 4)}" y2="${r1(axisY)}"/>`);
      out.push(`<path class="axis" d="M${r1(bx - 7)} ${r1(axisY + 5)}L${r1(bx - 1)} ${r1(axisY - 5)}M${r1(bx + 1)} ${r1(axisY + 5)}L${r1(bx + 7)} ${r1(axisY - 5)}"/>`);
    }
    y += 6;

    // One row per station.
    const rowsOut: string[] = [];
    const chips: string[] = [];
    for (const s of stations) {
      const dx = dotX(s);
      const list = items(s);
      // Right of the dot, else left of it, whichever needs fewer lines; when
      // neither side holds the widest chip, the lines start at the time area.
      // A station still to come keeps its chips right of the as-of line.
      const right = flow(list, ax1 + 6 - (dx + 12));
      const left = flow(list, dx - 12 - (s.now ? x0 : Math.max(x0, asX + 8)));
      const side = right && (!left || right.length <= left.length) ? 'right' : left ? 'left' : 'under';
      const lines = side === 'right' ? right! : side === 'left' ? left! : flow(list, ax1 + 6 - x0);
      if (!lines) throw new Error(`charts(${where}): a chip of ${s.head} is wider than the chart`);
      const top = y;
      const firstCy = top + PITCH / 2 + (side === 'under' ? PITCH : 0);
      lines.forEach((line, i) => {
        const cy = firstCy + i * PITCH;
        const lineW = line.reduce((sum, it) => sum + it.w, 0) + (line.length - 1) * GAP;
        let x = side === 'right' ? dx + 12 : side === 'left' ? dx - 12 - lineW : x0;
        for (const it of line) {
          chips.push(drawItem(it, x, cy));
          x += it.w + GAP;
        }
      });
      const rowH = (side === 'under' ? 1 : 0) * PITCH + lines.length * PITCH;
      const dy = top + PITCH / 2;
      rowsOut.push(text(L, dy + 4, s.head, { size: sm, cls: 'mono', weight: 600, where: 'station date' }));
      // A leader from the date to the dot, then the dot on the axis's time.
      const lead0 = L + textWidth(s.head, sm, 'mono') + 6;
      const lead1 = side === 'left' ? Math.min(dx - 12 - (lines[0].reduce((sum, it) => sum + it.w, 0) + (lines[0].length - 1) * GAP), dx) - 4 : dx - 6;
      if (lead1 > lead0 + 4) rowsOut.push(`<line class="rule" x1="${r1(lead0)}" y1="${r1(dy)}" x2="${r1(lead1)}" y2="${r1(dy)}"/>`);
      // The date's pin on the time axis: a short solid bar, unlike any chip.
      rowsOut.push(`<rect x="${r1(dx - 1.5)}" y="${r1(dy - 8)}" width="3" height="16" class="mk-hi"/>`);
      y = top + rowH + 6;
      rowsOut.push(`<line class="rule" x1="${L}" y1="${r1(y - 3)}" x2="${r1(W - L)}" y2="${r1(y - 3)}"/>`);
    }
    // Year rules through the rows, under everything else.
    const rules = ts.ticks.map((t) => `<line class="rule" x1="${r1(ts.map(t.date))}" y1="${r1(axisY)}" x2="${r1(ts.map(t.date))}" y2="${r1(y - 3)}"/>`);
    // The side that already applies sits on a faint panel (a solid tint, so
    // the text over it keeps full contrast).
    if (nNow > 0) rules.unshift(`<rect x="${r1(x0)}" y="${r1(axisY)}" width="${r1(asX - x0)}" height="${r1(y - 3 - axisY)}" class="panel"/>`);
    // The as-of line from the counts to below the rows, with its label.
    out.push(...rules, asOf.line([[axisY - 44, y + 4]]), ...rowsOut, ...chips);
    y += 18;
    out.push(asOf.beside(y));
    bottom = y;
  } else {
    // The agenda: a spine, one block per station, chips flowing in lines.
    const spineX = L + 5;
    const x0 = L + 20;
    const room = W - L - x0;
    const start = y;
    let lastDot = y;
    const chips: string[] = [];
    const headRow = (n: number, word: string) => {
      y += 24;
      fitText(`${n} ${word}`, W - 2 * L, 18, 'body', 'count head');
      out.push(sideHead(n, word, L, y, 'start'));
      y += 6;
    };
    const block = (s: Station) => {
      y += 22;
      out.push(`<circle cx="${spineX}" cy="${r1(y - 4)}" r="4" class="mk mk-hi"/>`);
      lastDot = y - 4;
      out.push(text(x0, y, s.head, { size: sm, cls: 'mono', weight: 600, where: 'station date' }));
      const lines = flow(items(s), room);
      if (!lines) throw new Error(`charts(${where}): a chip of ${s.head} is wider than ${room}px`);
      lines.forEach((line, i) => {
        let x = x0;
        for (const it of line) {
          chips.push(drawItem(it, x, y + 4 + PITCH / 2 + i * PITCH));
          x += it.w + GAP;
        }
      });
      y += 4 + lines.length * PITCH;
    };
    // The as-of line always sits between the two sides (on top when nothing
    // applies yet, at the foot when everything already does).
    if (nNow > 0) headRow(nNow, WORDS.now(nNow));
    stations.filter((s) => s.now).forEach(block);
    y += 14;
    out.push(`<line class="today" x1="${L}" y1="${r1(y)}" x2="${r1(W - L)}" y2="${r1(y)}"/>`);
    out.push(text(L, y + 16, todayText, { size: sm, cls: 'mono', where: 'as-of label' }));
    y += 20;
    if (nLater > 0) headRow(nLater, WORDS.later);
    stations.filter((s) => !s.now).forEach(block);
    if (lastDot > start) out.unshift(`<line class="rule" x1="${spineX}" y1="${r1(start + 12)}" x2="${spineX}" y2="${r1(lastDot)}"/>`);
    out.push(...chips);
    bottom = y;
  }
  if (undated.length) {
    bottom += 20;
    out.push(text(L, bottom, undatedLine(), { size: 12.5, cls: 'ink2', where: 'undated' }));
  }

  const tableRows = [
    ...events.map((e) => [e.date, e.row.name, e.kind === 'first' ? WORDS.first : `${WORDS.step}: ${e.note}`, e.row.status]),
    ...undated.map((r) => [WORDS.noDate, r.name, '', r.status]),
  ];
  const { svg, height } = assemble({
    base: input,
    width: W,
    bottom,
    body: out,
    defs: marks.defs(),
    role: events.some((e) => e.kind === 'first' && e.row.href) ? 'group' : 'img',
    cls: vertical ? 'ch-clock ch-vertical' : 'ch-clock',
  });
  return {
    svg,
    table: table(input.tableCaption ?? input.title, [WORDS.date, WORDS.obligation, WORDS.stepCol, WORDS.status], tableRows),
    width: W,
    height,
  };
}
