# Spec Delta

## Purpose

Los pósteres de referencia convierten en una sola imagen imprimible un área entera del Body of
Knowledge (el calendario del Reglamento de IA, los roles de operador, la escalera de riesgo y la
matriz de despliegue), generada desde los mismos datos que los capítulos, con el mismo contrato
visual, de accesibilidad y de fuentes que el resto de figuras.

## ADDED Requirements

### Requirement: Posters are generated from the data modules
Cada póster SHALL generarse en el build desde su módulo de datos (`frameworks.ts`, `roles.ts`,
`deployment-options.ts`) por `site/scripts/lib/posters.mjs`, y `figures-build.mjs --check` MUST fallar
cuando el SVG en disco no coincide con lo que generan los datos.

#### Scenario: Una fecha cambia en el registro de obligaciones
- **WHEN** una fila del Reglamento de IA en `frameworks.ts` cambia su `appliesFrom` o un `milestone`
- **THEN** el siguiente build redibuja `eu-ai-act-timeline` con la fecha nueva, y `--check` falla
  mientras el SVG comprometido no se regenere

#### Scenario: Celda de la matriz
- **WHEN** se compara `deployment-option-matrix` y su tabla con `deployment-options.ts`
- **THEN** cada celda de la tabla es literalmente el `control` de la celda de datos y sus palabras están
  en la imagen

### Requirement: Posters state only what their chapters state
Cada póster SHALL mostrar solo fechas, artículos, nombres y cifras que su capítulo de origen o su módulo
de datos enuncian, y su pie MUST terminar en «Drawn from chapter NN.» o «Drawn from chapters NN and
NN.». Las notas de otros regímenes de la escalera MUST limitarse a lo que dice el capítulo 21, y
Colorado MUST aparecer solo como nota de transparencia.

#### Scenario: Fechas del calendario
- **WHEN** la prueba recoge las fechas del calendario
- **THEN** cada fecha de una fila del Reglamento de IA en `frameworks.ts` está dibujada, y cualquier otra
  fecha está en el capítulo 18 o en el 08

#### Scenario: Notas laterales de la escalera
- **WHEN** se lee `eu-ai-act-risk-ladder`
- **THEN** las notas de Texas, Corea, Colorado y California repiten lo que dice el capítulo 21 y se
  titulan como «not equivalents»

### Requirement: Poster contract
Cada póster SHALL ser vertical A (`viewBox` 1000 × 1414), pesar 48 KB o menos, tener `kind: 'poster'`,
`asOf` y `reviewBy`, e imprimir su sello de fecha dentro de la imagen. MUST usar `role="img"` con
`aria-labelledby` que resuelve a `<title>` y `<desc>`, solo clases que mapean a tokens (sin
hexadecimales ni opacidad), un tamaño mínimo de 16 unidades, un `alt` de 50 a 160 caracteres, un título
de seis palabras o menos y ninguna raya larga U+2014.

#### Scenario: Comprobación de datos
- **WHEN** se ejecuta `site/tests/figures-posters.spec.ts`
- **THEN** los siete pósteres cumplen tamaño, formato, tokens, nombre accesible, tipografía y fórmula del
  pie

#### Scenario: Exportaciones
- **WHEN** el build escribe `/downloads/figures/<id>-v<version>*`
- **THEN** cada póster tiene sus tres SVG y cuatro PNG con la banda de atribución

### Requirement: Posters in chapters stay legible
Un póster colocado en un capítulo SHALL ocupar el ancho del pozo de lectura sin el tope de 560 px y, por
debajo de 760 px, desplazarse en horizontal dentro de una región con `role="region"`, `tabindex="0"` y
`aria-label`, sin desplazar la página. Su pie MUST enlazar a su permalink `/figures/<id>`.

#### Scenario: Teléfono de 390 px
- **WHEN** se abre `/bok/eu-ai-act` a 390 px de ancho
- **THEN** la página no tiene desplazamiento horizontal, el SVG del calendario mide al menos 760 px y la
  región se desplaza

#### Scenario: Colocación por encabezado
- **WHEN** se construyen los capítulos 08, 15 y 18
- **THEN** cada póster sigue inmediatamente a su encabezado («The post-Omnibus timeline», «EU AI Act,
  post-Omnibus», «Who you are in the value chain», «The risk ladder» y «The model-type by
  deployment-option matrix»)

### Requirement: Spanish editions
Los pósteres del calendario, de los roles y de la escalera SHALL tener una edición en español con id
terminado en `-es`, el mismo diseño y las mismas fechas, el texto traducido con los términos oficiales
de la versión española del Reglamento (UE) 2024/1689, raíz `lang="es"`, `<title>` y `<desc>` marcados
`lang="en"` y el sello «A fecha de <asOf>». Las ediciones en español MUST aparecer en `/figures` y
MUST NOT colocarse en capítulos en inglés, y sus SVG descargables MUST conservar `lang="es"`.

#### Scenario: Galería y capítulos
- **WHEN** se abre `/figures` y los capítulos 08, 15 y 18
- **THEN** las tres ediciones `-es` están en la galería y en ningún capítulo

#### Scenario: Mismas fechas
- **WHEN** se comparan las fechas de una edición `-es` con las de su póster en inglés
- **THEN** son las mismas
