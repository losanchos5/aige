# governance-toolkit Specification

## Purpose
El toolkit convierte capítulos del Body of Knowledge en herramientas que se usan en el navegador:
cada herramienta figura en un registro, comparte una base común (aviso fijo, estado en la URL,
exportaciones en formatos abiertos, impresión y accesibilidad) y no envía a ningún servidor nada
de lo que escribe el usuario. La primera es la autoevaluación de madurez del capítulo 07.

## Requirements

### Requirement: Registro de herramientas
El sitio SHALL mantener en `site/src/data/toolkit.ts` una entrada por herramienta con `id`,
`title`, `summary`, `audience`, `inputs`, `outputs`, `status` (`live` o `planned`) y `href` igual a
`/toolkit/<id>`. La página `/toolkit` SHALL listar todas las entradas del registro y MUST enlazar
solo las que tienen `status: 'live'`.

#### Scenario: Herramienta planificada
- **WHEN** una entrada del registro tiene `status: 'planned'`
- **THEN** `/toolkit` la muestra como planificada sin enlace y la build no falla en la comprobación
  de enlaces

#### Scenario: Herramienta publicada
- **WHEN** una entrada tiene `status: 'live'`
- **THEN** `/toolkit` enlaza su `href` y la página existe en la build

### Requirement: Envoltorio común con aviso fijo
Cada página de herramienta SHALL renderizarse dentro de `ToolShell`, que MUST mostrar el aviso
"Indicative, not legal advice and not a conformity claim. Nothing you enter leaves your browser."
antes del formulario, cargar el script de la herramienta como fichero externo del mismo origen y
renderizar en el servidor el contenido didáctico, de modo que la página enseñe su contenido sin
JavaScript. Sin JavaScript, la página SHALL decir que el resultado en vivo y las exportaciones lo
necesitan.

#### Scenario: Sin JavaScript
- **WHEN** se abre `/toolkit/maturity-self-check` con JavaScript desactivado
- **THEN** se leen el aviso fijo, los criterios de cada capa, las métricas por nivel, la lista de
  autoevaluación y cómo leer el suelo a mano, y un aviso indica que el resultado en vivo necesita
  JavaScript

#### Scenario: Impresión
- **WHEN** se imprime una herramienta con un resultado calculado
- **THEN** se imprimen el aviso, el resultado y la guía, y no se imprimen la cabecera, el pie ni los
  botones de exportación

### Requirement: Utilidades de cliente compatibles con la CSP
`site/public/toolkit/lib.js` SHALL ser un módulo ES sin dependencias que las herramientas importan
para el estado en el fragmento de la URL, el almacenamiento local seguro (sin excepciones cuando
`localStorage` no está disponible), las descargas con `Blob` y `<a download>`, el portapapeles y la
exportación de un SVG en línea a PNG a través de un `data:` URL y un `canvas`. Ninguna herramienta
MUST usar scripts en línea, código de terceros ni peticiones de red con los datos del usuario, y
`site/public/_headers` no MUST relajarse para ello.

#### Scenario: CSV con comillas
- **WHEN** una celda contiene una coma, unas comillas dobles o un salto de línea
- **THEN** el CSV la encierra entre comillas dobles, duplica las comillas internas y separa los
  registros con CRLF (RFC 4180)

#### Scenario: Calendario de días completos
- **WHEN** se genera un `.ics` con un evento de un día
- **THEN** el fichero lleva `VERSION:2.0` y `PRODID`, el evento lleva `UID`, `DTSTAMP` en UTC,
  `DTSTART;VALUE=DATE` y un `DTEND;VALUE=DATE` exclusivo al día siguiente, el texto escapa barra
  invertida, punto y coma, coma y salto de línea, las líneas terminan en CRLF y ninguna supera 75
  octetos sin plegar (RFC 5545)

#### Scenario: PNG sin blob en img-src
- **WHEN** se exporta a PNG el perfil de madurez
- **THEN** el SVG se carga como `data:image/svg+xml`, se dibuja en un `canvas` y se descarga como
  `data:image/png`, sin infringir la CSP

### Requirement: Autoevaluación de madurez por capa
`/toolkit/maturity-self-check` SHALL pedir, para cada una de las cinco capas del stack, el criterio
observable más alto que se cumple hoy, tomado literalmente de la tabla "Observable criteria, by
layer and level" del capítulo 07, o "ninguno todavía". El resultado SHALL ser el perfil por capa
dibujado en un SVG en línea con una alternativa textual, el suelo (el nivel de la capa más débil y
las capas que lo fijan) y un único siguiente paso: el criterio del nivel siguiente en la capa más
débil (la primera en orden de construcción si hay empate), con las métricas del salto, las
preguntas de la lista de autoevaluación de ese nivel y un enlace a un patrón
`/bok/patterns#pattern-*`. La herramienta MUST NOT mostrar una puntuación única, insignias, sellos
ni lenguaje de certificado.

#### Scenario: Perfil irregular
- **WHEN** las respuestas son Govern-as-Code 3, Inventory & Transparency 4, Evals 2, Runtime 3 y
  Assurance 2
- **THEN** el suelo es el nivel 2 fijado por Evals & Red Teaming as Evidence y Assurance &
  Continuous Compliance, y el siguiente paso sube Evals & Red Teaming as Evidence al nivel 3 ("Evals
  run, results stored, non-blocking") con enlace a un patrón del capítulo 05

#### Scenario: Capa sin responder
- **WHEN** se pide el resultado con alguna capa sin responder
- **THEN** aparece un resumen de errores que recibe el foco, enlaza cada capa pendiente y cada
  `fieldset` pendiente muestra su texto de error

#### Scenario: Todas las capas en el nivel 5
- **WHEN** las cinco capas están en el nivel 5
- **THEN** no hay nivel siguiente y la herramienta propone mantenerlo (frescura de la evidencia y
  métricas del salto 4 → 5) en lugar de un paso inexistente

### Requirement: Estado, exportaciones y comparación
La herramienta SHALL guardar sus respuestas en el fragmento de la URL, de forma que abrir el enlace
copiado reproduzca el mismo resultado, y SHALL exportar un perfil JSON con `kind:
"aige.maturity-profile"` y `version: 1`, un informe Markdown con el aviso fijo y la imagen del
perfil en SVG y PNG. Al importar un JSON, la herramienta MUST validar `kind`, `version` y los
niveles, y MUST recalcular el suelo y el siguiente paso en lugar de leerlos del fichero. Los
perfiles guardados en el navegador SHALL poder compararse de dos en dos, capa por capa.

#### Scenario: Ida y vuelta del JSON
- **WHEN** se exporta un perfil a JSON y se importa ese fichero
- **THEN** los niveles por capa, el suelo y el siguiente paso son los mismos

#### Scenario: Fichero no válido
- **WHEN** se importa un JSON sin `kind` correcto o con un nivel fuera de 0 a 5
- **THEN** un texto de error junto al control explica el motivo y el formulario no cambia

#### Scenario: Comparación
- **WHEN** se comparan dos perfiles guardados
- **THEN** una tabla muestra por capa el nivel de cada uno y la diferencia, el SVG dibuja ambos y se
  indica cómo cambió el suelo
