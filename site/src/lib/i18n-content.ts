// i18n-content.ts: where the translations live and which pages they make.
//
// The translation pipeline writes Markdown into I18N_DIR (default <repo>/i18n):
//
//   <lang>/bok/<chapter-id>.md     a chapter        -> /<lang>/bok/<slug>
//   <lang>/patterns/<slug>.md      a pattern page   -> /<lang>/patterns/<slug>
//   <lang>/THESIS.md               the Thesis       -> /<lang>/thesis (fr, de, pt)
//
// This module is plain Node (no astro:content), so astro.config.ts (sitemap and
// lastmod), the Markdown plugins (heading ids, links) and the tests all read the
// same answer: `translationIndex()` scans the folder once per process. The pages
// themselves load the same files through content collections, which validate
// the frontmatter (src/content.config.ts, lib/i18n-pages.ts); both sides use the
// file patterns below, so a route exists exactly when its file does.
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, statSync } from 'node:fs';
import { isAbsolute, relative, resolve, sep } from 'node:path';
import { getChapter } from '../data/chapters';
import { patterns } from '../data/patterns';
import { site } from '../data/site';
import {
  DEFAULT_LOCALE,
  LOCALES,
  MACHINE_THESIS_LOCALES,
  isPublishedLocale,
  isTranslatedLocale,
  type Locale,
  type TranslatedLocale,
} from '../i18n/locales';

/** The repository root, from the build cwd (site/). */
export function repoRoot(): string {
  return resolve(process.cwd(), '..');
}

/** The translations folder: I18N_DIR when set (resolved from site/), else <repo>/i18n. */
export function i18nDir(): string {
  const fromEnv = process.env.I18N_DIR;
  return fromEnv ? resolve(process.cwd(), fromEnv) : resolve(repoRoot(), 'i18n');
}

export type TranslationKind = 'chapter' | 'pattern' | 'thesis';

export interface TranslationFile {
  lang: TranslatedLocale;
  kind: TranslationKind;
  /** Chapter id (`03-values-principles`), pattern slug, or `thesis`. */
  id: string;
  /** Repo-relative path of the English source (`bok/03-values-principles.md`). */
  source: string;
  /** Path of the translated page (`/es/bok/values-and-principles`). */
  path: string;
  /** English page the translation renders (`/bok/values-and-principles`). */
  englishPath: string;
}

const CHAPTER_FILE = /^([a-z]{2})\/bok\/(\d\d-[a-z0-9-]+)\.md$/;
const PATTERN_FILE = /^([a-z]{2})\/patterns\/([a-z0-9]+(?:-[a-z0-9]+)*)\.md$/;
const THESIS_FILE = /^([a-z]{2})\/THESIS\.md$/;

/**
 * What a file under the translations folder is, from its path relative to that
 * folder (`es/bok/03-values-principles.md`). Undefined for anything that is not
 * a translation the site renders: an unknown language, a chapter or pattern
 * with no English source, a Spanish THESIS.md (the hand translation wins), the
 * README, the glossary lock or the translation memory.
 */
export function classifyRelative(rel: string): TranslationFile | undefined {
  const path = rel.split(sep).join('/');
  let match = CHAPTER_FILE.exec(path);
  if (match && isTranslatedLocale(match[1])) {
    const chapter = getChapter(match[2]);
    if (!chapter) return undefined;
    return {
      lang: match[1],
      kind: 'chapter',
      id: chapter.id,
      source: `bok/${chapter.id}.md`,
      path: `/${match[1]}/bok/${chapter.slug}`,
      englishPath: `/bok/${chapter.slug}`,
    };
  }
  match = PATTERN_FILE.exec(path);
  if (match && isTranslatedLocale(match[1])) {
    const slug = match[2];
    if (!patterns.some((pattern) => pattern.slug === slug)) return undefined;
    return {
      lang: match[1],
      kind: 'pattern',
      id: slug,
      source: `bok/patterns/${slug}.md`,
      path: `/${match[1]}/patterns/${slug}`,
      englishPath: `/patterns/${slug}`,
    };
  }
  match = THESIS_FILE.exec(path);
  if (match && (MACHINE_THESIS_LOCALES as readonly string[]).includes(match[1])) {
    const lang = match[1] as TranslatedLocale;
    return {
      lang,
      kind: 'thesis',
      id: 'thesis',
      source: 'THESIS.md',
      path: `/${lang}/thesis`,
      englishPath: '/thesis',
    };
  }
  return undefined;
}

