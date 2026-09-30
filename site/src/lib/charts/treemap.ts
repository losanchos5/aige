// treemap.ts: Treemap, grouped squarified tiles computed at build (design
// D3). Groups are laid out by the squarified algorithm (Bruls, Huizing and van
// Wijk), each with a header strip on the first row of its area, then the items
// inside the rest of it, so every tile's area is its value times one scale for
// the whole chart (the header strips are sized so that holds exactly). Tiles
// under 24 x 24 px get no link of their own: two or more of them in a group
// merge into one "+N" tile (area = their sum, <title> naming them), linked to
// the group's href when it is itself a full target (WCAG 2.5.8); `minTile`
// raises that size to merge a long tail sooner (the 12 KB budget). A label is
// drawn inside a tile only when it fits (never shrunk, never cut); a tile
// without one keeps its <title>. State by pattern (filled, outline, dashed,
// hatched); `fill` (0 to 1) draws a bar along the tile's foot.
//
// Narrow ('narrow', 280, and under 480 wide): the groups stacked as full-width
// bands, each under its header, the same squarify inside each band, so the
// small tiles merge sooner. Same table: Group | Item | value | fill (%) |
// status, one row per item in input order, merged ones included.
import {
  assemble,
  fmt,
  markStyles,
  nonEmpty,
  r1,
  table,
  targets,
  text,
  textWidth,
  tip,
  words,
  wrapText,
  type Cell,
  type ChartBase,
  type ChartOutput,
  type MarkState,
  type Tone,
} from './core';

export interface TreemapItem {
  /** Drawn inside the tile when it fits. */
  label: string;
  /** Full name for the table and tooltip (default: the label). */
  name?: string;
  /** Positive: the tile's area. */
  value: number;
  state?: MarkState;
  /** Stack layer, only when the category is the layer. */
  tone?: Tone;
  /** Status word for the table and tooltip. */
  status?: string;
  /** Share 0 to 1 drawn as a bar along the foot (e.g. share taught). */
  fill?: number;
  href?: string;
}

export interface TreemapGroup {
  label: string;
  /** Target of the group's "+N" tile (e.g. the group's table anchor). */
  href?: string;
  items: TreemapItem[];
}

