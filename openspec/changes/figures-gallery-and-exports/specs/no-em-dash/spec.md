# Spec Delta

## ADDED Requirements

### Requirement: Lint de ficheros publicados no HTML
`site/scripts/content-lint.mjs` SHALL aplicar la regla de la raya (U+2014, literal, como secuencia
de escape de JSON o CSS, o como entidad HTML) y las frases prohibidas a todos los ficheros de
texto publicados en `dist` con extensión `.svg`, `.json`, `.csv`, `.txt`, `.xml` o `.md`, y al
texto de los fragmentos `tEXt`/`iTXt` de los PNG bajo `dist/downloads/`, excepto los visores de
`dist/diagrams` y el índice de `dist/pagefind`. El lint MUST informar del número de ficheros de
cada tipo analizados.

#### Scenario: Raya en una exportación de datos
- **WHEN** un JSON o CSV publicado contiene una raya
- **THEN** `npm run lint:content` falla y nombra el fichero con el contexto de la raya

#### Scenario: Raya en los metadatos de un PNG
- **WHEN** el texto `iTXt` de una descarga PNG contiene una raya
- **THEN** el lint falla igual que si estuviera en una página HTML
