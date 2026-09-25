# section-backdrop Specification

## Purpose
Define los fondos de las secciones de la home: qué secciones llevan el mesh de halos suaves, con qué composición e intensidad, y cómo se mantiene el contraste y la continuidad entre secciones.

## Requirements

### Requirement: Ninguna sección de contenido de la home es plana
Las secciones de la home "The discipline, defined.", "Three questions define the discipline.",
"Eight values...", la sección de capítulos por partes ("<n> chapters in five parts...", con el número
calculado desde los datos) y la sección de newsletter ("Follow the changes.") SHALL pintar el mesh de
halos, y las secciones del stack ("A build order...") y Resources SHALL pintar un mesh suave y
quieto sobre su tinte. La sección del rol SHALL conservar su mesh actual (composición por defecto,
intensidad 0.6, con deriva). El verdict beat y la banda final no cambian.

#### Scenario: Secciones con mesh
- **WHEN** se carga `/`
- **THEN** las secciones de contenido con mesh, el stack y Resources contienen una capa de mesh
  visible y decorativa (oculta a tecnologías de apoyo y sin recibir eventos de puntero)

#### Scenario: El rol no cambia
- **WHEN** se carga `/`
- **THEN** la capa de mesh de la sección del rol usa la composición por defecto y una opacidad igual
  a `--mesh-alpha` × 0.6

#### Scenario: Newsletter sin deriva
- **WHEN** se carga `/` sin movimiento reducido
- **THEN** la sección de newsletter usa una composición quieta distinta de la de Resources, y solo
  el mesh del rol deriva

### Requirement: Variantes, intensidad y fundido
El mesh SHALL admitir al menos tres composiciones distintas y una intensidad por sección, para que dos secciones seguidas no repitan el mismo fondo. Cada mesh de sección SHALL fundirse con el fondo de la página arriba y abajo para que no haya costuras duras entre secciones.

#### Scenario: Secciones contiguas distintas
- **WHEN** se carga `/`
- **THEN** ninguna pareja de secciones con mesh contiguas usa la misma composición

### Requirement: Contraste y movimiento
Todo texto sobre un mesh SHALL cumplir WCAG AA en claro y oscuro, y la deriva del mesh SHALL animar solo transformaciones y solo sin movimiento reducido.

#### Scenario: Axe sin fallos
- **WHEN** se pasa axe a `/` en claro y oscuro a 1440 y 390 px
- **THEN** no hay fallos serios ni críticos de contraste
