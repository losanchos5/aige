# research-notes Specification

## Purpose
El sitio publica notas técnicas sobre las preguntas abiertas de la disciplina, cada una con versión,
estado de revisión, fuentes numeradas y cita, y distingue sin ambigüedad lo escrito de lo previsto.

## Requirements

### Requirement: Colección de notas con frontmatter estricto
Las notas SHALL vivir como Markdown en `research/<slug>.md` y validarse con un esquema estricto:
`title` de 10 a 120 caracteres, `summary` de 50 a 160, `status` (`draft`, `review` o `published`),
`version` semver, `date` y `updated`, al menos un autor (id de `site/src/data/people.ts`),
`reviewers` (por defecto vacío), `relatedControls` (ids `AIGE-CTL-*` existentes) y
`relatedPatterns` (slugs existentes). La build MUST fallar si el conjunto de ficheros no coincide con
los temas marcados `written` en `site/src/data/research.ts`, si un autor, revisor, control o patrón no
existe, si el H1 no coincide con el título, si un `[n]` no tiene fuente, o si una nota con `status:
published` no tiene revisores.

#### Scenario: Publicada sin revisor
- **WHEN** una nota declara `status: published` con `reviewers: []`
- **THEN** `astro build` falla nombrando la nota

#### Scenario: Un fichero por tema escrito
- **WHEN** se ejecuta `site/tests/research.spec.ts`
- **THEN** hay un fichero por tema `written` y ninguno por tema `planned`

### Requirement: Índice de notas y temas previstos
El sitio SHALL publicar `/research` con las secciones `notes`, `planned-themes` y
`how-a-note-is-reviewed`. Cada nota escrita SHALL listarse con su línea de estado. Los temas previstos
SHALL mostrarse bajo "Planned themes (not yet written)" con su pregunta y MUST NOT enlazar a
`/research/<slug>`. La sección de revisión SHALL enlazar la metodología de revisión de
`/about/methodology` y `/contribute`.

#### Scenario: Tema previsto sin enlace
- **WHEN** se abre `/research`
- **THEN** ningún tema `planned` tiene un `<a href="/research/`

### Requirement: Primera nota en borrador
La colección SHALL contener en v0.1 una sola nota, "The evaluation environment is part of the system"
(`status: draft`, `version: 0.1.0`, autor `jorge-garcia-aibar`, `reviewers: []`), de 1200 a 1800
palabras, con un marcador `[n]` por afirmación, sin raya (U+2014), con las secciones Abstract, The
claim, Why the boundary moved, Five things inside the boundary, What an evaluation must therefore
record, Consequences for controls, Open questions y Sources, y con `relatedControls` del perfil de
entorno de evaluación que el texto argumenta. MUST NOT publicarse sin la aprobación editorial de
Jordi, y MUST NOT atribuir a un proveedor una afirmación sin decir que es del proveedor.

#### Scenario: Longitud y fuentes
- **WHEN** se ejecuta `site/tests/research.spec.ts`
- **THEN** la nota tiene entre 1200 y 1800 palabras y todos sus `[n]` están en su lista de fuentes

### Requirement: Página de nota con estado, revisión y cita
Cada nota SHALL publicarse en `/research/<slug>` con las secciones `abstract`, `related-controls`,
`review-this-note` y `cite`, una línea de estado con `data-status` (con revisores vacíos: "Draft
v0.1.0 · Open for technical review"), enlaces de `related-controls` a
`/controls/evaluation-environment#aige-ctl-eval-00N`, el formulario `research-review.yml` y una cita
con versión y DOI de concepto. MUST tener `<title>` de 60 caracteres como máximo, descripción de 70 a
160, un único ld+json `ScholarlyArticle` con `version`, `creativeWorkStatus` y autor, un twin
`/research/<slug>.md` con `version` y `canonical:` anunciado con
`link[rel=alternate][type="text/markdown"]`, y su entrada en `llms.txt`, `SOURCE_BY_PATH` y en la
regla de `public/_headers` para twins.

#### Scenario: Nota en borrador
- **WHEN** se abre `/research/the-evaluation-environment-is-part-of-the-system`
- **THEN** la página tiene `data-status="draft"`, dice "Open for technical review", tiene un solo
  ld+json con `"version":"0.1.0"` y enlaza `research-review.yml`

#### Scenario: Twin Markdown
- **WHEN** se pide `/research/the-evaluation-environment-is-part-of-the-system.md`
- **THEN** el documento tiene `version: "0.1.0"` y `canonical:`, y `/llms.txt` lista la nota

### Requirement: Metadatos del índice de notas
`/research` MUST tener `<title>` "AI governance research notes" (con sufijo si cabe), una descripción
de 70 a 160 caracteres, un único ld+json `CollectionPage`, imagen OG, entrada en `SOURCE_BY_PATH` y
en `llms.txt`, sin script inline.

#### Scenario: Título del índice
- **WHEN** se ejecuta `site/tests/seo-titles.spec.ts`
- **THEN** el título de `/research` empieza por "AI governance research notes" y es único
