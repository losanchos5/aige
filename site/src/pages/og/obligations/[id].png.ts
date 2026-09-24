// /og/obligations/<id>.png: one Open Graph card per obligation-register row,
// rendered at build time with the site's card template (src/lib/og.ts). The card
// prints the page title (src/lib/obligation-title.ts), so the page's
// og:image:alt, which is the title, describes it. Block w2-tool-planner.
import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOg } from '../../../lib/og';
import { obligations, obligationSlug, type Obligation } from '../../../data/frameworks';
import { obligationShortTitle } from '../../../lib/obligation-title';

export const getStaticPaths: GetStaticPaths = () =>
  obligations.map((row) => ({ params: { id: obligationSlug(row) }, props: { row } }));

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOg({ title: obligationShortTitle((props as { row: Obligation }).row) });
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400' },
  });
};
