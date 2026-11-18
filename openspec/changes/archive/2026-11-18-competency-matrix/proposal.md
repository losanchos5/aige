# Proposal

## Why

El dominio del sitio es el nombre del puesto y quien llega por búsqueda es gente que ejerce o quiere
ejercer. `/role` dice qué hace el puesto y qué habilidades pide, y el capítulo 06 describe una
escalera profesional de cinco peldaños, pero esa escalera solo existe en prosa: no hay una pieza que
diga, por flujo de trabajo y por peldaño, qué puede asumir una persona y con qué artefacto se
comprueba. Los marcos de competencias existentes para este campo no son abiertos o no son de
ingeniería. Una matriz abierta, citable y enlazada al resto del sitio cubre ese hueco con material
que el Body of Knowledge ya contiene.

## What Changes

- Nueva página `/role/competencies`: la matriz de competencias del AI governance engineer. Filas:
  los siete flujos de trabajo de `/role`. Columnas: los peldaños de la escalera del capítulo 06.
- Cada celda dice qué puede asumir la persona, qué artefacto observable en los sistemas lo
  demuestra y dónde lo trabaja el sitio (patrones, herramientas, controles, plantillas, capítulos,
  nodos de `/path`).
- El peldaño de dirección de la función se describe a nivel de función, no por flujo.
- Nuevo conjunto `competencies` en `/api/v1`.
- Enlaces a la matriz desde `/role` y `/path`, y alta en navegación, pie, sitemap, `llms.txt` y
  tarjeta OG.
- Una prueba que falla si los nombres de los peldaños dejan de coincidir con el capítulo 06.

Fuera de alcance: autoevaluación, puntuación o guardado de progreso; gemelo Markdown de la página;
cambios en el texto del capítulo 06; datos salariales nuevos; cualquier certificación propia.

## Capabilities

### New Capabilities

- `competency-matrix`: matriz de competencias por flujo de trabajo y peldaño profesional, con
  evidencia observable y enlaces a los recursos del sitio, publicada como página y dataset.

### Modified Capabilities

- `open-data-api`: nuevo conjunto `competencies` en el catálogo.

## Impact

- Datos: `site/src/data/competencies.ts` (nuevo), que reutiliza `workflows` y `skills` de
  `site/src/data/role.ts`.
- Páginas: `site/src/pages/role/competencies.astro` (nueva); enlaces en `role.astro` y `path.astro`.
- Registros de página: `site/astro.config.ts` (`SOURCE_BY_PATH`), `site/src/data/nav.ts`,
  `site/src/pages/llms.txt.ts`, tarjetas OG, pie.
- API: `site/src/lib/api.ts` (una entrada en `datasets`).
- Validación de enlaces: se reutiliza el resolvedor de `site/src/lib/aigp-coverage.ts`.
- Tests: una spec nueva de la página; una comprobación de la escalera en `data.spec.ts`.
- Contenido editorial nuevo (28 celdas y la banda de función): lo firma Jordi antes del merge.
- Sin dependencias nuevas.
