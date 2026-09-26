// seo-role-next.spec.ts: SEO round 5, block role (2026-09-26 audit).
//
// - /stack answers "AI governance framework" (SXO-N-02): the H1 names it, a
//   question section defines it in 40 to 80 words from the stack's own layers,
//   and links the pillar and /bok ("the full body of knowledge").
// - /role (GEO S2): an "In short" passage of 134 to 167 words under the H1, a
//   datePublished in its WebPage node, and a Markdown twin (/role.md) that
//   llms.txt, llms-full.txt and the bok slice carry.
// - Next step (SXO-N-06): the comparison pages and /role link one to three
//   toolkit pages with descriptive anchors, on the page and in the twin.
// - llms (GEO S5, N7): the comparisons have their own llms.txt section; the
//   obligation register left the regulatory slice for a slice of its own, and
//   both stay at or under about 100k tokens.
//
// Read from dist, like seo-compare.spec.ts.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { comparisons, comparisonPath } from '../src/data/comparisons';
import { frameworkAnswer, layers } from '../src/data/stack';
import { market, roleInShort, roleNextSteps, workflows } from '../src/data/role';
import { toolById } from '../src/data/toolkit';
import { obligations } from '../src/data/frameworks';

const ORIGIN = 'https://aigovernanceengineer.com';

function builtFile(route: string): string | undefined {
  const base = join('dist', ...route.split('/').filter(Boolean));
  return [`${base}.html`, join(base, 'index.html')].find((f) => existsSync(f));
}

function html(route: string): string {
  const file = builtFile(route);
  if (!file) throw new Error(`no built page for ${route}`);
  return readFileSync(file, 'utf8');
}

const dist = (path: string) => readFileSync(join('dist', path), 'utf8');

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
const words = (s: string) => s.trim().split(/\s+/).length;

/** The <main> of a built page. */
function main(page: string): string {
  const start = page.indexOf('<main');
  return page.slice(start, page.indexOf('</main>', start));
}

function graph(page: string): Record<string, unknown>[] {
  const nodes: Record<string, unknown>[] = [];
  for (const match of page.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    const data = JSON.parse(match[1]) as Record<string, unknown>;
    nodes.push(...((Array.isArray(data['@graph']) ? data['@graph'] : [data]) as Record<string, unknown>[]));
  }
  return nodes;
}

/** The next-step block of a page: its links (href, text), in order. */
function nextStepLinks(page: string): { href: string; label: string }[] {
  const block = /<div class="next-step[^"]*"[^>]*data-next-step[^>]*>([\s\S]*?)<\/ul>/.exec(page)?.[1] ?? '';
  return [...block.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => ({
    href: decode(m[1]),
    label: text(m[2]).replace(/\s*→$/, ''),
  }));
}

test.describe('/stack answers "AI governance framework"', () => {
  test('the H1 names the query and a question section defines it first', () => {
    const page = html('/stack');
    const h1 = /<h1[^>]*>([\s\S]*?)<\/h1>/.exec(page)?.[1] ?? '';
    expect(text(h1)).toMatch(/AI governance framework/);

    const firstH2 = /<h2[^>]*>([^<]*)<\/h2>\s*<p[^>]*>([\s\S]*?)<\/p>/.exec(main(page));
    expect(decode(firstH2?.[1] ?? '')).toBe('What is an AI governance framework?');
    const answer = text(firstH2?.[2] ?? '');
    expect(answer).toBe(decode(frameworkAnswer));
    expect(words(answer)).toBeGreaterThanOrEqual(40);
    expect(words(answer)).toBeLessThanOrEqual(80);
    expect(answer.startsWith('An AI governance framework is')).toBe(true);
    for (const layer of layers) expect(answer, layer.name).toContain(decode(layer.name));
    expect(answer).not.toContain('\u2014');
  });

  test('the question section links the pillar and the full body of knowledge', () => {
    const block = /<p class="[^"]*framework-more[^"]*"[^>]*>([\s\S]*?)<\/p>/.exec(html('/stack'))?.[1] ?? '';
    expect(block).toMatch(/<a href="\/bok"[^>]*>the full body of knowledge<\/a>/);
    expect(block).toMatch(/<a href="\/ai-governance"[^>]*>AI governance, explained<\/a>/);
  });
});

