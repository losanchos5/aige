// chart-phone.spec.ts: on a 320 px screen every chart a phone shows keeps its
// text at 12 px or more and stays inside the screen (OpenSpec page-visuals-2,
// "Texto legible en la variante estrecha"). Chart.astro already fails the
// build from the SVG alone, assuming the canvas a 320 px screen gives
// (CANVAS_320) and how far a narrow variant may grow; this checks the real
// rendering, so a change to the frame's padding, the switch points or the
// cap that breaks those assumptions fails here. The pages are the built ones
// that hold a wide/narrow pair (read from dist): every page outside the
// per-item collections, and the first two of each collection.
import { test, expect } from '@playwright/test';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = 'dist';

function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return name.endsWith('.html') ? [path] : [];
  });
}

const withPair = htmlFiles(DIST)
  .filter((file) => readFileSync(file, 'utf8').includes('chart-pair'))
  .map((file) => '/' + relative(DIST, file).split(sep).join('/').replace(/(\/index)?\.html$/, ''))
  .sort();
const COLLECTIONS = ['/obligations/', '/controls/', '/patterns/', '/glossary/', '/cases/'];
const collectionOf = (route: string) => COLLECTIONS.find((c) => route.startsWith(c));
const ROUTES = withPair.filter((route) => {
  const c = collectionOf(route);
  return !c || withPair.filter((r) => collectionOf(r) === c).indexOf(route) < 2;
});

test('the site has pages with a wide/narrow chart pair to check', () => {
  expect(ROUTES.length).toBeGreaterThan(10);
});

for (const route of ROUTES) {
  test(`${route} at 320 px: chart text at 12 px or more, no chart wider than the screen`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto(route);
    const m = await page.evaluate(() => {
      const small: string[] = [];
      const wide: string[] = [];
      let shown = 0;
      const screen = document.documentElement.clientWidth;
      for (const fig of document.querySelectorAll('figure.chart-fig')) {
        if (fig.getBoundingClientRect().right > screen + 0.5) wide.push(fig.querySelector('.chart-title')?.textContent ?? '');
        for (const svg of fig.querySelectorAll<SVGSVGElement>('.chart-canvas svg')) {
          const width = svg.getBoundingClientRect().width;
          if (!width || svg.closest('.chart-scroll')) continue;
          shown += 1;
          const scale = width / svg.viewBox.baseVal.width;
          for (const t of svg.querySelectorAll('text')) {
            if (!t.textContent?.trim()) continue;
            const px = parseFloat(getComputedStyle(t).fontSize) * scale;
            if (px < 11.995) small.push(`${t.textContent.trim().slice(0, 40)} (${px.toFixed(2)} px)`);
          }
        }
      }
      return { small, wide, shown };
    });
    expect(m.shown, 'a chart is shown').toBeGreaterThan(0);
    expect(m.small, 'text under 12 px').toEqual([]);
    expect(m.wide, 'charts wider than the screen').toEqual([]);
  });
}
