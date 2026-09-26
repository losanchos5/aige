# Spec Delta

## Purpose

Permite leer los controles abiertos desde cada marco (cláusula → controles) y cada perfil desde sus
marcos, como vista ilustrativa generada de los mapeos del registro, nunca como afirmación de
conformidad.

## ADDED Requirements

### Requirement: Página estática del crosswalk de controles
El sitio SHALL publicar `/controls/crosswalk`, generada en build desde los `mappings` del registro de
controles, con una tabla por marco (EU AI Act por obligación `AIGE-OBL-*`, ISO/IEC 42001 Annex A,
NIST AI RMF, CSA AICM cuando haya mapeos verificados, OWASP LLM y Agentic, MITRE ATLAS, familias de
NIST SP 800-53 cuando haya mapeos, AIUC-1) donde cada fila es una cláusula o id del marco y lista los
controles que la mapean con enlace a su URL canónica, y una vista inversa por perfil (control →
ids por marco). Un marco sin mapeos MUST NOT generar una tabla vacía. Las tablas MUST reutilizar el
patrón de tabla de mapeos legible en móvil de las páginas de perfil (celdas con `data-label`) y MUST
NOT añadir JavaScript de cliente: la navegación entre marcos es por anclas.

#### Scenario: Todo id resuelve
- **WHEN** se ejecuta `site/tests/controls-crosswalk.spec.ts` sobre `dist`
- **THEN** cada enlace a un control resuelve a una página o ancla existente, y el número de pares
  (control, id de marco) de la página coincide con los mapeos del registro

#### Scenario: Marco sin mapeos
- **WHEN** ningún control mapea a un marco
- **THEN** la página no muestra una tabla para ese marco

### Requirement: Lenguaje y avisos del crosswalk
La página y sus exportaciones SHALL decir que cada mapeo es ilustrativo y no una afirmación de
conformidad; las celdas y filas AIUC-1 SHALL llevar la nota de no afiliación con AIUC. Nada en la
página, su JSON o su twin MUST contener "compliant", "certified" ni la raya U+2014, ni llamar
"standard" a los controles propios.

#### Scenario: Sin lenguaje de conformidad
- **WHEN** se busca en la página construida, su JSON y su twin
- **THEN** no aparecen "compliant", "certified" ni U+2014, y aparece "not a claim of conformity"

### Requirement: Exportación legible por máquina del crosswalk
El sitio SHALL publicar el crosswalk como JSON bajo `/api/v1/`, como clave `crosswalk` del dataset
`controls` (`/api/v1/controls.json`), con esquema cerrado, envelope común con el aviso "not a claim
of conformity" y reflejo en `/api/v1/schemas/controls.json`, sin crear un dataset nuevo (el catálogo
de datasets y el servidor MCP no cambian), y un twin `/controls/crosswalk.md` con `canonical:`.

#### Scenario: JSON válido y sincronizado
- **WHEN** se valida el JSON del crosswalk contra su esquema publicado
- **THEN** valida y contiene los mismos pares (control, id de marco) que la página HTML

### Requirement: Metadatos y navegación del crosswalk
`/controls/crosswalk` MUST tener el título "AI governance controls crosswalk", una descripción de 110
a 158 caracteres, un único ld+json `CollectionPage`, tarjeta OG propia, entrada en `SOURCE_BY_PATH`,
línea en `llms.txt`, `lastmod` en el sitemap y regla de `_headers` para su twin. Se SHALL llegar a ella
desde `/controls` (enlace en `#mappings` o `#ecosystem`) o como ítem bajo Practice, sin crear un grupo
de navegación nuevo.

#### Scenario: Metadatos completos
- **WHEN** se abre `/controls/crosswalk`
- **THEN** el `<title>` empieza por "AI governance controls crosswalk", hay un solo ld+json de tipo
  `CollectionPage` y `/llms.txt` lista la ruta
