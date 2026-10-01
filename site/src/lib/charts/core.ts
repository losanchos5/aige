// core.ts: the shared kernel of the build-time chart primitives in this folder.
// Scales (linear, band, time) with at most six round ticks; text measurement
// ported from scripts/lib/svg-text.mjs and scripts/lib/posters.mjs that throws,
// naming the label, when a label cannot fit its box (the fix is shorter wording,
// never a smaller font or a silent cut); the accessible <svg> shell (role,
// <title>, <desc>, aria-labelledby); the "Source: ..." and "As of YYYY-MM-DD"
// lines printed inside the image; mark helpers (shapes, fill states, hatch
// patterns) that map to the token classes of figures.css (.figc) and chart.css
// (.chart); and the { svg, table } result every primitive returns.
//
// Rules this module enforces for every primitive (site/VISUAL-GUIDE.md §1, §4):
// colours only through classes (never a hex), state by fill, outline, dash or
// hatch (never colour alone), text at 12 px or more and never dimmed with
// opacity, no U+2014 in any label, deterministic output (no clock, no random,
// no locale-dependent sort). One runtime import: the layer names of
// data/stack (a pure module), for the swatches of the auto legend, so a
// legend never spells a layer differently from the rest of the site.
import { layers } from '../../data/stack';

/** 0 = ink (not a layer); 1 to 5 = the stack layers (--l1..--l5). */
export type Tone = 0 | 1 | 2 | 3 | 4 | 5;
/** How a mark is drawn: solid, outlined, dashed outline or hatched. */
export type MarkState = 'filled' | 'outline' | 'dashed' | 'dotted' | 'hatched';
/** Mark shapes (VISUAL-GUIDE §1.7 keeps the diamond for a gate or a deny). */
export type Shape = 'circle' | 'square' | 'diamond' | 'triangle';
/** Type faces of the site: body (Instrument Sans), display, mono. */
export type Face = 'body' | 'disp' | 'mono';
/** 'figc': classes of figures.css (exportable); 'chart': classes of chart.css. */
export type ChartMode = 'figc' | 'chart';
export type Cell = string | number;

/** The HTML table alternative: the same data the chart draws. */
export interface ChartTable {
  caption: string;
  columns: string[];
  rows: Cell[][];
}

export interface ChartOutput {
  /** The complete inline SVG. */
  svg: string;
  /** The data as a table (Chart.astro renders it in a <details>). */
  table: ChartTable;
  /** viewBox size in user units (1 unit = 1 CSS px at natural size). */
  width: number;
  height: number;
  /** Only HeatGrid: the row-label column and the grid as two SVGs, for a
   *  sticky first column inside a scroll region (Chart.astro `scroll`). */
  sticky?: { head: string; body: string };
}

/** Options every primitive takes. */
export interface ChartBase {
  /** Unique on the page, [a-z][a-z0-9-]*: prefixes the <title>/<desc> ids.
   *  A wide/narrow pair needs two ids (e.g. "cw-venn-w", "cw-venn-n"). */
  id: string;
  /** The SVG <title> (short, like the figcaption title). */
  title: string;
  /** The SVG <desc>: one sentence saying what the chart shows. */
  desc: string;
  /** Printed as "Source: <source>" inside the image, bottom left. */
  source?: string;
  /** YYYY-MM-DD, printed as "As of <date>" (or "A fecha de" with lang 'es'). */
  asOf?: string;
  lang?: 'en' | 'es';
  /** Root class: 'figc' (default) or 'chart' for the five pages perf.spec
   *  keeps free of figures.css (/, /resources, /resources/crosswalk, /cases,
   *  /patterns). */
  mode?: ChartMode;
  /** viewBox width; each primitive documents its default. Pass
   *  NARROW_WIDTH (280) for the narrow variant of a pair. */
  width?: number;
  /** Caption of the table alternative (default: the title). */
  tableCaption?: string;
  /** The questions the auto legend's blocks answer (autoLegend): `layer`
   *  ("Colour: layer of the control that catches it") and `state`
   *  ("Drawing: failure response"). */
  legendTitles?: { layer?: string; state?: string };
  /** false: draw no auto legend (the page shows its own key beside the
   *  chart). Default true. */
  autoLegend?: boolean;
  /** The question an explicit `legend` list answers ("Effect when the rule
   *  fails"), printed above its swatches. */
  legendHeading?: string;
}

/** viewBox width of the narrow variant of a pair. A 320 px phone gives the
 *  chart canvas about 274 px (Chart.astro CANVAS_320), so text of
 *  NARROW_TEXT reads at 12.2 px there; Chart.astro fails the build when a
 *  chart a phone shows would print text under 12 px. */
export const NARROW_WIDTH = 280;
/** Smallest font size of a chart under 480 units wide (a narrow variant). */
export const NARROW_TEXT = 12.5;
/** Smallest font size a chart `W` wide prints (ticks, stamp, notes): 12 on a
 *  wide variant (shown at 1:1 or larger), NARROW_TEXT under 480 units. */
