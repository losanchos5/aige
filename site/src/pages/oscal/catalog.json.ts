// /oscal/catalog.json: the open control profiles as one OSCAL 1.2.3 catalog,
// one group per profile (src/lib/oscal.ts). Outside /api/v1: an OSCAL document
// cannot carry the API envelope. Validated at build by scripts/oscal-check.mjs.
import type { APIRoute } from 'astro';
import { jsonResponse } from '../../lib/api';
import { oscalCatalog } from '../../lib/oscal';

export const GET: APIRoute = () => jsonResponse(oscalCatalog());
