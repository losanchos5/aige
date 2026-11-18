# competency-matrix Specification

## Purpose
Una matriz abierta de competencias del AI governance engineer que dice, para cada flujo de trabajo
del puesto y cada peldaño de la escalera profesional del capítulo 06, qué puede asumir una persona
y qué artefacto observable lo demuestra, enlazada a los recursos del sitio que lo enseñan.

## Requirements

### Requirement: Peldaños tomados del capítulo 06

Los niveles de la matriz SHALL ser los cinco peldaños de la sección "The career ladder" del capítulo
06, con los mismos nombres y en el mismo orden. La matriz MUST NOT añadir, quitar ni renombrar
peldaños por su cuenta.

#### Scenario: El capítulo y los datos divergen

- **WHEN** el nombre o el orden de un peldaño en los datos de la matriz deja de coincidir con la
  lista numerada del capítulo 06
- **THEN** la prueba de datos falla e identifica el peldaño

### Requirement: Áreas tomadas de los flujos de trabajo de /role

Las áreas de la matriz SHALL ser los siete flujos de trabajo que publica `/role`, con sus mismos
identificadores y nombres, y cada área SHALL mostrar las habilidades centrales y de apoyo que
`/role` ya le asigna.

#### Scenario: Flujo desconocido

- **WHEN** una celda nombra un flujo de trabajo que `/role` no tiene
- **THEN** la construcción del sitio falla e identifica la celda

### Requirement: Celdas por flujo y peldaño

Para cada flujo de trabajo y cada uno de los cuatro primeros peldaños, la matriz SHALL tener una
celda con: qué puede asumir la persona de extremo a extremo (40 palabras como máximo), la evidencia
que lo demuestra (30 palabras como máximo) y entre uno y cuatro enlaces a recursos del sitio donde
se trabaja. La evidencia SHALL ser un artefacto observable en los sistemas (un registro, una puerta,
una ejecución de evaluación, un paquete de evidencia) y MUST NOT ser un título, un certificado, unos
años de experiencia ni una autoevaluación. El quinto peldaño SHALL describirse a nivel de función,
con entre tres y seis enunciados, cada uno con su evidencia.

#### Scenario: Matriz completa

- **WHEN** se construye el sitio
- **THEN** existen las 28 celdas (siete flujos por cuatro peldaños) y la banda de función, o la
  construcción falla diciendo qué celda falta

#### Scenario: Enlace que no resuelve

- **WHEN** una celda enlaza un patrón, una herramienta, un control, una plantilla, un capítulo o un
  nodo de `/path` que no existe
- **THEN** la construcción del sitio falla e identifica la celda y el enlace

#### Scenario: Celda fuera de límites

- **WHEN** una celda supera el límite de palabras o no tiene evidencia o enlaces
- **THEN** la construcción del sitio falla e identifica la celda

### Requirement: Coherencia con la escalera del capítulo 06

El contenido de las celdas MUST NOT contradecir la escalera del capítulo 06: en el primer peldaño la
persona ejecuta controles existentes; en el segundo construye un control de extremo a extremo; en el
tercero es dueña del flujo en toda la organización y del camino pavimentado que otros adoptan; en el
cuarto decide la arquitectura y las decisiones transversales de las que depende el flujo.

#### Scenario: Revisión de contenido

- **WHEN** un revisor distinto del autor lee cada celda junto a la sección de la escalera
- **THEN** ninguna celda atribuye a un peldaño un alcance que el capítulo reserva a otro, y el
  informe de revisión no deja discrepancias abiertas

### Requirement: Modelo declarado, sin puntuación

La página SHALL decir que la matriz es un modelo del autor derivado del Body of Knowledge, que no es
un estándar del sector y que no está validada con una encuesta. La página MUST NOT calcular un
nivel, pedir datos al lector ni guardar estado. La página MUST NOT presentar una certificación como
evidencia de una competencia.

#### Scenario: Lector que busca su nivel

- **WHEN** alguien usa la página para situarse
- **THEN** encuentra por peldaño qué artefacto debería poder enseñar, y ningún formulario, contador
  ni resultado

### Requirement: Página de la matriz

`/role/competencies` SHALL mostrar: un resumen citable; una tabla de flujos por peldaños (los cuatro
primeros) en la que cada celda enlaza a su detalle; el detalle por flujo, con las habilidades del
flujo y las cuatro celdas completas; la banda de función del quinto peldaño; cómo usar la matriz
para contratar y para preparar el puesto, con enlaces a `/path` y a las vías de entrada de `/role`;
el método y los límites; y la cita. Cada flujo y cada celda SHALL tener un ancla estable. Todo el
contenido SHALL leerse sin JavaScript.

#### Scenario: Enlace a una celda

- **WHEN** se abre la URL de la página con el ancla de una celda
- **THEN** esa celda queda a la vista, por debajo de la cabecera fija, con su flujo y su peldaño
  identificables

#### Scenario: Sin JavaScript

- **WHEN** se carga la página con JavaScript desactivado
- **THEN** la tabla, las 28 celdas y la banda de función están completas en el HTML

### Requirement: Descubrimiento de la matriz

La página SHALL figurar en el sitemap con `lastmod`, en la navegación, en el pie y en `llms.txt`, y
SHALL llevar tarjeta OG y datos estructurados. `/role` SHALL enlazarla desde su sección de
habilidades y `/path` SHALL enlazarla desde su introducción.

#### Scenario: Desde la página del puesto

- **WHEN** un lector está en la sección de habilidades de `/role`
- **THEN** encuentra un enlace a la matriz de competencias

### Requirement: Accesibilidad y responsive de la matriz

La página SHALL pasar axe sin infracciones y MUST NOT tener desplazamiento lateral a 390 px de
ancho. La tabla SHALL tener cabeceras de fila y de columna.

#### Scenario: Móvil

- **WHEN** se abre la página a 390 px
- **THEN** cada flujo se lee con sus cuatro peldaños sin desplazamiento lateral de la página
