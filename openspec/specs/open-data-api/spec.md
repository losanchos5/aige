# open-data-api Specification

## Purpose
Una API estática y versionada bajo `/api/v1/` publica los datasets del sitio (obligaciones, marcos,
crosswalk, glosario, patrones y demás) con un sobre común de aviso, licencia y DOI, una descripción
OpenAPI y un JSON Schema por documento, para que se reutilicen y se citen.

## Requirements

### Requirement: API estática versionada
El sitio SHALL publicar bajo `/api/v1/` un `index.json` (catálogo), un JSON por conjunto de datos
(`obligations`, `frameworks`, `crosswalk`, `glossary`, `patterns`, `maturity`, `path`, `chapters`,
`jurisdictions`, `harms`, `cases`, `contracts`, `roles`), un `obligations/<id>.json` por fila, un
`openapi.json` (OpenAPI 3.1) y un esquema JSON (draft 2020-12) por documento en
`/api/v1/schemas/<nombre>.json`. Las descargas existentes (`/resources/*.json`, `/resources/*.csv`,
`/glossary.json`) MUST seguir en sus URL.

#### Scenario: Catálogo completo
- **WHEN** se pide `/api/v1/index.json`
- **THEN** lista cada conjunto con su `schemaVersion`, su URL, su esquema y su página, y enlaza
  `openapi.json` y la plantilla `obligations/{id}.json`

#### Scenario: Cada documento valida contra su esquema
- **WHEN** se ejecuta `site/tests/api.spec.ts` sobre `dist`
- **THEN** cada JSON de `/api/v1/` valida contra el esquema que nombra su campo `schema`, y cada
  registro es un objeto cerrado (sin campos que el esquema no declare)

### Requirement: Sobre común
Todo documento de la API SHALL llevar `notice` (con "not a claim of conformity"), `version`,
`license`, `licenseUrl`, `schemaVersion`, `schema`, `self`, `source` y `citation` (título, autores,
DOI de la versión y DOI de concepto). `/resources/obligations.json` SHALL llevar el mismo sobre con
`schemaVersion: 2`.

#### Scenario: El aviso viaja con los datos
- **WHEN** se copia cualquier JSON de `/api/v1/` a otro sistema
- **THEN** el campo `notice` dice que el mapeo es ilustrativo y no una declaración de conformidad

### Requirement: Cabeceras de acceso
`site/public/_headers` SHALL servir `/api/v1/*` y los conjuntos de datos existentes con
`Access-Control-Allow-Origin: *` y `Cache-Control: public, max-age=3600`, y MUST NOT debilitar el
bloque de Content-Security-Policy.

#### Scenario: CORS abierto sin tocar la CSP
- **WHEN** se lee `dist/_headers`
- **THEN** hay un bloque `/api/v1/*` con ambas cabeceras y la línea de CSP de `/*` es idéntica a la
  anterior

### Requirement: Documentación de los datos abiertos
El sitio SHALL publicar `/resources/data` con la tabla de endpoints generada desde el mismo
registro que la API, el sobre, la regla de ids con los códigos de instrumento, la promesa de
versionado y estabilidad, el acceso (CORS, caché), ejemplos `curl` y cómo citar con el DOI.

#### Scenario: La tabla no puede desincronizarse
- **WHEN** se añade un conjunto al registro de `site/src/lib/api.ts`
- **THEN** aparece a la vez en `/api/v1/index.json`, en `openapi.json`, en su esquema y en la tabla
  de `/resources/data`

### Requirement: Conjunto dpia-lists con metadatos de contribución
La API SHALL publicar `/api/v1/dpia-lists.json` con el sobre común (licencia CC BY 4.0), su esquema
en `/api/v1/schemas/dpia-lists.json`, su entrada en `index.json` y `openapi.json` y su fila en la
tabla de `/resources/data`. El documento MUST llevar `contributors` (nombre, rol y etiqueta, con
Aurélie Pols en el rol de idea) y `reviewers` (lista, vacía mientras no haya una revisión
registrada).

#### Scenario: Validación del documento
- **WHEN** se ejecuta `site/tests/api.spec.ts` sobre `dist`
- **THEN** `dpia-lists.json` valida contra su esquema y su catálogo lo enlaza

#### Scenario: Revisión futura
- **WHEN** se registra una revisión del dataset
- **THEN** basta con añadir la persona a `reviewers` para que el JSON y la página la muestren

### Requirement: Conjuntos frontier-crosswalk y frontier-changes

La API SHALL publicar `/api/v1/frontier-crosswalk.json` (documentos, columnas, dimensiones,
referencias, huecos y fuentes del crosswalk de seguridad de frontera) y
`/api/v1/frontier-changes.json` (versiones, transiciones, cambios y fuentes del historial de
cambios), ambos con el sobre común, su JSON Schema en `/api/v1/schemas/` y su entrada en
`index.json` y en `openapi.json`. Los datos de cada conjunto SHALL ser los mismos que los de su
export en `/resources/`; las fuentes SHALL seguir la forma común de la API (`n`, `text`, `url`,
`verified`). `frontier-changes` SHALL llevar, además del aviso común del sobre, el aviso propio del
historial (describe documentos publicados, no es exhaustivo y no afirma nada sobre la conducta de
ningún lab).

#### Scenario: Los conjuntos están en el catálogo

- **WHEN** se pide `/api/v1/index.json`
- **THEN** lista `frontier-crosswalk` y `frontier-changes` con la URL de su esquema

#### Scenario: Mismos datos que el export

- **WHEN** se comparan las referencias de `/api/v1/frontier-crosswalk.json` con las de
  `/resources/frontier-safety-crosswalk.json`
- **THEN** son las mismas
- **WHEN** se comparan los cambios de `/api/v1/frontier-changes.json` con los de
  `/resources/frontier-framework-changes.json`
- **THEN** son los mismos

#### Scenario: El aviso del historial viaja con la API

- **WHEN** se copia `/api/v1/frontier-changes.json` a otro sistema
- **THEN** el documento dice que describe documentos publicados y que no afirma nada sobre la
  conducta de ningún lab
