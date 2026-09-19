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

### Pagefind exclusion

Pagefind's `--glob` is include-only (it cannot negate a subtree), so the diagram
viewers are kept out of the search index by the site-wide `data-pagefind-body`
opt-in: because our real pages mark their content with `data-pagefind-body`,
Pagefind indexes only pages carrying that attribute and ignores the third-party
diagram HTML, which never has it. `/diagrams/*` is additionally tagged
`X-Robots-Tag: noindex` in `public/_headers`.
