# Proposal

## Why

El sitio ya sabe qué se aplica y cuándo bajo el AI Act (tabla "The post-Omnibus timeline" del cap. 18,
registro de obligaciones, póster `eu-ai-act-timeline` y banda "What applies now" de la portada), pero
no tiene una página de plazos que alguien pueda enlazar, ni en inglés ni en español. El roadmap de
crecimiento (§5, hito 120-240 adelantado) pide una página de plazos ES/EN "actualizada por hitos", con
la ley española de IA y el sandbox (RD 817/2023, AESIA) como gancho para lectores y sitios españoles.
KPI: página live y dos sitios que la citen. Regla del roadmap §8: no publicar plazos sin mantenerlos,
así que la página nace con una puerta de mantenimiento que rompe CI cuando un hito pasa sin revisión.

## What Changes

- Dato bilingüe único `site/src/data/ai-act-timeline.ts`: los 13 hitos de la tabla post-Omnibus del
  cap. 18 (2024-08-01 a 2030-12-31), cada uno con título y texto en inglés y en español, artículos,
  clases de sistema, base (`ai-act` / `omnibus`), estado (`applied` / `upcoming`), fecha de revisión,
  desplazamientos del Omnibus (de qué fecha a cuál), fuentes `[n]` y enlaces a filas del registro;
  tres entradas de España (AESIA, sandbox RD 817/2023, Proyecto de Ley Orgánica en tramitación);
  registro de actualizaciones y fecha de próxima revisión.
- Página EN `/resources/ai-act-deadlines` y página ES escrita a mano `/es/resources/ai-act-deadlines`:
  próximo plazo calculado en build, línea temporal semántica, tabla "qué cambió con el Omnibus",
  tarjetas de España, "cómo se actualiza" con changelog, descargas, fuentes y enlaces cruzados.
- Exportaciones: `/resources/ai-act-deadlines.json` (todos los hitos, bilingüe) y calendarios ICS por
  idioma (`/resources/ai-act-deadlines.ics`, `/es/resources/ai-act-deadlines.ics`) con los hitos
  pendientes.
- i18n: la ruta entra en el conjunto de páginas traducidas a mano (hoy solo `/thesis`), con hreflang
  en ambos sentidos, selector de idioma y sitemap; content-lint no le exige aviso de traducción
  automática.
- Wiring: navegación (grupo Reference tras Obligations, pie "Plazos del AI Act (español)"), índice
  de recursos, tile de portada tras Obligation register, enlace "Full timeline" en la banda "What
  applies now", frases con enlace en cap. 18 y cap. 21 §Spain, llms.txt, lighthouse, SEO y smoke,
  tarjeta OG propia.

## Capabilities

### New Capabilities
- `ai-act-deadlines`: página de plazos del AI Act EN/ES, dato bilingüe, exportaciones JSON/ICS,
  entradas de España, puerta de mantenimiento y coherencia con el registro.

### Modified Capabilities
- `home-applies-now`: la banda enlaza la línea temporal completa.
- `home-positioning`: un tile más en la portada hacia la página de plazos.

## Impact

- Nuevo: `site/src/data/ai-act-timeline.ts`, `site/src/components/AiActDeadlines.astro` (cuerpo
  compartido por idioma), `site/src/pages/resources/ai-act-deadlines.astro`,
  `site/src/pages/es/resources/ai-act-deadlines.astro`, `site/src/pages/resources/ai-act-deadlines.json.ts`,
  `site/src/pages/resources/ai-act-deadlines.ics.ts`, `site/src/pages/es/resources/ai-act-deadlines.ics.ts`,
  `site/src/lib/ics.ts`, `site/tests/ai-act-deadlines.spec.ts`.
- Modificado: `site/src/lib/i18n-content.ts`, `site/scripts/content-lint.mjs`, `site/astro.config.ts`,
  `site/src/data/nav.ts`, `site/src/pages/resources/index.astro`, `site/src/pages/index.astro`,
  `site/src/components/WhatAppliesNow.astro`, `site/src/pages/llms.txt.ts`, `site/src/lib/og-cards.ts`,
  `site/lighthouserc.cjs`, `site/tests/seo-schema.spec.ts`, `site/tests/smoke.spec.ts`,
  `bok/18-eu-ai-act.md`, `bok/21-ai-laws-worldwide.md`.
- Sin dependencias nuevas; CSP sin cambios (sin JavaScript en cliente).
- Capturas visuales afectadas: portada (un tile más) y recursos; no se añaden baselines PNG.
