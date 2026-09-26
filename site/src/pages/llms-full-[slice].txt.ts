// /llms-full-<slice>.txt: the corpus of /llms-full.txt cut into files a common
// context window can hold (the parts of the book, the regulatory map with the
// crosswalk and comparisons, the obligation register, the patterns, the
// glossary, the cases), each with the same header and the same
// per-document format. /llms.txt lists them with an approximate token size.
// The slices are defined in lib/llms-corpus.ts.
import type { APIRoute, GetStaticPaths } from 'astro';
import { llmsFullText, llmsSlices, type SliceId } from '../lib/llms-corpus';
import { textResponse } from '../lib/llms';

export const getStaticPaths: GetStaticPaths = () =>
  llmsSlices.map((slice) => ({ params: { slice: slice.id } }));

export const GET: APIRoute = async ({ params }) =>
  textResponse(await llmsFullText(params.slice as SliceId));
