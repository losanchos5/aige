// patterns.spec.ts: acceptance checks for the pattern pages. Chapter 05
// (bok/05-patterns.md, /bok/patterns) is the catalogue; each pattern lives in
// bok/patterns/<slug>.md and renders at /patterns/<slug>, with /patterns as the
// index by stack layer. Half the file is pure-Node data assertions (no
// browser); the rest drives dist/ served by preview. Runs in the `default`
// project.
import { test, expect } from '@playwright/test';
import { readdirSync } from 'node:fs';
import { readSource, sourcePath, getHeadings, slugify } from '../src/lib/md-parse';
import { patterns } from '../src/data/patterns';
import { diagrams } from '../src/data/diagrams';

const ORIGIN = 'https://aigovernanceengineer.com';

/** Flat `key: value` frontmatter of a pattern file, and its body. */
function parsePatternFile(slug: string): { fields: Record<string, string>; body: string } {
  const text = readSource(`bok/patterns/${slug}.md`);
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(text);
  const fields: Record<string, string> = {};
  for (const line of (match?.[1] ?? '').split(/\r?\n/)) {
    const at = line.indexOf(':');
    if (at > 0) fields[line.slice(0, at).trim()] = line.slice(at + 1).trim().replace(/^"|"$/g, '');
  }
  return { fields, body: match ? text.slice(match[0].length) : text };
}

// --- 1. Data: files, index and catalogue agree ------------------------------
test.describe('pattern files', () => {
  test('one file per patterns.ts entry, and nothing else', () => {
    const files = readdirSync(sourcePath('bok/patterns'))
      .filter((name) => name.endsWith('.md'))
      .map((name) => name.replace(/\.md$/, ''))
      .sort();
    expect(files).toEqual(patterns.map((p) => p.slug).sort());
  });

  for (const [index, pattern] of patterns.entries()) {
    test(`${pattern.slug}: frontmatter, H1 and sources match the index`, () => {
      const { fields, body } = parsePatternFile(pattern.slug);
      expect(fields.id).toBe(pattern.slug);
      expect(fields.title).toBe(pattern.title);
      expect(Number(fields.layer)).toBe(pattern.layer);
      expect(fields.secondaryLayer ? Number(fields.secondaryLayer) : undefined).toBe(
        pattern.secondaryLayer,
      );
      expect(Number(fields.order)).toBe(index + 1);
      expect(fields.summary.length).toBeGreaterThanOrEqual(50);
      expect(fields.summary.length).toBeLessThanOrEqual(160);

      const headings = getHeadings(body);
      expect(headings[0]).toEqual({ depth: 1, text: `Pattern: ${pattern.title}` });
      const h2 = headings.filter((h) => h.depth === 2).map((h) => h.text);
      for (const field of ['Objectives', 'Context', 'Problem', 'Solution', 'Consequences', 'Related patterns', 'Sources']) {
        expect(h2, `${pattern.slug} has "## ${field}"`).toContain(field);
      }
      expect(body).toContain('**Maps to:**');
      expect(body).toContain('Mappings are illustrative, not a claim of conformity.');
    });
  }

  test('the chapter 05 catalogue keeps every pattern heading and links each page', () => {
    const catalogue = readSource('bok/05-patterns.md');
    const slugs = new Set(getHeadings(catalogue).map((h) => slugify(h.text)));
    for (const pattern of patterns) {
      // The published anchor (/bok/patterns#pattern-…) still resolves.
      expect(slugs.has(pattern.id), `catalogue anchor #${pattern.id}`).toBe(true);
      const section = catalogue
        .split(/^## /m)
        .find((s) => s.startsWith(`Pattern: ${pattern.title}\n`));
      expect(section, `"## Pattern: ${pattern.title}"`).toBeTruthy();
      expect(section).toContain(`](/patterns/${pattern.slug})`);
    }
  });

  test('every pattern diagram is placed on its pattern page, not in the chapter', () => {
    const slugs = new Set(patterns.map((p) => p.slug));
    for (const diagram of diagrams) {
      for (const placement of diagram.placements) {
        if (placement.chapter !== 'patterns') continue;
        expect(placement.pattern, `${diagram.id} targets a pattern page`).toBeTruthy();
        expect(slugs.has(placement.pattern!), `${diagram.id} -> ${placement.pattern}`).toBe(true);
      }
    }
  });
});

// --- 2. Pages ----------------------------------------------------------------
test.describe('the /patterns index', () => {
  test('lists every pattern once, under its home layer', async ({ page }) => {
    const res = await page.goto('/patterns');
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveText('Patterns');

    const cards = page.locator('.pt-card');
    await expect(cards).toHaveCount(patterns.length);
    for (const pattern of patterns) {
      const layer = page.locator(`#layer-0${pattern.layer}`);
      await expect(layer.locator(`a[href="/patterns/${pattern.slug}"]`)).toHaveCount(1);
    }
    // The jump list reaches the five layer sections.
    await expect(page.locator('.pt-jump a[href^="#layer-0"]')).toHaveCount(5);
  });
});

test.describe('pattern pages', () => {
  for (const [index, pattern] of patterns.entries()) {
    test(`/patterns/${pattern.slug} renders the pattern with its sources and pager`, async ({
      page,
    }) => {
      const res = await page.goto(`/patterns/${pattern.slug}`);
      expect(res?.status()).toBe(200);
      await expect(page.locator('h1').first()).toHaveText(`Pattern: ${pattern.title}`);
      await expect(page.locator('.prose h2', { hasText: /^Objectives$/ })).toHaveCount(1);

      // Breadcrumb back to the index; the chapter rail shows chapter 05.
      await expect(page.locator('.doc-crumbs a[href="/patterns"]')).toHaveCount(1);
      await expect(page.locator(`.pp-meta a[href="/bok/patterns#${pattern.id}"]`)).toHaveCount(1);

      // Every inline citation resolves to a source row on the page.
      const hrefs = await page
        .locator('a.cite')
        .evaluateAll((els) => els.map((el) => el.getAttribute('href') ?? ''));
      expect(hrefs.length).toBeGreaterThanOrEqual(1);
      const ids = await page.locator('ol.sources > li').evaluateAll((els) => els.map((el) => el.id));
      for (const href of hrefs) expect(ids).toContain(href.slice(1));

      // Its diagram moved here from the chapter.
      const placed = diagrams.filter((d) => d.placements.some((p) => p.pattern === pattern.slug));
      for (const diagram of placed) {
        await expect(page.locator(`figure.diagram[data-diagram="${diagram.id}"]`)).toHaveCount(1);
      }

      // Prev/next walk the catalogue order.
      const prev = patterns[index - 1];
      const next = patterns[index + 1];
      const pager = page.locator('nav.pf-pager');
      if (prev) await expect(pager.locator(`a[rel="prev"][href="/patterns/${prev.slug}"]`)).toHaveCount(1);
      if (next) await expect(pager.locator(`a[rel="next"][href="/patterns/${next.slug}"]`)).toHaveCount(1);

      // The cite block cites the pattern's own URL.
      await expect(page.locator('.pf-cite-box > summary')).toHaveText('Cite this pattern');
      const copy = await page.locator('.pf-share [data-copy-cite]').getAttribute('data-copy-cite');
      expect(copy).toBe(`${ORIGIN}/patterns/${pattern.slug}`);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `${ORIGIN}/patterns/${pattern.slug}`,
      );
    });
  }

  test('the diagram opens the page after the Summary, before the first h2', async ({ page }) => {
    await page.goto('/patterns/eval-gate-in-ci');
    const ok = await page.evaluate(() => {
      const article = document.querySelector('article.prose');
      const fig = article?.querySelector('figure.diagram[data-diagram="eval-gate-ci"]');
      const firstH2 = article?.querySelector('h2');
      if (!fig || !firstH2) return false;
      return (
        (firstH2.textContent ?? '').trim() === 'Objectives' &&
        Boolean(fig.compareDocumentPosition(firstH2) & Node.DOCUMENT_POSITION_FOLLOWING)
      );
    });
    expect(ok).toBe(true);
  });
});

