# control-profiles Specification

## Purpose
El sitio publica perfiles de control abiertos: especificaciones de control en borrador, versionadas
y legibles por máquina, cada una con su punto de aplicación, su verificación y la evidencia que deja,
ancladas al Stack, a los patrones y a las obligaciones, y abiertas a revisión técnica.

## Requirements

### Requirement: Registro tipado y multi-perfil de controles
El sitio SHALL declarar sus controles en un registro tipado (`site/src/data/controls/index.ts`) que
concatena un fichero por perfil. Cada perfil SHALL tener slug kebab, título, versión, estado,
estado de revisión, resumen, alcance, fechas de publicación y actualización, al menos un autor,
revisores (lista que puede estar vacía), un changelog no vacío y, opcionalmente, `doi` y
`conceptDoi`. Cada control SHALL tener id, perfil, título, versión, estado, estado de revisión,
`depth` (`specified`, `derived` o `stub`), objetivo, al menos un modo de fallo, alcance, al menos un
punto de aplicación (`pre_merge`, `deploy`, `runtime`, `periodic`), verificación, evidencia,
respuesta ante fallo, capa del Stack (1 a 5), patrones, semillas, `derivedFrom`, mapeos,
referencias, notas de implementación y preguntas abiertas. Desde la v0.2 del catálogo el registro
SHALL contener cinco perfiles (`evaluation-environment`, `agent-runtime`,
`data-admission-and-privacy`, `deployment-and-monitoring`, `assurance-and-evidence`) y al menos 70
controles. Los recuentos que muestran las páginas, los tests y los textos derivados (por ejemplo el
rango de ids citado en `/frontier`) MUST calcularse desde el registro, nunca escribirse a mano.

#### Scenario: Recuento del registro
- **WHEN** se ejecuta `site/tests/orp-core.spec.ts`
- **THEN** el registro contiene cinco perfiles y al menos 70 controles, `controlProblems()` devuelve
  una lista vacía y los recuentos esperados se leen del registro

#### Scenario: Perfil nuevo sin tocar registros compartidos
- **WHEN** se añade un perfil al array `profiles`
- **THEN** `/controls`, `#by-layer`, `/api/v1/controls.json`, `llms.txt` y `SOURCE_BY_PATH` lo
  incluyen sin editar listas de slugs a mano

### Requirement: Ids estables de control
El id de cada control MUST cumplir `^AIGE-CTL-[A-Z0-9]+-\d{3}$`, MUST ser único y MUST NOT figurar en
la lista de ids retirados; un id retirado MUST NOT reutilizarse nunca. Dentro de cada perfil los ids
MUST ser contiguos desde `001` y aparecer en orden, con un prefijo único por perfil (`EVAL`, `AGENT`,
`DATA`, `DEPLOY`, `ASSURE`). El slug del control SHALL ser su id en minúsculas y SHALL servir de
ancla en la página del perfil, de nombre del fichero JSON por ítem y, si el control es `specified`,
de último segmento de su página.

#### Scenario: Id duplicado o retirado
- **WHEN** un perfil declara un id que ya existe o que está en la lista de retirados
- **THEN** `controlProblems()` lo nombra y la página del perfil hace fallar la build

#### Scenario: Orden de los ids
- **WHEN** se ejecuta `site/tests/controls.spec.ts`
- **THEN** en cada perfil los ids empiezan en `001`, son contiguos, están en orden y usan el prefijo
  del perfil

### Requirement: Validación del registro en build
La build MUST fallar si un control referencia un patrón, una semilla de
`site/src/data/tool-agent-controls.ts`, un origen `derivedFrom` (slug de patrón o id de esquema de
registro publicado) inexistente, una obligación, un control ISO/IEC 42001, una subcategoría del NIST
AI RMF, un id OWASP/ATLAS o un id AIUC-1 que no existen en los registros del sitio (los ids de
amenaza en minúscula y con la taxonomía correcta; los ids AIUC-1 solo del índice público y sin
retirados), si un `schemaId` de evidencia no es un esquema publicado o `control-observation`, si una
referencia no tiene URL y etiqueta de verificación, si la capa principal aparece también en las capas
secundarias, o si el JSON de un control contiene una raya (U+2014). Los autores y revisores de un
perfil MUST resolver en `site/src/data/people.ts`.

