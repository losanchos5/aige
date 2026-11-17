## Purpose

Un registro mantenido de las versiones y de los cambios materiales de los marcos de seguridad de
frontera de Anthropic, OpenAI y Google DeepMind, descrito de forma neutral y enlazado a las
dimensiones del crosswalk de frontera, para que se pueda citar qué cambió, cuándo y dónde.

## ADDED Requirements

### Requirement: Historial de versiones verificable

El dataset SHALL listar, para Anthropic RSP, OpenAI Preparedness Framework y Google DeepMind FSF,
cada versión publicada conocida con la etiqueta y la fecha tal como las da el documento. Por cada
fichero recuperado SHALL dar su URL, la fecha de recuperación y su SHA-256. Cuando un lab haya
publicado más de un fichero bajo la misma etiqueta de versión, el dataset SHALL listar cada fichero
por separado. Una versión cuyo documento no se pudo recuperar MUST aparecer sin hash y marcada como
no recuperada. Un hash tomado de un tercero MUST llevar su fuente y quedar marcado como verificación
secundaria.

#### Scenario: Comprobación de un fichero

- **WHEN** alguien descarga el documento de la URL listada y calcula su SHA-256
- **THEN** el resultado coincide con el hash listado, o difiere y eso indica que el fichero cambió
  después de la fecha de recuperación que muestra la página

#### Scenario: Reedición bajo la misma etiqueta

- **WHEN** existen dos ficheros distintos publicados con la misma etiqueta de versión
- **THEN** la versión muestra los dos, cada uno con su hash y su fecha, y no afirma qué cambió entre
  ellos si no se han comparado

#### Scenario: Hash de terceros

- **WHEN** un hash procede de un corpus ajeno y no de una descarga propia
- **THEN** el fichero lleva la fuente citada y la marca de verificación secundaria

### Requirement: Transiciones y cobertura declarada

El dataset SHALL listar toda transición entre versiones consecutivas de cada marco e indicar para
cada una si sus cambios están registrados. La página SHALL decir qué transiciones están cubiertas y
cuáles no, y MUST NOT presentar el registro como exhaustivo.

#### Scenario: Transición no cubierta

- **WHEN** una transición todavía no tiene sus cambios registrados
- **THEN** aparece en la lista con el estado "no cubierta" y sin cambios, no se omite

#### Scenario: Aviso de alcance

- **WHEN** un lector abre la sección de método de la página
- **THEN** lee cuántas transiciones hay, cuántas están cubiertas y que la comparación puede no
  recoger todos los cambios

### Requirement: Cambios materiales por transición

Para cada transición cubierta, el dataset SHALL registrar cada cambio material con un identificador
estable, el tipo (`added`, `removed`, `modified` o `relocated`), la sección, un resumen de una o dos
frases, la cita literal del texto anterior y del posterior (25 palabras como máximo cada una) con su
URL (con `#page=` en los PDF) y las dimensiones del crosswalk de frontera afectadas. Es material un
cambio que altera un compromiso, un umbral, un disparador, una salvaguarda, un rol, un deber de
informar o una definición. Los cambios de formato, numeración u ortografía MUST NOT registrarse.

#### Scenario: Citas según el tipo de cambio

- **WHEN** un cambio es `added`
- **THEN** lleva la cita del texto posterior
- **WHEN** un cambio es `removed` o `relocated`
- **THEN** lleva la cita del texto anterior, y si es `relocated` dice a qué documento se movió
- **WHEN** un cambio es `modified`
- **THEN** lleva las dos citas

#### Scenario: Dato incoherente

- **WHEN** un cambio nombra una dimensión, una versión o una transición que no existe, o una cita
  supera las 25 palabras
- **THEN** la construcción del sitio falla con un mensaje que identifica el cambio

### Requirement: Descripción neutral

El registro MUST NOT puntuar, ordenar ni calificar un cambio como mejora o retroceso. Cada resumen
SHALL describir qué dice el texto antes y qué dice después. La página SHALL llevar un aviso de que
describe documentos publicados y no la conducta del lab ni su conformidad con ninguna norma.

