// seo-head.spec.ts: the head-metadata rules of lib/meta.ts and the breadcrumb
// @ids of lib/breadcrumbs.ts, held across every page the build writes. The
// text rules are exercised directly on the inputs the pages pass (glossary
// definitions, chapter summaries); the site-wide rules read the built HTML in
// dist, which is what the preview server serves, so no page is left unchecked.
import { test, expect } from '@playwright/test';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { documentTitle, metaDescription, MAX_DESCRIPTION, MIN_DESCRIPTION } from '../src/lib/meta';
import { getGlossary } from '../src/lib/glossary';
import { chaptersOrdered } from '../src/data/chapters';

// Mirrors src/data/site.ts. Hardcoded on purpose: a test that imported the same
// constant it asserts on would pass however the value drifted.
const SITE_ORIGIN = 'https://aigovernanceengineer.com';
const SITE_NAME = 'AI Governance Engineer';
const SUFFIX = ` · ${SITE_NAME}`;
const PERSON_NAME = 'Jorge García Aibar';

/** Every HTML page in dist as [route, html], less the static diagram viewers. */
function builtPages(dir = 'dist', root = dir): [string, string][] {
  const out: [string, string][] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (full.replace(/\\/g, '/') !== `${root}/diagrams`) out.push(...builtPages(full, root));
    } else if (name.endsWith('.html')) {
      const route = full
        .slice(root.length)
        .replace(/\\/g, '/')
        .replace(/\.html$/, '')
        .replace(/\/index$/, '');
      out.push([route === '' ? '/' : route, readFileSync(full, 'utf8')]);
    }
  }
  return out;
}

const decode = (text: string) =>
  text
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&amp;/g, '&');

/** `content` of the first meta tag matching `attr="value"`, decoded. */
function metaOf(html: string, attr: string, value: string): string | undefined {
  const tag = html.match(new RegExp(`<meta [^>]*${attr}="${value}"[^>]*>`))?.[0];
  const content = tag?.match(/content="([^"]*)"/)?.[1];
  return content === undefined ? undefined : decode(content);
}

const titleOf = (html: string) => decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');

/** A letter or digit: what a cut must never fall between. */
const WORD_CHAR = /[\p{L}\p{N}]/u;

/**
 * `out` is a faithful snippet of `input`: the whole text, a cut at a sentence
 * end, the opening clauses of its first sentence closed with a full stop (its
 * parenthetical asides may be dropped), or a cut between two words marked with
 * `…`, never inside a word.
 */
