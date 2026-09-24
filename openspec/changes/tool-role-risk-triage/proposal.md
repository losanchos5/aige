# Proposal

## Why

El capítulo 18 enseña el AI Act como una secuencia de decisiones: si el objeto es un sistema de IA o
un modelo GPAI, si el Reglamento lo alcanza, qué papel tiene la organización en la cadena de valor,
en qué escalón del riesgo cae y desde qué fecha. El capítulo dice también cómo debe quedar esa
decisión: un registro de clasificación con la condición del `Art. 6(3)` invocada y la bandera de
perfilado explícita, archivado junto al sistema y revisado cuando cambia la finalidad prevista. Hoy
el lector tiene que recorrer el capítulo a mano para llegar a ese registro, y cada equipo lo escribe
con un formato distinto.

Una herramienta de triaje en el navegador convierte esa secuencia en un grafo de preguntas
versionado, devuelve papeles y clases orientativos con la razón de cada respuesta y exporta el
registro en un formato validable. No da un veredicto de conformidad: deja el triaje en el punto en
que el ingeniero lo archiva y el asesor jurídico confirma la lectura.

## What Changes

- **Datos** `site/src/data/triage.ts` (nuevo): el grafo de preguntas versionado
  (`questionSet.version` 1.0.0, a fecha de 2026-09-24, sobre el Reglamento (UE) 2024/1689 modificado
  por el Reglamento (UE) 2026/1744). Veinte preguntas en siete pasos, cada una con el artículo en que
  se apoya, su ancla en el texto consolidado de EUR-Lex, la sección del capítulo 18 y los fragmentos
  literales del capítulo que la sostienen; condiciones de visibilidad (`showIf`) como datos; reglas
  declarativas de papel, clase, alcance, notas y disparadores de revisión, cada una con su razón y su
  artículo. Cubre: alcance territorial y extraterritorial (`Art. 2(1)`), definición de sistema de IA
  (`Art. 3(1)`), exclusiones del `Art. 2`, disparadores del `Art. 25(1)`, prácticas prohibidas del
  `Art. 5` con los puntos `(ba)` y `(bb)` del Omnibus y sus fechas, `Art. 6(1)` y el Anexo I con el
  componente de seguridad acotado, las ocho áreas del Anexo III, el filtro del `Art. 6(3)` y la
  excepción del perfilado, los casos del `Art. 50` y el modelo GPAI con la presunción de riesgo
  sistémico.
- **Motor** `site/public/toolkit/ai-act-triage-engine.js` (nuevo): módulo ES puro, sin DOM, que
  interpreta el grafo (visibilidad, respuestas pendientes, evaluación por fases, registro, YAML,
  estado en el fragmento, reimportación y enlace al planificador). Se prueba en Node.
- **Herramienta** `/toolkit/ai-act-triage` (`site/src/pages/toolkit/ai-act-triage.astro` y
  `site/public/toolkit/ai-act-triage.js`) sobre el contrato del toolkit (ToolShell, `lib.js`, isla
  JSON, aviso fijo): formulario accesible, resultado con alcance, papeles, clases (con fecha de
  aplicación), puntos abiertos y la razón de cada respuesta; nunca un veredicto verde ni la palabra
  "compliant". Exporta el registro de decisión de clasificación en JSON y YAML y un informe Markdown;
  copia el enlace; reimporta un registro para revisarlo; imprime. La guía didáctica (reglas escritas,
  cómo leer el resultado, el registro, el enlace al planificador) funciona sin JavaScript.
- **Esquema** `site/public/schemas/classification-decision-record.v1.json` con su ejemplo en
  `site/public/schemas/examples/` y su plantilla humana en `site/public/templates/`: versión del
  conjunto de preguntas, respuestas, razones, papeles, clases, revisor, fecha, estado de la revisión
  jurídica y disparadores de nueva revisión.
- **Enlace al planificador de obligaciones**: el resultado abre `/toolkit/obligations-planner` con el
  formato de fragmento del propio planificador (bloque `w2-tool-planner`, leído en su worktree):
  `#v=1&r=<códigos de papel>&c=<códigos de clase>&d=<fecha de la decisión>`, códigos unidos por
  punto (`pr`, `de`, `im`, `di`, `ar`, `gp`, `gs`; `h3`, `h1`, `tr`), más `from=ai-act-triage` y
  `qs=<versión>` como procedencia. La tabla de códigos vive en `triage.ts` (`plannerHandoff`) y una
  prueba la compara con `obligations-planner.ts` cuando ambos estén en la misma rama. Solo se
  enlaza cuando el registro del toolkit marca el planificador como `live`; si no, remite al
  registro de obligaciones.
- **Registros compartidos**: entrada al final de `site/src/data/toolkit.ts`, un bloque en
  `SOURCE_BY_PATH`, una sección en `sources/SOURCES.md`, viñetas en `bok/CHANGELOG.md`.
- **Pruebas**: `site/tests/ai-act-triage.spec.ts` (datos contra el capítulo 18, motor en Node,
  esquema y ejemplo, página con y sin JavaScript, exportaciones, reimportación, estado en el enlace,
  sin peticiones de red con lo que escribe el lector, impresión y 390 px).
- Fuera de alcance (van al handoff): navegación, tarjeta en `/resources`, enlaces desde el capítulo
  18 y desde `/obligations`, orden del esquema en `templates.ts`, términos de glosario, `llms.txt` y
  los huecos del capítulo 18 que la herramienta no puede afirmar.

## Capabilities

### New Capabilities
- `ai-act-triage`: el triaje de papel y clase de riesgo del AI Act, su grafo versionado, el registro
  de decisión de clasificación y el enlace al planificador de obligaciones.

### Modified Capabilities
- (ninguna; se apoya en el contrato `governance-toolkit` del cambio
  `toolkit-foundation-self-check`, sin modificarlo)

## Impact

- **Nuevos**: `site/src/data/triage.ts`, `site/src/pages/toolkit/ai-act-triage.astro`,
  `site/public/toolkit/ai-act-triage.js`, `site/public/toolkit/ai-act-triage-engine.js`,
  `site/public/schemas/classification-decision-record.v1.json`,
  `site/public/schemas/examples/classification-decision-record.example.json`,
  `site/public/templates/classification-decision-record.md`, `site/tests/ai-act-triage.spec.ts`.
- **Modificados (solo añadidos)**: `site/src/data/toolkit.ts`, `site/astro.config.ts`,
  `sources/SOURCES.md`, `bok/CHANGELOG.md`.
- Sin dependencias nuevas. La CSP no cambia. Ningún capítulo cambia: la herramienta solo afirma lo
  que el capítulo 18 ya dice, y la build falla si un fragmento citado deja de estar en el capítulo.
- El resultado es orientativo: no es asesoramiento jurídico ni una declaración de conformidad.
