## ADDED Requirements

### Requirement: Conjuntos frontier-crosswalk y frontier-changes

La API SHALL publicar `/api/v1/frontier-crosswalk.json` (documentos, columnas, dimensiones,
referencias, huecos y fuentes del crosswalk de seguridad de frontera) y
`/api/v1/frontier-changes.json` (versiones, transiciones, cambios y fuentes del historial de
cambios), ambos con el sobre común, su JSON Schema en `/api/v1/schemas/` y su entrada en
`index.json` y en `openapi.json`. El contenido de cada conjunto SHALL ser el mismo que el de su
export en `/resources/`.

#### Scenario: Los conjuntos están en el catálogo

- **WHEN** se pide `/api/v1/index.json`
- **THEN** lista `frontier-crosswalk` y `frontier-changes` con la URL de su esquema

#### Scenario: Mismos datos que el export

- **WHEN** se comparan las referencias de `/api/v1/frontier-crosswalk.json` con las de
  `/resources/frontier-safety-crosswalk.json`
- **THEN** son las mismas
