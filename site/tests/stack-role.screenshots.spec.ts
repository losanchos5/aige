import { test } from '@playwright/test';

// Reading-comfort review shots for Block D, three widths in both schemes.
const shots = [
  { name: 'stack', path: '/stack' },
  { name: 'role', path: '/role' },
];
const widths = [390, 834, 1440];
const schemes = ['light', 'dark'] as const;

for (const scheme of schemes) {
  for (const shot of shots) {
    for (const width of widths) {
      test(`screenshot ${shot.name} ${width} ${scheme}`, async ({ page }) => {
        // Reduced motion keeps the reveal-on-scroll content fully painted, so a
        // full-page capture shows every section rather than the pre-reveal state.
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
        await page.setViewportSize({ width, height: 1200 });
        await page.goto(shot.path);
        await page.waitForLoadState('networkidle');
        await page.screenshot({
          path: `tests/__screenshots__/D/${shot.name}-${width}-${scheme}.png`,
          fullPage: true,
        });
      });
    }
  }
}
