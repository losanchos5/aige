// callouts.ts: the callout labels a translation may use.
//
// A chapter's callouts are blockquotes led by a bold English label
// (`> **In practice**`, `> **Example (illustrative)**`, `> **Anti-pattern**`,
// `> **Note**`, ...), and a "Maps to" line is a paragraph led by `**Maps to:**`
// (lib/remark-callouts.ts). callouts.json maps each English label to the label
// every other language uses; the translation pipeline swaps the label with it,
// and this module teaches remark-lead and remark-callouts to recognise the
// swapped label in a file of that language. A label missing from the map stays
// in English in the translation, and English is always recognised.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { TranslatedLocale } from './locales';

export type CalloutMap = Record<string, Partial<Record<TranslatedLocale, string>>>;

let cache: CalloutMap | undefined;

/** callouts.json: English label -> per-language label. Read once, from site/. */
export function calloutMap(): CalloutMap {
  cache ??= JSON.parse(
    readFileSync(resolve(process.cwd(), 'src/i18n/callouts.json'), 'utf8'),
  ) as CalloutMap;
  return cache;
}

/**
 * Straight quotes for curly ones. Smartypants has already curled the text of a
 * rendered label ("Offres d’emploi (note).") while callouts.json keeps the
 * straight apostrophe the pipeline writes, so both sides are compared straight.
 */
function straightQuotes(text: string): string {
  return text.replace(/[\u2018\u2019\u201B\u2032]/g, "'").replace(/[\u201C\u201D\u201E\u2033]/g, '"');
}

/** Lower-cased, straight-quoted, without a trailing colon or full stop, for prefix matching. */
function key(label: string): string {
  return straightQuotes(label)
    .trim()
    .replace(/[\s:.]+$/, '')
    .toLowerCase();
}

/**
 * The English label a translated `label` stands for, when it starts with one of
 * `lang`'s mapped labels (longest first, so "Beispiel (illustrativ)" wins over
 * "Beispiel"). Undefined when nothing matches.
 */
export function englishLabelFor(label: string, lang: TranslatedLocale): string | undefined {
  const text = straightQuotes(label).trim().toLowerCase();
  const candidates = Object.entries(calloutMap())
    .map(([english, langs]) => [english, langs[lang]] as const)
    .filter((pair): pair is readonly [string, string] => typeof pair[1] === 'string')
    .sort((a, b) => b[1].length - a[1].length);
  for (const [english, translated] of candidates) {
    const want = key(translated);
    if (want && text.startsWith(want)) return english;
  }
  return undefined;
}
