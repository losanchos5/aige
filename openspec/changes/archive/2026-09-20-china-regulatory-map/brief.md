# Plan: China en el mapa regulatorio (normas CAC, GB/GB-T y TC260 Framework 3.0)

## Contexto

El mapa regulatorio (`bok/08-regulatory-map.md` + `site/src/data/frameworks.ts`) cubre UE, EE. UU.,
Corea, Singapur y Reino Unido; China no aparece en ninguna parte del repo (cero menciones de
China / CAC / TC260 en `bok/`, `site/src`, `THESIS.md`, `sources/SOURCES.md`). Los borradores de
issue `01-china-regulatory-rows.md` y `03-reading-list-apac-sources.md` y la línea 67 de
`PENDIENTE.md` registran el hueco. El TC260 publicó el 2026-09-14 el «AI Safety Governance
Framework 3.0», cuyo Apéndice 2 es un marco de gestión de riesgos de agentes que encaja con las
capas 2–5 de la tesis. Este plan cierra el hueco con dos niveles claramente separados (normas
vinculantes vs. guía voluntaria), cita solo lo abierto en fuente oficial y cruza el Apéndice 2 con
las filas agénticas existentes (OWASP Agentic Top 10, NIST AI Agent Standards).

Decisión ya tomada por Jordi: **sí a OpenSpec** (`openspec init --tools claude --language es`,
flujo `/opsx:propose` → `/opsx:apply` → `/opsx:archive`). Este fichero es el brief del `propose`.

## 1. Hechos verificados (base de todas las filas)

Verificado en esta sesión por subagentes (Opus 4.8): PDF del marco 3.0 extraído con `pdftotext`
(scratchpad `…/scratchpad/tc260/framework3.pdf`, 136 pp., impresa = física − 5, inglés impresas
49–130); páginas oficiales abiertas en cac.gov.cn / std.samr.gov.cn / openstd.samr.gov.cn.

| Instrumento | Naturaleza | Promulgado | En vigor | URL oficial abierta | Tag |
|---|---|---|---|---|---|
| 互联网信息服务算法推荐管理规定: Provisions on Algorithmic Recommendation (CAC, MIIT, MPS, SAMR, Order No. 9) | Vinculante (部门规章) | 2021-12-31 (pub. 2022-01-04) | **2022-03-01** | https://www.cac.gov.cn/2022-01/04/c_1642894606364259.htm | primary |
| 互联网信息服务深度合成管理规定: Provisions on Deep Synthesis (CAC, MIIT, MPS, Order No. 12) | Vinculante | 2022-11-25 (pub. 2022-12-11) | **2023-01-10** | https://www.cac.gov.cn/2022-12/11/c_1672221949354811.htm | primary |
| 生成式人工智能服务管理暂行办法: Interim Measures for Generative AI Services (CAC + 6 organismos, Order No. 15) | Vinculante (interim) | pub. 2023-07-13 (fecha de firma no legible) | **2023-08-15**; solo servicios «al público dentro de la RPC» (art. 2) | https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm | primary |
| 人工智能生成合成内容标识办法: Measures for Labelling AI-Generated Synthetic Content (CAC, MIIT, MPS, NRTA; 通知, no 令) | Vinculante | pub. 2025-03-14 | **2025-09-01** | https://www.cac.gov.cn/2025-03/14/c_1743654684782215.htm | primary |
| GB 45438-2025 网络安全技术 人工智能生成合成内容标识方法 | **GB obligatoria** (强制性) | 2025-02-28 | 2025-09-01 | https://std.samr.gov.cn/gb/search/gbDetailed?id=301E0388CB75788DE06397BE0A0AE1B4 | primary |
| GB/T 45654-2025 网络安全技术 生成式人工智能服务安全基本要求 | **GB/T recomendada** (voluntaria) | 2025-04-25 | 2025-11-01 | https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=F67D3F376E0A0A0FF5317FB36B32A30A | primary |
| 网络安全法 enmendada (NPCSC, decisión de 2025-10-28), nuevo **art. 20** sobre IA (programático: apoyo a I+D, infraestructura de datos/cómputo, ética, «风险监测评估和安全监管») | Ley nacional | 2025-10-28 | 2026-01-01 | https://www.cac.gov.cn/2025-12/29/c_1768735112911946.htm (texto consolidado CAC; npc.gov.cn inaccesible por SSL) | primary |
| 人工智能拟人化互动服务管理暂行办法: Interim Measures for Anthropomorphic Interaction Services (CAC, NDRC, MIIT, MPS, SAMR) | Vinculante (interim) | 2026-04-10 | 2026-07-15 | https://www.cac.gov.cn/2026-04/10/c_1777558395078289.htm | primary |
| TC260 AI Safety Governance Framework 3.0 (bajo guía de la CAC; documento técnico del TC260) | **Voluntario** («reference for developers, providers and users», p. 113/126; ninguna frase «voluntary» en el texto) | 2026-09-14 | n/a | Anuncio https://www.cac.gov.cn/2026-09/14/c_1791137092283345.htm · PDF https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf | primary |
| Post de Barbara Li (Reed Smith) | Post personal LinkedIn (~2026-09-16) | n/a | n/a | https://www.linkedin.com/posts/barbara-li-67532067_tc260-ai-governance-share-7505863215600308224-XIyo/ | reported |

