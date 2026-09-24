// rss.xml: the site feed. It carries two kinds of items, newest first:
//   - one per released version in bok/CHANGELOG.md (`## [x.y] - date` headings),
//     each linking to its anchor on the /about/changelog page;
//   - one per Body of Knowledge chapter (data/chapters.ts), linking to the
//     chapter page, dated by the last git commit that touched the chapter source
//     (reading.ts `gitDate`) so an edit resurfaces the chapter as a fresh item.
// Changelog anchors are slugified with the same slugger rehype-slug uses, so the
// link resolves to the real heading id on that page.
import rss from '@astrojs/rss';
import type { RSSFeedItem } from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { chaptersOrdered } from '../data/chapters';
import { site } from '../data/site';
import { readSource, slugify, stripInline } from '../lib/md-parse';
import { gitDate } from '../lib/reading';

interface ChangelogItem {
  version: string;
  heading: string;
  date: Date;
  summary: string;
}

/** Parse the version sections out of the changelog Markdown. */
function parseChangelog(markdown: string): ChangelogItem[] {
  const lines = markdown.split(/\r?\n/);
  const items: ChangelogItem[] = [];
  let current: { heading: string; version: string; date: Date; body: string[] } | undefined;

  const flush = () => {
    if (!current) return;
    // First non-empty paragraph after the heading, markdown stripped.
    const paragraph: string[] = [];
    for (const line of current.body) {
      if (line.startsWith('#')) break; // a sub-heading ends the intro
      if (line.trim() === '') {
        if (paragraph.length) break;
        continue;
      }
      paragraph.push(line.trim());
    }
    items.push({
      version: current.version,
      heading: current.heading,
      date: current.date,
      summary: stripInline(paragraph.join(' ')),
    });
  };

  for (const line of lines) {
    const match = /^##\s+(\[([^\]]+)\]\s*[\u2014–-]\s*(.+?))\s*$/.exec(line);
    if (match) {
      flush();
      const [, heading, version, rawDate] = match;
      const iso = /^\d{4}-\d{2}$/.test(rawDate) ? `${rawDate}-01` : rawDate;
      current = { heading, version, date: new Date(iso), body: [] };
    } else if (current) {
      current.body.push(line);
    }
  }
  flush();
  return items;
}

/**
 * The chapter lead: the opening blockquote between the H1 and the first section,
 * with inline Markdown stripped. Every chapter opens with one; if a source has
 * none, the caller falls back to the chapter's stored summary.
 */
function chapterLead(markdown: string): string {
  const quote: string[] = [];
  let started = false;
  for (const line of markdown.split(/\r?\n/)) {
    if (/^\s*>/.test(line)) {
      started = true;
      quote.push(line.replace(/^\s*>\s?/, '').trim());
    } else if (started) {
      break; // a blank or plain line ends the first blockquote
    }
  }
  return stripInline(quote.join(' '));
}

interface FeedEntry {
  /** Sort key: newest first across versions and chapters. */
  date: Date;
  item: RSSFeedItem;
}

export const GET: APIRoute = (context) => {
  // Absolute origin for stable guids, without a trailing slash.
  const origin = (context.site?.toString() ?? site.url).replace(/\/+$/, '');

  const versionEntries: FeedEntry[] = parseChangelog(readSource('bok/CHANGELOG.md')).map(
    (entry) => ({
      date: entry.date,
      item: {
        title: `v${entry.version}`,
        link: `/about/changelog#${slugify(entry.heading)}`,
        pubDate: entry.date,
        description: entry.summary || `Version ${entry.version} of the Body of Knowledge.`,
      },
    }),
  );

  const chapterEntries: FeedEntry[] = chaptersOrdered.map((chapter) => {
    const iso = gitDate(`../bok/${chapter.id}.md`);
    let lead = '';
    try {
      lead = chapterLead(readSource(`bok/${chapter.id}.md`));
    } catch {
      // Source unreadable (e.g. a shallow checkout); fall back to the summary.
    }
    const link = `/bok/${chapter.slug}`;
    return {
      date: new Date(iso),
      item: {
        title: chapter.title,
        link,
        pubDate: new Date(iso),
        description: lead || chapter.summary,
        // Stable guid per chapter + date: a new git date (an edit) surfaces the
        // chapter as a new item; an unchanged chapter keeps its guid across
        // builds. isPermaLink="false": this is an identity, not a fetchable URL.
        customData: `<guid isPermaLink="false">${origin}${link}#${iso}</guid>`,
      },
    };
  });

  const items = [...versionEntries, ...chapterEntries]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .map((entry) => entry.item);

  return rss({
    // The feed carries both kinds of item, so it is named for the whole site,
    // not for the changelog alone (the same wording as the <link rel="alternate">
    // in Base.astro).
    title: `${site.name} · chapters and releases`,
    description:
      'The AI Governance Engineering Thesis & Body of Knowledge: new and updated chapters and each released version, newest first.',
    site: context.site ?? site.url,
    // The site uses trailingSlash: 'never'; without this, rss appends a slash
    // after each link's #anchor (…#02--2026-09-10/) and the anchor stops
    // resolving to the heading id on the changelog page.
    trailingSlash: false,
    items,
    customData: '<language>en</language>',
  });
};
