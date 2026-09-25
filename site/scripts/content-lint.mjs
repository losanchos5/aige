#!/usr/bin/env node
// content-lint: fail the build if any retracted or unverifiable claim, or any
// "looking for work"-style phrasing, leaks into the rendered site. Scans the
// built HTML (dist/**/*.html by default) because that is the one place that
// catches both the hand-written Astro pages and the Markdown chapters at once.
// The em-dash rule and the forbidden phrases also run over every other text
// file the site publishes (dist/**/*.svg, .json, .csv, .txt, .xml, .md: the
// data exports, the feeds, llms.txt, the schemas and templates, the figure
// downloads) and over the text chunks of the PNG figure downloads, because a
// reader or a crawler reads those too.
//
//   npm run lint:content            # scan ./dist
//   node scripts/content-lint.mjs <dir>
//
// Translations (openspec/changes/i18n-site-rendering): the translated Markdown
// in I18N_DIR (default <repo>/i18n) and the UI strings (site/src/i18n/ui.*.json,
// or I18N_UI_DIR) get the same em-dash and phrase rules, and every translated
// page in dist (/es|fr|de|pt/..., except the hand-translated /es/thesis) must
// carry its language, the machine-translation notice, a self canonical and
// hreflang alternates naming itself, English and x-default.
//
// False positives can be silenced by adding a substring to
// scripts/content-lint.allow (one per line); any match whose surrounding text
// contains an allowed substring is ignored.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve, relative, sep } from 'node:path';
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

// Every other published text file: data exports, feeds, llms.txt, schemas,
// templates and the figure downloads. The archify viewers (dist/diagrams) are
// third-party, and the search index (dist/pagefind) is generated from the HTML
// already scanned, so both are skipped.
const TEXT_EXT = /\.(svg|json|csv|txt|xml|md)$/i;
function publishedFiles(dir, root = dir) {
  const text = [];
  const png = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      const rel = relative(root, full);
      if (rel === 'diagrams' || rel === 'pagefind') continue;
      const inner = publishedFiles(full, root);
      text.push(...inner.text);
      png.push(...inner.png);
    } else if (TEXT_EXT.test(name)) text.push(full);
    else if (name.endsWith('.png') && relative(root, full).split(sep).join('/').startsWith('downloads/')) {
      png.push(full);
    }
  }
  return { text, png };
}

// The tEXt/iTXt chunks of a PNG (the figure downloads carry title, author,
// description and licence there), joined as plain text.
function pngText(buf) {
  const out = [];
  let at = 8;
  while (at + 8 <= buf.length) {
    const length = buf.readUInt32BE(at);
    const type = buf.toString('latin1', at + 4, at + 8);
    const data = buf.subarray(at + 8, at + 8 + length);
    if (type === 'tEXt') out.push(data.toString('latin1').split(String.fromCharCode(0)).join(': '));
    if (type === 'iTXt') {
      const key = data.subarray(0, data.indexOf(0)).toString('latin1');
      // keyword NUL, compression flag, method, language NUL, translated NUL, text
      let i = data.indexOf(0) + 3;
      i = data.indexOf(0, i) + 1;
      i = data.indexOf(0, i) + 1;
      if (data[data.indexOf(0) + 1] === 0) out.push(`${key}: ${data.subarray(i).toString('utf8')}`);
    }
    if (type === 'IEND') break;
    at += 12 + length;
  }
  return out.join(' ');
}

// Visible text of a non-HTML file for the phrase rules (an SVG's tags go).
function fileText(file, raw) {
  const body = file.toLowerCase().endsWith('.svg') ? raw.replace(/<[^>]+>/g, ' ') : raw;
  return body.replace(/\s+/g, ' ');
}

