# bok-governing-development Specification

## Purpose
El capítulo 14 del Body of Knowledge enseña a gobernar el desarrollo de un sistema de IA desde el
lado del proveedor: cada decisión de la construcción, del caso de uso a la publicación, deja un
registro que una puerta lee, y el expediente técnico se compila desde el pipeline.

## Requirements

### Requirement: Estructura del capítulo 14
El fichero `bok/14-governing-development.md` SHALL abrir con el H1 `# 14. Governing AI development`
seguido de una entradilla en blockquote de una sola frase, y SHALL contener, en este orden, las
secciones H2 "The build as a chain of gates", "The use-case record", "Design review", "Data for
training and testing", "Testing and validation", "Release readiness and conformity", "The technical
file", "Impact assessments compared", "What you can do this week" y "Sources", más una línea
**Maps to** con la frase "Mappings are illustrative, not a claim of conformity". Los nombres de las
cinco capas MUST coincidir con los del capítulo 04.

#### Scenario: El capítulo se renderiza con su entradilla
- **WHEN** un lector abre `/bok/governing-development`
- **THEN** ve el título "14. Governing AI development", la entradilla como lede y un índice con las
  secciones H2 anteriores, cada una con un ancla estable generada por su encabezado

#### Scenario: Acciones de la semana
- **WHEN** el lector llega al final del capítulo
- **THEN** encuentra una sección "What you can do this week" con entre tres y cinco acciones
  concretas antes de `## Sources`

### Requirement: Registro de caso de uso y revisión de diseño
El capítulo SHALL definir el registro de caso de uso como campos de la entrada del registro
(contexto de negocio, propósito previsto en el sentido del Art. 3(12) del AI Act, usos fuera de
alcance, usuarios y personas afectadas, autoridad de decisión, entorno, métricas de éxito, apetito
de error, vida prevista, disponibilidad de datos), SHALL tratar la prueba "¿es la IA la
herramienta?" y la deriva de función, y SHALL describir la revisión de diseño como puerta con
requisitos trazables a pruebas, un registro de decisiones de arquitectura y modelo, un registro de
uso indebido razonablemente previsible (Art. 3(13), 9(2)(b) y 13(3)(b)(iii)) y el diseño de la
supervisión humana.

#### Scenario: Ejemplo ejecutable del registro
- **WHEN** el lector busca cómo se ve un registro de caso de uso
- **THEN** encuentra un ejemplo JSON etiquetado "(illustrative)" con propósito previsto, usos fuera
  de alcance, autoridad de decisión y apetito de error

### Requirement: Datos, pruebas y validación
El capítulo SHALL describir una puerta de admisión de datasets (derecho de uso, calidad y
representatividad según el Art. 10 y la serie ISO/IEC 5259, dueño frente a administrador,
procedencia frente a linaje con W3C PROV y OpenLineage, datos sintéticos y PET), SHALL incluir una
matriz de tipos de prueba con columnas para ML clásico y para sistemas LLM o agentes, y SHALL tratar
la validez estadística de los evals (intervalos con aritmética mostrada, no determinismo, fiabilidad
del juez LLM, contaminación), la validación independiente y la reproducibilidad.

#### Scenario: La validación bancaria está al día
- **WHEN** el capítulo cita la guía estadounidense de riesgo de modelo
- **THEN** indica que SR 11-7 fue sustituida por SR 26-2 el 17 de abril de 2026 y que SR 26-2 deja
  fuera de su alcance los modelos de IA generativa y agéntica, con cita verificada

#### Scenario: Las cifras estadísticas son aritmética visible
- **WHEN** el capítulo da un intervalo de confianza o una cota con cero fallos
- **THEN** muestra la derivación (error estándar o regla de tres) para que el lector vea que es
  aritmética y no una cifra de encuesta

### Requirement: Publicación, conformidad y expediente técnico
El capítulo SHALL explicar la puerta go/no-go con revisores nombrados y despliegue escalonado, la
secuencia de conformidad del AI Act (QMS, documentación técnica, evaluación por Anexo VI o VII,
declaración UE, marcado CE, registro) con las fechas post-Omnibus, la modificación sustancial, y el
Anexo IV elemento a elemento indicando qué fuente del pipeline rellena cada punto y qué debe escribir
una persona. SHALL cubrir también tarjetas de modelo y de sistema frente a hojas de datos, el lado
del proveedor GPAI (Anexos XI y XII, Model Documentation Form, plantilla del resumen de contenido de
entrenamiento, Safety and Security Model Report), la decisión de publicar pesos abiertos y los
límites de las exenciones de código abierto, la conservación de registros (Art. 18 y 19) y la
divulgación pública por audiencia.

#### Scenario: Ruta de conformidad para biometría
- **WHEN** el lector consulta qué procedimiento sigue un sistema del punto 1 del Anexo III
- **THEN** el capítulo explica que sin normas armonizadas aplicadas corresponde el Anexo VII con
  organismo notificado, y que a 2026-09-24 no hay ninguna norma armonizada citada en el Diario
  Oficial, enlazando al capítulo 08

### Requirement: Evaluaciones de impacto comparadas
El capítulo SHALL comparar en una tabla la evaluación de impacto de sistemas de IA (ISO/IEC 42005),
la DPIA (Art. 35 RGPD), la FRIA (Art. 27 AI Act), la evaluación de impacto algorítmico de Canadá, la
auditoría de sesgo de la Local Law 144 de Nueva York y la validación independiente de modelos,
indicando quién la realiza, el disparador, cuándo, quién revisa o firma, si se publica y cuándo se
reevalúa, y SHALL explicar las dimensiones comunes (gravedad, escala, reversibilidad, duración,
probabilidad) y los disparadores de reevaluación como condiciones evaluables por un pipeline.

#### Scenario: Revisar frente a realizar
- **WHEN** el lector revisa una evaluación que no ha escrito
- **THEN** el capítulo le da una lista de comprobaciones del revisor (alcance, grupos afectados,
  evidencia por riesgo, mitigaciones ligadas a controles, aceptación del riesgo residual,
  disparadores codificados)

### Requirement: Fuentes verificadas y estilo de la casa
Toda afirmación factual, legal o numérica del capítulo MUST llevar un marcador `[n]` que exista en
`## Sources` con el formato `[n] Title (gloss). Publisher. Date. URL (verified: primary|secondary|reported)`,
y cada `[n]` MUST tener su fila en la sección `### bok/14-governing-development.md` de
`sources/SOURCES.md`. El capítulo MUST NOT contener el carácter raya (U+2014), MUST NOT mencionar
ningún producto privado ni guía comercial de certificación, y MUST referirse a las normas ISO/IEC
solo por identificador y título corto.

#### Scenario: La build valida contenido y enlaces
- **WHEN** se ejecuta `bash D:/Documents/aige-wt/build.sh`
- **THEN** content-lint no encuentra rayas ni frases vetadas y check-links resuelve todos los enlaces
  internos del capítulo, incluidas las anclas de los capítulos 01, 04, 05, 06 y 08
