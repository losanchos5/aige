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

// Every Open Graph card the site ships is a 1200x630 PNG (src/pages/og/[...slug].png.ts).
const OG_IMAGE_WIDTH = '1200';
const OG_IMAGE_HEIGHT = '630';
const OG_IMAGE_TYPE = 'image/png';

// The text printed on the section cards (lib/og-cards.ts). A page on one of
// them whose title differs from the card's describes the card, not itself.
const SHARED_CARDS: Record<string, string> = {
  '/og/default.png': 'AI Governance Engineering',
  '/og/thesis.png': 'The Thesis',
  '/og/bok.png': 'Body of Knowledge',
  '/og/role.png': 'The AI Governance Engineer',
  '/og/stack.png': 'The five-layer stack',
  '/og/path.png': 'The AIGE learning path',
  '/og/resources.png': 'Resources & reading list',
  '/og/map.png': 'The map of the discipline',
  '/og/about.png': 'About this site',
  '/og/toolkit.png': 'Toolkit: governance tools in your browser',
  '/og/obligations.png': 'The obligation register',
  '/og/figures.png': 'Figures of the Body of Knowledge',
  '/og/data.png': 'Open data and API',
  '/og/mcp.png': 'The Body of Knowledge in your AI assistant',
  '/og/for.png': 'Routes by audience',
  '/og/bok-patterns.png': '05. Patterns',
  '/og/bok-glossary.png': '09. Glossary',
  '/og/bok-governing-agents.png': '23. Governing AI agents',
};

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

    test('the social card declares its alt text and its dimensions', async ({ page }) => {
      await page.goto(path);

      // Every card is a 1200x630 PNG built by src/pages/og/[...slug].png.ts, and
      // the scrapers that pre-allocate the card read these three before fetching.
      const dimensions: Record<string, string> = {
        'og:image:width': OG_IMAGE_WIDTH,
        'og:image:height': OG_IMAGE_HEIGHT,
        'og:image:type': OG_IMAGE_TYPE,
      };
      for (const [property, expected] of Object.entries(dimensions)) {
        const values = await metaContents(page, `meta[property="${property}"]`);
        expect(values, `missing ${property}`).toHaveLength(1);
        expect(values[0]).toBe(expected);
      }

      // Alt text on both cards, and the two agree.
      const ogAlt = await metaContents(page, 'meta[property="og:image:alt"]');
      expect(ogAlt, 'missing og:image:alt').toHaveLength(1);
      expect(ogAlt[0].trim().length).toBeGreaterThan(0);

      const twitterAlt = await metaContents(page, 'meta[name="twitter:image:alt"]');
      expect(twitterAlt, 'missing twitter:image:alt').toHaveLength(1);
      expect(twitterAlt[0]).toBe(ogAlt[0]);

      // A card rendered for the page shows its title, so the alt is the page
      // title; a shared section card is described by its own text instead.
      const titles = await page.locator('head > title').allTextContents();
      const image = (await metaContents(page, 'meta[property="og:image"]'))[0];
      const shared = SHARED_CARDS[new URL(image).pathname];
      if (shared && ogAlt[0] !== titles[0].trim()) {
        expect(ogAlt[0]).toBe(`${shared} · ${SITE_NAME}`);
      } else {
        expect(ogAlt[0]).toBe(titles[0].trim());
      }
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

test.describe('og:type', () => {
  const ISO_DATE_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

  test('a dated long read is an article with its article:* dates and author', async ({ page }) => {
    await page.goto('/bok/the-stack');

    const types = await metaContents(page, 'meta[property="og:type"]');
    expect(types).toEqual(['article']);

    const published = await metaContents(page, 'meta[property="article:published_time"]');
    expect(published).toHaveLength(1);
    expect(published[0]).toMatch(ISO_DATE_TIME);

    const modified = await metaContents(page, 'meta[property="article:modified_time"]');
    expect(modified).toHaveLength(1);
    expect(modified[0]).toMatch(ISO_DATE_TIME);

    // The same full name as the JSON-LD Person node.
    const author = await metaContents(page, 'meta[property="article:author"]');
    expect(author).toEqual(['Jorge García Aibar']);
  });

  test('the Thesis translations are articles too', async ({ page }) => {
    for (const path of ['/thesis', '/es/thesis']) {
      await page.goto(path);
      expect(await metaContents(page, 'meta[property="og:type"]'), path).toEqual(['article']);
      const published = await metaContents(page, 'meta[property="article:published_time"]');
      expect(published[0], path).toMatch(ISO_DATE_TIME);
    }
  });

  test('a page that is not a dated read stays a website', async ({ page }) => {
    await page.goto('/stack');
    expect(await metaContents(page, 'meta[property="og:type"]')).toEqual(['website']);
    expect(await metaContents(page, 'meta[property="article:published_time"]')).toEqual([]);
  });
});

test.describe('visible dates', () => {
  test('a chapter renders its updated date in a <time datetime>', async ({ page }) => {
    await page.goto('/bok/the-stack');

    const time = page.locator('.ch-meta time[datetime]');
    await expect(time).toHaveCount(1);
    await expect(time).toHaveAttribute('datetime', /^\d{4}-\d{2}-\d{2}$/);
    // The machine-readable value is the text the reader sees.
    expect((await time.textContent())?.trim()).toBe(await time.getAttribute('datetime'));
  });
});

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
