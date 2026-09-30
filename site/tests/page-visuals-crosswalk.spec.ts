// page-visuals-crosswalk.spec.ts: the wave-1 visuals of /resources/crosswalk
// and its three "<A> vs <B>" pages (OpenSpec page-visuals, "Recuentos
// coherentes") draw the crosswalk's own numbers. Read from dist, like
// seo-compare.spec.ts; every expected value is recomputed here from the raw
// references (src/data/crosswalk.ts refs), never from the page, the chart kit
// or src/lib/comparisons.ts, so a chart wired to the wrong sets, sides, levels
// or strengths fails:
// - the Venn (wide) and the UpSet (narrow) name the same seven regions with the
//   topics each holds, and the centre is the "overlap on N" the prose states;
// - the overlap bar's four counts, the numbers its series labels print and
//   the headline tiles above it;
// - the butterfly's rows: one per topic either side reaches, in the group of
//   its overlap level, one square per clause, core and related, per side.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { refs, topics } from '../src/data/crosswalk';
import { comparisons, comparisonPath } from '../src/data/comparisons';

function html(route: string): string {
  const base = join('dist', ...route.split('/').filter(Boolean));
  const file = [`${base}.html`, join(base, 'index.html')].find((f) => existsSync(f));
  if (!file) throw new Error(`no built page for ${route}`);
  return readFileSync(file, 'utf8');
}

const decode = (s: string) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'");

/** The element that opens at `marker` (an id or attribute) up to its closing tag. */
function slice(page: string, marker: string, close: string): string {
  const start = page.indexOf(marker);
  expect(start, `no ${marker}`).toBeGreaterThan(-1);
  return page.slice(start, page.indexOf(close, start));
}

/** Clauses one instrument files under one topic, by strength. */
function clauses(topic: string, framework: string) {
  const list = refs.filter((r) => r.topic === topic && r.framework === framework);
  return { core: list.filter((r) => r.strength === 'core').length, related: list.filter((r) => r.strength !== 'core').length };
}
const reaches = (topic: string, framework: string) => refs.some((r) => r.topic === topic && r.framework === framework);

