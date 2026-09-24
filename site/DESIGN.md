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
| `--glow-1..5` ¹ | `color-mix(in srgb, var(--l1..5) 85%, transparent)` | `color-mix(in srgb, var(--l1..5-ink) 38%, transparent)` |
| `--mesh-alpha` | `1` | `0.55` |
| `--texture-alpha` ² | `1` | `0.5` |
| `--shadow-1` ³ | `0 1px 2px rgb(21 23 28 / 0.05), 0 2px 8px rgb(21 23 28 / 0.06)` | `0 1px 2px rgb(0 0 0 / 0.5), 0 2px 8px rgb(0 0 0 / 0.5)` |
| `--shadow-2` | `0 2px 6px rgb(21 23 28 / 0.06), 0 10px 28px rgb(21 23 28 / 0.09)` | `0 2px 6px rgb(0 0 0 / 0.55), 0 10px 28px rgb(0 0 0 / 0.6)` |
| `--shadow-3` | `0 6px 16px rgb(21 23 28 / 0.08), 0 22px 56px rgb(21 23 28 / 0.13)` | `0 6px 16px rgb(0 0 0 / 0.6), 0 22px 56px rgb(0 0 0 / 0.7)` |
| `--grad-border` | `linear-gradient(135deg, var(--l1), var(--l3), var(--l4))` | `linear-gradient(135deg, color-mix(in srgb, var(--l1-ink) 45%, transparent), color-mix(in srgb, var(--l3-ink) 45%, transparent), color-mix(in srgb, var(--l4-ink) 45%, transparent))` |
| `--grad-cta` | `linear-gradient(135deg, var(--l1-ink), var(--ink))` | `linear-gradient(135deg, var(--l1-ink), var(--ink))` |
| `--tint-bg` | `color-mix(in srgb, var(--l1) 18%, var(--bg))` | `color-mix(in srgb, var(--l1-ink) 10%, var(--bg))` |
| `--band-bg` ⁴ | `#15171c` | `#0b0d10` |
| `--tex-line` ² | `color-mix(in srgb, var(--ink) 9%, transparent)` | `color-mix(in srgb, var(--ink) 8%, transparent)` |
| `--hero-ink` ⁵ | `var(--l1-ink)` | `var(--ink)` |
| `--field-1` ⁵ | `#1F3A63` | `#1F3A63` |
| `--field-2` ⁵ | `#8FAEE0` | `#2D4F86` |
| `--field-3` ⁵ | `#F1C99A` | `#6B4E2E` |

¹ The glows colour the `.bg-mesh` radial blooms (and ChapterHeader's corner glow). They are never a
`box-shadow` halo: no button, card or panel carries a coloured glow.
² Read only by the Footer grid and ChapterHeader. There are no texture utilities.
³ Drawers, menus, dialogs, the scrolled header and figures. Cards carry no resting shadow;
`--shadow-2` is the hover elevation of link cards only.
⁴ The `.sec--dark` ground. On the home, the verdict beat swaps it for the dark `--l1` tone in the
dark theme (the near-black `#0b0d10` all but vanishes on the `#121417` page).
⁵ The home hero's moving gradient field (`public/hero-field.js` and its static CSS fallback on
`.hero-field`): three blob tones on the page ground, and the headline's own ink over them. Read
only by `pages/index.astro`.

The five `--l1..--l5` pairs are the only accent hues on the site. They map to the five layers of the
governance stack (see the home page and `/stack`) and are reused everywhere a figure or an accent
needs a color — never introduce a sixth hue.

## Typography

Four self-hosted, self-fontsourced families, loaded in `site/src/styles/fonts.css` via `@font-face`
from `/fonts/*.woff2` (latin subset, `font-display: swap`):

- **Bricolage Grotesque Variable** (`--font-display`) — display type: H1/H2/H3 everywhere except the
  home hero headline. Weight axis only (`wght` 200–800), copied from `@fontsource-variable/*` as the
  `latin-wght-normal` file (preloaded in `Base.astro` and `public/_headers`); no `wdth`/`opsz` axes
  and no `font-variation-settings` pin — every heading draws the plain weight master.
