// seo-compare.spec.ts: the "<A> vs <B>" comparison pages under
// /resources/crosswalk (SXO-04 of the 2026-09-25 audit). Each page is built,
// has one H1, a search title within 60 characters that no other comparison
// shares, an answer box and two question answers of 40 to 60 words, 3 to 5 FAQ
// items, the "At a glance" and overlap tables, a TechArticle and a
// BreadcrumbList (no FAQPage), and links that resolve: every crosswalk topic
// anchor, obligation page and pattern page it names exists in dist. The
// crosswalk hub links every page, and the sitemap (with a lastmod) and
// llms.txt list them. Read from dist, like seo-titles.spec.ts.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { comparisons, comparisonPath, glance } from '../src/data/comparisons';
import { buildComparison } from '../src/lib/comparisons';

const MAX_DOCUMENT_TITLE = 60;

/** The built HTML file of a clean route, or undefined. */
function builtFile(route: string): string | undefined {
  const base = join('dist', ...route.split('/').filter(Boolean));
  return [`${base}.html`, join(base, 'index.html')].find((f) => existsSync(f));
}

function html(route: string): string {
  const file = builtFile(route);
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
    .replace(/\s+/g, ' ')
    .trim();
}

const text = (fragment: string) => decode(fragment.replace(/<[^>]+>/g, ''));

function documentTitle(page: string): string {
  const head = page.slice(0, page.indexOf('</head>'));
  const match = /<title>([^<]*)<\/title>/.exec(head);
  if (!match) throw new Error('no <title> in <head>');
  return decode(match[1]);
}

function jsonLdTypes(page: string): string[] {
  const types: string[] = [];
  for (const match of page.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    const data = JSON.parse(match[1]) as Record<string, unknown>;
    const nodes = (Array.isArray(data['@graph']) ? data['@graph'] : [data]) as Record<string, unknown>[];
    for (const node of nodes) {
      const type = node['@type'];
      types.push(...(Array.isArray(type) ? type : [type]).map(String));
    }
  }
  return types;
}

const words = (s: string) => s.trim().split(/\s+/).length;

/** The <table> element carrying `marker`, whole. */
function table(page: string, marker: string): string {
  const start = page.indexOf(marker);
  expect(start, `no table ${marker}`).toBeGreaterThan(-1);
  const open = page.lastIndexOf('<table', start);
  return page.slice(open, page.indexOf('</table>', start) + '</table>'.length);
}

/** Internal hrefs (no scheme, no protocol-relative) inside `fragment`. */
function internalHrefs(fragment: string): string[] {
  return [...fragment.matchAll(/href="(\/[^"/][^"]*|\/)"/g)].map((m) => decode(m[1]));
}

