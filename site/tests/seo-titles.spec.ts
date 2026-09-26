// seo-titles.spec.ts: the search titles of the 2026-09-25 SXO pass. Every
// chapter carries a query-phrased `seoTitle` (bok/*.md frontmatter) in its
// <title>, og:title and article headline while its H1 stays the numbered title;
// no two indexable pages share a <title>; each retitled hub names the query it
// is the landing for. Read from dist, like seo-infra.spec.ts.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { chaptersOrdered } from '../src/data/chapters';
import { market } from '../src/data/role';
import { topics } from '../src/data/crosswalk';
import { readSource } from '../src/lib/md-parse';
import { inSitemap } from '../src/lib/sitemap-policy';

const MAX_DOCUMENT_TITLE = 60;

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

/** The document <title>: the head's, not an inline SVG's. */
function documentTitle(page: string): string {
  const head = page.slice(0, page.indexOf('</head>'));
  const match = /<title>([^<]*)<\/title>/.exec(head);
  if (!match) throw new Error('no <title> in <head>');
  return decode(match[1]);
}

function meta(page: string, attr: 'name' | 'property', key: string): string | undefined {
  const match = new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`).exec(page);
  return match ? decode(match[1]) : undefined;
}

function h1(page: string): string {
  const match = /<h1[^>]*>([\s\S]*?)<\/h1>/.exec(page);
  if (!match) throw new Error('no <h1>');
  return decode(match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' '));
}

/** The `seoTitle` a chapter file declares in its frontmatter. */
function frontmatterSeoTitle(chapterId: string): string | undefined {
  const source = readSource(`bok/${chapterId}.md`).replace(/\r\n?/g, '\n');
  const block = /^---\n([\s\S]*?)\n---\n/.exec(source)?.[1] ?? '';
  const line = /^seoTitle:\s*(.+)$/m.exec(block)?.[1];
  return line === undefined ? undefined : (JSON.parse(line) as string);
}

function htmlRoutes(dir: string, root = dir): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...htmlRoutes(full, root));
    else if (name.endsWith('.html')) {
      const route = full
        .slice(root.length)
        .replace(/\\/g, '/')
        .replace(/\.html$/, '')
        .replace(/\/index$/, '');
      out.push(route === '' ? '/' : route);
    }
  }
  return out;
}

test.describe('chapter search titles', () => {
  for (const chapter of chaptersOrdered) {
    test(`/bok/${chapter.slug} uses its seoTitle in the head and keeps its H1`, () => {
      const seoTitle = frontmatterSeoTitle(chapter.id);
      expect(seoTitle, `bok/${chapter.id}.md has no seoTitle`).toBeTruthy();
      expect(seoTitle!.length).toBeLessThanOrEqual(55);
      expect(seoTitle).not.toMatch(/^\d/);
      expect(seoTitle).not.toContain(String.fromCharCode(0x2014));

      const page = html(`/bok/${chapter.slug}`);
      const title = documentTitle(page);
      expect(title.startsWith(seoTitle!)).toBe(true);
      expect(title.length).toBeLessThanOrEqual(MAX_DOCUMENT_TITLE);
      expect(meta(page, 'property', 'og:title')).toBe(title);

      const headline = /"headline":"([^"]*)"/.exec(page)?.[1];
      expect(headline).toBe(seoTitle);

      // The visible title is unchanged: the numbered H1 from the file. The
      // glossary alone names its topic (round 5, SXO-N-04), its number kept in
      // the breadcrumb.
      expect(h1(page)).toBe(chapter.slug === 'glossary' ? 'AI governance glossary' : chapter.title);
    });
  }

  test('no two chapters share a search title', () => {
    const titles = chaptersOrdered.map((chapter) => frontmatterSeoTitle(chapter.id));
    expect(new Set(titles).size).toBe(titles.length);
  });
});

// Duplicates another block owns and fixes (seo-integral task 9 rewrites the
// obligation title builder); drop an entry once its pages have their own titles.
const KNOWN_DUPLICATES = new Set<string>([]);

test('no two indexable pages share a <title>', () => {
  // English routes only: the machine translations are being taken off the site
  // (seo-integral task 1), and their titles are checked by the i18n suite.
  const routes = htmlRoutes('dist')
    .filter(inSitemap)
    .filter((route) => !/^\/(es|fr|de|pt)(\/|$)/.test(route));
  expect(routes.length).toBeGreaterThan(100);

  const byTitle = new Map<string, string[]>();
  for (const route of routes) {
    const title = documentTitle(html(route));
    byTitle.set(title, [...(byTitle.get(title) ?? []), route]);
  }
  const duplicates = [...byTitle]
    .filter(([, list]) => list.length > 1 && !KNOWN_DUPLICATES.has(list.join(', ')))
    .map(([title, list]) => `${title}: ${list.join(', ')}`);
  expect(duplicates, duplicates.join('\n')).toEqual([]);
});

// Each hub and the query it is the landing for (SXO-02/04/05/06/10/11).
const HUBS: { route: string; keyword: RegExp }[] = [
  { route: '/bok', keyword: /^AI Governance Body of Knowledge\b/i },
  { route: '/role', keyword: /^AI governance engineer\b/i },
  { route: '/resources/crosswalk', keyword: /^AI governance crosswalk: EU AI Act, ISO 42001, NIST AI RMF/ },
  { route: '/resources/frameworks', keyword: /^AI governance frameworks: \d+ laws, standards and codes$/ },
  { route: '/for/aigp', keyword: /^Free AIGP study map\b/ },
  { route: '/for/certifications', keyword: /^AI governance certifications compared\b/ },
  { route: '/resources/harms', keyword: /^AI harms taxonomy\b/ },
  { route: '/patterns', keyword: /^AI governance design patterns\b/ },
  { route: '/toolkit', keyword: /^AI governance toolkit\b/ },
  { route: '/toolkit/model-card', keyword: /^Model card template\b/ },
  { route: '/toolkit/incident-clock', keyword: /^AI incident reporting deadlines\b/ },
];

test.describe('hub titles name their query', () => {
  for (const { route, keyword } of HUBS) {
    test(`${route} title leads with its keyword`, () => {
      const page = html(route);
      const title = documentTitle(page);
      expect(title).toMatch(keyword);
      expect(title.length).toBeLessThanOrEqual(MAX_DOCUMENT_TITLE);
      expect(meta(page, 'property', 'og:title')).toBe(title);
      const description = meta(page, 'name', 'description') ?? '';
      expect(description.endsWith('…'), description).toBe(false);
    });
  }

  test('/resources/frameworks has a 110 to 158 character description (audit ONPAGE N3-1)', () => {
    const description = meta(html('/resources/frameworks'), 'name', 'description') ?? '';
    expect(description.length, description).toBeGreaterThanOrEqual(110);
    expect(description.length, description).toBeLessThanOrEqual(158);
    expect(description).toContain('EU AI Act');
  });

  test('/for/aigp stays a map, never a guide', () => {
    const page = html('/for/aigp');
    const title = documentTitle(page);
    expect(title).toContain('map');
    expect(title.toLowerCase()).not.toContain('guide');
    expect((meta(page, 'name', 'description') ?? '').toLowerCase()).not.toContain('guide');
  });
});

test.describe('/role answers the questions searchers ask', () => {
  const page = () => html('/role');

  test('four question headings, each answered in 40 to 60 words right under it', () => {
    const sections = [...page().matchAll(/<h2[^>]*>([^<]*)<\/h2>\s*<p[^>]*>([\s\S]*?)<\/p>/g)]
      .map((m) => ({
        heading: decode(m[1].replace(/<[^>]+>/g, '')),
        answer: decode(m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ')),
      }))
      .filter((s) => s.heading.endsWith('?'));
    expect(sections.map((s) => s.heading)).toEqual([
      'What does an AI governance engineer do?',
      'What skills does an AI governance engineer need?',
      'How do you become an AI governance engineer?',
      'How much does an AI governance engineer earn?',
    ]);
    for (const { heading, answer } of sections) {
      const words = answer.split(' ').length;
      expect(words, `${heading}: ${words} words`).toBeGreaterThanOrEqual(40);
      expect(words, `${heading}: ${words} words`).toBeLessThanOrEqual(60);
    }
  });

  test('the salary answer states every primary median the tiles show', () => {
    const answer = /How much does an AI governance engineer earn\?<\/h2>\s*<p[^>]*>([\s\S]*?)<\/p>/.exec(page())?.[1] ?? '';
    for (const stat of market.filter((s) => s.primary)) {
      expect(answer, stat.value).toContain(stat.value);
    }
  });
});

test('/resources/crosswalk opens with a static overlap table, one row per topic', () => {
  const page = html('/resources/crosswalk');
  const table = /<table class="res-table cw-overlap-table[^"]*"[\s\S]*?<\/table>/.exec(page)?.[0] ?? '';
  expect(table).not.toBe('');
  expect(table.match(/<tr/g)?.length).toBe(topics.length + 1);
  // Above the interactive matrix, so it reads without the tool.
  expect(page.indexOf('cw-overlap-table')).toBeLessThan(page.indexOf('id="cw-heading"'));
});
