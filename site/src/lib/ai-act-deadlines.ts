// ai-act-deadlines.ts: what the AI Act deadlines pages and exports derive from
// the bilingual timeline (src/data/ai-act-timeline.ts): paths per language,
// the register rows a milestone links, the calendar per language and the JSON
// record.
import { site } from '../data/site';
import {
  AI_ACT_TIMELINE_AS_OF,
  AI_ACT_TIMELINE_REVIEW_BY,
  aiActMilestones,
  spain,
  timelineSources,
  updates,
  type TimelineMilestone,
} from '../data/ai-act-timeline';
import { obligationPath, obligations } from '../data/frameworks';
import { renderIcs } from './ics';

export type DeadlinesLang = 'en' | 'es';

export const DEADLINES_PATH: Readonly<Record<DeadlinesLang, string>> = {
  en: '/resources/ai-act-deadlines',
  es: '/es/resources/ai-act-deadlines',
};

export const DEADLINES_ICS_PATH: Readonly<Record<DeadlinesLang, string>> = {
  en: '/resources/ai-act-deadlines.ics',
  es: '/es/resources/ai-act-deadlines.ics',
};

export const DEADLINES_JSON_PATH = '/resources/ai-act-deadlines.json';

/** The page anchor of a milestone. */
export const milestoneAnchor = (m: Pick<TimelineMilestone, 'id'>): string => `m-${m.id}`;

const byId = new Map(obligations.map((row) => [row.id, row]));

export interface MilestoneObligation {
  id: string;
  /** The row's clause, e.g. `Art. 26`. */
  label: string;
  href: string;
  name: string;
}

/** The register rows a milestone links to. */
export function milestoneObligations(m: TimelineMilestone): MilestoneObligation[] {
  return (m.obligationIds ?? []).map((id) => {
    const row = byId.get(id);
    if (!row) throw new Error(`ai-act-deadlines: unknown obligation ${id} in ${m.id}`);
    return { id: row.id, label: row.clause, href: obligationPath(row), name: row.obligation };
  });
}

const HOST = new URL(site.url).hostname;

/** The upcoming milestones as an iCalendar in `lang`. */
export function deadlinesIcs(lang: DeadlinesLang): string {
  const page = `${site.url}${DEADLINES_PATH[lang]}`;
  return renderIcs({
    prodId: `-//${HOST}//AI Act deadlines//${lang.toUpperCase()}`,
    name: lang === 'es' ? 'Plazos del Reglamento de IA (UE)' : 'EU AI Act deadlines',
    stamp: AI_ACT_TIMELINE_AS_OF,
    events: aiActMilestones
      .filter((m) => m.status === 'upcoming')
      .map((m) => ({
        // The id without its date prefix: a milestone whose date moves keeps its UID,
        // so a subscribed calendar moves the event instead of keeping a stale copy.
        uid: `${m.id.slice(m.date.length + 1)}.${lang}@${HOST}`,
        date: m.date,
        summary: `${lang === 'es' ? 'Reglamento de IA' : 'AI Act'}: ${m.title[lang]}`,
        description: `${m.applies[lang]} (${m.articles.join('; ')})`,
        url: `${page}#${milestoneAnchor(m)}`,
      })),
  });
}

/** The JSON export: every milestone and Spanish entry, in both languages. */
export function deadlinesRecord() {
  return {
    notice:
      'Indicative summary of the EU AI Act application dates after the Digital Omnibus (Regulation (EU) 2026/1744). Not legal advice. The Spanish AI bill is a bill in parliament, not law.',
    asOf: AI_ACT_TIMELINE_AS_OF,
    reviewBy: AI_ACT_TIMELINE_REVIEW_BY,
    version: site.bokVersion,
    license: site.license,
    licenseUrl: site.licenseUrl,
    self: `${site.url}${DEADLINES_JSON_PATH}`,
    pages: { en: `${site.url}${DEADLINES_PATH.en}`, es: `${site.url}${DEADLINES_PATH.es}` },
    calendars: { en: `${site.url}${DEADLINES_ICS_PATH.en}`, es: `${site.url}${DEADLINES_ICS_PATH.es}` },
    milestones: aiActMilestones.map((m) => ({
      ...m,
      url: `${site.url}${DEADLINES_PATH.en}#${milestoneAnchor(m)}`,
      obligations: milestoneObligations(m).map((o) => ({ id: o.id, clause: o.label, url: `${site.url}${o.href}` })),
    })),
    spain,
    updates,
    sources: timelineSources.map((s, i) => ({ n: i + 1, ...s })),
  };
}
