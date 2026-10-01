// milestone-axis.ts: a run of dated milestones on one time axis, for the AI
// Act deadlines page (English and Spanish). Every milestone is a mark on the
// axis at its true date and a label (a short title over its date) joined to
// it by a leader. The mark's fill says where it stands on the as-of date
// (solid: applies; outlined: upcoming) and its shape which act set the date
// (circle or square, named by the legend), so neither rests on colour. One
// accent: the next milestone after the as-of date has its label in bold. A
// dashed line marks the as-of date of the data, never the build clock.
//
//   horizontal (wide, 640): time left to right; labels take the lowest free
//     row above or below the axis (alternating, at most four each side), so
//     milestones a few days apart never collide.
//   vertical (narrow, NARROW_WIDTH): time top to bottom; labels right of the axis,
//     pushed down with a leader when they would overlap; the as-of line runs
//     across and is named in a key above the axis. Marks too close in time to
//     sit apart on the axis take the next lane to its right.
//
// No two marks may overlap: the layout keeps them apart and a final check
// throws, naming them, if they ever do.
//
// The labels are the links (to the milestone's anchor on the page), each
// target 24 px or more tall; the marks carry a tooltip. Table: Date |
// Milestone | Status | Basis, with the full titles.
//
// Built on the chart kit's shell and helpers (src/lib/charts/core.ts); no
// runtime or data imports.
import { legendGroups } from './legend-groups';
import {
  wrapText,
  AS_OF_KEY_H,
  NARROW_WIDTH,
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
  words,
  type ChartBase,
  type ChartOutput,
  type Shape,
} from '../charts/core';

export interface AxisMilestone {
  date: string;
  /** Drawn label: short, one line. */
  label: string;
  /** Full title, for the tooltip and the table. */
  name: string;
  href?: string;
  applied: boolean;
  /** Which act set the date: the legend key of its shape. */
  basis: 'a' | 'b';
}

export interface MilestoneAxisInput extends ChartBase {
  items: AxisMilestone[];
  /** The as-of date of the data. */
  today: string;
  /** Wording of the page's language. */
  copy: {
    applied: string;
    upcoming: string;
    /** Legend and table wording of each basis. */
    basis: { a: string; b: string };
    milestone: string;
    basisHead: string;
  };
  orientation?: 'horizontal' | 'vertical';
}

const L = 12;
const LABEL_PX = 12.5;
const ROWS = 4;
const SHAPE: Record<'a' | 'b', Shape> = { a: 'circle', b: 'square' };

const byCode = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);
/** Mark size (half-size 6) and the least gap between two marks. */
const MARK = 12;
const MARK_GAP = 2;

/** Throws when two mark boxes (centre, MARK wide) come closer than `gap`. */
function marksApart(where: string, placed: { m: AxisMilestone; cx: number; cy: number }[], gap: number): void {
  placed.forEach((a, i) => {
    for (const b of placed.slice(i + 1)) {
      if (Math.abs(a.cx - b.cx) < MARK + gap && Math.abs(a.cy - b.cy) < MARK + gap) {
        throw new Error(`charts(${where}): the marks of ${a.m.date} and ${b.m.date} overlap`);
      }
    }
  });
}

