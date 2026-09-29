import { test } from '@playwright/test';

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