#### Scenario: Patrón inexistente
- **WHEN** un control declara un patrón que no está en el catálogo
- **THEN** `astro build` falla nombrando el control y el patrón

#### Scenario: Origen de derivación inexistente
- **WHEN** un control `derived` declara en `derivedFrom` un esquema que no está en `public/schemas/`
- **THEN** `controlProblems()` nombra el control y el origen y la build falla

### Requirement: Nivel de especificación declarado
Un control `specified` MUST tener entre dos y cuatro pasos de verificación que un tercero pueda
repetir, al menos una evidencia con un `schemaId` publicado, al menos una nota de implementación a
nivel de configuración, un registro `observation`, dos observaciones de ejemplo publicadas (una
`pass` y una `fail`) y referencias verificables. Un control `derived` MUST tener al menos una
semilla o un origen `derivedFrom`, una evidencia y una pregunta abierta. Un control `stub` MUST tener
al menos una pregunta abierta y estado de revisión `open`. En la v0.2 del perfil
`evaluation-environment` los controles 002, 003 y 006 SHALL seguir `specified` y los controles 001,
004, 005, 007, 008 y 009 SHALL pasar a `specified` solo cuando cada afirmación tenga una fuente
verificada ya reunida; los que no, SHALL seguir `stub`. La página SHALL mostrar, en cada control
`stub` o `derived`, que es un borrador que requiere revisión técnica.

#### Scenario: Controles a fondo
- **WHEN** se ejecuta `site/tests/controls.spec.ts`
- **THEN** cada control `specified` tiene de 2 a 4 verificaciones, evidencia, referencias,
  observación y dos ficheros de ejemplo en `/controls/examples/` con estados `pass` y `fail` que
  validan contra `control-observation.v1`

#### Scenario: Borrador visible como tal
- **WHEN** se abre el ancla de un control `stub` o `derived` en su página de perfil
- **THEN** el control dice que es un borrador que requiere revisión técnica y lista sus preguntas
  abiertas

### Requirement: Perfil Agent Runtime derivado
El perfil `agent-runtime` SHALL tener un control `AIGE-CTL-AGENT-0nn` por cada control de agente de
`site/src/data/tool-agent-controls.ts`, en el mismo orden, cada uno con exactamente una semilla
distinta, `depth: 'derived'`, estado `draft` y revisión `open`. La derivación MUST NOT añadir
requisitos que la semilla no contiene: el objetivo reescribe la regla sin cambiar su sentido, los
mapeos OWASP vienen de las amenazas de la semilla y las obligaciones solo de las que `threats.ts` ya
asocia a esas amenazas. Cada control SHALL enlazar su ancla del capítulo 23 como referencia.

#### Scenario: Trazabilidad a la semilla
- **WHEN** se ejecuta `site/tests/controls-runtime.spec.ts`
- **THEN** hay 31 controles `derived`, cada uno con una semilla de `agentControls` sin repetir y en
  el mismo orden que el módulo

### Requirement: Páginas de perfil
El sitio SHALL publicar `/controls` y una página `/controls/<perfil>` por perfil. `/controls` SHALL
explicar qué es un perfil abierto, mostrar la cadena concept, pattern, control, implementation,
evidence como `FlowDiagram`, las propiedades de un control útil, una tarjeta por perfil con su línea
de estado, el recuento calculado "N reference controls across M profiles", la relación con
certificaciones y marcos (hechos públicos, nota de no afiliación, sin comparativas), un enlace al
crosswalk desde `#mappings` o `#ecosystem` y cómo revisar. Cada página de perfil SHALL mostrar
alcance, cómo leer un control, un `<section>` por control con un H2 cuyo id es el slug del control,
tabla de mapeos legible en móvil, preguntas abiertas agregadas, changelog, fuentes numeradas,
formatos legibles por máquina y la llamada a revisión. Las páginas MUST llevar las anclas acordadas
(`/controls`: `intro`, `chain`, `properties`, `profiles`, `by-layer` con `layer-1` a `layer-5`,
`ecosystem`, `adoption`, `how-to-review`; perfil: `scope`, `how-to-read-a-control`, un ancla por
control, `mappings`, `open-questions`, `changelog`, `sources`, `machine-readable`, `review`). Solo
los controles `specified` SHALL tener página HTML propia; su sección en el perfil MUST enlazarla
desde `<main>`. Los controles `stub` y `derived` MUST NOT tener página propia y su URL canónica es el
ancla del perfil.

