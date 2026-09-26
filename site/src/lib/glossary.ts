// glossary.ts: the canonical glossary, parsed at build time from
// bok/09-glossary.md. Each term is one paragraph of the form
//
//   **Term.** Definition with [n] citations. Contrast with [X](/glossary/x) and
//   [Y](/glossary/y). See [ch. NN, Heading](/bok/<slug>#anchor); [...](...). (ch. NN, MM)
//
// The "Contrast with" clause is optional; "See" and the chapter list close every
// entry. The chapter's `## Sources` block gives each [n] its reference, and its
// `## Commonly confused pairs` table feeds the contrast cards. Everything here is
// computed once per build and cached: the rehype plugin, the term pages, the
// JSON endpoint and the A-Z index all read the same parse.

import GithubSlugger from 'github-slugger';
import { readSource } from './md-parse';
import { chaptersOrdered } from '../data/chapters';

const SOURCE = 'bok/09-glossary.md';

export interface GlossaryLink {
  label: string;
  href: string;
}

export interface GlossaryEntry {
  /** The term, without its trailing period (e.g. "Agent registry"). */
  term: string;
  /** Plain-text definition: citations, emphasis and link syntax removed. */
  definition: string;
  /** The definition as written, `[n]` markers kept (numbers refer to the chapter's Sources). */
  definitionCited: string;
  /** Zero-padded chapter numbers the term is cross-referenced to. */
  chapterRefs: string[];
  /** Uppercase first letter, for A-Z grouping. */
  letter: string;
  /** DOM id of the term on /bok/glossary and the A-Z index (`t-…`). */
  id: string;
  /** URL slug of the term page: /glossary/<slug>. */
  slug: string;
  /** /glossary/<slug>. */
  url: string;
  /** Chapter source numbers cited by the definition, in order of first use. */
  sources: number[];
  /** Page slugs of the terms this one is contrasted with. */
  contrast: string[];
  /** The "See" links: the sections that develop the term. */
  see: GlossaryLink[];
}

export interface GlossarySource {
  /** The number in the chapter's Sources list. */
  n: number;
  /** "Title (gloss). Publisher. Date." without the URL and the tag. */
  text: string;
  url: string;
  verified: string;
}

export interface ContrastPair {
  /** Page slugs of the two terms. */
  a: string;
  b: string;
  difference: string;
  why: string;
}

export interface TermUsage {
  /** Chapter number, zero-padded. */
  chapter: string;
  title: string;
  /** /bok/<slug>#<h2 anchor> of the first section that uses the term. */
  href: string;
  /** Heading of that H2 section, or "Opening" for the text before the first H2. */
  section: string;
  /** Mentions across the whole chapter. */
  count: number;
}

/**
 * The DOM id for a glossary term, so an in-page `#anchor` can point at it:
 * `t-` plus the term lowercased with each run of non-alphanumerics collapsed to
 * a single hyphen and the ends trimmed.
 */