Confirmado en el PDF (inglés): **no cita ISO/IEC 42001, 23894, NIST AI RMF ni AI Act** (cero hits
por palabra entera; solo ONU, WAICO, APEC/G20/SCO/BRICS y la Global AI Governance Initiative);
tampoco nombra ninguna norma china vinculante. Sin umbral numérico de cómputo/parámetros (Apéndice
1 gradúa por escenario, nivel de inteligencia y escala). Open-source como perfil distinto (§2.1.1(b)
p. 55; §4.4.4 p. 92; §5.1.14 p. 98). «Computing power safety risks» §2.1.4(a) p. 59. §5.3.6 p. 102:
«Logs should be retained for at least six months and audited regularly». §2 llama al tercer bloque
«secondary» y §3.3 «derivative» (usar «secondary» al describir la taxonomía).

Apéndice 2 (impresas 113–126): 9 fases de riesgo (design & development, installation & deployment,
instruction input, reasoning & planning, tool invocation & execution, memory storage, output,
decommissioning, other) con 28 riesgos; 7 grupos de medidas: II.1 pre-deployment (security
requirements, risk grading, control strategies, validation), II.2 identity & access (identidad
única por agente, permisos por modo de decisión «decisions reserved exclusively for the user,
decisions requiring user authorization, and decisions that may be made autonomously by the agent»,
credenciales revocadas al terminar), II.3 human approval (tiered controls, checkpoints, «Retention
of human approval logs … tamper-proof and verifiable», deny-by-default), II.4 supply chain & tools
(verificación de versión/descripción/metadatos, fair tool selection, anomaly detection, skill
management), II.5 dynamic runtime (input control; «issuing alerts, imposing restrictions,
intercepting, suspending, or terminating»; memoria «enforcing memory isolation across users and
tasks. Credentials and secret keys shall not, in principle, be stored in memory»; comunicación con
autenticación mutua y resistencia a replay; límites de pasos/frecuencia/duración; sandbox/container
isolation), II.6 monitoring & auditing (anomaly blocking, data management incl. localización,
log management, security auditing, sandbox validation, red teaming, emergency response, «Security
validation for major changes»), II.7 decommissioning (complete service shutdown, essential data
backup, deployment environment cleanup). No hay tabla riesgo↔medida en el Apéndice 2.

## 2. Qué entra, con qué categoría; qué queda fuera

**Filas de tabla (7):**
- Vinculantes (4): Algorithmic Recommendation · Deep Synthesis · GenAI Interim Measures · Labelling
  Measures + GB 45438-2025 (una fila conjunta: la norma obligatoria es el mecanismo de la medida).
- Voluntarias (3): GB/T 45654-2025 · TC260 Framework 3.0 (fila general, con §5.3 operación) ·
  TC260 Framework 3.0 **Apéndice 2** (fila propia, es la que cruza con OWASP/NIST).

**Solo en prosa, con cita, sin fila:** Cybersecurity Law art. 20 (programático, no crea deber de
operador; nada que mapear a artefacto) [49]; Anthropomorphic Interaction Measures (vinculante y en
vigor 2026-07-15, pero de ámbito estrecho (servicios de compañía) y fuera de tu lista; una frase para
que el mapa no calle sobre una norma vinculante vigente) [50]; post de Barbara Li [51] (como
«reported», en la frase sobre la recepción del 3.0).

**Fuera, y por qué:**
- GB/T 45958-2025 (AI computing platform security framework; emitida 2025-08-01, implantación
  2026-02-01): estándar de plataforma, no obligación→artefacto distinta de ETSI EN 304 223. Candidata
  a fila futura.
- TC260-TR-005-2026 (informe de investigación sobre estandarización de agentes) y la norma
  《智能体应用安全基本要求》 «en elaboración»: no abiertos (solo secundarias); no se citan.
- «AI Plus» (国务院 opinion, 2025-08-26) y borrador sobre menores (2026-09-18, en consulta): política
  programática / borrador; sin obligación de operador.
- Framework 1.0 (2024-09-09) y 2.0 (2025-09-15): se mencionan como linaje citando el propio 3.0 (p. 50
  «building on … 1.0 (2024) and … 2.0 (2025)»), sin filas ni fuentes propias.
- Linaje GB/T 45654 ← TC260-003 (2024): solo confirmado vía comentario del TC260 (secondary); se omite.
- La cifra «5 %» de corpus ilegal de GB/T 45654: no se usa (no abierta en el texto de la norma).
- **THESIS.md / THESIS.es.md: sin cambios.** La tesis no nombra jurisdicciones concretas y sus
  afirmaciones son sobre las cinco capas; el mapa es el cap. 08. No hay motivo para subir versión.

