# Proposal

## Why

La v0.5.0 quiere convertir el sitio en la referencia de gobernanza de IA, y antes de ampliar el
contenido hay que pagar la deuda verificada del existente. Una revisión del 2026-09-24 encontró
citas con el número equivocado, afirmaciones de carga apoyadas en blogs de proveedor o en ofertas de
empleo cuyas URL caducan o se reasignan, el texto del Reglamento de IA citado a través de un
explorador de terceros etiquetado como fuente primaria, un dato de mercado de Gartner que la nota de
prensa citada no contiene, dos modelos distintos de "capas heredadas" y de "qué capa responde a qué
pregunta", entradas del glosario que remiten a capítulos donde el término no aparece, una etiqueta
`</content>` que se filtraba a `llms-full.txt` y 586 rayas (U+2014) en ficheros versionados. Además,
el 2 de diciembre de 2026 cambian obligaciones del Reglamento de IA: las fechas y los estados tienen
que estar bien antes.

## What Changes

- **Citas y fuentes.** Capítulo 04: la cita del preprint OSCAL pasa a `[12]` y se comprueba cada
  número. Normas armonizadas: la afirmación de que ninguna está citada en el DOUE se apoya en la
  página de normalización de la Comisión (actualizada el 2026-08-03) y en una consulta al índice de
  la Oficina de Publicaciones del 2026-09-24, no en un tracker de proveedor. El texto del Reglamento
  (UE) 2024/1689 y del Reglamento (UE) 2026/1744 se cita por su ELI en EUR-Lex (y el crosswalk y la
  ruta de aprendizaje enlazan el texto consolidado de 2026-07-27 por artículo); el explorador del
  Future of Life Institute queda como lectura secundaria. El Código de Buenas Prácticas GPAI se cita
  en las páginas de la Comisión. El concept paper del NCCoE queda como primario en todos los
  capítulos y el capítulo 02 deja de atribuirle una frase que no contiene.
- **Fuentes de proveedor.** La crítica de Kosmoy ("sin vía de datos en tiempo de ejecución") se
  atribuye como comparativa publicada por un competidor, en la Tesis y en los capítulos 02, 03, 05,
  07 y 09, junto a la nota de Gartner de febrero de 2026, que pide a estas plataformas "automated
  policy enforcement at runtime". El Magic Quadrant se cita como relato de IBM (secundario) y el
  capítulo 02 deja de atribuirle unos criterios de inclusión que no están en esa fuente. El dato de
  HiddenLayer se atribuye a una encuesta de proveedor (primario, con la página del informe). Se
  corrige la cifra de mercado de Gartner (USD 492 M en 2026, más de 1.000 M en 2030). Se retiran las
  tres ofertas de SimplyHired (una URL ya apunta a otro puesto) y las afirmaciones que dependían de
  ellas en los capítulos 02 y 06.
- **Modelo único de capas.** Decisión: las tres capas heredadas de la ingeniería GRC son
  Govern-as-Code (01), Inventory & Transparency (02) y Assurance & Continuous Compliance (05); la
  "evidencia legible por máquina" es un valor heredado (valor 5) que vive en esas capas, no una capa.
  Las preguntas se reparten así: 02 responde "qué IA está en ejecución", 01 y 04 responden "qué se le
  permite hacer" (01 escribe el límite como código, 04 lo aplica en la llamada en vivo con identidad
  y alcance propios del agente) y 03 y 05 responden "qué evidencia lo demuestra". Es el modelo de la
  figura de las tres preguntas y el más defendible desde la Tesis ("tres de las cinco capas" más
  "dos que la IA obliga a añadir", 03 y 04) y desde el capítulo 04 (la identidad y el alcance del
  agente son capa 04). Se alinean la Tesis (EN y ES), los capítulos 01 y 04, `stack.ts` (la capa 04
  gana su pregunta), `/stack` y las tarjetas de la home.
- **Glosario.** AESIA remite al capítulo 08, que gana una frase con su Real Decreto 729/2023 (BOE);
  se retira "primer supervisor operativo con potestad sancionadora desde 2025", que no se pudo
  verificar. "Guardian agent" remite al capítulo 04, que gana una frase, y su cifra se cita en la
  nota de prensa de Gartner de 2025-06-11.
