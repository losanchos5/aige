// figures.spec.ts: acceptance checks for the hand-made conceptual infographics
// (src/figures/*.svg, declared in src/data/figures.ts and inlined into the
// chapters by rehype-diagrams) and the pattern catalogue index (src/data/
// patterns.ts). Half the file is pure-Node data assertions (no browser); the
// rest drives dist/ served by preview, like diagrams.spec.ts. Runs in the
// `default` project.
import { test, expect } from '@playwright/test';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { readSource, slugify, getHeadings } from '../src/lib/md-parse';
import { figures } from '../src/data/figures';
import { patterns } from '../src/data/patterns';
import { getChapterBySlug } from '../src/data/chapters';

// --- 1. Data: patterns.ts is in sync with chapter 05 -------------------------
test('patterns.ts matches the Pattern headings of chapter 05', () => {
  const chapter = readSource('bok/05-patterns.md');
  const headingCount = (chapter.match(/^## Pattern:/gm) ?? []).length;
  // The map must be extended whenever a pattern is added to the chapter.
  expect(patterns.length, 'patterns.ts entry count vs "## Pattern:" headings').toBe(
    headingCount,
  );

  const slugs = new Set(getHeadings(chapter).map((heading) => slugify(heading.text)));
  const ids = new Set<string>();
  for (const pattern of patterns) {
    expect(slugs.has(pattern.id), `pattern id "${pattern.id}" resolves to a heading`).toBe(
      true,
    );
    expect(ids.has(pattern.id), `pattern id "${pattern.id}" is unique`).toBe(false);
    ids.add(pattern.id);
    expect(pattern.layer, `${pattern.title} layer`).toBeGreaterThanOrEqual(1);
    expect(pattern.layer, `${pattern.title} layer`).toBeLessThanOrEqual(5);
    if (pattern.secondaryLayer !== undefined) {
      expect(pattern.secondaryLayer).toBeGreaterThanOrEqual(1);
      expect(pattern.secondaryLayer).toBeLessThanOrEqual(5);
      expect(pattern.secondaryLayer).not.toBe(pattern.layer);
    }
    expect(pattern.mapsTo.length, `${pattern.title} mapsTo`).toBeGreaterThan(0);
  }
});

// --- 2. Data: every figure has art on disk and a resolvable placement --------
test('every figure has an SVG on disk and its placement headings exist', () => {
  expect(figures.length).toBeGreaterThan(0);
  for (const figure of figures) {
    const svg = resolve(process.cwd(), 'src/figures', `${figure.id}.svg`);
    expect(existsSync(svg), `${figure.id}.svg exists`).toBe(true);
    expect(figure.caption).toContain('— drawn from chapter');
    expect(figure.alt.trim().length).toBeGreaterThan(0);
    expect(figure.description.trim().length).toBeGreaterThan(0);

    for (const placement of figure.placements) {
      const chapter = getChapterBySlug(placement.chapter);
      expect(chapter, `chapter for slug "${placement.chapter}"`).toBeTruthy();
      const headings = getHeadings(readSource(`bok/${chapter!.id}.md`)).map((h) => h.text);
      if (placement.section) {
        expect(
          headings.includes(placement.section),
          `"${placement.section}" is a heading in ${chapter!.id}`,
        ).toBe(true);
      }
    }
  }
});

// --- 3. Presence in the built chapters --------------------------------------
const PLACEMENTS = figures.flatMap((figure) =>
  figure.placements.map((placement) => ({
    id: figure.id,
    title: figure.title,
    route: `/bok/${placement.chapter}`,
  })),
);

test.describe('presence', () => {
  for (const { id, title, route } of PLACEMENTS) {
    test(`${id} renders on ${route}`, async ({ page }) => {
      await page.goto(route);
      const figure = page.locator(`figure.figure--infographic[data-figure="${id}"]`);
      await expect(figure).toHaveCount(1);

      // The inline SVG carries role img (or group where it holds links) and a
      // <title> as its accessible name.
      const svg = figure.locator('svg').first();
      await expect(svg).toHaveAttribute('role', /^(img|group)$/);
      expect(await svg.locator('title').count()).toBeGreaterThan(0);
      expect(await svg.locator('desc').count()).toBeGreaterThan(0);

      // The caption names the figure and the <details> text alternative is there.
      await expect(figure.locator('figcaption')).toContainText(title);
      await expect(figure.locator('details.figure-alt')).toHaveCount(1);
    });
  }
});

// --- 4. CSP: the figures add no inline JS -----------------------------------
test('a chapter carrying a figure has no inline JS', async ({ page }) => {
  await page.goto('/bok/definition');
  const offenders = await page.$$eval('script', (scripts) =>
    scripts
      .filter((s) => {
        const src = s.getAttribute('src');
        const type = (s.getAttribute('type') || '').toLowerCase();
        return !src && !type.includes('json');
      })
      .map((s) => (s.textContent || '').slice(0, 60)),
  );
  expect(offenders, `inline scripts: ${offenders.join(' | ')}`).toEqual([]);
});

// --- 5. Placement points -----------------------------------------------------
test('three-questions sits under the H2 "The three questions"', async ({ page }) => {
  await page.goto('/bok/definition');
  const prev = await page.evaluate(() => {
    const fig = document.querySelector('figure[data-figure="three-questions"]');
    if (!fig) return null;
    const heads = Array.from(document.querySelectorAll('article h2, article h3'));
    let previous: Element | null = null;
    for (const h of heads) {
      if (fig.compareDocumentPosition(h) & Node.DOCUMENT_POSITION_PRECEDING) previous = h;
    }
    return previous ? (previous.textContent || '').replace(/\s+/g, ' ').trim() : null;
  });
  expect(prev).toBe('The three questions');
});

test('pattern-map opens chapter 05 before its first H2', async ({ page }) => {
  await page.goto('/bok/patterns');
  const ok = await page.evaluate(() => {
    const article = document.querySelector('article.prose');
    const fig = article?.querySelector('figure[data-figure="pattern-map"]');
    const firstH2 = article?.querySelector('h2');
    if (!fig || !firstH2) return false;
    return Boolean(fig.compareDocumentPosition(firstH2) & Node.DOCUMENT_POSITION_FOLLOWING);
  });
  expect(ok, 'pattern-map should precede the first h2').toBe(true);
});

test('every pattern-map link resolves to a pattern anchor on the page', async ({ page }) => {
  await page.goto('/bok/patterns');
  const result = await page.evaluate(() => {
    const fig = document.querySelector('figure[data-figure="pattern-map"]');
    const links = Array.from(fig?.querySelectorAll('a[href^="#"]') ?? []);
    const broken: string[] = [];
    for (const a of links) {
      const id = (a.getAttribute('href') || '').slice(1);
      if (!id || !document.getElementById(id)) broken.push(id);
    }
    return { count: links.length, broken };
  });
  expect(result.count).toBe(patterns.length);
  expect(result.broken, `unresolved pattern links: ${result.broken.join(', ')}`).toEqual([]);
});

// --- 6. Reading paths on the /bok index -------------------------------------
test('the reading-paths map renders three columns of real links', async ({ page }) => {
  await page.goto('/bok');
  const figure = page.locator('figure.reading-paths');
  await expect(figure).toHaveCount(1);
  await expect(figure.locator('.rp-col')).toHaveCount(3);

  // First node of the "building this month" column links to the stack chapter,
  // and the newcomer column ends in the learning path.
  await expect(figure.locator('.rp-col').first().locator('a').first()).toHaveAttribute(
    'href',
    '/bok/the-stack',
  );
  await expect(figure.locator('a.rp-path')).toHaveAttribute('href', '/path');
});

// --- 7. Mobile: figures never exceed the article width ----------------------
test('on a narrow phone a chapter figure is not wider than the article', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/bok/maturity-model');
  const figure = page.locator('figure[data-figure="maturity-grid"]');
  await expect(figure).toBeVisible();
  const figBox = await figure.boundingBox();
  const artBox = await page.locator('article.prose').boundingBox();
  expect(figBox!.width).toBeLessThanOrEqual(artBox!.width + 1);
});
