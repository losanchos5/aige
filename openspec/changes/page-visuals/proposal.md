## Why

Muchas páginas del sitio son muros de texto, listas o tablas aunque debajo tienen datos tipados que
se pueden dibujar (controles, obligaciones fechadas, casos, crosswalks, listas DPIA, plantillas del
toolkit). Un análisis de solo lectura de unas 60 páginas o plantillas (workflow wf_476cf984-0c7,
2026-09-30) dejó unas 220 propuestas visuales; tras la crítica cruzada se rechazaron 39, se
corrigieron 24 y el resto se ordenó en seis tandas. Jordi pide que los gráficos sean muy visuales y
que lleguen a todas las páginas posibles. Este cambio entrega las tandas 0 a 2 y deja las tandas 3 a 5
como backlog documentado en `catalogue.md`.

## What Changes

- Kit de primitivas SVG generadas en build (`site/src/lib/charts/`) sin librerías de terceros:
  núcleo (escalas, medición de texto, contrato accesible, sello As of y Source, salida `{ svg, table }`),
  DotMatrix, HeatGrid, Bars (ordenadas, apiladas, 100 %, mariposa, dumbbell, piruleta), TimeAxis
  (tira, beeswarm con hoy, carriles), Lanes, Venn3 con UpSet estrecho y Ladder.
- Componente `Chart.astro` que envuelve cualquier primitiva con figcaption, tabla alternativa en
  `<details>`, par ancho/estrecho y dos modos de estilo: `.figc` (exportable) y `.chart` (hoja propia
  para las cinco páginas que `perf.spec` veta a `figures.css`).
- Tanda 1: dieciséis visuales de datos ya listos en `/controls`, `/resources/crosswalk` y sus tres
  comparativas, `/resources/contracts`, `/toolkit/policy-card`, `/mcp`, `/resources/harms`, `/stack`,
  `/ai-governance`, `/resources/ai-act-deadlines` (+ `/es`), `/resources/dpia-lists`, `/resources`,
  `/for/certifications`, `/toolkit/ai-act-triage`, `/cases`, `/toolkit/vendor-due-diligence` y
  `/toolkit/incident-clock` (varios son figuras existentes incrustadas en páginas nuevas).
- Tanda 2: visuales temporales y plantillas por ítem: reloj de aplicación en `/obligations`, tiras y
  constelaciones en `/obligations/[id]` y `/patterns/[id]`, pajarita en `/cases/[id]`, anatomía del
  control en `/controls/[profile]/[control]`, huella en `/glossary/[slug]`, calendario en
  `/for/[slug]`, eje con hoy en la página de plazos, carriles de aplicación en `/controls` y tabla
  periódica con heatmap de cobertura en `/controls/[profile]`. Nuevas primitivas RelationRadial y
  BowTie (sobre `lib/evidence-chain.ts`).
- `catalogue.md`: catálogo completo por página (visuales actuales, propuestas, rechazos,
  correcciones, tandas) como fuente del backlog.

## Capabilities

### New Capabilities
- `chart-primitives`: kit de primitivas SVG de build, componente Chart y su contrato de accesibilidad, tema, móvil y exportación.
- `page-visuals`: visuales de página de la tanda 1 sobre datos existentes.
- `per-item-visuals`: visuales temporales y por ítem de la tanda 2 en rutas dinámicas.

### Modified Capabilities
- Ninguna capacidad cambia de requisitos; las páginas afectadas ganan figuras sin cambiar su contenido.

## Impact

- Código nuevo en `site/src/lib/charts/`, `site/src/components/Chart.astro` y componentes de página;
  estilos en `site/src/styles/figures.css` y una hoja `.chart`; posibles islas `public/*.js` ≤15 KB gzip
  (solo el triage de la tanda 1 necesita una).
- `site/src/data/figures.ts`: solo se amplía `pages` de figuras existentes (harm-levels,
  minimum-viable-stack, three-questions y las que se incrusten); no se registran figuras nuevas en
  estas tandas.
- Tests: sincronía datos-figura, a11y (axe claro/oscuro, 1440/390), perf.spec, content-lint; capturas
  de referencia locales solo de las páginas tocadas.
- Fuera de alcance: `/resources/frontier-safety-crosswalk` y el mapa de cobertura frontera (otro agente),
  y las tandas 3 a 5.
