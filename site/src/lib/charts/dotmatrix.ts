// dotmatrix.ts: DotMatrix, a waffle / isotype / unit chart. One square cell per
// record, in groups (a heading with the count, then the cells wrapped to the
// width). A cell's tone is its stack layer (or ink), its state is how it is
// drawn: filled, outline, dashed or hatched, so state never rests on colour.
// Cells can link (href) or take focus, and always carry a native tooltip. With
// links the default pitch is 24 px (cell 18 + gap 6; 25 under 480 wide, so it
// holds at the 0.98 scale of a 320 phone), the pointer-target spacing of
// WCAG 2.5.8; a smaller pitch with links throws.
import {
  assemble,
  fitText,
  layerWord,
  legend,
  markStyles,
  nonEmpty,
  rect,
  stateWord,
  table,
  targets,
  text,
  words,
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
  /** Cell size in px and gap between cells: 14 and 4 by default, 18 and 6
   *  when any cell links (a 24 px pitch). */
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
  const where = `dotMatrix ${input.id}`;
  nonEmpty(input.groups.flatMap((g) => g.items), 'items', where);
  const w = words(input.lang);
  const W = input.width ?? 640;
  const linked = input.groups.some((g) => g.items.some((i) => i.href));
  const cell = input.cell ?? (linked ? 18 : 14);
  // A narrow chart shows at 0.98 on a 320 phone: 25 units keep 24 px there.
  const gap = input.gap ?? (linked ? (W < 480 ? 7 : 6) : 4);
  const perRow = Math.max(1, Math.floor((W - 2 * L + gap) / (cell + gap)));
  const marks = markStyles(input.id);
  const hits = targets(where);
  const interactive = input.focusable || linked;
  const status = (i: DotItem) => i.status ?? stateWord(i.state ?? 'filled', input.lang);
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
      // The group heading already names the group, so the cell name does not.
      const name = `${item.label} (${[layerWord(item.tone, input.lang), status(item)].filter(Boolean).join('; ')})`;
      const attrs = `rx="2" ${marks.attrs(item.state, item.tone)}`;
      body.push(
        hits.mark((inner) => rect(x, top, cell, cell, attrs, inner), name, { x, y: top, w: cell, h: cell }, { href: item.href, focusable: input.focusable }),
      );
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
  const columns = [input.groupHeader ?? w.group, w.item, w.state, ...(withLayer ? [w.layer] : [])];
  const rows = input.groups.flatMap((g) =>
    g.items.map((i) => [g.label, i.label, status(i), ...(withLayer ? [layerWord(i.tone, input.lang)] : [])]),
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
