// /toolkit/obligations-plan.v1.schema.json: the JSON Schema of the plan the
// obligations and deadlines planner exports. Built from the open-data API
// registry (src/lib/obligations-plan-schema.ts), so the envelope and the
// obligation records match /api/v1/obligations.json field for field.
import type { APIRoute } from 'astro';
import { jsonResponse } from '../../lib/api';
import { planSchema } from '../../lib/obligations-plan-schema';

export const GET: APIRoute = () => jsonResponse(planSchema());
