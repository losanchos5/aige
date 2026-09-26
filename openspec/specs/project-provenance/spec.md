# project-provenance Specification

## Purpose
El sitio muestra de forma verdadera quién escribe, qué está en borrador, cómo se versiona y revisa
cada perfil y cada nota, qué trabajo está abierto y cómo se cita, sin inventar revisores, adopción ni
respaldos.

## Requirements

### Requirement: Personas del proyecto
El sitio SHALL declarar las personas en `site/src/data/people.ts` con un único registro en v0.1,
`jorge-garcia-aibar`, cuyo nombre MUST leerse de `site.ts` (nunca una segunda grafía), con enlace a
`/about`, el mismo `@id` JSON-LD que produce el sitio para el autor y sus intereses de investigación.
Ningún perfil, nota ni página MUST nombrar a un revisor que no esté en este fichero y acreditado en
`bok/CONTRIBUTORS.md`.

#### Scenario: Un solo autor
- **WHEN** se ejecuta `site/tests/orp-core.spec.ts`
- **THEN** `people` tiene exactamente una persona y `peopleProblems()` devuelve una lista vacía

### Requirement: Línea de estado y procedencia
Las páginas de perfil y de nota SHALL mostrar bajo el H1, nunca sobre un título, una línea `.meta`
(`StatusLine`) con versión, estado (Draft, In review, Published, Stable o Retired), revisión ("Open
for technical review" si no hay revisores, o "Reviewed by" con sus nombres) y fecha de actualización.
Donde se use, el bloque `Provenance` SHALL mostrar versión, DOI, cita, "Edit on GitHub" y "Open an
issue" (`data-umami-event="open-issue"`). El estado `published` MUST exigir al menos un revisor.

#### Scenario: Borrador sin revisores
- **WHEN** una página muestra un perfil o una nota con revisores vacíos
- **THEN** la línea de estado dice "Draft" y "Open for technical review"

### Requirement: Intereses, colaboración, preguntas y trabajo abierto en About
`/about` SHALL añadir, tras la sección del autor, un H2 `research-interests` generado desde
`people.ts`; en la sección de colaboración, la frase sobre metodología de evaluación independiente,
controles de entorno de evaluación, salvaguardas de agentes en runtime, evidencia legible por máquina,
perfiles de control abiertos e implementaciones de referencia; un H2 `open-questions` con las cinco
preguntas de `site/src/data/open-questions.ts` enlazadas; y un H2 `open-work` con la lista de
`site/src/data/work.ts`. El nodo `Person` del JSON-LD SHALL incluir en `knowsAbout` "AI evaluation
environments", "Agent runtime safeguards" y "Machine-readable assurance evidence", y la fecha de
modificación de la página SHALL calcularse con los módulos nuevos.

#### Scenario: Cinco preguntas abiertas
- **WHEN** se ejecuta `site/tests/about.spec.ts`
- **THEN** `#open-questions` tiene cinco `<li>`, sus enlaces y los de `#open-work` resuelven, y el
  nodo `Person` contiene los tres temas nuevos

### Requirement: Versionado y revisión en la metodología
`/about/methodology` SHALL tener un H2 `control-profiles-versioning-status-and-review`, incluido en el
índice de la página, que explique el semver propio de cada perfil y nota, los estados, que
`published` solo se alcanza con un revisor acreditado en `bok/CONTRIBUTORS.md`, que cada bump de
versión se registra en el changelog y qué es una revisión. La lista de formularios de la metodología
SHALL incluir los seis formularios nuevos.

#### Scenario: Metodología de revisión
- **WHEN** se abre `/about/methodology`
- **THEN** el H2 existe, está en el índice y la página lista los seis formularios nuevos

### Requirement: Documentación de contribución en el repositorio
`CONTRIBUTING.md` SHALL tener una sección "Ways to contribute" y un bloque "Control profiles and
research notes" (ficheros, contrato de frontmatter, bump de versión más changelog, `published` exige
revisor, `[n]` en `sources/SOURCES.md`, enlace a `/contribute`). La plantilla de PR SHALL añadir dos
comprobaciones (versión bumpeada con changelog; ids referenciados existen). El README SHALL añadir
`research/` al árbol, las vías de contribución con `/contribute` y la mención "open control profiles
and research notes (draft)" sin cambiar números de versión. Ningún fichero MUST contener una raya
(U+2014).

#### Scenario: Comprobaciones en la plantilla de PR
- **WHEN** se abre un pull request
- **THEN** la plantilla pide confirmar el bump de versión con su entrada de changelog y que los ids
  referenciados existen
