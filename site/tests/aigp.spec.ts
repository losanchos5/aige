// aigp.spec.ts: the AIGP coverage map (src/data/aigp.ts) against the public
// blueprint's structure and against the site. Runs in the Playwright runner but
// uses no browser: pure Node reads and assertions, like data.spec.ts. It checks
// the four domains, 13 competencies and 58 indicators with the blueprint's
// question ranges, positional ids, the 12-word paraphrase limit, the status
// rule, that every mapped anchor exists (chapter headings slugged as
// rehype-slug slugs them, patterns, glossary terms, live tools, template rows,
// cases and known routes), the study paths and the heatmap's figure contract.

import { test, expect } from '@playwright/test';

import {
  aigpBok,
  aigpDomains,
  aigpIndicators,
  aigpNotice,
  aigpAsOf,
  aigpReviewBy,
  indicatorAnchor,
  rangeMidpoint,
  statusLabel,
  studyPath,
} from '../src/data/aigp';
import { aigpMapProblems, resolveAigpLink, resolvedAigpMap } from '../src/lib/aigp-coverage';
import { aigpHeatmapSvgs } from '../src/lib/aigp-heatmap';

// The em dash, built from its code point so this file never contains one.
const EM_DASH = String.fromCharCode(0x2014);

// The blueprint's question ranges (AIGP BoK v2.1, pages 4 to 9), hard-coded on
// purpose: a test that read the same module it checks would pass on any drift.
const DOMAIN_RANGES: Record<string, [number, number]> = {
  I: [16, 20],
  II: [19, 23],
  III: [21, 25],
  IV: [21, 25],
};
const COMPETENCY_SHAPE: Record<string, { range: [number, number]; indicators: number }> = {
  'I.A': { range: [4, 6], indicators: 4 },
  'I.B': { range: [5, 7], indicators: 5 },
  'I.C': { range: [6, 8], indicators: 3 },
  'II.A': { range: [4, 6], indicators: 4 },
  'II.B': { range: [4, 6], indicators: 4 },
  'II.C': { range: [6, 8], indicators: 6 },
  'II.D': { range: [3, 5], indicators: 3 },
  'III.A': { range: [6, 8], indicators: 5 },
  'III.B': { range: [6, 8], indicators: 5 },
  'III.C': { range: [8, 10], indicators: 6 },
  'IV.A': { range: [6, 8], indicators: 3 },
  'IV.B': { range: [5, 7], indicators: 3 },
  'IV.C': { range: [9, 11], indicators: 7 },
};

