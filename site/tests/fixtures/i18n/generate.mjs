#!/usr/bin/env node
// Pseudo-localisation fixtures for the i18n site rendering (tests/i18n.spec.ts).
//
// Writes a tiny translation tree that obeys the translation contract
// (openspec/changes/i18n-site-rendering) into <outDir>, so the site can be built
// with I18N_DIR=<outDir> without any API call:
//
//   <outDir>/<lang>/bok/<chapter-id>.md     two chapters, es and de
//   <outDir>/<lang>/patterns/<slug>.md      one pattern, es and de
//   <outDir>/de/THESIS.md                   the Thesis, de only (fr/de/pt get one)
//   <outDir>/ui/ui.<lang>.json              the UI strings (read from <I18N_DIR>/ui)
//   <outDir>/FIXTURE.json                   what was generated, for the tests
//
// "Translation" is pseudo-localisation: the vowels of the prose are accented
// (es: á é í ó ú, de: ä ö ü), which changes every heading slug and makes the
// language visible, while the structure stays one to one with the English
// source: the same headings, lists, tables and [n] markers, link targets and
// code untouched, the "## Sources" section verbatim, callout labels swapped
// through site/src/i18n/callouts.json. No em dash is ever written.
//
//   node tests/fixtures/i18n/generate.mjs <outDir>
//
// Paths resolve from this file, so it runs from any directory.
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SITE = resolve(HERE, '..', '..', '..');
const REPO = resolve(SITE, '..');

/** What the fixture translates; also written to <outDir>/FIXTURE.json. */
export const FIXTURE = {
  langs: ['es', 'de'],
  chapters: ['03-values-principles', '12-governance-program'],
  patterns: ['sanctioned-ai-gateway'],
  thesis: ['de'],
  model: 'pseudo-fixture',
  translatedAt: '2026-09-25',
};

const VOWELS = {
  es: { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú', A: 'Á', E: 'É', I: 'Í', O: 'Ó', U: 'Ú' },
  de: { a: 'ä', o: 'ö', u: 'ü', A: 'Ä', O: 'Ö', U: 'Ü' },
};

const callouts = JSON.parse(readFileSync(join(SITE, 'src', 'i18n', 'callouts.json'), 'utf8'));

const escapeRe = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Longest label first, so "In practice (illustrative)" wins over "In practice".
const labelKeys = Object.keys(callouts).sort((a, b) => b.length - a.length);
const LABEL_RE = labelKeys.map((key) => `\\*\\*${escapeRe(key)}\\*\\*`).join('|');

// Spans that are never translated: callout labels (swapped instead), inline
// code, link targets, bare URLs, autolinks and raw tags, [n] markers, HTML
// entities and {placeholders}.
const PROTECTED = new RegExp(
  [
    LABEL_RE,
    '`[^`]*`',
    '\\]\\((?:[^()]|\\([^()]*\\))*\\)',
    'https?:\\/\\/[^\\s)>\\]]+',
    '<[^>\\n]+>',
    '\\[\\d+(?:\\s*[,–-]\\s*\\d+)*\\]',
    '&[a-zA-Z#0-9]+;',
    '\\{[a-zA-Z]+\\}',
  ].join('|'),
  'g',
);

function accent(text, lang) {
  const map = VOWELS[lang];
  return text.replace(/[aeiouAEIOU]/g, (ch) => map[ch] ?? ch);
}

/** Pseudo-translate one line of prose, leaving the protected spans alone. */
export function translateLine(line, lang) {
  let out = '';
  let last = 0;
  for (const match of line.matchAll(PROTECTED)) {
    out += accent(line.slice(last, match.index), lang);
    const span = match[0];
    const label = span.startsWith('**') && span.endsWith('**') ? span.slice(2, -2) : undefined;
    out += label && callouts[label] ? `**${callouts[label][lang]}**` : span;
    last = match.index + span.length;
  }
  return out + accent(line.slice(last), lang);
}

/** Pseudo-translate a Markdown body (no frontmatter). */
function translateBody(body, lang) {
  const out = [];
  let fenced = false;
  let sources = false;
  for (const line of body.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      fenced = !fenced;
      out.push(line);
      continue;
    }
    if (!fenced && /^## Sources\s*$/.test(line)) sources = true;
    if (fenced || sources || /^\s*\[[^\]]+\]:\s*\S/.test(line)) {
      out.push(line);
      continue;
    }
    out.push(translateLine(line, lang));
  }
  return out.join('\n');
}

