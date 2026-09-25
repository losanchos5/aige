import { test } from '@playwright/test';

// Reading-comfort review shots for Block B: /bok/the-stack and /thesis at
// three widths in both colour schemes, written to tests/__screenshots__/B/.
const pages = [
  { name: 'the-stack', path: '/bok/the-stack' },
  { name: 'thesis', path: '/thesis' },
  { name: 'path', path: '/path' },
];
const widths = [390, 834, 1440];
const schemes = ['light', 'dark'] as const;

for (const scheme of schemes) {
  for (const shot of pages) {
    for (const width of widths) {
      test(`screenshot ${shot.name} ${width} ${scheme}`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme });
        await page.setViewportSize({ width, height: 1200 });
        await page.goto(shot.path);
        await page.waitForLoadState('networkidle');
        await page.screenshot({
          path: `tests/__screenshots__/B/${shot.name}-${width}-${scheme}.png`,
          fullPage: true,
        });
      });
    }
  }
}

// Block N: grouped-navigation review shots, the Body of Knowledge disclosure
// panel open at 1440 and the mobile drawer open at 390, both colour schemes,
// written to tests/__screenshots__/N/. Viewport (not full-page) shots so the
// panel/drawer are the subject.
for (const scheme of schemes) {
  test(`nav panel 1440 ${scheme}`, async ({ page }) => {
    // reducedMotion: capture the settled panel/drawer, not a mid-animation frame.
    await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.locator('header.site-header').getByRole('button', { name: 'Body of Knowledge' }).click();
    await page.locator('#nav-menu-bok').waitFor({ state: 'visible' });
    await page.screenshot({ path: `tests/__screenshots__/N/panel-1440-${scheme}.png` });
  });

  test(`nav drawer 390 ${scheme}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto('/');
    await page.locator('.burger').click();
    await page.locator('#nav-drawer').waitFor({ state: 'visible' });
    await page.screenshot({ path: `tests/__screenshots__/N/drawer-390-${scheme}.png` });
  });
}

// Block M: the discipline map (/map) at three widths in both colour schemes,
// full-page so the map canvas, legend and content-by-cluster index all show,
// written to tests/__screenshots__/M/.
for (const scheme of schemes) {
  for (const width of widths) {
    test(`map ${width} ${scheme}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
      await page.setViewportSize({ width, height: 1200 });
      await page.goto('/map');
      await page.waitForLoadState('networkidle');
      await page.screenshot({
        path: `tests/__screenshots__/M/map-${width}-${scheme}.png`,
        fullPage: true,
      });
    });
  }
}

// Wave 1 integration: layout review shots of the v0.5.0 destinations (the
// index and one detail page of each new collection, plus the hubs they hang
// from) at phone and desktop width, both colour schemes. Review only, not a
// baseline: they go to the gitignored test-results/review/W1/ so a run never
// dirties the committed shots above.
const v050Pages = [
  { name: 'home', path: '/' },
  { name: 'bok', path: '/bok' },
  { name: 'obligations', path: '/obligations' },
  { name: 'obligation', path: '/obligations/aige-obl-euaia-art9' },
  { name: 'patterns', path: '/patterns' },
  { name: 'pattern', path: '/patterns/agent-registry' },
  { name: 'figures', path: '/figures' },
  { name: 'figure', path: '/figures/art73-clock' },
  { name: 'toolkit', path: '/toolkit' },
  { name: 'self-check', path: '/toolkit/maturity-self-check' },
  { name: 'agents', path: '/agents' },
  { name: 'term', path: '/glossary/serious-incident' },
  { name: 'cases', path: '/cases' },
  { name: 'case', path: '/cases/clearview-ai' },
  { name: 'harms', path: '/resources/harms' },
  { name: 'data', path: '/resources/data' },
  { name: 'resources', path: '/resources' },
];

for (const scheme of schemes) {
  for (const shot of v050Pages) {
    for (const width of [390, 1440]) {
      test(`v0.5.0 ${shot.name} ${width} ${scheme}`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
        await page.setViewportSize({ width, height: 1200 });
        await page.goto(shot.path);
        await page.waitForLoadState('networkidle');
        await page.screenshot({
          path: `test-results/review/W1/${shot.name}-${width}-${scheme}.png`,
          fullPage: true,
        });
      });
    }
  }
}
