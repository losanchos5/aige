# tool-catalogue Specification

## Purpose
El catálogo de herramientas (`site/src/data/stack.ts`, `/resources/tools`) es un registro tipado único:
cada herramienta con URL comprobada, licencia, modelo de acceso, capas y fecha de revisión, filtrable
por capa y licencia, del que derivan las categorías por capa de `/stack` y `/map`.

## Requirements

### Requirement: Metadatos verificados por herramienta
Cada herramienta de ejemplo en `site/src/data/stack.ts` SHALL llevar nombre, URL `https://`
verificada, licencia (identificador SPDX cuando existe; "Proprietary" para productos comerciales),
tipo de acceso (`open-source`, `open-standard`, `source-available`, `commercial` o
`free-service`), al menos una capa del stack (1-5) y `lastChecked` en formato `YYYY-MM-DD`. Cuando
el OECD.AI Catalogue of Tools & Metrics tenga una entrada para la herramienta, el registro MUST
enlazarla con una URL `https://oecd.ai/en/catalogue/tools/<slug>` comprobada.

#### Scenario: Registro completo
- **WHEN** se recorre el catálogo en `tests/data.spec.ts`
- **THEN** cada herramienta tiene URL `https://`, licencia, acceso válido, capas entre 1 y 5 y
  `lastChecked` con fecha ISO, y ningún nombre se repite dentro de una categoría

#### Scenario: Entrada del OECD
- **WHEN** una herramienta tiene campo `oecd`
- **THEN** la URL empieza por `https://oecd.ai/en/catalogue/tools/`

### Requirement: Una sola fuente para capas y catálogo
Las `toolCategories` de cada capa en `stack.ts` SHALL derivarse del registro de categorías, de modo
que `/stack`, el mapa y `/resources/tools` muestren las mismas herramientas. Las categorías que
citan los capítulos 14-16 (validación y calidad de datos, versionado de datos y experimentos,
fairness, explicabilidad, monitorización y deriva, entrega progresiva y feature flags, firma de
modelos y escaneo de artefactos) MUST existir, cada una con un enlace a la sección del capítulo que
la trata. Las herramientas que `/path` enlaza como `tool` MUST figurar en el catálogo.

#### Scenario: Categorías nuevas
- **WHEN** se abre `/resources/tools`
- **THEN** aparecen las siete categorías nuevas y cada una enlaza a un ancla existente de su
  capítulo

#### Scenario: Herramientas de la ruta de aprendizaje
- **WHEN** se buscan Conftest, OPA Gatekeeper, Kyverno y The Rego Playground en el catálogo
- **THEN** las cuatro están, con su URL y su licencia

### Requirement: Filtros por capa y por licencia
La página `/resources/tools` SHALL titularse "Tool categories" y ofrecer filtros por capa y por tipo
de acceso implementados en un script de `public/` (CSP `script-src 'self'`, sin JavaScript en
línea). Sin JavaScript los filtros MUST quedar ocultos y todas las herramientas visibles. Con un
filtro activo, las categorías sin herramientas visibles se ocultan y un contador con `aria-live`
anuncia cuántas quedan. La página MUST mantener el aviso de que los nombres son ejemplos, no
recomendaciones.

#### Scenario: Filtro por capa
- **WHEN** el lector elige la capa 3
- **THEN** solo quedan visibles las herramientas cuya lista de capas incluye la 3 y el contador
  se actualiza

#### Scenario: Sin JavaScript
- **WHEN** la página se carga sin ejecutar scripts
- **THEN** los controles de filtro no se muestran y todas las herramientas están visibles
