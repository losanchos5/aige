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

function main() {
  if (!existsSync(targetDir)) {
    console.error(`content-lint: directory not found: ${targetDir}`);
    console.error('Run `npm run build` first, or pass a directory to scan.');
    process.exit(1);
  }

  const allow = loadAllow();
  const files = htmlFiles(targetDir);
  const violations = [];

  for (const file of files) {
    const text = toText(readFileSync(file, 'utf8'));
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
  }

  if (violations.length) {
    console.error(`content-lint: ${violations.length} forbidden match(es) found:\n`);
    for (const v of violations) {
      console.error(`  ${v.file}`);
      console.error(`    [${v.label}] …${v.snippet}…\n`);
    }
    process.exit(1);
  }

  console.log(`content-lint: clean (${files.length} HTML file(s) scanned in ${targetDir}).`);
}

main();
