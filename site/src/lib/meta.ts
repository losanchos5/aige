// meta.ts: the text rules for the head metadata Seo.astro renders: the meta
// description budget, the document title with its site-name suffix, and the
// Open Graph image's alternative text. Pure functions, so tests exercise them
// directly on the same inputs the pages pass.
import { ogCardTitle } from './og-cards';

/** A search snippet is capped at ~160 characters. */
export const MAX_DESCRIPTION = 160;

/** A cut at a sentence end must keep at least this much of the text. */
const MIN_SENTENCE_CUT = 100;

/** Titles longer than this lose their ` · <site name>` suffix. */
export const MAX_SUFFIXED_TITLE = 60;

// A full stop after one of these is not a sentence end ("Art. 9", "e.g. the").
const ABBREVIATION = /(?:^|[\s(/])(?:Art|Arts|No|Nos|Sec|Ch|ch|para|paras|p|pp|v|vs|cf|e\.g|i\.e|etc|al|Inc|Ltd|Co|St|Dr|Mr|Ms|approx|U\.S|U\.K)$/;

/**
 * Fit `text` into the description budget. Text that fits is returned whole
 * (whitespace collapsed). Longer text is cut at the last sentence end inside
 * the budget, with no ellipsis, when that keeps at least MIN_SENTENCE_CUT
 * characters; otherwise at the last word boundary, with `…`. Never mid-word.
 */
export function metaDescription(text: string, max = MAX_DESCRIPTION): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;

  // Sentence ends: . ! or ? (plus a closing quote or bracket) before a space
  // and a capital, digit or opening quote, and not after an abbreviation or an
  // initial ("J. Smith").
  const sentenceEnd = /[.!?]["'”’)\]]?(?= ["“'(\[]?[A-Z0-9])/g;
  let best = -1;
  for (const match of clean.matchAll(sentenceEnd)) {
    const end = (match.index ?? 0) + match[0].length;
    if (end > max) break;
    const before = clean.slice(0, match.index);
    if (ABBREVIATION.test(before) || /(?:^|\s)[A-Z]$/.test(before)) continue;
    if (end >= MIN_SENTENCE_CUT) best = end;
  }
  if (best > 0) return clean.slice(0, best);

  // Word boundary: the whole word before the budget's last space, and `…`.
  const budget = max - 1;
  const boundary = clean[budget] === ' ' ? budget : clean.lastIndexOf(' ', budget);
  const words = boundary > 0 ? clean.slice(0, boundary) : clean.slice(0, budget);
  return `${words.replace(/[\s,;:.(\[–-]+$/, '')}…`;
}

/**
 * The document title: `title · siteName` when `suffix` is set and the result
 * stays within MAX_SUFFIXED_TITLE characters, the bare title otherwise (the
 * site name still travels in og:site_name and the WebSite node).
 */
export function documentTitle(title: string, siteName: string, suffix = true): string {
  if (!suffix) return title;
  const full = `${title} · ${siteName}`;
  return full.length <= MAX_SUFFIXED_TITLE ? full : title;
}

/**
 * Alternative text for the Open Graph image. A card rendered for this page
 * shows its title, so the document title describes it. A shared section card
 * (e.g. /og/resources.png on a glossary term) shows its own title, and the alt
 * says that instead of claiming the page's.
 */
export function ogImageAlt(input: {
  image: string;
  title: string;
  documentTitle: string;
  siteName: string;
}): string {
  const card = ogCardTitle(input.image);
  if (card === undefined || card === input.title) return input.documentTitle;
  return `${card} · ${input.siteName}`;
}