## 3. Cambios de contenido (bok/ y sources/)

### 3.1 `bok/08-regulatory-map.md`

Numeración del capítulo: última cita [40] → nuevas **[41]–[51]** (locales al capítulo).

| n | Fuente (formato §6: Title. Publisher. Date. URL (verified: tag)) |
|---|---|
| 41 | 《人工智能安全治理框架3.0》发布: announcement of the AI Safety Governance Framework 3.0 (TC260 under CAC guidance; released 2026-09-14 at the 2026 National Cybersecurity Publicity Week). Cyberspace Administration of China. 2026-09-14. anuncio (primary) |
| 42 | AI Safety Governance Framework 3.0 (人工智能安全治理框架3.0), bilingual PDF; English text printed pp. 49–130; §2.1.1(b) open-source models p. 55; §2.1.4(a) computing power p. 59; §5.3 operators' guidelines pp. 101–104; Appendix 2 agentic AI risk management pp. 113–126; no reference to ISO/IEC 42001, NIST AI RMF or the EU AI Act. TC260 / CAC. 2026-09-14. PDF (primary) |
| 43 | Provisions on the Administration of Algorithmic Recommendation in Internet Information Services (互联网信息服务算法推荐管理规定; CAC, MIIT, MPS and SAMR Order No. 9; promulgated 2021-12-31; in force 2022-03-01; Art. 17 opt-out, Art. 24 algorithm filing, Art. 27 security assessment). Cyberspace Administration of China. 2022-01-04. URL (primary) |
| 44 | Provisions on the Administration of Deep Synthesis in Internet Information Services (互联网信息服务深度合成管理规定; CAC, MIIT and MPS Order No. 12; promulgated 2022-11-25; in force 2023-01-10; Arts. 14 training data and separate consent, 16–17 marks and labels, 19 filing, 15/20 security assessment). Cyberspace Administration of China. 2022-12-11. URL (primary) |
| 45 | Interim Measures for the Administration of Generative AI Services (生成式人工智能服务管理暂行办法; CAC and six other bodies, Order No. 15; published 2023-07-13; in force 2023-08-15; Art. 2 scope: services to the public within the PRC; Art. 7 lawful-source data; Art. 12 labelling; Art. 14 stop-remove-retrain-report; Art. 17 security assessment and filing). Cyberspace Administration of China. 2023-07-13. URL (primary) |
| 46 | Measures for Labelling AI-Generated Synthetic Content (人工智能生成合成内容标识办法; CAC, MIIT, MPS and NRTA; published 2025-03-14; in force 2025-09-01; explicit and implicit labels; platform verification duty). Cyberspace Administration of China. 2025-03-14. URL (primary) |
| 47 | GB 45438-2025 Cybersecurity technology: Labeling method for content generated by artificial intelligence (网络安全技术 人工智能生成合成内容标识方法; mandatory national standard; issued 2025-02-28; implemented 2025-09-01). SAMR / SAC (drafted by TC260). 2025-02-28. URL (primary) |
| 48 | GB/T 45654-2025 Cybersecurity technology: Basic security requirements for generative artificial intelligence service (网络安全技术 生成式人工智能服务安全基本要求; recommended national standard; issued 2025-04-25; implemented 2025-11-01). SAMR / SAC (drafted by TC260). 2025-04-25. URL (primary) |
| 49 | Cybersecurity Law of the PRC as amended by the NPC Standing Committee decision of 2025-10-28 (in force 2026-01-01; new Article 20 on AI: state support for AI research, training-data and computing infrastructure, AI ethics norms, risk monitoring, assessment and safety supervision). Cyberspace Administration of China (consolidated text). 2025-12-29. URL (primary) |
| 50 | Interim Measures for the Administration of Anthropomorphic Interaction Services (人工智能拟人化互动服务管理暂行办法; CAC, NDRC, MIIT, MPS and SAMR; published 2026-04-10; in force 2026-07-15). Cyberspace Administration of China. 2026-04-10. URL (primary) |
| 51 | "China's TC260 released Version 3.0 of the AI Safety Governance Framework" (LinkedIn post; agents and physically interactive systems as the headline change). Barbara Li (Reed Smith). 2026-09. URL (reported) |

**Nueva subsección `### China`** dentro de `## Other jurisdictions`, después de `### United
Kingdom`, con esta estructura (prosa en inglés, 12–18 líneas, mismo tono que la subsección UK):

1. Dos niveles. Vinculante: reglas departamentales de la CAC con co-emisores (2022–2025), ámbito
   territorial (la GenAI Measures solo para servicios «to the public within the PRC»), y la norma
   obligatoria GB 45438-2025 [43][44][45][46][47]. Voluntario: GB/T 45654-2025 [48] y el marco del
   TC260 [41][42].
