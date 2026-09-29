// /obligation-lookup-core.js: src/lib/obligation-lookup-core.js served verbatim,
// so the browser (/obligation-lookup.js) runs the exact matching code the build
// used to write /obligations/lookup.json. A file under public/ would be a second
// copy that could drift.
import type { APIRoute } from 'astro';
import source from '../lib/obligation-lookup-core.js?raw';

export const GET: APIRoute = () =>
  new Response(source, {
    headers: { 'Content-Type': 'text/javascript; charset=utf-8' },
  });
