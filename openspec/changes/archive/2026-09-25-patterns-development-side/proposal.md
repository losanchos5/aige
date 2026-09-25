# Proposal

## Why

El catálogo de patrones (17 páginas tras `patterns-as-pages`) cubre bien el tiempo de ejecución, el
inventario y la garantía, pero deja sin patrón propio las prácticas del lado del desarrollo que los
capítulos 11 a 23 ya describen como controles: la admisión y clasificación de casos de uso, el
modelado de amenazas específico de IA, el registro de derechos sobre los datos de entrenamiento, la
puerta de admisión de datasets, la batería de evaluaciones de equidad, el registro de explicaciones,
la integridad del artefacto del modelo y la sustanciación de afirmaciones públicas. Los capítulos las
nombran en prosa y en tablas (el capítulo 20 incluso marca dos como «proposed»), pero el lector no
tiene una página estable, citable y enlazable con la solución, el artefacto de ejemplo y las fuentes.

## What Changes

- **Ocho patrones nuevos**, uno por fichero en `bok/patterns/<slug>.md` con el contrato de
  frontmatter de `patterns-as-pages` y la plantilla CSIRO de STYLEGUIDE §4 (Summary, Objectives,
  Target users, Impacted stakeholders, Relevant principles, Context, Problem con fuerzas y modo de
  fallo, Solution con ejemplo ilustrativo, Consequences, Related patterns, Maps to, nota de fuentes y
  `## Sources` numeradas), en el orden de catálogo 18 a 25:
  - Use-Case Intake & Risk Tiering (capas 01/02);
  - AI Threat Model (capas 01/03): STRIDE ampliado con MITRE ATLAS 2026.09, NIST AI 100-2 E2025 y
    los identificadores OWASP LLM 2026 y Agentic 2026;
  - Training-Data Rights Ledger (capa 02);
  - Dataset Admission Gate (capas 01/02);
  - Fairness Eval Suite (capa 03);
  - Explanation Artefact (capas 04/05): registro de explicación y códigos de motivo;
  - Model Artefact Integrity (capas 02/04): firma (OpenSSF Model Signing), procedencia de build
    (SLSA v1.2), formatos seguros y escaneo de serialización, verificación antes de cargar;
  - Claims Substantiation Gate (capas 05/03).
- **Artefactos reutilizados**: cuatro ejemplos JSON validan contra los esquemas publicados
  (`use-case-record.v1`, `dataset-admission-record.v1`, `eval-result.v1`, `evidence-record.v1`); los
  otros cuatro (amenaza, fila del registro de derechos, registro de explicación, fila del registro de
  afirmaciones) son ilustrativos y se proponen como esquemas futuros en el handoff.
- **Índice y catálogo**: ocho entradas añadidas al final de `site/src/data/patterns.ts` y ocho
  secciones `## Pattern: <nombre>` con resumen y enlace en `bok/05-patterns.md`, tras la última
  sección existente (el catálogo sigue el orden de `patterns.ts`).
- **Diagramas**: ocho IR de archify en `site/diagrams/` (seis `workflow`, dos `dataflow`), cada uno
  con su fichero de notas y su entrada en `site/src/data/diagrams.ts` con colocación
  `{ chapter: 'patterns', pattern: '<slug>', at: 'lead' }`. Validan con `--quality showcase`.
- **Enlaces desde los capítulos**: en los capítulos 11 a 23, la
  mención concreta de cada práctica pasa a enlazar `/patterns/<slug>` sin reescribir la prosa ni
  renombrar encabezados; la tabla del capítulo 20 deja de marcar el registro de derechos como
  «proposed».
- **Registros compartidos**: sección nueva en `sources/SOURCES.md` y viñeta en `bok/CHANGELOG.md`
  bajo «Unreleased (v0.5.0)». `SOURCE_BY_PATH` no necesita bloque nuevo: el bloque de
  `b-patterns-split` ya fecha cada `/patterns/<slug>` a partir de `patterns.ts`.
- Fuera de alcance (handoff): navegación, `x-pattern` de los esquemas, esquemas nuevos, términos de
  glosario, el recuento «Seventeen» de `chapters.ts`, `PATTERN_SHORT` del mapa y el comentario
  «KEEP IN SYNC: 17 patterns» de `patterns.ts`.

## Capabilities

### New Capabilities
- `development-patterns`: los ocho patrones del lado del desarrollo como páginas del catálogo, con
  artefacto validado o ilustrativo, diagrama, fuentes verificadas y enlaces desde los capítulos que
  describen la práctica.

### Modified Capabilities
- (ninguna en `openspec/specs/`). Se apoya en la capacidad `pattern-pages` del cambio abierto
  `patterns-as-pages` (contrato de fichero, integridad de citas y colocación de diagramas), sin
  cambiar sus requisitos.

## Impact

- **Nuevos**: `bok/patterns/{use-case-intake-risk-tiering,ai-threat-model,training-data-rights-ledger,dataset-admission-gate,fairness-eval-suite,explanation-artefact,model-artefact-integrity,claims-substantiation-gate}.md`,
  sus ocho IR y ocho ficheros de notas en `site/diagrams/`, `site/tests/patterns-development.spec.ts`.
- **Modificados**: `bok/05-patterns.md`, capítulos 11 a 23 (solo enlaces), `site/src/data/patterns.ts`,
  `site/src/data/diagrams.ts`, `site/src/figures/pattern-map.svg` y
  `site/src/figures/discipline-map.svg` (regenerados por la build), `sources/SOURCES.md`,
  `bok/CHANGELOG.md`.
- Sin dependencias nuevas; `node_modules` no cambia. Las correspondencias son ilustrativas, no una
  declaración de conformidad.