export function milestoneAxis(input: MilestoneAxisInput): ChartOutput {
  const where = `milestoneAxis ${input.id}`;
  nonEmpty(input.items, 'milestones', where);
  parseDay(input.today, 'axis today');
  const w = words(input.lang);
  const vertical = input.orientation === 'vertical';
  const W = input.width ?? (vertical ? NARROW_WIDTH : 640);
  const sm = minText(W);
  const items = [...input.items].sort((a, b) => byCode(a.date, b.date) || byCode(a.label, b.label));
  const next = items.find((m) => m.date > input.today);
  const marks = markStyles(input.id);
  const hits = targets(where);
  const out: string[] = [];
  const status = (m: AxisMilestone) => (m.applied ? input.copy.applied : input.copy.upcoming);

  // Two headed groups, so an outlined circle is read once as "upcoming"
  // (status) and once as a shape (basis), never mixed up.
  const lg = legendGroups(
    [
      {
        head: w.status,
        entries: [
          { label: input.copy.applied, shape: 'circle', state: 'filled' },
          { label: input.copy.upcoming, shape: 'circle', state: 'outline' },
        ],
      },
      {
        head: input.copy.basisHead,
        entries: (['a', 'b'] as const).filter((k) => items.some((m) => m.basis === k)).map((k) => ({ label: input.copy.basis[k], shape: SHAPE[k], state: 'outline' as const })),
      },
    ],
    L,
    16,
    W - L,
    marks,
    sm,
  );
  out.push(...lg.els);
  let y = lg.bottom + 12;

  const years = [...items.map((m) => m.date), input.today].map((d) => Number(d.slice(0, 4)));
  const from = `${Math.min(...years)}-01-01`;
  const to = `${Math.max(...years) + 1}-01-01`;
  const mark = (m: AxisMilestone, cx: number, cy: number) =>
    hits.mark((inner) => shape(SHAPE[m.basis], cx, cy, 6, marks.attrs(m.applied ? 'filled' : 'outline', 0), inner), `${m.date} · ${m.name} · ${status(m)}`, { x: cx - 6, y: cy - 6, w: 12, h: 12 });
  /** A label at `x` (start), first baseline `ly`: the short title over its
   *  date ('stack'), the date then the title on one line ('line'), or the
   *  date over the title ('pair', the title in `lines`, at most two). The
   *  link's target is the whole block, on a ground-coloured mask so the
   *  as-of line passes behind it. */
  const label = (m: AxisMilestone, x: number, ly: number, form: 'stack' | 'line' | 'pair', lines: string[] = [m.label]) => {
    const weight = m === next ? 700 : 400;
    const dateW = textWidth(m.date, sm, 'mono');
    const title = (tx: number, ty: number, t = m.label) => text(tx, ty, t, { size: LABEL_PX, weight, where: 'milestone label' });
    const date = (tx: number, ty: number) => text(tx, ty, m.date, { size: sm, cls: 'num ink2', where: 'milestone date' });
    const wrapW = Math.max(...lines.map((t) => textWidth(t, LABEL_PX) * (m === next ? 1.06 : 1)));
    const lw = form === 'line' ? dateW + 8 + labelW(m) : Math.max(form === 'pair' ? wrapW : labelW(m), dateW);
    const h = form === 'line' ? 24 : 34 + (lines.length - 1) * 15;
    const top = form === 'line' ? ly - 16 : ly - 14;
    const draw = () =>
      `<rect class="hatch-bg" x="${r1(x - 3)}" y="${r1(top)}" width="${r1(lw + 6)}" height="${h}"/>` +
      (form === 'stack'
        ? title(x, ly) + date(x, ly + 15)
        : form === 'line'
          ? date(x, ly) + title(x + dateW + 8, ly)
          : date(x, ly) + lines.map((t, k) => title(x, ly + 15 + k * 15, t)).join(''));
    return hits.mark(draw, `${m.name} · ${m.date} · ${status(m)}`, { x: x - 3, y: top, w: lw + 6, h }, { href: m.href });
  };
  /** Width of the title (bold for the next milestone). */
  const labelW = (m: AxisMilestone) => textWidth(m.label, LABEL_PX) * (m === next ? 1.06 : 1);
  const blockW = (m: AxisMilestone) => Math.max(labelW(m), textWidth(m.date, sm, 'mono'));

  let bottom: number;
  if (!vertical) {
    const ts = timeScale(from, to, [L + 10, W - L - 10]);
    // Sides alternate in date order (so marks a few days apart part ways);
    // on each side a label takes the lowest row where it clears its row's
    // labels by 12 px, its leader crosses no label nearer the axis, and no
    // leader from further out crosses it. A side is laid out in date order or
    // in reverse, preferring labels centred on the mark, starting at it or
    // ending at it (a staircase climbs away from the axis that way); the
    // layout with the fewest rows wins, in that order on a tie.
    type Placed = { m: AxisMilestone; x: number; left: number; lw: number; above: boolean; row: number };
    const layoutSide = (list: AxisMilestone[], above: boolean): Placed[] => {
      let best: Placed[] | null = null;
      for (const order of [list, [...list].reverse()]) {
        for (const prefer of [[0, 1, 2], [2, 0, 1], [1, 0, 2]]) {
          const done: Placed[] = [];
          order.forEach((m, i) => {
            if (done.length < i) return;
            const x = ts.map(m.date);
            const lw = blockW(m);
            fitText(m.label, W - 2 * L, LABEL_PX, 'body', 'milestone label');
            const lefts = [x - lw / 2, x - 6, x + 6 - lw].map((l) => Math.max(L, Math.min(l, W - L - lw)));
            // Marks still to place on this side: a label over one of them would
            // block its leader, so such a label is the last resort.
            const later = order.slice(i + 1).map((o) => ts.map(o.date));
            let found: Placed | undefined;
            for (const strict of [true, false]) {
              for (let row = 0; row < ROWS && !found; row++) {
                for (const k of prefer) {
                  const c: Placed = { m, x, left: lefts[k], lw, above, row };
                  const ok =
                    (!strict || later.every((lx) => lx < c.left - 4 || lx > c.left + c.lw + 4)) &&
                    done.every((p) => p.row !== c.row || c.left >= p.left + p.lw + 12 || c.left + c.lw + 12 <= p.left) &&
                    done.every((p) => p.row >= c.row || c.x < p.left - 4 || c.x > p.left + p.lw + 4) &&
                    done.every((p) => p.row <= c.row || p.x < c.left - 4 || p.x > c.left + c.lw + 4);
                  if (ok) {
                    found = c;
                    break;
                  }
                }
              }
              if (found) break;
            }
            if (found) done.push(found);
          });
          const rows = (t: Placed[]) => Math.max(0, ...t.map((p) => p.row + 1));
          if (done.length === list.length && (!best || rows(done) < rows(best))) best = done;
        }
      }
      if (!best) throw new Error(`charts(${where}): the milestone labels ${above ? 'above' : 'below'} the axis find no free rows; shorten the labels`);
      return best;
    };
    const placed = [
      ...layoutSide(items.filter((_, i) => i % 2 === 0), true),
      ...layoutSide(items.filter((_, i) => i % 2 === 1), false),
    ];
    const rowsAbove = Math.max(0, ...placed.filter((p) => p.above).map((p) => p.row + 1));
    const rowsBelow = Math.max(0, ...placed.filter((p) => !p.above).map((p) => p.row + 1));
    const PITCH = 40;
    const BELOW = 48;
    const axisY = y + 14 + rowsAbove * PITCH + 12;
    // The as-of line and its label (in the band above the top row of labels).
    const asOf = asOfMark(ts, input.today, input.lang, { width: W, axis: 'x', pad: L });
    const asX = asOf.at;
    out.push(asOf.line([[y + 4, axisY + BELOW - 16 + rowsBelow * PITCH]]), asOf.beside(y + 4));
    out.push(`<line class="axis" x1="${L}" y1="${r1(axisY)}" x2="${r1(W - L)}" y2="${r1(axisY)}"/>`);
    // The time already elapsed, as a solid bar along the axis.
    out.push(`<rect class="mk-hi" x="${L}" y="${r1(axisY - 2)}" width="${r1(asX - L)}" height="4"/>`);
    for (const t of ts.ticks) {
      const x = ts.map(t.date);
      out.push(`<line class="tick" x1="${r1(x)}" y1="${r1(axisY - 4)}" x2="${r1(x)}" y2="${r1(axisY + 4)}"/>`);
    }
    const labels: string[] = [];
    const marksOut: string[] = [];
    const drawnMarks: { m: AxisMilestone; cx: number; cy: number }[] = [];
    for (const p of placed) {
      // Label baseline: rows grow away from the axis (below, under the years).
      const ly = p.above ? axisY - 36 - p.row * PITCH : axisY + BELOW + p.row * PITCH;
      const y1 = p.above ? ly + 20 : ly - 16;
      // Marks a few days apart would hide each other: each steps 6 px
      // towards its label.
      const my = axisY + (placed.some((q) => q !== p && Math.abs(q.x - p.x) < 12) ? (p.above ? -6 : 6) : 0);
      out.push(`<path class="tick" d="M${r1(p.x)} ${r1(p.above ? my - 7 : my + 7)}V${r1(y1)}"/>`);
      labels.push(label(p.m, p.left, ly, 'stack'));
      marksOut.push(mark(p.m, p.x, my));
      drawnMarks.push({ m: p.m, cx: p.x, cy: my });
    }
    marksApart(where, drawnMarks, 0);
    // The year labels sit over the leaders of the labels below the axis: a
    // year a leader would cross gets a ground-coloured mask, so the leader
    // passes behind it.
    for (const t of ts.ticks) {
      const tx = ts.map(t.date);
      const half = textWidth(t.label, sm, 'mono') / 2 + 2;
      const crossed = placed.some((p) => !p.above && Math.abs(p.x - tx) <= half);
      if (crossed) out.push(`<rect class="hatch-bg" x="${r1(tx - half)}" y="${r1(axisY + 8)}" width="${r1(2 * half)}" height="15"/>`);
      out.push(text(tx, axisY + 19, t.label, { size: sm, cls: 'num muted', anchor: 'middle', where: 'tick' }));
    }
    out.push(...labels, ...marksOut);
    bottom = Math.max(axisY + 20, axisY + BELOW - 20 + rowsBelow * PITCH);
  } else {
    // Key for the as-of line above the axis.
    const keyAt = y;
    y += AS_OF_KEY_H + 12;
    const axisX = L + 44;
    const len = Math.max(480, items.length * 36);
    const ts = timeScale(from, to, [y, y + len]);
    // Lanes: a mark closer in time to an earlier one than a mark and a gap
    // takes the next lane right of the axis; the labels start after the last.
    const LANE = MARK + MARK_GAP;
    const lanes: number[] = [];
    items.forEach((m, i) => {
      const ty = ts.map(m.date);
      let k = 0;
      while (items.slice(0, i).some((o, j) => lanes[j] === k && Math.abs(ts.map(o.date) - ty) < LANE)) k += 1;
      lanes.push(k);
    });
    const laneX = (i: number) => axisX + lanes[i] * LANE;
    const labelX = axisX + 22 + Math.max(...lanes) * LANE;
    out.push(`<line class="axis" x1="${axisX}" y1="${r1(y)}" x2="${axisX}" y2="${r1(y + len)}"/>`);
    for (const t of ts.ticks) {
      const ty = ts.map(t.date);
      out.push(`<line class="tick" x1="${axisX - 5}" y1="${r1(ty)}" x2="${axisX}" y2="${r1(ty)}"/>`);
      out.push(text(axisX - 8, ty + 4, t.label, { size: sm, cls: 'num muted', anchor: 'end', where: 'tick' }));
    }
    const asOf = asOfMark(ts, input.today, input.lang, { width: W, axis: 'y', pad: L });
    const asY = asOf.at;
    out.push(...asOf.key(keyAt).els, asOf.line([[axisX - 5, W - L]]));
    out.push(`<rect class="mk-hi" x="${axisX - 2}" y="${r1(y)}" width="4" height="${r1(asY - y)}"/>`);
    // Labels right of the axis: "date title" on one line, or the date over
    // the title when that does not fit; pushed down (with a leader) so linked
    // blocks stay 26 px apart.
    let prev = -Infinity;
    const labels: string[] = [];
    const room = W - L - labelX;
    items.forEach((m, i) => {
      const ty = ts.map(m.date);
      const one = textWidth(m.date, sm, 'mono') + 8 + labelW(m) <= room;
      // Else the date over the title, the title wrapped to two lines.
      const lines = one ? [m.label] : wrapText(m.label, room / (m === next ? 1.06 : 1), LABEL_PX, 'body', 2, 'milestone label');
      const ly = Math.max(ty + 4, prev + 26);
      const x0 = laneX(i) + 7;
      if (ly - 4 > ty + 2) out.push(`<path class="tick" fill="none" d="M${x0} ${r1(ty)}L${labelX - 5} ${r1(ly - 4)}"/>`);
      else out.push(`<line class="tick" x1="${x0}" y1="${r1(ty)}" x2="${labelX - 5}" y2="${r1(ty)}"/>`);
      labels.push(label(m, labelX, ly, one ? 'line' : 'pair', lines));
      prev = ly + (one ? 0 : 15 * lines.length);
    });
    const drawnMarks = items.map((m, i) => ({ m, cx: laneX(i), cy: ts.map(m.date) }));
    marksApart(where, drawnMarks, MARK_GAP);
    out.push(...labels, ...drawnMarks.map((d) => mark(d.m, d.cx, d.cy)));
    bottom = Math.max(y + len + 4, prev + 10);
  }

  const { svg, height } = assemble({
    base: input,
    width: W,
    bottom,
    body: out,
    defs: marks.defs(),
    role: items.some((m) => m.href) ? 'group' : 'img',
    cls: vertical ? 'ch-miles ch-vertical' : 'ch-miles',
  });
  return {
    svg,
    table: table(
      input.tableCaption ?? input.title,
      [w.date, input.copy.milestone, w.status, input.copy.basisHead],
      items.map((m) => [m.date, m.name, status(m), input.copy.basis[m.basis]]),
    ),
    width: W,
    height,
  };
}
