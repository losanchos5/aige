// research.spec.ts: the research notes (OpenSpec change open-reference-project,
// block orp-research). Source checks read research/<slug>.md directly: one file
// per written theme and none for a planned one, a valid frontmatter (a draft by
// a named author, no invented reviewer), citations that resolve, no em dash and
// the agreed length. Dist checks read the built pages: the status line, the
// title and description budgets, one ScholarlyArticle graph with the note's
// version, the review form, the related controls, the Markdown twin and its
// advertisement, /llms.txt, and planned themes that are never linked.
import { test, expect } from '@playwright/test';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { researchPath, researchThemes, writtenThemes } from '../src/data/research';
import { controlById } from '../src/data/controls';
import { personById } from '../src/data/people';
import { patterns } from '../src/data/patterns';

const ORIGIN = 'https://aigovernanceengineer.com';
const RESEARCH_DIR = join('..', 'research');
const EM_DASH = String.fromCharCode(0x2014);

interface Frontmatter {
  [key: string]: string | string[];
}

/** The note's YAML frontmatter, for the flat shape the notes use (scalars and lists). */
function frontmatterOf(text: string): Frontmatter {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(text);
  if (!match) throw new Error('no frontmatter');
  const out: Frontmatter = {};
  let listKey: string | undefined;
  for (const line of match[1].split(/\r?\n/)) {
    const item = /^\s+-\s+(.*)$/.exec(line);
    if (item && listKey) {
      (out[listKey] as string[]).push(unquote(item[1]));
      continue;
    }
    const pair = /^([A-Za-z]+):\s*(.*)$/.exec(line);
    if (!pair) continue;
    const [, key, raw] = pair;
    if (raw === '') {
      out[key] = [];
      listKey = key;
    } else if (/^\[.*\]$/.test(raw)) {
      out[key] = raw
        .slice(1, -1)
        .split(',')
        .map((s) => unquote(s.trim()))
        .filter(Boolean);
      listKey = undefined;
    } else {
      out[key] = unquote(raw);
      listKey = undefined;
    }
  }
  return out;
}

function unquote(value: string): string {
  return value.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
}

/** The body after the frontmatter. */
const bodyOf = (text: string): string => text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');

