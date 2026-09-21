# Tasks

Rama `feat/discipline-map-nav` desde `main`. Ola 1 = grupos 1, 2 y 3 en paralelo (ficheros
disjuntos); ola 2 = grupos 4 y 5 en paralelo; grupos 6 y 7 los hace Fable. Todos los comandos se
ejecutan en `D:\Documents\aige\site` salvo que se indique otra ruta. Parar cualquier `astro preview`
en el puerto 4321 antes de lanzar tests.

## 1. Hero a ancho completo y migas de pan

- [x] 1.1 Crear `src/components/Breadcrumb.astro` y `src/lib/breadcrumbs.ts` (JSON-LD `BreadcrumbList` con URLs absolutas); verificar con `npx astro check` sin errores.
- [x] 1.2 Crear `src/components/PageHero.astro` (variantes `page`/`res`, `mesh`, `texture`, `kicker`/`crumbs`, `related`, slots `lede`/`note`) moviendo a su `<style>` las reglas `.hero--page/.hero-in/hero-up/.hero-tex/.page-hero*` de `pages.css` y `.res-head/.res-title/.res-lede/.res-note` de `resources.css`; verificar con `grep -n "hero--page\|res-head\|page-hero" src/styles/*.css` que no quedan duplicadas.
- [x] 1.3 Migrar `resources/{frameworks,crosswalk,tools,reading-list,glossary}.astro` y `resources/index.astro` a `PageHero` (glossary `mesh={false}`; reading-list con `slot="note"`; tools/reading-list con `slot="lede"`), con migas "Resources › …"; verificar con `npm run build` (astro check, lint de contenido, check de enlaces) en verde.
- [x] 1.4 Migrar `role.astro` (`related` → `/bok/the-role`), `stack.astro` (`related` → `/bok/the-stack`) y `path.astro` (quitar el "Chapter 06" erróneo) a `PageHero variant="page"`; añadir `crumbs` a `Doc.astro` + `bok/[slug].astro` y a `about/{changelog,contributors}.astro`; verificar con `npm run build`.
- [x] 1.5 Escribir `tests/page-hero.spec.ts` (mesh a x=0 y ancho = viewport en `/resources/frameworks` a 1440×900; `.hero-tex` en `/resources/glossary` y `/role`; sin scroll horizontal; migas con 2 elementos, `aria-current` y JSON-LD en `/resources/frameworks`, `/bok/the-stack`, `/about/changelog`; sin migas en `/thesis` y `/about`); verificar con `npx playwright test tests/page-hero.spec.ts tests/resources.spec.ts tests/stack-role.spec.ts tests/path.spec.ts tests/layout.spec.ts tests/bok.spec.ts` en verde.
- [x] 1.6 Regenerar capturas E (`npx playwright test tests/resources.spec.ts -g screenshot`), D (`npx playwright test tests/stack-role.spec.ts -g screenshot`) y B (`npx playwright test --project=visual -g path`); verificar abriendo `tests/__screenshots__/E/*frameworks*` que el mesh llega de borde a borde.

## 2. Navegación por grupos

- [x] 2.1 Crear `src/data/nav.ts` (grupos thesis/bok/practice/reference/map/about, `feeds`, `project`, `resolveCurrent`, `allHrefs`, descripciones ≤ 90 caracteres, "Body of Knowledge" solo en su propio item); verificar con `npx astro check`.
- [x] 2.2 Crear el placeholder `src/pages/map.astro` (layout Base, h1 "The map", un párrafo) para que los enlaces a `/map` resuelvan; verificar con `npm run build` en verde.
- [x] 2.3 Reescribir la barra de escritorio en `Header.astro` (botones `aria-expanded`/`aria-controls`, paneles `hidden` anclados al header, enlaces con `aria-describedby`, `data-current`) y crear `public/nav.js` (clic, hover-intent, Escape, clic fuera, focusout, flechas, cierre al cambiar de breakpoint); quitar `initMenu` de `public/ui.js`; verificar con `npx playwright test tests/shell.spec.ts tests/infra.spec.ts` tras actualizar shell.spec.
- [x] 2.4 Añadir el drawer móvil `<dialog id="nav-drawer">` hermano del header (`showModal`, `html.nav-locked`, cierre por Escape/botón/backdrop, `nav.nav-panel`) y el burger `data-nav-open`; verificar con `npx playwright test tests/shell.spec.ts -g mobile` en verde.
- [x] 2.5 Reescribir `Footer.astro` como sitemap desde `nav.ts` (columnas por grupo con los 11 capítulos, feeds, proyecto, La Tesis en español); verificar con `npm run build` (check de enlaces) en verde.
- [x] 2.6 Actualizar `tests/shell.spec.ts` (triggers, apertura/cierre, Escape con foco, clic fuera, Tab fuera, estado actual en `/resources/tools`, drawer móvil) y `tests/block-c.spec.ts` (abrir Practice antes de buscar "Patterns"); crear `tests/nav.spec.ts` (hrefs únicos y 200, descripciones ≤ 90, footer cubre todas las rutas de `dist`, axe con panel abierto a 1440 y drawer a 390 en claro/oscuro); verificar con `npx playwright test tests/shell.spec.ts tests/nav.spec.ts tests/block-c.spec.ts tests/layout.spec.ts` en verde.
- [x] 2.7 Añadir el grupo `N` a `tests/screenshots.spec.ts` (1440 claro/oscuro con panel abierto, 390 claro/oscuro con drawer) y ejecutarlo con `npx playwright test --project=visual -g nav`; verificar con `npm run test:a11y` en verde.

