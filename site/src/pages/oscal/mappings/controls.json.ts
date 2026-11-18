// /oscal/mappings/controls.json: the controls crosswalk as an OSCAL 1.2.3
// mapping collection, one mapping per framework, relationship "intersects-with"
// (src/lib/oscal.ts). Illustrative, not a claim of conformity. Validated at
// build by scripts/oscal-check.mjs.
import type { APIRoute } from 'astro';
import { jsonResponse } from '../../../lib/api';
import { oscalControlMappings } from '../../../lib/oscal';

export const GET: APIRoute = () => jsonResponse(oscalControlMappings());
