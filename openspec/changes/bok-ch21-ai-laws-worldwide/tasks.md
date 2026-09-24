# Tasks

Rama `wt/c21-ai-laws-worldwide` en el worktree `D:/Documents/aige-wt/c21-ai-laws-worldwide`. El build
se lanza solo con `bash D:/Documents/aige-wt/build.sh`. Los ficheros compartidos no se tocan: lo que
necesiten va al handoff.

## 1. Investigación y fuentes

- [x] 1.1 Leer `STYLEGUIDE.md`, `bok/01`, `bok/04`, `bok/05`, `bok/06` y `bok/08` para usar las capas, patrones, flujos y anclas de la casa.
- [x] 1.2 Verificar Corea en fuente primaria (ley n.º 20676 y decreto presidencial n.º 36053 en law.go.kr) y el periodo de gracia en fuente secundaria.
- [x] 1.3 Verificar la capa federal de EE. UU. (EO 14179, EO 14365, M-25-21, M-26-04, AI Action Plan, recomendaciones legislativas, propuesta de la FTC) y las leyes estatales (Colorado, Texas, California, Nueva York, Utah, Illinois, NYC).
- [x] 1.4 Verificar Japón, China (medidas antropomórficas), Brasil, Canadá, India, Reino Unido, Italia, España, Singapur y Australia.
- [x] 1.5 Verificar los regímenes sectoriales (DORA, NIS2, CRA, Data Act, MDCG 2025-6, FDA, SR 26-2, PRA SS1/23, CFPB, Directiva de plataformas, DSA y Online Safety Act).

## 2. Capítulo 21

- [x] 2.1 Reescribir `bok/21-ai-laws-worldwide.md` con H1, entradilla de una frase, `## How to read this chapter` y la tabla de panorama.
- [x] 2.2 Escribir las secciones por jurisdicción con estado, fechas, alcance, deberes, sanción y artefactos, y la tabla artefacto-capa de Corea.
- [x] 2.3 Añadir la tabla comparativa, la tabla de reglas sectoriales y la tabla de relojes de incidentes.
- [x] 2.4 Añadir callouts `In practice (illustrative)` y `Example (illustrative)`, `## What you can do this week`, la línea `Maps to` y `## Sources` con tags de verificación.
- [x] 2.5 Comprobar que no hay rayas largas, que cada `[n]` tiene fuente y que los enlaces internos apuntan a rutas y anclas existentes.

## 3. Dataset de jurisdicciones

- [x] 3.1 Crear `site/src/data/jurisdictions.ts` con los tipos, las entradas por jurisdicción, `asOf`, anclas y los helpers `jurisdictionByCode` y `jurisdictionsByStatus`.

## 4. Verificación y entrega

- [x] 4.1 Ejecutar `openspec validate bok-ch21-ai-laws-worldwide --strict` hasta que pase.
- [x] 4.2 Ejecutar `bash D:/Documents/aige-wt/build.sh` y comprobar que sale con código 0.
- [x] 4.3 Escribir el handoff `D:/Documents/aige-wt/handoffs/c21-ai-laws-worldwide.json`.
- [x] 4.4 Commit por rutas explícitas con mensaje convencional en español.