2. La Cybersecurity Law enmendada (adoptada 2025-10-28, en vigor 2026-01-01) añade un artículo 20
   programático sobre IA que no crea por sí mismo deberes de operador [49]. La regla vinculante más
   reciente, las Anthropomorphic Interaction Measures (en vigor 2026-07-15), no se mapea en esta
   edición [50].
3. El marco 3.0: documento técnico del TC260 bajo guía de la CAC, «a reference for developers,
   providers and users»; taxonomía en tres bloques (inherent / application / secondary); gradúa el
   riesgo cualitativamente (escenario, nivel de inteligencia, escala) sin umbral de cómputo ni de
   parámetros; trata los modelos open-source como perfil de riesgo distinto (mecanismos de seguridad
   eliminables; deber de informar a quien descarga); nombra la seguridad de la capacidad de cómputo
   como categoría de riesgo; su Apéndice 2 recorre el ciclo de vida del agente desde el diseño hasta
   el desmantelamiento [42]. La recepción entre profesionales situó, según se reportó, a los agentes
   y los sistemas con interacción física como el cambio de cabecera [51] (la frase debe decir
   «reported»).
4. Tabla (misma forma que la de «Other jurisdictions», columna de estado con fecha):

```
| Jurisdiction / instrument | Status (as of 2026-09-20) | What it asks for | Engineering artefact | Layer |
|---|---|---|---|---|
| China: Provisions on the Administration of Algorithmic Recommendation in Internet Information Services (CAC, MIIT, MPS and SAMR Order No. 9) | Binding; in force 2022-03-01 [43] | Algorithm filing for services with public-opinion attributes or social-mobilisation capacity, security assessment, display of the filing number, and a user option to switch off personalised recommendation | Algorithm inventory with filing record and number; security-assessment evidence pack; opt-out control at runtime | 1 · 2 · 4 |
| China: Provisions on the Administration of Deep Synthesis in Internet Information Services (CAC, MIIT and MPS Order No. 12) | Binding; in force 2023-01-10 [44] | Conspicuous labels where synthetic content could mislead the public and non-removable technical marks; training-data management; separate consent for face and voice editing; filing and security assessment for opinion-shaping functions | Content-provenance pipeline (visible label plus metadata mark); training-data governance record; consent gate; pre-release security assessment | 2 · 3 · 4 |
| China: Interim Measures for the Administration of Generative AI Services (CAC and six other bodies, Order No. 15) | Binding; in force 2023-08-15; applies to services offered to the public within the PRC [45] | Lawful-source training data and foundation models; content labelling under the deep-synthesis rules; security assessment and algorithm filing for opinion-shaping services; stop, remove, retrain and report on illegal content | Data-lineage and licensing record; eval gate on generated content; incident pipeline with a retraining loop; filing record | 2 · 3 · 4 · 5 |
| China: Measures for Labelling AI-Generated Synthetic Content, with mandatory standard GB 45438-2025 | Binding; in force 2025-09-01, the standard implemented the same day [46][47] | Explicit labels (text, audio or graphic) and implicit metadata labels carrying the provider's name or code and a content number; distribution platforms verify metadata and flag suspected AI content | Provenance and watermarking pipeline emitting the GB 45438 metadata fields; platform-side detection and flagging | 3 · 4 |
| China: GB/T 45654-2025 Basic security requirements for generative AI services | Recommended (voluntary) national standard; implemented 2025-11-01 [48] | Training-corpus source and content screening, model-safety requirements and the evaluation methods that underpin the security assessment | Corpus-screening record; eval question banks; security-assessment report | 3 · 5 |
| China: TC260 AI Safety Governance Framework 3.0 | Voluntary; published 2026-09-14, building on 1.0 (2024) and 2.0 (2025) [41][42] | A three-block risk taxonomy (inherent, application, secondary), technological and governance countermeasures and role-based guidelines; operators keep logs for at least six months and audit them, monitor risk in real time, keep a traceable chain of responsibility and assess resilience (§5.3) | Risk register keyed to the framework's taxonomy; log-retention policy (six months) with audit; real-time risk monitoring; resilience assessment | 1 · 4 · 5 |
| China: TC260 Framework 3.0, Appendix 2 (agentic AI risk management) | Voluntary; published 2026-09-14 [42] | Unique identity and least-privilege permissions per agent by decision mode; human checkpoints with tamper-proof approval logs and deny-by-default; tool and skill verification; runtime guardrails (alert, restrict, intercept, suspend, terminate); memory isolation with no credentials in memory; mutual authentication; sandbox validation, red teaming and re-validation on major change; controlled decommissioning | Agent registry with identity and scope; approval-log store; tool allow-list with integrity checks; runtime guardrails and kill switch; memory-scope policy; decommissioning runbook | 2 · 3 · 4 · 5 |
```

5. Cruce de las tres fuentes agénticas (frase de entrada + tabla). Los nombres ASI deben
   confirmarse abriendo [16] (https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/);
   si alguno no coincide, usar el ID con el nombre oficial. NIST según [29] (ya en el capítulo).

