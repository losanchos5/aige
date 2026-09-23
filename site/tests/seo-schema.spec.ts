// seo-schema.spec.ts: the structured-data contract every page keeps. Each page
// emits exactly one <script type="application/ld+json">, it parses, and its
// @graph carries the site-wide Organization and WebSite nodes plus the type that
// describes the page itself (lib/jsonld.ts merges the two halves).
//
// The chapter-specific assertions (Book / TechArticle / Person) live in
// block-f-seo.spec.ts; this suite guards the shape across the route types.
import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

// Loosely typed: the parsed JSON-LD graph is external data, walked by key.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonLdNode = Record<string, any>;

// Mirrors src/data/site.ts. Hardcoded on purpose: a test that imported the same
// constant it asserts on would pass however the value drifted.
const SITE_ORIGIN = 'https://aigovernanceengineer.com';

/** The single ld+json block on `path`, parsed and flattened to its nodes. */
async function graphOf(page: Page, path: string): Promise<JsonLdNode[]> {
  await page.goto(path);

  const scripts = page.locator('script[type="application/ld+json"]');
  await expect(scripts, `one ld+json block on ${path}`).toHaveCount(1);

  const raw = await scripts.first().textContent();
  expect(raw, `empty ld+json on ${path}`).toBeTruthy();

  const data = JSON.parse(raw as string) as JsonLdNode;
  expect(data['@context']).toBe('https://schema.org');
  expect(Array.isArray(data['@graph']), `@graph on ${path}`).toBe(true);
  return data['@graph'] as JsonLdNode[];
}

/** Every `@type` in the graph, arrays flattened. */
function typesOf(graph: JsonLdNode[]): string[] {
  return graph.flatMap((node) => (Array.isArray(node['@type']) ? node['@type'] : [node['@type']]));
}

// One page per shape the site builds: the home page — which the WebSite node
// itself describes — a Body of Knowledge chapter, the two Thesis translations,
// the crosswalk dataset and the map.
const PAGES: { path: string; type: string }[] = [
  { path: '/', type: 'Organization' },
  { path: '/bok/definition', type: 'TechArticle' },
  { path: '/thesis', type: 'TechArticle' },
  { path: '/es/thesis', type: 'TechArticle' },
  { path: '/resources/crosswalk', type: 'Dataset' },
  { path: '/map', type: 'CollectionPage' },
];

for (const { path, type } of PAGES) {
  test.describe(`json-ld ${path}`, () => {
    test(`one graph with Organization, WebSite and ${type}`, async ({ page }) => {
      const graph = await graphOf(page, path);
      const types = typesOf(graph);

      expect(types, `Organization on ${path}`).toContain('Organization');
      expect(types, `WebSite on ${path}`).toContain('WebSite');
      expect(types, `${type} on ${path}`).toContain(type);
    });

    test('the Organization and WebSite nodes are the shared, @id-stable ones', async ({ page }) => {
      const graph = await graphOf(page, path);

      const org = graph.find((node) => node['@type'] === 'Organization');
      const website = graph.find((node) => node['@type'] === 'WebSite');

      expect(org?.['@id']).toBe(`${SITE_ORIGIN}/#org`);
      expect(org?.name).toBeTruthy();
      expect(org?.url).toBe(`${SITE_ORIGIN}/`);
      // The logo has to be a real raster the site serves, not the SVG favicon.
      expect(String(org?.logo?.url ?? '')).toMatch(new RegExp(`^${SITE_ORIGIN}/.+\\.png$`));

      expect(website?.['@id']).toBe(`${SITE_ORIGIN}/#website`);
      expect(website?.url).toBe(`${SITE_ORIGIN}/`);
      expect(website?.inLanguage).toBe('en');
      expect(website?.publisher?.['@id']).toBe(org?.['@id']);
    });

    test('no node repeats an @id and no Person carries a job title', async ({ page }) => {
      const graph = await graphOf(page, path);

      const ids = graph.map((node) => node['@id']).filter((id) => typeof id === 'string');
      expect(new Set(ids).size, `duplicate @id on ${path}`).toBe(ids.length);

      for (const person of graph.filter((node) => node['@type'] === 'Person')) {
        expect(person.jobTitle).toBeUndefined();
        expect(person.worksFor).toBeUndefined();
      }
    });
  });
}

