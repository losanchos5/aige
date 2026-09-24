// /og/patterns/<slug>.png: one Open Graph card per pattern page, rendered at
// build time with the site's card template (src/lib/og.ts) from the pattern's
// title in patterns.ts, which is also its page title ("Pattern: <title>").
import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOg } from '../../../lib/og';
import { patterns } from '../../../data/patterns';

export const getStaticPaths: GetStaticPaths = () =>
  patterns.map((pattern) => ({
    params: { id: pattern.slug },
    props: { title: `Pattern: ${pattern.title}` },
  }));

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOg({ title: (props as { title: string }).title });
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400' },
  });
};
