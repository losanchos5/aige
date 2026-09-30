# Design

## Context

- La fuente es IMDA, *Model AI Governance Framework for Agentic AI* v1.5 (publicado el 2026-05-20,
  actualizado el 2026-06-05; ya existe como `IMDA_AGENTIC` en `site/lib/sources.ts` y como [3] del
  cap. 23). Las notas verificadas están en `aige-wt/handoffs/imda-agentic-notes.md`: §6 tensiones, §8
  huecos y §9 correcciones de página. El texto extraído está en `aige-wt/handoffs/imda-tmp/pages.txt`
  (línea n = página n).
- Regla del repo: un control `derived` reformula material publicado y no añade nada. Por eso la
  sustancia entra primero en el cap. 23 y el control se deriva después.
- Los controles AGENT salen de las semillas `agentControls`, y su id depende de la posición. Por eso
  las semillas nuevas van al final.
- Los controles DEPLOY deben nombrar en `derivedFrom` un patrón o esquema que resuelva
  (`controls-deployment-and-monitoring.spec.ts`), además del capítulo.

## Goals / Non-Goals

**Goals:** cubrir los 16 huecos con 14 controles nuevos y 2 ampliaciones, resolver las dos tensiones
por escrito y mantener verdes `controlProblems()`, los tests y content-lint.

**Non-Goals:** controles `specified` (no llevan verificación ni páginas propias), depósito en Zenodo,
traducciones y capturas de baseline.

## Decisions

### D1. Capítulo 23: dónde entra cada hueco

| Hueco | Sección (anchor) | Qué se añade |
|---|---|---|
| 1 revisión del plan | Where to put a checkpoint (`checkpoint`) | IMDA p.29: en casos complejos, editar el plan antes del «go-ahead»; p.34: registrar el plan para que el usuario lo verifique |
| 11 umbrales del usuario | ídem | IMDA p.47 (y p.29 user-defined): el usuario fija sus propios umbrales además de los de la organización; el gateway los aplica |
| 7 pagos | ídem, tras la tabla | IMDA p.34: protocolos estandarizados de comercio agéntico cuando el agente maneja una transacción; el checkpoint de la clase pay sigue aplicando |
| 2 solicitud legible | What a good approval looks like (`approval`) | Se reescribe la regla 2 («Show the call, not the story»): la llamada exacta en forma breve, nunca un volcado de log (IMDA p.29), más el riesgo y la forma de respuesta (aprobar o rechazar, editar el plan, justificación escrita en alto riesgo) |
| 3 aprobadores outlier | ídem, regla 5 | IMDA p.30: métricas por aprobador y analítica para detectar «outlier» humans |
| 4 agentes que vigilan agentes | An agent incident taxonomy (`incidents`) | IMDA p.30 y p.44: el agente vigilante es un agente gobernado (identidad, alcance, parada propia; no actúa con las herramientas de los vigilados) |
| 5 multiagente | Multi-agent systems (`multiAgent`) | IMDA p.34: mensajes tipados y memoria compartida limitada; p.38: test a nivel de sistema, incluido un agente comprometido |
| 6 secretos | Short-lived, attested credentials (`credentials`) | IMDA p.34: el usuario toma el control para teclear contraseñas o claves de API |
| 8 probar restricciones | The tool allow-list (`allowList`) | IMDA p.38: probar el cumplimiento de políticas y las llamadas con los permisos correctos; el ejemplo propio de IMDA (OpenClaw, p.14) intenta acciones no permitidas |
| 14 threat model | Threats mapped to controls (`threats`) | IMDA p.17: threat modelling con taint tracing, actualizado de forma periódica |
| 15 trazas inmutables | Telemetry (`telemetry`) | IMDA p.44: «cannot be deleted» → trazas append-only dentro de la retención |
| 9, 10, 12, 13, 16 | H2 nuevo «Putting agents in front of people» antes de «What you can do this week» | H3: «Telling people what the agent can do» (p.46-47), «Training users and keeping the manual path» (p.46-47), «Rolling out by users, tools and systems» (p.42), «Named responsibilities» (p.26, p.28), «Learning from use» (p.44, p.47) |

- Tensión AGENT-028: un párrafo en «Prompts as configuration». IMDA p.45 admite una revisión más
  ligera para refinamientos de prompt; el libro no, porque un prompt pequeño puede cambiar el
  comportamiento tanto como uno grande y la suite es barata. IMDA se cita para el control de cambios y
  sus triggers, no para el rigor.
- El caso ilustrativo «In practice» de aprobaciones dice «raw tool call first». Se cambia a «the exact
  tool call first, in one line», coherente con la conciliación.
- La fuente [3] amplía su glosa con las páginas nuevas. Vocabulario: nunca atribuir a IMDA «kill
  switch», «registry», «rollback», «allow-list» o «canary». Los estudios de caso no se citan como texto
  del marco, salvo que se diga explícitamente que son un ejemplo.

### D2. Semillas nuevas (AGENT-032 a 042), en este orden