```
| Agent control | TC260 Framework 3.0, Appendix 2 [42] | OWASP Top 10 for Agentic Applications 2026 [16] | NIST AI Agent Standards Initiative [29] | Layer |
|---|---|---|---|---|
| Identity and least privilege | II.2: unique identity per agent, permissions by decision mode, credentials revoked at task end | ASI03 Identity and Privilege Abuse | Agent identity, authentication, authorisation | 2 · 4 |
| Human checkpoints and approval logs | II.3: tiered controls, human control checkpoints, tamper-proof approval logs, deny by default | ASI09 Human-Agent Trust Exploitation; ASI01 Agent Goal Hijack | n/a | 4 · 5 |
| Tools, skills and supply chain | II.4: tool verification, fair tool selection, anomaly detection, skill management | ASI02 Tool Misuse and Exploitation; ASI04 Agentic Supply Chain Vulnerabilities | Agent security | 2 · 4 |
| Runtime guardrails and execution limits | II.5(1)(2)(5)(6): input control, guardrails, step/frequency/duration limits, sandbox isolation | ASI01 Agent Goal Hijack; ASI05 Unexpected Code Execution; ASI08 Cascading Failures; ASI10 Rogue Agents | n/a | 4 |
| Memory | II.5(3): retention windows, isolation across users and tasks, no credentials in memory | ASI06 Memory and Context Poisoning | n/a | 3 · 4 |
| Agent–model–tool communication | II.5(4): mutual authentication, integrity, replay resistance | ASI07 Insecure Inter-Agent Communication | Authentication | 4 |
| Monitoring, audit, sandbox, red teaming, incident response | II.6: anomaly blocking, log management, security auditing, sandbox validation, red teaming, emergency plans, re-validation on major change | Cross-cutting | Adversarial agent evals | 3 · 5 |
| Decommissioning | II.7: complete shutdown, data backup, environment cleanup | ASI10 Rogue Agents (residual agents) | n/a | 2 · 4 |
```

6. Cierre de la subsección: «Mappings are illustrative, not a claim of conformity.»

**`## What is NOT harmonised yet`**: añadir un bullet tras el del Code of Practice:

```
- **China's framework does not cross-reference the Western instruments.** The TC260 AI Safety
  Governance Framework 3.0 cites no ISO/IEC 42001, ISO/IEC 23894, NIST AI RMF or EU AI Act (its
  named reference points are the Global AI Governance Initiative and UN-centred channels) and it
  does not name China's own binding rules either [42]. A crosswalk between the two stacks is
  something the engineer builds; neither side's documents supply it.
```

La tabla existente de «Other jurisdictions» y su sello «as of 2026-09-19» **no se tocan** (no se
han re-verificado esas filas). La línea «Maps to» del capítulo ya dice «the other jurisdictions
named above»; sin cambios.

### 3.2 `sources/SOURCES.md`

Sección `### bok/08-regulatory-map.md`: filas **41–51** (columnas `# | Claim | Source | Publisher |
Date | URL | Verified | Used in`), «Source» con el título chino, «Used in» = `Reg. map (China)`.
Sección `### bok/09-glossary.md`: las filas que exijan las dos entradas nuevas del glosario (ver
3.4), numeradas a continuación de la última cita de `bok/09-glossary.md`. Editar solo con `Edit`
por sección (dos subagentes tocan este fichero en secciones distintas; releer antes de cada edit,
nunca reescribir el fichero entero).

### 3.3 `bok/10-reading-list.md`: sección «Regulation and standards»

Siete bullets con la gramática exacta de `parseAnnotatedList` (`- **Title**: note. \`https://…\`
(verified: tag)`; continuación indentada; línea en blanco solo al final de la lista):

```
- **AI Safety Governance Framework 3.0 (TC260, under CAC guidance)**: China's voluntary framework,
  bilingual PDF; Appendix 2 is the agentic AI risk-management framework (identity, human checkpoints,
  guardrails, memory, decommissioning). `https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf`
  (verified: primary)
- **Interim Measures for the Administration of Generative AI Services**: China's binding rule for
  generative AI offered to the public within the PRC, in force 2023-08-15; official Chinese text.
  `https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm` (verified: primary)
- **Provisions on the Administration of Deep Synthesis in Internet Information Services**: labelling,
  training-data and consent duties for deep synthesis, in force 2023-01-10; official Chinese text.
  `https://www.cac.gov.cn/2022-12/11/c_1672221949354811.htm` (verified: primary)
- **Provisions on the Administration of Algorithmic Recommendation in Internet Information Services**:
  algorithm filing, security assessment and user opt-out, in force 2022-03-01; official Chinese text.
  `https://www.cac.gov.cn/2022-01/04/c_1642894606364259.htm` (verified: primary)
