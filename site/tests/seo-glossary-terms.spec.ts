// seo-glossary-terms.spec.ts: SEO round 5, block gloss (audit 2026-09-26).
//   - each glossary term is dated by its own last change (CONTENT C-1): the
//     history walk of lib/glossary-dates.ts on synthetic versions, then the
//     built pages, whose byline, JSON-LD dateModified and sitemap lastmod agree;
//   - the "AI governance" DefinedTerm carries sameAs (GEO S1) and one wording
//     of the definition on the pillar and in the glossary (GEO S3);
//   - the impact assessment term names "AI impact assessment (AIIA)" and links
//     the builder and the template (SXO-N-03);
//   - the TDM exception body keeps Articles 3 and 4 apart (CONTENT C-2);
//   - /bok/glossary opens on a topic H1 and an A-Z row inside the first screen
//     at 390 px (SXO-N-04);
//   - the sitemap declares no unused news / video namespace (SITEMAP SM-1).
// The data and dist halves need no browser; dist is what the preview serves.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getGlossary, getGlossaryEntry } from '../src/lib/glossary';
import {
  termDate,
  termDatesFromHistory,
  termFingerprints,
  type GlossaryVersion,
} from '../src/lib/glossary-dates';
import { glossaryLinks } from '../src/data/glossary-links';

const SOURCES = '## Sources\n\n[1] First source. https://a.example (verified: primary)\n[2] Second source. https://b.example (verified: primary)\n';

/** A glossary file with the given term paragraphs and Sources block. */
function glossary(paragraphs: string[], sources = SOURCES): string {
  return ['# 09. Glossary', '', ...paragraphs.flatMap((p) => [p, '']), sources].join('\n');
}

const ALPHA = '**Alpha.** The first term [1]. See [ch. 01, One](/bok/one#one). (ch. 01)';
const BETA = '**Beta.** The second term [2]. See [ch. 02, Two](/bok/two#two). (ch. 02)';

function version(sha: string, parents: string[], date: string, markdown: string): GlossaryVersion {
  return { sha, parents, date, markdown };
}

test.describe('glossary term dates: the history walk', () => {
  test('an edit to one term re-dates that term only', () => {
    const v1 = glossary([ALPHA, BETA]);
    const v2 = glossary([ALPHA, BETA.replace('second term', 'second defined term')]);
    const dates = termDatesFromHistory(
      [version('b', ['a'], '2026-09-20', v2), version('a', [], '2026-09-01', v1)],
      v2,
    );
    expect(dates.get('alpha')).toBe('2026-09-01');
    expect(dates.get('beta')).toBe('2026-09-20');
  });

  test('re-wrapping lines and renumbering sources are not changes', () => {
    const v1 = glossary([ALPHA, BETA]);
    const rewrapped = ALPHA.replace('first term [1]. See', 'first term [1].\nSee');
    const renumbered = glossary(
      [rewrapped.replace('[1]', '[2]'), BETA.replace('[2]', '[1]')],
      '## Sources\n\n[1] Second source. https://b.example (verified: primary)\n[2] First source. https://a.example (verified: primary)\n',
    );
    expect(termFingerprints(renumbered)).toEqual(termFingerprints(v1));
    const dates = termDatesFromHistory(
      [version('b', ['a'], '2026-09-20', renumbered), version('a', [], '2026-09-01', v1)],
      renumbered,
    );
    expect(dates.get('alpha')).toBe('2026-09-01');
    expect(dates.get('beta')).toBe('2026-09-01');
  });

  test('correcting a cited source re-dates the terms that cite it', () => {
    const v1 = glossary([ALPHA, BETA]);
    const v2 = glossary([ALPHA, BETA], SOURCES.replace('Second source.', 'Second source, Art. 4.'));
    const dates = termDatesFromHistory(
      [version('b', ['a'], '2026-09-20', v2), version('a', [], '2026-09-01', v1)],
      v2,
    );
    expect(dates.get('alpha')).toBe('2026-09-01');
    expect(dates.get('beta')).toBe('2026-09-20');
  });

  test('a merge that only brings in a branch edit keeps the branch date; a revert dates the revert', () => {
    const base = glossary([ALPHA, BETA]);
    const edited = glossary([ALPHA.replace('first term', 'first edited term'), BETA]);
    // a (base) -> b (branch edit, 09-10) -> m (merge of b into a line that did
    // not touch the file, 09-15): m inherits Alpha from b.
    const merged = termDatesFromHistory(
      [
        version('m', ['a', 'b'], '2026-09-15', edited),
        version('b', ['a'], '2026-09-10', edited),
        version('a', [], '2026-09-01', base),
      ],
      edited,
    );
    expect(merged.get('alpha')).toBe('2026-09-10');
    expect(merged.get('beta')).toBe('2026-09-01');
    // ... then r reverts b: Alpha is back to its base text, dated by r.
    const reverted = termDatesFromHistory(
      [
        version('r', ['b'], '2026-09-22', base),
        version('b', ['a'], '2026-09-10', edited),
        version('a', [], '2026-09-01', base),
      ],
      base,
    );
    expect(reverted.get('alpha')).toBe('2026-09-22');
    expect(reverted.get('beta')).toBe('2026-09-01');
  });

  test('a term not committed in its current form has no history date', () => {
    const v1 = glossary([ALPHA]);
    const dates = termDatesFromHistory([version('a', [], '2026-09-01', v1)], glossary([ALPHA, BETA]));
    expect(dates.has('beta')).toBe(false);
    expect(termDatesFromHistory([], v1).size).toBe(0);
  });
});

