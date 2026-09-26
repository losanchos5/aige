// seo-hub-graph.spec.ts: the round-5 audit fixes to the entity graph and the hub
// headings (2026-09-26). The /resources landing is a described CollectionPage
// with a BreadcrumbList and a visible trail, like its sibling hubs; every Body of
// Knowledge chapter names its publisher on the TechArticle itself; the
// Organization's sameAs lists only the project's own presences, the author's
// personal profiles stay on the Person; and each hub H1 names its topic. Read
// from dist, like seo-titles.spec.ts.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { chaptersOrdered } from '../src/data/chapters';

// Loosely typed: the parsed JSON-LD graph is external data, walked by key.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonLdNode = Record<string, any>;

// Hardcoded on purpose (see seo-schema.spec.ts): a test importing the constant
// it asserts on would pass however the value drifted.
const SITE_ORIGIN = 'https://aigovernanceengineer.com';
const ORG_ID = `${SITE_ORIGIN}/#org`;
const PERSON_ID = `${SITE_ORIGIN}/#person-jorge-garcia-aibar`;
const PERSONAL_PROFILES = ['https://www.linkedin.com/in/jorgara', 'https://github.com/losanchos5'];
const PROJECT_REPO = 'https://github.com/losanchos5/aige';

/** The built HTML of a clean route (`/bok` → dist/bok.html or dist/bok/index.html). */
function html(route: string): string {
  const base = join('dist', ...route.split('/').filter(Boolean));
  const file = [`${base}.html`, join(base, 'index.html')].find((f) => existsSync(f));
  if (!file) throw new Error(`no built page for ${route}`);
  return readFileSync(file, 'utf8');
}

function decode(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .trim();
}

function h1(page: string): string {
  const match = /<h1[^>]*>([\s\S]*?)<\/h1>/.exec(page);
  if (!match) throw new Error('no <h1>');
  return decode(match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' '));
}

/** The single ld+json block of a built page, flattened to its nodes. */
function graph(page: string): JsonLdNode[] {
  const blocks = [...page.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  expect(blocks).toHaveLength(1);
  const data = JSON.parse(blocks[0][1]) as JsonLdNode;
  return data['@graph'] as JsonLdNode[];
}

function byType(nodes: JsonLdNode[], type: string): JsonLdNode | undefined {
  return nodes.find((node) => [node['@type']].flat().includes(type));
}

test.describe('/resources hub graph', () => {
  test('the CollectionPage mirrors the meta description and links its breadcrumb', () => {
    const page = html('/resources');
    const nodes = graph(page);
    const collection = byType(nodes, 'CollectionPage');
    const crumbs = byType(nodes, 'BreadcrumbList');
    const metaDescription = decode(/<meta name="description" content="([^"]*)"/.exec(page)?.[1] ?? '');

    expect(metaDescription.length).toBeGreaterThan(50);
    expect(collection?.description).toBe(metaDescription);
    expect(crumbs?.['@id']).toBe(`${SITE_ORIGIN}/resources#breadcrumb`);
    expect(collection?.breadcrumb?.['@id']).toBe(`${SITE_ORIGIN}/resources#breadcrumb`);
    const names = (crumbs?.itemListElement ?? []).map((item: JsonLdNode) => item.name);
    expect(names).toEqual(['Home', 'Resources']);
  });

  // The visible trail starts under Home, as on /toolkit (Breadcrumb.astro).
  test('the page shows the same trail above its H1', () => {
    const page = html('/resources');
    const nav = /<nav[^>]*class="[^"]*crumbs[^"]*"[^>]*aria-label="Breadcrumb"[^>]*>([\s\S]*?)<\/nav>/.exec(page);
    expect(nav).toBeTruthy();
    expect(nav?.[1]).toMatch(/aria-current="page"[^>]*>\s*Resources\s*</);
    expect(page.indexOf(nav?.[0] ?? '')).toBeLessThan(page.indexOf('<h1'));
  });
});

test.describe('chapter TechArticle publisher', () => {
  for (const chapter of chaptersOrdered) {
    test(`/bok/${chapter.slug} names the Organization as publisher`, () => {
      const nodes = graph(html(`/bok/${chapter.slug}`));
      const article = byType(nodes, 'TechArticle');
      expect(article?.publisher?.['@id']).toBe(ORG_ID);
      expect(byType(nodes, 'Organization')?.['@id']).toBe(ORG_ID);
    });
  }
});

test.describe('Organization and Person sameAs', () => {
  for (const route of ['/', '/about']) {
    test(`${route}: personal profiles on the Person only`, () => {
      const nodes = graph(html(route));
      const org = byType(nodes, 'Organization');
      const orgSameAs = [org?.sameAs ?? []].flat() as string[];

      expect(orgSameAs).toContain(PROJECT_REPO);
      for (const url of orgSameAs) {
        expect(url, `personal profile on the Organization: ${url}`).not.toMatch(/linkedin\.com\/in\//);
        expect(PERSONAL_PROFILES).not.toContain(url);
      }

      const person = nodes.find((node) => node['@id'] === PERSON_ID);
      if (route === '/about' || person) {
        expect(person?.sameAs).toEqual(expect.arrayContaining(PERSONAL_PROFILES));
      }
    });
  }
});

// ONPAGE O-1: each hub H1 names its topic (the editorial line follows it).
const HUB_H1_TOPICS: { route: string; topic: RegExp }[] = [
  { route: '/obligations', topic: /^AI law obligations\b/ },
  { route: '/resources', topic: /^AI governance resources\b/ },
  { route: '/resources/frameworks', topic: /^AI governance frameworks\b/ },
  { route: '/resources/crosswalk', topic: /^AI governance crosswalk\b/ },
  { route: '/path', topic: /^AI governance learning path\b/ },
  { route: '/agents', topic: /^Governing AI agents\b/ },
  { route: '/for/engineers', topic: /^AI governance for engineers\b/ },
  { route: '/for/executives-board', topic: /^AI governance for boards\b/ },
  { route: '/for/legal-dpo', topic: /^AI governance for legal and DPOs\b/ },
  { route: '/for/public-sector', topic: /^Public sector AI governance\b/ },
  { route: '/toolkit/incident-clock', topic: /^AI incident reporting\b/ },
  { route: '/toolkit/obligations-planner', topic: /^AI Act obligations planner\b/ },
  { route: '/toolkit/vendor-due-diligence', topic: /^AI vendor due diligence\b/ },
];

test.describe('hub H1s name their topic', () => {
  for (const { route, topic } of HUB_H1_TOPICS) {
    test(route, () => {
      const heading = h1(html(route));
      expect(heading).toMatch(topic);
      expect(heading.length, heading).toBeLessThanOrEqual(70);
    });
  }
});
