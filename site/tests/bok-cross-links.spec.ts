// bok-cross-links.spec.ts: the links from the Body of Knowledge to the open
// reference project (block orp-crosslinks, change open-reference-project; spec
// bok-cross-links and control-profiles "Enlaces contextuales hacia los
// controles"). Chapters carry a "Related in the open reference" section from
// src/data/chapter-links.ts after their prose; patterns, obligations and threats
// list the open controls that name them (src/lib/cross-links.ts); the agreed
// glossary terms add an "In the open reference" line; /stack shows "Controls
// anchored here" on each layer; /agents and the agent control profile tool link
// the agent runtime profile. Read from dist, like seo-links.spec.ts; the data
// checks need no build. No chapter Markdown is edited for any of this: the
// integrator checks `git diff --name-only d0e787d -- bok/` is empty.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { chaptersOrdered } from '../src/data/chapters';
import { chapterLinks, chapterLinkProblems } from '../src/data/chapter-links';
import { glossaryLinks } from '../src/data/glossary-links';
import { patterns } from '../src/data/patterns';
import { obligations, obligationPath } from '../src/data/frameworks';
import { threats, threatAnchor } from '../src/data/threats';
import { agentControls } from '../src/data/tool-agent-controls';
import { controlHref } from '../src/data/controls';
import {
  controlsForPattern,
  controlsForObligation,
  controlsForThreat,
} from '../src/lib/cross-links';

const EM_DASH = String.fromCharCode(0x2014);
/** The glossary fact line, whatever scoped attributes Astro adds to the tag. */
const OPEN_DT = /<dt\b[^>]*>In the open reference<\/dt>/;
const BUILT = existsSync(join('dist', 'stack.html')) || existsSync(join('dist', 'stack', 'index.html'));

/** The built HTML of a clean route (`/bok` → dist/bok.html or dist/bok/index.html). */
function html(route: string): string {
  const base = join('dist', ...route.split('/').filter(Boolean));
  const file = [`${base}.html`, join(base, 'index.html')].find((f) => existsSync(f));
  if (!file) throw new Error(`no built page for ${route}`);
  return readFileSync(file, 'utf8');
}

/** True when `href` (path plus optional fragment) names a built page and, if given, an id on it. */
function resolves(href: string): boolean {
  const [path, frag] = href.split('#');
  let page: string;
  try {
    page = html(path);
  } catch {
    return false;
  }
  return frag === undefined || page.includes(`id="${frag}"`);
}

/** The HTML of the element that opens at `id="<id>"`, up to the closing tag `close`. */
function block(page: string, id: string, close: string): string {
  const at = page.indexOf(`id="${id}"`);
  if (at === -1) return '';
  const end = page.indexOf(close, at);
  return page.slice(at, end === -1 ? undefined : end);
}

/** The `<section ...>` start tag that holds `className`, or ''. */
function sectionTag(page: string, className: string): string {
  return page.match(new RegExp(`<section\\b[^>]*class="[^"]*\\b${className}\\b[^"]*"[^>]*>`))?.[0] ?? '';
}

test.describe('open-reference links: data', () => {
  test('chapter-links.ts has no problems and every key is a chapter slug', () => {
    expect(chapterLinkProblems()).toEqual([]);
    const slugs = new Set(chaptersOrdered.map((c) => c.slug));
    for (const key of Object.keys(chapterLinks)) expect(slugs.has(key), key).toBe(true);
  });

  test('the five chapters of the v0.1 furniture, and only those', () => {
    expect(Object.keys(chapterLinks).sort()).toEqual(
      ['governing-agents', 'governing-development', 'incidents', 'maturity-model', 'the-stack'],
    );
  });

  test('no em dash in the chapter links or the open glossary links', () => {
    const text = JSON.stringify({ chapterLinks, glossaryLinks });
    expect(text.includes(EM_DASH)).toBe(false);
  });
});

