// resources.spec.ts: acceptance checks for Block E (the Resources section) plus
// reading-comfort review shots at 390/1440 in light (and glossary in dark),
// written to tests/__screenshots__/E/.
import { test, expect } from '@playwright/test';
import { frameworks, obligations } from '../src/data/frameworks';
import { topics, columns } from '../src/data/crosswalk';

test('hub renders six resource cards, each with a count', async ({ page }) => {
  await page.goto('/resources');
  const cards = page.locator('[data-resource-card]');
  await expect(cards).toHaveCount(6);

  const counts = page.locator('[data-resource-count]');
  await expect(counts).toHaveCount(6);
  for (let i = 0; i < 6; i++) {
    await expect(counts.nth(i)).not.toHaveText('');
  }

  // Counts are computed from the data, not hard-coded prose.
  await expect(page.locator('body')).toContainText(
    `${frameworks.length} frameworks · ${obligations.length} obligations`,
  );
});

test('crosswalk renders a row per topic and a column per framework family', async ({ page }) => {
  await page.goto('/resources/crosswalk');
  await expect(page.locator('tr.cw-row')).toHaveCount(topics.length);
  await expect(page.locator('th.cw-colh')).toHaveCount(columns.length);
});

test('crosswalk cell opens the drawer on Enter and closes on Escape', async ({ page }) => {
  await page.goto('/resources/crosswalk');
  const cell = page.locator('.cw-cell').first();
  // The topic name is the row header of the row the first cell belongs to.
  const topicName = (
    await cell.locator('xpath=ancestor::tr[1]').locator('.cw-rowh').textContent()
  )?.trim();

  await cell.focus();
  await page.keyboard.press('Enter');
  const drawer = page.locator('#cw-drawer');
  await expect(drawer).toBeVisible();
  await expect(drawer).toContainText(topicName as string);
  await expect(drawer.locator('[data-drawer-body] li[data-fw]').first()).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(drawer).toBeHidden();
  await expect(cell).toBeFocused();
});

test('crosswalk drawer: page behind is inert while open, scrim closes, focus returns', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/resources/crosswalk');
  const cell = page.locator('.cw-cell').first();
  await cell.click();

  const drawer = page.locator('#cw-drawer');
  await expect(drawer).toBeVisible();

  // One close for both drawers: a "×" button named "Close", focused on open.
  const close = drawer.getByRole('button', { name: 'Close', exact: true });
  await expect(close).toBeFocused();
  await expect(close).toHaveText('×');

  // Header, footer and the grid behind are inert; the drawer and scrim are not.
  const inert = await page.evaluate(() => {
    const isInert = (sel: string) => !!document.querySelector(sel)?.closest('[inert]');
    return {
      header: isInert('header.site-header'),
      footer: isInert('.site-footer'),
      grid: isInert('[data-cw-grid]'),
      drawer: isInert('#cw-drawer'),
      scrim: isInert('.cw-scrim'),
    };
  });
  expect(inert).toEqual({ header: true, footer: true, grid: true, drawer: false, scrim: false });

  // A click on the scrim (left of the panel) closes it and lifts inert.
  await page.locator('.cw-scrim').click({ position: { x: 200, y: 450 } });
  await expect(drawer).toBeHidden();
  await expect(page.locator('[inert]')).toHaveCount(0);
  await expect(cell).toBeFocused();
});

test('crosswalk key, layer codes and scroll region are visible and named', async ({ page }) => {
  await page.goto('/resources/crosswalk');
  // CRW-1: the chip outlines are spelled out above the grid.
  const key = page.getByRole('list', { name: 'Chip key' });
  await expect(key).toBeVisible();
  await expect(key).toContainText('maps to');
  await expect(key).toContainText('related');

  // CRW-3: the sideways scroller is a named, focusable region.
  const region = page.getByRole('region', { name: /Topic by framework crosswalk/ });
  await expect(region).toHaveAttribute('tabindex', '0');

  // CRW-2: every layer tick in "By topic" prints its code next to the colour.
  const firstTicks = page.locator('.cw-topic .ticks').first();
  const label = (await firstTicks.getAttribute('aria-label')) as string;
  const codes = label.replace(/^Layers /, '').split(', ').map((n) => `L${n}`);
  await expect(firstTicks.locator('.tk-key')).toHaveText(codes);
});

// SL-06: a layer colour means a stack layer, so the framework-type tags and the
// crosswalk chips are one neutral chip whatever the type.
test('framework type tags and crosswalk chips are neutral, one colour for every type', async ({ page }) => {
  const paints = (sel: string) =>
    page.evaluate((s) => {
      const out = new Set<string>();
      for (const el of document.querySelectorAll(s)) {
        const cs = getComputedStyle(el);
        out.add(`${cs.backgroundColor}|${cs.color}`);
      }
      return [...out];
    }, sel);

  await page.goto('/resources/frameworks');
  expect(await page.locator('.type-tag[data-type]').count()).toBeGreaterThan(1);
  expect(await paints('.type-tag[data-type]')).toHaveLength(1);

  await page.goto('/resources/crosswalk');
  expect(await paints('.cw-chip[data-type]:not(.is-related)')).toHaveLength(1);
});