test.describe('/role: In short, datePublished, Markdown twin', () => {
  test('an In short passage of 134 to 167 words sits under the H1, before the first H2', () => {
    const n = words(roleInShort);
    expect(n, `${n} words`).toBeGreaterThanOrEqual(134);
    expect(n, `${n} words`).toBeLessThanOrEqual(167);
    for (const w of workflows) expect(roleInShort.toLowerCase(), w.name).toContain(w.name.toLowerCase());
    expect(roleInShort).toContain(market[0].value);
    expect(roleInShort).not.toContain('\u2014');

    const page = main(html('/role'));
    const callout = /<aside class="callout" data-kind="summary" data-role-in-short[^>]*>([\s\S]*?)<\/aside>/.exec(page);
    expect(callout).not.toBeNull();
    expect(text(callout?.[1] ?? '')).toBe(`In short ${decode(roleInShort)}`);
    expect(page.indexOf('data-role-in-short')).toBeLessThan(page.indexOf('<h2'));
    expect(page.indexOf('<h1')).toBeLessThan(page.indexOf('data-role-in-short'));
  });

  test('the WebPage node states datePublished, no later than dateModified', () => {
    const node = graph(html('/role')).find((n) => n['@type'] === 'WebPage');
    expect(node).toBeDefined();
    const published = String(node?.datePublished ?? '');
    const modified = String(node?.dateModified ?? '');
    expect(published).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(modified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(published <= modified).toBe(true);
  });

  test('/role.md is the page as Markdown, advertised by the page and carried by llms', () => {
    const md = dist('role.md');
    expect(md).toMatch(/^---\n[\s\S]*?canonical: https:\/\/aigovernanceengineer\.com\/role\n/);
    expect(md).toMatch(/\ntitle: "AI governance engineer: what they do, skills, salary"\n/);
    for (const piece of [
      '## In short',
      roleInShort,
      '## What does an AI governance engineer do?',
      '## What skills does an AI governance engineer need?',
      '## How do you become an AI governance engineer?',
      '## How much does an AI governance engineer earn?',
      '## Next step: start one workflow this week',
    ]) {
      expect(md, piece.slice(0, 40)).toContain(piece);
    }
    for (const w of workflows) expect(md, w.name).toContain(`**${w.name}**`);
    for (const step of roleNextSteps) {
      expect(md, step.tool).toContain(`[${step.anchor}](${ORIGIN}${toolById(step.tool).href})`);
    }
    expect(md).not.toContain('\u2014');

    expect(html('/role')).toContain('<link rel="alternate" type="text/markdown" href="/role.md"');
    expect(dist('llms.txt')).toContain(`${ORIGIN}/role.md`);
    expect(dist('llms-full.txt')).toContain(`Source: ${ORIGIN}/role\n`);
    const bok = dist('llms-full-bok.txt');
    const chapter = bok.indexOf(`Source: ${ORIGIN}/bok/the-role\n`);
    const role = bok.indexOf(`Source: ${ORIGIN}/role\n`);
    expect(chapter).toBeGreaterThan(-1);
    expect(role, 'the role page follows chapter 06 in the bok slice').toBeGreaterThan(chapter);
    expect(bok.indexOf(`Source: ${ORIGIN}/bok/maturity-model\n`)).toBeGreaterThan(role);
  });
});

test.describe('next step: the comparison pages and /role link the toolkit', () => {
  const pages = [
    ...comparisons.map((c) => ({ route: comparisonPath(c), steps: c.nextSteps })),
    { route: '/role', steps: roleNextSteps },
  ];

  for (const { route, steps } of pages) {
    test(`${route} names one to three tools with descriptive anchors`, () => {
      expect(steps.length).toBeGreaterThanOrEqual(1);
      expect(steps.length).toBeLessThanOrEqual(3);
      const links = nextStepLinks(main(html(route)));
      expect(links.map((l) => l.href)).toEqual(steps.map((s) => toolById(s.tool).href));
      expect(links.map((l) => l.label)).toEqual(steps.map((s) => decode(s.anchor)));
      for (const link of links) {
        expect(link.href).toMatch(/^\/toolkit\/[a-z0-9-]+$/);
        expect(builtFile(link.href), link.href).toBeDefined();
        expect(words(link.label), link.label).toBeGreaterThanOrEqual(4);
        expect(link.label).not.toMatch(/^(click|here|read more|learn more)\b/i);
      }
      expect(new Set(links.map((l) => l.href)).size).toBe(links.length);
    });
  }

  test('each comparison twin carries the same next step', () => {
    for (const c of comparisons) {
      const md = dist(`${comparisonPath(c).slice(1)}.md`);
      expect(md).toContain('## Next step');
      for (const step of c.nextSteps) {
        expect(md, `${c.slug} ${step.tool}`).toContain(`[${step.anchor}](${ORIGIN}${toolById(step.tool).href})`);
      }
    }
  });
});

test.describe('llms: comparisons section and the regulatory split', () => {
  test('llms.txt lists the comparisons in their own section, not under More pages', () => {
    const llms = dist('llms.txt');
    const at = llms.indexOf('\n## Comparisons\n');
    expect(at).toBeGreaterThan(-1);
    const next = llms.indexOf('\n## ', at + 1);
    const sectionText = llms.slice(at, next);
    for (const c of comparisons) {
      expect(sectionText, c.slug).toContain(`](${ORIGIN}${comparisonPath(c)}): `);
      expect(sectionText, c.slug).toContain(`${ORIGIN}${comparisonPath(c)}.md`);
    }
    const more = llms.indexOf('\n## More pages\n');
    if (more > -1) {
      const moreText = llms.slice(more, llms.indexOf('\n## ', more + 1));
      for (const c of comparisons) expect(moreText, c.slug).not.toContain(comparisonPath(c));
    }
  });

  test('the obligation register has its own slice; both slices stay under about 100k tokens', () => {
    const llms = dist('llms.txt');
    const regulatory = dist('llms-full-regulatory.txt');
    const register = dist('llms-full-obligations.txt');
    for (const path of ['/llms-full-regulatory.txt', '/llms-full-obligations.txt']) {
      expect(llms, path).toMatch(new RegExp(`\\(${ORIGIN.replace(/[.]/g, '\\.')}${path.replace(/[.]/g, '\\.')}\\): .*about \\d+k tokens`));
    }
    // About four characters per token (lib/llms.ts approxTokens).
    for (const [name, body] of [['regulatory', regulatory], ['obligations', register]] as const) {
      expect(body.length, `${name}: ${Math.round(body.length / 4000)}k tokens`).toBeLessThanOrEqual(400_000);
    }
    expect(register).toContain(`Source: ${ORIGIN}/obligations\n`);
    expect(regulatory).not.toContain(`Source: ${ORIGIN}/obligations\n`);
    expect(register.match(/^## AIGE-OBL-/gm)?.length).toBe(obligations.length);
    for (const path of ['/bok/regulatory-map', '/resources/frameworks', '/resources/crosswalk']) {
      expect(regulatory, path).toContain(`Source: ${ORIGIN}${path}\n`);
    }
    for (const c of comparisons) expect(regulatory, c.slug).toContain(`Source: ${ORIGIN}${comparisonPath(c)}\n`);
  });
});
