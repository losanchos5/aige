// /og/toolkit/<id>.png: one Open Graph card per live toolkit tool, rendered at
// build time with the site's card template (src/lib/og.ts) from the tool's
// registry title, which is also its page title. Block w2-tool-planner.
import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOg } from '../../../lib/og';
import { tools } from '../../../data/toolkit';

export const getStaticPaths: GetStaticPaths = () =>
  tools
    .filter((tool) => tool.status === 'live')
    .map((tool) => ({ params: { id: tool.id }, props: { title: tool.title } }));

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOg({ title: (props as { title: string }).title });
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400' },
  });
};
