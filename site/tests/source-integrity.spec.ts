// source-integrity.spec.ts: the numbered sources of chapters 11 to 23 against
// the house rules (STYLEGUIDE.md §6 and openspec source-integrity). Runs in the
// Playwright test runner but uses no browser: pure Node reads and assertions.
//
// - every [n] in the prose resolves to a "## Sources" entry, every entry is
//   cited, and the list is numbered 1..N without gaps;
// - EU legal text is cited on EUR-Lex, never on a third-party explorer, and an
//   unofficial reproduction of a statute (gdpr-info.eu, the Legal Information
//   Institute) never carries the `primary` tag;
// - an anchored EUR-Lex link uses the ids EUR-Lex gives articles (art_<n>),
//   annexes (anx_<n>) and recitals (rct_<n>, Official Journal text only);
// - each entry has a row with the same number, URL and tag in its chapter's
//   section of sources/SOURCES.md (every copy of the section).

import { readdirSync } from 'node:fs';
import { test, expect } from '@playwright/test';

import { readSource, sourcePath } from '../src/lib/md-parse';

interface Entry {
  n: number;
  url: string;
  tag: string;
  line: string;
}

const CHAPTERS = readdirSync(sourcePath('bok'))
  .filter((f) => /^(1[1-9]|2[0-3])-.+\.md$/.test(f))
  .sort();

const SOURCES_MD = readSource('sources/SOURCES.md').split(/\r?\n/);

function split(file: string): { body: string; entries: Entry[] } {
  const lines = readSource(`bok/${file}`).split(/\r?\n/);
  const at = lines.findIndex((l) => l.trim() === '## Sources');
  const entries: Entry[] = [];
  for (const line of lines.slice(at + 1)) {
    const m = /^\[(\d+)\] .*?(https?:\/\/\S+) \(verified: (\w+)\)\s*$/.exec(line);
    if (m) entries.push({ n: Number(m[1]), url: m[2], tag: m[3], line });
  }
  return { body: lines.slice(0, at).join('\n'), entries };
}

/** Rows `| n | … | url | tag | used |` under every `### bok/<file>` heading. */
function rowsFor(file: string): Map<number, Array<{ url: string; tag: string }>> {
  const rows = new Map<number, Array<{ url: string; tag: string }>>();
  let inside = false;
  for (const line of SOURCES_MD) {
    if (line.startsWith('#')) {
      inside = line.trim() === `### bok/${file}`;
      continue;
    }
    if (!inside) continue;
    const m = /^\| (\d+) \|/.exec(line);
    if (!m) continue;
    const cells = line.split(' | ');
    const list = rows.get(Number(m[1])) ?? [];
    list.push({ url: cells[cells.length - 3], tag: cells[cells.length - 2] });
    rows.set(Number(m[1]), list);
  }
  return rows;
}

test('chapters 11 to 23 are all found', () => {
  expect(CHAPTERS.length).toBe(13);
});

for (const file of CHAPTERS) {
  test.describe(`bok/${file} sources`, () => {
    const { body, entries } = split(file);

    test('markers and entries match, numbered without gaps', () => {
      expect(entries.length).toBeGreaterThan(0);
      const numbers = entries.map((e) => e.n);
      expect(numbers).toEqual(numbers.map((_, i) => i + 1));
      const cited = new Set([...body.matchAll(/\[(\d+)\]/g)].map((m) => Number(m[1])));
      expect([...cited].filter((n) => !numbers.includes(n)), 'markers without an entry').toEqual([]);
      expect(numbers.filter((n) => !cited.has(n)), 'entries never cited').toEqual([]);
    });

    test('legal text is cited on the official publisher', () => {
      const explorer = entries.filter((e) => e.url.includes('artificialintelligenceact.eu'));
      expect(explorer.map((e) => e.n), 'AI Act Explorer entries').toEqual([]);
      const reproductions = entries.filter(
        (e) => e.tag === 'primary' && /gdpr-info\.eu|law\.cornell\.edu/.test(e.url),
      );
      expect(reproductions.map((e) => e.n), 'unofficial reproductions tagged primary').toEqual([]);
    });

    test('EUR-Lex anchors use article, annex or recital ids', () => {
      for (const e of entries.filter((x) => x.url.includes('eur-lex.europa.eu') && x.url.includes('#'))) {
        const anchor = e.url.split('#')[1];
        const consolidated = /\/eli\/reg\/\d{4}\/\d+\/\d{4}-\d{2}-\d{2}\//.test(e.url);
        const ids = consolidated ? /^(art|anx)_[0-9A-Za-z]+$/ : /^(art|anx|rct)_[0-9A-Za-z]+$/;
        expect(anchor, `[${e.n}] ${e.url}`).toMatch(ids);
      }
    });

    test('each entry has a matching SOURCES.md row', () => {
      const rows = rowsFor(file);
      for (const e of entries) {
        const found = rows.get(e.n) ?? [];
        expect(found.length, `row for [${e.n}]`).toBeGreaterThan(0);
        for (const row of found) {
          expect(row, `row for [${e.n}]`).toEqual({ url: e.url, tag: e.tag });
        }
      }
    });
  });
}
