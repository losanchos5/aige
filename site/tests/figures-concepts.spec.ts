// figures-concepts.spec.ts: acceptance checks for the v0.5.0 concept figures
// (block w2-fig-concepts): six hand-made infographics (agent control plane,
// governance operating model, harm levels, explanation techniques, instrument
// lineage, jurisdiction tiles) and one archify lifecycle (the build as a chain
// of gates). The generic presence/a11y checks for every figure live in
// figures.spec.ts; this file adds the per-figure contract from
// site/VISUAL-GUIDE.md, the sync of the data-driven figures with harms.ts and
// jurisdictions.ts, and the placements. Half the file is pure-Node (no
// browser); the rest drives dist/ served by preview. Runs in the `default`
// project.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

import { readSource, getHeadings } from '../src/lib/md-parse';
import { figures } from '../src/data/figures';
import { diagrams } from '../src/data/diagrams';
import { getChapterBySlug } from '../src/data/chapters';
import { harms, levelOrder, levelLabel } from '../src/data/harms';
import { jurisdictions, statusLabels, type JurisdictionStatus } from '../src/data/jurisdictions';
import { patterns } from '../src/data/patterns';

const BLOCK = [
  'agent-control-plane',
  'governance-operating-model',
  'harm-levels',
  'explanation-techniques',
  'instrument-lineage',
  'jurisdiction-tiles',
] as const;

const LAYER_NAMES = [
  'Layer 01 Govern-as-Code',
  'Layer 02 Inventory & Transparency',
  'Layer 03 Evals & Red Teaming as Evidence',
  'Layer 04 Runtime Controls & Observability',
  'Layer 05 Assurance & Continuous Compliance',
];

