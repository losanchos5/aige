import { test } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

// Block G design review shots (excluded from the acceptance run by the
// "screenshot" grep). 1440x900 viewport (not full page), reduced motion, both
// colour schemes, with localStorage.theme pinned so the explicit-toggle path is
// exercised, not just the media query. Written to tests/__screenshots__/G/.
const DIR = join('tests', '__screenshots__', 'G');
const schemes = ['dark', 'light'] as const;
const pages = [
  { name: 'home', path: '/' },
  { name: 'the-stack', path: '/bok/the-stack' },
  { name: 'stack', path: '/stack' },
  { name: 'role', path: '/role' },
  { name: 'frameworks', path: '/resources/frameworks' },
  { name: 'glossary', path: '/resources/glossary' },
  { name: 'path', path: '/path' },
];

test.beforeAll(() => mkdirSync(DIR, { recursive: true }));

for (const scheme of schemes) {
  for (const shot of pages) {
    test(`screenshot ${shot.name} ${scheme}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
      await page.addInitScript((s) => {
        try {
          localStorage.setItem('theme', s);
        } catch {
          /* ignore */
        }
      }, scheme);
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(shot.path);
      await page.waitForLoadState('networkidle');
      await page.screenshot({ path: join(DIR, `${shot.name}-${scheme}.png`) });
    });
  }
}

// Targeted below-the-fold shots in dark, where the trickiest surfaces live.
const spots = [
  { name: 'home-stack', path: '/', sel: '.diagram-int' },
  { name: 'home-cta', path: '/', sel: '.band' },
  { name: 'home-verdict', path: '/', sel: '.verdict-beat' },
  { name: 'stack-citations', path: '/bok/the-stack', sel: 'a.cite' },
];

for (const scheme of schemes) {
  for (const spot of spots) {
    test(`screenshot spot ${spot.name} ${scheme}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
      await page.addInitScript((s) => {
        try {
          localStorage.setItem('theme', s);
        } catch {
          /* ignore */
        }
      }, scheme);
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(spot.path);
      await page.waitForLoadState('networkidle');
      const el = page.locator(spot.sel).first();
      await el.scrollIntoViewIfNeeded();
      await page.screenshot({ path: join(DIR, `spot-${spot.name}-${scheme}.png`) });
    });
  }
}
