# Spec Delta

## Purpose

Buscador por artículo o cláusula que lleva al lector de una referencia escrita a mano ("AI Act 14",
"GDPR 35", "42001 A.6") a la página de la obligación del registro o, si no hay fila, al tema del
crosswalk que archiva esa cláusula.

## ADDED Requirements

### Requirement: Índice estático de búsqueda por cláusula
El sitio SHALL publicar en `/obligations/lookup.json` un índice generado en build con una entrada por
obligación del registro (ruta `/obligations/<id>`, id, instrumento, cláusula, título y alias del
instrumento) y una entrada por cada cláusula del crosswalk que no tenga fila en el registro (ruta
`/resources/crosswalk#topic-<tema>`, instrumento, cláusula, tema). Cada ruta del índice MUST existir
en el sitio publicado. Los alias de instrumento MUST referirse a instrumentos que existen en el
registro o en el crosswalk.

#### Scenario: Índice completo
- **WHEN** se descarga `/obligations/lookup.json`
- **THEN** contiene una entrada de obligación por cada fila del registro y todas sus rutas responden
  con una página del sitio

### Requirement: Consulta por instrumento y cláusula
El buscador SHALL aceptar el instrumento por su nombre corto o un alias (por ejemplo "AI Act",
"EU AI Act", "AIA", "GDPR", "RGPD", "42001", "ISO 42001", "NIST", "AI RMF") seguido de la cláusula,
ignorando mayúsculas, puntos, espacios y prefijos como "Art.", "Article", "Artículo" o "§". Una
coincidencia exacta de instrumento y cláusula MUST aparecer la primera. Una cláusula sin instrumento
SHALL devolver las cláusulas de ese número en todos los instrumentos, con el EU AI Act primero. Un
instrumento sin cláusula SHALL devolver sus obligaciones. Una consulta sin coincidencias MUST mostrar
un estado vacío que ofrezca el buscador de todo el sitio.

#### Scenario: Instrumento y artículo
- **WHEN** el lector escribe "AI Act 14"
- **THEN** el primer resultado enlaza `/obligations/aige-obl-euaia-art14`

#### Scenario: Alias en español
- **WHEN** el lector escribe "rgpd 35"
- **THEN** el primer resultado es la obligación del RGPD que cubre el art. 35

#### Scenario: Anexo de ISO
- **WHEN** el lector escribe "42001 A.6"
- **THEN** el primer resultado enlaza `/obligations/aige-obl-iso42001-a6`

#### Scenario: Solo el número
- **WHEN** el lector escribe "Art. 14"
- **THEN** el primer resultado es EU AI Act Art. 14 y la lista incluye el art. 14 de otros
  instrumentos que lo tengan

#### Scenario: Cláusula sin fila en el registro
- **WHEN** el lector escribe "42001 6.1.2"
- **THEN** un resultado enlaza el tema del crosswalk que archiva ISO/IEC 42001 6.1.2

#### Scenario: Sin resultados
- **WHEN** el lector escribe una consulta que no casa con nada
- **THEN** ve un mensaje de estado vacío y un control que abre el buscador de todo el sitio

### Requirement: Interacción accesible del buscador
El buscador SHALL ser un formulario de búsqueda etiquetado cuyo campo es un combobox ARIA que
controla una lista de resultados; las flechas SHALL mover la opción activa, Intro SHALL navegar a la
opción activa o, si no hay ninguna, al primer resultado, y Esc SHALL vaciar el campo. El número de
resultados SHALL anunciarse en una región viva. El JavaScript MUST servirse como módulo propio del
sitio, sin scripts en línea ni cambios en la CSP.

#### Scenario: Teclado
- **WHEN** el lector escribe "GDPR 22" y pulsa Intro
- **THEN** el navegador abre la página de la obligación del RGPD art. 22

#### Scenario: Accesibilidad
- **WHEN** se audita `/obligations` y `/resources/crosswalk` con axe
- **THEN** no hay infracciones nuevas

### Requirement: Enlaces compartibles y funcionamiento sin JavaScript
`/obligations?q=<consulta>` SHALL rellenar el buscador con la consulta y mostrar sus resultados al
cargar, y `/obligations#lookup` SHALL poner el foco en el campo. Sin JavaScript el formulario SHALL
mostrar ejemplos como enlaces normales a páginas de obligación existentes, y la lista completa del
registro MUST seguir visible.

#### Scenario: Enlace compartido
- **WHEN** el lector abre `/obligations?q=ai+act+50`
- **THEN** el campo muestra "ai act 50" y el primer resultado enlaza la obligación del art. 50 del
  EU AI Act

#### Scenario: Sin JavaScript
- **WHEN** se abre `/obligations` con JavaScript desactivado
- **THEN** los ejemplos del buscador son enlaces que responden y la lista del registro se ve entera

### Requirement: Buscador en las páginas del registro y del crosswalk
El buscador SHALL aparecer en `/obligations`, antes de los filtros del registro, y en
`/resources/crosswalk`, antes de la matriz.

#### Scenario: Presencia
- **WHEN** se abre `/obligations` o `/resources/crosswalk`
- **THEN** la página contiene un único formulario de búsqueda "Look up an article"
