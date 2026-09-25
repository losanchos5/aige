// ai-governance-pillar.spec.ts: the /ai-governance pillar page (the head term
// "AI governance") and the hub-and-spoke links into it. The page itself is
// checked in the browser (one H1, the byline with its dates, the length, the
// tables, the figure, the structured data); the source Markdown is checked in
// Node against the house citation rules (STYLEGUIDE.md §6), like the chapters
// in source-integrity.spec.ts; the sitemap and the inbound links are read from
// the built pages the preview server serves. The Markdown alternate
// (/ai-governance.md), the pillar's place in /llms.txt and /llms-full*.txt and
// its own Open Graph card are checked in "surfaces beyond the HTML".
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
const MIN_WORDS = 7000;
const MAX_WORDS = 8500;
const MIN_TABLES = 10;
const FAQ_QUESTIONS = 12;
// The "In short" paragraph under the answer box: a full answer on its own,
// in the 134-167 word band of the chapters' passages (GEO R3).
const IN_SHORT_MIN = 134;
const IN_SHORT_MAX = 167;
const OG_IMAGE = `${SITE_ORIGIN}/og/ai-governance.png`;
// Sections added after the post-launch audit (SXO-N1): each opens with a
// 40-60 word answer, the passage an answer engine quotes.
const ANSWER_FIRST = [
  'Which AI regulations apply by jurisdiction?',
  'How does AI governance apply to generative AI and LLMs?',
  'How does AI governance relate to AI security?',
  'What are the main challenges of AI governance?',
];

