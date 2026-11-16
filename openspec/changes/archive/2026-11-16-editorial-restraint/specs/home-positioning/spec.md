# Spec Delta

## MODIFIED Requirements

### Requirement: Banda "Where AI Governance Engineering operates"
La portada SHALL incluir, dentro de la sección del stack y tras las filas de las cinco capas, un bloque con id `where-it-operates` y título "Where AI Governance Engineering operates.", con una lede que nombra las tres superficies (el gate de evaluación, el control en runtime y el registro de assurance) y tres filas Evals (capa 3), Runtime (capa 4) y Assurance (capa 5), cada una con su párrafo y enlaces a su perfil o patrón y a su capa en `/bok/the-stack`, más un pie hacia `/controls` y `/frontier`. El bloque SHALL ir sobre papel, con el título y la lede en la columna izquierda y las filas a la derecha. La sección de la hero y la sección del bucle MUST seguir adyacentes.

#### Scenario: Tres superficies
- **WHEN** se ejecuta `site/tests/home.spec.ts`
- **THEN** el bloque `#where-it-operates` tiene tres filas y enlaza `/controls/evaluation-environment`

#### Scenario: Tono y variante de la banda
- **WHEN** se carga `/`
- **THEN** el bloque `#where-it-operates` no contiene capa de mesh ni fondo de color

### Requirement: Tiles de la portada y pie del loop
La sección de recursos de la portada SHALL mostrar cuatro tarjetas con cuadro y el resto de recursos como filas, y entre todos SHALL incluir "Open controls" (hacia `/controls`) y "Research notes" (hacia `/research`). El pie de la figura del bucle SHALL enlazar `/controls`. `site/DESIGN.md` SHALL documentar la lede, los CTAs, los enlaces, el botón secundario y la secuencia de secciones de la portada.

#### Scenario: Tiles nuevos
- **WHEN** se abre `/`
- **THEN** la sección de recursos enlaza `/controls` y `/research`, y contiene cuatro tarjetas con imagen

#### Scenario: Pie del bucle
- **WHEN** se abre `/`
- **THEN** la sección del bucle contiene un enlace a `/controls`