- **Measures for Labelling AI-Generated Synthetic Content**: explicit and implicit labels, in force
  2025-09-01 alongside the mandatory standard GB 45438-2025; official Chinese text.
  `https://www.cac.gov.cn/2025-03/14/c_1743654684782215.htm` (verified: primary)
- **South Korea AI Basic Act**: the framework Act in force 2026-01-22, with heightened duties for
  high-impact AI; the source chapter 08 already cites. `https://www.trade.gov/market-intelligence/south-korea-ai-basic-act`
  (verified: secondary)
- **Model AI Governance Framework for Generative AI (IMDA / AI Verify Foundation)**: Singapore's
  voluntary framework (May 2024): testing, transparency, incident reporting, security and content
  provenance. `https://aiverifyfoundation.sg/wp-content/uploads/2024/05/Model-AI-Governance-Framework-for-Generative-AI-May-2024-1-1.pdf`
  (verified: primary)
```

Corea y Singapur reutilizan las filas [34] y [39] de SOURCES.md (§6: no re-verificar). Los bullets
del reading list no llevan `[n]`; solo si `sources/SOURCES.md` tiene sección para `bok/10` con
filas espejo de los bullets se añaden filas allí (comprobar la convención antes).

### 3.4 `bok/09-glossary.md` (issue 02 pide formato `**Term.** definición (ch. NN)`)

Dos entradas en posición alfabética, con cita `[n]` local al capítulo y fila en SOURCES.md
(sección ch. 09), reutilizando las URLs de [41]/[42]:

```
**CAC (Cyberspace Administration of China).** China's internet regulator (国家互联网信息办公室),
lead issuer of the binding AI rules (algorithmic recommendation, deep synthesis, generative AI
services and AI-content labelling) and the body under whose guidance TC260 publishes the AI Safety
Governance Framework [n]. (ch. 08)

**TC260.** The National Technical Committee 260 on Cybersecurity of the Standardization
Administration of China (全国网络安全标准化技术委员会), which drafts China's cybersecurity and AI
national standards (GB and GB/T) and publishes the voluntary AI Safety Governance Framework (1.0 in
2024, 2.0 in 2025, 3.0 on 14 September 2026) [n]. (ch. 08)
```

Comprobar que `site/src/lib/rehype-glossary.ts` enlaza «CAC» solo por palabra entera (término de
tres letras). Los otros términos de la issue 02 (Attestation, Prompt injection, Human-in-the-loop)
quedan fuera; la issue 02 permanece.

### 3.5 Otros ficheros de documentación

- `bok/CHANGELOG.md`: entrada con fecha 2026-09-20 siguiendo el formato existente (la de Corea está
  en la línea ~25).
- `.github/ISSUE_DRAFTS/01-china-regulatory-rows.md`: **retirar** (borrar; criterios cumplidos).
- `.github/ISSUE_DRAFTS/03-reading-list-apac-sources.md`: **retirar** (Corea, Singapur y China
  añadidos). Si hay un índice/README en `.github/ISSUE_DRAFTS/`, actualizarlo.
- `PENDIENTE.md` línea 67: quitar «China (solo fuentes secundarias encontradas), » del bullet,
  dejando GDPR Art. 22 y sectoriales; si el fichero tiene convención de «hecho», anotar ahí «China:
  cap. 08 + catálogo, 2026-09-20».

## 4. Cambios en el sitio

### 4.1 `site/src/data/frameworks.ts`

Seis entradas nuevas en `frameworks[]` (tras `sg-genai-framework`, antes de `etsi-en-304-223`),
misma forma que las de Corea/Singapur/UK. Todos los `issuer` terminan en `(China)` (lo usa
`bandOf`). Resúmenes fieles al capítulo:

Ids acordados con la sesión paralela del crosswalk (ella los consumirá desde `crosswalk.ts`):

| id | name | short | type | issuer | url |
|---|---|---|---|---|---|
| `cn-algo-recommendation` | China Provisions on Algorithmic Recommendation (2022) | China Algo. Rec. | law | CAC, MIIT, MPS and SAMR (China) | [43] |
| `cn-deep-synthesis` | China Provisions on Deep Synthesis (2023) | China Deep Synthesis | law | CAC, MIIT and MPS (China) | [44] |
| `cn-genai-measures` | China Interim Measures for Generative AI Services (2023) | China GenAI Measures | law | CAC and six other bodies (China) | [45] |
| `cn-content-labelling` | China Measures for Labelling AI-Generated Synthetic Content (2025) | China AI Labelling | law | CAC, MIIT, MPS and NRTA (China) | [46] |
| `cn-gbt-45654` | GB/T 45654-2025 Basic security requirements for generative AI services | GB/T 45654 | standard | SAMR / SAC, drafted by TC260 (China) | [48] |
| `cn-tc260-framework` | TC260 AI Safety Governance Framework 3.0 | TC260 Framework 3.0 | framework | TC260 under CAC guidance (China) | [42] (PDF) |

`summary` de cada una: una o dos frases con naturaleza, fecha en vigor y las obligaciones de la
fila del capítulo (p. ej. TC260: «China's voluntary AI safety governance framework (14 September
2026, building on 1.0 in 2024 and 2.0 in 2025): a three-block risk taxonomy, technological and
governance countermeasures and role-based guidelines. Appendix 2 is an agentic AI risk-management
framework covering identity, human checkpoints, tool control, runtime guardrails, memory, auditing
and decommissioning.»).

Siete filas en `obligations[]` como grupo propio `framework: 'China'`, con constante nueva
`const CHINA_ANCHOR = 'china'` (el test `data.spec.ts` exige que el anchor sea un heading real del
cap. 08; `getHeadings` acepta cualquier nivel, y `### China` sluggea a `china`), insertadas justo
después del grupo `// Other jurisdictions`. `obligation` / `artefact` / `layerN` copian la
tabla del capítulo (§3.1, punto 4): p. ej. `'Provisions on Algorithmic Recommendation (in force
2022-03-01)'` → `[1, 2, 4]`; `'TC260 AI Safety Governance Framework 3.0: operators' guidelines
§5.3 (voluntary; 2026-09-14)'` → `[1, 4, 5]`; `'TC260 Framework 3.0 Appendix 2: agentic AI risk
management (voluntary; 2026-09-14)'` → `[2, 3, 4, 5]`. Sin `dutyHolder`/`applies` (solo los usa el
grupo EU AI Act).

