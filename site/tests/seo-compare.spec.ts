// seo-compare.spec.ts: the "<A> vs <B>" comparison pages under
// /resources/crosswalk (SXO-04 of the 2026-09-25 audit). Each page is built,
// has one H1, a search title within 60 characters that no other comparison
// shares, an answer box and two question answers of 40 to 60 words, 3 to 5 FAQ
// items, the "At a glance" and overlap tables, a TechArticle and a
// BreadcrumbList (no FAQPage), and links that resolve: every crosswalk topic
// anchor, obligation page and pattern page it names exists in dist. The
// crosswalk hub links every page, and the sitemap (with a lastmod) and
// llms.txt list them. Read from dist, like seo-titles.spec.ts.
//
// Round 3 (block cmpfix: CONTENT R1-R5, SXO R2-01/R2-04, GEO R2, ONPAGE R1,
// TECHNICAL T9): the "Patterns for both" column only lists a pattern that
// serves a core clause on both sides (runtime guardrails is the regression
// row), no "only" claim rests on a clause filed in passing, every "At a
// glance" cell and FAQ answer names its primary source, the "can you use"
// heading is worded by what B is, each page carries an In short passage, the
// pillar link, its own OG card and a Markdown twin.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { comparisons, comparisonPath, glance, glanceRows } from '../src/data/comparisons';
import { patterns } from '../src/data/patterns';
import {
  buildComparison,
  canUseQuestion,
  gapQuestion,
  inShortText,
  namedClauses,
} from '../src/lib/comparisons';
import { comparisonOgImage } from '../src/lib/og-cards';

const MAX_DOCUMENT_TITLE = 60;

/** The built HTML file of a clean route, or undefined. */
function builtFile(route: string): string | undefined {
  const base = join('dist', ...route.split('/').filter(Boolean));
  return [`${base}.html`, join(base, 'index.html')].find((f) => existsSync(f));
}

function html(route: string): string {
  const file = builtFile(route);
  if (!file) throw new Error(`no built page for ${route}`);
  return readFileSync(file, 'utf8');
}

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

function documentTitle(page: string): string {
  const head = page.slice(0, page.indexOf('</head>'));
  const match = /<title>([^<]*)<\/title>/.exec(head);
  if (!match) throw new Error('no <title> in <head>');
  return decode(match[1]);
}

function jsonLdTypes(page: string): string[] {
  const types: string[] = [];
  for (const match of page.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    const data = JSON.parse(match[1]) as Record<string, unknown>;
    const nodes = (Array.isArray(data['@graph']) ? data['@graph'] : [data]) as Record<string, unknown>[];
    for (const node of nodes) {
      const type = node['@type'];
      types.push(...(Array.isArray(type) ? type : [type]).map(String));
    }
  }
  return types;
}

const words = (s: string) => s.trim().split(/\s+/).length;

/** The <table> element carrying `marker`, whole. */
function table(page: string, marker: string): string {
  const start = page.indexOf(marker);
  expect(start, `no table ${marker}`).toBeGreaterThan(-1);
  const open = page.lastIndexOf('<table', start);
  return page.slice(open, page.indexOf('</table>', start) + '</table>'.length);
}

/** Internal hrefs (no scheme, no protocol-relative) inside `fragment`. */
function internalHrefs(fragment: string): string[] {
  return [...fragment.matchAll(/href="(\/[^"/][^"]*|\/)"/g)].map((m) => decode(m[1]));
}

