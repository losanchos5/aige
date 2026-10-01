# Design

## Context

Ver proposal.md (Why). Estado de partida, medido en el worktree `aige-wt/tips` (origin/main 4ac949c):

- El kit (`site/src/lib/charts/`) nombra las marcas con un `<title>` hijo: `tip()` en `core.ts`, y
  `targets().mark()` envuelve la marca en `<a href><title>` (enlace) o en `<g class="mk-focus"
  tabindex="0" role="img"><title>` (enfocable). `linkText()` nombra los enlaces de etiqueta o fila
  con `aria-label` = la etiqueta corta, sin `<title>`. Solo los enlaces y `mk-focus` son enfocables.
- `Chart.astro` no carga script («tooltips are native `<title>`s»); importa `chart.css`. Estructura:
  `figure.chart-fig > .chart-canvas (> .chart-pair > .chart-n | .chart-w) > svg.chart|svg.figc`.
- Las rejillas HTML nombran sus celdas con `aria-label` y a veces `title` (ControlMosaic, ControlLanes),
  o solo con texto visible más `.visually-hidden` (LayerMatrix, ControlsCrosswalkIndex), o nada
  (ComparisonButterfly). CoverageMap, CrosswalkMatrix y ObligationMatrix no importan `chart.css`.
- Islas: `<script is:inline defer src="/x.js">`; la deduplicación por página ya existe para los
  diagramas (`Astro.locals.diagramScript`). CSP `script-src 'self'` más un hash: nada inline.
- Islas con eventos sobre celdas de gráficos: `crosswalk.js` (clic delegado en `[data-cw-open]`, abre
  cajón), `coverage-map.js` (pointerover/focusin enciende la columna), `matrix.js` (botones de filtro),
  `glossary-cards.js` (ya usa `#term-card[role=tooltip]`: id y clase ocupados).
- `perf.spec.ts` no limita scripts; veta `figures.css`, `prose.css` y `diagrams.css` en `/`,
  `/resources`, `/resources/crosswalk`, `/cases` y `/patterns`. `chart.css` no abre esas reglas.

## Goals / Non-Goals

**Goals:**
- Una sola isla, un solo nodo de tooltip por página, delegación de eventos en `document`.
- Cero bytes nuevos por marca en los SVG salvo donde el nombre de hoy es pobre o falta.
- Que el nombre accesible y el texto del tooltip sean la misma cadena, para no leerlo dos veces y no
  mantener dos textos.

**Non-Goals:**
- Tooltips ricos (varias líneas, enlaces dentro, imágenes). El tooltip es texto plano.
- Cambiar la interacción de las islas existentes (cajones, filtros, columnas encendidas).
- Diagramas archify, figuras de `src/figures/`, GovernanceLoop, StackFlow, StackDiagram y PathMap.

## Decisions

### D1. El texto es el nombre accesible; el tooltip es un espejo oculto a la tecnología de apoyo
Fuente, en orden: `data-tip`, `aria-label`, `<title>` hijo directo, atributo `title`. El nodo del
tooltip lleva `aria-hidden="true"` y ni `role="tooltip"` ni `aria-describedby`: su contenido ya es el
nombre de la marca y el lector de pantalla lo oye por la marca. *Alternativa descartada:*
`role="tooltip"` con `aria-describedby`, que haría oír «nombre, nombre». `data-tip` queda solo para
casos en que el nombre visible del elemento HTML no basta y no se quiere cambiar su `aria-label`.

### D2. Sin `data-tip` en las marcas SVG
La isla lee el `<title>` hijo. Así el presupuesto de 12 KB por SVG solo crece donde se enriquecen
nombres (D8). *Alternativa descartada:* que `tip()` emita también `data-tip`, que duplica cada nombre.

### D3. Ocultar el tooltip nativo solo mientras el nuestro está abierto
Al abrir sobre una marca, la isla aparta toda fuente de tooltip nativo desde la marca hasta su raíz
`data-ctip`, no solo la de la marca: si no, el navegador enseña el `<title>` del ancestro más cercano
que lo tenga (el del `<svg>` raíz, p. ej. «The evidence climbs the stack»). Cada `<title>` hijo directo
pasa a un `<defs class="ctip-park">` del mismo `<svg>` (sigue en el documento, así que el
`aria-labelledby` del `<svg>` raíz resuelve igual, y un `<title>` dentro de `defs` no es tooltip de
nadie); cada atributo `title` pasa a `data-ctip-title`. Si el elemento pierde así la fuente de su nombre
(no tiene `aria-label` ni `aria-labelledby` y apartamos su `<title>`, o es enfocable y apartamos su
`title`), recibe `aria-label` con el mismo texto mientras dura. Al cerrar, y en `pagehide`, cada
`<title>` vuelve a su sitio (antes de su hermano siguiente original), se quitan los `defs` añadidos y se
restaura todo lo demás. *Alternativa descartada:* convertirlo todo al cargar (cambiaría el árbol de
accesibilidad de cada gráfico de forma permanente y rompería la degradación sin JS en caché).

