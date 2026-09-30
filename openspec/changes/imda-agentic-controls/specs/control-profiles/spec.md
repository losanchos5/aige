## MODIFIED Requirements

### Requirement: Perfil Agent Runtime derivado
El perfil `agent-runtime` SHALL tener un control `AIGE-CTL-AGENT-0nn` por cada control de agente de
`site/src/data/tool-agent-controls.ts`, en el mismo orden, cada uno con exactamente una semilla
distinta, `depth: 'derived'`, estado `draft` y revisión `open`. La derivación MUST NOT añadir
requisitos que la semilla no contiene: el objetivo reescribe la regla sin cambiar su sentido, los
mapeos OWASP vienen de las amenazas de la semilla y las obligaciones solo de las que `threats.ts` ya
asocia a esas amenazas. Cada control SHALL enlazar su ancla del capítulo 23 como referencia. Las
semillas nuevas SHALL añadirse al final de la lista, de modo que ningún id publicado cambie de
control. El perfil SHALL publicarse como v0.2 con una entrada de changelog que nombre los controles
añadidos y los ampliados.

#### Scenario: Trazabilidad a la semilla
- **WHEN** se ejecuta `site/tests/controls-runtime.spec.ts`
- **THEN** hay 42 controles `derived`, cada uno con una semilla de `agentControls` sin repetir y en
  el mismo orden que el módulo, y AIGE-CTL-AGENT-001 a 031 conservan sus semillas

### Requirement: Perfiles derivados del material del sitio
Los perfiles `data-admission-and-privacy` (`AIGE-CTL-DATA-NNN`, de 8 a 12 controles),
`deployment-and-monitoring` (`AIGE-CTL-DEPLOY-NNN`, de 10 a 18) y `assurance-and-evidence`
(`AIGE-CTL-ASSURE-NNN`, de 8 a 12) SHALL publicarse en estado `draft`, revisión `open` y revisores
vacíos. Cada control SHALL ser `derived` (o `specified` si cumple ese nivel) y MUST reformular
material existente del sitio: `derivedFrom` MUST nombrar al menos un slug de patrón o id de esquema
de registro publicado que el control reformula, y la derivación MUST NOT añadir requisitos que ese
material (el patrón, el esquema o el capítulo nombrado) no contiene. Los mapeos MUST usar solo ids
presentes en `frameworks.ts`, `threats.ts`, la lista de controles ISO/IEC 42001 y el índice público
de AIUC-1; las referencias MUST reutilizar filas existentes de `sources/SOURCES.md` o secciones del
Body of Knowledge.

#### Scenario: Trazabilidad a patrones y esquemas
- **WHEN** se ejecuta `site/tests/controls.spec.ts`
- **THEN** cada control de los tres perfiles derivados tiene al menos un `derivedFrom` que resuelve a
  `/patterns/<slug>` o a `/schemas/<id>.v1.json` y el número de controles de cada perfil está en su
  rango

## ADDED Requirements

### Requirement: Cobertura de los huecos del marco agéntico de IMDA
Cada una de las dieciséis recomendaciones del *Model AI Governance Framework for Agentic AI* v1.5 de
IMDA que el mapeo de 2026-09-28 dejó sin control SHALL quedar cubierta por un control derivado del
capítulo 23, nuevo (AIGE-CTL-AGENT-032 a 042, AIGE-CTL-DEPLOY-016 a 018) o ampliado
(AIGE-CTL-AGENT-004 por la inmutabilidad de las trazas, AIGE-CTL-DEPLOY-005 por el despliegue por
usuarios, herramientas y sistemas). Cada control nuevo SHALL llevar una referencia cruzada IMDA
con sección y página impresa, `direct` cuando IMDA recomienda el mismo mecanismo en su propio texto y
`partial` cuando el control añade algo o el mecanismo solo aparece en un ejemplo de IMDA. Ninguna nota MUST atribuir a IMDA términos que su texto no usa
(«kill switch», «circuit breaker», «registry», «rollback», «canary», «allow-list»). La referencia
cruzada de AIGE-CTL-AGENT-028 MUST presentar su mayor rigor como decisión deliberada y MUST NOT
citar a IMDA como apoyo de ese rigor; la de AIGE-CTL-AGENT-009 MUST NOT citar la p.29 como apoyo de
mostrar datos en bruto.

#### Scenario: Columna IMDA en el crosswalk de controles
- **WHEN** se abre `/controls/crosswalk`
- **THEN** la tabla de IMDA MGF for Agentic AI v1.5 lista los 14 controles nuevos con su ajuste y su
  página

#### Scenario: Nota de la tensión de prompts
- **WHEN** se lee la fila IMDA de AIGE-CTL-AGENT-028 en `/api/v1/controls.json`
- **THEN** la nota empieza por «Stricter than IMDA by design» y no contiene «Tension»
