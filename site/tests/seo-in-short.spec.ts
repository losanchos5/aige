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
import { chaptersOrdered } from '../src/data/chapters';

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
