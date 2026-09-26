# Proposal

## Why

Jordi recorre la web y la encuentra monótona: casi todo es texto sobre el crema de `--bg`. Solo
/controls y la portada tienen bandas, y en la portada el mesh va a 0.3-0.6 sobre un tinte casi
crema. Los 24 capítulos, los 33 patrones, la Thesis, About y las páginas de referencia son una
columna de texto sin pausas, y el lector se cansa antes de llegar al final. El prototipo ya está
hecho sobre tres páginas (la portada, `/resources/frameworks` y los capítulos) y Jordi lo ha
aprobado el 2026-09-26 («mucho mejor»). Este cambio lo fija y lo extiende a todas las familias de
páginas.

## What Changes

- **Primitivas nuevas**, todas con tokens de tema claro y oscuro:
  - tintes por tono `--tint-l1..l5`;
  - una banda profunda `--deep-bg`, que es el navy L1;
  - un suelo de pausa `--pause-bg`;
  - un aro en degradado `--grad-ring`.
- **`Section`**:
  - prop `hue` (tinte por tono);
  - tono `deep`, que reutiliza los tokens re-escopados de la banda oscura.
- **Mesh**:
  - composiciones quietas nuevas `d` y `e`;
  - modificador `bg-mesh--still`.
- **Panel de pausa `.pause`**: suelo tenue con mesh quieto y aro en degradado. Lo usan las figuras
  de la prosa, «At a glance» y los paneles de las páginas de referencia.
- **Páginas de lectura** (Doc y `/ai-governance`):
  - la cabecera del capítulo lleva un mesh quieto que depende de la parte del libro. Se mantiene
    SL-06: el color de capa solo aparece en un capítulo de una sola capa;
  - la raya de los H2 es un degradado de tres tintas;
  - los avisos practice, example y anti son bandas que ocupan el pozo de lectura, con el texto a
    la medida de la columna;
  - las tablas de primer nivel ocupan el pozo, con suelo opaco y aro;
  - la página cierra con una banda mesh a todo el ancho (slot `after` de Doc) que lleva los
    enlaces relacionados y el newsletter.
- **Páginas de referencia**:
  - el mesh del hero `res` pasa de 0.35 a 0.65;
  - el cuerpo se compone de bandas `Section`: tinte con mesh para cabeceras y figuras, fondo liso
    para tablas.
- **Portada**:
  - mesh más intenso (0.5-0.9);
  - tintes por tono en preguntas, valores, capítulos y "What applies now";
  - "Where AI Governance Engineering operates" pasa a ser una banda `deep`;
  - stack y Resources pasan a mesh quieto sin tinte.
- **Landings de marketing** (/controls, /role, /stack, /agents, /for, hubs de audiencia,
  /frontier, /contribute, /path, /map): la alternancia plain/tint pasa a tintes por tono, con
  alguna banda mesh o deep, y dos vecinas nunca iguales.
- `site/DESIGN.md` documenta las primitivas, el mapa de parte a composición y las reglas nuevas.

## Capabilities

### New Capabilities
- `reading-rhythm`: pausas visuales en las páginas de lectura. Cubre la cabecera con mesh por
  parte, la raya en degradado, los paneles de pausa en figuras y «At a glance», las bandas de
  aviso, las tablas enmarcadas y la banda de cierre.
- `band-tones`: el vocabulario de bandas compartido por landings y referencia. Cubre los tintes
  por tono, la banda deep, las composiciones quietas y la composición en bandas de las páginas de
  referencia, con su hero más vivo.

### Modified Capabilities
- `section-backdrop`: cambian las intensidades y tonos de la portada. El rol pasa a 0.9, stack y
  Resources dejan el tinte por un mesh quieto, y preguntas, valores y capítulos pasan a tinte por
  tono con mesh. Siguen valiendo las reglas de vecinas distintas, una sola deriva y AA.
- `home-positioning`: la banda `where-it-operates` pasa de `tone="mesh"`, `mesh="c"` y 0.4 a
  `tone="deep"`, `mesh="c"` y 0.7.

## Impact

- **CSS**: `site/src/styles/tokens.css`, `effects.css`, `prose.css` y `resources.css`.
- **Componentes**: `Section.astro`, `ChapterHeader.astro`, `AtAGlance.astro`, `PageHero.astro` y
  `WhatAppliesNow.astro`.
- **Layout**: `site/src/layouts/Doc.astro`.
- **Páginas**: `index.astro`, `resources/*`, `bok/[slug].astro`, `patterns/[id].astro`,
  `ai-governance.astro`, las plantillas de detalle (`obligations/[id]`, `glossary/[slug]`,
  `cases/[id]` y `figures/[id]`) y las landings de marketing.
- **Tests**: `site/tests/loop.spec.ts` (tonos y opacidades de la portada), la suite axe (`a11y`),
  `layout.spec.ts`, `page-hero.spec.ts` y lhci. Las capturas de referencia (D, E, G, I, V2b y V3)
  cambian y se regeneran en local, sin commit, como en los PR anteriores.
- Sin dependencias nuevas, sin JavaScript nuevo y sin cambios de contenido.