export function termId(term: string): string {
  return `t-${term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
}

/** The term page slug: `termId` without the `t-` prefix. */
export function termSlug(term: string): string {
  return termId(term).slice(2);
}

const LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Remove inline Markdown (citations, bold, italics, code, links) from a string. */
function plain(text: string): string {
  return text
    .replace(/\s*\[\d+\]/g, '')
    .replace(LINK_RE, '$1')
    .replace(/\*\*/g, '')
    .replace(/(^|[\s(])\*([^*]+)\*/g, '$1$2')
    .replace(/`/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function links(text: string): GlossaryLink[] {
  return [...text.matchAll(LINK_RE)].map((m) => ({ label: m[1], href: m[2] }));
}

interface Parsed {
  entries: GlossaryEntry[];
  sources: Map<number, GlossarySource>;
  pairs: ContrastPair[];
}

let parsed: Parsed | undefined;

function parse(): Parsed {
  if (parsed) return parsed;
  const markdown = readSource(SOURCE).replace(/\r\n/g, '\n');
  const [body, sourceBlock = ''] = markdown.split(/^##\s+Sources\s*$/m);

  const entries: GlossaryEntry[] = [];
  for (const paragraph of body.split(/\n\s*\n/)) {
    const joined = paragraph.replace(/\s*\n\s*/g, ' ').trim();
    const match = /^\*\*(.+?)\.\*\*\s+(.+)$/.exec(joined);
    if (!match) continue;
    const term = match[1].trim();
    let rest = match[2];

    let chapterRefs: string[] = [];
    const ch = /\s*\(ch\.\s*([0-9,\s]+)\)\s*$/.exec(rest);
    if (ch) {
      chapterRefs = ch[1]
        .split(',')
        .map((n) => n.trim())
        .filter(Boolean);
      rest = rest.slice(0, ch.index);
    }
    let see: GlossaryLink[] = [];
    const seeMatch = /\s*See ((?:\[[^\]]+\]\([^)\s]+\)(?:;\s*)?)+)\.\s*$/.exec(rest);
    if (seeMatch) {
      see = links(seeMatch[1]);
      rest = rest.slice(0, seeMatch.index);
    }
    let contrast: string[] = [];
    const contrastMatch =
      /\s*Contrast with ((?:\[[^\]]+\]\(\/glossary\/[a-z0-9-]+\)(?:,\s*|\s+and\s+)?)+)\.\s*$/.exec(
        rest,
      );
    if (contrastMatch) {
      contrast = links(contrastMatch[1]).map((l) => l.href.replace('/glossary/', ''));
      rest = rest.slice(0, contrastMatch.index);
    }
    const definitionCited = rest.trim();
    const sources = [
      ...new Set([...definitionCited.matchAll(/\[(\d+)\]/g)].map((m) => Number(m[1]))),
    ];
    const slug = termSlug(term);
    entries.push({
      term,
      definition: plain(definitionCited),
      definitionCited,
      chapterRefs,
      letter: term.charAt(0).toUpperCase(),
      id: termId(term),
      slug,
      url: `/glossary/${slug}`,
      sources,
      contrast,
      see,
    });
  }

  const sources = new Map<number, GlossarySource>();
  for (const line of sourceBlock.split('\n')) {
    const m = /^\[(\d+)\]\s+(.*)$/.exec(line.trim());
    if (!m) continue;
    const rest = m[2];
    const url = /(https?:\/\/\S+)\s+\(verified:/.exec(rest)?.[1] ?? '';
    const verified = /\(verified:\s*([a-z]+)\)\s*$/.exec(rest)?.[1] ?? '';
    const text = url ? rest.slice(0, rest.indexOf(url)).trim() : rest;
    sources.set(Number(m[1]), { n: Number(m[1]), text, url, verified });
  }

  // "## Commonly confused pairs": | [A](/glossary/a) and [b](/glossary/b) | difference | why |
  const pairs: ContrastPair[] = [];
  const pairSection = /^##\s+Commonly confused pairs\s*$([\s\S]*?)^##\s/m.exec(body)?.[1] ?? '';
  for (const row of pairSection.split('\n')) {
    if (!row.startsWith('|') || /^\|\s*-/.test(row)) continue;
    const cells = row
      .split('|')
      .slice(1, -1)
      .map((cell) => cell.trim());
    const pairLinks = links(cells[0] ?? '').filter((l) => l.href.startsWith('/glossary/'));
    if (pairLinks.length !== 2) continue;
    pairs.push({
      a: pairLinks[0].href.replace('/glossary/', ''),
      b: pairLinks[1].href.replace('/glossary/', ''),
      difference: plain(cells[1] ?? ''),
      why: plain(cells[2] ?? ''),
    });
  }

  parsed = { entries, sources, pairs };
  return parsed;
}

/** The glossary, in the source file's alphabetical order. */
export function getGlossary(): GlossaryEntry[] {
  return parse().entries;
}

/** The distinct first letters present, in ascending order. */
export function getGlossaryLetters(): string[] {
  return [...new Set(getGlossary().map((entry) => entry.letter))].sort();
}

/** One entry by its page slug. */
export function getGlossaryEntry(slug: string): GlossaryEntry | undefined {
  return getGlossary().find((entry) => entry.slug === slug);
}

/** The chapter's numbered sources, keyed by number. */
export function getGlossarySources(): Map<number, GlossarySource> {
  return parse().sources;
}

/** The commonly confused pairs, in the chapter's order. */
export function getContrastPairs(): ContrastPair[] {
  return parse().pairs;
}

/** The pairs a term belongs to. */
export function contrastPairsFor(slug: string): ContrastPair[] {
  return getContrastPairs().filter((pair) => pair.a === slug || pair.b === slug);
}

/* ---- Term matching (shared by the rehype plugin and the usage index) ---- */

// Explicit aliases for terms whose name rarely appears as such in running prose.
const ALIASES: Record<string, string[]> = {
  'Agent (agentic AI)': ['agentic AI'],
  GPAI: ['general-purpose AI model'],
  NHI: ['non-human identity'],
  Deepfake: ['deep fake'],
  Hallucination: ['confabulation'],
  'Content provenance (C2PA)': ['C2PA'],
  'Responsible-AI licence (OpenRAIL)': ['OpenRAIL'],
  'ISO/IEC 42001': ['ISO 42001'],
  'ISO/IEC 42005': ['ISO 42005'],
  'AI system impact assessment': ['AI impact assessment', 'AIIA'],
  'NIST AI RMF': ['AI RMF'],
  'EU declaration of conformity': ['declaration of conformity'],
  'Training, validation and testing data': ['training data', 'validation data', 'testing data'],
};

