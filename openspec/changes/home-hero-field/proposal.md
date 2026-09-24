# Proposal

## Why

Jordi pidió el 2026-09-24 un hero de portada a pantalla completa inspirado en iren.com: un titular
grande sobre un fondo animado, una sola llamada a la acción y una cabecera que flota sobre él. El
hero anterior (`.hero--loop`, la definición y la figura del bucle de gobernanza juntas en la primera
pantalla) cumplía las restricciones de diseño pero no llenaba el viewport ni tenía la presencia
editorial que Jordi buscaba para la primera impresión del sitio.

## What Changes

- Nueva sección `.hero--field` a pantalla completa (`min-height: 100svh`) en `pages/index.astro`: un
  campo de gradiente animado (shader WebGL en `public/hero-field.js`, con fallback CSS estático) tras
  el titular centrado ("Governance you can *run*, not just read.") en una cuarta familia tipográfica
  (`--font-serif`, Newsreader Display, dos cortes estáticos, limitada a este titular) y una sola CTA
  ("Read the Thesis").
- Tres tonos nuevos (`--field-1..3`) y `--hero-ink` en `tokens.css`; la legibilidad del titular y de
  la cabecera sobre el campo es estructural (el shader aclara/oscurece cada píxel bajo esas dos zonas
  hasta el contraste objetivo, no una capa translúcida fija).
- Franja de cifras `.hero-facts` bajo el titular: pares etiqueta/valor calculados desde los módulos de
  contenido (capas del stack, workflows, capítulos, valores, frameworks, patrones, versión del BoK,
  licencia), con marquesina (`transform`-only, 60 s, solo bajo `prefers-reduced-motion: no-preference`
  y solo cuando el JS confirma el WebGL) y un control de pausa que detiene la franja y el campo a la
  vez (WCAG 2.2.2); sin botón visible: aparece solo con el foco del teclado, y un clic o toque en la
  franja pausa y reanuda ambos.
- La cabecera (`Header.astro`) gana un modo `overlay`: fija, transparente sobre el hero hasta que el
  usuario baja 8px (`.is-scrolled`), solo en la portada (`Marketing`/`Base` prop `overlayHeader`).
- La definición ("The discipline, defined.") y la figura del bucle de gobernanza se mueven a una
  nueva `<Section tone="plain" class="loop-sec">` justo debajo del hero; la figura ahora arranca su
  única pasada de animación al entrar en el viewport (`IntersectionObserver`), no al cargar la
  página.
- Se retiran `.display-xl`, `.hero-grid`, `.hero-copy`, `.hero-h1` y `.hero--loop`; Bricolage Grotesque
  vuelve a ser el fichero de solo peso (sin ejes `wdth`/`opsz` ni el pin `font-variation-settings` en
  `:root`).

Sin cambios **BREAKING**: la ruta `/` no cambia de URL ni de contenido textual salvo el titular y la
reorganización descrita; el resto de landings y capítulos no se tocan.

## Capabilities

### New Capabilities
- `home-hero`: el hero de portada a pantalla completa — el campo de gradiente y su movimiento, el
  titular y su tipografía, la franja de cifras, y la sección de la definición/bucle que sigue debajo.

### Modified Capabilities
- `site-navigation`: la cabecera gana el modo superpuesto/transparente, exclusivo de la portada; el
  resto del modelo de navegación (grupos, drawer, sitemap, migas de pan) no cambia.

## Impact

- Código: `site/src/pages/index.astro`, `site/src/components/Header.astro`,
  `site/src/layouts/{Base,Marketing}.astro`, `site/src/styles/{tokens,fonts,effects,diagrams}.css`,
  `site/public/{hero-field,hero,ui}.js`, `site/public/_headers`,
  `site/public/fonts/{bricolage-grotesque-latin-wght-normal,newsreader-latin-display-normal,newsreader-latin-display-italic}.woff2`.
- Dependencias: `@fontsource-variable/newsreader` (ya en `package.json`; solo se usa para generar los
  dos cortes estáticos con fontTools, no se importa en runtime).
- Docs: `site/DESIGN.md` actualizado (tokens `--hero-ink`/`--field-1..3`, cuarta familia tipográfica,
  primitivas `.hero--field`/`.hero-facts`/cabecera superpuesta, excepción documentada a la regla de
  "sin chip").
- Tests: `site/tests/hero-field.spec.ts` (nuevo, en curso) y actualización de `home.spec.ts`,
  `page-hero.spec.ts`, `shell.spec.ts`/`nav.spec.ts` y las capturas de referencia del bloque V1.
- Gates: build, Playwright default/a11y/visual, Lighthouse CI (rendimiento ≥ 0,95 en `/`), detector
  de impeccable (baseline actual: 62 hallazgos).
