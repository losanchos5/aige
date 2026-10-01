// venn.ts: Venn3, the overlap of three sets, with an UpSet layout for narrow
// widths and an Euler layout for sets that nest. Input is the items and the
// sets each belongs to; the seven regions and their counts are computed here.
// The Venn draws three outlined circles (a faint fill, so overlaps read darker),
// each named after its set and total, with the count in each region and a
// tooltip listing its items; the Euler
// draws the sets as nested ellipses when each lies strictly inside the next
// (so no region is empty), and falls back to the Venn when they do not; the
// UpSet draws one bar per non-empty region, largest first, with a three-dot
// membership mark, keyed (filled = in the set, hollow = not). All return the same table: one row per item, Yes/No per set.
import {
  NARROW_WIDTH,
  minText,
  assemble,
  fitText,
  legend,
  linearScale,
  markClass,
  markStyles,
  nonEmpty,
  r1,
  table,
  text,
  tip,
  words,
  wrapText,
  type ChartBase,
  type ChartOutput,
} from './core';

export interface VennSet {
  key: string;
  label: string;
}

export interface Venn3Input extends ChartBase {
  sets: [VennSet, VennSet, VennSet];
  /** Every item with the keys of the sets it belongs to (may be none). */
  items: { label: string; sets: string[] }[];
  /** 'venn' (wide), 'euler' (wide; the Venn unless the sets nest, see
   *  nestedChain) or 'upset' (narrow). */
  layout: 'venn' | 'euler' | 'upset';
  /** Plural noun for counts ("topics") and its singular ("topic"). */
  unit: string;
  unitOne?: string;
  /** Venn and Euler: under the diagram, name the items of every region holding
   *  1 to `callouts` items (default 0: counts only). */
  callouts?: number;
  itemHeader?: string;
}

const L = 12;
/** Region bit masks: 1 = first set, 2 = second, 4 = third. Drawing order. */
const MASKS = [7, 3, 5, 6, 1, 2, 4] as const;

/**
 * The sets from outermost to innermost when each lies strictly inside the next
 * larger one (every item of an inner set is in the outer, and the outer holds
 * at least one item more), so a nested Euler has no empty region; otherwise
 * null. An inner set must hold at least one item.
 */
export function nestedChain(sets: readonly VennSet[], items: Venn3Input['items']): VennSet[] | null {
  const members = (key: string) => new Set(items.filter((i) => i.sets.includes(key)).map((i) => i.label));
  const chain = sets.map((set) => ({ set, in: members(set.key) })).sort((a, b) => b.in.size - a.in.size);
  for (let j = 1; j < chain.length; j++) {
    const [outer, inner] = [chain[j - 1].in, chain[j].in];
    if (inner.size === 0 || inner.size === outer.size || [...inner].some((label) => !outer.has(label))) return null;
  }
  return chain.map((c) => c.set);
}

