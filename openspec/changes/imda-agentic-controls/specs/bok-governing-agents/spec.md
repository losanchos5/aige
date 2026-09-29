## MODIFIED Requirements

### Requirement: Capítulo 23 completo con estructura de la casa
El fichero `bok/23-governing-agents.md` SHALL conservar el H1 «# 23. Governing AI agents» y una
entradilla en blockquote de una frase, y SHALL contener secciones H2 estables para el objeto de
gobierno y la autonomía, el registro de agentes, la identidad y las credenciales, los permisos de
herramientas y servidores MCP, los puntos de control humanos, los guardrails de llamadas a
herramientas, el kill switch y los circuit breakers, la memoria y el contexto, los sistemas
multiagente y la delegación, los prompts como configuración, los incidentes y la telemetría, la
tabla amenaza-control, los marcos para agentes, los ganchos del AI Act y las personas alrededor del
agente (transparencia al usuario, formación y camino manual, despliegue por usuarios, herramientas y
sistemas, responsabilidades por equipo y aprendizaje del uso), seguidas de «## What you can do this
week» (de tres a cinco acciones), una línea «**Maps to:**» con la frase «Mappings are illustrative,
not a claim of conformity» y «## Sources». La extensión antes de «## Sources» SHALL estar entre 4.000
y 10.000 palabras. El texto MUST NOT contener el carácter raya larga (U+2014).

#### Scenario: El capítulo se publica en su ruta
- **WHEN** se construye el sitio
- **THEN** `/bok/governing-agents` muestra el capítulo con su entradilla, las tablas GFM y los
  callouts «In practice», «Example (illustrative)» y «Anti-pattern» renderizados como `aside.callout`

#### Scenario: Content-lint en verde
- **WHEN** se ejecuta `content-lint` sobre `dist`
- **THEN** no hay ninguna raya larga ni ancla `#src-n` colgante en la página del capítulo

## ADDED Requirements

### Requirement: Recomendaciones de IMDA citadas por página
Cada recomendación de IMDA que el capítulo incorpora para los controles de agentes SHALL citarse
como [3] con la página impresa del *Model AI Governance Framework for Agentic AI* v1.5, y SHALL
distinguir el texto del marco de sus estudios de caso. El capítulo SHALL explicar por qué el libro
somete todo cambio de prompt a la suite de regresión aunque IMDA admita una revisión más ligera para
refinamientos menores, y SHALL precisar que la aprobación muestra la llamada exacta en forma breve,
no registros largos ni datos en bruto.

#### Scenario: Aprobación legible
- **WHEN** un lector consulta «What a good approval looks like»
- **THEN** la regla sobre qué ve el aprobador nombra la llamada exacta en forma breve, el riesgo y la
  forma de respuesta (aprobar o rechazar, editar el plan, justificación escrita en alto riesgo), con
  cita a IMDA p.29
