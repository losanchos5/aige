# Distill (de-slop) worklist — feat/ui-refinement

Análisis de solo lectura (2026-09-23) sobre el worktree `D:\Documents\aige\.claude\worktrees\ui\site`,
a partir de `npx impeccable detect dist --json` (119 hallazgos en el sitio, excluido `dist/diagrams/`),
del catálogo de reglas de impeccable y de capturas del sitio en local. Entrada para la sesión que haga
la pasada "distill". Se conservan: los 5 colores de capa (`--l1..--l5` + inks), números tabulares, el
trío Bricolage Grotesque / Instrument Sans / JetBrains Mono, y el concepto de register-rule si se rehace
como hairline plano sin contador.

## A. Hallazgos del detector (solo sitio)

| Regla | Nº | Ficheros principales | Ejemplo | Arreglo según impeccable |
|---|---|---|---|---|
| cramped-padding | 73 | resources/tools (20), stack (17), index (15), path (10), role (8) | hijos de `<section>` pegados al border-top, sin inset | ≥ 8 px (ideal 12–16) de padding dentro de contenedores con borde o color |
| side-tab | 21 | changelog/path CSS, bok/definition, bok/glossary, bok/maturity-model, bok/patterns | `.glance:after` — franja absoluta de 3 px (left: 0) | quitar el borde de acento o tratamiento más sutil |
| em-dash-overuse (aviso) | 6 | changelog (75), bok/definition (48), reading-list (64), the-stack, glossary, thesis | "N em-dashes in body text" | comas, dos puntos, puntos |
| layout-transition | 5 | pagefind-ui.css, chunks CSS de changelog/index/stack | `transition: width/height` | animar transform/opacity |
| all-caps-body | 4 | bok/maturity-model, bok/regulatory-map, bok/the-stack, index | `text-transform: uppercase` en 30–55 caracteres de cuerpo | mayúsculas solo en etiquetas cortas |
| flat-type-hierarchy | 3 | bok, thesis, es/thesis | tamaños 13/15/16 px (ratio 1.2) | menos tamaños, ratio ≥ 1.25 |
| border-accent-on-rounded | 3 | chunks CSS de crosswalk/index/path | `border-bottom: 3–6px solid` en elemento redondeado | quitar borde o radio |
| codex-grid-background | 2 | chunk CSS de changelog ×2 | fondo de líneas finas en mosaico | rejillas solo en superficies tipo mapa/plano |
| tight-leading | 1 | bok/regulatory-map | line-height 1.0 | 1.5–1.7 en cuerpo |
| overused-font | 1 | chunk CSS de changelog | `font-family: Instrument Sans` | falso positivo: es la fuente de cuerpo elegida |

## B. Slop que el detector no ve (va por variables CSS o contenido generado)

- **Kicker/eyebrow sobre el título** (prohibido por el catálogo): `src/components/Kicker.astro`
  (`.kicker .label { text-transform: uppercase; letter-spacing: var(--tracking-label) }`), usado en las
  6 secciones de `src/pages/index.astro` y en `PageHero.astro` / `ChapterHeader.astro` en todas las
  páginas interiores ("THE ROLE", "THE STACK", "BODY OF KNOWLEDGE · Chapter 04").
- **Etiquetas numeradas de sección**: `src/layouts/Marketing.astro`, contador CSS en `::before`
  (`.marketing > section + section::before { content: counter(rule, decimal-leading-zero) }`).
- **Malla + textura de puntos/rejilla en todos los heroes y secciones**: `src/styles/effects.css`
  `.bg-mesh` (gradiente radial de 5 paradas con deriva animada), `.bg-dots` / `.bg-grid`, vía props
  `tone="mesh"` / `texture="dots|grid"` de `Section.astro` y `PageHero.astro`. Home hero
  (`index.astro:95-96`), `/role`, `/stack`, hero de `/bok/the-stack`, secciones "Three questions",
  "BoK" y "role".