/* ---- The built pages ---- */

const entries = getGlossary().filter((entry) => existsSync(join('dist', 'glossary', `${entry.slug}.html`)));
const htmlOf = (path: string): string => readFileSync(join('dist', `${path}.html`), 'utf8');

/** Every JSON-LD node on a built page, @graph members flattened. */
function jsonLdNodes(html: string): Record<string, unknown>[] {
  const nodes: Record<string, unknown>[] = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    const data = JSON.parse(m[1]);
    for (const item of Array.isArray(data) ? data : [data]) {
      if (Array.isArray(item['@graph'])) nodes.push(...item['@graph']);
      else nodes.push(item);
    }
  }
  return nodes;
}

const nodeById = (html: string, id: string) => jsonLdNodes(html).find((node) => node['@id'] === id);

/** The sitemap's lastmod per absolute URL. */
function sitemapLastmods(): Map<string, string> {
  const xml = readFileSync(join('dist', 'sitemap-0.xml'), 'utf8');
  const out = new Map<string, string>();
  for (const m of xml.matchAll(/<url><loc>([^<]+)<\/loc>(?:(?!<\/url>)[\s\S])*?<lastmod>([^<]+)<\/lastmod>/g)) {
    out.set(m[1], m[2].slice(0, 10));
  }
  return out;
}

test.describe('glossary term dates: the built pages', () => {
  test('the byline, dateModified and sitemap lastmod state the term date on every term page', () => {
    expect(entries.length).toBeGreaterThan(300);
    const lastmods = sitemapLastmods();
    const bad: string[] = [];
    for (const entry of entries) {
      const html = htmlOf(`glossary/${entry.slug}`);
      const url = `https://aigovernanceengineer.com${entry.url}`;
      const expected = termDate(entry.slug);
      const byline = /class="byline"[\s\S]*?<time datetime="([^"]+)"/.exec(html)?.[1];
      const modified = nodeById(html, `${url}#webpage`)?.dateModified;
      const lastmod = lastmods.get(url);
      if (byline !== expected || modified !== expected || lastmod !== expected) {
        bad.push(`${entry.slug}: term ${expected}, byline ${byline}, dateModified ${modified}, lastmod ${lastmod}`);
      }
    }
    expect(bad, bad.join('\n')).toEqual([]);
  });

  test('the terms are not all dated alike', () => {
    const dates = new Set(entries.map((entry) => termDate(entry.slug)));
    expect(dates.size).toBeGreaterThan(1);
  });
});

