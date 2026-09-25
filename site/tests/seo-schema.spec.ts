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
const PERSON_ID = `${SITE_ORIGIN}/#person-jorge-garcia-aibar`;
const PERSON_NAME = 'Jorge García Aibar';
const JOB_TITLE = 'AI Governance & Privacy Engineer';
const VERSION_DOI = '10.5281/zenodo.22956197';
const CONCEPT_DOI = '10.5281/zenodo.22857084';

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

// One page per shape the site builds: the home page (which the WebSite node
// itself describes), a Body of Knowledge chapter, the two Thesis translations,
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

    test('no node repeats an @id and a Person states only what the preface does', async ({
      page,
    }) => {
      const graph = await graphOf(page, path);

      const ids = graph.map((node) => node['@id']).filter((id) => typeof id === 'string');
      expect(new Set(ids).size, `duplicate @id on ${path}`).toBe(ids.length);

      // The role is the preface's own ("an AI Governance & Privacy Engineer");
      // no employer is named, so no worksFor.
      for (const person of graph.filter((node) => node['@type'] === 'Person')) {
        expect(person.jobTitle).toBe(JOB_TITLE);
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

  test('/bok/glossary, the live glossary index, states the DefinedTermSet', async ({ page }) => {
    const graph = await graphOf(page, '/bok/glossary');
    const set = graph.find((node) => node['@type'] === 'DefinedTermSet');
    const setId = `${SITE_ORIGIN}/bok/glossary#glossary`;

    expect(set?.['@id']).toBe(setId);
    expect(set?.url).toBe(`${SITE_ORIGIN}/bok/glossary`);
    expect(set?.author?.[0]?.['@id']).toBe(PERSON_ID);
    expect(set?.dateModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    const terms = (set?.hasDefinedTerm ?? []) as JsonLdNode[];
    expect(terms.length).toBeGreaterThan(100);
    for (const term of terms) {
      expect(term['@type']).toBe('DefinedTerm');
      expect(term.name).toBeTruthy();
      expect(term.inDefinedTermSet?.['@id']).toBe(setId);
      expect(String(term['@id'])).toMatch(new RegExp(`^${SITE_ORIGIN}/glossary/[a-z0-9-]+#term$`));
    }
    // The chapter keeps its own nodes alongside the set.
    expect(typesOf(graph)).toEqual(expect.arrayContaining(['Book', 'TechArticle']));
  });

  test('the glossary is a DefinedTermSet of terms with their own pages', async ({ page }) => {
    const graph = await graphOf(page, '/resources/glossary');
    const set = graph.find((node) => node['@type'] === 'DefinedTermSet');

    // The set is the book index; each term is identified by its own page.
    const setId = `${SITE_ORIGIN}/bok/glossary#glossary`;
    expect(set?.['@id']).toBe(setId);

    const terms = (set?.hasDefinedTerm ?? []) as JsonLdNode[];
    expect(terms.length).toBeGreaterThan(10);
    for (const term of terms) {
      expect(term['@type']).toBe('DefinedTerm');
      expect(term.name).toBeTruthy();
      expect(term.description).toBeTruthy();
      expect(term.inDefinedTermSet?.['@id']).toBe(setId);
      expect(String(term['@id'])).toMatch(new RegExp(`^${SITE_ORIGIN}/glossary/[a-z0-9-]+#term$`));
      expect(String(term.url)).toBe(String(term['@id']).replace(/#term$/, ''));
    }

    // Every term's page is linked from the index entry the page renders.
    const hrefs = await page
      .locator('.gl-dl dt a')
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('href') ?? ''));
    const linked = new Set(hrefs);
    for (const term of terms) {
      const path = new URL(String(term.url)).pathname;
      expect(linked.has(path), `no index link to ${path} for "${term.name}"`).toBe(true);
    }
  });

  test('a glossary term page is a DefinedTerm in the book glossary set', async ({ page }) => {
    const graph = await graphOf(page, '/glossary/serious-incident');
    const term = graph.find((node) => node['@type'] === 'DefinedTerm');
    const set = graph.find((node) => node['@type'] === 'DefinedTermSet');
    const setId = `${SITE_ORIGIN}/bok/glossary#glossary`;

    expect(term?.['@id']).toBe(`${SITE_ORIGIN}/glossary/serious-incident#term`);
    expect(term?.name).toBe('Serious incident');
    expect(term?.description).toBeTruthy();
    expect(term?.inDefinedTermSet?.['@id']).toBe(setId);
    expect(set?.['@id']).toBe(setId);
    expect(set?.url).toBe(`${SITE_ORIGIN}/bok/glossary`);
    expect(typesOf(graph)).toContain('BreadcrumbList');

    // The term page is authored and dated on its WebPage node (a DefinedTerm
    // takes neither), which points at the term and at the breadcrumb trail.
    const webPage = graph.find((node) => node['@type'] === 'WebPage');
    expect(webPage?.url).toBe(`${SITE_ORIGIN}/glossary/serious-incident`);
    expect(webPage?.mainEntity?.['@id']).toBe(term?.['@id']);
    expect(webPage?.author?.[0]?.['@id']).toBe(PERSON_ID);
    expect(webPage?.publisher?.['@id']).toBe(`${SITE_ORIGIN}/#org`);
    expect(webPage?.dateModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(webPage?.breadcrumb?.['@id']).toBe(
      `${SITE_ORIGIN}/glossary/serious-incident#breadcrumb`,
    );
    // The author it references is declared in the same graph.
    expect(graph.find((node) => node['@id'] === PERSON_ID)?.name).toBe(PERSON_NAME);
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

test.describe('entity and hub graph', () => {
  /** The DOI PropertyValues of a node, as bare DOIs. */
  function doisOf(node: JsonLdNode | undefined): string[] {
    const ids = (node?.identifier ?? []) as JsonLdNode[];
    return ids
      .filter((id) => id['@type'] === 'PropertyValue' && id.propertyID === 'DOI')
      .map((id) => {
        expect(id.url).toBe(`https://doi.org/${id.value}`);
        return String(id.value);
      });
  }

  test('/bok declares the Book with its version and concept DOIs', async ({ page }) => {
    const graph = await graphOf(page, '/bok');
    const book = graph.find((node) => node['@type'] === 'Book');

    expect(book?.['@id']).toBe(`${SITE_ORIGIN}/bok#book`);
    expect(doisOf(book)).toEqual([VERSION_DOI, CONCEPT_DOI]);
    expect(book?.sameAs).toEqual(
      expect.arrayContaining([
        `https://doi.org/${VERSION_DOI}`,
        `https://doi.org/${CONCEPT_DOI}`,
        'https://zenodo.org/records/22956197',
        'https://zenodo.org/records/22857084',
      ]),
    );
  });

  test('a chapter carries the same Book, DOIs included', async ({ page }) => {
    const graph = await graphOf(page, '/bok/definition');
    const book = graph.find((node) => node['@type'] === 'Book');
    expect(doisOf(book)).toEqual([VERSION_DOI, CONCEPT_DOI]);
  });

  test('/resources/data: the catalogue and every dataset carry the DOIs', async ({ page }) => {
    const graph = await graphOf(page, '/resources/data');
    const catalog = graph.find((node) => node['@type'] === 'DataCatalog');

    expect(doisOf(catalog)).toEqual([VERSION_DOI, CONCEPT_DOI]);
    expect(catalog?.dateModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    const datasets = (catalog?.dataset ?? []) as JsonLdNode[];
    expect(datasets.length).toBeGreaterThan(5);
    for (const dataset of datasets) expect(doisOf(dataset)).toEqual([VERSION_DOI, CONCEPT_DOI]);
  });

  test('/resources/data describes the JSON API and the MCP server', async ({ page }) => {
    const graph = await graphOf(page, '/resources/data');
    const apis = graph.filter((node) => node['@type'] === 'WebAPI');
    const byId = new Map(apis.map((api) => [api['@id'], api]));

    const json = byId.get(`${SITE_ORIGIN}/resources/data#api`);
    expect(json?.url).toBe(`${SITE_ORIGIN}/api/v1/index.json`);
    expect(json?.documentation).toEqual(
      expect.arrayContaining([
        `${SITE_ORIGIN}/resources/data`,
        `${SITE_ORIGIN}/api/v1/openapi.json`,
      ]),
    );

    const mcp = byId.get(`${SITE_ORIGIN}/mcp#server`);
    expect(mcp?.url).toBe('https://mcp.aigovernanceengineer.com/mcp');
    expect(mcp?.documentation).toContain(`${SITE_ORIGIN}/mcp`);
    for (const api of apis) expect(api.provider?.['@id']).toBe(`${SITE_ORIGIN}/#org`);
  });

  test('/about is the ProfilePage of the author, who founded the site', async ({ page }) => {
    const graph = await graphOf(page, '/about');
    const profile = graph.find((node) => node['@type'] === 'ProfilePage');
    const person = graph.find((node) => node['@type'] === 'Person');
    const org = graph.find((node) => node['@type'] === 'Organization');

    expect(profile?.['@id']).toBe(`${SITE_ORIGIN}/about#page`);
    expect(profile?.url).toBe(`${SITE_ORIGIN}/about`);
    expect(profile?.mainEntity?.['@id']).toBe(PERSON_ID);
    expect(profile?.breadcrumb?.['@id']).toBe(`${SITE_ORIGIN}/about#breadcrumb`);

    expect(person?.['@id']).toBe(PERSON_ID);
    expect(person?.name).toBe(PERSON_NAME);
    expect(person?.jobTitle).toBe(JOB_TITLE);
    expect(person?.description).toBeTruthy();
    expect(person?.knowsAbout?.length).toBeGreaterThan(3);
    expect(person?.sameAs).toEqual(
      expect.arrayContaining(['https://www.linkedin.com/in/jorgara', 'https://github.com/losanchos5']),
    );
    expect(org?.founder?.['@id']).toBe(PERSON_ID);

    // The facts block states the same role on the page.
    await expect(page.locator('.about-facts')).toContainText(JOB_TITLE);
  });

  // Every hub is a CollectionPage bound to the WebSite, authored, published and
  // dated, and it points at its own breadcrumb trail.
  const HUBS = [
    '/bok',
    '/resources',
    '/resources/templates',
    '/resources/tools',
    '/resources/contracts',
    '/resources/frameworks',
    '/patterns',
    '/cases',
    '/obligations',
    '/figures',
    '/toolkit',
  ];
  for (const path of HUBS) {
    test(`${path} is an authored, dated CollectionPage`, async ({ page }) => {
      const graph = await graphOf(page, path);
      const url = `${SITE_ORIGIN}${path}`;
      const collection = graph.find((node) => node['@type'] === 'CollectionPage');

      expect(collection?.['@id']).toBe(`${url}#page`);
      expect(collection?.url).toBe(url);
      expect(collection?.isPartOf?.['@id']).toBe(`${SITE_ORIGIN}/#website`);
      expect(collection?.author?.[0]?.['@id']).toBe(PERSON_ID);
      expect(collection?.publisher?.['@id']).toBe(`${SITE_ORIGIN}/#org`);
      expect(collection?.dateModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      // A hub with a breadcrumb trail points at it (the /resources landing has none).
      if (graph.some((node) => node['@type'] === 'BreadcrumbList')) {
        expect(collection?.breadcrumb?.['@id']).toBe(`${url}#breadcrumb`);
      }
      // Children listed either as an ItemList or as hasPart.
      const children =
        collection?.mainEntity?.itemListElement?.length ?? collection?.hasPart?.length ?? 0;
      if (path !== '/obligations') expect(children, `children on ${path}`).toBeGreaterThan(2);
    });
  }

  test('a toolkit tool is authored and dated', async ({ page }) => {
    const graph = await graphOf(page, '/toolkit/incident-clock');
    const app = graph.find((node) => node['@type'] === 'WebApplication');
    expect(app?.author?.[0]?.['@id']).toBe(PERSON_ID);
    expect(app?.publisher?.['@id']).toBe(`${SITE_ORIGIN}/#org`);
    expect(app?.dateModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  test('every BreadcrumbList carries its page-stable @id', async ({ page }) => {
    const paths = [
      '/about',
      '/bok',
      '/bok/definition',
      '/thesis',
      '/map',
      '/patterns',
      '/resources/data',
      '/resources/templates',
      '/glossary/serious-incident',
      '/toolkit/incident-clock',
    ];
    for (const path of paths) {
      const graph = await graphOf(page, path);
      const lists = graph.filter((node) => node['@type'] === 'BreadcrumbList');
      expect(lists, `one BreadcrumbList on ${path}`).toHaveLength(1);
      expect(lists[0]['@id'], path).toBe(`${SITE_ORIGIN}${path}#breadcrumb`);
    }
  });
});
