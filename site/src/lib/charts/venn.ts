// venn.ts: Venn3, the overlap of three sets, with an UpSet layout for narrow
// widths. Input is the items and the sets each belongs to; the seven regions
// and their counts are computed here. The Venn draws three outlined circles
// (a faint fill, so overlaps read darker) with the count in each region and a
// tooltip listing its items; the UpSet draws one bar per non-empty region,
// largest first, with a three-dot membership mark. Both return the same table:
// one row per item, Yes/No per set.
import {
  assemble,
  fitText,
  linearScale,
  markClass,
  r1,
  table,
  text,
  tip,
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
  /** 'venn' (wide) or 'upset' (narrow). */
  layout: 'venn' | 'upset';
  /** Plural noun for counts ("topics") and its singular ("topic"). */
  unit: string;
  unitOne?: string;
  /** Venn only: under the diagram, name the items of every region holding
   *  1 to `callouts` items (default 0: counts only). */
  callouts?: number;
  itemHeader?: string;
}

const L = 12;
/** Region bit masks: 1 = first set, 2 = second, 4 = third. Drawing order. */
const MASKS = [7, 3, 5, 6, 1, 2, 4] as const;

export function venn3(input: Venn3Input): ChartOutput {
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
  const regionTip = (m: number) => {
    const list = regions.get(m)!;
    return `${regionName(m)}: ${list.length} ${noun(list.length)}${list.length ? `: ${list.join(', ')}` : ''}`;
  };
  const out: string[] = [];
  let W: number;
  let bottom: number;
  if (input.layout === 'venn') {
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
    centres.forEach(([x, y]) => out.push(`<circle class="venn" cx="${r1(x)}" cy="${r1(y)}" r="${r1(R)}"/>`));
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
  } else {
    W = input.width ?? 340;
    const rows = MASKS.filter((m) => regions.get(m)!.length > 0).sort((a, b) => regions.get(b)!.length - regions.get(a)!.length);
    let y = 4;
    const key = wrapText(`${es ? 'Puntos' : 'Dots'}: ${names.join(' · ')}`, W - 2 * L, 12, 'body', 2, 'dot key');
    for (const line of key) {
      y += 16;
      out.push(text(L, y, line, { size: 12, cls: 'ink2', where: 'dot key' }));
    }
    y += 10;
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
  const { svg, height } = assemble({ base: input, width: W, bottom, body: out, cls: input.layout === 'venn' ? 'ch-venn' : 'ch-upset' });
  const yes = es ? 'Sí' : 'Yes';
  return {
    svg,
    table: table(
      input.tableCaption ?? input.title,
      [input.itemHeader ?? 'Item', ...names],
      input.items.map((item) => [item.label, ...keys.map((k) => (item.sets.includes(k) ? yes : 'No'))]),
    ),
    width: W,
    height,
  };
}
