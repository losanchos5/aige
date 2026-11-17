# Design

## Context

Motivo y alcance: ver `proposal.md`. Lo que ya existe y condiciona el diseño:

- `site/src/data/role.ts` tiene los siete flujos (`workflows`, con `id`, `name` y capa) y las
  habilidades por área (`skills`: centrales y de apoyo, sin niveles). `/role` los pinta con
  `WorkflowGrid` y `SkillsTable`.
- La escalera profesional solo está en prosa, en `bok/06-the-role.md`, sección "The career ladder":
  Associate; AI governance engineer; Senior; Staff / principal; Head of AI governance engineering.
  Cada peldaño se define por lo que la persona puede asumir de extremo a extremo y se comprueba
  "mirando los sistemas, no una autoevaluación". Los peldaños 4 y 5 son transversales: arquitectura
  de referencia y decisiones comunes el 4, la función entera el 5.
- `/path` tiene 4 etapas, unos 40 nodos con anclas `#node-<id>` y tres perfiles de entrada.
- `site/src/lib/aigp-coverage.ts` tiene un resolvedor de enlaces (`resolveAigpLink`) que valida en
  build capítulos, patrones, glosario, herramientas, casos, plantillas y rutas conocidas, y lanza si
  uno no existe. `controlHref()` lanza con un control desconocido.
- La API sale del registro `datasets` de `site/src/lib/api.ts`. `/role` no tiene conjunto propio;
  `path` y `maturity` sí.
- `LayerMatrix` es una rejilla de recuentos, no sirve para celdas de texto.
- Una página nueva se registra a mano en `SOURCE_BY_PATH`, `nav.ts`, `llms.txt.ts` y las tarjetas
  OG; el pie sale de `nav.ts`. Varias pruebas fijan esas listas.

## Goals / Non-Goals

**Goals:**

- Que la matriz no pueda divergir del capítulo 06 ni de `/role` sin que algo falle.
- Que cada celda lleve a algo que el lector puede hacer en el sitio.
- Contenido corto y comprobable: una celda se lee en diez segundos.

**Non-Goals:**

- Herramienta de autoevaluación, niveles calculados o progreso guardado.
- Reescribir el capítulo 06 o `/role`.
- Gemelo Markdown y export CSV en esta entrega.
- Mapear la matriz a certificaciones o a marcos de competencias de terceros.

## Decisions

**D1. Ruta `/role/competencies`.** Fichero `site/src/pages/role/competencies.astro`, junto a
`role.astro`. Agrupa la pieza con el puesto y hereda su contexto de búsqueda. Alternativa
descartada: una sección más en `/role`, que ya tiene diez secciones y pruebas que fijan su forma.

**D2. Módulo de datos propio que importa de `role.ts`.** `site/src/data/competencies.ts`:

```ts
interface Rung { n: 1 | 2 | 3 | 4 | 5; name: string; scope: string } // scope: una frase del cap. 06
interface CompetencyLink { label: string; href: string }
interface CompetencyCell {
  workflow: string;      // id de workflows (role.ts)
  rung: 1 | 2 | 3 | 4;
  can: string;           // 40 palabras como máximo
  evidence: string;      // 30 palabras como máximo
  links: CompetencyLink[]; // de 1 a 4
}
interface FunctionStatement { can: string; evidence: string }
```

`competencyProblems()` devuelve los fallos y la página lanza si hay alguno: 28 celdas exactas, una
por par; flujo existente; límites de palabras; enlaces resueltos; evidencia sin las palabras
`certificate`, `certification`, `certified`, `years`, `self-assessment`; entre 3 y 6 enunciados de
función. Mismo patrón que `frontierChangeProblems()`.

**D3. Los peldaños se escriben en los datos y una prueba los compara con el capítulo.** La prueba
lee `bok/06-the-role.md`, extrae la lista numerada de "The career ladder" y exige los mismos cinco
nombres en el mismo orden. Va en `site/tests/data.spec.ts`, junto a las comprobaciones de `/role`.
Alternativa descartada: leer el Markdown en build para generar los peldaños, que acopla el módulo
de datos al formato del capítulo.

