# Proposal

## Why

Jordi pidió el 2026-09-25 una mejora integral de SEO y GEO con el plugin claude-seo. Objetivo: que el
sitio sea la referencia sobre gobernanza de IA, posicione para "ai governance" en Google y sea citado
por ChatGPT, Perplexity, AI Overviews y Copilot. La auditoría de producción (10 agentes, 885 URLs,
informes en `D:/Documents/aige-media/seo/2026-09-25/findings/`) dio: técnico 85, sitemap 96, schema
80, GEO 69, contenido 71, hreflang 75, on-page 75, SXO 67, visual 80, rendimiento ~90.

El mismo día Jordi decidió ocultar de momento los idiomas traducidos por máquina (/es /fr /de /pt) y
el selector de idioma, para que no perjudiquen el SEO (la auditoría encontró español dentro de
páginas fr/pt, interfaz alemana en inglés y marcadores `## ` literales).

## What Changes

- Idiomas ocultos tras un interruptor (el contenido y el pipeline de `i18n/` se quedan): sin rutas
  /xx, sin selector, sin hreflang salvo la tesis traducida a mano (/thesis y /es/thesis), redirecciones
  temporales de las URL traducidas a la inglesa, disparador automático de `i18n.yml` desactivado.
- Página pilar `/ai-governance` ("What is AI governance?") con definición citable, marcos comparados,
  pasos de implementación, ejemplos y FAQ, enlazada desde la navegación, la home, el glosario y los
  capítulos.
- Bloques "In short" (respuesta de unas 150 palabras) al inicio de cada capítulo y patrón.
- `seoTitle` para capítulos y títulos orientados a búsqueda en hubs (/bok, /role, crosswalk, /for/aigp).
- Datos estructurados: DOI como `identifier`, `sameAs` Zenodo, ProfilePage del autor, CollectionPage
  en hubs, DefinedTermSet en /bok/glossary, `@id` en BreadcrumbList, autor coherente "Jorge García Aibar".
- Metadatos: descripciones cortadas en frase, sufijo de título solo si cabe, `og:image:alt` veraz.
- GEO: alternativas Markdown por página, `llms.txt` con cobertura completa y `llms-full` por secciones,
  tarjeta MCP en `/.well-known/`.
- Plantillas: byline visible con fecha, enlaces cruzados capítulo/patrón/obligación/caso/glosario,
  títulos de obligaciones sin duplicados, enlaces de casos a `/patterns/<id>`.
- Rendimiento y técnico: `theme.js` inline con hash CSP, CSS de una página fuera del bundle común,
  TBT de crosswalk y mapa regulatorio, imagen del hero, `X-Robots-Tag: noindex` en JSON/CSV.

## Out of scope (tareas de Jordi)

Cloudflare: redirección www→apex (regla de redirección), desactivar Email Obfuscation (rompe versiones
tipo `pkg@1.2` en código), comprobar que "Block AI bots" está apagado. Off-page: ORCID, Wikidata,
directorios MCP, menciones (IAPP, OECD.AI). Clave de Google API para CWV de campo y GSC.
