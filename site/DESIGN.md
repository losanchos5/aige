# Design system: aigovernanceengineer.com

## Purpose

This site is the home of AI Governance Engineering: the Thesis, the Body of Knowledge, the Role,
Stack, Path, Patterns, Toolkit, Agents and Map, and a Resources section (frameworks, the obligation
register, crosswalk, harms atlas, cases, contracts, templates and schemas, figures, tools, reading
list, glossary and the open data behind them).
This file is the source of truth for any design tool or agent auditing or modifying the visual
system: it lists every token, primitive and constraint that actually exists in the codebase; do not
invent colors, fonts or components beyond what is documented here.

## Color tokens

All values are copied verbatim from `site/src/styles/tokens.css`. Light values are the `:root`
block; dark values are `:root[data-theme='dark']` (identical to the `prefers-color-scheme: dark`
block). The system is editorial restraint (2026-11-15): one paper ground, ink, one accent, hairlines.
The Monet paintings are the only decorative colour; no UI surface is filled with a hue.

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#F6F4EE` | `#121417` |
| `--panel` ¹ | `#FBFAF6` | `#171A1E` |
| `--line` | `#E3DFD5` | `#2A2D33` |
| `--line-strong` | `color-mix(in srgb, var(--ink) 22%, var(--bg))` | same formula |
| `--ink` | `#15171C` | `#ECEAE3` |
| `--ink-2` | `#3C4048` | `#C5C3BC` |
| `--muted` | `#676C75` | `#8E9199` |
| `--accent` ² | `#1F3A63` | `#CBD8F0` |
| `--accent-soft` | `color-mix(in srgb, var(--accent) 7%, var(--bg))` | same formula |
| `--accent-line` | `color-mix(in srgb, var(--accent) 25%, var(--bg))` | same formula |
| `--on-accent` | `#F6F4EE` | `#121417` |
| `--hover` | `color-mix(in srgb, var(--ink) 5%, var(--bg))` | same formula |
| `--band` ³ | `#15171C` | `#1C2F4D` |
| `--band-ink` | `#F6F4EE` | `#F6F4EE` |
| `--band-ink-2` | `#C5C3BC` | `#D3D9E4` |
| `--band-line` | `#33363D` | `#34496B` |
| `--veil` ⁴ | `0` | `0.22` |
| `--grain-opacity` / `--grain-blend` ⁵ | `0.26` / `multiply` | `0.16` / `screen` |
| `--lift` ⁶ | `0 1px 2px rgb(21 23 28 / 0.06), 0 6px 18px rgb(21 23 28 / 0.07)` | `0 1px 2px rgb(0 0 0 / 0.4), 0 6px 18px rgb(0 0 0 / 0.45)` |
| `--l1` / `--l1-ink` | `#CBD8F0` / `#1F3A63` | `color-mix(in srgb, #1F3A63 45%, #121417)` / `#CBD8F0` |
| `--l2` / `--l2-ink` | `#CFDCD3` / `#25463F` | `color-mix(in srgb, #25463F 45%, #121417)` / `#CFDCD3` |
| `--l3` / `--l3-ink` | `#EDD4D8` / `#5C2B3B` | `color-mix(in srgb, #5C2B3B 45%, #121417)` / `#EDD4D8` |
| `--l4` / `--l4-ink` | `#F1DAB4` / `#5A3D15` | `color-mix(in srgb, #5A3D15 45%, #121417)` / `#F1DAB4` |
| `--l5` / `--l5-ink` | `#D1E4BC` / `#2E4A22` | `color-mix(in srgb, #2E4A22 45%, #121417)` / `#D1E4BC` |
| `--ok` (alias) | `var(--l5-ink)` | `var(--l5-ink)` |
| `--block` (alias) | `var(--l3-ink)` | `var(--l3-ink)` |
| `--hero-ink` | `var(--l1-ink)` | `var(--ink)` |

