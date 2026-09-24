# Proposal

## Why

El diagrama del bucle de gobernanza de la home ("The discipline, defined.") parpadea sin parar si se deja el ratón sobre un nodo de la fila inferior (Inventory), sale diminuto en una columna de ~425 px, con etiquetas que pisan las líneas y nodos que se salen de sus carriles, y se ve plano y sin iconos. Además, cuatro secciones de la home no pintan ningún fondo desde que la auditoría retiró puntos y rejilla (SL-18), y Jordi pidió el 2026-09-24 que tengan el mismo fondo que la sección del rol.

## What Changes

- El diagrama archify `hero-loop` / `hero-loop-tall` de la home se sustituye por una figura propia: 4 carriles, 7 pasos con icono y color de capa, conectores con un haz animado que recorre el bucle, etiquetas junto a las líneas, detalle en una franja fija debajo y lista vertical en pantallas estrechas.
- El detalle de un paso ya no puede tapar el paso que lo abre (causa del parpadeo).
- La sección pasa a cabecera arriba y figura a todo el ancho del contenedor ancho.
- **BREAKING** (interno): se retiran los diagramas `hero-loop` y `hero-loop-tall`, sus notas, su CSS específico en `diagrams.css` y `public/hero.js`. Ninguna otra página los usa.
- El mesh de fondo gana intensidad configurable y dos composiciones más, y se funde arriba y abajo. Las secciones planas de la home (bucle, tres preguntas, valores, capítulos) pasan a mesh; el stack y Resources añaden un mesh suave y quieto sobre su tinte. La sección del rol no cambia.

## Capabilities

### New Capabilities
- `home-loop-figure`: la figura del bucle de gobernanza de la home (contenido, maquetación por ancho, interacción, movimiento y accesibilidad).
- `section-backdrop`: los fondos de sección de la home (qué secciones llevan mesh, variantes, intensidad, fundido y contraste).

### Modified Capabilities
(ninguna)

## Impact

- `site/src/pages/index.astro`, `site/src/components/Section.astro`, `site/src/styles/effects.css`, `site/src/styles/diagrams.css`, `site/src/data/diagrams.ts`, `site/DESIGN.md`.
- Nuevos: `site/src/components/GovernanceLoop.astro`, `site/src/data/loop.ts`, `site/public/loop.js`.
- Borrados: `site/diagrams/hero-loop*.json`, `site/public/hero.js`, PNG huérfanos de `tests/__screenshots__/I/`.
- Tests: `site/tests/home.spec.ts`, `site/tests/v1.spec.ts`, nuevo `site/tests/loop.spec.ts`.
- Sin dependencias nuevas. Los iconos son paths de Lucide (ISC) copiados en el código.
