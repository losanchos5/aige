// page-visuals-w1e.spec.ts: the wave-1 page visuals of /mcp, /stack,
// /ai-governance and /for/certifications (OpenSpec change page-visuals).
// What they must keep true: an embedded chapter figure is listed in its
// figures.ts pages[] (so /figures/<id> links the page) and every page listed
// there really shows it; each visual sits under the heading of the section it
// illustrates; and a visual never says something its page or dataset does not
// (the chain's counts are the tool table's and the datasets', the maturity
// ladder names the levels of the table under it, and every standard the
// certificate lanes name is one the page cites). Runs in `default`.
import { test, expect } from '@playwright/test';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

import { figures } from '../src/data/figures';
import { obligations } from '../src/data/frameworks';
import { patterns } from '../src/data/patterns';
import { getGlossary } from '../src/lib/glossary';

// --- 1. figures.ts pages[] against the built pages ---------------------------
// Chapters and pattern pages get their figures from placements (rehype), and
// the gallery and permalinks show every figure, so pages[] is about the other
// site pages only.
const htmlFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return name === '_astro' ? [] : htmlFiles(path);
    return name.endsWith('.html') ? [path] : [];
  });
const routeOf = (file: string) =>
  `/${relative('dist', file).replace(/\\/g, '/').replace(/(^|\/)index\.html$/, '').replace(/\.html$/, '')}`.replace(
    /\/$/,
    '',
  ) || '/';
const placedRoute = (route: string) =>
  route.startsWith('/bok/') || route.startsWith('/patterns/') || route === '/figures' || route.startsWith('/figures/');

test.describe('embedded figures and their pages[]', () => {
  const known = new Set(figures.map((f) => f.id));
  const shown = new Map<string, Set<string>>();
  for (const file of htmlFiles('dist')) {
    const route = routeOf(file);
    if (placedRoute(route)) continue;
    const html = readFileSync(file, 'utf8');
    for (const [, id] of html.matchAll(/<figure[^>]*\sdata-figure="([^"]+)"/g)) {
      if (!known.has(id)) continue;
      if (!shown.has(id)) shown.set(id, new Set());
      shown.get(id)!.add(route);
    }
  }

  test('every page outside the chapters that shows a figure is in its pages[]', () => {
    const unlisted: string[] = [];
    for (const [id, routes] of shown) {
      const pages = figures.find((f) => f.id === id)!.pages ?? [];
      for (const route of routes) if (!pages.includes(route)) unlisted.push(`${id} on ${route}`);
    }
    expect(unlisted).toEqual([]);
  });

  test('every page a figure lists in pages[] shows it', () => {
    const missing: string[] = [];
    for (const figure of figures) {
      for (const route of figure.pages ?? []) {
        if (placedRoute(route)) continue;
        if (!shown.get(figure.id)?.has(route)) missing.push(`${figure.id} not on ${route}`);
      }
    }
    expect(missing).toEqual([]);
  });
});

// --- 2. Each visual under the heading of its section -------------------------
/** Text of the last h2 before the element, or null when none precedes it. */
const headingBefore = (selector: string) => {
  const el = document.querySelector(selector);
  if (!el) return 'missing';
  let previous: Element | null = null;
  for (const h of Array.from(document.querySelectorAll('main h2'))) {
    if (el.compareDocumentPosition(h) & Node.DOCUMENT_POSITION_PRECEDING) previous = h;
  }
  return previous ? (previous.textContent ?? '').replace(/\s+/g, ' ').trim() : null;
};

const PLACED: { route: string; selector: string; under: string | null }[] = [
  { route: '/mcp', selector: '#mcp-flow', under: null },
  { route: '/stack', selector: 'figure[data-figure="three-questions"]', under: 'A build order, from policy to proof.' },
  {
    route: '/stack',
    selector: 'figure[data-figure="minimum-viable-stack"]',
    under: 'The minimum viable stack, for a team of one.',
  },
  {
    route: '/ai-governance',
    selector: 'figure[data-figure="jurisdiction-tiles"]',
    under: 'Which AI regulations apply by jurisdiction?',
  },
  {
    route: '/ai-governance',
    selector: 'figure[data-figure="governance-operating-model"]',
    under: 'Who is responsible for AI governance?',
  },
  { route: '/ai-governance', selector: '#maturity-ladder', under: 'What are the levels of AI governance maturity?' },
  { route: '/for/certifications', selector: '#certificate-lanes', under: 'Two kinds of certificate' },
];

test.describe('placement', () => {
  for (const { route, selector, under } of PLACED) {
    test(`${selector} on ${route} sits under ${under ?? 'the hero'}`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator(selector)).toHaveCount(1);
      expect(await page.evaluate(headingBefore, selector)).toBe(under);
    });
  }
});

// --- 3. Nothing the page or its data does not say -----------------------------
test('the /mcp chain counts the tool table and the datasets the server reads', async ({ page }) => {
  await page.goto('/mcp');
  const steps = page.locator('#mcp-flow .flow-step');
  await expect(steps).toHaveCount(5);
  const tools = await page.locator('table tbody tr').count();
  expect(tools).toBeGreaterThan(0);
  await expect(steps.nth(2)).toContainText(`${tools} read-only tools`);
  await expect(steps.nth(3)).toContainText(
    `${obligations.length} obligations, ${patterns.length} patterns, ${getGlossary().length} glossary terms`,
  );
});

test('the /ai-governance maturity ladder names the levels of the table under it', async ({ page }) => {
  await page.goto('/ai-governance');
  const ladder = (await page.locator('#maturity-ladder .maturity-step .name').allTextContents()).map((t) => t.trim());
  // The first column of the first table after the ladder, before the next H2.
  const table = (await page.evaluate(() => {
    for (let n = document.querySelector('#maturity-ladder')?.nextElementSibling; n && n.tagName !== 'H2'; n = n.nextElementSibling) {
      const rows = n.querySelectorAll('tbody tr');
      if (rows.length) return Array.from(rows, (row) => (row.querySelector('td, th')?.textContent ?? '').trim());
    }
    return [];
  })) as string[];
  expect(table.length).toBeGreaterThan(1);
  expect(ladder).toEqual(table.map((cell) => cell.replace(/^\d+\.\s*/, '')));
});

test('every standard the certificate lanes name is one the page cites', async ({ page }) => {
  await page.goto('/for/certifications');
  const lanes = page.locator('#certificate-lanes');
  const named = [...new Set(((await lanes.textContent()) ?? '').match(/ISO\/IEC \d+(?:-\d+)?/g) ?? [])];
  expect(named.length).toBeGreaterThan(1);
  const sources = ((await page.locator('ol.sources').textContent()) ?? '').replace(/\s+/g, ' ');
  for (const standard of named) expect(sources, standard).toContain(standard);
  // Each source number on a lane points at a source that names its standard.
  for (const chip of await lanes.locator('.cert-standard').all()) {
    const href = await chip.locator('a.cite').getAttribute('href');
    const standard = ((await chip.textContent()) ?? '').match(/ISO\/IEC \d+(?:-\d+)?/)![0];
    await expect(page.locator(href!), `${standard} cites ${href}`).toContainText(standard);
  }
});
