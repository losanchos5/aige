// ui.ts: the site chrome's strings (header, navigation group labels, footer,
// breadcrumbs, the chapter furniture, the cite box, the pager, the search
// dialog, the translation notice and the language switcher).
//
// ui.en.json is the source: a flat key -> string map, the only file a developer
// edits. The translation pipeline writes ui.<lang>.json next to it, one per
// language, with the same keys; a missing file or key falls back to English, so
// an untranslated language renders English chrome and never breaks the build.
// A value may carry `{name}` placeholders, which `t()` fills; a translation must
// keep exactly the placeholders of its English value or the build fails.
//
// A few strings were translated by hand before the pipeline existed (the
// Spanish meta line of /es/thesis). They sit in HAND below and win over the
// machine file, the same way the hand-translated Thesis wins over a machine one.
//
// The translated files are read from disk at build time, from the one folder the
// translation pipeline writes them to (uiDir below): I18N_UI_DIR when it is set,
// else <I18N_DIR>/ui when I18N_DIR is set (a scratch or fixture run keeps its UI
// strings beside its Markdown), else site/src/i18n, where the workflow commits
// them. Paths resolve from the build cwd (site/), like the diagram assets,
// because this module also runs bundled into dist chunks.
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { DEFAULT_LOCALE, LOCALE_INFO, isLocale, type Locale } from './locales';

export type UiKey = keyof typeof import('./ui.en.json');
export type UiStrings = Record<string, string>;

// Read, not imported: the Playwright tests load this module under Node's own
// ESM loader, which does not import JSON without an import attribute.
const EN: UiStrings = JSON.parse(
  readFileSync(resolve(process.cwd(), 'src/i18n/ui.en.json'), 'utf8'),
) as UiStrings;

/** Hand translations that predate the pipeline; they win over ui.<lang>.json. */
const HAND: Partial<Record<Locale, UiStrings>> = {
  es: {
    'chapter.updated': 'Actualizado',
    'chapter.minRead': 'min de lectura',
    'chapter.words': 'palabras',
  },
};

/** The `{name}` placeholders of a string, sorted, for comparison. */
export function placeholders(value: string): string[] {
  return [...value.matchAll(/\{([a-zA-Z]+)\}/g)].map((match) => match[1]).sort();
}

/**
 * Problems with one translated UI file against the English source: a value that
 * is not a string, a placeholder added or lost, an em dash. Unknown keys are
 * reported too (a stale key the English file no longer has). Empty when clean.
 */
export function uiProblems(strings: unknown, source: UiStrings = EN): string[] {
  if (!strings || typeof strings !== 'object' || Array.isArray(strings)) {
    return ['not a flat JSON object of strings'];
  }
  const problems: string[] = [];
  for (const [key, value] of Object.entries(strings as Record<string, unknown>)) {
    if (!(key in source)) {
      problems.push(`"${key}" is not a key of ui.en.json`);
      continue;
    }
    if (typeof value !== 'string') {
      problems.push(`"${key}" is not a string`);
      continue;
    }
    const want = placeholders(source[key]).join(',');
    const got = placeholders(value).join(',');
    if (want !== got) problems.push(`"${key}" has placeholders {${got}}, English has {${want}}`);
    if (value.includes('\u2014')) problems.push(`"${key}" contains an em dash`);
  }
  return problems;
}

/**
 * The folder holding ui.<lang>.json. The same rule as the translation pipeline
 * (tools/i18n/lib/config.mjs, resolveDirs) and scripts/content-lint.mjs, so a
 * build finds the strings wherever a run with the same variables wrote them.
 */
export function uiDir(): string {
  const { I18N_UI_DIR: ui, I18N_DIR: dir } = process.env;
  if (ui) return resolve(process.cwd(), ui);
  if (dir) return resolve(process.cwd(), dir, 'ui');
  return resolve(process.cwd(), 'src/i18n');
}

const cache = new Map<Locale, UiStrings>();

/** The machine-translated strings of `lang` (empty when there is no file). */
function machineStrings(lang: Locale): UiStrings {
  const cached = cache.get(lang);
  if (cached) return cached;
  let strings: UiStrings = {};
  const file = resolve(uiDir(), `ui.${lang}.json`);
  if (lang !== DEFAULT_LOCALE && existsSync(file)) {
    const parsed: unknown = JSON.parse(readFileSync(file, 'utf8'));
    const problems = uiProblems(parsed);
    if (problems.length > 0) {
      throw new Error(`i18n: ${file} does not match ui.en.json:\n  ${problems.join('\n  ')}`);
    }
    strings = parsed as UiStrings;
  }
  cache.set(lang, strings);
  return strings;
}

/** True when `lang` has any UI string of its own (a machine file or hand strings). */
export function hasUiStrings(lang: string): boolean {
  if (!isLocale(lang) || lang === DEFAULT_LOCALE) return false;
  return Object.keys(machineStrings(lang)).length > 0 || HAND[lang] !== undefined;
}

/**
 * The string `key` in `lang`: the hand translation, else the machine one, else
 * English. `vars` fill the `{name}` placeholders. An unknown language renders
 * English.
 */
export function t(key: UiKey, lang: string = DEFAULT_LOCALE, vars?: Record<string, string | number>): string {
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const value =
    (locale === DEFAULT_LOCALE ? undefined : (HAND[locale]?.[key] ?? machineStrings(locale)[key])) ??
    EN[key];
  if (value === undefined) throw new Error(`i18n: unknown UI key "${key}"`);
  if (!vars) return value;
  return value.replace(/\{([a-zA-Z]+)\}/g, (whole, name: string) =>
    name in vars ? String(vars[name]) : whole,
  );
}

/** A `t` bound to one language, for components that call it many times. */
export function translator(lang: string = DEFAULT_LOCALE) {
  return (key: UiKey, vars?: Record<string, string | number>) => t(key, lang, vars);
}

/** The BCP 47 tag used to format numbers for `lang`. */
export function intlLocale(lang: string = DEFAULT_LOCALE): string {
  return LOCALE_INFO[isLocale(lang) ? lang : DEFAULT_LOCALE].intl;
}
