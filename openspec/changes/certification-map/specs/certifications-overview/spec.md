# Spec Delta

## ADDED Requirements

### Requirement: Mapa de credenciales por tema y requisito

La página `/for/certifications` SHALL mostrar un mapa de las credenciales personales de gobierno,
auditoría, riesgo, sistemas de gestión, seguridad y fundamentos de IA, colocadas por dos ejes: el
tema que nombra el título de la credencial y lo que su emisor exige antes del examen o de la
credencial (nada declarado, formación obligatoria, experiencia, credencial previa). Cada credencial
SHALL mostrar su emisor y enlazar a su fila en la tabla de hechos. El mapa SHALL distinguir una
certificación de un certificado según la palabra que usa el emisor, SHALL marcar las credenciales
que no están en vigor (beta, piloto, anunciada, preventa) y SHALL nombrar las credenciales previas
que el emisor exige. El mapa SHALL presentarse en un panel opaco sobre una pintura del catálogo del
sitio y SHALL leerse completo sin JavaScript.

#### Scenario: Credencial que exige otra

- **WHEN** el emisor exige tener una credencial anterior
- **THEN** la credencial aparece en la franja "credencial previa" y nombra cuáles exige

#### Scenario: Del mapa a los hechos

- **WHEN** un lector activa una credencial del mapa
- **THEN** su fila de la tabla de hechos queda a la vista y marcada, con un enlace de vuelta al mapa

#### Scenario: Móvil

- **WHEN** se abre la página a 390 px
- **THEN** cada tema se lee con sus franjas apiladas y la página no se desplaza lateralmente

### Requirement: Posición sin juicio

El mapa MUST NOT ordenar, puntuar ni recomendar credenciales, y MUST NOT asignarles un nivel propio
del sitio. La página SHALL decir junto al mapa que la posición muestra el tema del título y lo que
exige el emisor, y que no dice nada sobre dificultad, calidad ni valor. El mapa MUST NOT mostrar
logotipos y MUST NOT distinguir emisores por color.

#### Scenario: Nivel que declara el emisor

- **WHEN** un emisor da a su credencial una palabra de nivel
- **THEN** la página la muestra con las palabras del emisor y como dato del emisor, no como
  clasificación del sitio

### Requirement: Cada entrada con fuente primaria y fecha

Cada credencial del mapa SHALL tener en los datos la URL de la página de su emisor de la que salen
sus hechos y la fecha en la que se comprobaron. Un hecho que no se haya leído en una fuente del
emisor MUST NOT publicarse: el campo queda vacío y la entrada declara qué no se pudo comprobar. Una
credencial sin ningún hecho comprobado en una fuente de su emisor MUST NOT publicarse.

#### Scenario: Entrada sin fuente o sin fecha

- **WHEN** una entrada de los datos no tiene URL de fuente, no tiene fecha de comprobación o usa un
  valor que no está en las listas cerradas de tema, requisito, tipo o estado
- **THEN** la construcción del sitio falla e identifica la entrada

#### Scenario: Dato sin comprobar

- **WHEN** un dato de una credencial no pudo leerse en la página del emisor
- **THEN** su fila dice qué dato no está comprobado y la credencial lleva una marca visible en el
  mapa

### Requirement: Tabla de hechos por credencial

La página SHALL tener, para cada credencial del mapa y del bloque de proveedores, una fila con un
ancla estable que muestre: emisor, nombre oficial, tipo, estado, requisito previo, precio cuando el
emisor lo publica, enlace a la fuente primaria y fecha de comprobación.

#### Scenario: Precio no publicado

- **WHEN** el emisor no publica el precio en su página
- **THEN** la fila dice que el emisor no lo publica y no muestra una cifra

### Requirement: Certificaciones técnicas de proveedores

La página SHALL mostrar las certificaciones técnicas de IA de proveedores en un bloque aparte del
mapa, agrupadas por proveedor, cada una con el nivel en las palabras de su proveedor. El bloque MUST
NOT alinear proveedores en una escala común de niveles. Una certificación retirada SHALL mostrarse
marcada con su fecha de retirada. Cuando la guía de examen tiene un dominio propio de gobierno, IA
responsable o seguridad, el bloque SHALL indicarlo y la fila de hechos SHALL nombrar el dominio.

#### Scenario: Certificación retirada

- **WHEN** un proveedor ha retirado una certificación
- **THEN** aparece marcada como retirada con la fecha que da el proveedor

#### Scenario: Niveles de dos proveedores

- **WHEN** dos proveedores usan palabras de nivel distintas
- **THEN** cada una se muestra tal cual, sin equivalencia entre ellas

### Requirement: Mapa abierto a correcciones y con fecha visible

La página SHALL mostrar la fecha de comprobación del mapa y SHALL enlazar la vía para proponer una
corrección y el fichero de datos del mapa. Una entrada cuya fecha de comprobación tenga más de doce
meses SHALL mostrarse marcada como no revisada desde esa fecha.

#### Scenario: Lector que detecta un error

- **WHEN** un lector ve un dato equivocado o echa en falta una credencial
- **THEN** encuentra junto al mapa un enlace para abrir una issue y otro al fichero de datos

#### Scenario: Entrada antigua

- **WHEN** se construye el sitio y una entrada lleva más de doce meses sin comprobarse
- **THEN** su fila y su caja en el mapa la marcan como no revisada desde su fecha

## MODIFIED Requirements

### Requirement: Resumen neutral y verificado de certificaciones
La página `/for/certifications` SHALL describir AIGP, ISO/IEC 42001 Lead Implementer, ISO/IEC 42001
Lead Auditor, ISACA AAISM e ISACA AAIA solo con hechos leídos en las fuentes del propietario de
cada esquema, de ISO o de EUR-Lex, cada uno con una fuente numerada en el formato de la casa. Las
entradas del mapa de credenciales y del bloque de proveedores SHALL citar su fuente primaria y su
fecha en su propia fila de hechos, y no necesitan fuente numerada ni fila en `sources/SOURCES.md`.
La página MUST NOT ordenar ni recomendar esquemas, MUST NOT citar guías de estudio comerciales,
revendedores de formación ni comparativas, y MUST decir que el sitio no está afiliado ni respaldado
por ningún propietario de esquema ni emisor que nombra.

#### Scenario: Hecho sin fuente
- **WHEN** se añade un dato sobre un examen (formato, puntuación, requisitos) en las secciones por
  esquema
- **THEN** lleva su número de fuente y la fila correspondiente en `sources/SOURCES.md`

#### Scenario: Dos tipos de certificado
- **WHEN** el lector compara ISO/IEC 42001 Lead Auditor con la certificación 42001 de una
  organización
- **THEN** la página explica que el primero es un certificado de una persona emitido por un
  organismo, que ISO no emite certificados y que la certificación de un AIMS la hacen organismos
  que trabajan con ISO/IEC 42006