export function venn3(input: Venn3Input): ChartOutput {
  nonEmpty(input.items, 'items', `venn3 ${input.id}`);
  const [A, B, C] = input.sets;
  const keys = [A.key, B.key, C.key];
  if (new Set(keys).size !== 3) throw new Error(`charts(venn3 ${input.id}): set keys must differ`);
  const es = input.lang === 'es';
  const maskOf = (sets: string[]) =>
    sets.reduce((m, k) => {
      const i = keys.indexOf(k);
      if (i < 0) throw new Error(`charts(venn3 ${input.id}): unknown set "${k}"`);
      return m | (1 << i);
    }, 0);
  const regions = new Map<number, string[]>(MASKS.map((m) => [m, []]));
  const none: string[] = [];
  for (const item of input.items) {
    const m = maskOf(item.sets);
    if (m === 0) none.push(item.label);
    else regions.get(m)!.push(item.label);
  }
  const names = [A.label, B.label, C.label];
  const noun = (n: number) => (n === 1 ? (input.unitOne ?? input.unit) : input.unit);
  const regionName = (m: number): string => {
    if (m === 7) return es ? 'Los tres' : 'All three';
    const inside = names.filter((_, i) => m & (1 << i));
    return es ? `Solo ${inside.join(' y ')}` : `${inside.join(' and ')} only`;
  };
  // A set's circle or ellipse is named after the set and its total
  // ("ISO/IEC 42001: 12 topics").
  const setTip = (key: string, label: string) => {
    const n = input.items.filter((i) => i.sets.includes(key)).length;
    return tip(`${label}: ${n} ${noun(n)}`);
  };
  const regionTip = (m: number) => {
    const list = regions.get(m)!;
    return `${regionName(m)}: ${list.length} ${noun(list.length)}${list.length ? `: ${list.join(', ')}` : ''}`;
  };
  const out: string[] = [];
  let W: number;
  let bottom: number;
  const chain = input.layout === 'euler' ? nestedChain(input.sets, input.items) : null;
  const callouts = () => {
    const shown = input.callouts ?? 0;
    for (const m of MASKS) {
      const list = regions.get(m)!;
      if (!list.length || list.length > shown) continue;
      const lines = wrapText(`${regionName(m)}: ${list.join(', ')}`, W - 2 * L, 12.5, 'body', 3, 'callout');
      bottom += 6;
      for (const line of lines) {
        bottom += 16;
        out.push(text(L, bottom, line, { size: 12.5, cls: 'ink2', where: 'callout' }));
      }
    }
  };
  if (chain) {
    // Nested ellipses, the outermost set first. Each inner ellipse starts BAND
    // below the top of the one around it and ends GAP above its bottom, so the
    // top band of every ring holds its set name, its count and its region name;
    // the innermost holds them at its centre.
    W = input.width ?? 560;
    const BAND = 92;
    const GAP = 8;
    const k = chain.length;
    const rx0 = (W - 2 * L) / 2;
    const rxIn = Math.min(140, rx0 / 2);
    const ry0 = 65 + (k - 1) * ((BAND + GAP) / 2);
    const cx = W / 2;
    const rings = chain.map((_, j) => ({
      rx: rx0 - (j * (rx0 - rxIn)) / (k - 1),
      ry: ry0 - (j * (BAND + GAP)) / 2,
      cy: 8 + ry0 + (j * (BAND - GAP)) / 2,
    }));
    rings.forEach((e, j) =>
      out.push(`<ellipse class="venn" cx="${r1(cx)}" cy="${r1(e.cy)}" rx="${r1(e.rx)}" ry="${r1(e.ry)}">${setTip(chain[j].key, chain[j].label)}</ellipse>`),
    );
    /** Width of ring j at height y, less a 16 px margin each side. */
    const room = (j: number, y: number) => {
      const e = rings[j];
      const t = (y - e.cy) / e.ry;
      return 2 * e.rx * Math.sqrt(Math.max(0, 1 - t * t)) - 32;
    };
    const keyIndex = (set: VennSet) => keys.indexOf(set.key);
    chain.forEach((set, j) => {
      const e = rings[j];
      const inner = j === k - 1;
      const m = chain.slice(0, j + 1).reduce((acc, s) => acc | (1 << keyIndex(s)), 0);
      const n = regions.get(m)!.length;
      const [yName, yCount, yRegion] = inner ? [e.cy - 22, e.cy + 6, e.cy + 28] : [e.cy - e.ry + 24, e.cy - e.ry + 50, e.cy - e.ry + 72];
      fitText(set.label, room(j, yName - 10), 13.5, 'body', 'set label');
      out.push(text(cx, yName, set.label, { size: 13.5, weight: 600, anchor: 'middle', where: 'set label' }));
      out.push(
        `<text x="${r1(cx)}" y="${r1(yCount)}" font-size="18" text-anchor="middle" class="disp num">${n}${tip(regionTip(m))}</text>`,
      );
      fitText(regionName(m), room(j, yRegion), 12.5, 'body', 'region label');
      out.push(text(cx, yRegion, regionName(m), { size: 12.5, cls: 'ink2', anchor: 'middle', where: 'region label' }));
    });
    bottom = rings[0].cy + rings[0].ry + 8;
    callouts();
  } else if (input.layout !== 'upset') {
    W = input.width ?? 480;
    const R = Math.min(96, (W - 2 * L) * 0.2);
    const d = R * 0.62;
    const cx = W / 2;
    const cy = 40 + R + 0.577 * d;
    const centres = [
      [cx - d, cy - 0.577 * d],
      [cx + d, cy - 0.577 * d],
      [cx, cy + 1.155 * d],
    ];
    const unit = (x: number, y: number) => {
      const n = Math.hypot(x, y) || 1;
      return [x / n, y / n];
    };
    centres.forEach(([x, y], i) => out.push(`<circle class="venn" cx="${r1(x)}" cy="${r1(y)}" r="${r1(R)}">${setTip(keys[i], names[i])}</circle>`));
    // Set labels outside their circle, away from the centre of the figure.
    names.forEach((name, i) => {
      const [x, y] = centres[i];
      if (i < 2) {
        const lx = i === 0 ? x - R * 0.35 : x + R * 0.35;
        const room = i === 0 ? lx - L : W - L - lx;
        fitText(name, room, 13.5, 'body', 'set label');
        out.push(text(lx, y - R - 10, name, { size: 13.5, weight: 600, anchor: i === 0 ? 'end' : 'start', where: 'set label' }));
      } else {
        fitText(name, W - 2 * L, 13.5, 'body', 'set label');
        out.push(text(x, y + R + 20, name, { size: 13.5, weight: 600, anchor: 'middle', where: 'set label' }));
      }
    });
    const pos = (m: number): [number, number] => {
      const inside = [0, 1, 2].filter((i) => m & (1 << i));
      if (inside.length === 3) return [cx, cy];
      if (inside.length === 1) {
        const [x, y] = centres[inside[0]];
        const [ux, uy] = unit(x - cx, y - cy);
        return [x + ux * R * 0.42, y + uy * R * 0.42];
      }
      const [p, q] = inside.map((i) => centres[i]);
      const other = centres[[0, 1, 2].find((i) => !inside.includes(i))!];
      const mx = (p[0] + q[0]) / 2;
      const my = (p[1] + q[1]) / 2;
      const [ux, uy] = unit(mx - other[0], my - other[1]);
      return [mx + ux * R * 0.3, my + uy * R * 0.3];
    };
    for (const m of MASKS) {
      const [x, y] = pos(m);
      const n = regions.get(m)!.length;
      out.push(
        `<text x="${r1(x)}" y="${r1(y + 6)}" font-size="18" text-anchor="middle" class="disp num${n ? '' : ' muted'}">${n}${tip(regionTip(m))}</text>`,
      );
    }
    bottom = cy + 1.155 * d + R + 20;
    callouts();
  } else {
    W = input.width ?? NARROW_WIDTH;
    const rows = MASKS.filter((m) => regions.get(m)!.length > 0).sort((a, b) => regions.get(b)!.length - regions.get(a)!.length);
    nonEmpty(rows, 'item in any of the three sets', `venn3 ${input.id}`);
    let y = 4;
    const key = wrapText(`${es ? 'Puntos' : 'Dots'}: ${names.join(' · ')}`, W - 2 * L, minText(W), 'body', 2, 'dot key');
    for (const line of key) {
      y += 16;
      out.push(text(L, y, line, { size: minText(W), cls: 'ink2', where: 'dot key' }));
    }
    // What a dot's fill means: filled = in that set, hollow = not in it.
    const vw = words(input.lang);
    const fillKey = legend(
      [
        { label: vw.inSet, shape: 'circle', state: 'filled' },
        { label: vw.notInSet, shape: 'circle', state: 'outline' },
      ],
      L,
      y + 20,
      W - L,
      markStyles(input.id),
    );
    out.push(...fillKey.els);
    y = fillKey.bottom + 10;
    const x0 = L + 52;
    const x1 = W - L - 36;
    const s = linearScale(rows.map((m) => regions.get(m)!.length), [x0, x1], { integer: true, maxTicks: 5 });
    const rowEls: string[] = [];
    for (const m of rows) {
      const n = regions.get(m)!.length;
      const label = regionName(m);
      fitText(label, W - 2 * L, 13, 'body', 'region label');
      rowEls.push(text(L, y + 14, label, { size: 13, where: 'region label' }));
      const cy = y + 28;
      const members = [0, 1, 2].filter((i) => m & (1 << i));
      if (members.length > 1) {
        rowEls.push(`<line class="stem" x1="${L + 6 + members[0] * 16}" y1="${r1(cy)}" x2="${L + 6 + members[members.length - 1] * 16}" y2="${r1(cy)}"/>`);
      }
      [0, 1, 2].forEach((i) =>
        rowEls.push(`<circle cx="${L + 6 + i * 16}" cy="${r1(cy)}" r="4.5" class="${markClass(m & (1 << i) ? 'filled' : 'outline', 0)}"/>`),
      );
      rowEls.push(`<line class="axis" x1="${r1(x0)}" y1="${r1(cy - 11)}" x2="${r1(x0)}" y2="${r1(cy + 11)}"/>`);
      rowEls.push(`<rect x="${r1(x0)}" y="${r1(cy - 8)}" width="${r1(s.map(n) - x0)}" height="16" class="${markClass('filled', 0)}">${tip(regionTip(m))}</rect>`);
      rowEls.push(text(s.map(n) + 6, cy + 4.5, String(n), { size: 12.5, cls: 'num', where: 'count' }));
      y += 44;
    }
    out.push(...rowEls);
    bottom = y - 4;
  }
  if (none.length) {
    const line = es ? `${none.length} ${noun(none.length)} en ninguno de los tres` : `${none.length} ${noun(none.length)} in none of the three`;
    fitText(line, W - 2 * L, 12.5, 'body', 'none line');
    bottom += 20;
    out.push(text(L, bottom, line, { size: 12.5, cls: 'ink2', where: 'none line' }));
  }
  const { svg, height } = assemble({ base: input, width: W, bottom, body: out, cls: chain ? 'ch-euler' : input.layout === 'upset' ? 'ch-upset' : 'ch-venn' });
  const w = words(input.lang);
  return {
    svg,
    table: table(
      input.tableCaption ?? input.title,
      [input.itemHeader ?? w.item, ...names],
      input.items.map((item) => [item.label, ...keys.map((k) => (item.sets.includes(k) ? w.yes : w.no))]),
    ),
    width: W,
    height,
  };
}
