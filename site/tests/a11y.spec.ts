// a11y.spec.ts: axe-core sweep over every built route (dist/**/*.html, minus
// the /og image endpoints and the third-party archify viewers under
// /diagrams/, which ship their own styles), in light and dark, at 1440 and 390. The gate is
// zero violations of impact serious/critical; moderate/minor findings are
// reported to the console for follow-up but do not fail the run.
//
// Lives in the `a11y` Playwright project (see playwright.config.ts) so it is
// kept out of the default `npm test`; run it with `npm run test:a11y`.
//
// Sampling: a parent path below the root with more than SAMPLE_OVER pages (the glossary terms,
// the obligation pages) is one template filled from data, so axe on every page
// re-checks the same markup. Unless A11Y_FULL=1, such a group is reduced to its
// largest pages (the ones rendering the most optional sections), its smallest
// page and every SAMPLE_STRIDE-th page. CI sets A11Y_FULL=1 on pushes to main,
// which do not gate the deploy, so every page is still swept after each merge.
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

const SAMPLE_OVER = 40;
const SAMPLE_STRIDE = 20;
const SAMPLE_LARGEST = 3;
const FULL = process.env.A11Y_FULL === '1';

const pages = htmlFiles(DIST)
  .map((file) => ({ route: toRoute(file), size: statSync(file).size }))
  .filter(({ route }) => !route.startsWith('/og/') && !route.startsWith('/diagrams/'))
  .sort((a, b) => a.route.localeCompare(b.route));

/** Keeps every page, or a deterministic sample of each large data-filled group. */
function sample(all: typeof pages): string[] {
  if (FULL) return all.map((p) => p.route);
  const groups = new Map<string, typeof pages>();
  for (const p of all) {
    const parent = p.route.slice(0, p.route.lastIndexOf('/')) || '/';
    groups.set(parent, [...(groups.get(parent) ?? []), p]);
  }
  const keep = new Set<string>();
  for (const [parent, group] of groups) {
    // Top-level pages are each their own template: never sampled.
    if (parent === '/' || group.length <= SAMPLE_OVER) {
      group.forEach((p) => keep.add(p.route));
      continue;
    }
    const bySize = [...group].sort((a, b) => b.size - a.size || a.route.localeCompare(b.route));
    bySize.slice(0, SAMPLE_LARGEST).forEach((p) => keep.add(p.route));
    keep.add(bySize[bySize.length - 1].route);
    group.forEach((p, i) => i % SAMPLE_STRIDE === 0 && keep.add(p.route));
  }
  return all.map((p) => p.route).filter((r) => keep.has(r));
}

const routes = sample(pages);

const schemes = ['light', 'dark'] as const;
const widths = [1440, 390];

for (const route of routes) {
  for (const scheme of schemes) {
    for (const width of widths) {
      test(`a11y ${route} ${scheme} ${width}`, async ({ page }) => {
        // reducedMotion: axe must judge the settled page, not mid-reveal opacity.
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
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
          .map((v) => `${v.id} [${v.impact}] ${v.help}: ${v.nodes.length} node(s)`)
          .join('\n');
        expect(serious, `serious/critical a11y violations on ${route} ${scheme} ${width}:\n${detail}`).toEqual(
          [],
        );
      });
    }
  }
}
