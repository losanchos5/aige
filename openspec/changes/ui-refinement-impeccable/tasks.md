# Tasks

## 1. Herramientas (Jordi en la CLI + baseline)

- [ ] 1.1 Jordi: `/plugin marketplace add pbakaus/impeccable`, `/plugin` → instalar `impeccable` en ámbito user, reiniciar sesión; verificar que `/impeccable` aparece en la lista de comandos
- [x] 1.2 Jordi (opcional): `npx skills add Jakubantalik/transitions.dev` desde `site/`; verificar que existe `~/.claude/skills/transitions-dev/`
- [x] 1.3 Jordi: `/impeccable init` desde `site/`; verificar que existen `site/PRODUCT.md` y `site/DESIGN.md` y, si aparece `site/.impeccable/`, añadirla a `.gitignore`
- [x] 1.4 Sembrar `site/DESIGN.md` con los tokens de `tokens.css` (claro/oscuro), escala tipográfica, fuentes, primitivas de `effects.css`, reglas de reveal y las tres restricciones duras; `site/PRODUCT.md` con producto, audiencia y voz de `STYLEGUIDE.md`; verificar que `DESIGN.md` no contiene ningún color hex que no esté en `tokens.css`
- [x] 1.5 Baseline del detector: `cd site && npm run build && npx impeccable detect dist` guardado en el scratchpad como `impeccable-baseline.txt`; verificar que el fichero existe y anotar el recuento total de hallazgos

## 2. Auditoría (Jordi con el plugin)

- [x] 2.1 Jordi: `/impeccable audit` y `/impeccable critique` sobre `/`, `/thesis`, `/role`, `/stack`, `/path`, `/map`, `/bok`, `/bok/the-stack`, `/resources`, `/resources/glossary`, `/resources/crosswalk`, `/resources/frameworks`, `/about`, `/404` (1440 y 390, claro y oscuro); guardar los informes en `site/.impeccable/` o el scratchpad
- [x] 2.2 (lista fusionada y asignada en `impeccable-audit.md` §10; la ejecución pasa al cambio de distill en la sesión ui-4f) Fusionar auditoría + baseline en una lista priorizada (P1 contraste/jerarquía, P2 ritmo, P3 movimiento) asignando cada hallazgo a un bloque 4–9; verificar que ningún hallazgo amplía el alcance de un bloque más allá de la propuesta

## 3. Integración de motion (base compartida)

- [x] 3.1 `npm i motion` en `site/`; crear `site/src/scripts/motion-ui.ts` con el guard `run(fn, final)` y exportar `animate`, `inView`, `stagger` desde `motion/mini` y `spring` desde `motion`; verificar que `astro check` pasa
- [x] 3.2 Cargar el módulo desde `site/src/layouts/Base.astro` con `<script>import '../scripts/motion-ui.ts'</script>`; verificar en `dist/index.html` que se emite como `<script type="module" src="/_astro/motion-ui.*.js">`
- [x] 3.3 Añadir a `site/tests/infra.spec.ts` el assert "ningún `<script>` sin `src`" sobre `dist/index.html` y `dist/bok/the-stack.html`, y que la CSP de `dist/_headers` no ha cambiado; verificar que el test pasa (si falla por inlining, fijar `vite.build.assetsInlineLimit: 0` en `astro.config.ts`)
- [x] 3.4 Medir `dist/_astro/motion-ui.*.js` gzip ≤ 8 KB y documentar la medida en el resumen del bloque

## 4. Bloque D1 — Chrome global

- [x] 4.1 `ThemeToggle.astro` + `public/ui.js`: emitir `CustomEvent('theme:changed')` al pulsar; en `motion-ui.ts` spring rotate/scale del icono entrante (estado final síncrono bajo reduced-motion); verificar con `shell.spec.ts` y comprobación manual en claro/oscuro
- [x] 4.2 `SearchDialog.astro`: entrada con `@starting-style` + `transition-behavior: allow-discrete` (transform + scrim, sin opacidad en texto); verificar que abre/cierra con teclado y `shell.spec.ts` pasa
- [x] 4.3 `Header.astro` + `public/nav.js`: chevron de grupo rota con `aria-expanded`; `.is-scrolled` aplica `--shadow-1`; verificar con `nav.spec.ts`
- [x] 4.4 `Footer.astro`: revisar jerarquía y espaciado con tokens (sin cambios de estructura); verificar que `test:a11y` pasa en `/` y `/bok`

