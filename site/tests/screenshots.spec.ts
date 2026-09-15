import { test } from '@playwright/test';

// Reading-comfort review shots for Block B: /bok/the-stack and /manifesto at
// three widths in both colour schemes, written to tests/__screenshots__/B/.
const pages = [
  { name: 'the-stack', path: '/bok/the-stack' },
  { name: 'manifesto', path: '/manifesto' },
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