const svgPath = (id: string) => resolve(process.cwd(), 'src/figures', `${id}.svg`);
const readSvg = (id: string) => readFileSync(svgPath(id), 'utf8');
/** Visible text of an SVG: tags stripped, entities decoded, whitespace collapsed. */
const svgText = (svg: string) =>
  svg
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(title|desc)\b[^>]*>[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ');

// --- 1. Data: the per-figure contract (VISUAL-GUIDE.md §1) -------------------
test('each concept figure is declared, placed and within the figure contract', () => {
  for (const id of BLOCK) {
    const def = figures.find((figure) => figure.id === id);
    expect(def, `${id} is declared in figures.ts`).toBeTruthy();
    expect(existsSync(svgPath(id)), `${id}.svg exists`).toBe(true);
    expect(statSync(svgPath(id)).size, `${id}.svg size`).toBeLessThanOrEqual(12 * 1024);

    const svg = readSvg(id);
    expect(svg, `${id}.svg has no hex colour`).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(svg, `${id}.svg does not dim text`).not.toMatch(/<text[^>]*opacity/);
    expect(svg.includes('\u2014'), `${id}.svg has no em dash`).toBe(false);
    expect(svg).toMatch(/<svg[^>]*viewBox="0 0 360 \d+"/);
    expect(svg).toMatch(/<svg[^>]*role="img"/);

    const labelledBy = /aria-labelledby="([^"]+)"/.exec(svg)?.[1].split(/\s+/) ?? [];
    expect(labelledBy.length, `${id} aria-labelledby`).toBe(2);
    for (const ref of labelledBy) {
      expect(svg.includes(`id="${ref}"`), `${id}: #${ref} exists`).toBe(true);
    }
    const title = /<title[^>]*>([^<]*)<\/title>/.exec(svg)?.[1].replace(/&amp;/g, '&');
    expect(title, `${id} <title> matches figures.ts`).toBe(def!.title);
    const desc = /<desc[^>]*>([^<]*)<\/desc>/.exec(svg)?.[1].replace(/&amp;/g, '&');
    expect(desc, `${id} <desc> matches the alt text`).toBe(def!.alt);

    const sizes = [...svg.matchAll(/font-size="([\d.]+)"/g)].map((m) => Number(m[1]));
    expect(Math.min(...sizes), `${id} smallest font size`).toBeGreaterThanOrEqual(13);

    // Every "Layer 0N ..." the art prints is named exactly and in canonical form.
    for (const m of svgText(svg).matchAll(/Layer 0(\d) /g)) {
      const at = svgText(svg).slice(m.index);
      expect(
        LAYER_NAMES.some((name) => at.startsWith(name)),
        `${id}: layer name "${at.slice(0, 48)}" is exact`,
      ).toBe(true);
    }

    expect(def!.title.split(/\s+/).length, `${id} title ≤ 6 words`).toBeLessThanOrEqual(6);
    expect(def!.alt.length, `${id} alt length`).toBeGreaterThanOrEqual(50);
    expect(def!.alt.length, `${id} alt length`).toBeLessThanOrEqual(160);
    expect(def!.caption, `${id} caption`).toMatch(/Drawn from chapter \d{2}\.$/);
    for (const text of [def!.caption, def!.alt, def!.description]) {
      expect(text.includes('\u2014'), `${id} has no em dash`).toBe(false);
    }

    expect(def!.placements.length, `${id} placements`).toBeGreaterThan(0);
    for (const placement of def!.placements) {
      const chapter = getChapterBySlug(placement.chapter);
      expect(chapter, `${id}: chapter ${placement.chapter}`).toBeTruthy();
      if (!placement.section) continue;
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

// --- 2. Data: dated figures carry their stamp ---------------------------------
test('the dated concept figures print "As of" and say "as of" in the caption', () => {
  for (const id of ['instrument-lineage', 'jurisdiction-tiles']) {
    const def = figures.find((figure) => figure.id === id)!;
    expect(def.asOf, `${id} asOf`).toBe('2026-09-24');
    expect(def.reviewBy! > def.asOf!, `${id} reviewBy after asOf`).toBe(true);
    expect(def.caption, `${id} caption`).toMatch(/as of \d{4}-\d{2}-\d{2}/);
    expect(svgText(readSvg(id)), `${id} prints its date`).toContain(`As of ${def.asOf}`);
  }
  const plane = figures.find((figure) => figure.id === 'agent-control-plane')!;
  expect(plane.caption).toContain('Illustrative, not a claim of conformity.');
});

// --- 3. Data: the tile map follows jurisdictions.ts ---------------------------
const TILE: Record<string, string> = {
  KR: 'KOR', US: 'USA', 'US-CO': 'CO', 'US-TX': 'TX', 'US-CA': 'CA', 'US-NY': 'NY',
  'US-UT': 'UT', 'US-IL': 'IL', 'US-NYC': 'NYC', JP: 'JPN', CN: 'CHN', BR: 'BRA',
  CA: 'CAN', IN: 'IND', GB: 'GBR', IT: 'ITA', ES: 'ESP', SG: 'SGP', AU: 'AUS', EU: 'EU',
};
const STATUS_CLASS: Record<JurisdictionStatus, string> = {
  'binding-horizontal': 'tile-h',
  'binding-targeted': 'tile-t',
  voluntary: 'tile-v',
  bill: 'tile-b',
};

test('the jurisdiction tiles and their table match jurisdictions.ts', () => {
  const svg = readSvg('jurisdiction-tiles');
  const tiles = new Map<string, string>();
  for (const m of svg.matchAll(
    /<rect class="(tile-[htvb])"[^>]*\/>\s*<text[^>]*>([A-Z]{2,3})<\/text>/g,
  )) {
    tiles.set(m[2], m[1]);
  }
  expect(tiles.size, 'one tile per jurisdiction').toBe(jurisdictions.length);

  const def = figures.find((figure) => figure.id === 'jurisdiction-tiles')!;
  expect(def.kind).toBe('data-viz');
  const rows = def.data!.rows;
  expect(rows.length).toBe(jurisdictions.length);
  for (const j of jurisdictions) {
    const code = TILE[j.code];
    expect(code, `${j.code} has a tile code`).toBeTruthy();
    expect(tiles.get(code), `${j.name} tile status`).toBe(STATUS_CLASS[j.status]);
    const row = rows.find((r) => r[1] === code);
    expect(row, `${j.name} has a table row`).toBeTruthy();
    expect(row![0]).toBe(j.name);
    expect(row![2]).toBe(statusLabels[j.status]);
    expect(row![3]).toBe(j.instruments[0].name);
    expect(row![4]).toBe(j.instruments[0].date);
  }
});

// --- 4. Data: the harm levels follow harms.ts ---------------------------------
const HARM_EXAMPLES = [
  'discriminatory-decisions',
  'underrepresentation',
  'prompt-injection',
  'job-displacement',
  'energy-emissions',
];

test('the harm levels use the atlas levels, examples, controls and layers', () => {
  const svg = readSvg('harm-levels');
  const text = svgText(svg);
  for (const level of levelOrder) expect(text).toContain(levelLabel[level]);
  const seen = new Set<string>();
  for (const id of HARM_EXAMPLES) {
    const harm = harms.find((h) => h.id === id);
    expect(harm, `${id} is in harms.ts`).toBeTruthy();
    seen.add(harm!.level);
    expect(text, `${id} harm type`).toContain(harm!.harmType);
    const name = harm!.controllingPattern.name.replace(/&/g, '&amp;');
    const chip = new RegExp(
      `<rect class="l(\\d)-bg"[^>]*/>\\s*<text class="l\\1-tx"[^>]*>${name.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}</text>`,
    ).exec(svg);
    expect(chip, `${id} control chip`).toBeTruthy();
    expect(Number(chip![1]), `${id} chip layer`).toBe(harm!.layerN[0]);
  }
  expect(seen.size, 'one example per level').toBe(levelOrder.length);
});

// --- 5. Data: the archify lifecycle ------------------------------------------
test('the chain of gates keeps the budget, a note per node and a pattern per gate', () => {
  const def = diagrams.find((diagram) => diagram.id === 'build-chain-of-gates');
  expect(def, 'declared in diagrams.ts').toBeTruthy();
  expect(def!.type).toBe('lifecycle');
  expect(def!.caption).toMatch(/Generated from the Body of Knowledge\.$/);
  const ir = JSON.parse(
    readFileSync(resolve(process.cwd(), 'diagrams', 'build-chain-of-gates.lifecycle.json'), 'utf8'),
  ) as {
    states: { id: string; lane: string; sublabel?: string }[];
    transitions: unknown[];
  };
  const notes = JSON.parse(
    readFileSync(resolve(process.cwd(), 'diagrams', 'build-chain-of-gates.notes.json'), 'utf8'),
  ) as Record<string, string>;
  const ids = ir.states.map((state) => state.id).sort();
  expect(Object.keys(notes).sort(), 'notes cover exactly the nodes').toEqual(ids);
  expect(ids.length, '≤ 9 nodes').toBeLessThanOrEqual(9);
  expect(ir.transitions.length, '≤ 12 edges').toBeLessThanOrEqual(12);
  const gates = ir.states.filter((state) => state.lane === 'main' || state.id === 'technical-file');
  expect(gates.length).toBe(6);
  for (const gate of gates) {
    expect(
      patterns.some((pattern) => gate.sublabel && pattern.title.startsWith(gate.sublabel)),
      `${gate.id} names a catalogued pattern ("${gate.sublabel}")`,
    ).toBe(true);
  }
  const chapter = readSource('bok/14-governing-development.md');
  for (const gate of gates) {
    const title = patterns.find((pattern) => pattern.title.startsWith(gate.sublabel!))!.title;
    expect(chapter.includes(`[**${title}**]`), `chapter 14 links ${title}`).toBe(true);
  }
});

// --- 6. Placement points in the built chapters and pages ---------------------
const previousHeading = (selector: string) => {
  const fig = document.querySelector(selector);
  if (!fig) return 'missing';
  const heads = Array.from(document.querySelectorAll('article h2, article h3'));
  let previous: Element | null = null;
  for (const h of heads) {
    if (fig.compareDocumentPosition(h) & Node.DOCUMENT_POSITION_PRECEDING) previous = h;
  }
  return previous ? (previous.textContent || '').replace(/\s+/g, ' ').trim() : null;
};

const PLACED: { selector: string; route: string; after: string | null }[] = [
  {
    selector: 'figure.diagram[data-diagram="build-chain-of-gates"]',
    route: '/bok/governing-development',
    after: null,
  },
  {
    selector: 'figure[data-figure="agent-control-plane"]',
    route: '/bok/governing-agents',
    after: null,
  },
  {
    selector: 'figure[data-figure="governance-operating-model"]',
    route: '/bok/governance-program',
    after: 'The three lines, applied to AI',
  },
  {
    selector: 'figure[data-figure="harm-levels"]',
    route: '/bok/risk-management',
    after: 'Defined scales',
  },
  {
    selector: 'figure[data-figure="explanation-techniques"]',
    route: '/bok/fairness-and-explainability',
    after: 'Explanation techniques',
  },
  {
    selector: 'figure[data-figure="instrument-lineage"]',
    route: '/bok/principles-and-standards',
    after: 'A short lineage of AI soft law',
  },
  {
    selector: 'figure[data-figure="jurisdiction-tiles"]',
    route: '/bok/ai-laws-worldwide',
    after: 'The landscape at a glance',
  },
];

test.describe('placement', () => {
  for (const { selector, route, after } of PLACED) {
    test(`${selector} on ${route} sits under ${after ?? 'the chapter lead'}`, async ({ page }) => {
      await page.goto(route);
      const prev = await page.evaluate(previousHeading, selector);
      expect(prev).toBe(after);
    });
  }

  test('the control plane figure opens #control-plane on /agents', async ({ page }) => {
    await page.goto('/agents');
    const figure = page.locator('#control-plane figure[data-figure="agent-control-plane"]');
    await expect(figure).toHaveCount(1);
    await expect(figure.locator('svg[role="img"]')).toHaveCount(1);
    await expect(figure.locator('details.figure-alt')).toHaveCount(1);
  });

  test('the instrument lineage sits on /resources/frameworks', async ({ page }) => {
    await page.goto('/resources/frameworks');
    await expect(page.locator('figure[data-figure="instrument-lineage"] svg[role="img"]')).toHaveCount(1);
  });
});

// --- 7. Mobile: the new figures never exceed the article width ---------------
test('on a narrow phone the concept figures are not wider than the article', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [route, id] of [
    ['/bok/governing-agents', 'agent-control-plane'],
    ['/bok/ai-laws-worldwide', 'jurisdiction-tiles'],
  ] as const) {
    await page.goto(route);
    const artBox = await page.locator('article.prose').boundingBox();
    const box = await page.locator(`figure[data-figure="${id}"]`).boundingBox();
    expect(box!.width, `${id} width`).toBeLessThanOrEqual(artBox!.width + 1);
  }
});
