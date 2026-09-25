// owasp-editions.spec.ts: one OWASP edition across the site. The OWASP Top 10
// for LLM Applications changed its ids between the 2025 and 2026 editions
// (LLM03 was Supply Chain and is now Excessive Agency; LLM07 was System Prompt
// Leakage and LLM08:2026 is Hidden Context Exposure), so a page that cites a
// 2025 id next to a page that cites the 2026 list contradicts it. The pillar
// and the threat bridge use the 2026 editions; every chapter, pattern page and
// data file follows them. The 2025 ids survive only in the threat bridge's
// `formerly` column, labelled as the previous edition. Runs in the Playwright
// test runner but uses no browser: pure Node reads of the source files.
//
// The official names are hardcoded on purpose (as in seo-schema.spec.ts): they
// are the table of contents of the OWASP Top 10 for Agentic Applications for
// 2026 PDF (December 2025), checked on 2026-09-25.
import { readdirSync } from 'node:fs';
import { test, expect } from '@playwright/test';

import { readSource, sourcePath } from '../src/lib/md-parse';

const ASI_NAMES: Record<string, string> = {
  ASI01: 'Agent Goal Hijack',
  ASI02: 'Tool Misuse and Exploitation',
  ASI03: 'Identity and Privilege Abuse',
  ASI04: 'Agentic Supply Chain Vulnerabilities',
  ASI05: 'Unexpected Code Execution (RCE)',
  ASI06: 'Memory & Context Poisoning',
  ASI07: 'Insecure Inter-Agent Communication',
  ASI08: 'Cascading Failures',
  ASI09: 'Human-Agent Trust Exploitation',
  ASI10: 'Rogue Agents',
};

/** Repo-relative paths of the files in a folder that match a pattern. */
function filesIn(dir: string, pattern: RegExp): string[] {
  return readdirSync(sourcePath(dir))
    .filter((f) => pattern.test(f))
    .map((f) => `${dir}/${f}`);
}

// The published text: chapters, pattern pages, the pillar, and the site's data
// and page sources. The changelog is history and keeps the words it shipped.
const MARKDOWN = [
  ...filesIn('bok', /^\d\d-.+\.md$/),
  ...filesIn('bok/patterns', /\.md$/),
  ...filesIn('guides', /\.md$/),
];
const CODE = [
  ...filesIn('site/src/data', /\.ts$/),
  ...filesIn('site/src/pages', /\.astro$/),
  ...filesIn('site/src/pages/resources', /\.astro$/),
];

test.describe('OWASP editions', () => {
  test('the Markdown cites LLM Top 10 ids from the 2026 edition only', () => {
    for (const file of MARKDOWN) {
      const text = readSource(file);
      const stale = text.match(/LLM\d{2}:(?!2026)\d{4}/g) ?? [];
      expect(stale, `${file} cites ${stale.join(', ')}`).toEqual([]);
      // The per-entry pages under /llmrisk/ carry the 2025 texts.
      expect(text, `${file} links a 2025 entry page`).not.toContain('genai.owasp.org/llmrisk/');
    }
  });

  test('the data files keep 2025 ids only as the labelled `formerly` ids', () => {
    for (const file of CODE) {
      const lines = readSource(file).split(/\r?\n/);
      lines.forEach((line, i) => {
        if (!/LLM\d{2}:(?!2026)\d{4}/.test(line)) return;
        expect(line, `${file}:${i + 1} cites a 2025 id outside the formerly column`).toMatch(/formerly/);
      });
    }
  });

  test('Agentic ids carry their official names', () => {
    for (const file of MARKDOWN) {
      const flat = readSource(file).replace(/\s+/g, ' ');
      // An id followed by a capitalised word is the id with its name.
      for (const m of flat.matchAll(/\bASI(0[1-9]|10)`? (?=[A-Z])/g)) {
        const id = `ASI${m[1]}`;
        const after = flat.slice((m.index ?? 0) + m[0].length);
        expect(after.startsWith(ASI_NAMES[id]), `${file}: ${id} ${after.slice(0, 40)}`).toBe(true);
      }
    }
  });
});
