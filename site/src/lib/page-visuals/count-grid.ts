// count-grid.ts: a sized-dot count grid with marginal totals, for grids too
// dense for the kit's heatGrid within the 12 KB budget (heatGrid gives every
// cell, empty or not, its own rect and tooltip). Only non-empty cells are
// drawn: a solid ink dot whose area grows with the count, the count printed
// on it in the ground colour, so no value rests on shade alone. Empty cells
// stay blank over the row bands and column guides. Column totals are bars
// over the column labels (the largest is the one accent, solid ink), row
// totals are bars (wide) or numbers (narrow) at the end of each row. Row
// labels may link. Used by /resources/dpia-lists (country x Annex III area).
// A record may fall in several columns (an item that overlaps two areas):
// pass `rowTotals` to count each row's records once rather than summing its
// cells.
//
// Built on the chart kit's helpers (src/lib/charts/core.ts): measured labels
// that throw instead of cutting, token classes of both style modes, the
// accessible shell and the Source / As of stamp. NARROW_WIDTH is the phone
// variant (narrower cells, row totals as numbers). The column heads, row
// bands, guides and total bars are the shared frame of matrix-frame.ts.
import {
  minText,
  assemble,
  fmt,
  linkText,
  markClass,
  r1,
  table,
  text,
  textWidth,
  wrapText,
  type ChartMode,
  type ChartOutput,
} from '../charts/core';
import { bandPath, columnHeads, rowBarPath, underlay } from './matrix-frame';

export interface CountGridInput {
  id: string;
  title: string;
  desc: string;
  source?: string;
  asOf?: string;
  mode?: ChartMode;
  width?: number;
  /** Table heading of the row-label column ("Country"). */
  rowHeader: string;
  rows: { label: string; href?: string; values: number[] }[];
  /** Column labels as drawn (set vertically). */
  columns: string[];
  /** Full column names for the table, when the drawn labels are shortened. */
  columnNames?: string[];
  /** Noun of a count ("items"), for the totals' tooltips. */
  unit: string;
  /** Total of each row when a record may count in several columns (the
   *  distinct records of the row); default: the sum of the row's cells. The
   *  grand total is their sum. */
  rowTotals?: number[];
  tableCaption?: string;
}

const L = 12;

