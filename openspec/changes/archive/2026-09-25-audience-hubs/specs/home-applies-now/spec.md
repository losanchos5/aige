# Spec Delta

## Purpose

La portada dice, en una banda compacta, qué aplica ya del Reglamento europeo de IA y cuáles son las
tres próximas fechas con lo que activa cada una, calculado desde el registro de obligaciones.

## ADDED Requirements

### Requirement: Banda "What applies now"
La portada SHALL incluir una sección con id `what-applies-now` que muestre los artículos del
Reglamento de IA cuya fecha `appliesFrom` es anterior o igual a la fecha de build y las tres
próximas fechas posteriores en las que empieza a aplicar una fila o un hito fechado de una fila. Cada
fecha SHALL listar lo que activa con las palabras del registro (filas que empiezan a aplicar,
agrupadas por la clase de sistema que comparten, y cada nota de hito distinta) y cada artículo MUST
enlazar su `/obligations/<id>`. La banda MUST NOT contener fechas ni artículos tecleados a mano y
MUST llevar el aviso "Indicative, not legal advice and not a claim of conformity".

#### Scenario: Una fecha pasa
- **WHEN** la fecha de build supera la primera de las tres fechas
- **THEN** la siguiente build la retira de la lista, añade la siguiente fecha del registro y suma
  sus artículos a "Applies today"

#### Scenario: Cálculo con fecha fija
- **WHEN** los tests calculan la banda con la fecha 2026-09-24
- **THEN** las tres fechas son 2026-12-02, 2027-12-02 y 2028-08-02, en ese orden

### Requirement: Componente autocontenido
La banda SHALL ser un único componente (`site/src/components/WhatAppliesNow.astro`) insertado en un
solo punto de `site/src/pages/index.astro`, con estilos propios, sin script, con un mesh que no usan
sus secciones vecinas y respetando las restricciones de `site/DESIGN.md` (tarjetas planas porque no
son enlaces, contraste AA en bandas tintadas).

#### Scenario: Edición paralela de la portada
- **WHEN** otro bloque edita la portada al mismo tiempo
- **THEN** el conflicto se limita a una línea de import y una línea de uso
