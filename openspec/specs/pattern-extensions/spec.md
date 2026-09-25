# pattern-extensions Specification

## Purpose
Cuatro patrones del capítulo 05 se extienden hacia el lado del responsable del despliegue y de la
operación, sin romper ninguna URL ni ancla publicada.

## Requirements

### Requirement: Extensiones compatibles con las páginas de patrón
Las extensiones SHALL editar solo `bok/patterns/incident-pipeline.md`,
`bok/patterns/fria-as-code.md`, `bok/patterns/adversarial-red-team-suite.md` y
`bok/patterns/vendor-model-due-diligence-gate.md`. Cada fichero MUST conservar su frontmatter
(`id`, `title`, `layer`, `secondaryLayer`, `order`), su H1, sus encabezados H2 de la plantilla y su
línea **Maps to**; el contenido nuevo MUST ir en subsecciones H3 dentro de `## Solution` y en las
secciones existentes. Las citas MUST numerarse desde `[1]` por orden de aparición y cada fuente
MUST citarse al menos una vez.

#### Scenario: Integridad de las páginas de patrón
- **WHEN** se construye el sitio
- **THEN** `src/lib/pattern-pages.ts` no informa de ningún desajuste entre fichero, índice y catálogo

### Requirement: Incident Pipeline del lado del responsable del despliegue
El patrón Incident Pipeline SHALL distinguir incidencia de incidente, dar una escala de severidad
mapeada a las clases del `Art. 73` del Reglamento (UE) 2024/1689, remitir al esquema
`/schemas/incident-record.v1.json`, cubrir RCA, CAPA y revisión sin culpa, pedir simulacros de mesa
y describir los deberes del `Art. 26(5)`: informar al proveedor, suspender el uso y aplicar el
`Art. 73` cuando el proveedor no responde.

#### Scenario: Plazos citados
- **WHEN** el patrón nombra un plazo del `Art. 73`
- **THEN** la cita apunta a EUR-Lex con etiqueta `primary`

### Requirement: Impact-Assessment-as-Code sin romper enlaces
El patrón FRIA-as-Code SHALL presentarse como Impact-Assessment-as-Code, con la AIIA de ISO/IEC
42005, la DPIA y la FRIA como vistas de una sola base de hechos y disparadores de reevaluación como
código. El slug `fria-as-code` y el ancla `#pattern-fria-as-code` MUST seguir resolviendo; si el slug
cambiara, `public/_redirects` MUST ganar la redirección.

#### Scenario: Enlaces publicados
- **WHEN** alguien abre `/patterns/fria-as-code` o `/bok/patterns#pattern-fria-as-code`
- **THEN** llega al patrón generalizado

### Requirement: Del modelo de amenazas al plan de pruebas
El patrón Adversarial Red-Team Suite SHALL describir el paso que convierte el modelo de amenazas en
entradas del plan de pruebas, con amenazas registradas por su id externo y un ejemplo de entrada de
`suites` válido para `/schemas/test-plan.v1.json`, y enlazar al puente de amenazas.

#### Scenario: Ejemplo válido
- **WHEN** se valida el ejemplo YAML del patrón contra `test-plan.v1.json`
- **THEN** no tiene campos que el esquema no admita

### Requirement: Fase de operación del Due-Diligence Gate
El patrón Vendor / Model Due-Diligence Gate SHALL añadir una fase de operación: avisos de cambio y de
retirada como eventos del registro, detección de cambios no anunciados, reevaluación periódica y por
disparadores, y una alternativa probada que también sirva al deber de suspender el uso del
`Art. 26(5)`.

#### Scenario: Aviso de retirada
- **WHEN** un proveedor anuncia la retirada de una versión de modelo
- **THEN** el patrón indica registrarla como hito con responsable y volver a pasar la eval de
  frontera contra la versión sucesora
