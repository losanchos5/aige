// figures-posters.spec.ts: acceptance checks for the reference posters of block
// w2-fig-posters (v0.5.0), generated at build by scripts/lib/posters.mjs from
// frameworks.ts, roles.ts and deployment-options.ts: the EU AI Act timeline, the
// operator roles, the risk ladder, the model-type by deployment-option matrix,
// and the Spanish editions of the first three. The generic figure checks live in
// figures.spec.ts and figures-gallery.spec.ts, and map.spec.ts runs
// `figures-build.mjs --check`, which fails when a poster is stale against its
// data. This file adds the poster contract of site/VISUAL-GUIDE.md §5. Half of
// it is pure Node (no browser); the rest drives dist/ served by preview. Runs in
// the `default` project.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

import { readSource, getHeadings } from '../src/lib/md-parse';
import { figures, figureExports } from '../src/data/figures';
import { site } from '../src/data/site';
import { getChapterBySlug } from '../src/data/chapters';
import { obligations } from '../src/data/frameworks';
import { matrix, matrixColumns, matrixRows } from '../src/data/deployment-options';

const EN = [
  'eu-ai-act-timeline',
  'eu-ai-act-operator-roles',
  'eu-ai-act-risk-ladder',
  'deployment-option-matrix',
] as const;
const ES = ['eu-ai-act-timeline-es', 'eu-ai-act-operator-roles-es', 'eu-ai-act-risk-ladder-es'] as const;
const ALL = [...EN, ...ES];

const art = (id: string) => readFileSync(resolve(process.cwd(), 'src/figures', `${id}.svg`), 'utf8');
const def = (id: string) => figures.find((figure) => figure.id === id)!;
const visibleText = (svg: string) =>
  svg
    .replace(/<title[\s\S]*?<\/title>|<desc[\s\S]*?<\/desc>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ');

// --- 1. Data: the poster contract ---------------------------------------------
test('every poster is declared, dated and within the poster contract', () => {
  for (const id of ALL) {
    const figure = def(id);
    expect(figure, `${id} is declared in figures.ts`).toBeTruthy();
    expect(figure.kind, `${id} kind`).toBe('poster');
    expect(figure.asOf, `${id} asOf`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(figure.reviewBy! > figure.asOf!, `${id} reviewBy after asOf`).toBe(true);

    const path = resolve(process.cwd(), 'src/figures', `${id}.svg`);
    expect(existsSync(path), `${id}.svg exists`).toBe(true);
    expect(statSync(path).size, `${id}.svg within 48 KB`).toBeLessThanOrEqual(48 * 1024);

    const svg = art(id);
    // Portrait at the A-series ratio (1000 × 1414 ≈ 1 : √2).
    expect(svg).toMatch(/^<svg[^>]*viewBox="0 0 1000 1414"/);
    // Tokens, not colours; no dimmed text; no em dash.
    expect(svg, `${id} has no hex colour`).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(svg, `${id} does not dim text`).not.toMatch(/opacity/);
    expect(svg.includes('—'), `${id} has no em dash`).toBe(false);
    // No links: the poster is one image.
    expect(svg).not.toMatch(/<a\b/);
    // role img, and aria-labelledby resolves to <title>/<desc>.
    expect(svg).toMatch(/^<svg[^>]*role="img"/);
    const labelledBy = /aria-labelledby="([^"]+)"/.exec(svg)?.[1].split(/\s+/) ?? [];
    expect(labelledBy.length).toBe(2);
    for (const ref of labelledBy) expect(svg.includes(`id="${ref}"`), `${id}: #${ref}`).toBe(true);
    const title = /<title[^>]*>([^<]*)<\/title>/.exec(svg)?.[1].replace(/&amp;/g, '&');
    expect(title, `${id} <title> matches figures.ts`).toBe(figure.title);
    // Smallest font 16 units: at the 760 px minimum width in a chapter that is
    // 12 px or more (VISUAL-GUIDE.md §1.10).
    const sizes = [...svg.matchAll(/font-size="([\d.]+)"/g)].map((m) => Number(m[1]));
    expect(Math.min(...sizes), `${id} smallest font`).toBeGreaterThanOrEqual(16);

    // Caption formula, title budget and alt length.
    expect(figure.title.split(/\s+/).length, `${id} title ≤ 6 words`).toBeLessThanOrEqual(6);
    expect(figure.caption, `${id} caption`).toMatch(/Drawn from chapters? \d{2}( and \d{2})?\.$/);
    expect(figure.alt.length, `${id} alt 50 to 160 characters`).toBeGreaterThanOrEqual(50);
    expect(figure.alt.length, `${id} alt 50 to 160 characters`).toBeLessThanOrEqual(160);
    for (const field of [figure.title, figure.caption, figure.alt, figure.description]) {
      expect(field.includes('—')).toBe(false);
    }
  }
});

