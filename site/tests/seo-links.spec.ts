// seo-links.spec.ts: the internal links and hub titles of the 2026-09-25 SXO
// round 2 (SXO-N2, SXO-N3, SXO-06; content N1; on-page F6). The /ai-governance
// pillar is linked from the main content of the chapters, the patterns and the
// section landings, not only from the header and footer; nothing links the
// non-canonical /resources/reading-list; the retitled hubs lead with their
// query; /role is the landing for "AI governance engineer", carries a byline,
// and chapter 06 and the glossary term send readers to it. Round 3 (the
// round-2 audit's ONPAGE R2, SCHEMA R1, SXO-R2-02/05/06/07, CONTENT R7): the
// three "<A> vs <B>" pages are linked from the glossary terms, chapters 18 and
// 22, /resources/frameworks and the obligation pages of their instruments;
// /role has its own WebPage node and a descriptive anchor from the home; the
// case and tool pages link the pillar; /cases, /resources and /figures carry
// search titles; the /obligations title counts the register. Read from dist,
// like seo-titles.spec.ts.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { chaptersOrdered } from '../src/data/chapters';
import { patterns } from '../src/data/patterns';
import { audiences } from '../src/data/audiences';
import { cases } from '../src/data/cases';
import { tools } from '../src/data/toolkit';
import { comparisons, comparisonPath } from '../src/data/comparisons';
import { frameworks, obligations, obligationPath } from '../src/data/frameworks';
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
  {
    route: '/obligations',
    title: `AI law obligations register: ${obligations.length} duties, ${new Set(obligations.map((o) => o.frameworkId)).size} instruments`,
  },
  { route: '/cases', title: 'AI incident case studies: what failed, which control' },
  { route: '/resources', title: 'AI governance resources: frameworks, data, templates' },
  { route: '/figures', title: 'AI governance diagrams: free figures to cite and reuse' },
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

  test('the round-3 hubs carry hand-written descriptions of 110 to 158 characters', () => {
    for (const route of ['/cases', '/resources', '/figures']) {
      const description = meta(html(route), 'name', 'description') ?? '';
      expect(description.length, `${route}: ${description}`).toBeGreaterThanOrEqual(110);
      expect(description.length, `${route}: ${description}`).toBeLessThanOrEqual(158);
      expect(description, route).toMatch(/\.$/);
    }
  });

  test('the /obligations title counts every instrument, not only the EU AI Act', () => {
    expect(new Set(obligations.map((o) => o.frameworkId)).size).toBeGreaterThan(1);
    expect(documentTitle(html('/obligations'))).not.toMatch(/EU AI Act/);
  });

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

/** Every ld+json node of a built page, flattened from its single @graph. */
function graph(page: string): Record<string, unknown>[] {
  const match = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/.exec(page);
  if (!match) throw new Error('no ld+json block');
  const data = JSON.parse(match[1]) as { '@graph'?: Record<string, unknown>[] };
  return data['@graph'] ?? [];
}

