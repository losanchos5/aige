# Tasks

## 1. Datos y unión por cláusula

- [x] 1.1 `withClauseJoin()` en `site/src/data/crosswalk.ts` aplicado a `refs`; comentario de
      cabecera actualizado
- [x] 1.2 `site/src/data/obligation-aliases.ts` con los alias curados por `frameworkId`

## 2. Lógica de búsqueda

- [x] 2.1 `site/src/lib/obligation-lookup-core.js` (`clauseKeys`, `parseQuery`, `rank`) servido
      por el endpoint `site/src/pages/obligation-lookup-core.js.ts`; `site/src/lib/obligation-lookup.ts` construye las entradas
- [x] 2.2 Endpoint `site/src/pages/obligations/lookup.json.ts` (obligaciones + refs sin fila)

## 3. Interfaz

- [x] 3.1 `site/src/components/ObligationLookup.astro` con estilos, ejemplos sin JS y botón al
      buscador del sitio
- [x] 3.2 `site/public/obligation-lookup.js` (combobox, `?q=`, `#lookup`, Esc, estado vacío)
- [x] 3.3 Montar en `/obligations` (antes de los filtros) y en `/resources/crosswalk` (antes de la
      matriz)
- [x] 3.4 Tile "Look up an article" en la portada, tras "Obligation register"; comentario del
      bento actualizado

## 4. Tests y verificación

- [x] 4.1 `site/tests/obligation-lookup.spec.ts`: casos del spec sobre la lógica, índice (rutas
      existentes, tamaño), unión (Art. 87, 6.1.2 sin unir, mínimo 410 refs unidas), interfaz
      (teclado, `?q=`, `#lookup`, sin JS, crosswalk), tile de portada
- [x] 4.2 Build completo, `npm test`, `test:a11y`, `test:visual` (regenerar solo capturas afectadas
      y revisarlas), lhci al final
- [x] 4.3 Commit por ruta, PR con el token de losanchos5