¹ Every panel that groups content (callouts, tables, figure frames, code blocks, cards) is this
opaque flat surface on a 1px `--line`, with no resting shadow. The page carries the grain; a panel
never does.
² The one accent: the hero navy in light, its pale counterpart in dark. Links, active states, the
section numbers and the section titles. Nothing else competes with it.
³ The single dark band (the closing CTA, `Section tone="dark"`). Inside it `--muted` takes
`--ink-2`: `#8E9199` is under AA on the dark theme's navy.
⁴ How strongly a painting is veiled with `--band`: none in light; in dark it keeps a painting from
glaring on the dark ground.
⁵ The paper grain (`.page-grain`, see Primitives).
⁶ The only shadow the system allows, and only on hover (link cards). Drawers, menus and dialogs
keep `--shadow-1..3`.

**Layer colours are swatches only.** `--l1..--l5` and their inks mean one layer of the governance
stack. They appear only where a layer is meant (StackDiagram, the loop steps, charts, matrices) and
only as a small square (8 to 10px) or a 3px edge, never as the fill of a card, band or section.

Retired with the mesh and pause panels, kept only while a component still reads them (remove each
when its last reader goes): `--surface`, `--glow-1..5`, `--mesh-alpha`, `--texture-alpha`,
`--tex-line`, `--grad-border`, `--grad-cta`, `--grad-ring`, `--tint-bg`, `--tint-l1..5`,
`--pause-bg`, `--deep-bg`, `--band-bg`, `--field-1..3`. New work must not use them.

## Typography

Three self-hosted families, loaded in `site/src/styles/fonts.css` via `@font-face` from
`/fonts/*.woff2` (latin subset, `font-display: swap`). Bricolage Grotesque is retired: no page
declares, preloads or requests it.