test.describe('comparison pages', () => {
  test('the editorial answers stay within the answer-box length', () => {
    expect(comparisons.length).toBeGreaterThanOrEqual(3);
    expect(comparisons.length).toBeLessThanOrEqual(6);
    for (const c of comparisons) {
      for (const [name, value] of [
        ['answer', c.answer],
        ['canUse', c.canUse],
        ['startWith', c.startWith],
      ] as const) {
        const n = words(value);
        expect(n, `${c.slug} ${name}: ${n} words`).toBeGreaterThanOrEqual(40);
        expect(n, `${c.slug} ${name}: ${n} words`).toBeLessThanOrEqual(60);
      }
      // One FAQ item is generated from the crosswalk on top of these.
      expect(c.faq.length + 1).toBeGreaterThanOrEqual(3);
      expect(c.faq.length + 1).toBeLessThanOrEqual(5);
      expect(glance[c.a], `glance facts for ${c.a}`).toBeDefined();
      expect(glance[c.b], `glance facts for ${c.b}`).toBeDefined();
    }
  });

  test('each page is built with one H1, a short unique title and a byline', () => {
    const titles = new Set<string>();
    const crosswalkTitle = documentTitle(html('/resources/crosswalk'));
    for (const c of comparisons) {
      const page = html(comparisonPath(c));
      const h1s = [...page.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
      expect(h1s, `${c.slug}: one <h1>`).toHaveLength(1);
      expect(text(h1s[0][1])).toBe(`${c.aName} vs ${c.bName}`);

      const title = documentTitle(page);
      expect(title.length, `${c.slug}: "${title}"`).toBeLessThanOrEqual(MAX_DOCUMENT_TITLE);
      expect(title.startsWith(`${c.aName} vs ${c.bName}`), title).toBe(true);
      expect(titles.has(title), `duplicate title "${title}"`).toBe(false);
      expect(title).not.toBe(crosswalkTitle);
      titles.add(title);

      expect(page).toMatch(/data-byline[\s\S]*?<time datetime="\d{4}-\d{2}-\d{2}"/);
    }
  });

  test('each page carries the answers, the FAQ and both tables', () => {
    for (const c of comparisons) {
      const page = html(comparisonPath(c));
      const plain = text(page);
      expect(page).toContain('data-cmp-answer');
      expect(plain).toContain(decode(c.answer));
      expect(plain).toContain(decode(c.canUse));
      expect(plain).toContain(decode(c.startWith));
      expect(plain).toContain(canUseQuestion(buildComparison(c)));
      expect(plain).toContain('Which should you start with?');

      const faq = page.match(/data-cmp-faq/g) ?? [];
      expect(faq.length).toBeGreaterThanOrEqual(3);
      expect(faq.length).toBeLessThanOrEqual(5);

      // At a glance: the seven attributes plus the Body of Knowledge row.
      const glanceTable = table(page, 'data-cmp-glance');
      for (const label of ['Type', 'Issuer', 'Legal force', 'Scope and reach', 'Certifiable', 'Key artefacts', 'Dates']) {
        expect(glanceTable).toContain(`<th scope="row" class="c-name"`);
        expect(text(glanceTable)).toContain(label);
      }
      expect(glanceTable.match(/<tr/g)?.length).toBe(1 + 8);

      // The overlap table has one row per topic either instrument reaches.
      const cmp = buildComparison(c);
      const overlap = table(page, 'data-cmp-overlap');
      expect(overlap.match(/<tr data-level=/g)?.length).toBe(cmp.rows.length);
      expect(cmp.rows.length).toBeGreaterThan(0);
      expect(cmp.counts.both).toBeGreaterThan(0);
    }
  });

  test('every crosswalk, obligation and pattern link on a page resolves', () => {
    const crosswalk = html('/resources/crosswalk');
    for (const c of comparisons) {
      const page = html(comparisonPath(c));
      const start = page.indexOf('data-pagefind-body');
      const main = page.slice(start, page.indexOf('</main>', start));
      const hrefs = internalHrefs(main);
      const obligationLinks = hrefs.filter((h) => h.startsWith('/obligations/'));
      const patternLinks = hrefs.filter((h) => h.startsWith('/patterns/'));
      expect(obligationLinks.length, `${c.slug}: obligation links`).toBeGreaterThan(0);
      expect(patternLinks.length, `${c.slug}: pattern links`).toBeGreaterThan(0);

      for (const href of hrefs) {
        const [path, hash] = href.split('#');
        if (/\.(json|csv|txt|xml)$/.test(path)) {
          expect(existsSync(join('dist', path)), `${c.slug} -> ${href}`).toBe(true);
          continue;
        }
        expect(builtFile(path), `${c.slug} -> ${href}`).toBeDefined();
        if (hash && path === '/resources/crosswalk') {
          expect(crosswalk, `${c.slug} -> ${href}`).toContain(`id="${hash}"`);
        }
      }
    }
  });

  test('each page has a TechArticle and a BreadcrumbList, and no FAQPage', () => {
    for (const c of comparisons) {
      const types = jsonLdTypes(html(comparisonPath(c)));
      expect(types, c.slug).toContain('TechArticle');
      expect(types, c.slug).toContain('BreadcrumbList');
      expect(types, c.slug).not.toContain('FAQPage');
    }
  });

  test('the crosswalk hub, the sitemap and llms.txt list every page', () => {
    const crosswalk = html('/resources/crosswalk');
    const compareBlock = crosswalk.slice(crosswalk.indexOf('data-cw-compare'));
    const sitemaps = readdirSync('dist').filter((f) => /^sitemap-\d+\.xml$/.test(f));
    const sitemap = sitemaps.map((f) => readFileSync(join('dist', f), 'utf8')).join('\n');
    const llms = readFileSync(join('dist', 'llms.txt'), 'utf8');
    for (const c of comparisons) {
      const path = comparisonPath(c);
      expect(compareBlock, `crosswalk links ${path}`).toContain(`href="${path}"`);
      const entry = new RegExp(
        `<loc>https://aigovernanceengineer\\.com${path}</loc>\\s*<lastmod>\\d{4}-\\d{2}-\\d{2}`,
      );
      expect(sitemap, `sitemap lists ${path} with a lastmod`).toMatch(entry);
      expect(llms, `llms.txt lists ${path}`).toContain(`https://aigovernanceengineer.com${path}`);
    }
  });

  test('the "can you use" heading is worded by what B is', () => {
    const heading = (slug: string) => {
      const c = comparisons.find((x) => x.slug === slug);
      if (!c) throw new Error(`no comparison ${slug}`);
      const page = html(comparisonPath(c));
      const match = /<h2 id="cmp-can-use"[^>]*>([\s\S]*?)<\/h2>/.exec(page);
      return match ? text(match[1]) : '';
    };
    expect(heading('iso-42001-vs-eu-ai-act')).toBe('Can you use ISO 42001 to comply with the EU AI Act?');
    expect(heading('nist-ai-rmf-vs-eu-ai-act')).toBe('Can you use the NIST AI RMF to comply with the EU AI Act?');
    expect(heading('nist-ai-rmf-vs-iso-42001')).toBe('Can the NIST AI RMF help you certify to ISO/IEC 42001?');
  });
});

test.describe('comparison pages: accuracy (round 3)', () => {
  const titleOf = (id: string) => patterns.find((p) => p.id === id)?.title ?? id;

  test('runtime guardrails: no pattern is listed for both without a core clause on each side', () => {
    // The audit's wrong pairings (CONTENT R1): Use-Case Intake, AI Threat Model and
    // Fairness Eval Suite on ISO 42001 vs EU AI Act, Model Artefact Integrity,
    // Decision Notice and Sanctioned AI Gateway on NIST AI RMF vs ISO 42001.
    const banned = [
      'pattern-use-case-intake--risk-tiering',
      'pattern-ai-threat-model',
      'pattern-fairness-eval-suite',
      'pattern-model-artefact-integrity',
      'pattern-decision-notice--contest-path',
      'pattern-sanctioned-ai-gateway',
    ];
    for (const c of comparisons) {
      const cmp = buildComparison(c);
      const row = cmp.rows.find((r) => r.topic.id === 'runtime-guardrails');
      expect(row, `${c.slug}: runtime guardrails row`).toBeDefined();
      if (!row) continue;
      for (const id of banned) {
        expect(row.shared.map((p) => p.id), `${c.slug}: ${id}`).not.toContain(id);
      }
      // Today no pattern passes the rule on this row, on any pair: the cell is empty.
      expect(row.shared, c.slug).toEqual([]);

      const page = html(comparisonPath(c));
      const overlap = table(page, 'data-cmp-overlap');
      const tr = overlap.split('<tr').find((chunk) => chunk.includes('#topic-runtime-guardrails'));
      expect(tr, `${c.slug}: runtime guardrails <tr>`).toBeDefined();
      for (const id of banned) expect(text(tr ?? ''), `${c.slug}: ${id}`).not.toContain(titleOf(id));
    }
    // ...and the incident row of ISO 42001 vs EU AI Act no longer lists the
    // explanation and notice patterns that leaked in from ISO/IEC 42001 A.8.
    const iso = buildComparison(comparisons.find((c) => c.slug === 'iso-42001-vs-eu-ai-act')!);
    const incident = iso.rows.find((r) => r.topic.id === 'incident-monitoring');
    expect(incident?.shared.map((p) => p.id)).not.toContain('pattern-explanation-artefact');
    expect(incident?.shared.map((p) => p.id)).not.toContain('pattern-decision-notice--contest-path');
  });

  test('every pattern listed for both serves a core clause of the row on each side', () => {
    // Hardcoded, not imported: the same clause, or a paragraph of an EU AI Act
    // article filed whole. Never an ISO control for its group, a NIST
    // subcategory for its category, nor a bare NIST function (audit N-R3-5).
    const covers = (named: string, ref: string) =>
      named === ref || (/^Art\. \d+[a-z]?$/.test(ref) && named.startsWith(`${ref}(`));
    let listed = 0;
    for (const c of comparisons) {
      const cmp = buildComparison(c);
      for (const row of cmp.rows) {
        for (const p of row.shared) {
          listed += 1;
          for (const [side, fw] of [
            [row.a, c.a],
            [row.b, c.b],
          ] as const) {
            const named = namedClauses(p, fw);
            const ok = side.some(
              (s) =>
                s.ref.strength === 'core' &&
                (s.obligation?.patterns ?? []).includes(p.id) &&
                named.some((n) => covers(n, s.ref.ref)),
            );
            expect(ok, `${c.slug} ${row.topic.id}: ${p.id} on ${fw}`).toBe(true);
          }
        }
      }
    }
    // The rule is strict, not empty: the three pages still name patterns.
    expect(listed).toBeGreaterThan(10);
  });

  test('a sub-clause or a whole NIST function does not stand in for the row\'s clause', () => {
    const shared = (slug: string, topic: string) =>
      buildComparison(comparisons.find((c) => c.slug === slug)!)
        .rows.find((r) => r.topic.id === topic)
        ?.shared.map((p) => p.id) ?? [];
    // ISO/IEC 42001 A.6.2.4 (verification and validation) is not all of A.6,
    // so the fairness eval is not a documentation pattern (audit CONTENT R1).
    expect(shared('iso-42001-vs-eu-ai-act', 'documentation-transparency')).not.toContain(
      'pattern-fairness-eval-suite',
    );
    // A.6.2.5 (deployment) is not the logging control A.6.2.8.
    expect(shared('iso-42001-vs-eu-ai-act', 'logging-traceability')).not.toContain(
      'pattern-deactivation-localisation--retirement-runbook',
    );
    // GOVERN 2.2 (training) is not all of GOVERN 2 (accountability structures).
    expect(shared('nist-ai-rmf-vs-iso-42001', 'governance-accountability')).not.toContain(
      'pattern-sanctioned-ai-gateway',
    );
    // "NIST AI RMF (Manage)" names no subcategory: MANAGE 2.4 is not served by it.
    const oversight = shared('nist-ai-rmf-vs-eu-ai-act', 'human-oversight');
    expect(oversight).not.toContain('pattern-runtime-guardrail');
    expect(oversight).not.toContain('pattern-kill-switch--circuit-breaker');
    // Exact matches still pass: the deployment row keeps its rollout pattern on
    // both pages that file A.6.2.5 / MANAGE 2.4 / Art. 26 as core.
    expect(shared('nist-ai-rmf-vs-iso-42001', 'deployment-change-decommissioning')).toContain(
      'pattern-staged-rollout-with-rollback-criteria',
    );
    expect(shared('nist-ai-rmf-vs-eu-ai-act', 'deployment-change-decommissioning')).toContain(
      'pattern-staged-rollout-with-rollback-criteria',
    );
  });

  test('an ISO 42001 gap is stated for this crosswalk, not as a fact about the standard', () => {
    // The ISO text is paywalled: "Environmental impact" is a topic this mapping
    // does not reach on the ISO side, not one ISO/IEC 42001 is shown to omit.
    const iso = gapQuestion(buildComparison(comparisons.find((c) => c.slug === 'iso-42001-vs-eu-ai-act')!));
    expect(iso.a).toContain('In this crosswalk');
    expect(iso.a).toContain('no ISO 42001 clause mapped');
    expect(iso.a).toContain('Environmental impact');
    expect(iso.a).toContain('not one ISO 42001 is shown to leave out');
    for (const c of comparisons) {
      const gap = gapQuestion(buildComparison(c));
      expect(gap.a, c.slug).not.toMatch(/ISO(?:\/IEC)? 42001 (?:has|contains|includes) no\b/);
      expect(text(html(comparisonPath(c))), c.slug).toContain(text(gap.a));
    }
  });

  test('the EN 18286 answer cites a source for "not yet in the Official Journal"', () => {
    const iso = comparisons.find((c) => c.slug === 'iso-42001-vs-eu-ai-act')!;
    const item = iso.faq.find((f) => f.a.includes('EN 18286'));
    expect(item?.a).toContain('not yet published in the Official Journal');
    expect(item?.sources?.map((s) => s.url)).toContain(
      'https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation',
    );
  });

  test('no "only" claim rests on a clause filed in passing, and the NIST gap names what is not mapped', () => {
    for (const c of comparisons) {
      const cmp = buildComparison(c);
      const gap = gapQuestion(cmp);
      for (const row of cmp.rows.filter((r) => r.passing)) {
        // A passing row is one-sided and its only clauses are `related`.
        const one = row.level === 'a-only' ? row.a : row.b;
        expect(one.every((s) => s.ref.strength === 'related'), row.topic.id).toBe(true);
        const list = /clause and no [^:]+: ([^.]+)\./.exec(gap.a)?.[1] ?? '';
        expect(list, `${c.slug}: ${row.topic.name} counted as covered`).not.toContain(row.topic.name);
      }
      const page = html(comparisonPath(c));
      expect(text(page)).toContain(text(gap.a));
    }
    // Agent identity and autonomy rests on EU AI Act Art. 14 filed as `related`.
    const iso = buildComparison(comparisons.find((c) => c.slug === 'iso-42001-vs-eu-ai-act')!);
    expect(iso.rows.find((r) => r.topic.id === 'agent-identity-autonomy')?.passing).toBe(true);
    // The NIST pages map AI RMF 1.0 only; the Type row and the gap answer say so.
    expect(glance['nist-ai-rmf'].type).toContain('NIST AI 600-1');
    expect(glance['nist-ai-rmf'].type).toContain('not mapped');
    const nistEu = gapQuestion(buildComparison(comparisons.find((c) => c.slug === 'nist-ai-rmf-vs-eu-ai-act')!));
    expect(nistEu.a).toContain('In this crosswalk');
    expect(nistEu.a).toContain('NIST AI 600-1');
    expect(nistEu.sources?.map((s) => s.url)).toContain('https://doi.org/10.6028/NIST.AI.600-1');
  });

  test('every "At a glance" cell and every hand-written FAQ answer names a primary source', () => {
    for (const c of comparisons) {
      for (const id of [c.a, c.b]) {
        for (const { key } of glanceRows) {
          const list = glance[id].sources[key];
          expect(list.length, `${id} ${key}`).toBeGreaterThan(0);
          for (const s of list) expect(s.url, `${id} ${key}`).toMatch(/^https:\/\//);
        }
      }
      for (const item of c.faq) expect(item.sources?.length ?? 0, `${c.slug}: ${item.q}`).toBeGreaterThan(0);

      const glanceTable = table(html(comparisonPath(c)), 'data-cmp-glance');
      const cells = [...glanceTable.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((m) => m[1]);
      // Seven attributes on two sides carry a source line; the Body of Knowledge row does not.
      const sourced = cells.filter((cell) => cell.includes('class="cmp-src'));
      expect(sourced.length, c.slug).toBe(glanceRows.length * 2);
      for (const cell of sourced) expect(cell).toMatch(/href="https:\/\/[^"]+"/);
    }
  });

  test('the Article 40 answers also name Article 41 common specifications; EN 18286 is sourced', () => {
    for (const c of comparisons) {
      for (const answer of [c.canUse, ...c.faq.map((f) => f.a)]) {
        if (/Article 40/.test(answer)) {
          expect(answer, c.slug).toMatch(/Article 41/);
          expect(answer, c.slug).toMatch(/common specifications/);
        }
      }
      for (const item of c.faq.filter((f) => f.a.includes('EN 18286'))) {
        expect(item.sources?.map((s) => s.url).join(' ')).toContain('cencenelec.eu');
      }
    }
  });

  test('NIST AI RMF certifiability is stated as the source supports it', () => {
    expect(glance['nist-ai-rmf'].certifiable).toContain('no certification scheme');
    expect(glance['nist-ai-rmf'].sources.certifiable.map((s) => s.label)).toContain('NIST AI 100-1');
  });
});

test.describe('comparison pages: In short, pillar link, OG card, Markdown twin', () => {
  const words = (s: string) => s.trim().split(/\s+/).length;

  test('each page opens with an In short passage of 130 to 170 words', () => {
    for (const c of comparisons) {
      const passage = inShortText(buildComparison(c));
      const n = words(passage);
      expect(n, `${c.slug}: ${n} words`).toBeGreaterThanOrEqual(130);
      expect(n, `${c.slug}: ${n} words`).toBeLessThanOrEqual(170);
      expect(passage, c.slug).not.toMatch(/[{}]/);
      expect(passage, c.slug).not.toContain('\u2014');
      expect(passage, c.slug).not.toMatch(/\bthis page\b/i);

      const page = html(comparisonPath(c));
      const callout = /<aside class="callout" data-kind="summary" data-cmp-in-short[^>]*>([\s\S]*?)<\/aside>/.exec(page);
      expect(callout, `${c.slug}: In short callout`).not.toBeNull();
      expect(text(callout?.[1] ?? '')).toBe(`In short ${decode(passage)}`);
    }
  });

  test('each page links the /ai-governance pillar and has its own OG card', () => {
    for (const c of comparisons) {
      const page = html(comparisonPath(c));
      const start = page.indexOf('data-pagefind-body');
      const main = page.slice(start, page.indexOf('</main>', start));
      expect(main, c.slug).toMatch(/data-pillar-link[\s\S]*?href="\/ai-governance"/);

      const image = comparisonOgImage(c);
      expect(image).toBe(`/og/crosswalk-${c.slug}.png`);
      expect(page, c.slug).toContain(`<meta property="og:image" content="https://aigovernanceengineer.com${image}"`);
      const png = readFileSync(join('dist', image));
      expect(png.subarray(1, 4).toString('latin1')).toBe('PNG');
      expect([png.readUInt32BE(16), png.readUInt32BE(20)], image).toEqual([1200, 630]);
    }
  });

  test('each page has a Markdown twin, advertised and carried by llms-full', () => {
    const full = readFileSync(join('dist', 'llms-full.txt'), 'utf8');
    const regulatory = readFileSync(join('dist', 'llms-full-regulatory.txt'), 'utf8');
    const llms = readFileSync(join('dist', 'llms.txt'), 'utf8');
    for (const c of comparisons) {
      const path = comparisonPath(c);
      const md = readFileSync(join('dist', `${path}.md`), 'utf8');
      expect(md).toMatch(new RegExp(`^---\\n[\\s\\S]*?canonical: https://aigovernanceengineer\\.com${path}\\n`));
      const cmp = buildComparison(c);
      for (const piece of [
        '**In short**',
        inShortText(cmp),
        '## At a glance',
        '## Where they overlap, topic by topic',
        `## ${canUseQuestion(cmp)}`,
        '## Frequently asked questions',
        '## Sources',
      ]) {
        expect(md, `${path}.md: ${piece.slice(0, 40)}`).toContain(piece);
      }
      expect(md).not.toContain('\u2014');
      const page = html(path);
      expect(page, path).toContain(`<link rel="alternate" type="text/markdown" href="${path}.md"`);
      expect(llms, `llms.txt lists ${path}.md`).toContain(`https://aigovernanceengineer.com${path}.md`);
      expect(full, `llms-full carries ${path}`).toContain(`Source: https://aigovernanceengineer.com${path}\n`);
      expect(regulatory, `llms-full-regulatory carries ${path}`).toContain(`Source: https://aigovernanceengineer.com${path}\n`);
    }
    expect(full).toContain('## Where they overlap, topic by topic');
  });
});
