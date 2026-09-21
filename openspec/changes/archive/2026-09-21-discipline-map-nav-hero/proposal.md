# Proposal

## Why

El sitio no tiene una vista de conjunto de la disciplina: sus capítulos, capas, patrones, rol,
obligaciones, madurez y ruta de aprendizaje solo se descubren leyendo. Un mapa de la disciplina
(en la web y como infografía para LinkedIn) da esa vista, sirve de índice cruzado y es un activo de
difusión. Al mismo tiempo, la navegación actual (ocho enlaces planos) oculta las subpáginas de
Resources y About y deja huérfanas las landings `/role` y `/stack`, y el banner de las subpáginas de
Resources tiene un defecto visual (el fondo no cubre el ancho completo) que resta acabado.

## What Changes

- **Hero a ancho completo**: nuevo componente de cabecera de página que saca las capas de fondo
  (mesh y puntos) fuera de la columna de contenido, adoptado por las cinco subpáginas de Resources,
  el hub de Resources y las landings `/role`, `/stack`, `/path`. Migas de pan (breadcrumbs) con
  JSON-LD en subpáginas de Resources, About y capítulos.
- **Navegación por grupos**: modelo único de navegación en datos; barra de escritorio con seis
  entradas (The Thesis · Body of Knowledge ▾ · Practice ▾ · Reference ▾ · The map · About ▾) y
  paneles con etiqueta + descripción por entrada; drawer móvil modal con los mismos grupos; sitemap
  completo en el footer. `/role` y `/stack` pasan a ser los destinos del menú.
- **Página `/map`**: mapa mental de la disciplina generado en build desde los módulos de datos
  existentes (SVG accesible, cada nodo un enlace), leyenda, índice "content by cluster" plegable
  con todo lo que hay en el sitio sobre cada rama, imagen OG, entrada en Lighthouse y descarga PNG.
- **Infografía LinkedIn**: variante vertical del mismo SVG renderizada por el kit externo de
  `aige-media/linkedin` (Playwright), con marca en la esquina, URL y versión del BoK al pie, y
  publicada como descarga en `/map`.
- **Tests**: nuevas specs de Playwright para hero, navegación, mapa (datos, SVG, página) y
  actualización de las existentes; regeneración de las capturas afectadas.
- Fuera de alcance: variantes oscura o en español de la infografía; traducción del menú; cambios
  de contenido en `bok/*.md`; pixel-diff de capturas.

## Capabilities

### New Capabilities
- `discipline-map`: la página `/map`, el SVG generado desde datos con sus dos variantes (web y
  vertical), el índice por cluster, la descarga PNG y la infografía para LinkedIn.
- `site-navigation`: el modelo de navegación, la barra con paneles, el drawer móvil, el sitemap del
  footer y las migas de pan.
- `page-hero`: la cabecera de página a ancho completo compartida por landings y páginas de
  referencia, con sus variantes y su regresión visual.

### Modified Capabilities
- (ninguna: `regulatory-map-china` no cambia de comportamiento; solo se añaden ids de fila a la
  tabla de frameworks para poder enlazarlos)

## Impact

- **Sitio** (`site/`): nuevos `src/components/{PageHero,Breadcrumb}.astro`, `src/lib/breadcrumbs.ts`,
  `src/data/{nav,map}.ts`, `src/lib/map-index.ts`, `src/pages/map.astro`, `src/styles/map.css`,
  `public/{nav,map}.js`, `scripts/map-build.mjs`, `scripts/lib/{svg-text,load-ts}.mjs`,
  `src/figures/discipline-map.svg` (generado), `src/data/map-export.json` y
  `public/downloads/aige-discipline-map-v0.4.0.png`. Modificados: `Header.astro`, `Footer.astro`,
  `Doc.astro`, `public/ui.js`, las páginas de Resources, `role/stack/path.astro`, `bok/[slug].astro`,
  `about/{changelog,contributors}.astro`, `pages.css`, `resources.css`, `figures.css`,
  `figures-build.mjs`, `figures.ts`, `og/[...slug].png.ts`, `lighthouserc.cjs`, `VISUAL-GUIDE.md`,
  `README.md`, `PENDIENTE.md`, `FrameworkTable.astro` (ids de fila).
- **Tests**: nuevos `tests/{page-hero,nav,map,map-page}.spec.ts`; modificados `shell.spec.ts`,
  `block-c.spec.ts`, `layout.spec.ts`, `screenshots.spec.ts`; capturas E, D, B regeneradas y grupos
  N y M nuevos.
- **Kit externo** (`D:\Documents\aige-media\linkedin`, fuera del repo): nuevos `src/mindmap.html`,
  `src/sync-map.mjs`, `src/generated/*`; modificado `src/render.mjs`, `README.md`, `BRIEF.md`.
- Sin dependencias nuevas. Sin cambios en `bok/*.md`, en el CSP ni en los feeds.
- Modelos: Fable planifica, escribe el marco de la infografía y verifica; el código lo escriben
  subagentes en Opus 4.8.
