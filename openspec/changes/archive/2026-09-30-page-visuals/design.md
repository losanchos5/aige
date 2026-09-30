## Context

El sitio es Astro estático con CSP estricta (`site/public/_headers`: `script-src 'self'` más un hash),
tokens de tema claro/oscuro en `site/src/styles/tokens.css` y un registro de figuras
(`site/src/data/figures.ts` + `scripts/figures-build.mjs`) que da permalink, exportes y galería.
Ya existen generadores SVG de build sin librerías: `src/lib/aigp-heatmap.ts`,
`src/lib/evidence-chain.ts`, `scripts/lib/posters.mjs` (modelo de timeline) y
`scripts/lib/svg-text.mjs` (medición de texto). `package.json` no trae ninguna librería de gráficos y
`site/VISUAL-GUIDE.md` §6.2 exige revisión para añadirla. El catálogo por página está en
`catalogue.md`.

## Goals / Non-Goals

**Goals:**
- Un kit pequeño y coherente de primitivas que sirva a las tandas 0 a 2 y a las futuras 3 a 5.
- Que cada gráfico nuevo pase a11y, CSP, perf, content-lint y móvil sin excepciones locales.
- Visuales muy visibles en páginas con pobreza visual alta, siempre desde datos tipados existentes.

**Non-Goals:**
- Registrar figuras nuevas en `figures.ts` (se hará en la tanda 4, con datos de capítulo).
- Tocar `/resources/frontier-safety-crosswalk` o el mapa de cobertura frontera.
- Añadir d3, chart.js u otra dependencia de gráficos.
- Tandas 3 a 5 (flujos Sankey, anillos, treemaps, redes, islas del toolkit).

## Decisions

1. **Primitivas TS puras en `src/lib/charts/`** que devuelven `{ svg, table }`. Sin imports de runtime,
   para que las carguen Astro y `scripts/lib/load-ts.mjs` si una se registra más adelante. Alternativa
   descartada: una librería (peso, CSP, estilos fuera de tokens, revisión §6.2).
2. **Dos modos de estilo.** `.figc` (clases de `figures.css`, las colorea el exportador) para páginas
   que ya enlazan `figures.css`; `.chart` con hoja propia para `/`, `/resources`, `/resources/crosswalk`,
   `/cases` y `/patterns`, que `tests/perf.spec.ts:186-241` veta. Alternativa descartada: cambiar la
   lista del test (rompería el presupuesto CSS de las páginas más visitadas).
3. **Móvil:** par de SVG ancho/estrecho que CSS alterna (patrón EvidenceChain) o SVG ancho más lista
   HTML (patrón StackFlow). Las matrices densas scrollan dentro de una región enfocable etiquetada,
   nunca la página.
4. **Color:** categórico solo si la categoría es capa (`--l1..--l5` relleno, `--lN-ink` trazo/texto);
   heatmaps con `fill-opacity` sobre `currentColor`; estado por relleno, contorno o trama. El texto
   siempre en tinta plena.
5. **Interacción mínima:** `<title>` por marca y marcas enfocables; islas `public/*.js` solo donde el
   estado es del usuario (triage). Datos en `<script type="application/json">`. Movimiento solo
   transform y condicionado a `prefers-reduced-motion` vía motion-ui.
6. **Por ítem sin registro:** las plantillas de rutas dinámicas (182 obligaciones, 33 patrones,
   18 casos, controles, glosario) se generan en el componente como EvidenceChain, sin permalink ni
   exportes, para no multiplicar renders PNG ni violar la regla "Drawn from chapter".
7. **Datos con salvedades conocidas:** los controles derivados de agent-runtime tienen
   `failureResponse` por defecto «To be specified» (`agent-runtime.ts:707-710`); todos los gráficos de
   controles pintan un tercer estado «por especificar» con trama. `reviewerStatus` es uniforme y no se
   usa como codificación.
8. **Ejecución:** worktree `aige-wt/visuals` (rama `feat/page-visuals`) desde origin/main. La tanda 0
   va sola; las tandas 1 y 2 se reparten en bloques de páginas entre subagentes `implementador` en
   worktrees derivados, se fusionan por rutas, y se construye y testea una vez. Una PR por tanda; Jordi
   fusiona.

## Risks / Trade-offs

- [Axe mezcla opacidades fraccionales en el contraste] → nada de `opacity` en texto; `fill-opacity`
  solo en rellenos sin texto encima, o texto con contraste medido sobre el relleno máximo.
- [Páginas dinámicas multiplican el HTML] → presupuesto por SVG (≤12 KB) y RelationRadial se omite con
  menos de 3 relaciones; a11y muestrea grupos >40 páginas en PR y barre completo en main.
- [Capturas de referencia desactualizadas por sesiones paralelas] → regenerar solo las de las páginas
  tocadas, en el worktree, y listarlas en la PR.
- [Conflicto con el agente del mapa de cobertura frontera] → no se tocan su página, sus datos ni
  `CrosswalkMatrix`; si converge en primitivas, lo hará en su propio cambio.
- [Etiquetas que desbordan] → la medición de texto falla la build en vez de recortar en silencio.

## Migration Plan

Sin migración: solo se añaden componentes y figuras. Rollback por revert de la PR de cada tanda.

## Open Questions

- Si la tanda 2 se apila sobre la PR de la tanda 1 o espera a su fusión: se decide según el ritmo de
  fusión de Jordi.
