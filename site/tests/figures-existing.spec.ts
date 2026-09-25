// figures-existing.spec.ts: acceptance checks for the v0.5.0 block of
// infographics drawn from content the chapters already state (five objects,
// profession in numbers, human oversight, procured AI, enforcement map,
// committee and gates, risk loop, risk matrix, mitigation ladder, provenance and
// lineage, overlapping incident clocks) and for the polished archify diagrams
// (framework crosswalk, vendor due-diligence gate, runtime guardrail, kill
// switch, regulatory wave). The generic presence/a11y checks for every figure
// live in figures.spec.ts; this file adds the per-figure contract from
// site/VISUAL-GUIDE.md §1. Half the file is pure-Node (no browser); the rest
// drives dist/ served by preview. Runs in the `default` project.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

import { readSource, getHeadings } from '../src/lib/md-parse';
import { figures } from '../src/data/figures';
import { getChapterBySlug } from '../src/data/chapters';

const BLOCK = [
  'five-objects',
  'profession-in-numbers',
  'human-oversight',
  'procured-ai-control',
  'enforcement-map',
  'committee-gates',
  'risk-loop-stack',
  'risk-matrix',
  'mitigation-ladder',
  'provenance-lineage',
  'incident-clocks',
] as const;

const svgPath = (id: string) => resolve(process.cwd(), 'src/figures', `${id}.svg`);

// --- 1. Data: the per-figure contract (VISUAL-GUIDE.md §1) -------------------
test('each block figure is declared, placed and within the figure contract', () => {
  for (const id of BLOCK) {
    const def = figures.find((figure) => figure.id === id);
    expect(def, `${id} is declared in figures.ts`).toBeTruthy();
    const path = svgPath(id);
    expect(existsSync(path), `${id}.svg exists`).toBe(true);

    // Budget: ≤ 12 KB per infographic.
    expect(statSync(path).size, `${id}.svg size`).toBeLessThanOrEqual(12 * 1024);

    const svg = readFileSync(path, 'utf8');
    // Tokens, not colours: no hard-coded hex anywhere in the art.
    expect(svg, `${id}.svg has no hex colour`).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    // Never dim text with opacity.
    expect(svg, `${id}.svg does not dim text`).not.toMatch(/<text[^>]*opacity/);
    // No em dash (U+2014) in the art.
    expect(svg.includes('—'), `${id}.svg has no em dash`).toBe(false);

    // Accessible name: role img, and aria-labelledby resolves to <title>/<desc>.
    expect(svg).toMatch(/<svg[^>]*role="img"/);
    const labelledBy = /aria-labelledby="([^"]+)"/.exec(svg)?.[1].split(/\s+/) ?? [];
    expect(labelledBy.length, `${id} aria-labelledby`).toBe(2);
    for (const ref of labelledBy) {
      expect(svg.includes(`id="${ref}"`), `${id}: #${ref} exists`).toBe(true);
    }
    const title = /<title[^>]*>([^<]*)<\/title>/.exec(svg)?.[1].replace(/&amp;/g, '&');
    expect(title, `${id} <title> matches figures.ts`).toBe(def!.title);

    // Minimum text size: 13 user units in a 360-wide viewBox renders ≥ 12 px
    // at 390 px (VISUAL-GUIDE.md §1.10).
    const sizes = [...svg.matchAll(/font-size="([\d.]+)"/g)].map((m) => Number(m[1]));
    expect(Math.min(...sizes), `${id} smallest font size`).toBeGreaterThanOrEqual(13);

    // Caption formula and title budget.
    expect(def!.title.split(/\s+/).length, `${id} title ≤ 6 words`).toBeLessThanOrEqual(6);
    expect(def!.caption, `${id} caption`).toMatch(/Drawn from chapter \d{2}\.$/);
    expect(def!.caption.includes('—')).toBe(false);
    expect(def!.description.includes('—')).toBe(false);

    // Placements: the section and, when given, the sub-heading under it exist.
    expect(def!.placements.length, `${id} placements`).toBeGreaterThan(0);
    for (const placement of def!.placements) {
      const chapter = getChapterBySlug(placement.chapter);
      expect(chapter, `${id}: chapter ${placement.chapter}`).toBeTruthy();
      const headings = getHeadings(readSource(`bok/${chapter!.id}.md`));
      const sectionIndex = headings.findIndex(
        (h) => h.depth === 2 && h.text === placement.section,
      );
      expect(sectionIndex, `${id}: "${placement.section}" is an H2`).toBeGreaterThanOrEqual(0);
      if (placement.sub) {
        const rest = headings.slice(sectionIndex + 1);
        const end = rest.findIndex((h) => h.depth <= 2);
        const within = end < 0 ? rest : rest.slice(0, end);
        expect(
          within.some((h) => h.depth === 3 && h.text === placement.sub),
          `${id}: "${placement.sub}" is an H3 under "${placement.section}"`,
        ).toBe(true);
      }
    }
  }
});