### D4. Qué es una marca
Raíces cubiertas: todo elemento con el atributo `data-ctip` (lo pone `Chart.astro` en su `figure`, y
cada rejilla HTML y el mapa de calor AIGP en su raíz). Marca: el ancestro más cercano del objetivo,
dentro de una raíz, que tenga alguna fuente de D1, excluidos el `<svg>` raíz (su `<title>` es el del
gráfico), `figcaption`, `details.chart-alt`, la leyenda y todo lo que lleve `data-ctip-skip`.

### D5. Eventos
- Ratón y lápiz: `pointerover`/`pointerout` delegados abren y cierran; `pointermove` (con
  `requestAnimationFrame`) recoloca a 12 px del puntero solo mientras el puntero sigue sobre la marca:
  al salir, el tooltip se queda quieto para que se pueda alcanzar a pasos cortos (WCAG 1.4.13). Al
  entrar en el propio tooltip no se cierra; al salir de ambos se cierra tras 150 ms de gracia.
- Teclado: `focusin` abre anclado a la caja de la marca; `focusout` cierra. `keydown` Esc cierra sin
  mover foco y deja la marca «descartada» hasta que el puntero o el foco salgan de ella.
- Toque: `pointerdown` guarda el evento. Un `click` en fase de captura cuenta como toque solo si es un
  toque real: `detail > 0` y el último `pointerdown` fue `touch` hace menos de 800 ms; cualquier tecla
  borra ese estado. Un clic de teclado o de tecnología de apoyo (`detail` 0) nunca se retiene. El
  navegador puede desplazar un toque sobre una marca no clicable (un cuadro del isotipo) hasta un
  enlace vecino, tanto el objetivo del `pointerdown` como el del `click` (ajuste táctil de Chrome); por
  eso la marca tocada es la que `elementFromPoint` encuentra en el punto del `pointerdown`, y si difiere
  de la del `click`, el clic desplazado se retiene. Con un toque real:
  - si la marca es un `<a href>` que navega y no es la marca abierta, `preventDefault()` (nunca
    `stopPropagation()`), abre el tooltip y marca la marca con `.ctip-on`; el segundo toque pasa;
  - si la marca es un botón, un `[data-cw-open]` o cualquier elemento con su propio comportamiento de
    clic, no se retiene nada: el clic sigue su curso y el tooltip se abre a la vez;
  - si el toque no cae en una marca pero sí dentro de una raíz, se busca la marca cuya caja quede a 12
    px o menos del punto y se abre esa (sin retener el clic);
  - un toque fuera de toda marca cierra.
  Como solo se escucha `click`, arrastrar para desplazar nunca abre nada ni bloquea el scroll.
  Un toque en un disparador de cajón (`[data-cw-open]`) abre el cajón y el tooltip; el tooltip se cierra
  cuando el foco entra en el cajón (aceptado).
- `scroll`, `scrollend` y `resize`: si el tooltip está anclado a una marca (teclado o toque), se
  recoloca; mientras la marca está fuera del viewport (un scroll suave aún la está trayendo tras el
  foco, o el lector la ha desplazado fuera) la marca sigue abierta con la caja oculta, y la caja
  vuelve al volver la marca. Solo cierran `focusout`, la salida del puntero, Esc y un toque fuera.
- Marcas no enfocables (conjuntos del Venn, anillos de `/path`, celdas de LayerMatrix, isotipo,
  mariposa, celdas del índice del crosswalk): sin tooltip de teclado por diseño. Sus nombres están en
  la tabla de datos alternativa, que es el camino de teclado y de lector de pantalla.

### D6. Posición
Un único `div.ctip` en `body`, `position: fixed`, `max-width: min(20rem, ancho - 16px)`. Se coloca
encima del punto de anclaje; si no cabe, debajo; en horizontal se centra y se sujeta a `[8, ancho - 8]`.
El ancho y el alto son los del `visualViewport` (con su `offsetLeft`/`offsetTop`), no `clientWidth`:
en un móvil cuya página desborda (p. ej. `/obligations` a 320 px) la pantalla es más ancha que el
viewport de diseño. La isla fija `max-width` en línea con ese ancho antes de medir.
Con teclado y toque el anclaje es la caja de la marca. Animación: entrada con `opacity` y `transform`
del contenedor, 0 ms con `prefers-reduced-motion`; texto siempre a opacidad plena (el contenedor
anima su opacidad solo en la entrada y nunca hay texto atenuado en reposo).

