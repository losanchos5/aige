# Proposal

## Why

La UI del sitio (`site/`) tiene un sistema visual sólido (tokens, `effects.css`, `Section`) pero sin
pulido de detalle: transiciones que cortan (theme toggle, search dialog, drawers), estados visuales
que no se ven (`is-scrolled`, TOC `is-past`), textos secundarios en `--muted` sobre bandas tintadas y
ninguna herramienta que detecte anti-patrones de diseño antes de desplegar. Jordi quiere elevar la
calidad percibida apoyándose en impeccable (auditoría + detector) y en `motion` para las pocas
secuencias que el CSS no encadena bien, sin rediseñar ni romper los gates de accesibilidad.

## What Changes

- Herramientas de diseño: impeccable como plugin global de Claude Code; `site/PRODUCT.md` y
  `site/DESIGN.md` sembrados desde los tokens y primitivas existentes; `npx impeccable detect dist`
  como gate nuevo (los hallazgos no pueden subir respecto al baseline).
- Nueva dependencia `motion` (build vanilla, importada desde `motion/mini`) bundleada por Astro a
  `/_astro/` para cumplir la CSP `script-src 'self'`. Presupuesto ≤ 8 KB gz. Usos acotados: spring
  del theme toggle, secuencia de drawers, count-up de StatTile, stagger de capas en `/stack`.
- Refinamiento visual por bloques manteniendo tokens, tipografías y registro editorial:
  chrome global (header, footer, toggle, search dialog), home y `Marketing.astro`, landing pages,
  experiencia de lectura del BoK (`Doc.astro`, `prose.css`, TOC, PrevNext), tablas y drawers de
  resources, about/404/newsletter.
- Nuevo assert de infraestructura: ningún `<script>` inline en el HTML generado.
- Regeneración de las baselines de screenshots por bloque.

Sin cambios **BREAKING**: no cambian rutas, modelo de navegación ni contenido.

## Capabilities

### New Capabilities
- `ui-motion`: comportamiento del movimiento en toda la UI (reducción de movimiento, solo
  transform en el fold, sin scripts inline, presupuesto de peso) y las interacciones animadas
  nuevas (toggle, drawers, count-up, capas del stack, search dialog, header desplazado).
- `reading-experience`: estados visibles de la lectura larga del BoK (guion de sección con el color
  del capítulo, TOC con estado pasado/actual por color, tarjetas de anterior/siguiente).
- `design-quality-gate`: documentación viva del sistema visual (`PRODUCT.md`, `DESIGN.md`) y el gate
  del detector de anti-patrones sobre el HTML generado.

### Modified Capabilities
- (ninguna: `site-navigation`, `page-hero`, `discipline-map` y `regulatory-map-china` conservan sus
  requisitos; los cambios en esos componentes son de presentación, no de comportamiento).

## Impact

- Código: `site/src/layouts/{Base,Doc,Marketing}.astro`, `site/src/components/*` (≈ 25 ficheros),
  `site/src/styles/{effects,utilities,prose,pages,resources,crosswalk,map}.css`,
  `site/public/{ui,ui-doc,nav,countup,stack}.js`, nuevo `site/src/scripts/motion-ui.ts`,
  `site/tests/infra.spec.ts`, `site/tests/__screenshots__/*`.
- Dependencias: `motion` (nueva, runtime); `impeccable` (herramienta, vía npx y plugin global; no
  entra en `package.json`).
- Docs: nuevos `site/PRODUCT.md`, `site/DESIGN.md`; `.gitignore` si impeccable crea `.impeccable/`.
- Gates: build, Playwright default/a11y/visual, Lighthouse CI, y detector de impeccable.
