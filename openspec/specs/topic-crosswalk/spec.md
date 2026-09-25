# topic-crosswalk Specification

## Purpose
El crosswalk tema × marco responde qué artículo, cláusula o control de cada instrumento trata un
tema de gobernanza de IA, y el explorador responde la pregunta inversa del lector que parte de un
marco: dónde lo cubre otro, dónde no, y cómo llevarse ese mapeo a una herramienta en OSCAL. Todo
mapeo es ilustrativo, no una afirmación de conformidad.

## Requirements

### Requirement: Dataset tipado de temas, columnas y referencias
El sitio SHALL definir en `site/src/data/crosswalk.ts` al menos 25 temas, 14 columnas y una lista de
referencias donde cada una tiene tema, marco, cláusula, título, `strength` (`core` o `related`),
`verified` y URL. Los doce `id` de tema de la v0.4 MUST conservarse en el mismo orden al principio de
la lista, porque sus anclas `#topic-<id>` las usan el mapa, la ruta y enlaces publicados. Todo marco
referenciado MUST resolverse en `frameworks.ts` o en `crosswalkInstruments`, y si ambos tienen el
mismo `id` MUST ganar `frameworks.ts`. Cada columna agrupa uno o varios marcos; las columnas con
varios marcos SHALL prefijar las fichas desde `chipPrefix`.

#### Scenario: Anclas estables
- **WHEN** un enlace publicado apunta a `/resources/crosswalk#topic-risk-management`
- **THEN** la página v2 tiene ese `id` y la fila de riesgo sigue siendo la primera de la matriz

#### Scenario: Instrumento aún no presente en frameworks.ts
- **WHEN** una referencia usa el marco `gdpr` y `frameworks.ts` no lo define
- **THEN** `frameworkById('gdpr')` devuelve la entrada de `crosswalkInstruments` y la columna GDPR
  la muestra

### Requirement: Verificación honesta de cada referencia
Una referencia SHALL llevar `verified: true` solo si la cláusula se comprobó contra su texto
primario (o contra la comprobación primaria del mismo día de un capítulo hermano, como permite
`STYLEGUIDE.md` §6). Si no se pudo abrir el texto primario (cláusulas ISO/IEC, borradores prEN), la
referencia MUST llevar `verified: false` y una nota que diga por qué. Los enlaces de la Ley de IA
MUST apuntar al texto consolidado de EUR-Lex con el ancla del artículo o anexo.

#### Scenario: Cláusula ISO leída en un crosswalk de terceros
- **WHEN** el identificador y el título de una cláusula de ISO/IEC 42001 solo constan en un crosswalk
  publicado por un tercero
- **THEN** la referencia lleva `verified: false`, la ficha muestra "?" y la nota nombra la fuente

#### Scenario: Enlace a un anexo
- **WHEN** una referencia cita el anexo XI de la Ley de IA
- **THEN** su URL es el texto consolidado de 2026-07-27 con el ancla `#anx_XI`

### Requirement: Identificador de cláusula apto para OSCAL
Cada referencia SHALL exponer un `clauseId` que sea un token NCName, único dentro de su marco y
estable entre versiones del dataset. Para CSA AICM el `clauseId` MUST seguir los identificadores del
catálogo OSCAL que publica CSA (`A&A-01` pasa a `A_A-01`).

#### Scenario: Cláusula numérica
- **WHEN** la cláusula es `6.1.2` de ISO/IEC 42001
- **THEN** su `clauseId` es `_6.1.2`

### Requirement: Matriz con selector de columnas
La matriz de `/resources/crosswalk` SHALL mostrar por defecto las cuatro columnas de la v0.4 (`eu`,
`iso`, `nist`, `cn`) y un selector de columnas que muestra u oculta cualquiera de las 14, recordado en
el navegador con `localStorage` protegido con `try/catch`. Sin JavaScript MUST verse todas las
columnas. A 390 px de ancho la página MUST NOT tener desplazamiento horizontal, aunque estén todas
las columnas activas.