test.describe('/role: the page in the graph and the home anchor', () => {
  test('/role carries a WebPage node about the "AI governance engineer" term', () => {
    const nodes = graph(html('/role'));
    const page = nodes.find((node) => node['@type'] === 'WebPage');
    expect(page, JSON.stringify(nodes.map((node) => node['@type']))).toBeTruthy();
    const url = String(page!.url);
    expect(url).toMatch(/\/role$/);
    expect(page!['@id']).toBe(`${url}#page`);
    expect(String(page!.name)).toMatch(/^AI governance engineer\b/);
    expect(String(page!.description).length).toBeGreaterThan(50);
    expect(String(page!.dateModified)).toMatch(/^\d{4}-\d{2}-\d{2}/);
    expect(page!.author).toEqual(
      expect.arrayContaining([expect.objectContaining({ '@id': expect.any(String) })]),
    );
    expect(page!.publisher).toEqual({ '@id': expect.stringMatching(/#org$/) });
    const crumbList = nodes.find((node) => node['@type'] === 'BreadcrumbList');
    expect(crumbList?.['@id']).toBeTruthy();
    expect(page!.breadcrumb).toEqual({ '@id': crumbList?.['@id'] });
    expect(page!.about).toEqual({
      '@id': expect.stringMatching(/\/glossary\/ai-governance-engineer#term$/),
    });
    // Salary stays page content: no Occupation, no (retired) EstimatedSalary.
    const serialised = JSON.stringify(nodes);
    expect(serialised).not.toContain('"Occupation"');
    expect(serialised).not.toContain('EstimatedSalary');
  });

  test('the home links /role with a descriptive anchor', () => {
    const anchors = linksTo(mainContent(html('/')), '/role');
    expect(
      anchors.some((anchor) => /AI governance engineer/i.test(anchor)),
      anchors.join(' | '),
    ).toBe(true);
  });
});

test.describe('the "<A> vs <B>" pages are linked from outside the crosswalk', () => {
  const MIN_COMPARISON_REFERRERS = 8;
  const glossaryTerm: Record<string, string> = {
    'eu-ai-act': '/glossary/ai-act-eu',
    'iso-42001': '/glossary/iso-iec-42001',
    'nist-ai-rmf': '/glossary/nist-ai-rmf',
  };

  for (const c of comparisons) {
    const path = comparisonPath(c);
    test(`${path} has at least ${MIN_COMPARISON_REFERRERS} referrers from <main>`, () => {
      const referrers = indexable().filter(
        (route) => route !== path && linksTo(mainContent(html(route)), path).length > 0,
      );
      expect(referrers.length, referrers.join('\n')).toBeGreaterThanOrEqual(
        MIN_COMPARISON_REFERRERS,
      );
      // Not only the crosswalk cluster links it.
      const outside = referrers.filter((route) => !route.startsWith('/resources/crosswalk'));
      expect(outside.length, referrers.join('\n')).toBeGreaterThanOrEqual(
        MIN_COMPARISON_REFERRERS - 4,
      );
    });

    test(`${path} is linked as "${c.aName} vs ${c.bName}" from the pages on its instruments`, () => {
      const anchor = `${c.aName} vs ${c.bName}`;
      const sources = [
        glossaryTerm[c.a],
        glossaryTerm[c.b],
        '/bok/principles-and-standards',
        '/resources/frameworks',
        ...(c.a === 'eu-ai-act' || c.b === 'eu-ai-act' ? ['/bok/eu-ai-act'] : []),
      ];
      for (const route of sources) {
        expect(linksTo(mainContent(html(route)), path), route).toContain(anchor);
      }
      // The obligation pages of both instruments carry the "Compared side by side" line.
      for (const frameworkId of [c.a, c.b]) {
        const rows = obligations.filter((o) => o.frameworkId === frameworkId);
        expect(rows.length, frameworkId).toBeGreaterThan(0);
        for (const row of rows) {
          const route = obligationPath(row);
          expect(linksTo(mainContent(html(route)), path), route).toContain(anchor);
        }
      }
    });
  }

  test('an obligation page of an instrument no comparison covers links none of them', () => {
    const compared = new Set(comparisons.flatMap((c) => [c.a, c.b]));
    const other = frameworks.find(
      (fw) => !compared.has(fw.id) && obligations.some((o) => o.frameworkId === fw.id),
    );
    expect(other).toBeTruthy();
    const row = obligations.find((o) => o.frameworkId === other!.id)!;
    const main = mainContent(html(obligationPath(row)));
    for (const c of comparisons) {
      expect(linksTo(main, comparisonPath(c)), obligationPath(row)).toEqual([]);
    }
  });
});

test.describe('case and tool pages link the pillar', () => {
  test('every case page links the pillar from its content', () => {
    for (const entry of cases) {
      const route = `/cases/${entry.id}`;
      expect(linksTo(mainContent(html(route)), PILLAR).length, route).toBeGreaterThan(0);
    }
  });

  test('every live toolkit tool links the pillar from its content', () => {
    const live = tools.filter((t) => t.status === 'live');
    expect(live.length).toBeGreaterThan(0);
    for (const tool of live) {
      expect(linksTo(mainContent(html(tool.href)), PILLAR).length, tool.href).toBeGreaterThan(0);
    }
  });
});
