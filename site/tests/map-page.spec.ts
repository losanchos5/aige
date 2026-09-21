// map-page.spec.ts: the /map page itself (the SVG in the page, the cluster
// index, keyboard and responsive behaviour). Runs in the default Playwright
// project against the preview server (baseURL from config). The pure-data and
// generated-SVG checks live in tests/map.spec.ts.
import { test, expect } from '@playwright/test';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

test.beforeEach(async ({ page }) => {
  await page.goto('/map');
});

// --- 1. The figure ----------------------------------------------------------
test('renders the map figure with an accessible name and description', async ({ page }) => {
  const svg = page.locator('figure svg.map-svg[role="group"]');
  await expect(svg).toHaveCount(1);
  await expect(svg.locator('> title')).toHaveCount(1);
  await expect(svg.locator('> desc')).toHaveCount(1);
  await expect(page.locator('svg.map-svg g.branch')).toHaveCount(8);
});

// --- 2. Every SVG link resolves --------------------------------------------
test('every link in the map resolves to a real page or anchor', async ({ page }) => {
  const hrefs = await page
    .locator('svg.map-svg a[href]')
    .evaluateAll((els) => els.map((el) => el.getAttribute('href') ?? ''));
  expect(hrefs.length).toBeGreaterThan(100);

  const distinct = [...new Set(hrefs)];
  const htmlCache = new Map<string, string>();

  for (const href of distinct) {
    expect(href.trim().length, 'non-empty href').toBeGreaterThan(0);
    const [target, frag] = href.split('#');
    if (!htmlCache.has(target)) {
      const response = await page.request.get(target);
      expect(response.ok(), `${target} should serve 200`).toBeTruthy();
      htmlCache.set(target, await response.text());
    }
    if (frag) {
      expect(htmlCache.get(target)!.includes(`id="${frag}"`), `${href} anchor should resolve`).toBe(
        true,
      );
    }
  }
});

// --- 3. Text fits inside its pill -------------------------------------------
test('every pill label fits inside its rect', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/map');
  const overflow = await page.locator('svg.map-svg a[href]').evaluateAll((els) => {
    const bad: string[] = [];
    for (const el of els) {
      const text = el.querySelector('text') as SVGGraphicsElement | null;
      const rect = el.querySelector('rect') as SVGGraphicsElement | null;
      if (!text || !rect) continue;
      const tw = text.getBBox().width;
      const rw = rect.getBBox().width;
      if (tw > rw - 8) bad.push(`${el.getAttribute('href')}: text ${tw.toFixed(1)} > rect ${rw.toFixed(1)} - 8`);
    }
    return bad;
  });
  expect(overflow, overflow.join('\n')).toEqual([]);
});

// --- 4. The cluster index ---------------------------------------------------
test('the index has eight clusters, each with at least three groups', async ({ page }) => {
  const clusters = page.locator('details.cluster');
  await expect(clusters).toHaveCount(8);

  const count = await clusters.count();
  for (let i = 0; i < count; i++) {
    const cluster = clusters.nth(i);
    const groups = cluster.locator('h3.cluster-group-h');
    expect(await groups.count(), `cluster ${i} groups`).toBeGreaterThanOrEqual(3);

    const hrefs = await cluster
      .locator('a[href]')
      .evaluateAll((els) => els.map((el) => el.getAttribute('href') ?? ''));
    expect(hrefs.length, `cluster ${i} links`).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href.trim().length, `cluster ${i} non-empty href`).toBeGreaterThan(0);
      expect(href).not.toBe('#');
    }
  }
});

test('the legend has one item per branch', async ({ page }) => {
  await expect(page.locator('.map-legend .map-legend-item')).toHaveCount(8);
});

// --- 5. Responsive: page never scrolls sideways; the canvas does on a phone --
for (const width of [390, 834, 1440]) {
  test(`no horizontal page scroll at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/map');
    await page.waitForLoadState('networkidle');
    const noPageScroll = await page.evaluate(
      () => document.scrollingElement!.scrollWidth === document.documentElement.clientWidth,
    );
    expect(noPageScroll).toBe(true);
  });
}

test('the map canvas scrolls sideways at 390px', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/map');
  await page.waitForLoadState('networkidle');
  const scrolls = await page
    .locator('.map-scroll')
    .evaluate((el) => el.scrollWidth > el.clientWidth);
  expect(scrolls).toBe(true);
});

// --- 6. CSP: no inline executable script ------------------------------------
test('ships no inline executable script (CSP script-src self)', async ({ page }) => {
  const inline = page.locator('script:not([src]):not([type="application/ld+json"])');
  await expect(inline).toHaveCount(0);
});

// --- 7. Keyboard: Tab from the hero reaches the first map link --------------
test('keyboard reaches the first map link and Enter navigates', async ({ page }) => {
  const firstHref = await page.locator('svg.map-svg a[href]').first().getAttribute('href');
  expect(firstHref).toContain('/bok/definition');

  await page.locator('.hero a[href="/bok"]').focus();
  let reached = false;
  for (let i = 0; i < 8 && !reached; i++) {
    await page.keyboard.press('Tab');
    reached = await page.evaluate(
      () => document.activeElement?.tagName.toLowerCase() === 'a' &&
        (document.activeElement as Element).closest('svg.map-svg') !== null,
    );
  }
  expect(reached, 'a Tab from the hero should reach a map link').toBe(true);

  await page.keyboard.press('Enter');
  await page.waitForURL(/\/bok\/definition/);
  expect(page.url()).toContain('/bok/definition');
});

// --- 8. Deep link: a #cluster-… hash opens and focuses that branch ----------
test('a #cluster hash opens that cluster and focuses its summary', async ({ page }) => {
  await page.goto('/map#cluster-patterns');
  await expect
    .poll(() => page.locator('#cluster-patterns').evaluate((el) => (el as HTMLDetailsElement).open))
    .toBe(true);
  const focused = await page.evaluate(() => {
    const el = document.activeElement;
    return !!el && el.tagName.toLowerCase() === 'summary' && el.closest('#cluster-patterns') !== null;
  });
  expect(focused).toBe(true);
});

// --- 9. Download block: present with 200 image/png only when published -------
test('the download block matches the published export', async ({ page }) => {
  const exportPath = resolve(process.cwd(), 'src/data/map-export.json');
  const link = page.locator('.map-download a[download]');
  if (existsSync(exportPath)) {
    await expect(link).toHaveCount(1);
    const href = await link.getAttribute('href');
    const response = await page.request.get(href!);
    expect(response.ok(), `${href} should serve 200`).toBeTruthy();
    expect(response.headers()['content-type']).toContain('image/png');
  } else {
    await expect(link).toHaveCount(0);
  }
});
