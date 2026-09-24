# Tasks

## 1. Tokens y tipografía

- [x] 1.1 `tokens.css`: añadir `--hero-ink` y `--field-1..3` (claro y oscuro, y el bloque
  `prefers-color-scheme: dark`); verificar que no se introduce una sexta familia de acento fuera de
  `--l1..--l5` y estos cuatro
- [x] 1.2 Instanciar con fontTools los dos cortes estáticos de Newsreader (roman opsz 72/wght 400,
  italic opsz 72/wght 400) a `site/public/fonts/newsreader-latin-display-{normal,italic}.woff2`;
  declarar `@font-face` en `fonts.css` (`Newsreader Display`) y `--font-serif` en `tokens.css`;
  verificar que cada fichero pesa ≈ 22 KB
- [x] 1.3 Devolver Bricolage Grotesque al fichero de solo peso
  (`bricolage-grotesque-latin-wght-normal.woff2`), retirar el fichero `latin-standard` y el pin
  `font-variation-settings: 'opsz' 14` de `:root`; verificar que ningún `font-stretch`/`opsz` queda
  referenciado fuera de `.hero-title`

## 2. El campo de gradiente

- [x] 2.1 `public/hero-field.js`: shader WebGL (tres blobs Lissajous en `--field-1..3`, domain warp,
  dither), fallback `initGL()` → `false` si WebGL no está disponible; verificar que sin JS/WebGL
  `.hero-field` muestra el fallback CSS con los mismos tonos
- [x] 2.2 Legibilidad estructural: uniforms `u_box`/`u_bar`/`u_lim`/`u_above`, función `clear()` que
  aclara/oscurece hacia `u_ground` hasta el contraste objetivo (4.6:1 titular, 5:1 cabecera);
  recalcular en `ResizeObserver` y `document.fonts.ready`; verificar manualmente en claro y oscuro a
  1440 y 390
- [x] 2.3 Movimiento: ~30 fps, pausa bajo `prefers-reduced-motion: reduce`, bajo `.motion-toggle`, al
  perder pantalla (`IntersectionObserver`) o pestaña oculta (`visibilitychange`); estado reflejado en
  `data-state` (`running|paused|static|off`); verificar con el botón de pausa en ambos temas

## 3. Titular, CTA y franja de cifras

- [x] 3.1 `pages/index.astro`: sección `.hero--field` a `100svh`, `.hero-title` con `--font-serif` y
  el tope `15vw`, una sola CTA `btn-glow`; verificar que el zoom a 200% no desborda a 390px
- [x] 3.2 `.hero-facts`: calcular los ocho pares label/value desde `data/stack`, `data/role`,
  `data/chapters`, `data/values`, `data/frameworks`, `data/patterns`, `data/site` (nunca a mano);
  lista duplicada `aria-hidden`+`inert` para la marquesina; verificar que ningún valor se escribe
  literal en el `.astro`
- [x] 3.3 `.motion-toggle`: botón con `aria-pressed`, detiene franja y campo a la vez; sin chrome
  visible (fuera de pantalla hasta el foco del teclado, decisión de Jordi); verificar WCAG 2.2.2 con
  teclado y lector de pantalla

## 4. Cabecera superpuesta

- [x] 4.1 `Header.astro` prop `overlay` → `data-overlay`; sin scroll sin fondo/blur/línea/sombra,
  `--muted` reescapado a `--ink-2`; con `.is-scrolled` cae al bloque de reglas normal; verificar en
  `/` y que el resto de páginas no reciben `overlayHeader`
- [x] 4.2 `Base.astro`/`Marketing.astro`: props `overlayHeader` y `preloadFonts`, precarga de los dos
  cortes de Newsreader solo en `/` vía `public/_headers`; verificar que otras rutas no precargan
  Newsreader

## 5. Sección de la definición y el bucle

- [x] 5.1 Mover la definición y la figura del bucle de gobernanza a `<Section tone="plain"
  class="loop-sec">` bajo el hero; retirar `.hero--loop`, `.hero-grid`, `.hero-copy`, `.hero-h1`,
  `.display-xl`; mover las reglas de `diagrams.css` de `.hero--loop` a `.loop-sec`
- [x] 5.2 `public/hero.js`: la animación de la figura arranca con `IntersectionObserver` al entrar en
  viewport, no en `DOMContentLoaded`; verificar que solo se dispara una vez
- [x] 5.3 `effects.css` regla MS-03: reescopar `--muted` de `.hero--loop` a `.hero--field`; verificar
  que `.hero-panel` (el panel del bucle) sigue en la lista

## 6. Documentación

- [x] 6.1 `site/DESIGN.md`: tokens `--hero-ink`/`--field-1..3`, cuarta familia tipográfica, primitivas
  `.hero--field`/`.hero-facts`/cabecera superpuesta, "Perpetual motion" actualizado, restricción 3
  (`.hero--loop` → `.hero--field`) y excepción documentada a la restricción 8, Do/Don't (cuatro
  familias, campo como excepción a "sin gradiente saturado")
- [x] 6.2 Este cambio OpenSpec (`proposal.md`, `design.md`, `tasks.md`,
  `specs/home-hero/spec.md`, `specs/site-navigation/spec.md`)

## 7. Verificación

- [x] 7.1 `site/tests/hero-field.spec.ts` y actualizar `home.spec.ts`/`v1`/las specs de layout que
  tocan la home o la cabecera; verificar que cubren: viewport completo, contraste del titular y de la
  cabecera sobre el campo (claro/oscuro), pausa/reproducción, `prefers-reduced-motion`, la franja de
  cifras y la sección `.loop-sec`
- [x] 7.2 Cadena completa: `npm run build` → `npm test` → `npm run test:a11y` → `npm run test:visual`
  (regenerar y revisar las capturas de la home y la cabecera) → `npm run lhci` (perf ≥ 0,95, a11y/BP/
  SEO = 1 en `/`) → `npx impeccable detect dist` (comparar con el baseline de 62 hallazgos)
  (2026-09-24: build 0 errores; 564 default, 116 a11y, 28 visual; lhci 1,00 ×4 en las 9 URL, `/` LCP
  0,6 s, CLS 0; detector mismo recuento por regla que ddc2fbd salvo +1 `cramped-padding` en la
  Section nueva, el falso positivo conocido del CSS enlazado en Windows; ninguna regla nueva)
- [x] 7.3 Revisión con `code-reviewer` (Opus 5.5) del diff completo (2026-09-24: sin CRITICAL; 3 HIGH
  (forced colors, hueco del marquee en pantallas anchas, pausa táctil) y 5 MEDIUM corregidos, con
  tests nuevos; cadena repetida en verde: 570 default, 116 a11y, 28 visual, lhci 1,00 ×4)
- [x] 7.4 PR apilada sobre #19 (#20, commit 828abde, 2026-09-24)
