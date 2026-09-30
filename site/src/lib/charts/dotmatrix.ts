// dotmatrix.ts: DotMatrix, a waffle / isotype / unit chart. One square cell per
// record, in groups (a heading with the count, then the cells wrapped to the
// width). A cell's tone is its stack layer (or ink), its state is how it is
// drawn: filled, outline, dashed or hatched, so state never rests on colour.
// Cells can link (href) or take focus, and always carry a native tooltip.
import {
  assemble,
  fitText,
  layerWord,
  legend,
  markStyles,
  r1,
  stateWords,
  table,
  text,
  tip,
  wrapMark,
  type ChartBase,
  type ChartOutput,
  type MarkState,
  type Shape,
  type Tone,
} from './core';

export interface DotItem {
  label: string;
  state?: MarkState;
  tone?: Tone;
  /** Wording of the state for the table and tooltip ("To be specified"). */
  status?: string;
  href?: string;
}

export interface DotGroup {
  label: string;
  items: DotItem[];
}

export interface DotMatrixInput extends ChartBase {
  groups: DotGroup[];
  /** Noun for the group counts ("controls"): "Agent runtime · 42 controls". */
  unit?: string;
  /** Cell size in px (default 14) and gap between cells (default 4). */
  cell?: number;
  gap?: number;
  /** Legend under the cells (state and tone swatches). */
  legend?: { label: string; state?: MarkState; tone?: Tone; shape?: Shape }[];
  /** Cells take keyboard focus (role group); links always do. */
  focusable?: boolean;
  /** First column heading of the table (default "Group"). */
  groupHeader?: string;
}

const L = 12;

export function dotMatrix(input: DotMatrixInput): ChartOutput {
  const W = input.width ?? 640;
  const cell = input.cell ?? 14;
  const gap = input.gap ?? 4;
  const perRow = Math.max(1, Math.floor((W - 2 * L + gap) / (cell + gap)));
  const marks = markStyles(input.id);
  const interactive = input.focusable || input.groups.some((g) => g.items.some((i) => i.href));
  const body: string[] = [];
  let y = 8;
  for (const group of input.groups) {
    const n = group.items.length;
    const head = input.unit ? `${group.label} · ${n} ${input.unit}` : `${group.label} · ${n}`;
    fitText(head, W - 2 * L, 13, 'body', 'group heading');
    y += 16;
    body.push(text(L, y, head, { size: 13, weight: 600, where: 'group heading' }));
    y += 8;
    group.items.forEach((item, i) => {
      const x = L + (i % perRow) * (cell + gap);
      const top = y + Math.floor(i / perRow) * (cell + gap);
      const words = item.status ?? stateWords[item.state ?? 'filled'];
      const name = `${item.label} (${group.label}${item.tone ? `, ${layerWord(item.tone)}` : ''}; ${words})`;
      const rect =
        `<rect x="${r1(x)}" y="${r1(top)}" width="${cell}" height="${cell}" rx="2" ` +
        `${marks.attrs(item.state, item.tone)}>${tip(name)}</rect>`;
      body.push(wrapMark(rect, name, { href: item.href, focusable: input.focusable }));
    });
    const rows = Math.max(1, Math.ceil(n / perRow));
    y += rows * (cell + gap) - gap + 10;
  }
  if (input.legend?.length) {
    const lg = legend(input.legend, L, y + 16, W - L, marks);
    body.push(...lg.els);
    y = lg.bottom + 4;
  }
  const withLayer = input.groups.some((g) => g.items.some((i) => i.tone));
  const columns = [input.groupHeader ?? 'Group', 'Item', 'State', ...(withLayer ? ['Layer'] : [])];
  const rows = input.groups.flatMap((g) =>
    g.items.map((i) => [
      g.label,
      i.label,
      i.status ?? stateWords[i.state ?? 'filled'],
      ...(withLayer ? [layerWord(i.tone)] : []),
    ]),
  );
  const { svg, height } = assemble({
    base: input,
    width: W,
    bottom: y,
    body,
    defs: marks.defs(),
    role: interactive ? 'group' : 'img',
    cls: 'ch-dots',
  });
  return { svg, table: table(input.tableCaption ?? input.title, columns, rows), width: W, height };
}
