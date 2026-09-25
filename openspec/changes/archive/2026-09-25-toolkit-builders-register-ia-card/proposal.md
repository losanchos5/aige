# Proposal

## Why

La biblioteca de plantillas y esquemas (`/resources/templates`, `/schemas/*`) publica los registros
de la gobernanza de IA como JSON Schema, pero rellenarlos a mano en un editor de JSON es lento y
propenso a errores, y cada régimen pide los mismos hechos con otros nombres: el registro público del
Reino Unido (ATRS), la evaluación de impacto algorítmico de Canadá (AIA), la base de datos de la UE
(Anexo VIII del Reglamento de IA), una ficha de modelo o la declaración de aplicabilidad de
ISO/IEC 42001. Tres registros concentran casi todo ese trabajo repetido: la entrada del inventario
(sistema o agente), la evaluación de impacto (FRIA, evaluación de impacto de ISO/IEC 42005 o
adenda de IA a una DPIA) y la ficha de modelo o de sistema.

El toolkit ya tiene un contrato común (`ToolShell`, `lib.js`, aviso fijo, nada sale del
navegador). Tres constructores sobre ese contrato convierten los esquemas en documentos que se
rellenan, se validan y se exportan sin salir del navegador, y hacen visible que un único registro
fuente alimenta cada régimen.

## What Changes

- **Constructor de entradas de inventario** `/toolkit/ai-register-entry`: formulario para sistemas
  de IA y agentes generado desde los esquemas `ai-system-register-entry.v1` y
  `agent-register-entry.v1`, validación con resumen de errores enlazado a cada campo, un registro
  en `localStorage`, importación y exportación masiva en JSON y CSV (RFC 4180, ida y vuelta sin
  pérdida), un resumen público en Markdown sin campos internos y una tabla de correspondencia de
  campos (UK ATRS v4.0, Canadá AIA, Anexo VIII secciones A, B y C, ficha de modelo Hugging Face y
  CycloneDX, columnas de la SoA de ISO/IEC 42001), solo nombres de campo.
- **Constructor de evaluaciones de impacto** `/toolkit/impact-assessment`: selector de tipo (FRIA,
  AIIA, adenda DPIA); los seis elementos del art. 27(1) para la FRIA, los elementos de ISO/IEC 42005
  por identificador de cláusula para la AIIA y los campos específicos de IA para la adenda DPIA;
  cada riesgo con identificador y cada medida enlazada a los riesgos que cubre, al patrón que la
  implementa y a sus controles; matriz riesgo-medida con cabos sueltos; disparadores de reapertura;
  exportación JSON, YAML y Markdown.
- **Constructor de fichas de modelo** `/toolkit/model-card`: nuevo esquema `model-card.v1.json`
  (con ejemplo y plantilla humana), lista de cobertura de obligaciones (art. 11 con el Anexo IV,
  art. 13(3), art. 53(1) para GPAI, controles del Anexo A de ISO/IEC 42001, NIST AI RMF MAP y
  MEASURE) y exportación a Markdown estilo Hugging Face con front matter YAML y a un fragmento
  ML-BOM CycloneDX 1.7 en JSON que valida contra el esquema oficial.
- **Base común de los constructores** en `site/public/toolkit/`: `builders.js` (validador del
  subconjunto draft 2020-12 que usa la biblioteca, rutas, poda, YAML, CSV) y `schema-form.js`
  (formulario accesible desde las especificaciones de campos), más `site/src/data/doc-builders.ts`
  (secciones, crosswalk, cláusulas, disparadores, lista de cobertura y fuentes) y
  `site/src/lib/doc-builders-schemas.ts` (lee en build el esquema publicado para validar contra el
  mismo fichero que sirve el sitio).
- **Esquemas v1 ampliados solo con campos opcionales**: `public_record` en las dos entradas de
  inventario; `iso42005_sections`, `id` de riesgo, y `pattern` y `controls` de cada medida en la
  evaluación de impacto. Ningún campo nuevo es obligatorio, así que todo registro v1 anterior sigue
  validando.

## Capabilities

### New Capabilities
- `toolkit-document-builders`: los tres constructores de documentos del toolkit, su validación
  contra los esquemas publicados, sus exportaciones y su correspondencia con otros regímenes.

### Modified Capabilities
- (ninguna)

## Impact

- **Nuevos**: `site/src/pages/toolkit/{ai-register-entry,impact-assessment,model-card}.astro`,
  `site/public/toolkit/{builders,schema-form,ai-register-entry,ai-register-entry-core,impact-assessment,impact-assessment-core,model-card,model-card-core}.js`,
  `site/src/components/toolkit/builders.css`, `site/src/data/doc-builders.ts`,
  `site/src/lib/doc-builders-schemas.ts`, `site/public/schemas/model-card.v1.json`,
  `site/public/schemas/examples/model-card.example.json`, `site/public/templates/model-card.md`,
  `site/tests/doc-builders.spec.ts`.
- **Modificados (solo adiciones)**: los esquemas y plantillas `ai-system-register-entry`,
  `agent-register-entry` e `impact-assessment`; `site/src/data/toolkit.ts` (tres entradas al final);
  `site/astro.config.ts` (un bloque en `SOURCE_BY_PATH`); `sources/SOURCES.md` (una sección);
  `bok/CHANGELOG.md` (viñetas en "Unreleased (v0.5.0)").
- Sin dependencias nuevas, sin cambios en la CSP (módulos externos del mismo origen, datos en una
  isla JSON no ejecutable), sin persistencia más allá de borradores en `localStorage`, sin subidas:
  nada sale del navegador.
- Las correspondencias son ilustrativas, no una declaración de conformidad ni asesoramiento
  jurídico; los nombres de campo de ISO/IEC se citan por identificador y título corto, y los que no
  se pudieron contrastar con el texto publicado quedan marcados "(verify)".