test.describe('AIGP coverage map', () => {
  test('carries blueprint v2.1 with its dates and the fixed notice', () => {
    expect(aigpBok.version).toBe('2.1');
    expect(aigpBok.effective).toBe('2026-02-02');
    expect(aigpBok.supersedes).toBe('2.0.1');
    expect(aigpBok.url.startsWith('https://prod.iapp.org/')).toBe(true);
    expect(aigpNotice).toBe(
      'AIGP is a registered trademark of the IAPP; this site is not affiliated with or endorsed by the IAPP; this is a coverage map of an open body of knowledge, not exam preparation.',
    );
    expect(aigpAsOf).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(aigpReviewBy > aigpAsOf).toBe(true);
  });

  test('has four domains, 13 competencies and 58 indicators with the blueprint ranges', () => {
    expect(aigpDomains.map((d) => d.code)).toEqual(['I', 'II', 'III', 'IV']);
    for (const domain of aigpDomains) {
      expect([domain.questions.min, domain.questions.max], domain.code).toEqual(
        DOMAIN_RANGES[domain.code],
      );
    }
    const competencies = aigpDomains.flatMap((d) => d.competencies);
    expect(competencies.map((c) => c.code)).toEqual(Object.keys(COMPETENCY_SHAPE));
    for (const competency of competencies) {
      const shape = COMPETENCY_SHAPE[competency.code];
      expect([competency.questions.min, competency.questions.max], competency.code).toEqual(
        shape.range,
      );
      expect(competency.indicators.length, competency.code).toBe(shape.indicators);
    }
    expect(aigpIndicators()).toHaveLength(58);
  });

  test('indicator ids are positional and unique', () => {
    const ids = aigpIndicators().map(({ indicator }) => indicator.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const { competency, indicator } of aigpIndicators()) {
      const position = competency.indicators.indexOf(indicator) + 1;
      expect(indicator.id).toBe(`${competency.code}.${position}`);
      expect(indicatorAnchor(indicator.id)).toBe(`ind-${indicator.id.replace(/\./g, '-')}`);
    }
  });

  test('paraphrases are at most 12 words, and statuses follow the house rule', () => {
    for (const { indicator } of aigpIndicators()) {
      const words = indicator.paraphrase.trim().split(/\s+/);
      expect(words.length, `${indicator.id}: ${indicator.paraphrase}`).toBeLessThanOrEqual(12);
      expect(indicator.paraphrase.includes(EM_DASH), indicator.id).toBe(false);
      expect(['taught', 'partly-taught']).toContain(indicator.status);
      if (indicator.status === 'partly-taught') {
        expect(indicator.note?.trim().length ?? 0, indicator.id).toBeGreaterThan(20);
      } else {
        expect(indicator.note, indicator.id).toBeUndefined();
      }
    }
  });

  test('every mapped anchor exists: headings, patterns, terms, tools, templates and routes', () => {
    let checked = 0;
    for (const { indicator } of aigpIndicators()) {
      expect(indicator.links.length, indicator.id).toBeGreaterThanOrEqual(2);
      expect(indicator.links[0].startsWith('/bok/'), `${indicator.id} studies a chapter first`).toBe(
        true,
      );
      for (const href of indicator.links) {
        expect(() => resolveAigpLink(href), `${indicator.id} ${href}`).not.toThrow();
        checked += 1;
      }
    }
    expect(checked).toBeGreaterThan(200);
    expect(aigpMapProblems()).toEqual([]);
    expect(resolvedAigpMap()).toHaveLength(4);
  });

  test('the resolver rejects what the build does not have', () => {
    expect(() => resolveAigpLink('/bok/eu-ai-act#no-such-heading')).toThrow();
    expect(() => resolveAigpLink('/bok/eu-ai-act')).toThrow();
    expect(() => resolveAigpLink('/patterns/no-such-pattern')).toThrow();
    expect(() => resolveAigpLink('/glossary/no-such-term')).toThrow();
    expect(() => resolveAigpLink('/resources/templates#schema-no-such-schema')).toThrow();
    expect(() => resolveAigpLink('/resources/no-such-page')).toThrow();
    expect(() => resolveAigpLink('https://example.com/')).toThrow();
    expect(resolveAigpLink('/bok/the-stack#designing-human-oversight-article-14').label).toMatch(
      /^Ch\. 04 · /,
    );
  });

  test('each study path covers every indicator of its domain once', () => {
    for (const domain of aigpDomains) {
      const steps = studyPath(domain);
      const served = steps.flatMap((step) => step.indicators);
      const expected = domain.competencies.flatMap((c) => c.indicators.map((i) => i.id));
      expect(served.sort()).toEqual([...expected].sort());
      expect(new Set(steps.map((s) => s.href)).size).toBe(steps.length);
      for (const step of steps) expect(step.href.startsWith('/bok/')).toBe(true);
    }
  });

  test('the heatmap draws one cell per indicator and keeps the figure contract', () => {
    const svgs = aigpHeatmapSvgs(aigpDomains, {
      id: 't',
      title: 'AIGP coverage heatmap',
      alt: (part) =>
        `Heatmap of the ${part.indicators} AIGP indicators of domains ${part.codes.join(' and ')}, each cell marked taught or partly taught on this site.`,
      asOf: aigpAsOf,
      bokVersion: aigpBok.version,
      bokEffective: aigpBok.effective,
    });
    // Two standalone images of two domains each (the 58 full cell names do
    // not fit one 12 KB SVG).
    expect(svgs).toHaveLength(2);
    const ticks = (svg: string) => /<g class="mono muted" font-size="12" text-anchor="middle">(.*?)<\/g>/.exec(svg)?.[1];
    svgs.forEach((svg, k) => {
      const codes = aigpDomains.slice(k * 2, k * 2 + 2).map((d) => d.code);
      expect(svg).toContain('role="img"');
      expect(svg).toContain(`aria-labelledby="fig-t-${k + 1}-t fig-t-${k + 1}-d"`);
      expect(svg).toContain(`<title id="fig-t-${k + 1}-t">AIGP coverage heatmap, domains ${codes.join(' and ')}</title>`);
      const desc = /<desc id="[^"]+">([^<]*)<\/desc>/.exec(svg)![1];
      expect(desc.length, desc).toBeGreaterThanOrEqual(50);
      expect(desc.length, desc).toBeLessThanOrEqual(160);
      expect(svg).toContain(`As of ${aigpAsOf}`);
      expect(svg).toContain('Source: AIGP BoK v2.1');
      expect(svg.includes(EM_DASH)).toBe(false);
      expect(Buffer.byteLength(svg, 'utf8'), `part ${k + 1}`).toBeLessThanOrEqual(12 * 1024);
      // Both parts draw their bars on one question axis, so they compare.
      expect(ticks(svg), `part ${k + 1} axis`).toBe(ticks(svgs[0]));
    });
    const group = (name: string) => svgs.map((svg) => new RegExp(`<g class="${name}">(.*?)</g>`).exec(svg)?.[1] ?? '').join('');
    const cells = (name: string) => (group(name).match(/<rect /g) ?? []).length;
    const partly = aigpIndicators().filter(({ indicator }) => indicator.status === 'partly-taught');
    expect(cells('ag-hm-taught') + cells('ag-hm-partly')).toBe(58);
    expect(cells('ag-hm-partly')).toBe(partly.length);
    // Each cell's <title> (its chart tooltip) names its indicator by id and
    // paraphrase and the status it is drawn in, in register order within
    // each drawing.
    const decode = (t: string) => t.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    const titles = (name: string) => [...group(name).matchAll(/<rect [^>]*><title>([^<]*)<\/title><\/rect>/g)].map((m) => decode(m[1]));
    for (const [name, status] of [['ag-hm-taught', 'taught'], ['ag-hm-partly', 'partly-taught']] as const) {
      const expected = aigpIndicators()
        .filter(({ indicator }) => indicator.status === status)
        .map(({ indicator }) => `${indicator.id} ${indicator.paraphrase.replace(/\.$/, '')}: ${statusLabel[status]}`);
      expect(titles(name), name).toEqual(expected);
    }
    // Bar widths follow the range midpoint: IV.C (9-11) is 10 wide, II.D (3-5) is 4.
    expect(rangeMidpoint({ min: 9, max: 11 })).toBe(10);
    expect(rangeMidpoint({ min: 3, max: 5 })).toBe(4);
  });
});
