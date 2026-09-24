# Auditoría impeccable definitiva (critique + audit): aigovernanceengineer.com

Informe de síntesis. Es la entrada de la sesión distill. No contiene trabajo de campo nuevo: funde tres informes (A diseño, B detector, C auditoría técnica) en una lista única de hallazgos con ID estable.

## 1. Procedencia

| Campo | Valor |
|---|---|
| Fecha | 2026-09-23 |
| Objeto | 14 rutas (`/`, `/thesis`, `/role`, `/stack`, `/path`, `/map`, `/bok`, `/bok/the-stack`, `/resources`, `/resources/glossary`, `/resources/crosswalk`, `/resources/frameworks`, `/about`, `/404`) × 1440/390 × claro/oscuro |
| Base evaluada | Build del commit `fa66a34` (rama `feat/ui-refinement`), snapshot de `dist` de las 18:27, servido en `http://localhost:4450`. Todos los números de línea son de `fa66a34`. |
| Cambios durante la evaluación | La rama se fusionó con `main` (`b0a8a4e`, `d114ac0`), después se mergeó a `main` vía PR #17 (`fc2d778`) y se desplegó. La sesión distill (bloque 1, home) dejó ediciones sin commitear en `index.astro`, `effects.css`, `Marketing.astro`, `ValuePair.astro` y `VerdictTicker.astro`. No cambian el diagnóstico visual, pero en esos cinco ficheros los selectores y las líneas pueden haberse movido. |
| Procedimiento | A (diseño, `/impeccable critique`) y B (detector) corrieron en subagentes aislados, en paralelo y sin ver la salida del otro, como exige `critique.md`. C (`/impeccable audit`) corrió en un tercer subagente. Esta síntesis se hizo después. |
| Herramientas | Plugin impeccable 4.3.1 (motor 0.1.5, CLI 4.0.0), Playwright 1.63 / Chromium 153, axe-core 4.13 y un barrido de contraste por píxeles propio (21.616 textos). El overlay del detector en navegador sí funcionó: 13 páginas × 2 temas a 1440. |
| No ejecutado | `lhci`, `npm test` / `test:*` y `build`. La CSP se leyó del fichero `_headers`, no del servidor. |
| Informes de campo y datos | §11 |

## 2. Restricciones del propietario

Decisión de Jordi del 2026-09-23, tomada tras ver el bloque 1 de distill:

| Elemento | Estado | Efecto en este informe |
|---|---|---|
| Malla: `.bg-mesh` / `.hero-mesh` / `<Section tone="mesh">` | **Se conserva** (identidad del sitio) | Ningún hallazgo propone quitarla. Los ajustes posibles van en §8, marcados como opcionales y sujetos a Jordi. |
| Anillo `--grad-border` de `.card-lum` | **Se conserva** | SL-13 quita la sombra y el `lift`, no el anillo (MS-05). |
| Relleno `--grad-cta` de `.btn-glow` | **Se conserva** | SL-14 toca solo el halo `--glow-1`, y con confirmación. |
| Rejilla `.bg-grid` / `.hero-tex` (y puntos `.bg-dots`) | **Pendiente de Jordi** | SL-17 y SL-18 llevan «Jordi»: son propuestas, no órdenes. |
| Footer (rejilla + marca de agua) | `Footer.astro` lo documenta como decisión mantenida (worklist C.10) | SL-17 lleva «Jordi». |

**Ya en curso en la home** (sesión distill, sin commit): rejilla del hero, kickers en chip, numerales del register rule, chip «live», bucle del ticker y frase del verdict beat. Esos hallazgos llevan «en curso» y no hay que rehacerlos. Sí hay que extenderlos al resto de rutas cuando el hallazgo es transversal (SL-03, SL-04).

**Conflicto que decide Jordi:** A considera la frase del verdict beat («A policy is not a control. An eval that can fail the build is.») la mejor línea del sitio y pide conservarla. La worklist (C.9) y la sesión distill la están quitando.

## 3. Resumen ejecutivo

### 3.1 Puntuaciones

**Crítica de diseño (A): 28/40, «Good»,** en el límite inferior de la banda 28–35. La carga cognitiva es moderada: fallan 3 de 8 comprobaciones (foco único, jerarquía y memoria de trabajo).