test('English posters are placed in their chapters and print "As of"', () => {
  for (const id of EN) {
    const figure = def(id);
    const svg = art(id);
    expect(svg).not.toMatch(/^<svg[^>]*\slang=/);
    expect(visibleText(svg).toLowerCase()).toContain(`as of ${figure.asOf}`);
    expect(figure.placements.length, `${id} placements`).toBeGreaterThan(0);
    for (const placement of figure.placements) {
      const chapter = getChapterBySlug(placement.chapter);
      expect(chapter, `${id}: chapter ${placement.chapter}`).toBeTruthy();
      const headings = getHeadings(readSource(`bok/${chapter!.id}.md`));
      const section = headings.find((h) => h.text === placement.section);
      expect(section, `${id}: "${placement.section}" in ${chapter!.id}`).toBeTruthy();
      if (placement.sub) {
        expect(headings.some((h) => h.text === placement.sub), `${id}: "${placement.sub}"`).toBe(true);
      }
    }
  }
});

test('Spanish editions carry lang="es", the Spanish stamp and no chapter placement', () => {
  for (const id of ES) {
    const figure = def(id);
    const svg = art(id);
    expect(svg).toMatch(/^<svg[^>]*\slang="es"/);
    // The <title>/<desc> describe the image in the site's language.
    expect(svg).toMatch(/<title id="[^"]+" lang="en">/);
    expect(svg).toMatch(/<desc id="[^"]+" lang="en">/);
    expect(visibleText(svg).toLowerCase()).toContain(`a fecha de ${figure.asOf}`);
    expect(figure.placements, `${id} is not placed in an English chapter`).toEqual([]);
    expect(figure.pages).toEqual(['/figures']);
    // Its English edition exists and states the same dates.
    const english = id.replace(/-es$/, '');
    expect(def(english), `${english} exists`).toBeTruthy();
    const dates = (s: string) => [...new Set(s.match(/\d{4}-\d{2}-\d{2}/g) ?? [])].sort();
    expect(dates(visibleText(svg)), `${id} dates match ${english}`).toEqual(dates(visibleText(art(english))));
  }
});

// --- 2. Data: every date and cell comes from the data or the chapter --------
test('the timeline draws every dated EU AI Act step of frameworks.ts and nothing the chapters do not state', () => {
  const svgDates = new Set(visibleText(art('eu-ai-act-timeline')).match(/\d{4}-\d{2}-\d{2}/g) ?? []);
  const eu = obligations.filter((row) => row.frameworkId === 'eu-ai-act');
  const dataDates = new Set<string>();
  for (const row of eu) {
    if (row.appliesFrom) dataDates.add(row.appliesFrom);
    for (const m of row.milestones ?? []) dataDates.add(m.date);
  }
  for (const date of dataDates) expect(svgDates.has(date), `timeline draws ${date}`).toBe(true);
  // Anything else on the poster is a date chapter 18 or 08 states.
  const chapters = readSource('bok/18-eu-ai-act.md') + readSource('bok/08-regulatory-map.md');
  for (const date of svgDates) {
    if (dataDates.has(date) || date === def('eu-ai-act-timeline').asOf) continue;
    expect(chapters.includes(date), `${date} is stated in chapter 18 or 08`).toBe(true);
  }
  // The table fallback lists the same dates as the art.
  const tableDates = new Set(def('eu-ai-act-timeline').data!.rows.map((row) => row[0]));
  for (const date of tableDates) expect(svgDates.has(date), `table date ${date} is drawn`).toBe(true);
});

