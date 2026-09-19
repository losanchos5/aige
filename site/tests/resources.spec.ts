// resources.spec.ts: acceptance checks for Block E (the Resources section) plus
// reading-comfort review shots at 390/1440 in light (and glossary in dark),
// written to tests/__screenshots__/E/.
import { test, expect } from '@playwright/test';

test('hub renders four resource cards, each with a count', async ({ page }) => {
  await page.goto('/resources');
  const cards = page.locator('[data-resource-card]');
  await expect(cards).toHaveCount(4);

  const counts = page.locator('[data-resource-count]');
  await expect(counts).toHaveCount(4);
  for (let i = 0; i < 4; i++) {
    await expect(counts.nth(i)).not.toHaveText('');
  }

  // Counts are computed from the data, not hard-coded prose.
  await expect(page.locator('body')).toContainText('25 frameworks · 61 obligations');
});

test('frameworks page renders the frameworks and the obligation index', async ({ page }) => {
  await page.goto('/resources/frameworks');
  expect(await page.locator('[data-framework-row]').count()).toBeGreaterThanOrEqual(14);
  expect(await page.locator('[data-obligation-row]').count()).toBeGreaterThanOrEqual(40);
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
