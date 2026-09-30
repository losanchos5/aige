// matrix-frame.ts: the frame shared by the two row x column charts of block a,
// the clause x instrument matrix (contract-matrix.ts) and the country x
// Annex III count grid (count-grid.ts). Each chart draws only its own cell
// marks; the frame gives what they have in common:
//
//   columnHeads   a total bar over each column with its count above (the
//                 largest is the one accent, solid ink; an empty column gets a
//                 flat axis stub), then the column labels set vertically,
//                 bottom-aligned on the grid, with a height guard that throws
//                 instead of letting a long label run into the bars.
//   bandPath      one alternating row band, as a path segment.
//   underlay      the row bands, then the column guides over them, both to
//                 sit under the cell marks.
//   rowBarPath    a row-total bar at the end of a row, as a path segment.
//
// Built on the chart kit's helpers (src/lib/charts/core.ts): measured text
// that throws instead of cutting, and the kit's mark classes.
import { fmt, markClass, r1, text, textWidth, tip } from '../charts/core';

export interface ColumnHead {
  /** Label as drawn, set vertically. */
  label: string;
  total: number;
  /** Tooltip of the column's total bar. */
  tip: string;
}

export interface ColumnHeadsInput {
  /** Chart name for error messages ("countGrid dl-annex-w"). */
  where: string;
  columns: readonly ColumnHead[];
  /** Centre x of column i. */
  colX: (i: number) => number;
  pitch: number;
  /** Top of the block (the counts sit above the bars within it). */
  y: number;
  barH: number;
  /** Widest a total bar may be. */
  barMaxW: number;
  /** Room between the bars and the labels. */
  gapAfterBars: number;
  /** Tallest a vertical label may be before the chart throws. */
  maxLabelH: number;
  /** Size of the column totals (the chart's minText; default 12). */
  totalPx?: number;
}

/** Total bars and vertical labels over the columns; returns the marks and the grid's top y. */
export function columnHeads(input: ColumnHeadsInput): { marks: string[]; y: number } {
  const { columns, colX, pitch, barH } = input;
  const marks: string[] = [];
  let y = input.y + 14;
  const max = Math.max(1, ...columns.map((c) => c.total));
  const bw = Math.min(input.barMaxW, pitch - 8);
  columns.forEach((col, i) => {
    const h = col.total ? Math.max(2, (col.total / max) * barH) : 0;
    const x = colX(i);
    if (h) {
      const cls = col.total === max ? 'mk mk-hi' : markClass('filled', 0);
      marks.push(`<rect x="${r1(x - bw / 2)}" y="${r1(y + barH - h)}" width="${r1(bw)}" height="${r1(h)}" class="${cls}">${tip(col.tip)}</rect>`);
    } else {
      marks.push(`<line class="axis" x1="${r1(x - bw / 2)}" y1="${r1(y + barH)}" x2="${r1(x + bw / 2)}" y2="${r1(y + barH)}"/>`);
    }
    marks.push(text(x, y + barH - h - 4, fmt(col.total), { size: input.totalPx ?? 12, cls: 'num', anchor: 'middle', where: 'column total' }));
  });
  y += barH + input.gapAfterBars;

  const labelH = Math.ceil(Math.max(...columns.map((c) => textWidth(c.label, 12.5)))) + 4;
  if (labelH > input.maxLabelH) throw new Error(`charts(${input.where}): a column label needs ${labelH}px of height; shorten it`);
  columns.forEach((col, i) => marks.push(text(colX(i) + 4.5, y + labelH, col.label, { size: 12.5, rotate: -90, where: 'column label' })));
  return { marks, y: y + labelH + 8 };
}

/** One row band across the chart, from x L - 4 to width - L + 4. */
export const bandPath = (L: number, y: number, h: number, width: number): string =>
  `M${L - 4} ${r1(y)}h${r1(width - 2 * L + 8)}v${r1(h)}h${r1(-(width - 2 * L + 8))}z`;

/** Row bands, then the column guides over them: both go under the marks. */
export function underlay(bands: readonly string[], xs: readonly number[], top: number, bottom: number): string[] {
  const guides = xs.map((x) => `M${r1(x)} ${r1(top)}V${r1(bottom)}`).join('');
  return [`<path class="cell-empty" d="${bands.join('')}"/>`, `<path class="rule" d="${guides}"/>`];
}

/** A row-total bar, 10 high, centred on cy. */
export const rowBarPath = (x: number, cy: number, w: number): string => `M${r1(x)} ${r1(cy - 5)}h${r1(w)}v10h${r1(-w)}z`;
