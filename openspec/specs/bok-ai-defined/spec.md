# bok-ai-defined Specification

## Purpose
El capítulo 11 del Body of Knowledge define qué es un sistema de IA a efectos de gobierno, con las
definiciones que fijan el alcance, los tipos de IA y las características que rompen el gobierno
clásico, cada una ligada a un campo del registro, una capa de la pila, un patrón y la evidencia que
emite.

## Requirements

### Requirement: Definiciones comparadas y convertidas en campos del registro
El capítulo `bok/11-ai-defined.md` SHALL comparar las definiciones de sistema de IA de la OCDE
(revisión de 2023), del AI Act art. 3(1) leído con las directrices de la Comisión, de ISO/IEC 22989
y de NIST AI 100-1. Para cada elemento (base en máquina, objetivos, inferencia, salidas, efecto
sobre el entorno, autonomía, adaptatividad) MUST indicar el campo del registro que lo recoge y la
decisión de alcance o de control que activa, y MUST distinguir la decisión definitoria (¿es IA?)
de la clasificatoria (¿qué obligaciones aplican?).

#### Scenario: Un sistema basado solo en reglas escritas por personas
- **WHEN** un lector aplica la tabla de elementos a un motor de reglas cuyas ramas escribió una
  persona
- **THEN** el capítulo le indica registrarlo como `out_of_scope` con la familia excluida y el
  motivo, de modo que un cambio posterior aparezca como diff

#### Scenario: La norma ISO se cita sin reproducirla
- **WHEN** el capítulo describe la definición y los términos de ISO/IEC 22989
- **THEN** los parafrasea y los referencia por identificador, término o cláusula, sin copiar su
  texto

### Requirement: Tipos de IA y características ligados a controles
El capítulo SHALL clasificar los tipos de IA que cambian el problema de gobierno (capacidad,
paradigma de aprendizaje, familia tecnológica, predictiva frente a generativa, modelo fundacional y
GPAI, LLM frente a SLM, multimodal, RAG, agéntica) y SHALL incluir una tabla de ocho
características (complejidad, opacidad, autonomía, velocidad y escala, salidas probabilísticas,
dependencia de datos, doble uso y mal uso, adaptatividad y deriva). Cada fila MUST nombrar por qué
falla el gobierno clásico de TI, la capa y el patrón del capítulo 05 que responden y la evidencia
que emiten, usando los nombres exactos de las cinco capas.

#### Scenario: Enlaces a patrones existentes
- **WHEN** una fila cita un patrón
- **THEN** el enlace apunta a un ancla `#pattern-*` existente en `/bok/patterns` y la build pasa
  `check-links`

### Requirement: Gobierno de salidas probabilísticas
El capítulo SHALL tratar el umbral de decisión como una política con propietario, versión y fecha
de efecto, la calibración como propiedad medida en la eval gate, la certeza exigida por nivel de
riesgo (banda de abstención, regla de resultado adverso, regla fuera de distribución) y el no
determinismo de las salidas generativas, con ejemplos marcados como ilustrativos.

#### Scenario: Un umbral sin propietario
- **WHEN** un lector sigue la sección "What you can do this week"
- **THEN** encuentra una acción concreta para localizar el umbral, su propietario y su última
  comprobación de calibración, y para ponerlo en un fichero de política

### Requirement: Conjuntos de principios de IA responsable, ingenierizados
El capítulo SHALL cruzar los principios comunes de OCDE (2019, actualizados en 2024), UNESCO (2021),
HLEG con ALTAI y G7 Hiroshima (equidad, seguridad y fiabilidad, privacidad y seguridad,
transparencia y explicabilidad, rendición de cuentas, centralidad humana con accesibilidad e
inclusión, sostenibilidad) con los 8 valores y 6 principios del capítulo 03 y con el artefacto que
evidencia cada uno. MUST NOT redefinir el sentido de "principio" de la casa y MUST presentar esos
conjuntos como marcos de terceros.

#### Scenario: Principio publicado sin artefacto
- **WHEN** una organización traza un principio publicado con la tabla del capítulo
- **THEN** la ausencia de artefacto se registra como hueco en el registro de riesgos, no como valor

### Requirement: Fuentes verificadas y estilo de la casa
Toda afirmación factual, legal o numérica del capítulo MUST llevar una referencia numerada en
"## Sources" con el formato `[n] Título (glosa). Editor. Fecha. URL (verified: primary|secondary|reported)`,
y cada referencia MUST figurar en la sección del capítulo en `sources/SOURCES.md`. Lo no confirmado
MUST ir matizado y marcado "(verify)". El capítulo MUST NOT contener rayas largas (U+2014) y MUST
cerrar con "## What you can do this week" antes de "## Sources".

#### Scenario: Build de contenido
- **WHEN** se ejecuta la build compartida del sitio
- **THEN** `content-lint` y `check-links` pasan sin incidencias para `/bok/ai-defined`