export const minText = (W: number): number => (W < 480 ? NARROW_TEXT : 12);

// ----------------------------------------------------------------- words -- //

/** Every fixed word a primitive prints or puts in its table, per language, so
 *  a Spanish page never shows English chrome. */
export interface Words {
  source: string;
  asOf: string;
  today: string;
  total: string;
  na: string;
  notApplicable: string;
  inTotal: string;
  date: string;
  item: string;
  status: string;
  lane: string;
  start: string;
  end: string;
  to: string;
  level: string;
  step: string;
  detail: string;
  highlighted: string;
  group: string;
  state: string;
  layer: string;
  note: string;
  yes: string;
  no: string;
  none: string;
  filled: string;
  outline: string;
  dashed: string;
  dotted: string;
  hatched: string;
  /** Keys of a membership dot: filled = in the set, hollow = not in it. */
  inSet: string;
  notInSet: string;
}

const WORDS: Record<'en' | 'es', Words> = {
  en: {
    source: 'Source',
    asOf: 'As of',
    today: 'Today',
    total: 'Total',
    na: 'n/a',
    notApplicable: 'not applicable',
    inTotal: 'in total',
    date: 'Date',
    item: 'Item',
    status: 'Status',
    lane: 'Lane',
    start: 'Start',
    end: 'End',
    to: 'to',
    level: 'Level',
    step: 'Step',
    detail: 'Detail',
    highlighted: 'Highlighted',
    group: 'Group',
    state: 'State',
    layer: 'Layer',
    note: 'Note',
    yes: 'Yes',
    no: 'No',
    none: 'None',
    filled: 'Filled',
    outline: 'Outline',
    dashed: 'Dashed',
    dotted: 'Dotted',
    hatched: 'Hatched',
    inSet: 'filled: in the set',
    notInSet: 'hollow: not in it',
  },
  es: {
    source: 'Fuente',
    asOf: 'A fecha de',
    today: 'Hoy',
    total: 'Total',
    na: 'no aplica',
    notApplicable: 'no aplica',
    inTotal: 'en total',
    date: 'Fecha',
    item: 'Elemento',
    status: 'Estado',
    lane: 'Carril',
    start: 'Inicio',
    end: 'Fin',
    to: 'a',
    level: 'Nivel',
    step: 'Paso',
    detail: 'Detalle',
    highlighted: 'Destacado',
    group: 'Grupo',
    state: 'Estado',
    layer: 'Capa',
    note: 'Nota',
    yes: 'Sí',
    no: 'No',
    none: 'Ninguno',
    filled: 'Relleno',
    outline: 'Contorno',
    dashed: 'Discontinuo',
    dotted: 'Punteado',
    hatched: 'Rayado',
    inSet: 'relleno: en el conjunto',
    notInSet: 'hueco: fuera de él',
  },
};

/** The fixed words for a chart's `lang` (English by default). */
export const words = (lang?: 'en' | 'es'): Words => WORDS[lang === 'es' ? 'es' : 'en'];

/** Throw a named error when a primitive gets nothing to draw (an empty filter
 *  result would otherwise crash deep in a scale, or draw an empty frame). */
export function nonEmpty(list: readonly unknown[], what: string, where: string): void {
  if (!list.length) throw new Error(`charts(${where}): no ${what} to draw`);
}

// ------------------------------------------------------------------ text -- //

/** Escape the five XML-significant characters for text nodes and attributes. */
export const esc = (value: Cell): string =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/** Round to one decimal, the precision of every coordinate we print. */
export const r1 = (n: number): number => Math.round(n * 10) / 10;

/** Numbers in labels: integers as is, others to at most two decimals. */
export const fmt = (n: number): string => String(Math.round(n * 100) / 100);

const NARROW = new Set("iljtfr.,:;'!|I".split(''));
const WIDE = new Set('mwMW'.split(''));

function charFactor(ch: string): number {
  if (NARROW.has(ch)) return 0.29;
  if (WIDE.has(ch)) return 0.86;
  if (ch >= 'A' && ch <= 'Z') return 0.64;
  if (ch >= '0' && ch <= '9') return 0.57;
  if (ch === ' ') return 0.25;
  if (ch === '&') return 0.7;
  return 0.52;
}

/** Approximate advance width in px of `text` at `px` in a site face
 *  (the per-character table of svg-text.mjs, calibrated +10 %). */
export function textWidth(text: string, px: number, face: Face = 'body'): number {
  const chars = [...String(text)];
  if (face === 'mono') return chars.length * px * 0.6;
  let sum = 0;
  for (const ch of chars) sum += charFactor(ch);
  return sum * px * 1.1 * (face === 'disp' ? 1.12 : 1);
}

/** Throw when a label carries an em dash (content-lint would fail the build
 *  later, far from the cause). */
export function checkCopy(text: string, where: string): void {
  if (String(text).includes('\u2014')) {
    throw new Error(`charts(${where}): label "${text}" contains an em dash (U+2014); use , : ; or ( )`);
  }
}

