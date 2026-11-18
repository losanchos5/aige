# Tasks

## 1. Datos

- [x] 1.1 Añadir `label` a `CompetencyCell` y las 28 etiquetas de
      `D:/Documents/aige-media/mockups/competencies-roadmap/labels.json` a `site/src/data/competencies.ts`,
      más la etiqueta del quinto peldaño (clave `function`); verificar que cada celda del módulo tiene
      su etiqueta y que el texto de `can`, `evidence` y `links` no cambia en el diff.
- [x] 1.2 Extender `competencyProblems()`: etiqueta presente y de dos a cuatro palabras, también la
      del quinto peldaño. La página ya llama a esta función al compilar
      (`competencies.astro`); verificar, cargando el módulo sin compilar (Vite `ssrLoadModule`, ver
      `D:/Documents/aige-wt/handoffs/oscal/gen.mjs`), que una etiqueta vacía o de cinco palabras
      produce un problema que nombra la celda.

## 2. Página

- [x] 2.1 Redibujar la `<table>` de la sección de la matriz como siete vías con roles ARIA
      explícitos, conectores y el nodo del quinto peldaño (`rowspan`, enlace a `#function`), con el
      CSS portado de `roadmap.css` del mockup y solo tokens del sitio; verificar que no queda ningún
      color en hexadecimal en el CSS nuevo y que los 28 enlaces apuntan a `#<workflow>-r<n>`.
- [x] 2.2 Envolver el recorrido en el panel sobre pintura (`Painting.astro`, `.mat`, `.credit`) con
      la leyenda de capas encima; verificar que no hay texto fuera del panel opaco.
- [x] 2.3 Pasar el detalle de cada flujo a cuatro pasos (rejilla, "Rung n" y nombre en líneas
      separadas, borde de acento en `:target`, enlace "Back to the roadmap") conservando
      `SkillsTable`; verificar que cada `article` mantiene su `id` y sus cuatro `section` con los ids
      actuales.
- [ ] 2.4 Vista estrecha: cada flujo como recorrido vertical con el peldaño nombrado en cada
      estación; verificar que la aserción de desplazamiento lateral a 390 px sigue pasando.

## 3. Pruebas

- [x] 3.1 Leer `C:/Users/Jordi/.claude/skills/test-audit/SKILL.md` y pasar por su puerta las pruebas
      candidatas: cada estación y el nodo final enlazan a un id que existe en la página; una fila
      expone su cabecera de flujo y sus cabeceras de peldaño en el árbol de accesibilidad. Verificar
      que solo se añaden las que pasan la puerta y que las aserciones actuales de
      `site/tests/competencies.spec.ts` siguen sin tocar.

## 4. Verificación y revisión

- [ ] 4.1 Subir la rama `feat/competencies-visual` y leer CI: compilación, pruebas, accesibilidad y
      Lighthouse en verde (sin compilar en local).
- [ ] 4.2 Capturas de la página real a 1440 y 390 px, en claro y en oscuro, comparadas con
      `shots/b-roadmap-*.png` y `shots/b-detail-1440-light.png` del mockup; las toma la sesión
      principal con un solo `astro dev`. Verificar que no hay etiquetas cortadas ni conectores
      sueltos.
- [ ] 4.3 Revisión con `code-reviewer`; resolver lo CRITICAL y lo HIGH.
- [ ] 4.4 Abrir el PR con la lista de texto nuevo para Jordi (29 etiquetas, encabezado y entradilla
      de la sección) y las capturas; verificar que Jordi confirma el texto antes del merge.

## 5. Tras el merge

- [ ] 5.1 Comprobar producción: `/role/competencies` responde 200, tiene los 28 ids y el nodo final
      enlaza a `#function`.
