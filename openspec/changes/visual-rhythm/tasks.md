# Tasks

## 1. Primitivas (prototipo, hecho)

- [x] 1.1 Tokens `--tint-l1..l5`, `--deep-bg`, `--pause-bg` y `--grad-ring` en `site/src/styles/tokens.css`, en claro y en oscuro. Verificado con `npm run build` en verde.
- [x] 1.2 `Section`: prop `hue` y tono `deep`. En `effects.css`: composiciones `d` y `e`, `bg-mesh--still`, reglas `data-hue` y `.sec--deep`. Verificado con build y axe en `/`.
- [x] 1.3 Panel `.pause` con aro en degradado, que usan `.prose > .diagram`, `.figure--infographic` y `AtAGlance`. Verificado con capturas de `/bok/the-stack`.

## 2. Prototipo en tres páginas (hecho, aprobado por Jordi el 2026-09-26)

- [x] 2.1 Capítulos: mesh en la cabecera según la parte (`ChapterHeader` + `Doc`), raya H2 en degradado, slot `after` y banda de cierre en `bok/[slug].astro`. Verificado con capturas y axe en `/bok/the-stack` y `/bok/values-and-principles`.
- [x] 2.2 Avisos practice, example y anti como bandas del pozo, y tablas de primer nivel enmarcadas y anchas, con la ruptura limitada a `.doc-main` y `.pillar-main`. Verificado con axe y sin desbordamiento en 6 páginas, en claro y en oscuro, a 1440 y 390 px.
- [x] 2.3 `/resources/frameworks` en bandas y hero `res` a 0.65. Verificado con capturas y axe.
- [x] 2.4 Portada: tonos, `deep` y `meshK` nuevos en `index.astro` y `WhatAppliesNow.astro`. Verificado con capturas y axe.

## 3. Familia de lectura

> Primer envío a producción (2026-09-27, «bien, a prod»): los grupos 1, 2, 7 y 8. Lo que Doc aplica a nivel de layout (cabecera, pausas, avisos y tablas) ya llega a patrones, Thesis, About, research, perfiles de control y certifications. Los grupos 3 a 6 van en un segundo PR con este mismo cambio abierto.

- [x] 3.1 `patterns/[id].astro`: mover `pp-related` al slot `after` como banda de cierre con mesh quieto. Verificar con capturas de un patrón y sin desbordamiento a 390 px. (2026-09-27, segundo PR; sin compilación local por falta de memoria y sin tests por decisión de Jordi: la build la hace el workflow de deploy)
- [x] 3.2 `ai-governance.astro`: pasar `mesh` a su `ChapterHeader`, fijar `--chapter-dash`, añadir la banda de cierre si procede y comprobar que las figuras del splice por `<h2` quedan en pausa. Verificar con capturas y axe de `/ai-governance`. (2026-09-27, segundo PR; sin compilación local por falta de memoria y sin tests por decisión de Jordi: la build la hace el workflow de deploy)
- [ ] 3.3 Repasar Thesis, About ×4, research, `controls/[profile]` y certifications, que heredan las primitivas de Doc, y corregir cualquier tabla o aviso que rompa. Verificar con capturas de las 8 rutas a 1440 y 390 px.

## 4. Hubs de referencia

- [x] 4.1 Pasar a bandas `Section` (cabeceras y figuras en tinte por tono con mesh, tablas en liso) crosswalk y sus 3 comparativas (`ComparisonPage.astro`), reading-list, tools, harms, threats, contracts, templates, data, obligations, patterns, figures, cases y toolkit. Verificar con build, capturas de cada hub y ninguna pareja de vecinas iguales. (2026-09-27, segundo PR; sin compilación local por falta de memoria y sin tests por decisión de Jordi: la build la hace el workflow de deploy)
- [ ] 4.2 Glosario (`/resources/glossary`, sin mesh por Lighthouse): sus bandas usan solo tintes, sin mesh. Verificar con lhci en `/bok/glossary`.

## 5. Fichas de detalle

- [x] 5.1 `obligations/[id]`, `glossary/[slug]`, `cases/[id]` y `figures/[id]`: añadir una banda de cierre con relacionados y siguiente, y panelear figuras y tablas con `.pause` o el aro. Verificar con capturas de una ficha de cada tipo y axe completo. (2026-09-27, segundo PR; sin compilación local por falta de memoria y sin tests por decisión de Jordi: la build la hace el workflow de deploy)

## 6. Landings de marketing

- [x] 6.1 Pasar `/controls`, `/role`, `/stack`, `/agents`, `/for`, `AudienceHub` (`/for/[slug]`), `/frontier` (`blockTone`), `/contribute`, `/path` y `/map` de la alternancia plain/tint a tintes por tono con alguna banda mesh o `deep`, sin vecinas iguales. Verificar con capturas por ruta y axe. (2026-09-27, segundo PR; sin compilación local por falta de memoria y sin tests por decisión de Jordi: la build la hace el workflow de deploy)

## 7. Specs, tests y documentación

- [x] 7.1 Actualizar `site/tests/loop.spec.ts` a los tonos, variantes y opacidades nuevos de la portada: `where-it-operates` es `deep`, `c`, 0.7; el rol pasa a 0.9; no hay bandas `plain`; las vecinas son distintas; solo deriva el rol. Verificar con `npx playwright test loop.spec.ts`.
- [x] 7.2 Documentar en `site/DESIGN.md` las primitivas (`hue`, `deep`, `pause`, `--grad-ring`), el mapa de parte a composición y la secuencia de bandas de la portada. Verificar con `npm run lint:content`, sin guiones largos.

## 8. Verificación final

- [x] 8.1 Ejecutar `npm run build`, después `npm test` y el proyecto `a11y` completo, en verde. Resultado del 2026-09-27: default 2172 en verde (las capturas I caídas por falta de memoria se repitieron y pasan) y a11y 2688/2688.
- [x] 8.2 Pasar lhci en las 18 URLs con perf ≥ 0.95 y a11y, best practices y SEO = 1.
- [ ] 8.3 Commit por ruta, sin PNG regenerados, sin el PDF AIGP y sin dumps, y abrir el PR a `main` para que Jordi lo mergee.
