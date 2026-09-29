// /obligations/lookup.json: the index behind the "Look up an article" box on
// /obligations and /resources/crosswalk (src/components/ObligationLookup.astro).
// Built from the register and the crosswalk by src/lib/obligation-lookup.ts;
// compact on purpose (short keys, no whitespace) because the box fetches it on
// first focus. Not an open-data export: the stable datasets stay under
// /resources and /api/v1.
import type { APIRoute } from 'astro';
import { lookupIndex } from '../../lib/obligation-lookup';

export const GET: APIRoute = () =>
  new Response(JSON.stringify(lookupIndex()), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
