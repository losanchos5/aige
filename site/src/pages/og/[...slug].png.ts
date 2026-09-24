// Static OG image endpoint. One 1200x630 PNG per route, plus one per Body of
// Knowledge chapter (`bok-<slug>`). Built at `astro build` time; served at
// /og/<slug>.png. The image content lives in src/lib/og.ts.
import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOg } from '../../lib/og';
import { chaptersOrdered } from '../../data/chapters';

// Top-level routes -> card title.
const ROUTES: Record<string, string> = {
  default: 'AI Governance Engineering',
  thesis: 'The Thesis',
  bok: 'Body of Knowledge',
  role: 'The AI Governance Engineer',
  stack: 'The five-layer stack',
  path: 'The AIGE learning path',
  resources: 'Resources & reading list',
  map: 'The map of the discipline',
  about: 'About this site',
  toolkit: 'Toolkit: governance tools in your browser',
  obligations: 'The obligation register',
  figures: 'Figures of the Body of Knowledge',
  data: 'Open data and API',
  for: 'Routes by audience',
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = Object.entries(ROUTES).map(([slug, title]) => ({
    params: { slug },
    props: { title },
  }));
  for (const chapter of chaptersOrdered) {
    paths.push({ params: { slug: `bok-${chapter.slug}` }, props: { title: chapter.title } });
  }
  return paths;
};

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOg({ title: (props as { title: string }).title });
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
