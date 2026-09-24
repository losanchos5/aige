# Spec Delta

## Purpose

Define la figura del bucle de gobernanza de la home: los siete pasos de la obligación al auditor, cómo se maqueta según el ancho, cómo se consulta el detalle de cada paso y cómo se mueve, sin parpadeos ni solapes.

## ADDED Requirements

### Requirement: Contenido del bucle
La home SHALL mostrar, en la sección "The discipline, defined.", una figura con cuatro carriles ("01 / Obligation", "02 / Rules as code", "03 / Running system", "04 / Proof") y siete pasos en este orden: EU AI Act Art. 9, Policy-as-code (Layer 01), Inventory (Layer 02), Eval gate (Layer 03), Runtime controls (Layer 04), Evidence store (Layer 05), Auditor. Cada paso MUST llevar un icono de línea y los pasos de capa MUST usar el color de su capa del stack. Las transiciones MUST estar etiquetadas ("compiles to", "scopes", "checks", "gates", "emits", "attests") y el retorno de Evidence store a la obligación MUST etiquetarse "closes the loop".

#### Scenario: Siete pasos en orden
- **WHEN** se carga `/`
- **THEN** la figura del bucle contiene exactamente siete pasos en el orden indicado, cada uno con su icono y su etiqueta

#### Scenario: Caption y enlace
- **WHEN** se carga `/`
- **THEN** la figura lleva el pie "Seven steps, from obligation to auditor." con un enlace a `/bok/the-stack#how-to-read-the-stack`

### Requirement: Maquetación sin solapes
En anchos de escritorio y tableta la figura SHALL ocupar todo el ancho del contenedor de la sección, con los pasos dentro de su carril y las etiquetas de transición sin solapar ningún paso ni otra etiqueta. En pantallas estrechas la figura SHALL pasar a una lista vertical de pasos con el verbo de cada transición entre ellos y una fila final que indica que el bucle vuelve al paso 1. La página MUST NOT tener scroll horizontal.

#### Scenario: Pasos dentro de su carril
- **WHEN** se carga `/` a 1440, 1024 u 834 px de ancho
- **THEN** la caja de cada paso queda dentro de la caja de su carril

#### Scenario: Etiquetas sin solapes
- **WHEN** se carga `/` a 1440, 1024 u 834 px de ancho
- **THEN** ninguna etiqueta de transición intersecta la caja de un paso ni la de otra etiqueta

#### Scenario: Lista vertical en móvil
- **WHEN** se carga `/` a 390 o 320 px de ancho
- **THEN** los pasos se apilan en una columna, las líneas del lienzo no se muestran y no hay scroll horizontal

### Requirement: Detalle estable al pasar el ratón
En el lienzo, pasar el ratón, enfocar o pulsar un paso SHALL mostrar su detalle (nombre, capa, valor de ejemplo y nota) en una zona que no cubre ningún paso. El detalle MUST permanecer estable mientras el puntero siga sobre el paso, sin alternar entre visible y oculto, y cambiar de paso MUST NOT desplazar el resto de la página. Pulsar un paso MUST fijarlo; Escape o una pulsación fuera de la figura MUST soltarlo. En la lista vertical solo un toque, clic o Enter/Espacio MUST abrir o cerrar la nota de un paso; tocar sin soltar, pasar el ratón o enfocar MUST NOT abrirla.

#### Scenario: Sin parpadeo sobre Inventory
- **WHEN** el puntero se queda quieto sobre el centro de cualquier paso durante un segundo
- **THEN** el paso activo y el texto del detalle no cambian durante ese tiempo y el elemento bajo el puntero sigue siendo ese paso

#### Scenario: Toque en móvil
- **WHEN** en la lista vertical hay un paso abierto y se toca otro paso más abajo
- **THEN** se abre la nota del paso tocado y se cierra la del anterior

#### Scenario: Teclado
- **WHEN** un usuario de teclado enfoca un paso con Tab
- **THEN** se muestra el detalle de ese paso, y al pulsar Escape vuelve el texto por defecto

### Requirement: Movimiento respetuoso
La figura SHALL animar un haz que recorre las transiciones una vez, en el orden del bucle, cada vez que entra en pantalla, solo cuando el usuario no pide movimiento reducido. Cada vuelta MUST durar 5 segundos o menos (WCAG 2.2.2) y MUST pausarse mientras hay un paso activo. Con movimiento reducido la figura MUST mostrarse estática y completa. El texto de los pasos MUST NOT animar su opacidad.

#### Scenario: Una vuelta
- **WHEN** la figura entra en pantalla sin movimiento reducido
- **THEN** el haz recorre las siete transiciones una sola vez y todas las animaciones terminan antes de 5 segundos

#### Scenario: Movimiento reducido
- **WHEN** se carga `/` con `prefers-reduced-motion: reduce`
- **THEN** no hay ninguna animación en marcha dentro de la figura del bucle