test.describe('comparison pages', () => {
  test('the editorial answers stay within the answer-box length', () => {
    expect(comparisons.length).toBeGreaterThanOrEqual(3);
    expect(comparisons.length).toBeLessThanOrEqual(6);
    for (const c of comparisons) {
      for (const [name, value] of [
        ['answer', c.answer],
        ['canUse', c.canUse],
        ['startWith', c.startWith],
      ] as const) {
        const n = words(value);
        expect(n, `${c.slug} ${name}: ${n} words`).toBeGreaterThanOrEqual(40);
        expect(n, `${c.slug} ${name}: ${n} words`).toBeLessThanOrEqual(60);
      }
      // One FAQ item is generated from the crosswalk on top of these.
      expect(c.faq.length + 1).toBeGreaterThanOrEqual(3);
      expect(c.faq.length + 1).toBeLessThanOrEqual(5);
      expect(glance[c.a], `glance facts for ${c.a}`).toBeDefined();
      expect(glance[c.b], `glance facts for ${c.b}`).toBeDefined();
    }
  });

  test('each page is built with one H1, a short unique title and a byline', () => {
    const titles = new Set<string>();
    const crosswalkTitle = documentTitle(html('/resources/crosswalk'));
    for (const c of comparisons) {
      const page = html(comparisonPath(c));
      const h1s = [...page.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
      expect(h1s, `${c.slug}: one <h1>`).toHaveLength(1);
      expect(text(h1s[0][1])).toBe(`${c.aName} vs ${c.bName}`);

      const title = documentTitle(page);
      expect(title.length, `${c.slug}: "${title}"`).toBeLessThanOrEqual(MAX_DOCUMENT_TITLE);
      expect(title.startsWith(`${c.aName} vs ${c.bName}`), title).toBe(true);
      expect(titles.has(title), `duplicate title "${title}"`).toBe(false);
      expect(title).not.toBe(crosswalkTitle);
      titles.add(title);

      expect(page).toMatch(/data-byline[\s\S]*?<time datetime="\d{4}-\d{2}-\d{2}"/);
    }
  });

  test('each page carries the answers, the FAQ and both tables', () => {
    for (const c of comparisons) {
      const page = html(comparisonPath(c));
      const plain = text(page);
      expect(page).toContain('data-cmp-answer');
      expect(plain).toContain(decode(c.answer));
      expect(plain).toContain(decode(c.canUse));
      expect(plain).toContain(decode(c.startWith));
      expect(plain).toContain(`Can you use ${c.aName} to comply with ${c.bName}?`);
      expect(plain).toContain('Which should you start with?');

      const faq = page.match(/data-cmp-faq/g) ?? [];
      expect(faq.length).toBeGreaterThanOrEqual(3);
      expect(faq.length).toBeLessThanOrEqual(5);

      // At a glance: the seven attributes plus the Body of Knowledge row.
      const glanceTable = table(page, 'data-cmp-glance');
      for (const label of ['Type', 'Issuer', 'Legal force', 'Scope and reach', 'Certifiable', 'Key artefacts', 'Dates']) {
        expect(glanceTable).toContain(`<th scope="row" class="c-name"`);
        expect(text(glanceTable)).toContain(label);
      }
      expect(glanceTable.match(/<tr/g)?.length).toBe(1 + 8);

      // The overlap table has one row per topic either instrument reaches.
      const cmp = buildComparison(c);
      const overlap = table(page, 'data-cmp-overlap');
      expect(overlap.match(/<tr data-level=/g)?.length).toBe(cmp.rows.length);
      expect(cmp.rows.length).toBeGreaterThan(0);
      expect(cmp.counts.both).toBeGreaterThan(0);
    }
  });

  test('every crosswalk, obligation and pattern link on a page resolves', () => {
    const crosswalk = html('/resources/crosswalk');
    for (const c of comparisons) {
      const page = html(comparisonPath(c));
      const start = page.indexOf('data-pagefind-body');
      const main = page.slice(start, page.indexOf('</main>', start));
      const hrefs = internalHrefs(main);
      const obligationLinks = hrefs.filter((h) => h.startsWith('/obligations/'));
      const patternLinks = hrefs.filter((h) => h.startsWith('/patterns/'));
      expect(obligationLinks.length, `${c.slug}: obligation links`).toBeGreaterThan(0);
      expect(patternLinks.length, `${c.slug}: pattern links`).toBeGreaterThan(0);

      for (const href of hrefs) {
        const [path, hash] = href.split('#');
        if (/\.(json|csv|txt|xml)$/.test(path)) {
          expect(existsSync(join('dist', path)), `${c.slug} -> ${href}`).toBe(true);
          continue;
        }
        expect(builtFile(path), `${c.slug} -> ${href}`).toBeDefined();
        if (hash && path === '/resources/crosswalk') {
          expect(crosswalk, `${c.slug} -> ${href}`).toContain(`id="${hash}"`);
        }
      }
    }
  });

  test('each page has a TechArticle and a BreadcrumbList, and no FAQPage', () => {
    for (const c of comparisons) {
      const types = jsonLdTypes(html(comparisonPath(c)));
      expect(types, c.slug).toContain('TechArticle');
      expect(types, c.slug).toContain('BreadcrumbList');
      expect(types, c.slug).not.toContain('FAQPage');
    }
  });

  test('the crosswalk hub, the sitemap and llms.txt list every page', () => {
    const crosswalk = html('/resources/crosswalk');
    const compareBlock = crosswalk.slice(crosswalk.indexOf('data-cw-compare'));
    const sitemaps = readdirSync('dist').filter((f) => /^sitemap-\d+\.xml$/.test(f));
    const sitemap = sitemaps.map((f) => readFileSync(join('dist', f), 'utf8')).join('\n');
    const llms = readFileSync(join('dist', 'llms.txt'), 'utf8');
    for (const c of comparisons) {
      const path = comparisonPath(c);
      expect(compareBlock, `crosswalk links ${path}`).toContain(`href="${path}"`);
      const entry = new RegExp(
        `<loc>https://aigovernanceengineer\\.com${path}</loc>\\s*<lastmod>\\d{4}-\\d{2}-\\d{2}`,
      );
      expect(sitemap, `sitemap lists ${path} with a lastmod`).toMatch(entry);
      expect(llms, `llms.txt lists ${path}`).toContain(`https://aigovernanceengineer.com${path}`);
    }
  });
});
