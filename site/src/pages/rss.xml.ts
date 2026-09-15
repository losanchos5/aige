// rss.xml: a "changelog" feed. One item per released version in
// bok/CHANGELOG.md (`## [x.y] — date` headings), each linking to its anchor on
// the /about/changelog page. The anchor is slugified with the same slugger
// rehype-slug uses, so the link resolves to the real heading id on that page.
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { readSource, slugify, stripInline } from '../lib/md-parse';

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
    const match = /^##\s+(\[([^\]]+)\]\s*[—–-]\s*(.+?))\s*$/.exec(line);
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

export const GET: APIRoute = (context) => {
  const changelog = parseChangelog(readSource('bok/CHANGELOG.md'));
  return rss({
    title: `${site.name} — Changelog`,
    description:
      'Releases of the AI Governance Engineering Thesis & Body of Knowledge, newest first.',
    site: context.site ?? site.url,
    // The site uses trailingSlash: 'never'; without this, rss appends a slash
    // after each link's #anchor (…#02--2026-09-10/) and the anchor stops
    // resolving to the heading id on the changelog page.
    trailingSlash: false,
    items: changelog.map((entry) => ({
      title: `v${entry.version}`,
      link: `/about/changelog#${slugify(entry.heading)}`,
      pubDate: entry.date,
      description: entry.summary || `Version ${entry.version} of the Body of Knowledge.`,
    })),
    customData: '<language>en</language>',
  });
};