| # | Heurística | Nota | Clave |
|---|---|---|---|
| 1 | Visibilidad del estado | 3 | El estado real se comunica bien (nav, sidebar, TOC, progreso de `/path`, story-pin). El hero de `/` muestra un estado falso («● LIVE», «run #4821»). |
| 2 | Correspondencia con el mundo real | 3 | Vocabulario exacto (BLOCK/PASS, eval gate), pero el color de capa tiene tres significados. |
| 3 | Control y libertad | 3 | Esc devuelve el foco. En contra: el clic tras el hover cierra el mega-menú y la búsqueda necesita dos Esc. |
| 4 | Consistencia y estándares | 2 | Cinco cabeceras de página, dos cierres de drawer y mono mayúsculas para todo. |
| 5 | Prevención de errores | 3 | El reset de `/path` pide dos pasos y la newsletter explica qué pasa con el email. |
| 6 | Reconocer antes que recordar | 3 | Mega-menú, migas y TOC, pero hay cuadraditos de capa sin etiqueta. |
| 7 | Flexibilidad y eficiencia | 3 | Ctrl/⌘K, CSV/JSON y filtros, pero los resultados de búsqueda salen sin estilo. |
| 8 | Estética y diseño minimalista | 2 | La periferia decorativa compite con el contenido. |
| 9 | Recuperación de errores | 3 | La 404 tiene concepto propio, pero no ofrece búsqueda. |
| 10 | Ayuda y documentación | 3 | Glosario y alternativas textuales, pero falta la leyenda del chip «related». |

**Auditoría técnica (C): 15/20, «Good».**

| # | Dimensión | Nota | Clave |
|---|---|---|---|
| 1 | Accesibilidad | 3 | Texto SVG bajo AA en 5 rutas y drawer cerrado enfocable. |
| 2 | Rendimiento | 3 | Sitio ligero, pero `pulse-up` anima `top` en bucle y hay animaciones perpetuas en la home. |
| 3 | Responsive | 3 | Reflow roto a 320 y texto de diagramas de 2–5 px a 390. |
| 4 | Theming | 3 | Tokens coherentes, pero el set oscuro está triplicado, Shiki va con su paleta y los scrims están hard-coded. |
| 5 | Integridad de implementación | 3 | Incumple 3 de las 6 hard constraints y el sticky del Doc está roto. |

### 3.2 Veredictos

- **Especificidad de diseño: falla parcialmente.**
  - **Pasa en la capa de referencia:** tesis, capítulos del BoK, glosario, crosswalk, tablas de `/role`, índice de obligaciones, `/map` y la 404 («Verdict: BLOCK. Route not registered.»).
  - **Falla en landing y chrome** (`/`, `/role`, `/stack`, `/path`, hero de `/map`, `/resources`, `/404`). Si en el hero se cambia el titular, lo que queda sirve a cualquier startup de compliance: telemetría simulada, franja de cifras con count-up, bento con tesela vacía, ticker, banda CTA oscura y secciones 01–07 con eyebrow + H2 + lede.
  - Por la restricción de §2, la parte de la falla que viene de la malla no se corrige. El resto sí.
- **Integridad de implementación: PASS con reservas** (C 3/4; B coincide con 3/4). El sistema es propio y coherente, pero:
  - incumple 3 de las 6 hard constraints de DESIGN.md: `opacity` en la entrada del hero (HOM-4), texto atenuado con `opacity` (STK-1, TC-10, FRW-1) y `--muted` sobre malla (MS-03);
  - los raíles sticky del Doc no funcionan (TC-06).

### 3.3 Recuentos

Recuentos brutos por informe:
- **A:** 18 patrones (13 confirmados, 3 parciales, 2 refutados), 5 problemas prioritarios (4 P1, 1 P2) y 14 observaciones menores.
- **B:** 5851 hallazgos, 2187 de ellos en el sitio: 30 reales, 90 decisiones documentadas, 6 de copy y 2061 falsos positivos.
- **C:** 24 hallazgos (0 P0 · 5 P1 · 8 P2 · 11 P3).

Tras desduplicar (un hecho visto por varios cuenta una vez):

| Métrica | Valor |
|---|---|
| Hallazgos únicos | **98**: 22 patrones de slop (SL), 39 de página (§5), 27 técnicos (TC), 9 de malla (MS, §8) y 1 del detector (DET) |
| Por impacto | P0 0 · P1 10 · P2 39 · P3 49 |
| Por eje | P1 contraste/jerarquía 46 · P2 ritmo/espaciado 28 · P3 movimiento 8 · n/a funcional/copy/código 16 |
| Por bloque primario | D1 11 · D4 18 · D2 27 · D3 15 · D5 13 · D6 4 · sin bloque 10 |
| ¿Amplía el alcance? | no 60 · sí 17 · pendiente de Jordi 11 · sin bloque 10 |
| Fuera del cambio actual (sí + sin bloque) | 27 |
| Estado | 6 ya en curso en distill (home) · 8 bugs (TC-01–TC-07 y RES-1) |

### 3.4 Los 10 hallazgos que más cambian el sitio

1. **SL-06.** El color de capa no tiene significado estable.
   - Dónde: `crosswalk.css` `.cw-chip[data-type]`, `resources.css` `.type-tag[data-type]`, `Doc.astro` `headerLayers[order % 5]` y `ValuePair.astro`.
   - Rutas: `/resources/crosswalk`, `/resources/frameworks`, `/bok/*`, `/`, `/resources`.
   - Arreglo: `--lN` solo para la capa N.
2. **SL-07.** Las figuras archify se colorean por `kind` y no por capa: la figura del capítulo 04 pinta las cinco capas en rosa y ámbar.
   - Dónde: `diagrams.css` `.c-*`.
   - Rutas: `/`, `/bok/the-stack`, `/resources/frameworks`.
   - Fuera de alcance.
3. **SL-01.** Telemetría inventada en el hero: pip LIVE, `#4821`, sello girado y ticker de logs.
   - Dónde: `index.astro` `.hero-live`, `.hero-stamp`, `.hero-attn` y `VerdictTicker.astro`.
   - Ruta: `/`.
   - En curso en parte.
4. **STK-1.** Cuatro nombres de capa a ~2:1 en la primera pantalla.
   - Dónde: `StackFlow.astro` `[data-band]:not(.is-active) { opacity: .4 }`.
   - Ruta: `/stack`.
5. **TC-08 + TC-09.** Etiquetas de diagrama bajo AA (3,67:1 y 2,15:1) y renderizadas a 2–7 px.
   - Dónde: `diagrams.css` `.t-muted` / `.t-dim` y SVG de `diagrams-build.mjs`.
   - Rutas: `/`, `/thesis`, `/role`, `/bok/the-stack`, `/resources/frameworks`.
6. **SL-04 + SL-03.** Fórmula eyebrow + H2 + lede y numeración 01–07 en cada sección.
   - Dónde: `Kicker.astro`, `PageHero.astro` `.hero-eyebrow` y `Marketing.astro` `section + section::before`.
   - Rutas: `/`, `/role`, `/stack`, `/path`, `/map`, `/resources`.
   - La home ya está en curso; faltan las demás rutas.
7. **SL-05.** Entre 50 y 150 textos en mono mayúsculas por página, que aplanan la jerarquía.
   - Dónde: `.meta`, `.sec-link a`, botones y `.res-table thead th`.
   - Rutas: todas.
8. **SL-19.** Cierre de plantilla en cada landing; en tema oscuro es una losa crema.
   - Dónde: `CtaBand.astro` `.band { background: var(--ink) }`.
   - Rutas: `/`, `/role`, `/stack`, `/path`.
9. **TC-06.** TOC y sidebar no se pegan: la orientación se pierde en capítulos de hasta 18.000 px.
   - Dónde: `Doc.astro` `.doc-sidebar { inset: auto }` y `Toc.astro` `.toc`.
   - Rutas: `/bok/*`.
10. **TC-05.** Resultados de búsqueda sin estilo y `<mark>` amarillo del navegador.
    - Dónde: `SearchDialog.astro` `.search-result*` (reglas con ámbito que no alcanzan a los nodos de `search.js`).
    - Rutas: todas.

## 4. Patrones de slop por componente

**Leyenda:**
- **Eje:** P1 contraste/jerarquía (lo que se lee y cuánto destaca: contraste, peso, color, tipografía), P2 ritmo/espaciado (layout, alineación, responsive, microtipografía), P3 movimiento. «sin bloque» marca lo funcional, de copy o de código.
- **Imp.:** severidad de impacto de P0 a P3.
- **Visto por:** A = diseño, B = detector, C = técnica.
- **Tokens:** todas las sustituciones usan solo tokens de DESIGN.md.
- **Estado:** «en curso» = ya lo hace distill en la home; «Jordi» = decisión pendiente.

| ID | Patrón | Ficheros + selectores | Rutas | Anchos/temas | Visto por | Eje · imp. | Quitar / conservar / sustituir | Estado |
|---|---|---|---|---|---|---|---|---|
| SL-01 | **Telemetría simulada en el hero.** Pip «● LIVE», «run #4821», «attestation #4821», sello PASS girado y ticker de logs inventados («eval.safety 0.97», «pii.leak detected»). Contradice «Sourced / No hype» de PRODUCT.md. El ticker solo se pausa con hover y con `reduce` queda truncado a ~1/5. | `index.astro` `.hero-panel-bar .meta`, `.hero-live`, `.hero-stamp` (`rotate(-6deg)`), `.hero-attn`; `VerdictTicker.astro` `.vt-track` (`vt-scroll` 42/30 s infinito) | / | todos | A S11 · B marquee, dark-glow · C P1-5, P2-5 | P1 · imp. P1 | Quitar pip, números de run/attestation, rotación y ticker. Conservar `VerdictStamp` sin girar y el diagrama del bucle como figura estática con leyenda. Si el ticker se queda: pausa por foco/botón y `flex-wrap` con `reduce`. | en curso (chip live, bucle del ticker) · amplía |
| SL-02 | **Movimiento perpetuo en la home.** Paquete rAF de `hero.js` que no para, `hero-closes-march`, `bar-flash` ×5 y `pulse-up`, que anima `top` (relayout en cada frame). Son 6 tipos (C) y ~9 instancias (A). Compite con el titular y no tiene pausa por teclado. | `public/hero.js`; `index.astro` `hero-closes-march`; `StackDiagram.astro` `.d-pulse` (`pulse-up`), `.d-bar::after` (`bar-flash`) | /, /stack | todos · solo `no-preference` | A (movimiento) · C P2-6 | P3 · imp. P2 | Mínimo: `pulse-up` con `transform: translateY` y pausa fuera del viewport. Recomendado: quitar los bucles y dejar `flow-draw`, reveals y drawers. `mesh-drift` va en MS-04. | n/a |
| SL-03 | **Register rule numerado 01–07.** Contador 01–07 que nadie referencia. Compite con cinco numeraciones de contenido (preguntas 01–03, capas 01–05, capítulos 00–10, valores 01–08, workflows 01–07) y deja tres niveles de etiqueta por sección. | `Marketing.astro` `.marketing > section + section::before { content: counter(rule, decimal-leading-zero) }` | /, /role, /stack, /path, /map, /resources | todos | A S3 · worklist B | P1 · imp. P2 | Quitar el contador y conservar `border-top: 1px solid var(--line)`. Reservar los ceros a la izquierda para capas y capítulos. Actualizar DESIGN.md («Register-rule dividers»). Revierte la tarea 6.2. | en curso (home) · amplía |
| SL-04 | **Fórmula eyebrow + H2 + lede y chips de kicker.** Eyebrow + H2 + lede en 6–8 secciones por página. PageHero apila dos eyebrows. Hay chips «Chapter 04» y «FIGURE», y un swatch de color de kicker que no significa nada. | `Kicker.astro` `.kicker .label`/`.square`; `PageHero.astro` `.hero--landing .hero-eyebrow :global(.kicker .square)` + `.hero-eyebrow > .meta`; `ChapterHeader.astro` `.ch-kicker-num`; `figures.css` `.figure-fig-chip`; `index.astro` `kickerSwatch` | /, /role, /stack, /path, /map, /bok, /bok/*, /thesis | todos | A S4 · worklist B, C.2 | P1 · imp. P2 | Kicker solo si aporta un dato que no dice el H2 (p. ej. «Body of Knowledge · v0.4.0 · CC BY 4.0»). Un solo eyebrow en PageHero: el enlace al capítulo como línea `--fs-small` bajo el lede. Fuera el chip FIGURE (el `<figcaption>` basta). Swatch `--ink` o ninguno. | en curso (kickers-chip de la home) · amplía |
| SL-05 | **Mono mayúsculas omnipresente.** Mono en mayúsculas en botones, enlaces, etiquetas de 31–55 caracteres y cabeceras de 11 px. Todo «susurra en voz alta» y la jerarquía se aplana. | `Kicker`; `.meta` (`effects.css`); `.sec-link a`; `.chapter-link` (`pages.css`); botones DOWNLOAD CSV/JSON, EXPAND ALL, RESET PROGRESS, CLOSE; `.res-table thead th`, `.mx-rowh` (11 px); etiquetas de `StackLayerPanel` (6 por tarjeta); colofón `p.meta` de `Footer.astro`; `StackFlow` `.fp-eyebrow`; `PathMap` `.stage-tagline`, `.path-edges-hint`; `ObligationTable` `legend`; miga actual de `Breadcrumb`; `prose.css` `thead th` | todas (/resources/frameworks 150, /path 103, /stack 75, /map 62, /role 59, / 52) | todos; más denso a 390 | A S14 · B all-caps-body 58 (D) · C (lo da por prescrito) | P1 · imp. P2 | Mono mayúsculas solo para identificadores (`Art. 9`, versiones, fechas, «ch. 08») y cabeceras de tabla a `--fs-label`. Botones y enlaces en `--font-body` `--fs-small` con capitalización de frase. Etiquetas de 40 caracteres o más, en capitalización de frase. | n/a · amplía |
| SL-06 | **Colores de capa sin significado estable.** Los cinco `--lN` rotan con `% 5` en numerales, cabecera y chips de capítulo, y en swatches. También se reutilizan para el tipo de marco: el azul significa «law» y «Layer 01» en la misma pantalla del crosswalk, y la cabecera del capítulo 04 sale verde. | `ValuePair.astro` `tint = var(--l${((n-1)%5)+1})`; `Doc.astro` `headerLayers[order % 5]`; chips de número de `/bok` y `ChapterGrid`; `kickerSwatch`; swatches de `ResourceCard`; `crosswalk.css` `.cw-chip[data-type]`; `resources.css` `.type-tag[data-type]` | /, /bok, /bok/*, /resources, /resources/crosswalk, /resources/frameworks | todos | A S6 · C lo cita como positivo · DESIGN.md l.164 lo permite | P1 · imp. P1 | Regla: `--lN` solo si el elemento pertenece a la capa N. Chips de tipo en neutro (`--surface` + 1 px `--line` + `--ink`, distinguidos por contorno o etiqueta). Cabecera y chips de capítulo con `--ink-2` sobre `--tint-bg`. Numerales en `--muted`. Revierte la tarea 8.2 y toca el requisito de color de capítulo de `reading-experience`. | n/a · amplía |
| SL-07 | **Figuras archify coloreadas por kind, no por capa.** El color de los nodos depende del tipo técnico: «Layer 01» sale ámbar en el hero; la figura del capítulo 04 pinta las cinco capas en rosa y ámbar, con la leyenda «Database / Security»; y el diagrama «obligation → evidence» va justo encima del heat index, que sí colorea bien. Incumple VISUAL-GUIDE §1.6. | `diagrams.css` `.diagram svg .c-frontend→--l1`, `.c-backend→--l2`, `.c-database→--l3`, `.c-security→--l4`, `.c-cloud→--l5`; IR en `site/diagrams/*.json` | /, /bok/the-stack, /resources/frameworks | todos | A S7 | P1 · imp. P1 | Colorear por grupo o zona de capa (la IR ya nombra «Layer 0N»). Nodos sin capa en `c-external` (`--bg` + `--muted`). Leyenda por capa. Queda fuera de alcance: es Non-Goal de design.md y está en PENDIENTE.md. | n/a |
| SL-08 | **Raíl lateral en callouts.** Barra de 3 px en «NOTE» e «IN PRACTICE». Es neutra y no codifica nada: el tipo ya se distingue por el tinte y la etiqueta. | `Callout.astro` `.callout { border-left: 3px solid var(--rail) }`; `prose.css` `.prose .callout` | /bok/* (patterns ×17, the-stack, values-and-principles, regulatory-map), /stack, /resources/crosswalk | todos | A S5 · B side-tab 18 R · C advisory | P1 · imp. P2 | Borde completo de 1 px `--line` con la etiqueta dentro, o `--tint-bg` sin raíl. | n/a |
| SL-09 | **Raíl degradado en AtAGlance.** Degradado de capas l1→l5 de 3 px sobre una lista que no es de capas: decoración. | `AtAGlance.astro` `.glance::after` | /bok/* | todos | A S5 · worklist C.5 · B FP | P1 · imp. P3 | Quitarlo. Caja plana `--surface` + 1 px `--line`. | n/a |
| SL-10 | **Raíl degradado en el pullquote.** Degradado `--l5-ink`→`--l5` en el pullquote de «The role». | `index.astro` `.pullquote::before` | / | todos | A S5 · B FP (convención de cita) | P1 · imp. P3 | Conservar un raíl de cita plano (`--line` o `--ink-2`, 2–3 px), sin degradado ni color de capa. | n/a |
| SL-11 | **Banda de 8 px en StackLayerPanel.** Es la tercera codificación de la capa (ya están el número, el nombre y las barras fijas). | `StackLayerPanel.astro` `.layer-panel .band` | /stack | todos; en oscuro casi desaparece | A S5 | P1 · imp. P2 | Sustituirla por un cuadrado de capa `--lN` junto al número. | n/a |
| SL-12 | **Raíl de capa en nodos core.** Borde de tinta grueso + raíl de 3 px: se lee como una tarjeta «admonition». Como la franja codifica la capa, no es slop puro. | `PathNode.astro` `.path-node { border-left: 3px solid var(--c) }` | /path | 1440 | A S5 · B FP (codifica la capa) | P1 · imp. P3 | Opcional: cuadrado de capa junto a «CORE» y borde uniforme. | n/a |
| SL-13 | **Elevación uniforme (sombra + lift en todas las tarjetas).** Preguntas, valores, capítulos, recursos, estadísticas y PrevNext tienen el mismo peso elevado. Si todo flota, nada destaca. | `effects.css` `.card-lum` (`--shadow-1`), `.lift:hover { translateY(-3px) }`; `PrevNext.astro` | / (30 card-lum / 29 lift), /role (13/10), /stack (5), /resources (6/6), /bok/* (3/2) | todos; `lift` solo con `no-preference` | A S8 · B gpt-thin-border (D) · worklist C.7 | P1 · imp. P2 | Tarjetas planas: 1 px `--line` y fondo `--bg`/`--surface`, sin sombra. `lift` solo en tarjetas que son enlace. `--shadow-1` para drawers, menú y diálogo. **Conservar el anillo `--grad-border`** (MS-05). Revierte 5.3 y 6.4. | en curso (sombra de `.card-lum`) · amplía |
| SL-14 | **Halos de color en CTA y hero-panel.** Halo sin desplazamiento: `.hero-panel` (`0 0 40px var(--glow-1)`), `.btn-glow` y `.cta-primary` de CtaBand. | `index.astro` `.hero-panel`; `effects.css` `.btn-glow`; `CtaBand.astro` `.cta-primary` | /, /role, /stack, /path | todos | A S8 · B dark-glow R (hero-panel), D (`.btn-glow`, CtaBand) | P1 · imp. P3 | Quitar el halo `--glow-1` y **conservar siempre el relleno `--grad-cta`**. `.btn-glow` es una primitiva de identidad: confirmar con Jordi. | en curso (halo del hero-panel) |
| SL-15 | **Bento con teselas medio vacías.** La tesela 01 de valores mide ~400 px de alto con dos líneas. Frameworks y The map ocupan 2 columnas en el hub. Preface ocupa 2 columnas con una línea. El tamaño no refleja la importancia. | `effects.css` `.bento-2x/-2y`; `index.astro` values (`n===1` → 2×2, `n===6` → 2×); `pages/resources/index.astro` `ul.bento.rc-bento`; `ChapterGrid` | /, /resources | 1440 y 834 (a 390 es una columna) | A S9 | P2 · imp. P2 | Rejilla uniforme sin spans (valores 2×4, hub 3×2) o lista numerada, como en `/thesis`. | n/a · amplía |
| SL-16 | **Numerales fantasma.** Tipografía usada como textura: numerales de valores de 2,5–4 rem y «01/02/03» decorativos. | `ValuePair.astro` `.pair-bento .index` (`color-mix(var(--tint) 70%, var(--bg))`); `DefinitionCards`; hub de recursos | /, /resources | todos; en oscuro casi invisibles | A S10 | P1 · imp. P3 | Numerales al tamaño del texto, en mono `--fs-label` `--muted`, o fuera. | n/a |
| SL-17 | **Footer: rejilla y marca de agua.** Rejilla de 48 px y marca de agua gigante al 10 % (repite el logotipo ~1.000 px más abajo). Los números `.num` (`--muted`) bajan a p10 3,83:1 sobre las líneas de la rejilla. | `Footer.astro` `.site-footer::before`, `.foot-wordmark`, `ol.fchap .num` | todas | todos | A S2, S10 · B codex-grid (D), low-contrast del wordmark (FP) · C P3-10 · worklist C.10 | P1 · imp. P3 | Rejilla y marca de agua pendientes de Jordi (decisión documentada). Con independencia de eso, `.num` → `--ink-2`. Si se quita la rejilla, `--tint-bg` plano. | Jordi |
| SL-18 | **Rejilla y puntos detrás del contenido.** Papel cuadriculado o de puntos detrás de tablas y de la rejilla de nodos, justo donde hay que leer. Junto con la malla forma el cliché «malla + rejilla». | `index.astro` `.hero-tex.bg-grid.bg-fade`; `PageHero.astro` `.hero-tex.bg-dots(.bg-fade)`; `Section.astro` `texture="dots\|grid"` (home: three questions y chapters; `/path` The path; `/stack` The tools); `ChapterHeader.astro` (puntos de 14 px) | /, /path, /stack, /map, /resources*, /thesis, /bok/*, /about | todos | A S2 · B codex-grid (D) | P1 · imp. P2 | Pendiente de Jordi. Propuesta mínima si se conserva: nunca detrás de tablas ni de la rejilla de nodos (`/path`, tools de `/stack`). | Jordi · en curso (rejilla del hero de la home) |
| SL-19 | **CtaBand de cierre en cada landing.** «Open, versioned, contributable» + dos botones: el cierre de cualquier SaaS. En oscuro, `--ink` = `#ECEAE3` la convierte en una losa crema, lo más brillante de la página. En `/role` y `/stack` va pegada a otra banda oscura. | `CtaBand.astro` `.band { background: var(--ink); color: var(--bg) }` | /, /role, /stack, /path | todos; crítico en oscuro | A S13 | P1 · imp. P2 | Sustituirla por una línea `.sec-link` («Read chapter 04 in full →») o por `tone="tint"` (`--tint-bg`), que respeta el tema. `/map` y `/bok` no tienen CtaBand y no les falta. La malla y la línea degradada de la banda van en MS-07. | n/a · amplía |
| SL-20 | **Franja de salarios en la home, duplicada en /role.** Las únicas cifras de la home son salarios (IAPP, con fuente): desplazan el registro de referencia hacia marketing de carrera. El mismo bloque se repite en «The market» de `/role`. | `StatTile.astro`; `index.astro` `.stats-row`; `role.astro` «The market» | /, /role | todos | A S12 | P1 · imp. P2 | Quitarla de la home. En `/role`, tabla o frase con cita. Si la tesela se queda: `--ink` sobre `--bg`, sin `card-lum lift`. El texto degradado va en MS-06. | n/a · amplía |
| SL-21 | **Tarjetas 3-up idénticas.** Tres tarjetas iguales con número, título y cuerpo: tres preguntas, «Three ways in» (duplicada en `/role` y `/path`) y 7 workflows con el mismo enlace. | `DefinitionCards.astro`; «Three ways in»; `WorkflowGrid` | /, /role, /path | 1440 | A S16 | P1 · imp. P3 | Tres preguntas como lista de 3 filas, cada una con la capa que la responde. Workflows como lista con un solo enlace al pie. | n/a · amplía |
| SL-22 | **Ritmo monótono entre secciones y apretado dentro.** Todas las secciones miden 128/128 a 1440 y el footer suma 128 más. Dentro de los componentes: chips con huecos de 4 px, pilas de etiquetas a `--s-2`, `.hero-panel` a `--s-3` y cabeceras de 11 px. | `utilities.css` `.section { padding-block: clamp(64px,10vw,128px) }`; `.cw-chip { padding: .15em .5em }`; `StackLayerPanel`; `.hero-panel` | todas las landings; lo micro en /stack, /resources/crosswalk, /resources/frameworks, / | macro 1440; micro sobre todo a 390 | A S15 · B cramped-padding 97 FP, monotonous-spacing 29 FP · worklist C.4 | P2 · imp. P2 | `--s-7` entre secciones relacionadas y `--s-8` solo antes de un cambio de tema. Chips con hueco `--s-2` y grupos separados por `--s-5`. No perseguir el `cramped-padding` del detector. | n/a |

### 4.1 Refutado o descartado (no perseguir)

| Sospecha | Quién | Veredicto | Motivo |
|---|---|---|---|
| «Tres fuentes compitiendo» | A | Refutado | El computed style muestra exactamente 3 familias en las 14 rutas. El problema es el uso de la mono (SL-05). |
| «Padding apretado» | A, B | Refutado a escala de sección; confirmado dentro de componentes | Las secciones van a 128/128 (monótono, no apretado). Los 97 `cramped-padding` del detector son falsos positivos (§7.3). El ítem C.4 de la worklist no aplica tal cual; lo real es SL-22. |
| `monotonous-spacing` («4px 94 %») | B | FP | El recuento está sesgado por los 193 enlaces de TOC/sidebar; la escala `--s-1…--s-8` se usa entera. |
| «Hero con tres CTAs» | A | Refutado salvo en `/404` | La home tiene dos. La 404 va en 404-1. |
| «Iconos decorativos» | A | Refutado | Los glifos son funcionales (búsqueda, tema, chevron, §). |
| «Estadísticas sin fuente» | A | Refutado | Citan el IAPP Salary & Jobs Report 2025-26. El problema es otro (SL-20). |
| Chip «Chapter 04» como píldora rellena (worklist B) | A | Parcial | `Kicker` no es un chip; sí lo son `.hero-eyebrow .kicker .square`, `.ch-kicker-num` y `.figure-fig-chip` (SL-04). |
| Artefacto «Know\|edge» del botón secundario | worklist D | No existe | Es hinting del navegador que hizo la captura. |
| `low-contrast` estático (1841) | B, C | FP | El modo estático no resuelve la cascada del tema. El único par real en navegador es el wordmark decorativo `aria-hidden`. |

## 5. Hallazgos por página

Cada hallazgo vive en un solo sitio. Aquí van los propios de cada ruta; los transversales se citan por ID en «Hereda».

### `/` (home)

**Hereda:** SL-01, SL-02, SL-03, SL-04, SL-06, SL-10, SL-13, SL-14, SL-15, SL-16, SL-18, SL-19, SL-20, SL-21, SL-22; BOK-1; TC-08, TC-09, TC-11; MS-01–MS-07. **Conservar:** Sección 02 Stack (tint), la mejor de la home. Según A, la frase del verdict beat.

| ID | Sev. | Eje | Qué | Dónde | Anchos/temas | Sugerencia |
|---|---|---|---|---|---|---|
| HOM-1 | P2 | P2 | **Hero fuera de la retícula.** El copy empieza en x=16 a 1440, mientras el logo y las secciones empiezan en x=136. | `index.astro` `.hero--loop > .container { max-width: min(1440px,100%) }` | 1440 | Usar el contenedor estándar del sitio (el mismo `max-width` que el resto de secciones). |
| HOM-2 | P3 | P2 | **Hueco sobre el titular.** Unos 200 px vacíos sobre el H1. | `index.astro` `.hero--loop` `min-height: min(72vh,680px)` + `align-items: center` | 1440 | `align-items: start` con `padding-block` `--s-7`, o un `min-height` menor. |
| HOM-3 | P2 | P1 | **CTA secundario casi invisible.** Botón `transparent` con borde `--line` sobre la malla. | `index.astro` `.hero-cta` (secundario outline de la tarea 6.1) | todos (peor sobre la malla) | Borde `--ink-2` y fondo `--bg`. La malla no se toca. |
| HOM-4 | P2 | P3 | **Entrada del hero con opacity.** A 120 ms: h1 0,56, lede 0,18 y CTA 0 (a 390: 0,73 / 0,47 / 0,06). Incumple la hard constraint #1 y retrasa el LCP ~0,6–0,8 s (inferido). | `index.astro` `.hero-in > *` + `@keyframes hero-up` | todos · `no-preference` | Solo `translateY(12px) → none`, como en `PageHero`. Conservar el stagger `--i * 70ms`. |
| HOM-5 | P2 | P1 | **Verdict beat indistinguible en oscuro.** `--band-bg` `#0b0d10` sobre `--bg` `#121417` apenas se distingue: la banda pierde su función. | `index.astro` verdict beat (`Section tone="dark"`) | oscuro | Separar con `border-block: 1px solid var(--line)` en oscuro o ampliar la diferencia de `--band-bg`. La frase la está quitando distill y A pide conservarla: decide Jordi. |
| HOM-6 | P3 | P3 | **Salto del count-up.** La cifra se ve completa (USD 221k), cae a 88k y vuelve a subir. | `StatTile.astro` `[data-countup]` + `public/countup.js` (tarea 6.3) | `no-preference` | Pintar el valor inicial antes del primer frame, o no animar. Deja de aplicar si se hace SL-20. |
| HOM-7 | P3 | n/a | **Titulares y bloques duplicados entre páginas.** El H2 «A build order, from policy to proof.» está en `/` y en `/stack`. Las estadísticas, en `/` y `/role`. «Three ways in», en `/role` y `/path`. Rutas: /, /stack, /role, /path. | `index.astro`; «How to read it» de `stack.astro`; `role.astro`; `path.astro` | todos | Un titular propio por página y un solo sitio para cada bloque. |

### `/thesis`

**Hereda:** SL-04 (chip FIGURE), SL-08, SL-18 (puntos de ChapterHeader); TC-06, TC-09 (figura ilegible a 390 sin «Enlarge»), TC-21, TC-25. **Conservar:** El layout de lectura. Los H2 con raya corta y «§» tenue son aceptables.

| ID | Sev. | Eje | Qué | Dónde | Anchos/temas | Sugerencia |
|---|---|---|---|---|---|---|
| THS-1 | P3 | P2 | **Dos bordes izquierdos en el primer viewport.** La tarjeta de cabecera y la figura empiezan en x≈170 (contenedor); «Leer en español», el callout, el byline y la prosa, en x≈313. Rutas: /thesis, /about. | `ChapterHeader.astro` y la cabecera de `/about` frente a la columna `.prose` de `Doc.astro` | 1440 | Alinear la cabecera con la columna de prosa, o la prosa con el contenedor. |
| THS-2 | P2 | n/a | **Fechas incoherentes.** El meta dice «Updated 2026-09-22» y el byline «Version 0.4.0 · 2026-09-19»: resta en un sitio que presume de trazabilidad. | Meta del Doc y byline de la tesis (frontmatter) | todos | Una sola fuente de fecha. Si difieren a propósito, rotular «Version date» y «Last edit». |

### `/role`

**Hereda:** SL-03, SL-04 (doble eyebrow), SL-05, SL-13, SL-19 (banda oscura y CtaBand seguidas), SL-20 (duplicado de la home), SL-21; HOM-7; TC-09 (diagrama de secuencia de 8–9 px; 2,5 px a 390), TC-12 (nodo auditor); MS-02, MS-03. **Conservar:** Skills y Analyst vs engineer, tal cual. «Three tells» (sellos BLOCK como viñetas).

| ID | Sev. | Eje | Qué | Dónde | Anchos/temas | Sugerencia |
|---|---|---|---|---|---|---|
| ROL-1 | P2 | P2 | **H1 de 4 líneas a 390.** El H1 ocupa 4 líneas de 52 px y deja el primer viewport sin contenido útil. | `PageHero.astro` `.page-title` (variante landing) | 390 | Bajar el mínimo del `clamp()` en landing o acortar el titular. |
| ROL-2 | P3 | P1 | **Workflows: enlace repetido ×7 y span vacío.** «READ IN CHAPTER 06 →» se repite 7 veces y la 7.ª tarjeta ocupa 2 columnas con el mismo texto corto. | `WorkflowGrid` en `role.astro` | 1440 | Un solo enlace al pie de la sección y sin span en la última tarjeta (junto con SL-21). |

### `/stack`

**Hereda:** SL-02 (`pulse-up`, `bar-flash`), SL-03, SL-04, SL-05 (75), SL-08 (NOTE), SL-11, SL-13, SL-18 (tools), SL-19, SL-22 (nubes de chips de StackLayerPanel); HOM-7. **Conservar:** Story-pin (sticky en top=100, `[data-active]` 1→2→3) y `flow-draw`.

| ID | Sev. | Eje | Qué | Dónde | Anchos/temas | Sugerencia |
|---|---|---|---|---|---|---|
| STK-1 | P1 | P1 | **Bandas inactivas del diagrama con opacity sobre el texto.** En el estado por defecto, 4 de los 5 nombres de capa quedan a `opacity: .4`: `band-name` 2,47:1 y `band-idx` 2,01–2,10:1 en claro; 3,03–3,37:1 en oscuro. axe no lo ve porque es texto SVG. Incumple la hard constraint #2. | `StackFlow.astro` l.383-386 `.flow.flow-js.has-active [data-band]:not(.is-active):not(.nband) { opacity: 0.4 }` | 1440 (SVG de escritorio) · claro y oscuro | Aplicar el patrón de `.nband`: `opacity` solo en `rect` y marcas, texto `fill: var(--ink-2)`. La capa activa se distingue con trazo `--ink` de 2 px y peso. |
| STK-2 | P2 | P1 | **Barras de capa invisibles en la banda oscura.** En «Established and new», las barras de capa casi desaparecen con el re-scope oscuro. | `Section tone="dark"` de `stack.astro` + `.sec--dark` de `effects.css` | oscuro | Barras con `--lN-ink` del set oscuro o contorno de 1 px `--line`. |
| STK-3 | P3 | P1 | **Cuadrados decorativos en «How to read it».** Cuadraditos a la derecha de cada fila sin función (y el H2 está duplicado, HOM-7). | `stack.astro`, sección «How to read it» | 1440 | Quitarlos o convertirlos en el marcador de capa de la fila, con etiqueta. |
| STK-4 | P2 | P2 | **Tabla de herramientas a una por fila.** 57 herramientas, una por fila (~1.400 px), sobre papel cuadriculado. | `ToolsTable.astro` | 1440 | Tabla agrupada por capa en 2–3 columnas o filas compactas, sin textura detrás (SL-18). |

### `/path`

**Hereda:** SL-03, SL-05 («HOVER OR OPEN A NODE…»), SL-12, SL-18 (rejilla detrás de los nodos), SL-19, SL-21 («Three ways in» duplicada); CRW-2 (leyenda solo por color); GLB-1; TC-15. **Conservar:** Drawer: sheet a 1440, pantalla completa a 390, Esc devuelve el foco al nodo.

| ID | Sev. | Eje | Qué | Dónde | Anchos/temas | Sugerencia |
|---|---|---|---|---|---|---|
| PTH-1 | P2 | P1 | **La leyenda no distingue los estados.** En «Three kinds of node, three states», Core, Optional y Skipped llevan el mismo cuadrado negro. La leyenda ocupa un tercio del ancho y deja dos tercios vacíos. | Leyenda de `PathMap.astro` | 1440 | Muestra de cada estado con su tratamiento real (borde sólido, discontinuo, tachado) y leyenda en una sola fila. |
| PTH-2 | P2 | P1 | **Nodos opcionales casi invisibles.** El borde discontinuo tenue apenas se ve al lado de los core, que llevan tinta gruesa. | Variante optional de `PathNode.astro` | 1440 | Borde discontinuo de 1 px en `--ink-2`. |

### `/map`

**Hereda:** SL-03, SL-04 (chip FIGURE); TC-12; MS-02. **Conservar:** El mapa, que es el artefacto más de autor. Scroller documentado a 390 con lista alternativa. Sin CtaBand.

| ID | Sev. | Eje | Qué | Dónde | Anchos/temas | Sugerencia |
|---|---|---|---|---|---|---|
| MAP-1 | P3 | P1 | **Chips que repiten el nombre de la fila.** En el índice por clústeres, cada fila repite su nombre en un chip mono («The Stack [The Stack]»). | Índice de clústeres en `map.css` | todos | Quitar el chip cuando repite el nombre. |
| MAP-2 | P3 | P2 | **Tracking de etiqueta en texto de caja mixta.** `.map-hint` («Scroll sideways, or use the list below.») lleva `--tracking-label` sin `uppercase`. | `map.css` `.map-hint` | 390 | Quitar el tracking (mejor que pasar a mayúsculas, por SL-05). |

### `/bok`

**Hereda:** SL-04 (chip FIGURE sobre «Reading paths»), SL-06 (chips de número rotados). **Conservar:** Cabecera plana, sin malla ni registro: un índice tranquilo.

| ID | Sev. | Eje | Qué | Dónde | Anchos/temas | Sugerencia |
|---|---|---|---|---|---|---|
| BOK-1 | P3 | P2 | **Resúmenes cortados a mitad de frase.** Los resúmenes de capítulo terminan en «…» a mitad de frase. Rutas: /, /bok. | `ChapterGrid`; índice de `/bok` | todos | Resumen de una frase completa, o un `line-clamp` que corte en final de frase. |
| BOK-2 | P3 | P2 | **Hueco antes del footer.** Queda un hueco grande entre la última sección y el footer. | Última sección de `bok.astro` + `footer { margin-top: 128px }` | todos | Reducirlo a `--s-7` cuando la última sección ya cierra con una regla. |

### `/bok/the-stack` (representa `/bok/*`)

**Hereda:** SL-04, SL-06 (cabecera verde por `order % 5`), SL-07 (figura principal), SL-08, SL-09, SL-18 (puntos); MS-08; TC-01, TC-04, TC-06, TC-08, TC-09, TC-13, TC-14, TC-18, TC-21, TC-25. **Conservar:** Prosa, «In practice», «Maps to», TOC, notas y fuentes.

| ID | Sev. | Eje | Qué | Dónde | Anchos/temas | Sugerencia |
|---|---|---|---|---|---|---|
| BST-1 | P3 | n/a | **Miga con el número de capítulo duplicado.** La miga dice «04 · 04. THE STACK (FIVE LAYERS)» porque el título ya empieza por «NN.». Rutas: /bok/* (11 capítulos). | `pages/bok/[slug].astro` l.58-60, ``crumbs[1].label = `${NN} · ${title}` `` | todos | Usar el título sin anteponer `NN`, o quitar el prefijo del título. |
| BST-2 | P3 | P2 | **Interlínea 1 en la miga.** La miga actual, en mono de 12 px con `line-height: 1`, ocupa 2 líneas pegadas a 390. Rutas: /bok/*. | `Breadcrumb.astro` `.crumbs [aria-current='page']` | 390 | `line-height` de al menos 1,3 y etiqueta corta (junto con BST-1). |
| BST-3 | P2 | P1 | **La máscara del sidebar atenúa el último capítulo.** Con la máscara, «10 Reading List» parece texto atenuado. Rutas: /bok/*. | `Doc.astro` l.460-464 (`mask-image`) | ≥840 | `padding-bottom` en lugar de máscara, o una máscara que termine después del último ítem. |
| BST-4 | P3 | P2 | **Punto huérfano en AtAGlance.** Cuatro puntos en una rejilla de 3 columnas dejan el 4.º solo. Rutas: /bok/*. | `AtAGlance.astro` | 1440 | Rejilla 2×2, o número de columnas según el número de ítems. |

### `/resources`

**Hereda:** SL-03 («01» colgando bajo el hero), SL-06 (swatches), SL-13, SL-15, SL-18; MS-02. **Conservar:**:

| ID | Sev. | Eje | Qué | Dónde | Anchos/temas | Sugerencia |
|---|---|---|---|---|---|---|
| RES-1 (bug) | P2 | P2 | **Viñetas visibles en el hub.** Bug visible: aparece un «•» a la izquierda de cada tarjeta. | `pages/resources/index.astro` `ul.bento.rc-bento` | 1440 y 390 | `list-style: none; padding: 0`. |

### `/resources/glossary`

**Hereda:** SL-18 (puntos del hero); TC-25. **Conservar:** La página entera (limpia): barra A–Z y chips «ch. NN».

| ID | Sev. | Eje | Qué | Dónde | Anchos/temas | Sugerencia |
|---|---|---|---|---|---|---|
| GLO-1 | P3 | P2 | **Hueco entre el hero y la barra A–Z.** Unos 100 px muertos entre `.hero--res` y la barra A–Z. Rutas: /resources/glossary (y heros `res`). | `PageHero.astro` `.hero--res` + `GlossaryIndex` | todos | Recortar el `padding-block-end` del hero `res`. |
| GLO-2 | P3 | P2 | **Anchos desiguales entre entradas y barra A–Z.** Las entradas usan ~65 % del contenedor y la barra A–Z el 100 %. Es correcto por la medida de lectura, pero se ve desigual. | `GlossaryIndex.astro` | 1440 | Opcional: limitar la barra A–Z a la misma medida. |

### `/resources/crosswalk`

**Hereda:** SL-06 (chips de tipo), SL-08 (NOTE), SL-22 (chips con huecos de 4 px); FRW-2 (26.302 px a 390); GLB-1; TC-15. **Conservar:** La matriz; `.cw-scroll` con `role="region"`, `tabindex="0"` y etiqueta.

| ID | Sev. | Eje | Qué | Dónde | Anchos/temas | Sugerencia |
|---|---|---|---|---|---|---|
| CRW-1 | P2 | P1 | **Chip «related» sin leyenda visible.** El chip discontinuo significa «related» solo en texto oculto. Una relación puede leerse como mapeo firme. | `CrosswalkMatrix.astro` / `.cw-chip` discontinuo de `crosswalk.css` | todos | Leyenda visible sobre la matriz («solid = maps to · dashed = related»). |
| CRW-2 | P2 | P1 | **Claves de capa solo por color.** Cuadraditos de capa sin etiqueta visible en «By topic», en la columna LAYERS de obligaciones y en la leyenda de `/path`. Rutas: /resources/crosswalk, /resources/frameworks, /path. | «By topic» de `crosswalk.css`; LAYERS de `ObligationTable.astro`; `PathMap.astro` | todos | Código de capa visible («L2») junto al cuadrado. Verificar el nombre accesible (el heat index ya lo tiene). |
| CRW-3 | P2 | P2 | **Matriz cortada a 390 sin pista de scroll.** NIST y China quedan fuera de pantalla y los chips se cortan en el borde, sin sombra ni degradado que avise. | `crosswalk.css` `.cw-scroll` | 390 | Degradado de borde con `--bg` o sombra de scroll, o vista de lista por tema a 390. |

### `/resources/frameworks`

**Hereda:** SL-05 (150), SL-06 (`.type-tag`), SL-07 (diagrama «obligation → evidence»); CRW-2 (columna LAYERS); TC-03, TC-08, TC-09. **Conservar:** Índice de obligaciones con heat index y filtros; descargas CSV/JSON.

| ID | Sev. | Eje | Qué | Dónde | Anchos/temas | Sugerencia |
|---|---|---|---|---|---|---|
| FRW-1 | P2 | P1 | **Cabeceras de la matriz a 10 px con opacity.** «Govern» … «Assurance» a 10 px con `opacity: .85`. Pasan con 5,11:1, pero incumplen la hard constraint #2 y el mínimo de 11–12 px. | `ObligationMatrix.astro` l.351 `.mx-colh-name` | 1440 | Al menos `--fs-label` (12 px), sin `opacity`, en color `--ink-2`. |
| FRW-2 | P2 | P2 | **Páginas interminables a 390.** Miden 36.820 px (frameworks) y 26.302 px (crosswalk). Rutas: /resources/frameworks, /resources/crosswalk. | `FrameworkTable.astro`, `ObligationTable.astro` | 390 | Resúmenes largos tras `<details>` y filas-tarjeta compactas. |
| FRW-3 | P3 | P2 | **Columna de etiquetas ancha en filas-tarjeta.** La columna de etiquetas ocupa ~30 % del ancho. | `resources.css` `.res-table` (≤720 px) | 390 | Etiqueta encima del valor. |

### `/about`

**Hereda:** THS-1 (cabecera en x≈170 frente a prosa en x≈313). Sin hallazgos propios. **Conservar:** La página más sobria: el modelo para destilar el resto.

### `/404`

**Hereda:** MS-01, MS-09 (malla más saturada); TC-27. **Conservar:** El concepto «Verdict: BLOCK. Route not registered.».

| ID | Sev. | Eje | Qué | Dónde | Anchos/temas | Sugerencia |
|---|---|---|---|---|---|---|
| 404-1 | P3 | P2 | **Tres CTAs.** La 404 ofrece tres CTAs; la home, dos. | `pages/404.astro` | 390 (pasan a dos filas) | «Back to home» + búsqueda (`[data-search-open]`). |
| 404-2 | P3 | P2 | **Banda vacía antes del footer.** Quedan 130 px de banda vacía. | `pages/404.astro` | todos | Recortar el `padding-block-end` de la sección. |

### Componentes globales (Header, Footer, SearchDialog, ThemeToggle, menú móvil)

**Hereda:** SL-05 (colofón), SL-17 (footer); TC-02, TC-05, TC-07, TC-16, TC-17, TC-19, TC-20. **Conservar:** Mega-menú agrupado con descripciones y chevron; menú móvil en `<dialog>`; ThemeToggle.

| ID | Sev. | Eje | Qué | Dónde | Anchos/temas | Sugerencia |
|---|---|---|---|---|---|---|
| GLB-1 | P3 | P2 | **Drawers con cierres distintos.** «×» en `/path` y «CLOSE» en mono en el crosswalk, más una barra gruesa bajo el título. Rutas: /path, /resources/crosswalk. | `PathDrawer.astro`; `CrosswalkDrawer.astro` (`.cwd-title` `border-bottom: 3px`) | 1440 y 390 | Un solo cierre «×» con `aria-label` y título sin barra. |
| GLB-2 | P3 | P2 | **Footer largo y nombres partidos.** 7 columnas y ~45 enlaces, ~1.000 px a 390. A 1440 los nombres de capítulo se parten («07 Maturity / Model»). Rutas: todas. | `Footer.astro` | 1440 y 390 | Agrupar los capítulos en una lista de 2 columnas, o usar nombres cortos. |
| GLB-3 | P3 | n/a | **Pista «Ctrl K» en táctil.** La pista de teclado se muestra en dispositivos sin teclado. Rutas: todas (menú móvil). | Menú móvil de `Header.astro` | 390 táctil | Ocultarla con `@media (hover: none)`. |

## 6. Hallazgos técnicos no visuales

La severidad sigue a `audit.md`: P0 bloquea, P1 incumple WCAG AA, P2 tiene alternativa, P3 es pulido. Las medidas son de C salvo que se indique otra fuente.

### 6.1 Bugs (rompen algo hoy)

| ID | Sev. | Eje | Qué y medida | Dónde | Rutas · anchos | Recomendación | Visto por |
|---|---|---|---|---|---|---|---|
| TC-01 | P1 | n/a | **Drawer de capítulos cerrado pero enfocable.** 13 paradas de tabulación invisibles (`button.sidebar-search` en x=−288 y 12 `a.nav-item` en x≈−296) antes del contenido. WCAG 2.4.7, 2.4.3 y 2.4.11. | `Doc.astro` l.397-413 `.doc-sidebar` (`position: fixed; transform: translateX(-100%)`, sin `visibility`/`inert`); `public/ui-doc.js` | /bok/* (<840 px) · <840 | Estado cerrado con `visibility: hidden` y transición de `visibility` diferida en `--dur`, o `inert`. Al abrir, `role="dialog" aria-modal="true" aria-label="Chapters"`. | C P1-3 |
| TC-02 | P1 | P2 | **Reflow a 320: la cabecera desborda.** Desborde de 13 px y el botón de menú recortado (borde derecho en x=333). WCAG 1.4.10. A 390 no desborda. | `Header.astro` l.315-343 `.bar { gap: var(--s-4) }`, `.right { gap: var(--s-3) }`, `.wordmark` | todas (320 px) · 320 | `@media (max-width: 359px)`: gaps `--s-2`/`--s-3` y wordmark oculto, con `aria-label` en `.brand`. Añadir 320 a `layout.spec`. | C P1-4 |
| TC-03 | P1 | P2 | **Desborde horizontal en /resources/frameworks a 390.** `scrollWidth` 408 frente a 390: las `th` «Applies from» y «Chapter» se escapan y la página se bambolea 18 px. Rompe la garantía de «no horizontal scroll» de `PageHero`. | `resources.css` `.res-table thead th { position: sticky }` dentro del `thead` oculto por `@media (max-width:720px)` | /resources/frameworks (390) · 390 | `position: static` en `thead th` por debajo de 720 px. En el test de overflow, medir con `documentElement.clientWidth` o sin `isMobile`. | A (C lo confirma: `W: 408` en `responsive.json`) |
| TC-04 | P2 | P2 | **«Cite this chapter» desborda a 390.** Al abrir la cita, el documento pasa de 390 a 616 px (226 px de scroll horizontal): el hijo flex crece hasta el min-content de `pre.cite-bibtex`. | `Citation.astro` `.cite-wrap`, `.cite-apa`, `pre.cite-bibtex`; `Doc.astro` `footer.doc-foot` (flex) | /bok/* (390) · 390 | `min-width: 0` en el hijo flex, `pre { overflow-x: auto; max-width: 100% }` y `overflow-wrap: anywhere` en `.cite-apa`. | B |
| TC-05 | P2 | P1 | **Resultados de búsqueda sin estilo.** Enlaces subrayados en `--l1-ink`, `<mark>` amarillo del navegador (rgb 255,255,0: el único color saturado fuera de tokens), título en la fuente de cuerpo y extractos con cadenas de UI («⤢ Enlarge»). | `SearchDialog.astro`: las reglas con ámbito `.search-result a`, `.search-result-title` y `.search-result-excerpt mark` no alcanzan a los nodos que crea `public/search.js` | todas (búsqueda) · todos | `:global()` u hoja global. `mark` con `--tint-bg` + `--ink` (no un color de capa). Sacar el texto de UI del índice con `data-pagefind-ignore`. | A M-2 |
| TC-06 | P2 | n/a | **Sidebar y TOC del Doc no son sticky.** Con `scrollY` 5000 quedan en top −4899. El scroll-spy y el progreso (`is-past`, `aria-current`) se calculan fuera de pantalla. Los estados de la spec `reading-experience` no los ve nadie. | `Doc.astro` l.427-430 (`inset: auto` después de `top`), l.301 `.doc-layout { align-items: start }`; `Toc.astro` l.38 | /bok/* (≥840 sidebar, ≥1100 TOC) · ≥840 / ≥1100 | Quitar `inset: auto` o ponerlo antes de `top`. Hacer sticky `.doc-toc` con `align-self: start`. Ningún `transform` en los ancestros. | C P2-2 |
| TC-07 | P2 | n/a | **El clic tras el hover cierra el mega-menú.** El hover pone `aria-expanded=true` y el clic inmediato lo pasa a `false`: el usuario cierra lo que acababa de abrir. | `Header.astro` + `public/nav.js` | todas (1440) · 1440 (ratón) | Ignorar el clic si el panel se abrió por hover hace menos de ~300 ms, o abrir solo con clic. | A |

Hay otros bugs, visuales o de datos, en §5: RES-1 (viñetas en el hub) y BST-1 (miga duplicada).

### 6.2 Accesibilidad, responsive, rendimiento y theming (de estilo o sistema)

| ID | Sev. | Eje | Qué y medida | Dónde | Rutas · anchos | Recomendación | Visto por |
|---|---|---|---|---|---|---|---|
| TC-08 | P1 | P1 | **Etiquetas SVG de diagramas bajo AA.** `.t-muted` (#676C75) sobre `--l1…--l5` da 3,67–3,90:1. `.t-dim` da 2,45–2,97:1 en claro y 2,15–3,48:1 en oscuro. Son 82 textos. WCAG 1.4.3. | `diagrams.css` l.231 `.diagram svg .t-muted`, l.235 `.t-dim` | /, /thesis, /role, /bok/the-stack, /resources/frameworks · 1440 y 390; `.t-dim` falla también en oscuro | `.t-muted` → `fill: var(--ink-2)`; `.t-dim` → `fill: var(--muted)`. Son dos líneas de CSS del sitio: candidato a excepción de accesibilidad. | C P1-1 |
| TC-09 | P1 | P1 | **Texto de diagramas a 2–7 px.** El hero de `/` baja a 5,7 px a 1440 y a 4,6 px a 390, sin botón «Enlarge». La tesis llega a 2,0 px a 390, `/role` a 2,5, `/bok/the-stack` a 2,6 y frameworks a 2,4. VISUAL-GUIDE §1.10 pide al menos 12 px a 390. `/map` y `/stack` se mantienen por encima de 9,3 px. | SVG de `scripts/diagrams-build.mjs` dentro de `.diagram-canvas`; `src/figures/*.svg` | /, /thesis, /role, /bok/the-stack, /resources/frameworks · sobre todo 390; en el hero también a 1440 | A 390, lista textual (`details.figure-alt`) o scroller etiquetado como el de `/map`. En el hero, ocultar los subtítulos por debajo de 640 px o fijar un suelo de 11 px. | A · B tiny-text (80/tema) · C P2-4 |
| TC-10 | P2 | P1 | **«Dim the rest» atenúa texto con opacity.** Durante el hover o el foco de teclado, las etiquetas del resto de nodos quedan a ~2,5:1. Incumple la hard constraint #2 y la spec `ui-motion` («Textos secundarios sin opacidad»). | `diagrams.css` l.379-382 `[data-node-id].is-dim`, `[data-edge-id].is-dim { opacity: 0.4 }` | diagramas interactivos de /, /thesis, /role, /bok/the-stack, /resources/frameworks · hover y foco | Atenuar solo la geometría (`:is(rect, path, .semantic-sigil)`). Texto en `--muted` sobre `--bg` o `--ink-2` sobre relleno. | C P2-3 |
| TC-11 | P2 | P2 | **Texto al 200 % recortado a 390.** Desborde de 45–139 px; palabras cortadas («Governa\|nce»). WCAG 1.4.4. | `index.astro` l.264-268 `.hero--loop { overflow: hidden; contain: paint }`; `PageHero.astro` l.110-113 `.hero--page { overflow: hidden }` | /, /resources/*, /bok/* · 390 con texto al 200 % | `overflow-wrap: anywhere; hyphens: auto` en `.hero-h1`/`.page-title`. Dejar el recorte solo en `.bg-mesh`. | C P2-7 |
| TC-12 | P2 | P2 | **Objetivos táctiles de menos de 24 px.** 10 ramas del mapa de 15,7 px de alto, con círculos de 24 px que se solapan; el nodo auditor mide 38,4×19. WCAG 2.5.8. | `scripts/map-build.mjs` → `src/figures/discipline-map.svg` `g.branch > a`; `#role-workflows-node-auditor` | /map (390), /role (nodo auditor) · 390 | `rect` transparente de al menos 24 px por rama, o `--s-2` extra entre ramas. El nodo de `/role` es archify: fuera de alcance. | C P2-8 |
| TC-13 | P3 | P1 | **`.nav-num` bajo AA en hover.** 4,01:1 mientras dura el hover. | `SidebarNav.astro` `.nav-item:hover .nav-num` | /bok/* · claro (en oscuro, 4,71: pasa) | `color: var(--ink-2)` en hover. | C P3-1 |
| TC-14 | P3 | n/a | **`landmark-unique`: dos `<aside>` sin nombre.** Es la única violación de axe (moderate). | `Doc.astro` l.144 `#doc-sidebar`, l.206 `.doc-toc` | /bok/* (≥1100) · ≥1100 · ambos temas | `aria-label="Chapters"` y `aria-label="On this page"`. | C P3-2 |
| TC-15 | P3 | n/a | **Drawers con fondo no inerte.** Son `<aside role="dialog">`: el foco queda atrapado, pero el cursor virtual del lector puede salir del diálogo. | `PathDrawer.astro` l.12-17, `CrosswalkDrawer.astro` l.12-17 | /path, /resources/crosswalk · todos | `<dialog>` + `showModal()`, o `inert` en `main`. | C P3-3 |
| TC-16 | P3 | n/a | **El toggle de tema anuncia un estado doble.** Se anuncia «Switch to light theme, pressed». | `public/ui.js` l.20 | todas · todos | Etiqueta fija + `aria-pressed`, o etiqueta dinámica sin `aria-pressed`. | C P3-4 |
| TC-17 | P3 | n/a | **La búsqueda necesita dos Esc.** El primer Esc vacía el campo y el segundo cierra. | `SearchDialog.astro` / `public/search.js` | todas · todos | Que Esc cierre siempre y el campo se vacíe con el botón de limpiar. | A |
| TC-18 | P3 | P1 | **Shiki con la paleta github-dark.** Azules fuera de los 5 acentos (`#79b8ff`, `#9ecbff`) y bloque oscuro también en tema claro. El contraste es correcto (7,06–11,5:1). | `astro.config.ts` (sin `shikiConfig`); `prose.css` l.350 | /bok/the-stack, /bok/patterns, /about/contributors · claro y oscuro | Tema `css-variables` mapeado a `--ink`, `--ink-2`, `--lN-ink` y `--surface`. | C P3-6 |
| TC-19 | P3 | n/a | **Scrims y color de OG hard-coded.** `rgba(0,0,0,.4)` repetido; `og.ts` usa `#6B7079`, que no es `--muted` (`#676C75`). | `Header.astro` l.634, `SearchDialog.astro` l.54, `Doc.astro` l.419, `diagrams.css` l.484, `src/lib/og.ts` l.46 | todas · todos | Un token `--scrim` en `tokens.css` y los valores de OG desde una fuente común. | C P3-7 |
| TC-20 | P3 | P3 | **`backdrop-filter` en la cabecera sticky.** `blur(10px)` se recalcula en cada frame de scroll. | `Header.astro` l.297-298 | todas · todos (coste en gama baja) | Por debajo de 840 px y con `prefers-reduced-transparency`: fondo sólido `color-mix(in srgb, var(--bg) 94%, transparent)`. | C P3-8 |
| TC-21 | P3 | P3 | **Transiciones de height fuera de tokens.** `height 200ms` en los marcadores y `transform 160ms linear`, frente a `--dur` (180 ms) y `--ease`. | `SidebarNav.astro` l.89 `.nav-rail`; `Toc.astro` l.74 `.toc-marker` | /bok/*, /thesis, /about/changelog · `no-preference` | `transform: scaleY()` con `--dur`/`--ease`. | B #11 · C P3-9 |
| TC-22 | P3 | P3 | **`motion-ui` cargado en todas las rutas.** 6,4 KB gz en las 14 rutas; solo lo usan los drawers y el icono del tema. | `Base.astro` → `motion-ui.*.js` | todas · n/a | `import()` bajo demanda en los consumidores. Contradice la decisión 1 de design.md (tarea 3.2). | C P3-9 |
| TC-23 | P3 | n/a | **Set oscuro triplicado.** ~30 valores copiados en `.sec--dark`: es la tercera copia, tras `[data-theme=dark]` y la media query. | `effects.css` l.348-395 | todas · oscuro | Una sola definición (`:root[data-theme='dark'], .sec--dark { … }` + media query). | C P3-5 |
| TC-24 | P3 | P3 | **«Kill» global de reduced-motion.** `.01ms !important` universal. Hoy es inocuo, pero aplana cualquier feedback futuro. | `base.css` l.116-129 | todas · `reduce` | Mantenerlo como red de seguridad documentada, o sustituirlo por gates por componente + un test de 0 animaciones con `reduce`. | C P3-11 |
| TC-25 | P2 | P2 | **Líneas de prosa demasiado largas.** `--prose: 72ch` da ~96–107 caracteres por línea (`.prose > p` de 815 px). | `tokens.css` `--prose` (usado en `pages.css`, `utilities.css`, `resources.css`, `crosswalk.css`) | toda la BoK, /thesis, /es/thesis, /resources/glossary, /about/changelog; ledes de /stack, /role, /path · 1440 | ~60–66ch con Instrument Sans a 17 px, o `max-width` en `em`. Es un cambio de token: fuera del cambio actual. | B #3 (overlay `line-length`, 643/tema) |
| TC-26 | P2 | n/a | **Gates de CI ciegos al contraste.** axe deja 8.130 nodos de `color-contrast` como «incomplete» (pseudo-elementos, degradados, SVG) y Lighthouse hereda esa ceguera. Ahí están los fallos. | `tests/a11y.spec.ts` | CI · n/a | Test de contraste por píxeles (`scratchpad/audit/contrast-lib.cjs`) o de pares de tokens para `.t-muted`, `.t-dim` y `.band`. | C (patrón 3) |
| TC-27 | P3 | n/a | **Estado HTTP de /404 en producción.** El preview sirve `/404` con HTTP 200, lo normal en `astro preview`. | Producción (Cloudflare) | /404 · n/a | Confirmar con `curl -I` que una ruta inexistente devuelve 404. | A M-13 |

### 6.3 Patrones sistémicos (C)

1. **`--muted` es un token de fondo plano** que se usa sobre fondos no planos: pastel de capa (3,67–3,90:1), malla (4,37), texturas (p10 3,83), panel del hero en oscuro (3,15–4,02) y hover tintado (4,01). Propuesta de regla: **toda superficie que no sea `--bg` re-escopa `--muted: var(--ink-2)`** (MS-03, SL-17, TC-08, TC-13).
2. **«Atenuar lo inactivo» se hace con `opacity` sobre grupos con texto** en StackFlow (STK-1), `.is-dim` (TC-10) y ObligationMatrix (FRW-1). `.nband` ya tiene el patrón correcto: color en el texto y `opacity` solo en la geometría. Hay que generalizarlo.
3. **Los gates de CI no ven el contraste de ~40 % de los nodos** (axe los marca «incomplete»), y ahí están los fallos (TC-26).
4. **Los diagramas SVG escalan sin suelo tipográfico** (TC-09). `/map` ya resuelve esto con un scroller etiquetado.
5. **Dos derivas de layout en el Doc** anulan un sistema de orientación completo y ningún test lo detecta (TC-06).

## 7. Detector

### 7.1 Recuentos

| Escaneo | Total | Primarios | Advisory | Diagramas archify | Sitio sin diagramas |
|---|---:|---:|---:|---:|---:|
| `dist` (snapshot 18:27), motor 0.1.5 | 5851 | 5497 | 354 | 3664 (62,6 %) | **2187** (2119 + 68 adv.) |
| Las 14 rutas del alcance (C) | 716 | | | | |
| `src` + `public` | 3675 | 3387 | 288 | 3664 (`public/diagrams`) | 11 en `src` (7 `side-tab`, 2 `codex-grid-background`, 1 `overused-font`) |
| Overlay en navegador (13 páginas × 2 temas, 1440) | 2041 (1045 claro / 996 oscuro) | | | | |

Con `--no-design-system` salen los mismos 5851 hallazgos: DESIGN.md no cambia ningún resultado.

### 7.2 Qué reglas son reales

| Veredicto | Nº | Reglas → ID de este informe |
|---|---:|---|
| **R** real | 30 | `side-tab` 18 (callouts) → SL-08 · `gradient-text` 6 → MS-06 · `dark-glow` 2 (hero-panel) → SL-14 · `tight-leading` 1 (miga) → BST-2 · `wide-tracking` 1 (`.map-hint`) → MAP-2 · `layout-transition` 1 (`height`) → TC-21 · `marquee` 1 → SL-01 |
| **R, solo en navegador** | n/a | `line-length` (643/tema, una causa) → TC-25 · `tiny-text` SVG (80/tema) → TC-09 · `undersized-ui-text` `.mx-colh-name` → FRW-1 · `text-overflow` cita a 390 → TC-04 |
| **D** decisión documentada | 90 | `all-caps-body` 58 → SL-05 · `codex-grid-background` 30 → SL-17/SL-18 · `gpt-thin-border-wide-shadow` 1 (hero-panel) → SL-13 · `overused-font` 1 (Instrument Sans, marca) · `cream-palette` 13 en navegador (`--bg` `#F6F4EE`) |
| **n/a** copy | 6 | `em-dash-overuse`: changelog 75, the-stack 92, reading-list 64, thesis 57, definition 48, glossary 40 |
| **FP** | 2061 | §7.3 |
| **V** archify | 3664 | Visor de terceros (`noindex`) con texto de 7–10,5 px, salto h1→h3, `pulsing-dot`, rayas y sombras anchas. Su `low-contrast` no se verificó. |

### 7.3 Falsos positivos (motivo)

| Regla | Nº | Motivo |
|---|---:|---|
| `low-contrast` | 1841 | El modo estático no resuelve `[data-theme=dark]`, la media query, el re-scope de `.sec--dark` ni `color-mix()`, y cae a blanco o negro. En navegador solo marca `p.foot-wordmark`, que es decorativo y `aria-hidden`. |
| `cramped-padding` | 97 | Scrollers de tablas cuyas celdas tienen padding propio; `clamp()` sin resolver en `.section`; TOC con `a` de `4px 12px`. |
| `gpt-thin-border-wide-shadow` | 31 | `#search-dialog` (modal) y `.diagram-note` (popover): la elevación está justificada. |
| `monotonous-spacing` | 29 | Recuento sesgado por las listas de enlaces de TOC/sidebar. |
| `tight-leading` | 20 | `clamp()` mal resuelto (lee 0,89x donde el valor real es 1,15). El display a 1,05 es de diseño. |
| `side-tab` | 18 | `.glance::after`, `.pullquote::before`, blockquote de prosa, crosswalk activo, PathNode y título del drawer. A discrepa en glance y pullquote: ver SL-09 y SL-10. |
| `wide-tracking` | 18 | `span.cluster-meta` («L2»): el tracking no afecta a dos caracteres. |
| `layout-transition` | 4 | `stroke-width` de SVG leído como `width` (3) y `pagefind-ui.css` de terceros (1). |
| `border-accent-on-rounded` | 3 | Títulos de drawer sin radio y un triángulo CSS de 0×0. |
| Navegador: `heading-rhythm` 8, `text-occlusion` 15/16, `dark-glow` en `body`, `text-overflow` a 1440 | n/a | Clúster plegado; etiquetas del propio overlay (los textos «PASS» y «attestation» se leen en la captura); color `#ffba00` del overlay; `scrollWidth = clientWidth`. |

### 7.4 Comparabilidad con el baseline

| Ejecución | Motor | Total | Sitio sin diagramas |
|---|---|---:|---:|
| Baseline (15:46) | npm `impeccable` 3.5.0 | 3972 | 126 |
| Final / wave3 (18:22) | npm 3.5.0 | 3965 | **119** (113 primarios + 6 advisory) |
| Ahora (snapshot 18:27) | plugin 4.3.1, motor 0.1.5 | 5851 | 2187 (346 sin `low-contrast`) |

- **De dónde sale «119»:** es la línea `site-only` de `group.js` sobre `impeccable-wave3.json` (idéntico a `final`), filtrando `/dist/diagrams/`.
- **Qué cambia entre motores:**
  - 3 reglas pasan a advisory: `gpt-thin-border-wide-shadow`, `codex-grid-background` y `repeating-stripes-gradient`.
  - `low-contrast` se aplica ahora al sitio: +1841.
  - Hay 4 reglas nuevas: `monotonous-spacing`, `wide-tracking`, `gradient-text` y `marquee`.
  - Desaparece `flat-type-hierarchy`.
  - Cambian los umbrales de `all-caps-body`, `tight-leading` y `cramped-padding`.
- **Consecuencia:** el gate de DESIGN.md («el recuento no sube; sin categorías nuevas») no se puede evaluar entre motores. Con 0.1.5 fallaría sin ningún cambio de código.

### 7.5 Qué hacer en la tarea 10.2 (DET-01)

`tasks.md` ya la marca como hecha: se verificó con 3.5.0 (3965 ≤ 3972, sin categorías nuevas). Para cualquier re-ejecución:
1. **Para cerrar este cambio:** fijar la versión en el gate y en DESIGN.md (`npx impeccable@3.5.0 detect dist`) y comparar con `impeccable-baseline.txt`.
2. **Desde el merge:** re-baselinar con el motor 0.1.5 y `detector.ignoreFiles: ["dist/diagrams/**", "public/diagrams/**", "dist/pagefind/**"]`.
   - Anotar la versión del motor en la cabecera del baseline.
   - Comparar por regla y no por total.
   - Tratar aparte el `low-contrast` estático: excluirlo y cubrirlo con el test por píxeles de TC-26.
3. **En los dos casos:** actualizar la spec `design-quality-gate`, que exige «no superar el baseline» sin fijar versión.

Nadie ha tocado la configuración del detector.

## 8. Ajustes opcionales sobre la malla (identidad conservada)

La malla **se conserva**. Nada de esta sección es slop que haya que eliminar: son afinados opcionales y los decide Jordi.

La única excepción práctica es **MS-03**. Re-escopar `--muted` sobre la malla es un fallo AA (C P1-5) y no toca la malla. Parte de ese fallo desaparece con lo que distill ya quita: el chip «live», `.hero-attn` y el kicker «The role».

| ID | Ajuste | Dónde | Rutas | Anchos/temas | Visto por | Propuesta | Imp. |
|---|---|---|---|---|---|---|---|
| MS-01 | **Turbidez de la malla en oscuro.** En oscuro la malla se lee como mancha gris u oliva, muy visible en `/404`, en el hero de `/` y en `.role-sec`. | `effects.css` `.bg-mesh::before/::after` (5 `radial-gradient`); `--mesh-alpha` oscuro 0,55 | /404, /, /role (y cualquier hero con malla en oscuro) | oscuro | A S1 | Opcional: bajar `--mesh-alpha` en oscuro (p. ej. 0,35) o quitar paradas en oscuro. La estructura no se toca. | P3 |
| MS-02 | **Repetición de la malla.** `.bg-mesh` aparece en 9 rutas y 3 veces en la home (hero, `.role-sec`, CtaBand). `glossary` ya pasa `mesh={false}`. | `index.astro`; `PageHero.astro` (`--mesh-alpha` .7; `.hero--res` .35); `Section tone="mesh"`; `CtaBand.astro` (.25); `404.astro` | 9 de 14 rutas; home con 3 capas | todos | A S1 | Opcional: malla solo en el hero de cada landing (la identidad en el primer viewport), fuera de las bandas intermedias y de los cierres. | P3 |
| MS-03 | **`--muted` sin re-scope sobre la malla (AA).** Kicker «The role»: 4,37:1 en claro. «live»: 4,02:1 y «attestation #4821»: 3,15:1 en oscuro. Miga y `.hero-note`: 4,48–4,49, parcial. Todo en mono de 12 px. Incumple la hard constraint #3. | `effects.css` `.sec--mesh` (solo define `--sec-bg`); `Kicker.astro` l.29; `index.astro` `.hero-attn`, `.hero-live`; `PageHero.astro` `.hero--page` | /, heros de página | claro (kicker) y oscuro (panel del hero) | C P1-5 | `--muted: var(--ink-2)` en `.sec--mesh`, `.hero--page`, `.hero--loop` y `.hero-panel`. Ampliar la hard constraint #3 de DESIGN.md a «tint, dark y mesh». No toca la malla y es AA: en la práctica no es opcional. | P1 |
| MS-04 | **Deriva de la malla.** `mesh-drift-a/b` de 34/42 s, 4 veces en la home, no se percibe: coste sin valor. | `effects.css` `mesh-drift-*` | /, /path, heros con malla | `no-preference` | A (movimiento) · C P2-6 | Opcional: malla estática (la misma imagen, sin deriva). | P3 |
| MS-05 | **Anillo `--grad-border` en hover.** Se conserva. A proponía quitarlo junto con el glow. | `effects.css` `.card-lum::before` | tarjetas `.card-lum` | hover | A S8 | Opcional: anillo solo en tarjetas que son enlace (coherente con SL-13). | P3 |
| MS-06 | **Texto degradado en las cifras.** `--grad-cta` + `background-clip: text` en «USD 221k» y compañía. DESIGN.md reserva `--grad-cta` para los CTA. | `StatTile.astro` `.value` | /, /role | todos | B gradient-text R · C (autorizado) | Opcional: `--ink` sólido. Deja de aplicar si se hace SL-20. | P3 |
| MS-07 | **Malla y línea degradada dentro de la CtaBand.** Malla a .25 y línea degradada de 2 px dentro de la banda invertida. | `CtaBand.astro` `.band .bg-mesh`, `.band::after` | /, /role, /stack, /path | todos; en oscuro, losa crema | A S13 | Si la banda se queda (SL-19), valorar quitar la malla interior. | P3 |
| MS-08 | **Glow radial de ChapterHeader.** Glow radial con el color de capa rotado, además de los puntos. | `ChapterHeader.astro` | /bok/* | todos | A | Opcional: glow neutro (`--tint-bg`) en lugar del color rotado (SL-06). | P3 |
| MS-09 | **Malla más saturada en /404.** Es la malla más saturada del sitio (azul, rosa, ámbar y verde); en oscuro, una mancha turbia. | `404.astro` `Section tone="mesh"` (tarea 9.1) | /404 | sobre todo oscuro | A | Opcional: `--mesh-alpha` como el hero de landing (.7) o menor. | P3 |

## 9. Lo que funciona y debe conservarse

| Qué | Dónde | Por qué (fuente) |
|---|---|---|
| Vocabulario visual del dominio | `VerdictStamp` BLOCK/PASS (`/404`, «Three tells» de `/role`), `.cw-chip` normativos (`Art. 9`, `6.1.2`, `MAP 1`), «ch. NN» del glosario, «(verified: primary)» | No podría ser de otro producto (A) |
| Lectura larga | `Doc.astro`: arranques en negrita, «Definition of done», «Anti-patterns», sidebar numerado, TOC, notas y fuentes; `/about` y `/thesis` como modelo de sobriedad | Registro editorial que pide PRODUCT.md (A) |
| Tablas densas | Skills y analyst-vs-engineer (`/role`), índice de obligaciones con heat index y filtros, matriz del crosswalk, glosario | «Dense but scannable» (A) |
| `/map` | Generado desde datos tipados; color por capa correcto; scroller etiquetado a 390 con lista alternativa | El artefacto más de autor (A, C) |
| Story-pin y `flow-draw` de `/stack` | `.story-pin` sticky en top=100; `[data-active]` 1→2→3; `flow-draw` de 400 ms | Contenido hecho interfaz; el movimiento aporta (A) |
| Sección 02 Stack de la home | `Section tone="tint"` | La mejor sección de la home (A) |
| Navegación | Mega-menú agrupado con descripciones y chevron; menú móvil en `<dialog>`; Esc devuelve el foco en nav, drawers y menú | (A, C) |
| Teclado | Skip link; anillo `2px solid var(--ink)` (16,3:1) en el 100 % de ~730 paradas; foco atrapado en drawers y diálogos | 0 elementos sin indicador (C) |
| Reduced-motion | 0 animaciones en curso con `reduce` en las 14 rutas; reveals en su estado final; count-up con valor final | (C) |
| Tema oscuro | Menos fallos que el claro: `.type-tag` 7,3/10,4:1, re-scopes tint/dark 5,69–9,02:1, 404 ≥ 8:1 | (C) |
| Rendimiento | 12,3–21,7 KB gz de JS por ruta; 0 scripts inline (CSP respetada); 3 woff2 (2 precargadas); 0 `<img>`; `.bg-mesh` con `contain: strict` y sin `blur()`; 137–176 KB gz por ruta | (C) |
| Disciplina de tokens | 3 familias exactas; sin morados; ~9 literales de color fuera de tokens de 75 | (A, C) |
| Reveals | Solo transform, rango `entry 5%–35%` | Cumplen la hard constraint #1 (A) |
| Concepto de la 404 | «Verdict: BLOCK. Route not registered.» | (A) |

## 10. Asignación provisional a bloques D1–D6 (insumo de la tarea 2.2)

- **Bloques:** 4 D1 chrome global · 5 D4 lectura (BoK) · 6 D2 home + marketing · 7 D3 landings · 8 D5 resources · 9 D6 about/404/newsletter.
- **Bloque primario:** se usa para contar; los secundarios van entre paréntesis.
- **«¿Amplía?»** compara con `proposal.md` y `tasks.md`:
  - «sí»: quita o reestructura un componente o primitiva, cambia contenido o semántica, o revierte una tarea ya hecha;
  - «no»: corrección dentro del objetivo del bloque (contraste, tokens, espaciado, bug o conformidad con las specs `ui-motion` / `reading-experience`);
  - «Jordi»: decisión pendiente (malla, rejilla, footer);
  - «sin bloque»: no encaja en ningún bloque.
- **La pasada distill ya es una ampliación de la propuesta,** que excluye el rediseño (design.md, Non-Goals). Los «sí» marcan lo que requiere que Jordi amplíe `proposal.md` / `tasks.md` o abra un cambio nuevo.

| ID | Hallazgo | Eje · imp. | Bloque | ¿Amplía? | Nota |
|---|---|---|---|---|---|
| SL-01 | Telemetría simulada en el hero | P1 · imp. P1 | D2 | sí | en curso (chip live, bucle del ticker) |
| SL-02 | Movimiento perpetuo en la home | P3 · imp. P2 | D2 (+D3) | no | n/a |
| SL-03 | Register rule numerado 01–07 | P1 · imp. P2 | D2 | sí | en curso (home) |
| SL-04 | Fórmula eyebrow + H2 + lede y chips de kicker | P1 · imp. P2 | D2 (+D3, D4) | sí | en curso (kickers-chip de la home) |
| SL-05 | Mono mayúsculas omnipresente | P1 · imp. P2 | D1 (+D2, D3, D4, D5) | sí | n/a |
| SL-06 | Colores de capa sin significado estable | P1 · imp. P1 | D5 (+D2, D4) | sí | n/a |
| SL-07 | Figuras archify coloreadas por kind, no por capa | P1 · imp. P1 | n/a | n/a | n/a |
| SL-08 | Raíl lateral en callouts | P1 · imp. P2 | D4 | no | n/a |
| SL-09 | Raíl degradado en AtAGlance | P1 · imp. P3 | D4 | no | n/a |
| SL-10 | Raíl degradado en el pullquote | P1 · imp. P3 | D2 | no | n/a |
| SL-11 | Banda de 8 px en StackLayerPanel | P1 · imp. P2 | D3 | no | n/a |
| SL-12 | Raíl de capa en nodos core | P1 · imp. P3 | D3 | no | n/a |
| SL-13 | Elevación uniforme (sombra + lift en todas las tarjetas) | P1 · imp. P2 | D2 (+D4) | sí | en curso (sombra de `.card-lum`) |
| SL-14 | Halos de color en CTA y hero-panel | P1 · imp. P3 | D2 | Jordi | en curso (halo del hero-panel) |
| SL-15 | Bento con teselas medio vacías | P2 · imp. P2 | D2 (+D5) | sí | n/a |
| SL-16 | Numerales fantasma | P1 · imp. P3 | D2 | no | n/a |
| SL-17 | Footer: rejilla y marca de agua | P1 · imp. P3 | D1 | Jordi | n/a |
| SL-18 | Rejilla y puntos detrás del contenido | P1 · imp. P2 | D2 (+D3, D4) | Jordi | Jordi · en curso (rejilla del hero de la home) |
| SL-19 | CtaBand de cierre en cada landing | P1 · imp. P2 | D2 | sí | n/a |
| SL-20 | Franja de salarios en la home, duplicada en /role | P1 · imp. P2 | D2 | sí | n/a |
| SL-21 | Tarjetas 3-up idénticas | P1 · imp. P3 | D2 (+D3) | sí | n/a |
| SL-22 | Ritmo monótono entre secciones y apretado dentro | P2 · imp. P2 | D3 (+D2) | no | n/a |
| HOM-1 | Hero fuera de la retícula | P2 · imp. P2 | D2 | no | n/a |
| HOM-2 | Hueco sobre el titular | P2 · imp. P3 | D2 | no | n/a |
| HOM-3 | CTA secundario casi invisible | P1 · imp. P2 | D2 | no | n/a |
| HOM-4 | Entrada del hero con opacity | P3 · imp. P2 | D2 | no | n/a |
| HOM-5 | Verdict beat indistinguible en oscuro | P1 · imp. P2 | D2 | no | n/a |
| HOM-6 | Salto del count-up | P3 · imp. P3 | D2 | no | n/a |
| HOM-7 | Titulares y bloques duplicados entre páginas | n/a · imp. P3 | D2 (+D3) | sí | n/a |
| THS-1 | Dos bordes izquierdos en el primer viewport | P2 · imp. P3 | D4 (+D6) | no | n/a |
| THS-2 | Fechas incoherentes | n/a · imp. P2 | D4 | sí | n/a |
| ROL-1 | H1 de 4 líneas a 390 | P2 · imp. P2 | D3 | no | n/a |
| ROL-2 | Workflows: enlace repetido ×7 y span vacío | P1 · imp. P3 | D3 | sí | n/a |
| STK-1 | Bandas inactivas del diagrama con opacity sobre el texto | P1 · imp. P1 | D3 | no | n/a |
| STK-2 | Barras de capa invisibles en la banda oscura | P1 · imp. P2 | D3 | no | n/a |
| STK-3 | Cuadrados decorativos en «How to read it» | P1 · imp. P3 | D3 | no | n/a |
| STK-4 | Tabla de herramientas a una por fila | P2 · imp. P2 | D3 | sí | n/a |
| PTH-1 | La leyenda no distingue los estados | P1 · imp. P2 | D3 | no | n/a |
| PTH-2 | Nodos opcionales casi invisibles | P1 · imp. P2 | D3 | no | n/a |
| MAP-1 | Chips que repiten el nombre de la fila | P1 · imp. P3 | D3 | no | n/a |
| MAP-2 | Tracking de etiqueta en texto de caja mixta | P2 · imp. P3 | D3 | no | n/a |
| BOK-1 | Resúmenes cortados a mitad de frase | P2 · imp. P3 | D4 (+D2) | no | n/a |
| BOK-2 | Hueco antes del footer | P2 · imp. P3 | D4 | no | n/a |
| BST-1 | Miga con el número de capítulo duplicado | n/a · imp. P3 | D4 | no | n/a |
| BST-2 | Interlínea 1 en la miga | P2 · imp. P3 | D4 | no | n/a |
| BST-3 | La máscara del sidebar atenúa el último capítulo | P1 · imp. P2 | D4 | no | n/a |
| BST-4 | Punto huérfano en AtAGlance | P2 · imp. P3 | D4 | no | n/a |
| RES-1 | Viñetas visibles en el hub | P2 · imp. P2 | D5 | no | bug |
| GLO-1 | Hueco entre el hero y la barra A–Z | P2 · imp. P3 | D5 | no | n/a |
| GLO-2 | Anchos desiguales entre entradas y barra A–Z | P2 · imp. P3 | D5 | no | n/a |
| CRW-1 | Chip «related» sin leyenda visible | P1 · imp. P2 | D5 | no | n/a |
| CRW-2 | Claves de capa solo por color | P1 · imp. P2 | D5 (+D3) | no | n/a |
| CRW-3 | Matriz cortada a 390 sin pista de scroll | P2 · imp. P2 | D5 | no | n/a |
| FRW-1 | Cabeceras de la matriz a 10 px con opacity | P1 · imp. P2 | D5 | no | n/a |
| FRW-2 | Páginas interminables a 390 | P2 · imp. P2 | D5 | sí | n/a |
| FRW-3 | Columna de etiquetas ancha en filas-tarjeta | P2 · imp. P3 | D5 | no | n/a |
| 404-1 | Tres CTAs | P2 · imp. P3 | D6 | no | n/a |
| 404-2 | Banda vacía antes del footer | P2 · imp. P3 | D6 | no | n/a |
| GLB-1 | Drawers con cierres distintos | P2 · imp. P3 | D5 | no | n/a |
| GLB-2 | Footer largo y nombres partidos | P2 · imp. P3 | D1 | no | n/a |
| GLB-3 | Pista «Ctrl K» en táctil | n/a · imp. P3 | D1 | no | n/a |
| TC-01 | Drawer de capítulos cerrado pero enfocable | n/a · imp. P1 | D4 | no | bug |
| TC-02 | Reflow a 320: la cabecera desborda | P2 · imp. P1 | D1 | no | bug |
| TC-03 | Desborde horizontal en /resources/frameworks a 390 | P2 · imp. P1 | D5 | no | bug |
| TC-04 | «Cite this chapter» desborda a 390 | P2 · imp. P2 | D4 | no | bug |
| TC-05 | Resultados de búsqueda sin estilo | P1 · imp. P2 | D1 | no | bug |
| TC-06 | Sidebar y TOC del Doc no son sticky | n/a · imp. P2 | D4 | no | bug |
| TC-07 | El clic tras el hover cierra el mega-menú | n/a · imp. P2 | D1 | no | bug |
| TC-08 | Etiquetas SVG de diagramas bajo AA | P1 · imp. P1 | n/a | n/a | n/a |
| TC-09 | Texto de diagramas a 2–7 px | P1 · imp. P1 | n/a | n/a | n/a |
| TC-10 | «Dim the rest» atenúa texto con opacity | P1 · imp. P2 | n/a | n/a | n/a |
| TC-11 | Texto al 200 % recortado a 390 | P2 · imp. P2 | D3 (+D2) | no | n/a |
| TC-12 | Objetivos táctiles de menos de 24 px | P2 · imp. P2 | D3 | no | n/a |
| TC-13 | `.nav-num` bajo AA en hover | P1 · imp. P3 | D4 | no | n/a |
| TC-14 | `landmark-unique`: dos `<aside>` sin nombre | n/a · imp. P3 | D4 | no | n/a |
| TC-15 | Drawers con fondo no inerte | n/a · imp. P3 | D5 | no | n/a |
| TC-16 | El toggle de tema anuncia un estado doble | n/a · imp. P3 | D1 | no | n/a |
| TC-17 | La búsqueda necesita dos Esc | n/a · imp. P3 | D1 | no | n/a |
| TC-18 | Shiki con la paleta github-dark | P1 · imp. P3 | D4 | sí | n/a |
| TC-19 | Scrims y color de OG hard-coded | n/a · imp. P3 | D1 | sí | n/a |
| TC-20 | `backdrop-filter` en la cabecera sticky | P3 · imp. P3 | D1 | no | n/a |
| TC-21 | Transiciones de height fuera de tokens | P3 · imp. P3 | D4 | no | n/a |
| TC-22 | `motion-ui` cargado en todas las rutas | P3 · imp. P3 | n/a | n/a | n/a |
| TC-23 | Set oscuro triplicado | n/a · imp. P3 | n/a | n/a | n/a |
| TC-24 | «Kill» global de reduced-motion | P3 · imp. P3 | n/a | n/a | n/a |
| TC-25 | Líneas de prosa demasiado largas | P2 · imp. P2 | n/a | n/a | n/a |
| TC-26 | Gates de CI ciegos al contraste | n/a · imp. P2 | n/a | n/a | n/a |
| TC-27 | Estado HTTP de /404 en producción | n/a · imp. P3 | D6 | no | n/a |
| DET-01 | Detector no comparable con el baseline | n/a · imp. P2 | n/a | n/a | n/a |
| MS-01 | Turbidez de la malla en oscuro | P1 · imp. P3 | D2 (+D6) | Jordi | n/a |
| MS-02 | Repetición de la malla | P1 · imp. P3 | D2 (+D3) | Jordi | n/a |
| MS-03 | `--muted` sin re-scope sobre la malla (AA) | P1 · imp. P1 | D2 (+D3) | no | n/a |
| MS-04 | Deriva de la malla | P3 · imp. P3 | D2 | Jordi | n/a |
| MS-05 | Anillo `--grad-border` en hover | P1 · imp. P3 | D2 | Jordi | n/a |
| MS-06 | Texto degradado en las cifras | P1 · imp. P3 | D2 | Jordi | n/a |
| MS-07 | Malla y línea degradada dentro de la CtaBand | P1 · imp. P3 | D2 | Jordi | n/a |
| MS-08 | Glow radial de ChapterHeader | P1 · imp. P3 | D4 | Jordi | n/a |
| MS-09 | Malla más saturada en /404 | P1 · imp. P3 | D6 | Jordi | n/a |

### 10.1 Recuento por bloque

| Bloque | Total | No amplía | Amplía | Jordi | IDs |
|---|---|---|---|---|---|
| 4 · D1 chrome global | 11 | 8 | 2 | 1 | SL-05, SL-17, GLB-2, GLB-3, TC-02, TC-05, TC-07, TC-16, TC-17, TC-19, TC-20 |
| 5 · D4 lectura | 18 | 15 | 2 | 1 | SL-08, SL-09, THS-1, THS-2, BOK-1, BOK-2, BST-1, BST-2, BST-3, BST-4, TC-01, TC-04, TC-06, TC-13, TC-14, TC-18, TC-21, MS-08 |
| 6 · D2 home + marketing | 27 | 10 | 9 | 8 | SL-01, SL-02, SL-03, SL-04, SL-10, SL-13, SL-14, SL-15, SL-16, SL-18, SL-19, SL-20, SL-21, HOM-1, HOM-2, HOM-3, HOM-4, HOM-5, HOM-6, HOM-7, MS-01, MS-02, MS-03, MS-04, MS-05, MS-06, MS-07 |
| 7 · D3 landings | 15 | 13 | 2 | 0 | SL-11, SL-12, SL-22, ROL-1, ROL-2, STK-1, STK-2, STK-3, STK-4, PTH-1, PTH-2, MAP-1, MAP-2, TC-11, TC-12 |
| 8 · D5 resources | 13 | 11 | 2 | 0 | SL-06, RES-1, GLO-1, GLO-2, CRW-1, CRW-2, CRW-3, FRW-1, FRW-2, FRW-3, GLB-1, TC-03, TC-15 |
| 9 · D6 about/404/newsletter | 4 | 3 | 0 | 1 | 404-1, 404-2, TC-27, MS-09 |
| sin bloque | 10 | 0 | 0 | 0 | SL-07, TC-08, TC-09, TC-10, TC-22, TC-23, TC-24, TC-25, TC-26, DET-01 |

### 10.2 Fuera de alcance del cambio actual

Hace falta que Jordi amplíe `proposal.md` / `tasks.md` o abra un cambio nuevo.

**Sin bloque (no encajan en D1–D6):**

- **SL-07** Figuras archify coloreadas por kind, no por capa (P1 · imp. P1). Diagramas archify: Non-Goal de design.md.
- **TC-08** Etiquetas SVG de diagramas bajo AA (P1 · imp. P1). Diagramas archify: Non-Goal de design.md.
- **TC-09** Texto de diagramas a 2–7 px (P1 · imp. P1). Diagramas archify: Non-Goal de design.md.
- **TC-10** «Dim the rest» atenúa texto con opacity (P1 · imp. P2). Diagramas archify: Non-Goal de design.md.
- **TC-22** `motion-ui` cargado en todas las rutas (P3 · imp. P3). Fase 3 (base de motion).
- **TC-23** Set oscuro triplicado (sin bloque · imp. P3). Refactor de tokens/base.
- **TC-24** «Kill» global de reduced-motion (P3 · imp. P3). Refactor de tokens/base.
- **TC-25** Líneas de prosa demasiado largas (P2 · imp. P2). Token `--prose`.
- **TC-26** Gates de CI ciegos al contraste (sin bloque · imp. P2). Gates de CI.
- **DET-01** Detector no comparable con el baseline (sin bloque · imp. P2). Gate del detector (§7.5).

**Con bloque, pero amplían su alcance:**

| Bloque | IDs |
|---|---|
| 4 · D1 chrome global | SL-05 Mono mayúsculas omnipresente; TC-19 Scrims y color de OG hard-coded |
| 5 · D4 lectura | THS-2 Fechas incoherentes; TC-18 Shiki con la paleta github-dark |
| 6 · D2 home + marketing | SL-01 Telemetría simulada en el hero (en curso); SL-03 Register rule numerado 01–07 (en curso); SL-04 Fórmula eyebrow + H2 + lede y chips de kicker (en curso); SL-13 Elevación uniforme (sombra + lift en todas las tarjetas) (en curso); SL-15 Bento con teselas medio vacías; SL-19 CtaBand de cierre en cada landing; SL-20 Franja de salarios en la home, duplicada en /role; SL-21 Tarjetas 3-up idénticas; HOM-7 Titulares y bloques duplicados entre páginas |
| 7 · D3 landings | ROL-2 Workflows: enlace repetido ×7 y span vacío; STK-4 Tabla de herramientas a una por fila |
| 8 · D5 resources | SL-06 Colores de capa sin significado estable; FRW-2 Páginas interminables a 390 |
| 9 · D6 about/404/newsletter | n/a |

### 10.3 Pendientes de decisión de Jordi

SL-14 (Halos de color en CTA y hero-panel); SL-17 (Footer: rejilla y marca de agua); SL-18 (Rejilla y puntos detrás del contenido); MS-01 (Turbidez de la malla en oscuro); MS-02 (Repetición de la malla); MS-04 (Deriva de la malla); MS-05 (Anillo `--grad-border` en hover); MS-06 (Texto degradado en las cifras); MS-07 (Malla y línea degradada dentro de la CtaBand); MS-08 (Glow radial de ChapterHeader); MS-09 (Malla más saturada en /404); y la frase del verdict beat (§2, HOM-5: A pide conservarla y distill la quita).

## 11. Anexos

### 11.1 Informes de campo y copias

- Carpeta `C:\Users\Jordi\AppData\Local\Temp\claude\D--Documents-aige\c1edd177-de5c-4e3f-b090-09e798d7e774\scratchpad\reports\`:
  - `assessment-a-design-review.md` (A: crítica, 28/40, S1–S18, M-1–M-14, personas);
  - `assessment-b-detector.md` (B: detector, overlay, comparación con el baseline);
  - `audit-technical.md` (C: auditoría técnica, 15/20, 24 hallazgos).
- Copia del audit técnico: `D:\Documents\aige\.claude\worktrees\ui\site\.impeccable\audit.md`.
- Snapshot de la crítica (helper `critique-storage`, slug `src-pages`): `D:\Documents\aige\.claude\worktrees\ui\site\.impeccable\critique\2026-09-23T17-36-19Z__src-pages.md`.
- Resumen tabular (una fila por hallazgo): `C:\Users\Jordi\AppData\Local\Temp\claude\D--Documents-aige\2f0a7d95-5720-4245-82bc-cefe7b7f27b4\scratchpad\impeccable-audit.md`.
- Contexto: `deslop-worklist.md` y `tasks.md` de esta carpeta; baseline y ejecuciones previas en el scratchpad `2f0a7d95…` (`impeccable-baseline.txt/json`, `impeccable-final.json`, `impeccable-wave3.json`, `group.js`).

### 11.2 Capturas

Todas las rutas son relativas al scratchpad `c1edd177…`:
- `shots/<slug>-<ancho>-<tema>.png`: 56 capturas a página completa con `reducedMotion: 'reduce'` (p. ej. `home-1440-light.png`, `bok-the-stack-390-dark.png`, `resources-frameworks-390-light.png`).
- `shots/interact/` (11): `nav-bok-hover-1440`, `nav-bok-open-1440`, `nav-practice-open-1440`, `search-eval-gate-1440`, `theme-toggled-1440`, `path-drawer-1440`/`-390`, `crosswalk-drawer-1440`, `stack-story-pin-1440`, `mobile-drawer-390`, `mobile-drawer-group-390`.
- `shots/motion/` (6): `home-hero-motion-t1`/`t2`, `stack-flow-motion`, `path-node-hover`, `path-drawer-t80`/`t480`.
- Capturas de C en `audit/shots/`: `stack-flow-light-default.png`, `zoom-w320-_.png`, `zoom-text200_390-*.png`.
- Captura de B: `detector/live/hero-stamp-1440.png`.
- Recortes de A: `tiles/`.

### 11.3 Datos crudos

- **`audit/` (C):**
  - `axe-raw-no-preference.json`, `axe-no-preference.csv`;
  - `contrast-sweep*.json/csv`, `contrast-frameworks*`;
  - `keyboard.json`, `responsive.json`, `motion.json`, `perf.json`, `svgtext.json`, `states.json`, `toc.json`, `colors-hardcoded.json`;
  - `detect-dist.json`, `detect-src.json`, `detect-routes.json`;
  - scripts `*.cjs`, entre ellos `contrast-lib.cjs`, reutilizable para TC-26.
- **`detector/` (B):**
  - `dist.json`/`.txt`, `dist-worktree-1832.*`, `dist-nodesign.json`, `src.json`/`.txt`;
  - `compare.md`, `per-file.md`, `site-byrule.txt`, `baseline.tsv`;
  - `live/overlay-results.json` y los scripts `summ.cjs`, `compare.cjs`, `byrule.cjs`, `live/*.cjs`.
- **`dist-snapshot/`:** copia congelada del `dist` de las 18:27.

### 11.4 Lo que no se midió y por qué

| Qué | Por qué |
|---|---|
| Lighthouse, LCP real y CWV | `lhci` estaba prohibido. El retraso del LCP de HOM-4 se infiere de la opacidad medida a 120 ms. |
| CSP efectiva | El preview (`serve`) no aplica `_headers`; la política se leyó del fichero. En producción, `script-src 'self'` bloquearía el `detect.js` del overlay. |
| `npm test`, `test:a11y`, `test:visual` y `build` | Por instrucción. |
| Overlay a 390, overlay sobre archify y `low-contrast` de archify en navegador | No se hizo (B). |
| `detect <url>` | Por instrucción. |
| Táctil real y lectores de pantalla reales | Se usó emulación `hasTouch`/`isMobile`; de accesibilidad solo se revisaron el árbol ARIA y axe (C). |
| Zoom de texto nativo | Se emuló con `html { font-size: 200% }`, que no escala px (C). |
| Contraste en vivo del TOC `is-past`/`aria-current` | El TOC no es sticky (TC-06). Por tokens: 4,80 / 9,46 / ≥ 15:1 (C). |
| Estabilidad de A | El preview se cayó a las 18:32 y se repitieron 28 capturas. Todas son de 18:31–18:33 y anteriores al rebuild de las 18:58. Solo las sondas de StackFlow y de búsqueda son posteriores, sobre componentes no tocados. |

### 11.5 Contradicciones entre A, B y C y cómo se resolvieron

| Tema | Posiciones | Resolución |
|---|---|---|
| Desborde de `/resources/frameworks` a 390 | A: 408 frente a 390. C: «0 px en las 14 rutas». | Vale A. En `responsive.json`, C registró `W: 408` para esa ruta: con `isMobile` el viewport de layout creció hasta el contenido y `scrollWidth − innerWidth` dio 0. TC-03 (P1). |
| `.glance::after`, `.pullquote::before` | A: slop. B: FP (motivo de capas, convención de cita). | Glance fuera (no son capas; worklist C.5), SL-09. Pullquote: raíl plano sin degradado, SL-10. |
| Raíl de `PathNode` | A: slop. B: FP (codifica la capa). | Opcional, P3 (SL-12): la semántica es legítima. |
| Colores de capa en chips y kickers | A: confeti (P1). C: positivo (sin sexto acento). DESIGN.md l.164 permite swatches de kicker. | Las dos cosas son ciertas: la disciplina de tokens se cumple y la semántica falla. SL-06 «sí amplía»: revierte la tarea 8.2 y toca el requisito de color de capítulo de `reading-experience`. |
| Mono mayúsculas | A: slop P1. B: decisión documentada, actuar a partir de 40 caracteres. C: FP prescrito. | Documentado para identificadores y eyebrows cortos; real en botones, enlaces y etiquetas largas (SL-05). |
| `cramped-padding` | Worklist C.4: 73 reales. B: 97 FP. A: macro refutado, micro confirmado. | No perseguir el detector. SL-22 recoge lo micro. |
| `gradient-text` de StatTile | B: real (DESIGN.md no documenta texto degradado). C: autorizado. | Usa `--grad-cta`, un degradado derivado protegido por Jordi → MS-06, opcional. |
| `.mx-colh-name` | B: P1 (10 px + `opacity`). C: P3 (pasa 5,11:1). | Impacto P2: incumple la hard constraint #2 y el mínimo de 11–12 px, pero no AA (FRW-1). |
| Texto de diagramas | A y B: P1. C: P2 (sin criterio WCAG estricto). | P1: incumple VISUAL-GUIDE §1.10 y en `/` no hay salida «Enlarge» (TC-09). |
| Entrada del hero con `opacity` | A: grupo P1. C: P2. | P2, eje P3: incumple la hard constraint #1 y el LCP, no AA (HOM-4). |
| Malla | A: eliminar (S1, P1). | Restricción de Jordi: se conserva. Ajustes en §8. |
| Footer (rejilla + marca de agua) | A: quitar. B: D/FP. Worklist C.10: mantener. | Pendiente de Jordi (SL-17). `.num` → `--ink-2` en cualquier caso. |
| Frase del verdict beat | A: la mejor línea, conservar. Worklist C.9 / distill: quitar. | Lo decide Jordi (§2, HOM-5). |
| Recuento de animaciones perpetuas en la home | A: ~9 instancias. C: 6 tipos. | Las dos cifras son correctas; SL-02 da ambas. |
