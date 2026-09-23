# Design system — aigovernanceengineer.com

## Purpose

This site is the home of AI Governance Engineering: the Thesis, the Body of Knowledge, the Role,
Stack, Path and Map, and a Resources section (frameworks, crosswalk, glossary, tools, reading list).
This file is the source of truth for any design tool or agent auditing or modifying the visual
system — it lists every token, primitive and constraint that actually exists in the codebase; do not
invent colors, fonts or components beyond what is documented here.

## Color tokens

All values are copied verbatim from `site/src/styles/tokens.css`. Light values are the `:root`
block; dark values are `:root[data-theme='dark']` (identical to the `prefers-color-scheme: dark`
block).

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#F6F4EE` | `#121417` |
| `--surface` | `rgba(255, 255, 255, 0.6)` | `rgba(255, 255, 255, 0.04)` |
| `--line` | `#E3DFD5` | `#2A2D33` |
| `--ink` | `#15171C` | `#ECEAE3` |
| `--ink-2` | `#3C4048` | `#C5C3BC` |
| `--muted` | `#676C75` | `#8E9199` |
| `--l1` | `#CBD8F0` | `color-mix(in srgb, #1F3A63 45%, #121417)` |
| `--l1-ink` | `#1F3A63` | `#CBD8F0` |
| `--l2` | `#CFDCD3` | `color-mix(in srgb, #25463F 45%, #121417)` |
| `--l2-ink` | `#25463F` | `#CFDCD3` |
| `--l3` | `#EDD4D8` | `color-mix(in srgb, #5C2B3B 45%, #121417)` |
| `--l3-ink` | `#5C2B3B` | `#EDD4D8` |
| `--l4` | `#F1DAB4` | `color-mix(in srgb, #5A3D15 45%, #121417)` |
| `--l4-ink` | `#5A3D15` | `#F1DAB4` |
| `--l5` | `#D1E4BC` | `color-mix(in srgb, #2E4A22 45%, #121417)` |
| `--l5-ink` | `#2E4A22` | `#D1E4BC` |
| `--ok` (alias) | `var(--l5-ink)` | `var(--l5-ink)` |
| `--block` (alias) | `var(--l3-ink)` | `var(--l3-ink)` |
| `--glow-1..5` | `color-mix(in srgb, var(--l1..5) 85%, transparent)` | `color-mix(in srgb, var(--l1..5-ink) 38%, transparent)` |
| `--mesh-alpha` | `1` | `0.55` |
| `--texture-alpha` | `1` | `0.5` |
| `--shadow-1` | `0 1px 2px rgb(21 23 28 / 0.05), 0 2px 8px rgb(21 23 28 / 0.06)` | `0 1px 2px rgb(0 0 0 / 0.5), 0 2px 8px rgb(0 0 0 / 0.5)` |
| `--shadow-2` | `0 2px 6px rgb(21 23 28 / 0.06), 0 10px 28px rgb(21 23 28 / 0.09)` | `0 2px 6px rgb(0 0 0 / 0.55), 0 10px 28px rgb(0 0 0 / 0.6)` |
| `--shadow-3` | `0 6px 16px rgb(21 23 28 / 0.08), 0 22px 56px rgb(21 23 28 / 0.13)` | `0 6px 16px rgb(0 0 0 / 0.6), 0 22px 56px rgb(0 0 0 / 0.7)` |
| `--grad-border` | `linear-gradient(135deg, var(--l1), var(--l3), var(--l4))` | `linear-gradient(135deg, color-mix(in srgb, var(--l1-ink) 45%, transparent), color-mix(in srgb, var(--l3-ink) 45%, transparent), color-mix(in srgb, var(--l4-ink) 45%, transparent))` |
| `--grad-cta` | `linear-gradient(135deg, var(--l1-ink), var(--ink))` | `linear-gradient(135deg, var(--l1-ink), var(--ink))` |
| `--tint-bg` | `color-mix(in srgb, var(--l1) 18%, var(--bg))` | `color-mix(in srgb, var(--l1-ink) 10%, var(--bg))` |
| `--band-bg` | `#15171c` | `#0b0d10` |
| `--tex-line` | `color-mix(in srgb, var(--ink) 9%, transparent)` | `color-mix(in srgb, var(--ink) 8%, transparent)` |

The five `--l1..--l5` pairs are the only accent hues on the site. They map to the five layers of the
governance stack (see the home page and `/stack`) and are reused everywhere a figure or a kicker
needs a color — never introduce a sixth hue.