test.describe('page-specific nodes', () => {
  test('/es/thesis declares Spanish and translates the English article', async ({ page }) => {
    const graph = await graphOf(page, '/es/thesis');
    const article = graph.find((node) => node['@type'] === 'TechArticle');

    expect(article?.inLanguage).toBe('es');
    expect(article?.url).toBe(`${SITE_ORIGIN}/es/thesis`);
    expect(article?.translationOfWork?.['@id']).toBe(`${SITE_ORIGIN}/thesis#article`);
    expect(article?.dateModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(article?.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  test('/thesis is an English TechArticle with both dates', async ({ page }) => {
    const graph = await graphOf(page, '/thesis');
    const article = graph.find((node) => node['@type'] === 'TechArticle');

    expect(article?.inLanguage).toBe('en');
    expect(article?.url).toBe(`${SITE_ORIGIN}/thesis`);
    expect(article?.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(article?.dateModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  test('/ carries a WebPage node bound to the WebSite', async ({ page }) => {
    const graph = await graphOf(page, '/');
    const webPage = graph.find((node) => node['@type'] === 'WebPage');

    expect(webPage?.['@id']).toBe(`${SITE_ORIGIN}/#webpage`);
    expect(webPage?.url).toBe(`${SITE_ORIGIN}/`);
    expect(webPage?.name).toBeTruthy();
    expect(webPage?.description).toBeTruthy();
    expect(webPage?.inLanguage).toBe('en');
    expect(webPage?.isPartOf?.['@id']).toBe(`${SITE_ORIGIN}/#website`);
  });

  test('/thesis carries its BreadcrumbList in the same graph', async ({ page }) => {
    const graph = await graphOf(page, '/thesis');
    const crumbs = graph.find((node) => node['@type'] === 'BreadcrumbList');

    expect(crumbs).toBeTruthy();
    const items = (crumbs?.itemListElement ?? []) as JsonLdNode[];
    expect(items.map((item) => item.name)).toEqual(['Home', 'The Thesis']);
    expect(items[0].item).toBe(`${SITE_ORIGIN}/`);
  });

  test('/map states a description and its breadcrumb trail', async ({ page }) => {
    const graph = await graphOf(page, '/map');

    const collection = graph.find((node) => node['@type'] === 'CollectionPage');
    expect(collection?.description).toBeTruthy();
    expect(collection?.isPartOf?.['@id']).toBe(`${SITE_ORIGIN}/#website`);

    const crumbs = graph.find((node) => node['@type'] === 'BreadcrumbList');
    const names = (crumbs?.itemListElement ?? []).map((item: JsonLdNode) => item.name);
    expect(names).toEqual(['Home', 'The map']);
  });

  test('a chapter TechArticle carries both dates and its own OG image', async ({ page }) => {
    const graph = await graphOf(page, '/bok/definition');
    const article = graph.find((node) => node['@type'] === 'TechArticle');

    expect(article?.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(article?.dateModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(article?.image).toBe(`${SITE_ORIGIN}/og/bok-definition.png`);
  });

  test('the Thesis TechArticles carry an image', async ({ page }) => {
    for (const path of ['/thesis', '/es/thesis']) {
      const graph = await graphOf(page, path);
      const article = graph.find((node) => node['@type'] === 'TechArticle');
      expect(article?.image, path).toBe(`${SITE_ORIGIN}/og/thesis.png`);
    }
  });

  test('every licensed work links the licence deed rather than naming it', async ({ page }) => {
    // schema.org types `license` as URL|CreativeWork, so the Text literal
    // "CC BY 4.0" (still shown in the page chrome) is not a valid value.
    const LICENSE_URL = 'https://creativecommons.org/licenses/by/4.0/';
    const licensed: { path: string; type: string }[] = [
      { path: '/bok/definition', type: 'Book' },
      { path: '/thesis', type: 'TechArticle' },
      { path: '/es/thesis', type: 'TechArticle' },
      { path: '/resources/crosswalk', type: 'Dataset' },
    ];

    for (const { path, type } of licensed) {
      const graph = await graphOf(page, path);
      const node = graph.find((item) => item['@type'] === type);
      expect(node?.license, `${type} on ${path}`).toBe(LICENSE_URL);
    }
  });

  test('the glossary is a DefinedTermSet of anchored terms', async ({ page }) => {
    const graph = await graphOf(page, '/resources/glossary');
    const set = graph.find((node) => node['@type'] === 'DefinedTermSet');

    const setId = `${SITE_ORIGIN}/resources/glossary#glossary`;
    expect(set?.['@id']).toBe(setId);

    const terms = (set?.hasDefinedTerm ?? []) as JsonLdNode[];
    expect(terms.length).toBeGreaterThan(10);
    for (const term of terms) {
      expect(term['@type']).toBe('DefinedTerm');
      expect(term.name).toBeTruthy();
      expect(term.description).toBeTruthy();
      expect(term.inDefinedTermSet?.['@id']).toBe(setId);
      expect(String(term['@id'])).toMatch(
        new RegExp(`^${SITE_ORIGIN}/resources/glossary#t-[a-z0-9-]+$`),
      );
    }

    // Every term @id points at an anchor the page actually renders.
    const anchors = await page.locator('.gl-dl dt[id]').evaluateAll((nodes) =>
      nodes.map((node) => node.id),
    );
    const anchored = new Set(anchors);
    for (const term of terms) {
      const hash = String(term['@id']).split('#')[1];
      expect(anchored.has(hash), `no <dt id="${hash}"> for "${term.name}"`).toBe(true);
    }
  });

  test('the crosswalk Dataset distributes the CSV and the JSON it links', async ({ page }) => {
    const graph = await graphOf(page, '/resources/crosswalk');
    const dataset = graph.find((node) => node['@type'] === 'Dataset');

    expect(dataset?.url).toBe(`${SITE_ORIGIN}/resources/crosswalk`);
    expect(dataset?.license).toBeTruthy();

    const downloads = (dataset?.distribution ?? []) as JsonLdNode[];
    const urls = downloads.map((download) => download.contentUrl);
    expect(urls).toContain(`${SITE_ORIGIN}/resources/crosswalk.csv`);
    expect(urls).toContain(`${SITE_ORIGIN}/resources/crosswalk.json`);
    for (const download of downloads) expect(download['@type']).toBe('DataDownload');
  });

  test('a resources sub-page carries its BreadcrumbList in the same graph', async ({ page }) => {
    const graph = await graphOf(page, '/resources/frameworks');
    const crumbs = graph.find((node) => node['@type'] === 'BreadcrumbList');

    expect(crumbs).toBeTruthy();
    const names = (crumbs?.itemListElement ?? []).map((item: JsonLdNode) => item.name);
    expect(names).toEqual(['Home', 'Resources', 'Frameworks']);
  });
});
