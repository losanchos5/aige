// Paths, languages and defaults shared by the pipeline.

import { dirname, isAbsolute, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const TOOL_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const REPO = resolve(TOOL_DIR, '..', '..');

/** Target languages; English is the source and the reference. */
export const LANGS = ['es', 'fr', 'de', 'pt'];

/** How each target is written: the variant the prompt asks for. */
export const LANG_NAMES = {
  es: 'Spanish as written in Spain (es-ES)',
  fr: 'French as written in France (fr-FR)',
  de: 'German as written in Germany (de-DE)',
  pt: 'European Portuguese as written in Portugal (pt-PT), not Brazilian Portuguese',
};

/** The Spanish Thesis is the hand translation THESIS.es.md: never machine-translated. */
export const THESIS_LANGS = ['fr', 'de', 'pt'];

export const DEFAULT_MODEL = 'claude-haiku-4-5-20251001';

/** About this many source tokens go into one request. */
export const REQUEST_SOURCE_TOKENS = 3000;

/** Hard spend cap when --max-usd is not given. */
export const DEFAULT_MAX_USD = 1;

function fromEnv(env, name, fallback) {
  const v = env[name];
  if (!v) return fallback;
  return isAbsolute(v) ? v : resolve(process.cwd(), v);
}

/**
 * Where things live. I18N_DIR holds the translated Markdown and the translation
 * memory (default <repo>/i18n); I18N_UI_DIR the ui.<lang>.json files (default
 * site/src/i18n, or <I18N_DIR>/ui when I18N_DIR is set and I18N_UI_DIR is not,
 * so a scratch run never writes into the site).
 */
export function resolveDirs(env = process.env) {
  const i18nSet = !!env.I18N_DIR;
  const i18nDir = i18nSet ? fromEnv(env, 'I18N_DIR') : resolve(REPO, 'i18n');
  const uiDir = env.I18N_UI_DIR ? fromEnv(env, 'I18N_UI_DIR') : i18nSet ? resolve(i18nDir, 'ui') : resolve(REPO, 'site', 'src', 'i18n');
  return {
    repo: REPO,
    // The English sources; tests may point this at a fixture tree.
    sourceRoot: env.I18N_SOURCE_ROOT ? fromEnv(env, 'I18N_SOURCE_ROOT') : REPO,
    i18nDir,
    i18nDirIsDefault: !i18nSet,
    uiDir,
    tmDir: resolve(i18nDir, '.tm'),
    glossary: env.I18N_GLOSSARY ? fromEnv(env, 'I18N_GLOSSARY') : resolve(REPO, 'i18n', 'glossary-lock.json'),
    callouts: env.I18N_CALLOUTS ? fromEnv(env, 'I18N_CALLOUTS') : resolve(REPO, 'site', 'src', 'i18n', 'callouts.json'),
  };
}