test.describe('AI governance: one definition, one node, sameAs', () => {
  const SAME_AS = [
    'https://www.wikidata.org/wiki/Q130610796',
    'https://en.wikipedia.org/wiki/AI_governance',
  ];
  const termId = 'https://aigovernanceengineer.com/glossary/ai-governance#term';

  test('the DefinedTerm on the pillar and on the term page carries the same sameAs', () => {
    for (const path of ['ai-governance', 'glossary/ai-governance']) {
      const node = nodeById(htmlOf(path), termId);
      expect(node, path).toBeDefined();
      expect(node?.sameAs, path).toEqual(SAME_AS);
    }
  });

  test('only the terms listed in data/glossary-links.ts carry sameAs', () => {
    for (const entry of entries) {
      const node = nodeById(htmlOf(`glossary/${entry.slug}`), `https://aigovernanceengineer.com${entry.url}#term`);
      const expected = glossaryLinks[entry.slug]?.sameAs;
      expect(node?.sameAs, entry.slug).toEqual(expected ? [...expected] : undefined);
    }
  });

  test('the pillar opens with the glossary definition, word for word', () => {
    const answer = readFileSync(join('..', 'guides', 'ai-governance.md'), 'utf8')
      .replace(/\r\n/g, '\n')
      .match(/^> (.+(?:\n> .+)*)/m)?.[1]
      .replace(/\n> /g, ' ');
    const pillarFirst = answer?.match(/^AI governance is (.+?\.)\s/)?.[1];
    const glossaryFirst = getGlossaryEntry('ai-governance')?.definition.match(/^(.+?\.)\s/)?.[1];
    expect(pillarFirst).toBeTruthy();
    expect(glossaryFirst?.replace(/^The /, 'the ')).toBe(pillarFirst);
  });
});

test.describe('AI system impact assessment names the AIIA and links its tools', () => {
  test('the term page says "AI impact assessment (AIIA)" and links the builder and the template', () => {
    const html = htmlOf('glossary/ai-system-impact-assessment');
    expect(html).toContain('AI impact assessment (AIIA)');
    expect(html).toContain('href="/toolkit/impact-assessment"');
    expect(html).toContain('href="/resources/templates#schema-impact-assessment"');
    const node = nodeById(html, 'https://aigovernanceengineer.com/glossary/ai-system-impact-assessment#term');
    expect(node?.alternateName).toEqual(['AI impact assessment', 'AIIA']);
  });

  test('the template anchor exists', () => {
    expect(htmlOf('resources/templates')).toContain('id="schema-impact-assessment"');
  });
});

test.describe('TDM exception keeps the two articles apart', () => {
  test('Article 3 (research, no opt-out) and Article 4 (anyone, unless reserved) are stated separately', () => {
    const definition = getGlossaryEntry('tdm-exception')?.definition ?? '';
    expect(definition).not.toContain('Articles 3 and 4');
    expect(definition).toMatch(/Article 3 covers scientific research by research organisations and cultural heritage institutions/);
    expect(definition).toMatch(/Article 4 lets anyone .* unless the rightholder has reserved it/);
  });
});

test.describe('/bok/glossary opens on the topic and the A-Z row', () => {
  test('the H1 names the topic and every letter link lands on a letter heading', () => {
    const html = htmlOf('bok/glossary');
    expect(/<h1[^>]*>([^<]+)<\/h1>/.exec(html)?.[1]).toBe('AI governance glossary');
    const nav = /<nav[^>]*data-glossary-jump[\s\S]*?<\/nav>/.exec(html)?.[0] ?? '';
    const targets = [...nav.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
    expect(targets.length).toBeGreaterThan(20);
    for (const id of targets) expect(html, `#${id}`).toMatch(new RegExp(`<h2[^>]* id="${id}"`));
  });

  test('at 390 px the A-Z row is inside the first screen', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/bok/glossary');
    const row = page.locator('[data-glossary-jump] ul');
    const box = await row.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y + box!.height).toBeLessThanOrEqual(844);
    const first = await page.locator('[data-glossary-jump] a').first().boundingBox();
    expect(first!.height).toBeGreaterThanOrEqual(24);
    expect(first!.width).toBeGreaterThanOrEqual(24);
  });
});

test.describe('sitemap namespaces', () => {
  test('no news or video namespace on <urlset>', () => {
    const xml = readFileSync(join('dist', 'sitemap-0.xml'), 'utf8');
    const urlset = /<urlset[^>]*>/.exec(xml)?.[0] ?? '';
    expect(urlset).not.toContain('xmlns:news');
    expect(urlset).not.toContain('xmlns:video');
    expect(urlset).toContain('xmlns:xhtml');
  });
});
