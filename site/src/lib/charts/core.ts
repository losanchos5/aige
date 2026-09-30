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
// no locale-dependent sort). No runtime imports, so Astro and
// scripts/lib/load-ts.mjs can both load it.

/** 0 = ink (not a layer); 1 to 5 = the stack layers (--l1..--l5). */
export type Tone = 0 | 1 | 2 | 3 | 4 | 5;
/** How a mark is drawn: solid, outlined, dashed outline or hatched. */
export type MarkState = 'filled' | 'outline' | 'dashed' | 'hatched';
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
  /** viewBox width; each primitive documents its default. Pass the narrow
   *  width (340: the canvas a 390 px phone gives, text at 1:1) for the
   *  narrow variant of a pair. */
  width?: number;
  /** Caption of the table alternative (default: the title). */
  tableCaption?: string;
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
  if (String(text).includes('—')) {
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

/** The face a class list sets, for measuring. */
export const faceOf = (cls = ''): Face => (/\b(mono|num)\b/.test(cls) ? 'mono' : /\bdisp\b/.test(cls) ? 'disp' : 'body');

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

export interface BandScale {
  keys: string[];
  /** Distance between the starts of two bands. */
  step: number;
  /** Thickness of one band. */
  band: number;
  /** Start of the band for `key`; throws for an unknown key. */
  pos(key: string): number;
  center(key: string): number;
}

/** A band scale: one band per key across `range`, `padding` of the step empty. */
export function bandScale(keys: readonly string[], range: [number, number], padding = 0.2): BandScale {
  if (new Set(keys).size !== keys.length) throw new Error('charts(band): duplicate keys');
  const n = Math.max(1, keys.length);
  const step = (range[1] - range[0]) / n;
  const band = step * (1 - padding);
  const index = new Map(keys.map((k, i) => [k, i]));
  const pos = (key: string) => {
    const i = index.get(key);
    if (i === undefined) throw new Error(`charts(band): unknown key "${key}"`);
    return range[0] + i * step + (step - band) / 2;
  };
  return { keys: [...keys], step, band, pos, center: (key) => pos(key) + band / 2 };
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
  const s = state === 'filled' ? 'fill' : state === 'outline' ? 'line' : state === 'dashed' ? 'dash' : 'hatch';
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

/** A native tooltip: the <title> child of a mark. */
export const tip = (value: string): string => {
  checkCopy(value, 'tooltip');
  return `<title>${esc(value)}</title>`;
};

/**
 * Wrap a mark so it can carry information to keyboard users: a link when
 * `href` is set, else (when `focusable`) a focusable group with role img and
 * the tooltip as its name. Without either, the mark stays as drawn.
 */
export function wrapMark(markSvg: string, label: string, o: { href?: string; focusable?: boolean }): string {
  if (o.href) return `<a href="${esc(o.href)}" aria-label="${esc(label)}">${markSvg}</a>`;
  if (o.focusable) return `<g class="mk-focus" tabindex="0" role="img" aria-label="${esc(label)}">${markSvg}</g>`;
  return markSvg;
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
export function stampLines(base: Pick<ChartBase, 'source' | 'asOf' | 'lang'>, maxPx: number): string[] {
  const lines: string[] = [];
  if (base.source) {
    const src = base.lang === 'es' ? `Fuente: ${base.source}` : `Source: ${base.source}`;
    lines.push(...wrapText(src, maxPx, 12, 'mono', 3, 'source line'));
  }
  if (base.asOf) {
    parseDay(base.asOf, 'asOf');
    lines.push(base.lang === 'es' ? `A fecha de ${base.asOf}` : `As of ${base.asOf}`);
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
  const lines = stampLines(o.base, o.width - 2 * x);
  let y = o.bottom;
  const stamp: string[] = [];
  if (lines.length) {
    y += 22;
    for (const line of lines) {
      stamp.push(text(x, y, line, { size: 12, cls: 'mono muted', where: 'stamp' }));
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
export const stateWords: Record<MarkState, string> = {
  filled: 'Filled',
  outline: 'Outline',
  dashed: 'Dashed',
  hatched: 'Hatched',
};

/** "Layer 03" for tones 1 to 5, "" for ink. */
export const layerWord = (tone: Tone | undefined): string => (tone ? `Layer 0${tone}` : '');

/** A legend row: swatches (shape or bar) with their labels, wrapping onto new
 *  rows when the width runs out. Returns the elements and the bottom y. */
export function legend(
  entries: { label: string; shape?: Shape; state?: MarkState; tone?: Tone; swatch?: 'bar' }[],
  x0: number,
  y: number,
  maxX: number,
  marks: ReturnType<typeof markStyles>,
): { els: string[]; bottom: number } {
  const els: string[] = [];
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
      e.swatch === 'bar' || !e.shape
        ? `<rect x="${r1(x)}" y="${r1(y - 10)}" width="12" height="12" rx="2" ${a}/>`
        : shape(e.shape, x + 6, y - 4, 5, a),
    );
    els.push(text(x + 18, y, e.label, { size: 12.5, where: 'legend' }));
    x += w;
  }
  return { els, bottom: y };
}
