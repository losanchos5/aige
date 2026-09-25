# Spec Delta

## Purpose

Las figuras conceptuales de los capítulos 12 a 23 convierten en una imagen de un solo mensaje lo que
el Body of Knowledge ya enuncia, con el mismo contrato visual, de accesibilidad y de fuentes que el
resto de figuras del sitio, y cada una es citable en su permalink.

## ADDED Requirements

### Requirement: Concept figures draw only what the chapter states
Cada figura de este bloque SHALL dibujar solo hechos, nombres, fechas y relaciones que su capítulo de
origen o el módulo de datos que ese capítulo usa (`harms.ts`, `jurisdictions.ts`) enuncian. Su pie
MUST terminar en «Drawn from chapter NN.» (infografías) o «Generated from the Body of Knowledge.»
(archify), y las figuras con estados que caducan MUST llevar `asOf` y `reviewBy` en `figures.ts`,
«as of» en el pie e «As of <fecha>» dentro del SVG.

#### Scenario: Plano de control ilustrativo
- **WHEN** un lector abre `/bok/governing-agents` o `/agents#control-plane`
- **THEN** la figura «The agent control plane» muestra registro, emisor de identidad, gateway,
  guardrail con su postura de fallo, checkpoint humano, breaker por agente con sus seis niveles de
  parada y telemetría como evidencia, y su pie dice «Illustrative, not a claim of conformity»

#### Scenario: Instrumentos fechados
- **WHEN** se construye `/figures/instrument-lineage`
- **THEN** el SVG imprime «As of 2026-09-24» y la entrada lleva `asOf` y `reviewBy`

### Requirement: Figure contract per concept infographic
Cada infografía SHALL tener `role="img"`, `aria-labelledby` que resuelve a un `<title>` igual al título
de `figures.ts` y a un `<desc>` igual a su `alt`, un `alt` de 50 a 160 caracteres y una alternativa
textual en `<details>`. MUST usar solo clases que mapean a tokens (sin hexadecimales), no atenuar texto
con opacidad, usar un tamaño mínimo de 13 unidades en un `viewBox` de 360 de ancho, pesar 12 KB o
menos, nombrar las capas exactamente y no contener la raya larga U+2014.

#### Scenario: Comprobación de datos
- **WHEN** se ejecuta `site/tests/figures-concepts.spec.ts`
- **THEN** las seis infografías cumplen tamaño, tokens, nombre accesible, longitud del `alt`, tamaño de
  letra, fórmula del pie y nombres de capa

### Requirement: Data-driven figures stay in sync with their modules
El mapa de jurisdicciones SHALL tener una tesela por cada entrada de `jurisdictions.ts` con la clase
de su estado y MUST ser `kind: 'data-viz'` con una tabla de respaldo que repite estado, instrumento
principal y fecha de cada jurisdicción. La figura de daños SHALL usar los cinco niveles de
`levelOrder` y, para cada ejemplo, el tipo de daño, el control y la capa exactos de su fila en
`harms.ts`.

#### Scenario: Cambio de estado de una jurisdicción
- **WHEN** una entrada de `jurisdictions.ts` cambia de estado sin actualizar el SVG ni la tabla
- **THEN** `figures-concepts.spec.ts` falla nombrando la jurisdicción

### Requirement: Placement by heading text and on pages
Cada figura SHALL declararse al final de su registro (`figures.ts` o `diagrams.ts`) con una colocación
por texto de encabezado que MUST existir en el capítulo, sin renombrar ni exigir cambios en los H2/H3.
Las figuras que también viven en una página SHALL declarar esa ruta en `pages` y la página MUST
insertarlas con `<Figure>`.

#### Scenario: Apertura del capítulo 14
- **WHEN** se construye `/bok/governing-development`
- **THEN** el diagrama «The build as a chain of gates» aparece antes del primer H2

#### Scenario: Figura en el hub de agentes
- **WHEN** se construye `/agents`
- **THEN** `#control-plane` contiene la figura `agent-control-plane` antes de la lista de componentes

### Requirement: Archify lifecycle keeps the visual brief
El diagrama `build-chain-of-gates` SHALL validar con `archify validate --quality showcase`, mantener
≤ 9 nodos y ≤ 12 transiciones, tener una nota por nodo en `build-chain-of-gates.notes.json` en
palabras del capítulo 14, y cada gate MUST nombrar el patrón que el capítulo le asocia.

#### Scenario: Validación del IR
- **WHEN** el build ejecuta `scripts/diagrams-build.mjs`
- **THEN** el IR valida y el SVG generado se inserta en el capítulo 14
