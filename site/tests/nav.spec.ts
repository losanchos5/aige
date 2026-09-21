// nav.spec.ts: the navigation data model (data/nav.ts) and its rendered surfaces
// — every internal href resolves, descriptions stay short, the footer sitemap
// covers every public route, and axe finds nothing serious/critical with a
// desktop panel open (1440) or the drawer open (390), in light and dark.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { nav, feeds, allHrefs } from '../src/data/nav';

const DIST = 'dist';

function htmlFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...htmlFiles(full));
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
}

function toRoute(file: string): string {
  let route = file.replace(/\\/g, '/').replace(new RegExp(`^${DIST}/`), '/');
  route = route.replace(/\.html$/, '');
  if (route.endsWith('/index')) route = route.slice(0, -'/index'.length);
  return route === '' ? '/' : route;
}

test('every internal href in the model is unique', () => {
  const hrefs = allHrefs();
  expect(new Set(hrefs).size).toBe(hrefs.length);
});

test('every internal href resolves with 200', async ({ request }) => {
  for (const href of allHrefs()) {
    const res = await request.get(href);
    expect(res.status(), `${href} should respond 200`).toBe(200);
  }
});

test('group descriptions are one short line (<= 90 chars)', () => {
  for (const group of nav) {
    expect(group.description.length, `group ${group.id}`).toBeLessThanOrEqual(90);
    for (const item of group.items) {
      if (item.num) continue; // chapters render as number + short title only
      expect(item.description, `${group.id} · ${item.label} needs a description`).toBeTruthy();
      expect(item.description!.length, `${group.id} · ${item.label}`).toBeLessThanOrEqual(90);
    }
  }
});

test('"Body of Knowledge" appears in no description, only as the bok label', () => {
  for (const group of nav) {
    expect(group.id === 'bok' || !group.description.includes('Body of Knowledge')).toBe(true);
    for (const item of group.items) {
      expect(item.description?.includes('Body of Knowledge') ?? false).toBe(false);
    }
  }
});

test('the footer sitemap links every model href and every public route', async ({ page }) => {
  await page.goto('/');
  const sitemap = page.locator('nav[aria-label="Site map"]');
  await expect(sitemap).toBeVisible();

  for (const href of [...allHrefs(), ...feeds.map((f) => f.href)]) {
    await expect(
      sitemap.locator(`a[href="${href}"]`).first(),
      `footer should link ${href}`,
    ).toHaveCount(1);
  }

  const routes = htmlFiles(DIST)
    .map(toRoute)
    .filter(
      (route) =>
        !route.startsWith('/og/') &&
        !route.startsWith('/diagrams/') &&
        route !== '/404',
    );

  for (const route of routes) {
    await expect(
      sitemap.locator(`a[href="${route}"]`).first(),
      `footer should link the built route ${route}`,
    ).toHaveCount(1);
  }
});

const schemes = ['light', 'dark'] as const;

for (const scheme of schemes) {
  test(`axe is clean with the Body of Knowledge panel open at 1440 (${scheme})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.locator('header.site-header').getByRole('button', { name: 'Body of Knowledge' }).click();
    await expect(page.locator('#nav-menu-bok')).toBeVisible();

    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );
    const detail = serious
      .map((v) => `${v.id} [${v.impact}] ${v.help} — ${v.nodes.length} node(s)`)
      .join('\n');
    expect(serious, `panel open ${scheme}:\n${detail}`).toEqual([]);
  });

  test(`axe is clean with the drawer open at 390 (${scheme})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto('/');
    await page.locator('.burger').click();
    await expect(page.locator('#nav-drawer')).toHaveJSProperty('open', true);

    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );
    const detail = serious
      .map((v) => `${v.id} [${v.impact}] ${v.help} — ${v.nodes.length} node(s)`)
      .join('\n');
    expect(serious, `drawer open ${scheme}:\n${detail}`).toEqual([]);
  });
}