test('crosswalk CSV and JSON export the data with the notice', async ({ page }) => {
  const notice = 'not a claim of conformity';

  const csv = await page.request.get('/resources/crosswalk.csv');
  expect(csv.status()).toBe(200);
  expect(await csv.text()).toContain(notice);

  const json = await page.request.get('/resources/crosswalk.json');
  expect(json.status()).toBe(200);
  expect(await json.text()).toContain(notice);
});

test('every crosswalk "Obligation row →" link resolves on the frameworks page', async ({
  page,
}) => {
  await page.goto('/resources/crosswalk');
  const links = page.locator('a[href^="/resources/frameworks#ob-"]');
  const count = await links.count();

  const frameworksHtml = await (await page.request.get('/resources/frameworks')).text();
  const seen = new Set<string>();
  for (let i = 0; i < count; i++) {
    const href = await links.nth(i).getAttribute('href');
    const id = (href as string).split('#')[1];
    if (seen.has(id)) continue;
    seen.add(id);
    expect(frameworksHtml).toContain(`id="${id}"`);
  }
});

test.describe('crosswalk without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('a topic row header is a native jump to its section', async ({ page }) => {
    await page.goto('/resources/crosswalk');
    const rowh = page.locator('.cw-rowh').first();
    const href = await rowh.getAttribute('href');
    expect(href).toMatch(/^#topic-/);
    await rowh.click();
    expect(new URL(page.url()).hash).toBe(href);
  });
});

test('frameworks page renders the frameworks and the obligation index', async ({ page }) => {
  await page.goto('/resources/frameworks');
  expect(await page.locator('[data-framework-row]').count()).toBeGreaterThanOrEqual(14);
  expect(await page.locator('[data-obligation-row]').count()).toBeGreaterThanOrEqual(40);
});

test('obligation layers print their codes, and matrix heads are not dimmed', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/resources/frameworks');
  // CRW-2: the LAYERS column shows "L1"… beside each colour tick.
  const ticks = page.locator('[data-obligation-row] .ticks').first();
  const label = (await ticks.getAttribute('aria-label')) as string;
  const codes = label.replace(/^Layers /, '').split(', ').map((n) => `L${n}`);
  await expect(ticks.locator('.tk-key')).toHaveText(codes);

  // FRW-1: the layer names on the heat-matrix heads are >= 12px and opaque.
  const name = page.locator('.mx-colh-name').first();
  await expect(name).toHaveCSS('opacity', '1');
  const size = await name.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
  expect(size).toBeGreaterThanOrEqual(12);
});

test('hub resource list has no bullets or indent', async ({ page }) => {
  await page.goto('/resources');
  const list = page.locator('ul.rc-bento');
  await expect(list).toHaveCSS('list-style-type', 'none');
  await expect(list).toHaveCSS('padding-left', '0px');
});

test('tools page renders at least fifteen tools', async ({ page }) => {
  await page.goto('/resources/tools');
  expect(await page.locator('[data-tool]').count()).toBeGreaterThanOrEqual(15);
});

test('reading list renders links, all https', async ({ page }) => {
  await page.goto('/resources/reading-list');
  const links = page.locator('a[data-reading-item]');
  const count = await links.count();
  expect(count).toBeGreaterThanOrEqual(30);
  for (let i = 0; i < count; i++) {
    const href = await links.nth(i).getAttribute('href');
    expect(href).toBeTruthy();
    expect(href?.startsWith('https://')).toBe(true);
  }
});

test('glossary renders terms and a working jump bar', async ({ page }) => {
  await page.goto('/resources/glossary');
  expect(await page.locator('dt').count()).toBeGreaterThanOrEqual(50);

  const jumps = page.locator('[data-jump]');
  const jumpCount = await jumps.count();
  expect(jumpCount).toBeGreaterThan(0);
  for (let i = 0; i < jumpCount; i++) {
    const href = await jumps.nth(i).getAttribute('href');
    expect(href).toMatch(/^#gl-/);
    await expect(page.locator(href as string)).toHaveCount(1);
  }
});

// ---- Review screenshots ----------------------------------------------------
const routes = [
  { name: 'hub', path: '/resources' },
  { name: 'frameworks', path: '/resources/frameworks' },
  { name: 'tools', path: '/resources/tools' },
  { name: 'reading-list', path: '/resources/reading-list' },
  { name: 'glossary', path: '/resources/glossary' },
  { name: 'crosswalk', path: '/resources/crosswalk' },
];
const widths = [390, 1440];

for (const shot of routes) {
  for (const width of widths) {
    test(`screenshot ${shot.name} ${width} light`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'light' });
      await page.setViewportSize({ width, height: 1200 });
      await page.goto(shot.path);
      await page.waitForLoadState('networkidle');
      await page.screenshot({
        path: `tests/__screenshots__/E/${shot.name}-${width}-light.png`,
        fullPage: true,
      });
    });
  }
}

test('screenshot glossary 1440 dark', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.setViewportSize({ width: 1440, height: 1200 });
  await page.goto('/resources/glossary');
  await page.waitForLoadState('networkidle');
  await page.screenshot({
    path: 'tests/__screenshots__/E/glossary-1440-dark.png',
    fullPage: true,
  });
});
