# Proposal

## Why

El sitio nombra amenazas (OWASP, MITRE ATLAS, NIST) en capítulos sueltos, pero no hay un sitio
único que lleve de un identificador externo de amenaza al control que la para, a la prueba que
demuestra que el control funciona y a la obligación que esa evidencia ayuda a cumplir. Un equipo que
hace un modelo de amenazas tiene que reconstruir ese puente cada vez. Además, cuatro patrones del
capítulo 05 se quedaban en el lado del proveedor: el Incident Pipeline no decía qué hace el
responsable del despliegue (`Art. 26(5)`), FRIA-as-Code solo cubría la FRIA, el Adversarial
Red-Team Suite no explicaba cómo se pasa del modelo de amenazas al plan de pruebas y el Vendor /
Model Due-Diligence Gate terminaba en la compra, sin fase de operación.

## What Changes

- **Patrones extendidos** (solo sus ficheros en `bok/patterns/`, sin renombrar encabezados H2 ni
  cambiar slug, título, capas ni la línea **Maps to**):
  - `incident-pipeline.md`: incidencia frente a incidente, escala de severidad mapeada a las clases
    del `Art. 73`, el registro según `/schemas/incident-record.v1.json`, RCA y CAPA, revisión sin
    culpa, simulacros de mesa y el lado del responsable del despliegue (`Art. 26(5)`: informar al
    proveedor, suspender el uso, reloj propio si el proveedor no responde).
  - `fria-as-code.md`: generalizado como **Impact-Assessment-as-Code** (AIIA según ISO/IEC 42005,
    DPIA y FRIA como vistas de una sola base de hechos, `/schemas/impact-assessment.v1.json`,
    disparadores de reevaluación como código). Conserva nombre, slug y ancla
    (`/patterns/fria-as-code`, `#pattern-fria-as-code`), así que no hace falta redirección.
  - `adversarial-red-team-suite.md`: el paso del modelo de amenazas al plan de pruebas (cinco
    pasos, ids externos, entrada de `suites` válida para `/schemas/test-plan.v1.json`).
  - `vendor-model-due-diligence-gate.md`: fase de operación (avisos de cambio y retirada,
    detección de cambios no anunciados, reevaluación por disparadores y por nivel, alternativa
    probada).
- **Dataset nuevo** `site/src/data/threats.ts`: 51 filas con clave en identificadores externos
  verificados (OWASP Top 10 for LLM Applications 2026, OWASP Top 10 for Agentic Applications 2026,
  técnicas de MITRE ATLAS de la versión de datos v2026.09 y clases de NIST AI 100-2 E2025 con sus
  `NISTAML`), cada una con patrones, evals de ejemplo (Inspect, promptfoo, garak o prueba propia),
  obligaciones del registro, controles del Anexo A de ISO/IEC 42001, dominios de CSA AICM v1.1,
  tareas de NIST SP 800-218A, casos de uso de NIST COSAiS, mitigaciones de ATLAS y capas.
  `threatProblems()` rompe la build ante cualquier referencia rota.
- **Página nueva** `/resources/threats` con filtros de catálogo y capa en CSS puro (radios
  nativos, `:has()`, sin JavaScript), estado vacío por par de filtros, JSON-LD `Dataset`, fuentes
  numeradas y descargas; `/resources/threats.csv`; dataset `threats` en el registro de la API
  (`/api/v1/threats.json` y su esquema).
- `SOURCE_BY_PATH`, `sources/SOURCES.md`, `bok/CHANGELOG.md` y el handoff.

## Capabilities

### New Capabilities
- `threat-bridge`: el dataset de amenazas con clave externa, su página, su CSV y su entrada en la
  API.
- `pattern-extensions`: las cuatro extensiones de patrón hacia el lado del responsable del
  despliegue y de la operación.

### Modified Capabilities
- (ninguna en `openspec/specs/`)

## Impact

- **Sitio** (`site/`): nuevos `src/data/threats.ts`, `src/pages/resources/threats.astro`,
  `src/pages/resources/threats.csv.ts`, `src/styles/threats.css` y `tests/threats.spec.ts`.
  Modificados: `src/lib/api.ts` (imports y un dataset añadido al final) y `astro.config.ts` (un
  bloque en `SOURCE_BY_PATH`).
- **Libro**: `bok/patterns/{incident-pipeline,fria-as-code,adversarial-red-team-suite,vendor-model-due-diligence-gate}.md`
  y `bok/CHANGELOG.md`; `sources/SOURCES.md` gana una sección al final.
- **No tocado** (va al handoff): navegación, hub de recursos, `llms.txt`, `patterns.ts`
  (`mapsTo`), `frameworks.ts`, glosario y capítulos.