test('the matrix poster and its table repeat deployment-options.ts cell for cell', () => {
  const text = visibleText(art('deployment-option-matrix'));
  const flat = text.replace(/-\s/g, '-').replace(/\s+/g, ' ');
  const table = def('deployment-option-matrix').data!;
  expect(table.columns.slice(1)).toEqual(matrixRows.map((row) => row.label));
  expect(table.rows.map((row) => row[0])).toEqual(matrixColumns.map((column) => column.label));
  for (const cell of matrix) {
    const r = table.rows.findIndex((row) => row[0] === matrixColumns.find((c) => c.id === cell.column)!.label);
    const c = matrixRows.findIndex((row) => row.id === cell.row) + 1;
    expect(table.rows[r][c], `table cell ${cell.row} × ${cell.column}`).toBe(cell.control);
    // The art wraps text over lines; compare word by word.
    for (const word of cell.control.split(/\s+/)) expect(flat.includes(word), `art has "${word}"`).toBe(true);
  }
});

// --- 3. Presence in the built chapters and on /figures -----------------------
const PLACED = EN.flatMap((id) =>
  def(id).placements.map((placement) => ({ id, route: `/bok/${placement.chapter}`, placement })),
);

test.describe('posters in chapters', () => {
  for (const { id, route, placement } of PLACED) {
    test(`${id} sits under "${placement.sub ?? placement.section}" on ${route}`, async ({ page }) => {
      await page.goto(route);
      const figure = page.locator(`figure.figure--poster[data-figure="${id}"]`);
      await expect(figure).toHaveCount(1);
      // A focusable, labelled scroll region around the art, and a permalink.
      const region = figure.locator('.figure-canvas--poster');
      await expect(region).toHaveAttribute('role', 'region');
      await expect(region).toHaveAttribute('tabindex', '0');
      await expect(region).toHaveAttribute('aria-label', /scroll sideways/);
      await expect(figure.locator(`a.figure-poster-link[href="/figures/${id}"]`)).toHaveCount(1);
      await expect(figure.locator('details.figure-alt')).toHaveCount(1);
      // 'head' placement: the nearest heading before the figure is the anchor.
      const previous = await page.evaluate((figId) => {
        const fig = document.querySelector(`figure[data-figure="${figId}"]`);
        if (!fig) return null;
        let prev: Element | null = null;
        for (const h of Array.from(document.querySelectorAll('article h2, article h3'))) {
          if (fig.compareDocumentPosition(h) & Node.DOCUMENT_POSITION_PRECEDING) prev = h;
        }
        return prev ? (prev.textContent || '').replace(/\s+/g, ' ').trim() : null;
      }, id);
      expect(previous).toBe(placement.sub ?? placement.section);
    });
  }
});

test('the Spanish editions are in no chapter and on /figures', async ({ page }) => {
  for (const route of ['/bok/eu-ai-act', '/bok/regulatory-map', '/bok/governing-deployment']) {
    await page.goto(route);
    for (const id of ES) await expect(page.locator(`[data-figure="${id}"]`)).toHaveCount(0);
  }
  await page.goto('/figures');
  for (const id of ALL) await expect(page.locator(`a[href="/figures/${id}"]`).first()).toBeVisible();
  for (const id of ES) {
    await page.goto(`/figures/${id}`);
    await expect(page.locator('svg[lang="es"]').first()).toBeVisible();
    await expect(page.locator('main')).toContainText(`as of ${def(id).asOf}`);
  }
});

test('on a 390 px phone a chapter poster scrolls inside its region, not the page', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/bok/eu-ai-act');
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
  const sizes = await page.evaluate(() => {
    const region = document.querySelector('figure[data-figure="eu-ai-act-timeline"] .figure-canvas--poster');
    const svg = region?.querySelector('svg');
    return region && svg
      ? { scroll: region.scrollWidth, client: region.clientWidth, svg: svg.getBoundingClientRect().width }
      : null;
  });
  expect(sizes).not.toBeNull();
  expect(sizes!.svg, 'poster keeps its 760 px minimum').toBeGreaterThanOrEqual(759);
  expect(sizes!.scroll).toBeGreaterThan(sizes!.client);
});

test('the Spanish exports keep lang="es" on the root', () => {
  const dir = resolve(process.cwd(), 'dist', 'downloads', 'figures');
  for (const id of ES) {
    const svgExport = figureExports(id, site.bokVersion).find((e) => e.format === 'svg' && e.theme === 'auto')!;
    const path = resolve(dir, svgExport.file);
    if (!existsSync(path)) continue; // exports are written by the full build
    const svg = readFileSync(path, 'utf8');
    expect(svg).toMatch(/<svg[^>]*\slang="es"/);
    expect(svg).toMatch(/<title id="[^"]+" lang="en">/);
  }
});
