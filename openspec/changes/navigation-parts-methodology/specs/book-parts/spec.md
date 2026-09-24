# Spec Delta

## Purpose

La portada y el índice `/bok` presentan el Body of Knowledge como un libro en partes: cada parte con
su título, su rango de capítulos, una línea de introducción y sus capítulos, con todos los números
calculados desde `chapters.ts`.

## ADDED Requirements

### Requirement: Partes con introducción y rango calculado
El sitio SHALL exponer, desde un módulo de datos, cada parte de `chapterParts` con su título, una
introducción de una frase, sus capítulos en orden de lectura y su rango de números calculado (por
ejemplo `14–17, 23` cuando los números no son consecutivos). Las páginas MUST NOT escribir a mano
el número de capítulos ni de partes.

#### Scenario: Rango no consecutivo
- **WHEN** una parte contiene los capítulos 14, 15, 16, 17 y 23
- **THEN** su rango se muestra como `14–17, 23`

### Requirement: Capítulos por partes en la portada
La sección de capítulos de la portada SHALL mostrar las cinco partes, cada una con su título, su
rango, su introducción y un enlace por capítulo (número y título corto). El título de la sección
SHALL calcular el número de capítulos desde los datos. La sección SHALL destacar las partes
Foundations, The lifecycle y Law and standards en su entradilla, y MUST NOT alterar el hero, el
bucle, el verdict beat ni la banda final.

#### Scenario: Todos los capítulos enlazados
- **WHEN** se carga `/`
- **THEN** la sección de capítulos contiene una tarjeta por parte y un enlace por cada capítulo de
  `chapters.ts`

### Requirement: Índice del Body of Knowledge por partes
El índice `/bok` SHALL agrupar las tarjetas de capítulo por parte, con un encabezado por parte
(ancla `part-<id>`), su rango y su introducción, y una lista de saltos a cada parte bajo la
cabecera. Las rutas de lectura SHALL seguir siendo tres, una por lector, e incluir capítulos de las
partes Foundations, The lifecycle y Law and standards.

#### Scenario: Salto a una parte
- **WHEN** el usuario pulsa "Law and standards" en la lista de saltos
- **THEN** llega a `#part-law`, cuyo encabezado precede a las tarjetas de los capítulos 18 a 22

#### Scenario: Rutas de lectura con capítulos nuevos
- **WHEN** se carga `/bok`
- **THEN** la figura de rutas de lectura enlaza al menos un capítulo de cada una de las partes
  Foundations, The lifecycle y Law and standards

### Requirement: Recursos en la portada y en el hub
Las tarjetas de recursos de la portada SHALL incluir el Topic Crosswalk y el mapa, y el hub
`/resources` SHALL incluir tarjetas para contratos, atlas de daños, casos y plantillas con conteos
calculados desde sus datos.

#### Scenario: Hub completo
- **WHEN** se carga `/resources`
- **THEN** hay una tarjeta con conteo no vacío para cada una de las diez referencias
