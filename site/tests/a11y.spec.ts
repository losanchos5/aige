// a11y.spec.ts: axe-core sweep over every built route (dist/**/*.html, minus
// the /og image endpoints and the third-party archify viewers under
// /diagrams/, which ship their own styles), in light and dark, at 1440 and 390. The gate is
// zero violations of impact serious/critical; moderate/minor findings are
// reported to the console for follow-up but do not fail the run.
//
// Lives in the `a11y` Playwright project (see playwright.config.ts) so it is
// kept out of the default `npm test`; run it with `npm run test:a11y`.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

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

/** Map a dist HTML file to the route the preview server serves it at. */
function toRoute(file: string): string {
  let route = file.replace(/\\/g, '/').replace(new RegExp(`^${DIST}/`), '/');
  route = route.replace(/\.html$/, '');
  if (route.endsWith('/index')) route = route.slice(0, -'/index'.length);
  return route === '' ? '/' : route;
}

const routes = htmlFiles(DIST)
  .map(toRoute)
  .filter((route) => !route.startsWith('/og/') && !route.startsWith('/diagrams/'))
  .sort();

const schemes = ['light', 'dark'] as const;
const widths = [1440, 390];

for (const route of routes) {
  for (const scheme of schemes) {
    for (const width of widths) {
      test(`a11y ${route} ${scheme} ${width}`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme });
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route);
        await page.waitForLoadState('domcontentloaded');

        const results = await new AxeBuilder({ page }).analyze();

        const serious = results.violations.filter(
          (v) => v.impact === 'serious' || v.impact === 'critical',
        );
        const moderate = results.violations.filter(
          (v) => v.impact === 'moderate' || v.impact === 'minor',
        );
        if (moderate.length) {
          const summary = moderate.map((v) => `${v.id} (${v.impact}, ${v.nodes.length})`).join(', ');
          console.log(`[a11y moderate] ${route} ${scheme} ${width}: ${summary}`);
        }

        const detail = serious
          .map((v) => `${v.id} [${v.impact}] ${v.help} — ${v.nodes.length} node(s)`)
          .join('\n');
        expect(serious, `serious/critical a11y violations on ${route} ${scheme} ${width}:\n${detail}`).toEqual(
          [],
        );
      });
    }
  }
}
