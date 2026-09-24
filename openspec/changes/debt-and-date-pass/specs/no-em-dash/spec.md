# Spec Delta

## Purpose

La regla de estilo que prohíbe la raya (U+2014) se aplica a todo el repositorio versionado, no solo
al HTML publicado, para que ningún texto nuevo la herede de un fichero existente.

## ADDED Requirements

### Requirement: Sin rayas en ficheros versionados
Ningún fichero de texto versionado SHALL contener el carácter U+2014, con dos excepciones: `LICENSE`
(texto legal) y `site/package-lock.json` (generado). Donde el código necesita el carácter (el lint
de contenido, la limpieza de los visores de diagramas, la medida de texto de los SVG, los analizadores
de Markdown y del changelog), MUST usar el escape `—` en lugar del carácter literal.

#### Scenario: Búsqueda en el repositorio
- **WHEN** se ejecuta `git grep -I -n -P '\x{2014}'` en la raíz
- **THEN** no devuelve ninguna línea fuera de los dos ficheros exentos

#### Scenario: Lint de contenido intacto
- **WHEN** una página publicada contiene una raya
- **THEN** `content-lint.mjs` la sigue detectando, porque su expresión regular usa `—`
