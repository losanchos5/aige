// /resources/ai-act-deadlines.json: the AI Act deadlines dataset, every
// milestone and Spanish entry in English and Spanish (src/lib/ai-act-deadlines.ts).
import type { APIRoute } from 'astro';
import { jsonResponse } from '../../lib/api';
import { deadlinesRecord } from '../../lib/ai-act-deadlines';

export const GET: APIRoute = () => jsonResponse(deadlinesRecord());
