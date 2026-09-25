# Spec Delta

## Purpose

El capítulo 15 del Body of Knowledge enseña el gobierno del lado del desplegador, desde la decisión
de usar un sistema de IA hasta su retirada, con cada paso ligado al artefacto que lo evidencia, a la
capa del stack que lo produce y al registro de evidencia.

## ADDED Requirements

### Requirement: Estructura y voz del capítulo 15
El fichero `bok/15-governing-deployment.md` SHALL conservar el H1 "# 15. Governing deployment and
use" seguido de una entradilla en blockquote de una o dos líneas, y SHALL seguir `STYLEGUIDE.md`:
inglés británico, voz de ingeniería, al menos un recuadro "**In practice**" y uno "**Example
(illustrative)**", una línea "**Maps to:**" con la frase "Mappings are illustrative, not a claim of
conformity", una sección "## What you can do this week" con entre tres y cinco acciones y una
sección final "## Sources". El capítulo MUST NOT contener ningún carácter U+2014.

#### Scenario: La build valida el capítulo
- **WHEN** se ejecuta la build compartida del worktree
- **THEN** `astro check`, `astro build`, el lint de contenido y la comprobación de enlaces terminan
  con código 0 y la página `/bok/governing-deployment` existe

#### Scenario: Sin rayas largas
- **WHEN** el lint de contenido recorre el HTML de `/bok/governing-deployment`
- **THEN** no encuentra ninguna raya larga

### Requirement: Cobertura del lado del desplegador
El capítulo SHALL cubrir, con encabezados H2 y H3 estables: la decisión de despliegue y el
Deployment Decision Record; la elección del modelo con evals de tarea, límites de benchmarks y
leaderboards y coste total con energía; la matriz tipo de modelo × opción de despliegue; build, buy
or adapt con los disparadores del Art. 25 y el criterio GPAI de la Comisión; contratos y licencias;
la revisión de salida con tres resultados y disenso registrado; la entrega progresiva con criterios
de rollback previos; la operación (políticas, datos en inferencia, calendario de mantenimiento,
deriva, equidad, propiedad de señales, terceros, continuidad con DORA y NIS2, beneficio, energía,
retención de registros); el aseguramiento periódico; el uso secundario; la comunicación externa; y
la desactivación, degradación, localización y retirada.

#### Scenario: Un lector busca la retención de logs del desplegador
- **WHEN** un lector abre `/bok/governing-deployment#records-retention`
- **THEN** encuentra la fila del `Art. 26(6)` con el mínimo de seis meses y su cita numerada

### Requirement: Fuentes verificadas y afirmaciones acotadas
Toda afirmación factual, legal o numérica del capítulo MUST llevar una cita `[n]` que exista en su
"## Sources" con el formato `[n] Title (gloss). Publisher. Date. URL (verified: primary|secondary|reported)`.
Lo que no pudo confirmarse MUST ir matizado en la prosa y marcado "(verify)". El capítulo MUST NOT
citar ni mencionar guías de estudio comerciales ni productos privados, ni reproducir texto de normas
ISO/IEC, CSA o IAPP.

#### Scenario: Una cita sin fuente rompe la build
- **WHEN** el capítulo contiene un `[n]` sin la entrada `[n]` correspondiente en Sources
- **THEN** el lint de contenido informa de un ancla de cita colgante y la build falla

### Requirement: Tablas del capítulo fieles a los datos
Las tablas de tipos de modelo, alojamiento, adaptación, matriz, cláusulas y licencias del capítulo
SHALL coincidir en contenido con `site/src/data/deployment-options.ts` y
`site/src/data/contracts.ts`.

#### Scenario: Se edita una celda de la matriz
- **WHEN** cambia una celda de `matrix` en `deployment-options.ts`
- **THEN** la misma celda se actualiza en la tabla de la sección "The model-type by
  deployment-option matrix" del capítulo
