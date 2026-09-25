// locales.ts: the site's languages. English is the default and the reference:
// its pages carry no prefix (/bok/<slug>); every other language lives under
// /<lang>/ and only where a translation exists (see lib/i18n-content.ts). The
// order here is the order of the hreflang alternates and of the language
// switcher, and it matches `i18n.locales` in astro.config.ts.

export const DEFAULT_LOCALE = 'en' as const;

export const LOCALES = ['en', 'es', 'fr', 'de', 'pt'] as const;
export type Locale = (typeof LOCALES)[number];

/** The languages a translation can be written in (every locale but English). */
export const TRANSLATED_LOCALES = ['es', 'fr', 'de', 'pt'] as const;
export type TranslatedLocale = (typeof TRANSLATED_LOCALES)[number];

/**
 * The languages that get a machine translation of the Thesis. Spanish is not
 * one of them: /es/thesis is the hand translation (THESIS.es.md), which the
 * pipeline never overwrites and the site always serves.
 */
export const MACHINE_THESIS_LOCALES = ['fr', 'de', 'pt'] as const;

export interface LocaleInfo {
  /** The language's name in the language itself, for the switcher. */
  autonym: string;
  /** Open Graph locale. Portuguese is European Portuguese, like the EU texts it cites. */
  og: string;
  /** BCP 47 tag for Intl formatting (numbers in the chapter meta line). */
  intl: string;
}

export const LOCALE_INFO: Record<Locale, LocaleInfo> = {
  en: { autonym: 'English', og: 'en_US', intl: 'en-US' },
  es: { autonym: 'Español', og: 'es_ES', intl: 'es-ES' },
  fr: { autonym: 'Français', og: 'fr_FR', intl: 'fr-FR' },
  de: { autonym: 'Deutsch', og: 'de_DE', intl: 'de-DE' },
  pt: { autonym: 'Português', og: 'pt_PT', intl: 'pt-PT' },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

export function isTranslatedLocale(value: unknown): value is TranslatedLocale {
  return typeof value === 'string' && (TRANSLATED_LOCALES as readonly string[]).includes(value);
}

/** The locale of a page from its path: `/de/bok/x` is `de`, `/bok/x` is `en`. */
export function localeOfPath(pathname: string): Locale {
  const first = pathname.split('/')[1] ?? '';
  return isTranslatedLocale(first) ? first : DEFAULT_LOCALE;
}

/** A path without its language prefix: `/de/bok/x` is `/bok/x`, `/de` is `/`. */
export function stripLocale(pathname: string): string {
  const lang = localeOfPath(pathname);
  if (lang === DEFAULT_LOCALE) return pathname;
  const rest = pathname.slice(lang.length + 1);
  return rest === '' ? '/' : rest;
}
