// stack-role.spec.ts: Block D, the /stack and /role landing pages.
// Structural assertions (panel/row/workflow/step counts, sourced stat tiles),
// a check that every chapter back-link resolves to a real #id in its target
// /bok page, and reading-comfort screenshots into tests/__screenshots__/D/.

import { test, expect } from '@playwright/test';
import { assertChapterLinksResolve } from './helpers/links';

test.describe('/stack', () => {
  test('shows five layer panels', async ({ page }) => {
    await page.goto('/stack');
    await expect(page.locator('.layer-panel')).toHaveCount(5);
  });

  test('has a tools table with at least 15 rows', async ({ page }) => {
    await page.goto('/stack');
    const table = page.locator('table.tools-table');
    await expect(table).toBeVisible();
    expect(await table.locator('tbody tr').count()).toBeGreaterThanOrEqual(15);
  });

  test('every chapter link resolves to a real anchor', async ({ page }) => {
    await assertChapterLinksResolve(page, '/stack');
  });

  // Hard constraint #2 (audit STK-1): an inactive band of the layer-flow SVG
  // recedes by colour, never by opacity on its text, and that text (SVG, which
  // axe does not check) stays AA over the paler band, in both themes.
  for (const scheme of ['light', 'dark'] as const) {
    test(`inactive flow bands keep AA text with no opacity on it (${scheme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/stack');
      await expect(page.locator('.flow.flow-js.has-active')).toHaveCount(1);

      const report = await page.locator('svg.flow-svg').evaluate((svg) => {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
        // Any CSS colour string (rgb(), color(srgb …), …) to [r, g, b, a].
        const rgba = (css: string): number[] => {
          ctx.fillStyle = '#010203';
          ctx.fillStyle = css;
          if (ctx.fillStyle === '#010203' && css !== 'rgb(1, 2, 3)') {
            throw new Error(`unparsed colour: ${css}`);
          }
          ctx.clearRect(0, 0, 1, 1);
          ctx.fillRect(0, 0, 1, 1);
          const d = ctx.getImageData(0, 0, 1, 1).data;
          return [d[0], d[1], d[2], d[3] / 255];
        };
        const blend = (top: number[], alpha: number, under: number[]): number[] =>
          [0, 1, 2].map((i) => top[i] * alpha + under[i] * (1 - alpha));
        const lum = (c: number[]): number => {
          const [r, g, b] = c.map((v) => {
            const s = v / 255;
            return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
          });
          return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        };
        const ratio = (a: number[], b: number[]): number => {
          const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
          return (hi + 0.05) / (lo + 0.05);
        };
        // Product of opacity from an element up to (and including) the <svg>.
        const chainOpacity = (el: Element): number => {
          let o = 1;
          for (let n: Element | null = el; n; n = n.parentElement) {
            o *= Number(getComputedStyle(n).opacity);
            if (n === svg) break;
          }
          return o;
        };
        // The page colour behind the diagram: the first opaque ancestor.
        let pageBg = [255, 255, 255, 1];
        for (let n: Element | null = svg.parentElement; n; n = n.parentElement) {
          const c = rgba(getComputedStyle(n).backgroundColor);
          if (c[3] > 0) {
            pageBg = c;
            break;
          }
        }

        const inactive = [...svg.querySelectorAll('.band[data-band]:not(.is-active)')];
        const texts = inactive.flatMap((band) => {
          const rect = band.querySelector('.band-rect')!;
          const fill = rgba(getComputedStyle(rect).fill);
          const under = blend(fill, fill[3] * chainOpacity(rect), pageBg);
          return [...band.querySelectorAll('text')].map((text) => ({
            text: text.textContent?.trim() ?? '',
            opacity: chainOpacity(text),
            ratio: ratio(rgba(getComputedStyle(text).fill), under),
          }));
        });
        return { bands: inactive.length, texts };
      });

      expect(report.bands).toBe(4);
      expect(report.texts.length).toBe(8);
      for (const t of report.texts) {
        expect(t.opacity, `opacity on "${t.text}"`).toBe(1);
        expect(t.ratio, `contrast of "${t.text}"`).toBeGreaterThanOrEqual(4.5);
      }
    });
  }
});

test.describe('/role', () => {
  test('shows seven workflow items', async ({ page }) => {
    await page.goto('/role');
    await expect(page.locator('.workflow-item')).toHaveCount(7);
  });

  test('has a contrast table', async ({ page }) => {
    await page.goto('/role');
    await expect(page.locator('.contrast')).toBeVisible();
  });

  test('shows five maturity steps', async ({ page }) => {
    await page.goto('/role');
    await expect(page.locator('.maturity-step')).toHaveCount(5);
  });

  test('every stat tile carries a source', async ({ page }) => {
    await page.goto('/role');
    const tiles = page.locator('.stats .tile');
    const count = await tiles.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const source = await tiles.nth(i).locator('.source').innerText();
      expect(source.trim().length).toBeGreaterThan(0);
    }
  });

  test('every chapter link resolves to a real anchor', async ({ page }) => {
    await assertChapterLinksResolve(page, '/role');
  });
});

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
