// /llms-full.txt: the whole corpus in one plain-text file, as llmstxt.org
// suggests alongside the /llms.txt index: the same header, then every Body of
// Knowledge chapter in reading order (chapter 05, the pattern catalogue, is
// followed by every pattern page, bok/patterns/<slug>.md, in catalogue order),
// the Thesis, the obligation register, the frameworks, the crosswalk, the
// incident cases and the harms atlas, each opened by its title and canonical
// URL. The chapters, patterns and Thesis are their Markdown sources; the rest
// is written out from the datasets (lib/llms-corpus.ts).
//
// The file is large (well over most context windows), so the same corpus is
// also published in slices, /llms-full-<slice>.txt, listed in /llms.txt. This
// URL stays for the readers that already fetch it.
import type { APIRoute } from 'astro';
import { llmsFullText } from '../lib/llms-corpus';
import { textResponse } from '../lib/llms';

export const GET: APIRoute = async () => textResponse(await llmsFullText('full'));
