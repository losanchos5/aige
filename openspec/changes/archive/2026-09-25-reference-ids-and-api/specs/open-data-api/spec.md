## ADDED Requirements

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
