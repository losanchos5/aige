# Spec Delta

## Purpose

La página `/contribute` y los formularios de issue convierten "contribuir" en vías concretas y
revisables: revisar un control, proponer un modo de fallo, compartir una implementación, proponer un
mapeo, corregir un dato o revisar una nota, con crédito por nombre y sin lenguaje de comunidad.

## ADDED Requirements

### Requirement: Página de contribución
El sitio SHALL publicar `/contribute` (layout Marketing) con H1 "Help improve the engineering model",
una lede que explica que el modelo (requisitos, patrones, mapeos y formatos de evidencia) solo mejora
cuando alguien lo prueba contra un sistema real, y las secciones `paths`, `good-review` y
`provenance`. La página MUST NOT usar lenguaje de comunidad ni prometer adopción.

#### Scenario: Secciones presentes
- **WHEN** se abre `/contribute`
- **THEN** existen las secciones `paths`, `good-review` y `provenance`, en ese orden

### Requirement: Diez vías hacia destinos reales
La sección `paths` SHALL listar diez vías: `control-review.yml`, `failure-mode-proposal.yml`,
`implementation-example.yml`, `framework-mapping.yml`, `technical-correction.yml`,
`research-review.yml`, `propose-a-case.yml`, `propose-an-obligation.yml`, `suggest-a-source.yml` y un
pull request según `CONTRIBUTING.md`. Cada enlace MUST apuntar a un formulario que existe en
`.github/ISSUE_TEMPLATE/`, a `CONTRIBUTING.md` o a las Discussions del repositorio.

#### Scenario: Formularios existentes
- **WHEN** se ejecuta `site/tests/contribute.spec.ts`
- **THEN** hay diez filas y cada href resuelve a un fichero de `.github/ISSUE_TEMPLATE/`, a
  `CONTRIBUTING.md` o a `/discussions`

### Requirement: Qué contiene una buena revisión y procedencia
La sección `good-review` SHALL decir qué contiene una buena revisión de un control: id y versión,
entorno descrito por categoría, si es comprobable tal como está escrito, la evidencia que se pudo o no
producir, la fuente de la objeción y qué cambiar. La sección `provenance` SHALL mostrar la licencia
CC BY 4.0, el DOI de versión y el de concepto, `CITATION.cff`, `/about/changelog` y el crédito en
`bok/CONTRIBUTORS.md`.

#### Scenario: Procedencia
- **WHEN** se abre `/contribute#provenance`
- **THEN** la sección enlaza la licencia, ambos DOI, `CITATION.cff` y `/about/changelog`

### Requirement: Seis formularios de issue nuevos
El repositorio SHALL añadir `control-review.yml`, `failure-mode-proposal.yml`,
`implementation-example.yml`, `framework-mapping.yml`, `technical-correction.yml` y
`research-review.yml` en `.github/ISSUE_TEMPLATE/`, con el estilo de los formularios existentes
(`name`, `description`, `title` con etiqueta entre corchetes, `labels`, intro `markdown`, campos
`input`/`textarea`/`dropdown` con al menos uno `required: true` y `checkboxes` final). Los formularios
MUST pedir herramientas y entornos por categoría, nunca por proveedor, MUST pedir que no se incluya
nada confidencial ni secretos, y MUST NOT contener una raya (U+2014). `config.yml` no cambia.

#### Scenario: Formularios válidos
- **WHEN** se ejecuta `site/tests/contribute.spec.ts`
- **THEN** cada formulario nuevo parsea como YAML con `name:` y `body:`, tipos de campo válidos y al
  menos un campo requerido

### Requirement: Metadatos de la página de contribución
`/contribute` MUST tener `<title>` "Contribute to open AI controls" (con sufijo si cabe), una
descripción de 70 a 160 caracteres, un único ld+json `CollectionPage`, imagen OG, entrada en
`SOURCE_BY_PATH` y en `llms.txt` (sección About), sin script inline ni raya (U+2014).

#### Scenario: Título de contribución
- **WHEN** se ejecuta `site/tests/seo-titles.spec.ts`
- **THEN** el título de `/contribute` empieza por "Contribute to open AI controls" y es único
