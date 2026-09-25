# Spec Delta

## Purpose

Las prácticas del lado del desarrollo que los capítulos describen como controles (admisión y
clasificación de casos de uso, modelado de amenazas de IA, derechos sobre los datos de
entrenamiento, admisión de datasets, evaluaciones de equidad, registros de explicación, integridad
del artefacto del modelo y sustanciación de afirmaciones) tienen cada una su página de patrón
estable, con artefacto, diagrama y fuentes verificadas, y los capítulos enlazan a ellas.

## ADDED Requirements

### Requirement: Ocho patrones del lado del desarrollo en el catálogo
El catálogo SHALL incluir, en el orden 18 a 25 de `site/src/data/patterns.ts`, los patrones Use-Case
Intake & Risk Tiering, AI Threat Model, Training-Data Rights Ledger, Dataset Admission Gate, Fairness
Eval Suite, Explanation Artefact, Model Artefact Integrity y Claims Substantiation Gate. Cada uno
MUST vivir en `bok/patterns/<slug>.md` con el contrato de frontmatter de `pattern-pages`, MUST tener
en `bok/05-patterns.md` una sección `## Pattern: <nombre>` con un resumen y un enlace a
`/patterns/<slug>`, y MUST nombrar en su línea **Maps to** las capas del stack que declara su
frontmatter.

#### Scenario: Página publicada
- **WHEN** se construye el sitio
- **THEN** `/patterns/ai-threat-model` existe, aparece en `/patterns` bajo Layer 01 Govern-as-Code
  con la marca de su segunda capa, y `/bok/patterns#pattern-ai-threat-model` resuelve al resumen del
  catálogo

#### Scenario: Índice, fichero y catálogo divergen
- **WHEN** se añade uno de los ocho ficheros sin su entrada en `patterns.ts` o sin su sección en el
  capítulo 05
- **THEN** la build falla en `src/lib/pattern-pages.ts` nombrando el patrón

### Requirement: Plantilla CSIRO completa con fuerzas y ejemplo
Cada página SHALL seguir la plantilla de STYLEGUIDE §4 con los encabezados Objectives, Target users,
Impacted stakeholders, Relevant principles, Context, Problem, Solution, Consequences y Related
patterns; el Problem MUST separar las fuerzas del modo de fallo; la Solution MUST describir el
artefacto, dónde corre y qué evidencia deja, e incluir un ejemplo etiquetado `(illustrative)`; y la
página MUST nombrar al menos uno de los seis principios de la casa. El texto MUST NOT contener el
carácter raya larga (U+2014).

#### Scenario: Revisión de una página
- **WHEN** se lee `/patterns/dataset-admission-gate`
- **THEN** su Problem tiene una viñeta **Forces** y otra **Failure mode**, y su Solution contiene
  un bloque JSON y un recuadro «Example (illustrative)»

### Requirement: Artefactos que reutilizan los esquemas publicados
Cuando el artefacto de un patrón coincide con un esquema de `site/public/schemas`, su ejemplo JSON
SHALL declarar `$schema` con el `$id` de ese esquema y MUST validar contra él con el validador de
`schemas-check.mjs`: el registro de caso de uso (`use-case-record.v1`), el registro de admisión de
datasets (`dataset-admission-record.v1`), el resultado de evaluación de equidad (`eval-result.v1`) y
la verificación antes de cargar un modelo (`evidence-record.v1`). Los artefactos sin esquema
publicado MUST presentarse como ilustrativos, sin `$schema`.

#### Scenario: Validación del ejemplo de equidad
- **WHEN** se valida el bloque JSON de `bok/patterns/fairness-eval-suite.md` contra
  `eval-result.v1.json`
- **THEN** no hay errores, y el intervalo y la política viajan en `extensions`

### Requirement: Correspondencias trazables y fuentes verificadas
La línea **Maps to** de cada página SHALL nombrar artículos del AI Act, identificadores del Anexo A
de ISO/IEC 42001, subcategorías del NIST AI RMF y, cuando proceda, identificadores OWASP (LLM 2026 o
Agentic 2026) y MITRE ATLAS, seguida de una nota que cite la fuente de cada familia de
identificadores y el aviso «Mappings are illustrative, not a claim of conformity». Las citas del AI
Act MUST apuntar a EUR-Lex (ELI de `2024/1689` o de `2026/1744`); las de ISO/IEC, OWASP y CSA MUST
limitarse a identificador y título corto; cada `[n]` MUST tener su fila en `## Sources` y en
`sources/SOURCES.md`.

#### Scenario: Fuente de los identificadores ISO
- **WHEN** una página nombra `A.7.5` en su línea **Maps to**
- **THEN** su nota cita el crosswalk publicado por el NIST AI Resource Center con etiqueta
  `secondary`, porque el texto de la norma no se abrió

### Requirement: Diagrama por patrón
Cada uno de los ocho patrones SHALL tener un diagrama archify en `site/diagrams/<id>.<tipo>.json`
que valide con `--quality showcase`, un fichero de notas `<id>.notes.json` con una nota por nodo y
una entrada en `site/src/data/diagrams.ts` colocada con `{ chapter: 'patterns', pattern: '<slug>',
at: 'lead' }`, de modo que la figura abra la página tras el Summary y antes de «Objectives».

#### Scenario: Diagrama en la página
- **WHEN** se construye `/patterns/model-artefact-integrity`
- **THEN** la figura `model-artefact-integrity` aparece una vez, antes del H2 «Objectives»

### Requirement: Enlaces desde los capítulos que describen la práctica
Los capítulos 11 a 23 SHALL enlazar a `/patterns/<slug>` la mención concreta de cada práctica
(frase o celda de tabla) sin reescribir la prosa ni renombrar encabezados, y cada uno de los ocho
patrones MUST recibir al menos un enlace desde esos capítulos. `check-links` MUST pasar.

#### Scenario: Mención en el capítulo 20
- **WHEN** se abre `/bok/existing-law`
- **THEN** «Claims Substantiation Gate» enlaza a `/patterns/claims-substantiation-gate` y la tabla de
  artefactos de propiedad intelectual enlaza el registro de derechos sin la marca «(proposed)»