// --- 2. Data: timelines carry an "as of" date --------------------------------
test('the dated figures say "as of" in their caption', () => {
  for (const id of ['enforcement-map', 'incident-clocks']) {
    const def = figures.find((figure) => figure.id === id)!;
    expect(def.caption, `${id} caption`).toMatch(/as of \d{4}-\d{2}-\d{2}/);
  }
});

// --- 3. Data: the archify diagrams this block polished -----------------------
const DIAGRAMS = [
  'regulatory-wave.lifecycle',
  'framework-crosswalk.architecture',
  'vendor-due-diligence-gate.workflow',
  'runtime-guardrail.architecture',
  'kill-switch-circuit-breaker.architecture',
];

type IrNode = { id: string; tag?: string; lane?: string };
const irNodes = (ir: Record<string, unknown>): IrNode[] =>
  ((ir.components ?? ir.nodes ?? ir.states ?? []) as IrNode[]);

test('polished diagrams keep a notes sentence per node and the node budget', () => {
  for (const name of DIAGRAMS) {
    const id = name.split('.')[0];
    const ir = JSON.parse(readFileSync(resolve(process.cwd(), 'diagrams', `${name}.json`), 'utf8'));
    const notes = JSON.parse(
      readFileSync(resolve(process.cwd(), 'diagrams', `${id}.notes.json`), 'utf8'),
    ) as Record<string, string>;
    const ids = irNodes(ir).map((node) => node.id).sort();
    expect(Object.keys(notes).sort(), `${id}: notes cover exactly the nodes`).toEqual(ids);
    expect(ids.length, `${id}: ≤ 9 nodes`).toBeLessThanOrEqual(9);
    const edges = (ir.connections ?? ir.edges ?? ir.transitions ?? []) as unknown[];
    expect(edges.length, `${id}: ≤ 12 edges`).toBeLessThanOrEqual(12);
  }
});

test('the regulatory wave shows only dates chapter 02 states, including 2026-12-02 and 2030-08-02', () => {
  const ir = JSON.parse(
    readFileSync(resolve(process.cwd(), 'diagrams', 'regulatory-wave.lifecycle.json'), 'utf8'),
  );
  // Prose wraps at ~100 characters, so compare on normalised whitespace.
  const chapter = readSource('bok/02-why-now.md').replace(/\s+/g, ' ');
  const tags = irNodes(ir)
    .map((state) => state.tag ?? '')
    .filter((tag) => /\d{4}$/.test(tag));
  expect(tags).toEqual(
    expect.arrayContaining(['2 December 2026', '2 August 2030', '2 December 2027', '2 August 2028']),
  );
  for (const tag of tags) {
    expect(chapter.includes(tag), `"${tag}" is stated in chapter 02`).toBe(true);
  }
});