/** No lowercase letter: an acronym or code such as "GPAI", "SB 53" or "ASI01–ASI10". */
function isAcronym(text: string): boolean {
  return /[A-Z]/.test(text) && !/[a-z]/.test(text);
}

function isSubsequence(needle: string, hay: string): boolean {
  let i = 0;
  for (const ch of hay) if (ch === needle[i]) i += 1;
  return i === needle.length;
}

/**
 * The surface forms that count as a mention of `term`: the term itself; for
 * "Head (qualifier)" the head when it is several words or an acronym; the
 * parenthetical when it is the head's own acronym ("RAG", "HITL"); and the
 * explicit aliases above.
 */
export function termForms(term: string): string[] {
  const forms = [term];
  const paren = /^(.+?)\s+\(([^)]+)\)$/.exec(term);
  if (paren) {
    const [, head, inner] = paren;
    const parts = head.split(/[\s-]+/).filter(Boolean);
    if (parts.length >= 2 || isAcronym(head)) forms.push(head);
    const letters = inner.replace(/[^A-Za-z]/g, '').toUpperCase();
    const initials = parts.map((p) => p.charAt(0).toUpperCase()).join('');
    if (
      isAcronym(inner) &&
      !/\s/.test(inner) &&
      letters.length >= 2 &&
      isSubsequence(letters, initials)
    ) {
      forms.push(inner);
    }
  }
  forms.push(...(ALIASES[term] ?? []));
  return [...new Set(forms)];
}

function escapeRegExp(literal: string): string {
  return literal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** A whole-word matcher for one surface form; acronyms match case-sensitively. */
function formRegex(form: string): RegExp {
  const plural = /[A-Za-z]$/.test(form) && !/s$/i.test(form) ? 's?' : '';
  return new RegExp(
    `(?<![A-Za-z0-9])${escapeRegExp(form)}${plural}(?![A-Za-z0-9])`,
    isAcronym(form) ? '' : 'i',
  );
}

export interface TermMatcher {
  /** The term's `t-` id (the hover cards' key). */
  id: string;
  /** The term page slug. */
  slug: string;
  /** One matcher per surface form, longest form first. */
  patterns: RegExp[];
  /** Length of the longest form, for ordering. */
  length: number;
}

let matchers: TermMatcher[] | undefined;

/**
 * Every term's matchers, longest term first so a specific phrase beats the
 * words inside it. A form that is another term's own name is left to that term.
 */
export function termMatchers(): TermMatcher[] {
  if (matchers) return matchers;
  const entries = getGlossary();
  const names = new Set(entries.map((entry) => entry.term.toLowerCase()));
  matchers = entries
    .map((entry) => {
      const forms = termForms(entry.term)
        .filter((form) => form.length >= 2)
        .filter((form) => form === entry.term || !names.has(form.toLowerCase()))
        .sort((a, b) => b.length - a.length);
      return {
        id: entry.id,
        slug: entry.slug,
        patterns: forms.map(formRegex),
        length: forms[0]?.length ?? 0,
      };
    })
    .sort((a, b) => b.length - a.length);
  return matchers;
}

/* ---- Where each term is used in the book ---- */

interface ChapterSection {
  chapter: string;
  title: string;
  href: string;
  section: string;
  text: string;
}

let sections: ChapterSection[] | undefined;

/** Heading text as rehype-slug sees it: the rendered text, no Markdown syntax. */
function headingText(raw: string): string {
  return raw
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(LINK_RE, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/\*\*|__|`/g, '')
    .replace(/(^|\s)[*_]([^*_]+)[*_]/g, '$1$2')
    .trim();
}

/** Every BoK chapter except the glossary, split at H2 with rehype-slug's ids. */
function chapterSections(): ChapterSection[] {
  if (sections) return sections;
  const out: ChapterSection[] = [];
  for (const chapter of chaptersOrdered) {
    if (chapter.slug === 'glossary') continue;
    let markdown: string;
    try {
      markdown = readSource(`bok/${chapter.id}.md`);
    } catch {
      continue;
    }
    const number = String(chapter.order).padStart(2, '0');
    const slugger = new GithubSlugger();
    let inFence = false;
    let current: ChapterSection = {
      chapter: number,
      title: chapter.shortTitle,
      href: `/bok/${chapter.slug}`,
      section: 'Opening',
      text: '',
    };
    const own: ChapterSection[] = [current];
    for (const line of markdown.split(/\r?\n/)) {
      if (/^\s*```/.test(line)) {
        inFence = !inFence;
        continue;
      }
      const heading = inFence ? null : /^(#{1,6})\s+(.*?)\s*#*\s*$/.exec(line);
      if (heading) {
        const text = headingText(heading[2]);
        const id = slugger.slug(text);
        if (heading[1].length === 2) {
          current = {
            chapter: number,
            title: chapter.shortTitle,
            href: `/bok/${chapter.slug}#${id}`,
            // The Sources list is not a use of the term.
            section: /^sources$/i.test(text) ? '' : text,
            text: '',
          };
          own.push(current);
        }
        continue;
      }
      if (current.section === '') continue;
      current.text += ` ${line.replace(LINK_RE, '$1')}`;
    }
    out.push(...own.filter((section) => section.section !== ''));
  }
  sections = out;
  return sections;
}

