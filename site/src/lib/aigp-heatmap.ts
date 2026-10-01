// aigp-heatmap.ts: draws the AIGP coverage heatmap as an SVG string at build
// time, from the coverage map in src/data/aigp.ts. One row per competency (13),
// grouped by domain; each row is a bar whose width is the midpoint of the
// competency's question range, split into one cell per performance indicator
// (58). A taught cell is filled; a partly-taught cell is an empty cell with a
// dashed outline, so status never rests on colour alone (VISUAL-GUIDE.md §4.3).
//
// The SVG follows the figure contract: class "figc" on the root, role="img"
// with <title> and <desc>, tokens instead of colours (the two status classes
// are styled in src/styles/aigp.css), text of 12 px or more at 390 px, the
// source line and "As of <date>" inside the image (VISUAL-GUIDE.md §4.4-4.5).
//
// The root is a chart-tip root (data-ctip; the page loads ChartTipScript):
// every cell carries a <title> naming its indicator by id and paraphrase, and
// its status ("I.A.2 Name the harms AI can do to ...: Taught"), which
// public/chart-tip.js shows at once on hover and tap, and the browser
// natively without JavaScript.
//
// Two images, not one: the 58 full names do not fit one SVG in the 12 KB
// budget (about 15 KB). The tip island reads a name only from the mark itself
// (data-tip, aria-label, <title>, title), so there is no compact shared form;
// the competency title in place of the paraphrase still came to about 13 KB
// and says less. So aigpHeatmapSvgs splits the domains into two parts (I and
// II, III and IV), each a standalone figure SVG of about 8 KB with its own
// title, desc, legend and source, on one shared question axis so the bars of
// both parts compare.
//
// No runtime imports (types only), so a build script can load this module with
// scripts/lib/load-ts.mjs and write the same SVG to src/figures if the heatmap
// ever joins the figures gallery.
import type { AigpDomain, AigpIndicator, QuestionRange } from '../data/aigp';

/** The domains one image of the heatmap draws. */
export interface HeatmapPart {
  /** Domain codes, in order ("I", "II"). */
  codes: string[];
  competencies: number;
  indicators: number;
}

export interface HeatmapOptions {
  /** Id suffix for the <title>/<desc> ids; part k (from 1) adds "-k". */
  id: string;
  /** Each part's title adds its domains ("..., domains I and II"). */
  title: string;
  /** The <desc> of one part: one sentence, 50-160 characters. */
  alt: (part: HeatmapPart) => string;
  asOf: string;
  bokVersion: string;
  bokEffective: string;
}

const esc = (value: string | number): string =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const mid = (range: QuestionRange): number => (range.min + range.max) / 2;
const round = (n: number): number => Math.round(n * 10) / 10;

/** The legend's words for a cell's status (src/data/aigp.ts statusLabel; not
 *  imported: this module keeps no runtime imports). */
const STATUS: Readonly<Record<AigpIndicator['status'], string>> = {
  taught: 'Taught',
  'partly-taught': 'Partly taught',
};

const W = 360;
const LEFT = 16;
const RIGHT = 344;
const BAR_X = 96; // bars start here; the label column sits to the left
const ROW_H = 24;
const ROW_GAP = 8;
const CELL_GAP = 2;

/** Domains per image: the first part draws I and II, the second III and IV. */
const PER_PART = 2;

/** The heatmap as standalone inline SVG strings, one per part of
 *  PER_PART domains, all on the question axis of the widest bar. */
export function aigpHeatmapSvgs(domains: readonly AigpDomain[], options: HeatmapOptions): string[] {
  const maxMid = Math.max(
    ...domains.flatMap((domain) => domain.competencies.map((c) => mid(c.questions))),
  );
  // Axis: whole questions, ticks every two, from zero to the widest bar.
  const axisMax = Math.ceil(maxMid / 2) * 2;
  const parts: string[] = [];
  for (let i = 0; i < domains.length; i += PER_PART) {
    parts.push(partSvg(domains.slice(i, i + PER_PART), axisMax, `${options.id}-${parts.length + 1}`, options));
  }
  return parts;
}

