# Spec Delta

## Purpose

El capítulo 16 del Body of Knowledge convierte la equidad y la explicabilidad en controles
medibles: cada técnica queda ligada a la capa del stack que produce su evidencia, a una condición de
gate y a la obligación legal a la que responde, con fuentes numeradas y verificadas.

## ADDED Requirements

### Requirement: Estructura del capítulo 16
El fichero `bok/16-fairness-explainability.md` SHALL conservar el H1 «# 16. Fairness and
explainability for practitioners», seguido de un blockquote de una o dos líneas que sea una frase
completa, y SHALL terminar con las secciones `## What you can do this week` (entre tres y cinco
acciones concretas) y `## Sources`, en ese orden. El capítulo MUST contener al menos una caja
`**In practice**` y una línea `**Maps to:**` con la frase «Mappings are illustrative, not a claim of
conformity».

#### Scenario: Lector abre el capítulo
- **WHEN** un lector abre `/bok/fairness-and-explainability`
- **THEN** ve la entradilla, las secciones de equidad, las de explicabilidad, la sección de capas del
  stack, la caja «In practice», la línea «Maps to», las acciones de la semana y las fuentes

#### Scenario: Sin rayas largas
- **WHEN** se ejecuta el lint de contenido sobre el sitio construido
- **THEN** el capítulo no contiene ningún carácter U+2014

### Requirement: Cobertura de equidad
El capítulo SHALL cubrir las fuentes de sesgo por fase del ciclo de vida, las características
protegidas y los proxies, el art. 4a del AI Act con sus condiciones traducidas a controles, el trato
dispar frente al impacto dispar, la regla de los cuatro quintos con sus salvedades, las métricas de
grupo (paridad demográfica, igualdad de oportunidades, odds igualadas, paridad predictiva, calibración
por grupo), la equidad individual y contrafáctica, los resultados de imposibilidad citando los
artículos originales de Kleinberg et al. (2016) y Chouldechova (2017), las pruebas interseccionales,
la elección de métrica por caso de uso, la mitigación pre, in y post-procesado y la monitorización en
producción.

#### Scenario: Resultado de imposibilidad demostrable
- **WHEN** un lector llega a la sección de resultados de imposibilidad
- **THEN** encuentra un ejemplo ilustrativo con aritmética visible en el que las odds igualadas se
  cumplen y la paridad predictiva falla porque las tasas base difieren

#### Scenario: Estado legal fechado
- **WHEN** el capítulo describe la aplicación federal de EE. UU. del impacto dispar o el estado de las
  enmiendas al RGPD
- **THEN** la afirmación lleva la marca «as of 2026-09-24» y una cita numerada

### Requirement: Cobertura de explicabilidad
El capítulo SHALL distinguir transparencia, interpretabilidad y explicabilidad; modelos
interpretables por diseño frente a explicaciones post-hoc, con criterios de cuándo se exige un
modelo interpretable; explicaciones globales frente a locales; atribución de características (SHAP,
LIME, gradientes integrados), modelos sustitutos, explicaciones contrafácticas, explicaciones basadas
en ejemplos, interpretabilidad mecanicista (con reservas) y explicaciones para RAG; los ganchos
legales (ECOA/Reg B, FCRA, RGPD arts. 13-15 y 22, régimen del Reino Unido, AI Act arts. 13 y 86);
las pruebas de calidad de la explicación con la audiencia afectada; la accesibilidad; y el registro
de explicación como evidencia.

#### Scenario: Registro de explicación reutilizable
- **WHEN** un lector llega a la sección de artefactos de explicación
- **THEN** encuentra un registro JSON ilustrativo con versión del modelo, método, línea base y códigos
  de razón, y una explicación de por qué el mismo registro sirve a un aviso de Regulation B, a una
  solicitud del art. 15(1)(h) del RGPD y a una del art. 86 del AI Act

### Requirement: Evidencia por capa y enlaces internos válidos
El capítulo SHALL incluir una tabla que asigne a cada una de las cinco capas del stack (01 a 05) un
artefacto de equidad, un artefacto de explicabilidad y un patrón existente del capítulo 05, y una
lista de condiciones de gate ilustrativas. Todo enlace interno MUST apuntar a una ruta existente y,
cuando lleve ancla, a un ancla existente en los capítulos 01, 04, 05 u 08 o en el propio capítulo.

#### Scenario: Comprobación de enlaces
- **WHEN** se ejecuta `bash D:/Documents/aige-wt/build.sh`
- **THEN** astro check, astro build, content-lint, check-links y pagefind terminan con código 0

### Requirement: Fuentes verificadas
Cada afirmación factual, legal o numérica del capítulo SHALL llevar un marcador `[n]` que exista en
`## Sources` con el formato `[n] Título (glosa). Editor. Fecha. URL (verified: primary|secondary|reported)`.
Lo que no se haya podido confirmar MUST ir matizado en la prosa y marcado «(verify)». Las normas
ISO/IEC se citan solo por identificador y título corto.

#### Scenario: Afirmación no confirmada
- **WHEN** el capítulo menciona la fecha práctica de aplicación del art. 86 o la norma ISO/IEC TS 6254
- **THEN** la frase contiene «(verify)» y no se presenta como hecho