/** Throw, naming the label, when `text` is wider than `maxPx`. */
export function fitText(text: string, maxPx: number, px: number, face: Face, where: string): void {
  const w = textWidth(text, px, face);
  if (w > maxPx + 0.5) {
    throw new Error(
      `charts(${where}): label "${text}" is ${Math.ceil(w)}px wide at ${px}px, its box allows ${Math.floor(maxPx)}px; shorten the wording`,
    );
  }
}

/**
 * Greedy word wrap to `maxPx`. Throws, naming the label, when one word is wider
 * than the box or when the text needs more than `maxLines` lines.
 */
export function wrapText(
  text: string,
  maxPx: number,
  px: number,
  face: Face = 'body',
  maxLines = Infinity,
  where = 'wrap',
): string[] {
  checkCopy(text, where);
  const lines: string[] = [];
  let line = '';
  for (const word of String(text).split(/\s+/).filter(Boolean)) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && textWidth(candidate, px, face) > maxPx) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  for (const l of lines) fitText(l, maxPx, px, face, where);
  if (lines.length > maxLines) {
    throw new Error(
      `charts(${where}): label "${text}" needs ${lines.length} lines of ${Math.floor(maxPx)}px, at most ${maxLines} fit; shorten the wording`,
    );
  }
  return lines;
}

export interface TextOptions {
  size?: number;
  /** Space-separated classes: 'mono', 'disp', 'muted', 'ink2', 'num', 'on-ink'. */
  cls?: string;
  anchor?: 'start' | 'middle' | 'end';
  weight?: number;
  /** Rotation in degrees about (x, y). */
  rotate?: number;
  /** Where the label sits, for the error message. */
  where?: string;
}

/** One <text> element; refuses an em dash. */
export function text(x: number, y: number, value: Cell, o: TextOptions = {}): string {
  checkCopy(String(value), o.where ?? 'text');
  const size = o.size ?? 13;
  const attrs = [
    `x="${r1(x)}"`,
    `y="${r1(y)}"`,
    `font-size="${size}"`,
    o.cls ? `class="${o.cls}"` : '',
    o.anchor && o.anchor !== 'start' ? `text-anchor="${o.anchor}"` : '',
    o.weight && o.weight !== 400 ? `font-weight="${o.weight}"` : '',
    o.rotate ? `transform="rotate(${o.rotate} ${r1(x)} ${r1(y)})"` : '',
  ].filter(Boolean);
  return `<text ${attrs.join(' ')}>${esc(value)}</text>`;
}

// ---------------------------------------------------------------- scales -- //

export interface LinearScale {
  /** The rounded domain the ticks span (includes 0 unless zero: false). */
  domain: [number, number];
  range: [number, number];
  /** At most `maxTicks` round values (1, 2, 2.5 or 5 times a power of ten). */
  ticks: number[];
  map(value: number): number;
}

export interface LinearOptions {
  /** Include zero in the domain (default true: bars and areas start at zero). */
  zero?: boolean;
  /** At most this many ticks (default and ceiling 6). */
  maxTicks?: number;
  /** Ticks on whole numbers only (counts). */
  integer?: boolean;
}

const clean = (n: number) => Math.round(n * 1e9) / 1e9;

/** A linear scale over the extent of `values`, with round ticks. */
export function linearScale(values: readonly number[], range: [number, number], o: LinearOptions = {}): LinearScale {
  const maxTicks = Math.min(6, Math.max(2, o.maxTicks ?? 6));
  if (!values.length || values.some((v) => !Number.isFinite(v))) {
    throw new Error('charts(scale): values must be finite numbers');
  }
  let lo = Math.min(...values);
  let hi = Math.max(...values);
  if (o.zero !== false) {
    lo = Math.min(0, lo);
    hi = Math.max(0, hi);
  }
  if (lo === hi) hi = lo + 1;
  const span = hi - lo;
  let step = 0;
  let k = Math.floor(Math.log10(span / maxTicks)) - 1;
  for (; !step; k += 1) {
    for (const m of [1, 2, 2.5, 5]) {
      const s = m * 10 ** k;
      if (o.integer && s < 1) continue;
      if (o.integer && !Number.isInteger(clean(s))) continue;
      const count = Math.ceil(clean(hi / s)) - Math.floor(clean(lo / s)) + 1;
      if (count <= maxTicks) {
        step = s;
        break;
      }
    }
  }
  const d0 = clean(Math.floor(clean(lo / step)) * step);
  const d1 = clean(Math.ceil(clean(hi / step)) * step);
  const ticks: number[] = [];
  for (let t = d0; t <= d1 + step / 2; t += step) ticks.push(clean(t));
  const [r0, rr] = range;
  const map = (v: number) => r0 + ((v - d0) / (d1 - d0)) * (rr - r0);
  return { domain: [d0, d1], range, ticks, map };
}

