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
import { join, dirname, resolve, relative } from 'node:path';
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

// The /diagrams/* pages are third-party archify viewers; their text is not our
// content, so we skip the whole subtree when linting.
function htmlFiles(dir, root = dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (relative(root, full) === 'diagrams') continue; // top-level dist/diagrams
      out.push(...htmlFiles(full, root));
    } else if (name.endsWith('.html')) out.push(full);
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

// House style: the site publishes no em dash (U+2014) at all, since the owner
// reads it as a tell of machine-written prose. Checks everything a reader or a
// search engine sees: visible text, attributes (alt, title, aria-label, meta
// content) and the JSON-LD graph. HTML comments, inline CSS and inline JS are
// skipped, because they are not published text.
function emDashes(file, raw) {
  const published = raw
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script(?![^>]*application\/ld\+json)[\s\S]*?<\/script>/gi, ' ');
  const out = [];
  const re = /—|&mdash;|&#8212;|&#x2014;/gi;
  let m;
  while ((m = re.exec(published)) !== null) {
    const start = Math.max(0, m.index - 50);
    const snippet = published.slice(start, m.index + 50).replace(/\s+/g, ' ').trim();
    out.push({ file, label: 'em dash', snippet });
  }
  return out;
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

// ── Version single-source check ──────────────────────────────────────────
// The canonical book version lives in site/src/data/site.ts (`bokVersion`).
// Any explicit "current version" statement in the front-matter files below must
// agree with it. bok/CHANGELOG.md is excluded on purpose (it records historical
// versions), and version *ranges* like `v0.1–v0.3` are not matched — only the
// lead-ins below, which mark a statement of the current version.
const REPO_ROOT = resolve(HERE, '..', '..');
const SITE_TS = resolve(HERE, '..', 'src', 'data', 'site.ts');
const VERSIONED_FILES = ['THESIS.md', 'README.md', 'bok/00-preface.md', 'OUTLINE.md'];

// Each regex captures (group 1) the version number of an explicit current-version claim.
const VERSION_CLAIMS = [
  /(?:This|It) is (?:\*\*)?v(?:ersion)? ?(\d+\.\d+(?:\.\d+)?)/g, // "This is v0.3.1" / "It is version 0.3.1"
  /^Version (\d+\.\d+(?:\.\d+)?) ·/gm, //                          "Version 0.3.1 · <date>"
  /Version (\d+\.\d+(?:\.\d+)?) was written/g, //                  "Version 0.1 was written by …"
  /\bv(\d+\.\d+(?:\.\d+)?)\. 20\d\d\./g, //                        how-to-cite "v0.3.1. 2026."
];

function readBokVersion() {
  try {
    const m = /bokVersion:\s*'([^']+)'/.exec(readFileSync(SITE_TS, 'utf8'));
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

// One violation per current-version statement that disagrees with bokVersion.
function versionMismatches() {
  const expected = readBokVersion();
  if (!expected) return [];
  const out = [];
  for (const rel of VERSIONED_FILES) {
    const full = join(REPO_ROOT, rel);
    if (!existsSync(full)) continue;
    const text = readFileSync(full, 'utf8');
    for (const base of VERSION_CLAIMS) {
      const regex = new RegExp(base.source, base.flags);
      let match;
      while ((match = regex.exec(text)) !== null) {
        if (match[1] !== expected) {
          out.push({
            file: full,
            label: 'version statement disagrees with bokVersion',
            snippet: `"${match[0].trim()}" states v${match[1]}, but site.ts bokVersion is ${expected}`,
          });
        }
        if (match[0].length === 0) regex.lastIndex++;
      }
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
  const versionIssues = versionMismatches();

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

    // House style: no em dash anywhere in the published page.
    structural.push(...emDashes(file, raw));

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

  if (violations.length || structural.length || versionIssues.length) {
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
    if (versionIssues.length) {
      console.error(`content-lint: ${versionIssues.length} version mismatch(es) found:\n`);
      for (const v of versionIssues) {
        console.error(`  ${v.file}`);
        console.error(`    [${v.label}] ${v.snippet}\n`);
      }
    }
    process.exit(1);
  }

  console.log(`content-lint: clean (${files.length} HTML file(s) scanned in ${targetDir}).`);
}

main();
