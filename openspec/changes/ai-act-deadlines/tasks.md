# Tasks

## 1. Datos

- [x] 1.1 `site/src/data/ai-act-timeline.ts`: 13 hitos del cap. 18 bilingües con artículos, clases,
      base, estado, `reviewed`, `changed[]`, fuentes y `obligationIds`; `spain[]` (AESIA, sandbox,
      proyecto de ley); `updates[]`; `timelineSources`; `AI_ACT_TIMELINE_AS_OF`, `AI_ACT_TIMELINE_REVIEW_BY`;
      `timelineProblems()`, `nextMilestones()`, `registerDates()`
- [x] 1.2 `formatDateEs()` junto a `formatDate()` en `site/src/lib/applies-now.ts`

## 2. Páginas y exportaciones

- [x] 2.1 `site/src/components/AiActDeadlines.astro` (cuerpo por idioma: próximo plazo, línea
      temporal, tabla Omnibus, España, cómo se actualiza, descargas, fuentes, enlaces cruzados)
- [x] 2.2 `site/src/pages/resources/ai-act-deadlines.astro` y `site/src/pages/es/resources/ai-act-deadlines.astro`
      (Base, JSON-LD TechArticle + BreadcrumbList, OG)
- [x] 2.3 `site/src/lib/ics.ts`, `resources/ai-act-deadlines.ics.ts`, `es/resources/ai-act-deadlines.ics.ts`,
      `resources/ai-act-deadlines.json.ts`

## 3. i18n y wiring

- [x] 3.1 `HAND_TRANSLATED_ES` en `site/src/lib/i18n-content.ts`; conjunto en `site/scripts/content-lint.mjs`
- [x] 3.2 `nav.ts` (Reference tras Obligations; pie "Plazos del AI Act (español)"), `resources/index.astro`,
      tile en `index.astro`, "Full timeline" en `WhatAppliesNow.astro`, `SOURCE_BY_PATH`, `og-cards.ts`,
      `llms.txt.ts`, `lighthouserc.cjs`
- [x] 3.3 Frases con enlace en `bok/18-eu-ai-act.md` y `bok/21-ai-laws-worldwide.md`

## 4. Tests y verificación

- [x] 4.1 `site/tests/ai-act-deadlines.spec.ts` (datos, mantenimiento, coherencia con el registro,
      páginas, JSON/ICS, enlaces de portada); PAGES de `seo-schema.spec.ts`, `paths` de `smoke.spec.ts`;
      `i18n.spec.ts` generalizado a `HAND_TRANSLATED_ES` (hreflang, sitemap, redirecciones). Axe en dos
      temas y 390 px: barrido a11y existente (filtrado a las dos rutas en local, completo en CI)
- [x] 4.2 Fact-check por subagente aparte → `aige-wt/handoffs/plazos-factcheck.md`; corregir
- [x] 4.3 `code-reviewer`; arreglar CRITICAL/HIGH
- [ ] 4.4 Build con `aige-wt/build.sh`, `PW_PORT=4452 npm test`, spec nuevo
- [ ] 4.5 Commit por ruta, PR con el token de losanchos5, CI verde, merge coordinado, deploy, smoke
