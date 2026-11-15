# Tasks

## 1. Datos y activos

- [x] 1.1 Añadir `headline?: string` e `image?: string` a `Author` en `site/src/data/site.ts`, con `headline: 'AI Governance Engineer'` e `image: '/images/author/jorge-garcia-aibar.jpg'` en `authorDetails[0]` (la foto y los WebP 96/320 ya están en `site/public/images/author/`)
- [x] 1.2 Emitir `image` (URL absoluta sobre `site.url`) en el nodo `Person` de `site/src/lib/jsonld.ts` cuando el autor la declare; `jobTitle` sin cambios
- [x] 1.3 Añadir la clave i18n `author.linkedin` ("{name} on LinkedIn" y traducciones) en `site/src/i18n/ui.{en,es,fr,de,pt}.json`

## 2. Componente de firma

- [x] 2.1 Crear `site/src/components/AuthorBadge.astro` (props `size: 'sm' | 'lg'`, `placement: 'byline' | 'chapter' | 'about'`, `lang`): foto redonda con `width`/`height` y `alt=""`, nombre enlazado a `/about` con `rel="author"`, botón LinkedIn con SVG inline `aria-hidden`, `aria-label` i18n, `target="_blank" rel="noopener noreferrer"`, `data-umami-event="linkedin-click"` y `data-umami-event-placement`; fila de título con `headline`. Solo elementos válidos dentro de `<p>`; sin `opacity` para atenuar
- [x] 2.2 `Byline.astro`: conservar `<p class="byline" data-byline>`, renderizar `AuthorBadge` `sm` `placement="byline"` y poner las fechas en la fila del título; quitar "By"
- [x] 2.3 `ChapterHeader.astro`: quitar el `MetaBit` de autor y renderizar `AuthorBadge` `sm` `placement="chapter"` encima de `ul.ch-meta` cuando `byline` sea verdadero (Thesis sigue sin firma)

## 3. Página About

- [x] 3.1 `site/src/pages/about/index.astro`: abrir con `AuthorBadge` `lg` `placement="about"` antes de "What it is", sin frase de valor
- [x] 3.2 Añadir `data-umami-event="contact-email"` a los dos `mailto:` de `/about`

## 4. Tests y verificación

- [x] 4.1 Leer `~/.claude/skills/test-audit/SKILL.md` y pasar su puerta antes de tocar tests
- [x] 4.2 Ajustar `tests/ai-governance-pillar.spec.ts` (ya no hay "By"; comprobar enlace con nombre, título y botón LinkedIn) y verificar que `seo-case-in-short`, `seo-compare`, `seo-links` y `about.spec.ts` siguen pasando sin reescribir sus regex
- [x] 4.3 Añadir una sola comprobación de valor: en una página de glosario, un capítulo y `/about`, el botón LinkedIn tiene `href` = `site.linkedin`, nombre accesible y el `placement` correcto; y el `Person` JSON-LD lleva `image`
- [x] 4.4 `npm run build` y luego `npm test` y `npm run test:a11y` en `site/` (build antes de test; lhci al final si se ejecuta) (en local: build completo y los 6 specs afectados, 194 tests; suite completa y test:a11y los corre el CI de la PR)
- [ ] 4.5 `npm run test:visual`, regenerar solo las baselines de páginas con firma y revisarlas a mano (foto, alineación, modo claro/oscuro, 390 y 1440) (omitido a petición de Jordi: el CI no corre el proyecto visual; capturas revisadas a mano en glosario, capítulo y /about a 1440 y 390, claro y oscuro)
- [x] 4.6 Revisión de `code-reviewer`; corregir CRITICAL/HIGH
