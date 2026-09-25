// figures-gallery.spec.ts: the citable, reusable figures (block b-figures-system).
// Pure-Node checks on the manifest and the generated downloads in dist, then
// browser checks on the /figures gallery and the /figures/<id> permalinks: the
// ImageObject structured data, the downloads, the embed snippets, the CSP and
// axe in both themes. Runs in the `default` project against dist via preview.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { inlineScriptAllowed } from './helpers/csp';

import { figures, figureExports, figureKind, figureBudgetKb } from '../src/data/figures';
import { diagrams } from '../src/data/diagrams';
import { site } from '../src/data/site';

// Mirrors src/data/site.ts on purpose (a test importing the constant it checks
// would pass however it drifted).
const SITE_ORIGIN = 'https://aigovernanceengineer.com';
const LICENSE_URL = 'https://creativecommons.org/licenses/by/4.0/';
const DIST = resolve(process.cwd(), 'dist');
const EXPORTS = resolve(DIST, 'downloads', 'figures');
const built = figures.filter((f) => existsSync(resolve(process.cwd(), 'src/figures', `${f.id}.svg`)));

// --- 1. Manifest rules --------------------------------------------------------
test('dated figures print "As of <date>" inside the art and keep a later reviewBy', () => {
  for (const figure of figures) {
    if (!figure.asOf) {
      expect(figure.reviewBy, `${figure.id}: reviewBy needs asOf`).toBeUndefined();
      continue;
    }
    expect(figure.asOf).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    if (figure.reviewBy) expect(figure.reviewBy > figure.asOf).toBe(true);
    const svg = readFileSync(resolve(process.cwd(), 'src/figures', `${figure.id}.svg`), 'utf8');
    const text = svg.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').toLowerCase();
    // A Spanish figure (root lang="es", block w2-fig-posters) prints the stamp
    // in Spanish: "A fecha de <date>".
    const stamp = /^<svg\b[^>]*\slang="es"/.test(svg.trim())
      ? `a fecha de ${figure.asOf}`
      : `as of ${figure.asOf}`;
    expect(text, `${figure.id} prints its as-of date`).toContain(stamp);
  }
});

test('every figure SVG is within the budget of its kind', () => {
  for (const figure of built) {
    const bytes = readFileSync(resolve(process.cwd(), 'src/figures', `${figure.id}.svg`)).length;
    const budget = figureBudgetKb[figureKind(figure)] * 1024;
    expect(bytes, `${figure.id} (${figureKind(figure)})`).toBeLessThanOrEqual(budget);
  }
});

test('data-viz figures ship a table fallback with a source line', () => {
  for (const figure of figures.filter((f) => figureKind(f) === 'data-viz')) {
    expect(figure.data, `${figure.id} data`).toBeTruthy();
    expect(figure.data!.rows.length).toBeGreaterThan(0);
    for (const row of figure.data!.rows) expect(row.length).toBe(figure.data!.columns.length);
    expect(figure.data!.source.trim().length).toBeGreaterThan(0);
  }
});

// --- 2. Generated downloads ------------------------------------------------------
test('every figure has its versioned SVG and PNG exports in dist', () => {
  for (const figure of built) {
    for (const entry of figureExports(figure.id, site.bokVersion)) {
      expect(existsSync(resolve(EXPORTS, entry.file)), entry.file).toBe(true);
      expect(entry.file).toContain(`-v${site.bokVersion}`);
    }
  }
});

