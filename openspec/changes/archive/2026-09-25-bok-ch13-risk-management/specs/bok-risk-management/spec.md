# Spec Delta

## Purpose

El capítulo 13 convierte la gestión de riesgos de IA en un tema de primera clase del Body of
Knowledge: un ciclo de ingeniería con artefactos y evidencias en cada capa del stack, trazado a los
marcos de referencia y adaptable al tamaño y la exposición de cada organización.

## ADDED Requirements

### Requirement: Ciclo de riesgo proyectado sobre capas y flujos
El capítulo `bok/13-risk-management.md` SHALL describir el ciclo identificar, evaluar, tratar y
monitorizar y MUST proyectarlo en dos tablas: una por cada una de las cinco capas del stack, con su
nombre canónico, su tarea de riesgo, su artefacto y su registro de evidencia; y otra por cada uno de
los siete flujos de trabajo del capítulo 06, enlazados a sus anclas en `/bok/the-role`.

#### Scenario: Lector busca qué capa produce cada evidencia de riesgo
- **WHEN** un lector abre la sección «The loop on the five layers»
- **THEN** ve cinco filas con los nombres exactos de las capas y, en cada una, el registro de
  evidencia que deja

#### Scenario: Los flujos enlazan al capítulo del rol
- **WHEN** se ejecuta la comprobación de enlaces del build
- **THEN** los siete enlaces a `/bok/the-role#…` resuelven sin error

### Requirement: Marcos mapeados a capas por número
El capítulo SHALL mapear a capas las 19 categorías del NIST AI RMF por su identificador (GOVERN 1 a
6, MAP 1 a 5, MEASURE 1 a 4, MANAGE 1 a 4) y MUST citar ISO 31000, ISO/IEC 23894 e ISO/IEC 42001
solo por número y título corto, sin reproducir su texto. Toda afirmación factual, legal o numérica
MUST llevar una referencia numerada en `## Sources` con etiqueta `verified: primary`, `secondary` o
`reported`.

#### Scenario: Tabla NIST completa
- **WHEN** un lector abre la sección «NIST AI RMF and ISO/IEC 23894 on the stack» del capítulo
- **THEN** encuentra una fila por cada una de las 19 categorías con capa y artefacto

#### Scenario: Fuentes coherentes
- **WHEN** se comparan los marcadores `[n]` del texto con la lista `## Sources`
- **THEN** cada marcador tiene su fuente y cada fuente se usa al menos una vez

### Requirement: Matriz de riesgo con escalas y regla catastrófica
El capítulo SHALL definir escalas de probabilidad y severidad de cinco niveles, una matriz de
bandas, las consecuencias de cada banda en gates, aceptación y revisión, y una regla de severidad
catastrófica por la que todo escenario S5 MUST tratarse como Critical con independencia de su
probabilidad.

#### Scenario: Riesgo raro pero catastrófico
- **WHEN** un escenario tiene probabilidad L1 y severidad S5
- **THEN** la matriz lo clasifica como Critical (override) y la política ilustrativa deniega el
  despliegue salvo aceptación vigente del órgano de gobierno

### Requirement: Apetito y tolerancia compilados en gates
El capítulo SHALL mostrar cómo una declaración de apetito se compila en un fichero de datos y en una
política ilustrativa de governance-as-code que deniega el despliegue cuando el riesgo residual supera
la tolerancia del nivel sin aceptación vigente, cuando falta la evidencia de eval exigida o cuando
queda un riesgo S5 no aceptado. Los fragmentos MUST ir marcados como ilustrativos.

#### Scenario: Aceptación caducada
- **WHEN** un riesgo residual Medium en un sistema de nivel 4 tiene una aceptación con fecha de
  caducidad pasada
- **THEN** la política emite un `deny` que cita el identificador del riesgo

### Requirement: Jerarquía de mitigación, residual y autoridad de aceptación
El capítulo SHALL presentar la jerarquía eliminar, sustituir, ingeniería, administrativo, aceptar y
monitorizar, con un control del stack y un patrón del capítulo 05 por peldaño, distinguir riesgo
inherente y residual, y MUST incluir una tabla que asigne cada banda residual a quién puede
aceptarla, con periodo máximo y registro.

#### Scenario: Enlaces a patrones
- **WHEN** se construye el sitio
- **THEN** los enlaces de la tabla de jerarquía a `/bok/patterns#pattern-…` resuelven

### Requirement: Registro de riesgos como registro de evidencia
El capítulo SHALL definir un esquema ilustrativo de registro de riesgos con identificador de sistema
del registro, escenario, fuente, afectados, ratings inherente y residual, controles, peldaños
considerados, responsable, aceptación con caducidad y condición de invalidación, cadencia de
revisión, disparadores de re-evaluación y enlaces a evals, incidentes y obligaciones.

#### Scenario: Auditor sigue un riesgo hasta su evidencia
- **WHEN** un auditor lee una entrada del registro
- **THEN** cada control listado es un identificador que corresponde a un artefacto de las capas 01,
  02, 03 o 04

### Requirement: Gobernanza proporcionada y enlaces a madurez e incidentes
El capítulo SHALL incluir una matriz de adaptación por tamaño de organización, sector, madurez,
productos y servicios, objetivos y tolerancia al riesgo, con controles mínimos, gates e intensidad
de revisión para cada perfil; un suelo de controles que no se adapta; y MUST explicar cómo la
práctica de riesgo se refleja en los cinco niveles del capítulo 07 y cómo los incidentes se enlazan
en ambos sentidos con el registro.

#### Scenario: Equipo pequeño
- **WHEN** un equipo de una persona consulta la matriz
- **THEN** encuentra un conjunto mínimo de controles y un único gate, y un enlace a «the minimum
  viable stack» del capítulo 04

### Requirement: Reglas editoriales del libro
El capítulo MUST mantener el H1 «13. Where risk management sits» con un resumen de una o dos líneas,
MUST NOT contener rayas largas (U+2014), MUST incluir la línea «Maps to» con la frase «Mappings are
illustrative, not a claim of conformity», una sección «What you can do this week» con tres a cinco
acciones antes de `## Sources`, y MUST NOT nombrar productos privados ni guías comerciales de
certificación.

#### Scenario: Lint de contenido
- **WHEN** se ejecuta `content-lint` sobre el sitio construido
- **THEN** el capítulo no produce ningún hallazgo y el build termina con código 0
