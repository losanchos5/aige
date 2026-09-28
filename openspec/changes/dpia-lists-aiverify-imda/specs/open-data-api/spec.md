# Spec Delta

## ADDED Requirements

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