test('the standalone SVGs are self-contained, themed and attributed', () => {
  for (const figure of built) {
    const [auto, light, dark] = figureExports(figure.id, site.bokVersion).filter(
      (e) => e.format === 'svg',
    );
    const svg = readFileSync(resolve(EXPORTS, auto.file), 'utf8');
    expect(svg).toContain('role="img"');
    // A Spanish poster's export marks its English <title>/<desc> lang="en".
    expect(svg).toMatch(/<title id="[^"]+"(?: lang="en")?>/);
    expect(svg).toMatch(/<desc id="[^"]+"(?: lang="en")?>/);
    expect(svg).toContain('@media (prefers-color-scheme:dark)');
    expect(svg).toContain('@font-face');
    expect(svg).toContain(`aigovernanceengineer.com · CC BY 4.0 · v${site.bokVersion}`);
    expect(svg).toContain(LICENSE_URL);
    // Links are absolute: no same-document or site-relative href is left.
    expect(svg).not.toMatch(/href="#/);
    expect(svg).not.toMatch(/href="\/(?!\/)/);
    // No var(): every colour is resolved to a value.
    expect(svg).not.toContain('var(--');
    expect(readFileSync(resolve(EXPORTS, light.file), 'utf8')).not.toContain('prefers-color-scheme');
    expect(readFileSync(resolve(EXPORTS, dark.file), 'utf8')).not.toContain('prefers-color-scheme');
  }
});

test('the PNGs have the advertised width and carry licence text chunks', () => {
  for (const figure of built) {
    for (const entry of figureExports(figure.id, site.bokVersion).filter((e) => e.format === 'png')) {
      const png = readFileSync(resolve(EXPORTS, entry.file));
      expect(png.subarray(1, 4).toString('latin1')).toBe('PNG');
      expect(png.readUInt32BE(16), `${entry.file} width`).toBe(entry.width);
      const text = png.toString('latin1');
      expect(text).toContain('iTXt');
      expect(text).toContain(`${SITE_ORIGIN}/figures/${figure.id}`);
      expect(text).toContain(LICENSE_URL);
    }
  }
});

// --- 3. Gallery ------------------------------------------------------------------
test('/figures lists every figure and every archify diagram', async ({ page }) => {
  await page.goto('/figures');
  await expect(page.locator('h1')).toHaveCount(1);
  for (const figure of built) {
    await expect(
      page.locator(`main a[href="/figures/${figure.id}"]`).first(),
      `card for ${figure.id}`,
    ).toBeVisible();
  }
  for (const diagram of diagrams) {
    await expect(page.locator(`#fg-d-${diagram.id}`), `card for ${diagram.id}`).toHaveCount(1);
  }
  // Thumbnails are decorative: hidden from assistive tech, out of the tab order.
  const thumbs = page.locator('a.fg-thumb');
  await expect(thumbs.first()).toHaveAttribute('aria-hidden', 'true');
  await expect(thumbs.first()).toHaveAttribute('tabindex', '-1');
  expect(await page.locator('a.fg-thumb svg title').count()).toBe(0);
});

// --- 4. Permalinks -----------------------------------------------------------------
for (const figure of built) {
  test(`/figures/${figure.id} is citable and reusable`, async ({ page, request }) => {
    await page.goto(`/figures/${figure.id}`);
    await expect(page.locator('h1')).toHaveText(figure.title);
    await expect(page.locator('#text-alternative')).toBeVisible();
    await expect(page.locator('main')).toContainText(figure.description.slice(0, 60));

    // The figure itself, with an accessible name.
    const svg = page.locator('.fg-view svg').first();
    await expect(svg).toHaveAttribute('role', /^(img|group)$/);

    // ImageObject with the licence metadata search engines read.
    const raw = await page.locator('script[type="application/ld+json"]').textContent();
    const graph = JSON.parse(raw as string)['@graph'] as Record<string, unknown>[];
    const image = graph.find((node) => node['@type'] === 'ImageObject');
    expect(image, 'ImageObject node').toBeTruthy();
    expect(image!.license).toBe(LICENSE_URL);
    expect(image!.acquireLicensePage).toBe(`${SITE_ORIGIN}/figures/${figure.id}#reuse`);
    expect(String(image!.creditText)).toContain('aigovernanceengineer.com');
    expect(Array.isArray(image!.creator)).toBe(true);
    expect(String(image!.dateModified)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(String(image!.contentUrl)).toMatch(new RegExp(`/downloads/figures/${figure.id}-v`));
    await expect(page.locator('#reuse')).toBeVisible();

    // Every download link answers 200 with an image type.
    const hrefs = await page
      .locator('.fg-downloads a[download]')
      .evaluateAll((links) => links.map((a) => a.getAttribute('href') || ''));
    expect(hrefs.length).toBe(7);
    for (const href of hrefs) {
      const res = await request.get(href);
      expect(res.status(), href).toBe(200);
      expect(res.headers()['content-type'], href).toMatch(/image\/(png|svg\+xml)/);
    }

    // Embed snippets and the citation carry the full CC BY credit.
    const codes = page.locator('.fg-code');
    await expect(codes.nth(0)).toContainText('<figcaption>');
    await expect(codes.nth(0)).toContainText('CC BY 4.0');
    await expect(codes.nth(1)).toContainText(`](${SITE_ORIGIN}/figures/${figure.id})`);
    await expect(page.locator('.fc-ref')).toContainText(`${SITE_ORIGIN}/figures/${figure.id}`);
    if (figure.asOf) await expect(page.locator('main')).toContainText(`as of ${figure.asOf}`);

    // CSP: no inline JS, only same-origin scripts, the JSON-LD block and the
    // theme bootstrap (allowed by its sha256 in the CSP).
    const inline = (
      await page.$$eval('script', (scripts) =>
        scripts
          .filter((s) => !s.getAttribute('src') && !(s.getAttribute('type') || '').includes('json'))
          .map((s) => s.textContent || ''),
      )
    ).filter((body) => !inlineScriptAllowed(body));
    expect(inline.length).toBe(0);
  });
}

// --- 5. Accessibility ---------------------------------------------------------------
for (const scheme of ['light', 'dark'] as const) {
  for (const path of ['/figures', `/figures/${built[0]?.id}`, '/figures/discipline-map']) {
    test(`axe is clean on ${path} (${scheme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      expect(serious.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
    });
  }
}

test('no horizontal page scroll on /figures and a permalink at 390 px', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ['/figures', `/figures/${built[0]?.id}`, '/figures/discipline-map']) {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, path).toBeLessThanOrEqual(0);
  }
});
