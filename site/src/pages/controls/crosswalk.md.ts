// /controls/crosswalk.md: the Markdown alternate of the controls crosswalk,
// one table per framework and the reverse view per profile
// (lib/controls-crosswalk.ts crosswalkMarkdown), under the header of
// lib/llms.ts. Seo.astro links it from the page (lib/llms.ts
// markdownAlternateFor). Illustrative, not a claim of conformity.
import type { APIRoute } from 'astro';
import { controlsUpdated } from '../../data/controls';
import {
  crosswalkMarkdown,
  CONTROLS_CROSSWALK_PATH,
  CROSSWALK_DESCRIPTION,
  CROSSWALK_TITLE,
} from '../../lib/controls-crosswalk';
import { markdownDocument, markdownResponse } from '../../lib/llms';

export const GET: APIRoute = () =>
  markdownResponse(
    markdownDocument(
      { title: CROSSWALK_TITLE, description: CROSSWALK_DESCRIPTION, path: CONTROLS_CROSSWALK_PATH, updated: controlsUpdated() },
      crosswalkMarkdown(),
    ),
  );