## Typography

Three self-hosted, self-fontsourced variable families, loaded in `site/src/styles/fonts.css` via
`@font-face` from `/fonts/*.woff2` (copied from `@fontsource-variable/*`, latin subset, weight-axis
only, `font-display: swap`):

- **Bricolage Grotesque Variable** (`--font-display`, weight 200–800) — display type: hero, H1/H2/H3.
- **Instrument Sans Variable** (`--font-body`, weight 400–700) — body copy, paragraphs, UI labels.
- **JetBrains Mono Variable** (`--font-mono`, weight 100–800) — code, kickers, meta labels, register
  numbers; always mono + uppercase + `--tracking-label` for eyebrow text.

Fluid type scale (all `clamp()` values from `tokens.css`):

| Token | Value | Px range |
|---|---|---|
| `--fs-display` | `clamp(3.25rem, 2.72rem + 2.25vw, 4.75rem)` | 52 → 76 |
| `--fs-h1` | `clamp(2.5rem, 2.24rem + 1.13vw, 3.25rem)` | 40 → 52 |
| `--fs-h2` | `clamp(1.75rem, 1.62rem + 0.56vw, 2.125rem)` | 28 → 34 |
| `--fs-h3` | `clamp(1.25rem, 1.21rem + 0.19vw, 1.375rem)` | 20 → 22 |
| `--fs-body` | `1.0625rem` | 17 (fixed) |
| `--fs-small` | `0.875rem` | 14 (fixed) |
| `--fs-label` | `0.75rem` | 12 (fixed, mono uppercase labels) |

Display lettering defaults: `--tracking-display: -0.02em`, `--tracking-label: 0.1em`,
`--leading-display: 1.05`.

## Spacing & radius

Spacing scale (`--s-1..--s-8`, px): `--s-1: 4px`, `--s-2: 8px`, `--s-3: 12px`, `--s-4: 16px`,
`--s-5: 24px`, `--s-6: 32px`, `--s-7: 64px`, `--s-8: 128px`.

Radius: `--r-lg: 10px` (cards, sections), `--r-sm: 6px` (small chips/controls).

Layout: `--container: 1200px` (default max width), `--prose: 72ch` (long-form text measure),
`--anchor-offset: 76px` (clears the sticky header for in-page anchors).

## Motion tokens

`--dur: 180ms`, `--ease: cubic-bezier(0.2, 0.7, 0.2, 1)` — the only duration/easing pair on the
site; every transition and hover/lift animation composes from these two tokens.

**Scroll reveal rule:** `.reveal` / `.reveal-stagger > *` (in `utilities.css`) drive off
`animation-timeline: view()` with `animation-range: entry 5% entry 35%` (staggered items shift the
range by `var(--i, 0) * 6%`). The keyframes (`reveal-in`) animate **`transform: translateY(16px)` →
`none` only** — never `opacity`. The `@supports not (animation-timeline: view())` fallback
(`ui.js`-driven, class `js-reveal`/`is-visible`) does use `opacity` in addition to `transform`, but
only as a progressive-enhancement fallback for browsers without scroll-timelines, and both paths
respect `prefers-reduced-motion`.

## Primitives

- **`<Section tone="plain|tint|dark|mesh" texture="none|dots|grid">`** (`site/src/components/Section.astro`) —
  the shared section shell: `<section class="section sec sec--{tone}">` with an optional inert
  `.bg-mesh` (five drifting radial glows) or `.bg-dots`/`.bg-grid` texture layer, an optional head
  (Kicker + H2/H1 title + lede), and slotted content over `.sec-inner` (`z-index: 1`).
- **`Kicker`** (`site/src/components/Kicker.astro`) — a mono, uppercase, letter-spaced eyebrow label
  with a small 4px colored square before the text and an optional trailing hairline rule.
- **`.card-lum`** (`effects.css`) — a card with a 1px `--line` border, `--surface` fill and
  `--shadow-1`; on hover/focus-within a masked gradient-border ring (`--grad-border`) fades in around
  its edge via `opacity`, not layout.
- **`.lift`** (`effects.css`) — hover-only, transform-based elevation: `translateY(-3px)` plus a
  deeper shadow when paired with `.card-lum`, gated behind `prefers-reduced-motion: no-preference`.
