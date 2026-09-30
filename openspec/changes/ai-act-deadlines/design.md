# Design

## Context

Lo que el sitio ya afirma sobre fechas del AI Act vive en tres sitios que esta página no puede
contradecir: la tabla "The post-Omnibus timeline" de `bok/18-eu-ai-act.md` (13 filas, 2024-08-01 a
2030-12-31, fuentes [1] Reg. 2024/1689 y [2] Reg. 2026/1744), el registro `site/src/data/frameworks.ts`
(`appliesFrom` y `milestones[]` de las filas `eu-ai-act`; sus fechas son 2025-02-02, 2025-08-02,
2026-07-27, 2026-08-02, 2026-12-02, 2027-08-02, 2027-12-02, 2028-08-02 y 2030-08-02, todas en la
tabla) y la banda `WhatAppliesNow.astro` (`lib/applies-now.ts`, `nextDates()`; a 2026-09-24 devuelve
2026-12-02, 2027-08-02, 2027-12-02, 2028-08-02). El brief del plan decía que las tres primeras eran
2026-12-02, 2027-12-02 y 2028-08-02; el registro real incluye 2027-08-02 (GPAI anteriores), así que el
test de coherencia compara contra `nextDates()` y no contra una lista tecleada.

España: cap. 21 §Spain cita el anteproyecto (Consejo de Ministros 2025-03-11 [47]), RD 817/2023 [48]
y las 16 guías AESIA [49]. La aprobación como proyecto (2026-05-26) y la publicación en el BOCG
(2026-06-12, BOCG-15-A-97-1) no están aún en el repo: las verifica el fact-check antes de publicarlas
y, si no se confirman, la tarjeta se queda en lo verificado.

i18n: `PUBLISHED_TRANSLATED_LOCALES = []`; el único par a mano es `/thesis` ↔ `/es/thesis`, cableado
con un `if` en `pathIn()` (`lib/i18n-content.ts`) y una excepción en `translatedPageProblems()` de
`scripts/content-lint.mjs`. `alternatesFor()` alimenta Seo.astro, el selector y el sitemap.

## Goals / Non-Goals

**Goals:** una sola fuente bilingüe; páginas estáticas sin JavaScript; exportaciones JSON e ICS;
puerta de mantenimiento; coherencia comprobada con registro y banda; hreflang correcto.

**Non-Goals:** reescribir `applies-now.ts` sobre el nuevo dato (la banda sigue leyendo el registro);
traducir más páginas; alertas por email; cambiar el póster.

## Decisions

1. **Conjunto de hitos = las 13 filas del cap. 18**, no las 10 del brief: incluye 2026-07-27 (Omnibus
   en vigor), 2027-09-02 (plantilla del plan de seguimiento, Art. 72(3)) y 2028-01-28 (organismos
   notificados del Anexo I, Sección A). Cada fila con `basis: 'ai-act'` si la fecha es del texto de
   2024 y `'omnibus'` si la crea o la mueve el Omnibus; `changed[]` recoge los desplazamientos
   (Anexo III 2026-08-02 → 2027-12-02; Anexo I 2027-08-02 → 2028-08-02; sistemas públicos legados
   2030-08-02 se mantiene, pero se reformula el alcance si el fact-check lo confirma).
2. **Dato en `site/src/data/ai-act-timeline.ts`** con tipos `Bilingual = {en, es}`, `TimelineMilestone`,
   `SpainEntry`, `TimelineUpdate`; fuentes `timelineSources: Source[]` (modelo de `lib/sources.ts`) con
   índices 1-based; `timelineProblems()` devuelve la lista de incoherencias internas (orden, fechas
   ISO, textos vacíos, índices de fuente fuera de rango, obligationIds inexistentes, estado frente a
   `AI_ACT_TIMELINE_AS_OF`); `nextMilestones(asOf, count?)` y `registerDates()` para el test.
3. **Un componente de cuerpo `AiActDeadlines.astro` con prop `lang`** y dos páginas finas que ponen
   `Base`, SEO y JSON-LD. Los textos de interfaz (encabezados, etiquetas) viven en un diccionario
   `UI` dentro del componente, en los dos idiomas: la prosa larga en español se escribe a mano allí y
   en el dato, no se traduce en máquina. Fechas: `formatDate()` de `applies-now.ts` en EN; una
   `formatDateEs()` hermana (`2 de diciembre de 2026`) en el mismo fichero.
4. **Enlaces a obligaciones**: `obligationIds[]` por hito, resueltos con `obligationPath()`; el test
   comprueba que existen.
5. **i18n**: `HAND_TRANSLATED_ES = new Set(['/thesis', '/resources/ai-act-deadlines'])` en
   `i18n-content.ts`; `pathIn()` lo consulta. content-lint usa un conjunto equivalente
   (`HAND_TRANSLATED_PAGES`) en vez de `path === '/es/thesis'`. Hay que comprobar que
   `englishPathOf('/es/resources/ai-act-deadlines')` devuelve la ruta inglesa (usa
   `isTranslatedLocale`, independiente del conmutador).
6. **ICS propio** (`lib/ics.ts`, ~40 líneas): VCALENDAR 2.0, `PRODID`, eventos `DTSTART;VALUE=DATE`,
   `DTEND` = día siguiente, `UID = <id>@aigovernanceengineer.com`, `DTSTAMP` = fecha "a", escape de
   `,;\` y saltos, plegado a 75 octetos, CRLF.
7. **Puerta de mantenimiento en el spec** (patrón `obligation-status-dates.spec.ts`), con "hoy" real. El callout "próximo plazo" se calcula desde `AI_ACT_TIMELINE_AS_OF`, no desde la fecha de build, para no contradecir las insignias (el sitio solo se reconstruye al hacer push).

## Risks / Trade-offs

- Una fecha no verificada se cuela → fact-check aparte con informe `handoffs/plazos-factcheck.md`.
- El test de mantenimiento rompe CI el 2026-12-02 → es el objetivo; `REVIEW_BY` lo anuncia.
- Rebase con el hito 1 (labs) en los ficheros compartidos → inserción tras Obligations, unión.