## 5. Bloque D4 — Lectura (BoK)

- [x] 5.1 `Doc.astro` fija `--chapter-ink` desde `headerLayer`; `prose.css` usa `var(--chapter-ink)` en `.prose h2::before`; verificar en un capítulo de capa ≠ 1 en claro y oscuro
- [x] 5.2 `Toc.astro` + `public/ui-doc.js`: estados actual / leída / pendiente por color (nunca opacity), AA ≥ 4,5:1; verificar con `bok.spec.ts` y `test:a11y`
- [x] 5.3 `PrevNext.astro`: tarjetas con `card-lum lift`, nombre accesible = nombre del capítulo; verificar con `bok.spec.ts` incluido el último capítulo
- [x] 5.4 `SidebarNav.astro` + `ChapterHeader.astro`: ritmo tipográfico y espaciado con tokens; verificar screenshots regenerados y `test:a11y`

## 6. Bloque D2 — Home + Marketing

- [x] 6.1 `pages/index.astro` + `CtaBand.astro`: fila de CTAs del hero con contraste de peso (primario `btn-glow`, secundario outline); verificar `home.spec.ts`
- [x] 6.2 `layouts/Marketing.astro`: números de register-rule con `--ink-2` o `--muted` re-escopado sobre tint; verificar AA con `test:a11y`
- [x] 6.3 `StatTile.astro` + `public/countup.js`: count-up con `animate()` de motion, trigger IntersectionObserver conservado, `.source` en `--ink-2`; verificar que el valor final es exacto y `v1-v4.spec.ts` pasa
- [x] 6.4 `ResourceTiles.astro`, `DefinitionCards.astro`, `ChapterGrid.astro`: `.bento` + `card-lum lift` consistentes con `--i` en `.reveal-stagger`; verificar screenshots regenerados

## 7. Bloque D3 — Landing pages

- [x] 7.1 `PageHero.astro`: diferenciar las variantes landing/referencia (kicker, medida del título, textura) sin tocar los requisitos de `page-hero`; verificar `stack-role.spec.ts` y `path.spec.ts`
- [x] 7.2 `StackLayerPanel.astro` + `StackDiagram.astro` + `public/stack.js`: `inView` + `stagger` translateY en las 5 capas, bajo el fold, sin transform en ancestros de `.story-pin`; verificar sticky en `/stack` a 1440 y `stack-role.spec.ts`
- [x] 7.3 `PathMap.astro`, `MaturityLadder.astro`, `styles/pages.css`, `styles/map.css`: ritmo y espaciado con tokens; verificar `map*.spec.ts` y `path.spec.ts`

## 8. Bloque D5 — Resources

- [x] 8.1 `PathDrawer.astro` + `CrosswalkDrawer.astro`: spring translateX del panel y `stagger` sobre `[data-drawer-body] > *`, estado final síncrono bajo reduced-motion; verificar `resources.spec.ts` y `path.spec.ts`
- [x] 8.2 `FrameworkTable.astro`, `ObligationTable.astro`, `CrosswalkMatrix.astro`: chips `.type-tag` coloreados por capa con inks de `tokens.css`; verificar AA con `test:a11y`
- [x] 8.3 `GlossaryIndex.astro`: barra de salto con `aria-current`; verificar `resources.spec.ts`

## 9. Bloque D6 — About, 404, Newsletter

- [x] 9.1 `pages/404.astro`: `<Section tone="mesh">` con CTA de vuelta; verificar `test:a11y` en `/404`
- [x] 9.2 `NewsletterForm.astro`: `.nl-note` en `--ink-2`, anillo de foco con `--l1-ink`; verificar AA y que el `action` de Buttondown no cambia
- [x] 9.3 `pages/about/*`: espaciado y jerarquía con tokens; verificar screenshots regenerados

## 10. Verificación final

