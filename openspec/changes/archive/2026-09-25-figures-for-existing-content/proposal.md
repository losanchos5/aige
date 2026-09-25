# Proposal

## Why

Los capítulos 01 a 22 ya dicen cosas que se entienden mejor dibujadas (los cinco objetos de
gobierno, la supervisión humana diseñada, qué pasa con el stack al comprar IA, procedencia y linaje,
la matriz de riesgo, los relojes de notificación que se solapan), pero hoy solo siete infografías y
veinticuatro diagramas archify cubren los capítulos 01 a 08. Además, cuatro diagramas archify tienen
defectos de composición visibles (el crosswalk parece una lista y no un eje con radios, el gate de
diligencia debida cruza el carril de rechazo, el guardrail anida la capa 05 dentro de la 04 y el
kill switch no distingue el agente revocado), y la ola regulatoria no muestra los dos hitos que el
capítulo 02 ya fecha: 2 Dec 2026 y 2 Aug 2030. La versión v0.5.0 quiere que el sitio sea la
referencia de la disciplina, y las figuras son la vía de entrada más rápida al contenido.

## What Changes

- **Once infografías nuevas, hechas a mano** en `site/src/figures/` y declaradas al final del array
  de `site/src/data/figures.ts`, todas con el contrato de `site/VISUAL-GUIDE.md` (un mensaje,
  ≤ 9 nodos y ≤ 12 aristas, tokens de capa, glifos fijos, evidencia como nodo terminal, `role="img"`
  con `<title>` y `<desc>`, alternativa textual en `<details>`, ≤ 12 KB, «Drawn from chapter NN.»):
  - `five-objects` (cap. 01, «The object of governance»);
  - `profession-in-numbers` (cap. 02, «The evidence»; solo cifras del capítulo tras el pase de deuda);
  - `human-oversight` y `procured-ai-control` (cap. 04, «Designing human oversight (Article 14)» y
    «Third-party and procured AI»);
  - `enforcement-map` (cap. 08, pie de «EU AI Act, post-Omnibus»);
  - `committee-gates` (cap. 12, «The committee decides, the gates enforce»);
  - `risk-loop-stack`, `risk-matrix` y `mitigation-ladder` (cap. 13);
  - `provenance-lineage` (cap. 14, «Provenance versus lineage»: el capítulo 04 no enuncia el linaje
    hacia atrás y hacia delante, así que la figura va donde el texto lo dice);
  - `incident-clocks` (cap. 17, «The overlapping clocks»).
- **Pulido de cuatro diagramas archify** (solo el IR en `site/diagrams/`): Framework Crosswalk como
  eje con cinco radios y la evidencia colgada del eje; Vendor / Model Due-Diligence Gate con carril
  «Deployer», rechazo al final y el registro directamente bajo el gate; Runtime Guardrail con la capa
  05 fuera de la 04 y el breaker del mismo tipo que en el kill switch; Kill Switch con el agente
  revocado en gris y los que siguen activos como agentes.
- **Ola regulatoria**: dos estados nuevos (2 Dec 2026, nuevas prohibiciones del `Art. 5` y marcado del
  `Art. 50(2)`; 2 Aug 2030, sistemas de alto riesgo de autoridades públicas ya en el mercado) con sus
  notas, todos con fechas que el capítulo 02 enuncia.
- **Pruebas**: `site/tests/figures-existing.spec.ts` con el contrato por figura, los diagramas pulidos
  y la colocación en los capítulos.
- **values-principles a dos columnas desde 834 px**: la figura es generada, así que el cambio de
  `scripts/figures-build.mjs`, `src/lib/rehype-diagrams.ts` y `src/styles/figures.css` va como parche
  en el handoff (`D:/Documents/aige-wt/handoffs/b-figures-existing.values-principles.patch`), no en
  esta rama.
- Fuera de alcance: la interfaz `FigureDef`, `diagrams.ts` (el pie de la ola regulatoria se propone en
  el handoff), la galería `/figures` y cualquier otro fichero compartido.

## Capabilities

### New Capabilities
- `chapter-infographics`: las infografías hechas a mano que ilustran contenido que los capítulos ya
  enuncian, y el mantenimiento de los diagramas archify que las acompañan.

### Modified Capabilities
- (ninguna)

## Impact

- **Contenido**: sin cambios en `bok/`; las figuras no añaden hechos, cifras, fechas ni marcas que los
  capítulos no digan.
- **Sitio**: once SVG nuevos (entre 2,8 y 6,8 KB cada uno) insertados por `rehype-diagrams` en los
  capítulos 01, 02, 04, 08, 12, 13, 14 y 17; cinco IR archify regenerados en el build.
- **Build**: `astro check`, `astro build`, `content-lint`, `check-links`, `schemas-check` y `pagefind`
  en verde con `bash D:/Documents/aige-wt/build.sh`.
