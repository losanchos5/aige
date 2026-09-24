# Design

## Context

Ver proposal.md (Why). Estado actual en `origin/main` 6e2f2f3:

- La sección `.loop-sec` de `site/src/pages/index.astro` pinta dos `<Diagram bare>` (archify `dataflow`, uno por breakpoint) dentro de `.hero-panel`, con CSS específico en `site/src/styles/diagrams.css` (bloque "homepage loop figure (scoped)") y un paquete viajero en `site/public/hero.js`.
- El parpadeo sale de `.loop-sec .diagram-note` (posición absoluta abajo-izquierda, `z-index: 3`, hasta 32rem × 66%): la nota que abre `mouseenter` tapa el nodo y dispara `mouseleave`.
- `Section.astro` solo pinta capa de fondo con `tone="mesh"`; `.sec--plain` no tiene CSS. El mesh (`effects.css`) tiene posiciones fijas y la opacidad `--mesh-alpha`; el rol la baja a 0.6 con un selector global en `index.astro`.
- Restricciones de `site/DESIGN.md`: scripts externos (CSP `script-src 'self'`), animación solo bajo `prefers-reduced-motion: no-preference`, nunca atenuar texto con `opacity`, `--muted` re-escopado en superficies que no son `--bg`, sin halos `--glow-*` en tarjetas, sin puntos ni rejilla.

## Goals / Non-Goals

**Goals:**
- Figura del bucle legible a cualquier ancho, sin solapes ni parpadeo, con iconos y un movimiento sobrio.
- Una sola fuente de datos tipada para pasos, carriles y aristas.
- Mesh reutilizable con composición e intensidad por sección.

**Non-Goals:**
- No se toca `Diagram.astro`, `diagram.js` ni ningún otro diagrama archify.
- No cambian las páginas que no son la home (salvo el fundido del mesh, ver Riesgos).
- No se cambian textos del Thesis ni del BoK.

## Decisions

1. **Figura propia en HTML + SVG, no archify.** Archify no admite iconos ni tarjetas HTML y su tipografía en unidades de usuario obligó a escalar etiquetas ×2 (origen de los solapes). Alternativa descartada: parchear el IR y el CSS; seguiría sin iconos y con el mismo techo visual.
2. **Lienzo de proporción fija con coordenadas compartidas.** Un viewBox 1000 × 460; el lienzo HTML tiene `aspect-ratio: 1000 / 460`, los pasos, carriles y píldoras se colocan en % de ese viewBox y el SVG de conectores lo llena. Al escalar todo por igual, líneas y tarjetas casan a cualquier ancho sin medir en JS. Alternativa descartada: medir cajas con JS y dibujar líneas en tiempo de ejecución (más código, riesgo de CLS).
3. **Geometría.** Carriles de 232 de ancho cada 256 (x 0, 256, 512, 768); tarjetas 200 × 100 con 16 de margen; filas y = 96 (arriba), 204 (ley), 312 (abajo); canal de retorno por arriba en y = 64, de Evidence store a la ley. Las rutas y sus longitudes se calculan desde las cajas (`route()` en `loop.ts`), no se escriben a mano. Aristas ortogonales con esquinas redondeadas; las que cambian de carril usan el pasillo entre carriles (x 244, 500, 756). Todas las etiquetas van a la izquierda de su tramo vertical, en espacio libre del carril; "closes the loop" va bajo el canal.
4. **Lista vertical por container query.** `.loop` es `container-type: inline-size`; por debajo de 760 px de contenedor el mismo DOM (`<ol>` de 7 pasos) se apila y el SVG, los carriles y las píldoras se ocultan. El verbo de cada arista vive en el `<li>`: visible en la lista y solo para lectores de pantalla en el lienzo.
5. **Detalle sin tapar nada.** En el lienzo, una franja debajo con los 8 paneles (texto por defecto + 7 pasos) apilados en la misma celda de grid y alternados con `visibility`: su alto es siempre el del panel más alto, así que cambiar de paso no mueve la página. En la lista vertical, la nota va en línea bajo la tarjeta activa. Cada botón apunta a su nota con `aria-describedby`; la franja es `aria-hidden` porque duplica esa nota.
6. **Un estado en `public/loop.js`.** `data-active` en la figura. En el lienzo, ratón y foco de teclado activan; `pointerleave` del lienzo (con 120 ms de gracia) o `focusout` restauran. En la lista solo el clic o toque abre y cierra, porque abrir una nota en línea desplaza los pasos de debajo (bajo un dedo que va a levantarse o durante un scroll). `click` fija o suelta; `Escape` o una pulsación fuera sueltan; `aria-expanded` refleja solo el pin. Las capas decorativas llevan `pointer-events: none`, así que nada se interpone entre el puntero y un paso.
7. **Haz en CSS, una vuelta.** Cada arista tiene una copia con un guion corto que avanza con `stroke-dashoffset`; los retrasos por arista siguen el orden del bucle y el paso de llegada hace un anillo breve (un borde en una capa decorativa, nunca el texto). La vuelta dura 4,8 s (seis aristas de un pulso de 0,6 s y el retorno de dos) para cumplir WCAG 2.2.2 sin control de pausa; `loop.js` la reproduce con `data-play` cada vez que la figura entra en pantalla. Todo bajo `prefers-reduced-motion: no-preference` y en pausa con `data-active`. Alternativa descartada: bucle infinito, que exigiría un control de pausa visible.
8. **Iconos.** Paths de Lucide (ISC) copiados en `src/data/loop.ts` con el aviso de licencia: scale, code-xml, package, flask-conical, shield-check, archive, badge-check. Sin dependencia npm.
9. **Mesh parametrizado.** Las cinco posiciones y colores pasan a custom properties con los valores actuales como variante `a`; `b` y `c` las reordenan. Intensidad `--mesh-k` (prop `meshK`), que sustituye el selector global del rol. Las variantes `b` y `c`, y cualquier mesh sobre un tinte, son estáticas: la deriva se queda en el rol para no multiplicar capas compuestas grandes. `Section` pinta la capa con `tone="mesh"` o cuando una banda tint pasa `mesh` (stack y Resources: tinte + mesh quieto, para que ninguna banda de la home quede plana).
10. **Fundido.** `.sec--mesh > .bg-mesh` y la capa sobre tinte llevan `mask-image` vertical (transparente en el 10% de arriba y de abajo) para que dos secciones con mesh distinto no dejen costura.

## Risks / Trade-offs

- [El fundido afecta a cualquier `tone="mesh"` de otras páginas] → es sutil (10% del alto); se revisan las capturas de las páginas que lo usan.
- [Texto de tarjeta que no cabe a 760-900 px de contenedor] → tamaños por container query y test de geometría a 834 y 1024.
- [Contraste de etiquetas sobre el panel] → el panel es opaco (`--surface` sobre `--bg`) y las etiquetas usan `--ink-2`; axe en claro y oscuro.
- [Rendimiento con varios mesh] → solo el rol deriva; lhci ≥ 0.95.
- [Tests y capturas que dependían de `hero-loop` y `.hero-packet`] → se actualizan `home.spec.ts` y `v1.spec.ts`.

## Migration Plan

Rama `feat/home-loop-redesign` desde `origin/main`, PR a `main`; el deploy sale al mergear. Rollback: revertir el merge (los diagramas borrados vuelven con él).