/** Words in a passage, counted like the page's wordCount (tokens with a letter or digit). */
function wordsIn(text: string): number {
  return text.split(/\s+/).filter((word) => /[A-Za-z0-9]/.test(word)).length;
}

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
    const text = ((await answer.textContent()) ?? '').trim();
    const words = text.split(/\s+/).length;
    expect(words, `answer box is ${words} words`).toBeGreaterThanOrEqual(40);
    expect(words, `answer box is ${words} words`).toBeLessThanOrEqual(60);
    // The definition itself comes first, as one short, quotable sentence (CONTENT-N4).
    const definition = text.split(/(?<=\.)\s+/)[0];
    expect(definition).toMatch(/^AI governance is /);
    expect(wordsIn(definition), definition).toBeLessThanOrEqual(25);

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

  test(`runs to ${MIN_WORDS}-${MAX_WORDS} words with ${MIN_TABLES} tables and a figure`, async ({
    page,
  }) => {
    const article = page.locator('article.prose');
    const text = (await article.evaluate((el) => {
      const clone = el.cloneNode(true) as HTMLElement;
      clone.querySelectorAll('svg, figure').forEach((node) => node.remove());
      return clone.textContent ?? '';
    })) as string;
    const words = wordsIn(text);
    expect(words, `the pillar body is ${words} words`).toBeGreaterThanOrEqual(MIN_WORDS);
    expect(words, `the pillar body is ${words} words`).toBeLessThanOrEqual(MAX_WORDS);

    expect(await article.locator('table').count()).toBeGreaterThanOrEqual(MIN_TABLES);
    await expect(article.locator('figure')).toHaveCount(1);
  });

  test('asks its sections as questions and closes with a numbered source list', async ({
    page,
  }) => {
    const h2s = (await page.locator('article.prose h2').allTextContents()).map((t) => t.trim());
    const questions = h2s.filter((text) => text.endsWith('?'));
    expect(questions.length, h2s.join(' | ')).toBeGreaterThanOrEqual(15);
    expect(h2s).toContain('Frequently asked questions');
    // No section heading repeats the H1 (CONTENT-N8, GEO-N6).
    expect(h2s).not.toContain(H1);
    await expect(page.locator('article.prose h3')).toHaveCount(FAQ_QUESTIONS);
    const sources = page.locator('ol.sources > li');
    expect(await sources.count()).toBeGreaterThanOrEqual(45);
  });

  test('opens each added section with a 40-60 word answer', async ({ page }) => {
    for (const heading of ANSWER_FIRST) {
      const h2 = page.locator('article.prose h2', { hasText: heading });
      await expect(h2, heading).toHaveCount(1);
      const first = (await h2.evaluate((el) => el.nextElementSibling?.textContent ?? '')) as string;
      const words = wordsIn(first);
      expect(words, `${heading} opens with ${words} words`).toBeGreaterThanOrEqual(40);
      expect(words, `${heading} opens with ${words} words`).toBeLessThanOrEqual(60);
    }
  });

  test('tables the regimes by jurisdiction and links the chapters behind them', async ({ page }) => {
    const h2 = page.locator('article.prose h2#which-ai-regulations-apply-by-jurisdiction');
    await expect(h2).toHaveCount(1);
    // The section runs from its H2 to the next one.
    const section = (await h2.evaluate((el) => {
      const nodes: string[] = [];
      for (let n = el.nextElementSibling; n && n.tagName !== 'H2'; n = n.nextElementSibling) {
        nodes.push(n.outerHTML);
      }
      return nodes.join('');
    })) as string;
    for (const jurisdiction of [
      'European Union',
      'United States (federal)',
      'United States (states)',
      'United Kingdom',
      'Canada',
      'China',
      'Singapore',
      'South Korea',
      'Brazil',
      'Council of Europe',
    ]) {
      expect(section, jurisdiction).toContain(`<td>${jurisdiction}</td>`);
    }
    expect(section).toContain('href="/bok/ai-laws-worldwide');
    expect(section).toContain('href="/bok/regulatory-map');
    expect(section).toContain('href="/obligations/');
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
    expect(article?.image).toBe(OG_IMAGE);

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

test.describe('surfaces beyond the HTML', () => {
  test('has its own Open Graph card', async ({ page, request }) => {
    await page.goto(PATH);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', OG_IMAGE);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', OG_IMAGE);
    const card = await request.get('/og/ai-governance.png');
    expect(card.status()).toBe(200);
    expect(card.headers()['content-type']).toContain('image/png');
  });

  test('has a Markdown twin, advertised from the page', async ({ page, request }) => {
    const res = await request.get(`${PATH}.md`);
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('text/markdown');
    const text = await res.text();
    expect(text.startsWith(`---\ntitle: "${H1}"\n`)).toBe(true);
    expect(text).toContain(`\ncanonical: ${SITE_ORIGIN}${PATH}\n`);
    expect(text).toMatch(/\nupdated: \d{4}-\d{2}-\d{2}\n---\n\n# What is AI governance\?\n/);
    expect(text).toContain('> AI governance is the set of rules, roles');
    expect(text).toContain('\n## Which AI regulations apply by jurisdiction?\n');
    expect(text).toContain('\n## Sources\n');
    expect(text).not.toContain('<html');
    expect(text).not.toContain('\u2014');

    await page.goto(PATH);
    const link = page.locator('head link[rel="alternate"][type="text/markdown"]');
    await expect(link).toHaveCount(1);
    await expect(link).toHaveAttribute('href', `${PATH}.md`);
  });

  test('leads llms.txt with its Markdown link and opens the full-text corpus', async ({
    request,
  }) => {
    const index = await (await request.get('/llms.txt')).text();
    expect(index).toContain(`(${SITE_ORIGIN}${PATH}): `);
    expect(index).toContain(`Markdown: ${SITE_ORIGIN}${PATH}.md`);
    for (const file of ['/llms-full.txt', '/llms-full-bok.txt']) {
      const text = await (await request.get(file)).text();
      const block = `# ${H1}\n\nSource: ${SITE_ORIGIN}${PATH}\n`;
      expect(text, file).toContain(block);
      // The first document of the file, before any chapter.
      expect(text.indexOf(block), file).toBeLessThan(text.indexOf(`Source: ${SITE_ORIGIN}/bok/`));
    }
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

  test(`the In short paragraph runs to ${IN_SHORT_MIN}-${IN_SHORT_MAX} words`, () => {
    const paragraph = body
      .split(/\r?\n\s*\r?\n/)
      .find((block) => block.trimStart().startsWith('**In short.**'));
    expect(paragraph, 'an **In short.** paragraph').toBeDefined();
    const text = paragraph!
      .replace('**In short.**', '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\[\d+\]/g, '');
    const words = wordsIn(text);
    expect(words, `In short is ${words} words`).toBeGreaterThanOrEqual(IN_SHORT_MIN);
    expect(words, `In short is ${words} words`).toBeLessThanOrEqual(IN_SHORT_MAX);
  });

  test('every citation resolves, every source is cited, numbered 1..N', () => {
    expect(at).toBeGreaterThan(0);
    expect(entries.map((e) => e.n)).toEqual(entries.map((_, i) => i + 1));
    const cited = new Set([...body.matchAll(/\[(\d+)\]/g)].map((m) => Number(m[1])));
    for (const n of cited) expect(n, `[${n}] has a source`).toBeLessThanOrEqual(entries.length);
    for (const e of entries) expect(cited.has(e.n), `source [${e.n}] is cited`).toBe(true);
  });

  test('keeps sentences short and cites one OWASP edition', () => {
    // Prose only: paragraphs and list items, not tables, headings or quotes.
    const prose = body
      .split(/\r?\n\s*\r?\n/)
      .filter((block) => !/^\s*[|#>]/.test(block))
      .join(' ')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\[\d+\]/g, '')
      .replace(/\s+/g, ' ');
    const sentences = prose.split(/(?<=[.?!])\s+(?=[A-Z("])/).filter((s) => wordsIn(s) > 0);
    const average = sentences.reduce((sum, s) => sum + wordsIn(s), 0) / sentences.length;
    expect(average, `average sentence is ${average.toFixed(1)} words`).toBeLessThanOrEqual(20);

    // OWASP ids changed meaning between editions: the page cites the 2026 lists only.
    expect(body).not.toMatch(/LLM\d{2}:(?!2026)\d{4}/);
    const flat = body.replace(/\s+/g, ' ');
    expect(flat).toContain('Top 10 for LLM Applications 2026');
    expect(flat).toContain('Top 10 for Agentic Applications 2026');
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
