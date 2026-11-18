# Design

## Context

Ver `proposal.md` (Why). Estado de partida en origin/main `6f58743`:

- `site/src/pages/role/competencies.astro` usa `Base`, `PageHero variant="res"`, `Callout`,
  `Citation` y `SkillsTable`. La sección "The matrix" es una `<table>` real cuyas celdas enlazan a
  `#<workflow>-r<n>` (`competencyCellId`); en móvil se apila con `data-label`. Debajo, un `article`
  por flujo con `SkillsTable` y cuatro `section.cm-cell`, y la banda `#function`.
- `site/src/data/competencies.ts` tiene 28 celdas (`can`, `evidence`, `links`) sin etiqueta corta, y
  `competencyProblems()` como comprobación de datos.
- El patrón "panel sobre pintura" ya existe: clases `.mat`, `.paint` y `.credit` en
  `site/src/styles/effects.css` y el componente `Painting.astro`; su único uso en producción es
  `GovernanceLoop.astro` en la home.
- `site/tests/competencies.spec.ts` fija: la primera `table` visible sin JavaScript, cada uno de los
  28 ids una sola vez, los enunciados de función en `main`, sin desplazamiento lateral a 390 px y
  axe AA en claro y oscuro.
- El mockup aprobado (variante B) es la referencia visual:
  `D:/Documents/aige-media/mockups/competencies-roadmap/` (`variant-b.html`, `roadmap.css`,
  `build.mjs`, `labels.json`, `shots/`).

## Goals / Non-Goals

**Goals:**

- Llevar la variante B del mockup a la página real con los tokens y componentes del sitio.
- Que las aserciones actuales de `competencies.spec.ts` sigan pasando sin tocarlas.

**Non-Goals:**

- Cambiar el texto de `can`, `evidence` o los enlaces de las celdas.
- Exponer las etiquetas en la API (`/api/v1/competencies.json`) o en el servidor MCP.
- Una primitiva genérica de "roadmap" para otras páginas: es marcado y CSS de esta página.
- Enlazar al mapa de certificaciones: lo hace el cambio `certification-map`.
- La variante A ("spine") del mockup.

## Decisions

1. **La tabla se queda y se redibuja con CSS.** Las vías son las filas de la `<table>` existente,
   con rejilla CSS y conectores en pseudo-elementos. Como cambiar `display` en una tabla puede
   quitarle la semántica en algunos navegadores, el marcado lleva roles ARIA explícitos (`table`,
   `row`, `columnheader`, `rowheader`, `cell`). Alternativa descartada: un SVG o una lista aparte con
   la tabla plegada en un `<details>` (variante A), porque duplica el contenido y obliga a cambiar la
   spec de la matriz.
2. **Nodo del quinto peldaño dentro de la tabla.** Es una celda de la primera fila que abarca las
   siete (`rowspan` y `aria-rowspan`), con su cabecera de columna, y enlaza a `#function`.
3. **Etiquetas en los datos.** `CompetencyCell` gana `label` y el módulo exporta la etiqueta del
   quinto peldaño. `competencyProblems()` comprueba presencia y de dos a cuatro palabras. La API no
   cambia porque serializa los campos de la celda uno a uno (`site/src/lib/api.ts`).
4. **Alto de estación por contenido.** En el mockup las estaciones tienen alto fijo (76 px); en el
   sitio el alto lo da el contenido y la fila iguala alturas, para que una etiqueta reescrita por
   Jordi no se corte.
5. **Pintura.** La del mockup, "Misty Morning at Pourville" (`pourville-misty-morning` en
   `site/src/data/paintings.ts`), con `Painting.astro` y `.mat`. Si una prueba o una regla del
   catálogo impide repetir pintura entre páginas, se usa otra del catálogo y se dice en el PR.
6. **Detalle por pasos.** Las cuatro `section.cm-cell` de cada flujo pasan a una rejilla de cuatro
   columnas en pantallas anchas, cada una con "Rung n" y el nombre del peldaño en líneas separadas
   (así los puntos y el conector quedan alineados). `SkillsTable` se conserva porque la spec de la
   matriz exige las habilidades del flujo. La celda `:target` lleva un borde de acento de 3 px.
7. **Anclas y encabezados.** Ningún `id` cambia. Si el texto del encabezado "The matrix" pasa a
   "The roadmap", el `id` de la sección se mantiene.
8. **Sin JavaScript nuevo.** Todo son enlaces y CSS; el movimiento es solo `transform` y se
   desactiva con `prefers-reduced-motion`.

## Risks / Trade-offs

- [Los roles ARIA sobre una tabla con `rowspan` se anuncian distinto según el lector de pantalla]
  → axe en CI y una comprobación del árbol de accesibilidad de una fila en la prueba de la página.
- [Texto nuevo sin aprobar llega a producción] → las 29 etiquetas, el encabezado y la entradilla de
  la sección van listados en el cuerpo del PR y Jordi los confirma antes del merge.
- [Esta máquina se queda sin memoria con una compilación más Playwright] → no se compila en local:
  se sube la rama y se lee CI. Las capturas de la página real las toma la sesión principal con un
  solo `astro dev` y una sola página de Playwright, nunca a la vez que otra tarea pesada.
- [El PR #112 movió `openspec/changes/competency-matrix` a `openspec/specs/`] → este cambio no toca
  esos ficheros; la rama se rebasó sobre main tras su fusión (2026-11-18).
