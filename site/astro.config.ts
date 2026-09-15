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
