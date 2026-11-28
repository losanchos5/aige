# Design

## Context

Motivación en `proposal.md`. Estado observado en `origin/main` (`4af2900`):

- `site/src/data/controls/index.ts` define `Control`, el validador `controlProblems()` y concatena
  un fichero por perfil. No hay campo de familia. El prefijo del id sale del perfil
  (`AIGE-CTL-<PROFILE>-<NNN>`), con secuencia sin huecos por prefijo.
- 93 controles: 9 `specified` (evaluation-environment) y 84 `derived`. Todos `draft`, sin revisor.
- El validador exige a un control `derived` al menos una semilla o un `derivedFrom` de tipo
  `pattern`, `schema` o `chapter`. No admite una fuente externa como origen.
- Tablas de referencia: `threats.ts` tiene 14 de los 38 ids del Anexo A de ISO/IEC 42001;
  `nist-ai-rmf.ts` tiene las 72 subcategorías; `aiuc1.ts` los 53 requisitos, con `verified` solo en
  las filas leídas; el Código GPAI es una sola obligación; `mappings.csaAicm` existe y está vacío.
- OSCAL (`site/src/lib/oscal.ts`): un grupo por perfil; cada control lleva `prop` propios (`layer`,
  `depth`, `status`...).
- MCP (`tools/mcp-server/src/tools/controls.ts`): lista y filtra por perfil, con fixtures de la API.
- Las herramientas de medición usan `control_ids` como clave (ver
  `D:/Documents/aige-media/estrategia-2026-11/ronda2/10-PROPUESTA-TOOLS.md`).

Investigación de base, leída el 2026-11-28:
`D:/Documents/aige-wt/handoffs/controls-taxonomy/research-control-catalogs.md` y
`research-laws-standards.md`.

## Goals / Non-Goals

**Goals:**

- Una taxonomía de familias que no toque ningún id publicado.
- Que añadir un control o una familia sea un cambio solo de datos.
- Que toda fila de marco y todo control nuevo se pueda trazar a una fuente primaria con fecha.

**Non-Goals:**

- Subir controles a `specified` (procedimiento de verificación y ejemplos). Queda para otro cambio.
- Renumerar, fusionar o mover controles entre perfiles.
- Mapear control a control contra todo AICM (247) o SP 800-53 (324). Solo se añade la tabla de ids
  de AICM y los mapeos que se verifiquen.
- Un modelo OSCAL de resultados de evaluación. Lo lleva la sesión de herramientas.
- Traducciones. El contenido del sitio sigue en inglés.

## Decisions

### D1. La familia es un campo, no una reorganización

`family` (id), `secondaryFamilies` (0 a 2 ids) y `appliesTo` (1 a 3 actores) se añaden a `Control`.
El registro vive en `site/src/data/controls/families.ts`. Perfil e id no cambian.

Alternativas descartadas: (a) reagrupar los perfiles por familia: rompe ids que otras herramientas
ya usan y obliga a un mapa de ids; (b) derivar la familia de la capa del stack o del perfil: 42 de
los 93 controles están en un mismo perfil y la capa no distingue, por ejemplo, supervisión humana de
contención de agentes.

Referencia externa del enfoque: CSA AICM v1.1 y el AI Risk Mitigation Repository del MIT clasifican
cada control por varios ejes independientes.

### D2. Las 18 familias y sus anclas

Una familia se admite si al menos dos fuentes primarias independientes la tratan como área propia.
Las anclas de la tabla se copian al registro con URL y fecha; las de ISO se verifican en la tarea
2.1.