/** Days since 1970-01-01 (UTC) of a YYYY-MM-DD string; throws on anything else. */
export function parseDay(date: string, where = 'date'): number {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!m) throw new Error(`charts(${where}): "${date}" is not a YYYY-MM-DD date`);
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const ms = Date.UTC(y, mo - 1, d);
  const back = new Date(ms);
  if (back.getUTCFullYear() !== y || back.getUTCMonth() !== mo - 1 || back.getUTCDate() !== d) {
    throw new Error(`charts(${where}): "${date}" is not a real date`);
  }
  return ms / 86400000;
}

export interface TimeScale {
  from: string;
  to: string;
  range: [number, number];
  /** Position of a YYYY-MM-DD date; throws when it falls outside [from, to]. */
  map(date: string): number;
  /** At most six ticks: 1 January of round years, or month starts on short spans. */
  ticks: { date: string; label: string }[];
}

const pad2 = (n: number) => String(n).padStart(2, '0');

/** A time scale from `from` to `to` (YYYY-MM-DD), time running along `range`. */
export function timeScale(from: string, to: string, range: [number, number], maxTicks = 6): TimeScale {
  const t0 = parseDay(from, 'time from');
  const t1 = parseDay(to, 'time to');
  if (t1 <= t0) throw new Error(`charts(time): "${to}" is not after "${from}"`);
  const cap = Math.min(6, Math.max(2, maxTicks));
  const at = (t: number) => range[0] + ((t - t0) / (t1 - t0)) * (range[1] - range[0]);
  const map = (date: string) => {
    const t = parseDay(date);
    if (t < t0 || t > t1) throw new Error(`charts(time): "${date}" falls outside ${from} to ${to}`);
    return at(t);
  };
  const y0 = Number(from.slice(0, 4));
  const y1 = Number(to.slice(0, 4));
  const ticks: { date: string; label: string }[] = [];
  const years = (step: number) => {
    const out: { date: string; label: string }[] = [];
    for (let y = Math.ceil(y0 / step) * step; y <= y1; y += step) {
      const d = `${y}-01-01`;
      if (parseDay(d) >= t0 && parseDay(d) <= t1) out.push({ date: d, label: String(y) });
    }
    return out;
  };
  for (const step of [1, 2, 5, 10, 20, 50]) {
    const out = years(step);
    if (out.length <= cap) {
      ticks.push(...out);
      break;
    }
  }
  if (ticks.length < 2) {
    // A short span: month starts, every 1, 2, 3 or 6 months.
    ticks.length = 0;
    const m0 = y0 * 12 + Number(from.slice(5, 7)) - 1;
    const m1 = y1 * 12 + Number(to.slice(5, 7)) - 1;
    for (const step of [1, 2, 3, 6]) {
      const out: { date: string; label: string }[] = [];
      for (let m = Math.ceil(m0 / step) * step; m <= m1; m += step) {
        const d = `${Math.floor(m / 12)}-${pad2((m % 12) + 1)}-01`;
        if (parseDay(d) >= t0 && parseDay(d) <= t1) out.push({ date: d, label: d.slice(0, 7) });
      }
      if (out.length <= cap) {
        ticks.push(...out);
        break;
      }
    }
  }
  return { from, to, range, map, ticks };
}

// ----------------------------------------------------------------- marks -- //

/** Class list of a mark in a state and tone (see figures.css "chart marks"). */
export function markClass(state: MarkState = 'filled', tone: Tone = 0): string {
  const s = state === 'filled' ? 'fill' : state === 'outline' ? 'line' : state === 'dashed' ? 'dash' : state === 'dotted' ? 'dot' : 'hatch';
  return `mk mk-${s}-${tone}`;
}

/**
 * Hatch patterns for one SVG. `attrs(state, tone)` returns the class (and, for
 * 'hatched', the fill url) of a mark; `defs()` returns the <defs> with only the
 * patterns used. Ids are prefixed by the chart id, so two SVGs on a page never
 * share one.
 */
export function markStyles(id: string) {
  const used = new Set<Tone>();
  return {
    attrs(state: MarkState = 'filled', tone: Tone = 0): string {
      if (state !== 'hatched') return `class="${markClass(state, tone)}"`;
      used.add(tone);
      return `class="${markClass(state, tone)}" fill="url(#${id}-h${tone})"`;
    },
    defs(): string {
      if (!used.size) return '';
      const pats = [...used]
        .sort((a, b) => a - b)
        .map(
          (t) =>
            `<pattern id="${id}-h${t}" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">` +
            `<rect class="hatch-bg" width="5" height="5"/><line class="hatch-${t}" x1="0" y1="0" x2="0" y2="5"/></pattern>`,
        );
      return `<defs>${pats.join('')}</defs>`;
    },
  };
}

/** A shape centred on (cx, cy) with half-size r; `attrs` carries its classes,
 *  `inner` its children (a <title>). */
