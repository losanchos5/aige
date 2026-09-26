# Design

## Context

El motivo está en proposal.md, en el apartado Why. Esto es lo que ya existe:

- **Sistema Editorial+** en `site/src/styles/effects.css` y `Section.astro`:
  - tonos `plain`, `tint`, `dark` y `mesh`;
  - composiciones `a`, `b` y `c`;
  - el factor `meshK`;
  - el re-escopado de `--muted` en superficies tintadas.
- **Página de lectura** (`Doc.astro`): `article.prose` de 72ch dentro de `.doc-main`, que es un
  contenedor de consulta. Por eso las figuras rompen hasta el pozo con `100cqw`.
- **Reglas de `site/DESIGN.md` que siguen en vigor**:
  - nunca atenuar texto con opacity;
  - nunca un mesh bajo una tabla o una rejilla de nodos;
  - un mesh por sección;
  - vecinas con composiciones distintas;
  - deriva solo con transform y solo sin movimiento reducido;
  - sin texturas de puntos o rejilla;
  - SL-06: un color de capa significa esa capa.

El prototipo de las tres páginas ya está implementado en la rama `feat/visual-rhythm`. Las
decisiones de abajo describen ese prototipo, y el resto de familias las reutiliza.

## Goals / Non-Goals

**Goals:**
- Una sola caja de herramientas (tokens y clases) que sirva para las cuatro familias: lectura,
  referencia, detalle y marketing.
- Que la mayoría de páginas herede el cambio del layout o del componente, sin editar página a
  página: 24 capítulos, 33 patrones y unas 500 fichas de detalle.
- Cero JavaScript nuevo y cero coste de pintura continuo. Todo lo nuevo es quieto.

**Non-Goals:**
- No se reescribe contenido ni se cambian textos.
- No se envuelven los H2 en `<section>` con un plugin rehype. Eso rompería los selectores `.prose >`
  de las figuras, el splice por `<h2` de `/ai-governance` y las etiquetas de rehype-tables.
- No se toca el hero de la portada (la pintura), ni el verdict beat, ni `CtaBand`.

## Decisions

1. **Las pausas se cuelgan de lo que ya hay**: figuras, «At a glance», avisos y tablas de primer
   nivel. El prototipo mostró que en los capítulos esas piezas caen cada una o dos pantallas, así
   que dan ritmo sin tocar el Markdown. Se descartó la alternativa de bandas por cada H2, porque es
   invasiva y además convierte la lectura en un zigzag de fondos.
2. **El panel de pausa pinta su fondo en capas**:
   - radiales con `padding-box`;
   - el suelo `--pause-bg` con `padding-box`;
   - `--grad-ring` con `border-box` bajo un borde transparente de 1 px.

   Así hay un solo paint, sin pseudo-elementos, y las figuras que ya usan `::before` o `::after`
   no se ven afectadas. Se descartó reutilizar `.bg-mesh`, porque exige un hijo en el markup que el
   Markdown no tiene.
3. **Avisos en banda con el texto a la medida de la columna**: `width: 100cqw`, y como padding
   inline `calc(50cqw - 50%)` más el paso de espaciado. El `%` del padding resuelve contra la
   columna, así que el texto se alinea con la prosa. La ruptura solo se aplica bajo
   `:is(.doc-main, .pillar-main)`, porque sin contenedor `cqw` cae al viewport y abriría scroll
   horizontal en las fichas Base con `.prose`.
4. **La cabecera del capítulo lleva un mesh por parte, no por capa**:
   - `discipline`: composición `a` quieta;
   - `foundations`: `c`;
   - `lifecycle`: `b`;
   - `law`: `d`;
   - `reference`: `e`.

   Da color en todos los capítulos sin reclamar ninguna capa (SL-06). Un capítulo con `layer`
   conserva su tinte y no lleva mesh.
5. **Tintes por tono como tokens y `data-hue` en `Section`**. Un tono es un ambiente, no una capa.
   La banda `deep` comparte el bloque de tokens de `.sec--dark` y solo cambia el fondo y
   `--muted`, que pasa a `--ink-2` porque `#8e9199` sobre el navy da 3.6:1.
6. **El cierre de Doc va en un slot con nombre `after`**, fuera de `.doc.container`, para que la
   banda ocupe todo el ancho. La página decide qué va dentro: en los capítulos, los enlaces
   relacionados y el newsletter; en los patrones, `pp-related`.
7. **`--grad-ring` se declara una sola vez en `:root`**: `var()` resuelve con los valores del tema
   activo, así que en oscuro da tonos medios sin repetir la declaración.

## Risks / Trade-offs

- [Los tests de la portada fijan tonos y opacidades concretos] → Se actualizan `loop.spec.ts` y los
  specs `section-backdrop` y `home-positioning` en este mismo cambio.
- [Una tabla más ancha cambia el ajuste de línea y las capturas V3/E] → Las capturas se regeneran en
  local y no se hace commit de los PNG, como en los PR anteriores.
- [Más fondos, más coste de pintura en Lighthouse] → Todo lo nuevo es quieto, porque solo deriva el
  mesh del rol. lhci se pasa al final, con perf ≥ 0.95 en las 18 URLs.
- [Una banda de cierre vacía cuando no hay endpoint ni enlaces] → Se renderiza solo si hay algo que
  mostrar.
- [Contraste en un tinte nuevo] → axe completo en claro y oscuro a 1440 y 390 px, y `--muted` se
  re-escopa en todas las superficies nuevas.

## Migration Plan

1. Primitivas y prototipo, ya hechos y verificados con axe en las tres páginas.
2. Despliegue por familias: lectura, hubs de referencia, fichas de detalle y landings de
   marketing. Cada familia se compila y se revisa con capturas.
3. Specs y tests: `loop.spec.ts` y DESIGN.md.
4. Suite completa en este orden: `npm run build`, después `npm test`, el proyecto `a11y` y, al
   final, lhci.
5. Un PR a `main`, que Jordi mergea a mano. Para volver atrás basta con revertir el merge: no hay
   datos ni contenido afectados.
