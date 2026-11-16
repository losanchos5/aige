# Spec Delta

## ADDED Requirements

### Requirement: Secciones de la home sobre papel
Todas las secciones de la home bajo la hero SHALL pintarse sobre el fondo de papel de la página, separadas por una línea de 1px y abiertas por una etiqueta mono, numerada en las secciones de contenido (el bloque del veredicto lleva etiqueta sin número). Solo la banda de cierre SHALL usar un fondo oscuro. Ninguna sección SHALL pintar mesh de halos ni un tinte de capa.

#### Scenario: Sin capas de mesh
- **WHEN** se carga `/`
- **THEN** ninguna sección contiene una capa de mesh y exactamente una sección bajo la hero tiene fondo oscuro

#### Scenario: Continuidad con la hero
- **WHEN** se carga `/` a 1440 px
- **THEN** la primera sección bajo la hero empieza con una línea de 1px y una etiqueta mono, sin cambio de color de fondo respecto al resto de la página

## MODIFIED Requirements

### Requirement: Contraste y movimiento
Todo texto de una sección de la home SHALL cumplir WCAG AA en claro y oscuro, incluido el texto de la banda de cierre sobre su cuadro velado. Los fondos de sección MUST NOT animarse.

#### Scenario: Axe sin fallos
- **WHEN** se pasa axe a `/` en claro y oscuro a 1440 y 390 px
- **THEN** no hay fallos serios ni críticos de contraste

## REMOVED Requirements

### Requirement: Ninguna sección de contenido de la home es plana
**Reason**: La maqueta aprobada el 2026-11-15 sustituye el mesh por papel con grano; el mesh ya no forma parte de la identidad del sitio.
**Migration**: Las secciones usan el fondo de página; el color decorativo viene de los cuadros definidos en `painting-mats`.

### Requirement: Variantes, intensidad y fundido
**Reason**: Sin mesh no hay composiciones ni intensidades que alternar.
**Migration**: La variedad entre secciones la da la alternancia de secciones con imagen y secciones de filas definida en `painting-mats`.
