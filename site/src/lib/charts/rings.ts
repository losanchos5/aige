// rings.ts: three ring charts (design D2).
//
// concentricRings: containment. A centre disc and rings from the inside out
// (harm levels from the individual to the environment; the elements of an
// evaluation environment around the model), optionally cut into sectors (the
// seven MIT domains), with one mark per item pinned in its ring and sector.
// Marks in one cell are spread evenly along the cell's arc, one or more rows
// deep, at least one pitch apart (24 when marks link, else 16; 12 narrow), so
// they never overlap; a cell that cannot hold its marks throws, naming it.
// Ring numbers sit in a gap at the top and the rings are named in a numbered
// key under the circle; sector labels go around the circle when they fit,
// else as letters with a lettered key. Narrow ('narrow', 280, and whenever the
// width is under 480): the same rings at 280 with both keys, marks unlinked
// (the key rows keep the ring links), text at 12.5 or more. Table: Item |
// Ring | Sector (with sectors) | Layer (with tones) | Status (with statuses).
//
// lifecycleRing: a cycle of stages. The ring's arcs are the stages (numbered,
// clockwise from the top), their records listed beside the ring (first half
// on the right, top to bottom, the rest on the left, bottom to top), and the
// records that span every stage inside the centre. A record's circle area is
// its size (fields) and its inner disc the filled share (required fields).
// Narrow ('list', 280, and under 480 wide): one list per stage, then the
// centre. Table: Stage | Record | size | share (%).
//
// progressRing: one ring per item with the share done, static at build and
// updatable in place by a page script (no animation): each arc is a <circle
// pathLength="100" data-ring="<key>"> whose stroke-dasharray is "<pct> 100",
// the percentage a <text data-ring-label="<key>"> and the count a
// <text data-ring-count="<key>">; the script changes those attributes and
// texts. Table: Item | Done | Total | Percent.
import {
  NARROW_WIDTH,
  assemble,
  esc,
  fitText,
  fmt,
  layerWord,
  legend,
  linkText,
  markStyles,
  nonEmpty,
  r1,
  shape,
  shapeBox,
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
  type Shape,
  type Tone,
} from './core';

const L = 12;
const KEY = /^[a-z][a-z0-9-]*$/;

const RING_WORDS = {
  en: { ring: 'Ring', sector: 'Sector', stage: 'Stage', record: 'Record', size: 'Size', done: 'Done', percent: 'Percent' },
  es: { ring: 'Anillo', sector: 'Sector', stage: 'Etapa', record: 'Registro', size: 'Tamaño', done: 'Hechos', percent: 'Porcentaje' },
};
const ringWords = (lang?: 'en' | 'es') => RING_WORDS[lang === 'es' ? 'es' : 'en'];

/** Point at angle `a` (radians, clockwise from 12 o'clock) and radius `r`. */
const polar = (cx: number, cy: number, r: number, a: number): [number, number] => [cx + r * Math.sin(a), cy - r * Math.cos(a)];

// ------------------------------------------------------ concentricRings -- //

export interface RingDef {
  key: string;
  label: string;
  /** The ring's key row links here. */
  href?: string;
}

export interface RingSector {
  key: string;
  label: string;
}

export interface RingMark {
  /** Name in the table and the mark's tooltip. */
  label: string;
  /** Key of its ring. */
  ring: string;
  /** Key of its sector (required when the chart has sectors). */
  sector?: string;
  shape?: Shape;
  state?: MarkState;
  /** Stack layer (the layer of the control that catches a harm). */
  tone?: Tone;
  /** Status word for the table and tooltip ("To be specified"). */
  status?: string;
  /** Wide only: the mark links (24 px pitch). */
  href?: string;
}

export interface ConcentricRingsInput extends ChartBase {
  /** From the centre outwards. */
  rings: RingDef[];
  /** Optional sectors, clockwise from the top. */
  sectors?: RingSector[];
  marks: RingMark[];
  /** The disc at the centre (e.g. "Model or agent"). */
  centre: { label: string };
  /** 'wide' (default from 480 wide) or 'narrow' (default under 480). */
  layout?: 'wide' | 'narrow';
  /** Name each ring's marks after it in the key ("1 Harness: EVAL-008"). */
  keyMarks?: boolean;
  /** Swatches under the key (e.g. the layer colours of the marks). */
  legend?: { label: string; shape?: Shape; state?: MarkState; tone?: Tone }[];
  itemHeader?: string;
  ringHeader?: string;
  sectorHeader?: string;
}

