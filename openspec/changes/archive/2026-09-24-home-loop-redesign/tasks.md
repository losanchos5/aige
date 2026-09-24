# Tasks

## 1. Figura del bucle

- [x] 1.1 Crear `site/src/data/loop.ts` (carriles, 7 pasos con icono, ejemplo y nota, 7 aristas con camino y posición de etiqueta) y verificar con `astro check` que tipa
- [x] 1.2 Crear `site/src/components/GovernanceLoop.astro` (lienzo, conectores, haz, pasos, píldoras, franja de detalle, lista vertical) y verificar en el navegador a 1440 y 390
- [x] 1.3 Crear `site/public/loop.js` (estado activo, fijar y soltar, solo toque en la lista, una vuelta del haz al entrar en pantalla) y verificar que pasar el ratón por Inventory no parpadea

## 2. Sección y limpieza

- [x] 2.1 Rehacer `.loop-sec` en `index.astro` (cabecera arriba, figura a todo el ancho, caption y enlace de pie) y borrar su CSS viejo; verificar con `npm run build`
- [x] 2.2 Borrar `hero-loop*` (IR, notas, entradas de `diagrams.ts`), el bloque scoped de `diagrams.css`, `public/hero.js` y PNG huérfanos; verificar con `git grep hero-loop` sin resultados fuera del cambio

## 3. Fondos

- [x] 3.1 Parametrizar `.bg-mesh` en `effects.css` (variantes a/b/c, `--mesh-k`, fundido) sin cambiar la variante `a`; verificar capturas del rol antes y después
- [x] 3.2 Añadir `mesh` y `meshK` a `Section.astro` y aplicar el reparto en `index.astro`; verificar que las 4 secciones antes planas, el stack y Resources pintan mesh
- [x] 3.3 Documentar variantes y `--mesh-k` en `site/DESIGN.md`

## 4. Tests y verificación

- [x] 4.1 Actualizar `home.spec.ts` y `v1.spec.ts` y crear `loop.spec.ts` (parpadeo, geometría, teclado, movimiento reducido, fondos); verificar que pasan
- [x] 4.2 Cadena completa: `npm run build`, `npm test`, `npm run test:a11y`, `npm run test:visual`, `npm run lhci`, `npx impeccable detect dist`; todo verde y detector sin subir
- [x] 4.3 Capturas de la sección y la home en claro y oscuro a 1440/834/390 para Jordi
