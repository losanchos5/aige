# Proposal

## Why

El libro ha pasado de 11 a 24 capítulos en cinco partes, los patrones tienen página propia
(`/patterns/<slug>`) y el glosario tiene una página por término (`/glossary/<slug>`), pero los
capítulos no lo reflejan del todo: quedan enlaces de ruta entre capítulos que llevan al principio de
un capítulo largo en vez de a la sección que trata el tema, casi todos los enlaces a patrones siguen
apuntando a las anclas del catálogo (`/bok/patterns#pattern-*`), los capítulos 01 a 07 presentan
temas que ahora tienen capítulo propio (riesgo, ciclo de vida, equidad, incidentes, AI Act,
privacidad, agentes) sin enlazarlos, y los handoffs de los bloques anteriores dejaron enlaces
cruzados pendientes cuyo `from_file` es un capítulo de este bloque. El lector tampoco tiene una lista
de los términos clave de cada capítulo, el prefacio no dice cómo recorrer cinco partes ni qué leer
según el perfil, `OUTLINE.md` solo describe los capítulos 00 a 10, y los capítulos 04 a 08 no cierran
con acciones concretas como los capítulos nuevos.

## What Changes

- **Enlaces cruzados** (capítulos 00 a 04, 06, 07 y 11 a 23, solo prosa; no las listas `## Sources`):
  - se aplican los `cross_links` de `D:/Documents/aige-wt/handoffs/*.json` cuyo `from_file` es de
    este bloque y cuya ruta existe en la rama; los que dependen de rutas o anclas que construyen
    bloques paralelos van al handoff;
  - todo enlace de ruta entre capítulos (`/bok/<slug>` sin ancla) pasa a ancla de sección;
  - los enlaces a patrones con página pasan de `/bok/patterns#pattern-*` a `/patterns/<slug>`, salvo
    en las líneas que tocan los bloques de patrones y de amenazas en paralelo (y sus vecinas), para
    que las fusiones queden limpias; las anclas del catálogo siguen resolviendo;
  - los capítulos 01, 02, 03, 06 y 07 enlazan con los capítulos nuevos donde presentan el tema, con
    un enlace por tema y capítulo como máximo;
  - no se añaden enlaces manuales a `/glossary/<slug>` en prosa: `rehype-glossary` ya envuelve la
    primera aparición de cada término con su tarjeta emergente.
- **Términos clave** (G3): campo opcional `keyTerms` en `site/src/data/chapters.ts` (entre 5 y 10
  slugs del glosario por capítulo, todos salvo el glosario), resuelto en `/bok/[slug]` contra
  `lib/glossary.ts` (la build falla con un slug inexistente) y renderizado por `AtAGlance.astro` como
  fila «Key terms in this chapter» bajo «At a glance», con enlaces `a.term` a `/glossary/<slug>` que
  reutilizan las tarjetas emergentes.
- **«What you can do this week»** con cinco acciones en los capítulos 04, 06 y 07. Los capítulos 05 y
  08 son de otros bloques en esta oleada (patrones y obligaciones insertan justo antes de sus
  fuentes): sus recuadros van redactados en el handoff para insertarlos tras la fusión.
- **Prefacio**: «Who should read this» con una ruta de entrada por audiencia (incluidas las de los
  hubs `/for`, descritos sin enlace porque se construyen en paralelo) y una sección nueva «How to use
  this book» con las cinco partes enlazadas a `/bok#part-*`.
- **`OUTLINE.md`**: cinco partes y 24 capítulos, con brief para los capítulos 11 a 23 y la
  descripción del capítulo 05 al día con las páginas de patrones.
- **Tests**: `bok.spec.ts` comprueba el número de términos clave y la fila en cada capítulo;
  `agents-hub.spec.ts` acepta enlaces de patrón en cualquiera de las dos formas.
- **Registros compartidos**: viñetas en `bok/CHANGELOG.md`; handoff
  `D:/Documents/aige-wt/handoffs/w2-cross-links.json`.

## Non-goals

- No se tocan `bok/05`, `bok/08`, `bok/09` ni `bok/10`, ni las listas `## Sources` de ningún
  capítulo (las re-cita otro bloque), ni se renombra ningún H2 o H3.
- No se sube la versión del libro (`bokVersion`, prefacio, `OUTLINE.md`): es un paso de la release.
- No se enlazan rutas que aún no existen en la rama (`/for/*`, `/resources/threats`,
  `/toolkit/ai-act-triage`, patrones nuevos): quedan en el handoff con el texto exacto.

## Capabilities

### New Capabilities
- `bok-cross-links`: los capítulos se enlazan por sección, enlazan los patrones por su página y
  presentan los capítulos nuevos donde introducen el tema; el prefacio y `OUTLINE.md` describen las
  cinco partes.
- `chapter-key-terms`: cada capítulo lista sus términos clave, enlazados a su página del glosario.
- `chapter-weekly-actions`: los capítulos de práctica cierran con acciones para esta semana.

### Modified Capabilities
- Ninguna.
