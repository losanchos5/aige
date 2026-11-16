# home-positioning Specification

## Purpose
La portada dice en su primer viewport qué es el proyecto (una arquitectura de referencia abierta que
convierte afirmaciones de seguridad, riesgo y política en gates de evaluación, controles en runtime y
evidencia verificable por máquina) y lleva al Stack, a los controles abiertos y al trabajo en curso,
sin tocar el arte ni el layout de la hero.

## Requirements

### Requirement: Lede y llamadas a la acción de la hero
La hero SHALL conservar su H1, su arte, sus velos, su layout y la tira `HeroStrip`, y SHALL añadir
bajo el H1 el párrafo "An open reference architecture for turning AI safety, risk and policy claims
into eval gates, runtime controls and machine-verifiable evidence.", un botón primario "Explore the
Stack" hacia `/stack`, un botón secundario "Open controls" hacia `/controls` y dos enlaces, "Read the
Thesis" hacia `/thesis` y "Frontier labs & evaluators" hacia `/frontier`. El nombre accesible del
enlace a la Tesis MUST seguir siendo exactamente "Read the Thesis" (las flechas son `aria-hidden`).
El texto nuevo MUST cumplir el gate de contraste de `site/tests/hero-art.spec.ts` (media ≥ 4.5, peor
caso ≥ 4.3) y la tira MUST seguir visible a 390×844; si no cabe, se reduce gap o padding, nunca el
arte. La animación del primer viewport MUST ser solo de transform.

#### Scenario: CTAs de la hero
- **WHEN** se ejecutan `site/tests/hero-field.spec.ts` y `site/tests/home.spec.ts`
- **THEN** `.hero-ctas a` son dos (`/stack`, `/controls`) y `.hero-links a` son dos (`/thesis`,
  `/frontier`)

#### Scenario: Contraste y tira en móvil
- **WHEN** se ejecuta `site/tests/hero-art.spec.ts` a 390×844
- **THEN** la lede y los enlaces nuevos pasan el umbral de contraste y `HeroStrip` es visible

### Requirement: Banda "Where AI Governance Engineering operates"
La portada SHALL incluir, dentro de la sección del stack y tras las filas de las cinco capas, un bloque con id `where-it-operates` y título "Where AI Governance Engineering operates.", con una lede que nombra las tres superficies (el gate de evaluación, el control en runtime y el registro de assurance) y tres filas Evals (capa 3), Runtime (capa 4) y Assurance (capa 5), cada una con su párrafo y enlaces a su perfil o patrón y a su capa en `/bok/the-stack`, más un pie hacia `/controls` y `/frontier`. El bloque SHALL ir sobre papel, con el título y la lede en la columna izquierda y las filas a la derecha. La sección de la hero y la sección del bucle MUST seguir adyacentes.

#### Scenario: Tres superficies
- **WHEN** se ejecuta `site/tests/home.spec.ts`
- **THEN** el bloque `#where-it-operates` tiene tres filas y enlaza `/controls/evaluation-environment`

#### Scenario: Tono y variante de la banda
- **WHEN** se carga `/`
- **THEN** el bloque `#where-it-operates` no contiene capa de mesh ni fondo de color

### Requirement: Trabajo abierto en la portada
La banda "Follow the changes" (`.nl-sec`) SHALL mostrar junto al formulario de suscripción una lista
`OpenWork` generada desde `site/src/data/work.ts`, con enlace, estado, nota y fecha por elemento, y
su pie SHALL enlazar `/contribute`. Los estados MUST ser verdaderos (`draft`, `in-review`,
`in-progress`, `planned`) y MUST NOT anunciar como hecho nada que no esté publicado.

#### Scenario: Lista completa
- **WHEN** se ejecuta `site/tests/home.spec.ts`
- **THEN** `.nl-sec .work-list > li` tiene tantos elementos como `work`

### Requirement: Tiles de la portada y pie del loop
La sección de recursos de la portada SHALL mostrar cuatro tarjetas con cuadro y el resto de recursos como filas, y entre todos SHALL incluir "Open controls" (hacia `/controls`) y "Research notes" (hacia `/research`). El pie de la figura del bucle SHALL enlazar `/controls`. `site/DESIGN.md` SHALL documentar la lede, los CTAs, los enlaces, el botón secundario y la secuencia de secciones de la portada.

#### Scenario: Tiles nuevos
- **WHEN** se abre `/`
- **THEN** la sección de recursos enlaza `/controls` y `/research`, y contiene cuatro tarjetas con imagen

#### Scenario: Pie del bucle
- **WHEN** se abre `/`
- **THEN** la sección del bucle contiene un enlace a `/controls`

### Requirement: Tile del buscador por artículo
Los tiles de la portada SHALL incluir "Look up an article", con la pregunta "What does Article X
require, and what else covers it?", hacia `/obligations#lookup`, sin desplazar "Open controls" de
la segunda posición.

#### Scenario: Tile presente
- **WHEN** se abre `/`
- **THEN** un tile enlaza `/obligations#lookup` y el segundo tile sigue enlazando `/controls`

### Requirement: Tile del crosswalk de frontera
Los tiles de la portada SHALL incluir uno hacia `/resources/frontier-safety-crosswalk`, colocado justo
después del tile del Crosswalk, sin desplazar "Open controls" de la segunda posición. Para mantener el
bento en doce tiles, la portada MUST NOT incluir ya los tiles de `/bok/glossary` y `/bok/reading-list`
(siguen enlazados desde la navegación y el pie), y "Research notes" SHALL ser el último tile.

#### Scenario: Tile presente
- **WHEN** se abre `/`
- **THEN** un tile enlaza `/resources/frontier-safety-crosswalk`, el segundo tile sigue enlazando
  `/controls` y el último enlaza `/research`

### Requirement: Tile de plazos del AI Act
Los tiles de la portada SHALL incluir uno hacia `/resources/ai-act-deadlines`, colocado tras el de
"Obligation register", sin desplazar "Open controls" de la segunda posición.

#### Scenario: Tile presente
- **WHEN** se abre `/`
- **THEN** un tile enlaza `/resources/ai-act-deadlines` y el segundo tile sigue enlazando `/controls`