export function countGrid(input: CountGridInput): ChartOutput {
  const where = `countGrid ${input.id}`;
  const { rows, columns } = input;
  if (!rows.length || !columns.length) throw new Error(`charts(${where}): no rows or columns to draw`);
  for (const row of rows) {
    if (row.values.length !== columns.length || row.values.some((v) => !Number.isInteger(v) || v < 0)) {
      throw new Error(`charts(${where}): row "${row.label}" needs ${columns.length} counts`);
    }
  }
  const W = input.width ?? 640;
  const sm = minText(W);
  const wide = W >= 480;
  const labelFont = wide ? 13 : 12.5;
  const sideLW = Math.ceil(Math.max(...rows.map((r) => textWidth(r.label, labelFont)))) + 12;
  if (sideLW > (wide ? 200 : 120)) throw new Error(`charts(${where}): a row label needs ${sideLW}px; shorten it`);
  const totalsW = wide ? 72 : 30;
  // Narrow: the labels beside the grid when the columns keep 22 px each,
  // else each label on its own line over its row of dots.
  const stacked = !wide && Math.floor((W - 2 * L - sideLW - totalsW) / columns.length) < 22;
  const LW = stacked ? 0 : sideLW;
  const pitch = wide ? 44 : Math.floor((W - 2 * L - LW - totalsW) / columns.length);
  if (pitch < 22) throw new Error(`charts(${where}): ${columns.length} columns do not fit ${W}px`);
  const LABEL_H = stacked ? 16 : 0;
  const rowH = (wide ? 30 : 26) + LABEL_H;
  const x0 = L + LW;
  const colX = (i: number) => x0 + i * pitch + pitch / 2;
  const gridRight = x0 + columns.length * pitch;
  const width = wide ? Math.max(W, Math.ceil(gridRight + totalsW + L)) : W;
  const max = Math.max(1, ...rows.flatMap((r) => r.values));
  const rMax = Math.min(pitch, rowH) / 2 - 2;
  const rMin = Math.min(7, rMax);
  // Area grows with the count: r = sqrt(v / max) * rMax, never under rMin.
  const radius = (v: number) => Math.max(rMin, Math.sqrt(v / max) * rMax);

  if (input.rowTotals && (input.rowTotals.length !== rows.length || input.rowTotals.some((t) => !Number.isInteger(t) || t < 0))) {
    throw new Error(`charts(${where}): rowTotals needs a whole count for each of the ${rows.length} rows`);
  }

  // Column totals: bars with their value above; the largest is the accent.
  const colTotals = columns.map((_, c) => rows.reduce((s, r) => s + r.values[c], 0));
  const names = input.columnNames ?? columns;
  const heads = columnHeads({
    totalPx: sm,
    where,
    columns: columns.map((label, c) => ({ label, total: colTotals[c], tip: `${names[c]}: ${colTotals[c]} ${input.unit}` })),
    colX,
    pitch,
    y: 8,
    barH: 40,
    barMaxW: 16,
    gapAfterBars: 8,
    maxLabelH: 170,
  });
  const out: string[] = [...heads.marks];
  let y = heads.y;

  const gridTop = y;
  const rowTotals = input.rowTotals ?? rows.map((r) => r.values.reduce((a, b) => a + b, 0));
  const rowMax = Math.max(1, ...rowTotals);
  const bands: string[] = [];
  const dots: string[] = [];
  const nums: string[] = [];
  const bars: string[] = [];
  rows.forEach((row, ri) => {
    const cy = y + LABEL_H + (rowH - LABEL_H) / 2;
    if (ri % 2 === 0) bands.push(bandPath(L, y, rowH, width));
    wrapText(row.label, stacked ? W - 2 * L - totalsW : LW - 10, labelFont, 'body', 1, 'row label');
    const label = text(L, stacked ? y + 14 : cy + 4.5, row.label, { size: labelFont, where: 'row label' });
    out.push(row.href ? linkText(label, row.label, row.href) : label);
    row.values.forEach((v, c) => {
      if (!v) return;
      dots.push(`<circle cx="${r1(colX(c))}" cy="${r1(cy)}" r="${r1(radius(v))}"/>`);
      nums.push(text(colX(c), cy + 4.2, fmt(v), { size: sm, cls: 'num on-ink', anchor: 'middle', where: 'cell value' }));
    });
    if (wide) {
      const bw = (rowTotals[ri] / rowMax) * (totalsW - 32);
      if (bw > 0) bars.push(rowBarPath(gridRight + 10, cy, bw));
      out.push(text(gridRight + 14 + bw, cy + 4.5, fmt(rowTotals[ri]), { size: sm, cls: 'num', where: 'row total' }));
    } else {
      out.push(text(width - L, cy + 4.5, fmt(rowTotals[ri]), { size: sm, cls: 'num', anchor: 'end', where: 'row total' }));
    }
    y += rowH;
  });
  out.unshift(...underlay(bands, columns.map((_, c) => colX(c)), gridTop, y));
  // Dots inherit the accent fill from their group; the counts sit on top.
  out.push(`<g class="mk mk-hi">${dots.join('')}</g>`, ...nums);
  if (bars.length) out.push(`<path class="${markClass('filled', 0)}" d="${bars.join('')}"/>`);
  out.push(text(wide ? gridRight + 10 : width - L, gridTop - 6, 'Total', { size: sm, cls: 'ink2', anchor: wide ? 'start' : 'end', where: 'total heading' }));

  const { svg, height } = assemble({
    base: { id: input.id, title: input.title, desc: input.desc, source: input.source, asOf: input.asOf, mode: input.mode },
    width,
    bottom: y,
    body: out,
    role: rows.some((r) => r.href) ? 'group' : 'img',
    cls: 'ch-matrix',
  });
  return {
    svg,
    table: table(
      input.tableCaption ?? input.title,
      [input.rowHeader, ...names, 'Total'],
      [...rows.map((r, i) => [r.label, ...r.values, rowTotals[i]]), ['Total', ...colTotals, rowTotals.reduce((a, b) => a + b, 0)]],
    ),
    width,
    height,
  };
}