function expectCleanCut(input: string, out: string, label: string): void {
  const clean = input.replace(/\s+/g, ' ').trim();
  const bare = clean.replace(/\s+\([^()]*\)/g, '');
  expect(out.length, `${label}: ${out}`).toBeLessThanOrEqual(MAX_DESCRIPTION);
  if (out === clean) return;
  if (out.endsWith('…')) {
    const head = out.slice(0, -1);
    expect(clean.startsWith(head), `${label}: not a prefix: ${out}`).toBe(true);
    expect(WORD_CHAR.test(clean[head.length] ?? ''), `${label}: cut mid-word: ${out}`).toBe(false);
    expect(head, `${label}: dangling punctuation: ${out}`).not.toMatch(/[\s,;:]$/);
  } else {
    expect(out, `${label}: not a sentence end: ${out}`).toMatch(/[.!?]["'”’)\]]?$/);
    const head = clean.startsWith(out) ? out : out.replace(/\.$/, '');
    const source = clean.startsWith(head) ? clean : bare;
    expect(source.startsWith(head), `${label}: not the text's own opening: ${out}`).toBe(true);
    expect(WORD_CHAR.test(source[head.length] ?? ''), `${label}: cut mid-word: ${out}`).toBe(false);
    expect(out.length, `${label}: cut too short`).toBeGreaterThanOrEqual(MIN_DESCRIPTION);
  }
}

test.describe('meta description cuts (lib/meta.ts)', () => {
  test('short text is kept whole, whitespace collapsed', () => {
    expect(metaDescription('  A short\n description.  ')).toBe('A short description.');
  });

  test('long text is cut at the last sentence end in budget, without an ellipsis', () => {
    const first = 'The first sentence states the definition in plain words for a reader who needs it.';
    const second = 'A second sentence adds the context that makes the definition useful here.';
    const text = `${first} ${second} A third one would push the snippet far past its budget.`;
    expect(metaDescription(text)).toBe(`${first} ${second}`);
  });

  test('an abbreviation is not a sentence end', () => {
    const text =
      'Providers must keep logs under Art. 12 of the Act and hand them to the authority on request, which is what the record-keeping duty of the regulation asks of every high-risk provider today.';
    const out = metaDescription(text);
    expect(out.endsWith('Art.')).toBe(false);
    expectCleanCut(text, out, 'abbreviation');
  });

  test('a long first sentence is cut at a clause break and closed, not with …', () => {
    const text =
      "With exams cancelled in 2020, the grading model assigned grades from each school's history of results; four days after the results came out, the regulator reverted to teacher grades.";
    const out = metaDescription(text);
    expect(out).toBe(
      "With exams cancelled in 2020, the grading model assigned grades from each school's history of results.",
    );
    expectCleanCut(text, out, 'clause');
  });

  test('without a usable sentence end or clause break, the cut falls between words, with …', () => {
    const text = `${'governance '.repeat(20)}engineering`;
    const out = metaDescription(text);
    expect(out.endsWith('…')).toBe(true);
    expectCleanCut(text, out, 'words');
  });

  test('every glossary definition and chapter summary cuts cleanly', () => {
    const inputs: [string, string][] = [
      ...getGlossary().map((entry) => [entry.url, entry.definition] as [string, string]),
      ...chaptersOrdered.map((c) => [`/bok/${c.slug}`, c.summary] as [string, string]),
    ];
    expect(inputs.length).toBeGreaterThan(100);
    for (const [label, text] of inputs) expectCleanCut(text, metaDescription(text), label);
  });
});

test.describe('document title (lib/meta.ts)', () => {
  test('the suffix is added only while the title stays within 60 characters', () => {
    expect(documentTitle('Patterns', SITE_NAME)).toBe(`Patterns${SUFFIX}`);
    const long = 'Zillow Offers: a pricing model committing capital into a turning market';
    expect(documentTitle(long, SITE_NAME)).toBe(long);
    expect(documentTitle('Home', SITE_NAME, false)).toBe('Home');
  });
});

test.describe('every built page', () => {
  const pages = builtPages();

  test('the build wrote pages to check', () => {
    expect(pages.length).toBeGreaterThan(300);
  });

  test('no title passes 60 characters because of the site-name suffix', () => {
    const over = pages
      .map(([route, html]) => [route, titleOf(html)])
      .filter(([, title]) => title.endsWith(SUFFIX) && title.length > 60);
    expect(over, over.map(([r, t]) => `${r}: ${t}`).join('\n')).toEqual([]);
  });

  test('no meta description is over budget or ends in a broken cut', () => {
    const bad: string[] = [];
    for (const [route, html] of pages) {
      const description = metaOf(html, 'name', 'description');
      if (description === undefined) continue;
      if (description.length > MAX_DESCRIPTION) bad.push(`${route}: ${description.length} chars`);
      if (description.includes('...')) bad.push(`${route}: three dots: ${description}`);
      if (/[\s,;:]…$/.test(description)) bad.push(`${route}: dangling …: ${description}`);
    }
    expect(bad, bad.join('\n')).toEqual([]);
  });

  test('no indexable page has a description that ends in … or runs under 70 characters', () => {
    const bad: string[] = [];
    for (const [route, html] of pages) {
      const description = metaOf(html, 'name', 'description');
      if (description === undefined || metaOf(html, 'name', 'robots')?.includes('noindex')) continue;
      if (description.endsWith('…')) bad.push(`${route}: ends in …: ${description}`);
      if (description.length < MIN_DESCRIPTION) bad.push(`${route}: ${description.length} chars: ${description}`);
    }
    expect(bad, bad.join('\n')).toEqual([]);
  });

  test('a figure page declares the real size of the PNG it shares', () => {
    const figures = pages.filter(([route]) => /^\/figures\/[^/]+$/.test(route));
    expect(figures.length).toBeGreaterThan(20);
    let checked = 0;
    for (const [route, html] of figures) {
      const image = metaOf(html, 'property', 'og:image') ?? '';
      if (!image.endsWith('.png') || image.includes('/og/')) continue;
      // The PNG's own size, from its IHDR chunk (bytes 16 to 23).
      const png = readFileSync(join('dist', new URL(image).pathname));
      expect(metaOf(html, 'property', 'og:image:width'), route).toBe(String(png.readUInt32BE(16)));
      expect(metaOf(html, 'property', 'og:image:height'), route).toBe(String(png.readUInt32BE(20)));
      expect(metaOf(html, 'property', 'og:image:type'), route).toBe('image/png');
      checked += 1;
    }
    expect(checked).toBeGreaterThan(20);
  });

  test('the Thesis pair names the other language as og:locale:alternate, and only it', () => {
    const byRoute = new Map(pages);
    const en = byRoute.get('/thesis') ?? '';
    const es = byRoute.get('/es/thesis') ?? '';
    expect(metaOf(en, 'property', 'og:locale')).toBe('en_US');
    expect(metaOf(en, 'property', 'og:locale:alternate')).toBe('es_ES');
    expect(metaOf(es, 'property', 'og:locale')).toBe('es_ES');
    expect(metaOf(es, 'property', 'og:locale:alternate')).toBe('en_US');
    const others = pages
      .filter(([route]) => route !== '/thesis' && route !== '/es/thesis')
      .filter(([, html]) => html.includes('og:locale:alternate'))
      .map(([route]) => route);
    expect(others).toEqual([]);
  });

  test('/es/thesis describes the card it shares in Spanish', () => {
    const es = pages.find(([route]) => route === '/es/thesis')?.[1] ?? '';
    expect(metaOf(es, 'property', 'og:image:alt')).toMatch(/^Tarjeta de «The Thesis», en inglés/);
    expect(metaOf(es, 'name', 'twitter:image:alt')).toMatch(/^Tarjeta/);
  });

  test('article:author names the Person in full everywhere', () => {
    const authors = pages
      .map(([route, html]) => [route, metaOf(html, 'property', 'article:author')])
      .filter(([, author]) => author !== undefined);
    expect(authors.length).toBeGreaterThan(20);
    for (const [route, author] of authors) expect(author, route).toBe(PERSON_NAME);
  });

  test('a page on the shared Resources card says what the card shows', () => {
    const html = pages.find(([route]) => route === '/glossary/serious-incident')?.[1] ?? '';
    expect(metaOf(html, 'property', 'og:image')).toBe(`${SITE_ORIGIN}/og/resources.png`);
    expect(metaOf(html, 'property', 'og:image:alt')).toBe(`Resources & reading list${SUFFIX}`);
    expect(metaOf(html, 'name', 'twitter:image:alt')).toBe(`Resources & reading list${SUFFIX}`);
  });

  test('every page links the content licence', () => {
    const missing = pages
      .filter(([, html]) => html.includes('<head'))
      .filter(([, html]) => !html.includes('rel="license"'))
      .map(([route]) => route);
    expect(missing).toEqual([]);
  });

  test('every BreadcrumbList carries its page-stable #breadcrumb @id', () => {
    const bad: string[] = [];
    let lists = 0;
    for (const [route, html] of pages) {
      const raw = html.match(
        /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/,
      )?.[1];
      if (!raw) continue;
      const graph = (JSON.parse(raw)['@graph'] ?? []) as Record<string, unknown>[];
      const selfUrl = route === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${route}`;
      for (const node of graph.filter((n) => n['@type'] === 'BreadcrumbList')) {
        lists += 1;
        if (node['@id'] !== `${selfUrl}#breadcrumb`) bad.push(`${route}: ${String(node['@id'])}`);
      }
    }
    expect(lists).toBeGreaterThan(300);
    expect(bad, bad.join('\n')).toEqual([]);
  });
});
