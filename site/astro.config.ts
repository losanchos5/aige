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

// Sitemap URL -> the source file(s) whose last commit dates the page: the page
// itself plus, for a data-driven page, the module or Markdown it renders. The
// newest of those commit dates wins, so editing either the template or its data
// moves the page's `lastmod`. Never the build date — a rebuild must not claim
// every page changed. Paths are relative to `site/` (the build cwd).
const SOURCE_BY_PATH = new Map<string, readonly string[]>([
  ['/', ['src/pages/index.astro', 'src/data/values.ts', 'src/data/role.ts', 'src/data/chapters.ts']],
  ['/about', ['src/pages/about/index.astro', 'src/data/site.ts']],
  ['/about/changelog', ['src/pages/about/changelog.astro', '../bok/CHANGELOG.md']],
  ['/about/contributors', ['src/pages/about/contributors.astro', '../bok/CONTRIBUTORS.md']],
  ['/bok', ['src/pages/bok/index.astro', 'src/data/chapters.ts']],
  ['/map', ['src/pages/map.astro', 'src/data/map.ts']],
  ['/path', ['src/pages/path.astro', 'src/data/path.ts']],
  ['/resources', ['src/pages/resources/index.astro']],
  ['/resources/crosswalk', ['src/pages/resources/crosswalk.astro', 'src/data/crosswalk.ts']],
  ['/resources/frameworks', ['src/pages/resources/frameworks.astro', 'src/data/frameworks.ts']],
  // The glossary and the reading list are parsed from their BoK chapters
  // (src/lib/glossary.ts, src/lib/reading-list.ts).
  ['/resources/glossary', ['src/pages/resources/glossary.astro', '../bok/09-glossary.md']],
  ['/resources/reading-list', ['src/pages/resources/reading-list.astro', '../bok/10-reading-list.md']],
  ['/resources/tools', ['src/pages/resources/tools.astro', 'src/data/stack.ts']],
  ['/role', ['src/pages/role.astro', 'src/data/role.ts', 'src/data/maturity.ts']],
  ['/stack', ['src/pages/stack.astro', 'src/data/stack.ts']],
  ['/thesis', ['../THESIS.md']],
  ['/es/thesis', ['../THESIS.es.md']],
  ...chaptersOrdered.map(
    (chapter) => [`/bok/${chapter.slug}`, [`../bok/${chapter.id}.md`]] as [string, string[]],
  ),
]);

// gitDate shells out to `git log` per file, and several pages share a source
// (chapters.ts, role.ts, stack.ts), so each path is asked for once per build.
const dateCache = new Map<string, string>();
function dateOf(file: string): string {
  const cached = dateCache.get(file);
  if (cached !== undefined) return cached;
  const date = gitDate(file);
  dateCache.set(file, date);
  return date;
}

/** Newest `gitDate` across the sources that build one page (YYYY-MM-DD). */
function lastmodOf(sources: readonly string[]): string {
  // ISO dates sort lexicographically, so `max` is a plain string comparison.
  return sources.map(dateOf).reduce((newest, date) => (date > newest ? date : newest));
}

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
      // Every indexable route is dated by the last commit that touched what it
      // is built from (lib/reading.ts gitDate), so an edit moves the page's
      // lastmod without a manual step. A path missing from the map gets no
      // lastmod rather than a made-up one.
      serialize: (item) => {
        const sources = SOURCE_BY_PATH.get(pathnameOf(item.url));
        return sources ? { ...item, lastmod: lastmodOf(sources) } : item;
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