const lf = (text) => text.replace(/\r\n?/g, '\n');
const sha256 = (text) => createHash('sha256').update(lf(text), 'utf8').digest('hex');

/** Split `---\n...\n---\n` frontmatter off a Markdown file. */
function splitFrontmatter(text) {
  const match = /^---\n([\s\S]*?)\n---\n/.exec(text);
  if (!match) return { fields: [], body: text };
  const fields = match[1]
    .split('\n')
    .map((line) => /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line))
    .filter(Boolean)
    .map(([, key, value]) => [key, value]);
  return { fields, body: text.slice(match[0].length) };
}

function unquote(value) {
  if (value.startsWith('"')) return JSON.parse(value);
  if (value.startsWith("'")) return value.slice(1, -1).replace(/''/g, "'");
  return value;
}

function frontmatter(meta, extra = []) {
  const lines = [
    `lang: ${meta.lang}`,
    `source: ${meta.source}`,
    `sourceHash: ${meta.sourceHash}`,
    `translatedBy: ${JSON.stringify(`machine: ${FIXTURE.model}`)}`,
    `translatedAt: ${FIXTURE.translatedAt}`,
    ...extra,
  ];
  return `---\n${lines.join('\n')}\n---\n\n`;
}

function write(outDir, rel, text) {
  const full = join(outDir, rel);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, text, 'utf8');
}

function translateFile(outDir, lang, sourceRel, targetRel, translatable = []) {
  const english = lf(readFileSync(join(REPO, sourceRel), 'utf8'));
  const { fields, body } = splitFrontmatter(english);
  const extra = fields.map(([key, value]) =>
    translatable.includes(key)
      ? `${key}: ${JSON.stringify(accent(unquote(value), lang))}`
      : `${key}: ${value}`,
  );
  const meta = { lang, source: sourceRel, sourceHash: sha256(english) };
  write(outDir, targetRel, frontmatter(meta, extra) + translateBody(body.replace(/^\n+/, ''), lang));
}

export function generate(outDir) {
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  const ui = JSON.parse(readFileSync(join(SITE, 'src', 'i18n', 'ui.en.json'), 'utf8'));
  for (const lang of FIXTURE.langs) {
    for (const id of FIXTURE.chapters) {
      translateFile(outDir, lang, `bok/${id}.md`, `${lang}/bok/${id}.md`);
    }
    for (const slug of FIXTURE.patterns) {
      translateFile(outDir, lang, `bok/patterns/${slug}.md`, `${lang}/patterns/${slug}.md`, [
        'title',
        'summary',
      ]);
    }
    if (FIXTURE.thesis.includes(lang)) translateFile(outDir, lang, 'THESIS.md', `${lang}/THESIS.md`);
    const strings = Object.fromEntries(
      Object.entries(ui).map(([key, value]) => [key, translateLine(value, lang)]),
    );
    write(outDir, `ui/ui.${lang}.json`, `${JSON.stringify(strings, null, 2)}\n`);
  }
  write(outDir, 'FIXTURE.json', `${JSON.stringify(FIXTURE, null, 2)}\n`);
  return outDir;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const outDir = process.argv[2];
  if (!outDir) {
    console.error('usage: node tests/fixtures/i18n/generate.mjs <outDir>');
    process.exit(2);
  }
  generate(resolve(outDir));
  console.log(`i18n fixtures: written to ${resolve(outDir)}`);
}
