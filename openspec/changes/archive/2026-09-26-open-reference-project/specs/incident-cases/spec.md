# Spec Delta

## MODIFIED Requirements

### Requirement: Dataset tipado de casos verificados
El sitio SHALL definir en `site/src/data/cases.ts` entre 8 y 12 casos. Cada caso MUST tener `id`,
título, jurisdicción, año, qué pasó, modo de fallo, control que faltó (con patrones existentes por
`id` cuando los hay), evidencia que habría existido, obligaciones que toca hoy, daños del atlas
relacionados, registros de incidente (AIID cuando existe) y una lista de fuentes numeradas en el
formato de la casa con etiqueta de verificación (`primary`, `secondary` o `reported`). Un caso
sostenido solo por prensa MUST marcarse como `reported` y decirlo en su texto.

Un caso MAY llevar una nota de incidente con campos opcionales: límite del sistema, supuestos de
control, controles preventivos, detectivos y de respuesta (por patrón existente), requisitos de
evidencia, controles relacionados (ids `AIGE-CTL-*` existentes) y preguntas abiertas. La nota MUST
construirse solo desde las fuentes ya citadas por el caso, sin hechos nuevos; un supuesto ilustrativo
MUST marcarse como "illustrative, not a finding". En v0.1 SHALL llevar nota al menos
`nyc-mycity-chatbot`, `moffatt-v-air-canada` y `zillow-offers`. La build MUST fallar si un patrón o
control de la nota no existe o si un `[n]` de la nota no tiene fuente en el caso. Los campos nuevos
MUST publicarse en `/api/v1/cases.json` como claves aditivas que valen `null` cuando el caso no tiene
nota, sin cambiar la versión del esquema del dataset.

#### Scenario: Cada marcador tiene fuente
- **WHEN** un texto del caso contiene un marcador `[n]`
- **THEN** existe la fuente `n` en la lista de fuentes del caso

#### Scenario: Caso sostenido solo por prensa
- **WHEN** un caso solo tiene fuentes secundarias o de prensa
- **THEN** el caso lleva `evidence: 'reported'` y la página muestra la etiqueta "Reported"

#### Scenario: Nota con control inexistente
- **WHEN** la nota de un caso declara un control relacionado que no está en el registro de controles
- **THEN** `astro build` falla nombrando el caso y el id

#### Scenario: Claves nuevas en la API
- **WHEN** se ejecuta `site/tests/incident-notes.spec.ts`
- **THEN** `/api/v1/cases.json` contiene las claves de la nota en todos los casos, con valor `null`
  en los que no tienen nota

### Requirement: Índice y páginas por caso
El sitio SHALL publicar `/cases` con una tarjeta por caso y `/cases/<id>` como rutas estáticas
generadas desde el dataset. Cada página de caso MUST mostrar las secciones What happened, Failure
mode, Which control would have caught it, The evidence that would have existed, Obligations it
touches today y Sources, y enlazar al atlas de daños y al registro de incidente.

Un caso con nota de incidente SHALL mostrar además, solo cuando existen, las secciones
`system-boundary`, `control-assumptions`, `controls-by-moment` (Preventive, Detective y Responsive),
`evidence-requirements`, `related-controls` (enlazados a su ancla en el perfil) y `open-questions`,
con un índice `nav.cs-toc` etiquetado "On this page"; el twin Markdown SHALL incluir las mismas
secciones en el mismo orden. `/cases` SHALL incluir la sección `from-incident-to-control` con un
`FlowDiagram` de cinco pasos (Incident, Failure mode, Control gap, Control requirement, Evidence
requirement) enlazados al capítulo 17, al patrón de pipeline de incidentes, a `/controls` y a la
plantilla `incident-record`, más enlaces a `/toolkit/incident-clock`. Las migas de pan de las páginas
de caso SHALL decir "Incidents". `/incidents` y `/incidents/*` MUST responder con una redirección 301
hacia `/cases` y `/cases/:splat`.

#### Scenario: Rutas estáticas por caso
- **WHEN** se construye el sitio
- **THEN** existe un HTML por cada `id` de `cases` bajo `/cases/` y todos sus enlaces internos
  resuelven en la comprobación de enlaces

#### Scenario: Descargo de responsabilidad
- **WHEN** un lector abre una página de caso
- **THEN** la página dice que el análisis es ilustrativo, no una determinación legal ni una
  afirmación de conformidad

#### Scenario: Secciones de nota solo si existen
- **WHEN** se ejecuta `site/tests/incident-notes.spec.ts`
- **THEN** los casos con nota tienen sus ids de sección y `cs-toc`, y los casos sin nota no los tienen

#### Scenario: Del incidente al control
- **WHEN** se abre `/cases#from-incident-to-control`
- **THEN** el diagrama tiene cinco pasos en una lista ordenada con `aria-label` y todos sus enlaces
  resuelven

#### Scenario: Redirección de incidents
- **WHEN** se pide `/incidents` o `/incidents/nyc-mycity-chatbot`
- **THEN** la respuesta es un 301 hacia `/cases` o `/cases/nyc-mycity-chatbot`
