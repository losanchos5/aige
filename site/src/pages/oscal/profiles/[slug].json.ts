// /oscal/profiles/<slug>.json: one OSCAL 1.2.3 profile per control profile,
// importing /oscal/catalog.json and selecting its controls by id
// (src/lib/oscal.ts). A new profile in src/data/controls gets its file here
// with no code change. Validated at build by scripts/oscal-check.mjs.
import type { APIRoute, GetStaticPaths } from 'astro';
import { profiles } from '../../../data/controls';
import { jsonResponse } from '../../../lib/api';
import { oscalProfile } from '../../../lib/oscal';

export const getStaticPaths = (() => profiles.map((p) => ({ params: { slug: p.slug } }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) => jsonResponse(oscalProfile(params.slug as string));
