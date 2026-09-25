# Proposal

## Why

El libro trata el AI Act, la protección de datos y las leyes específicas de IA, pero no el derecho
que ya se aplicaba a los sistemas de IA antes de cualquier ley de IA: propiedad intelectual,
antidiscriminación, protección del consumidor y responsabilidad por productos defectuosos. Es donde
hoy se litiga y se sanciona (casos de entrenamiento con obras protegidas, auditorías de sesgo en
contratación, acciones de la FTC por afirmaciones no sustentadas, nueva Directiva de responsabilidad
por productos que trata el software como producto). El capítulo 20 existe como esqueleto; sin
contenido, el lector no puede trazar esas obligaciones hasta el artefacto que las evidencia ni hasta
la capa del stack que lo produce, que es la promesa del libro.

## What Changes

- **Capítulo 20 completo** (`bok/20-existing-law.md`, título «20. Other law that already applies to
  AI»): cuatro secciones (propiedad intelectual, no discriminación, protección del consumidor,
  responsabilidad por productos) más una sección breve de deepfakes y medios sintéticos. Cada sección
  da la doctrina en términos llanos, una comparación fechada UE / EE. UU. / Reino Unido (as of
  2026-09-24) y los artefactos que evidencian el cumplimiento, con su capa (01–05) y su patrón del
  capítulo 05.
- **Tabla fechada de casos de entrenamiento en EE. UU.** (Ross, Bartz, Kadrey, NYT, Andersen,
  Midjourney) y resumen de la jurisprudencia europea y británica (LAION, GEMA, Like Company, Getty),
  cada fila con estado verificado en fuente primaria o secundaria.
- **Tabla de medidas de equidad con sentido jurídico** (regla de los cuatro quintos, impacto
  dispar del Title VII, NYC Local Law 144, discriminación indirecta en la UE, adverse action,
  CCD2 art. 18(8)) enlazada con el capítulo 16.
- **Tabla de tipos de defecto mapeados a modos de fallo de IA** y el «defence file» por release.
- **Ejemplo trabajado**: un modelo de contratación a través de cinco cuerpos normativos.
- Cierre con «What you can do this week» y fuentes numeradas con etiqueta de verificación.
- **Handoff** para el orquestador (fuera del repo): resumen y «at a glance» del capítulo, términos de
  glosario, filas de obligaciones y crosswalk, patrones propuestos (Training-Data Rights Ledger,
  Claims Substantiation Gate), enlaces cruzados, lecturas y filas para `sources/SOURCES.md`.
- Fuera de alcance: editar ficheros compartidos (`chapters.ts`, glosario, capítulo 08,
  `frameworks.ts`, `crosswalk.ts`, `sources/SOURCES.md`, `CHANGELOG`); crear los patrones nuevos;
  asesoramiento jurídico.

## Capabilities

### New Capabilities
- `bok-existing-law`: el capítulo 20 del Body of Knowledge sobre derecho preexistente aplicado a la
  IA, con sus tablas fechadas, sus mapeos obligación → artefacto → capa y sus fuentes verificadas.

### Modified Capabilities
- (ninguna)

## Impact

- **Contenido**: `bok/20-existing-law.md` (sustituye el esqueleto). Sin cambios de código ni de
  dependencias.
- **Enlaces internos**: solo a rutas y anclas existentes (`/bok/the-stack`, `/bok/patterns#pattern-*`,
  `/bok/the-role#regulatory-translation`, `/bok/definition#the-disambiguation-cluster`) y a las
  páginas de capítulos 16–19 y 21 sin anclas.
- **Ficheros compartidos**: los cambios que les tocan van en
  `D:/Documents/aige-wt/handoffs/c20-existing-law.json` para que los aplique el orquestador.
- **Verificación**: `bash D:/Documents/aige-wt/build.sh` (astro check, build, content-lint,
  check-links, pagefind) en verde; `openspec validate bok-ch20-existing-law --strict` en verde.
