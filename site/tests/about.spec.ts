// about.spec.ts: the open reference additions to /about and /about/methodology
// (OpenSpec change open-reference-project, block orp-about). /about lists the
// research interests, the open questions and the open work from their data
// modules, and every link they carry resolves in the build; the Person node
// names the three new subjects; the methodology page explains how control
// profiles and research notes are versioned, given a status and reviewed, and
// lists the six review forms. Read from dist, like seo-hub-graph.spec.ts.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { people } from '../src/data/people';
import { openQuestions } from '../src/data/open-questions';
import { work } from '../src/data/work';

// Loosely typed: the parsed JSON-LD graph is external data, walked by key.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonLdNode = Record<string, any>;

// Hardcoded on purpose (see seo-schema.spec.ts): a test importing the constant
// it asserts on would pass however the value drifted.
const PERSON_ID = 'https://aigovernanceengineer.com/#person-jorge-garcia-aibar';
const REPO = 'https://github.com/losanchos5/aige';
const SUFFIX = ' · AI Governance Engineer';
const NEW_SUBJECTS = [
  'AI evaluation environments',
  'Agent runtime safeguards',
  'Machine-readable assurance evidence',
];
const NEW_FORMS = [
  'control-review.yml',
  'failure-mode-proposal.yml',
  'implementation-example.yml',
  'framework-mapping.yml',
  'technical-correction.yml',
  'research-review.yml',
];
const PROFILES_H2 = 'control-profiles-versioning-status-and-review';
// U+2014, built from its code point so this file itself stays free of it.
const EM_DASH = String.fromCharCode(0x2014);

/** The built file of a clean route (`/bok` → dist/bok.html or dist/bok/index.html). */
function builtFile(route: string): string | undefined {
  const base = join('dist', ...route.split('/').filter(Boolean));
  return [`${base}.html`, join(base, 'index.html')].find((f) => existsSync(f));
}

function html(route: string): string {
  const file = builtFile(route);
  if (!file) throw new Error(`no built page for ${route}`);
  return readFileSync(file, 'utf8');
}

/** The markup from the element with `id` up to the next h2 (or the article end). */
function section(page: string, id: string): string {
  const start = page.indexOf(`id="${id}"`);
  expect(start, `id="${id}"`).toBeGreaterThan(-1);
  const rest = page.slice(start);
  const end = rest.search(/<h2[\s>]|<\/article>/);
  return end === -1 ? rest : rest.slice(0, end);
}

/** The single ld+json block of a built page, flattened to its nodes. */
function graph(page: string): JsonLdNode[] {
  const blocks = [...page.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  expect(blocks).toHaveLength(1);
  const data = JSON.parse(blocks[0][1]) as JsonLdNode;
  return data['@graph'] as JsonLdNode[];
}

function documentTitle(page: string): string {
  const head = page.slice(0, page.indexOf('</head>'));
  const match = /<title>([^<]*)<\/title>/.exec(head);
  if (!match) throw new Error('no <title> in <head>');
  return match[1].replace(/&amp;/g, '&');
}

function description(page: string): string {
  const match = /<meta name="description" content="([^"]*)"/.exec(page);
  if (!match) throw new Error('no meta description');
  return match[1].replace(/&amp;/g, '&').replace(/&#39;|&#x27;/g, "'");
}

/** A site href resolves when its page is built and, for a fragment, the id exists there. */
function expectResolves(href: string): void {
  const [path, frag] = href.split('#');
  const file = builtFile(path);
  expect(file, `${href}: no built page`).toBeTruthy();
  if (frag) {
    expect(readFileSync(file!, 'utf8').includes(`id="${frag}"`), `${href}: no id="${frag}"`).toBe(true);
  }
}

test.describe('/about', () => {
  test('lists the research interests from people.ts', () => {
    const block = section(html('/about'), 'research-interests');
    const interests = people[0].researchInterests ?? [];
    expect(interests.length).toBeGreaterThan(0);
    expect((block.match(/<li[\s>]/g) ?? []).length).toBe(interests.length);
    for (const interest of interests) expect(block).toContain(interest);
  });

  test('lists the five open questions, each linked where it has an href', () => {
    const block = section(html('/about'), 'open-questions');
    expect(openQuestions).toHaveLength(5);
    expect((block.match(/<li[\s>]/g) ?? []).length).toBe(5);
    for (const q of openQuestions) {
      if (q.href) expect(block).toContain(`href="${q.href}"`);
    }
  });

  test('lists every open work item', () => {
    const block = section(html('/about'), 'open-work');
    expect((block.match(/<li class="work-item/g) ?? []).length).toBe(work.length);
    for (const item of work) expect(block).toContain(`href="${item.href}"`);
  });

  test('every open question and open work link resolves in the build', () => {
    for (const q of openQuestions) if (q.href) expectResolves(q.href);
    for (const item of work) expectResolves(item.href);
  });

  test('keeps the collaboration sentence in Let’s work together', () => {
    const block = section(html('/about'), 'work-together').replace(/\s+/g, ' ');
    expect(block).toContain(
      'I am particularly interested in collaborations around independent assessment methodology, evaluation-environment controls, agent runtime safeguards, machine-readable evidence, open control profiles and reference implementations.',
    );
    expect(block).toContain('compare notes with me.');
  });

  test('the Person node knows about the three new subjects', () => {
    const person = graph(html('/about')).find((node) => node['@id'] === PERSON_ID);
    expect(person).toBeTruthy();
    expect(person!.knowsAbout).toEqual(expect.arrayContaining(NEW_SUBJECTS));
  });
});

test.describe('/about/methodology', () => {
  test('has the control profiles section in the body and in the table of contents', () => {
    const page = html('/about/methodology');
    const article = /<article class="prose[\s\S]*?<\/article>/.exec(page)?.[0] ?? '';
    expect(article).toMatch(
      new RegExp(`<h2 id="${PROFILES_H2}"[^>]*>Control profiles: versioning, status and review</h2>`),
    );
    const toc = /<nav class="toc[^"]*"[\s\S]*?<\/nav>/.exec(page)?.[0] ?? '';
    expect(toc).toContain(`href="#${PROFILES_H2}"`);
    const block = section(page, PROFILES_H2).replace(/\s+/g, ' ');
    expect(block).toContain(`${REPO}/blob/main/bok/CONTRIBUTORS.md`);
    expect(block).toContain('Open for technical review');
  });

  test('lists the six review forms', () => {
    const page = html('/about/methodology');
    for (const form of NEW_FORMS) {
      expect(page, form).toContain(`href="${REPO}/issues/new?template=${form}"`);
    }
  });
});

test.describe('head and house style', () => {
  const PAGES = [
    { route: '/about', title: 'About this site' },
    { route: '/about/methodology', title: 'Methodology' },
  ];

  for (const { route, title } of PAGES) {
    test(`${route}: title unchanged, description in range, no em dash`, () => {
      const page = html(route);
      const docTitle = documentTitle(page);
      expect(docTitle).toBe(`${title}${SUFFIX}`);
      expect(docTitle.length).toBeLessThanOrEqual(60);
      const desc = description(page);
      expect(desc.length).toBeGreaterThanOrEqual(70);
      expect(desc.length).toBeLessThanOrEqual(160);
      expect(page.includes(EM_DASH), `${route} carries an em dash`).toBe(false);
    });
  }
});
