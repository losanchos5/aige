// seo-links.spec.ts: the internal links and hub titles of the 2026-09-25 SXO
// round 2 (SXO-N2, SXO-N3, SXO-06; content N1; on-page F6). The /ai-governance
// pillar is linked from the main content of the chapters, the patterns and the
// section landings, not only from the header and footer; nothing links the
// non-canonical /resources/reading-list; the retitled hubs lead with their
// query; /role is the landing for "AI governance engineer", carries a byline,
// and chapter 06 and the glossary term send readers to it. Read from dist,
// like seo-titles.spec.ts.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { chaptersOrdered } from '../src/data/chapters';
import { patterns } from '../src/data/patterns';
import { audiences } from '../src/data/audiences';
import { inSitemap } from '../src/lib/sitemap-policy';

const PILLAR = '/ai-governance';
const MIN_PILLAR_REFERRERS = 40;
const MAX_DOCUMENT_TITLE = 60;
const MAX_DESCRIPTION = 160;

/** The built HTML of a clean route (`/bok` → dist/bok.html or dist/bok/index.html). */
function html(route: string): string {
  const base = join('dist', ...route.split('/').filter(Boolean));
  const file = [`${base}.html`, join(base, 'index.html')].find((f) => existsSync(f));
  if (!file) throw new Error(`no built page for ${route}`);
  return readFileSync(file, 'utf8');
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

/**
 * The page's own content: the inside of <main>, with every <nav> and <footer>
 * cut out, so the sitewide chrome and the reading rails never count as a link
 * from the text.
 */
function mainContent(page: string): string {
  const start = page.indexOf('<main');
  const end = page.lastIndexOf('</main>');
  if (start < 0 || end < start) return '';
  return page
    .slice(start, end)
    .replace(/<nav\b[\s\S]*?<\/nav>/g, '')
    .replace(/<footer\b[\s\S]*?<\/footer>/g, '');
}

/** Every <a> in `fragment` that points at `path` (a fragment or query allowed). */
function linksTo(fragment: string, path: string): string[] {
  const escaped = path.replace(/[/.]/g, '\\$&');
  const re = new RegExp(`<a\\b[^>]*\\bhref="${escaped}(?:[#?][^"]*)?"[^>]*>([\\s\\S]*?)<\\/a>`, 'g');
  return [...fragment.matchAll(re)].map((m) => decode(m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ')));
}

// English, indexable pages: the machine translations are hidden site-wide.
const indexable = () =>
  htmlRoutes('dist')
    .filter(inSitemap)
    .filter((route) => !/^\/(es|fr|de|pt)(\/|$)/.test(route));

test.describe('hub and spoke: the pillar is linked from the content', () => {
  test(`at least ${MIN_PILLAR_REFERRERS} indexable pages link ${PILLAR} from <main>`, () => {
    const referrers = indexable().filter(
      (route) => route !== PILLAR && linksTo(mainContent(html(route)), PILLAR).length > 0,
    );
    expect(referrers.length, referrers.join('\n')).toBeGreaterThanOrEqual(MIN_PILLAR_REFERRERS);
  });

  test('every chapter links the pillar from its text', () => {
    for (const chapter of chaptersOrdered) {
      const anchors = linksTo(mainContent(html(`/bok/${chapter.slug}`)), PILLAR);
      expect(anchors.length, `/bok/${chapter.slug}`).toBeGreaterThan(0);
    }
  });

  test('every pattern page links the pillar', () => {
    for (const pattern of patterns) {
      const anchors = linksTo(mainContent(html(`/patterns/${pattern.slug}`)), PILLAR);
      expect(anchors.length, `/patterns/${pattern.slug}`).toBeGreaterThan(0);
    }
  });

  const HUBS = [
    '/bok',
    '/resources',
    '/map',
    '/path',
    '/about',
    '/cases',
    '/resources/crosswalk',
    '/for',
    '/for/aigp',
    '/for/certifications',
    ...audiences.map((audience) => `/for/${audience.slug}`),
  ];
  for (const route of HUBS) {
    test(`${route} links the pillar from its content`, () => {
      expect(linksTo(mainContent(html(route)), PILLAR).length).toBeGreaterThan(0);
    });
  }

  test('the anchors vary: no single anchor text carries most of the links', () => {
    const counts = new Map<string, number>();
    let total = 0;
    for (const route of indexable()) {
      if (route === PILLAR) continue;
      for (const anchor of linksTo(mainContent(html(route)), PILLAR)) {
        counts.set(anchor, (counts.get(anchor) ?? 0) + 1);
        total += 1;
      }
    }
    expect(counts.size).toBeGreaterThanOrEqual(8);
    const top = Math.max(...counts.values());
    expect(top / total, JSON.stringify([...counts])).toBeLessThan(0.6);
  });
});

test('nothing links the non-canonical /resources/reading-list', () => {
  // Its own page (filters that keep the view) and redirect stubs are exempt.
  const offenders = htmlRoutes('dist')
    .filter((route) => route !== '/resources/reading-list')
    .filter((route) => {
      const page = html(route);
      if (/http-equiv="refresh"/i.test(page)) return false;
      return /href="\/resources\/reading-list(?:[#?][^"]*)?"/.test(page);
    });
  expect(offenders, offenders.join('\n')).toEqual([]);
});

// The retitled hubs of SXO-N3 and the query each leads with.
const HUB_TITLES: { route: string; title: string }[] = [
  { route: '/stack', title: 'AI governance framework as a stack: five layers' },
  { route: '/obligations', title: 'AI law obligations register: EU AI Act duties with ids' },
  { route: '/path', title: 'AI governance learning path: four stages' },
  { route: '/map', title: 'AI governance mind map: the whole discipline' },
  { route: '/resources/templates', title: 'AI governance templates: policy, register, incident' },
  { route: '/toolkit/ai-act-triage', title: 'EU AI Act risk classification checker' },
];

test.describe('hub titles lead with their query', () => {
  for (const { route, title } of HUB_TITLES) {
    test(`${route} is titled "${title}"`, () => {
      const page = html(route);
      const documentTitleText = documentTitle(page);
      expect(documentTitleText.startsWith(title), documentTitleText).toBe(true);
      expect(documentTitleText.length).toBeLessThanOrEqual(MAX_DOCUMENT_TITLE);
      expect(documentTitleText).not.toContain(String.fromCharCode(0x2014));
      expect(meta(page, 'property', 'og:title')).toBe(documentTitleText);

      const description = meta(page, 'name', 'description') ?? '';
      expect(description.length, description).toBeLessThanOrEqual(MAX_DESCRIPTION);
      expect(description.endsWith('…'), description).toBe(false);
    });
  }

  test('the retitled landings open their description with the query', () => {
    for (const route of ['/stack', '/obligations', '/path', '/map', '/resources/templates']) {
      const description = meta(html(route), 'name', 'description') ?? '';
      expect(description, route).toMatch(/^AI (governance|law)\b/);
    }
  });
});

test.describe('"AI governance engineer": /role is the landing', () => {
  test('/role carries a visible byline under its H1', () => {
    const main = mainContent(html('/role'));
    const byline = /<p class="byline"[^>]*data-byline[^>]*>([\s\S]*?)<\/p>/.exec(main)?.[1] ?? '';
    expect(byline).toMatch(/By <a rel="author" href="\/about"[^>]*>/);
    expect(byline).toMatch(/<time datetime="\d{4}-\d{2}-\d{2}"[^>]*>/);
    expect(main.indexOf('data-byline')).toBeGreaterThan(main.indexOf('<h1'));
  });

  test('only /role leads its title with the head term', () => {
    expect(documentTitle(html('/role'))).toMatch(/^AI governance engineer\b/i);
    expect(documentTitle(html('/bok/the-role'))).not.toMatch(/^AI governance engineer\b/i);
    expect(documentTitle(html('/glossary/ai-governance-engineer'))).toMatch(/: definition\b/);
  });

  for (const route of ['/bok/the-role', '/glossary/ai-governance-engineer']) {
    test(`${route} sends readers to /role with the anchor "AI governance engineer"`, () => {
      const anchors = linksTo(mainContent(html(route)), '/role');
      expect(anchors).toContain('AI governance engineer');
    });
  }
});