function partSvg(domains: readonly AigpDomain[], axisMax: number, id: string, options: HeatmapOptions): string {
  const unit = (RIGHT - BAR_X) / axisMax;
  const part: HeatmapPart = {
    codes: domains.map((domain) => domain.code),
    competencies: domains.reduce((sum, domain) => sum + domain.competencies.length, 0),
    indicators: domains.reduce(
      (sum, domain) => sum + domain.competencies.reduce((n, c) => n + c.indicators.length, 0),
      0,
    ),
  };
  const codes = part.codes.join(' and ');

  const out: string[] = [];
  let y = 20;
  out.push(
    `<text class="disp" x="${LEFT}" y="${y}" font-size="14.5">AIGP domains ${esc(codes)} · ${part.indicators} indicators</text>`,
  );
  y += 19;
  out.push(
    `<text class="ink2" x="${LEFT}" y="${y}" font-size="13">One cell per indicator, one bar per competency</text>`,
  );

  // Axis: title, tick labels, hairline.
  y += 25;
  out.push(
    `<text class="mono muted" x="${BAR_X}" y="${y}" font-size="12">Exam questions (range midpoint)</text>`,
  );
  y += 17;
  const ticks: string[] = [];
  for (let t = 0; t <= axisMax; t += 2) {
    ticks.push(`<text x="${round(BAR_X + t * unit)}" y="${y}">${t}</text>`);
  }
  out.push(`<g class="mono muted" font-size="12" text-anchor="middle">${ticks.join('')}</g>`);
  y += 6;
  out.push(`<line class="rule" x1="${BAR_X}" y1="${y}" x2="${RIGHT}" y2="${y}"/>`);

  const taught: string[] = [];
  const partly: string[] = [];
  const numbers: string[] = [];
  const labels: string[] = [];
  const ranges: string[] = [];
  const grid: string[] = [];

  for (const domain of domains) {
    y += 26;
    out.push(
      `<text class="disp" x="${LEFT}" y="${y}" font-size="13.5">${esc(domain.code)} · ${esc(domain.title)}</text>`,
    );
    out.push(
      `<text class="mono muted" x="${RIGHT}" y="${y}" font-size="12" text-anchor="end">${domain.questions.min}–${domain.questions.max}</text>`,
    );
    y += 10;
    const blockTop = y - 3;
    for (const competency of domain.competencies) {
      const top = y;
      const width = mid(competency.questions) * unit;
      const n = competency.indicators.length;
      const cellW = (width - CELL_GAP * (n - 1)) / n;
      labels.push(`<text x="${LEFT}" y="${top + 17}">${esc(competency.code)}</text>`);
      ranges.push(
        `<text x="${BAR_X - 8}" y="${top + 17}">${competency.questions.min}–${competency.questions.max}</text>`,
      );
      competency.indicators.forEach((indicator, i) => {
        const x = BAR_X + i * (cellW + CELL_GAP);
        const name = `${indicator.id} ${indicator.paraphrase}: ${STATUS[indicator.status]}`;
        const rect = `<rect x="${round(x)}" y="${top}" width="${round(cellW)}" height="${ROW_H}" rx="3"><title>${esc(name)}</title></rect>`;
        (indicator.status === 'taught' ? taught : partly).push(rect);
        numbers.push(`<text x="${round(x + cellW / 2)}" y="${top + 16.5}">${i + 1}</text>`);
      });
      y += ROW_H + ROW_GAP;
    }
    y -= ROW_GAP;
    // A hairline per tick behind this domain's bars (not through its heading).
    for (let t = 2; t <= axisMax; t += 2) {
      const x = round(BAR_X + t * unit);
      grid.push(`<line x1="${x}" y1="${blockTop}" x2="${x}" y2="${y + 3}"/>`);
    }
  }
  const body = [
    `<g class="rule">${grid.join('')}</g>`,
    ...out,
    `<g class="mono" font-size="13">${labels.join('')}</g>`,
    `<g class="mono muted" font-size="12" text-anchor="end">${ranges.join('')}</g>`,
    `<g class="ag-hm-taught">${taught.join('')}</g>`,
    `<g class="ag-hm-partly">${partly.join('')}</g>`,
    `<g class="mono" font-size="12" text-anchor="middle">${numbers.join('')}</g>`,
  ];

  // Legend: the two statuses, drawn with the same marks as the cells.
  y += 30;
  body.push(`<rect class="ag-hm-taught" x="${LEFT}" y="${y - 12}" width="22" height="16" rx="3"/>`);
  body.push(`<text x="${LEFT + 30}" y="${y}" font-size="13">Taught</text>`);
  body.push(`<rect class="ag-hm-partly" x="${LEFT + 110}" y="${y - 12}" width="22" height="16" rx="3"/>`);
  body.push(`<text x="${LEFT + 140}" y="${y}" font-size="13">Partly taught</text>`);

  // Source and date, inside the image, bottom left.
  y += 28;
  body.push(
    `<text class="mono muted" x="${LEFT}" y="${y}" font-size="12">Source: AIGP BoK v${esc(options.bokVersion)}, IAPP, ${esc(options.bokEffective)}</text>`,
  );
  y += 17;
  body.push(
    `<text class="mono muted" x="${LEFT}" y="${y}" font-size="12">Coverage: this site · As of ${esc(options.asOf)}</text>`,
  );
  const H = Math.ceil(y + 12);

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" class="figc ag-hm" ` +
    `role="img" aria-labelledby="fig-${esc(id)}-t fig-${esc(id)}-d" data-ctip>` +
    `<title id="fig-${esc(id)}-t">${esc(`${options.title}, domains ${codes}`)}</title>` +
    `<desc id="fig-${esc(id)}-d">${esc(options.alt(part))}</desc>` +
    body.join('') +
    `</svg>`
  );
}