/** `classifyRelative` for an absolute path (a Markdown plugin's vfile path). */
export function classifyFile(absPath: string | undefined): TranslationFile | undefined {
  if (!absPath) return undefined;
  const rel = relative(i18nDir(), resolve(absPath));
  if (rel.startsWith('..') || isAbsolute(rel)) return undefined;
  return classifyRelative(rel);
}

export interface TranslationIndex {
  /** Every translation file the site renders, in folder order. */
  files: TranslationFile[];
  /** English page path -> the languages it is translated into. */
  byEnglishPath: Map<string, Set<TranslatedLocale>>;
  /** Languages with at least one translated chapter. */
  bokLangs: Set<TranslatedLocale>;
  /** Languages with any translation (they get a /<lang> landing). */
  langs: Set<TranslatedLocale>;
}

function scan(dir: string): TranslationFile[] {
  if (!existsSync(dir)) return [];
  const out: TranslationFile[] = [];
  const walk = (current: string): void => {
    for (const name of readdirSync(current).sort()) {
      const full = resolve(current, name);
      if (statSync(full).isDirectory()) {
        if (!name.startsWith('.')) walk(full);
        continue;
      }
      const file = classifyRelative(relative(dir, full));
      if (file) out.push(file);
    }
  };
  walk(dir);
  return out;
}

/** Build the index of `files` (exported for the tests, which feed it fakes). */
export function indexOf(files: TranslationFile[]): TranslationIndex {
  const byEnglishPath = new Map<string, Set<TranslatedLocale>>();
  const bokLangs = new Set<TranslatedLocale>();
  const langs = new Set<TranslatedLocale>();
  for (const file of files) {
    const set = byEnglishPath.get(file.englishPath) ?? new Set<TranslatedLocale>();
    set.add(file.lang);
    byEnglishPath.set(file.englishPath, set);
    langs.add(file.lang);
    if (file.kind === 'chapter') bokLangs.add(file.lang);
  }
  return { files, byEnglishPath, bokLangs, langs };
}

let indexCache: { dir: string; onDisk: TranslationFile[]; index: TranslationIndex } | undefined;

function cached() {
  const dir = i18nDir();
  if (indexCache?.dir !== dir) {
    const onDisk = scan(dir);
    indexCache = { dir, onDisk, index: indexOf(onDisk.filter((file) => isPublishedLocale(file.lang))) };
  }
  return indexCache;
}

/** Every translation file in `i18nDir()`, published or not (the tests read it). */
export function translationsOnDisk(): TranslationFile[] {
  return cached().onDisk;
}

/**
 * The translations the site publishes: the files in `i18nDir()` whose language
 * is in PUBLISHED_TRANSLATED_LOCALES (src/i18n/locales.ts), scanned once per
 * process. Everything the build derives from translations (routes, hreflang,
 * sitemap, switcher, footer) reads this index, so the switch hides them all.
 */
export function translationIndex(): TranslationIndex {
  return cached().index;
}

/** Sort languages in the site's locale order (the switcher and hreflang order). */
function ordered<T extends string>(langs: Iterable<T>): T[] {
  const set = new Set<string>(langs);
  return (LOCALES as readonly string[]).filter((lang) => set.has(lang)) as T[];
}

/**
 * The page a path renders in `lang` when that page exists, else undefined. Paths
 * are clean (no `.html`, no trailing slash) and may carry a language prefix.
 * Spanish always has the hand-translated Thesis at /es/thesis.
 */
export function pathIn(
  englishPath: string,
  lang: Locale,
  index: TranslationIndex = translationIndex(),
): string | undefined {
  if (lang === DEFAULT_LOCALE) return englishPath;
  if (englishPath === '/thesis' && lang === 'es') return '/es/thesis';
  if (englishPath === '/bok') return index.bokLangs.has(lang) ? `/${lang}/bok` : undefined;
  return index.byEnglishPath.get(englishPath)?.has(lang) ? `/${lang}${englishPath}` : undefined;
}

export interface Alternate {
  hreflang: string;
  href: string;
}

