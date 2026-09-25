# Spec Delta

## Purpose

El capítulo 18 enseña el AI Act de la UE, enmendado por el Digital Omnibus, de principio a fin, y
liga cada deber al artefacto que lo evidencia, a la capa del stack que lo produce y a una fuente
primaria verificada, sin duplicar el índice inverso del capítulo 08.

## ADDED Requirements

### Requirement: Capítulo 18 completo y con la plantilla de la casa
El fichero `bok/18-eu-ai-act.md` SHALL conservar el H1 `# 18. The EU AI Act in one pass`, abrir con un
blockquote de una frase como lede y seguir la plantilla de `STYLEGUIDE.md`: secciones H2/H3 estables,
al menos un callout «In practice» y uno «Example (illustrative)» con la sintaxis de
`site/src/lib/remark-callouts.ts`, una línea «**Maps to:**» con la frase «Mappings are illustrative,
not a claim of conformity», una sección «## What you can do this week» con entre tres y cinco
acciones, y «## Sources» como última sección. El texto MUST NOT contener el carácter raya (U+2014).

#### Scenario: El capítulo se construye limpio
- **WHEN** se ejecuta `bash D:/Documents/aige-wt/build.sh`
- **THEN** `astro check`, `astro build`, el lint de contenido, `check-links` y pagefind terminan con
  código 0, y todo enlace interno del capítulo apunta a una ruta y un ancla existentes

#### Scenario: El lector encuentra la sección de acciones antes de las fuentes
- **WHEN** un lector llega al final del capítulo
- **THEN** ve «What you can do this week» con acciones concretas y, a continuación, «Sources»

### Requirement: Cobertura del AI Act tras el Omnibus
El capítulo SHALL cubrir, verificado contra el texto del Reglamento (UE) 2024/1689 y del Reglamento
(UE) 2026/1744 en EUR-Lex: el alcance y el alcance extraterritorial del art. 2; la definición del
art. 3(1) y las guías de la Comisión; las exclusiones; la lista completa del art. 5 con las
prohibiciones añadidas por el Omnibus y su fecha de aplicación; las vías del art. 6(1) y del anexo
III con sus ocho áreas; el filtro del art. 6(3) y la excepción de perfilado; los casos del art. 50;
los modelos GPAI (arts. 51 a 56); los requisitos de los arts. 8 a 15; el QMS del art. 17; la
vigilancia poscomercialización del art. 72; los roles de operador y el art. 25; los deberes del
art. 26; la FRIA del art. 27; el art. 86; los arts. 4 y 4a; los arts. 57 a 61; la gobernanza, los
arts. 75a a 75d y las sanciones de los arts. 99 y 101; y el calendario posterior al Omnibus.

#### Scenario: El calendario coincide con el texto enmendado
- **WHEN** un lector consulta la tabla del calendario
- **THEN** encuentra 2025-02-02, 2025-08-02, 2026-07-27, 2026-08-02, 2026-12-02, 2027-08-02,
  2027-12-02, 2028-08-02 y 2030-08-02, cada fecha con el artículo que la fija y una cita `[n]` a la
  fuente primaria

#### Scenario: Los requisitos de alto riesgo se leen como artefactos
- **WHEN** un lector abre la sección de requisitos de alto riesgo
- **THEN** ve una tabla con una fila por artículo del 9 al 15 que nombra el requisito, el artefacto
  de ingeniería y la capa 1 a 5

### Requirement: Fuentes numeradas y verificadas
Toda afirmación factual, legal o numérica del capítulo SHALL llevar un marcador `[n]` que exista en
`## Sources` con el formato `[n] Title (gloss). Publisher. Date. URL (verified: primary|secondary|reported)`.
Las fuentes legales MUST citarse por su URL ELI de EUR-Lex. Toda afirmación no confirmada MUST ir
matizada en la prosa y marcada «(verify)».

#### Scenario: Cita huérfana
- **WHEN** se busca en el capítulo cada marcador `[n]`
- **THEN** cada n tiene una entrada en `## Sources` y ninguna entrada queda sin citar

#### Scenario: Afirmación sin confirmar
- **WHEN** el capítulo menciona la lista de roles de ISO/IEC 22989 o la lectura temporal del art. 86
- **THEN** la frase lleva «(verify)» y el traspaso la lista en `verify_items`

### Requirement: El capítulo 08 sigue siendo el índice inverso
El capítulo 18 SHALL enlazar a las anclas del capítulo 08 (`#eu-ai-act-post-omnibus`,
`#gpai-code-of-practice`, `#what-is-not-harmonised-yet`, `#us-federal-and-state-laws`) en lugar de
repetir sus filas de obligaciones, y MUST NOT modificar `bok/08-regulatory-map.md`; el texto que el
capítulo 08 deba ganar va en el traspaso.

#### Scenario: El lector salta del capítulo docente al índice
- **WHEN** un lector pulsa un enlace al capítulo 08 desde el capítulo 18
- **THEN** llega a la sección correspondiente del índice inverso sin error de ancla