### 4.2 `site/src/components/ObligationMatrix.astro`

- `resolveFwId`: rama nueva para `framework === 'China'` que resuelva por texto de `obligation`:
  `/algorithmic recommendation/i` → `cn-algo-recommendation`; `/deep synthesis/i` →
  `cn-deep-synthesis`; `/45654/` → `cn-gbt-45654` (antes que la de GenAI, porque su título también
  dice «generative AI services»); `/generative ai services/i` → `cn-genai-measures`;
  `/45438|labelling/i` → `cn-content-labelling`; `/tc260|framework 3\.0/i` →
  `cn-tc260-framework`. Sin esto las filas caerían en `uk-duaa`.
- `bandOf`: `issuer.endsWith('(China)')` → banda `'Asia-Pacific'` (junto a Corea y Singapur).
- `ObligationTable.astro`, `FrameworkTable.astro`, `obligations.csv.ts` / `.json.ts` y
  `resources/index.astro` consumen los datos sin cambios.

### 4.3 Tests y baselines

- `site/tests/data.spec.ts` ya cubre: anchor existente, `layerN` no vacío, URL https, glosario ≥ 50,
  reading list https. Si `resources.spec.ts` u otro fija recuentos exactos de frameworks/bandas,
  ajustar solo ese número y decirlo.
- Baselines visuales afectadas (regenerar solo estas): `E/frameworks-1440-light`, `E/frameworks-390-light`,
  `E/reading-list-1440-light`, `E/reading-list-390-light`, `E/glossary-1440-{light,dark}`,
  `E/glossary-390-light`, `G/frameworks-{light,dark}`, `G/glossary-{light,dark}`.
- Nada de texto con opacidad reducida (puertas de contraste axe). Sin CSP que actualizar; lhci no
  audita `/resources/frameworks` ni `/resources/reading-list` (sí `/resources/glossary`).

## 5. Proceso (OpenSpec + enrutado de modelos)

1. **Fable**: `git checkout -b feat/china-regulatory-map` desde `main`; `openspec init --tools
   claude --language es`; commit `chore: init OpenSpec`.
2. **Fable**: `/opsx:propose china-regulatory-map` con este fichero como brief → `proposal.md`,
   `design.md`, `specs/`, `tasks.md` (las tareas son los bloques A–D de abajo).
3. **`/opsx:apply`**: Fable delega, sin pasar `model`, a `implementador` (Opus 4.8), prompts
   autocontenidos con ruta a este plan y al PDF del scratchpad. Los subagentes **no hacen commit**.
   - **Bloque A** (paralelo): `bok/08-regulatory-map.md` (subsección China, tablas, bullet NOT
     harmonised, Sources [41]–[51]) + filas 41–51 en `sources/SOURCES.md` + `bok/CHANGELOG.md`.
   - **Bloque B** (paralelo): `bok/10-reading-list.md` (7 bullets) + `bok/09-glossary.md` (CAC,
     TC260) + filas de glosario en `sources/SOURCES.md` (sección ch. 09) + comprobación de
     `rehype-glossary` con «CAC».
   - **Bloque C** (paralelo): `frameworks.ts` + `ObligationMatrix.astro`; `npm run build` y
     `npm test` (default) en verde; sin tocar baselines.
   - **Bloque D** (tras A–C): `npm run build` → `npm test` → regenerar solo las baselines listadas en
     4.3 → `npm run test:visual` → `npm run test:a11y` → `npm run lhci` (último; borra
     `dist/pagefind`) → retirar issue drafts 01 y 03 y editar `PENDIENTE.md` → `code-reviewer`
     (`model: "sonnet"`) sobre el diff del sitio.