let usage: Map<string, TermUsage[]> | undefined;

/** Chapters that mention the term, in reading order, with the first section that does. */
export function termUsage(slug: string): TermUsage[] {
  if (!usage) {
    const index = new Map<string, TermUsage[]>();
    const all = chapterSections();
    for (const matcher of termMatchers()) {
      const globals = matcher.patterns.map((p) => new RegExp(p.source, `${p.flags}g`));
      const found = new Map<string, TermUsage>();
      for (const section of all) {
        let count = 0;
        for (const pattern of globals) count += section.text.match(pattern)?.length ?? 0;
        if (count === 0) continue;
        const seen = found.get(section.chapter);
        if (seen) {
          seen.count += count;
        } else {
          found.set(section.chapter, {
            chapter: section.chapter,
            title: section.title,
            href: section.href,
            section: section.section,
            count,
          });
        }
      }
      index.set(matcher.slug, [...found.values()]);
    }
    usage = index;
  }
  return usage.get(slug) ?? [];
}

/**
 * Related terms: the contrast terms first, then terms that share a "See"
 * section, then terms either definition names. Capped at `limit`.
 */
export function relatedTerms(slug: string, limit = 8): GlossaryEntry[] {
  const entries = getGlossary();
  const entry = entries.find((e) => e.slug === slug);
  if (!entry) return [];
  const bySlug = new Map(entries.map((e) => [e.slug, e]));
  const out: string[] = [];
  const add = (s: string) => {
    if (s !== slug && bySlug.has(s) && !out.includes(s)) out.push(s);
  };
  entry.contrast.forEach(add);
  const mine = new Set(entry.see.map((l) => l.href));
  for (const other of entries) {
    if (other.see.some((l) => mine.has(l.href))) add(other.slug);
  }
  const own = termMatchers().find((m) => m.slug === slug);
  for (const matcher of termMatchers()) {
    const other = bySlug.get(matcher.slug);
    if (!other || matcher.slug === slug) continue;
    const namesOther = matcher.patterns.some((p) => p.test(entry.definition));
    const namedByOther = own ? own.patterns.some((p) => p.test(other.definition)) : false;
    if (namesOther || namedByOther) add(matcher.slug);
  }
  return out.slice(0, limit).map((s) => bySlug.get(s)!);
}

/**
 * The definition renumbered for a term page: the chapter's [n] markers become
 * [1], [2]… in order of first use, with the matching sources in that order.
 * Bold, code and link syntax are removed; the citation markers are kept.
 */
export function localCitations(entry: GlossaryEntry): {
  text: string;
  sources: GlossarySource[];
} {
  const all = getGlossarySources();
  const order = entry.sources.filter((n) => all.has(n));
  const text = entry.definitionCited
    .replace(/\[(\d+)\]/g, (_, n: string) => `[${order.indexOf(Number(n)) + 1}]`)
    .replace(LINK_RE, '$1')
    .replace(/\*\*/g, '')
    .replace(/(^|[\s(])\*([^*]+)\*/g, '$1$2')
    .replace(/`/g, '');
  return { text, sources: order.map((n) => all.get(n)!) };
}

/** The first sentence of a definition, for cards and compact lists. */
export function firstSentence(definition: string, max = 200): string {
  const stop = definition.search(/[.!?](\s|$)/);
  const sentence = stop > 0 ? definition.slice(0, stop + 1) : definition;
  if (sentence.length <= max) return sentence;
  const cut = sentence.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:]+$/, '')}…`;
}