- **Newsreader Display** (`--font-display`, alias of `--font-serif`): h1, h2, section titles and
  quotes. Two static cuts (roman + italic), each instanced at its display optical size (opsz 72,
  wght 400) from `@fontsource-variable/newsreader`'s opsz files with fontTools (`fonttools
  varLib.instancer ... opsz=72 wght=400 --flavor woff2`, about 22 KB each). One weight only:
  display lines are set at 400 and `html` sets `font-synthesis-weight: none`, so a heading never
  turns into a faked bold. The roman is preloaded on every page (`Base.astro` and the `/*` block of
  `public/_headers`); the italic only on `/`.
- **Instrument Sans Variable** (`--font-body`, weight 400 to 700): body copy, h3 and h4, UI text.
- **JetBrains Mono Variable** (`--font-mono`, weight 100 to 800): labels, numbers, chips, the TOC,
  figure captions, code. Never for sentences. Uppercase labels use `.label` (12px, weight 500,
  `--track-label: 0.07em`); its `.num` child carries the accent: the repeated `01, 02...` motif.

The mockup's short names `--serif`, `--sans` and `--mono` alias the three families.

**12px is the floor.** No rendered text, HTML or SVG, is smaller than 12px (`--fs-label`).

Type scale (from `tokens.css`):

| Token | Value | Px range |
|---|---|---|
| `--fs-display` | `clamp(3.25rem, 2.72rem + 2.25vw, 4.75rem)` | 52 to 76 |
| `--fs-h2-display` | `clamp(2.375rem, 1.5rem + 3.2vw, 4.25rem)` | 38 to 68 (section titles) |
| `--fs-h1-doc` | `clamp(2.5rem, 1.9rem + 2.4vw, 3.75rem)` | 40 to 60 (chapter titles) |
| `--fs-h1` | `clamp(2.5rem, 2.24rem + 1.13vw, 3.25rem)` | 40 to 52 |
| `--fs-h2` | `clamp(1.75rem, 1.62rem + 0.56vw, 2.125rem)` | 28 to 34 (prose h2) |
| `--fs-h3` | `clamp(1.25rem, 1.21rem + 0.19vw, 1.375rem)` | 20 to 22 |
| `--fs-lede` | `1.1875rem` | 19 (fixed) |
| `--fs-body` | `1.0625rem` | 17 (fixed) |
| `--fs-small` | `0.875rem` | 14 (fixed) |
| `--fs-label` | `0.75rem` | 12 (fixed, the floor) |

Display lettering defaults: `--tracking-display: -0.02em`, `--tracking-label: 0.1em`,
`--track-label: 0.07em`, `--leading-display: 1.05`.

**`.hero-title`**: the home hero headline's own scoped style (`site/src/pages/index.astro`).
`font-size: min(clamp(3rem, 1rem + 4.6vw, 6.5rem), 15vw)` (the `15vw` cap keeps 200% zoomed text
inside a 390px viewport, WCAG 1.4.4/1.4.10); `font-weight: 400`; `line-height: 1.02`;
`letter-spacing: -0.015em`; colour `--hero-ink`. Two `.hero-line` blocks ("Governance you can
*run*," / "not just read."), each `text-wrap: balance`.

## Spacing & radius

Spacing scale (`--s-1..--s-8`, px): `--s-1: 4px`, `--s-2: 8px`, `--s-3: 12px`, `--s-4: 16px`,
`--s-5: 24px`, `--s-6: 32px`, `--s-7: 64px`, `--s-8: 128px`.

Radius, nothing else allowed: `--r-sm` / `--r-ctl: 6px` (controls, chips), `--r-lg` / `--r-blk:
10px` (blocks, panels, figure frames), `--r-pill: 999px` (pills).

Layout: `--container: 1200px` (default max width), `--prose: 72ch` (long-form text measure),
`--anchor-offset: 76px` (clears the sticky header for in-page anchors).

## Motion tokens

`--dur: 180ms`, `--ease: cubic-bezier(0.2, 0.7, 0.2, 1)`, the only duration/easing pair on the
site; every transition and hover/lift animation composes from these two tokens.

**Scroll reveal rule:** `.reveal` / `.reveal-stagger > *` (in `utilities.css`) drive off
`animation-timeline: view()` with `animation-range: entry 5% entry 35%` (staggered items shift the
range by `var(--i, 0) * 6%`). The keyframes (`reveal-in`) animate **`transform: translateY(16px)` →
`none` only**, never `opacity`. The `@supports not (animation-timeline: view())` fallback
(`ui.js`-driven, class `js-reveal`/`is-visible`) does use `opacity` in addition to `transform`, but
only as a progressive-enhancement fallback for browsers without scroll-timelines, and both paths
respect `prefers-reduced-motion`.

**Perpetual motion:** two sanctioned infinite animations, both gated to
`prefers-reduced-motion: no-preference` (the mesh drift is retired with the mesh). The home hero's gradient
field (`public/hero-field.js`, a WebGL shader painting `.hero-canvas` every frame, a blob lap every
~15–30 s so the field reads as alive at a glance) and its figures strip
marquee (`facts-scroll`, 60s linear, transform-only) share one pause control (`.motion-toggle`,
`aria-pressed`, WCAG 2.2.2) that stops them together. By Jordi's call (2026-09-24) it has no visible
chrome: like the skip link it sits off screen until keyboard focus reaches it (Tab after the CTA);
a click or tap on the strip pauses and resumes both (touch and mouse users), and hovering the strip
pauses it. Under forced colours the canvas is skipped and the CSS fallback shows. Under reduced motion the field renders one
still frame and the strip is a static wrapping list, from first paint. Everything else runs once: the
verdict ticker is a static
list, count-ups play once. The home governance loop (`GovernanceLoop.astro`) also runs once each
time it comes into view (`data-play`, set by `public/loop.js`): a short beam walks its edges in loop
order and the step it reaches rings once, `stroke-dashoffset` on the wires and `opacity` on a
decorative ring, never on text. One lap is 4.8s (eight 0.6s beats), inside WCAG 2.2.2's 5s, so it
needs no pause control; it also pauses while a step is active, and is absent under reduced motion.

## Primitives

- **Page grain** (`.page-grain`, rendered once by `Base.astro`, styled in `effects.css`): a fixed,
  full-viewport layer of single-tone fractal noise (an inline SVG data URI, allowed by the CSP's
  `img-src data:`), `aria-hidden`, `pointer-events: none`, at `z-index: -1`: above the canvas ground
  and below every box, so opaque grounds (the hero painting, the dark band, panels) cover it and it
  never sits on the painting. `--grain-blend` multiplies it in light and screens it in dark. Hidden
  in print.
- **`<Section tone="plain|dark|deep">`** (`site/src/components/Section.astro`): the shared section
  shell, `<section class="section sec sec--{tone}">` on the plain paper ground, an optional head and
  slotted content over `.sec-inner` (`z-index: 1`). `tone="mesh"` and `tone="tint"` render as
  `plain`; `mesh`, `hue` and `meshK` are accepted and ignored so older callers keep building.
  `tone="dark"` re-scopes the dark token set on `--band` (the closing band, the only dark band on a
  page); `tone="deep"` is the same set on the navy.
- **Section head** (`Section.astro` props `num`, `label`, `title`, `lede`; styles in `effects.css`):
  the one head pattern. A mono `.label` with its two-digit `.num` in the accent, the Newsreader
  `.sec-title` in the accent at `--fs-h2-display`, and a `.sec-lede` at `--fs-lede`. From 900px a
  labelled head sets the label in columns 1 to 3 of a 12-column grid and the title and lede from
  column 4.
- **Section rule** (`site/src/layouts/Marketing.astro`): a plain 1px `--line` top border between
  adjacent `<section>` siblings inside `.marketing`.
- **`.card-lum`** (`effects.css`): a flat panel card, the opaque `--panel` fill on a 1px `--line`,
  `--r-lg`, no shadow and no ring.
- **`.lift`** (`effects.css`), hover elevation for cards that are links only: it acts on `a.lift`
  or on `.lift.card-link`, a `translateY(-3px)` plus `--lift` on `.card-lum`, gated behind
  `prefers-reduced-motion: no-preference`. A non-link card stays flat.
- **`.btn-glow`** (`effects.css`), the primary CTA: a flat `--accent` fill with the `--on-accent`
  label; hover is a 1px `translateY` lift. No gradient, no halo.
- **`.label`** (`utilities.css`): the mono uppercase chrome label (12px, weight 500,
  `--track-label`, `--muted`); a `.num` inside it takes the accent.
- **`.bento`** (`effects.css`), a responsive grid: 1 column on phones, 2 from 600px, 4 from 960px,
  with `.bento-2x`/`.bento-2y` span modifiers.
- **`.reveal` / `.reveal-stagger > *` with `--i`** (`utilities.css`): scroll-linked entrance
  animation (see Motion tokens); `--i` offsets each staggered child's animation range.
- **`.story` / `.story-pin`** (`effects.css`), a two-column sticky-scroll layout from 1024px,
  driven by `story.js` toggling `[data-active]`.
- **`.meta`** (`effects.css`): a small inline mono status line with a 6px `--l5-ink` dot.
- **Figure frame** (one for archify diagrams, infographics, charts and the loop): `--panel`, 1px
  `--line`, `--r-lg`, no shadow; a single caption style (mono `FIG.` label, title, description,
  one mono "more" control). There is no pause panel: no mesh, glow or gradient ring behind a figure,
  the At a glance box or a callout.
- **Reading rhythm** (`prose.css`): callouts and top-level tables are `--panel` surfaces on a 1px
  hairline with 32px above and below; h2 carries a hairline and a mono counter; inline code sits on
  `--accent-soft`.
- **Paintings** (public-domain Monet, credits in the footer): the only source of decorative colour.
  A paper panel floating over a painting, painting-topped cards, a strip over the BoK index, the
  closing band veiled with `--band`. Images ship optimised (`srcset`, lazy, `width`/`height`).
- **BookParts**, **CtaBand**, **ChapterHeader**, **type chips**: follow the rules above. Chips and
  type tags are neutral (`--line` border, `--ink-2` text); the five layer colours appear only as a
  swatch on an element that belongs to one layer.
- **`.hero--field`** (scoped in `site/src/pages/index.astro`, home only): the full-viewport
  (`min-height: 100svh`) hero over the Monet painting, unchanged by editorial restraint. `--muted`
  is re-scoped to `--ink-2` on it (and on `.hero--page`) in `effects.css`. The `.hero-center` block,
  in order (each child rises in with the `.hero-in` stagger, `--i` 0 to 3, transform only): the
  `.hero-title`; the `.hero-lede` (one sentence, body face at 17 to 20px, weight 500, `max-width:
  56ch`, ink `--hero-copy` = `--ink`, white over the painting in the dark theme, never dimmed);
  `.hero-ctas`, two buttons: the primary (`.btn-primary.btn-glow`, "Explore the Stack") and
  `.hero-btn-quiet` ("Open controls", a `.btn` on an opaque `--bg` plate with the `--ink` border and
  label, so it never depends on the painting); and `.hero-links`, two text links (the Thesis, the
  frontier route) in mono at `--fs-small`, underlined, `--hero-copy`, arrows `aria-hidden`. Over the
  painting the halo is 90% x 60% at 44% (phones 160% x 56% at 34%), sized so the lede and the links
  hold 4.5:1 on average and 4.3:1 at their worst pixel in both themes (`tests/hero-art.spec.ts`); on
  phones the block tightens so the strip stays in the first viewport at 390x844.
- **`.hero-facts`** (`pages/index.astro`), the strip of figures under the headline: label | value
  pairs computed from the content modules, doubled into an `aria-hidden`+`inert` copy for the
  seamless marquee, with the keyboard-only `.motion-toggle` pause control (see Motion tokens).
  Reduced motion or no JS keeps it a static, centred, wrapping list. The home uses the `frameworks`
  variant (`components/HeroStrip.astro`). Phones (`max-width: 719px`) drop the figures line and keep
  the frameworks line (`tests/hero-art.spec.ts` checks the frameworks link is on screen at
  390x844).
- **Header overlay mode** (`Header.astro` prop `overlay`, threaded from `Base.astro`/`Marketing.astro`
  `overlayHeader`, home only), `data-overlay` makes the bar `position: fixed`, fully transparent (no
  ground, blur, hairline or shadow, `--muted` re-scoped to `--ink-2`) until `.is-scrolled` (`ui.js`,
  >8px), when it falls back to the normal solid bar.

### Open reference primitives

Shared by `/controls`, the control profiles, `/frontier`, `/research`, `/contribute` and `/cases`
(open-reference-project, 2026-09-26). None ships a script or an animation.

- **`FlowDiagram`** (`site/src/components/FlowDiagram.astro`), a chain of 2 to 7 steps in HTML and
  CSS: an `<ol aria-label>` inside `figure.flow`, each step a `.flow-node` (link or span) with an
  optional layer swatch (`data-layer`, `--l1..--l5` fill with its `-ink` hairline) and a `sub`
  line. A container query picks the layout from the figure's own width: a column below 760px, a
  row from 760px (from 1000px when there are more than five steps, `data-wide`). The arrows are
  empty CSS pseudo-elements in an opaque wire ink; labels stay at 16px on a phone. Class names
  never use the `figure-*`, `figc` or `diagram*` families (their stylesheets ship per page).
- **`StatusLine`** (`StatusLine.astro`), the version and review state under a title, never above
  one: `v0.1 · Draft · Open for technical review · Updated 26 Sep 2026`, built on `.meta` but in
  sentence case and `--ink-2`, with the dot in the state's layer ink (draft `--l4-ink`, in review
  `--l1-ink`, published/stable `--l5-ink`, retired `--l3-ink`). With no reviewers it always says
  "Open for technical review".
- **`Provenance`** (`Provenance.astro`), `nav.prov` of pills in the `EditOnGitHub` style: version,
  DOI, cite, edit on GitHub, open an issue (`data-umami-event="open-issue"`).
- **`ContributeCta`** (`ContributeCta.astro`), one `.btn.btn-primary` that opens the GitHub issue
  form for its `kind` (control, assumption, implementation, mapping, note, incident) with the
  title prefilled, plus a text link to `/contribute`. No heading. An `<aside aria-label>` by
  default; `landmark={false}` renders a `<div>` where the call repeats per record.
- **`OpenWork`** (`OpenWork.astro`), `ol.work-list` from `data/work.ts`: title link, state with a
  dot, version, date, one sentence; text in `--ink-2`, so it reads on any ground. Only true states.
- **`ControlRecord`** (`ControlRecord.astro`), one control as `section.ctl[data-control]` with the
  anchor on its H2 (inside `.prose`, for the TOC) and the record as a `dl.cs-facts` (case-page
  style from `styles/harms.css`); the foot links the control's JSON
  (`data-umami-event="control-download"`) and its review form.

## Hard constraints

1. Any animation of an element that may sit in the initial viewport is **transform-only, never
   opacity**: axe/Lighthouse blend fractional opacity into the contrast calculation, and Lighthouse
   does not emulate `prefers-reduced-motion`, so an opacity ramp reads as a permanent contrast
   failure.
2. **Never dim text with `opacity`.** Secondary text uses the `--muted` or `--ink-2` color tokens,
   never a reduced-opacity `--ink`.
3. **`--muted` fails AA on the dark band and over the hero art.** It is re-scoped to `var(--ink-2)`
   on `.hero--page` and `.hero--field`, and the full dark token set (with `--muted` at `--ink-2`) is
   re-scoped inside `.sec--dark`, all in `effects.css`. There are no tinted bands; the one dark
   band goes through `<Section tone="dark">` rather than a hand-rolled background colour.
4. **Never put `.reveal`, a `transform`, or `will-change` on an ancestor of `.story-pin`.** A
   transformed ancestor creates a new containing block and breaks `position: sticky`.
5. **All client scripts are external files.** The CSP is `script-src 'self'` with no inline scripts
   or `unsafe-inline`; every interactive behavior ships as its own `/*.js` file (e.g. `ui.js`,
   `nav.js`, `story.js`, `map.js`, `stack.js`, `path.js`, `matrix.js`, `crosswalk.js`, `diagram.js`,
   `countup.js`).
6. **Every animation respects `prefers-reduced-motion`.** Motion rules live inside
   `@media (prefers-reduced-motion: no-preference)` blocks (or an explicit `reduce` override), never
   unconditionally.
7. **No halos, glows, gradient rings or resting shadows.** Separation is a 1px hairline; the only
   shadow is `--lift`, on hover.
8. **One numbering motif.** A mono `01, 02...` number is the repeated motif: home sections (the
   Section head's `.label .num`), the rail's parts, prose h2 and the TOC. No other eyebrow or badge
   above a heading.

## Quality gates

Run in this order: `npm run build` (astro check + build + content-lint + link-check) → `npm test`
(Playwright default project) → `npm run test:a11y` (axe, zero serious/critical violations, light and
dark themes, 1440 and 390 viewports) → `npm run test:visual` (Playwright visual project) → `npm run
lhci` (Lighthouse CI: performance ≥ 0.95, accessibility/best-practices/SEO = 1) → `npx impeccable
detect dist` (anti-pattern count must not rise versus the recorded baseline; no new rule categories).

## Do / Don't

- Do use `--accent` for links, active states and emphasis, and the five layer colours only where a
  layer is meant, as a swatch or a 3px edge (charts keep them as data colours).
- Do route the dark band through `<Section tone="dark">` so `--muted` stays AA-compliant.
- Do keep all scroll-reveal and hover motion inside `--dur`/`--ease` and transform-only for anything
  above the fold.
- Don't fill a UI surface with a gradient or a hue: the paintings are the only decorative colour.
- Don't add a new font family; the site has exactly three (Newsreader for display, Instrument Sans
  for body, JetBrains Mono for labels).
- Don't nest `.card-lum` inside another `.card-lum`.
- Don't put a dot or grid texture behind content, and don't give a non-link card a hover lift.
- Don't add inline `<script>` tags or inline event handlers; the CSP forbids them.
- Don't dim, gray-out or opacity-fade text for a "disabled" or "secondary" look: use `--muted` /
  `--ink-2` or a `--line`-bordered treatment instead.