- **Pase de fechas (as of 2026-09-24).** Reverificado en línea: normas armonizadas (ninguna citada),
  EN 18286 (publicada por CEN-CENELEC el 2026-07-31, sin cita en el DOUE), primeras solicitudes de
  información de la Oficina de IA (declaración de la vicepresidenta ejecutiva Virkkunen, 2026-08-29),
  NIST IR 8596 (sigue en borrador preliminar inicial), NIST AI 800-1 (sin versión final), periodo de
  gracia de Corea (al menos un año en 2026), OWASP LLM Top 10 2026 (Excessive Agency LLM03) y el
  informe de la IAPP (sigue siendo la edición 2025). Las fechas próximas se enuncian desde el propio
  Reglamento (UE) 2026/1744: 2026-12-02 (nuevas prohibiciones del art. 5 y fin de la gracia del art.
  50(2) para sistemas existentes), 2027-12-02 (anexo III), 2028-08-02 (anexo I) y 2030-08-02
  (sistemas de autoridades públicas); 2027-01-01 para la ley RAISE de Nueva York y la SB 26-189 de
  Colorado. Se sustituyen frases relativas ("en los últimos dos años", "en los mismos dieciocho
  meses", "a día de hoy") por fechas.
- **SB 53 en el capítulo 02**, con el texto de la ley en leginfo como fuente primaria y coherente
  con el capítulo 08 y `frameworks.ts`.
- **Lista de lectura.** Entra el International AI Safety Report 2026 (URL oficial verificada), el
  texto consolidado del Reglamento en EUR-Lex, el Reglamento (UE) 2026/1744, la página de
  normalización de la Comisión y la nota de Gartner de febrero de 2026.
- **Crosswalk.** Las tres referencias a GB/T 45654-2025 siguen `verified: false`: la ficha oficial
  confirma que la norma está vigente (publicada 2025-04-25, en vigor 2025-11-01), pero el texto solo
  se ofrece como vista previa en imagen y no se pudo comprobar la cláusula. Ganan la URL de la ficha
  oficial.
- **Deuda menor.** Se quita el `</content>` suelto del capítulo 08; el hub de recursos anuncia seis
  referencias y su meta descripción incluye el crosswalk y el mapa; las keywords JSON-LD del
  crosswalk incluyen China y TC260; la cabecera de `patterns.ts` dice 17 patrones.
- **Rayas.** Se eliminan las 586 líneas con U+2014 de los ficheros versionados (salvo `LICENSE` y
  `site/package-lock.json`, que no contienen ninguna); en código, las comparaciones y expresiones
  regulares que necesitan el carácter usan el escape `—`.
- Fuera de alcance: los capítulos 11 a 23, el catálogo de herramientas (su fecha de revisión sigue en
  2026-09-19), las filas de China del capítulo 08 (sellos del 2026-09-20, no reverificadas una a una)
  y los ficheros compartidos (`chapters.ts`, `nav.ts`, `astro.config.ts`), cuyos cambios van en el
  handoff.

## Capabilities

### New Capabilities
- `source-integrity`: cómo se citan y etiquetan las fuentes del contenido existente (texto legal en
  EUR-Lex, fuentes de proveedor atribuidas, números de cita que resuelven, sin ofertas de empleo
  caducables, remisiones del glosario correctas, afirmaciones fechadas).
- `stack-layer-model`: el modelo único de capas heredadas y de preguntas por capa.
- `no-em-dash`: la regla de estilo aplicada a todo el repositorio versionado.

### Modified Capabilities
- (ninguna)

## Impact

- **Contenido:** `THESIS.md`, `THESIS.es.md`, `bok/00`, `01`, `02`, `03`, `04`, `05`, `06`, `07`,
  `08`, `09` y `10`, `sources/SOURCES.md`, `STYLEGUIDE.md` (solo la regla de rayas).
- **Sitio:** `src/data/{stack,values,role,patterns,frameworks,crosswalk,path,diagrams}.ts`,
  `src/pages/{index,stack,llms.txt}` y `src/pages/resources/{index,crosswalk}.astro`, más los
  comentarios de 150 ficheros del pase de rayas (sin cambio de comportamiento).
- **Sin cambios** en dependencias, en `astro.config.ts` (salvo un comentario) ni en `.gitignore`.
- Build (`astro check`, build, content-lint, check-links, Pagefind) en verde con el gate compartido.
