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
import rehypeI18n from './src/lib/rehype-i18n';
import { chaptersOrdered } from './src/data/chapters';
import { cases } from './src/data/cases';
import { obligations, obligationPath } from './src/data/frameworks';
import { patterns } from './src/data/patterns';
import { figures } from './src/data/figures';
import { getGlossary } from './src/lib/glossary';
import { gitDate } from './src/lib/reading';
import { inSitemap } from './src/lib/sitemap-policy';
import { alternatesFor, translationFilePath, translationIndex } from './src/lib/i18n-content';
import { DEFAULT_LOCALE, LOCALES } from './src/i18n/locales';

// Sitemap URL -> the source file(s) whose last commit dates the page: the page
// itself plus, for a data-driven page, the module or Markdown it renders. The
// newest of those commit dates wins, so editing either the template or its data
// moves the page's `lastmod`. Never the build date: a rebuild must not claim
// every page changed. Paths are relative to `site/` (the build cwd).
const SOURCE_BY_PATH = new Map<string, readonly string[]>([
  // The home counts the registers it links to and shows the "What applies now"
  // band (WhatAppliesNow.astro, lib/applies-now.ts), which reads the register.
  [
    '/',
    [
      'src/pages/index.astro',
      'src/data/values.ts',
      'src/data/role.ts',
      'src/data/chapters.ts',
      'src/data/parts.ts',
      'src/data/stack.ts',
      'src/components/WhatAppliesNow.astro',
      'src/lib/applies-now.ts',
      'src/data/frameworks.ts',
    ],
  ],
  ['/about', ['src/pages/about/index.astro', 'src/data/site.ts']],
  ['/about/changelog', ['src/pages/about/changelog.astro', '../bok/CHANGELOG.md']],
  ['/about/contributors', ['src/pages/about/contributors.astro', '../bok/CONTRIBUTORS.md']],
  // Block b-nav-shell (navigation and site shell): the methodology page states
  // the versions and DOIs from site.ts.
  ['/about/methodology', ['src/pages/about/methodology.astro', 'src/data/site.ts']],
  // Block b-c23-agents: the /agents hub routes into chapter 23 and reads the
  // runtime tool categories from the stack data.
  [
    '/agents',
    [
      'src/pages/agents.astro',
      '../bok/23-governing-agents.md',
      'src/data/stack.ts',
      'src/figures/agent-control-plane.svg',
    ],
  ],
  ['/bok', ['src/pages/bok/index.astro', 'src/data/chapters.ts', 'src/data/parts.ts']],
  // Translations (openspec/changes/i18n-site-rendering): each translated page is
  // dated by its own translation file, never by the English one, and the
  // /<lang>/bok index by the translations it lists. A route exists only when its
  // file does (src/lib/i18n-content.ts), so nothing is listed without one.
  ...translationIndex().files.map(
    (file) => [file.path, [translationFilePath(file)]] as [string, string[]],
  ),
  ...[...translationIndex().bokLangs].map(
    (lang) =>
      [
        `/${lang}/bok`,
        [
          'src/pages/[lang]/bok/index.astro',
          ...translationIndex()
            .files.filter((file) => file.kind === 'chapter' && file.lang === lang)
            .map(translationFilePath),
        ],
      ] as [string, string[]],
  ),
  ...[...translationIndex().langs].map(
    (lang) =>
      [
        `/${lang}`,
        [
          'src/pages/[lang]/index.astro',
          ...translationIndex()
            .files.filter((file) => file.lang === lang)
            .map(translationFilePath),
        ],
      ] as [string, string[]],
  ),
  ['/cases', ['src/pages/cases/index.astro', 'src/data/cases.ts']],
  ['/map', ['src/pages/map.astro', 'src/data/map.ts']],
  ['/path', ['src/pages/path.astro', 'src/data/path.ts', 'src/data/audiences.ts']],
  // The Resources hub counts the registers it links to, so their data modules
  // date it too.
  [
    '/resources',
    [
      'src/pages/resources/index.astro',
      'src/data/frameworks.ts',
      'src/data/crosswalk.ts',
      'src/data/harms.ts',
      'src/data/cases.ts',
      'src/data/contracts.ts',
      'src/data/templates.ts',
      'src/data/figures.ts',
      'src/data/stack.ts',
      'src/data/toolkit.ts',
      'src/lib/api.ts',
      'public/schemas',
    ],
  ],
  ['/resources/contracts', ['src/pages/resources/contracts.astro', 'src/data/contracts.ts']],
  [
    '/resources/crosswalk',
    ['src/pages/resources/crosswalk.astro', 'src/data/crosswalk.ts', 'public/crosswalk-explorer.js'],
  ],
  [
    '/resources/frameworks',
    [
      'src/pages/resources/frameworks.astro',
      'src/data/frameworks.ts',
      'src/figures/instrument-lineage.svg',
    ],
  ],
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
  // Block w2-threats (v0.5.0): the threat bridge, dated by its template and the
  // dataset it renders.
  ['/resources/threats', ['src/pages/resources/threats.astro', 'src/data/threats.ts']],
  // Block w2-tool-planner: the obligations and deadlines planner, dated by its
  // template, its data (the register and the role mapping) and its client code.
  [
    '/toolkit/obligations-planner',
    [
      'src/pages/toolkit/obligations-planner.astro',
      'src/components/toolkit/ToolShell.astro',
      'src/data/toolkit.ts',
      'src/data/frameworks.ts',
      'src/data/obligations-planner.ts',
      'public/toolkit/obligations-planner.js',
      'public/toolkit/obligations-planner-core.js',
    ],
  ],
  // Block w2-tool-triage: the EU AI Act role and risk-class triage. Its question
  // graph (triage.ts) is built from chapter 18; the engine and the client module
  // live in public/toolkit.
  [
    '/toolkit/ai-act-triage',
    [
      'src/pages/toolkit/ai-act-triage.astro',
      'src/components/toolkit/ToolShell.astro',
      'src/data/toolkit.ts',
      'src/data/triage.ts',
      '../bok/18-eu-ai-act.md',
      'public/toolkit/ai-act-triage.js',
      'public/toolkit/ai-act-triage-engine.js',
      'public/toolkit/lib.js',
    ],
  ],
  // Block w2-tool-aigp: the AIGP coverage map (dated by its template, the map
  // data and the resolver and heatmap it renders through) and the neutral
  // certifications overview.
  [
    '/for/aigp',
    [
      'src/pages/for/aigp.astro',
      'src/data/aigp.ts',
      'src/lib/aigp-coverage.ts',
      'src/lib/aigp-heatmap.ts',
    ],
  ],
  ['/for/certifications', ['src/pages/for/certifications.astro', 'src/data/aigp.ts']],
  // Block w2-tool-policy-card: the Policy Card builder, dated by its page, its
  // rule templates, the toolkit registry and its client modules.
  [
    '/toolkit/policy-card',
    [
      'src/pages/toolkit/policy-card.astro',
      'src/components/toolkit/ToolShell.astro',
      'src/data/toolkit.ts',
      'src/data/policy-card.ts',
      'public/toolkit/policy-card.js',
      'public/toolkit/policy-card-core.js',
      'public/toolkit/lib.js',
    ],
  ],
  // Block w2-builders-a: the three document builders of /toolkit, each dated by
  // its page, the builders' data and form engine, its client code and the
  // published schema its record validates against.
  [
    '/toolkit/ai-register-entry',
    [
      'src/pages/toolkit/ai-register-entry.astro',
      'src/data/doc-builders.ts',
      'public/toolkit/ai-register-entry.js',
      'public/toolkit/ai-register-entry-core.js',
      'public/toolkit/schema-form.js',
      'public/toolkit/builders.js',
      'public/schemas/ai-system-register-entry.v1.json',
      'public/schemas/agent-register-entry.v1.json',
    ],
  ],
  [
    '/toolkit/impact-assessment',
    [
      'src/pages/toolkit/impact-assessment.astro',
      'src/data/doc-builders.ts',
      'public/toolkit/impact-assessment.js',
      'public/toolkit/impact-assessment-core.js',
      'public/toolkit/schema-form.js',
      'public/toolkit/builders.js',
      'public/schemas/impact-assessment.v1.json',
    ],
  ],
  [
    '/toolkit/model-card',
    [
      'src/pages/toolkit/model-card.astro',
      'src/data/doc-builders.ts',
      'public/toolkit/model-card.js',
      'public/toolkit/model-card-core.js',
      'public/toolkit/schema-form.js',
      'public/toolkit/builders.js',
      'public/schemas/model-card.v1.json',
    ],
  ],
  // Block w2-builders-b: four toolkit tools that turn a questionnaire into a
  // document. Each page is dated by its template, its data, its client module,
  // the shared form plumbing and the chapter or registry it restates.
  [
    '/toolkit/vendor-due-diligence',
    [
      'src/pages/toolkit/vendor-due-diligence.astro',
      'src/data/tool-vendor-dd.ts',
      'src/data/crosswalk.ts',
      'src/data/contracts.ts',
      'public/toolkit/vendor-due-diligence.js',
      'public/toolkit/form-kit.js',
    ],
  ],
  [
    '/toolkit/incident-clock',
    [
      'src/pages/toolkit/incident-clock.astro',
      'src/data/tool-incident-clock.ts',
      'public/toolkit/incident-clock.js',
      'public/toolkit/form-kit.js',
      '../bok/17-incidents.md',
    ],
  ],
  [
    '/toolkit/agent-control-profile',
    [
      'src/pages/toolkit/agent-control-profile.astro',
      'src/data/tool-agent-controls.ts',
      'public/toolkit/agent-control-profile.js',
      'public/toolkit/form-kit.js',
      '../bok/23-governing-agents.md',
    ],
  ],
  [
    '/toolkit/fairness-metric-chooser',
    [
      'src/pages/toolkit/fairness-metric-chooser.astro',
      'src/data/tool-fairness-chooser.ts',
      'public/toolkit/fairness-metric-chooser.js',
      'public/toolkit/form-kit.js',
      '../bok/16-fairness-explainability.md',
    ],
  ],
  // Block w2-hubs (audience hubs): the /for index and one hub per audience, all
  // rendered from src/data/audiences.ts through the resolver in
  // src/lib/audiences.ts. A hub also shows each obligation's status and date
  // from the register, so frameworks.ts dates it too. The slugs are listed here
  // so the block needs no import; tests/audiences.spec.ts checks that every hub
  // of audiences.ts is listed.
  [
    '/for',
    ['src/pages/for/index.astro', 'src/data/audiences.ts', 'src/lib/audiences.ts'],
  ],
  ...['engineers', 'ciso-risk', 'legal-dpo', 'executives-board', 'public-sector', 'smes'].map(
    (slug) =>
      [
        `/for/${slug}`,
        [
          'src/pages/for/[slug].astro',
          'src/components/AudienceHub.astro',
          'src/data/audiences.ts',
          'src/lib/audiences.ts',
          'src/data/frameworks.ts',
        ],
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
  // English is the default language and keeps its unprefixed URLs; every other
  // language lives under /<lang>/ and only where a translation exists (the
  // [lang] routes emit nothing for a language without one). /es/thesis, the
  // hand translation, is a static route and always wins.
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: [...LOCALES],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      // Pair each page with its translations (<xhtml:link rel="alternate">).
      // serialize below replaces the pairs with alternatesFor(), the same list
      // the pages' hreflang tags and the language switcher use, so the sitemap
      // and the HTML always agree (and x-default is included); the home and the
      // /<lang> landings are not translations of each other and get none.
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: Object.fromEntries(LOCALES.map((lang) => [lang, lang])),
      },
      // /og/* are the generated Open Graph cards, /diagrams/* the static SVG
      // assets and /404 the error page: none of them is a destination. Nor are
      // the pages whose canonical URL is another page (src/lib/sitemap-policy.ts).
      filter: (page) => inSitemap(pathnameOf(page)),
      // Every indexable route is dated by the last commit that touched what it
      // is built from (lib/reading.ts gitDate), so an edit moves the page's
      // lastmod without a manual step. A path missing from the map gets no
      // lastmod rather than a made-up one.
      serialize: (item) => {
        const pathname = pathnameOf(item.url);
        const alternates = alternatesFor(pathname);
        const links = alternates?.map((alt) => ({ url: alt.href, lang: alt.hreflang }));
        const paired = { ...item, links };
        const reviewed = REVIEWED_BY_PATH.get(pathname);
        if (reviewed) return { ...paired, lastmod: reviewed };
        const sources = SOURCE_BY_PATH.get(pathname);
        return sources ? { ...paired, lastmod: lastmodOf(sources) } : paired;
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
    // github-dark (Shiki's default) paints comments #6A737D on #24292e, a 3.04:1
    // ratio that fails WCAG AA (axe color-contrast, serious) wherever a chapter
    // shows a commented YAML or JSON block. Lift that one token colour to
    // #959DA5 (5.3:1); every other github-dark token already clears 4.5:1.
    shikiConfig: {
      transformers: [
        {
          name: 'aige-comment-contrast',
          span(node) {
            const style = node.properties?.style;
            if (typeof style === 'string' && /#6A737D/i.test(style)) {
              node.properties.style = style.replace(/#6A737D/gi, '#959DA5');
            }
          },
        },
      ],
    },
    remarkPlugins: [remarkLead, remarkCallouts],
    rehypePlugins: [
      rehypeSlug,
      // A translated file (I18N_DIR/<lang>/...) takes the English file's heading
      // ids by position and keeps its links in its language; before autolink,
      // so the heading links use those ids. A no-op on English files.
      rehypeI18n,
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