| # | Seed id | Título | Anchor | Patrón | Amenazas |
|---|---|---|---|---|---|
| 032 | `plan-review` | Plan reviewed before it runs | checkpoint | human-in-the-loop-gate | ASI01 |
| 033 | `approval-request` | Approval requests a person can read | approval | human-in-the-loop-gate | ASI09 |
| 034 | `approver-outliers` | Oversight audited per approver | approval | human-in-the-loop-gate | ASI09 |
| 035 | `monitoring-agents` | Agents that watch agents are governed agents | incidents | runtime-guardrail | (ninguna) |
| 036 | `inter-agent-messages` | Typed messages and limited shared memory between agents | accountability | (ninguno) | ASI07, ASI08 |
| 037 | `user-enters-secrets` | The person types the secrets | credentials | agent-identity-scoped-credentials | ASI03 |
| 038 | `payment-protocols` | Payments on a standard protocol, behind the pay checkpoint | checkpoint | human-in-the-loop-gate | (ninguna) |
| 039 | `restrictions-tested` | Restrictions tested by attempting what is denied | allowList | adversarial-red-team-suite | ASI02 |
| 040 | `user-information` | Users told what the agent may do and whom to call | people | (ninguno) | (ninguna) |
| 041 | `user-thresholds` | User-set approval thresholds | checkpoint | human-in-the-loop-gate | (ninguna) |
| 042 | `agent-threat-model` | A current threat model for every agent | threats | ai-threat-model | (ninguna) |

Las amenazas solo se ponen donde la sección del capítulo ya las nombra. En `agent-runtime.ts`: los
objetivos en `OBJECTIVES`, las derivaciones (failure modes observables del incumplimiento de la regla,
alcance cuando la regla es condicional, capa y punto de aplicación) y ninguna verificación inventada.
Capas: 039 y 042 en la 3 (evaluación y diseño), 034 con secundaria 5 y el resto en la 4.

`agentAnchors` gana `people` (y los H3 que usen las fuentes DEPLOY los resuelve `chapter()` en
`deployment-and-monitoring.ts`). `anchorHeadings` de `agent-runtime.ts` gana su texto.

La semilla `traces` (AGENT-004) añade «kept append-only: no trace is deleted or edited within its
retention». La versión del control pasa a 0.2 mediante un campo `version` opcional en `Derivation`.

### D3. Controles DEPLOY nuevos

| Id | Título | derivedFrom | Capa |
|---|---|---|---|
| DEPLOY-016 | People who work with agents trained, and the manual path kept | chapter `governing-agents` + schema `training-record` | 4 |
| DEPLOY-017 | Monitoring findings and user overrides fed back into evaluation | chapter `governing-agents` + schema `post-market-monitoring-plan` | 5 |
| DEPLOY-018 | Named responsibilities per team for each agent | chapter `governing-agents` + schema `agent-register-entry` | 2 |

DEPLOY-005 añade al objetivo y a las notas el escalonado de agentes por usuarios, herramientas y
sistemas expuestos, con la referencia a la sección nueva del cap. 23 y `derivedFrom` al capítulo
`governing-agents`. El control pasa a la versión 0.2.

### D4. Xrefs IMDA

- Nuevos: `direct` con la página de la tabla D1, salvo AGENT-035, 038 y 039, que son `partial`. En
  035 y 038 la gobernanza del agente vigilante y el checkpoint de pago son añadidos del libro, y en 039
  el intento de acciones prohibidas solo está en el ejemplo propio de IMDA (p.14). Obligación `AIGE-OBL-SG-AGENTIC-CHECKPOINTS`
  en 032, 033 y 041, que son checkpoints.
- AGENT-004: la nota añade la inmutabilidad (p.44).
- DEPLOY-005: sigue `partial` («rollback criteria are not in IMDA») y la nota pasa a decir que las
  tres dimensiones de IMDA ya están en el control.
- AGENT-009: «IMDA p.29 asks for short requests without long logs or raw data; the control shows the
  exact call in short form, which AGENT-033 specifies».
- AGENT-028: «Stricter than IMDA by design: IMDA lets prompt refinements follow lighter review
  (p.45); the control gates every prompt change, since a small prompt edit can change behaviour as
  much as a large one. IMDA is cited for change review and its triggers, not for its strictness».

### D5. Toolkit

Reglas nuevas en `public/toolkit/agent-control-profile.js`:

| Control | Se añade cuando | Razón que muestra |
|---|---|---|
| plan-review | nivel collaborator, consultant o approver | «A person approves steps: let them see and edit the plan first» |
| approval-request | nivel ≥ collaborator (en Operator la persona ejecuta cada acción, así que no hay solicitudes) | «A person approves some of its actions» |
| approver-outliers | nivel approver u observer | «Approvals are logged» |
| monitoring-agents | multiagente interno o externo | «It works alongside other agents» |
| inter-agent-messages | multiagente o memoria compartida | «It exchanges messages or memory with other agents» |
| user-enters-secrets | identidad delegada o token de usuario | «It acts for users» |
| payment-protocols | clase pay | «It makes or approves payments» |
| restrictions-tested | siempre | «Every agent: prove the restrictions hold» |
| user-information | mensajes externos o actúa por usuarios | «People use it» |
| user-thresholds | checkpoint user-defined | «A user-defined approval point is named» |
| agent-threat-model | siempre | «Every agent» |

La tabla de autonomía del capítulo (que los tests comparan con `autonomyLevels`) no cambia.

## Risks / Trade-offs

- **Los ids dependen del orden.** Si una semilla se inserta en medio, se renumeran los controles
  publicados. Mitigación: se añaden al final, y `controls-runtime.spec.ts` congela la lista ordenada
  de las 42 semillas.
- **Sobreatribución a IMDA.** Mitigación: un verificador independiente contrasta cada cita y página
  con `pages.txt`.
- **La extensión del capítulo** supera los 7.000 palabras del spec, que ya estaba desfasado (unas
  8.100). El delta sube el límite.
- **Tests de selección del toolkit con expectativas exactas.** Se actualizan en el mismo commit.