interface Cellspot {
  mark: RingMark;
  x: number;
  y: number;
}

export function concentricRings(input: ConcentricRingsInput): ChartOutput {
  const where = `concentricRings ${input.id}`;
  const { rings, marks } = input;
  nonEmpty(rings, 'rings', where);
  nonEmpty(marks, 'marks', where);
  const sectors = input.sectors ?? [];
  if (new Set(rings.map((r) => r.key)).size !== rings.length) throw new Error(`charts(${where}): ring keys must differ`);
  if (new Set(sectors.map((s) => s.key)).size !== sectors.length) throw new Error(`charts(${where}): sector keys must differ`);
  if (sectors.length > 12) throw new Error(`charts(${where}): ${sectors.length} sectors, at most 12 fit`);
  const ringIdx = new Map(rings.map((r, i) => [r.key, i]));
  const secIdx = new Map(sectors.map((s, i) => [s.key, i]));
  for (const m of marks) {
    if (!ringIdx.has(m.ring)) throw new Error(`charts(${where}): mark "${m.label}" names unknown ring "${m.ring}"`);
    if (sectors.length ? !secIdx.has(m.sector ?? '') : m.sector !== undefined) {
      throw new Error(`charts(${where}): mark "${m.label}" names ${sectors.length ? `unknown sector "${m.sector}"` : 'a sector, but the chart has none'}`);
    }
  }
  const narrow = (input.layout ?? ((input.width ?? 640) < 480 ? 'narrow' : 'wide')) === 'narrow';
  const W = input.width ?? (narrow ? NARROW_WIDTH : 640);
  const fs = narrow ? 12.5 : 13;
  const rw = ringWords(input.lang);
  const w = words(input.lang);
  const linked = !narrow && marks.some((m) => m.href);
  const markR = narrow ? 4.5 : 5;
  // Centre-to-centre spacing; linked marks keep a margin over the 24 px
  // target spacing so rounding to 0.1 never brings two within it.
  const pitch = linked ? 25 : narrow ? 12 : 16;
  const nSec = Math.max(1, sectors.length);
  const cells = new Map<string, RingMark[]>();
  for (const m of marks) {
    const key = `${ringIdx.get(m.ring)}:${sectors.length ? secIdx.get(m.sector!) : 0}`;
    cells.set(key, [...(cells.get(key) ?? []), m]);
  }

  // Centre disc: the smallest radius (from a floor) whose label wraps inside.
  let r0 = narrow ? 30 : 40;
  let centreLines: string[] = [];
  for (;;) {
    try {
      centreLines = wrapText(input.centre.label, 1.6 * r0 - 8, fs, 'body', 3, 'centre label');
      if (centreLines.length * 15 <= 1.4 * r0) break;
    } catch (err) {
      if (r0 >= 90) throw err;
    }
    r0 += 2;
  }

  // Geometry: the centre radius c0 (from r0 up) and ring width t giving the
  // smallest circle, within rMax, whose every cell holds its marks. Inner
  // rings have the shortest arcs, so a wider centre often beats wider rings.
  type Geometry = { c0: number; t: number; gap: number; spots: Cellspot[] };
  const tryAt = (c0: number, t: number): Geometry | null => {
    const gap = Math.min(0.6, 20 / (c0 + t / 2));
    const span = (2 * Math.PI - gap) / nSec;
    const rowsIn = Math.floor((t - 2) / pitch);
    const spots: Cellspot[] = [];
    for (const [key, list] of cells) {
      const [ri, si] = key.split(':').map(Number);
      const rIn = c0 + ri * t;
      const radii = Array.from({ length: rowsIn }, (_, k) => rIn + t / 2 + (k - (rowsIn - 1) / 2) * pitch).reverse();
      // Marks per row: the chord between neighbours stays at least one pitch.
      const caps = radii.map((r) => Math.floor(span / (2 * Math.asin(Math.min(1, pitch / (2 * r))))));
      let used = 0;
      let room = 0;
      while (used < radii.length && room < list.length) room += caps[used++];
      if (room < list.length) return null;
      let left = list.length;
      let at = 0;
      for (let k = 0; k < used; k++) {
        const count = Math.min(caps[k], Math.ceil(left / (used - k)));
        const a0 = gap / 2 + si * span;
        for (let i = 0; i < count; i++) {
          const [x, y] = polar(0, 0, radii[k], a0 + ((i + 0.5) * span) / count);
          spots.push({ mark: list[at++], x, y });
        }
        left -= count;
      }
    }
    return { c0, t, gap, spots };
  };
  const layoutAt = (rMax: number): Geometry | null => {
    let best: Geometry | null = null;
    const size = (g: Geometry) => g.c0 + rings.length * g.t;
    for (let c0 = r0; c0 + rings.length * (pitch + 2) <= rMax; c0 += 2) {
      if (best && c0 + rings.length * (pitch + 2) >= size(best)) break;
      for (let t = pitch + 2; c0 + rings.length * t <= rMax && (!best || c0 + rings.length * t < size(best)); t++) {
        const g = tryAt(c0, t);
        if (g) {
          best = g;
          break;
        }
      }
    }
    return best;
  };

  // Sector labels around the circle when they fit (wide only), else letters.
  const half = (W - 2 * L) / 2;
  let geo: Geometry | null = null;
  let outside = false;
  let labelBoxes: { lines: string[]; x: number; y: number; anchor: 'start' | 'middle' | 'end'; bx: number; by: number; bw: number; bh: number }[] = [];
  if (sectors.length && !narrow) {
    const g = layoutAt(half - 150);
    if (g) {
      const rOut = g.c0 + rings.length * g.t;
      const span = (2 * Math.PI - g.gap) / nSec;
      try {
        labelBoxes = sectors.map((s, i) => {
          const a = g.gap / 2 + (i + 0.5) * span;
          const [px, py] = polar(0, 0, rOut + 10, a);
          const sin = Math.sin(a);
          const anchor = sin > 0.25 ? 'start' : sin < -0.25 ? 'end' : 'middle';
          const room = anchor === 'start' ? half - px : anchor === 'end' ? half + px : 2 * Math.min(half - px, half + px);
          const lines = wrapText(s.label, Math.min(140, room), 12.5, 'body', 3, 'sector label');
          const bw = Math.max(...lines.map((l) => textWidth(l, 12.5)));
          const bh = lines.length * 15;
          const cos = Math.cos(a);
          const by = cos > 0.25 ? py - bh : cos < -0.25 ? py + 2 : py - bh / 2;
          const bx = anchor === 'start' ? px : anchor === 'end' ? px - bw : px - bw / 2;
          return { lines, x: px, y: by + 11.5, anchor, bx, by, bw, bh };
        });
        const clash = labelBoxes.some((p, i) =>
          labelBoxes.some((q, j) => j > i && p.bx < q.bx + q.bw + 6 && q.bx < p.bx + p.bw + 6 && p.by < q.by + q.bh + 2 && q.by < p.by + p.bh + 2),
        );
        if (!clash) {
          geo = g;
          outside = true;
        }
      } catch {
        // A label past three lines: fall back to letters.
      }
    }
  }
  if (!geo) geo = layoutAt(half - (sectors.length ? 16 : 4));
  if (!geo) {
    const worst = [...cells.entries()].sort((a, b) => b[1].length - a[1].length)[0];
    const [ri, si] = worst[0].split(':').map(Number);
    throw new Error(
      `charts(${where}): ${worst[1].length} marks do not fit ring "${rings[ri].label}"${sectors.length ? `, sector "${sectors[si].label}"` : ''} at width ${W}; widen the chart${linked ? ' or drop the mark links' : ''}`,
    );
  }
  const { c0, t, gap } = geo;
  const rOut = c0 + rings.length * t;
  const span = (2 * Math.PI - gap) / nSec;
  const topPad = outside ? Math.max(0, ...labelBoxes.map((b) => -b.by - rOut)) + 8 : sectors.length ? 22 : 8;
  const cx = W / 2;
  const cy = rOut + topPad;
  const marksCls = markStyles(input.id);
  const hits = targets(where);
  const out: string[] = [];

  // Bands from the outside in (each disc covers the next), then the centre.
  for (let i = rings.length - 1; i >= 0; i--) {
    out.push(`<circle cx="${r1(cx)}" cy="${r1(cy)}" r="${r1(c0 + (i + 1) * t)}" class="${i % 2 ? 'rg-b' : 'rg-a'}"/>`);
  }
  out.push(`<circle cx="${r1(cx)}" cy="${r1(cy)}" r="${r1(c0)}" class="mk-hi"/>`);
  centreLines.forEach((line, i) =>
    out.push(text(cx, cy + 4.5 + (i - (centreLines.length - 1) / 2) * 15, line, { size: fs, weight: 600, cls: 'on-ink', anchor: 'middle', where: 'centre label' })),
  );
  // Sector boundaries (the gap edges first, then clockwise).
  const bounds = sectors.length ? Array.from({ length: nSec + 1 }, (_, i) => gap / 2 + i * span) : [gap / 2, 2 * Math.PI - gap / 2];
  const d = bounds
    .map((a) => {
      const [x0, y0] = polar(cx, cy, c0, a);
      const [x1, y1] = polar(cx, cy, rOut, a);
      return `M${r1(x0)} ${r1(y0)}L${r1(x1)} ${r1(y1)}`;
    })
    .join('');
  out.push(`<path class="rule" d="${d}"/>`);
  // Ring numbers in the gap at the top.
  rings.forEach((_, i) => out.push(text(cx, cy - (c0 + (i + 0.5) * t) + 4.5, i + 1, { size: narrow ? 12.5 : 12, cls: 'mono', anchor: 'middle', where: 'ring number' })));
  // Sector labels or letters.
  const letter = (i: number) => String.fromCharCode(65 + i);
  if (outside) {
    for (const b of labelBoxes) {
      b.lines.forEach((line, i) => out.push(text(cx + b.x, cy + b.y + i * 15, line, { size: 12.5, anchor: b.anchor, where: 'sector label' })));
    }
  } else if (sectors.length) {
    sectors.forEach((_, i) => {
      const [x, y] = polar(cx, cy, rOut + 10, gap / 2 + (i + 0.5) * span);
      out.push(text(x, y + 4.5, letter(i), { size: narrow ? 12.5 : 12, cls: 'mono', anchor: 'middle', where: 'sector letter' }));
    });
  }
  // Marks.
  for (const s of geo.spots) {
    const m = s.mark;
    const kind = m.shape ?? 'circle';
    const x = cx + s.x;
    const y = cy + s.y;
    const parts = [m.label, rings[ringIdx.get(m.ring)!].label, ...(m.sector ? [sectors[secIdx.get(m.sector)!].label] : []), ...(m.status ? [m.status] : [])];
    const name = parts.join(' · ');
    const attrs = marksCls.attrs(m.state, m.tone ?? 0);
    if (linked && m.href) {
      out.push(hits.mark(() => shape(kind, x, y, markR, attrs), name, shapeBox(kind, x, y, markR), { href: m.href }));
    } else {
      out.push(shape(kind, x, y, markR, attrs, tip(name)));
    }
  }

  // Keys under the circle: numbered rings, lettered sectors.
  const below = outside ? Math.max(rOut, ...labelBoxes.map((b) => b.by + b.bh)) : rOut;
  let y = cy + below + (sectors.length && !outside ? 28 : 18);
  const pitchKey = rings.some((r) => r.href) ? 24 : 20;
  const keyRow = (tag: string, label: string, href?: string) => {
    const lines = wrapText(label, W - L - (L + 24), fs, 'body', 3, 'key label');
    out.push(text(L, y, tag, { size: narrow ? 12.5 : 12, cls: 'mono', where: 'key tag' }));
    const els = lines.map((line, i) => text(L + 24, y + i * 16, line, { size: fs, where: 'key label' }));
    out.push(href ? linkText(els.join(''), label, href) : els.join(''));
    y += (lines.length - 1) * 16 + pitchKey;
  };
  rings.forEach((r, i) => {
    const own = input.keyMarks ? marks.filter((m) => m.ring === r.key).map((m) => m.label) : [];
    keyRow(String(i + 1), own.length ? `${r.label}: ${own.join(', ')}` : r.label, r.href);
  });
  if (sectors.length && !outside) sectors.forEach((s, i) => keyRow(letter(i), s.label));
  let bottom = y - pitchKey;
  if (input.legend?.length) {
    const lg = legend(input.legend, L, bottom + 26, W - L, marksCls);
    out.push(...lg.els);
    bottom = lg.bottom;
  }

  const withTone = marks.some((m) => m.tone);
  const withStatus = marks.some((m) => m.status);
  const { svg, height } = assemble({
    base: input,
    width: W,
    bottom,
    body: out,
    defs: marksCls.defs(),
    role: linked || rings.some((r) => r.href) ? 'group' : 'img',
    cls: narrow ? 'ch-rings ch-list' : 'ch-rings',
  });
  const rows: Cell[][] = marks.map((m) => [
    m.label,
    rings[ringIdx.get(m.ring)!].label,
    ...(sectors.length ? [sectors[secIdx.get(m.sector!)!].label] : []),
    ...(withTone ? [layerWord(m.tone, input.lang)] : []),
    ...(withStatus ? [m.status ?? ''] : []),
  ]);
  return {
    svg,
    table: table(
      input.tableCaption ?? input.title,
      [
        input.itemHeader ?? w.item,
        input.ringHeader ?? rw.ring,
        ...(sectors.length ? [input.sectorHeader ?? rw.sector] : []),
        ...(withTone ? [w.layer] : []),
        ...(withStatus ? [w.status] : []),
      ],
      rows,
    ),
    width: W,
    height,
  };
}

