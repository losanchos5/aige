# Proposal

## Why

La versión v0.5.0 amplía el Body of Knowledge hasta 24 capítulos, pero los capítulos nuevos de
gobierno, riesgo, explicabilidad, leyes, estándares y agentes (12, 13, 14, 16, 21, 22 y 23) explican
con tablas y prosa siete ideas que se entienden mejor dibujadas: la construcción como cadena de gates,
el plano de control de un agente, el modelo operativo con las tres líneas, el daño por niveles, el
mapa de técnicas de explicación, cómo se relacionan los instrumentos (leyes, estándares armonizados,
familia ISO/IEC, códigos y marcos) y el estado de las leyes de IA por jurisdicción. El hub `/agents`
y la página `/resources/frameworks` tampoco tienen una figura que resuma su contenido. Las figuras son
la vía de entrada más rápida al texto y cada una tiene permalink citable en `/figures/<id>`.

## What Changes

- **Un diagrama archify** `build-chain-of-gates` (tipo `lifecycle`, IR en
  `site/diagrams/build-chain-of-gates.lifecycle.json` con su `*.notes.json`), añadido al final de
  `site/src/data/diagrams.ts` y colocado como figura de apertura del capítulo 14: cinco gates de la
  construcción (intake, revisión de diseño, admisión de datos, eval gate, release gate), cada uno con
  el patrón que el capítulo le asocia (Agent Registry, Human-in-the-loop Gate, AIBOM, Eval Gate in CI,
  Model Card as Control Evidence), la salida bloqueada y el expediente técnico que compila el pipeline
  (Machine-Readable Evidence).
- **Seis infografías hechas a mano** en `site/src/figures/`, añadidas al final de
  `site/src/data/figures.ts`, todas con el contrato de `site/VISUAL-GUIDE.md`:
  - `agent-control-plane` (cap. 23, apertura; también en `/agents#control-plane`): una llamada a una
    herramienta a través del registro, el emisor de identidad, el gateway, el guardrail (postura de
    fallo), el checkpoint humano y el breaker por agente (niveles de parada), con la frontera que el
    kill switch no cruza y la telemetría como evidencia;
  - `governance-operating-model` (cap. 12, «The three lines, applied to AI»): consejo, comité, las tres
    líneas, dónde se sitúa el AI governance engineer y cómo fluye la evidencia;
  - `harm-levels` (cap. 13, pie de «Defined scales»): los cinco niveles de daño de `harms.ts`, cada uno
    con un daño de ejemplo del atlas y el control que lo detecta, coloreado por capa;
  - `explanation-techniques` (cap. 16, «Explanation techniques»): el mapa global/local por
    agnóstico/específico del capítulo, con las pruebas y el registro de explicación como evidencia;
  - `instrument-lineage` (cap. 22, «A short lineage of AI soft law»; también en
    `/resources/frameworks`): los instrumentos por orden de fuerza con los vínculos que el capítulo
    enuncia (definición, ciclo de vida, presunción del Art. 40), fechada «As of 2026-09-24»;
  - `jurisdiction-tiles` (cap. 21, «The landscape at a glance»): mapa de teselas iguales en orden
    geográfico aproximado, sombreado por estado desde `jurisdictions.ts`, `kind: 'data-viz'` con tabla
    de respaldo, fechado «As of 2026-09-24».
- **Estilos**: cuatro clases `.figc .tile-*` al final de `site/src/styles/figures.css` para el estado
  de las jurisdicciones (rampa de tinta y estilo de contorno, nunca un tono, según VISUAL-GUIDE §4.3).
- **Páginas**: `site/src/pages/agents.astro` y `site/src/pages/resources/frameworks.astro` insertan su
  figura con `<Figure>` sin tocar el resto del contenido.
- **Pruebas**: `site/tests/figures-concepts.spec.ts` con el contrato por figura, el presupuesto del IR
  archify, la sincronía del mapa con `jurisdictions.ts` y de los niveles con `harms.ts`, y la
  colocación en los capítulos y páginas.
- Fuera de alcance: `scripts/figures-build.mjs` (lo lleva otro bloque en esta ola), la interfaz
  `FigureDef`, los capítulos (`bok/`), la galería `/figures` y `/resources/harms` (la figura de daños
  queda propuesta para esa página en el handoff).

## Capabilities

### New Capabilities
- `concept-figures`: figuras conceptuales de los capítulos 12 a 23 (seis infografías y un diagrama
  archify) que dibujan solo lo que el capítulo y sus módulos de datos enuncian.

### Modified Capabilities
- (ninguna)

## Impact

- **Contenido**: sin cambios en `bok/`; ninguna figura añade hechos, cifras, fechas ni marcas que el
  capítulo o su módulo de datos no digan.
- **Sitio**: seis SVG nuevos (entre 4 y 7 KB cada uno) insertados por `rehype-diagrams` en los
  capítulos 12, 13, 16, 21, 22 y 23; un diagrama archify nuevo en el capítulo 14; dos figuras en
  páginas (`/agents`, `/resources/frameworks`); seis permalinks nuevos en `/figures/<id>` con sus
  exportaciones SVG y PNG.
- **Build**: `astro check`, `astro build`, `content-lint`, `check-links`, `schemas-check` y `pagefind`
  en verde con `bash D:/Documents/aige-wt/build.sh`.