test.describe('/resources/crosswalk Venn of the three instruments', () => {
  const SETS = [
    ['eu-ai-act', 'EU AI Act'],
    ['iso-42001', 'ISO/IEC 42001'],
    ['nist-ai-rmf', 'NIST AI RMF'],
  ] as const;
  // Region name (as the chart words it) -> its topics, from the raw refs.
  const members = new Map<string, string[]>();
  for (const topic of topics) {
    const inside = SETS.filter(([id]) => reaches(topic.id, id)).map(([, label]) => label);
    if (inside.length === 0) continue;
    const region = inside.length === 3 ? 'All three' : `${inside.join(' and ')} only`;
    members.set(region, [...(members.get(region) ?? []), topic.name]);
  }
  // Topic names hold commas ("Robustness, security and evaluations"), so the
  // list is compared as the chart joins it, with its count beside it.
  const expected = new Map([...members].map(([region, names]) => [region, { n: names.length, list: names.join(', ') }]));
  /** Non-empty region tooltips of one SVG: "All three: 20 topics: A, B, ...". */
  const regions = (svg: string) => {
    const out = new Map<string, { n: number; list: string }>();
    for (const m of svg.matchAll(/<title>([^<]+?): (\d+) topics?(?:: ([^<]*))?<\/title>/g)) {
      if (Number(m[2]) > 0) out.set(decode(m[1]), { n: Number(m[2]), list: decode(m[3] ?? '') });
    }
    return out;
  };

  test('both variants name every non-empty region with exactly its topics', () => {
    const page = html('/resources/crosswalk');
    const figure = slice(page, 'id="cw-venn"', '</figure>');
    for (const variant of ['cw-venn-w', 'cw-venn-n']) {
      const svg = slice(figure, `aria-labelledby="${variant}-t`, '</svg>');
      expect(regions(svg), variant).toEqual(expected);
    }
  });

  test('the centre is the overlap the section prose states, and the table marks each topic per instrument', () => {
    const page = html('/resources/crosswalk');
    const centre = expected.get('All three')?.n ?? 0;
    expect(centre).toBeGreaterThan(0);
    expect(decode(page.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ')).toContain(`The three overlap on ${centre} of the ${topics.length} topics`);

    const table = slice(slice(page, 'id="cw-venn"', '</figure>'), '<tbody', '</tbody>');
    const rows = [...table.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map((m) =>
      [...m[1].matchAll(/<t[hd][^>]*>([^<]*)<\/t[hd]>/g)].map((c) => decode(c[1])),
    );
    expect(rows).toEqual(topics.map((t) => [t.name, ...SETS.map(([id]) => (reaches(t.id, id) ? 'Yes' : 'No'))]));
  });
});

test.describe('comparison pages: overlap bar and clause butterfly', () => {
  for (const c of comparisons) {
    // Per topic either side reaches: clauses per side and the overlap level.
    const rows = topics
      .map((t) => {
        const a = clauses(t.id, c.a);
        const b = clauses(t.id, c.b);
        const nA = a.core + a.related;
        const nB = b.core + b.related;
        const level =
          nA && nB ? (a.core && b.core ? 'strong' : 'partial') : nA ? 'a-only' : nB ? 'b-only' : undefined;
        return { id: t.id, a, b, level };
      })
      .filter((r) => r.level);
    const count = (level: string) => rows.filter((r) => r.level === level).length;

    test(`${c.slug}: the overlap bar and its tiles count each level, and its labels print the same numbers`, () => {
      const page = html(comparisonPath(c));
      const figure = slice(page, 'id="cmp-bar"', '</figure>');
      const tiles = [...slice(page, 'class="cmp-stats"', '</ul>').matchAll(/class="cmp-stat-n"[^>]*>(\d+)</g)].map((m) => Number(m[1]));
      const head = [...slice(figure, '<thead', '</thead>').matchAll(/<th[^>]*>([^<]*)<\/th>/g)].map((m) => decode(m[1]));
      const body = [...slice(figure, '<tbody', '</tbody>').matchAll(/<t[hd][^>]*>([^<]*)<\/t[hd]>/g)].map((m) => decode(m[1]));
      const values = [count('strong'), count('partial'), count('a-only'), count('b-only')];
      expect(body.slice(1).map(Number)).toEqual([...values, rows.length]);
      expect(tiles).toEqual(values);
      // Series columns 1-4: "Strong: 13", "EU AI Act only: 5 (1 in passing)".
      expect(head.slice(1, 5).map((h) => Number(/: (\d+)/.exec(h)?.[1]))).toEqual(values);
      expect(head[3].startsWith(`${c.aName} only`) && head[4].startsWith(`${c.bName} only`)).toBe(true);
    });

    test(`${c.slug}: the butterfly draws one row per topic, in its level's group, a square per clause`, () => {
      const figure = slice(html(comparisonPath(c)), 'data-cmp-butterfly', '</figure>');
      const drawn = [...figure.matchAll(/<div class="cb-group" data-level="([^"]+)"[^>]*>([\s\S]*?)<\/ul>/g)].flatMap((g) =>
        g[2].split('<li class="cb-row"').slice(1).map((li) => {
          // Markup order: label, side a, side b.
          const [, a, b] = li.split(/data-side="[ab]"/);
          const side = (part: string) => {
            return { core: (part.match(/class="cb-sq cb-core"/g) ?? []).length, related: (part.match(/class="cb-sq cb-rel"/g) ?? []).length };
          };
          return { id: /data-topic="([^"]+)"/.exec(li)?.[1], level: g[1], a: side(a), b: side(b) };
        }),
      );
      const order = ['strong', 'partial', 'a-only', 'b-only'];
      const sorted = [...rows].sort((x, y) => order.indexOf(x.level!) - order.indexOf(y.level!));
      expect(drawn).toEqual(sorted.map(({ id, level, a, b }) => ({ id, level, a, b })));
    });
  }
});
