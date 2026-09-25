// corpus.ts: the Body of Knowledge text as the site publishes it for machines
// (/llms-full.txt), split into documents with their headings and anchors.
//
// /api/v1/chapters.json carries titles, summaries and "at a glance" lines but
// not the section headings, and /api/v1/patterns.json carries a pattern's
// metadata but not its text. llms-full.txt carries both: every chapter and
// pattern page in reading order, each opened by a level-1 title and a
// "Source: <url>" line. The anchors are recomputed with github-slugger over the
// heading text, as rehype-slug does when the site renders the same Markdown.

import GithubSlugger from 'github-slugger';

export type DocumentKind = 'chapter' | 'pattern' | 'thesis' | 'other';

export interface Heading {
  level: number;
  text: string;
  anchor: string;
  url: string;
}

export interface Section {
  heading: Heading;
  /** Markdown body of the section, up to the next heading of any level. */
  body: string;
}

export interface CorpusDocument {
  kind: DocumentKind;
  title: string;
  url: string;
  /** Last path segment of the URL (`preface`, `policy-card`). */
  slug: string;
  summary: string;
  /** Markdown between the Source line and the first heading. */
  lead: string;
  headings: Heading[];
  sections: Section[];
}

const FENCE = /^\s{0,3}(`{3,}|~{3,})/;
const ATX = /^(#{1,6})\s+(.*?)\s*#*\s*$/;

/** Heading text as rendered: inline code, emphasis, links and HTML reduced to their text. */
export function plainHeading(markdown: string): string {
  return markdown
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/\\([\\`*_{}[\]()#+\-.!])/g, '$1')
    .trim();
}

function kindOf(url: string): DocumentKind {
  const path = new URL(url).pathname;
  if (path.startsWith('/bok/')) return 'chapter';
  if (path.startsWith('/patterns/')) return 'pattern';
  if (path.startsWith('/thesis')) return 'thesis';
  return 'other';
}

function slugOf(url: string): string {
  const parts = new URL(url).pathname.split('/').filter((part) => part !== '');
  return parts[parts.length - 1] ?? '';
}

function summaryOf(lead: string): string {
  const bold = /\*\*Summary:\*\*\s*([\s\S]*?)(?:\n\s*\n|$)/.exec(lead);
  if (bold?.[1]) return bold[1].replace(/\s+/g, ' ').trim();
  const quote = lead
    .split('\n')
    .filter((line) => /^\s*>/.test(line))
    .map((line) => line.replace(/^\s*>\s?/, ''))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
  return quote;
}

interface Raw {
  title: string;
  url: string;
  lines: string[];
}

/** Split llms-full.txt into its documents. Level-1 lines inside code fences are ignored. */
export function parseCorpus(text: string): CorpusDocument[] {
  const lines = text.replace(/\r\n?/g, '\n').split('\n');
  const raws: Raw[] = [];
  let current: Raw | null = null;
  let fence: string | null = null;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i] ?? '';
    const fenceMatch = FENCE.exec(line);
    if (fenceMatch?.[1]) {
      const marker = fenceMatch[1];
      if (fence === null) fence = marker;
      else if (marker[0] === fence[0] && marker.length >= fence.length) fence = null;
      current?.lines.push(line);
      continue;
    }
    if (fence === null && /^# \S/.test(line)) {
      let j = i + 1;
      while (j < lines.length && (lines[j] ?? '').trim() === '') j += 1;
      const source = /^Source:\s*(https?:\/\/\S+)\s*$/.exec(lines[j] ?? '');
      if (source?.[1]) {
        current = { title: plainHeading(line.slice(2)), url: source[1], lines: [] };
        raws.push(current);
        i = j;
        continue;
      }
    }
    current?.lines.push(line);
  }
  return raws.map(toDocument);
}

function toDocument(raw: Raw): CorpusDocument {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  const sections: Section[] = [];
  const leadLines: string[] = [];
  let body: string[] = leadLines;
  let fence: string | null = null;
  const flush = (): void => {
    const last = sections[sections.length - 1];
    if (last) last.body = body.join('\n').trim().replace(/\n*---$/, '').trim();
  };
  for (const line of raw.lines) {
    const fenceMatch = FENCE.exec(line);
    if (fenceMatch?.[1]) {
      const marker = fenceMatch[1];
      if (fence === null) fence = marker;
      else if (marker[0] === fence[0] && marker.length >= fence.length) fence = null;
      body.push(line);
      continue;
    }
    const atx = fence === null ? ATX.exec(line) : null;
    if (atx?.[1] && atx[2] !== undefined && atx[1].length >= 2) {
      flush();
      const text = plainHeading(atx[2]);
      const anchor = slugger.slug(text);
      const heading: Heading = { level: atx[1].length, text, anchor, url: `${raw.url}#${anchor}` };
      headings.push(heading);
      body = [];
      sections.push({ heading, body: '' });
      continue;
    }
    body.push(line);
  }
  flush();
  const lead = leadLines.join('\n').trim().replace(/\n*---$/, '').trim();
  return {
    kind: kindOf(raw.url),
    title: raw.title,
    url: raw.url,
    slug: slugOf(raw.url),
    summary: summaryOf(lead),
    lead,
    headings,
    sections,
  };
}
