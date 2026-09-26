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
La portada SHALL incluir, tras la banda del loop y antes de Values, una sección con id
`where-it-operates` y título "Where AI Governance Engineering operates.", con `tone="mesh"`,
`mesh="c"` y `meshK` 0.4, una lede que nombra las tres superficies (el gate de evaluación, el control
en runtime y el registro de assurance) y tres tarjetas Evals (capa 3), Runtime (capa 4) y Assurance
(capa 5), cada una con su párrafo y enlaces a su perfil o patrón y a su capa en `/bok/the-stack`, más
un pie hacia `/controls` y `/frontier`. Las tarjetas MUST NOT llevar `.lift` (la tarjeta no es un
enlace). La banda MUST respetar las reglas de bandas de `site/tests/loop.spec.ts`: ninguna banda con
`tone="plain"`, variantes de mesh distintas entre vecinas y solo la banda del rol con deriva. Las
secciones `.hero--field` y `.loop-sec` MUST seguir adyacentes.

#### Scenario: Tono y variante de la banda
- **WHEN** se ejecuta `site/tests/loop.spec.ts`
- **THEN** la banda "Where AI Governance Engineering operates" tiene tono `mesh`, variante `c` y
  opacidad 0.4, y ninguna vecina usa la variante `c`

#### Scenario: Tres superficies
- **WHEN** se ejecuta `site/tests/home.spec.ts`
- **THEN** la banda tiene tres `.card` y enlaza `/controls/evaluation-environment`

### Requirement: Trabajo abierto en la portada
La banda "Follow the changes" (`.nl-sec`) SHALL mostrar junto al formulario de suscripción una lista
`OpenWork` generada desde `site/src/data/work.ts`, con enlace, estado, nota y fecha por elemento, y
su pie SHALL enlazar `/contribute`. Los estados MUST ser verdaderos (`draft`, `in-review`,
`in-progress`, `planned`) y MUST NOT anunciar como hecho nada que no esté publicado.

#### Scenario: Lista completa
- **WHEN** se ejecuta `site/tests/home.spec.ts`
- **THEN** `.nl-sec .work-list > li` tiene tantos elementos como `work`

### Requirement: Tiles de la portada y pie del loop
Los tiles de la portada SHALL incluir "Open controls" (hacia `/controls`, en segunda posición) y
"Research notes" (hacia `/research`, antes de Reading list), y el pie de la banda del loop SHALL
enlazar `/controls`. `site/DESIGN.md` SHALL documentar la lede, los CTAs, los enlaces, el botón
secundario y la secuencia de bandas con la nueva banda `c` 0.4.

#### Scenario: Tiles nuevos
- **WHEN** se abre `/`
- **THEN** el segundo tile enlaza `/controls` y un tile anterior a Reading list enlaza `/research`
