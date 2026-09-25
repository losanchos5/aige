# bok-governing-agents Specification

## Purpose
El capítulo 23 del Body of Knowledge explica cómo se gobierna un agente de IA de extremo a extremo con
la voz de ingeniería del libro: cada control atado al artefacto que lo evidencia, a la capa del stack
que lo produce, a las amenazas que contiene y a los artículos legales que apoya.

## Requirements

### Requirement: Capítulo 23 completo con estructura de la casa
El fichero `bok/23-governing-agents.md` SHALL conservar el H1 «# 23. Governing AI agents» y una
entradilla en blockquote de una frase, y SHALL contener secciones H2 estables para el objeto de
gobierno y la autonomía, el registro de agentes, la identidad y las credenciales, los permisos de
herramientas y servidores MCP, los puntos de control humanos, los guardrails de llamadas a
herramientas, el kill switch y los circuit breakers, la memoria y el contexto, los sistemas
multiagente y la delegación, los prompts como configuración, los incidentes y la telemetría, la
tabla amenaza-control, los marcos para agentes y los ganchos del AI Act, seguidas de «## What you can
do this week» (de tres a cinco acciones), una línea «**Maps to:**» con la frase «Mappings are
illustrative, not a claim of conformity» y «## Sources». La extensión SHALL estar entre 4.000 y 7.000
palabras. El texto MUST NOT contener el carácter raya larga (U+2014).

#### Scenario: El capítulo se publica en su ruta
- **WHEN** se construye el sitio
- **THEN** `/bok/governing-agents` muestra el capítulo con su entradilla, las tablas GFM y los
  callouts «In practice», «Example (illustrative)» y «Anti-pattern» renderizados como `aside.callout`

#### Scenario: Content-lint en verde
- **WHEN** se ejecuta `content-lint` sobre `dist`
- **THEN** no hay ninguna raya larga ni ancla `#src-n` colgante en la página del capítulo

### Requirement: Autonomía como decisión de diseño con controles mínimos
El capítulo SHALL tratar el nivel de autonomía como una decisión de diseño separada de la capacidad,
SHALL relacionar las escalas del Knight First Amendment Institute, de IMDA y del Agentic Trust
Framework de CSA, y SHALL asignar a cada nivel un conjunto mínimo de controles, ligando la
proporcionalidad al `Art. 14(3)` del AI Act y al principio de «least agency» de OWASP.

#### Scenario: Nivel de autonomía en el registro
- **WHEN** un lector consulta la tabla de niveles de autonomía
- **THEN** ve para cada nivel qué aprueba la persona, qué controles son el mínimo y qué campo del
  registro de agentes lo declara

### Requirement: Identidad, credenciales y autorización de MCP verificadas
El capítulo SHALL separar la autenticación del canal de la identidad de carga de trabajo del agente,
SHALL describir credenciales de vida corta (SPIFFE/SPIRE) y la delegación con RFC 8693 (reclamación
`act`), y SHALL resumir los requisitos de autorización de la especificación de MCP 2026-07-28 (CIMD
con DCR obsoleto, indicadores de recurso, validación de audiencia, prohibición de token passthrough,
validación de `iss`, minimización de scopes) con fecha «as of 2026-09-24».

#### Scenario: Requisito de MCP con su evidencia
- **WHEN** un lector consulta la tabla de requisitos de MCP
- **THEN** cada fila nombra el requisito, lo que previene y la evidencia que deja, con cita [n] a la
  especificación primaria

### Requirement: Controles de ejecución y parada
El capítulo SHALL describir allow-lists de herramientas y la admisión de servidores MCP, puntos de
control humanos con criterios de colocación y registro de aprobaciones, guardrails previos a la
ejecución con postura ante fallo explícita, límites de ejecución y niveles de parada del kill switch
con su radio de impacto, su tiempo objetivo y su evidencia, incluidas las limitaciones de la
cancelación entre agentes.

#### Scenario: El kill switch alcanza a un agente remoto
- **WHEN** un lector sigue la sección de parada en un sistema multiagente
- **THEN** encuentra que la cancelación de una tarea A2A no está garantizada y que la parada fiable
  es revocar en la propia frontera la credencial o el scope emitidos

### Requirement: Memoria, delegación y prompts bajo control
El capítulo SHALL describir tipos de memoria con su riesgo, control y retención, SHALL definir reglas
de rendición de cuentas por salto en cadenas de delegación (principal de origen, actor por salto,
scopes que solo se estrechan, trazas propagadas) sobre A2A v1.0, y SHALL tratar prompts y system
prompts como configuración versionada con revisión, eval gate y rollback.

#### Scenario: Un salto no amplía el scope
- **WHEN** un lector consulta las reglas de delegación
- **THEN** ve que cada salto hereda como máximo el scope del anterior y que el registro de delegación
  conserva la cadena completa de actores

### Requirement: Amenazas mapeadas a controles y patrones existentes
El capítulo SHALL incluir una tabla que lleve cada entrada ASI01 a ASI10 del OWASP Top 10 for
Agentic Applications 2026 a las entradas relacionadas del OWASP GenAI LLM Top 10 2026, a ejemplos de
técnicas de MITRE ATLAS, al control y al patrón del capítulo 05, con la capa del stack. Los enlaces a
patrones MUST usar anclas `#pattern-*` existentes en `/bok/patterns`.

#### Scenario: Cada patrón enlazado existe
- **WHEN** se ejecuta check-links sobre la página del capítulo
- **THEN** todos los enlaces `/bok/patterns#pattern-*` resuelven

### Requirement: Marcos y ganchos del AI Act con fuentes verificadas
El capítulo SHALL resumir la iniciativa de estándares de agentes de NIST, el trabajo agéntico de CSA,
el marco agéntico de IMDA, el Apéndice 2 del TC260 y el Agent Control Standard de OWASP, y SHALL
mapear los `Arts. 12, 14, 15, 25, 26 y 50` y las obligaciones GPAI (`Arts. 53, 55` con los
Apéndices 1.3 y 1.4 del Código de Buenas Prácticas) a artefactos de agentes. Toda afirmación factual
SHALL llevar un marcador `[n]` presente en `## Sources` con el formato de la casa; lo no confirmado
MUST ir matizado y marcado «(verify)». El capítulo MUST NOT citar ni mencionar guías comerciales de
estudio de certificaciones ni productos privados.

#### Scenario: Citas completas
- **WHEN** se comparan los marcadores del texto con la lista de fuentes
- **THEN** cada marcador tiene su fuente y cada fuente se cita al menos una vez