export function shape(kind: Shape, cx: number, cy: number, r: number, attrs: string, inner = ''): string {
  const close = inner ? `>${inner}</` : '/>';
  const end = (tag: string) => (inner ? `${close}${tag}>` : close);
  switch (kind) {
    case 'circle':
      return `<circle cx="${r1(cx)}" cy="${r1(cy)}" r="${r1(r)}" ${attrs}${end('circle')}`;
    case 'square': {
      const s = r * 0.9;
      return `<rect x="${r1(cx - s)}" y="${r1(cy - s)}" width="${r1(2 * s)}" height="${r1(2 * s)}" ${attrs}${end('rect')}`;
    }
    case 'diamond': {
      const d = r * 1.2;
      return `<path d="M${r1(cx)} ${r1(cy - d)}L${r1(cx + d)} ${r1(cy)}L${r1(cx)} ${r1(cy + d)}L${r1(cx - d)} ${r1(cy)}Z" ${attrs}${end('path')}`;
    }
    case 'triangle': {
      const h = r * 1.15;
      return `<path d="M${r1(cx)} ${r1(cy - h)}L${r1(cx + h)} ${r1(cy + h * 0.8)}L${r1(cx - h)} ${r1(cy + h * 0.8)}Z" ${attrs}${end('path')}`;
    }
  }
}

/** Bounding box of shape(kind, cx, cy, r). */
export function shapeBox(kind: Shape, cx: number, cy: number, r: number): Box {
  if (kind === 'triangle') {
    const h = r * 1.15;
    return { x: cx - h, y: cy - h, w: 2 * h, h: h * 1.8 };
  }
  const half = kind === 'square' ? r * 0.9 : kind === 'diamond' ? r * 1.2 : r;
  return { x: cx - half, y: cy - half, w: 2 * half, h: 2 * half };
}

/** A <rect>; `inner` its children (a <title>). */
export function rect(x: number, y: number, w: number, h: number, attrs: string, inner = ''): string {
  const open = `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" ${attrs}`;
  return inner ? `${open}>${inner}</rect>` : `${open}/>`;
}

/** A native tooltip: the <title> child of a mark. */
export const tip = (value: string): string => {
  checkCopy(value, 'tooltip');
  return `<title>${esc(value)}</title>`;
};

/** A text label that links: the visible text is the target, the full label
 *  its name (a wrapped label is split over several <text> elements). */
export const linkText = (els: string, label: string, href: string): string =>
  `<a href="${esc(href)}" aria-label="${esc(label)}">${els}</a>`;

/** An invisible rect that makes a whole row (glyph, label, value) one pointer
 *  target: put it first inside the row's <a> so the link's box is the row,
 *  24 px high or more (WCAG 2.5.8), not the 15 px of its text. Without x and
 *  w it spans the chart's width (class hit-w, width from the sheet), which
 *  keeps a long linked list inside the 12 KB budget. */
export const hitRect = (y: number, h: number, x?: number, w?: number): string =>
  x === undefined || w === undefined
    ? `<rect class="hit-w" y="${r1(y)}" height="${r1(h)}"/>`
    : `<rect class="hit" x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}"/>`;

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Pointer-target size of WCAG 2.2 criterion 2.5.8 (VISUAL-GUIDE §5). */
export const TARGET_PX = 24;

/**
 * The marks of one chart, named and (when linked) checked as pointer targets.
 * `mark(draw, name, box, o)` draws a mark (`draw(inner)` returns it with
 * `inner` as its children) as:
 *  - a link when `o.href` is set: `<a href><title>name</title>mark</a>`, the
 *    <title> being both the link's accessible name and its tooltip;
 *  - a focusable group with role img, named by its <title>, when `o.focusable`;
 *  - else the mark with its <title> tooltip.
 * Every link is a pointer target that must meet criterion 2.5.8: a target
 * under 24 x 24 px passes only if a 24 px circle centred on it meets no other
 * target and no other such circle (the spacing exception). A link that breaks
 * this throws, naming both marks: widen the chart, raise the pitch or drop a
 * link. Primitives set their default pitch to 24 when marks carry links.
 */
export function targets(where: string) {
  const placed: (Box & { name: string })[] = [];
  const R = TARGET_PX / 2 - 0.05; // rounding slack: coordinates print to 0.1
  const small = (b: Box) => b.w < TARGET_PX - 0.05 || b.h < TARGET_PX - 0.05;
  const centre = (b: Box): [number, number] => [b.x + b.w / 2, b.y + b.h / 2];
  const reach = ([px, py]: [number, number], b: Box) =>
    Math.hypot(Math.max(b.x - px, 0, px - b.x - b.w), Math.max(b.y - py, 0, py - b.y - b.h));
  const claim = (box: Box, name: string) => {
    for (const other of placed) {
      const a = centre(box);
      const b = centre(other);
      const clash =
        (small(box) && reach(a, other) < R) ||
        (small(other) && reach(b, box) < R) ||
        (small(box) && small(other) && Math.hypot(a[0] - b[0], a[1] - b[1]) < 2 * R);
      if (clash) {
        throw new Error(
          `charts(${where}): linked marks "${other.name}" and "${name}" sit closer than the ${TARGET_PX}px pointer-target spacing (WCAG 2.5.8); widen the chart, raise the pitch or drop a link`,
        );
      }
    }
    placed.push({ ...box, name });
  };
  return {
    mark(draw: (inner: string) => string, name: string, box: Box, o: { href?: string; focusable?: boolean } = {}): string {
      if (o.href) {
        claim(box, name);
        return `<a href="${esc(o.href)}">${tip(name)}${draw('')}</a>`;
      }
      if (o.focusable) return `<g class="mk-focus" tabindex="0" role="img">${tip(name)}${draw('')}</g>`;
      return draw(tip(name));
    },
  };
}

