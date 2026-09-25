# Spec Delta

## Purpose

El mapa de cobertura del AIGP dice, indicador a indicador, dónde enseña este sitio lo que pide el
Body of Knowledge público del AIGP v2.1: la sección que se lee primero, el artefacto al que lleva y
si el indicador está enseñado o solo en parte. Es un mapa de un cuerpo de conocimiento abierto, no
preparación de examen.

## ADDED Requirements

### Requirement: Datos del mapa con paráfrasis propia
El sitio SHALL mantener en `site/src/data/aigp.ts` los cuatro dominios y las 13 competencias del
AIGP BoK v2.1 con sus rangos mínimo y máximo de preguntas, y los 58 indicadores con un id
posicional (`<dominio>.<letra>.<posición>`). Cada indicador MUST llevar una paráfrasis propia de
12 palabras como máximo que no reproduzca el texto de la IAPP, al menos dos enlaces internos cuyo
primero sea una sección de capítulo, y un estado `taught` o `partly-taught`. Un indicador
`partly-taught` MUST llevar una nota que diga qué falta.

#### Scenario: Estructura del blueprint
- **WHEN** se cargan los datos del mapa
- **THEN** hay cuatro dominios (I a IV), 13 competencias con los rangos del blueprint y 58
  indicadores cuyos ids coinciden con su posición

#### Scenario: Paráfrasis demasiado larga
- **WHEN** una paráfrasis supera las 12 palabras
- **THEN** la build falla al generar `/for/aigp` y `tests/aigp.spec.ts` lo señala

### Requirement: Cada enlace mapeado existe en la build
Cada enlace del mapa SHALL resolverse en la build contra lo que el sitio genera: el encabezado de
un capítulo con el mismo slug que produce rehype-slug, un patrón de `patterns.ts`, un término del
glosario, una herramienta `live` del toolkit, una fila de plantilla o esquema, un caso o una ruta
conocida cuyo fichero fuente existe. Si un enlace no se resuelve, la build MUST fallar con el
enlace y el motivo.

#### Scenario: Encabezado renombrado
- **WHEN** un capítulo renombra un encabezado que el mapa enlaza
- **THEN** la build falla en `/for/aigp` nombrando el indicador, el enlace y el capítulo

#### Scenario: Estado sin artefacto
- **WHEN** un indicador marcado `taught` solo enlaza secciones de capítulo
- **THEN** la comprobación falla porque `taught` exige un enlace a un artefacto

### Requirement: Página del mapa con aviso fijo y sin puntuación global
La página `/for/aigp` SHALL mostrar el aviso "AIGP is a registered trademark of the IAPP; this site
is not affiliated with or endorsed by the IAPP; this is a coverage map of an open body of
knowledge, not exam preparation", el criterio de estado, una tabla por competencia con cada
indicador, sus enlaces etiquetados y su estado en texto, y la fuente numerada del blueprint. La
página MUST NOT publicar una puntuación ni un recuento global de cobertura.

#### Scenario: Lectura sin JavaScript
- **WHEN** se abre `/for/aigp` con JavaScript desactivado
- **THEN** se leen el aviso, el heatmap con su descripción textual, las rutas de estudio como listas
  de lectura y todas las tablas con sus enlaces

### Requirement: Heatmap generado en la build
La página SHALL incluir un heatmap SVG generado en la build desde los mismos datos: una barra por
competencia con anchura proporcional al punto medio de su rango de preguntas y una celda por
indicador. El estado MUST distinguirse por la marca (relleno frente a contorno discontinuo) y no
solo por el color, y la imagen MUST llevar dentro la fuente y la fecha "As of".

#### Scenario: Una celda por indicador
- **WHEN** se genera el heatmap
- **THEN** tiene 58 celdas, tantas discontinuas como indicadores `partly-taught`, `role="img"` con
  título y descripción, y el texto "As of" con la fecha del mapa

### Requirement: Rutas de estudio con progreso local
La página SHALL ofrecer una ruta de estudio por dominio, formada por la primera sección de cada
indicador sin repeticiones. Con JavaScript, el lector MUST poder marcar secciones como leídas; el
progreso se guarda solo en `localStorage` mediante `public/toolkit/lib.js` y nada sale del
navegador. Si el almacenamiento no está disponible, la página MUST decirlo sin fallar.

#### Scenario: Progreso que persiste
- **WHEN** el lector marca una sección y recarga la página
- **THEN** la sección sigue marcada y el recuento del dominio lo refleja

#### Scenario: Almacenamiento bloqueado
- **WHEN** `localStorage` lanza una excepción
- **THEN** la ruta sigue funcionando en la sesión y un aviso dice que las marcas no se conservarán