test('the framework crosswalk is a hub with at most six spokes and evidence on the hub', () => {
  const ir = JSON.parse(
    readFileSync(resolve(process.cwd(), 'diagrams', 'framework-crosswalk.architecture.json'), 'utf8'),
  );
  const connections = ir.connections as { from: string; to: string }[];
  const spokes = connections.filter((c) => c.from === 'hub' && c.to !== 'evidence');
  expect(spokes.length).toBeGreaterThan(0);
  expect(spokes.length).toBeLessThanOrEqual(6);
  expect(connections.some((c) => c.from === 'hub' && c.to === 'evidence')).toBe(true);
  expect(connections.every((c) => c.to !== 'evidence' || c.from === 'hub')).toBe(true);
});

// --- 4. Placement points in the built chapters -------------------------------
const previousHeading = (id: string) => {
  const fig = document.querySelector(`figure[data-figure="${id}"]`);
  if (!fig) return null;
  const heads = Array.from(document.querySelectorAll('article h2, article h3'));
  let previous: Element | null = null;
  for (const h of heads) {
    if (fig.compareDocumentPosition(h) & Node.DOCUMENT_POSITION_PRECEDING) previous = h;
  }
  return previous ? (previous.textContent || '').replace(/\s+/g, ' ').trim() : null;
};

const PLACED: { id: string; route: string; after: string }[] = [
  { id: 'five-objects', route: '/bok/definition', after: 'The object of governance' },
  { id: 'profession-in-numbers', route: '/bok/why-now', after: 'The evidence' },
  { id: 'human-oversight', route: '/bok/the-stack', after: 'Designing human oversight (Article 14)' },
  { id: 'procured-ai-control', route: '/bok/the-stack', after: 'Third-party and procured AI' },
  { id: 'enforcement-map', route: '/bok/regulatory-map', after: 'EU AI Act, post-Omnibus' },
  {
    id: 'committee-gates',
    route: '/bok/governance-program',
    after: 'The committee decides, the gates enforce',
  },
  { id: 'risk-loop-stack', route: '/bok/risk-management', after: 'The loop on the five layers' },
  {
    id: 'risk-matrix',
    route: '/bok/risk-management',
    after: 'The matrix and what each band triggers',
  },
  {
    id: 'mitigation-ladder',
    route: '/bok/risk-management',
    after: 'Treating risk: the mitigation hierarchy',
  },
  { id: 'provenance-lineage', route: '/bok/governing-development', after: 'Provenance versus lineage' },
  { id: 'incident-clocks', route: '/bok/incidents', after: 'The overlapping clocks' },
];

test.describe('placement', () => {
  for (const { id, route, after } of PLACED) {
    test(`${id} sits under "${after}"`, async ({ page }) => {
      await page.goto(route);
      const prev = await page.evaluate(previousHeading, id);
      expect(prev).toBe(after);
    });
  }
});

// --- 5. Mobile: the new figures never exceed the article width ---------------
test('on a narrow phone the risk figures are not wider than the article', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/bok/risk-management');
  const artBox = await page.locator('article.prose').boundingBox();
  for (const id of ['risk-loop-stack', 'risk-matrix', 'mitigation-ladder']) {
    const box = await page.locator(`figure[data-figure="${id}"]`).boundingBox();
    expect(box!.width, `${id} width`).toBeLessThanOrEqual(artBox!.width + 1);
  }
});

// --- 6. values-principles in two columns from 834 px -------------------------
// Active once src/figures/values-principles-wide.svg exists (figures-build.mjs
// emits it; see the block handoff). Below 834 px the stacked SVG shows; from
// 834 px the two-column one does, and only one is ever displayed.
const WIDE = existsSync(svgPath('values-principles-wide'));

test.describe('values-principles columns', () => {
  test.skip(!WIDE, 'values-principles-wide.svg not generated in this branch');
  for (const [width, visibleIndex] of [
    [390, 0],
    [834, 1],
    [1440, 1],
  ] as const) {
    test(`at ${width} px exactly one variant shows`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/bok/values-and-principles');
      const svgs = page.locator('figure[data-figure="values-principles"] .figure-canvas > svg');
      await expect(svgs).toHaveCount(2);
      await expect(svgs.nth(visibleIndex)).toBeVisible();
      await expect(svgs.nth(1 - visibleIndex)).toBeHidden();
    });
  }
});
