# Proposal

## Why

La matriz de competencias de `/role/competencies` salió el 2026-11-17 (PR #111) como una tabla de
texto. Jordi pidió el 2026-11-18 que fuera más visual: no lleva el marco de pintura del sistema
"editorial restraint" y esperaba que se leyera como un recorrido (en el espíritu de roadmap.sh), no
como una hoja de cálculo. El mockup aprobado está en
`D:/Documents/aige-media/mockups/competencies-roadmap/variant-b.html` (variante B, "tracks").

## What Changes

- La tabla de flujos por peldaños se dibuja como siete vías horizontales, una por flujo, con una
  estación por cada uno de los cuatro primeros peldaños y un nodo final común para el quinto. Sigue
  siendo la misma tabla, con sus cabeceras y sus enlaces a cada celda.
- Cada celda gana una etiqueta corta (de dos a cuatro palabras) que es lo que se lee en la estación.
  Las 28 etiquetas y la del quinto peldaño son texto nuevo: salen en borrador de
  `D:/Documents/aige-media/mockups/competencies-roadmap/labels.json` y Jordi las aprueba o las
  reescribe antes del merge.
- El recorrido va en un panel opaco sobre una pintura de Monet del catálogo del sitio, con su
  crédito.
- El detalle de cada flujo muestra sus cuatro celdas como cuatro pasos en el orden de la escalera,
  conserva las habilidades del flujo, marca la celda abierta por su ancla y ofrece un enlace de
  vuelta al recorrido.
- En móvil cada flujo es su propio recorrido vertical.
- No cambia el contenido de las celdas, ni las anclas, ni la URL, ni el título, ni el conjunto de
  datos `competencies` de la API.

## Capabilities

### New Capabilities

- `competency-roadmap`: presentación de la matriz de competencias como recorrido (vías por flujo,
  etiquetas cortas, marco de pintura, detalle por pasos y lectura en pantallas estrechas).

### Modified Capabilities

Ninguna. Los requisitos de `competency-matrix` (tabla con cabeceras, anclas estables, lectura sin
JavaScript, sin desplazamiento lateral a 390 px, ninguna certificación como evidencia) se mantienen
tal cual (spec `openspec/specs/competency-matrix`, archivada con el PR #112).

## Impact

- `site/src/data/competencies.ts`: campo `label` por celda, etiqueta del quinto peldaño y sus
  invariantes en `competencyProblems()`.
- `site/src/pages/role/competencies.astro` y sus estilos: marcado de la tabla, panel sobre pintura
  (`Painting.astro`, clases `.mat` y `.credit` de `effects.css`), detalle por pasos.
- `site/tests/competencies.spec.ts`: las aserciones actuales deben seguir pasando; las nuevas pasan
  por la puerta de la skill `test-audit`.
- Sin dependencias nuevas. Sin cambios en la API, el servidor MCP, la navegación ni el sitemap.
