# Spec Delta

## Purpose

El capítulo 20 del Body of Knowledge explica cómo el derecho preexistente (propiedad intelectual, no
discriminación, protección del consumidor y responsabilidad por productos, más deepfakes) se aplica a
los sistemas de IA, con estados fechados y verificados, y traduce cada deber a un artefacto, una capa
del stack y un patrón.

## ADDED Requirements

### Requirement: Estructura del capítulo 20
El fichero `bok/20-existing-law.md` SHALL conservar el H1 «# 20. Other law that already applies to
AI», abrir con un blockquote de una sola frase como entradilla y contener las secciones H2
«Intellectual property», «Non-discrimination», «Consumer protection», «Product liability»,
«Deepfakes and synthetic media», «One hiring model through five bodies of law», «What you can do
this week» y «Sources», en ese orden relativo. El cuerpo MUST tener entre 4.000 y 7.000 palabras y
MUST NOT contener el carácter raya (U+2014).

#### Scenario: Lector abre el capítulo
- **WHEN** un lector abre `/bok/existing-law`
- **THEN** ve la entradilla, las cuatro secciones de doctrina, la sección de deepfakes, el ejemplo
  trabajado y la lista de acciones antes de las fuentes

#### Scenario: Lint de contenido
- **WHEN** se ejecuta el build con `content-lint`
- **THEN** no hay rayas, ni frases de la lista de bloqueo, ni anclas de cita colgantes

### Requirement: Comparación fechada por cuerpo normativo
Cada una de las cuatro secciones de doctrina SHALL incluir al menos una tabla GFM que compare la UE,
EE. UU. y el Reino Unido (y Japón en copyright) con la marca «as of 2026-09-24», y la sección de
propiedad intelectual SHALL incluir una tabla de casos de entrenamiento en EE. UU. con columna de
estado a esa fecha.

#### Scenario: Estado de un caso pendiente
- **WHEN** el lector consulta la fila de un caso pendiente (p. ej. *Thomson Reuters v. ROSS* o
  *Andersen v. Stability AI*)
- **THEN** la fila indica la última actuación verificada con su fecha y una cita `[n]`

#### Scenario: Hecho no confirmado
- **WHEN** una afirmación no pudo confirmarse en fuente (p. ej. la apelación en *GEMA v OpenAI* o la
  ley de Illinois)
- **THEN** la prosa la matiza y la marca «(verify)», y figura en la lista `verify_items` del informe

### Requirement: Obligación, artefacto y capa
El capítulo SHALL vincular cada deber principal con un artefacto de evidencia, la capa del stack
(01 Govern-as-Code a 05 Assurance & Continuous Compliance) que lo produce y, cuando exista, el patrón
del capítulo 05 enlazado por su ancla `#pattern-*`. Los patrones que aún no existen (Training-Data
Rights Ledger, Claims Substantiation Gate) MUST presentarse como propuestos y MUST NOT enlazarse.
El capítulo SHALL incluir la frase «Mappings are illustrative, not a claim of conformity».

#### Scenario: Enlaces a patrones
- **WHEN** se ejecuta `check-links` sobre el sitio construido
- **THEN** todos los enlaces `/bok/patterns#pattern-*` y demás anclas internas del capítulo resuelven

#### Scenario: Patrón propuesto
- **WHEN** el lector encuentra «Claims Substantiation Gate» en el capítulo
- **THEN** el texto lo presenta como patrón propuesto, sin enlace, y el handoff lo lista en
  `patterns_needed`

### Requirement: Fuentes numeradas y verificadas
Toda afirmación factual, jurídica o numérica del capítulo SHALL llevar un marcador `[n]` que exista en
`## Sources` con el formato `[n] Title (gloss). Publisher. Date. URL (verified: primary|secondary|reported)`.
Las fuentes MUST preferir el texto legal, el tribunal, el regulador o el documento original, y el
material ISO/IEC, CSA o IAPP MUST citarse solo por identificador y título corto.

#### Scenario: Cita de texto legal de la UE
- **WHEN** el capítulo cita la Directiva (UE) 2024/2853 o la Directiva (UE) 2019/790
- **THEN** la fuente apunta a la ELI de EUR-Lex y lleva `verified: primary`

#### Scenario: Numeración coherente
- **WHEN** se cuentan los marcadores del cuerpo y las entradas de `## Sources`
- **THEN** cada `[n]` del cuerpo tiene su entrada y no hay entradas sin uso

### Requirement: Handoff para ficheros compartidos
El cambio SHALL producir `D:/Documents/aige-wt/handoffs/c20-existing-law.json` (JSON válido, fuera del
repo) con el resumen y el «at a glance» del capítulo, términos de glosario, filas de obligaciones y
crosswalk, patrones necesarios, enlaces cruzados, lecturas, rutas y notas (incluidas las filas para
`sources/SOURCES.md`), y MUST NOT editar directamente ficheros compartidos que no le pertenecen.

#### Scenario: Orquestador integra el capítulo
- **WHEN** el orquestador lee el handoff
- **THEN** encuentra un `summary` de una frase de 160 caracteres o menos fiel a la entradilla, y los
  datos necesarios para actualizar glosario, obligaciones, crosswalk y fuentes consolidadas
