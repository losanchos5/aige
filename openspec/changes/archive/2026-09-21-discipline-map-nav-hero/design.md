# Design

## Context

Ver `proposal.md` (Why) y las tres specs delta. El plan detallado con hechos verificados, tabla de
nodos y comandos está en `C:\Users\Jordi\.claude\plans\ideas-que-se-me-quirky-crab.md` (brief de
esta change). Restricciones que condicionan el diseño:

- Sitio Astro 5 estático; CSP `script-src 'self'`: todo JS va en `site/public/*.js`.
- `scripts/figures-build.mjs` carga cada módulo de datos aislado (`ts.transpileModule` + `data:` URL):
  un módulo de datos nuevo no puede tener imports en runtime, solo `import type`.
- `npm run build` ejecuta `check-links`, que valida todo `href` de `dist`, incluidas anclas `#id` y
  las que van dentro de SVG inline.
- Tests Playwright con locators estrictos: un solo `[data-theme-toggle]` y un solo
  `[data-search-open]` dentro de `header.site-header`; `layout.spec` vigila el scroll horizontal
  entre 1517 y 900 px; `a11y.spec` audita todas las rutas de `dist`.
- `VISUAL-GUIDE.md` limita las figuras a 9 nodos y 12 KB; el mapa es un índice, no un diagrama de
  mecanismo, y necesita exención explícita.
- El kit de LinkedIn vive fuera del repo (`D:\Documents\aige-media\linkedin`) y ya renderiza con
  Playwright Chromium reutilizando la instalación del sitio.

## Goals / Non-Goals

**Goals:**
- Un solo origen de datos para el mapa web, el índice y la infografía.
- Navegación descubrible con teclado y lector de pantalla sin añadir dependencias.
- Arreglar el hero de forma estructural (sin trucos de `100vw`).
- Mantener en verde build, tests, axe y Lighthouse.

**Non-Goals:**
- i18n del shell o del mapa; variantes oscura/ES de la infografía.
- Layout de grafo con librería (d3 o similar) o interactividad en runtime más allá del CSS.
- Pixel-diff de capturas.

## Decisions

1. **Hero: reestructurar en `PageHero.astro` en lugar de aplicar `.full-bleed`.** La utilidad
   `100vw` provoca scroll horizontal con barra vertical (y `layout.spec` lo detecta). Un componente
   sección hija de `main` con `.bg-mesh/.bg-dots` fuera del `.container` replica el patrón que ya
   funciona en Marketing y elimina el hero duplicado en nueve páginas. Alternativa descartada:
   parchear las cinco subpáginas una a una (mantiene la duplicación).
2. **Navegación: patrón "disclosure navigation" con `nav.js` externo, no `<details>`.** `<details>`
   no permite cerrar hermanos, hover-intent, Escape con devolución de foco ni flechas. El JS es un
   IIFE en `public/nav.js` (CSP). Paneles con `hidden` (fuera del árbol de accesibilidad y del
   `scrollWidth`), anclados al header sticky con `left:0; right:0`.
3. **Drawer móvil con `<dialog>` nativo.** Da trampa de foco, `inert`, Escape y top layer sin
   código; se coloca como hermano del `<header>` para no duplicar el botón de búsqueda dentro de él
   ni el toggle de tema (locators estrictos).
4. **`nav.ts` como modelo único** (header, drawer, footer, tests). `resolveCurrent` elige el prefijo
   más largo; los botones de grupo no llevan `aria-current`. The Thesis y The map son enlaces
   directos: la Tesis es el artefacto principal del sitio y no debe esconderse en un panel.
5. **`map.ts` puro con `buildMap(sources)`.** Astro y el script de build cargan los módulos por su
   cuenta y se los pasan; así el fichero cumple la restricción de "solo `import type`" y las
   etiquetas salen verbatim de los módulos ya verificados contra `bok/*.md`. Lo escrito a mano se
   declara en `HAND_WRITTEN` y se comprueba contra el markdown.
