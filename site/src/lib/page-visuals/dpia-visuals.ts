// dpia-visuals.ts: the three charts of /resources/dpia-lists, each as a wide
// and a narrow (340) variant, all computed from data/dpia-lists.ts:
//
//   annex     country x EU AI Act Annex III area: how many of a list's items
//             overlap each area (countGrid), with the totals per area and per
//             country. A country's total counts its overlapping items once,
//             so an item in two areas is in both columns but once in the
//             total. Areas no item touches keep their empty column.
//   timeline  one dot per dated event (beeswarm): each list's adoption, the
//             EDPB opinion on its draft and any later dated change, against
//             the AI Act's entry into force (data/ai-act-timeline.ts).
//   sizes     items or criteria per list (stackedBars), drawn by method:
//             solid enumerated, hatched scored, outlined mixed.
//
// Nothing here is typed by hand: every count and date comes from the rows.
import { beeswarm, stackedBars, type ChartMode, type ChartOutput, type TimePoint } from '../charts';
import { countGrid } from './count-grid';
import {
  lists,
  listsByCountry,
  annexIII,
  annexIIIOrder,
  annexIIILabel,
  methodLabel,
  listAnchor,
  DPIA_AS_OF,
  type AnnexIIIArea,
  type DpiaList,
  type DpiaMethod,
} from '../../data/dpia-lists';
import { aiActMilestones } from '../../data/ai-act-timeline';

export interface Pair {
  wide: ChartOutput;
  narrow: ChartOutput;
}

const MODE: ChartMode = 'figc';
const SOURCE = 'EDPB register of Art. 35(4) lists and the national lists [4]';

/** Column labels, shortened on purpose to fit a vertical label; the table keeps the full names. */
const AREA_SHORT: Readonly<Record<AnnexIIIArea, string>> = {
  biometrics: 'Biometrics',
  'critical-infrastructure': 'Critical infrastructure',
  education: 'Education',
  employment: 'Employment',
  'essential-services': 'Essential services',
  'law-enforcement': 'Law enforcement',
  migration: 'Migration and borders',
  'justice-democracy': 'Justice and democracy',
};

const itemsLink = (l: DpiaList) => `#${listAnchor(l)}-items`;

/** Items of a list that overlap an Annex III area. */
export const areaCount = (l: DpiaList, area: AnnexIIIArea): number => l.items.filter((i) => i.annexIII.includes(area)).length;

/** Items of a list that overlap any Annex III area, each counted once. */
export const overlappingItems = (l: DpiaList): number => l.items.filter((i) => i.annexIII.length > 0).length;

export function annexChart(): Pair {
  const ordered = listsByCountry()
    .map((l, i) => ({ l, i, total: overlappingItems(l) }))
    .sort((a, b) => b.total - a.total || a.i - b.i);
  const rows = ordered.map(({ l }) => ({ label: l.country, href: itemsLink(l), values: annexIIIOrder.map((a) => areaCount(l, a)) }));
  const base = {
    title: 'Annex III overlaps, list by list',
    desc: `For each of the ${lists.length} national DPIA lists, how many of its items overlap each EU AI Act Annex III high-risk area, with totals per area and, each item once, per country.`,
    source: SOURCE,
    asOf: DPIA_AS_OF,
    mode: MODE,
    rowHeader: 'Country',
    rows,
    rowTotals: ordered.map(({ total }) => total),
    columns: annexIIIOrder.map((a) => `${annexIII[a].point} ${AREA_SHORT[a]}`),
    columnNames: annexIIIOrder.map((a) => annexIIILabel(a)),
    unit: 'items',
    tableCaption: 'Items of each national DPIA list that overlap an EU AI Act Annex III area',
  };
  return {
    wide: countGrid({ ...base, id: 'dl-annex-w', width: 640 }),
    narrow: countGrid({ ...base, id: 'dl-annex-n', width: 340 }),
  };
}

/** YYYY-MM-DD for the time axis; a month-only change sits on the 1st and says so in its label. */
const dayOf = (d: string) => (/^\d{4}-\d{2}$/.test(d) ? `${d}-01` : d);