#### Scenario: Vocabulario valorativo

- **WHEN** el resumen de un cambio contiene un término valorativo de la lista vetada
- **THEN** la construcción del sitio falla e identifica el cambio

### Requirement: Divulgación por el propio lab

Cada cambio SHALL indicar si las notas de versión del propio lab lo mencionan, con uno de estos
valores: `listed`, `partly-listed`, `not-listed` o `no-changelog`. Cada transición SHALL enlazar las
notas de versión o el documento con cambios marcados cuando el lab los publique.

#### Scenario: Cambio que el lab no lista

- **WHEN** el lab publicó notas de versión para la transición y un cambio registrado no figura en
  ellas
- **THEN** el cambio aparece como `not-listed` y la transición enlaza esas notas

#### Scenario: Transición sin notas de versión

- **WHEN** el lab no publicó ninguna relación de cambios para la transición
- **THEN** todos sus cambios aparecen como `no-changelog`

### Requirement: Página del historial

`/resources/frontier-framework-changes` SHALL mostrar la fecha de la última comprobación, la tabla
de versiones de cada marco con la más reciente primero, los cambios agrupados por transición, el
método, los límites, las fuentes, las descargas y la cita. Cada cambio y cada transición SHALL tener
un ancla estable. Todo el contenido SHALL leerse sin JavaScript.

#### Scenario: Enlace permanente a un cambio

- **WHEN** se abre la URL de la página con el ancla de un cambio
- **THEN** el navegador sitúa ese cambio a la vista, con su transición identificable

#### Scenario: Sin JavaScript

- **WHEN** se carga la página con JavaScript desactivado
- **THEN** las versiones, las transiciones y los cambios están completos en el HTML

### Requirement: Descargas del historial

La página SHALL ofrecer `/resources/frontier-framework-changes.json` y `.csv` con el aviso, la
versión de esquema, la fecha de la última comprobación, la licencia y la cita. El JSON SHALL incluir
versiones, transiciones, cambios y fuentes. El CSV SHALL tener una fila por cambio.

#### Scenario: Los exports coinciden con la página

- **WHEN** se compara el JSON con la página
- **THEN** el número de versiones, transiciones y cambios es el mismo
- **WHEN** se cuenta el CSV
- **THEN** tiene una fila de aviso, una de cabecera y una por cambio

### Requirement: Descubrimiento del historial

La página SHALL figurar en el sitemap con `lastmod`, en la navegación, en el pie, en `llms.txt` y en
el índice de recursos, y SHALL llevar tarjeta OG y JSON-LD de tipo `Dataset`. `/rss.xml` SHALL
incluir una entrada por transición cubierta, fechada el día en que se registró y enlazada a su
ancla.

#### Scenario: Entrada en el feed

- **WHEN** se registra una transición nueva y se despliega el sitio
- **THEN** `/rss.xml` contiene una entrada con el marco, las dos versiones y el enlace al ancla de la
  transición

### Requirement: Coherencia con el crosswalk de frontera

La versión de cada marco que mapea el crosswalk de frontera MUST existir en el historial. Cuando esa
versión no sea la última registrada, la página del historial SHALL indicarlo.

#### Scenario: Versión del crosswalk ausente del historial

- **WHEN** el crosswalk declara una versión que el historial no contiene
- **THEN** la construcción del sitio falla

### Requirement: Atribución de análisis ajenos

Cuando una transición esté también analizada en un corpus público de terceros, la página SHALL
citarlo. Todo dato tomado de ese corpus SHALL ir atribuido conforme a su licencia.

#### Scenario: Transición con análisis previo

- **WHEN** una transición figura en el corpus del paper "Silent Revision"
- **THEN** la transición enlaza el paper y el corpus en las fuentes

### Requirement: Accesibilidad y responsive del historial

La página SHALL pasar axe sin infracciones y MUST NOT tener desplazamiento lateral a 390 px de
ancho.

#### Scenario: Móvil

- **WHEN** se abre la página a 390 px
- **THEN** las tablas de versiones y los cambios se leen sin desplazamiento lateral de la página
