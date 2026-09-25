// ai-governance-pillar.spec.ts: the /ai-governance pillar page (the head term
// "AI governance") and the hub-and-spoke links into it. The page itself is
// checked in the browser (one H1, the byline with its dates, the length, the
// tables, the figure, the structured data); the source Markdown is checked in
// Node against the house citation rules (STYLEGUIDE.md §6), like the chapters
// in source-integrity.spec.ts; the sitemap and the inbound links are read from
// the built pages the preview server serves.
import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { readSource } from '../src/lib/md-parse';

// Loosely typed: the parsed JSON-LD graph is external data, walked by key.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonLdNode = Record<string, any>;

// Hardcoded on purpose, like seo-schema.spec.ts: a test that imported the
// constants it asserts on would pass however they drifted.
const SITE_ORIGIN = 'https://aigovernanceengineer.com';
const PATH = '/ai-governance';
const SOURCE = 'guides/ai-governance.md';
const TITLE = 'What is AI governance? Definition, frameworks, examples';
const H1 = 'What is AI governance?';
const AUTHOR = 'Jorge García Aibar';
const MIN_WORDS = 4500;
const MIN_TABLES = 5;

async function graphOf(page: Page): Promise<JsonLdNode[]> {
  const scripts = page.locator('script[type="application/ld+json"]');
  await expect(scripts).toHaveCount(1);
  const data = JSON.parse((await scripts.first().textContent()) as string) as JsonLdNode;
  return data['@graph'] as JsonLdNode[];
}

