#!/usr/bin/env node
// diagrams-build: turn every archify diagram IR (site/diagrams/<id>.<type>.json)
// into (1) the full standalone viewer at site/public/diagrams/<id>.html and
// (2) a namespaced inline SVG at site/src/generated/diagrams/<id>.svg, plus a
// manifest.json describing each diagram for the Astro build.
//
//   npm run diagrams:build              # fetch the CLI, then (re)build changed diagrams
//   node scripts/diagrams-build.mjs --force   # rebuild every diagram
//   node scripts/diagrams-build.mjs --check   # verify outputs are up to date (no writes)
//
// The <type> is the penultimate dotted segment of the filename, e.g.
// `stack-flow.architecture.json` -> id "stack-flow", type "architecture".
import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync, renameSync, statSync, unlinkSync, rmSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { ensureArchify, ARCHIFY_BIN, ARCHIFY_VERSION_FILE } from './archify-fetch.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const SITE = resolve(HERE, '..');
const SRC_DIR = join(SITE, 'diagrams');
const HTML_OUT = join(SITE, 'public', 'diagrams');
const SVG_OUT = join(SITE, 'src', 'generated', 'diagrams');
const MANIFEST = join(SVG_OUT, 'manifest.json');

const args = process.argv.slice(2);
const CHECK = args.includes('--check');
const FORCE = args.includes('--force');

const TYPES = new Set(['architecture', 'workflow', 'sequence', 'dataflow', 'lifecycle']);
// The top-level IR array that holds a diagram's nodes, keyed by diagram type.
const NODE_KEY = {
  architecture: 'components',
  workflow: 'nodes',
  sequence: 'participants',
  dataflow: 'nodes',
  lifecycle: 'states',
};

let mismatches = 0; // --check: number of stale/missing outputs

// Split "<id>.<type>.json" into { id, type }; type is the penultimate segment.
function parseName(fileName) {
  if (!fileName.endsWith('.json')) return null;
  const parts = fileName.slice(0, -'.json'.length).split('.');
  if (parts.length < 2) return null;
  const type = parts[parts.length - 1];
  const id = parts.slice(0, -1).join('.');
  if (!id || !TYPES.has(type)) return null;
  return { id, type };
}