- **`.bento`** (`effects.css`) — a responsive editorial grid: 1 column on phones, 2 from 600px, 4
  from 960px, with `.bento-2x`/`.bento-2y` span modifiers for feature tiles.
- **`.btn-glow`** (`effects.css`) — a CTA button filled with `--grad-cta` (ink-derived gradient), a
  soft `--glow-1` box-shadow, and on hover a deeper glow plus a 1px `translateY` lift.
- **`.reveal` / `.reveal-stagger > *` with `--i`** (`utilities.css`) — scroll-linked entrance
  animation (see Motion tokens); `--i` (an integer custom property per item) offsets each staggered
  child's animation range.
- **`.story` / `.story-pin`** (`effects.css`) — a two-column sticky-scroll layout from 1024px: the
  left column (`.story-pin`) sticks under the header while the right column's rows scroll past it;
  driven by `story.js` toggling `[data-active]`.
- **`.meta`** (`effects.css`) — a small inline mono status label (uppercase, `--fs-label`, `--muted`)
  with a 6px round `--l5-ink` dot before the text.
- **Register-rule dividers** (`site/src/layouts/Marketing.astro`) — a 1px `--line` top border drawn
  automatically between adjacent `<section>` siblings inside `.marketing`, with a running
  zero-padded mono number (`counter(rule, decimal-leading-zero)`) sitting on the section's background
  color at the container's left edge.

## Hard constraints

1. Any animation of an element that may sit in the initial viewport is **transform-only, never
   opacity** — axe/Lighthouse blend fractional opacity into the contrast calculation, and Lighthouse
   does not emulate `prefers-reduced-motion`, so an opacity ramp reads as a permanent contrast
   failure.
2. **Never dim text with `opacity`.** Secondary text uses the `--muted` or `--ink-2` color tokens,
   never a reduced-opacity `--ink`.
3. **`--muted` fails AA on tinted/dark bands.** It is re-scoped to `var(--ink-2)` inside
   `.sec--tint`, and the full dark token set (including `--muted`) is re-scoped inside `.sec--dark`,
   both in `effects.css`. Any new tinted or dark surface must go through `<Section tone="tint">` /
   `<Section tone="dark">` rather than hand-rolling a background color.
4. **Never put `.reveal`, a `transform`, or `will-change` on an ancestor of `.story-pin`.** A
   transformed ancestor creates a new containing block and breaks `position: sticky`.
5. **All client scripts are external files.** The CSP is `script-src 'self'` with no inline scripts
   or `unsafe-inline`; every interactive behavior ships as its own `/*.js` file (e.g. `ui.js`,
   `nav.js`, `story.js`, `map.js`, `stack.js`, `path.js`, `matrix.js`, `crosswalk.js`, `diagram.js`,
   `countup.js`).
6. **Every animation respects `prefers-reduced-motion`.** Motion rules live inside
   `@media (prefers-reduced-motion: no-preference)` blocks (or an explicit `reduce` override), never
   unconditionally.

## Quality gates

Run in this order: `npm run build` (astro check + build + content-lint + link-check) → `npm test`
(Playwright default project) → `npm run test:a11y` (axe, zero serious/critical violations, light and
dark themes, 1440 and 390 viewports) → `npm run test:visual` (Playwright visual project) → `npm run
lhci` (Lighthouse CI: performance ≥ 0.95, accessibility/best-practices/SEO = 1) → `npx impeccable
detect dist` (anti-pattern count must not rise versus the recorded baseline; no new rule categories).

## Do / Don't

- Do reuse the five layer inks (`--l1-ink`…`--l5-ink`) for accents, chart colors and kicker swatches
  instead of picking new hex values.
- Do route every tinted or dark surface through `<Section tone="tint">` / `tone="dark">` so `--muted`
  stays AA-compliant.
- Do keep all scroll-reveal and hover motion inside `--dur`/`--ease` and transform-only for anything
  above the fold.
- Don't introduce purple, blue-violet or saturated marketing gradients — the only gradients are
  `--grad-border` and `--grad-cta`, both derived from the layer/ink tokens.
- Don't add a new font family; the site has exactly three (display, body, mono).
- Don't nest `.card-lum` inside another `.card-lum`, or stack multiple `.bg-mesh`/texture layers in
  one section.
- Don't add inline `<script>` tags or inline event handlers; the CSP forbids them.
- Don't dim, gray-out or opacity-fade text for a "disabled" or "secondary" look — use `--muted` /
  `--ink-2` or a `--line`-bordered treatment instead.
