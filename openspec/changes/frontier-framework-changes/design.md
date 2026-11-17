# Design

## Context

Motivo y alcance: ver `proposal.md`. Estado del código que condiciona el diseño:

- `site/src/data/frontier-crosswalk.ts` guarda los tres documentos (`frontierDocs`), las 13
  dimensiones y sus invariantes (`frontierProblems()`); la página lanza un error de build si hay
  alguno. El objeto JSON del export se monta en línea en
  `site/src/pages/resources/frontier-safety-crosswalk.json.ts`.
- La API sale de un único registro, `datasets` en `site/src/lib/api.ts`: índice, esquemas y OpenAPI
  se derivan de él.
- `site/src/pages/rss.xml.ts` mezcla listas de `FeedEntry` de varias fuentes.
- `tools/reg-monitor` vigila 34 fuentes; de un PDF solo guarda el hash, no el texto. `--check`
  exige que cada URL aparezca literalmente en un fichero versionado fuera de `tools/reg-monitor/`.
- Una página nueva se registra a mano en `SOURCE_BY_PATH` (`site/astro.config.ts`), `nav.ts`,
  `llms.txt.ts`, las tarjetas OG y el índice de recursos. Un test exige que el pie enlace toda ruta
  pública que no sea de una colección de detalle.

Hechos comprobados el 2026-11-17 (informe y ficheros en `D:/Documents/aige-wt/handoffs/tracker-src/`,
fuera del repo):

- Ningún marco ha cambiado desde el 2026-09-30: RSP 3.4 (2026-07-08), Preparedness Framework v2
  (2025-04-15), FSF 3.1 (2026-04-17).
- Hay 15 versiones publicadas (9 de RSP, 2 de Preparedness Framework, 4 de FSF) y todas se pudieron
  descargar; `index.md` da URL, fecha y SHA-256 de 17 ficheros.
- Anthropic publica notas de versión y PDF con cambios marcados para 2.2, 3.1, 3.2, 3.3 y 3.4.
  OpenAI y Google DeepMind solo listan cambios dentro del propio documento.
- El PDF vivo de OpenAI v2 es idéntico, byte a byte, a una resubida de junio de 2025 bajo la misma
  etiqueta. El corpus de "Silent Revision" documenta resubidas así también en Anthropic 2.0 y 2.1 y
  en FSF 2.0.
- Ese corpus (CC BY 4.0) ya analiza varias de estas transiciones con códigos de dirección. No está
  mantenido ni mapea a estándares.
- `openai.com` devuelve 403 a clientes automáticos; su CDN de PDF no.
- La URL del PDF de RSP 3.4 que guarda el crosswalk usa otro host que la que Anthropic enlaza hoy.

## Goals / Non-Goals

**Goals:**

- Un módulo de datos que una persona pueda mantener en 30 minutos a la semana.
- Que un dato incoherente rompa la build, no la credibilidad.
- Reutilizar componentes, patrones de export y registro de API existentes.

**Non-Goals:**

- Guardar en el repo el texto o los PDF de los labs.
- Automatizar la detección de qué cambió: el monitor avisa de que algo cambió y una persona
  registra el qué.
- Filtros interactivos, feed propio o DOI propio en esta entrega.
- Una puerta de antigüedad en CI.

## Decisions

**D1. Página de primer nivel.** La ruta es `/resources/frontier-framework-changes`, no una hija del
crosswalk. Entra en el índice de recursos, la navegación y el pie con el patrón de cualquier otro
recurso. Alternativa descartada: `/resources/frontier-safety-crosswalk/changes`, que obligaría a
declarar una colección de detalle nueva para un único hijo.

**D2. Módulo de datos propio.** `site/src/data/frontier-changes.ts`, que importa `frontierDocs` y
`dimensions` del crosswalk y el tipo `Source` de `site/src/lib/sources.ts`. Forma:

```ts
interface FrontierFile {
  sha256: string;
  url?: string;          // URL oficial mientras el lab la sirva
  archiveUrl?: string;   // copia archivada
  retrieved: string;     // fecha de descarga o de captura (YYYY-MM-DD)
  verified: 'primary' | 'secondary';
  source: number;        // índice en las fuentes del módulo
  note?: string;
}
interface FrontierVersion {
  framework: string;     // id de frontierDocs
  version: string;       // etiqueta tal como la da el documento
  date: string;
  dateKind: 'effective' | 'published';
  files: FrontierFile[]; // vacío si no se recuperó
  note?: string;
}
interface FrontierTransition {
  id: string;            // p. ej. anthropic-rsp-3.3-3.4
  framework: string;
  from: string;
  to: string;
  covered: boolean;
  recorded?: string;     // día en que se registraron sus cambios
  changeNotes: 'itemised' | 'narrative' | 'redline' | 'none' | 'not-assessed'; // not-assessed solo si no está cubierta
  changeNotesUrl?: string;
  thirdParty?: number[]; // fuentes de análisis ajenos
}
interface FrontierChange {
  id: string;            // <transition>-NN
  transition: string;
  kind: 'added' | 'removed' | 'modified' | 'relocated';
  section: string;
  summary: string;
  before?: { quote: string; url: string };
  after?: { quote: string; url: string };
  movedTo?: string;
  dimensions: string[];
  disclosure: 'listed' | 'partly-listed' | 'not-listed' | 'no-changelog';
  verified: 'primary' | 'secondary';
}
```

Durante la carga se añadieron dos campos opcionales: `FrontierVersion.labelSource` (fuente de la
etiqueta cuando la portada del documento no la imprime) y `FrontierTransition.noteSources` (fuentes
de las notas de versión del lab). Los números de fuente son de base 1, como en el crosswalk.

