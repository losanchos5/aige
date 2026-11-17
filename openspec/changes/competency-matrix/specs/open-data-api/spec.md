## ADDED Requirements

### Requirement: Conjunto competencies

La API SHALL publicar `/api/v1/competencies.json` con los peldaños, los flujos de trabajo (con sus
habilidades), las celdas (qué puede asumir la persona, evidencia y enlaces) y la banda de función de
la matriz de competencias, con el sobre común, su JSON Schema en `/api/v1/schemas/` y su entrada en
`index.json` y en `openapi.json`. El conjunto SHALL llevar el aviso de que la matriz es un modelo
del autor y no un estándar del sector.

#### Scenario: El conjunto está en el catálogo

- **WHEN** se pide `/api/v1/index.json`
- **THEN** lista `competencies` con la URL de su esquema y `/role/competencies` como su página

#### Scenario: Mismos datos que la página

- **WHEN** se cuentan las celdas de `/api/v1/competencies.json`
- **THEN** son las mismas 28 celdas y los mismos enunciados de función que muestra la página