// ------------------------------------------------------------ svg shell -- //

const ID = /^[a-z][a-z0-9-]*$/;

export interface OpenOptions {
  id: string;
  title: string;
  desc: string;
  width: number;
  height: number;
  mode?: ChartMode;
  /** 'group' when the chart holds links or focusable marks. */
  role?: 'img' | 'group';
  /** Extra classes on the root (a primitive hook such as "ch-bars"). */
  cls?: string;
  lang?: 'en' | 'es';
}

/** The opening <svg> with role, aria-labelledby, <title> and <desc>. */
export function open(o: OpenOptions): string {
  if (!ID.test(o.id)) throw new Error(`charts(open): id "${o.id}" must match ${ID}`);
  checkCopy(o.title, 'title');
  checkCopy(o.desc, 'desc');
  if (!o.title.trim() || !o.desc.trim()) throw new Error(`charts(open): ${o.id} needs a title and a desc`);
  const cls = [o.mode ?? 'figc', o.cls].filter(Boolean).join(' ');
  const w = Math.ceil(o.width);
  const h = Math.ceil(o.height);
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" class="${cls}"` +
    `${o.lang === 'es' ? ' lang="es"' : ''} role="${o.role ?? 'img'}" aria-labelledby="${o.id}-t ${o.id}-d">` +
    `<title id="${o.id}-t">${esc(o.title)}</title><desc id="${o.id}-d">${esc(o.desc)}</desc>`
  );
}

export const close = (): string => '</svg>';

/** The provenance lines printed inside the image: "Source: ..." (wrapped)
 *  then "As of YYYY-MM-DD". */
export function stampLines(base: Pick<ChartBase, 'source' | 'asOf' | 'lang'>, maxPx: number, size = 12): string[] {
  const lines: string[] = [];
  const w = words(base.lang);
  if (base.source) {
    lines.push(...wrapText(`${w.source}: ${base.source}`, maxPx, size, 'mono', 3, 'source line'));
  }
  if (base.asOf) {
    parseDay(base.asOf, 'asOf');
    lines.push(`${w.asOf} ${base.asOf}`);
  }
  return lines;
}

export interface AssembleOptions {
  base: ChartBase;
  width: number;
  /** y of the last drawn content; the stamp goes under it. */
  bottom: number;
  body: string[];
  defs?: string;
  role?: 'img' | 'group';
  cls: string;
  x?: number;
}

/** Close a chart: the stamp under the content, then the shell around it. */
export function assemble(o: AssembleOptions): { svg: string; height: number } {
  const x = o.x ?? 12;
  const size = minText(o.width);
  const lines = stampLines(o.base, o.width - 2 * x, size);
  let y = o.bottom;
  const stamp: string[] = [];
  if (lines.length) {
    y += 22;
    for (const line of lines) {
      stamp.push(text(x, y, line, { size, cls: 'mono muted', where: 'stamp' }));
      y += 16;
    }
    y -= 16;
  }
  const height = Math.ceil(y + 12);
  const svg =
    open({
      id: o.base.id,
      title: o.base.title,
      desc: o.base.desc,
      width: o.width,
      height,
      mode: o.base.mode,
      role: o.role,
      cls: o.cls,
      lang: o.base.lang,
    }) +
    (o.defs ?? '') +
    o.body.join('') +
    stamp.join('') +
    close();
  return { svg, height };
}

/** Build a table and check that every row has one cell per column. */
export function table(caption: string, columns: string[], rows: Cell[][]): ChartTable {
  rows.forEach((row, i) => {
    if (row.length !== columns.length) {
      throw new Error(`charts(table): row ${i} has ${row.length} cells for ${columns.length} columns`);
    }
  });
  return { caption, columns: [...columns], rows };
}

/** Default wording of a mark state in tables and tooltips. */
export const stateWord = (state: MarkState, lang?: 'en' | 'es'): string => words(lang)[state];

/** "Layer 03" ("Capa 03") for tones 1 to 5, "" for ink. */
export const layerWord = (tone: Tone | undefined, lang?: 'en' | 'es'): string => (tone ? `${words(lang).layer} 0${tone}` : '');

/** Start x of a start-anchored label of width `w` beside a vertical line at
 *  `x`: right of it when it fits, else left of it, else clamped inside. */
export function besideLine(x: number, w: number, W: number, pad = 12): number {
  if (x + 4 + w <= W - pad) return x + 4;
  if (x - 4 - w >= pad) return x - 4 - w;
  return Math.max(pad, W - pad - w);
}

// ----------------------------------------------------------------- as of -- //

/** Height of the as-of key (AsOfMark.key) above a vertical time axis. */
export const AS_OF_KEY_H = 22;