// -------------------------------------------------------- lifecycleRing -- //

export interface LifecycleRecord {
  label: string;
  /** Full name for the table and tooltip (default: the label). */
  name?: string;
  /** Circle area (e.g. the number of fields); default: every circle alike. */
  size?: number;
  /** Filled share, 0 to 1 (e.g. required fields over all fields). */
  fill?: number;
  href?: string;
}

export interface LifecycleNode extends LifecycleRecord {
  /** Key of its stage. */
  stage: string;
}

export interface LifecycleRingInput extends ChartBase {
  /** The stages in cycle order, clockwise from the top. */
  stages: { key: string; label: string; href?: string }[];
  nodes: LifecycleNode[];
  /** The centre: records that span every stage. */
  centre: { label: string; nodes?: LifecycleRecord[] };
  /** 'ring' (default from 480 wide) or 'list' (narrow, default under 480). */
  layout?: 'ring' | 'list';
  /** Meaning of the size and the fill, for the legend and the table
   *  headings ("Fields", "Required (%)"). */
  sizeLabel?: string;
  fillLabel?: string;
  stageHeader?: string;
  itemHeader?: string;
}

export function lifecycleRing(input: LifecycleRingInput): ChartOutput {
  const where = `lifecycleRing ${input.id}`;
  const { stages } = input;
  nonEmpty(stages, 'stages', where);
  if (stages.length < 3) throw new Error(`charts(${where}): a cycle needs at least three stages`);
  if (new Set(stages.map((s) => s.key)).size !== stages.length) throw new Error(`charts(${where}): stage keys must differ`);
  const stageIdx = new Map(stages.map((s, i) => [s.key, i]));
  const centreNodes = input.centre.nodes ?? [];
  nonEmpty([...input.nodes, ...centreNodes], 'records', where);
  for (const n of input.nodes) {
    if (!stageIdx.has(n.stage)) throw new Error(`charts(${where}): record "${n.label}" names unknown stage "${n.stage}"`);
  }
  for (const n of [...input.nodes, ...centreNodes]) {
    if (n.size !== undefined && !(Number.isFinite(n.size) && n.size > 0)) throw new Error(`charts(${where}): record "${n.label}" has size ${n.size}; sizes are positive`);
    if (n.fill !== undefined && !(n.fill >= 0 && n.fill <= 1)) throw new Error(`charts(${where}): record "${n.label}" has fill ${n.fill}; fills run from 0 to 1`);
  }
  const list = (input.layout ?? ((input.width ?? 640) < 480 ? 'list' : 'ring')) === 'list';
  const W = input.width ?? (list ? NARROW_WIDTH : 640);
  const fs = list ? 12.5 : 13;
  const rw = ringWords(input.lang);
  const hits = targets(where);
  const out: string[] = [];
  const groups = stages.map((s) => input.nodes.filter((n) => n.stage === s.key));
  const maxSize = Math.max(...[...input.nodes, ...centreNodes].map((n) => n.size ?? 0), 0);
  const radius = (n: LifecycleRecord) => (maxSize && n.size !== undefined ? Math.max(3, 9 * Math.sqrt(n.size / maxSize)) : 6);
  const pct = (n: LifecycleRecord) => Math.round((n.fill ?? 0) * 100);
  const nameOf = (n: LifecycleRecord) => {
    const bits = [
      ...(n.size !== undefined && input.sizeLabel ? [`${fmt(n.size)} ${input.sizeLabel.toLowerCase()}`] : []),
      ...(n.fill !== undefined && input.fillLabel ? [`${input.fillLabel} ${pct(n)}`] : []),
    ];
    return bits.length ? `${n.name ?? n.label}: ${bits.join(', ')}` : (n.name ?? n.label);
  };
  // One record row: its glyph (outer circle = size, inner disc = fill) and label.
  const row = (n: LifecycleRecord, x: number, y: number, labelW: number) => {
    fitText(n.label, labelW, fs, 'body', 'record label');
    const r = radius(n);
    const inner = n.fill ? r * Math.sqrt(n.fill) : 0;
    const draw = (tipEl: string) =>
      `<circle cx="${r1(x + 10)}" cy="${r1(y)}" r="${r1(r)}" class="mk mk-line-0"${tipEl ? `>${tipEl}</circle>` : '/>'}` +
      (inner ? `<circle cx="${r1(x + 10)}" cy="${r1(y)}" r="${r1(inner)}" class="mk-hi"/>` : '') +
      text(x + 26, y + 4.5, n.label, { size: fs, where: 'record label' });
    const name = nameOf(n);
    return n.href ? hits.mark(() => draw(''), name, { x, y: y - 12, w: 26 + textWidth(n.label, fs), h: 24 }, { href: n.href }) : draw(tip(name));
  };
  const header = (label: string, x: number, y: number, labelW: number, href?: string) => {
    fitText(label, labelW, 12.5, 'mono', 'stage label');
    const el = text(x, y, label, { size: 12.5, cls: 'mono muted', where: 'stage label' });
    return href ? linkText(el, label, href) : el;
  };
  let bottom: number;

  if (!list) {
    // Stage blocks beside the ring, then the ring sized to hold the centre.
    const half = Math.ceil(stages.length / 2);
    const right = stages.map((_, i) => i).slice(0, half);
    const left = stages.map((_, i) => i).slice(half).reverse();
    const blockH = (i: number) => 20 + groups[i].length * 24;
    const colH = (ids: number[]) => ids.reduce((s, i) => s + blockH(i), 0) + Math.max(0, ids.length - 1) * 14;
    const centreLines = wrapText(input.centre.label, 150, 13.5, 'body', 2, 'centre label');
    const centreH = centreLines.length * 17 + centreNodes.length * 24;
    const centreW = Math.max(...centreLines.map((l) => textWidth(l, 13.5)), ...centreNodes.map((n) => 26 + textWidth(n.label, fs)));
    let R = 80;
    const inner = () => R - 20;
    const fitsCentre = () => {
      const hh = centreH / 2 + 6;
      return hh < inner() && 2 * Math.sqrt(inner() ** 2 - hh ** 2) >= centreW + 12;
    };
    while (!fitsCentre()) {
      R += 2;
      if (R > 170) throw new Error(`charts(${where}): the centre records do not fit a ring of radius 170; shorten their labels`);
    }
    const colW = (W - 2 * L - 2 * R - 2 * 36) / 2;
    if (colW < 120) throw new Error(`charts(${where}): width ${W} leaves ${Math.floor(colW)}px per stage column; use layout 'list'`);
    const H = Math.max(colH(right), colH(left), 2 * R + 40);
    const top = 8;
    const cx = W / 2;
    const cy = top + H / 2;
    const n = stages.length;
    const step = (2 * Math.PI) / n;
    // Arcs, one per stage, with a small gap; a numbered badge at each middle.
    const arcs: string[] = [];
    stages.forEach((_, i) => {
      const a0 = i * step + 0.06;
      const a1 = (i + 1) * step - 0.06;
      const [x0, y0] = polar(cx, cy, R, a0);
      const [x1, y1] = polar(cx, cy, R, a1);
      arcs.push(`M${r1(x0)} ${r1(y0)}A${R} ${R} 0 0 1 ${r1(x1)} ${r1(y1)}`);
    });
    out.push(`<path class="lc-arc" d="${arcs.join('')}"/>`);
    const blockY = new Map<number, number>();
    const place = (ids: number[], x: number) => {
      let y = cy - colH(ids) / 2;
      for (const i of ids) {
        blockY.set(i, y);
        out.push(header(`${i + 1} ${stages[i].label}`, x, y + 14, colW, stages[i].href));
        groups[i].forEach((node, k) => out.push(row(node, x, y + 20 + k * 24 + 12, colW - 26)));
        y += blockH(i) + 14;
      }
    };
    const xr = cx + R + 36;
    const xl = L;
    place(right, xr);
    place(left, xl);
    // Leaders from each badge to its block, then the badges over them.
    const leaders: string[] = [];
    const badges: string[] = [];
    stages.forEach((_, i) => {
      const a = (i + 0.5) * step;
      const [bx, by] = polar(cx, cy, R, a);
      const [ox, oy] = polar(cx, cy, R + 12, a);
      const onRight = right.includes(i);
      const ex = onRight ? xr - 6 : xl + colW + 6;
      leaders.push(`M${r1(ox)} ${r1(oy)}L${r1(ex)} ${r1(blockY.get(i)! + 10)}`);
      badges.push(`<circle cx="${r1(bx)}" cy="${r1(by)}" r="11" class="mk-hi"/>`);
      badges.push(text(bx, by + 4.5, i + 1, { size: 12, cls: 'mono on-ink', anchor: 'middle', where: 'stage number' }));
    });
    out.unshift(`<path class="rule" d="${leaders.join('')}"/>`);
    out.push(...badges);
    // The centre: its label, then its records.
    let y = cy - centreH / 2;
    centreLines.forEach((line) => {
      y += 17;
      out.push(text(cx, y - 4, line, { size: 13.5, weight: 600, anchor: 'middle', where: 'centre label' }));
    });
    const x0 = cx - centreW / 2;
    centreNodes.forEach((node) => {
      out.push(row(node, x0, y + 12, centreW));
      y += 24;
    });
    bottom = top + H;
  } else {
    let y = 0;
    const block = (label: string, nodes: LifecycleRecord[], href?: string) => {
      y += 22;
      out.push(header(label, L, y, W - 2 * L, href));
      y += 6;
      for (const node of nodes) {
        out.push(row(node, L, y + 12, W - 2 * L - 26));
        y += 24;
      }
    };
    stages.forEach((s, i) => block(`${i + 1} ${s.label}`, groups[i], s.href));
    if (centreNodes.length) block(input.centre.label, centreNodes);
    bottom = y;
  }
  // Legend: what the circle and its disc mean, side by side when they fit.
  const keys = [
    ...(input.sizeLabel ? [{ label: input.sizeLabel, disc: false }] : []),
    ...(input.fillLabel ? [{ label: input.fillLabel, disc: true }] : []),
  ];
  let lx = L;
  let ly = bottom + 24;
  for (const k of keys) {
    fitText(k.label, W - 2 * L - 20, 12.5, 'body', 'legend');
    if (lx > L && lx + 20 + textWidth(k.label, 12.5) > W - L) {
      lx = L;
      ly += 20;
    }
    out.push(`<circle cx="${lx + 7}" cy="${ly - 4}" r="7" class="mk mk-line-0"/>`);
    if (k.disc) out.push(`<circle cx="${lx + 7}" cy="${ly - 4}" r="4.9" class="mk-hi"/>`);
    out.push(text(lx + 20, ly, k.label, { size: 12.5, where: 'legend' }));
    lx += 20 + textWidth(k.label, 12.5) + 18;
  }
  if (keys.length) bottom = ly;

  const { svg, height } = assemble({
    base: input,
    width: W,
    bottom,
    body: out,
    role: [...input.nodes, ...centreNodes].some((n) => n.href) || stages.some((s) => s.href) ? 'group' : 'img',
    cls: list ? 'ch-rings ch-list' : 'ch-rings',
  });
  const withSize = [...input.nodes, ...centreNodes].some((n) => n.size !== undefined);
  const withFill = [...input.nodes, ...centreNodes].some((n) => n.fill !== undefined);
  const cells = (stage: string, n: LifecycleRecord): Cell[] => [
    stage,
    n.name ?? n.label,
    ...(withSize ? [n.size ?? ''] : []),
    ...(withFill ? [n.fill === undefined ? '' : pct(n)] : []),
  ];
  return {
    svg,
    table: table(
      input.tableCaption ?? input.title,
      [
        input.stageHeader ?? rw.stage,
        input.itemHeader ?? rw.record,
        ...(withSize ? [input.sizeLabel ?? rw.size] : []),
        ...(withFill ? [input.fillLabel ?? rw.percent] : []),
      ],
      [...stages.flatMap((s, i) => groups[i].map((n) => cells(s.label, n))), ...centreNodes.map((n) => cells(input.centre.label, n))],
    ),
    width: W,
    height,
  };
}