## 3. Datos y generador del mapa

- [x] 3.1 Crear `src/data/map.ts` (solo `import type`; tipos, `HAND_WRITTEN`, `FRAMEWORK_FAMILIES`, `slug`, `buildMap`) siguiendo la tabla de ramas del brief; añadir `id={`fw-${fw.id}`}` a las filas de `FrameworkTable.astro`; verificar con `npx astro check`.
- [x] 3.2 Crear `src/lib/map-index.ts` con `buildClusterIndex` (grupos "In the map", "Chapter sections", "Diagrams and figures", "Learning-path nodes", "Resources"); verificar con `npx astro check`.
- [x] 3.3 Extraer `loadTs` a `scripts/lib/load-ts.mjs`, crear `scripts/lib/svg-text.mjs` y `scripts/map-build.mjs` (layout a dos lados, variantes web y portrait, CLI `--portrait --out --meta`); añadir `discipline-map.svg` a `figures-build.mjs` con presupuesto de 48 KB (`emit(name, svg, budgetKb)`); verificar con `node scripts/figures-build.mjs && node scripts/figures-build.mjs --check` y `node scripts/map-build.mjs --portrait --out test-results/map-portrait.svg --meta test-results/map-portrait.json`.
- [x] 3.4 Registrar `discipline-map` en `src/data/figures.ts` (`placements: []`, caption con "— drawn from chapter"), añadir la regla de foco en `figures.css`, la sección §2.4 en `VISUAL-GUIDE.md` (exención de presupuesto y peso, paleta, scroll lateral, variante portrait) y "Regenerating the figures / the map" en `README.md`; verificar con `npx playwright test tests/figures.spec.ts` en verde.
- [x] 3.5 Escribir `tests/map.spec.ts` (8 ramas, 4 por lado, colores únicos por lado, ids únicos, `short` ⊂ `label`, `HAND_WRITTEN` en los `.md`, cada href resuelve contra headings/ids, familias cubren los 31 frameworks, SVG ≤ 48 KB sin hex con `role="group"`, `--check` sale 0, portrait con `role="img"`, sin `var(--`, con `#F6F4EE` y `viewBox="0 0 1200 `); verificar con `npx playwright test tests/map.spec.ts` en verde.

## 4. Página `/map`

