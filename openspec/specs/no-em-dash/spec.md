# no-em-dash Specification

## Purpose
La regla de estilo que prohíbe la raya (U+2014) se aplica a todo el repositorio versionado, no solo
al HTML publicado, para que ningún texto nuevo la herede de un fichero existente.

## Requirements

### Requirement: Sin rayas en ficheros versionados
Ningún fichero de texto versionado SHALL contener el carácter U+2014, con dos excepciones: `LICENSE`
(texto legal) y `site/package-lock.json` (generado). Donde el código necesita el carácter (el lint
de contenido, la limpieza de los visores de diagramas, la medida de texto de los SVG, los analizadores
de Markdown y del changelog), MUST usar el escape `\u2014` en lugar del carácter literal.

#### Scenario: Búsqueda en el repositorio
- **WHEN** se ejecuta `git grep -I -n -P '\x{2014}'` en la raíz
- **THEN** no devuelve ninguna línea fuera de los dos ficheros exentos

#### Scenario: Lint de contenido intacto
- **WHEN** una página publicada contiene una raya
- **THEN** `content-lint.mjs` la sigue detectando, porque su expresión regular usa `\u2014`

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
