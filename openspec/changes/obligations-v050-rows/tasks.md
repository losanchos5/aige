# Tasks

Worktree `D:/Documents/aige-wt/w2-data-obligations`, rama `wt/w2-data-obligations`. La build solo se
lanza con `bash D:/Documents/aige-wt/build.sh`. Handoff en
`D:/Documents/aige-wt/handoffs/w2-data-obligations.json`.

## 1. Inventario y verificación

- [x] 1.1 Reunir las propuestas de filas de todos los handoffs (`b-bok-maintenance.json` agrega los
  capítulos 11 a 22; `b-c23-agents.json`, `b-data-crosswalk.json` y `b-ref-ids-api.json` añaden las
  suyas) y deduplicarlas: 139 propuestas, 110 filas nuevas.
- [x] 1.2 Verificar en línea cada cláusula y fecha a 2026-09-24: textos de EUR-Lex (Ley de IA
  consolidada, Omnibus, RGPD, NIS2, DORA y su RTS 2025/301, CRA, PLD, DSM, DSA, UCPD, trabajo en
  plataformas, crédito al consumo, denunciantes), Código de prácticas GPAI, OWASP ASI, CSA STAR,
  leyes de California, Utah y Colorado, CPPA, Virginia, NYC, TAKE IT DOWN, Cornell LII (Reg. B,
  FCRA, Título VII, UGESP, FTC Act), Canadá y LGPD; reutilizar las filas ya verificadas de los
  capítulos 16 a 23 donde la fuente primaria bloquea el acceso.

## 2. Registro

- [x] 2.1 Añadir 45 instrumentos a `frameworks` (los ocho de `crosswalkInstruments` con el mismo id).
- [x] 2.2 Añadir las 110 filas con id estable, campos del esquema v2 y `patterns` solo donde la línea
  "Maps to" nombra la cláusula; las filas de la Ley de IA con `dutyHolder`, `authority`,
  `systemClass` y los hitos de alto riesgo.
- [x] 2.3 Aplicar las correcciones: art. 4, Corea (URL y nota), Colorado (SB 26-189), fila CSA de
  agentes, STAR for AI, art. 26 como paraguas, anclas de las filas de EE. UU. y del Reino Unido en
  sus H3.
- [x] 2.4 Revisar los handoffs de la ola 2 (`w2-*.json`): hito del art. 111(3) (2027-08-02) en las
  filas GPAI y su frase en el capítulo 08; las propuestas de `patterns` con patrones que aún no
  existen en esta rama y la nueva cita de `Art. 4a` en EUR-Lex van al handoff y a `SOURCES.md`.

## 3. Capítulo 08

- [x] 3.1 Nuevas filas en las tablas existentes (Ley de IA, Código GPAI, ISO, NIST, EE. UU., otras
  jurisdicciones, China) sin renombrar encabezados.
- [x] 3.2 Nuevas secciones: H2 "Data protection and other EU law" con tres H3; H3 "State privacy and
  sector laws", "Federal law that already reaches AI", "South Korea, article by article", "Treaty
  and international soft law"; tablas bajo "United Kingdom" y "What is NOT harmonised yet".
- [x] 3.3 Enlaces a los capítulos que enseñan cada fila; nombres oficiales OWASP ASI; fuentes [63] a
  [116] y correcciones de [16], [22] y [32]; sin rayas largas.

## 4. Consumidores y pruebas

- [x] 4.1 `ObligationMatrix.astro` une por `frameworkId`; `v3.spec.ts` usa ese mismo campo.
- [x] 4.2 `map.ts`: familia "Data protection and other EU law", ids nuevos repartidos, etiqueta en
  `HAND_WRITTEN`.
- [x] 4.3 `data.spec.ts`: espejo registro-capítulo y ubicación de las filas v0.5.0.
- [x] 4.4 Build completa con `build.sh` (exit 0) y `data.spec.ts` y `map.spec.ts` en verde.

## 5. Registros compartidos y handoff

- [x] 5.1 Sección nueva en `sources/SOURCES.md` y viñetas en `bok/CHANGELOG.md`.
- [x] 5.2 `openspec validate obligations-v050-rows --strict`.
- [x] 5.3 Handoff `D:/Documents/aige-wt/handoffs/w2-data-obligations.json`.
