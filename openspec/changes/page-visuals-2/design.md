# Design

## Context

- Kit en `site/src/lib/charts/` (JSDoc en `index.ts`): core, dotMatrix, heatGrid, bars, timeaxis, lanes,
  venn3 (con Euler anidado desde la PR #73), ladder, relationRadial, y `flow.ts` (bowTie y controlChain
  sobre el motor de evidence-chain; no es un Sankey). No existe `lib/sankey-svg.ts` pese a que el
  catálogo lo cita: el Sankey es nuevo.
- `Chart.astro` alterna el par ancho y estrecho por CSS y escala el estrecho hasta `width * 1.15`. El
  lienzo mide unos 344 px a 390 de pantalla, unos 314 a 360 y unos 274 a 320. Con el estrecho a 340 y
  texto de 12, el texto real baja a 11,1 px a 360 y a 9,7 a 320: es la deuda que Jordi pidió cerrar.
- Ninguna ruta de la tanda está vetada por `tests/perf.spec.ts`: todo en modo `figc`.
- Fichas completas de cada visual (datos, ubicación, interacción, correcciones del crítico):
  `D:/Documents/aige-wt/handoffs/page-visuals-t3-extract.md`, sacadas del catálogo archivado.

## Goals / Non-Goals

**Goals:**
- Cuatro primitivas nuevas reutilizables en T4 y T5 (Flow, Rings, Treemap, BookSpine).
- Una regla de legibilidad comprobada en build, no por revisión visual.
- Las 16 rutas de la tanda con sus visuales, tests de sincronía y axe limpio.

**Non-Goals:**
- Registrar AutonomyLadder o EvalBoundary en `figures.ts` y colocarlas en el capítulo 23 (tanda 4).
- Redes (NetworkGraph), radar y el resto de islas cliente (tanda 5), salvo los anillos de `/path`.
- Los bloques del catálogo fuera de la lista T3 aunque estén en las mismas páginas (matriz de
  coocurrencia de `/controls/crosswalk`, COSAiS, reversibilidad, etc.) y los RECHAZADOS.

## Decisions

### D1. Flow: layout propio por baricentros
Columnas fijas (2 o 3), nodos ordenados por el orden de entrada y luego dos barridos de baricentro
(izquierda a derecha y vuelta), desempate por el orden de entrada: determinista y sin librería. Alto de
nodo proporcional al total, hueco fijo de 8, cintas como curvas cúbicas con `fill` y `fill-opacity`
(nunca texto encima). Más de 9 nodos en una columna es error salvo que el llamante agrupe el resto en
«Other (N)». Resaltado al pasar por encima con `:hover` y `:focus-within` de un `<g>` por nodo en CSS,
sin JavaScript. Variante estrecha: una lista por nodo de origen con barras de sus destinos (misma
tabla), porque un Sankey a 280 unidades no se lee.
Alternativa descartada: layout con relajación iterativa (tipo d3-sankey): más código y no aporta con
9 nodos por columna.

### D2. Rings: tres modos en un módulo
`concentricRings` (anillos de dentro a fuera y sectores opcionales, con marcas clavadas en su anillo y
sector: diana de daños y EvalBoundary), `lifecycleRing` (arcos por etapa con nodos y centro, estilo
GovernanceLoop: anillo de registros) y `progressRing` (arco de progreso y valor en el centro). Estrecho:
los concéntricos a 280 con etiquetas fuera en lista numerada; el ciclo de vida pasa a lista por etapa.

### D3. Treemap squarified en build
Algoritmo squarified clásico (Bruls y otros) por grupo y luego dentro de cada grupo, cabecera de grupo
en la primera fila de su área. Teselas por debajo de 24 x 24 px sin enlace propio: se agrupan en «+N»
enlazado a la tabla, para cumplir WCAG 2.5.8. Estrecho: el mismo treemap a 280 con cabeceras encima y
teselas pequeñas agrupadas antes.

### D4. BookSpine
Barras horizontales por capítulo agrupadas por parte (24 capítulos), tintas neutras por parte
(auditoría SL-06), codificación configurable: minutos de lectura (`/bok`), recuento de figuras y
diagramas por forma (`/figures`) o resaltado (`/figures/[id]`, mini). En estrecho las barras se apilan
en vertical. Cada barra es un enlace con `<title>`.