4. **Fable verifica** (ligero): `git diff --stat`; grep de `[41]`…`[51]` en cap. 08 y filas 41–51
   en SOURCES.md; que `getReadingList()` y el glosario parsean (tests); que la matriz muestra la banda
   Asia-Pacific con 6 filas chinas (grep del HTML construido en `dist/resources/frameworks/index.html`);
   salida real de build/test/lhci.
5. **Fable commits** por tipo: `docs(bok): China in the regulatory map. CAC rules, GB standards
   and TC260 Framework 3.0` · `docs(bok): China, Korea and Singapore in the reading list; CAC and
   TC260 in the glossary` · `feat(site): China group in the frameworks catalogue and obligation
   matrix` · `test(site): regenerate visual baselines for frameworks, reading list and glossary` ·
   `chore: retire China issue drafts and update PENDIENTE`. Sin líneas de atribución (regla global
   de Jordi). Sin push ni PR salvo que Jordi lo pida.
6. `/opsx:archive`; actualizar la memoria `tc260-ai-safety-governance-framework-3.md` con las
   fechas verificadas y lo que quedó fuera.

## 5bis. Coordinación con la sesión paralela «governance-theme-crosswalk»

Otra sesión de Claude trabaja en el mismo árbol (`/resources/crosswalk`) y también iba a añadir
China. Acordado por mensaje entre sesiones (2026-09-20):

- **Yo (esta sesión) poseo**: `frameworks.ts`, `ObligationMatrix.astro`, `bok/08`, `SOURCES.md`,
  `CHANGELOG.md`, `bok/09`, `bok/10`, issue drafts, `PENDIENTE.md`. Ella no los toca y consume mis
  ids (`cn-algo-recommendation`, `cn-deep-synthesis`, `cn-genai-measures`, `cn-content-labelling`,
  `cn-gbt-45654`, `cn-tc260-framework`) y el anchor `china`.
- **Ella posee**: `crosswalk.ts`, `crosswalk.astro`, `CrosswalkMatrix/Drawer`, `public/crosswalk.js`,
  `crosswalk.css`, `crosswalk.json.ts/.csv.ts`, `resources/index.astro`, `resources/frameworks.astro`
  (línea xref), `ObligationTable.astro` (ids de fila), `lighthouserc.cjs`, `tests/resources.spec.ts`,
  `tests/v3.spec.ts`, `tests/data.spec.ts` (sus tests). No los toco; si un recuento en
  `v3.spec.ts` rompe por mis 6 frameworks / 7 obligaciones, le aviso antes de cambiarlo.
- **Ventana de build/Playwright** (puerto 4321): le aviso por mensaje antes de abrir el bloque D y
  al cerrarlo; ella no ejecuta build/Playwright mientras tanto. Quien aterrice el último en la
  página `/resources/frameworks` regenera otra vez las baselines `frameworks-*`.
- Commits solo de mis rutas; nunca sus capturas regeneradas (regla de memoria
  `aige-site-parallel-sessions-verification`).

## 6. Verificación end-to-end y criterio de «hecho»

- `npm run build` verde (incluye `astro check`, `lint:content`, `check:links`).
- `npm test` verde; `test:visual` verde con solo las baselines de 4.3 regeneradas; `test:a11y`
  verde; `lhci` verde.
- Cada `[n]` nuevo del cap. 08 y del glosario tiene fila en SOURCES.md con tag `primary` salvo [51]
  (`reported`); la frase que usa [51] dice «reported».
- Las 7 filas chinas y las 6 entradas del catálogo aparecen en `/resources/frameworks` bajo una
  banda Asia-Pacific; `/resources/reading-list` muestra los 7 bullets; `/resources/glossary`
  muestra CAC y TC260.
- Issue drafts 01 y 03 retirados; `PENDIENTE.md` sin la nota de China; CHANGELOG con entrada.
- THESIS sin cambios; ninguna fila afirma conformidad (frase «illustrative» presente en la
  subsección).

## 7. Lo que no se pudo verificar (y así se declara)

- NPC (npc.gov.cn) inaccesible por fallo SSL: la Cybersecurity Law enmendada se cita por el texto
  consolidado de la CAC (canal oficial), no por la gaceta del NPC.
- Fecha de firma de la GenAI Interim Measures (citada a menudo como 2023-07-10): no legible; se usa la
  publicación 2023-07-13.
- Número de documento de las Labelling Measures (国信办通字〔2025〕2号) y número de orden de las
  Anthropomorphic Measures: no confirmados; no se incluyen.
- El post de LinkedIn se abrió, pero es fuente personal → `reported`. No existe client alert de Reed
  Smith sobre el 3.0 (no encontrado).
- El anuncio de la CAC no da título inglés; el título «AI Safety Governance Framework (v 3.0)» sale
  del propio PDF.