#### Scenario: Un ancla por control
- **WHEN** se construye el sitio y se abre cualquier página de perfil
- **THEN** existe un `id` por control con su slug y el índice de la página tiene un enlace
  `[data-toc-link]` por control

#### Scenario: Recuento calculado
- **WHEN** se añade un control a un perfil
- **THEN** `/controls` muestra el nuevo recuento sin editar su texto

#### Scenario: Control especificado enlazado
- **WHEN** se abre `/controls/evaluation-environment#aige-ctl-eval-002`
- **THEN** la sección enlaza `/controls/evaluation-environment/aige-ctl-eval-002`

### Requirement: Lenguaje de los perfiles
Las páginas y el JSON de controles SHALL describirse como "open control profiles", "draft control
specifications" o "reference controls" y SHALL decir que son ilustrativos, no vinculan a nadie, no son
una afirmación de conformidad ni asesoramiento legal. MUST NOT llamarse "standard" en referencia a los
controles propios ni contener la palabra "certified". Los mapeos a AIUC-1 SHALL publicarse solo si el
id se ha leído en una página pública, con la nota de que el sitio no está afiliado ni certificado por
AIUC.

#### Scenario: Sin lenguaje de certificación
- **WHEN** se busca "certified" en `/controls` y en las páginas de perfil construidas
- **THEN** no aparece, y aparecen "not a claim of conformity" y "draft control specifications"

### Requirement: JSON de controles y esquema de observación
El sitio SHALL publicar `/api/v1/controls.json` (perfiles con autores y revisores por nombre y
controles en orden de perfil, con el aviso "not a claim of conformity"), un fichero
`/api/v1/controls/<slug>.json` por control igual a su fila del dataset, el esquema generado
`/api/v1/schemas/controls.json`, la plantilla por ítem `control` en `/api/v1/index.json` y la ruta
`/controls/{id}.json` en el documento OpenAPI. Los campos opcionales MUST emitirse como `null` o `[]`,
nunca omitirse. El sitio SHALL publicar `/schemas/control-observation.v1.json` (draft 2020-12, sin
propiedades adicionales) con `control_id`, `subject`, `subject_kind`, `expected`, `observed`,
`status` (`pass`, `fail`, `not_applicable`), `timestamp` y `evidence` (al menos un elemento) como
requeridos, más un ejemplo y una plantilla validados por `schemas-check`. El campo `observer` MUST
nombrar un adaptador o un rol, nunca a una persona.

#### Scenario: Fichero por control
- **WHEN** se ejecuta `site/tests/controls.spec.ts` sobre `dist`
- **THEN** cada `/api/v1/controls/<slug>.json` contiene un `control` igual a su fila de
  `/api/v1/controls.json` y el esquema de observación tiene su `$id`

#### Scenario: Plantilla por ítem
- **WHEN** un cliente lee `/api/v1/index.json`
- **THEN** `api.itemTemplates.control` apunta a `/api/v1/controls/{id}.json`

### Requirement: Twin Markdown y metadatos de los perfiles
Cada página de perfil SHALL tener un twin `/controls/<perfil>.md` con `canonical:` (y `doi:` cuando
el perfil lo tenga) y anunciarlo con `link[rel=alternate][type="text/markdown"]`. Cada página nueva
de controles MUST tener un `<title>` único (con el sufijo del sitio si cabe en 60 caracteres), una
descripción de 70 a 160 caracteres, un único bloque ld+json (`CollectionPage` en el índice y en el
crosswalk; `TechArticle` con `creativeWorkStatus: "Draft"` más un `DefinedTermSet` con un término por
control en cada perfil), su entrada en `SOURCE_BY_PATH`, su entrada en `llms.txt`, una regla en
`public/_headers` para el twin y ningún script inline. El `dateModified` del JSON-LD y el `lastmod`
del sitemap de cada perfil MUST salir de `profile.updated`, no de la fecha de git.

