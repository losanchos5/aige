# Proposal

## Why

El Body of Knowledge solo cubría las leyes de IA fuera de la UE a nivel de fila en el capítulo 08:
Corea con una única fila apoyada en una fuente secundaria, cuatro leyes estatales de EE. UU., el
Reino Unido y China. La v0.5.0 amplía el libro para que sea la referencia de gobernanza de IA, y
eso exige un capítulo propio que trate cada jurisdicción con su estado, fechas, alcance, deberes,
régimen sancionador y los artefactos que evidencian el cumplimiento, fechado a 2026-09-24 y con
fuentes primarias. También exige un dataset tipado de jurisdicciones que alimente un futuro mapa de
teselas sin duplicar el texto del capítulo.

## What Changes

- **Capítulo 21** (`bok/21-ai-laws-worldwide.md`): sustituye el esqueleto por un capítulo completo
  con la plantilla de la casa (H1, entradilla de una frase, secciones H2/H3, callouts
  `**In practice (illustrative)**` y `**Example (illustrative)**`, línea `**Maps to:**`, sección
  `## What you can do this week` y `## Sources` numeradas con tag de verificación).
  - Corea: AI Basic Act y su Enforcement Decree desde law.go.kr (alta y confirmación de IA de alto
    impacto, aviso previo y etiquetado de IA generativa, deberes de seguridad por encima de 10^26
    FLOP, medidas de alto impacto con conservación de cinco años, evaluación de impacto, representante
    doméstico con umbrales, multas y periodo de gracia).
  - EE. UU. federal: EO 14179, EO 14319 vía M-26-04, EO 14365, OMB M-25-21 y M-25-22, el AI Action
    Plan y el empuje de preempción (task force, recomendaciones legislativas, propuesta de la FTC,
    borrador de la Cámara), cada hecho fechado.
  - EE. UU. estatal: Colorado SB 26-189, Texas TRAIGA, California SB 53, SB 942/AB 853, AB 2013,
    reglas ADMT de la CPPA y SB 243, Nueva York RAISE y GBL art. 47, Utah, Illinois HB 3773 y NYC
    LL 144 en una tabla con estado, alcance, deberes, sanción, artefacto y capa.
  - Japón, China (solo lo que falta en el 08: medidas de interacción antropomórfica), Brasil (como
    proyecto de ley), Canadá, India, Reino Unido, Italia, España (AESIA, sandbox y el proyecto de ley,
    nunca llamado ley), Singapur y Australia.
  - Tabla comparativa por indicador (clasificación, deberes, aviso y supervisión, modelos frontera,
    sanción, roles), tabla de reglas sectoriales (DORA, NIS2, CRA, Data Act, MDR/IVDR y MDCG 2025-6,
    guía FDA, SR 26-2 que sustituye a SR 11-7, PRA SS1/23, ECOA/Reg B, Directiva de trabajo en
    plataformas, menores y seguridad en línea) y tabla de relojes de incidentes.
- **Dataset** `site/src/data/jurisdictions.ts`: tipos `JurisdictionStatus`
  (`binding-horizontal | binding-targeted | voluntary | bill`), `Instrument` y `Jurisdiction`, una
  entrada por jurisdicción con instrumentos fechados, URL y tag de verificación, resumen propio,
  `asOf` y ancla del capítulo; helpers `jurisdictionByCode` y `jurisdictionsByStatus`. Sin
  consumidores todavía.
- Fuera de alcance: editar ficheros compartidos (`chapters.ts`, `nav.ts`, `frameworks.ts`,
  `crosswalk.ts`, `bok/08-regulatory-map.md`, `bok/09-glossary.md`, `sources/SOURCES.md`) y
  construir el mapa de teselas; lo que esos ficheros necesitan va en el handoff del orquestador.

## Capabilities

### New Capabilities
- `bok-ai-laws-worldwide`: el capítulo 21 del Body of Knowledge sobre leyes específicas de IA fuera
  de la UE y el dataset tipado de jurisdicciones que lo acompaña.

### Modified Capabilities
- (ninguna)

## Impact

- **Contenido**: `bok/21-ai-laws-worldwide.md` (reescrito), nuevo `site/src/data/jurisdictions.ts`.
- **Handoff** (fuera del repo): `D:/Documents/aige-wt/handoffs/c21-ai-laws-worldwide.json` con
  resumen y glance del capítulo, términos de glosario, filas de obligaciones y crosswalk, enlaces
  cruzados para otros capítulos, lecturas y notas (entre ellas que SR 11-7 fue sustituida por SR 26-2
  el 2026-04-17 y que `sources/SOURCES.md` necesita la sección del capítulo 21).
- **Build**: sin dependencias nuevas; `astro check`, `astro build`, content-lint (sin rayas largas,
  España calificada como proyecto) y check-links deben pasar.
- Afirmaciones que no se pudieron confirmar en fuente primaria llevan `(verify)` en el texto y se
  listan en el informe final.