/** The as-of mark of a time chart, from asOfMark. */
export interface AsOfMark {
  /** Position of the date along the time axis (x when time runs along x). */
  at: number;
  /** "As of YYYY-MM-DD" ("A fecha de" with lang 'es'). */
  label: string;
  /** Width of the label at `size`. */
  w: number;
  size: number;
  /** The dashed line across the time axis at `at`, over each [from, to] span
   *  of the other axis (several spans leave gaps, e.g. over labels). */
  line(spans: [number, number][]): string;
  /** The label with its baseline at y: centred on the line, clamped inside. */
  centred(y: number): string;
  /** The label with its baseline at y: right of the line when it fits, else
   *  left of it, else clamped inside. */
  beside(y: number): string;
  /** For a vertical time axis, where a label on the line would sit on the
   *  marks: a key at the top (a dashed swatch and the label). Returns its
   *  elements and the y under it. */
  key(y: number): { els: string[]; bottom: number };
}

/** "As of YYYY-MM-DD" ("A fecha de" with lang 'es'), the label of the as-of
 *  mark, for a chart that draws the line without a time scale (an agenda). */
export function asOfLabel(asOf: string, lang?: 'en' | 'es', label?: string): string {
  parseDay(asOf, 'asOf');
  return `${label ?? words(lang).asOf} ${asOf}`;
}

/**
 * The one "as of" mark every time chart draws: a dashed line of class "today"
 * at the dataset's as-of date (never the build clock) and the label "As of
 * YYYY-MM-DD" ("A fecha de" in Spanish) in mono at the chart's smallest text
 * size. Throws when the date falls outside the scale or the label does not
 * fit the width. `o.label` replaces "As of" only for a reference date that is
 * not the data's as-of (e.g. "EU AI Act in force").
 */
