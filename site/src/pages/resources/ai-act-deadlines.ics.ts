// /resources/ai-act-deadlines.ics: the upcoming AI Act milestones as all-day
// calendar events, in English.
import type { APIRoute } from 'astro';
import { deadlinesIcs } from '../../lib/ai-act-deadlines';
import { icsResponse } from '../../lib/ics';

export const GET: APIRoute = () => icsResponse(deadlinesIcs('en'));