// --------------------------------------------------------- progressRing -- //

export interface ProgressItem {
  /** [a-z][a-z0-9-]*: the data-ring hook a page script updates. */
  key: string;
  label: string;
  done: number;
  total: number;
}

export interface ProgressRingInput extends ChartBase {
  items: ProgressItem[];
  doneHeader?: string;
  totalHeader?: string;
}

/** Percent done, rounded; 0 when there is nothing to do. */
const percent = (p: ProgressItem) => (p.total > 0 ? Math.round((p.done / p.total) * 100) : 0);

export function progressRing(input: ProgressRingInput): ChartOutput {
  const where = `progressRing ${input.id}`;
  const { items } = input;
  nonEmpty(items, 'items', where);
  if (new Set(items.map((p) => p.key)).size !== items.length) throw new Error(`charts(${where}): item keys must differ`);
  for (const p of items) {
    if (!KEY.test(p.key)) throw new Error(`charts(${where}): item key "${p.key}" is not [a-z][a-z0-9-]*`);
    if (!(Number.isInteger(p.total) && p.total >= 0 && Number.isInteger(p.done) && p.done >= 0 && p.done <= p.total)) {
      throw new Error(`charts(${where}): item "${p.label}" has ${p.done} of ${p.total}; counts are whole, done at most total`);
    }
  }
  const W = input.width ?? Math.min(640, Math.max(NARROW_WIDTH, items.length * 104 + 2 * L));
  const rw = ringWords(input.lang);
  const w = words(input.lang);
  const perRow = Math.max(1, Math.min(items.length, Math.floor((W - 2 * L) / 84)));
  const cw = (W - 2 * L) / perRow;
  const R = 26;
  const out: string[] = [];
  const labels = items.map((p) => wrapText(p.label, cw - 8, 12.5, 'body', 2, 'item label'));
  const rowH = 2 * R + 30 + Math.max(...labels.map((l) => l.length)) * 16;
  let bottom = 0;
  items.forEach((p, i) => {
    const col = i % perRow;
    const rowI = Math.floor(i / perRow);
    const cx = L + (col + 0.5) * cw;
    const top = 8 + rowI * rowH;
    const cy = top + R + 4;
    const pc = percent(p);
    const hook = (el: string, attr: string) => el.replace('<text ', `<text ${attr}="${esc(p.key)}" `);
    out.push(`<circle cx="${r1(cx)}" cy="${r1(cy)}" r="${R}" class="pr-track"/>`);
    out.push(
      `<circle cx="${r1(cx)}" cy="${r1(cy)}" r="${R}" class="pr-arc" pathLength="100" stroke-dasharray="${pc} 100" transform="rotate(-90 ${r1(cx)} ${r1(cy)})" data-ring="${esc(p.key)}"/>`,
    );
    out.push(hook(text(cx, cy + 1, `${pc}%`, { size: 13, weight: 600, cls: 'num', anchor: 'middle', where: 'percent' }), 'data-ring-label'));
    out.push(hook(text(cx, cy + 15, `${p.done}/${p.total}`, { size: 12.5, cls: 'num', anchor: 'middle', where: 'count' }), 'data-ring-count'));
    labels[i].forEach((line, k) => out.push(text(cx, cy + R + 20 + k * 16, line, { size: 12.5, anchor: 'middle', where: 'item label' })));
    bottom = Math.max(bottom, cy + R + 20 + (labels[i].length - 1) * 16);
  });
  const { svg, height } = assemble({ base: input, width: W, bottom, body: out, role: 'img', cls: 'ch-rings ch-progress' });
  return {
    svg,
    table: table(
      input.tableCaption ?? input.title,
      [w.item, input.doneHeader ?? rw.done, input.totalHeader ?? w.total, rw.percent],
      items.map((p) => [p.label, p.done, p.total, percent(p)]),
    ),
    width: W,
    height,
  };
}