6. **Generador propio de árbol a dos lados en Node, sin navegador.** Medición de texto por tabla de
   anchos por clase de carácter (+6 %), wrap a dos líneas, throw si no cabe; el test de página
   comprueba `getBBox()` real. Alternativas descartadas: layout radial (peor para portrait y para
   etiquetas largas) y layout en runtime con JS (CSP, Lighthouse, sin SVG estático para el PNG).
7. **Dos variantes del mismo layout.** Web con clases de color por tokens (temas claro/oscuro);
   portrait autónoma con hex del tema claro y sin título ni pie, porque el marco (título, marca,
   URL) es HTML del kit y lo diseña Fable. Presupuesto propio de 48 KB en `emit()`.
8. **Resalte de rama solo con CSS (`:has()`).** Progresivo: sin soporte no hay dimming. Nunca
   opacity en el estado estático (axe mezcla opacidades fraccionales).
9. **Un solo renderizador para la infografía: Playwright en el kit.** resvg-js colapsa las fuentes
   variables a peso 400 y no entiende `var()`/`color-mix`; satori no rasteriza SVG arbitrario. El
   render inyecta el SVG en la plantilla, escribe `generated/mindmap.built.html` (iterable en un
   navegador) y aplica guardas: fuentes cargadas, área segura, sin solapes, tamaño mínimo, peso.
10. **PNG versionado dentro de `site/public/downloads/`** con `map-export.json` (versión BoK, SHA,
    dimensiones). Precedente: el PDF de About. La página omite el enlace si faltan los ficheros para
    que un checkout limpio construya.
11. **Modelos y secuencia.** Fable planifica, escribe el marco de la infografía y verifica; el
    código lo escriben subagentes `implementador` (Opus 4.8) en dos olas con ficheros disjuntos.
    La ola 1 de navegación crea un placeholder de `/map` para que `check-links` y `nav.spec` pasen
    antes de que exista la página real.

## Risks / Trade-offs

- [Texto desbordado en pills] → tabla de anchos + margen, wrap, throw en build, `getBBox()` en test,
  campo `short` como escape.
- [Contraste en oscuro] → líneas y texto con `lN-st/lN-tx` (tokens `-ink` que se invierten en oscuro).
- [Anclas rotas] → derivadas de anclas ya usadas en páginas vivas o fijadas por test contra headings;
  `check-links` falla ruidosamente.
- [Lighthouse perf con SVG de ~40 KB] → DOM estático de ~600 nodos, comparable a `/path`; índice en
  `<ul>` planos; `/map` entra en `lighthouserc.cjs`.
- [`content-lint` sobre `dist`] → descripciones de nav sin literales prohibidos; comprobar en build.
- [Hover-intent parpadeante] → el panel es descendiente del `<li>`; cierre con 200 ms de retardo.
- [Peso del PNG en git] → nombre versionado, < 3 MB, se sustituye al subir de versión.
- [Fuentes de reserva silenciosas en el kit] → `document.fonts.check` de las tres familias y estado
  `loaded` de cada `FontFace`.

## Migration Plan

1. Rama `feat/discipline-map-nav` desde `main`.
2. Ola 1 (hero, navegación con placeholder de `/map`, datos + generador) en paralelo; cada bloque
   deja su build y sus tests en verde.
3. Ola 2 (página `/map`, código del kit) en paralelo.
4. Fable: marco de la infografía, render, `--publish`, gates completos en orden
   (`npm run build` → `npm test` → `npm run test:a11y` → `npm run lhci`), revisión de código,
   commits por tipo, merge a `main` (deploy automático), `curl` de producción, archivo de la change.
5. Rollback: revertir el merge; el PNG y el JSON de exportación son ficheros añadidos, sin migración
   de datos.

## Open Questions

- Ninguna que cambie specs o tareas. Variantes oscura y en español de la infografía quedan para una
  change posterior si el post lo pide.
