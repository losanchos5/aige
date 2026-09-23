import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import remarkLead from './src/lib/remark-lead';
import remarkCallouts from './src/lib/remark-callouts';
import rehypeCitations from './src/lib/rehype-citations';
import rehypeTables from './src/lib/rehype-tables';
import rehypeDiagrams from './src/lib/rehype-diagrams';
import rehypeGlossary from './src/lib/rehype-glossary';
import { chaptersOrdered } from './src/data/chapters';
import { gitDate } from './src/lib/reading';

// Sitemap URL -> the Markdown source whose last commit dates the page. Only the
// routes built from one file are listed; everything else gets no `lastmod`
// rather than a made-up one.
const SOURCE_BY_PATH = new Map<string, string>([
  ['/thesis', '../THESIS.md'],
  ['/es/thesis', '../THESIS.es.md'],
  ...chaptersOrdered.map(
    (chapter) => [`/bok/${chapter.slug}`, `../bok/${chapter.id}.md`] as [string, string],
  ),
]);

/** Clean pathname of a sitemap URL: no `.html` suffix, no trailing slash. */
function pathnameOf(url: string): string {
  const path = new URL(url).pathname.replace(/\.html$/, '');
  return path.length > 1 ? path.replace(/\/$/, '') : path;
}

// https://astro.build/config
export default defineConfig({
  site: 'https://aigovernanceengineer.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      // /og/* are the generated Open Graph cards, /diagrams/* the static SVG
      // assets and /404 the error page: none of them is a destination.
      filter: (page) => {
        const pathname = pathnameOf(page);
        return !/^\/(og|diagrams)\//.test(pathname) && pathname !== '/404';
      },
      // Chapters and the two Thesis pages are dated by the last commit that
      // touched their source (lib/reading.ts gitDate), so an edit moves the
      // page's lastmod without a manual step.
      serialize: (item) => {
        const source = SOURCE_BY_PATH.get(pathnameOf(item.url));
        return source ? { ...item, lastmod: gitDate(source) } : item;
      },
    }),
  ],
  vite: {
    build: {
      rollupOptions: {
        output: {
          // The client entry that bundles src/scripts/motion-ui.ts (imported by
          // Base.astro) ships as /_astro/motion-ui.[hash].js instead of the
          // virtual `Base.astro_astro_type_script_…` id, so the Motion weight
          // budget has a stable file to measure. Only the client build reads
          // this: Astro's SSR build sets its own entryFileNames after it.
          entryFileNames: (chunk) =>
            chunk.moduleIds.some((id) => id.endsWith('/src/scripts/motion-ui.ts'))
              ? '_astro/motion-ui.[hash].js'
              : '_astro/[name].[hash].js',
        },
      },
    },
  },
  markdown: {
    remarkPlugins: [remarkLead, remarkCallouts],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      rehypeCitations,
      rehypeTables,
      rehypeGlossary,
      [rehypeExternalLinks, { rel: ['noopener'] }],
      // Last: the injected diagram figures are self-contained SVG; running after
      // glossary/external-links keeps those plugins from walking into the SVG
      // (e.g. wrapping a term like "MCP" in a link inside a role="button" node,
      // which would be an axe nested-interactive violation).
      rehypeDiagrams,
    ],
  },
});