- [ ] 4.1 Sustituir el placeholder por `src/pages/map.astro` (Marketing, `PageHero variant="page"`, Figure con el SVG `?raw` en `.map-scroll`, leyenda, sección "Content by cluster" con 8 `<details class="cluster">`, bloque de descarga tolerante a `map-export.json` ausente) más `src/styles/map.css` y `public/map.js`; verificar con `npm run build` en verde (check de enlaces sobre todas las anclas del SVG e índice).
- [ ] 4.2 Integrar: `ROUTES.map` en `og/[...slug].png.ts` e `image="/og/map.png"`, `/map` en `lighthouserc.cjs` y en `OTHER_PAGES` de `layout.spec.ts`, grupo `M` en `screenshots.spec.ts`, enlace "See the whole map →" en `index.astro`, tile en `resources/index.astro`, línea en `PENDIENTE.md`; verificar con `npm run build` y `curl -sI http://localhost:4321/og/map.png` (200) con `npm run preview`.
- [ ] 4.3 Escribir `tests/map-page.spec.ts` (figura `svg.map-svg[role=group]` con title/desc, 8 `g.branch`, cada `svg a[href]` resuelve, `text.getBBox().width ≤ rect.width − 8`, 8 clusters con ≥ 3 grupos, leyenda 8, sin scroll horizontal a 390/834/1440 y `.map-scroll.scrollWidth > clientWidth` a 390, sin `<script>` inline, Tab + Enter navega, descarga si existe); verificar con `npx playwright test tests/map-page.spec.ts tests/map.spec.ts tests/layout.spec.ts tests/shell.spec.ts tests/nav.spec.ts` en verde.
- [ ] 4.4 Ejecutar `npm run test:a11y`, `npx playwright test --project=visual -g map` y `npm run lhci`; verificar a11y/bp = 1 y perf ≥ 0.95 en `/map` y revisar `tests/__screenshots__/M/*` a 390/834/1440 claro y oscuro.

## 5. Kit LinkedIn (código, en `D:\Documents\aige-media\linkedin`)

- [ ] 5.1 Crear `src/sync-map.mjs` (ejecuta el generador portrait del sitio a `src/generated/`, escribe `discipline-map.meta.json` con versión BoK, `gitSha`, `dirty`, `renderedAt`, `svgSha256`; `--publish` copia el PNG a `site/public/downloads/aige-discipline-map-v{bokVersion}.png` y escribe `site/src/data/map-export.json`); verificar con `node src/sync-map.mjs` y comprobando que existen SVG y meta.
- [ ] 5.2 Crear el esqueleto de `src/mindmap.html` (marcadores `<!--MAP-->` y `{{bokVersion}}`, clases `.frame/.frame-head/.map-slot/.mark/.frame-foot/.font-probe`, `@font-face` de las tres fuentes, `window.__ready`) sin diseño final; verificar abriéndolo en Chromium sin errores de consola.
- [ ] 5.3 Ampliar `src/render.mjs` (`--only`, target `mindmap` 1200×1500 @2x que inyecta SVG y meta y escribe `src/generated/mindmap.built.html`, comprobación de las tres familias, `guardMindmap`: dimensiones, viewBox, nº de textos, área segura, sin solape con la marca, fuente ≥ 14 px (aviso < 16), `dirty`, peso < 3 MB); verificar con `node src/render.mjs --only mindmap` produciendo `out/mindmap-1200x1500@2x.png` con guardas en verde.
- [ ] 5.4 Documentar en `README.md` y `BRIEF.md` del kit el checklist de render y publicación; verificar que el README describe `sync-map`, `render --only mindmap` y `--publish`.

## 6. Infografía (Fable)

- [ ] 6.1 Escribir el marco de `src/mindmap.html` (CSS y copy: kicker, título "The discipline on one page.", subtítulo, register mark 56-64 px en la esquina superior derecha, pie con URL y versión) iterando con `generated/mindmap.built.html`; verificar con `node src/render.mjs --only mindmap` en verde y revisión del PNG a 100 % y 33 %.
- [ ] 6.2 Publicar con `node src/sync-map.mjs --publish` y dejar `mindmap-post.md` junto al PNG con el texto sugerido; verificar con `npx playwright test tests/map-page.spec.ts` (descarga 200, dimensiones y versión coinciden).

## 7. Verificación, revisión y cierre

- [ ] 7.1 Revisión con `code-reviewer` del diff completo y corrección de hallazgos CRITICAL/HIGH; verificar que el informe no deja hallazgos abiertos de esos niveles.
- [ ] 7.2 Gates completos en orden: `npm run build` → `npm test` → `npm run test:a11y` → `npm run lhci`; verificar todo en verde y revisar `git diff --stat` y las capturas E/D/B/N/M.
- [ ] 7.3 Commits por tipo (`fix(site): hero full-bleed…`, `feat(site): navegación por grupos…`, `feat(site): mapa de la disciplina…`, `test(site): …`, `docs: …`), merge a `main` y comprobación de producción con `curl -sI https://aigovernanceengineer.com/map` y `/resources/frameworks` (200); verificar el run de `deploy.yml` en verde.
- [ ] 7.4 Archivar la change con `/opsx:archive` y actualizar la memoria de sesión; verificar con `openspec list` que la change ya no está en curso.
