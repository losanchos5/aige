// ladder.ts: Ladder, ascending steps with one step that can be highlighted
// (the visual generalisation of src/components/MaturityLadder.astro).
// Horizontal: a staircase rising left to right, each step a panel with its
// index, name and detail; the highlighted step is solid ink with ground-colour
// text. Vertical (narrow): one row per step, top to bottom, each with an
// n-of-N meter that fills as the steps climb, so the ascent survives the
// change of direction.
import {
  assemble,
  fitText,
  linkText,
  markClass,
  r1,
  table,
  text,
  words,
  wrapText,
  type ChartBase,
  type ChartOutput,
} from './core';

export interface LadderStep {
  label: string;
  detail?: string;
  href?: string;
}

export interface LadderInput extends ChartBase {
  /** Lowest step first. */
  steps: LadderStep[];
  /** Index (0-based) of the step to highlight. */
  highlight?: number;
  /** Short mark printed at the highlighted step ("This system"). */
  highlightLabel?: string;
  /** 'horizontal' (default) or 'vertical' (narrow). */
  orientation?: 'horizontal' | 'vertical';
  /** Table heading of the name column (default "Step"). */
  stepHeader?: string;
}

const L = 12;
const pad2 = (n: number) => String(n).padStart(2, '0');

export function ladder(input: LadderInput): ChartOutput {
  const n = input.steps.length;
  if (n < 2) throw new Error(`charts(ladder ${input.id}): a ladder needs at least two steps`);
  if (input.highlight !== undefined && !(input.highlight >= 0 && input.highlight < n)) {
    throw new Error(`charts(ladder ${input.id}): highlight ${input.highlight} is not a step`);
  }
  const vertical = input.orientation === 'vertical';
  const W = input.width ?? (vertical ? 340 : 640);
  const w = words(input.lang);
  const out: string[] = [];
  let bottom: number;
  if (!vertical) {
    const gap = 6;
    const stepW = (W - 2 * L - (n - 1) * gap) / n;
    if (input.highlightLabel) fitText(input.highlightLabel, stepW, 12, 'mono', 'highlight label');
    const blocks = input.steps.map((s) => ({
      name: wrapText(s.label, stepW - 16, 13.5, 'body', 3, 'step label'),
      detail: s.detail ? wrapText(s.detail, stepW - 16, 12.5, 'body', 4, 'step detail') : [],
    }));
    const textH = Math.max(...blocks.map((b) => 22 + b.name.length * 16 + (b.detail.length ? 6 + b.detail.length * 15 : 0)));
    const rise = 22;
    const top = 24 + (input.highlightLabel ? 18 : 0);
    const baseY = top + textH + 16 + (n - 1) * rise;
    input.steps.forEach((step, i) => {
      const x = L + i * (stepW + gap);
      const h = textH + 16 + i * rise;
      const y = baseY - h;
      const hi = input.highlight === i;
      out.push(`<rect x="${r1(x)}" y="${r1(y)}" width="${r1(stepW)}" height="${r1(h)}" rx="6" class="${hi ? 'mk mk-hi' : 'panel'}"/>`);
      const tx = x + 8;
      let ty = y + 18;
      out.push(text(tx, ty, pad2(i + 1), { size: 12, cls: hi ? 'mono on-ink' : 'mono muted', where: 'step index' }));
      const nameEls = blocks[i].name.map((line) => {
        ty += 16;
        return text(tx, ty, line, { size: 13.5, weight: 600, cls: hi ? 'on-ink' : '', where: 'step label' });
      });
      out.push(step.href ? linkText(nameEls.join(''), step.label, step.href) : nameEls.join(''));
      if (blocks[i].detail.length) ty += 6;
      for (const line of blocks[i].detail) {
        ty += 15;
        out.push(text(tx, ty, line, { size: 12.5, cls: hi ? 'on-ink' : 'ink2', where: 'step detail' }));
      }
      if (hi && input.highlightLabel) {
        out.push(text(x + stepW / 2, y - 8, input.highlightLabel, { size: 12, cls: 'mono', anchor: 'middle', where: 'highlight label' }));
      }
    });
    out.push(`<line class="axis" x1="${L}" y1="${r1(baseY)}" x2="${W - L}" y2="${r1(baseY)}"/>`);
    bottom = baseY;
  } else {
    const seg = 8;
    const meterW = n * (seg + 3) - 3;
    const tx = L + meterW + 12;
    if (input.highlightLabel) fitText(input.highlightLabel, W - L - tx - 8, 12, 'mono', 'highlight label');
    let y = 8;
    input.steps.forEach((step, i) => {
      const hi = input.highlight === i;
      const head = `${pad2(i + 1)} ${step.label}`;
      const name = wrapText(head, W - L - tx - 8, 13.5, 'body', 2, 'step label');
      const detail = step.detail ? wrapText(step.detail, W - L - tx - 8, 12.5, 'body', 3, 'step detail') : [];
      const extra = hi && input.highlightLabel ? 1 : 0;
      const h = 14 + (name.length + extra) * 16 + detail.length * 15 + (detail.length ? 4 : 0);
      if (hi) out.push(`<rect x="${L - 6}" y="${r1(y)}" width="${W - 2 * L + 12}" height="${r1(h)}" rx="6" class="panel"/>`);
      for (let k = 0; k < n; k += 1) {
        const cls = k <= i ? (hi ? 'mk mk-hi' : markClass('filled', 0)) : markClass('outline', 0);
        out.push(`<rect x="${L + k * (seg + 3)}" y="${r1(y + 10)}" width="${seg}" height="14" rx="1.5" class="${cls}"/>`);
      }
      let ty = y + 8;
      const nameEls = name.map((line) => {
        ty += 16;
        return text(tx, ty, line, { size: 13.5, weight: hi ? 700 : 600, where: 'step label' });
      });
      out.push(step.href ? linkText(nameEls.join(''), step.label, step.href) : nameEls.join(''));
      if (extra) {
        ty += 16;
        out.push(text(tx, ty, input.highlightLabel!, { size: 12, cls: 'mono', where: 'highlight label' }));
      }
      if (detail.length) ty += 4;
      for (const line of detail) {
        ty += 15;
        out.push(text(tx, ty, line, { size: 12.5, cls: 'ink2', where: 'step detail' }));
      }
      y += h + 6;
    });
    bottom = y - 6;
  }
  const withDetail = input.steps.some((s) => s.detail);
  const hiCol = input.highlight !== undefined;
  const { svg, height } = assemble({
    base: input,
    width: W,
    bottom,
    body: out,
    role: input.steps.some((s) => s.href) ? 'group' : 'img',
    cls: vertical ? 'ch-ladder ch-vertical' : 'ch-ladder',
  });
  return {
    svg,
    table: table(
      input.tableCaption ?? input.title,
      [w.level, input.stepHeader ?? w.step, ...(withDetail ? [w.detail] : []), ...(hiCol ? [w.highlighted] : [])],
      input.steps.map((s, i) => [
        i + 1,
        s.label,
        ...(withDetail ? [s.detail ?? ''] : []),
        ...(hiCol ? [input.highlight === i ? input.highlightLabel ?? w.yes : ''] : []),
      ]),
    ),
    width: W,
    height,
  };
}