/** English path of a (possibly prefixed) clean page path. */
export function englishPathOf(pathname: string): string {
  const first = pathname.split('/')[1] ?? '';
  if (!isTranslatedLocale(first)) return pathname;
  const rest = pathname.slice(first.length + 1);
  return rest === '' ? '/' : rest;
}

/**
 * The hreflang alternates of a page: one per language the page exists in, in
 * locale order, plus x-default on the English page. Undefined when the page
 * exists in English only (no alternates at all), and for the home and the
 * /<lang> landings, which are not translations of each other. The same list
 * feeds the <link rel="alternate"> tags (Seo.astro), the language switcher and
 * the sitemap (astro.config.ts), so the three always agree.
 */
export function alternatesFor(
  pathname: string,
  index: TranslationIndex = translationIndex(),
): Alternate[] | undefined {
  const english = englishPathOf(pathname);
  if (english === '/') return undefined;
  const langs = LOCALES.filter((lang) => pathIn(english, lang, index) !== undefined);
  if (langs.length < 2) return undefined;
  const url = (path: string) => `${site.url}${path}`;
  return [
    ...ordered(langs).map((lang) => ({ hreflang: lang, href: url(pathIn(english, lang, index)!) })),
    { hreflang: 'x-default', href: url(english) },
  ];
}

/**
 * Rewrite an internal link found in a `lang` translation so it stays in that
 * language when it can: `/bok/<slug>#x` becomes `/<lang>/bok/<slug>#x` when that
 * chapter is translated, and likewise for patterns, the Thesis and /bok. Every
 * other link is returned unchanged (English is the fallback). A link into the
 * hand-translated Spanish Thesis keeps its English target when it names an
 * anchor, because the hand translation has headings of its own.
 */
export function localizeHref(
  href: string,
  lang: TranslatedLocale,
  index: TranslationIndex = translationIndex(),
): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  const hashAt = href.search(/[?#]/);
  const path = hashAt === -1 ? href : href.slice(0, hashAt);
  const tail = hashAt === -1 ? '' : href.slice(hashAt);
  const clean = path.length > 1 ? path.replace(/\/$/, '') : path;
  if (!/^\/(bok|patterns|thesis)(\/|$)/.test(clean)) return href;
  if (clean === '/thesis' && lang === 'es' && tail.startsWith('#')) return href;
  const target = pathIn(clean, lang, index);
  return target && target !== clean ? `${target}${tail}` : href;
}

export interface HeadingShape {
  depth: number;
  text: string;
}

/** Whitespace-normalised text, the form heading texts are compared in. */
export function normalise(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

/**
 * The first difference between the English headings and a translation's, as a
 * sentence naming the heading; undefined when they match one to one (same
 * count, same level at every position).
 */
export function headingMismatch(
  english: readonly HeadingShape[],
  translated: readonly HeadingShape[],
): string | undefined {
  const count = Math.max(english.length, translated.length);
  for (let i = 0; i < count; i += 1) {
    const en = english[i];
    const tr = translated[i];
    if (!en) {
      return `heading ${i + 1} "${normalise(tr.text)}" (h${tr.depth}) has no English counterpart: the English source has ${english.length} heading(s), the translation ${translated.length}`;
    }
    if (!tr) {
      return `English heading ${i + 1} "${normalise(en.text)}" (h${en.depth}) is missing from the translation: the English source has ${english.length} heading(s), the translation ${translated.length}`;
    }
    if (en.depth !== tr.depth) {
      return `heading ${i + 1} "${normalise(tr.text)}" is an h${tr.depth}, but its English counterpart "${normalise(en.text)}" is an h${en.depth}`;
    }
  }
  return undefined;
}

/** sha256 (hex) of a text after normalising its line endings to LF: the contract's sourceHash. */
export function sourceHash(text: string): string {
  return createHash('sha256').update(text.replace(/\r\n?/g, '\n'), 'utf8').digest('hex');
}

/** The translation files' repo-relative path, for SOURCE_BY_PATH and git dates. */
export function translationFilePath(file: TranslationFile): string {
  const rel =
    file.kind === 'chapter'
      ? `${file.lang}/bok/${file.id}.md`
      : file.kind === 'pattern'
        ? `${file.lang}/patterns/${file.id}.md`
        : `${file.lang}/THESIS.md`;
  return resolve(i18nDir(), rel);
}
