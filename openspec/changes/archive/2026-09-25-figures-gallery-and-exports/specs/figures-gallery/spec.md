# Spec Delta

## Purpose

Cada figura tiene una URL estable que se puede citar, con todo lo necesario para reutilizarla
bien: la figura, su alternativa textual, dónde aparece, las descargas, fragmentos para incrustar
con la atribución completa, una cita y datos estructurados que declaran la licencia.

## ADDED Requirements

### Requirement: Galería `/figures`
El sitio SHALL publicar `/figures` con todas las infografías de `figures.ts` que tienen SVG y
todos los diagramas archify de `diagrams.ts`, agrupados por parte (`chapterParts`) y capítulo
según su primera colocación; las figuras sin capítulo MUST abrir la página en un grupo propio.
Cada infografía MUST enlazar su permalink y mostrar una miniatura decorativa (`aria-hidden`, fuera
del orden de tabulación, sin ids ni enlaces internos); cada diagrama MUST enlazar su visor
`/diagrams/<id>` cuando existe en la build y su capítulo.

#### Scenario: Diagrama sin visor en la build
- **WHEN** el HTML del visor de un diagrama no está en `public/diagrams`
- **THEN** la tarjeta muestra el título sin enlace al visor, y `check-links` no encuentra enlaces
  rotos

### Requirement: Permalink `/figures/<id>`
Cada infografía con SVG SHALL tener una página `/figures/<id>` con: la figura (el mismo SVG que
inserta el capítulo, con los anclajes `#` reescritos hacia el capítulo que los contiene), su
leyenda, la alternativa textual visible, la tabla `data` cuando existe, la lista de lugares donde
aparece (anclas reales de encabezado, calculadas como `rehype-slug`), las descargas existentes con
tamaño y dimensiones, una línea de crédito con título, autor, fuente y licencia, fragmentos HTML
(`img` + `figcaption`) y Markdown para incrustar, un bloque `FigureCite` con referencia y BibTeX, y
un aviso de contenido fechado cuando hay `asOf`. Los pósteres MUST mostrarse en una región
desplazable y enfocable con un ancho mínimo legible.

#### Scenario: Figura con enlaces internos
- **WHEN** se publica `/figures/pattern-map`
- **THEN** cada chip enlaza `/bok/patterns#<patrón>` y `check-links` los resuelve

#### Scenario: Copiar sin JavaScript
- **WHEN** el lector no tiene JavaScript o el portapapeles está bloqueado
- **THEN** la referencia, el BibTeX, la línea de crédito y los fragmentos siguen visibles y
  seleccionables; con JavaScript, `/figure-cite.js` los copia sin JS en línea

### Requirement: JSON-LD `ImageObject`
Cada permalink SHALL añadir al grafo JSON-LD del sitio un `ImageObject` con `contentUrl` (PNG claro
de 1600 px), `license` (URL de la licencia), `acquireLicensePage` (`/figures/<id>#reuse`),
`creditText`, `copyrightNotice`, `creator` (referencia al nodo `Person`), `datePublished` y
`dateModified` (fechas de git del SVG y de `figures.ts`), y la galería SHALL declarar un
`CollectionPage` cuyo `hasPart` referencia esos nodos.

#### Scenario: Metadatos de licencia de imagen
- **WHEN** un buscador lee `/figures/art73-clock`
- **THEN** encuentra un `ImageObject` con `license` igual a
  `https://creativecommons.org/licenses/by/4.0/` y `acquireLicensePage` que apunta a la sección
  "Reuse and credit" de la misma página

### Requirement: Rutas fechadas en el sitemap
`/figures` y cada `/figures/<id>` SHALL tener entrada en `SOURCE_BY_PATH` de
`site/astro.config.ts`, fechadas por su plantilla, `figures.ts` (y `diagrams.ts` para la galería) y
el SVG de la figura.

#### Scenario: Cambio del SVG de una figura
- **WHEN** se hace commit de un cambio en `src/figures/art73-clock.svg`
- **THEN** el `lastmod` de `/figures/art73-clock` pasa a la fecha de ese commit