Tras la revisión de código se endurecieron las invariantes: la lista vetada casa raíces y flexiones
(con el nombre propio "Self-improvement" como única excepción); una URL de cita es de PDF si
coincide con la de un fichero de versión, aunque no termine en `.pdf`; la fecha de comprobación no
puede ser posterior al día de la build, y solo una fecha de versión de tipo `effective` puede ser
posterior a ella; un cambio es `no-changelog` si y solo si su transición no tiene notas del lab; y
una transición cubierta con notas debe enlazarlas.

Las invariantes van en `frontierChangeProblems()` y la página lanza si devuelve algo, igual que
`frontierProblems()`. Comprueba: ids únicos; versiones, transiciones y dimensiones existentes;
transiciones entre versiones consecutivas; citas según el tipo y de 25 palabras como máximo;
`#page=` en las URL de PDF; formato del hash; fechas válidas y no futuras; `recorded` presente si
`covered`; lista vetada en `summary`; y que la versión de cada `frontierDocs` exista en el
historial. Alternativa descartada: ampliar `frontier-crosswalk.ts`, que ya tiene 2.063 líneas.

**D3. Vocabulario alineado con el codebook de "Silent Revision", sin dirección.** `added`,
`removed` y `relocated` equivalen a sus códigos A, X y L; `modified` agrupa S y W sin decir cuál.
`listed`, `partly-listed`, `not-listed` y `no-changelog` equivalen a ANN, ANN-P, SIL y NCL. La
sección de método publica la equivalencia. Así los dos datasets se pueden cruzar y este no emite
juicios.

**D4. Lista vetada solo en los resúmenes.** Términos como `weaken`, `strengthen`, `water down`,
`loophole`, `backtrack`, `improve`, `worse`, `better`, `dilute`. No se aplica a las citas, que son
literales.

**D5. Hash y procedencia.** El hash es el SHA-256 de los bytes descargados de la URL oficial, con su
fecha. La fuente de la primera carga es `handoffs/tracker-src/index.md`. Las resubidas que solo
constan en el corpus ajeno entran con `verified: 'secondary'` y su fuente, sin afirmar qué cambió.

**D6. Cobertura de la primera entrega.** Se listan las 12 transiciones. Cubiertas: RSP 3.3 a 3.4,
Preparedness Framework beta a v2 y FSF 3.0 a 3.1. También RSP 3.0 a 3.1, 3.1 a 3.2 y 3.2 a 3.3, que
tienen PDF con cambios marcados; si alguna no supera la verificación, queda como no cubierta. Las
otras seis quedan como no cubiertas.

**D7. Método de comparación, fuera del repo.** Se extrae el texto de las dos versiones, se compara
por secciones y se contrasta cada candidato en el PDF. El PDF con cambios marcados del lab sirve de
guía, no de única fuente. En una reescritura completa (beta a v2) la unidad es cada punto de las
notas de versión del lab más los cambios materiales que la comparación encuentre fuera de ellas.
Después, una verificación adversarial hecha por un revisor distinto del autor.

**D8. Un constructor por dataset.** El objeto que hoy se monta en el `.json.ts` del crosswalk pasa a
una función del módulo de datos, que usan el export y la entrada `frontier-crosswalk` de `datasets`.
El historial nace con la misma estructura. El export del crosswalk no debe cambiar ni un byte.

**D9. RSS.** Una `FeedEntry` por transición cubierta, con `pubDate` igual a `recorded` y `guid`
igual a la URL de su ancla. La fecha de la versión del lab va en el texto, no en `pubDate`, para que
los lectores de feeds no la entierren.

**D10. Monitor sin código nuevo.** Fuentes: página de RSP de Anthropic y su PDF vigente; entrada de
blog de Google DeepMind y su PDF vigente; PDF vigente de OpenAI. La página de OpenAI entra solo si
alguno de los dos transportes existentes la obtiene; si no, la nota de la fuente lo dice. Se acotan
con `select` las páginas que cambian por otros motivos. Si la URL del PDF de RSP que guarda el
crosswalk ya no responde, se corrige en `frontier-crosswalk.ts`.

**D11. Tests.** Una spec nueva de comportamiento observable (ancla, recuento de exports, contenido
sin JavaScript, axe, 390 px), más las listas que ya existen: el índice de recursos en
`resources.spec.ts` y las URL obligatorias del test de fuentes del monitor. Las invariantes no se
duplican en tests: ya rompen la build. Toda spec pasa antes por la puerta de `test-audit`.

## Risks / Trade-offs

- [Un error de hecho sobre un lab] → verificación adversarial contra el PDF primario, campo
  `verified` y enlace visible para enviar correcciones.
- [Registro incompleto] → cobertura declarada por transición y método publicado; la página no dice
  ser exhaustiva.
- [Derechos sobre los documentos] → solo hashes, URLs y citas de 25 palabras como máximo.
- [OpenAI bloquea la página de anuncios] → el monitor solo ve su PDF; una v3 con URL nueva no se
  detectaría sola. Se cubre con la revisión semanal manual y se declara en la nota de la fuente.
- [La URL del PDF de FSF 3.0 no está enlazada por Google] → se guarda con nota y con copia archivada
  si existe; puede desaparecer.
- [Ruido del monitor en páginas que cambian a menudo] → selectores acotados a la lista de versiones.
- [Carga de mantenimiento] → tres labs, sin automatizar el análisis; si se dejan pasar dos
  actualizaciones, la página se congela como archivo.

## Migration Plan

Cambio aditivo. Se despliega con el merge a `main`. Marcha atrás: revertir el PR; no hay estado que
migrar.

## Open Questions

- DOI propio del dataset: se decide tras publicar, con una release de GitHub que acuñe el DOI de
  versión en Zenodo. No cambia specs ni tareas.