**D4. Peldaños 1 a 4 por flujo; peldaño 5 a nivel de función.** El capítulo define los tres
primeros por flujo y el cuarto por las decisiones transversales (modelo de identidad, formato de
evidencia, ruta de incidentes). La celda del peldaño 4 de un flujo describe la decisión de
arquitectura de la que depende ese flujo. El peldaño 5 no se reparte por flujos: una banda con
enunciados de función.

**D5. Enlaces validados con el resolvedor existente.** Los `href` de las celdas pasan por
`resolveAigpLink`; los de controles, por `controlHref`; los de `/path`, contra los ids de nodo. No
se renombra ni se generaliza el resolvedor en este cambio.

**D6. Tabla HTML propia en la página.** Filas: flujos (con su capa). Columnas: peldaños 1 a 4. La
celda de la tabla muestra el enunciado corto y enlaza a su detalle. Por debajo de 640 px cada flujo
pasa a tarjeta con sus cuatro peldaños, como hace la página del historial de marcos con sus tablas.
El detalle por flujo reutiliza `SkillsTable` filtrada a ese flujo si sus props lo permiten; si no,
una lista simple. La tabla muestra el texto completo de `can` como texto del enlace (sin campo corto aparte) para mantener una sola fuente de verdad.

**D7. Anclas.** `#<workflow-id>` para el flujo y `#<workflow-id>-r<n>` para la celda. Se deja que
actúe la regla del sitio para `scroll-margin-top` (no se redefine en la página).

**D8. Conjunto `competencies` en la API.** `rungs`, `workflows` (id, nombre, capa, habilidades),
`cells`, `function` y un `disclaimer` con el aviso de modelo del autor, además del sobre común.
`page: '/role/competencies'`.

**D9. Producción del contenido en tres pasos.** (1) Un redactor escribe las 28 celdas y la banda
solo a partir del capítulo 06, el capítulo 07, los patrones, las herramientas, los controles y
`/path`; nada que el sitio no sostenga. (2) Un revisor distinto contrasta cada celda con la
escalera y con el recurso enlazado, y busca solapes entre peldaños. (3) Jordi lee y firma el
contenido antes del merge: es una posición profesional publicada con su nombre.

**D10. Texto de método y límites.** Dice de dónde sale cada eje, que es un modelo del autor, que
no está validado con una encuesta y que un certificado no es evidencia de una competencia (coherente
con la crítica del capítulo 06). Cualquier mención a marcos de terceros se comprueba contra su
página pública antes de escribirla, o se omite.

**D11. Tests.** Una spec nueva de comportamiento observable: el ancla de una celda queda bajo la
cabecera y nombra flujo y peldaño; sin JavaScript están las 28 celdas y la banda; axe; 390 px. La
prueba de la escalera de D3. La API la cubre `api.spec.ts`. Antes de escribir cada test, la puerta
de `test-audit`.

## Risks / Trade-offs

- [Contenido que suena a estándar sin serlo] → aviso de modelo del autor en la página y en el
  dataset; sin puntuación; firma de Jordi.
- [Celdas inventadas o que el sitio no respalda] → cada celda enlaza a un recurso real y un revisor
  la contrasta con él.
- [Deriva respecto del capítulo 06] → prueba de peldaños; la coherencia de alcance la cubre la
  revisión, no una prueba.
- [Página larga] → tabla resumen arriba con enlaces al detalle; 28 celdas cortas.
- [Dos fuentes para las habilidades] → no se duplican: la matriz importa `skills` de `role.ts`.

## Migration Plan

Cambio aditivo. Se despliega con el merge a `main`. Marcha atrás: revertir el PR.

## Open Questions

- Gemelo Markdown (`/role/competencies.md`) para asistentes: se decide tras ver si la página recibe
  visitas desde asistentes. No cambia specs ni tareas.
