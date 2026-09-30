## ADDED Requirements

### Requirement: Visuales de página desde datos existentes
Las páginas de la tanda 1 SHALL mostrar al menos un visual generado desde sus datos tipados o una
figura existente incrustada: `/controls`, `/resources/crosswalk`, las tres comparativas
`/resources/crosswalk/*`, `/resources/contracts`, `/toolkit/policy-card`, `/mcp`, `/resources/harms`,
`/stack`, `/ai-governance`, `/resources/ai-act-deadlines` y `/es/resources/ai-act-deadlines`,
`/resources/dpia-lists`, `/resources`, `/for/certifications`, `/toolkit/ai-act-triage`, `/cases`,
`/toolkit/vendor-due-diligence` y `/toolkit/incident-clock`. Ningún visual MUST añadir hechos,
cifras ni fechas que no estén en los datos o en un capítulo.

#### Scenario: Recuentos coherentes
- **WHEN** un visual cuenta registros (controles, cláusulas, listas, casos, recursos)
- **THEN** sus números coinciden con los del dataset del que sale y con la tabla alternativa

#### Scenario: Controles por especificar
- **WHEN** un control no tiene respuesta al fallo especificada
- **THEN** el mosaico de `/controls` lo pinta con la trama del estado «por especificar», no como alerta

### Requirement: Triage con el sistema situado
`/toolkit/ai-act-triage` SHALL mostrar una escalera de riesgo cuyos peldaños se encienden según el
resultado que ya calcula el motor del triage, con estado final legible sin JavaScript.

#### Scenario: Sin JavaScript
- **WHEN** la página carga sin ejecutar scripts
- **THEN** la escalera se ve completa y neutra, con su tabla alternativa

### Requirement: Figuras existentes listadas en su permalink
Cuando una figura registrada se incruste en una página nueva, su entrada en `figures.ts` SHALL
incluir esa ruta en `pages` para que `/figures/<id>` la liste.

#### Scenario: Permalink actualizado
- **WHEN** `harm-levels` se incrusta en `/resources/harms`
- **THEN** `/figures/harm-levels` enlaza `/resources/harms`