/** Words of the prose before "## Sources", link targets and [n] markers dropped. */
function proseWords(body: string): number {
  const prose = body.split(/^## Sources\s*$/m)[0];
  const clean = prose.replace(/\]\([^)]*\)/g, ']').replace(/\[\d+\]/g, '');
  return (clean.match(/[A-Za-z0-9][A-Za-z0-9'.\-/()]*/g) ?? []).length;
}

const noteFile = (slug: string) => join(RESEARCH_DIR, `${slug}.md`);
const distHtml = (path: string) => join('dist', `${path}.html`);

test.describe('research note sources', () => {
  test('one file per written theme, none for a planned theme', () => {
    const files = readdirSync(RESEARCH_DIR)
      .filter((name) => name.endsWith('.md'))
      .map((name) => name.replace(/\.md$/, ''))
      .sort();
    expect(files).toEqual(writtenThemes().map((t) => t.slug).sort());
    for (const theme of researchThemes.filter((t) => t.status === 'planned')) {
      expect(existsSync(noteFile(theme.slug)), theme.slug).toBe(false);
    }
  });

  for (const theme of writtenThemes()) {
    test.describe(theme.slug, () => {
      const text = readFileSync(noteFile(theme.slug), 'utf8');
      const fm = frontmatterOf(text);
      const body = bodyOf(text);

      test('frontmatter is a valid draft by a named author', () => {
        expect(fm.id).toBe(theme.slug);
        expect(fm.title).toBe(theme.title);
        expect(String(fm.title).length).toBeGreaterThanOrEqual(10);
        expect(String(fm.title).length).toBeLessThanOrEqual(120);
        expect(String(fm.summary).length).toBeGreaterThanOrEqual(50);
        expect(String(fm.summary).length).toBeLessThanOrEqual(160);
        expect(fm.status).toBe('draft');
        expect(fm.version).toMatch(/^\d+\.\d+\.\d+$/);
        expect(fm.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        const authors = fm.authors as string[];
        expect(authors.length).toBeGreaterThanOrEqual(1);
        for (const id of authors) expect(personById(id), id).toBeDefined();
        // A draft names no reviewer: nobody is shown as having reviewed it.
        expect(fm.reviewers).toEqual([]);
        const controls = fm.relatedControls as string[];
        for (const id of controls) {
          expect(id).toMatch(/^AIGE-CTL-[A-Z]+-\d{3}$/);
          expect(controlById(id), id).toBeDefined();
        }
        const slugs = new Set(patterns.map((p) => p.slug));
        for (const slug of fm.relatedPatterns as string[]) expect(slugs.has(slug), slug).toBe(true);
        expect(/^#\s+(.+?)\s*$/m.exec(body)?.[1]).toBe(theme.title);
      });

      test('every [n] has a source row, and every row is cited', () => {
        const [prose, sources = ''] = body.split(/^## Sources\s*$/m);
        const rows = [...sources.matchAll(/^\[(\d+)\]\s/gm)].map((m) => Number(m[1]));
        expect(rows.length).toBeGreaterThan(0);
        expect(rows).toEqual(rows.map((_, i) => i + 1));
        const cited = new Set(
          [...prose.replace(/`[^`\n]*`/g, '').matchAll(/\[(\d+)\]/g)].map((m) => Number(m[1])),
        );
        for (const n of cited) expect(rows, `[${n}]`).toContain(n);
        for (const n of rows) expect(cited.has(n), `source [${n}] never cited`).toBe(true);
        for (const line of sources.split(/\r?\n/).filter((l) => /^\[\d+\]/.test(l))) {
          expect(line).toMatch(/ https?:\/\/\S+ \(verified: (primary|secondary|reported)\)$/);
        }
      });

      test('no em dash, and 1200 to 1800 words before the sources', () => {
        expect(text.includes(EM_DASH)).toBe(false);
        const words = proseWords(body);
        expect(words).toBeGreaterThanOrEqual(1200);
        expect(words).toBeLessThanOrEqual(1800);
      });
    });
  }
});

test.describe('research pages in dist', () => {
  test.skip(!existsSync('dist'), 'needs a build (npm run build)');

  for (const theme of writtenThemes()) {
    const path = researchPath(theme);

    test(`${path}: status line, title, description and JSON-LD`, () => {
      const html = readFileSync(distHtml(path), 'utf8');
      const fm = frontmatterOf(readFileSync(noteFile(theme.slug), 'utf8'));
      const version = String(fm.version);

      expect(html).toContain('data-status="draft"');
      const line = /<p[^>]*class="[^"]*status-line[^"]*"[^>]*>([\s\S]*?)<\/p>/.exec(html)?.[1] ?? '';
      const text = line.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      expect(text).toContain(`v${version} · Draft · Open for technical review`);

      const title = /<title>([\s\S]*?)<\/title>/.exec(html)?.[1] ?? '';
      if (theme.title.length + ' · AI Governance Engineer'.length <= 60) {
        expect(title.length).toBeLessThanOrEqual(60);
      } else {
        expect(title).toBe(theme.title);
      }
      const description = /<meta name="description" content="([^"]*)"/.exec(html)?.[1] ?? '';
      expect(description.length).toBeGreaterThanOrEqual(70);
      expect(description.length).toBeLessThanOrEqual(160);

      const scripts = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
      expect(scripts).toHaveLength(1);
      const graph = scripts[0][1];
      expect(graph).toContain('"ScholarlyArticle"');
      expect(graph).toMatch(new RegExp(`"version":\\s*"${version.replace(/\./g, '\\.')}"`));
      expect(graph).toContain('"creativeWorkStatus":"Draft"');
      expect(html.includes(EM_DASH)).toBe(false);
      expect(html).not.toMatch(/\bendorsed\b/i);
    });

    test(`${path}: review form, related controls, cite and anchors`, () => {
      const html = readFileSync(distHtml(path), 'utf8');
      expect(html).toMatch(/href="https:\/\/github\.com\/[^"]+\/issues\/new\?template=research-review\.yml&(?:amp;)?title=/);
      for (const id of ['abstract', 'related-controls', 'related-patterns', 'review-this-note', 'cite']) {
        expect(html, id).toContain(`id="${id}"`);
      }
      const related = html.slice(html.indexOf('id="related-controls"'), html.indexOf('id="related-patterns"'));
      const links = [...related.matchAll(/href="(\/controls\/evaluation-environment#aige-ctl-eval-00\d)"/g)];
      expect(links.length).toBeGreaterThanOrEqual(5);
      // The cite box carries the note's own version and the concept DOI.
      expect(html).toContain('data-copy-cite="García Aibar, J. (2026). ' + theme.title + ' (v0.1.0).');
      expect(html).toContain('https://doi.org/10.5281/zenodo.22857084');
    });

    test(`${path}.md: twin with the note's version and canonical`, () => {
      const md = readFileSync(join('dist', `${path}.md`), 'utf8');
      expect(md).toContain('\nversion: "0.1.0"\n');
      expect(md).toContain(`\ncanonical: ${ORIGIN}${path}\n`);
      expect(md).toContain('**Status:** Draft v0.1.0, open for technical review');
      expect(md).toContain(`# ${theme.title}`);
      expect(md.includes(EM_DASH)).toBe(false);
    });

    test(`${path} advertises its Markdown twin, and /llms.txt lists the note`, async ({ page, request }) => {
      await page.goto(path);
      const link = page.locator('head link[rel="alternate"][type="text/markdown"]');
      await expect(link).toHaveCount(1);
      await expect(link).toHaveAttribute('href', `${path}.md`);
      const llms = await (await request.get('/llms.txt')).text();
      expect(llms).toContain(`(${ORIGIN}${path})`);
      expect(llms).toContain(`Markdown: ${ORIGIN}${path}.md`);
    });
  }

  test('/research lists every written note and never links a planned theme', () => {
    const html = readFileSync(distHtml('/research'), 'utf8');
    const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
    for (const theme of writtenThemes()) expect(main).toContain(`href="${researchPath(theme)}"`);
    for (const id of ['notes', 'planned-themes', 'how-a-note-is-reviewed']) {
      expect(main, id).toContain(`id="${id}"`);
    }
    const planned = main.slice(main.indexOf('id="planned-themes"'), main.indexOf('id="how-a-note-is-reviewed"'));
    expect(planned).not.toContain('<a href="/research/');
    for (const theme of researchThemes.filter((t) => t.status === 'planned')) {
      expect(planned).toContain(theme.question);
      expect(main).not.toContain(`href="${researchPath(theme)}"`);
    }
    expect(main).toContain('data-status="draft"');
    expect(main).toContain('href="/ai-governance"');
    expect(main).toContain('href="/contribute"');
    const scripts = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
    expect(scripts).toHaveLength(1);
    expect(scripts[0][1]).toContain('"CollectionPage"');
    expect(html.includes(EM_DASH)).toBe(false);
  });
});
