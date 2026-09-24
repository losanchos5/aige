# Spec Delta

## Purpose

El sitio enuncia un único modelo de qué capas del stack hereda la disciplina de la ingeniería GRC y
de qué capas responden a cada una de las tres preguntas, y lo repite igual en la Tesis, los
capítulos, los datos, las figuras y las páginas.

## ADDED Requirements

### Requirement: Tres capas heredadas
La Tesis (EN y ES), los capítulos 01 y 04, `stack.ts` y la página `/stack` SHALL nombrar como
heredadas de la ingeniería GRC exactamente Govern-as-Code (01), Inventory & Transparency (02) y
Assurance & Continuous Compliance (05), y como nuevas Evals & Red Teaming as Evidence (03) y Runtime
Controls & Observability (04). La evidencia legible por máquina MUST NOT figurar como capa.

#### Scenario: Página del stack
- **WHEN** se abre `/stack`
- **THEN** las capas 01, 02 y 05 llevan la etiqueta "Established", la 03 y la 04 "New", y la nota
  de práctica establecida nombra esas mismas tres capas

### Requirement: Una pregunta por capa
La capa 02 SHALL responder "What AI is running?"; las capas 01 y 04 SHALL responder "What is it
allowed to do?" (01 escribe el límite como código, 04 lo aplica en la llamada en vivo); las capas 03
y 05 SHALL responder "What evidence proves it?". El capítulo 01, el capítulo 04, la figura de las
tres preguntas, el campo `question` de cada capa en `stack.ts`, la página `/stack` y las tarjetas de
la home MUST coincidir con este reparto.

#### Scenario: Capa 04 con pregunta
- **WHEN** se lee la capa 04 en `stack.ts`
- **THEN** su `question` es "What is it allowed to do?"

#### Scenario: Tarjeta de la home
- **WHEN** se lee la segunda tarjeta de las tres preguntas en la home
- **THEN** su texto nombra la política como código y su aplicación en tiempo de ejecución con la
  identidad y el alcance del agente
