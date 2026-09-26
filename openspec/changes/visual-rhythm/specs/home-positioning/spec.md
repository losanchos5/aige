## MODIFIED Requirements

### Requirement: Banda "Where AI Governance Engineering operates"
La portada SHALL incluir, tras la banda del stack y antes de Values, una sección con id
`where-it-operates` y título "Where AI Governance Engineering operates.". La sección SHALL tener
`tone="deep"` (el navy L1 con los tokens oscuros), `mesh="c"` y `meshK` 0.7.

La sección contiene:

- una lede que nombra las tres superficies: el gate de evaluación, el control en runtime y el
  registro de assurance;
- tres tarjetas, Evals (capa 3), Runtime (capa 4) y Assurance (capa 5). Cada una lleva su párrafo y
  enlaces a su perfil o patrón y a su capa en `/bok/the-stack`;
- un pie con enlaces a `/controls` y `/frontier`.

Las tarjetas MUST NOT llevar `.lift`, porque la tarjeta no es un enlace.

La banda MUST respetar las reglas de bandas de `site/tests/loop.spec.ts`:

- ninguna banda con `tone="plain"`;
- variantes de mesh distintas entre vecinas;
- solo la banda del rol con deriva.

Las secciones `.hero--field` y `.loop-sec` MUST seguir adyacentes.

#### Scenario: Tono y variante de la banda
- **WHEN** se ejecuta `site/tests/loop.spec.ts`
- **THEN** la banda "Where AI Governance Engineering operates" tiene tono `deep`, variante `c` y
  opacidad 0.385 (`meshK` 0.7 por el `--mesh-alpha` 0.55 de los tokens oscuros)
- **THEN** ninguna vecina usa la variante `c`

#### Scenario: Tres superficies
- **WHEN** se ejecuta `site/tests/home.spec.ts`
- **THEN** la banda tiene tres `.card`
- **THEN** la banda enlaza `/controls/evaluation-environment`
