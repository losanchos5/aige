# bok-ai-laws-worldwide Specification

## Purpose
El capítulo 21 del Body of Knowledge trata, jurisdicción por jurisdicción, las leyes y reglas
específicas de IA fuera de la UE, cada una fechada, con fuente y traducida a los artefactos que
evidencian el cumplimiento; un dataset tipado de jurisdicciones resume el mismo contenido para la
interfaz.

## Requirements

### Requirement: Capítulo 21 con la plantilla de la casa
El fichero `bok/21-ai-laws-worldwide.md` SHALL conservar el H1 `# 21. AI-specific laws around the
world` seguido de una entradilla en blockquote de una sola frase, y SHALL contener secciones H2 por
jurisdicción, al menos un callout `**In practice**` o `**In practice (illustrative)**`, un callout
`**Example (illustrative)**`, una línea `**Maps to:**` que incluya la frase «Mappings are
illustrative, not a claim of conformity», una sección `## What you can do this week` con entre tres
y cinco acciones y una sección final `## Sources`. El texto MUST NOT contener el carácter raya larga
(U+2014).

#### Scenario: El capítulo se construye limpio
- **WHEN** se ejecuta el build del sitio (astro check, astro build, content-lint, check-links)
- **THEN** termina con código 0, sin rayas largas y sin enlaces internos rotos desde `/bok/ai-laws-worldwide`

#### Scenario: La entradilla es el lede
- **WHEN** se renderiza `/bok/ai-laws-worldwide`
- **THEN** la cabecera muestra como resumen la frase del blockquote inicial y el cuerpo empieza por
  `## How to read this chapter`

### Requirement: Cada entrada de jurisdicción está fechada y citada
Cada sección de jurisdicción SHALL indicar estado, fechas, alcance, deberes clave, régimen
sancionador y los artefactos que evidencian el cumplimiento, con estado a 2026-09-24. Toda
afirmación factual, legal o numérica MUST llevar un marcador `[n]` que exista en `## Sources` con el
formato `[n] Título (glosa). Editor. Fecha. URL (verified: primary|secondary|reported)`. Lo que no se
pudo confirmar MUST ir matizado en el texto y marcado `(verify)`.

#### Scenario: Corea se apoya en fuentes primarias
- **WHEN** se lee la sección de Corea
- **THEN** los artículos de la ley (31 a 36, 40, 43) y del decreto (23 a 29) se citan a law.go.kr con
  tag `primary`, y el periodo de gracia se atribuye a una fuente secundaria con tag `secondary`

#### Scenario: Un proyecto no se presenta como ley
- **WHEN** el capítulo menciona el texto español o el PL 2338/2023 de Brasil
- **THEN** los llama proyecto (bill) y no los describe como adoptados

#### Scenario: Toda cita tiene fuente
- **WHEN** se comparan los marcadores `[n]` del cuerpo con la lista `## Sources`
- **THEN** no hay marcador sin fuente ni fuente sin marcador

### Requirement: Tablas de comparación, sectores y relojes de incidentes
El capítulo SHALL incluir una tabla comparativa por indicador (disparador de clasificación, deberes,
aviso y supervisión humana, modelos frontera o de propósito general, sanción, roles), una tabla de
reglas sectoriales con columnas régimen, disparador IA, deber, artefacto y capa, y una tabla de
relojes de notificación de incidentes por régimen.

#### Scenario: Reglas sectoriales mapeadas a capas
- **WHEN** un lector consulta la tabla de reglas sectoriales
- **THEN** cada fila (DORA, NIS2, CRA, Data Act, MDR/IVDR, FDA, SR 26-2, PRA SS1/23, ECOA y
  Regulation B, Directiva de trabajo en plataformas, menores y seguridad en línea) nombra un
  artefacto de ingeniería y una o más capas de la 1 a la 5

### Requirement: Dataset tipado de jurisdicciones
El sitio SHALL exponer `site/src/data/jurisdictions.ts` con el tipo `JurisdictionStatus`
(`binding-horizontal | binding-targeted | voluntary | bill`) y una lista `jurisdictions` en la que
cada entrada tenga `code`, `name`, `status`, `instruments` (cada uno con `name`, `date`, `status`,
`url`, `verified`), `summary` en redacción propia, `asOf` y `anchor` hacia la sección del capítulo.
El dataset MUST coincidir con el capítulo en estado y fechas y MUST compilar con `astro check` en modo
estricto.

#### Scenario: Consulta por código
- **WHEN** un componente llama a `jurisdictionByCode('KR')`
- **THEN** recibe la entrada de Corea con estado `binding-horizontal`, dos instrumentos en vigor
  desde 2026-01-22 con tag `primary` y el ancla `/bok/ai-laws-worldwide#south-korea-the-ai-basic-act`

#### Scenario: Leyenda del mapa de teselas
- **WHEN** un componente llama a `jurisdictionsByStatus()`
- **THEN** recibe los cuatro grupos en el orden horizontal, dirigido, voluntario y proyecto, y Brasil
  y España aparecen en `bill`