- **Tarjetas dentro de tarjetas + side-tab en redondeado**: `AtAGlance.astro` `.glance::after` (franja
  arcoíris de 3 px, `border-radius: var(--r-lg)`) envuelve una lista dentro de una caja `card-lum`,
  dentro a su vez de la banda de `ChapterHeader`.
- **Chip badge**: "Chapter 04" como píldora rellena junto al kicker en las páginas del BoK.
- **Borde fino + sombra ancha / glow**: `.card-lum` (borde 1 px + `--shadow-1` + anillo degradado en
  hover) y `.btn-glow` / `CtaBand` (`box-shadow: 0 8px 24px var(--glow-1)`) en el CTA del hero y en los
  stat tiles.
- **Copy aforístico**: banda oscura "verdict beat": "A policy is not a control. An eval that can fail
  the build is."
- **Chip de "liveness" falsa**: panel del hero `<span class="meta hero-live">…live</span>` con punto
  verde estático junto a "run #4821" / "attestation #4821".
- **Ticker con chips de color**: `VerdictTicker` en la banda oscura (BLOCK/PASS/TRUE en movimiento
  continuo); si es un marquee en bucle, es patrón prohibido.

## C. Lista de trabajo priorizada (home primero)

1. **~~Quitar malla + rejilla del hero~~ — DECISIÓN DE JORDI (2026-09-23 18:50): la malla/gradiente
   se CONSERVA, es identidad del sitio, no slop.** No tocar `.bg-mesh` ni los gradientes de
   `.card-lum` / `.btn-glow`. Sobre la rejilla (`.bg-grid` / `.bg-dots`) Jordi aún no ha decidido:
   preguntar antes de quitarla.
2. **Eliminar los kickers en todo el sitio** (`Kicker.astro`, llamadas `<Section kicker=…>` en
   `index.astro`, `PageHero.astro`, `ChapterHeader.astro`): integrar la etiqueta en el título o en las
   migas; borrar el bloque eyebrow.
3. **Quitar los contadores de register-rule** (`Marketing.astro` `::before`): dejar el hairline
   `border-top: var(--line)` entre secciones, sin numeral.
4. **Arreglar cramped-padding** (73; peor en tools/stack/index/path): `--s-3` / `--s-4` de padding en
   wrappers de sección y tarjetas con borde.
5. **Quitar la franja `.glance::after`** (`AtAGlance.astro`): caja `card-lum` plana sin acento.
6. **Aplanar el chip "Chapter 04"**: texto mono tras un punto medio, no píldora rellena.
7. **Domar el glow** de `.card-lum` / `.btn-glow` / `CtaBand`: sin sombra de color; hairline 1 px o
   elevación `--shadow-1`, no ambos.
8. **all-caps-body / tight-leading** en bok/maturity-model, regulatory-map, the-stack: mayúsculas solo
   en etiquetas cortas, line-height ≥ 1.3.
9. **Reescribir la línea del "verdict beat"** sin cadencia X. / Y.
10. **Dejar el footer** (rejilla + marca de agua): `Footer.astro` lo documenta como decisión mantenida.

Después: `/impeccable audit` + `critique` (informe de aige-c9 en `impeccable-audit.md` de esta
carpeta), regenerar screenshots, cadena completa (`npm run build` → `npm test` → `test:a11y` →
`test:visual` → `lhci`, con `PW_PORT=4420`) y `npx impeccable detect dist` (objetivo: muy por debajo
de 119 en el sitio).

## D. El artefacto "Know|edge" del botón secundario

No existe en el código: `innerHTML` plano, sin pseudo-elementos ni spans, sin ligaduras, fuente
variable autoalojada; Chromium lo renderiza limpio a 1440×900. Es un artefacto de hinting/ClearType
del navegador que hizo la captura. No hay nada que arreglar en `index.astro` ni `base.css`.

Capturas de referencia (scratchpad de la sesión 2f0a7d95): `deslop-before-home.png`,
`deslop-before-role-hero.png`, `deslop-before-stack-hero.png`, `deslop-before-bok-the-stack-hero.png`.