function runArchify(cliArgs) {
  const r = spawnSync('node', [ARCHIFY_BIN, ...cliArgs], {
    stdio: 'pipe',
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  return { status: r.status, stdout: r.stdout ?? '', stderr: r.stderr ?? '', error: r.error };
}

function validate(type, jsonPath) {
  const r = runArchify(['validate', type, jsonPath, '--quality', 'showcase', '--json']);
  let report;
  try {
    report = JSON.parse(r.stdout);
  } catch {
    console.error(`diagrams-build: validate did not return JSON for ${jsonPath}`);
    if (r.stderr.trim()) console.error(r.stderr.trim());
    if (r.stdout.trim()) console.error(r.stdout.trim());
    process.exit(1);
  }
  if (!report.ok) {
    console.error(`diagrams-build: validation failed for ${jsonPath}:`);
    for (const check of report.checks ?? []) {
      if (check.ok) continue;
      console.error(`  [${check.name}]`);
      for (const detail of check.details ?? []) console.error(`    - ${detail}`);
    }
    process.exit(1);
  }
}

// Isolate the single <svg>…</svg> block from the rendered viewer and rewrite it
// for safe inline embedding: prefix every internal id (and every reference to
// one) with "<id>-" so several diagrams can coexist on one page, drop the
// preset/quality bookkeeping attributes, and tag the root with data-diagram.
function transformSvg(html, id) {
  const match = html.match(/<svg[\s\S]*?<\/svg>/);
  if (!match) throw new Error(`diagrams-build: no <svg> block found in rendered output for "${id}"`);
  let svg = match[0];

  const ids = new Set();
  for (const m of svg.matchAll(/\sid="([^"]+)"/g)) ids.add(m[1]);
  const prefix = (name) => `${id}-${name}`;

  // id="X" definitions (leading whitespace avoids matching data-node-id etc.).
  svg = svg.replace(/(\s)id="([^"]+)"/g, (_, sp, name) => `${sp}id="${prefix(name)}"`);
  // url(#X) references (fills, markers, clip paths, the grid pattern).
  svg = svg.replace(/url\((['"]?)#([^)'"]+)\1\)/g, (whole, quote, name) =>
    ids.has(name) ? `url(${quote}#${prefix(name)}${quote})` : whole,
  );
  // href="#X" / xlink:href="#X" references.
  svg = svg.replace(/(\b(?:xlink:href|href)="#)([^"]+)(")/g, (whole, pre, name, post) =>
    ids.has(name) ? `${pre}${prefix(name)}${post}` : whole,
  );
  // aria-labelledby / aria-describedby carry space-separated id lists.
  svg = svg.replace(/(\baria-(?:labelledby|describedby)=")([^"]+)(")/g, (_whole, pre, value, post) => {
    const mapped = value
      .split(/\s+/)
      .map((token) => (ids.has(token) ? prefix(token) : token))
      .join(' ');
    return `${pre}${mapped}${post}`;
  });
  // Drop the renderer's preset/quality bookkeeping; keep viewBox/role/aria/data-*.
  svg = svg.replace(/\s+data-preset="[^"]*"/g, '').replace(/\s+data-quality-profile="[^"]*"/g, '');
  // Tag the root so consumers can find it.
  svg = svg.replace(/<svg\b/, `<svg data-diagram="${id}"`);

  return svg;
}

function viewBoxOf(svg) {
  const m = svg.match(/viewBox="([^"]+)"/);
  return m ? m[1] : null;
}

// Map IR nodes to the manifest shape { id, label, kind?, sublabel?, detail?, description? }.
function manifestNodes(ir, type) {
  const arr = ir[NODE_KEY[type]];
  if (!Array.isArray(arr)) return [];
  return arr.map((n) => {
    const node = { id: n.id, label: n.label };
    if (n.type != null) node.kind = n.type;
    if (n.sublabel != null) node.sublabel = n.sublabel;
    if (n.detail != null) node.detail = n.detail;
    if (n.description != null) node.description = n.description;
    return node;
  });
}

// Write `bytes` to `dest` (atomic rename) in normal mode; in --check mode,
// compare against the on-disk file and record any mismatch instead of writing.
function emit(dest, bytes) {
  if (CHECK) {
    if (!existsSync(dest)) {
      console.error(`diagrams-build --check: missing ${dest}`);
      mismatches++;
      return;
    }
    if (readFileSync(dest, 'utf8') !== bytes) {
      console.error(`diagrams-build --check: stale ${dest} (regenerate with npm run diagrams:build)`);
      mismatches++;
    }
    return;
  }
  const tmp = `${dest}.tmp-${process.pid}`;
  writeFileSync(tmp, bytes, 'utf8');
  renameSync(tmp, dest);
}

// Skip a diagram when both outputs already exist and are newer than the IR and
// the pinned CLI version stamp. Disabled for --force and --check.
function isFresh(id, jsonPath) {
  if (FORCE || CHECK) return false;
  const html = join(HTML_OUT, `${id}.html`);
  const svg = join(SVG_OUT, `${id}.svg`);
  if (!existsSync(html) || !existsSync(svg)) return false;
  const srcMtime = statSync(jsonPath).mtimeMs;
  const versionMtime = existsSync(ARCHIFY_VERSION_FILE) ? statSync(ARCHIFY_VERSION_FILE).mtimeMs : 0;
  const floor = Math.max(srcMtime, versionMtime);
  return statSync(html).mtimeMs >= floor && statSync(svg).mtimeMs >= floor;
}

async function main() {
  await ensureArchify();

  if (!existsSync(SRC_DIR)) {
    console.warn(`diagrams-build: no diagrams directory at ${SRC_DIR}; nothing to build.`);
    return;
  }

  const files = readdirSync(SRC_DIR)
    .filter((name) => name.endsWith('.json'))
    .sort();
  const diagrams = [];
  for (const name of files) {
    if (name.endsWith('.notes.json')) continue; // per-node note sidecars, read by src/lib/diagrams.ts
    const parsed = parseName(name);
    if (!parsed) {
      console.warn(`diagrams-build: skipping ${name} (not <id>.<type>.json with a known type)`);
      continue;
    }
    diagrams.push({ ...parsed, path: join(SRC_DIR, name) });
  }

  if (!diagrams.length) {
    console.warn(`diagrams-build: ${SRC_DIR} has no <id>.<type>.json diagrams; nothing to build.`);
    return;
  }

  if (!CHECK) {
    mkdirSync(HTML_OUT, { recursive: true });
    mkdirSync(SVG_OUT, { recursive: true });
  }

  const manifest = [];
  let built = 0;
  let skipped = 0;

  for (const { id, type, path: jsonPath } of diagrams) {
    validate(type, jsonPath);

    const ir = JSON.parse(readFileSync(jsonPath, 'utf8'));

    if (isFresh(id, jsonPath)) {
      // Still surface the diagram in the manifest from the existing SVG.
      const svg = readFileSync(join(SVG_OUT, `${id}.svg`), 'utf8');
      manifest.push({ id, type, title: ir.meta?.title ?? id, nodes: manifestNodes(ir, type), viewBox: viewBoxOf(svg) });
      skipped++;
      continue;
    }

    // Render to a temp HTML beside the final file, read it, then place it.
    const htmlDest = join(HTML_OUT, `${id}.html`);
    const htmlTmp = `${htmlDest}.render-${process.pid}`;
    const r = runArchify(['render', type, jsonPath, htmlTmp, '--quality', 'showcase']);
    if (r.status !== 0 || !existsSync(htmlTmp)) {
      console.error(`diagrams-build: render failed for ${jsonPath}`);
      if (r.stderr.trim()) console.error(r.stderr.trim());
      if (existsSync(htmlTmp)) unlinkSync(htmlTmp);
      process.exit(1);
    }

    const html = readFileSync(htmlTmp, 'utf8');
    let svg;
    try {
      svg = transformSvg(html, id);
    } catch (err) {
      unlinkSync(htmlTmp);
      console.error(err.message ?? err);
      process.exit(1);
    }

    emit(htmlDest, html);
    if (existsSync(htmlTmp)) unlinkSync(htmlTmp);
    emit(join(SVG_OUT, `${id}.svg`), `${svg}\n`);

    manifest.push({ id, type, title: ir.meta?.title ?? id, nodes: manifestNodes(ir, type), viewBox: viewBoxOf(svg) });
    built++;
  }

  manifest.sort((a, b) => a.id.localeCompare(b.id));
  emit(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);

  if (CHECK) {
    if (mismatches) {
      console.error(`diagrams-build --check: ${mismatches} output(s) missing or stale.`);
      process.exit(1);
    }
    console.log(`diagrams-build --check: ${manifest.length} diagram(s) up to date.`);
    return;
  }

  console.log(`diagrams-build: ${built} built, ${skipped} unchanged, ${manifest.length} in manifest.`);

  // The BoK chapters embed the generated SVGs at Markdown compile time (see
  // src/lib/rehype-diagrams.ts), and Astro caches compiled content keyed on the
  // Markdown source, not on the SVG. Whenever a diagram was (re)built, drop that
  // cache so an incremental `astro build` picks up the new figure markup.
  if (built > 0) {
    for (const stale of [join(SITE, '.astro', 'data-store.json'), join(SITE, 'node_modules', '.astro')]) {
      if (existsSync(stale)) rmSync(stale, { recursive: true, force: true });
    }
  }
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
