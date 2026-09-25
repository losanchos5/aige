// seo-pattern-in-short.spec.ts: every pattern page opens with one self-contained
// "In short" answer block (GEO audit 2026-09-25, finding G4: AI engines cite
// passages of roughly 130-170 words, and the pattern pages had none). The block
// is a `> **In short**` blockquote placed right after the "**Summary:**"
// paragraph of bok/patterns/<slug>.md. remark-callouts may render it as an
// <aside class="callout"> instead of a <blockquote>; both shapes pass.
//
// The first half reads the Markdown sources (no browser); the second drives
// dist/ served by preview. Runs in the `default` project.
import { test, expect } from '@playwright/test';
import { readSource } from '../src/lib/md-parse';
import { patterns } from '../src/data/patterns';

const LABEL = '**In short**';
// The source paragraph is written to 130-170 words; the rendered block (label
// included) is allowed a little slack either side.
const SOURCE_MIN = 130;
const SOURCE_MAX = 170;
const RENDERED_MIN = 110;
const RENDERED_MAX = 190;

const words = (text: string): number => text.split(/\s+/).filter(Boolean).length;

test.describe('pattern "In short" blocks: sources', () => {
  for (const pattern of patterns) {
    test(`${pattern.slug}: one In short blockquote after the Summary, before the first H2`, () => {
      const lines = readSource(`bok/patterns/${pattern.slug}.md`).split(/\r?\n/);
      const starts = lines.flatMap((line, i) => (line.trim() === `> ${LABEL}` ? [i] : []));
      expect(starts, 'exactly one "> **In short**" line').toHaveLength(1);
      const start = starts[0];

      const summary = lines.findIndex((line) => line.startsWith('**Summary:**'));
      const firstH2 = lines.findIndex((line) => line.startsWith('## '));
      expect(summary).toBeGreaterThanOrEqual(0);
      expect(start).toBeGreaterThan(summary);
      expect(start).toBeLessThan(firstH2);

      const body: string[] = [];
      for (let i = start + 1; i < lines.length && lines[i].startsWith('>'); i++) {
        body.push(lines[i].replace(/^>\s?/, ''));
      }
      const text = body.join(' ');
      const count = words(text);
      expect(count, `${pattern.slug} In short has ${count} words`).toBeGreaterThanOrEqual(SOURCE_MIN);
      expect(count, `${pattern.slug} In short has ${count} words`).toBeLessThanOrEqual(SOURCE_MAX);
      // Self-contained: it names the pattern and never leans on the page around it.
      expect(text).toContain(pattern.title);
      expect(text).not.toMatch(/\bthis pattern\b|\bsee (above|below)\b/i);
    });
  }
});

test.describe('pattern "In short" blocks: rendered pages', () => {
  for (const pattern of patterns) {
    test(`/patterns/${pattern.slug} has one In short block before the first h2`, async ({ page }) => {
      const res = await page.goto(`/patterns/${pattern.slug}`);
      expect(res?.status()).toBe(200);
      const found = await page.evaluate(() => {
        const article = document.querySelector('article.prose');
        if (!article) return { blocks: [] as { words: number; beforeH2: boolean }[] };
        const firstH2 = article.querySelector('h2');
        const blocks = [...article.querySelectorAll('blockquote, aside.callout')]
          .filter((el) => (el.textContent ?? '').trim().startsWith('In short'))
          .map((el) => {
            const text = (el.textContent ?? '').trim().replace(/^In short/, '');
            return {
              words: text.split(/\s+/).filter(Boolean).length,
              beforeH2:
                firstH2 !== null &&
                Boolean(el.compareDocumentPosition(firstH2) & Node.DOCUMENT_POSITION_FOLLOWING),
            };
          });
        return { blocks };
      });
      expect(found.blocks, 'exactly one In short block').toHaveLength(1);
      const [block] = found.blocks;
      expect(block.beforeH2).toBe(true);
      expect(block.words).toBeGreaterThanOrEqual(RENDERED_MIN);
      expect(block.words).toBeLessThanOrEqual(RENDERED_MAX);
    });
  }
});