export function timelinePoints(): TimePoint[] {
  const points: TimePoint[] = [];
  for (const l of listsByCountry()) {
    points.push({ date: l.adopted, label: `${l.country}: list adopted`, shape: 'circle', state: 'filled', status: 'Adopted' });
    if (l.edpbOpinion.date) {
      points.push({
        date: l.edpbOpinion.date,
        label: `${l.country}: EDPB Opinion ${l.edpbOpinion.n}`,
        shape: 'square',
        state: 'outline',
        status: 'EDPB opinion on the draft',
      });
    }
    // A change dated after adoption (a list whose latest dated change is its adoption adds nothing).
    if (l.lastUpdate && /^\d{4}-\d{2}(-\d{2})?$/.test(l.lastUpdate) && dayOf(l.lastUpdate) > l.adopted) {
      const monthOnly = l.lastUpdate.length === 7;
      points.push({
        date: dayOf(l.lastUpdate),
        label: `${l.country}: last dated change${monthOnly ? `, ${l.lastUpdate} (no day given)` : ''}`,
        shape: 'triangle',
        state: 'filled',
        status: 'Later dated change',
      });
    }
  }
  return points;
}

export const aiActInForce = (): string => {
  const m = aiActMilestones.find((x) => x.id.endsWith('entry-into-force'));
  if (!m) throw new Error('dpia-visuals: no AI Act entry-into-force milestone in ai-act-timeline.ts');
  return m.date;
};

export function timelineChart(): Pair {
  const points = timelinePoints();
  const base = {
    title: 'The lists predate the AI Act',
    desc: 'Each national DPIA list as dots on a time axis: its adoption, the EDPB opinion on its draft and any later dated change, against the date the EU AI Act entered into force.',
    source: SOURCE,
    asOf: DPIA_AS_OF,
    mode: MODE,
    from: '2018-07-01',
    to: '2024-12-31',
    today: aiActInForce(),
    todayLabel: 'EU AI Act in force',
    points,
    r: 4,
    legend: [
      { label: 'List adopted', shape: 'circle' as const, state: 'filled' as const },
      { label: 'EDPB opinion on the draft', shape: 'square' as const, state: 'outline' as const },
      { label: 'Later dated change', shape: 'triangle' as const, state: 'filled' as const },
    ],
    tableCaption: 'Adoption, EDPB opinion and later dated changes of each national DPIA list',
  };
  return {
    wide: beeswarm({ ...base, id: 'dl-time-w', width: 640 }),
    narrow: beeswarm({ ...base, id: 'dl-time-n', width: 340, orientation: 'vertical', length: 420 }),
  };
}

const METHODS: readonly DpiaMethod[] = ['enumerated', 'scored', 'mixed'];
const METHOD_STATE = { enumerated: 'filled', scored: 'hatched', mixed: 'outline' } as const;

export function sizesChart(): Pair {
  const items = listsByCountry()
    .map((l, i) => ({ l, i }))
    .sort((a, b) => b.l.itemCount - a.l.itemCount || a.i - b.i)
    .map(({ l }) => ({ label: l.country, href: itemsLink(l), values: METHODS.map((m) => (l.method === m ? l.itemCount : 0)) }));
  const base = {
    title: 'List size and method',
    desc: `Items or criteria in each of the ${lists.length} national DPIA lists, largest first, drawn by how the list decides: enumerated, scored or mixed.`,
    source: SOURCE,
    asOf: DPIA_AS_OF,
    mode: MODE,
    series: METHODS.map((m) => ({ label: methodLabel[m], state: METHOD_STATE[m] })),
    items,
    unit: 'items or criteria',
    itemHeader: 'Country',
    tableCaption: 'Items or criteria in each national DPIA list, by method',
  };
  return {
    wide: stackedBars({ ...base, id: 'dl-size-w', width: 640 }),
    narrow: stackedBars({ ...base, id: 'dl-size-n', width: 340 }),
  };
}
