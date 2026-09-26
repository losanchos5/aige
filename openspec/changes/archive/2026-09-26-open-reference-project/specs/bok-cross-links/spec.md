# Spec Delta

## MODIFIED Requirements

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
