// seo-basics.spec.ts: the head-metadata checks Lighthouse's SEO category makes,
// asserted as a blocking suite. The `Lighthouse CI` step in .github/workflows/ci.yml
// is `continue-on-error: true` (its performance audit flakes), so an SEO regression
// would otherwise land unnoticed; these assertions run in the `default` Playwright
// project, i.e. under plain `npm test`.
//
// The route list is read from lighthouserc.cjs so the two stay in lockstep, plus
// /es/thesis, which Lighthouse does not audit but which carries the reciprocal
// hreflang pair with /thesis.
import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import lighthouserc from '../lighthouserc.cjs';

// Mirrors src/data/site.ts. Hardcoded on purpose: a test that imported the same
// constant it asserts on would pass however the value drifted.
const SITE_ORIGIN = 'https://aigovernanceengineer.com';
const SITE_NAME = 'AI Governance Engineer';
const SITE_NAME_RE = new RegExp(`\\b${SITE_NAME}\\b`, 'g');

const MAX_TITLE = 70;
const MIN_DESCRIPTION = 50;
const MAX_DESCRIPTION = 160;

const paths: string[] = [
  ...lighthouserc.ci.collect.url.map((url: string) => new URL(url).pathname),
  '/es/thesis',
];

/** `content` of every matching meta tag, in document order. */
async function metaContents(page: Page, selector: string): Promise<string[]> {
  return page
    .locator(selector)
    .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('content') ?? ''));
}

/** The one canonical URL each page is expected to declare. */
function canonicalFor(path: string): string {
  return path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
}

for (const path of paths) {
  test.describe(`seo ${path}`, () => {
    test('one title, within budget, without a repeated site name', async ({ page }) => {
      await page.goto(path);

      // `head > title`, not `title`: inline SVGs carry <title> elements of their own.
      const titles = await page.locator('head > title').allTextContents();
      expect(titles).toHaveLength(1);

      const title = titles[0].trim();
      expect(title.length).toBeGreaterThan(0);
      expect(title.length, `title is ${title.length} chars: ${title}`).toBeLessThanOrEqual(
        MAX_TITLE,
      );

      // Word-bounded: "The AI Governance Engineering Thesis" must not count as an
      // occurrence of "AI Governance Engineer".
      const repeats = title.match(SITE_NAME_RE)?.length ?? 0;
      expect(repeats, `"${SITE_NAME}" appears ${repeats}× in: ${title}`).toBeLessThanOrEqual(1);
    });

    test('one meta description of a snippet-sized length', async ({ page }) => {
      await page.goto(path);

      const descriptions = await metaContents(page, 'meta[name="description"]');
      expect(descriptions).toHaveLength(1);

      const description = descriptions[0].trim();
      expect(
        description.length,
        `description is ${description.length} chars: ${description}`,
      ).toBeGreaterThanOrEqual(MIN_DESCRIPTION);
      expect(
        description.length,
        `description is ${description.length} chars: ${description}`,
      ).toBeLessThanOrEqual(MAX_DESCRIPTION);
    });

    test('one absolute, extensionless canonical matching the page', async ({ page }) => {
      await page.goto(path);

      const canonicals = await page
        .locator('link[rel="canonical"]')
        .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('href') ?? ''));
      expect(canonicals).toHaveLength(1);

      const canonical = canonicals[0];
      expect(canonical.startsWith(SITE_ORIGIN)).toBe(true);
      expect(canonical).not.toContain('.html');
      // trailingSlash: 'never', so only the root keeps its slash.
      if (path !== '/') expect(canonical.endsWith('/')).toBe(false);
      expect(canonical).toBe(canonicalFor(path));
    });

    test('indexable, responsive and language-tagged', async ({ page }) => {
      await page.goto(path);

      const viewports = await metaContents(page, 'meta[name="viewport"]');
      expect(viewports).toHaveLength(1);
      expect(viewports[0]).toContain('width=device-width');

      // These pages are all meant to be indexed; a stray robots meta would be a bug.
      const robots = await metaContents(page, 'meta[name="robots"]');
      for (const value of robots) expect(value.toLowerCase()).not.toContain('noindex');

      const lang = await page.locator('html').getAttribute('lang');
      expect(lang).toBe(path.startsWith('/es/') ? 'es' : 'en');
    });

    test('social card metadata is complete', async ({ page }) => {
      await page.goto(path);

      for (const property of ['og:title', 'og:description', 'og:url']) {
        const values = await metaContents(page, `meta[property="${property}"]`);
        expect(values, `missing ${property}`).toHaveLength(1);
        expect(values[0].trim().length, `empty ${property}`).toBeGreaterThan(0);
      }

      const images = await metaContents(page, 'meta[property="og:image"]');
      expect(images).toHaveLength(1);
      expect(images[0].startsWith('https://')).toBe(true);

      const cards = await metaContents(page, 'meta[name="twitter:card"]');
      expect(cards).toHaveLength(1);
      expect(cards[0].trim().length).toBeGreaterThan(0);
    });

    test('declares a theme colour', async ({ page }) => {
      await page.goto(path);

      const themeColors = await metaContents(page, 'meta[name="theme-color"]');
      expect(themeColors.length).toBeGreaterThan(0);
      for (const value of themeColors) expect(value.trim().length).toBeGreaterThan(0);
    });

    test('internal links are extensionless', async ({ page }) => {
      await page.goto(path);

      // build.format is 'file', but the served URLs are clean; a `.html` href in
      // the markup would split an Astro route into two indexable URLs. The
      // standalone archify viewers under /diagrams/ are real static files shipped
      // from public/, so they keep their extension (a11y.spec.ts skips them too).
      const hrefs = await page
        .locator('a[href^="/"]')
        .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('href') ?? ''));
      const withExtension = hrefs
        .filter((href) => !href.startsWith('/diagrams/'))
        .filter((href) => href.split(/[?#]/)[0].endsWith('.html'));
      expect(withExtension, `\`.html\` hrefs on ${path}`).toEqual([]);
    });
  });
}

test.describe('hreflang', () => {
  const EXPECTED: Record<string, string> = {
    en: `${SITE_ORIGIN}/thesis`,
    es: `${SITE_ORIGIN}/es/thesis`,
    'x-default': `${SITE_ORIGIN}/thesis`,
  };

  async function alternates(page: Page, path: string): Promise<Record<string, string>> {
    await page.goto(path);
    const pairs = await page
      .locator('link[rel="alternate"][hreflang]')
      .evaluateAll((nodes) =>
        nodes.map((node) => [node.getAttribute('hreflang') ?? '', node.getAttribute('href') ?? '']),
      );
    return Object.fromEntries(pairs);
  }

  test('/thesis and /es/thesis point at each other', async ({ page }) => {
    const english = await alternates(page, '/thesis');
    const spanish = await alternates(page, '/es/thesis');

    for (const found of [english, spanish]) {
      expect(Object.keys(found).sort()).toEqual(['en', 'es', 'x-default']);
      expect(found).toEqual(EXPECTED);
    }

    // Reciprocity: each page's own canonical is among the alternates it lists.
    expect(Object.values(english)).toContain(canonicalFor('/thesis'));
    expect(Object.values(spanish)).toContain(canonicalFor('/es/thesis'));
  });
});
