// i18n-pages.ts: the translated pages, loaded from the translation collections
// (src/content.config.ts) and checked against the contract before any route is
// emitted. Every check that fails stops the build with the file's name:
//
//   - the file sits where its frontmatter says: `lang` is its folder, `source`
//     is the English file it translates, and that English file exists;
//   - a pattern keeps the English ids, layers and order (only title and summary
//     are translated);
//   - the routes the collections produce are exactly the ones lib/i18n-content.ts
//     finds on disk, which is what the sitemap, the hreflang alternates and the
//     language switcher are built from;
//   - a translated page carries the English page's anchors
//     (`assertSameAnchors`, run by the page templates after rendering both).
//
// A translation whose `sourceHash` no longer matches its English file is
// `stale`: it still renders, and the notice says the English has changed.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { MarkdownHeading } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { getChapter, type Chapter } from '../data/chapters';
import { getPatternBySlug, type PatternDef } from '../data/patterns';
import {
  classifyRelative,
  repoRoot,
  sourceHash,
  translationIndex,
  type TranslationFile,
} from './i18n-content';
import type { TranslatedLocale } from '../i18n/locales';

interface TranslationMeta {
  lang: TranslatedLocale;
  source: string;
  sourceHash: string;
  translatedBy: string;
  translatedAt: string;
}

export interface Translated<Entry> {
  file: TranslationFile;
  entry: Entry;
  lang: TranslatedLocale;
  /** The model id from `translatedBy: "machine: <model id>"`. */
  model: string;
  translatedAt: string;
  /** The English file changed after the translation was made. */
  stale: boolean;
  /** Repo-relative path of the translation file, for the notice and git dates. */
  filePath: string;
}

export type TranslatedChapter = Translated<CollectionEntry<'bokI18n'>> & { chapter: Chapter };
export type TranslatedPattern = Translated<CollectionEntry<'patternsI18n'>> & { def: PatternDef };
export type TranslatedThesis = Translated<CollectionEntry<'thesisI18n'>>;

const hashCache = new Map<string, string>();
function currentHash(source: string): string {
  const cached = hashCache.get(source);
  if (cached) return cached;
  const hash = sourceHash(readFileSync(resolve(repoRoot(), source), 'utf8'));
  hashCache.set(source, hash);
  return hash;
}

function check<Entry extends { id: string; data: TranslationMeta }>(
  entry: Entry,
): Translated<Entry> {
  const rel = `${entry.id}.md`;
  const file = classifyRelative(rel);
  if (!file) {
    throw new Error(
      `i18n: ${rel} is not a translation the site can render: no English chapter, pattern or Thesis matches its path`,
    );
  }
  const { data } = entry;
  if (data.lang !== file.lang) {
    throw new Error(`i18n: ${rel} says lang "${data.lang}" but sits in the "${file.lang}" folder`);
  }
  if (data.source !== file.source) {
    throw new Error(`i18n: ${rel} says source "${data.source}", expected "${file.source}"`);
  }
  return {
    file,
    entry,
    lang: file.lang,
    model: data.translatedBy.replace(/^machine:\s*/, ''),
    translatedAt: data.translatedAt,
    stale: data.sourceHash !== currentHash(file.source),
    filePath: `i18n/${rel}`,
  };
}

let chaptersCache: Promise<TranslatedChapter[]> | undefined;
let patternsCache: Promise<TranslatedPattern[]> | undefined;
let thesesCache: Promise<TranslatedThesis[]> | undefined;

/** Every translated chapter, in language then reading order. */
export function translatedChapters(): Promise<TranslatedChapter[]> {
  chaptersCache ??= (async () => {
    const entries = await getCollection('bokI18n');
    return entries
      .map((entry) => {
        const base = check(entry);
        return { ...base, chapter: getChapter(base.file.id)! };
      })
      .sort((a, b) => a.lang.localeCompare(b.lang) || a.chapter.order - b.chapter.order);
  })();
  return chaptersCache;
}

