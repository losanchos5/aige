#!/usr/bin/env node
// archify-fetch: download the pinned archify CLI (a pure-Node, dependency-free
// diagram renderer) into site/.archify. The package lives in the `archify/`
// subdirectory of the source tarball, so we strip the two leading path
// components on extraction. Idempotent: if site/.archify/.version already names
// the pinned version and the CLI entrypoint is present, this does nothing.
//
//   npm run diagrams:fetch          # ensure site/.archify is present
//   node scripts/archify-fetch.mjs
//
// Also usable as a module: `import { ensureArchify, ARCHIFY_BIN } from './archify-fetch.mjs'`.
import { existsSync, readFileSync, writeFileSync, rmSync, mkdirSync, unlinkSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';

export const ARCHIFY_VERSION = 'v2.16.0';
// SHA-256 of the tarball above. Git tags are mutable, so the download is only
// trusted when its bytes match this digest (recompute with `sha256sum` when
// bumping ARCHIFY_VERSION; the CI cache key in .github/workflows/*.yml must
// change too).
const TARBALL_SHA256 = 'c9f285502fed5ed3e8fbe247c5431972a119ce8ba3c434bf018f15d6496316f6';
const DOWNLOAD_TIMEOUT_MS = 30_000;
const DOWNLOAD_ATTEMPTS = 3;

const HERE = dirname(fileURLToPath(import.meta.url));
const SITE = resolve(HERE, '..');
export const ARCHIFY_DIR = join(SITE, '.archify');
export const ARCHIFY_VERSION_FILE = join(ARCHIFY_DIR, '.version');
export const ARCHIFY_BIN = join(ARCHIFY_DIR, 'bin', 'archify.mjs');

const TARBALL_URL = `https://codeload.github.com/tt-a1i/archify/tar.gz/refs/tags/${ARCHIFY_VERSION}`;

// True when the pinned CLI is already extracted and stamped with this version.
export function isArchifyReady() {
  return (
    existsSync(ARCHIFY_VERSION_FILE) &&
    readFileSync(ARCHIFY_VERSION_FILE, 'utf8').trim() === ARCHIFY_VERSION &&
    existsSync(ARCHIFY_BIN)
  );
}

async function download(url, dest) {
  let lastError;
  for (let attempt = 1; attempt <= DOWNLOAD_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(DOWNLOAD_TIMEOUT_MS) });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }
      const bytes = Buffer.from(await res.arrayBuffer());
      const digest = createHash('sha256').update(bytes).digest('hex');
      if (digest !== TARBALL_SHA256) {
        throw new Error(
          `archify-fetch: checksum mismatch for ${url}
  expected ${TARBALL_SHA256}
  got      ${digest}
` +
            '  The pinned tag may have moved; verify upstream before updating TARBALL_SHA256.',
        );
      }
      writeFileSync(dest, bytes);
      return;
    } catch (error) {
      lastError = error;
      if (String(error?.message).includes('checksum mismatch')) throw error;
      if (attempt < DOWNLOAD_ATTEMPTS) {
        console.warn(`archify-fetch: attempt ${attempt} failed (${error?.message}); retrying...`);
        await new Promise((r) => setTimeout(r, 1500 * attempt));
      }
    }
  }
  throw new Error(`archify-fetch: download failed after ${DOWNLOAD_ATTEMPTS} attempts for ${url}: ${lastError?.message}`);
}

// Extract only the `*/archify/` subtree, stripping its two leading path
// components, into `destDir`. Runs with cwd = destDir and a relative tarball
// name so the Windows drive-letter colon in the path is never mistaken for a
// remote host by GNU tar. GNU tar needs `--wildcards` to treat the member as a
// glob; bsdtar (Windows, some runners) treats it as a glob by default and
// rejects the flag, so we try the GNU form first and fall back to the bsdtar one.
function extract(tarName, destDir) {
  const base = ['-xzf', tarName, '--strip-components=2'];
  const attempts = [
    [...base, '--wildcards', '*/archify/*'],
    [...base, '*/archify/*'],
  ];
  let lastError = '';
  for (const args of attempts) {
    const r = spawnSync('tar', args, { cwd: destDir, stdio: 'pipe', encoding: 'utf8' });
    if (r.status === 0 && existsSync(join(destDir, 'bin', 'archify.mjs'))) return;
    lastError = (r.stderr || '').trim() || r.error?.message || `tar exited with code ${r.status}`;
  }
  throw new Error(`archify-fetch: tar extraction failed: ${lastError}`);
}

export async function ensureArchify() {
  if (isArchifyReady()) {
    console.log(`archify-fetch: ${ARCHIFY_VERSION} already present in ${ARCHIFY_DIR}.`);
    return ARCHIFY_BIN;
  }

  console.log(`archify-fetch: fetching archify ${ARCHIFY_VERSION} …`);
  rmSync(ARCHIFY_DIR, { recursive: true, force: true });
  mkdirSync(ARCHIFY_DIR, { recursive: true });

  const tarName = '_archify.tar.gz';
  const tarPath = join(ARCHIFY_DIR, tarName);
  try {
    await download(TARBALL_URL, tarPath);
    extract(tarName, ARCHIFY_DIR);
  } finally {
    if (existsSync(tarPath)) unlinkSync(tarPath);
  }

  if (!existsSync(ARCHIFY_BIN)) {
    throw new Error(`archify-fetch: expected CLI at ${ARCHIFY_BIN} after extraction, but it is missing.`);
  }

  writeFileSync(ARCHIFY_VERSION_FILE, `${ARCHIFY_VERSION}\n`, 'utf8');
  console.log(`archify-fetch: extracted archify ${ARCHIFY_VERSION} into ${ARCHIFY_DIR}.`);
  return ARCHIFY_BIN;
}

// Run as a script only when invoked directly (not when imported).
if (resolve(process.argv[1] ?? '') === resolve(fileURLToPath(import.meta.url))) {
  ensureArchify().catch((err) => {
    console.error(err.message ?? err);
    process.exit(1);
  });
}
