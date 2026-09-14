#!/usr/bin/env node
// content-lint: fail the build if any retracted or unverifiable claim, or any
// "looking for work"-style phrasing, leaks into the rendered site. Scans the
// built HTML (dist/**/*.html by default) because that is the one place that
// catches both the hand-written Astro pages and the Markdown chapters at once.
//
//   npm run lint:content            # scan ./dist
//   node scripts/content-lint.mjs <dir>
//
// False positives can be silenced by adding a substring to
// scripts/content-lint.allow (one per line); any match whose surrounding text
// contains an allowed substring is ignored.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const targetDir = resolve(process.cwd(), process.argv[2] ?? 'dist');
const allowFile = join(HERE, 'content-lint.allow');

function escapeRegExp(literal) {
  return literal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Literal phrases, matched case-insensitively.
const LITERALS = [
  '€47M',
  '47 million',
  '+340%',
  '340 percent',
  '4,000 AIGP',
  '4000 AIGP',
  '14,000 open',
  '14000 open',
  'IAPP 2026',
  'Telefónica',
  'Telefonica',
  'Bit2Me',
  'looking for work',
  'open to work',
  'job search',
  'seeking a role',
  'hire me',
  'Forrester Wave',
  'LiteLLM',
];

const PATTERNS = LITERALS.map((phrase) => ({
  label: phrase,
  regex: new RegExp(escapeRegExp(phrase), 'gi'),
}));

// "Spanish AI law" is only flagged when it is NOT qualified as a bill/draft/etc
// within the next 40 characters (so "the Spanish AI law bill" is allowed).
PATTERNS.push({
  label: 'Spanish AI law (unqualified)',
  regex: /Spanish AI law(?![\s\S]{0,40}(?:bill|draft|proposed|parliament))/gi,
});

function loadAllow() {
  if (!existsSync(allowFile)) return [];
  return readFileSync(allowFile, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => line.toLowerCase());
}

function htmlFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...htmlFiles(full));
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
}

// Strip tags and decode the handful of entities Astro emits, so phrases that
// sit in visible text are found even across inline markup.
function toText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#8364;|&euro;/gi, '€')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function countMatches(raw, regex) {
  const matches = raw.match(regex);
  return matches ? matches.length : 0;
}

// Every `href="#src-N"` in a document must have a matching `id="src-N"` in the
// same document. Returns one violation per dangling anchor.
function danglingSrcAnchors(file, raw) {
  const hrefs = new Set();
  let m;
  const hrefRe = /href="#(src-\d+)"/g;
  while ((m = hrefRe.exec(raw)) !== null) hrefs.add(m[1]);
  if (!hrefs.size) return [];

  const ids = new Set();
  const idRe = /id="(src-\d+)"/g;
  while ((m = idRe.exec(raw)) !== null) ids.add(m[1]);

  const out = [];
  for (const id of hrefs) {
    if (!ids.has(id)) {
      out.push({ file, label: 'dangling citation anchor', snippet: `href="#${id}" has no matching id="${id}"` });
    }
  }
  return out;
}

function main() {
  if (!existsSync(targetDir)) {
    console.error(`content-lint: directory not found: ${targetDir}`);
    console.error('Run `npm run build` first, or pass a directory to scan.');
    process.exit(1);
  }

  const allow = loadAllow();
  const files = htmlFiles(targetDir);
  const violations = [];
  const structural = [];

  let glossarySeen = false;
  let readingListSeen = false;

  for (const file of files) {
    const raw = readFileSync(file, 'utf8');
    const text = toText(raw);
    for (const { label, regex } of PATTERNS) {
      regex.lastIndex = 0;
      let match;
      while ((match = regex.exec(text)) !== null) {
        const start = Math.max(0, match.index - 40);
        const context = text.slice(start, match.index + match[0].length + 40);
        if (allow.some((needle) => context.toLowerCase().includes(needle))) continue;
        violations.push({ file, label, snippet: context.trim() });
        if (match[0].length === 0) regex.lastIndex++; // guard against zero-width
      }
    }

    // Structural: every citation link `href="#src-N"` must resolve to an
    // `id="src-N"` in the same document, or the footnote jump is dead.
    structural.push(...danglingSrcAnchors(file, raw));

    // Structural: the two resource landing pages must ship their full content.
    const rel = file.replace(/\\/g, '/');
    if (rel.endsWith('/resources/glossary.html')) {
      glossarySeen = true;
      const dt = countMatches(raw, /<dt[\s>]/g);
      if (dt < 50) {
        structural.push({ file, label: 'glossary too small', snippet: `${dt} <dt> found, expected >= 50` });
      }
    }
    if (rel.endsWith('/resources/reading-list.html')) {
      readingListSeen = true;
      const links = countMatches(raw, /data-reading-item/g);
      if (links < 30) {
        structural.push({ file, label: 'reading list too small', snippet: `${links} links found, expected >= 30` });
      }
    }
  }

  if (!glossarySeen) {
    structural.push({ file: join(targetDir, 'resources', 'glossary.html'), label: 'missing page', snippet: '/resources/glossary was not built' });
  }
  if (!readingListSeen) {
    structural.push({ file: join(targetDir, 'resources', 'reading-list.html'), label: 'missing page', snippet: '/resources/reading-list was not built' });
  }

  if (violations.length || structural.length) {
    if (violations.length) {
      console.error(`content-lint: ${violations.length} forbidden match(es) found:\n`);
      for (const v of violations) {
        console.error(`  ${v.file}`);
        console.error(`    [${v.label}] …${v.snippet}…\n`);
      }
    }
    if (structural.length) {
      console.error(`content-lint: ${structural.length} structural problem(s) found:\n`);
      for (const v of structural) {
        console.error(`  ${v.file}`);
        console.error(`    [${v.label}] ${v.snippet}\n`);
      }
    }
    process.exit(1);
  }

  console.log(`content-lint: clean (${files.length} HTML file(s) scanned in ${targetDir}).`);
}

main();
