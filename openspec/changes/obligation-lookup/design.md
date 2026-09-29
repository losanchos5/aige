# Design

## Context

- Registro: `site/src/data/frameworks.ts` (`obligations`, 182 filas; `clause` escrito a mano, p. ej.
  `Art. 14`, `Arts. 35–36`, `Art. 5(1)(c) and 25`, `A.6`, `GOVERN`, `prEN 18228`). Ayudantes
  `obligationPath`, `obligationById`.
- Crosswalk: `site/src/data/crosswalk.ts`, `refs` (576) = `refsV04 + refsV05 + refsGao +
  refsAiVerify`; `refObligation(r)` resuelve por `obligationId` o por texto heredado. 203 refs no
  resuelven; 37 tienen una única fila con la misma cláusula (medido el 2026-09-29).
- `/resources/crosswalk`: la celda de la matriz es un enlace `#topic-<id>` que `public/crosswalk.js`
  intercepta para clonar el `<article id="topic-...">` en un panel; el artículo ya imprime
  "Obligation page →" por referencia resuelta, así que el panel lo hereda.
- CSP sin `'unsafe-inline'`: los scripts van en `site/public/*.js` (patrón de `search.js`, combobox
  ARIA). i18n desactivado; cadenas en inglés en el componente.

## Goals / Non-Goals

**Goals:** encontrar una obligación por su cláusula en un paso; enlaces compartibles; subir la
cobertura crosswalk → registro sin trabajo editorial; cero cambios de CSP.

**Non-Goals:** filas nuevas en el registro; equivalencias curadas cláusula a cláusula; búsqueda de
texto libre (eso ya lo hace Pagefind con Ctrl+K); traducciones.

## Decisions

1. **Índice estático en build, no Pagefind.** Pagefind puntúa texto, no entiende "AI Act 14". Un
   JSON pequeño (~40 KB) con claves normalizadas da coincidencias exactas y deterministas. Se
   genera en `site/src/pages/obligations/lookup.json.ts` desde `obligations` y `refs`.
2. **Normalización compartida, una sola fuente.** `site/src/lib/obligation-lookup-core.js`
   (módulo ES puro, sin DOM, con JSDoc) exporta `clauseKeys(clause)`, `parseQuery(q, aliases)` y
   `rank(index, q)`. El endpoint de build lo importa para escribir las claves ya calculadas en el
   índice; el navegador lo recibe tal cual desde el endpoint `site/src/pages/obligation-lookup-core.js.ts`
   (importa el fichero con `?raw` y lo sirve como `text/javascript`), y el test de Playwright lo
   importa en Node. Así no hay copia en `public/` que pueda divergir.
   - `clauseKeys`: minúsculas; quita "art.", "arts.", "article", "artículo", "§", "principle",
     "action(s)"; parte por "and", "/", ","; expande rangos `35–36` / `35-36` a cada número; para
     `5(1)(c)` genera `5(1)(c)` y la base `5`; quita espacios y puntos (`A.6` → `a6`, `6.1.2` →
     `612`).
   - `parseQuery`: busca el alias de instrumento más largo al principio o al final de la consulta
     ("ai act", "iso 42001", "42001"); el resto es la cláusula. Sin alias, todo es cláusula; sin
     cláusula, solo instrumento.
   - `rank`: puntuación 3 = instrumento y clave exacta de la cláusula completa; 2 = instrumento y
     número base; 1 = cláusula sin instrumento (EU AI Act primero, luego orden del registro);
     prefijo (`a6` casa `a6…`) resta medio punto. Entradas de obligación antes que las de tema a
     igual puntuación. Máximo 8 resultados.
3. **Alias curados** en `site/src/data/obligation-aliases.ts`: `Record<frameworkId, string[]>`
   solo para los instrumentos con nombre corto ambiguo (EU AI Act, GDPR, ISO 42001/23894/42005,
   NIST AI RMF, GPAI CoP, CoE, OECD, G7, prEN, Colorado, etc.); además, automáticamente, el
   `frameworkId`, `framework.short` y `framework.name` normalizados. Un test comprueba que cada
   clave del mapa existe en `frameworks` o en `crosswalkFrameworks()`.
4. **Unión por cláusula exacta** en `crosswalk.ts`: `refs` pasa por `withClauseJoin()`, que añade
   `obligationId` cuando hay exactamente una fila con el mismo `frameworkId` y la misma cláusula
   normalizada (minúsculas, sin espacios, puntos ni prefijo "Art."/"Arts."). Se hace en los datos,
   no en `refObligation`, para que JSON, CSV, API y OSCAL lo vean igual. Criterio más estricto que
   `clauseKeys` a propósito: igualdad de la cláusula entera, sin expandir rangos.
5. **Componente** `ObligationLookup.astro` (`<form role="search">`, `<label>`,
   `<input type="search" role="combobox" id="lookup">`, `<ul role="listbox">` cuyas opciones son
   los propios enlaces, región `aria-live`, ejemplos
   como enlaces, botón "Search the whole site" con `data-search-open` que reutiliza el diálogo de
   Ctrl+K). El formulario sin JS hace GET a `/obligations` con `q` (inofensivo: la página se carga y
   la lista entera sigue ahí). Script `public/obligation-lookup.js` cargado con
   `<script is:inline type="module" src>` (un solo cargador aunque haya dos páginas; en cada página
   hay un único formulario). El `id="lookup"` va en el campo y no en el formulario: al navegar a
   `#lookup` el navegador enfoca el destino si es enfocable y, si no, devuelve el foco al viewport,
   lo que deshacía un foco puesto por script; con el campo como destino el foco es nativo.
6. **Portada**: el tile 12 completa la tercera fila del bento de cuatro columnas; va justo después
   de "Obligation register".

## Risks / Trade-offs

- **Alias que chocan** ("act", "code") → solo alias de dos palabras o con número; los genéricos no
  entran. Tests con los casos del spec.
- **Unión automática equivocada** → solo igualdad exacta de cláusula entera y fila única; la lista
  de las 37 se revisó a mano (todas son el mismo artículo). Un test fija el conteo mínimo.
- **Capturas visuales** del crosswalk, del registro y de la portada cambian → regenerar solo esas y
  revisarlas.
- **Peso del índice** → claves cortas, sin textos largos; límite de 60 KB comprobado en test.
