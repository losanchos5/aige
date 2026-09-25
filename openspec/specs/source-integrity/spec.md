# source-integrity Specification

## Purpose
Cada afirmación factual, legal o numérica del contenido existente (Tesis, capítulos 00 a 10 y
módulos de datos del sitio) descansa en una fuente que la contiene, con la etiqueta de verificación
correcta, y cada afirmación sujeta a fecha dice cuándo se comprobó.

## Requirements

### Requirement: Números de cita que resuelven
En cada capítulo, cada marcador `[n]` del texto SHALL existir en la lista `## Sources` del mismo
capítulo y cada entrada de esa lista SHALL usarse en el texto. El marcador MUST apuntar a la fuente
que contiene la afirmación, y cada entrada MUST tener su fila en la sección del capítulo de
`sources/SOURCES.md` con el mismo número.

#### Scenario: Preprint OSCAL en la capa 05
- **WHEN** se lee la frase del capítulo 04 sobre las dieciséis extensiones de propiedad de OSCAL
- **THEN** cita `[12]`, que es el preprint arXiv 2604.13767, y no la fuente de normas armonizadas

#### Scenario: Renumeración tras retirar fuentes
- **WHEN** se retiran fuentes de un capítulo (las ofertas de empleo de los capítulos 02 y 06)
- **THEN** la lista se renumera sin huecos y el texto y `SOURCES.md` usan la misma numeración

### Requirement: Texto legal de la UE en EUR-Lex
Las afirmaciones sobre el contenido del Reglamento (UE) 2024/1689 y del Reglamento (UE) 2026/1744
SHALL citar su ELI en EUR-Lex (o el texto consolidado de 2026-07-27) con la etiqueta `primary`. Un
explorador o comentario de terceros MUST NOT llevar la etiqueta `primary` para el texto legal; puede
figurar como lectura `secondary`. Los enlaces por artículo del crosswalk y de la ruta de aprendizaje
SHALL apuntar al texto consolidado en EUR-Lex con el ancla del artículo o anexo.

#### Scenario: Fechas del Omnibus
- **WHEN** un capítulo enuncia una fecha de aplicación fijada por el Omnibus
- **THEN** la fecha coincide con el Reglamento (UE) 2026/1744 (2026-12-02 para las nuevas
  prohibiciones del art. 5 y la gracia del art. 50(2); 2027-12-02 para el anexo III; 2028-08-02 para
  el anexo I; 2030-08-02 para los sistemas de autoridades públicas) y cita su ELI

### Requirement: Fuentes de proveedor atribuidas
Una afirmación que solo sostiene una fuente de proveedor (un blog comparativo, una encuesta propia,
el anuncio de un proveedor sobre un informe de analista) SHALL atribuirse en la propia frase como
afirmación de ese proveedor y MUST NOT presentarse como hecho del mercado. Si existe una fuente
primaria (el analista, el organismo, la ley), SHALL citarse en su lugar o junto a ella.

#### Scenario: Crítica de la vía de datos en tiempo de ejecución
- **WHEN** la Tesis o un capítulo dice que la categoría de plataformas carece de vía de datos en
  tiempo de ejecución
- **THEN** la frase la atribuye a la comparativa de un proveedor que compite en la categoría y la
  fuente lo declara en su glosa

### Requirement: Sin URL caducables como evidencia
El contenido MUST NOT apoyar una afirmación en una oferta de empleo de un agregador cuya URL caduca
o se reasigna. Si no hay evidencia estable, la afirmación SHALL retirarse o reformularse sin ella.

#### Scenario: Oferta reasignada
- **WHEN** la URL de una oferta citada muestra otro puesto
- **THEN** la cita y la afirmación que sostenía no están en el capítulo

### Requirement: Afirmaciones fechadas
Todo estado que puede cambiar (normas armonizadas, borradores de NIST, periodos de gracia,
aplicación de leyes, ediciones de informes) SHALL llevar "as of AAAA-MM-DD" con la fecha de la
última verificación en línea, y la fecha MUST actualizarse solo cuando la afirmación se reverifica.
El texto MUST NOT usar expresiones relativas al momento de escritura ("en los últimos dos años",
"a día de hoy") donde cabe una fecha.

#### Scenario: Sello de otras jurisdicciones
- **WHEN** se reverifica el periodo de gracia de Corea del Sur
- **THEN** la tabla "Other jurisdictions" del capítulo 08 dice "as of 2026-09-24" y describe el
  periodo como al menos un año en 2026

### Requirement: Remisiones del glosario
Cada entrada del glosario SHALL remitir solo a capítulos donde el término aparece. Si ningún
capítulo lo trata, SHALL añadirse una frase precisa y con fuente en el capítulo adecuado o cambiarse
la remisión.

