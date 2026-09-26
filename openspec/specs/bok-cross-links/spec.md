# bok-cross-links Specification

## Purpose
El libro se lee como una red: cada enlace lleva a la sección que trata el tema, cada patrón se enlaza
por su propia página y los capítulos de la primera parte conducen a los capítulos que desarrollan lo
que presentan.

## Requirements

### Requirement: Enlaces entre capítulos por sección
Los enlaces de prosa entre capítulos del libro SHALL apuntar a una sección (`/bok/<slug>#<ancla>`) y
no a la ruta desnuda del capítulo. Toda ancla MUST existir como encabezado en el HTML construido, y
ningún H2 o H3 existente MUST renombrarse para conseguirlo.

Los enlaces desde un capítulo hacia el proyecto abierto (`/controls`, los perfiles, `/frontier` y
`/cases#from-incident-to-control`) SHALL ser mobiliario renderizado por la plantilla de capítulo
después de la prosa, en una sección `chapter-related` cuyo encabezado "Related in the open
reference" lleva el id `related-open-reference`, generada desde un único módulo de datos (`site/src/data/chapter-links.ts`), excluida de
Pagefind e incluida en el índice de la página. En v0.1 SHALL aparecer solo en `the-stack`,
`maturity-model`, `governing-development`, `incidents` y `governing-agents`. Añadir este mobiliario
MUST NOT editar ningún fichero `bok/*.md` ni cambiar el lastmod de los capítulos en el sitemap; cada
clave del módulo MUST ser un capítulo existente y cada href y ancla MUST resolver.

#### Scenario: Ninguna ruta desnuda
- **WHEN** se buscan enlaces `](/bok/<slug>)` sin ancla en los capítulos 00 a 04, 06, 07 y 11 a 23
- **THEN** no aparece ninguno

#### Scenario: El build valida las anclas
- **WHEN** se ejecuta `bash D:/Documents/aige-wt/build.sh`
- **THEN** check-links termina sin enlaces ni anclas rotos y el build sale con código 0

#### Scenario: Mobiliario tras la prosa
- **WHEN** se ejecuta `site/tests/bok-cross-links.spec.ts`
- **THEN** `related-open-reference` aparece solo en los capítulos del módulo, después de la prosa, sus
  hrefs resuelven y ningún `bok/*.md` aparece modificado en el cambio

### Requirement: Patrones enlazados por su página
Un enlace de capítulo a un patrón que tiene página SHALL apuntar a `/patterns/<slug>`. Las anclas
`/bok/patterns#pattern-*` MUST seguir resolviendo en el catálogo, y MAY quedar en las líneas que otro
bloque edita en paralelo hasta la siguiente pasada.

#### Scenario: Tabla de amenazas del capítulo 23
- **WHEN** se abre `/bok/governing-agents` y se lee la tabla de amenazas ASI01 a ASI10
- **THEN** tiene al menos diez enlaces a patrones, a su página o a su ancla del catálogo

### Requirement: Los capítulos de la disciplina conducen a los capítulos nuevos
Donde los capítulos 01 a 07 presentan un tema que un capítulo posterior desarrolla (riesgo, ciclo de
vida, equidad, incidentes, AI Act, privacidad, agentes), SHALL enlazar la sección de ese capítulo, con
un enlace por tema y capítulo como máximo.

#### Scenario: Los agentes en el capítulo 01
- **WHEN** el capítulo 01 describe los agentes como objeto de gobierno
- **THEN** enlaza `/bok/governing-agents#what-makes-an-agent-a-governance-object`

### Requirement: Prefacio y esquema con cinco partes
El prefacio SHALL tener una sección «How to use this book» que enlaza las cinco partes
(`/bok#part-<id>`) y una ruta de entrada por audiencia en «Who should read this»; los hubs `/for` se
describen sin enlace mientras no existan en la rama. `OUTLINE.md` SHALL listar los 24 capítulos por
parte, con brief para cada uno, sin cambiar la versión declarada.

#### Scenario: Prefacio
- **WHEN** se abre `/bok/preface`
- **THEN** la sección «How to use this book» enlaza las cinco partes del índice del libro
