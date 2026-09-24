// obligation-title.ts: the short title of an obligation page, shared by the page
// (src/pages/obligations/[id].astro) and its Open Graph card
// (src/pages/og/obligations/[id].png.ts), so the card renders exactly the page
// title and the page's og:image:alt (the title) describes the card.
import type { Obligation } from '../data/frameworks';
import { frameworkOf } from './obligations';

/** <title> budget: the suffix " · AI Governance Engineer" takes 25 of ~70
 *  characters, so a long obligation name falls back to "<instrument> <clause>". */
export function obligationShortTitle(row: Obligation): string {
  return row.obligation.length <= 45
    ? row.obligation
    : `${frameworkOf(row).short} ${row.clause}`.slice(0, 45);
}

/** Path of the obligation's Open Graph card. */
export function obligationOgPath(row: Pick<Obligation, 'id'>): string {
  return `/og/obligations/${row.id.toLowerCase()}.png`;
}
