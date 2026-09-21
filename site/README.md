# aige-site

The Astro 5 static site for AI Governance Engineering, deployed to Cloudflare Pages.

- `npm run dev` — local dev server (runs `predev` → the diagram build first).
- `npm run build` — `astro check` + build, content-lint, link check, then Pagefind
  (runs `prebuild` → the diagram build first).
- `npm test` — Playwright default project.

## Analytics

Cloudflare Web Analytics is off by default and needs no code change to turn on.
`Base.astro` renders the beacon only when the build-time env var
`PUBLIC_CF_BEACON_TOKEN` is non-empty; otherwise nothing is emitted. The deploy
workflow passes it from a repository secret named **`CF_BEACON_TOKEN`**, so the
owner activates analytics by adding that secret (its value is the Cloudflare Web
Analytics site token) — no redeploy of the code is required beyond the next push.
The beacon loads from `static.cloudflareinsights.com`, already allow-listed in
`public/_headers`, so the strict CSP keeps working.

## Diagrams

Architecture, workflow, sequence, dataflow and lifecycle diagrams are authored as
[archify](https://github.com/tt-a1i/archify) JSON IR and compiled at build time into
two artifacts each:

- `public/diagrams/<id>.html` — the full standalone archify viewer, served at
  `/diagrams/<id>.html` (its own relaxed CSP lives in `public/_headers`, and it is
  excluded from the Pagefind index).
- `src/generated/diagrams/<id>.svg` — a cleaned, id-namespaced SVG for inlining in
  Astro pages, alongside `src/generated/diagrams/manifest.json`.

### Flow

```
site/diagrams/<id>.<type>.json     (hand-authored IR)
        │  npm run diagrams:build
        ▼
public/diagrams/<id>.html          (viewer, copied into dist/ by Astro)
src/generated/diagrams/<id>.svg    (inline SVG)
src/generated/diagrams/manifest.json
```

The pipeline is two scripts:

- `scripts/archify-fetch.mjs` downloads the pinned archify CLI
  (`ARCHIFY_VERSION`) into `site/.archify` (idempotent; no npm install needed).
- `scripts/diagrams-build.mjs` validates each IR (`--quality showcase`), renders
  the viewer, extracts and namespaces the SVG (every internal `id`/`url(#…)`/
  `href="#…"`/`aria-*` reference is prefixed with `<id>-` so diagrams can share a
  page), and writes the manifest. It skips diagrams whose outputs are newer than
  the IR and the pinned CLI; pass `--force` to rebuild all, or `--check` to verify
  the generated output is present and current without writing (used in CI-style
  checks).

All three output locations (`site/.archify`, `site/public/diagrams`,
`site/src/generated`) are generated and git-ignored.

### Adding a diagram

1. Drop an archify IR at `site/diagrams/<id>.<type>.json`, where `<type>` is one of
   `architecture`, `workflow`, `sequence`, `dataflow`, `lifecycle` (the penultimate
   dotted segment of the filename). Start from the archify `examples/` if needed.
2. Run `npm run diagrams:build`. A validation failure prints the failing checks and
   exits non-zero — fix the IR until `--quality showcase` passes.
3. Inline the SVG (or link `/diagrams/<id>.html`) in a page; `manifest.json`
   exposes `{ id, type, title, nodes, viewBox }` for build-time use.

### Regenerating the figures / the map

The conceptual infographics under `src/figures/*.svg` are generated from the typed
data modules (not hand-edited) by `scripts/figures-build.mjs`, which runs in
`prebuild` and `predev`:

- `npm run figures:build` (re)writes `values-principles.svg`, `maturity-grid.svg`,
  `pattern-map.svg` and `discipline-map.svg`.
- `node scripts/figures-build.mjs --check` verifies they are byte-for-byte current
  and exits non-zero if a data change was not regenerated (so `npm run build`
  fails loudly on drift). Commit the regenerated `discipline-map.svg`.

**The discipline map** (`/map`) is the largest figure, built by
`scripts/map-build.mjs` from `src/data/map.ts` (pure: only `import type`, loaded via
`scripts/lib/load-ts.mjs`). Its layout engine measures text with
`scripts/lib/svg-text.mjs` and throws if a label does not fit its column — fix the
offending node with a `short` (a verbatim substring), never a smaller font. It emits
two variants:

- **web** — inlined on `/map` and re-emitted as `src/figures/discipline-map.svg`
  (class-based colour, ≤ 48 KB budget). Debug it with
  `node scripts/map-build.mjs --web --out test-results/map-web.svg`.
- **portrait** — a standalone, light-theme-hex SVG for the LinkedIn infographic
  kit (not versioned in the repo):
  `node scripts/map-build.mjs --portrait --out <path.svg> --meta <path.json>`.
  The `--meta` JSON carries the BoK version, `viewBox` and node/leaf/text counts
  the kit's render guards check.

### Pagefind exclusion

Pagefind's `--glob` is include-only (it cannot negate a subtree), so the diagram
viewers are kept out of the search index by the site-wide `data-pagefind-body`
opt-in: because our real pages mark their content with `data-pagefind-body`,
Pagefind indexes only pages carrying that attribute and ignores the third-party
diagram HTML, which never has it. `/diagrams/*` is additionally tagged
`X-Robots-Tag: noindex` in `public/_headers`.