#### Scenario: Añadir una columna
- **WHEN** el lector marca "GDPR" en el selector
- **THEN** la cabecera y las celdas de la columna GDPR se ven, y siguen viéndose tras recargar

#### Scenario: Sin JavaScript
- **WHEN** la página se carga con JavaScript desactivado
- **THEN** se ven las 14 cabeceras de columna y el selector queda oculto

### Requirement: Explorador cláusula a cláusula
El sitio SHALL publicar en `/resources/crosswalk#explore` un explorador, servido desde
`public/crosswalk-explorer.js` sin scripts en línea, que lee `/resources/crosswalk.json` y permite
elegir uno o varios marcos de origen y un marco de destino, filtrar por tema y por referencias
verificadas, y ver dos vistas: lado a lado por tema, y huecos (cláusulas del destino, dentro del
crosswalk, que ningún origen elegido alcanza). Dos cláusulas MUST emparejarse solo cuando el
crosswalk las archiva bajo el mismo tema, y la relación derivada MUST ser `intersects-with`. La
selección SHALL escribirse en el fragmento de la URL (`#explore?src=...&tgt=...`) solo después de
que el lector elija algo o llegue con un enlace `#explore`, y un enlace con ese fragmento MUST
restaurar la selección.

#### Scenario: Enlace compartido
- **WHEN** el lector abre `/resources/crosswalk#explore?src=kr-ai-basic-act&tgt=iso-42001&view=gaps`
- **THEN** el formulario muestra Corea como origen, ISO/IEC 42001 como destino y la vista de huecos,
  y la lista de huecos no está vacía

#### Scenario: Solo verificadas
- **WHEN** el lector marca "Verified references only"
- **THEN** ninguna ficha del resultado lleva la marca de no verificada

### Requirement: Descargas de la selección en CSV, JSON y OSCAL
El explorador SHALL descargar la selección en CSV, JSON y como colección de mapeos OSCAL 1.2.3
(modelo Control Mapping de NIST): `mapping-collection` con `uuid`, `metadata` (`title`,
`last-modified`, `version`, `oscal-version`), `provenance` (`method`, `matching-rationale`,
`status`, `mapping-description`) y una `mapping` por marco de origen con `source-resource`,
`target-resource`, `maps` y resúmenes de huecos. Cada fichero MUST decir "illustrative, not a claim
of conformity" dentro del propio fichero. Los ficheros MUST construirse en el navegador y guardarse
con un enlace de descarga, sin mostrar nada desde una URL `blob:` (la CSP no admite `blob:` en
`img-src`).

#### Scenario: Exportación OSCAL
- **WHEN** el lector descarga OSCAL con la Ley de IA y CSA AICM como orígenes e ISO/IEC 42001 como
  destino
- **THEN** el fichero valida contra el esquema JSON de OSCAL 1.2.3, tiene dos `mappings`, cada
  `map` usa `intersects-with`, y el título y la procedencia llevan el aviso

#### Scenario: Sin pares
- **WHEN** no hay ningún origen elegido
- **THEN** el botón de OSCAL queda desactivado y el resultado pide elegir un origen

### Requirement: Exportaciones del dataset con versión de esquema
`/resources/crosswalk.json` y `/resources/crosswalk.csv` SHALL seguir en las mismas URL con
`schemaVersion` 2. El JSON MUST conservar todos los campos de la v1 y añadir `asOf`, `columns`,
`frameworks`, los enlaces `read` de cada tema y, por referencia, `clauseId`, `column`,
`frameworkShort` y `see`. El CSV MUST conservar sus nueve columnas v1 en el mismo orden y añadir las
nuevas al final. Ambos MUST llevar el aviso "not a claim of conformity".

#### Scenario: Lector de la v1
- **WHEN** un script que lee el CSV por posición de columna procesa la versión 2
- **THEN** las nueve primeras columnas significan lo mismo que en la v1