export interface TreemapInput extends ChartBase {
  groups: TreemapGroup[];
  /** Plural noun of a value ("obligations") and its singular. */
  unit: string;
  unitOne?: string;
  /** 'wide' (default from 480 wide) or 'narrow' (default under 480). */
  layout?: 'wide' | 'narrow';
  /** Height of the tiles area (default 360 wide, 420 narrow). */
  plotHeight?: number;
  groupHeader?: string;
  itemHeader?: string;
  valueHeader?: string;
  /** Heading of the fill column and word in tooltips ("Taught"). */
  fillHeader?: string;
  /** Tiles narrower or shorter than this merge into "+N" (default and
   *  floor 24, the pointer-target size); raise it to merge a long tail
   *  sooner when the SVG would pass the 12 KB budget. */
  minTile?: number;
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

const L = 12;
const NARROW_W = 280;
const HEAD = 20;
const MIN_TILE = 24;

/** Squarified layout of `values` (sorted largest first) in `r`; one rect per value. */
function squarify(values: readonly number[], r: Rect): Rect[] {
  const total = values.reduce((s, v) => s + v, 0);
  const scale = (r.w * r.h) / total;
  const areas = values.map((v) => v * scale);
  const out: Rect[] = [];
  let box = { ...r };
  let i = 0;
  const worst = (row: number[], side: number) => {
    const s = row.reduce((a, b) => a + b, 0);
    return Math.max((side * side * Math.max(...row)) / (s * s), (s * s) / (side * side * Math.min(...row)));
  };
  while (i < areas.length) {
    const side = Math.min(box.w, box.h);
    let row = [areas[i]];
    let j = i + 1;
    while (j < areas.length && worst([...row, areas[j]], side) <= worst(row, side)) row = [...row, areas[j++]];
    const s = row.reduce((a, b) => a + b, 0);
    if (box.w >= box.h) {
      const cw = s / box.h;
      let y = box.y;
      for (const a of row) {
        out.push({ x: box.x, y, w: cw, h: a / cw });
        y += a / cw;
      }
      box = { x: box.x + cw, y: box.y, w: box.w - cw, h: box.h };
    } else {
      const rh = s / box.w;
      let x = box.x;
      for (const a of row) {
        out.push({ x, y: box.y, w: a / rh, h: rh });
        x += a / rh;
      }
      box = { x: box.x, y: box.y + rh, w: box.w, h: box.h - rh };
    }
    i = j;
  }
  return out;
}

/** A tile to draw: one item, or several merged into "+N". */
interface Tile {
  items: TreemapItem[];
  value: number;
  merged: boolean;
}

export function treemap(input: TreemapInput): ChartOutput {
  const where = `treemap ${input.id}`;
  const { groups } = input;
  nonEmpty(groups, 'groups', where);
  for (const g of groups) {
    if (!g.items.length) throw new Error(`charts(${where}): group "${g.label}" has no items`);
    for (const it of g.items) {
      if (!(Number.isFinite(it.value) && it.value > 0)) throw new Error(`charts(${where}): item "${it.label}" has value ${it.value}; values are positive`);
      if (it.fill !== undefined && !(it.fill >= 0 && it.fill <= 1)) throw new Error(`charts(${where}): item "${it.label}" has fill ${it.fill}; fills run from 0 to 1`);
    }
  }
  const narrow = (input.layout ?? ((input.width ?? 640) < 480 ? 'narrow' : 'wide')) === 'narrow';
  const W = input.width ?? (narrow ? NARROW_W : 640);
  const fs = narrow ? 12.5 : 13;
  const vs = narrow ? 12.5 : 12;
  const w = words(input.lang);
  const unitOf = (v: number) => (v === 1 && input.unitOne ? input.unitOne : input.unit);
  const nameOf = (it: TreemapItem) => it.name ?? it.label;
  const pct = (it: TreemapItem) => Math.round((it.fill ?? 0) * 100);
  const totalOf = (g: TreemapGroup) => g.items.reduce((s, it) => s + it.value, 0);
  const T = groups.reduce((s, g) => s + totalOf(g), 0);
  const byInput = <X>(list: X[], value: (x: X) => number) =>
    list
      .map((x, i) => ({ x, i }))
      .sort((a, b) => value(b.x) - value(a.x) || a.i - b.i)
      .map((p) => p.x);
  const minTile = Math.max(MIN_TILE, input.minTile ?? MIN_TILE);
  const marks = markStyles(input.id);
  const hits = targets(where);
  const Wp = W - 2 * L;
  const Hp = input.plotHeight ?? (narrow ? 420 : 360);
  const top = 8;
  const out: string[] = [];

  // The items of one group in `r`: squarify, then merge the small tiles into
  // "+N" and lay out again until no new small tile appears.
  const tilesIn = (g: TreemapGroup, r: Rect): { tile: Tile; rect: Rect }[] => {
    const merged = new Set<TreemapItem>();
    for (;;) {
      const own: Tile[] = g.items.filter((it) => !merged.has(it)).map((it) => ({ items: [it], value: it.value, merged: false }));
      const rest = g.items.filter((it) => merged.has(it));
      const tiles = byInput([...own, ...(rest.length ? [{ items: rest, value: rest.reduce((s, it) => s + it.value, 0), merged: true }] : [])], (t) => t.value);
      const rects = squarify(
        tiles.map((t) => t.value),
        r,
      );
      const small = tiles.filter((t, i) => !t.merged && (rects[i].w < minTile || rects[i].h < minTile));
      if (small.length >= 2 || (small.length && rest.length)) {
        for (const t of small) merged.add(t.items[0]);
        continue;
      }
      return tiles.map((tile, i) => ({ tile, rect: rects[i] }));
    }
  };

  const drawTile = (g: TreemapGroup, tile: Tile, r: Rect) => {
    const els: string[] = [];
    const first = tile.items[0];
    const tone = tile.merged ? 0 : (first.tone ?? 0);
    const state = tile.merged ? 'outline' : (first.state ?? 'filled');
    const full = r.w >= MIN_TILE && r.h >= MIN_TILE;
    let cls: string;
    if (state === 'hatched') {
      const fill = /fill="[^"]+"/.exec(marks.attrs('hatched', tone))![0];
      cls = `class="tm-hatch" ${fill}`;
    } else {
      cls = `class="tm ${state === 'filled' ? `tm-${tone}` : state === 'outline' ? 'tm-line' : 'tm-dash'}"`;
    }
    const name = tile.merged
      ? `+${tile.items.length}, ${fmt(tile.value)} ${unitOf(tile.value)}: ${tile.items.map(nameOf).join(', ')}`
      : `${nameOf(first)}: ${fmt(first.value)} ${unitOf(first.value)}` +
        (first.fill !== undefined ? `, ${input.fillHeader ? `${input.fillHeader.toLowerCase()} ` : ''}${pct(first)}%` : '') +
        (first.status ? ` · ${first.status}` : '');
    const href = tile.merged ? g.href : first.href;
    const bar = !tile.merged && first.fill !== undefined && r.w >= 16 && r.h >= 12;
    const room = r.h - (bar ? 8 : 0);
    const label = tile.merged ? `+${tile.items.length}` : first.label;
    const lw = textWidth(label, fs);
    const showLabel = lw <= r.w - 10 && room >= 20;
    const value = fmt(tile.value);
    const showValue = showLabel && room >= 36 && textWidth(value, vs, 'mono') <= r.w - 10;
    els.push(`<rect x="${r1(r.x)}" y="${r1(r.y)}" width="${r1(r.w)}" height="${r1(r.h)}" ${cls}/>`);
    if (bar) {
      els.push(`<rect x="${r1(r.x + 4)}" y="${r1(r.y + r.h - 7)}" width="${r1(r.w - 8)}" height="4" class="tm-track"/>`);
      if (first.fill) els.push(`<rect x="${r1(r.x + 4)}" y="${r1(r.y + r.h - 7)}" width="${r1((r.w - 8) * first.fill)}" height="4" class="tm-bar"/>`);
    }
    if (showLabel) {
      if (state === 'hatched') {
        const bw = Math.max(lw, showValue ? textWidth(value, vs, 'mono') : 0) + 6;
        els.push(`<rect x="${r1(r.x + 2)}" y="${r1(r.y + 3)}" width="${r1(bw)}" height="${showValue ? 34 : 18}" class="tm-lbg"/>`);
      }
      els.push(text(r.x + 5, r.y + 16, label, { size: fs, weight: 600, where: 'tile label' }));
      if (showValue) els.push(text(r.x + 5, r.y + 32, value, { size: vs, cls: 'num', where: 'tile value' }));
    }
    const draw = (inner: string) => els.join('').replace('/>', inner ? `>${inner}</rect>` : '/>');
    return href && full ? hits.mark(() => draw(''), name, r, { href }) : draw(tip(name));
  };

