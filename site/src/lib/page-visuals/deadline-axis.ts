// deadline-axis.ts: the AI Act milestones (src/data/ai-act-timeline.ts) as the
// items of the milestone axis (src/lib/page-charts/milestone-axis.ts) on
// /resources/ai-act-deadlines and its Spanish twin. Date, status and basis are
// the milestone's own; "applied" is its `status` on AI_ACT_TIMELINE_AS_OF,
// which the dataset's maintenance gate keeps true. The drawn labels are
// shorter forms of the titles (the axis throws on a label that finds no
// room); the full titles stay in the tooltips and the table. A milestone
// missing here falls back to its title.
import type { AxisMilestone } from '../page-charts/milestone-axis';
import { aiActMilestones } from '../../data/ai-act-timeline';
import { milestoneAnchor, type DeadlinesLang } from '../ai-act-deadlines';

export const AXIS_LABELS: Readonly<Record<string, { en: string; es: string }>> = {
  '2024-08-01-entry-into-force': { en: 'Entry into force', es: 'Entrada en vigor' },
  '2025-02-02-prohibitions-literacy': { en: 'Prohibitions, AI literacy', es: 'Prohibiciones, alfabetización' },
  '2025-08-02-gpai-governance': { en: 'GPAI models, governance', es: 'Modelos de uso general' },
  '2026-07-27-omnibus-in-force': { en: 'Omnibus in force', es: 'Omnibus en vigor' },
  '2026-08-02-general-application': { en: 'General application', es: 'Aplicación general' },
  '2026-12-02-new-prohibitions-marking': { en: 'New prohibitions', es: 'Nuevas prohibiciones' },
  '2027-08-02-legacy-gpai-sandboxes': { en: 'Earlier GPAI, sandboxes', es: 'Modelos previos, espacios de pruebas' },
  '2027-09-02-pmm-template': { en: 'Monitoring template', es: 'Plantilla de vigilancia' },
  '2027-12-02-high-risk-annex-iii': { en: 'High-risk, Annex III', es: 'Alto riesgo, anexo III' },
  '2028-01-28-notified-bodies-annex-i': { en: 'Notified bodies', es: 'Organismos notificados' },
  '2028-08-02-high-risk-annex-i': { en: 'High-risk, Annex I', es: 'Alto riesgo, anexo I' },
  '2030-08-02-public-authority-legacy': { en: 'Earlier public-sector systems', es: 'Sistemas públicos previos' },
  '2030-12-31-annex-x': { en: 'Annex X IT systems', es: 'Sistemas del anexo X' },
};

/** Every milestone, in the page's language, linked to its entry below. */
export function deadlineAxisItems(lang: DeadlinesLang): AxisMilestone[] {
  return aiActMilestones.map((m) => ({
    date: m.date,
    label: AXIS_LABELS[m.id]?.[lang] ?? m.title[lang],
    name: m.title[lang],
    href: `#${milestoneAnchor(m)}`,
    applied: m.status === 'applied',
    basis: m.basis === 'omnibus' ? 'b' : 'a',
  }));
}
