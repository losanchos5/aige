// Source documents (the English files the contract names), their segments,
// where each translation goes, and how a translated file is rendered.

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { THESIS_LANGS } from './config.mjs';
import { formatScalar, renderFrontmatter, splitFrontmatter } from './frontmatter.mjs';
import { localizedLabels, parseMarkdown, renderMarkdown, structureSignature } from './markdown.mjs';
import { EM_DASH, sourceHash } from './segment.mjs';

/** Frontmatter fields whose values are prose a reader sees. */
const TRANSLATABLE_FIELDS = new Set(['title', 'summary']);
/** The fields the contract adds to every translated Markdown file, in order. */
const CONTRACT_FIELDS = ['lang', 'source', 'sourceHash', 'translatedBy', 'translatedAt'];

/**
 * The English sources, repo-relative:
 *   bok/00-*.md .. bok/23-*.md, bok/patterns/*.md, THESIS.md, site/src/i18n/ui.en.json (when present).
 */
export function discoverSources(root) {
  const out = [];
  const bokDir = join(root, 'bok');
  if (existsSync(bokDir)) {
    for (const f of readdirSync(bokDir).sort()) {
      const m = /^(\d{2})-[a-z0-9-]+\.md$/.exec(f);
      if (m && Number(m[1]) <= 23) out.push({ rel: `bok/${f}`, kind: 'bok', id: f.slice(0, -3) });
    }
  }
  const patDir = join(root, 'bok', 'patterns');
  if (existsSync(patDir)) {
    for (const f of readdirSync(patDir).sort()) {
      if (/^[a-z0-9-]+\.md$/.test(f)) out.push({ rel: `bok/patterns/${f}`, kind: 'pattern', id: f.slice(0, -3) });
    }
  }
  if (existsSync(join(root, 'THESIS.md'))) out.push({ rel: 'THESIS.md', kind: 'thesis', id: 'THESIS' });
  if (existsSync(join(root, 'site', 'src', 'i18n', 'ui.en.json'))) out.push({ rel: 'site/src/i18n/ui.en.json', kind: 'ui', id: 'ui' });
  return out;
}

/** Does this source get a translation in this language? */
export function appliesTo(src, lang) {
  return src.kind !== 'thesis' || THESIS_LANGS.includes(lang);
}

/** Where the translation of a source goes. */
export function outputPath(src, lang, dirs) {
  switch (src.kind) {
    case 'bok':
      return join(dirs.i18nDir, lang, 'bok', `${src.id}.md`);
    case 'pattern':
      return join(dirs.i18nDir, lang, 'patterns', `${src.id}.md`);
    case 'thesis':
      return join(dirs.i18nDir, lang, 'THESIS.md');
    case 'ui':
      return join(dirs.uiDir, `ui.${lang}.json`);
    default:
      throw new Error(`unknown source kind ${src.kind}`);
  }
}

/**
 * Load a source: its text (LF), hash and segments.
 * Segments: { kind, source, n, ... } in document order (frontmatter fields first).
 */
export function loadSource(src, root) {
  const text = readFileSync(join(root, src.rel), 'utf8').replace(/\r\n?/g, '\n');
  const hash = sourceHash(text);
  if (src.kind === 'ui') {
    const data = JSON.parse(text);
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error(`${src.rel}: expected a flat object of key -> string`);
    const entries = Object.entries(data);
    for (const [k, v] of entries) if (typeof v !== 'string') throw new Error(`${src.rel}: ${k} is not a string (the map must be flat)`);
    const segments = entries.filter(([, v]) => v.trim() !== '').map(([key, v]) => ({ kind: 'ui', source: v, key }));
    return { src, text, hash, ui: entries, segments };
  }
  const { frontmatter, body } = splitFrontmatter(text);
  const parsed = parseMarkdown(body, { file: src.rel });
  const fmSegments = (frontmatter ?? [])
    .filter((f) => TRANSLATABLE_FIELDS.has(f.key) && String(f.value).trim() !== '')
    .map((f) => ({ kind: `fm:${f.key}`, source: String(f.value), field: f.key }));
  return { src, text, hash, frontmatter, parsed, segments: [...fmSegments, ...parsed.segments] };
}

/** The sourceHash recorded in an existing translation, if any. */
export function existingHash(path) {
  if (!existsSync(path)) return null;
  const text = readFileSync(path, 'utf8').replace(/\r\n?/g, '\n');
  try {
    const { frontmatter } = splitFrontmatter(text);
    return frontmatter?.find((f) => f.key === 'sourceHash')?.value ?? null;
  } catch {
    return null;
  }
}

/**
 * Render a translated document.
 * @param tr (seg) => translated inline Markdown, or undefined to keep the English
 * @param labelMap (label) => localized "**label**", or undefined
 */
export function renderTranslation(doc, lang, tr, { model, date, labelMap }) {
  if (doc.src.kind === 'ui') {
    const out = {};
    const bySource = new Map(doc.segments.map((s) => [s.key, s]));
    for (const [k, v] of doc.ui) {
      const seg = bySource.get(k);
      out[k] = seg ? (tr(seg) ?? v) : v;
    }
    const json = JSON.stringify(out, null, 2) + '\n';
    if (json.includes(EM_DASH)) throw new Error(`${doc.src.rel} (${lang}): em dash in the output`);
    return json;
  }
  const fields = [
    { key: 'lang', value: lang },
    { key: 'source', value: doc.src.rel },
    { key: 'sourceHash', value: doc.hash, raw: JSON.stringify(doc.hash) },
    { key: 'translatedBy', value: `machine: ${model}`, raw: JSON.stringify(`machine: ${model}`) },
    { key: 'translatedAt', value: date, raw: JSON.stringify(date) },
  ];
  for (const f of doc.frontmatter ?? []) {
    if (CONTRACT_FIELDS.includes(f.key)) continue;
    const seg = doc.segments.find((s) => s.field === f.key);
    const t = seg ? tr(seg) : undefined;
    fields.push(t !== undefined && t !== f.value ? { key: f.key, value: t, raw: formatScalar(t) } : f);
  }
  const body = renderMarkdown(doc.parsed, (seg) => tr(seg), labelMap);
  const out = renderFrontmatter(fields) + body;
  // The structure must survive one to one: same headings, lists, tables, code,
  // callout and "Maps to" labels. The output is parsed back knowing the
  // localized labels this render put in (and only those), so a label that
  // callouts.json translated still counts as a label, like its English source.
  const labels = localizedLabels(doc.parsed.blocks, labelMap);
  const again = parseMarkdown(body, { file: `${doc.src.rel} (${lang})`, labels });
  const a = structureSignature(doc.parsed.blocks);
  const b = structureSignature(again.blocks);
  if (a.length !== b.length || a.some((x, i) => x !== b[i])) {
    const k = a.findIndex((x, i) => x !== b[i]);
    throw new Error(`${doc.src.rel} (${lang}): structure changed at block ${k}: ${a[k]} became ${b[k]}`);
  }
  if (out.includes(EM_DASH)) throw new Error(`${doc.src.rel} (${lang}): em dash in the output`);
  return out;
}
