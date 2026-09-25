// /api/v1/index.json: the catalogue of the static open-data API. It lists every
// dataset with its schema version, endpoint, JSON Schema and human page, plus
// the OpenAPI description and the per-obligation URL template. Built from the
// registry in src/lib/api.ts, so a dataset added there appears here too.
import type { APIRoute } from 'astro';
import { indexPayload, jsonResponse } from '../../../lib/api';

export const GET: APIRoute = () => jsonResponse(indexPayload());
