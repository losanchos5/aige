// Single source of truth for site navigation: the desktop group bar, the mobile
// drawer and the footer sitemap all build from `nav`, `feeds` and `project`.
// Only `import type`-free runtime imports allowed here are the already-verified
// data modules `chapters` and `site`.
import { chaptersOrdered } from './chapters';
import { site } from './site';

export interface NavItem {
  label: string;
  href: string;
  /** One-line destination description (<= 90 chars). Omitted for chapters. */
  description?: string;
  /** Two-digit chapter number; present only for Body of Knowledge chapters. */
  num?: string;
  /** External link: rendered with target=_blank rel=noopener noreferrer. */
  external?: boolean;
  /** `footer` items appear only in the footer sitemap, not the header/drawer. */
  placement?: 'all' | 'footer';
}

export interface NavGroup {
  id: 'thesis' | 'bok' | 'practice' | 'reference' | 'map' | 'about';
  label: string;
  description: string;
  /** Direct-link groups (thesis, map) and lead-link groups (bok, reference,
   *  about) set this; Practice has no lead link. */
  href?: string;
  items: NavItem[];
}

// The eleven chapters, as compact panel/footer rows (number + short title).
const chapterItems: NavItem[] = chaptersOrdered.map((chapter) => ({
  label: chapter.shortTitle,
  href: `/bok/${chapter.slug}`,
  num: String(chapter.order).padStart(2, '0'),
}));

export const nav: NavGroup[] = [
  {
    id: 'thesis',
    label: 'The Thesis',
    description: 'The argument the site is built to make, end to end.',
    href: '/thesis',
    items: [
      {
        label: 'La Tesis (español)',
        href: '/es/thesis',
        description: 'The Thesis in Spanish.',
        placement: 'footer',
      },
    ],
  },
  {
    id: 'bok',
    label: 'Body of Knowledge',
    description: 'Eleven chapters, from the definition to the reading list.',
    href: '/bok',
    items: chapterItems,
  },
  {
    id: 'practice',
    label: 'Practice',
    description: 'How the discipline is done: the role, stack, patterns and path.',
    items: [
      {
        label: 'The Role',
        href: '/role',
        description: 'What an AI Governance Engineer does: seven workflows, skills, market.',
      },
      {
        label: 'The Stack',
        href: '/stack',
        description: 'Five layers, one evidence chain: the reference architecture.',
      },
      {
        label: 'Patterns',
        href: '/bok/patterns',
        description: 'Seventeen reusable patterns, each named to a layer.',
      },
      {
        label: 'Learning path',
        href: '/path',
        description: 'Four stages from foundations to proof; mark your own progress.',
      },
      {
        label: 'Maturity model',
        href: '/bok/maturity-model',
        description: 'Where a governance function stands, and what the next level demands.',
      },
    ],
  },
  {
    id: 'reference',
    label: 'Reference',
    description: 'Frameworks, crosswalk, tools, glossary and the reading list.',
    href: '/resources',
    items: [
      {
        label: 'Frameworks',
        href: '/resources/frameworks',
        description: 'The laws, standards, codes and control sets the book maps against.',
      },
      {
        label: 'Crosswalk',
        href: '/resources/crosswalk',
        description: 'One governance topic per row, across the instruments that bind it.',
      },
      {
        label: 'Tools',
        href: '/resources/tools',
        description: 'Reference tool categories per layer — examples, not endorsements.',
      },
      {
        label: 'Glossary',
        href: '/resources/glossary',
        description: 'Every term defined once, alphabetically, linked to its chapter.',
      },
      {
        label: 'Reading list',
        href: '/resources/reading-list',
        description: 'The annotated bibliography that formed the discipline.',
      },
    ],
  },
  {
    id: 'map',
    label: 'The map',
    description: 'The discipline as a mind map: chapters, layers and patterns on one canvas.',
    href: '/map',
    items: [],
  },
  {
    id: 'about',
    label: 'About',
    description: 'Who writes this, how it is versioned, how to cite it.',
    href: '/about',
    items: [
      {
        label: 'Changelog',
        href: '/about/changelog',
        description: 'What changed in each versioned release.',
      },
      {
        label: 'Contributors',
        href: '/about/contributors',
        description: 'The people who wrote, reviewed and corrected the text.',
      },
    ],
  },
];

// Downloadable feeds and machine-readable data.
export const feeds: NavItem[] = [
  { label: 'RSS (changelog)', href: '/rss.xml' },
  { label: 'Glossary JSON', href: '/glossary.json' },
  { label: 'Crosswalk CSV', href: '/resources/crosswalk.csv' },
  { label: 'Crosswalk JSON', href: '/resources/crosswalk.json' },
  { label: 'Obligations CSV', href: '/resources/obligations.csv' },
  { label: 'Obligations JSON', href: '/resources/obligations.json' },
];

// Off-site project links.
export const project: NavItem[] = [
  { label: 'GitHub', href: site.github, external: true },
  { label: 'LinkedIn', href: site.linkedin, external: true },
  { label: 'DOI', href: `https://doi.org/${site.doi}`, external: true },
];

/**
 * Normalise a pathname to a clean route. With Astro's `build.format: 'file'`,
 * `Astro.url.pathname` carries a `.html` suffix at build time
 * (`/resources/tools.html`, `/index.html`), so we strip that and any trailing
 * slash before matching. Keeps '/' for the home route.
 */
function normalise(pathname: string): string {
  let p = pathname.replace(/\.html$/, '');
  p = p.replace(/\/index$/, '');
  p = p.replace(/\/+$/, '');
  return p || '/';
}

function isPrefixOf(href: string, path: string): boolean {
  return path === href || (href !== '/' && path.startsWith(href + '/'));
}

/**
 * Resolve the current route to the longest-prefix internal href and the group
 * that owns it. On a tie (e.g. `/bok/patterns` sits in both Body of Knowledge
 * and Practice) the Practice/Reference/Map/About/Thesis groups win over Body of
 * Knowledge, so a chapter surfaced by a Practice item lights Practice.
 */
export function resolveCurrent(pathname: string): { href?: string; groupId?: string } {
  const path = normalise(pathname);
  const priority: NavGroup['id'][] = ['thesis', 'practice', 'reference', 'map', 'about', 'bok'];
  const groups = [...nav].sort((a, b) => priority.indexOf(a.id) - priority.indexOf(b.id));

  let best: { href?: string; groupId?: string; len: number } = { len: -1 };
  for (const group of groups) {
    const candidates: string[] = [];
    if (group.href) candidates.push(group.href);
    for (const item of group.items) {
      if (!item.external && item.href.startsWith('/')) candidates.push(item.href);
    }
    for (const href of candidates) {
      if (isPrefixOf(href, path) && href.length > best.len) {
        best = { href, groupId: group.id, len: href.length };
      }
    }
  }
  return { href: best.href, groupId: best.groupId };
}

/** Every unique internal href in the model, including footer-only and feeds. */
export function allHrefs(): string[] {
  const set = new Set<string>();
  const add = (href?: string, external?: boolean) => {
    if (!href || external || !href.startsWith('/')) return;
    set.add(href);
  };
  for (const group of nav) {
    add(group.href);
    for (const item of group.items) add(item.href, item.external);
  }
  for (const feed of feeds) add(feed.href, feed.external);
  for (const link of project) add(link.href, link.external);
  return [...set];
}
