# Design

## Context

Ver `proposal.md` (Why). Estado que condiciona el enfoque:

- El hero anterior (`.hero--loop`) combinaba titular, definición y figura del bucle en una sola
  pantalla; no llegaba a `100svh` ni tenía fondo animado. La cabecera era sticky y con fondo desde el
  primer pintado en todas las páginas.
- Restricciones duras vigentes (`DESIGN.md`): ninguna animación en el fold puede tocar `opacity`
  (axe/Lighthouse mezclan la opacidad fraccional en el ratio de contraste); todo movimiento respeta
  `prefers-reduced-motion`; todo script de cliente es un fichero externo (`script-src 'self'`, sin
  `unsafe-inline`); `--muted` no cumple AA sobre superficies tintadas u oscuras y se reescapa a
  `--ink-2`.
- Tipografía: tres familias variables auto-alojadas (Bricolage Grotesque, Instrument Sans, JetBrains
  Mono), `@fontsource-variable/*` copiadas a `/fonts/*.woff2`. `@fontsource-variable/newsreader` ya
  es dependencia del repo pero no se usaba.
- Gates: `npm run build` → `npm test` → `test:a11y` (axe, 0 violaciones serias/críticas, claro y
  oscuro, 1440/390) → `npm run test:visual` → `npm run lhci` (perf ≥ 0,95, a11y/BP/SEO = 1 en 9 URLs,
  `site/lighthouserc.cjs`) → `npx impeccable detect dist` (el recuento no puede subir respecto al
  baseline grabado, 62 hallazgos en la sesión de auditoría de impeccable del 2026-09-23/24).

## Goals / Non-Goals

**Goals:**
- Un hero a pantalla completa con presencia editorial (inspirado en iren.com) sin salir del sistema
  de tokens existente ni introducir una paleta nueva.
- Legibilidad AA del titular y de la cabecera garantizada de forma estructural, no por una capa
  translúcida fija que dependa de dónde caigan los blobs.
- Coste de rendimiento acotado: el shader se dibuja a una fracción del tamaño CSS y a ~30 fps; las
  fuentes nuevas solo se precargan en `/`.
- Todo movimiento nuevo controlable por el usuario (pausa) y silencioso bajo `prefers-reduced-motion`.

**Non-Goals:**
- Rediseñar cualquier otra landing, capítulo o página de referencia.
- Sustituir el mesh (`.bg-mesh`) del resto del sitio ni tocar sus tokens `--glow-*`.
- Vídeo o Lottie para el fondo del hero (peso y CSP más difíciles de acotar que un shader propio).
- Resolver el resto de hallazgos de la auditoría impeccable fuera de la home (bloque D2, `ui-4f`).

## Decisions

1. **Shader WebGL propio en un `<canvas>`, no un vídeo.** Un vídeo H.264/WebM habría costado
   cientos de KB, no se puede recolorear por tema sin duplicar el asset, y pausarlo bajo
   `prefers-reduced-motion` requiere JS igual que el shader. El shader (`public/hero-field.js`, sin
   dependencias, ~6 KB sin gzip) lee los tokens de tema en cada cambio (`MutationObserver` sobre
   `data-theme`) y se dibuja a una fracción del tamaño CSS (`SCALE = 0.5`, tope `MAX_W = 720`px) a
   ~30 fps (`FPS_MS`), reescalado por CSS — el campo no tiene bordes que perder al hacerlo. Riesgo
   conocido: WebGL puede no estar disponible o perder el contexto; `initGL()` devuelve `false` y
   `webglcontextlost` degrada al fallback CSS estático (mismos tokens `--field-1..3`), sin dejar el
   hero sin fondo.
2. **Paleta de tres tonos, no la mesh de cinco capas.** `--field-1` (navy, ink de L1), `--field-2`
   (azul, un tono medio entre L1 y el fondo) y `--field-3` (melocotón, cerca de L4) — tres blobs con
   trayectorias Lissajous lentas y un domain warp ligero, en vez de las cinco glows de `.bg-mesh` (el
   hero necesita una sola forma legible detrás del titular, no un fondo decorativo uniforme).
   `--hero-ink` es un cuarto token: la tinta del titular (L1-ink en claro, donde el campo es más
   claro que el fondo; `--ink` llano en oscuro, porque el L1-ink pálido leía demasiado azul sobre el
   campo).
3. **Legibilidad estructural, no una capa fija.** El fragment shader recibe la caja del titular
   (`u_box`, en px CSS) y la altura de la cabecera (`u_bar`) como uniforms recalculados en cada
   resize/cambio de fuente, y aclara u oscurece (`clear()`, búsqueda binaria de 8 pasos hacia
   `u_ground`) cada píxel dentro de esas zonas hasta el contraste objetivo (4.6:1 titular, 5:1
   cabecera — por encima del mínimo AA de 3:1/4.5:1, con margen) contra la tinta que se dibuja ahí.
   El blob navy además se ahueca cerca del titular y se atenúa cerca del borde superior
   (`hollow`/`top` en el shader), así la corrección es una red de seguridad y no un rectángulo
   translúcido permanente. Alternativa descartada: un velo `linear-gradient` fijo bajo el titular —
   se ve a simple vista como una placa y no se adapta si el titular cambia de tamaño (zoom, idioma).
