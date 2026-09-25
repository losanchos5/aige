# chapter-infographics Specification

## Purpose
Las infografías de los capítulos convierten en una imagen de un solo mensaje lo que el Body of
Knowledge ya enuncia, con el mismo contrato visual, de accesibilidad y de fuentes que el resto de
figuras del sitio.

## Requirements

### Requirement: Figures draw only what the chapter states
Cada infografía de este bloque SHALL dibujar solo hechos, cifras, fechas y nombres que su capítulo de
origen enuncia, y su pie MUST terminar en «Drawn from chapter NN.» con el número de ese capítulo. Las
figuras con fechas o plazos MUST llevar «as of» con la fecha de vigencia del capítulo en el pie.

#### Scenario: Cifras de la profesión
- **WHEN** un lector abre `/bok/why-now#the-evidence`
- **THEN** la figura «The profession in numbers» muestra solo 77%, «9 in 10», 1.5% (10 de 671),
  1,997 anuncios y 41%, 28% y 27%, las cifras que el capítulo 02 cita

#### Scenario: Relojes con fecha de vigencia
- **WHEN** se lee el pie de «The overlapping incident clocks» o de «Who enforces, and the ceilings»
- **THEN** el pie incluye «as of 2026-09-24»

### Requirement: Figure contract per infographic
Cada infografía SHALL tener `role="img"`, `aria-labelledby` que resuelve a un `<title>` igual al título
de `figures.ts` y a un `<desc>`, y una alternativa textual en `<details>`. MUST usar solo clases que
mapean a tokens (sin hexadecimales), no atenuar texto con opacidad, usar un tamaño mínimo de 13
unidades en un `viewBox` de 360 de ancho, pesar 12 KB o menos y no contener la raya larga U+2014.

#### Scenario: Comprobación de datos
- **WHEN** se ejecuta `site/tests/figures-existing.spec.ts`
- **THEN** las once figuras cumplen tamaño, tokens, nombre accesible, tamaño de letra y fórmula del pie

#### Scenario: Ambos temas
- **WHEN** la página se muestra en tema claro u oscuro
- **THEN** el texto de la figura usa `--ink`, `--ink-2`, `--muted` o la tinta de su capa y supera el
  umbral de contraste AA sobre su fondo

### Requirement: Placement by heading text
Cada infografía SHALL declararse al final del array de `site/src/data/figures.ts` con una colocación
por texto de encabezado (`section` y, cuando la figura va dentro de una subsección, `sub`) que MUST
existir en el capítulo. Las figuras MUST NOT renombrar ni exigir cambios en los encabezados H2/H3.

#### Scenario: Matriz de riesgo antes de la regla S5
- **WHEN** se construye `/bok/risk-management`
- **THEN** la figura «The matrix and the S5 override» queda al pie de «The matrix and what each band
  triggers», justo antes de «The catastrophic-severity override»

#### Scenario: Procedencia y linaje donde el texto lo define
- **WHEN** se construye `/bok/governing-development`
- **THEN** la figura «Provenance and lineage» aparece bajo el H3 «Provenance versus lineage»

### Requirement: Polished archify diagrams keep the visual brief
Los diagramas Framework Crosswalk, Vendor / Model Due-Diligence Gate, Runtime Guardrail y Kill Switch /
Circuit Breaker SHALL validar con `archify validate --quality showcase`, mantener ≤ 9 nodos y ≤ 12
aristas y una nota por nodo en su `*.notes.json`. El crosswalk MUST tener como mucho seis radios y la
evidencia unida solo al eje; el guardrail y el kill switch MUST terminar en un almacén de evidencia
fuera de la región de la capa 04.

#### Scenario: Crosswalk como eje
- **WHEN** se lee `site/diagrams/framework-crosswalk.architecture.json`
- **THEN** cinco radios salen del conjunto de controles y la única arista hacia la evidencia sale del eje

### Requirement: Regulatory wave shows the dated flips
La ola regulatoria SHALL incluir los estados del 2 Dec 2026 (nuevas prohibiciones del `Art. 5` y
marcado del `Art. 50(2)`) y del 2 Aug 2030 (sistemas de alto riesgo de autoridades públicas), y cada
fecha de sus estados MUST aparecer en el capítulo 02.

#### Scenario: Fechas verificadas contra el capítulo
- **WHEN** la prueba compara las etiquetas de fecha del IR con `bok/02-why-now.md`
- **THEN** 2 December 2026, 2 December 2027, 2 August 2028 y 2 August 2030 están en el capítulo