| # | id | Anclas principales |
|---|---|---|
| 1 | `governance` | ISO/IEC 42001 A.2, A.3; NIST AI RMF GOVERN 1, 2, 4; AICM GRC; Código GPAI, compromiso de responsabilidad |
| 2 | `inventory` | Reglamento de IA arts. 6 y 49; NIST MAP 2; SR 26-2 sección VI (inventario); PRA SS1/23 principio 1 |
| 3 | `risk-and-impact` | ISO/IEC 42001 8.2 a 8.4 y A.5; Reglamento de IA arts. 9 y 27; Convenio marco del CoE art. 16 |
| 4 | `data-and-privacy` | ISO/IEC 42001 A.7; Reglamento de IA art. 10; RGPD; AICM DSP; SAIF Data |
| 5 | `lifecycle-and-change` | ISO/IEC 42001 A.6.1, A.6.2.2 a A.6.2.5; Reglamento de IA art. 17; AICM CCC |
| 6 | `evaluation-and-testing` | ISO/IEC 42001 A.6.2.4; Reglamento de IA art. 15; NIST MEASURE 1 y 2; METR, elementos 6 y 7 |
| 7 | `fairness` | NIST MEASURE 2.11; Reglamento de IA art. 10(2); Convenio del CoE art. 10 |
| 8 | `transparency` | ISO/IEC 42001 A.8; Reglamento de IA arts. 13 y 50; Ley básica de IA de Corea art. 31 |
| 9 | `rights-and-redress` | Reglamento de IA art. 86; Convenio del CoE arts. 14 y 15; Colorado SB26-189; ISO/IEC 42001 A.3.3 |
| 10 | `human-oversight` | Reglamento de IA art. 14; ISO/IEC 42001 A.9; IMDA agentic 2.2; Corea art. 34 |
| 11 | `agent-controls` | IMDA MGF for Agentic AI v1.5; OWASP Agentic ASI01 a ASI10; AICM IAM; SAIF (controles de agentes) |
| 12 | `ai-security` | AICM MDS, TVM, CEK; mitigaciones de MITRE ATLAS; ETSI TS 104 223; METR, elemento 2 |
| 13 | `third-party` | ISO/IEC 42001 A.10; NIST GOVERN 6 y MANAGE 3; AICM STA; Reglamento de IA art. 25 |
| 14 | `monitoring-and-logging` | ISO/IEC 42001 A.6.2.6 y A.6.2.8; Reglamento de IA arts. 12, 26 y 72; AICM LOG |
| 15 | `incidents-and-shutdown` | Reglamento de IA art. 73; ISO/IEC 42001 A.8.4; NIST MANAGE 4; METR, elementos 4 y 5 |
| 16 | `documentation-and-evidence` | Reglamento de IA arts. 11 y 18; ISO/IEC 42001 A.6.2.7 y 9.2; AICM A&A |
| 17 | `literacy-and-use-policy` | Reglamento de IA art. 4; ISO/IEC 42001 A.4.6 y A.9.2; AICM HRS; Convenio del CoE art. 20 |
| 18 | `gpai-and-frontier` | Reglamento de IA arts. 53 y 55; Código GPAI; Corea art. 32; METR, elemento 1 |

Fuera, a propósito: conformidad y registro (arts. 16, 43, 47 a 49) se reparte entre `inventory` y
`documentation-and-evidence`; recursos y sostenibilidad (ISO A.4.2 a A.4.5) y los dominios de
ecosistema del MIT no son controles que una organización aplique a un sistema.

La familia 18 mezcla tema y actor (es de quien provee modelos). Se acepta: sus fuentes (Código GPAI,
marcos de seguridad frontier) no tienen equivalente para otros actores, y `appliesTo` evita que
contamine las demás familias.

### D3. Regla de clasificación

Familia primaria: la que responde a "qué resultado asegura el control", leído en su `objective`. Si
dos familias valen, primaria la más específica (por ejemplo `agent-controls` antes que
`human-oversight` para un punto de aprobación de una llamada de herramienta) y la otra secundaria.
La clasificación de los 93 se hace en una tabla revisable en el PR de la fase 0, no control a
control dentro de cada fichero de perfil: un mapa `id -> {family, secondaryFamilies, appliesTo}` en
`families.ts`, aplicado como hoy hace `withImdaAgentic`. Los perfiles nuevos declaran la familia en
cada control.

### D4. Origen de fuente primaria

`ControlSource.kind` gana el valor `source`, con `ref` igual a la URL de una entrada de
`references` del mismo control. El validador comprueba que resuelve y que la referencia tiene fecha.
La profundidad sigue siendo `derived`; `depthLabels` distingue "de material del sitio" y "de una
fuente primaria" según los orígenes.

Alternativa descartada: una profundidad nueva (`sourced`). Cambiaría un enum que la API, MCP y OSCAL
ya publican, y el requisito "Nivel de especificación declarado" ya cubre el caso con `derivedFrom`.

### D5. Tablas de referencia

