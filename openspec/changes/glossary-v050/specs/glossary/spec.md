# Spec Delta

## Purpose

El glosario define una sola vez cada término del libro, con su fuente y la sección que lo
desarrolla, y da a cada término una página canónica citable; el capítulo 09 es la fuente única de la
que salen el índice del libro, las páginas por término, las tarjetas de contraste, las tarjetas de
hover y el endpoint JSON.

## ADDED Requirements

### Requirement: Entrada de glosario con fuente y ancla
Cada término de `bok/09-glossary.md` SHALL ser un párrafo `**Term.** definición` de 60 palabras como
máximo, seguido de una cláusula "See" con al menos un enlace a una sección existente del libro (o a
una ruta existente del sitio) y de la lista de capítulos `(ch. NN)`. Un término que procede de una
ley, una norma o un artículo MUST citar su fuente con `[n]` en el formato de la casa, y cada `[n]`
MUST existir en la lista `## Sources` del capítulo y en su sección de `sources/SOURCES.md`. Cuando
existe un par confundible, la entrada SHALL añadir "Contrast with" con enlaces a las páginas de los
otros términos. El texto MUST NOT contener el carácter U+2014.

#### Scenario: Incidente grave con las cuatro letras del art. 3(49)
- **WHEN** se lee la entrada "Serious incident"
- **THEN** enumera las cuatro consecuencias (a) a (d) del art. 3(49), cita el texto consolidado en
  EUR-Lex y enlaza la sección del capítulo 17 sobre incidente, riesgo, issue e incidente grave

#### Scenario: Ancla inexistente
- **WHEN** una cláusula "See" apunta a una sección que no existe
- **THEN** la comprobación de enlaces de la build falla

### Requirement: Página canónica por término
El sitio SHALL publicar `/glossary/<slug>` para cada término del glosario, generada en build desde
el capítulo, con la definición, sus fuentes renumeradas desde 1, las secciones que lo desarrollan,
los capítulos que lo usan con la primera sección de cada uno, los términos relacionados, las
tarjetas de contraste de sus pares y un bloque de cita. La página MUST declarar su propia URL como
canónica y MUST emitir un `DefinedTerm` cuyo `inDefinedTermSet` es
`https://aigovernanceengineer.com/bok/glossary#glossary`. Cada ruta SHALL figurar en
`SOURCE_BY_PATH` con `../bok/09-glossary.md` como fuente de su `lastmod`.

#### Scenario: Cita que no resuelve
- **WHEN** una definición cita un número que no está en la lista de fuentes
- **THEN** la build falla al generar la página del término

#### Scenario: Página de un término legal
- **WHEN** un lector abre `/glossary/serious-incident`
- **THEN** ve la definición con la cita `[1]` enlazada a su fila de fuentes, el enlace a
  "AI incident" como término contrastado y el desplegable "Cite this term"

### Requirement: Tarjetas de contraste
El capítulo SHALL incluir una tabla "Commonly confused pairs" con al menos los pares transparencia y
explicabilidad, procedencia y linaje de datos, deriva de datos y deriva de concepto, incidente e
issue, proveedor y responsable del despliegue, y human-in-the-loop y human-on-the-loop. El componente
`ContrastCards` SHALL renderizar esos pares desde la tabla, y la página de cada término de un par
MUST mostrar su tarjeta.

#### Scenario: Par confundible en la página del término
- **WHEN** un lector abre `/glossary/transparency`
- **THEN** ve una tarjeta que compara transparencia y explicabilidad con la diferencia y por qué
  importa para los controles, y un enlace a `/glossary/explainability`

### Requirement: Índice del libro y enlaces de términos
`/bok/glossary` SHALL seguir siendo el índice del glosario: cada párrafo de término MUST llevar el
id `t-…` del término y su nombre MUST enlazar a `/glossary/<slug>`. En el resto de capítulos, la
primera aparición de cada término SHALL enlazar a su página con `data-term` igual a su id `t-…`, y
`/glossary.json` SHALL dar para cada término `term`, `slug` (el id `t-…`), `definition` (240
caracteres como máximo), `url` (la página del término), `anchor` y `chapters`, de modo que la
tarjeta de hover lleve a la página del término.

#### Scenario: Enlace desde un capítulo
- **WHEN** un lector pasa el puntero por un término enlazado en `/bok/the-stack`
- **THEN** la tarjeta muestra la definición y su enlace apunta a `/glossary/<slug>`

### Requirement: Retirada del índice antiguo
`public/_redirects` SHALL redirigir `/resources/glossary` y `/glossary` a `/bok/glossary` con un
301. Mientras otras partes del sitio dependan de ella, la página `/resources/glossary` MAY seguir
construyéndose con las mismas anclas `t-…`, de modo que los fragmentos de enlaces antiguos
resuelvan también en `/bok/glossary`.

#### Scenario: Enlace antiguo con fragmento
- **WHEN** alguien abre `/resources/glossary#t-agent-registry` en el host
- **THEN** llega a `/bok/glossary#t-agent-registry`, que existe