- [x] 10.1 Cadena completa: `npm run build`, `npm test`, `npm run test:a11y`, `npm run test:visual` (regenerar y revisar PNG), `npm run lhci` el último; verificar perf ≥ 0,95 y a11y/BP/SEO = 1 en las 9 URLs
- [x] 10.2 `npx impeccable detect dist` y comparar con `impeccable-baseline.txt`; verificar que el recuento no sube y no hay reglas nuevas
- [x] 10.3 Revisión con `code-reviewer` (Opus 5.5) del diff completo; verificar que no quedan CRITICAL/HIGH
- [x] 10.4 Commit por bloque con formato `feat(site): …`, push y comprobar el deploy en Cloudflare con `curl -I` (CSP intacta)

## 11. Correcciones de la auditoría impeccable (sesión aige-c9, 2026-09-23; solo hallazgos «no amplía» de §10 del informe)

- [x] 11.1 D1 chrome + D6 (rama `feat/ui-audit-d1`): GLB-2, GLB-3, TC-02, TC-05, TC-07, TC-16, TC-17, TC-20, 404-1, 404-2, TC-27; verificar `shell`/`nav`/`layout`/`bok` specs y `test:a11y`
- [x] 11.2 D3 landings (rama `feat/ui-audit-d3`): SL-11, SL-12, SL-22, ROL-1, STK-1, STK-2, STK-3, PTH-1, PTH-2, MAP-1, MAP-2, TC-11, TC-12, MS-03; verificar `stack-role`/`path`/`map*` specs y `test:a11y`; sticky de `/stack` intacto
- [x] 11.3 D4 lectura (rama `feat/ui-audit-d4`): SL-08, SL-09, THS-1, BOK-1, BOK-2, BST-1, BST-2, BST-3, BST-4, TC-01, TC-04, TC-06, TC-13, TC-14, TC-21; verificar `bok.spec.ts`, `test:a11y` y la spec `reading-experience`
- [x] 11.4 D5 resources (rama `feat/ui-audit-d5`): RES-1, GLO-1, GLO-2, CRW-1, CRW-2, CRW-3, FRW-1, FRW-3, GLB-1, TC-03, TC-15; verificar `resources`/`path` specs y `test:a11y` (SL-06 queda fuera: decisión de Jordi)
- [ ] 11.5 (merges hechos, build/default/a11y verdes, code-reviewer lanzado; falta: integrar sobre `feat/ui-distill`, visual, lhci, PR) Integración en `feat/ui-audit-fixes` (worktree `.claude/worktrees/audit`): merge de las cuatro ramas, `npm run build` → `npm test` → `test:a11y` → `test:visual` (regenerar baselines una sola vez) → `lhci`; `code-reviewer`; PR contra `main`
- [x] 11.6 Segunda ola transversal sobre `feat/ui-audit-fixes` tras integrar 11.1-11.4 (reparto acordado con la sesión distill `ui-4f` el 2026-09-23 20:50; decisiones de Jordi relatadas por esa sesión: rejilla/puntos fuera de las páginas interiores y malla conservada; `.card-lum` plano sin sombra ni lift salvo tarjeta-enlace; sin halos `--glow-1`, relleno `--grad-cta` conservado; frase nueva del verdict beat conservada; footer conservado con `.num` ≥ 4,5:1): SL-04 kickers fuera de la home (borrar `Kicker.astro` y los props `kicker`/`texture` de Section/PageHero/ChapterHeader), SL-18 `texture=` en páginas interiores, SL-05 `thead th` en mayúsculas, SL-06 chips y `headerLayers` solo con `--lN` para la capa N, SL-17 `.num` del footer, tamaños de `bok/index.astro`; `ui-4f` borra `.bg-grid/.bg-dots/.bg-fade` de `effects.css` y quita `kicker=`/`texture=` de `index.astro`
- [ ] 11.7 Fuera de esta pasada: D2 (SL-01, SL-02, SL-03, SL-10, SL-13, SL-14, SL-15, SL-16, SL-19, SL-20, SL-21, HOM-1..HOM-7, MS-01..MS-07 → sesión distill `ui-4f`); «sí amplía» pendientes de Jordi (THS-2, ROL-2, STK-4, FRW-2, TC-18, TC-19); MS-08, MS-09; sin bloque (SL-07, TC-08, TC-09, TC-10, TC-22..TC-26, DET-01)
