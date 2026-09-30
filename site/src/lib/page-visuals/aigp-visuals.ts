// aigp-visuals.ts: the two charts of /for/aigp, computed from data/aigp.ts
// (and chapter titles from data/chapters.ts):
//
//   weight  where the exam weighs (treemap): one group per domain, one tile per
//           competency, tile area = the midpoint of its exam question range
//           (rangeMidpoint), the bar along its foot = the share of its
//           indicators this site marks taught; each tile links to the
//           competency's heading (#competency-i-a).
//   flow    domains to chapters (flow): ribbon width = the number of a
//           domain's indicators that link into a chapter (indicators[].links
//           under /bok/<slug>); an indicator that links two chapters counts
//           once in each. At most nine chapter nodes: past nine, eight stay,
//           ranked by the most indicators any one domain sends them (so each
//           domain keeps the chapters that carry it), then by their total,
//           then by chapter number; the rest merge into "Other (N)", N
//           chapters, where each domain's ribbon counts its indicators that
//           link any of them, once.
import { NARROW_WIDTH, flow, treemap, type ChartMode, type ChartOutput, type SankeyLink, type SankeyNode } from '../charts';
import { aigpAsOf, aigpBok, aigpDomains, rangeMidpoint, type AigpDomain } from '../../data/aigp';
import { chapters, type Chapter } from '../../data/chapters';

export interface Pair {
  wide: ChartOutput;
  narrow: ChartOutput;
}

const MODE: ChartMode = 'figc';
const SOURCE = `AIGP BoK v${aigpBok.version} (IAPP) and this site's coverage map`;
const MAX_CHAPTERS = 9;

/** The heading anchor of a competency on /for/aigp: I.A -> competency-i-a. */
export const competencyAnchor = (code: string) => `competency-${code.toLowerCase().replace('.', '-')}`;

export function examWeight(): Pair {
  const groups = aigpDomains.map((domain) => ({
    // "Domain III (23)" fits a group header where the full title would not.
    label: `Domain ${domain.code}`,
    items: domain.competencies.map((c) => ({
      label: c.code,
      name: `${c.code} ${c.title}`,
      value: rangeMidpoint(c.questions),
      fill: c.indicators.filter((i) => i.status === 'taught').length / c.indicators.length,
      href: `#${competencyAnchor(c.code)}`,
    })),
  }));
  const competencies = groups.reduce((n, g) => n + g.items.length, 0);
  const base = {
    title: 'Where the exam weighs',
    desc: `The ${competencies} AIGP competencies in their four domains, each tile as large as the midpoint of its exam question range, with a bar for the share of its indicators this site teaches.`,
    source: SOURCE,
    asOf: aigpAsOf,
    mode: MODE,
    groups,
    unit: 'questions (midpoint)',
    groupHeader: 'Domain',
    itemHeader: 'Competency',
    valueHeader: 'Questions (midpoint)',
    fillHeader: 'Taught',
    tableCaption: 'AIGP competencies by the midpoint of their question range, with the share of indicators taught (%)',
  };
  return {
    wide: treemap({ ...base, id: 'aigp-weight-w', width: 720 }),
    narrow: treemap({ ...base, id: 'aigp-weight-n', width: NARROW_WIDTH, layout: 'narrow' }),
  };
}

/** The chapters an indicator links into, by /bok/<slug>. */
function chaptersOf(links: readonly string[]): Set<Chapter> {
  const out = new Set<Chapter>();
  for (const href of links) {
    const slug = /^\/bok\/([^/#?]+)/.exec(href)?.[1];
    const chapter = slug ? chapters.find((c) => c.slug === slug) : undefined;
    if (chapter) out.add(chapter);
  }
  return out;
}

/** Per domain, each chapter's set of linking indicator ids. */
function domainChapterIndicators(domain: AigpDomain): Map<Chapter, Set<string>> {
  const map = new Map<Chapter, Set<string>>();
  for (const c of domain.competencies) {
    for (const ind of c.indicators) {
      for (const chapter of chaptersOf(ind.links)) {
        const set = map.get(chapter) ?? new Set<string>();
        set.add(ind.id);
        map.set(chapter, set);
      }
    }
  }
  return map;
}

const num = (c: Chapter) => c.id.slice(0, 2);

export function domainChapters(): Pair {
  const perDomain = aigpDomains.map((d) => ({ domain: d, map: domainChapterIndicators(d) }));
  const reached = [...new Set(perDomain.flatMap(({ map }) => [...map.keys()]))];
  const total = (c: Chapter) => perDomain.reduce((n, { map }) => n + (map.get(c)?.size ?? 0), 0);
  const peak = (c: Chapter) => Math.max(...perDomain.map(({ map }) => map.get(c)?.size ?? 0));
  const ranked = reached.sort((a, b) => peak(b) - peak(a) || total(b) - total(a) || a.order - b.order);
  const kept = ranked.length > MAX_CHAPTERS ? ranked.slice(0, MAX_CHAPTERS - 1) : ranked;
  const rest = ranked.slice(kept.length).sort((a, b) => a.order - b.order);

  const nodes: SankeyNode[] = [
    ...aigpDomains.map((d) => ({
      id: `d-${d.code}`,
      column: 'domain',
      label: `${d.code} ${d.title}`,
      name: `Domain ${d.code}: ${d.title}`,
      href: `#domain-${d.code.toLowerCase()}`,
    })),
    ...[...kept]
      .sort((a, b) => a.order - b.order)
      .map((c) => ({ id: `c-${num(c)}`, column: 'chapter', label: `${num(c)} ${c.shortTitle}`, name: c.title, href: `/bok/${c.slug}` })),
    ...(rest.length
      ? [{ id: 'c-other', column: 'chapter', label: `Other (${rest.length})`, name: `Other chapters: ${rest.map(num).join(', ')}` }]
      : []),
  ];
  const links: SankeyLink[] = perDomain.flatMap(({ domain, map }) => {
    const own = kept.filter((c) => map.has(c)).map((c) => ({ from: `d-${domain.code}`, to: `c-${num(c)}`, value: map.get(c)!.size }));
    const other = new Set(rest.flatMap((c) => [...(map.get(c) ?? [])]));
    return other.size ? [...own, { from: `d-${domain.code}`, to: 'c-other', value: other.size }] : own;
  });
  const base = {
    title: 'From the AIGP domains to the chapters',
    desc: `For each of the four AIGP domains, how many of its indicators link into each chapter of the body of knowledge; an indicator that links two chapters counts in both.`,
    source: SOURCE,
    asOf: aigpAsOf,
    mode: MODE,
    columns: [
      { key: 'domain', label: 'Domain' },
      { key: 'chapter', label: 'Chapter' },
    ],
    nodes,
    links,
    unit: 'indicators',
    unitOne: 'indicator',
    fromHeader: 'Domain',
    toHeader: 'Chapter',
    valueHeader: 'Indicators',
    tableCaption: 'AIGP indicators per domain that link into each chapter',
  };
  return {
    wide: flow({ ...base, id: 'aigp-flow-w', width: 760 }),
    narrow: flow({ ...base, id: 'aigp-flow-n', width: NARROW_WIDTH, layout: 'narrow' }),
  };
}