/** Every translated pattern page, in language then catalogue order. */
export function translatedPatterns(): Promise<TranslatedPattern[]> {
  patternsCache ??= (async () => {
    const [entries, english] = await Promise.all([
      getCollection('patternsI18n'),
      getCollection('patterns'),
    ]);
    const bySlug = new Map(english.map((entry) => [entry.data.id, entry.data]));
    return entries
      .map((entry) => {
        const base = check(entry);
        const def = getPatternBySlug(base.file.id)!;
        const source = bySlug.get(base.file.id);
        const rel = `${entry.id}.md`;
        if (!source) throw new Error(`i18n: ${rel}: no English pattern "${base.file.id}"`);
        for (const key of ['id', 'layer', 'secondaryLayer', 'order'] as const) {
          if (entry.data[key] !== source[key]) {
            throw new Error(
              `i18n: ${rel}: "${key}" is ${JSON.stringify(entry.data[key])}, the English pattern has ${JSON.stringify(source[key])}; only title and summary are translated`,
            );
          }
        }
        return { ...base, def };
      })
      .sort((a, b) => a.lang.localeCompare(b.lang) || a.entry.data.order - b.entry.data.order);
  })();
  return patternsCache;
}

/** Every machine-translated Thesis (fr, de, pt). */
export function translatedTheses(): Promise<TranslatedThesis[]> {
  thesesCache ??= (async () => (await getCollection('thesisI18n')).map((entry) => check(entry)))();
  return thesesCache;
}

/**
 * All translations, after checking that the collections and the folder scan
 * (lib/i18n-content.ts, which the sitemap and the hreflang tags read) name the
 * same pages. Called by every translated route, so a disagreement fails the
 * build before anything is written.
 */
export async function allTranslations() {
  const [chapters, patterns, theses] = await Promise.all([
    translatedChapters(),
    translatedPatterns(),
    translatedTheses(),
  ]);
  const fromCollections = [...chapters, ...patterns, ...theses].map((t) => t.file.path).sort();
  const fromScan = translationIndex().files.map((file) => file.path).sort();
  if (fromCollections.join('\n') !== fromScan.join('\n')) {
    throw new Error(
      `i18n: the translation collections and the folder scan disagree.\n  collections: ${fromCollections.join(', ') || '(none)'}\n  scan:        ${fromScan.join(', ') || '(none)'}`,
    );
  }
  return { chapters, patterns, theses };
}

/** Languages with at least one translation, in locale order. */
export async function translatedLangs(): Promise<TranslatedLocale[]> {
  const { chapters, patterns, theses } = await allTranslations();
  const set = new Set([...chapters, ...patterns, ...theses].map((t) => t.lang));
  return (['es', 'fr', 'de', 'pt'] as const).filter((lang) => set.has(lang));
}

/**
 * Fail the build when a translated page does not carry exactly the English
 * page's heading anchors. rehype-i18n sets them while rendering; this guards
 * the rendered result too (a cached render of a translation made against an
 * older English file would otherwise slip through).
 */
export function assertSameAnchors(
  english: readonly MarkdownHeading[],
  translated: readonly MarkdownHeading[],
  where: string,
): void {
  const count = Math.max(english.length, translated.length);
  for (let i = 0; i < count; i += 1) {
    if (english[i]?.slug !== translated[i]?.slug) {
      const tr = translated[i];
      const en = english[i];
      throw new Error(
        `i18n: ${where}: heading ${i + 1} ${tr ? `"${tr.text}" has id "${tr.slug}"` : 'is missing'}, the English page has ${en ? `"${en.text}" with id "${en.slug}"` : 'no heading there'}. Clear the content cache (ASTRO_CACHE_DIR) if the English file changed.`,
      );
    }
  }
}

/** The text of a Markdown body's H1 (the translated title), inline syntax removed. */
export function titleOf(body: string | undefined): string | undefined {
  const match = /^#\s+(.+?)\s*#*\s*$/m.exec(body ?? '');
  if (!match) return undefined;
  return match[1]
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1')
    .trim();
}

/** A chapter title without its "NN. " number: the label in lists and the pager. */
export function shortTitleOf(title: string): string {
  return title.replace(/^\d+\.\s*/, '');
}

/** A translated chapter's short title, from its own H1. */
export function translatedShortTitle(item: TranslatedChapter): string {
  return shortTitleOf(titleOf(item.entry.body) ?? item.chapter.title);
}

/**
 * The chapter rail's links for a page in `lang`: each chapter translated into
 * it goes to its translation, labelled in the language (Doc `sidebarLinks`).
 */
export async function chapterLinks(
  lang: TranslatedLocale,
): Promise<Record<string, { href: string; label: string }>> {
  const { chapters } = await allTranslations();
  return Object.fromEntries(
    chapters
      .filter((item) => item.lang === lang)
      .map((item) => [
        item.chapter.slug,
        { href: `/${lang}/bok/${item.chapter.slug}`, label: translatedShortTitle(item) },
      ]),
  );
}