- **Instrument Sans Variable** (`--font-body`, weight 400–700) — body copy, paragraphs, UI labels.
- **JetBrains Mono Variable** (`--font-mono`, weight 100–800) — code, data, short identifiers and
  small in-section captions (sentence case, e.g. "Build order"). Uppercase + `--tracking-label` only
  for short identifiers (PASS / BLOCK, a value's "established" / "new" tag). No eyebrow labels.
  Table headers and any label longer than a short identifier are sentence case; `.meta` is the
  only remaining uppercase run (dropping it too is the owner's call).
- **Newsreader Display** (`--font-serif`) — the home hero headline only (`.hero-title` in
  `pages/index.astro`), nowhere else. Two static cuts (roman + italic), each instanced at its
  display optical size (opsz 72, wght 400) from `@fontsource-variable/newsreader`'s opsz files with
  fontTools (`fonttools varLib.instancer … opsz=72 wght=400 --flavor woff2`, ~22 KB each, against
  132/147 KB for the source variable files) — no axes to set at runtime, so `font-variation-settings:
  normal`. Preloaded only on `/` via `Base.astro`'s `preloadFonts` prop and a `/`-scoped block in
  `public/_headers` (every other route stays untouched).

Fluid type scale (all `clamp()` values from `tokens.css`):

| Token | Value | Px range |
|---|---|---|
| `--fs-display` | `clamp(3.25rem, 2.72rem + 2.25vw, 4.75rem)` | 52 → 76 |
| `--fs-h1` | `clamp(2.5rem, 2.24rem + 1.13vw, 3.25rem)` | 40 → 52 |
| `--fs-h2` | `clamp(1.75rem, 1.62rem + 0.56vw, 2.125rem)` | 28 → 34 |
| `--fs-h3` | `clamp(1.25rem, 1.21rem + 0.19vw, 1.375rem)` | 20 → 22 |
| `--fs-body` | `1.0625rem` | 17 (fixed) |
| `--fs-small` | `0.875rem` | 14 (fixed) |
| `--fs-label` | `0.75rem` | 12 (fixed, mono identifiers) |

Display lettering defaults: `--tracking-display: -0.02em`, `--tracking-label: 0.1em`,
`--leading-display: 1.05`.

**`.hero-title`** — the home hero headline's own scoped style (`site/src/pages/index.astro`, not a
shared primitive: no other page uses `--font-serif`). `font-size: min(clamp(3rem, 1rem + 4.6vw,
6.5rem), 15vw)` (the `15vw` cap keeps 200% zoomed text inside a 390px viewport, WCAG 1.4.4/1.4.10);
`font-weight: 400`; `line-height: 1.02`; `letter-spacing: -0.015em`; colour `--hero-ink`. Two
`.hero-line` blocks ("Governance you can *run*," / "not just read."), each `text-wrap: balance`.

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

**Perpetual motion:** three sanctioned infinite animations, all gated to
`prefers-reduced-motion: no-preference`. The mesh drift (`mesh-drift-a` 34s / `mesh-drift-b` 42s,
`alternate`) has no user control (it is decorative and behind content). The home hero's gradient
field (`public/hero-field.js`, a WebGL shader painting `.hero-canvas`, ~30 fps, a blob lap every
~30–60 s so the drift reads within a few seconds) and its figures strip
marquee (`facts-scroll`, 60s linear, transform-only) share one pause control (`.motion-toggle`,
`aria-pressed`, WCAG 2.2.2) that stops them together. By Jordi's call (2026-09-24) it has no visible
chrome: like the skip link it sits off screen until keyboard focus reaches it (Tab after the CTA);
a click or tap on the strip pauses and resumes both (touch and mouse users), and hovering the strip
pauses it. Under forced colours the canvas is skipped and the CSS fallback shows. Under reduced motion the field renders one
still frame and the strip is a static wrapping list, from first paint. Everything else runs once: the
loop section's figure (`.hero-art` under `.loop-sec`) now starts its one pulse when it scrolls into
view (`IntersectionObserver` in `public/hero.js`) rather than on load, the verdict ticker is a static
list, count-ups play once.

## Primitives

- **`<Section tone="plain|tint|dark|mesh">`** (`site/src/components/Section.astro`) — the shared
  section shell: `<section class="section sec sec--{tone}">`, an inert `.bg-mesh` when
  `tone="mesh"`, an optional head (H2 or H1-scale title + lede, no kicker) and slotted content over
  `.sec-inner` (`z-index: 1`).
- **`.bg-mesh`** (`effects.css`) — the identity element: five soft radial glows (`--glow-1..5`)
  split across two pseudo-elements that overhang the host by 20% and drift slowly (see Motion).
  Absolute, `contain: strict`, `aria-hidden`, `pointer-events: none`; the host clips it. Strength is
  `--mesh-alpha`: `1` light / `0.55` dark by default, `0.7` in PageHero, `0.6 ×` in the home role
  section, `0.25` inside CtaBand. One mesh per section; never under a table or a node grid.
- **`.card-lum`** (`effects.css`) — a flat card: 1px `--line` hairline, `--surface` fill, no
  shadow. A masked `--grad-border` ring fades in around its edge on hover/focus-within (`opacity`,
  not layout).
- **`.lift`** (`effects.css`) — hover elevation for cards that are links only: it acts on
  `a.lift` or on `.lift.card-link` (the caller opts in), a `translateY(-3px)` plus `--shadow-2` on
  `.card-lum`, gated behind `prefers-reduced-motion: no-preference`. A non-link card stays flat.
- **`.bento`** (`effects.css`) — a responsive editorial grid: 1 column on phones, 2 from 600px, 4
  from 960px, with `.bento-2x`/`.bento-2y` span modifiers for feature tiles.
- **`.btn-glow`** (`effects.css`) — the primary CTA: the `--grad-cta` fill with the `--bg` label,
  no halo; hover is a 1px `translateY` lift.
- **`.reveal` / `.reveal-stagger > *` with `--i`** (`utilities.css`) — scroll-linked entrance
  animation (see Motion tokens); `--i` (an integer custom property per item) offsets each staggered
  child's animation range.
- **`.story` / `.story-pin`** (`effects.css`) — a two-column sticky-scroll layout from 1024px: the
  left column (`.story-pin`) sticks under the header while the right column's rows scroll past it;
  driven by `story.js` toggling `[data-active]`.
- **`.meta`** (`effects.css`) — a small inline mono status line with a 6px `--l5-ink` dot, used by
  the Footer and PageHero's related-chapter link.
- **ChapterHeader number** (`site/src/components/ChapterHeader.astro`) — the chapter number is plain
  mono text beside the title: no chip, no fill.
- **Type chips** (`.type-tag` in `resources.css`, `.cw-chip` in `crosswalk.css`) — neutral:
  `--tint-bg` fill, `--ink-2` text, hairline border. The five layer colours are reserved for layer
  squares and for elements that genuinely belong to one layer; the chapter header and
  `--chapter-ink` use `--ink`, because no chapter is about a single layer. The FIGURE chip on
  figures is gone for the same reason.
- **`CtaBand`** (`site/src/components/CtaBand.astro`) — the closing band. Light theme: an `--ink`
  block with `--bg` text. Dark theme: the dark `--l1` tone with `--ink` / `--ink-2` text (inverting
  there would make a cream slab). Primary button = a solid fill in the band's text colour, no halo;
  secondary = a 45% outline. Its colours live in three locals (`--band-fill`, `--band-text`,
  `--band-text-2`).
- **Section rule** (`site/src/layouts/Marketing.astro`) — a plain 1px `--line` top border between
  adjacent `<section>` siblings inside `.marketing`. No number, no notch.
- **`.hero--field`** (scoped in `site/src/pages/index.astro`, home only) — the full-viewport
  (`min-height: 100svh`) hero: a `.hero-field` layer holding `.hero-canvas` (the WebGL gradient
  field, `public/hero-field.js`, with a static CSS radial-gradient fallback painted from the same
  `--field-1..3` tokens for no-JS/no-WebGL and first paint), the centred `.hero-title` + CTA
  (`.hero-center`), and the `.hero-facts` strip. `--muted` is re-scoped to `--ink-2` on it in
  `effects.css`, same as `.sec--mesh`/`.hero--page`.
- **`.hero-facts`** (`pages/index.astro`) — the strip of figures under the headline: label | value
  pairs computed from the content modules (stack layers, workflows, chapters, values, frameworks,
  patterns, BoK version, license), doubled into an `aria-hidden`+`inert` copy for the seamless
  marquee, with the keyboard-only `.motion-toggle` pause control (see Motion tokens). Reduced motion or no JS
  keeps it a static, centred, wrapping list.
- **Header overlay mode** (`Header.astro` prop `overlay`, threaded from `Base.astro`/`Marketing.astro`
  `overlayHeader`, home only) — `data-overlay` makes the bar `position: fixed`, fully transparent (no
  ground, blur, hairline or shadow, `--muted` re-scoped to `--ink-2`) until `.is-scrolled` (`ui.js`,
  >8px), when it falls back to the normal frosted/solid bar. The shader keeps the header's `--ink-2`
  text ≥ 5:1 wherever it floats over the field.

## Hard constraints

1. Any animation of an element that may sit in the initial viewport is **transform-only, never
   opacity** — axe/Lighthouse blend fractional opacity into the contrast calculation, and Lighthouse
   does not emulate `prefers-reduced-motion`, so an opacity ramp reads as a permanent contrast
   failure.
2. **Never dim text with `opacity`.** Secondary text uses the `--muted` or `--ink-2` color tokens,
   never a reduced-opacity `--ink`.
3. **`--muted` fails AA on tinted/dark bands.** It is re-scoped to `var(--ink-2)` inside
   `.sec--tint` and over the mesh (`.sec--mesh`, `.hero--page`, `.hero--field`, `.hero-panel`), and
   the full dark token set (including `--muted`) is re-scoped inside `.sec--dark`, all in
   `effects.css`. Any new tinted or dark surface must go through `<Section tone="tint">` /
   `<Section tone="dark">` rather than hand-rolling a background color. CtaBand is the one
   exception: it carries its own audited colour locals for both themes.
4. **Never put `.reveal`, a `transform`, or `will-change` on an ancestor of `.story-pin`.** A
   transformed ancestor creates a new containing block and breaks `position: sticky`.
5. **All client scripts are external files.** The CSP is `script-src 'self'` with no inline scripts
   or `unsafe-inline`; every interactive behavior ships as its own `/*.js` file (e.g. `ui.js`,
   `nav.js`, `story.js`, `map.js`, `stack.js`, `path.js`, `matrix.js`, `crosswalk.js`, `diagram.js`,
   `countup.js`).
6. **Every animation respects `prefers-reduced-motion`.** Motion rules live inside
   `@media (prefers-reduced-motion: no-preference)` blocks (or an explicit `reduce` override), never
   unconditionally.
7. **No coloured halos.** No `box-shadow` built from a `--glow-*` token (or any zero-offset
   coloured glow) on buttons, cards or panels; the gradient fills carry the weight.
8. **No eyebrows, no section numbers.** No kicker or eyebrow label above a heading, no running
   section counter, no chip or badge. Leading-zero numbers are reserved for content sequences the
   reader uses (layers, chapters, values). Documented exception: the home hero's `.hero-facts` strip
   (`.fact` plates) — it is not a badge on a heading but a self-contained register of figures with
   its own label|value structure, matched by the accompanying `.motion-toggle` control.

## Quality gates

Run in this order: `npm run build` (astro check + build + content-lint + link-check) → `npm test`
(Playwright default project) → `npm run test:a11y` (axe, zero serious/critical violations, light and
dark themes, 1440 and 390 viewports) → `npm run test:visual` (Playwright visual project) → `npm run
lhci` (Lighthouse CI: performance ≥ 0.95, accessibility/best-practices/SEO = 1) → `npx impeccable
detect dist` (anti-pattern count must not rise versus the recorded baseline; no new rule categories).

## Do / Don't

- Do reuse the five layer inks (`--l1-ink`…`--l5-ink`) for accents and chart colors instead of
  picking new hex values.
- Do route every tinted or dark surface through `<Section tone="tint">` / `tone="dark">` so `--muted`
  stays AA-compliant.
- Do keep all scroll-reveal and hover motion inside `--dur`/`--ease` and transform-only for anything
  above the fold.
- Don't introduce purple, blue-violet or saturated marketing gradients — the only gradients are the
  mesh's radial glows, `--grad-border`, `--grad-cta` and the home hero's gradient field, all derived
  from the layer/ink or `--field-*` tokens (the field is the one sanctioned exception to "no
  saturated gradient", scoped to `.hero--field` on the home).
- Don't add a new font family; the site has exactly four (display, body, mono, serif), and the
  serif (`--font-serif`, Newsreader Display) is limited to the home hero headline — never use it
  elsewhere.
- Don't nest `.card-lum` inside another `.card-lum`, or stack more than one `.bg-mesh` in a section.
- Don't put a dot or grid texture behind content, and don't give a non-link card a hover lift.
- Don't add inline `<script>` tags or inline event handlers; the CSP forbids them.
- Don't dim, gray-out or opacity-fade text for a "disabled" or "secondary" look — use `--muted` /
  `--ink-2` or a `--line`-bordered treatment instead.
