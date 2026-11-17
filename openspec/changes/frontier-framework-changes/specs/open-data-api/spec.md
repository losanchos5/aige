## ADDED Requirements

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
