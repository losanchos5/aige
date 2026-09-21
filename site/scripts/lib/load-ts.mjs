// load-ts.mjs: transpile a TypeScript data module and import it from a data:
// URL, so build scripts can read the typed data modules without any extra
// tooling. Type-only imports erase; the few runtime sibling imports between data
// modules (e.g. crosswalk.ts -> frameworks.ts) are resolved recursively by
// rewriting each './x' specifier to that module's own data: URL. Shared by
// figures-build.mjs and map-build.mjs.
import { readFileSync } from 'node:fs';
import { join, dirname, normalize } from 'node:path';
import ts from 'typescript';

function transpile(src) {
  return ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
}

/** Build a self-contained data: URL for a module, inlining sibling imports. */
async function toDataUrl(relPath, siteRoot, cache) {
  const key = normalize(relPath);
  if (cache.has(key)) return cache.get(key);

  let js = transpile(readFileSync(join(siteRoot, relPath), 'utf8'));
  const dir = dirname(relPath);
  const specifiers = new Set(
    [...js.matchAll(/from\s+['"](\.[^'"]+)['"]/g)].map((m) => m[1]),
  );
  for (const spec of specifiers) {
    const target = spec.endsWith('.ts')
      ? join(dir, spec)
      : `${join(dir, spec)}.ts`;
    const url = await toDataUrl(target, siteRoot, cache);
    js = js.split(`'${spec}'`).join(`'${url}'`).split(`"${spec}"`).join(`"${url}"`);
  }

  const url = `data:text/javascript;base64,${Buffer.from(js).toString('base64')}`;
  cache.set(key, url);
  return url;
}

/**
 * Load a `.ts` data module relative to the site root and return its namespace.
 * @param {string} relPath  Path relative to `siteRoot`, e.g. 'src/data/map.ts'.
 * @param {string} siteRoot Absolute path to the site directory.
 */
export async function loadTs(relPath, siteRoot) {
  const url = await toDataUrl(relPath, siteRoot, new Map());
  return import(url);
}