#### Scenario: AESIA
- **WHEN** se lee la entrada AESIA del glosario, que remite al capítulo 08
- **THEN** el capítulo 08 nombra AESIA y cita el Real Decreto 729/2023 en el BOE

### Requirement: Referencias no verificadas marcadas
Una referencia del crosswalk que no se ha podido comprobar contra su fuente SHALL mantener
`verified: false` con una nota que diga por qué, y MUST NOT pasar a `true` sin evidencia.

#### Scenario: GB/T 45654-2025
- **WHEN** el texto de la norma solo está disponible como vista previa en imagen
- **THEN** las tres referencias siguen `verified: false`, enlazan la ficha oficial y la nota dice
  que la cláusula no se ha comprobado

### Requirement: Referencias sustituidas
Cuando una guía, norma o edición citada ha sido sustituida, el texto SHALL citar la vigente con su
fecha y fuente, y MAY conservar el nombre antiguo solo como etiqueta de una tradición. A 2026-09-24
esto cubre SR 11-7 (sustituida por SR 26-2 el 17 de abril de 2026), ISO Guide 73:2009 (retirada en
favor de ISO 31073:2022), ISO 9001:2015 (sustituida por ISO 9001:2026) e ISO/IEC 27701:2019
(sustituida por ISO/IEC 27701:2025). `STYLEGUIDE.md` MUST recoger la regla.

#### Scenario: SR 11-7 en la desambiguación
- **WHEN** el capítulo 01 contrasta la disciplina con la gestión del riesgo de modelos
- **THEN** conserva la etiqueta «Model risk management (SR 11-7 style)» y dice, con fuente primaria
  de la Reserva Federal, que SR 26-2 sustituyó a SR 11-7 el 17 de abril de 2026 y deja fuera de su
  alcance los modelos de IA generativa y agéntica

#### Scenario: Guía de estilo
- **WHEN** un autor lee la sección 10 de `STYLEGUIDE.md`
- **THEN** la gestión del riesgo de modelos figura como «the SR 11-7 tradition» con la mención de
  SR 26-2, y la sección 7 lista las referencias sustituidas

### Requirement: Artículo de EUR-Lex en los capítulos 11 a 23
En las listas `## Sources` de los capítulos 11 a 23, cada entrada que cite un artículo o anexo del
Reglamento (UE) 2024/1689 SHALL enlazar el texto consolidado de EUR-Lex vigente en la fecha de la
última comprobación (a 2026-09-24, `https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng`)
con el ancla `#art_<n>` o `#anx_<n>`, con la etiqueta `primary`. Un considerando SHALL enlazar el
texto del DOUE con el ancla `#rct_<n>`, porque el consolidado no reproduce los considerandos. La
glosa MUST describir el artículo tal como se lee en el texto enlazado; si el Ómnibus lo modificó,
la glosa MUST dar la redacción modificada. Un explorador de terceros MUST NOT figurar como fuente
del texto legal con etiqueta `primary`.

#### Scenario: Plantilla del plan de seguimiento
- **WHEN** se lee la entrada del capítulo 14 que cita el art. 72
- **THEN** enlaza `#art_72` del consolidado de 2026-07-27 y la glosa dice que la Comisión publica
  una guía con plantilla antes del 2 Sep 2027, no un acto de ejecución

#### Scenario: Considerando
- **WHEN** un capítulo cita el considerando 12 o el 27
- **THEN** la entrada enlaza el DOUE de 2024-07-12 con `#rct_12` o `#rct_27`

### Requirement: Reproducciones no oficiales de textos legales
Una entrada que cite el texto de una ley o un reglamento SHALL enlazar la publicación oficial
(EUR-Lex, GovInfo, eCFR, legislation.gov.uk u otro diario o legislador) cuando exista. Una
reproducción no oficial (gdpr-info.eu, el Legal Information Institute u otra copia recompuesta)
MUST NOT llevar la etiqueta `primary`. Un repositorio que sirve el documento original del tribunal
sin alterarlo MAY llevar `primary` y SHALL nombrarse como tal en el publicador.

#### Scenario: Fair use en el capítulo 20
- **WHEN** se lee la entrada del capítulo 20 sobre 17 U.S.C. § 107
- **THEN** enlaza GovInfo (United States Code, edición 2024) con etiqueta `primary`, y ninguna
  entrada `primary` de los capítulos 11 a 23 enlaza law.cornell.edu

### Requirement: Registro consolidado alineado
Cada entrada re-citada SHALL tener en su sección de `sources/SOURCES.md` una fila con el mismo
número, la misma URL y la misma etiqueta, en todas las copias de la sección; una fila de otra
sección MUST NOT quedar dentro de la tabla de un capítulo.

#### Scenario: Comprobación por script
- **WHEN** se comparan las listas `## Sources` de los capítulos 11 a 23 con `sources/SOURCES.md`
- **THEN** no hay entradas sin fila, filas sin entrada ni diferencias de URL o etiqueta