#### Scenario: Metadatos del perfil
- **WHEN** se abre `/controls/evaluation-environment`
- **THEN** la página tiene un solo ld+json cuyo `dateModified` es `profile.updated`, el twin `.md`
  existe con `canonical:` y `/llms.txt` lista la ruta

### Requirement: Línea de estado y llamada a revisión
Cada perfil SHALL mostrar bajo el H1 una línea de estado (`StatusLine`) con versión, estado,
revisión y fecha de actualización; con revisores vacíos MUST decir "Open for technical review". Cada
control SHALL ofrecer su JSON (`data-umami-event="control-download"`) y un enlace "Review this
control on GitHub" al formulario `control-review.yml`.

#### Scenario: Perfil sin revisores
- **WHEN** un perfil tiene la lista de revisores vacía
- **THEN** su línea de estado dice "Open for technical review" y ninguna página nombra a un revisor

### Requirement: Enlaces contextuales hacia los controles
Las páginas de patrón SHALL listar los controles que usan ese patrón ("Related controls") solo
cuando existen; las páginas de obligación SHALL listar "Open controls that evidence it" solo cuando
existen; `/resources/threats` SHALL enlazar el perfil desde la ficha de cada amenaza mapeada; `/stack`
SHALL mostrar "Controls anchored here" en las cinco capas con enlace a `/controls#layer-N`; `/agents`
y `/toolkit/agent-control-profile` SHALL enlazar `/controls/agent-runtime`; las fichas del glosario
acordadas SHALL añadir "In the open reference". Todo enlace MUST resolver en `check:links`.

#### Scenario: Patrón con controles
- **WHEN** se ejecuta `site/tests/bok-cross-links.spec.ts`
- **THEN** una página de patrón tiene `related-controls` si y solo si algún control la usa, y
  `/stack` muestra cinco veces "Controls anchored here"

### Requirement: Perfiles derivados del material del sitio
Los perfiles `data-admission-and-privacy` (`AIGE-CTL-DATA-NNN`, de 8 a 12 controles),
`deployment-and-monitoring` (`AIGE-CTL-DEPLOY-NNN`, de 10 a 15) y `assurance-and-evidence`
(`AIGE-CTL-ASSURE-NNN`, de 8 a 12) SHALL publicarse en v0.1, estado `draft`, revisión `open` y
revisores vacíos. Cada control SHALL ser `derived` (o `specified` si cumple ese nivel) y MUST
reformular material existente del sitio: `derivedFrom` MUST nombrar al menos un slug de patrón o id
de esquema de registro publicado que el control reformula, y la derivación MUST NOT añadir requisitos
que ese material no contiene. Los mapeos MUST usar solo ids presentes en `frameworks.ts`,
`threats.ts`, la lista de controles ISO/IEC 42001 y el índice público de AIUC-1; las referencias
MUST reutilizar filas existentes de `sources/SOURCES.md`.

#### Scenario: Trazabilidad a patrones y esquemas
- **WHEN** se ejecuta `site/tests/controls.spec.ts`
- **THEN** cada control de los tres perfiles derivados tiene al menos un `derivedFrom` que resuelve a
  `/patterns/<slug>` o a `/schemas/<id>.v1.json` y el número de controles de cada perfil está en su
  rango

### Requirement: Versión 0.2 del perfil de entorno de evaluación
El perfil `evaluation-environment` SHALL publicarse como v0.2 con una entrada de changelog que liste
los controles promovidos y los que siguen `stub` con su motivo. Sus revisores MUST seguir vacíos
salvo que `bok/CONTRIBUTORS.md` acredite una revisión real. Las observaciones de ejemplo MUST
presentarse como ilustrativas y MUST NOT afirmar que proceden de un adaptador en ejecución.

#### Scenario: Changelog de la promoción
- **WHEN** se abre `/controls/evaluation-environment#changelog`
- **THEN** la entrada v0.2 nombra cada control promovido y cada control que sigue en borrador
