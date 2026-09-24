// /api/v1/openapi.json: an OpenAPI 3.1 description of the static GETs under
// /api/v1/. Every response schema is a $ref to the published JSON Schema, so the
// description and the schemas cannot drift apart.
import type { APIRoute } from 'astro';
import { openApiDocument, jsonResponse } from '../../../lib/api';

export const GET: APIRoute = () => jsonResponse(openApiDocument());