export function asOfMark(
  scale: TimeScale,
  asOf: string,
  lang: 'en' | 'es' | undefined,
  o: { width: number; axis: 'x' | 'y'; label?: string; pad?: number },
): AsOfMark {
  const at = scale.map(asOf);
  const pad = o.pad ?? 12;
  const W = o.width;
  const size = minText(W);
  const label = asOfLabel(asOf, lang, o.label);
  fitText(label, W - 2 * pad, size, 'mono', 'as-of label');
  const w = textWidth(label, size, 'mono');
  const draw = (x: number, y: number) => text(x, y, label, { size, cls: 'mono', where: 'as-of label' });
  return {
    at,
    label,
    w,
    size,
    line(spans) {
      const ends = spans.map(([a, b]) => (o.axis === 'x' ? [r1(at), r1(a), r1(at), r1(b)] : [r1(a), r1(at), r1(b), r1(at)]));
      if (ends.length === 1) {
        const [x1, y1, x2, y2] = ends[0];
        return `<line class="today" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
      }
      return `<path class="today" d="${ends.map(([x1, y1, x2, y2]) => `M${x1} ${y1}L${x2} ${y2}`).join('')}"/>`;
    },
    centred: (y) => draw(Math.max(pad, Math.min(at - w / 2, W - pad - w)), y),
    beside: (y) => draw(besideLine(at, w, W, pad), y),
    key(y) {
      fitText(label, W - 2 * pad - 28, size, 'mono', 'as-of label');
      return {
        els: [`<line class="today" x1="${pad}" y1="${r1(y + 10)}" x2="${pad + 22}" y2="${r1(y + 10)}"/>`, draw(pad + 28, y + 14)],
        bottom: y + AS_OF_KEY_H,
      };
    },
  };
}

const chartIds = new WeakMap<object, Map<string, string>>();

/**
 * For Chart.astro: record every id in the SVGs one chart renders, keyed by the
 * page render (Astro.request), and throw when an id repeats on the page. A
 * repeated id sends aria-labelledby and the hatch fill url(#...) to the first
 * element with it, which may sit in the hidden variant, so hatched marks in
 * the visible one would render empty with no error.
 */
export function claimIds(page: object, svgs: string[], title: string): void {
  const seen = chartIds.get(page) ?? new Map<string, string>();
  chartIds.set(page, seen);
  const here = new Set<string>();
  for (const svg of svgs) {
    for (const m of svg.matchAll(/\sid="([^"]+)"/g)) {
      const id = m[1];
      if (here.has(id)) throw new Error(`Chart "${title}": id "${id}" appears in two of its SVGs; the wide and narrow variants need different ids`);
      if (seen.has(id)) throw new Error(`Chart "${title}": id "${id}" is already used by chart "${seen.get(id)}" on this page`);
      here.add(id);
    }
  }
  for (const id of here) seen.set(id, title);
}

export interface LegendEntry {
  label: string;
  shape?: Shape;
  state?: MarkState;
  tone?: Tone;
  /** 'bar': a square swatch; 'pin': the solid date pin of a time chart. */
  swatch?: 'bar' | 'pin';
}

/** A legend row: swatches (shape or bar) with their labels, wrapping onto new
 *  rows when the width runs out. `heading` (the question the swatches answer,
 *  "Colour: layer of the control that catches it") goes on its own line(s)
 *  above them. Returns the elements and the bottom y (the baseline of the
 *  last row). */
export function legend(
  entries: LegendEntry[],
  x0: number,
  y: number,
  maxX: number,
  marks: ReturnType<typeof markStyles>,
  heading?: string,
): { els: string[]; bottom: number } {
  const els: string[] = [];
  if (heading) {
    for (const line of wrapText(heading, maxX - x0, 12.5, 'body', 3, 'legend heading')) {
      els.push(text(x0, y, line, { size: 12.5, weight: 600, where: 'legend heading' }));
      y += 16;
    }
    y += 2;
  }
  let x = x0;
  for (const e of entries) {
    const w = 18 + textWidth(e.label, 12.5) + 16;
    if (x > x0 && x + w > maxX) {
      x = x0;
      y += 20;
    }
    fitText(e.label, maxX - x0 - 18, 12.5, 'body', 'legend');
    const a = marks.attrs(e.state, e.tone);
    els.push(
      e.swatch === 'pin'
        ? `<rect x="${r1(x + 4.5)}" y="${r1(y - 12)}" width="3" height="16" class="mk-hi"/>`
        : e.swatch === 'bar' || !e.shape
          ? `<rect x="${r1(x)}" y="${r1(y - 10)}" width="12" height="12" rx="2" ${a}/>`
          : shape(e.shape, x + 6, y - 4, 5, a),
    );
    els.push(text(x + 18, y, e.label, { size: 12.5, where: 'legend' }));
    x += w;
  }
  if (!entries.length && heading) y -= 18;
  return { els, bottom: y };
}

// ------------------------------------------------------- auto legends -- //

/** The short name of a stack layer for a legend swatch: "03 Evals" (the
 *  name of data/stack up to its first " & "). */
export function layerName(tone: Tone): string {
  const layer = layers.find((l) => l.n === tone);
  if (!layer) throw new Error(`charts(legend): no stack layer ${tone}`);
  return `0${tone} ${layer.name.split(' & ')[0]}`;
}

/** What a mark encodes, as an auto legend reads it. */
export interface LegendMark {
  tone?: Tone;
  state?: MarkState;
  /** The status word the mark's state stands for ("To be specified"). */
  status?: string;
}

const STATE_ORDER: MarkState[] = ['filled', 'outline', 'dashed', 'dotted', 'hatched'];
const AUTO_TITLES = {
  en: { layer: 'Colour: stack layer', state: 'Drawing: status' },
  es: { layer: 'Color: capa de la pila', state: 'Trazo: estado' },
};

/**
 * The legend blocks a chart's marks call for, derived from the marks drawn:
 * one block of layer swatches when any mark carries a layer tone (only the
 * layers used, in stack order, named as in data/stack), and one block of
 * drawing swatches when any mark is drawn other than filled (only the states
 * used, each named by the status of its first mark, else the state word).
 * Each block opens with its question (base.legendTitles, else a default);
 * `base.autoLegend: false` returns none (the page has its own key).
 */
export function autoLegend(
  items: LegendMark[],
  base: Pick<ChartBase, 'lang' | 'legendTitles' | 'autoLegend'>,
  o: { shape?: Shape } = {},
): { heading: string; entries: LegendEntry[] }[] {
  if (base.autoLegend === false) return [];
  const titles = { ...AUTO_TITLES[base.lang === 'es' ? 'es' : 'en'], ...base.legendTitles };
  const blocks: { heading: string; entries: LegendEntry[] }[] = [];
  const tones = [...new Set(items.map((m) => m.tone ?? 0))].filter((t) => t > 0).sort((a, b) => a - b);
  if (tones.length) {
    blocks.push({ heading: titles.layer, entries: tones.map((t) => ({ label: layerName(t), tone: t, swatch: 'bar' as const })) });
  }
  const states = STATE_ORDER.filter((s) => items.some((m) => (m.state ?? 'filled') === s));
  if (states.some((s) => s !== 'filled')) {
    blocks.push({
      heading: titles.state,
      entries: states.map((s) => ({
        label: items.find((m) => (m.state ?? 'filled') === s && m.status)?.status ?? stateWord(s, base.lang),
        state: s,
        tone: 0 as Tone,
        ...(o.shape ? { shape: o.shape } : { swatch: 'bar' as const }),
      })),
    });
  }
  return blocks;
}

/** Draw legend blocks one under the other from baseline `y` (the first
 *  block's first line); returns the elements and the last baseline. */
export function legendBlocks(
  blocks: { heading?: string; entries: LegendEntry[] }[],
  x0: number,
  y: number,
  maxX: number,
  marks: ReturnType<typeof markStyles>,
): { els: string[]; bottom: number } {
  const els: string[] = [];
  let bottom = y - 22;
  for (const b of blocks) {
    const lg = legend(b.entries, x0, bottom + 22, maxX, marks, b.heading);
    els.push(...lg.els);
    bottom = lg.bottom;
  }
  return { els, bottom };
}