// Any em dash in a published non-HTML file, literal or as a JSON/CSS escape.
function emDashesIn(file, raw) {
  const out = [];
  const re = /\u2014|\\u2014|&mdash;|&#8212;|&#x2014;/gi;
  let m;
  while ((m = re.exec(raw)) !== null) {
    const start = Math.max(0, m.index - 50);
    const snippet = raw.slice(start, m.index + 50).replace(/\s+/g, ' ').trim();
    out.push({ file, label: 'em dash', snippet });
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
  const re = /\u2014|&mdash;|&#8212;|&#x2014;/gi;
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
// versions), and version *ranges* like `v0.1–v0.3` are not matched, only the
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

// ── Translations ─────────────────────────────────────────────────────────
const TRANSLATED = ['es', 'fr', 'de', 'pt'];
const SITE_URL = 'https://aigovernanceengineer.com';
const I18N_DIR = process.env.I18N_DIR
  ? resolve(process.cwd(), process.env.I18N_DIR)
  : resolve(REPO_ROOT, 'i18n');
const UI_DIR = resolve(process.cwd(), process.env.I18N_UI_DIR ?? 'src/i18n');

/** The translation sources: <lang>/**.md under I18N_DIR and ui.*.json. */
function translationSources() {
  const out = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      if (name.startsWith('.')) continue; // the translation memory (.tm/)
      const full = join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (name.endsWith('.md')) out.push(full);
    }
  };
  for (const lang of TRANSLATED) {
    const dir = join(I18N_DIR, lang);
    if (existsSync(dir)) walk(dir);
  }
  if (existsSync(UI_DIR)) {
    for (const name of readdirSync(UI_DIR)) {
      if (/^ui\.[a-z]{2}\.json$/.test(name)) out.push(join(UI_DIR, name));
    }
  }
  return out;
}

const attr = (tag, name) => new RegExp(`\\b${name}="([^"]*)"`).exec(tag)?.[1];

/** The contract every translated page in dist keeps (HTML, one file). */
function translatedPageProblems(file, raw) {
  const rel = relative(targetDir, file).split(sep).join('/');
  const path = `/${rel.replace(/\.html$/, '')}`; // /es/bok/x, /es/bok, /es
  const lang = path.split('/')[1];
  if (!TRANSLATED.includes(lang) || path === '/es/thesis') return [];
  const out = [];
  const htmlLang = /<html[^>]*\blang="([^"]+)"/.exec(raw)?.[1];
  if (htmlLang !== lang) out.push(`<html lang="${htmlLang}"> on a /${lang}/ page`);
  const canonical = /<link rel="canonical" href="([^"]+)"/.exec(raw)?.[1];
  if (canonical !== `${SITE_URL}${path}`) out.push(`canonical ${canonical} is not ${SITE_URL}${path}`);
  // The landing /<lang> is not a translation of one page: no notice, no alternates.
  if (path === `/${lang}`) return out.map((snippet) => ({ file, label: 'translated page', snippet }));
  const alternates = [...raw.matchAll(/<link rel="alternate" hreflang="[^"]*"[^>]*>/g)].map((m) => ({
    hreflang: attr(m[0], 'hreflang'),
    href: attr(m[0], 'href'),
  }));
  for (const want of [lang, 'en', 'x-default']) {
    if (!alternates.some((alt) => alt.hreflang === want)) out.push(`no hreflang="${want}" alternate`);
  }
  const self = alternates.find((alt) => alt.hreflang === lang);
  if (self && self.href !== `${SITE_URL}${path}`) out.push(`hreflang="${lang}" points to ${self.href}`);
  // The index (/<lang>/bok) is chrome, not a translation of text: no notice.
  if (path !== `/${lang}/bok` && !raw.includes('data-i18n-notice')) {
    out.push('no machine-translation notice (data-i18n-notice)');
  }
  return out.map((snippet) => ({ file, label: 'translated page', snippet }));
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

    // A translated page keeps its language, notice, canonical and alternates.
    structural.push(...translatedPageProblems(file, raw));

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

  // Every other published text file, and the PNG downloads' text chunks, and
  // the translation sources (Markdown and UI strings) the pages are built from.
  const published = publishedFiles(targetDir);
  const sources = translationSources();
  const others = [
    ...published.text.map((file) => [file, readFileSync(file, 'utf8')]),
    ...published.png.map((file) => [file, pngText(readFileSync(file))]),
    ...sources.map((file) => [file, readFileSync(file, 'utf8')]),
  ];
  for (const [file, raw] of others) {
    structural.push(...emDashesIn(file, raw));
    const text = fileText(file, raw);
    for (const { label, regex } of PATTERNS) {
      regex.lastIndex = 0;
      let match;
      while ((match = regex.exec(text)) !== null) {
        const start = Math.max(0, match.index - 40);
        const context = text.slice(start, match.index + match[0].length + 40);
        if (allow.some((needle) => context.toLowerCase().includes(needle))) continue;
        violations.push({ file, label, snippet: context.trim() });
        if (match[0].length === 0) regex.lastIndex++;
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

  console.log(
    `content-lint: clean (${files.length} HTML file(s), ${published.text.length} other text file(s) and ` +
      `${published.png.length} PNG download(s) scanned in ${targetDir}; ` +
      `${sources.length} translation source(s) in ${I18N_DIR} and ${UI_DIR}).`,
  );
}

main();