  // Group header: "label (total)", else the label, else the total, else none.
  const headerText = (g: TreemapGroup, room: number) => {
    for (const t of [`${g.label} (${fmt(totalOf(g))})`, g.label, fmt(totalOf(g))]) {
      if (textWidth(t, 12.5, 'mono') <= room) return t;
    }
    return '';
  };

  let bottom: number;
  if (!narrow) {
    const order = byInput(groups, totalOf);
    const area = Wp * Hp;
    let widths = order.map((g) => Math.sqrt((area * totalOf(g)) / T));
    let k = 0;
    let rects: Rect[] = [];
    // Fixed point: group areas = total x k + a header strip across the width
    // the layout gives them.
    for (let it = 0; it < 12; it++) {
      k = (area - HEAD * widths.reduce((s, x) => s + x, 0)) / T;
      if (k <= 0) throw new Error(`charts(${where}): ${groups.length} group headers leave no room at plotHeight ${Hp}; raise it`);
      rects = squarify(
        order.map((g, i) => totalOf(g) * k + HEAD * widths[i]),
        { x: L, y: top, w: Wp, h: Hp },
      );
      widths = rects.map((r) => r.w);
    }
    order.forEach((g, i) => {
      const r = rects[i];
      const head = (r.w * r.h - totalOf(g) * k) / r.w;
      if (head < 14) throw new Error(`charts(${where}): group "${g.label}" is too small for its header; raise plotHeight`);
      const label = headerText(g, r.w - 8);
      out.push(`<rect x="${r1(r.x)}" y="${r1(r.y)}" width="${r1(r.w)}" height="${r1(head)}" class="tm-gh">${tip(`${g.label}: ${fmt(totalOf(g))} ${unitOf(totalOf(g))}`)}</rect>`);
      if (label && head >= 17) out.push(text(r.x + 4, r.y + head / 2 + 4.5, label, { size: 12.5, cls: 'mono', where: 'group header' }));
      for (const { tile, rect } of tilesIn(g, { x: r.x, y: r.y + head, w: r.w, h: r.h - head })) out.push(drawTile(g, tile, rect));
    });
    bottom = top + Hp;
  } else {
    const k = (Wp * Hp) / T;
    let y = 0;
    for (const g of groups) {
      const lines = wrapText(`${g.label} (${fmt(totalOf(g))})`, Wp, 12.5, 'mono', 2, 'group header');
      lines.forEach((line) => {
        y += 17;
        out.push(text(L, y, line, { size: 12.5, cls: 'mono', where: 'group header' }));
      });
      y += 6;
      const h = (totalOf(g) * k) / Wp;
      for (const { tile, rect } of tilesIn(g, { x: L, y, w: Wp, h })) out.push(drawTile(g, tile, rect));
      y += h + 4;
    }
    bottom = y - 4;
  }

  const withFill = groups.some((g) => g.items.some((it) => it.fill !== undefined));
  const withStatus = groups.some((g) => g.items.some((it) => it.status));
  const { svg, height } = assemble({
    base: input,
    width: W,
    bottom,
    body: out,
    defs: marks.defs(),
    role: groups.some((g) => g.href || g.items.some((it) => it.href)) ? 'group' : 'img',
    cls: narrow ? 'ch-treemap ch-list' : 'ch-treemap',
  });
  const cap = input.unit.charAt(0).toUpperCase() + input.unit.slice(1);
  const rows: Cell[][] = groups.flatMap((g) =>
    g.items.map((it) => [
      g.label,
      nameOf(it),
      it.value,
      ...(withFill ? [it.fill === undefined ? '' : pct(it)] : []),
      ...(withStatus ? [it.status ?? ''] : []),
    ]),
  );
  return {
    svg,
    table: table(
      input.tableCaption ?? input.title,
      [
        input.groupHeader ?? w.group,
        input.itemHeader ?? w.item,
        input.valueHeader ?? cap,
        ...(withFill ? [input.fillHeader ?? '%'] : []),
        ...(withStatus ? [w.status] : []),
      ],
      rows,
    ),
    width: W,
    height,
  };
}
