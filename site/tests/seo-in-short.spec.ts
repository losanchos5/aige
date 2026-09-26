// seo-in-short.spec.ts: every Body of Knowledge chapter opens with one "In short"
// callout, the self-contained answer passage AI engines quote (GEO audit G4/G5).
//
// The callout is a `> **In short**` blockquote right under the abstract, which
// remark-callouts renders as <aside class="callout" data-kind="summary">. It must
// be the only one on the page, sit before the first H2 and hold one paragraph of
// 110 to 190 words (the passage is written to 130-170; the slack absorbs how
// citations and glossary links render). The glossary and the reading list are
// lists, not arguments, and carry none.
import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { chaptersOrdered } from '../src/data/chapters';
import { readSource } from '../src/lib/md-parse';
import {
  IN_SHORT_MAX,
  IN_SHORT_MIN,
  extractorWords,
  inShortProse,
  spaceWords,
} from './helpers/in-short';

const EXEMPT = new Set(['glossary', 'reading-list']);
const MIN_WORDS = 110;
const MAX_WORDS = 190;

test.describe('In short callout', () => {
  for (const chapter of chaptersOrdered) {
    if (EXEMPT.has(chapter.slug)) {
      test(`/bok/${chapter.slug} has no In short callout`, async ({ page }) => {
        await page.goto(`/bok/${chapter.slug}`);
        await expect(page.locator('article.prose aside.callout[data-kind="summary"]')).toHaveCount(0);
      });
      continue;
    }

    test(`/bok/${chapter.slug} has one In short callout of ${MIN_WORDS}-${MAX_WORDS} words before the first H2`, async ({
      page,
    }) => {
      const response = await page.goto(`/bok/${chapter.slug}`);
      expect(response?.status()).toBe(200);

      const aside = page.locator('article.prose aside.callout[data-kind="summary"]');
      await expect(aside).toHaveCount(1);
      await expect(aside.locator('.callout-title')).toHaveText('In short');
      await expect(aside.locator('p:not(.callout-title)')).toHaveCount(1);

      const text = await aside.locator('p:not(.callout-title)').innerText();
      // Citation markers are references, not prose.
      const words = text.replace(/\[\d+\]/g, ' ').trim().split(/\s+/).filter(Boolean).length;
      expect(words, `${chapter.slug}: ${words} words`).toBeGreaterThanOrEqual(MIN_WORDS);
      expect(words, `${chapter.slug}: ${words} words`).toBeLessThanOrEqual(MAX_WORDS);
      expect(text).not.toMatch(/\bthis chapter\b/i);

      const before = await page.evaluate(() => {
        const a = document.querySelector('article.prose aside.callout[data-kind="summary"]');
        const h2 = document.querySelector('article.prose h2');
        return a && h2 ? Boolean(a.compareDocumentPosition(h2) & Node.DOCUMENT_POSITION_FOLLOWING) : false;
      });
      expect(before, `${chapter.slug}: In short sits before the first H2`).toBe(true);
    });
  }
});

// GEO audit 2026-09-26 (N3/G4): the rendered check above allows slack for how
// citations render; the passage as written is held to the band answer engines
// quote, 134-167 words, under both counts in helpers/in-short.ts.
test.describe('In short source length', () => {
  for (const chapter of chaptersOrdered.filter((c) => !EXEMPT.has(c.slug))) {
    test(`bok/${chapter.id}.md: In short of ${IN_SHORT_MIN}-${IN_SHORT_MAX} words`, () => {
      const lines = readSource(`bok/${chapter.id}.md`).split(/\r?\n/);
      const start = lines.findIndex((line) => line.trim() === '> **In short**');
      expect(start, 'a "> **In short**" line').toBeGreaterThanOrEqual(0);
      const body: string[] = [];
      for (let i = start + 1; i < lines.length && lines[i].startsWith('>'); i++) {
        body.push(lines[i].replace(/^>\s?/, ''));
      }
      const prose = inShortProse(body.join(' '));
      for (const [kind, count] of [
        ['words', spaceWords(prose)],
        ['extracted words', extractorWords(prose)],
      ] as const) {
        expect(count, `${chapter.slug}: ${count} ${kind}`).toBeGreaterThanOrEqual(IN_SHORT_MIN);
        expect(count, `${chapter.slug}: ${count} ${kind}`).toBeLessThanOrEqual(IN_SHORT_MAX);
      }
    });
  }
});

// CONTENT N6: text extracted from the page showed bare digits ("... 3 4 .") in
// the In short passages. The HTML marks each citation as a linked superscript,
// as in the rest of the chapter, and the Markdown twin keeps the [n] markers:
// no marker is left as plain text in the callout, none is lost in the twin.
test.describe('In short citations', () => {
  for (const chapter of chaptersOrdered.filter((c) => !EXEMPT.has(c.slug))) {
    test(`/bok/${chapter.slug}: In short citations are linked superscripts, and [n] in the .md twin`, () => {
      const html = readFileSync(join('dist', 'bok', `${chapter.slug}.html`), 'utf8');
      const aside = /<aside class="callout" data-kind="summary">([\s\S]*?)<\/aside>/.exec(html)?.[1] ?? '';
      expect(aside, 'summary callout').not.toBe('');
      expect(aside, 'a plain-text [n] marker').not.toMatch(/\[\d+\]/);
      const sups = [...aside.matchAll(/<sup>([\s\S]*?)<\/sup>/g)].map((m) => m[1]);
      for (const sup of sups) expect(sup).toMatch(/^(?:<a class="cite" href="#src-\d+"[^>]*>\d+<\/a>)+$/);
      const linked = sups.flatMap((sup) => [...sup.matchAll(/>(\d+)</g)].map((m) => m[1]));

      const md = readFileSync(join('dist', 'bok', `${chapter.slug}.md`), 'utf8');
      const quote = /^> \*\*In short\*\*[\s\S]*?(?=\n(?!>))/m.exec(md)?.[0] ?? '';
      expect(quote, 'In short blockquote in the .md twin').not.toBe('');
      expect([...quote.matchAll(/\[(\d+)\]/g)].map((m) => m[1])).toEqual(linked);
    });
  }
});