### D7. Carga única
Componente nuevo `ChartTipScript.astro` que emite `<script is:inline defer src="/chart-tip.js">` solo la
primera vez por página (`Astro.locals.chartTipScript`), igual que `diagramScript`. Lo usan
`Chart.astro`, cada rejilla HTML cubierta y el sitio que pinta el mapa de calor AIGP. La isla además se
protege con una bandera global por si se cargara dos veces. Estilos en `chart.css` (bloque `.ctip`,
`.ctip-on`, `forced-colors`, `print { display: none }`); CoverageMap, CrosswalkMatrix y
ObligationMatrix pasan a importar `chart.css`, que no abre reglas `.figc`, `.prose` ni `.diagram`.

### D8. Nombres que faltan o son pobres
Kit: `progressRing` gana `<title>` («etapa: hechos/total (pct %)»); círculos y elipses del Venn/Euler
nombran conjunto y total; bandas de `concentricRings` nombran anillo y sector; fila «+N» del radial
nombra los ocultos; los pasos de `ladder` incluyen `detail`; `linkText()` recibe el nombre completo de
la marca (en barras, `etiqueta: valor unidad`). Páginas (desde sus módulos de datos, nunca texto
nuevo): `threatGrid` (columnas con código: código + nombre), EvalBoundary (id + título del control),
`/frontier` casos x control (qué control nombra), Sankeys de `risk-visuals` y `/agents` (nombres de
capa y taxonomía completos), policy-card (efecto con `effectName`), PathRings, LayerMatrix (celda con
fila y columna), ComparisonButterfly (cada cuadro con su cláusula), mapa de calor AIGP (celda con
dominio, capítulo y valor), ObligationIsotype (sin cambio de texto: ya tiene `title`).
Si un SVG pasa de 12 KB al enriquecer, se acorta el nombre del dato (código + nombre corto del módulo),
nunca se quita.

### D9. Tests
- `tests/chart-tip.spec.ts` (navegador, un test por contrato, sobre una muestra fija: `/controls`
  mosaico y carriles, `/controls/crosswalk`, `/resources` en modo `.chart`, `/agents` Sankey, `/path`
  anillos, `/resources/frontier-safety-crosswalk` mapa de cobertura, `/obligations` isotipo):
  1) hover, focus y tap enseñan el nombre esperado; lo esperado es el nombre accesible leído del HTML
     de `dist` antes de que corra la isla y, en el mosaico, el id y título del control desde
     `src/data/controls`; 2) dentro del viewport a 320 y 1440 en marcas de los bordes; 3) Esc cierra;
     4) primer toque no navega y segundo sí; un toque en `[data-cw-open]` abre el cajón;
     5) sin tooltip nativo mientras está abierto y `<title>` restaurado al cerrar; 6) sin JS no hay
     errores de consola; 7) en `dist`, toda página con raíz `data-ctip` carga la isla una vez y
     ninguna otra la carga.
- `tests/chart-primitives.spec.ts`: casos para los nombres nuevos del kit (D8), con lo esperado
  derivado de la entrada del caso.
- Puerta `test-audit` antes de escribir cada test.

## Risks / Trade-offs

- [Un `<title>` apartado no vuelve si la página cambia el DOM a mitad] → se restaura en cada cierre y en
  `pagehide`; las raíces de los gráficos no se re-renderizan en cliente.
- [El primer toque retenido sorprende a quien espera navegar] → solo en marcas de gráfico con nombre y
  el resaltado `.ctip-on` indica la selección; el segundo toque navega como siempre.
- [Nombres más largos rompen el presupuesto de 12 KB] → `Chart.astro` ya lo vigila en build; se acorta
  el nombre del dato.
- [Conflicto con `coverage-map.js` al encender la columna] → la isla no para la propagación; los dos
  escuchan el mismo `pointerover`.
- [Lighthouse en `.chart`] → la isla es `defer`, pequeña y sin trabajo al cargar (solo listeners).

## Migration Plan

Una PR desde `wt/tips` (origin/main). Bloques de implementación en paralelo (ver tasks.md), luego
build, `npx playwright test --project=default --workers=3`, axe A11Y_FULL en las rutas tocadas y
`PW_PORT=4461 npm run lhci`, por separado. Vuelta atrás: revertir la PR; sin JS los gráficos ya
funcionan como antes.
