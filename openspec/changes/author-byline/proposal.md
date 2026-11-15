# Proposal

## Why

La web recibe visitas pero casi nadie contacta: el autor solo aparece como texto ("By Jorge García Aibar") y el email y LinkedIn solo están en `/about`, a donde casi nadie llega porque el tráfico entra por Google a glosario, capítulos y controles. Una firma de autor con cara y un acceso directo a LinkedIn, como en un artículo publicado, pone a la persona donde aterriza el lector y le da una vía de contacto de un clic.

## What Changes

- Nuevo componente `AuthorBadge` (foto redonda, nombre enlazado a `/about`, botón con el logo de LinkedIn que abre `site.linkedin`, y debajo "AI Governance Engineer"), con dos tamaños: `sm` (firma, foto 40 px) y `lg` (`/about`, foto 160 px).
- `Byline.astro` (glosario, casos, obligaciones, figuras, comparativas, rol, herramientas, perfiles y páginas de control, crosswalk de controles) pasa a mostrar `AuthorBadge` `sm` seguido de las fechas que ya tenía. Se quita la palabra "By".
- `ChapterHeader` (capítulos del BoK y `/ai-governance`) muestra la misma firma encima de la línea meta y deja de pintar el autor dentro de esa línea. El Thesis sigue sin firma (co-autoría).
- `/about` abre con `AuthorBadge` `lg`, antes de "What it is". Sin frase de valor.
- Medición Umami: `data-umami-event="linkedin-click"` con `data-umami-event-placement` (`byline`, `chapter`, `about`) en el botón de LinkedIn, y `data-umami-event="contact-email"` en los `mailto:` de `/about`.
- JSON-LD: el nodo `Person` del autor gana `image` (URL absoluta de la foto).
- Foto en `site/public/images/author/` (JPG 400 px original + WebP 96 px y 320 px pre-generados). Sin `astro:assets`.

## Capabilities

### New Capabilities

- `author-byline`: firma visible de autor (foto, nombre, título visible, botón LinkedIn medido) en cabecera de páginas de referencia, capítulos y `/about`, y la imagen del autor en el JSON-LD `Person`.

### Modified Capabilities

<!-- Ninguna: no hay spec previo de la firma; los tests SEO que la leen se ajustan al nuevo marcado sin cambiar requisitos de otras capacidades. -->

## Impact

- Código: `site/src/components/AuthorBadge.astro` (nuevo), `Byline.astro`, `ChapterHeader.astro`, `site/src/pages/about/index.astro`, `site/src/data/site.ts` (campo `headline` e `image` del autor), `site/src/lib/jsonld.ts`, `site/src/i18n/ui.*.json` (aria-label del botón).
- Activos: `site/public/images/author/jorge-garcia-aibar{.jpg,-96.webp,-320.webp}` (unos 29 KB en total).
- Tests: `tests/ai-governance-pillar.spec.ts` (espera "By {AUTHOR}"), `tests/seo-case-in-short.spec.ts`, `tests/seo-compare.spec.ts`, `tests/seo-links.spec.ts` (regex sobre `<p class="byline" ... data-byline>`), `tests/about.spec.ts`; capturas visuales de las páginas con firma.
- CSP: sin cambios (`img-src 'self'` ya cubre la foto). Sin dependencias nuevas.
