#!/usr/bin/env node
// check-links: fail the build if any internal link is dead. Parses every built
// HTML file (dist/**/*.html by default), resolves every internal `href`/`src`
//, including `#anchors`, which must match an id/name in the target document,
// and reports each unresolved target. External links (http(s):, mailto:, tel:,
// data:, protocol-relative //) are left alone, except the hreflang alternates:
// every <link rel="alternate" hreflang> of a page and every <xhtml:link> of the
// sitemap names an absolute URL on the site's own origin, and each must resolve
// to a built page, so a translated page (/<lang>/...) can never point at a
// language version that was not built, nor the other way round.
//
//   npm run check:links            # scan ./dist
//   node scripts/check-links.mjs <dir>
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';

const dist = resolve(process.cwd(), process.argv[2] ?? 'dist');

// The /diagrams/* pages are third-party archify viewers with their own scripts
// and internal anchors; we skip them as link sources. Links *to* them from our
// pages still resolve normally, since the files exist on disk.
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

// The id/name anchors present in a document, parsed once and memoised.
const idCache = new Map();
function anchorsOf(file) {
  if (idCache.has(file)) return idCache.get(file);
  const set = new Set();
  try {
    const html = readFileSync(file, 'utf8');
    for (const m of html.matchAll(/\bid="([^"]+)"/g)) set.add(m[1]);
    for (const m of html.matchAll(/\bname="([^"]+)"/g)) set.add(m[1]);
  } catch {
    /* unreadable file is reported as a missing target elsewhere */
  }
  idCache.set(file, set);
  return set;
}

const hasExtension = (p) => /\.[a-z0-9]+$/i.test(p);

// Map an absolute site path ("/bok/the-stack") to the file that serves it,
// honouring `build.format: 'file'` and `trailingSlash: 'never'`.
function resolveAbsolute(pathname) {
  if (pathname === '/') return join(dist, 'index.html');
  const rel = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  if (hasExtension(rel)) return join(dist, rel);
  const asFile = join(dist, `${rel}.html`);
  if (existsSync(asFile)) return asFile;
  const asIndex = join(dist, rel, 'index.html');
  if (existsSync(asIndex)) return asIndex;
  return asFile; // report the `.html` candidate as the missing target
}

// Resolve a relative link against the directory of the document it appears in.
function resolveRelative(file, pathname) {
  const abs = resolve(dirname(file), pathname);
  if (hasExtension(pathname)) return abs;
  const asFile = `${abs}.html`;
  if (existsSync(asFile)) return asFile;
  const asIndex = join(abs, 'index.html');
  if (existsSync(asIndex)) return asIndex;
  return asFile;
}

const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const ORIGIN = 'https://aigovernanceengineer.com';

/** The hreflang alternates of a page (absolute URLs). */
function alternatesOf(html) {
  const out = [];
  for (const m of html.matchAll(/<link\b[^>]*\bhreflang="[^"]*"[^>]*>/g)) {
    const href = /\bhref="([^"]*)"/.exec(m[0])?.[1];
    if (href) out.push(href);
  }
  return out;
}

/** The dist file an absolute same-origin URL maps to, or null for another origin. */
function fileOfUrl(url) {
  if (!url.startsWith(`${ORIGIN}/`) && url !== ORIGIN) return null;
  return resolveAbsolute(decodeURIComponent(new URL(url).pathname));
}

function linksOf(html) {
  const out = [];
  for (const m of html.matchAll(/\b(?:href|src)\s*=\s*"([^"]*)"/g)) out.push(m[1]);
  return out;
}

function main() {
  if (!existsSync(dist)) {
    console.error(`check-links: directory not found: ${dist}`);
    console.error('Run `npm run build` first, or pass a directory to scan.');
    process.exit(1);
  }

  const files = htmlFiles(dist);
  const broken = [];
  let checked = 0;

  for (const file of files) {
    const html = readFileSync(file, 'utf8');
    for (const raw of linksOf(html)) {
      const value = raw.trim();
      if (!value || value === '#' || EXTERNAL.test(value)) continue;

      const hashIndex = value.indexOf('#');
      const pathPart = (hashIndex === -1 ? value : value.slice(0, hashIndex)).split('?')[0];
      const fragment = hashIndex === -1 ? '' : decodeURIComponent(value.slice(hashIndex + 1));
      checked++;

      let target = file;
      if (pathPart) {
        const decoded = decodeURIComponent(pathPart);
        target = decoded.startsWith('/')
          ? resolveAbsolute(decoded)
          : resolveRelative(file, decoded);
        if (!existsSync(target)) {
          broken.push({ file, link: value, reason: `no file at ${target}` });
          continue;
        }
      }

      if (fragment && !anchorsOf(target).has(fragment)) {
        broken.push({ file, link: value, reason: `no id/name "${fragment}"` });
      }
    }

    for (const href of alternatesOf(html)) {
      const target = fileOfUrl(href);
      checked++;
      if (!target) broken.push({ file, link: href, reason: 'hreflang alternate on another origin' });
      else if (!existsSync(target)) broken.push({ file, link: href, reason: `no file at ${target}` });
    }
  }

  // The sitemap's language pairs (<xhtml:link rel="alternate" hreflang href>).
  for (const name of existsSync(dist) ? readdirSync(dist) : []) {
    if (!/^sitemap-\d+\.xml$/.test(name)) continue;
    const file = join(dist, name);
    const xml = readFileSync(file, 'utf8');
    for (const m of xml.matchAll(/<xhtml:link\b[^>]*\bhref="([^"]*)"/g)) {
      const target = fileOfUrl(m[1]);
      checked++;
      if (!target || !existsSync(target)) {
        broken.push({ file, link: m[1], reason: target ? `no file at ${target}` : 'another origin' });
      }
    }
  }

  if (broken.length) {
    console.error(`check-links: ${broken.length} broken internal link(s) found:\n`);
    for (const b of broken) {
      console.error(`  ${b.file}`);
      console.error(`    ${b.link}  →  ${b.reason}\n`);
    }
    process.exit(1);
  }

  console.log(`check-links: ${checked} internal link(s) OK across ${files.length} HTML file(s).`);
}

main();
