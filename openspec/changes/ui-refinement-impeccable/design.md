# Design

## Context

Ver `proposal.md` (Why). Estado actual que condiciona el enfoque:

- Astro 5 sin framework de UI ni Tailwind. CSS a mano en `site/src/styles/` importado desde
  `site/src/layouts/Base.astro`. Primitivas: `Section.astro` (tonos plain/tint/dark/mesh),
  `.card-lum`, `.lift`, `.bento`, `.reveal`/`.reveal-stagger`, `.story-pin`.
- Todo el JS de cliente va en `site/public/*.js` cargado con `<script is:inline src>`; ningún script
  pasa hoy por el bundler. CSP en `site/public/_headers`: `script-src 'self'`, sin inline.
- Reveal en `site/src/styles/utilities.css` (≈ 90–144): `animation-timeline: view()` solo con
  transform, fallback IntersectionObserver en `public/ui.js`. Motivo: axe y Lighthouse mezclan la
  opacidad fraccional en el ratio de contraste y Lighthouse no emula reduced-motion.
- `--muted` no cumple AA sobre bandas tintadas; `effects.css` lo re-escopa en `.sec--tint/.sec--dark`.
- Gates: `npm run build` → `npm test` → `test:a11y` → `test:visual` → `lhci` (el último, borra
  `dist/pagefind`). Lighthouse: perf ≥ 0,95, a11y/BP/SEO = 1 en 9 URLs (`site/lighthouserc.cjs`).
- impeccable no está instalado; `motion` no está en `site/package.json`.

## Goals / Non-Goals

**Goals:**
- Pulido perceptible de transiciones y estados sin tocar tokens, tipografías ni registro editorial.
- Un único punto de entrada de animación por script (`site/src/scripts/motion-ui.ts`) con guard de
  reduced-motion compartido.
- Sistema visual documentado en ficheros que impeccable y futuras sesiones lean primero.
- Gate reproducible del detector de anti-patrones.

**Non-Goals:**
- Rediseño de layout, paleta o tipografía. Nuevas páginas o contenido.
- Integrar React ni librerías React (motion-primitives, kokonutui, react-bits, react-spring).
- Cambiar las cabeceras CSP o el mecanismo de reveal existente.
- Arreglar las figuras archify listadas en `PENDIENTE.md` (estética de diagramas, fuera de alcance).

## Decisions

1. **`motion/mini` bundleado por Astro, no copiado a `public/vendor/`.**
   `<script>import '../scripts/motion-ui.ts'</script>` en `Base.astro`; Vite emite
   `<script type="module" src="/_astro/motion-ui.[hash].js">`, que cumple `'self'`, hereda la
   cabecera immutable de `/_astro/*`, se tree-shakea y queda fijado en `package.json`.
   Alternativa descartada: copiar el IIFE completo a `public/vendor/` (≈ 18 KB gz, script de copia
   extra, sin tree-shaking). Riesgo conocido: es el primer script bundleado del repo; un assert en
   `site/tests/infra.spec.ts` comprueba que no hay `<script>` inline, y si Astro inlinara el módulo se
   fija `vite.build.assetsInlineLimit: 0` en `site/astro.config.ts`.
2. **Motion solo para secuencias que el CSS no encadena bien**: spring del toggle, panel + stagger de
   drawers, count-up de StatTile (sustituye el rAF a mano de `public/countup.js`), stagger de capas
   en `/stack`. Todo lo demás sigue en CSS (`@starting-style` para el dialog, transiciones con
   `--dur`/`--ease`). Alternativa descartada: usar motion en el reveal general (rompería la regla
   transform-only del view timeline y añadiría JS al primer pintado).
3. **Guard único de reduced-motion en script**:
   `run(fn, final)` ejecuta `final()` de forma síncrona bajo `prefers-reduced-motion: reduce`. Cada
   uso define su estado final explícito. La comunicación entre `public/ui.js` (toggle) y el módulo
   bundleado es por `CustomEvent('theme:changed')` en `document`, para no mezclar los dos sistemas
   de carga.
4. **`DESIGN.md` sembrado desde `tokens.css`/`effects.css` antes de auditar**, para que impeccable
   audite contra el sistema real y no proponga paleta propia. `PRODUCT.md` toma la voz de
   `STYLEGUIDE.md`. Ambos en `site/` porque los detectores leen `site/src`.
5. **Impeccable como plugin global** (ámbito user), igual que `frontend-design`. Los comandos
   `/plugin` e `/impeccable init|audit|critique` son interactivos: los ejecuta Jordi. El detector
   (`npx impeccable detect dist`) sí es ejecutable por subagentes y es el gate.
6. **Bloques independientes por subagente**, sin worktrees: Fase C primero (base compartida), luego
   D1 + D4 en paralelo, después D2 + D3 + D5 + D6 en paralelo. Ficheros compartidos (`ui.js`,
   `effects.css`): el segundo bloque relee antes de editar. Screenshots regenerados por bloque.
7. **Color, no opacidad, para estados secundarios** (`.is-past` del TOC, `.source` de StatTile,
   `.nl-note`): `--ink-2` o `--muted` re-escopado. Cumple la restricción 2 y evita falsos positivos
   de contraste.

## Risks / Trade-offs

- [El chunk de motion supera 8 KB gz porque entra `motion` completo] → importar solo desde
  `motion/mini` (`animate`, `inView`, `stagger`) y `spring` desde `motion`; medir en el build.
- [Churn de screenshots: 7 juegos × 2 esquemas × 2 anchos] → regenerar por bloque con
  `--update-snapshots`, revisar el diff de PNG antes de commitear.
- [Transform en ancestros de `.story-pin` rompe el sticky de `/stack`] → el stagger se aplica a las
  capas, nunca al contenedor; test manual + `stack-role.spec.ts`.
- [`--muted` sobre superficies tintadas nuevas] → toda banda nueva usa `Section tone=` y hereda el
  re-scope de `effects.css`.
- [Dark mode divergente en springs/scrims] → solo tokens; `a11y.spec.ts` recorre ambos esquemas.
- [Sesión paralela sobre el mismo árbol] → patrón worktree + `PW_PORT` (memoria del proyecto).
- [impeccable `init` crea ficheros no previstos] → revisar `git status` antes de commitear; añadir
  `site/.impeccable/` a `.gitignore` si aparece.

## Migration Plan

Sin migración de datos. Despliegue: push a `main` dispara `deploy.yml` (Cloudflare). Rollback:
revert del merge; `motion` se elimina con `npm uninstall motion` y borrando la línea de
`Base.astro`. Antes del merge, `curl -I` de producción para confirmar que la CSP no cambió.

## Open Questions

- Si `npx impeccable detect` necesita estilos computados y no acepta `dist/` estático, se ejecuta
  contra `npm run preview` en `http://localhost:4321/`. No cambia el gate, solo el comando.
