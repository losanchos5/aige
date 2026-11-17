## ADDED Requirements

### Requirement: Enlace al historial de cambios

La sección de versiones mapeadas de la página del crosswalk SHALL enlazar el historial de cambios de
los marcos. Cuando la versión que el crosswalk mapea de un lab no sea la última registrada en el
historial, esa sección SHALL decirlo junto al documento afectado.

#### Scenario: Versión vigente

- **WHEN** el crosswalk mapea la última versión registrada de los tres marcos
- **THEN** la sección de versiones enlaza el historial y no muestra ningún aviso de versión

#### Scenario: Versión superada

- **WHEN** el historial registra una versión posterior a la que mapea el crosswalk
- **THEN** la sección de versiones indica qué documento tiene una versión más reciente y enlaza su
  transición en el historial
