# threat-bridge Specification

## Purpose
El puente de amenazas lleva cada amenaza identificada por un catálogo externo al control que la
para, a una prueba que falla si el control no funciona y a las obligaciones que esa evidencia ayuda
a cumplir, como datos abiertos y como página accesible.

## Requirements

### Requirement: Dataset de amenazas con clave externa verificada
El sitio SHALL definir en `site/src/data/threats.ts` una lista tipada de amenazas. Cada fila MUST
tener `id` estable en minúsculas, `taxonomy` (uno de `owasp-llm`, `owasp-asi`, `mitre-atlas`,
`nist-aml`), `externalId` y `name` tal como los publica el catálogo en la versión fijada, `url`,
`summary` con palabras propias, `control`, al menos un patrón (`slug` de `site/src/data/patterns.ts`),
al menos una eval de ejemplo (Inspect, promptfoo, garak o `custom` cuando ninguna trae una
comprobación con nombre), al menos una obligación (id de `site/src/data/frameworks.ts`), ids del
Anexo A de ISO/IEC 42001, dominios de CSA AICM v1.1, tareas de NIST SP 800-218A cuando la amenaza
entra en desarrollo, casos de uso de NIST COSAiS, mitigaciones de ATLAS (solo filas de ATLAS),
filas relacionadas y capas. Las listas de OWASP LLM 2026 y OWASP Agentic 2026 MUST estar completas
(diez filas cada una).

#### Scenario: Referencia rota
- **WHEN** una fila nombra un patrón, una obligación, un control, un dominio, una tarea, un caso de
  uso, una mitigación o una fila relacionada que no existe
- **THEN** `threatProblems()` devuelve el problema y la build de `/resources/threats` falla

#### Scenario: Identificadores verificados
- **WHEN** se revisa una fila de ATLAS
- **THEN** su id, su nombre y sus mitigaciones coinciden con los datos de la versión v2026.09 del
  repositorio `mitre-atlas/atlas-data`, porque la web de ATLAS se pinta con JavaScript

### Requirement: Página accesible con filtros sin JavaScript
El sitio SHALL publicar `/resources/threats` con una tarjeta por fila agrupada por catálogo, un
filtro por catálogo y otro por capa hechos con radios nativos y CSS (`:has()`), sin script en
línea, de modo que la CSP se mantenga. Sin soporte de `:has()` todas las tarjetas MUST quedar
visibles. Un par de filtros sin filas MUST mostrar una nota en lugar de una lista vacía. La página
MUST decir que el mapeo es ilustrativo y no una declaración de conformidad, fechar las versiones
comprobadas (a 2026-09-24) y listar sus fuentes numeradas en el formato de la casa.

#### Scenario: Filtro por catálogo y capa
- **WHEN** un lector marca un catálogo y una capa
- **THEN** solo quedan visibles las tarjetas de ese catálogo que viven en esa capa, o la nota de
  estado vacío si no hay ninguna

#### Scenario: Enlaces internos
- **WHEN** se construye el sitio
- **THEN** cada enlace a patrón, obligación, capítulo o fila relacionada resuelve en la
  comprobación de enlaces

### Requirement: Datos abiertos del puente de amenazas
El registro de la API (`site/src/lib/api.ts`) SHALL publicar el dataset `threats` en
`/api/v1/threats.json` con su esquema JSON (draft 2020-12), el sobre común (aviso, versión,
licencia, DOI) y los registros mapeados campo a campo. El sitio SHALL publicar además
`/resources/threats.csv`, construido desde los mismos registros, con el aviso en la primera fila.

#### Scenario: El CSV y la API coinciden
- **WHEN** se construye el sitio
- **THEN** la API y el CSV contienen las mismas filas, en el mismo orden que `threats.ts`
