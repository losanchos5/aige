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

// https://astro.build/config
export default defineConfig({
  site: 'https://aigovernanceengineer.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
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