test.describe('open-reference links: built site', () => {
  test.skip(!BUILT, 'run npm run build first');

  test('every chapter link resolves to a built page and anchor', () => {
    for (const [slug, links] of Object.entries(chapterLinks)) {
      for (const link of links) expect(resolves(link.href), `${slug} -> ${link.href}`).toBe(true);
    }
  });

  test('the listed chapters carry the section after their prose, in the TOC and out of the index', () => {
    for (const [slug, links] of Object.entries(chapterLinks)) {
      const page = html(`/bok/${slug}`);
      expect(page, slug).toContain('id="related-open-reference"');
      expect(page, slug).toContain('Related in the open reference');
      expect(page, slug).toContain('data-toc-link="related-open-reference"');
      expect(sectionTag(page, 'chapter-related'), slug).toContain('data-pagefind-ignore');
      expect(sectionTag(page, 'chapter-related'), slug).toContain('aria-labelledby="related-open-reference"');
      for (const link of links) expect(page, `${slug} -> ${link.href}`).toContain(`href="${link.href}"`);

      // After the prose: the last heading of the reading column before the sign-up.
      const start = page.indexOf('<article class="prose"');
      const stop = page.indexOf('chapter-newsletter', start);
      const column = page.slice(start, stop === -1 ? undefined : stop);
      const ids = [...column.matchAll(/<h2\b[^>]*\bid="([^"]+)"/g)].map((m) => m[1]);
      expect(ids.at(-1), slug).toBe('related-open-reference');
      expect(ids.filter((id) => id === 'related-open-reference'), slug).toHaveLength(1);
    }
  });

  test('a chapter without links has no open-reference section', () => {
    for (const chapter of chaptersOrdered) {
      if (chapter.slug in chapterLinks) continue;
      const page = html(`/bok/${chapter.slug}`);
      // Markup only: the scoped rule for .chapter-related ships in every chapter's CSS.
      expect(page.includes('id="related-open-reference"'), chapter.slug).toBe(false);
      expect(sectionTag(page, 'chapter-related'), chapter.slug).toBe('');
    }
    expect(html('/bok/definition')).not.toContain('id="related-open-reference"');
  });

  test('a pattern page lists related controls if and only if a control uses the pattern', () => {
    let withControls = 0;
    for (const pattern of patterns) {
      const page = html(`/patterns/${pattern.slug}`);
      const related = controlsForPattern(pattern.slug);
      expect(page.includes('id="related-controls"'), pattern.slug).toBe(related.length > 0);
      if (related.length === 0) continue;
      withControls += 1;
      expect(page, pattern.slug).toContain('data-toc-link="related-controls"');
      const section = block(page, 'related-controls', '</section>');
      for (const c of related) expect(section, `${pattern.slug} -> ${c.id}`).toContain(`href="${controlHref(c.id)}"`);
    }
    expect(withControls).toBeGreaterThan(0);
  });

  test('an obligation page lists open controls if and only if a control maps the row', () => {
    let withControls = 0;
    for (const row of obligations) {
      const page = html(obligationPath(row));
      const related = controlsForObligation(row.id);
      expect(page.includes('id="controls"'), row.id).toBe(related.length > 0);
      if (related.length === 0) continue;
      withControls += 1;
      expect(page, row.id).toContain('Open controls that evidence it');
      const section = block(page, 'controls', '<h2');
      for (const c of related) expect(section, `${row.id} -> ${c.id}`).toContain(`href="${controlHref(c.id)}"`);
    }
    expect(withControls).toBeGreaterThan(0);
  });

  test('the threat bridge links the open controls from each mapped threat card', () => {
    const page = html('/resources/threats');
    let mapped = 0;
    for (const row of threats) {
      const card = block(page, threatAnchor(row), '</article>');
      expect(card, row.id).not.toBe('');
      const related = controlsForThreat(row.id);
      expect(card.includes('class="tb-open'), row.id).toBe(related.length > 0);
      if (related.length === 0) continue;
      mapped += 1;
      expect(card, row.id).toContain('Open control profile:');
      for (const c of related) expect(card, `${row.id} -> ${c.id}`).toContain(`href="${controlHref(c.id)}"`);
    }
    expect(mapped).toBeGreaterThan(0);
    expect(page).toContain('Open control profile:');
  });

  test('the agreed glossary terms carry their open-reference links, and each resolves', () => {
    const withOpen = Object.entries(glossaryLinks).filter(([, extras]) => (extras.open ?? []).length > 0);
    expect(withOpen.map(([slug]) => slug).sort()).toEqual(
      [
        'agent-registry',
        'eval-gate',
        'evals-as-evidence',
        'kill-switch',
        'machine-readable-evidence',
        'policy-card',
        'workload-identity',
      ],
    );
    for (const [slug, extras] of withOpen) {
      const page = html(`/glossary/${slug}`);
      expect(page, slug).toMatch(OPEN_DT);
      for (const link of extras.open ?? []) {
        expect(page, `${slug} -> ${link.href}`).toContain(`href="${link.href}"`);
        expect(resolves(link.href), `${slug} -> ${link.href}`).toBe(true);
      }
      // After "Put it to work" when the term has tools.
      if ((extras.tools ?? []).length > 0) {
        expect(page.search(/<dt\b[^>]*>Put it to work<\/dt>/)).toBeLessThan(page.search(OPEN_DT));
      }
    }
    // A term without open links shows no such line.
    expect(html('/glossary/ai-governance')).not.toContain('In the open reference');
  });

  test('/stack shows the controls anchored on each of the five layers', () => {
    const page = html('/stack');
    expect(page.match(/Controls anchored here/g) ?? []).toHaveLength(5);
    for (let n = 1; n <= 5; n++) {
      expect(page).toContain(`href="/controls#layer-${n}"`);
      expect(resolves(`/controls#layer-${n}`), `layer-${n}`).toBe(true);
    }
  });

  test('/agents and the agent control profile tool link the agent runtime profile', () => {
    const agents = html('/agents');
    expect(agents).toContain('href="/controls/agent-runtime"');
    expect(agents).toContain('href="/toolkit/agent-control-profile"');
    expect(agents).toContain(`${agentControls.length} agent controls`);
    expect(block(agents, 'control-plane', '</section>')).toContain('href="/controls/agent-runtime"');

    const tool = html('/toolkit/agent-control-profile');
    expect(tool).toContain('href="/controls/agent-runtime"');
    expect(resolves('/controls/agent-runtime')).toBe(true);
  });

  test('no em dash in the rendered open-reference furniture', () => {
    const pieces: string[] = [];
    for (const slug of Object.keys(chapterLinks)) {
      pieces.push(block(html(`/bok/${slug}`), 'related-open-reference', '</section>'));
    }
    for (const pattern of patterns) {
      if (controlsForPattern(pattern.slug).length > 0) {
        pieces.push(block(html(`/patterns/${pattern.slug}`), 'related-controls', '</section>'));
      }
    }
    for (const row of obligations) {
      if (controlsForObligation(row.id).length > 0) pieces.push(block(html(obligationPath(row)), 'controls', '<h2'));
    }
    const stack = html('/stack');
    for (const m of stack.matchAll(/Controls anchored here[\s\S]*?<\/dd>/g)) pieces.push(m[0]);
    const threatsPage = html('/resources/threats');
    for (const m of threatsPage.matchAll(/<p class="tb-open[\s\S]*?<\/p>/g)) pieces.push(m[0]);
    expect(pieces.join('\n').includes(EM_DASH)).toBe(false);
  });
});