### D5. Legibilidad estrecha comprobada en build
Constante `NARROW_WIDTH = 280` en core y texto mínimo 12,5 en variantes estrechas. Chart.astro lee el
`font-size` menor de cada SVG que se ve en móvil (el estrecho, o el ancho si no hay estrecho) y falla
si `minFont * 274 / viewBoxWidth < 12`. Se migran los ~20 sitios que dibujan el estrecho a 340. Jordi
eligió «estrecho a 300 con mínimo 12,5»; con el lienzo real de 274 px a 320 eso da 11,4 px, así que se
ajusta a 280 para cumplir el objetivo que eligió (12,2 px a 320).
Alternativa descartada: declarar 360 px como mínimo (Jordi la descartó).

### D6. Deudas pequeñas del kit
- Marca «As of»: un helper `asOfMark(scale, asOf, lang)` en core que usan timeStrip, beeswarm,
  timeLanes y dumbbell.
- Mariposa: la trama marca solo «related»; lo que hoy también marca con trama pasa a contorno.
- `jurisdiction-tiles` y `governance-operating-model`: subir a 12 px el texto que hoy mide 11 a 390 en
  su generador, sin cambiar el contenido.

### D7. AutonomyLadder sobre `ladder`
Se extiende la primitiva `ladder` con peldaños acumulativos (cada peldaño lista lo que «añade» sobre el
anterior), usando `autonomyLevels` y `agentControls` de `src/data/tool-agent-controls.ts`. Un único
componente `AutonomyLadder.astro` en `/agents` y en `/toolkit/agent-control-profile` (allí resalta el
nivel del perfil con `data-step` y el script que ya tenga la página, sin script nuevo). Hay que revisar
que no contradiga la escala 0 a 4 del capítulo 11.

### D8. EvalBoundary y casos x control
EvalBoundary con `concentricRings` desde `src/data/controls/evaluation-environment.ts` (anillo por
elemento del entorno, los 9 controles clavados, enlaces a `/controls/evaluation-environment#<id>`). La
matriz del bloque de incidentes usa `casesForControl` de `src/lib/cross-links.ts` sobre esos 9
controles y los casos de `src/data/cases.ts`, con dotMatrix o heatGrid: sin mapeo nuevo (corrección del
crítico). La nota de investigación incrusta el mismo componente en la página, sin tocar `DiagramPlacement`.

### D9. Ejecución (repite la forma que funcionó en T1 y T2)
- Rama `feat/page-visuals-t3` en `D:/Documents/aige-wt/pv3` (integración). Un worktree por bloque desde
  ella, con junction de `node_modules` hacia `aige-wt/int` y copia de `.archify`, cada uno con su
  PW_PORT (4462 a 4468). Builds con `bash D:/Documents/aige-wt/build.sh`.
- Fase 1, dos bloques de kit en paralelo: K1 primitivas nuevas; K2 legibilidad y deudas (D5, D6).
- Fase 2, cinco bloques de páginas en paralelo sobre el kit ya fusionado (reparto en tasks.md).
- Fase 3 en la sesión principal: fusión por rutas, una build, suite completa una vez, axe con
  `A11Y_FULL=1` en las rutas tocadas. Dos revisiones en paralelo (fidelidad de datos; a11y y visual
  adversarial con capturas a 390 y 1440 en claro, oscuro, print y forced-colors), arreglo,
  `PW_PORT=4461 npm run lhci`, PR. Jordi fusiona.
- Son 9 subagentes (2 + 5 + 2), por encima del máximo orientativo de 5 de las reglas globales: se avisa
  en la propuesta a Jordi. Todos `implementador` o revisores sin prefijo, sin `model`.

## Risks / Trade-offs

- [Migrar el estrecho a 280 rompe etiquetas de gráficos ya publicados] → la build falla nombrando cada
  etiqueta; K2 acorta la redacción o ajusta el layout estrecho de cada uno, y la PR lista las páginas
  afectadas.
- [Sankey ilegible con muchos cruces] → como mucho 9 nodos por columna, barridos de baricentro y
  variante estrecha sin cintas; el crítico de a11y revisa capturas.
- [Presupuesto de 12 KB por SVG en flujos y treemaps] → cintas con rutas redondeadas a 1 decimal; si
  un gráfico no cabe, se agrupa la cola en «Other (N)».
- [Cinco bloques tocando `index.ts` y `figures.css`/`chart.css`] → K1 deja todas las exportaciones y
  clases antes de la fase 2; los bloques de página no tocan el kit (si lo necesitan, lo piden).
- [Capturas de referencia] → solo se regeneran las de las páginas tocadas más `/stack` y `/role`, y se
  listan en la PR.
