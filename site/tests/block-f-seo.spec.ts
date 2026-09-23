// block-f-seo.spec.ts: acceptance checks for Block F1 — the JSON-LD @graph on a
// Body of Knowledge chapter, the Open Graph locale, and the web manifest.
//
// The chapter's own nodes now share one @graph with the site-wide Organization
// and WebSite that Seo.astro emits on every page (lib/jsonld.ts); the block is
// still the only ld+json script on the page. seo-schema.spec.ts covers those two
// nodes across every route type.
import { test, expect } from '@playwright/test';

// Loosely typed: the parsed JSON-LD graph is external data, walked by key.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonLdNode = Record<string, any>;

test.describe('structured data on a chapter page', () => {
  test('exactly one JSON-LD block carries the site nodes, Book, TechArticle and BreadcrumbList', async ({
    page,
  }) => {
    await page.goto('/bok/definition');

    const scripts = page.locator('script[type="application/ld+json"]');
    await expect(scripts).toHaveCount(1);

    const raw = await scripts.first().textContent();
    expect(raw).toBeTruthy();

    const data = JSON.parse(raw as string) as JsonLdNode;
    const graph: JsonLdNode[] = Array.isArray(data['@graph']) ? data['@graph'] : [data];

    const types = graph.flatMap((node) =>
      Array.isArray(node['@type']) ? node['@type'] : [node['@type']],
    );
    // The site-wide nodes ride in the same graph, not in a second script.
    expect(types).toContain('Organization');
    expect(types).toContain('WebSite');

    expect(types).toContain('Book');
    expect(types).toContain('TechArticle');
    expect(types).toContain('BreadcrumbList');

    // The TechArticle belongs to the Book, and neither Person carries a job title.
    const book = graph.find((node) => node['@type'] === 'Book');
    const article = graph.find((node) => node['@type'] === 'TechArticle');
    expect(article?.isPartOf?.['@id']).toBe(book?.['@id']);

    for (const person of graph.filter((node) => node['@type'] === 'Person')) {
      expect(person.jobTitle).toBeUndefined();
      expect(person.worksFor).toBeUndefined();
    }
  });

  test('the page declares the Open Graph locale', async ({ page }) => {
    await page.goto('/bok/definition');
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'en_US');
  });
});

test.describe('web manifest', () => {
  test('the manifest is linked from the head', async ({ page }) => {
    await page.goto('/bok/definition');
    await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href', '/site.webmanifest');
  });

  test('the manifest responds 200 with JSON', async ({ request }) => {
    const res = await request.get('/site.webmanifest');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('json');

    const body = await res.json();
    expect(body.name).toBeTruthy();
    expect(body.start_url).toBe('/');
    expect(Array.isArray(body.icons)).toBe(true);
    expect(body.icons.length).toBeGreaterThan(0);
  });
});
