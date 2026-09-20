# Design

## Context

Ver `proposal.md` (Why) y `brief.md` (plan aprobado: hechos verificados en §1, texto literal de
tablas y entradas en §3, datos del sitio en §4). Restricciones que dan forma al diseño:

- Estilo del libro: `STYLEGUIDE.md` §3 (plantilla de capítulo) y §6 (citas `[n]` locales al
  capítulo; cada `[n]` con fila en `sources/SOURCES.md`; tags `primary`/`secondary`/`reported`).
- El sitio parsea el markdown: `parseAnnotatedList` (reading list), `parseDefinitions` (glosario),
  `getHeadings` (anchors, cualquier nivel). `site/tests/data.spec.ts` exige URL https, anchor
  existente y `layerN` no vacío.
- `ObligationMatrix.astro` une obligaciones con `frameworks[]` por regex en `resolveFwId` y agrupa
  por `bandOf(issuer)`; `site/tests/v3.spec.ts` replica `resolveFwId` como oráculo del recuento.
- Playwright: puerto 4321 fijo y `reuseExistingServer` fuera de CI; hay un `astro preview` viejo
  (PID 15604) escuchando. `lhci` borra `dist/pagefind`, así que va el último.
- Trabajo en worktree `D:\Documents\aige-china` (rama `feat/china-regulatory-map`); otra sesión
  edita en `D:\Documents\aige` y consume los ids/anchor (ver `brief.md` §5bis).

## Goals / Non-Goals

**Goals:**
- Separar de forma visible «vinculante» y «voluntario» tanto en la prosa como en la columna de
  estado y en el tipo de catálogo (`law` / `standard` / `framework`).
- Que el Apéndice 2 del TC260 quede cruzado con OWASP Agentic y NIST agents en una sola tabla
  reutilizable por el capítulo y por la sesión del crosswalk.
- Cero afirmaciones sin fuente oficial abierta; lo no verificado se declara en `brief.md` §7.

**Non-Goals:**
- No tocar THESIS.md/THESIS.es.md ni su versión.
- No añadir filas para instrumentos solo leídos en fuentes secundarias (TC260-TR-005-2026, norma de
  agentes en elaboración) ni para política programática (AI Plus, borrador de menores).
- No re-verificar ni re-fechar las filas existentes de Corea, Singapur, UK y ETSI (siguen «as of
  2026-09-19»).
- No cambiar `ObligationTable.astro`, `resources/*.astro`, `resources.spec.ts` ni `lighthouserc.cjs`
  (propiedad de la sesión paralela).

## Decisions

1. **Subsección `### China` con tabla propia, no filas en la tabla compartida.** Alternativa: filas
   en la tabla de «Other jurisdictions» (como pide la issue 01 literalmente). Se elige subsección
   porque son 7 filas más prosa de contexto (dos niveles, CSL art. 20, open-source, cómputo) y el
   precedente de UK ya es una subsección; sigue estando «dentro» de Other jurisdictions.
2. **Grupo `framework: 'China'` con anchor `china`, no `'Other jurisdictions'`.** La tabla del
   sitio agrupa por el string `framework`; un bloque «China» propio es más legible y `getHeadings`
   acepta H3, así que el anchor `china` pasa el test. Coordinado con la sesión del crosswalk.
3. **Una entrada de catálogo para Labelling Measures + GB 45438-2025.** La norma obligatoria es el
   mecanismo técnico de la medida; separarlas duplicaría la fila sin añadir artefacto distinto.
   GB/T 45654-2025 sí va aparte (naturaleza voluntaria distinta, artefactos de capa 3/5 propios).
4. **Dos filas para el TC260 3.0** (marco general + §5.3, y Apéndice 2). El Apéndice 2 es la pieza
   que se cruza con OWASP/NIST y mapea a capas 2–5; mezclarlo con la fila general ocultaría eso.
5. **`issuer` termina en «(China)»** y `bandOf` usa `endsWith('(China)')`. Alternativa: lista de
   ids. El sufijo es autoexplicativo en la UI y no exige mantener una lista.
6. **`resolveFwId` por texto de `obligation`**, con `/45654/` evaluado antes que
   `/generative ai services/i` (el título de la norma también contiene esa frase), y espejo literal
   en `v3.spec.ts`.
7. **Cybersecurity Law art. 20 y Anthropomorphic Measures solo en prosa.** El art. 20 es
   programático (deber del Estado, no del operador); las medidas antropomórficas son de ámbito
   estrecho y fuera de la lista pedida. Ambos citados para que el mapa no calle sobre normas vigentes.
8. **Subagentes en Opus 4.8 por bloque (A contenido cap. 08 + fuentes; B lecturas + glosario;
   C sitio; D verificación y cierre), sin commits desde subagentes.** Fable commitea por tipo tras
   verificar. Bloques A y B tocan `sources/SOURCES.md` en secciones distintas: edición por `Edit`
   con relectura previa, nunca `Write` del fichero completo.
9. **Ventana de tests exclusiva**: parar PID 15604 al abrir, avisar a la sesión paralela antes y
   después, `lhci` al final.

## Risks / Trade-offs

- [Un recuento fijo en algún test rompe por 6 marcos / 7 obligaciones nuevas] → solo se ajusta el
  número en tests de mi propiedad (`v3.spec.ts`); `resources.spec.ts` lo está reescribiendo la
  sesión paralela para calcular el string; si falla en mi rama antes de su merge, se documenta y se
  deja que el merge lo resuelva.
- [Baselines de `frameworks-*` cambian dos veces (esta rama y la del crosswalk)] → quien fusione
  segundo las regenera; se commitean solo las propias.
- [Glifos CJK en títulos de SOURCES.md y glosario] → solo en `sources/` y en paréntesis del
  glosario; el reading list y las tablas del capítulo usan títulos en inglés.
- [`CAC` auto-enlazado dentro de otras palabras por `rehype-glossary`] → comprobar el límite de
  palabra; si no lo hay, la entrada del glosario usa la forma larga como término y «CAC» en la
  definición.
- [Edición concurrente de SOURCES.md por A y B] → secciones disjuntas, `Edit` con relectura; Fable
  revisa el diff.
- [Servidor viejo en 4321 haciendo pasar tests contra una build ajena] → matar PID 15604 antes de
  la ventana; verificar que el preview que arranca Playwright es el del worktree.

## Migration Plan

Sin migración de datos. Merge a `main` por fast-forward o merge commit tras la sesión paralela o
antes (ficheros disjuntos); quien fusione segundo re-ejecuta build + `npm test` en `main` y
regenera `frameworks-*`. Rollback: revert de los commits de la rama.

## Open Questions

- Si Jordi prefiere fila de tabla para las Anthropomorphic Interaction Measures (vinculante, en vigor
  2026-07-15), se añade después sin tocar el resto (id sugerido `cn-anthropomorphic-measures`, capa 4).
