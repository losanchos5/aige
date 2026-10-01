# Spec Delta

## ADDED Requirements

### Requirement: Visuales de la tanda 3
Las páginas de la tanda 3 SHALL mostrar estos visuales, generados en build desde sus datos tipados:
- `/controls`: la evidencia sube por el stack (flujo capa del control a capa de su evidencia), que
  sustituye la sección por capas y conserva sus anclas `layer-1` a `layer-5` en una lista plegable.
- `/controls/crosswalk`: flujo de perfiles a marcos, índice de marcos como mapa de calor marco x perfil
  y las 15 cláusulas con más controles.
- `/resources/threats`: flujo catálogo, capa y herramienta de prueba, y mapa de calor catálogo x
  dominio CSA AICM.
- `/resources/harms`: diana de niveles de daño por dominio MIT y flujo mecanismo, nivel y capa.
- `/agents`: escalera de autonomía (AutonomyLadder) desde los niveles de autonomía y los controles de
  agente, y flujo de las amenazas OWASP ASI a los patrones.
- `/toolkit/agent-control-profile`: la misma escalera con el nivel elegido resaltado.
- `/frontier`: anillos del entorno de evaluación (EvalBoundary) con los 9 controles de evaluación en su
  anillo, matriz caso x control de evaluación y los requisitos AIUC-1 por dominio.
- `/research/the-evaluation-environment-is-part-of-the-system`: la misma figura EvalBoundary.
- `/resources/frameworks`: mosaico de instrumentos por tipo, tamaño por obligaciones.
- `/resources/templates`: anillo del ciclo de vida de los registros y matriz registro x instrumento.
- `/for/aigp`: dónde pesa el examen (teselas por competencia) y flujo de dominios a capítulos.
- `/stack`: qué llena cada capa (capa x tipo de artefacto).
- `/path`: etapa x capa y anillos de progreso por etapa.
- `/bok`: espina del libro con minutos de lectura por capítulo.
- `/figures`: atlas de cobertura visual por capítulo; `/figures/[id]`: dónde aparece, en la espina.

Ningún visual MUST añadir hechos, cifras ni fechas que no estén en los datos o en un capítulo.

#### Scenario: Recuentos coherentes
- **WHEN** un visual de la tanda 3 cuenta registros, pares o minutos
- **THEN** sus números coinciden con los del módulo de datos del que sale y con su tabla alternativa

#### Scenario: Controles por especificar
- **WHEN** un visual de la tanda 3 pinta controles y alguno no tiene respuesta al fallo especificada
- **THEN** lo pinta con la trama del estado «por especificar»

#### Scenario: Anclas conservadas
- **WHEN** un visual sustituye una sección o un índice de enlaces
- **THEN** todas las anclas que existían siguen resolviendo en la página

### Requirement: Anillos de progreso de /path
`/path` SHALL mostrar un anillo de progreso por etapa y uno total a partir del estado que ya guarda
`public/path.js`, excluyendo los nodos omitidos del denominador. Sin JavaScript MUST mostrar los totales
de nodos troncales, alternativos y opcionales por etapa. El cambio MUST anunciarse con `aria-live`
«polite», sin animar `stroke-dasharray`, y `public/path.js` MUST seguir por debajo de 15 KB gzip.

#### Scenario: Marcar un nodo
- **WHEN** el lector marca un nodo como hecho
- **THEN** el anillo de su etapa y el total se actualizan al instante y un lector de pantalla oye el nuevo porcentaje

#### Scenario: Sin JavaScript
- **WHEN** la página carga sin ejecutar scripts
- **THEN** los anillos muestran los totales por etapa y la tabla alternativa