- ISO/IEC 42001 Anexo A: completar `iso42001Controls` a 38 filas con título corto propio. iso.org
  responde 403 y el texto es de pago: las 24 filas nuevas entran sin `verified` hasta que alguien
  las coteje con la norma. No se copia texto literal.
- Código GPAI: tabla nueva con las 40 medidas, leída del texto oficial de la Comisión, no de
  `12-codigo-gpai-literal.md` (ese fichero tiene 54 filas y agrupaciones interpretadas; sirve de
  guía, no de fuente).
- CSA AICM v1.1: tabla nueva con id, dominio y URL, leída de las guías de implementación públicas.
  El fichero principal está tras un inicio de sesión y su licencia no consta: solo ids y nombres de
  dominio, sin texto de control.
- Todas las tablas comparten la forma `{ id, title, url, verified? }`, la que ya usa `aiuc1.ts`.

### D6. Salidas

- API: campos aditivos y lista `families` dentro de `/api/v1/controls.json`, sin dataset aparte ni
  cambio de versión.
- OSCAL: `prop` `family`, `secondary-family` y `applies-to` en el mismo `ns` que los actuales.
  Grupos por perfil, sin anidar por familia: OSCAL no permite que un control esté en dos grupos y la
  familia secundaria se perdería.
- MCP: dos parámetros opcionales en la herramienta existente y una salida de familias; se
  regeneran los fixtures de `tools/mcp-server/test/fixtures/api/v1`.

### D7. Fases y tamaño

| Fase | Contenido | Controles nuevos (orientativo) |
|---|---|---|
| 0 | Esquema, familias, clasificación de los 93, tablas, salidas, recuentos | 0 |
| 1 | `gpai-and-frontier-models` | 16 a 20 |
| 2 | `governance-programme` | 20 a 24 |
| 3 | `transparency-rights-and-fairness` | 12 a 16 |
| 4 | `ai-security` | 12 a 14 |

Un PR por fase desde `feat/controls-taxonomy` o ramas hijas; Jordi fusiona. Las fases 1 a 4 solo
añaden datos y `PAGE_META`, y pueden ir en paralelo una vez fusionada la fase 0.

Cada control nuevo se escribe en dos pasos, con personas distintas en cada uno: un worker redacta
desde la fuente leída y un revisor comprueba cada afirmación contra esa fuente antes del PR.

## Risks / Trade-offs

- [Títulos del Anexo A tomados de listas secundarias] → filas sin `verified` y marcadas en la web
  hasta cotejarlas con la norma; ningún control nuevo depende de una fila no verificada como única
  ancla.
- [Reglamento de IA enmendado por el Reglamento 2026/1744; EUR-Lex ilegible el 2026-11-28] →
  la tarea 3.1 relee los artículos citados en la fuente oficial antes de escribir controles que los
  citen; si sigue ilegible, se cita la consolidación del AI Act Service Desk con su fecha.
- [Más volumen de síntesis diluye el dato propio] → amplitud en `derived`, priorizada por lo que las
  herramientas necesitan (fase 1 primero), y recuento mínimo de tres por familia, no un objetivo de
  número total.
- [Clasificación discutible de algunos de los 93] → tabla única y revisable en el PR de la fase 0;
  reclasificar es cambiar una línea y no rompe ids.
- [Fecha de mantenimiento del 2026-12-02 en la página de plazos del AI Act] → ajena a este cambio,
  pero puede romper el CI de estos PR; se avisa a Jordi si ocurre, no se toca aquí.
- [Capa del stack obligatoria en controles organizativos] → se asigna la capa del artefacto de
  evidencia que deja el control, como hacen DEPLOY-001 y AGENT-001.

## Migration Plan

Todo es aditivo. Fase 0 se despliega sola y no cambia ningún id ni URL. Vuelta atrás: revertir el PR
de la fase correspondiente; los ids de un perfil revertido antes de publicarse no quedan ocupados,
los de un perfil ya publicado pasan a `retiredControlIds`.

## Open Questions

- Si Jordi tiene la norma ISO/IEC 42001 para cotejar los 24 títulos. No bloquea: sin ella las filas
  salen como no verificadas.
- Número final de controles por perfil nuevo: lo fija lo que las fuentes sostengan al redactar.