test.describe('the pillar page', () => {
  test.beforeEach(async ({ page }) => {
    const res = await page.goto(PATH);
    expect(res?.status()).toBe(200);
  });

  test('has its search title, one question H1 and a canonical of its own', async ({ page }) => {
    await expect(page).toHaveTitle(TITLE);
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText(H1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `${SITE_ORIGIN}${PATH}`,
    );
  });

  test('opens with the answer box, then a visible, dated byline', async ({ page }) => {
    const answer = page.locator('.chapter-header .lede');
    await expect(answer).toContainText('AI governance is the set of rules, roles');
    const words = ((await answer.textContent()) ?? '').trim().split(/\s+/).length;
    expect(words, `answer box is ${words} words`).toBeGreaterThanOrEqual(40);
    expect(words, `answer box is ${words} words`).toBeLessThanOrEqual(60);

    const byline = page.getByTestId('byline');
    await expect(byline).toContainText(`By ${AUTHOR}`);
    await expect(byline.getByRole('link', { name: AUTHOR })).toHaveAttribute('href', '/about');
    const times = byline.locator('time');
    await expect(times).toHaveCount(2);
    for (const datetime of await times.evaluateAll((els) =>
      els.map((el) => el.getAttribute('datetime') ?? ''),
    )) {
      expect(datetime).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  test(`runs to at least ${MIN_WORDS} words with ${MIN_TABLES} tables and a figure`, async ({
    page,
  }) => {
    const article = page.locator('article.prose');
    const text = (await article.evaluate((el) => {
      const clone = el.cloneNode(true) as HTMLElement;
      clone.querySelectorAll('svg, figure').forEach((node) => node.remove());
      return clone.textContent ?? '';
    })) as string;
    const words = text.split(/\s+/).filter((word) => /[A-Za-z0-9]/.test(word)).length;
    expect(words, `the pillar body is ${words} words`).toBeGreaterThanOrEqual(MIN_WORDS);

    expect(await article.locator('table').count()).toBeGreaterThanOrEqual(MIN_TABLES);
    await expect(article.locator('figure')).toHaveCount(1);
  });

  test('asks its sections as questions and closes with a numbered source list', async ({
    page,
  }) => {
    const h2s = await page.locator('article.prose h2').allTextContents();
    const questions = h2s.filter((text) => text.trim().endsWith('?'));
    expect(questions.length, h2s.join(' | ')).toBeGreaterThanOrEqual(10);
    expect(h2s.map((t) => t.trim())).toContain('Frequently asked questions');
    await expect(page.locator('article.prose h3')).toHaveCount(6);
    const sources = page.locator('ol.sources > li');
    expect(await sources.count()).toBeGreaterThanOrEqual(20);
  });

  test('is a TechArticle about the glossary term "AI governance", with no FAQPage', async ({
    page,
  }) => {
    const graph = await graphOf(page);
    const types = graph.map((node) => node['@type']);
    expect(types).not.toContain('FAQPage');

    const article = graph.find((node) => node['@type'] === 'TechArticle');
    expect(article).toBeTruthy();
    expect(article?.headline).toBe(TITLE);
    expect(article?.url).toBe(`${SITE_ORIGIN}${PATH}`);
    expect(article?.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(article?.dateModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(article?.mentions?.length).toBeGreaterThanOrEqual(4);

    const person = graph.find((node) => node['@type'] === 'Person');
    expect(person?.name).toBe(AUTHOR);
    expect(article?.author).toEqual([{ '@id': person?.['@id'] }]);

    const term = graph.find((node) => node['@type'] === 'DefinedTerm');
    expect(term?.name).toBe('AI governance');
    expect(term?.['@id']).toBe(`${SITE_ORIGIN}/glossary/ai-governance#term`);
    expect(article?.about).toEqual({ '@id': term?.['@id'] });
    const set = graph.find((node) => node['@type'] === 'DefinedTermSet');
    expect(term?.inDefinedTermSet?.['@id']).toBe(`${SITE_ORIGIN}/bok/glossary#glossary`);
    expect(set?.['@id']).toBe(term?.inDefinedTermSet?.['@id']);

    const crumbs = graph.find((node) => node['@type'] === 'BreadcrumbList');
    expect(crumbs?.itemListElement?.at(-1)?.name).toBe(H1);
  });
});

test('the pillar is in the sitemap with a lastmod', async ({ request }) => {
  const xml = await (await request.get('/sitemap-0.xml')).text();
  const entry = new RegExp(
    `<url><loc>${SITE_ORIGIN}${PATH}</loc><lastmod>\\d{4}-\\d{2}-\\d{2}`,
  );
  expect(xml).toMatch(entry);
});

test.describe('hub and spoke', () => {
  test('the main navigation leads with the pillar in Practice', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header.site-header');
    await expect(header.locator(`a[href="${PATH}"]`).first()).toBeAttached();
  });

  test('the navigation points the reading list at its canonical chapter', async ({ page }) => {
    // /resources/reading-list is a filtered view that canonicalises to the
    // chapter; the sitewide header and footer must not link it.
    await page.goto('/');
    for (const chrome of ['header.site-header', 'footer']) {
      await expect(page.locator(`${chrome} a[href="/resources/reading-list"]`)).toHaveCount(0);
    }
    await expect(page.locator('header.site-header a[href="/bok/reading-list"]').first()).toBeAttached();
  });

  for (const from of ['/', '/bok/definition', '/role', '/stack', '/glossary/ai-governance']) {
    test(`${from} links to the pillar`, async ({ page }) => {
      await page.goto(from);
      await expect(page.locator(`main a[href="${PATH}"]`).first()).toBeAttached();
    });
  }

  test('the glossary term sends readers to the pillar', async ({ page }) => {
    await page.goto('/bok/glossary');
    const entry = page.locator('#t-ai-governance');
    await expect(entry).toContainText('AI governance.');
    await expect(entry.locator(`a[href="${PATH}"]`)).toHaveCount(1);
  });
});

test.describe('source file', () => {
  const lines = readSource(SOURCE).split(/\r?\n/);
  const at = lines.findIndex((line) => line.trim() === '## Sources');
  const body = lines.slice(0, at).join('\n');
  const entries = lines
    .slice(at + 1)
    .map((line) => /^\[(\d+)\] .*?(https?:\/\/\S+) \(verified: (primary|secondary|reported)\)\s*$/.exec(line))
    .filter((m): m is RegExpExecArray => m !== null)
    .map((m) => ({ n: Number(m[1]), url: m[2] }));

  test('every citation resolves, every source is cited, numbered 1..N', () => {
    expect(at).toBeGreaterThan(0);
    expect(entries.map((e) => e.n)).toEqual(entries.map((_, i) => i + 1));
    const cited = new Set([...body.matchAll(/\[(\d+)\]/g)].map((m) => Number(m[1])));
    for (const n of cited) expect(n, `[${n}] has a source`).toBeLessThanOrEqual(entries.length);
    for (const e of entries) expect(cited.has(e.n), `source [${e.n}] is cited`).toBe(true);
  });

  test('EU law is cited on EUR-Lex with EUR-Lex anchors, and no em dash anywhere', () => {
    for (const { url } of entries) {
      expect(url).not.toMatch(/artificialintelligenceact\.eu|gdpr-info\.eu/);
      const anchor = /eur-lex\.europa\.eu\/.*#(.+)$/.exec(url)?.[1];
      if (anchor) expect(anchor).toMatch(/^(art|anx|rct)_\d+/);
    }
    expect(readSource(SOURCE)).not.toContain('—');
  });
});
