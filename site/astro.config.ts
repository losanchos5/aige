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
import { cases } from './src/data/cases';
import { obligations, obligationPath } from './src/data/frameworks';
import { patterns } from './src/data/patterns';
import { figures } from './src/data/figures';
import { getGlossary } from './src/lib/glossary';
import { gitDate } from './src/lib/reading';

// Sitemap URL -> the source file(s) whose last commit dates the page: the page
// itself plus, for a data-driven page, the module or Markdown it renders. The
// newest of those commit dates wins, so editing either the template or its data
// moves the page's `lastmod`. Never the build date: a rebuild must not claim
// every page changed. Paths are relative to `site/` (the build cwd).
const SOURCE_BY_PATH = new Map<string, readonly string[]>([
  ['/', ['src/pages/index.astro', 'src/data/values.ts', 'src/data/role.ts', 'src/data/chapters.ts']],
  ['/about', ['src/pages/about/index.astro', 'src/data/site.ts']],
  ['/about/changelog', ['src/pages/about/changelog.astro', '../bok/CHANGELOG.md']],
  ['/about/contributors', ['src/pages/about/contributors.astro', '../bok/CONTRIBUTORS.md']],
  // Block b-nav-shell (navigation and site shell): the methodology page states
  // the versions and DOIs from site.ts.
  ['/about/methodology', ['src/pages/about/methodology.astro', 'src/data/site.ts']],
  // Block b-c23-agents: the /agents hub routes into chapter 23 and reads the
  // runtime tool categories from the stack data.
  ['/agents', ['src/pages/agents.astro', '../bok/23-governing-agents.md', 'src/data/stack.ts']],
  ['/bok', ['src/pages/bok/index.astro', 'src/data/chapters.ts']],
  ['/cases', ['src/pages/cases/index.astro', 'src/data/cases.ts']],
  ['/map', ['src/pages/map.astro', 'src/data/map.ts']],
  ['/path', ['src/pages/path.astro', 'src/data/path.ts']],
  ['/resources', ['src/pages/resources/index.astro']],
  ['/resources/contracts', ['src/pages/resources/contracts.astro', 'src/data/contracts.ts']],
  ['/resources/crosswalk', ['src/pages/resources/crosswalk.astro', 'src/data/crosswalk.ts']],
  ['/resources/frameworks', ['src/pages/resources/frameworks.astro', 'src/data/frameworks.ts']],
  ['/resources/harms', ['src/pages/resources/harms.astro', 'src/data/harms.ts', 'src/data/cases.ts']],
  // The glossary and the reading list are parsed from their BoK chapters
  // (src/lib/glossary.ts, src/lib/reading-list.ts).
  ['/resources/glossary', ['src/pages/resources/glossary.astro', '../bok/09-glossary.md']],
  ['/resources/reading-list', ['src/pages/resources/reading-list.astro', '../bok/10-reading-list.md']],
  // The templates page reads the schema files themselves (src/lib/schemas-library.ts).
  [
    '/resources/templates',
    [
      'src/pages/resources/templates.astro',
      'src/data/templates.ts',
      'public/schemas',
      'public/templates',
    ],
  ],
  ['/resources/tools', ['src/pages/resources/tools.astro', 'src/data/stack.ts']],
  ['/role', ['src/pages/role.astro', 'src/data/role.ts', 'src/data/maturity.ts']],
  ['/stack', ['src/pages/stack.astro', 'src/data/stack.ts']],
  // Block b-toolkit-foundation: the /toolkit index (registry) and its first tool,
  // whose criteria come from maturity.ts and whose client code lives in public/toolkit.
  ['/toolkit', ['src/pages/toolkit/index.astro', 'src/data/toolkit.ts']],
  [
    '/toolkit/maturity-self-check',
    [
      'src/pages/toolkit/maturity-self-check.astro',
      'src/components/toolkit/ToolShell.astro',
      'src/data/toolkit.ts',
      'src/data/maturity.ts',
      'public/toolkit/maturity-self-check.js',
      'public/toolkit/lib.js',
    ],
  ],
  ['/thesis', ['../THESIS.md']],
  ['/es/thesis', ['../THESIS.es.md']],
  ...chaptersOrdered.map(
    (chapter) => [`/bok/${chapter.slug}`, [`../bok/${chapter.id}.md`]] as [string, string[]],
  ),
  // Block b-ref-ids-api: the obligation register and the open-data
  // documentation page. The per-obligation pages are dated by REVIEWED_BY_PATH
  // below, not here.
  [
    '/obligations',
    ['src/pages/obligations/index.astro', 'src/data/frameworks.ts', 'src/lib/obligations.ts'],
  ],
  ['/resources/data', ['src/pages/resources/data.astro', 'src/lib/api.ts']],
  // Block b-glossary (v0.5.0): one canonical page per glossary term, all rendered
  // from the same template and the glossary chapter (src/lib/glossary.ts).
  ...getGlossary().map(
    (entry) =>
      [entry.url, ['src/pages/glossary/[slug].astro', '../bok/09-glossary.md']] as [
        string,
        string[],
      ],
  ),

  // One page per incident case, all rendered from the same template and dataset.
  ...cases.map(
    (entry) =>
      [`/cases/${entry.id}`, ['src/pages/cases/[id].astro', 'src/data/cases.ts']] as [
        string,
        string[],
      ],
  ),
  // Block b-patterns-split: the pattern index and one page per pattern. The
  // index is dated by its template, the pattern manifest and the pattern files;
  // each pattern page by its own Markdown file and the template that renders it.
  ['/patterns', ['src/pages/patterns/index.astro', 'src/data/patterns.ts', '../bok/patterns']],
  ...patterns.map(
    (pattern) =>
      [
        `/patterns/${pattern.slug}`,
        ['src/pages/patterns/[id].astro', `../bok/patterns/${pattern.slug}.md`],
      ] as [string, string[]],
  ),
  // Block b-figures-system: the figures gallery and one permalink per figure,
  // each dated by its template, the figure manifest and the figure's own art.
  ['/figures', ['src/pages/figures/index.astro', 'src/data/figures.ts', 'src/data/diagrams.ts']],
  ...figures.map(
    (figure) =>
      [
        `/figures/${figure.id}`,
        ['src/pages/figures/[id].astro', 'src/data/figures.ts', `src/figures/${figure.id}.svg`],
      ] as [string, string[]],
  ),
]);

// Pages dated by their content rather than by git: each /obligations/<id> page
// carries the date its register row was last checked against its sources (the
// row's `reviewed` field), which is the date a reader cares about. These win
// over SOURCE_BY_PATH; every other page keeps its git date.
const REVIEWED_BY_PATH = new Map<string, string>(
  obligations.map((row) => [obligationPath(row), row.reviewed] as [string, string]),
);

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
// Parallel builds from several git worktrees can share one node_modules
// (a junction); ASTRO_CACHE_DIR gives each its own content-layer data store and
// Vite cache so they never overwrite each other. Unset, Astro's defaults apply.
const cacheDir = process.env.ASTRO_CACHE_DIR;

export default defineConfig({
  site: 'https://aigovernanceengineer.com',
  ...(cacheDir ? { cacheDir } : {}),
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
        const pathname = pathnameOf(item.url);
        const reviewed = REVIEWED_BY_PATH.get(pathname);
        if (reviewed) return { ...item, lastmod: reviewed };
        const sources = SOURCE_BY_PATH.get(pathname);
        return sources ? { ...item, lastmod: lastmodOf(sources) } : item;
      },
    }),
  ],
  vite: {
    ...(cacheDir ? { cacheDir: `${cacheDir}/vite` } : {}),
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