test('the chapter 05 catalogue keeps its anchors and carries no pattern diagram', async ({
  page,
}) => {
  await page.goto('/bok/patterns');
  for (const pattern of patterns) {
    await expect(page.locator(`[id="${pattern.id}"]`)).toHaveCount(1);
    await expect(page.locator(`article a[href="/patterns/${pattern.slug}"]`)).toHaveCount(1);
  }
  await expect(page.locator('article figure.diagram')).toHaveCount(0);
  await expect(page.locator('article figure[data-figure="pattern-map"]')).toHaveCount(1);
});

// --- 3. Machine-readable surfaces ------------------------------------------
test('llms.txt indexes /patterns and every pattern page', async ({ request }) => {
  const text = await (await request.get('/llms.txt')).text();
  expect(text).toContain('## Patterns');
  expect(text).toContain(`(${ORIGIN}/patterns)`);
  for (const pattern of patterns) expect(text).toContain(`(${ORIGIN}/patterns/${pattern.slug})`);
  for (const path of ['/resources/harms', '/cases', '/resources/templates', '/resources/contracts']) {
    expect(text).toContain(`(${ORIGIN}${path})`);
  }
});

test('llms-full.txt carries every pattern in full, right after chapter 05', async ({ request }) => {
  const text = await (await request.get('/llms-full.txt')).text();
  const chapter05 = text.indexOf(`Source: ${ORIGIN}/bok/patterns\n`);
  const chapter06 = text.indexOf(`Source: ${ORIGIN}/bok/the-role\n`);
  expect(chapter05).toBeGreaterThan(-1);
  expect(chapter06).toBeGreaterThan(chapter05);
  let last = chapter05;
  for (const pattern of patterns) {
    const at = text.indexOf(`Source: ${ORIGIN}/patterns/${pattern.slug}\n`);
    expect(at, pattern.slug).toBeGreaterThan(last);
    expect(at, pattern.slug).toBeLessThan(chapter06);
    last = at;
  }
  // The body comes through, the frontmatter does not.
  expect(text).toContain('# Pattern: Eval Gate in CI');
  expect(text).toContain('Illustrative schema for the result:');
  expect(text).not.toMatch(/^order: \d+$/m);
});

test('the sitemap lists /patterns and every pattern page with a lastmod', async ({ request }) => {
  const xml = await (await request.get('/sitemap-0.xml')).text();
  for (const path of ['/patterns', ...patterns.map((p) => `/patterns/${p.slug}`)]) {
    const entry = new RegExp(`<loc>${ORIGIN}${path}</loc><lastmod>\\d{4}-\\d{2}-\\d{2}`);
    expect(xml, path).toMatch(entry);
  }
});
