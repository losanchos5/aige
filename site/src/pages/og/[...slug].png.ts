// Static OG image endpoint. One 1200x630 PNG per route, plus one per Body of
// Knowledge chapter (`bok-<slug>`). Built at `astro build` time; served at
// /og/<slug>.png. The image content lives in src/lib/og.ts.
import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOg } from '../../lib/og';
import { ogCards } from '../../lib/og-cards';

// One card per top-level route plus one per chapter, titled from lib/og-cards.ts
// (Seo.astro reads the same titles for og:image:alt).
export const getStaticPaths: GetStaticPaths = () =>
  ogCards().map(({ slug, title }) => ({ params: { slug }, props: { title } }));

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOg({ title: (props as { title: string }).title });
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