4. **Newsreader como cortes estáticos, no variable.** Solo se necesita un tamaño óptico (72) y un
   peso (400) para una única línea de texto; instanciar con fontTools
   (`fonttools varLib.instancer … opsz=72 wght=400 --flavor woff2`) dos cortes (roman + italic) de
   ~22 KB cada uno evita cargar los ficheros variables completos (132/147 KB) por una sola línea.
   Alternativa descartada: mantener `.display-xl` (Bricolage a peso 350) — Jordi pidió explícitamente
   un serif editorial, y mantener el peso variable de Bricolage solo para el hero habría dejado dos
   mecanismos de "hero type" en el sistema.
5. **Cabecera fija y transparente solo en la portada.** `Header.astro` gana el prop `overlay`
   (`data-overlay`); sin scroll no lleva fondo, blur, línea ni sombra (el shader mantiene su texto
   `--ink-2` ≥ 5:1), y en cuanto `ui.js` marca `.is-scrolled` (>8px) cae al mismo bloque de reglas que
   usa el resto del sitio. `position: fixed` (no `sticky`) para que no ocupe espacio en el flujo y el
   hero arranque en el borde superior real del viewport.
6. **Franja de cifras como marquesina opcional, nunca badges sobre el titular.** Los valores se
   calculan en build time desde los módulos tipados (`data/stack`, `data/role`, `data/chapters`,
   `data/values`, `data/frameworks`, `data/patterns`, `data/site`), nunca se escriben a mano, así la
   franja no puede desincronizarse del resto del sitio. La marquesina solo se activa
   (`hero.classList.add('is-live')`) cuando `hero-field.js` confirma `prefers-reduced-motion:
   no-preference`; el control `.motion-toggle` (`aria-pressed`) para la franja y el campo a la vez,
   cumpliendo WCAG 2.2.2 (Pausar, Detener u Ocultar) para ambos movimientos con un solo control.
   Decisión de Jordi (2026-09-24): sin botón visible en la franja. El control queda fuera de pantalla
   hasta que recibe el foco del teclado (como el skip link); un clic o toque en la franja pausa y
   reanuda franja y campo (usuarios táctiles y de ratón), y el hover sobre la franja la pausa. Con
   `forced-colors: active` no se arranca el WebGL y queda el fondo CSS.
7. **La figura del bucle pasa a arrancar por scroll, no por carga.** Al separarla del hero en su
   propia `<Section tone="plain" class="loop-sec">`, ya no está garantizada en el viewport inicial;
   `public/hero.js` engancha un `IntersectionObserver` sobre `[data-hero-loop]` y dispara la única
   pasada de animación cuando entra en pantalla, en vez de en `DOMContentLoaded`.

## Risks / Trade-offs

- [El shader no alcanza el contraste objetivo con fuentes/zoom no previstos] → el shader recalcula
  `u_box` en cada `ResizeObserver` y en `document.fonts.ready`, y el `clear()` binario converge para
  cualquier tinta de partida; el test de contraste (`hero-field.spec.ts`) debe cubrir 1440/390,
  claro/oscuro y con el titular en su tamaño máximo (zoom 200%).
- [Lighthouse performance ≥ 0.95 en `/` con un shader + dos fuentes nuevas] → canvas a resolución
  reducida, ~30 fps, `powerPreference: 'low-power'`; fuentes precargadas solo en `/` y solo 2 cortes
  estáticos (~44 KB total) en vez de las variables completas; medir en `npm run lhci` antes de mover
  la tarea a hecha.
- [El detector de impeccable (baseline 62) marca la marquesina o la franja como anti-patrón nuevo] →
  revisar el diff de `npx impeccable detect dist` contra el baseline grabado; si aparece una regla
  nueva, decidir con Jordi si es un falso positivo (la franja ya está documentada como excepción en
  `DESIGN.md` restricción 8) o si hay que ajustar el diseño.
- [Pérdida del contexto WebGL en dispositivos de gama baja] → `webglcontextlost` cae al fallback CSS
  sin fondo negro ni hero vacío; cubierto por `hero-field.js` pero sin test automatizado de pérdida de
  contexto (se deja como verificación manual).
- [Cabecera transparente sin contraste suficiente antes del primer frame del shader] → el
  `<canvas>` permanece `visibility: hidden` hasta `data-ready` (primer `draw()`); el fallback CSS
  estático de `.hero-field` se pinta desde el primer momento con los mismos tres tonos, así la
  cabecera nunca flota sobre un fondo sin definir.

## Migration Plan

Sin migración de datos ni de rutas. Despliegue: push a `main` dispara `deploy.yml` (Cloudflare).
Rollback: revert del merge; no hay dependencias nuevas en runtime (Newsreader se compila a estático
en tiempo de build, no se importa en el cliente). Antes del merge, `curl -I` de producción para
confirmar que la CSP (`script-src 'self'`) no cambió pese al `<canvas>`.

## Open Questions

- Si el detector de impeccable marca la franja `.hero-facts` como "chip"/"badge" pese a la excepción
  documentada en `DESIGN.md`, decidir con Jordi si se ajusta el detector, el diseño, o se acepta el
  hallazgo como ruido conocido.
- Número final de la PR de destino (`#19`, apilada) puede cambiar si otra rama se mergea antes;
  confirmar el número base al abrir la PR de este cambio.
