# Design

## Context

Ver proposal.md (Why). Hoy hay dos sitios que pintan al autor: `Byline.astro` (`<p class="byline" data-byline>`, una línea mono "By {autor} · Updated ...", usado en 10 plantillas) y `ChapterHeader.astro` (un `MetaBit` con `author: true` dentro de `ul.ch-meta`, apagado en el Thesis vía la prop `byline`). Los datos del autor viven en `site.ts` (`authors`, `authorDetails`, `linkedin`) y el `Person` JSON-LD se construye en `lib/jsonld.ts` solo con lo que `site.ts` declara. El repo no usa `astro:assets`. La CSP permite `img-src 'self' data:`.

## Goals / Non-Goals

**Goals:**

- Un único componente de firma reutilizado en los tres sitios, para que no diverjan.
- Coste de carga despreciable en todas las páginas (foto ≤ 2 KB en la firma).
- No romper los selectores que ya usan los tests (`data-byline`, `class="byline"`, `rel="author"`, `<time datetime>`).

**Non-Goals:**

- Ficha de autor al pie de las páginas (descartada por Jordi: solo arriba).
- Frase de valor o descripción en la firma o en `/about`.
- Cambiar `jobTitle` del JSON-LD ("AI Governance & Privacy Engineer").
- Email de dominio, CTA de reunión, o firma en el Thesis.

## Decisions

1. **`AuthorBadge.astro` con prop `size: 'sm' | 'lg'` y prop `placement`** (`byline`, `chapter`, `about`) que solo alimenta `data-umami-event-placement`. `Byline` y `ChapterHeader` lo usan en `sm`; `/about` en `lg`. Alternativa descartada: duplicar el marcado en cada sitio.
2. **Marcado de `Byline` conserva el contenedor `<p class="byline" data-byline>`**; dentro, el badge en elementos de línea (`<span>`, `<img>`, `<a>`) y las fechas detrás del título. Así las regex de `seo-*.spec.ts` siguen casando sin reescribirlas. El badge, por tanto, solo usa elementos válidos dentro de `<p>` (nada de `<div>`).
3. **Layout de la firma `sm`**: rejilla de dos filas; columna 1 la foto (40 px, redonda, ocupa las dos filas); fila 1 nombre (enlace, `--ink`, sans) + botón LinkedIn; fila 2 "AI Governance Engineer" y las fechas, en mono `--fs-label` y `--ink-2` (como hoy). Nunca atenuar con `opacity` (gate de contraste del sitio).
4. **Título visible desde datos**: nuevo campo `headline?: string` en `Author` (`site.ts`) con valor `'AI Governance Engineer'`. No se reutiliza `jobTitle` porque el JSON-LD mantiene el título largo.
5. **Foto en `public/images/author/`**: JPG 400 px original (para `Person.image` y uso futuro), WebP 96 px (firma a 2x) y WebP 320 px (`/about` a 2x), ya generados en escala de grises. `<img>` con `width`/`height`, `loading="lazy"` en la firma salvo que esté sobre el pliegue (la firma está bajo el H1, así que `loading="eager"` y `decoding="async"`); `alt=""` porque el nombre está al lado. Alternativa descartada: `astro:assets` (añadir pipeline para dos imágenes fijas).
6. **Logo de LinkedIn**: SVG inline del glifo "in" (`currentColor`, `aria-hidden="true"`) dentro de un `<a>` con `aria-label` desde i18n (`author.linkedin`: "{name} on LinkedIn"; traducciones es/fr/de/pt). Hit area 28 px. Hover/focus usan los tokens existentes; foco con el anillo global del sitio.
7. **`ChapterHeader`**: se quita el `MetaBit` de autor y se renderiza `<AuthorBadge size="sm" placement="chapter" />` encima de `ul.ch-meta` cuando `byline` es verdadero. El "By" desaparece en todos los idiomas.
8. **JSON-LD**: `authorDetails[0].image = '/images/author/jorge-garcia-aibar.jpg'`; `jsonld.ts` lo emite como URL absoluta sobre `site.url` cuando existe.

## Risks / Trade-offs

- [Capturas visuales cambian en todas las páginas con firma] → regenerar solo las baselines afectadas en este worktree y revisarlas a mano antes del commit.
- [Tests que esperan "By {AUTHOR}"] → `ai-governance-pillar.spec.ts` pasa a comprobar el enlace con nombre y el título; no se mantiene "By" oculto solo para el test.
- [Gate de contraste axe sobre la fila del título] → usa `--ink-2`, igual que la firma actual, que ya pasa.
- [La foto en todas las páginas añade una petición] → 1,3 KB, mismo origen, cacheada tras la primera visita.
