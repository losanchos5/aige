# Catálogo de propuestas visuales por página

Generado del workflow de análisis wf_476cf984-0c7 (7 agentes Opus 5.5, solo lectura, origin/main 9f0b4ef, 2026-09-30). Cada página lista sus visuales actuales y las propuestas. Marcas: **[T0..T5]** tanda asignada por el crítico; **RECHAZADA** o **CORREGIDA** con el motivo. Impacto 1 a 5, esfuerzo S/M/L. `/resources/frontier-safety-crosswalk` queda fuera (otro agente).

## Tandas

### T0. Ola 0: primitivas y contrato

Todas las propuestas dependen de ellas; resolver una vez CSP, tokens claro/oscuro, perf.spec y exportes evita 40 soluciones locales. Nota: la worktree plazos se eliminó durante el análisis; todo se verificó contra origin/main 9f0b4ef.

- infra :: src/lib/charts/core.ts (escalas, medición de texto, open(), sello As of/Source, salida {svg, table})
- infra :: Chart.astro (figcaption, details con tabla, dual ancho/estrecho, raíz .chart con hoja propia para páginas vetadas)
- infra :: clases de gráfico en figures.css para que exporten con color
- infra :: DotMatrix, HeatGrid, Bars y TimeAxis como primeras primitivas
- infra :: tests de sincronía datos-figura siguiendo figures-existing.spec.ts (con la puerta test-audit)

### T1. Ola 1: victorias rápidas con datos listos (S)

Máximo impacto visible con esfuerzo S y sin datos nuevos; cubre muchas páginas de visualPoverty 5 y valida las primitivas en producción.

- /controls :: Mosaico de los controles (ControlMosaic)
- /resources/crosswalk :: Venn de las tres grandes
- /resources/crosswalk/* :: Mariposa de cláusulas + barra de solapamiento
- /resources/contracts :: Matriz cláusula x norma
- /toolkit/policy-card :: Las seis reglas sobre la tubería de entrega
- /mcp :: De tu pregunta a la fuente
- /resources/harms :: Incrustar la figura harm-levels
- /stack :: La pila mínima y tres preguntas como figuras
- /ai-governance :: jurisdiction-tiles, governance-operating-model y MaturityLadder
- /resources/ai-act-deadlines :: Lo que movió el Omnibus (dumbbell)
- /resources/dpia-lists :: Matriz país x Anexo III, línea temporal y barras de tamaño
- /resources :: El corpus en puntos
- /for/certifications :: Dos tipos de certificado
- /toolkit/ai-act-triage :: Escalera de riesgo con tu sistema situado
- /cases :: Cronología de casos 2018 a 2026
- /toolkit/vendor-due-diligence y /toolkit/incident-clock :: incrustar procured-ai-control, incident-clocks y diagramas existentes

### T2. Ola 2: tiempo y plantillas por ítem

Pocos componentes multiplican visuales en cientos de páginas dinámicas; muestrear en a11y por grupos >40 páginas ya está previsto en CI.

- /obligations :: Reloj de aplicación (ObligationTimeline) + isotipo de estados
- /obligations/[id] :: Línea de aplicación de la fila
- /patterns/[id] :: Reloj normativo del patrón
- /for/[slug] :: Qué se activa y cuándo para ti
- /resources/ai-act-deadlines :: Eje temporal con marcador de hoy
- /cases/[id] :: Pajarita del incidente
- /controls/[profile]/[control] :: Anatomía del control + pass frente a fail
- /obligations/[id] :: Constelación de la obligación (RelationRadial)
- /controls/[profile]/[control] :: Constelación de trazabilidad
- /patterns/[id] :: Vecindario del patrón
- /glossary/[slug] :: Huella y vecindario del término
- /controls :: Dónde actúan los controles (EnforcementLanes, con estado por especificar)
- /controls/[profile] :: Tabla periódica del perfil + mapa de cobertura

### T3. Ola 3: flujos, anillos y escaleras

Visuales de mayor impacto con esfuerzo M que necesitan primitivas nuevas; se entregan tras validar las básicas.

- infra :: primitivas Flow (Sankey/Alluvial), Rings, Ladder, Treemap, SetDiagram
- /controls :: La evidencia sube por el stack (LayerSankey)
- /controls/crosswalk :: Flujo perfiles a marcos + índice heatmap + piruletas
- /resources/threats :: Flujo catálogo, capa, herramienta + heatmap AICM
- /resources/harms :: Diana de niveles + aluvial mecanismo, nivel, capa
- /agents :: AutonomyLadder + Sankey amenaza a patrón (también cap. 23)
- /frontier :: EvalBoundary (también /research/[slug]) + fallos x control + AIUC-1
- /resources/frameworks :: Mosaico de instrumentos (treemap)
- /resources/templates :: Anillo de registros + matriz registro x instrumento
- /for/aigp :: Dónde pesa el examen + dominios a capítulos
- /stack :: Qué llena cada capa (LayerMatrix)
- /path :: Etapa x capa + anillos de progreso
- /bok :: Espina del libro
- /figures :: Atlas de cobertura visual

### T4. Ola 4: figuras citables de capítulos y metodología

Requieren transcribir tablas de capítulo a figures.ts (kind data-viz o infographic con tabla data, asOf y reviewBy); dan permalinks, exportes y galería.

- /bok/fairness-and-explainability :: Teorema de imposibilidad (isotipo) + slope 17,7 a 46,5 %
- /bok/ai-defined :: Anatomía de la definición + escalera 0 a 4
- /bok/privacy-and-ai :: Swimlane del dato personal + TileMap DPIA
- /bok/existing-law :: Rueda de cinco cuerpos de ley + casos EE. UU.
- /bok/ai-laws-worldwide :: Pequeños múltiplos de regímenes + leyes estatales
- /bok/principles-and-standards :: NIST 72 subcategorías + JTC 21 (también cap. 08)
- /bok/governing-agents :: Radio de impacto de cada parada
- /bok/governance-program :: RACI del ciclo de vida
- /bok/the-role :: Salarios (pages /role) + escalera profesional
- /bok/eu-ai-act :: Techos de sanción
- /bok/risk-management :: Tiers de tailoring
- /bok/why-now :: Cinco problemas, cinco respuestas
- /about/methodology :: Mezcla de verificación + tubería
- /about/changelog :: Versiones en el tiempo (ReleaseTimeline)
- /thesis :: Números del problema + values-principles + artefactos por capa

### T5. Ola 5: islas cliente, redes y datos nuevos

Mayor coste: scripts cliente con presupuesto 15 KB gzip y motion-ui, layouts de red precalculados y campos nuevos en los datasets; dejarlas al final reduce riesgo y retrabajo.

- /toolkit/maturity-self-check :: Pentágono de madurez + cuadrícula clicable
- /toolkit/incident-clock :: Relojes en una línea de tiempo real
- /toolkit/impact-assessment :: Mapa de calor de riesgos + hilo riesgo, medida, patrón
- /toolkit/model-card :: Anillo de cobertura por marco
- /toolkit/vendor-due-diligence :: Radar de riesgo del proveedor
- /toolkit/obligations-planner :: Matriz rol x obligación + curva acumulada
- /toolkit/ai-register-entry :: Un registro, cinco regímenes
- /toolkit/fairness-metric-chooser :: Árbol de decisión + MetricGlyph (campos leadsTo y equalises)
- /toolkit :: Constelación de herramientas (campos feeds y schemas)
- /patterns :: Red de patrones relacionados
- /resources/threats :: Red de equivalencias entre catálogos
- GlossaryIndex :: Familias de contraste + espectro A-Z
- /map :: Matriz rama x capítulo + vista radial móvil
- /resources/contracts :: Carril del ciclo del contrato (campo phase)
- /resources/data :: Grafo de datasets (lista joins)

## Primitivas compartidas

- **chart-core + Chart.astro**: Núcleo en src/lib/charts/ (TS sin imports runtime, cargable por scripts/lib/load-ts.mjs): escalas lineal/banda con 6 ticks máx., medición de texto portada de scripts/lib/svg-text.mjs con fallo duro si desborda, contrato open() role/title/desc, sello As of y línea Source dentro del SVG, salida {svg, table}. Chart.astro envuelve con figcaption, <details> con la tabla y patrón dual ancho/estrecho (dos SVG + CSS). Usada por: todas las propuestas aceptadas. Dos modos de estilo: clases .figc en figures.css para figuras registradas (así exportan con color) y raíz .chart con hoja propia para las cinco páginas vetadas por perf.spec. Verificado contra origin/main 9f0b4ef.
- **DotMatrix / Waffle / Isotype**: Una celda por registro o por cruce fila x columna; relleno, contorno o trama para el estado (nunca solo color), color solo si la categoría es capa; celdas enlazables y enfocables. Usada por: / (muro de controles), /controls (ControlMosaic), /contribute, /resources (IsotypeRows), /resources/tools, /resources/contracts, /cases (caso x patrón), /frontier (AIUC-1, fallos x control), /obligations (isotipo por instrumento), /resources/threats (COSAiS), /toolkit/model-card, /toolkit/agent-control-profile, /for (capítulos troncales), /bok/ai-defined, /bok/existing-law, /bok/ai-laws-worldwide, /bok/principles-and-standards, /bok/fairness-and-explainability (isotipo imposibilidad), /path (isotipo recursos), /about/methodology (gofre). Precedente: ObligationMatrix y aigp-heatmap.ts.
- **HeatGrid**: Heatmap de conteo con rampa neutra (fill-opacity sobre currentColor, texto siempre en tinta) o pastel de capa; modo RACI con letra visible; barras marginales opcionales; sticky first column en región desplazable. Usada por: /resources/crosswalk (25 x 16), /resources/dpia-lists (país x Anexo III), /resources/reading-list, /resources/threats (AICM), /resources/templates, /resources/harms (subdominios MIT), /path (etapa x capa), /map (rama x capítulo), /controls/[profile] (cobertura), /controls/crosswalk (índice), /for, /bok/governance-program (RACI), /bok/governing-deployment (RACI), /bok/incidents (RACI). Generaliza src/lib/aigp-heatmap.ts; podría servir al frontier-safety-crosswalk si el otro agente lo quiere.
- **Bars (Ranked / Stacked / Stacked100 / Diverging / Dumbbell / Lollipop)**: Barras horizontales desde cero, etiquetas directas, variantes apilada, 100 %, mariposa, dumbbell (de fecha a fecha) y piruleta. Usada por: /resources/crosswalk/* (mariposa + barra 100 %), /bok/the-role (salarios, pages /role), /controls (verificación), /controls/[profile] (huella comparada), /controls/crosswalk (cláusulas más cubiertas), /obligations (brecha de evidencia), /patterns (más demandados), /resources/tools (licencia por categoría), /resources/dpia-lists (tamaño y método), /resources/data (volumen), /resources/reading-list (jurisdicciones), /resources/ai-act-deadlines (Omnibus dumbbell), /cases (normas), GlossaryIndex (A-Z y capítulos), /map (nodos por rama), /about/methodology (editores), /toolkit/vendor-due-diligence (preguntas por nivel), /toolkit/obligations-planner (carga por capa, cliente), /bok/eu-ai-act (sanciones), /thesis (números del problema). Reglas VISUAL-GUIDE §4: base cero, sin ejes duales, unidad en eje.
- **TimeAxis / Beeswarm / Lanes**: Eje temporal de izquierda a derecha (vertical a 390 px) con marca 'hoy' y As of; modos: beeswarm de puntos con forma por estado, carriles (swimlane/gantt), tira compacta de una fila y escalones acumulados; variante de carriles categóricos para puntos de aplicación. Usada por: /obligations (ObligationTimeline héroe), /obligations/[id] (tira), /patterns/[id] (reloj normativo), /for/[slug] (calendario), /resources/ai-act-deadlines (+ /es), /resources/dpia-lists (adopción), /cases (cronología), /about/changelog (ReleaseTimeline), /bok/existing-law (casos EE. UU.), /bok/ai-laws-worldwide (leyes estatales), /ai-governance (por qué ahora), /controls (EnforcementLanes), /toolkit/policy-card (plantillas x punto), /toolkit/incident-clock (gantt, cliente), /toolkit/obligations-planner (curva, cliente), /about/methodology (frescura). Reutilizar timelineModel/measure/wrapTo de scripts/lib/posters.mjs; la versión cliente comparte helpers en public/toolkit/lib.js.
- **Flow (Sankey / Alluvial)**: Dos o tres columnas con layout determinista calculado en build (orden para minimizar cruces), cintas con grosor por recuento, color por capa solo cuando la columna es capa; máx. 9 nodos por columna salvo póster. Usada por: /controls (LayerSankey capa a capa de evidencia), /controls/crosswalk (perfiles a marcos), /resources/threats (catálogo, capa, herramienta), /resources/harms (mecanismo, nivel, capa), /agents (amenaza a patrón, también cap. 23), /obligations (sujeto, clase, autoridad), /cases (daño a capa), /research/[slug] (nota, controles, marcos), /for/aigp (dominio a capítulo), /toolkit/ai-register-entry (campo a régimen), /toolkit/impact-assessment (riesgo, medida, patrón), /toolkit/incident-clock (quién a quién), /toolkit/agent-control-profile (rasgo a control), /bok/incidents (causa, capa, patrón), /bok/why-now (problema, respuesta, capa). Sin librería; ~150 líneas de layout propio. Hover por CSS :hover/:focus-within en el grupo, sin opacidad en texto.
- **SetDiagram (Venn3 / UpSet)**: Venn de tres conjuntos con nombres en regiones y fallback UpSet a 390 px. Usada por: /resources/crosswalk, /toolkit/impact-assessment (FRIA/AIIA/DPIA), /for (obligaciones compartidas).
- **RelationRadial (ego)**: Nodo central y anillos por familia (patrones, obligaciones, controles, casos, marcos, términos), aristas continuas o discontinuas (core/relacionado, directo/parcial); se omite con menos de 3 relaciones. Usada por: /obligations/[id], /controls/[profile]/[control], /patterns/[id], /glossary/[slug]. Plantilla por ítem al estilo EvidenceChain, no registrada en figures.ts.
- **Rings (ConcentricRings / LifecycleRing / Radar / Sunburst)**: Anillos concéntricos de contención o radio de impacto; anillo de ciclo de vida con etapas y artefactos; radar de 4 o 5 ejes ordinales; sunburst de dos niveles. Usada por: /frontier + /research/[slug] (EvalBoundary), /bok/governing-agents (radio de parada), /resources/harms (diana), /resources/templates (anillo de registros), /bok/governing-deployment, /bok/fairness-and-explainability (sesgo en el ciclo), /toolkit/impact-assessment (reapertura), /patterns (ciclo, con campo stage), /toolkit/maturity-self-check (radar, cliente), /toolkit/vendor-due-diligence (radar, cliente), /role (rueda de habilidades), /toolkit/model-card (cobertura, cliente), /bok/principles-and-standards (NIST 72 subcategorías). Modelo visual: GovernanceLoop; radar cliente con helper compartido radarSvg.
- **Treemap**: Squarified en build (~60 líneas), grupos con cabecera, teselas enlazables, estado por trama. Usada por: /resources/frameworks (instrumentos por tipo), /for/aigp (peso del examen), /bok/regulatory-map (reutiliza el de frameworks).
- **NetworkGraph (capas / radial / bipartito)**: Grafo con posiciones precalculadas en build (por bandas de capa, arcos por catálogo o dos columnas), resaltado de vecinos por CSS, lista de adyacencia como alternativa; vista por columnas a 390 px. Usada por: /patterns (red de patrones), /resources/threats (equivalencias), GlossaryIndex (familias de contraste), /toolkit (qué alimenta a qué), /resources (constelación), /resources/data (uniones), /research (programa), /controls/[profile] (control-patrón), /mcp (herramientas a datasets), /toolkit/policy-card (plantillas a obligaciones), /bok (red de capítulos, como matriz de adyacencia a 390 px).
- **Ladder**: Escalera ascendente de peldaños con acumulación ('lo anterior, más...'), peldaño resaltable; generaliza MaturityLadder. Usada por: /agents + /bok/governing-agents + /toolkit/agent-control-profile (AutonomyLadder), /bok/ai-defined (autonomía 0 a 4), /bok/the-role (escalera profesional), /bok/governance-program (aceptación de riesgo), /bok/incidents (severidad), /bok/risk-management (tiers de tailoring), /toolkit/ai-act-triage (escalera de riesgo, cliente), /toolkit/maturity-self-check (siguiente escalón).
- **TileMap**: Mosaico de teselas iguales con relleno por valor, anillo o trama por estado; extraído de jurisdiction-tiles. Usada por: /resources/dpia-lists + /bok/privacy-and-ai. Necesita constante de posiciones EEE.
- **BookSpine**: Tira de 24 capítulos agrupados por parte (tinta neutra, nunca --l1..--l5), con codificación configurable (minutos, figuras, resaltado). Usada por: /bok, /figures (atlas), /figures/[id] (mini).
- **ChainFigure (EvidenceChain extendido / BowTie / FlowDiagram+)**: Cadenas y pajaritas generadas por ítem en dos SVG (row/column) con glifos §1.7 terminando en evidencia; FlowDiagram en HTML para cadenas simples. Usada por: /cases/[id] (bow-tie), /controls/[profile]/[control] (anatomía), /mcp (arquitectura), /contribute (de la issue a la cita), /about/methodology (tubería), /about/contributors (crédito), /for/certifications (dos carriles), /toolkit (mini flujo por tarjeta), /toolkit/ai-act-triage (árbol), /toolkit/fairness-metric-chooser (árbol).

## Top por impacto y esfuerzo

- `/controls` · Mosaico de los controles (ControlMosaic): Impacto 5, esfuerzo S, datos listos; da forma a todo el catálogo y estrena DotMatrix, que reutilizan portada y /contribute. Con el estado 'por especificar' corregido.
- `/resources/crosswalk/{iso-42001-vs-eu-ai-act, nist-ai-rmf-vs-eu-ai-act, nist-ai-rmf-vs-iso-42001}` · Mariposa de cláusulas por tema + barra de solapamiento: Tres páginas de visualPoverty 5 con un solo componente; buildComparison().rows y counts ya calculados; páginas SEO de alto tráfico.
- `/resources/crosswalk` · Venn de las tres grandes: Esfuerzo S con inAllThree/actWithoutIso ya calculados en la página; imagen memorable y citable del solapamiento EU/ISO/NIST.
- `/obligations` · Reloj de aplicación de todas las obligaciones (ObligationTimeline): Un solo motor alimenta el héroe de /obligations y las tiras de /obligations/[id] (182 páginas), /patterns/[id] (33) y /for/[slug] (6); 129 filas fechadas listas.
- `/cases/[id]` · Pajarita del incidente (bow-tie): 18 páginas con visual por ítem desde preventive/detective/responsiveControls, harms y evidenceArtefacts; convierte post-mortems en lectura inmediata.
- `/resources/contracts` · Matriz cláusula x norma: Impacto 5, esfuerzo S, clauses[].mapsTo listo; página sin ningún visual.
- `/toolkit/policy-card` · Las seis reglas sobre la tubería de entrega: Esfuerzo S desde policyCardTemplates (effect, enforcementPoints); misma primitiva de carriles que EnforcementLanes.
- `/mcp` · De tu pregunta a la fuente (arquitectura): Esfuerzo S con FlowDiagram existente; página sin visuales que explica el producto.
- `/controls/[profile]/[control]` · Anatomía del control (del fallo a la evidencia): Extiende lib/evidence-chain.ts ya probado; cumple 'evidencia como nodo final' en las 9 páginas de controles specified.
- `/resources/ai-act-deadlines (+ /es)` · Eje temporal con hoy + dumbbell del Omnibus: aiActMilestones con changed[] y status listos, bilingüe por prop; página nueva de alto interés con solo lista y tabla.
- `/resources/harms` · Incrustar harm-levels + diana de niveles: La figura existe (coste S) y la diana usa level y mitTaxonomy listos; página de visualPoverty 5.
- `/bok/fairness-and-explainability` · El teorema de imposibilidad en 2.000 personas (isotipo): Todos los números en el capítulo; figura citable y muy didáctica, registrable con permalink y exportes.
- `/toolkit/ai-act-triage` · Escalera de riesgo con tu sistema situado: Esfuerzo S sobre el estado que ya calcula el motor y el diseño de eu-ai-act-risk-ladder; mejora el resultado de la herramienta más usada.
- `/resources` · El corpus en puntos (IsotypeRows): Esfuerzo S con los recuentos que index.astro ya calcula; da el peso real del corpus en el hub (con CSS propio por perf.spec).
- `/agents` · AutonomyLadder: Un componente sirve a /agents, al capítulo 23 y a /toolkit/agent-control-profile desde autonomyLevels + agentControls.

## Catálogo por página

### `/controls`

- Fichero: `site/src/pages/controls/index.astro`
- Propósito: Portada de los perfiles de control abiertos: qué es un perfil, los 5 perfiles con sus recuentos y los 93 controles agrupados por capa del stack.
- Pobreza visual: 4/5
- Visuales actuales: FlowDiagram 'From concept to evidence' (5 pasos Concept > Pattern > Control > Implementation > Evidence) en banda mesh; Tarjetas de perfil (cp-card) con StatusLine y recuento en texto; Muestra de color por capa (cp-swatch) delante de cada lista de controles por capa; Sin gráfico de datos: el resto son listas y prosa (propiedades, ecosistema, adopción, revisión)

#### Mosaico de los 93 controles (héroe)

- Tipo: Matriz de puntos / isotipo en HTML (una celda por control, agrupadas por perfil, coloreadas por capa de origen) · impacto 5 · esfuerzo S
- Qué muestra: De un vistazo el tamaño y la forma del catálogo: agent-runtime domina (42 de 93), la capa 04 Runtime concentra 45 controles y la capa 01 solo 4; los 9 controles 'specified' (EVAL) se distinguen con borde lleno frente a los 84 'derived' con borde discontinuo. Cada celda es un enlace a controlPath(c) con el id en title/aria-label.
- Datos: src/data/controls/index.ts: controls[] (id, profile, layer, depth, title), profiles[] (slug, shortTitle); layers de src/data/stack.ts (colorVar, name); controlPath()
- Ubicación: Sustituye o encabeza la sección #profiles, justo después del FlowDiagram de #chain; las tarjetas de perfil quedan debajo como leyenda por bloque
- Interacción: Estática con enlaces; hover/focus resalta la celda (transform scale) y muestra el título en un tooltip CSS; sin JS. Leyenda de capas con --l1..--l5 y texto; tabla <details> con recuento perfil x capa
- Reutiliza: Nuevo componente compartido ControlMosaic.astro (HTML grid, reveal-stagger de effects.css solo transform); reutilizable en /controls/crosswalk y en cada perfil

#### Dónde actúan los controles: carril del pipeline

- Tipo: Swimlane horizontal (4 carriles: pull request, despliegue, runtime, periódico) con puntos por control y forma según respuesta al fallo · impacto 5 · esfuerzo M
- Qué muestra: En qué punto del ciclo muerde cada control: 60 actúan en runtime, 34 en despliegue, 23 periódicos y solo 9 en pre_merge. La forma del punto codifica la respuesta (rombo = deny 35, círculo = alert 47, cuadrado = require_approval 11), revelando que la mayoría de controles alertan en lugar de bloquear y que casi nada bloquea antes del merge.
- Datos: controls[].enforcementPoints (EnforcementPoint: pre_merge | deploy | runtime | periodic), controls[].failureResponse.effect (PolicyEffect), controls[].layer; etiquetas enforcementLabels y effectLabels de src/data/policy-card.ts
- Ubicación: Nueva sección tras #properties (ilustra las propiedades 'An enforcement point' y 'A failure response') y antes de #profiles
- Interacción: Estática, SVG generado en build; en 390 px los carriles pasan a vertical (top > bottom). Tabla alternativa carril x efecto con recuentos
- Reutiliza: Nuevo EnforcementLanes.astro (SVG build-time, patrón de dos SVG row/column como lib/evidence-chain.ts chainSvg); reutilizable en la ficha de cada perfil

#### La evidencia sube por el stack **[T3]**

- Tipo: Sankey / aluvial de capa de origen del control a capa donde queda su evidencia · impacto 4 · esfuerzo M
- Qué muestra: Cómo fluye la evidencia entre capas: los controles de runtime (L4) dejan evidencia sobre todo en L4 y L5, los de inventario alimentan L2 y L5; 30 evidencias acaban en L5 Assurance. Refuerza la tesis del sitio de que la evidencia es el producto y que L5 la recoge.
- Datos: controls[].layer (origen) y controls[].evidence[].layer (destino, 140 artefactos: L1 14, L2 32, L3 11, L4 53, L5 30); colores --l1..--l5 y --lN-ink
- Ubicación: Sustituye la sección #by-layer (las listas por capa pasan a un <details> bajo el gráfico, conservando los anclajes layer-1..layer-5)
- Interacción: Estático; hover sobre una banda resalta su flujo (CSS :hover en el grupo SVG); tabla origen x destino como alternativa
- Reutiliza: Nuevo LayerSankey.astro (SVG build-time, bandas coherentes con StackFlow y StackDiagram); también útil en /stack

#### Cómo se verifica: tipos de verificación por perfil

- Tipo: Barras apiladas horizontales al 100 %, una por perfil (inspect, test, observe, attest) · impacto 3 · esfuerzo S
- Qué muestra: Qué perfiles se pueden comprobar con una prueba ejecutable y cuáles dependen de inspección u observación; deja visible que 'attest' casi no existe (1) y qué perfiles aún no tienen procedimiento de verificación (derived sin verification).
- Datos: controls[].verification[].kind (VerificationKind) agrupado por controls[].profile; verificationLabels
- Ubicación: Dentro de #properties, junto a la propiedad 'A verification someone else can run'
- Interacción: Estático con etiquetas directas y porcentajes en mono; tabla de recuentos
- Reutiliza: Nuevo componente genérico StackedBars.astro (SVG build-time) reutilizable en el perfil y en crosswalk

### `/controls/[profile]`

- Fichero: `site/src/pages/controls/[profile].astro`
- Propósito: Página de un perfil de control (5 perfiles): alcance, cómo leer un control, un ControlRecord por control, tabla de mapeos, preguntas abiertas, changelog y fuentes.
- Pobreza visual: 5/5
- Visuales actuales: Ninguna figura: Byline, StatusLine y Provenance en cabecera; Callout de borrador; ControlRecord por control (lista de definición cs-facts, solo texto); Tabla de mapeos res-table (control x obligaciones, ISO 42001, NIST, OWASP, AIUC-1, capa)

#### Tabla periódica del perfil (héroe)

- Tipo: Rejilla de fichas tipo tabla periódica, una ficha por control · impacto 5 · esfuerzo M
- Qué muestra: Todo el perfil en una pantalla: cada ficha lleva el número (001..042), barra de color de su capa, iconos de puntos de aplicación (PR, deploy, runtime, periódico), glifo de respuesta (deny, hold, alert) y marca de profundidad (specified lleno, derived discontinuo). Permite ver patrones del perfil (p. ej. agent-runtime: casi todo runtime + deny) antes de leer 42 fichas de texto.
- Datos: controlsIn(profile.slug) de src/data/controls/index.ts: id, title, layer, secondaryLayers, enforcementPoints, failureResponse.effect, depth; enforcementLabels, effectLabels (src/data/policy-card.ts)
- Ubicación: Tras el párrafo de #scope y antes de #how-to-read-a-control (sirve también como índice visual: cada ficha enlaza a #aige-ctl-...)
- Interacción: Estática con enlaces a los anclajes; focus/hover eleva la ficha (transform); leyenda de glifos; en 390 px pasa a 3 columnas sin scroll horizontal
- Reutiliza: Nuevo ControlPeriodicTable.astro; comparte glifos con EnforcementLanes y ControlMosaic de /controls

#### Mapa de calor de cobertura normativa

- Tipo: Heatmap control x marco (Obligaciones, ISO 42001, NIST AI RMF, OWASP, ATLAS, AIUC-1, IMDA) con densidad de tinta según nº de ids · impacto 4 · esfuerzo S
- Qué muestra: Dónde está bien anclado el perfil y dónde hay huecos: filas vacías = controles sin mapeo verificado, columnas pálidas = marcos poco cubiertos. En el conjunto hay 255 mapeos a obligaciones pero 0 a CSA AICM y solo 7 a ATLAS; aquí se ve por perfil.
- Datos: mappingRows(profile.slug) de src/lib/controls-md.ts (ya alimenta la tabla #mappings); controls[].mappings.{obligations, iso42001, nistAiRmf, owasp, atlas, aiuc1, other} y imdaAgenticXrefs (fit direct/partial) de src/data/controls/imda-agentic.ts
- Ubicación: Al inicio de #mappings, encima de la tabla actual (la tabla queda como alternativa accesible y detalle)
- Interacción: Estática; cada celda enlaza al ancla del control; sin color de categoría (VISUAL-GUIDE §4.3): tinta var(--ink) con tamaño de cuadrado o número en mono
- Reutiliza: Nuevo CoverageHeatmap.astro, mismo lenguaje que ObligationMatrix (sticky first column) pero SVG/HTML estático

#### Huella del perfil comparada

- Tipo: Small multiples: tres minibarras (punto de aplicación, respuesta al fallo, tipo de verificación) con el perfil actual en acento y la media de los 5 perfiles como marca fantasma · impacto 3 · esfuerzo S
- Qué muestra: En qué se diferencia este perfil del resto: evaluation-environment verifica con test/inspect, deployment-and-monitoring alerta mucho más (7 alert frente a 7 deny), agent-runtime bloquea (deny). Da contexto para decidir qué perfil adoptar primero.
- Datos: controlsIn(slug) frente a controls[]: enforcementPoints, failureResponse.effect, verification[].kind
- Ubicación: En la cabecera, tras el Callout de borrador y antes de #scope
- Interacción: Estática, etiquetas directas en mono con %, tabla alternativa
- Reutiliza: StackedBars.astro (propuesto en /controls) en modo small multiples

#### Red control-patrón del perfil

- Tipo: Grafo bipartito (controles a la izquierda por número, patrones a la derecha coloreados por capa) · impacto 4 · esfuerzo M
- Qué muestra: Qué patrones del catálogo sostienen el perfil y cuáles concentran controles (p. ej. agent-registry y policy-card en agent-runtime; dataset-admission-gate con 11 controles en data-admission). Enlaza la capa de controles con la de patrones del FlowDiagram de /controls.
- Datos: controls[].patterns (slugs) + patterns.ts (layer, title, slug); seeds (tool-agent-controls.ts) opcional como tercera columna
- Ubicación: Nueva sección antes de #open-questions, con entrada propia en headings
- Interacción: Hover sobre un patrón resalta sus aristas (CSS); todos los nodos son enlaces; lista alternativa patrón > controles
- Reutiliza: Nuevo BipartiteGraph.astro (SVG build-time, layout por columnas ordenado para minimizar cruces); reutilizable en /controls/crosswalk

### `/controls/[profile]/[control]`

- Fichero: `site/src/pages/controls/[profile]/[control].astro`
- Propósito: Página propia de cada control 'specified' (hoy 9, AIGE-CTL-EVAL-001..009): registro completo, dos observaciones de ejemplo pass/fail, casos, patrones, obligaciones, amenazas y fuentes.
- Pobreza visual: 5/5
- Visuales actuales: Ninguna figura; ControlRecord standalone (lista de definición); Dos bloques de observación de ejemplo (cx) en dl + JSON desplegable; Listas de casos, patrones, obligaciones y amenazas

#### Del fallo a la evidencia: anatomía del control (héroe)

- Tipo: Diagrama de flujo generado (SVG row/column): modos de fallo > punto(s) de aplicación sobre el pipeline de 4 etapas > verificación (inspect/test/observe/attest) > rombo de decisión (deny/hold/alert) > artefacto de evidencia con glifo documento-check y color de capa · impacto 5 · esfuerzo M
- Qué muestra: El mecanismo completo de un control en una sola figura, terminando en la evidencia como pide VISUAL-GUIDE §1.5: dónde se engancha en el pipeline, qué hace cuando falla y qué registro deja en qué capa.
- Datos: Control: failureModes, enforcementPoints, verification[].kind, failureResponse.effect, evidence[] (artefact, schemaId, layer), layer, secondaryLayers
- Ubicación: Tras el párrafo cp-part y el Callout, antes de ControlRecord (#record)
- Interacción: Estática; nodos de evidencia enlazan a /resources/templates#schema-<id>; alternativa en <details> con los pasos
- Reutiliza: Extender lib/evidence-chain.ts (chainSvg ya dibuja la cadena de /obligations/[id] con layout row/column) o crear ControlAnatomy.astro sobre el mismo motor
- **CORREGIDA**: Construir sobre lib/evidence-chain.ts (motor row/column ya probado) y no como ControlAnatomy independiente; hoy son 9 páginas (solo depth specified).

#### Pass frente a fail, lado a lado

- Tipo: Comparativa en dos columnas con VerdictStamp (PASS / BLOCK) y resaltado de diferencias entre 'expected' y 'observed' · impacto 4 · esfuerzo S
- Qué muestra: Qué distingue una observación conforme de una no conforme: el mismo sujeto, lo esperado, lo observado, las huellas de evidencia (hash truncado como chip) y el sello de veredicto; convierte dos dl largas en una lectura inmediata.
- Datos: controlExamples(c) (public/controls/examples/*.json): record.status, subject, subject_kind, expected, observed, evidence[].hash, timestamp
- Ubicación: Cabecera de #examples, encima de las dos secciones cx (que se mantienen para detalle y descarga)
- Interacción: Estática; en 390 px las columnas se apilan (pass arriba); sin JS
- Reutiliza: VerdictStamp.astro existente (colores L5 pass / L3 block) + nuevo ObservationCompare.astro

#### Constelación de trazabilidad **[T2]**

- Tipo: Red radial ego-céntrica: el control en el centro, anillos por familia (obligaciones, ISO 42001 Annex A, NIST AI RMF, OWASP, ATLAS, AIUC-1, IMDA directo/parcial, patrones, casos) · impacto 4 · esfuerzo M
- Qué muestra: Todo lo que este control ayuda a evidenciar y de dónde viene, en un gráfico: cuántos marcos toca, qué ajuste IMDA tiene (línea continua directo, discontinua parcial) y qué casos reales lo reclaman.
- Datos: controlRelations(c) (lib/controls-md, ya usado por la página: cases, patterns, obligations, threats), c.mappings.*, imdaAgenticXrefs[c.id].fit
- Ubicación: Al inicio de la zona de relaciones, antes de #related-cases (las listas quedan debajo como alternativa)
- Interacción: Estático; cada nodo enlaza a su página; hover resalta anillo; lista agrupada como texto alternativo
- Reutiliza: Nuevo componente compartido RelationRadial.astro, el mismo para /obligations/[id] y /patterns/[id]

#### Posición en el stack **RECHAZADA**

- Tipo: Mini stack de 5 bandas con la capa de origen rellena, capas secundarias con trama y las capas de evidencia marcadas con glifo · impacto 2 · esfuerzo S
- Qué muestra: En qué capa se aplica el control y en cuáles deja evidencia, con los nombres canónicos de las capas; orienta al lector respecto a /stack.
- Datos: c.layer, c.secondaryLayers, c.evidence[].layer; layers de src/data/stack.ts
- Ubicación: Columna lateral o bajo la anatomía del control, junto a StatusLine
- Interacción: Estática, bandas enlazan a /bok/the-stack#<chapterAnchor>
- Reutiliza: Variante compacta de StackDiagram.astro (prop highlight)
- Motivo del rechazo: Impacto 2 y ya contenido en la anatomía del control, que pinta capa de origen y capas de evidencia.

### `/controls/crosswalk`

- Fichero: `site/src/pages/controls/crosswalk.astro`
- Propósito: Los controles leídos desde el lado del marco: una tabla por marco (31 marcos, cientos de pares cláusula-control) y la vista inversa por perfil.
- Pobreza visual: 5/5
- Visuales actuales: Ninguna figura: índice de marcos como lista de enlaces con recuentos; Tablas res-table por marco (cláusula x controles); Tablas por perfil

#### Flujo perfiles a marcos (héroe)

- Tipo: Sankey / aluvial: 5 perfiles a la izquierda, marcos agrupados a la derecha (EU AI Act, ISO 42001 Annex A, NIST AI RMF, OWASP ASI/LLM, IMDA, AIUC-1, NIST SP 800-53, ATLAS, resto), grosor = nº de pares · impacto 5 · esfuerzo M
- Qué muestra: Qué perfil responde a qué marco: agent-runtime alimenta sobre todo OWASP Agentic (49 pares) e IMDA (69), EU AI Act recibe 124 pares de obligaciones, ISO 42001 Annex A 94. Muestra el peso relativo antes de bajar a 31 tablas.
- Datos: buildControlsCrosswalk() y crosswalkProfiles() de src/lib/controls-crosswalk.ts (frameworks[].rows[].controls) + controlById(id).profile
- Ubicación: Tras #about y antes de #frameworks
- Interacción: Estático; hover sobre un perfil o marco resalta sus cintas; cada marco enlaza a su ancla #<fw.id>; tabla perfil x marco como alternativa
- Reutiliza: LayerSankey.astro generalizado a SankeyDiagram.astro (propuesto en /controls)

#### Índice de marcos como mapa de calor

- Tipo: Heatmap marco (filas, 31) x perfil (columnas, 5), celdas con recuento de pares y densidad de tinta · impacto 4 · esfuerzo S
- Qué muestra: Sustituye la lista #frameworks por un índice que además informa: qué marcos solo toca un perfil, cuáles atraviesan todos, dónde faltan mapeos. Cada fila sigue siendo el enlace a su tabla.
- Datos: buildControlsCrosswalk().frameworks (id, name, rows, controls) cruzado con controls[].profile
- Ubicación: Sustituye la ul.cw-index de #frameworks
- Interacción: Estático; fila y celda enlazan a #<fw.id> o #by-profile-<slug>; sticky first column en móvil dentro de región con tabindex como las tablas actuales
- Reutiliza: CoverageHeatmap.astro (propuesto en /controls/[profile])

#### Cláusulas más cubiertas

- Tipo: Gráfico de piruletas (lollipop) horizontal con las 15 cláusulas con más controles · impacto 4 · esfuerzo S
- Qué muestra: Dónde se concentra el trabajo: AIGE-OBL-OWASP-AGENTIC 31 controles, EU AI Act Art. 15 28, ISO 42001 A.6.2.6 23, Art. 14 17, CSA AICM agentic 14... Dice al lector qué artículos quedan mejor evidenciados por el catálogo abierto.
- Datos: buildControlsCrosswalk().frameworks[].rows[] (ref, name, controls.length), ordenado
- Ubicación: Tras el heatmap de #frameworks, antes de #obligations
- Interacción: Estático; cada fila enlaza al ancla de la cláusula (data-pair ya existe en los enlaces); tabla top 15
- Reutiliza: Nuevo RankedBars.astro (SVG build-time), reutilizable en /patterns

#### Qué marcos se solapan a través de los controles

- Tipo: Matriz de coocurrencia (adyacencia) marco x marco, celda = nº de controles que mapean a ambos · impacto 3 · esfuerzo M
- Qué muestra: Qué marcos se satisfacen con el mismo control (p. ej. EU AI Act Art. 15 con OWASP ASI y ISO A.6.2.6): la palanca de 'un control, varios marcos' que interesa a quien implanta.
- Datos: controls[].mappings (obligations agrupadas por frameworkId, iso42001, nistAiRmf, owasp, atlas, aiuc1, other) calculando pares por control; o crosswalkPairKeys()
- Ubicación: Nueva sección antes de #by-profile
- Interacción: Estática con celdas enlazadas a los marcos; en 390 px se muestra solo el triángulo inferior de los 8 marcos principales y el resto en tabla
- Reutiliza: CoverageHeatmap.astro en modo simétrico

### `/obligations`

- Fichero: `site/src/pages/obligations/index.astro`
- Propósito: Registro de obligaciones: 182 filas con id estable de 31 grupos de instrumentos, buscador 'Look up an article' y filtros CSS por estado y capa.
- Pobreza visual: 4/5
- Visuales actuales: ObligationLookup (caja de búsqueda con ejemplos); Chips de filtro por estado y por capa (radios CSS); Ticks de capa coloreados (ticks--coded) por fila; type-tag de estado por fila; Nota: el heatmap marco x capa (ObligationMatrix) está en /resources/frameworks, no aquí; no se duplica

#### Reloj de aplicación de todas las obligaciones (héroe)

- Tipo: Beeswarm / tira de puntos en eje temporal 2018 a 2031 con marca 'hoy' (2026-09-30), un punto por fecha de aplicación e hito · impacto 5 · esfuerzo M
- Qué muestra: Cuándo empiezan a morder las obligaciones de todos los instrumentos, no solo del AI Act: 29 fechas en 2026, 41 en 2027 y la ola aplazada por el Omnibus (38 filas 'deferred') en 2027-2028, más hitos 2030. Forma del punto según estado (lleno en vigor, hueco aplicación futura, rayado aplazado, contorno discontinuo borrador) y etiquetas directas de los picos.
- Datos: src/data/frameworks.ts obligations[]: appliesFrom, appliesStatus, milestones[].date, framework; appliesStatusLabels. 129 filas fechadas; 53 sin fecha se cuentan en un rótulo aparte
- Ubicación: Tras el Callout y la ObligationLookup, antes de la sección #obx-heading
- Interacción: Estático SVG build-time; cada punto enlaza a obligationPath(row) con title; en 390 px el eje pasa a vertical por años; lleva 'As of' (VISUAL-GUIDE §1.13) y tabla año x estado
- Reutiliza: Nuevo ObligationTimeline.astro; mismo motor que la tira por fila de /obligations/[id]; complementa, no duplica, AiActDeadlines (solo EU AI Act)

#### Isotipo de estados por instrumento

- Tipo: Waffle / isotipo: 182 cuadrados agrupados por grupo de instrumento, con forma o trama según estado · impacto 4 · esfuerzo S
- Qué muestra: El peso de cada régimen y su madurez: EU AI Act 50 filas, GDPR 15, soft law internacional 10, China 9... y cuántas son vinculantes hoy (70 en vigor) frente a voluntarias (49) o borradores (9). Hace visible el filtro de estado antes de usarlo.
- Datos: obligationGroups() de src/lib/obligations.ts (framework, rows) y rows[].appliesStatus
- Ubicación: En #obx-heading, entre el párrafo de ids y los fieldsets de filtro (actúa como leyenda visual de los chips de estado)
- Interacción: Estático; cada grupo enlaza a su ancla #<g.anchor>; opcional: el radio CSS de estado ya existente atenúa los cuadrados que no coinciden mediante transform/outline, sin opacidad en texto
- Reutiliza: Nuevo WaffleGrid.astro (HTML grid), también útil para /controls (ControlMosaic es su variante)

#### Brecha de evidencia por instrumento

- Tipo: Barras apiladas horizontales al 100 %: filas con patrón y control abierto, solo con patrón, solo con control, sin nada · impacto 4 · esfuerzo S
- Qué muestra: Dónde el catálogo del sitio ya da una respuesta de ingeniería y dónde no: 71 de 182 filas tienen patrón; se ve qué instrumentos (p. ej. leyes estatales de EE. UU., China) no tienen aún ni patrón ni control. Guía editorial y para el lector.
- Datos: obligations[].patterns, controlsForObligation(id) de src/lib/cross-links.ts, agrupado por framework
- Ubicación: Nueva sección tras la lista del registro, antes de #obx-ids-heading
- Interacción: Estática, etiquetas directas con recuento; tabla alternativa
- Reutiliza: StackedBars.astro (propuesto en /controls)

#### Quién responde ante quién (EU AI Act)

- Tipo: Sankey de tres columnas: sujeto obligado (Provider, Deployer, GPAI provider, Importer...) > clase de sistema (Annex III, Annex I, GPAI, Art. 50) > autoridad (National MSA, AI Office, DPA) · impacto 4 · esfuerzo M
- Qué muestra: La cadena de responsabilidad de las 50 filas del AI Act: 24 recaen en el proveedor, 8 en el desplegador; 40 filas las supervisa la autoridad nacional de vigilancia del mercado y 6 la AI Office.
- Datos: obligations[] con frameworkId 'eu-ai-act': dutyHolder, systemClass (systemClassLabels), authority
- Ubicación: Tras el isotipo, dentro de #obx-heading o como sección propia antes del listado
- Interacción: Estático; hover resalta flujo; tabla alternativa; normalizar dutyHolder compuestos ('Provider + deployer') en build
- Reutiliza: SankeyDiagram.astro (generalización de LayerSankey)
- **CORREGIDA**: No normalizar dutyHolder de texto libre: tomar los roles de src/data/obligations-planner.ts (plannerRoles, plannerDuties por id de fila) y authority de frameworks.ts. Prioridad baja frente al héroe temporal.

#### Vista previa visual en el buscador

- Tipo: Tarjeta de resultado con mini cadena de evidencia y tira temporal · impacto 3 · esfuerzo M · requiere datos nuevos
- Qué muestra: Al resolver 'AI Act 14' la caja muestra estado, fecha y capas del artículo antes de navegar, con la misma gramática visual que la página de la obligación.
- Datos: public obligations/lookup.json (hoy solo alias e ids); habría que añadir por fila appliesStatus, appliesFrom y layerN desde frameworks.ts en src/pages/obligations/lookup.json.ts
- Ubicación: Dentro de ObligationLookup.astro, bajo el campo de búsqueda
- Interacción: Isla first-party existente (/obligation-lookup.js), aria-live polite, sin animación con reduced-motion; presupuesto 15 KB gzip
- Reutiliza: Extender ObligationLookup.astro + obligation-lookup.js

### `/obligations/[id]`

- Fichero: `site/src/pages/obligations/[id].astro`
- Propósito: Página de cada fila del registro (182): hechos de la obligación, artefacto y capas, patrones, cruce temático, casos, controles abiertos y fuente.
- Pobreza visual: 3/5
- Visuales actuales: EvidenceChain (figura de cabecera SVG row/column: cláusula > sujeto > fecha > artefacto > capa > registro); Ticks de capa coloreados en 'The artefact that evidences it'; type-tag de estado; Resto en listas (hitos, patrones, cruce, casos, controles)

#### Línea de aplicación de la fila **[T2]**

- Tipo: Tira temporal compacta (2024 a 2031) con marca 'hoy', fecha de aplicación y cada hito, anotados · impacto 4 · esfuerzo S
- Qué muestra: Cuánto falta para cada paso de esta obligación y qué sistemas afecta cada uno (p. ej. Art. 15: 2027-12-02 Annex III, 2028-08-02 Annex I, 2030-08-02 sistemas heredados públicos). Hoy los hitos son una lista de fechas.
- Datos: row.appliesFrom, row.appliesStatus, row.milestones[] (date, note, systemClass), systemClassLabels; 53 filas tienen hitos y 129 fecha
- Ubicación: En el dl.cs-facts, sustituyendo visualmente 'Later dates' (la ul obx-milestones queda como texto alternativo), o justo bajo EvidenceChain
- Interacción: Estático SVG build-time, 'As of <reviewed>' dentro del SVG; se oculta si no hay fecha
- Reutiliza: ObligationTimeline.astro (propuesto en /obligations) en modo fila

#### Constelación de la obligación **[T2]**

- Tipo: Red radial ego-céntrica: la cláusula en el centro; anillos con patrones (color de capa), controles abiertos, casos y cláusulas hermanas de otros marcos por tema · impacto 5 · esfuerzo M
- Qué muestra: Todo el ecosistema de una obligación en una figura: qué patrones la construyen, qué controles abiertos la evidencian, qué casos reales citan el artículo y qué dicen ISO, NIST u otras leyes sobre el mismo tema (core frente a relacionado).
- Datos: patternsFor(row), controlsForObligation(row.id), casesFor(row), crosswalkFor(row) (topics[].siblings con strength y verified) de src/lib/obligations.ts y src/lib/cross-links.ts
- Ubicación: Tras 'The artefact that evidences it' y antes de #patterns (las listas actuales quedan como detalle)
- Interacción: Estático; nodos enlazados; hover resalta un anillo; se omite cuando hay menos de 3 relaciones
- Reutiliza: RelationRadial.astro compartido con /controls/[profile]/[control] y /patterns/[id]

#### La fila dentro de su instrumento **RECHAZADA**

- Tipo: Tira de puntos de todas las filas del mismo instrumento, ordenadas por cláusula, con forma por estado y la fila actual destacada · impacto 2 · esfuerzo S
- Qué muestra: Contexto inmediato: dónde está este artículo entre los 50 del AI Act o los 15 del GDPR, cuáles de sus vecinos ya aplican y cuáles están aplazados; navegación visual además de prev/next.
- Datos: obligationGroups() o obligations.filter(frameworkId) y neighbours(row); appliesStatus, clause
- Ubicación: Al final de la página, junto al pager de vecinos o bajo #source
- Interacción: Estático; cada punto enlaza a su fila; lista alternativa
- Reutiliza: WaffleGrid.astro en modo fila
- Motivo del rechazo: Impacto 2; el pager de vecinos y el isotipo de /obligations cubren el contexto.

### `/patterns`

- Fichero: `site/src/pages/patterns/index.astro`
- Propósito: Índice de los 33 patrones del catálogo agrupados por capa del stack, con resumen y línea 'Maps to' por tarjeta.
- Pobreza visual: 4/5
- Visuales actuales: Navegación por capa con color de capa y recuento (pt-jump); Tarjetas pt-card por capa con franja de color; Nota: la infografía 'pattern-map' (figures.ts) solo se coloca en el capítulo 05 (/bok/patterns), no en esta página

#### Red de patrones relacionados (héroe) **[T5]**

- Tipo: Grafo de red por bandas de capa (5 columnas o anillos), 33 nodos, aristas de 'Related patterns', tamaño del nodo según demanda (obligaciones + controles + casos) · impacto 5 · esfuerzo L
- Qué muestra: Cómo se encadenan los patrones: 172 enlaces 'Related patterns' dibujan los ejes (policy-card y eval-gate-in-ci como hubs, puentes entre L3 y L5); los nodos grandes son los que más obligaciones y controles piden (drift-fairness-monitor 16 obligaciones, dataset-admission-gate 11 controles, runtime-guardrail 10 casos).
- Datos: src/data/patterns.ts (slug, title, layer, secondaryLayer) + sección '## Related patterns' de bok/patterns/*.md (enlaces /patterns/<slug>, parsear en build como hace lib/pattern-pages.ts) + obligationsEvidencedBy, controlsForPattern, casesCallingFor de src/lib/cross-links.ts
- Ubicación: Tras la cabecera de #pt-how, antes de los grupos por capa
- Interacción: Layout precalculado en build (sin librería en runtime); hover/focus sobre un nodo resalta sus vecinos con CSS; nodos enlazan a /patterns/<slug>; en 390 px cae a una vista por capas en columna; lista de adyacencia como alternativa
- Reutiliza: Nuevo PatternNetwork.astro (SVG build-time); su subgrafo alimenta el vecindario de /patterns/[id]

#### Patrones más demandados

- Tipo: Barras horizontales apiladas por patrón: obligaciones que evidencia, controles que lo usan, casos que lo reclaman; ordenadas por total y coloreadas por capa del patrón en la etiqueta · impacto 4 · esfuerzo S
- Qué muestra: Por dónde empezar: qué patrones rinden más evidencia por esfuerzo. Decision-notice-contest-path (18 obligaciones), drift-fairness-monitor (16), dataset-admission-gate (11 controles), runtime-guardrail y eval-gate-in-ci (10 y 9 casos).
- Datos: obligationsEvidencedBy(def.id), controlsForPattern(def.slug), casesCallingFor(def.id) de src/lib/cross-links.ts sobre patterns[]
- Ubicación: Nueva sección tras la red, antes de los grupos por capa
- Interacción: Estático con etiquetas directas; cada barra enlaza al patrón; tabla alternativa con las tres columnas
- Reutiliza: RankedBars.astro / StackedBars.astro (propuestos en controles)

#### Matriz patrón x marco

- Tipo: Matriz de puntos: 33 patrones (filas por capa) x marcos de 'Maps to' (EU AI Act, ISO/IEC 42001, NIST AI RMF, CSA AICM, OWASP, ISO/IEC 42005...) · impacto 3 · esfuerzo S
- Qué muestra: Qué marcos responde cada patrón y qué marcos quedan cubiertos por pocos patrones (CSA AICM u OWASP frente a ISO 42001 presente en casi todos).
- Datos: patterns[].mapsTo (normalizar por prefijo de marco en build: 'EU AI Act', 'ISO/IEC 42001', 'NIST AI RMF', 'CSA AICM', 'OWASP')
- Ubicación: Sustituye o acompaña a las líneas 'Maps to' de cada tarjeta, como sección tras los grupos por capa
- Interacción: Estático, sticky first column en región desplazable accesible; filas enlazadas
- Reutiliza: CoverageHeatmap.astro en modo binario

#### Anillo del ciclo de vida

- Tipo: Anillo de ciclo de vida (intake, datos, desarrollo, evaluación, despliegue, operación, retirada) con los 33 patrones colocados en su fase y coloreados por capa · impacto 4 · esfuerzo M · requiere datos nuevos
- Qué muestra: Cuándo se usa cada patrón en la vida del sistema (use-case-intake-risk-tiering al inicio, deactivation-localisation-retirement-runbook al final), complementando la vista por capa.
- Datos: Falta un campo 'stage' en src/data/patterns.ts (33 valores, derivados de la sección Context/Solution de cada bok/patterns/*.md y de la división w2-patterns-a desarrollo / w2-patterns-b despliegue ya presente en src/data/diagrams.ts)
- Ubicación: Tras la red de patrones, como segunda lectura del catálogo
- Interacción: Estático; nodos enlazados; lista por fase como alternativa
- Reutiliza: Nuevo LifecycleRing.astro, aprovechable en /bok/patterns y /path

### `/patterns/[id]`

- Fichero: `site/src/pages/patterns/[id].astro`
- Propósito: Página de cada uno de los 33 patrones: diagrama archify del mecanismo, prosa (objetivos, contexto, solución, consecuencias, relacionados) y relaciones inversas (obligaciones, casos, controles).
- Pobreza visual: 3/5
- Visuales actuales: Diagrama archify del patrón al inicio (lead), uno por patrón (src/data/diagrams.ts); Chips de capa con color (pp-layer); Banda mesh final (Section tone mesh) con listas de obligaciones, casos y controles

#### Vecindario del patrón **[T2]**

- Tipo: Red radial ego-céntrica: el patrón en el centro; anillo interno con patrones relacionados (color de capa), anillos externos con obligaciones, controles y casos · impacto 5 · esfuerzo M
- Qué muestra: Con qué se combina el patrón y qué justifica construirlo: p. ej. eval-gate-in-ci enlaza con policy-card y red-team, evidencia Art. 15 y 55, lo usan 7 controles y lo reclaman 9 casos.
- Datos: '## Related patterns' del .md (entry.body), obligationsEvidencedBy(def.id), controlsForPattern(def.slug), casesCallingFor(def.id)
- Ubicación: Cabecera de la banda final pp-close (Section mesh), encima de las listas
- Interacción: Estático; nodos enlazados; lista como alternativa
- Reutiliza: RelationRadial.astro compartido (controles y obligaciones)

#### Reloj normativo del patrón **[T2]**

- Tipo: Tira temporal con las obligaciones que evidencia el patrón, puestas en su fecha de aplicación y forma por estado · impacto 4 · esfuerzo S
- Qué muestra: Cuándo empieza a importar este patrón: qué obligaciones que evidencia ya están en vigor y cuáles llegan en 2027-2028; argumento de prioridad para quien planifica.
- Datos: obligationsEvidencedBy(def.id) > appliesFrom, milestones, appliesStatus (src/data/frameworks.ts)
- Ubicación: Dentro de la sección 'Obligations this pattern evidences', antes de la lista
- Interacción: Estático; puntos enlazados a cada obligación; 'As of' en el SVG
- Reutiliza: ObligationTimeline.astro (propuesto en /obligations)

#### El patrón de un vistazo

- Tipo: Fila de StatTile + chips con glifo de persona para usuarios y afectados · impacto 3 · esfuerzo S
- Qué muestra: Cifras clave (nº de obligaciones, controles, casos y marcos en 'Maps to') y los roles que lo usan y los afectados, en lugar de dos párrafos cortos.
- Datos: Contadores de cross-links + patterns[].mapsTo.length; secciones '## Target users' y '## Impacted stakeholders' del .md (parseo en build, listas separadas por comas)
- Ubicación: En pp-meta, entre los chips de capa y PillarLink, antes del contenido
- Interacción: Estático; StatTile con href a la sección correspondiente
- Reutiliza: StatTile.astro existente + chip de persona nuevo

#### Dónde está en el mapa de patrones **RECHAZADA**

- Tipo: Mini mapa de patrones (5 bandas) con el patrón actual resaltado y sus relacionados marcados · impacto 3 · esfuerzo M
- Qué muestra: Sitúa el patrón entre los 33 del catálogo y su capa, con sus vecinos visibles; navegación lateral visual.
- Datos: figura 'pattern-map' de src/data/figures.ts (generada por scripts/figures-build.mjs desde patterns.ts) con parámetro de resaltado; related desde el .md
- Ubicación: Junto a PatternFoot, antes del pager prev/next
- Interacción: Estático; todos los nodos enlazan
- Reutiliza: Extender la figura pattern-map (figures-build.mjs) con una variante por patrón o renderizarla como componente con prop highlight
- Motivo del rechazo: 33 variantes SVG de una figura registrada para una lectura que ya da el RelationRadial del mismo patrón.

### `/[lang]/patterns/[id]`

- Fichero: `site/src/pages/[lang]/patterns/[id].astro`
- Propósito: Traducción automática de una página de patrón, con aviso de traducción, diagrama por posición y pager entre patrones traducidos.
- Pobreza visual: 4/5
- Visuales actuales: Diagrama archify del patrón colocado por posición; TranslationNotice; Sin banda de relaciones ni otros gráficos

#### Vecindario del patrón traducido **[T2]**

- Tipo: Red radial ego-céntrica (misma figura que la página inglesa) con etiquetas de interfaz traducidas · impacto 4 · esfuerzo S
- Qué muestra: Da a la versión traducida la misma lectura visual de relaciones (patrones, obligaciones, controles, casos) que hoy solo tiene la página inglesa en listas; los ids y títulos se mantienen como en el original.
- Datos: Las mismas funciones de src/lib/cross-links.ts por def.slug; etiquetas vía translator(lang) de src/i18n/ui
- Ubicación: Tras el contenido y antes de PatternFoot
- Interacción: Estático; enlaces a las páginas inglesas de destino cuando no existe traducción
- Reutiliza: RelationRadial.astro con prop lang

#### El patrón de un vistazo (traducido)

- Tipo: Fila de StatTile con cifras clave · impacto 2 · esfuerzo S
- Qué muestra: Nº de obligaciones, controles, casos y marcos del patrón, con etiquetas en el idioma de la página.
- Datos: Contadores de cross-links y patterns[].mapsTo; translator(lang)
- Ubicación: Bajo TranslationNotice, antes del contenido
- Interacción: Estático
- Reutiliza: StatTile.astro

### `/resources`

- Fichero: `site/src/pages/resources/index.astro`
- Propósito: Hub de la sección Recursos: 16 tarjetas bento (ResourceCard) que enlazan cada referencia con su recuento calculado desde los datos.
- Pobreza visual: 4/5
- Visuales actuales: PageHero variant res con malla; Bento de 16 ResourceCard con swatch de color de capa, índice 01-16 y recuento; reveal-stagger transform-only

#### El corpus en puntos (isotipo de volumen) **[T1]**

- Tipo: isotipo / unit chart (1 punto = 1 registro) en filas por recurso · impacto 5 · esfuerzo S
- Qué muestra: De un vistazo el peso real de cada recurso: 182 obligaciones, 162 fuentes, 96 herramientas, 79 controles, 78 marcos, 25 temas, 25 daños, 24 esquemas, 18 cláusulas... El lector ve que el registro de obligaciones y la bibliografía son el núcleo y dónde está la profundidad antes de hacer clic.
- Datos: Los mismos recuentos que ya calcula index.astro: frameworks.length, obligations.length (data/frameworks.ts), topics/columns (data/crosswalk.ts), harms (data/harms.ts), cases (data/cases.ts), controls (data/controls), clauses (data/contracts.ts), getSchemas() (lib/schemas-library.ts), allTools() (data/stack.ts), getReadingList(), getGlossary(), datasets (lib/api.ts), figures/diagrams. Color = swatch de cada entrada (--l1..--l5).
- Ubicación: Justo debajo del PageHero, antes del bento, como banda de apertura (Section tone tint).
- Interacción: estático; cada fila es un enlace al recurso; texto alternativo = tabla recurso/recuento en <details>
- Reutiliza: Nuevo componente compartido IsotypeRows.astro (SVG en build); tokens --l1..--l5; mismo patrón de cadena SVG que lib/aigp-heatmap.ts

#### Micrográfico dentro de cada tarjeta

- Tipo: sparklines / micro-glifos por tarjeta (barra apilada por capa, rejilla de puntos, mini eje temporal) · impacto 5 · esfuerzo M
- Qué muestra: Cada tarjeta deja de ser solo texto: Marcos muestra la mezcla de obligaciones por capa L1-L5; Crosswalk una mini rejilla 25x16 de cobertura; Daños cinco barras por nivel; Herramientas la proporción abierto/comercial; Plazos del AI Act el próximo hito sobre un mini eje; Amenazas los 4 catálogos. El lector compara recursos por su forma, no solo por su número.
- Datos: obligations[].layerN (frameworks.ts); refs por topic/column (crosswalk.ts topicMatrix()); harms[].level (harms.ts); allTools()[].tool.access (stack.ts); aiActMilestones[].date/status + nextMilestones() (ai-act-timeline.ts); threats[].taxonomy (threats.ts); lists[].aiNamed (dpia-lists.ts).
- Ubicación: Dentro de cada ResourceCard, entre la descripción y el recuento.
- Interacción: estático, aria-hidden (el recuento textual ya existe en la tarjeta)
- Reutiliza: Extender ResourceCard.astro con un slot/prop opcional `spark` (SVG string); nuevo helper lib/sparks.ts

#### Constelación de recursos: cómo se unen los datos

- Tipo: grafo de red (nodos = recursos, aristas = uniones por id) · impacto 4 · esfuerzo M · requiere datos nuevos
- Qué muestra: Que los recursos no son islas: el crosswalk, las amenazas, los esquemas y la línea temporal apuntan todos al registro de obligaciones; los daños y amenazas a los patrones; los contratos a artículos. El lector entiende la arquitectura del corpus y por dónde entrar según su pregunta.
- Datos: Aristas derivables: crosswalk refs[].obligationId, threats[].obligations y threats[].patterns, schemas x-evidences, aiActMilestones[].obligationIds, harms[].controllingPattern.patternId, clauses[].mapsTo. Hace falta un pequeño dataset declarativo `resourceGraph` (nodo, destino, campo de unión, recuento) en src/data/ calculado en build.
- Ubicación: Al final de la página, tras el bento, en banda tintada con título 'Cómo se conectan'.
- Interacción: hover resalta vecinos; clic en nodo navega; sin JS es SVG estático + lista de uniones
- Reutiliza: Nuevo componente compartido RadialNetwork.astro (disposición determinista calculada en build), reutilizable en /resources/threats y /glossary/[slug]

### `/resources/frameworks`

- Fichero: `site/src/pages/resources/frameworks.astro`
- Propósito: Catálogo de los 78 instrumentos (leyes, estándares, códigos, controles) y el índice inverso obligación, artefacto, capa de 182 filas.
- Pobreza visual: 2/5
- Visuales actuales: Figure instrument-lineage (SVG a mano, src/figures/instrument-lineage.svg); Diagram archify obligation-to-evidence; ObligationMatrix (mapa de calor marco x capa con filtrado, public/matrix.js); FrameworkTable y ObligationTable (tablas); Callout y bandas tintadas con malla

#### Enjambre temporal de obligaciones **RECHAZADA**

- Tipo: beeswarm sobre eje temporal (2016 a 2030, con cubo 'antes de 2016') · impacto 5 · esfuerzo M
- Qué muestra: Cuándo empieza a aplicarse cada una de las 129 obligaciones con fecha: el gran pico de 2026-2027 (29 y 41 filas), los diferidos por el Omnibus frente a lo ya en vigor, y la marca 'hoy'. El lector ve la ola regulatoria que se le viene encima y en qué año concentrar evidencias.
- Datos: data/frameworks.ts obligations[]: appliesFrom (129 filas con fecha), appliesStatus (in-force 70, voluntary 49, deferred 38, pending 9, applies-later 8, grace 8), frameworkId, id; marca 'hoy' = reviewed/asOf. Estado codificado también por forma (relleno, anillo, discontinuo) para no depender del color.
- Ubicación: Banda 'Obligation → artefact → layer', antes del Diagram obligation-to-evidence.
- Interacción: hover muestra id y cláusula (title SVG); clic abre /obligations/<id>; tabla alternativa en <details>
- Reutiliza: Nuevo componente compartido Beeswarm.astro (colocación de puntos en build); reutilizable en /obligations
- Motivo del rechazo: Duplica el héroe ObligationTimeline de /obligations (misma fuente, mismas 129 filas). /resources/frameworks conserva ObligationMatrix y gana el treemap.

#### Mosaico de instrumentos por tipo

- Tipo: treemap (tamaño = nº de obligaciones, grupos = tipo) · impacto 4 · esfuerzo M
- Qué muestra: Qué pesa cada instrumento en el mapa: la AI Act (50 filas) y el RGPD (15) dominan, seguidos de ISO 42001 y la ley coreana; la larga cola de leyes estatales de EE. UU. con una fila cada una; y los marcos sin filas propias. Agrupado por law, standard, framework, code, controls.
- Datos: data/frameworks.ts frameworks[] (id, short, type: law 46, standard 13, framework 16, code 2, controls 1) + recuento de obligations[].frameworkId por instrumento.
- Ubicación: Primera banda, entre la Figure instrument-lineage y FrameworkTable.
- Interacción: cada tesela enlaza a #fw-<id> en la tabla; hover con nombre completo; tabla alternativa
- Reutiliza: Nuevo helper lib/treemap.ts (squarify en build, SVG string) dentro de Figure.astro

#### Gofre de estado de aplicación **RECHAZADA**

- Tipo: waffle chart 182 celdas + fila de StatTile · impacto 4 · esfuerzo S
- Qué muestra: La proporción de obligaciones que ya obligan hoy frente a las voluntarias, diferidas, en periodo de gracia o pendientes. Responde en un segundo a '¿cuánto de esto es exigible ya?'.
- Datos: data/frameworks.ts obligations[].appliesStatus y appliesStatusLabels.
- Ubicación: Cabecera de la banda del índice inverso, a la derecha del texto introductorio (una columna en 390 px).
- Interacción: estático; opcional clic en bloque filtra ObligationTable por estado vía matrix.js
- Reutiliza: StatTile.astro para las cifras + nuevo WaffleGrid.astro compartido
- Motivo del rechazo: Duplica el isotipo de estados por instrumento de /obligations, que además agrupa por instrumento.

#### AI Act: quién está obligado a qué clase de sistema

- Tipo: matriz de puntos (titular del deber x clase de sistema) · impacto 3 · esfuerzo M · requiere datos nuevos
- Qué muestra: Para las 50 filas de la AI Act, cuántas recaen en proveedor, desplegador, proveedor GPAI, importador, distribuidor o representante, cruzadas con prohibido, Anexo III, Anexo I, Art. 50, GPAI, GPAI sistémico. El lector localiza su rol y ve su carga.
- Datos: data/frameworks.ts obligations[] con frameworkId eu-ai-act: dutyHolder (texto libre, 24 'Provider', 8 'Deployer', 3 'GPAI provider'...) y systemClass. Falta un pequeño mapa de normalización dutyHolder a 6 roles canónicos (p. ej. en lib/obligations.ts).
- Ubicación: Última banda, entre ObligationMatrix y ObligationTable.
- Interacción: clic en punto filtra la tabla por titular (ya existe filtro de duty holder en matrix.js)
- Reutiliza: Nuevo DotMatrix.astro compartido (también para /resources/contracts y /resources/threats)

### `/resources/crosswalk`

- Fichero: `site/src/pages/resources/crosswalk.astro`
- Propósito: Crosswalk de 25 temas de gobernanza por 16 columnas de instrumentos, con solapamiento EU/ISO/NIST, explorador cláusula a cláusula y exportación OSCAL.
- Pobreza visual: 3/5
- Visuales actuales: ObligationLookup (widget de búsqueda); Tabla de solapamiento EU AI Act / ISO 42001 / NIST AI RMF; CrosswalkMatrix (rejilla de chips, 4 columnas por defecto + selector); Explorador cwx (JS) y CrosswalkDrawer; Secciones por tema

#### Venn de las tres grandes **[T1]**

- Tipo: diagrama de Venn de 3 conjuntos (UpSet en móvil) · impacto 5 · esfuerzo S
- Qué muestra: En cuántos de los 25 temas coinciden la AI Act, ISO 42001 y NIST AI RMF, y cuáles solo toca la AI Act sin cláusula ISO o NIST. Convierte la frase 'se solapan en N temas' en una imagen memorable con los nombres de los temas en cada región.
- Datos: Ya calculado en crosswalk.astro: overlapRows (topics x refsByTopic para eu-ai-act, iso-42001, nist-ai-rmf), inAllThree, actWithoutIso, actWithoutNist.
- Ubicación: Sección 'where they overlap', encima de la tabla cw-overlap-table (hero de la página).
- Interacción: hover en región resalta sus temas; cada tema enlaza a #topic-<id>; la tabla existente es la alternativa
- Reutiliza: Nuevo VennThree.astro (SVG en build); en 390 px cambia a barras UpSet
- **CORREGIDA**: Página vetada por perf.spec: componente con CSS propio (raíz .chart), sin clases figc. A 390 px cambiar a barras UpSet. Si inAllThree domina, rotular las regiones pequeñas (actWithoutIso, actWithoutNist) que son la noticia.

#### Mapa de calor de densidad 25 x 16

- Tipo: heatmap con barras marginales (filas y columnas) · impacto 5 · esfuerzo M
- Qué muestra: Toda la cobertura de un golpe, las 16 columnas visibles incluso en 390 px: intensidad = nº de cláusulas por celda, núcleo relleno frente a relacionadas con trama, '?' las no verificadas. Las marginales muestran qué temas están más regulados y qué instrumentos son más amplios.
- Datos: data/crosswalk.ts topicMatrix(), refs[] (topic, framework, strength core/related, verified), columns[] (16), columnOf().
- Ubicación: Sección 'Topic × framework', antes de CrosswalkMatrix, como vista panorámica.
- Interacción: clic en celda abre el drawer del tema (crosswalk.js ya lo hace para la rejilla) o salta a #topic-<id>
- Reutiliza: Nuevo componente compartido HeatGrid.astro generalizando lib/aigp-heatmap.ts; útil también para el frontier safety crosswalk

#### Cuerdas de temas entrelazados

- Tipo: diagrama de cuerdas (chord) entre temas · impacto 4 · esfuerzo M
- Qué muestra: Qué temas comparten la misma cláusula (p. ej. gestión de riesgos, evaluación de conformidad y documentación): revela dónde una sola evidencia sirve a varios temas y dónde el crosswalk es denso.
- Datos: data/crosswalk.ts refs[] agrupadas por clauseId(r): cada cláusula archivada en varios temas genera un par de temas; ancho de cuerda = nº de cláusulas compartidas.
- Ubicación: Después del explorador cwx, antes de 'By topic'.
- Interacción: hover en arco resalta sus cuerdas; tabla de pares en <details>
- Reutiliza: Nuevo Chord.astro (geometría en build, sin librería runtime)

### `/resources/crosswalk/{iso-42001-vs-eu-ai-act, nist-ai-rmf-vs-eu-ai-act, nist-ai-rmf-vs-iso-42001}`

- Fichero: `site/src/components/ComparisonPage.astro`
- Propósito: Plantilla compartida de las tres páginas 'A vs B': respuesta corta, ficha At a glance, solapamiento tema a tema, FAQ y siguiente paso.
- Pobreza visual: 5/5
- Visuales actuales: Callout 'In short'; Tabla At a glance; Tabla de solapamiento por tema con etiqueta de nivel; NextStep

#### Mariposa de cláusulas por tema

- Tipo: barras divergentes (butterfly) por tema · impacto 5 · esfuerzo M
- Qué muestra: Para cada tema, a la izquierda cuántas cláusulas pide A y a la derecha cuántas B (núcleo sólido, relacionadas con trama), con la etiqueta de nivel en el eje central. El lector ve dónde un instrumento es mucho más exigente que el otro y dónde solo uno está presente.
- Datos: src/lib/comparisons.ts buildComparison(def).rows: row.a, row.b (listas de CrosswalkRef con strength), row.level (strong/partial/a-only/b-only), row.topic.
- Ubicación: Sección 'Where they overlap, topic by topic', antes de la tabla (hero de las tres páginas).
- Interacción: cada fila enlaza al tema del crosswalk; la tabla existente es la alternativa
- Reutiliza: Nuevo DivergingBars.astro compartido, usado por ComparisonPage para las tres rutas

#### Barra de solapamiento **[T1]**

- Tipo: barra 100 % apilada + cifras · impacto 4 · esfuerzo S
- Qué muestra: Cuántos temas son solapamiento fuerte, parcial, solo A o solo B: el resumen visual de overlapSummary en una línea, para leer antes que nada.
- Datos: lib/comparisons.ts Comparison.counts y OverlapLevel; levelLabel().
- Ubicación: Junto al callout 'In short', arriba de la página.
- Interacción: estático; segmentos con etiqueta directa y porcentaje
- Reutiliza: Nuevo StackedBar100.astro compartido (también en hub y plantillas)

#### Ficha de fuerza comparada

- Tipo: tarjetas de glifos lado a lado (vinculante, certificable, sanciones, alcance territorial) · impacto 3 · esfuerzo S · requiere datos nuevos
- Qué muestra: La diferencia de naturaleza entre ambos instrumentos en cuatro iconos: ley vinculante frente a estándar certificable frente a marco voluntario. Evita el error clásico de 'cumplir ISO = cumplir la AI Act'.
- Datos: data/comparisons.ts glance[id] (legalForce, certifiable, scope son texto). Hace falta añadir campos booleanos/enum pequeños por instrumento: binding, certifiable, penalties, extraterritorial.
- Ubicación: Sección 'At a glance', encima de la tabla.
- Interacción: estático; cada glifo con texto visible
- Reutiliza: Nuevo GlanceGlyphs.astro dentro de ComparisonPage

### `/resources/glossary (301 a /bok/glossary en producción)`

- Fichero: `site/src/pages/resources/glossary.astro`
- Propósito: Índice A-Z del glosario con pares confundidos; en producción redirige a /bok/glossary, así que los visuales deben vivir en GlossaryIndex/ContrastCards para aparecer en ambas.
- Pobreza visual: 4/5
- Visuales actuales: ContrastCards (pares confundidos); GlossaryIndex (índice A-Z con saltos por letra)

#### Espectro A-Z **RECHAZADA**

- Tipo: histograma de letras que funciona como navegación · impacto 3 · esfuerzo S
- Qué muestra: Cuántos términos hay por letra; la barra de letras deja de ser una fila de enlaces y pasa a mostrar la forma del vocabulario.
- Datos: lib/glossary.ts getGlossary()[].letter y getGlossaryLetters().
- Ubicación: Dentro de GlossaryIndex, sustituyendo o encima de la barra de saltos por letra.
- Interacción: cada barra es un enlace a la letra
- Reutiliza: Extender GlossaryIndex.astro (compartido con /bok/glossary)
- Motivo del rechazo: La ruta hace 301 a /bok/glossary en producción; se implementa una sola vez dentro de GlossaryIndex/ContrastCards (compartidos), no como propuesta de ruta.

#### Constelación de términos

- Tipo: grafo de red de términos (aristas: contraste discontinuo, relacionados sólido) · impacto 5 · esfuerzo L
- Qué muestra: Los racimos del vocabulario de la disciplina (evidencias, riesgo, agentes, transparencia) y los pares que se confunden, como mapa navegable.
- Datos: lib/glossary.ts getGlossary()[].contrast, getContrastPairs(), relatedTerms(slug), see[].href para agrupar por sección.
- Ubicación: Tras ContrastCards y antes del índice A-Z (en /bok/glossary el mismo sitio).
- Interacción: hover resalta vecinos; clic abre /glossary/<slug>; posiciones calculadas en build; sin JS es SVG + el índice
- Reutiliza: RadialNetwork.astro compartido (propuesto en /resources) con disposición de fuerzas precomputada en build

#### Capítulos que más vocabulario definen

- Tipo: barras horizontales por capítulo 01-23 · impacto 3 · esfuerzo S
- Qué muestra: Qué capítulos concentran términos del glosario (chapterRefs), útil para saber dónde leer primero.
- Datos: lib/glossary.ts getGlossary()[].chapterRefs.
- Ubicación: Pie de GlossaryIndex.
- Interacción: cada barra enlaza al capítulo
- Reutiliza: Nuevo BarList.astro compartido

### `/glossary/[slug]`

- Fichero: `site/src/pages/glossary/[slug].astro`
- Propósito: Página canónica de cada término: definición citada, dónde se desarrolla, pares confundidos, uso en el libro, patrones, términos relacionados y fuentes.
- Pobreza visual: 4/5
- Visuales actuales: ContrastCards (si el término tiene par); Lista dl de hechos; Lista 'Where it is used' con recuento de menciones

#### Huella del término en el libro

- Tipo: tira de 23 barras (capítulos 01-23), altura = menciones · impacto 4 · esfuerzo S
- Qué muestra: En qué capítulos vive el término y con qué intensidad; se resaltan los capítulos de chapterRefs. El lector ve si es un término transversal o de un solo capítulo.
- Datos: lib/glossary.ts termUsage(slug) (chapter, count, href) + entry.chapterRefs.
- Ubicación: Sección 'Where it is used', encima de la lista gt-usage.
- Interacción: cada barra enlaza a use.href; la lista existente es la alternativa
- Reutiliza: Nuevo SparkStrip.astro (SVG en build) generado por término

#### Vecindario del término **[T2]**

- Tipo: grafo ego radial · impacto 4 · esfuerzo M
- Qué muestra: El término en el centro, sus contrastes (arista discontinua 'no confundir'), términos relacionados y patrones que lo usan en órbitas: contexto conceptual en un vistazo.
- Datos: lib/glossary.ts relatedTerms(slug, 8), entry.contrast, contrastPairsFor(slug); patrones ya calculados en la página (sección in-patterns).
- Ubicación: Sección 'Related terms', antes de la lista.
- Interacción: nodos enlazan a sus páginas; estático sin JS
- Reutiliza: RadialNetwork.astro en modo ego

### `/resources/reading-list`

- Fichero: `site/src/pages/resources/reading-list.astro`
- Propósito: Vista filtrable (audiencia, jurisdicción) de la bibliografía anotada de 162 fuentes; canónica en /bok/reading-list.
- Pobreza visual: 5/5
- Visuales actuales: Chips de filtro con recuentos; ReadingList (listas por tema)

#### Matriz tema x audiencia

- Tipo: heatmap (temas en filas, 5 audiencias en columnas) · impacto 5 · esfuerzo M
- Qué muestra: Qué temas sirven a ingeniería, gobierno y riesgo, legal, dirección o investigación; revela huecos (p. ej. pocos recursos de dirección en un tema).
- Datos: lib/reading-list.ts getReadingList(): groups[].group, items[].audience; AUDIENCES, audienceLabels.
- Ubicación: Bajo el PageHero, encima de los filtros (hero).
- Interacción: clic en celda activa los radios de audiencia (catalogue-filter.js) y salta al tema
- Reutiliza: HeatGrid.astro compartido

#### Cartograma de jurisdicciones

- Tipo: mapa de teselas con burbujas de recuento · impacto 4 · esfuerzo M
- Qué muestra: De dónde vienen las fuentes: UE, EE. UU., Reino Unido, global... tamaño = nº de fuentes. Muestra el sesgo geográfico de la bibliografía.
- Datos: lib/reading-list.ts readingJurisdictions(groups) (key, label, count); disposición de teselas reutilizable de la figura jurisdiction-tiles (src/figures/jurisdiction-tiles.svg / data/jurisdictions.ts codes).
- Ubicación: Junto al fieldset de jurisdicción.
- Interacción: clic en tesela aplica el filtro de jurisdicción
- Reutiliza: Nuevo TileMap.astro compartido (también DPIA)
- **CORREGIDA**: readingJurisdictions() devuelve claves no geográficas (global, internacional, UE) y pocas: un tile map queda vacío y engañoso. Usar barras ordenadas (RankedBars) enlazadas al filtro de jurisdicción.

#### Verificación por tema **RECHAZADA**

- Tipo: pequeños múltiplos de barras 100 % (primary, secondary, reported) · impacto 3 · esfuerzo S
- Qué muestra: La calidad de la evidencia por tema: cuánto se apoya en fuentes primarias frente a relatos.
- Datos: lib/reading-list.ts items[].verified por groups[].
- Ubicación: Tras la nota de etiquetas de verificación del hero.
- Interacción: estático
- Reutiliza: StackedBar100.astro compartido
- Motivo del rechazo: Duplica la lectura de verificación de /about/methodology.

### `/resources/tools`

- Fichero: `site/src/pages/resources/tools.astro`
- Propósito: Catálogo de 96 herramientas por categoría y capa, con licencia y modelo de acceso, filtrable.
- Pobreza visual: 3/5
- Visuales actuales: Leyenda de capas L1-L5; Diagram archify reference-toolchain; Catálogo filtrable por capa y licencia

#### Mosaico del catálogo por capa

- Tipo: isotipo (1 cuadrado = 1 herramienta) en 5 columnas de capa · impacto 5 · esfuerzo M
- Qué muestra: Cuántas herramientas hay por capa y de qué tipo: color = capa, forma/trama = acceso (open source relleno 66, estándar abierto contorno 11, comercial trama 13, source-available 4, servicio gratuito 2). Se ve qué capa está más servida por código abierto.
- Datos: data/stack.ts allTools() (tool.name, tool.access, layers vía toolLayers()), layers[], toolAccessLabels.
- Ubicación: Sección 'The catalogue', antes de los filtros (hero).
- Interacción: hover con nombre; clic salta a la ficha; alternativa tabla capa x acceso
- Reutiliza: IsotypeRows.astro compartido en modo columnas

#### Espectro de licencias por categoría

- Tipo: barras horizontales apiladas por categoría · impacto 4 · esfuerzo S
- Qué muestra: Qué categorías están dominadas por productos comerciales y cuáles por software abierto; ayuda a elegir por dónde empezar sin licencia.
- Datos: data/stack.ts toolCatalogue[] (category, layers, tools[].access, tools[].licence).
- Ubicación: Tras la leyenda y el Diagram de la sección 'The five layers'.
- Interacción: clic en segmento aplica el filtro de licencia existente (catalogue-filter.js)
- Reutiliza: Nuevo StackedBars.astro compartido

#### Nube de licencias SPDX **RECHAZADA**

- Tipo: treemap de licencias (Apache-2.0 43, MIT 18, Proprietary 14...) · impacto 3 · esfuerzo S
- Qué muestra: La concentración de licencias concretas, útil para equipos de compras y legal.
- Datos: data/stack.ts tools[].licence.
- Ubicación: Pie de la sección del catálogo.
- Interacción: estático con tabla alternativa
- Reutiliza: lib/treemap.ts compartido (propuesto en frameworks)
- Motivo del rechazo: Poca información nueva frente a las barras apiladas de acceso por categoría; treemap de una sola dimensión con larga cola. Añadir la licencia al title de cada celda del isotipo.

### `/resources/templates`

- Fichero: `site/src/pages/resources/templates.astro`
- Propósito: Biblioteca de 24 JSON Schemas por etapa del ciclo de vida más el kit de políticas, cada campo etiquetado con obligaciones.
- Pobreza visual: 5/5
- Visuales actuales: Lista ordenada de etapas con nombres de esquema (texto); Tablas por etapa y del kit

#### Anillo del ciclo de vida de los registros

- Tipo: anillo de ciclo de vida (6 arcos + centro 'toda la organización') · impacto 5 · esfuerzo M
- Qué muestra: Los 24 registros colocados en su etapa (intake, build, test, release, operate, retire; policy-card, training-record, evidence-record, control-observation al centro), tamaño = nº de campos, relleno interior = proporción de requeridos. Sustituye la lista textual por el mapa de la biblioteca.
- Datos: lib/schemas-library.ts getSchemas() (name, title, stage, fieldCount, requiredCount); data/templates.ts stages[], schemaOrder.
- Ubicación: Sección 'How the library fits together', reemplazando/encima de ol.tpl-stages (hero).
- Interacción: cada nodo enlaza a su fila en la tabla; alternativa la lista ol existente
- Reutiliza: Nuevo LifecycleRing.astro; estilo coherente con GovernanceLoop

#### Matriz registro x instrumento **[T3]**

- Tipo: heatmap (24 esquemas x instrumentos: AI Act, ISO 42001, NIST AI RMF, RGPD...) · impacto 4 · esfuerzo M
- Qué muestra: Qué registros cargan más peso probatorio y para qué norma (model-card con 40 marcas x-evidences, impact-assessment, register entries). El lector prioriza qué registro implantar primero.
- Datos: public/schemas/*.v1.json x-evidences (nivel registro y campo), agrupando por prefijo de instrumento ('EU AI Act', 'ISO/IEC 42001', 'NIST AI RMF'...).
- Ubicación: Tras la sección 'Schemas, by lifecycle stage'.
- Interacción: clic en fila salta al esquema
- Reutiliza: HeatGrid.astro compartido
- **CORREGIDA**: Fuente confirmada (x-evidences en public/schemas/*.v1.json: 17 a 19 marcas en los registros); normalizar prefijos de instrumento en build y generar desde getSchemas() para no leer JSON públicos a mano.

#### Requeridos frente a opcionales

- Tipo: barras apiladas horizontales por esquema · impacto 3 · esfuerzo S
- Qué muestra: El tamaño y la exigencia de cada formato: cuántos campos obligatorios frente al total.
- Datos: getSchemas() requiredCount, fieldCount.
- Ubicación: Dentro de cada tabla de etapa como micro-barra en una columna nueva.
- Interacción: estático
- Reutiliza: StackedBars.astro compartido

#### Cadena de registros

- Tipo: diagrama de flujo arriba-abajo · impacto 4 · esfuerzo M · requiere datos nuevos
- Qué muestra: Cómo un registro alimenta al siguiente (caso de uso, clasificación, registro del sistema, evaluación de impacto, plan de pruebas, resultado, go/no-go, despliegue, monitorización, incidente, retirada), terminando en el evidence record.
- Datos: Los esquemas no se referencian entre sí ($ref); hay campos *_id (record_id, plan_id, decision_id...). Hace falta un pequeño dataset `recordFlow` (from, to, campo) en data/templates.ts.
- Ubicación: Sección 'Using the schemas'.
- Interacción: estático; nodos enlazan al esquema
- Reutiliza: FlowDiagram.astro existente

### `/resources/threats`

- Fichero: `site/src/pages/resources/threats.astro`
- Propósito: Puente de 51 amenazas de 4 catálogos (OWASP LLM, OWASP ASI, MITRE ATLAS, NIST AML) al control, la prueba y la obligación.
- Pobreza visual: 5/5
- Visuales actuales: Lista ordenada de 4 pasos 'How to read a row'; Filtros por catálogo y capa; Tarjetas por amenaza con detalles

#### Red de equivalencias entre catálogos **[T5]**

- Tipo: red radial en 4 arcos (uno por catálogo) con aristas de 'related' · impacto 5 · esfuerzo M
- Qué muestra: Que la misma amenaza tiene ids en varios catálogos (inyección de prompts = LLM01, AML.T0051, NISTAML.018): racimos de equivalencia y amenazas huérfanas. Hero de la página.
- Datos: data/threats.ts threats[] (id, taxonomy, externalId, name, related[]); taxonomies[] (short).
- Ubicación: Tras 'How to read a row', antes de los filtros.
- Interacción: hover resalta equivalentes; clic salta a #threat-<id>
- Reutiliza: RadialNetwork.astro compartido

#### Flujo catálogo, capa, herramienta de prueba

- Tipo: Sankey / alluvial de 3 columnas · impacto 5 · esfuerzo M
- Qué muestra: De qué catálogo vienen las amenazas, en qué capa se controlan y con qué herramienta se prueban (promptfoo 30, garak 22, custom 19, Inspect 13): dónde hay que escribir pruebas propias.
- Datos: data/threats.ts threats[].taxonomy, layers[], evals[].tool.
- Ubicación: Cabecera de la sección '51 threats from four catalogues'.
- Interacción: hover en flujo muestra recuento; tabla alternativa
- Reutiliza: Nuevo Alluvial.astro compartido (también en /resources/harms)

#### Mapa de calor CSA AICM

- Tipo: heatmap catálogo x 18 dominios AICM (conmutable a ISO 42001 Anexo A) · impacto 4 · esfuerzo S
- Qué muestra: Qué dominios de control concentran las amenazas (AIS, TVM, DSP...) y cuáles apenas aparecen.
- Datos: data/threats.ts threats[].aicm y aicmDomains; alternativa threats[].iso42001 e iso42001Controls.
- Ubicación: Sección 'The control frameworks beside each row'.
- Interacción: estático; conmutador opcional (radio CSS) entre AICM e ISO
- Reutiliza: HeatGrid.astro compartido

#### Matriz de casos de uso COSAiS

- Tipo: matriz de puntos catálogo x 5 casos de uso · impacto 3 · esfuerzo S
- Qué muestra: Qué amenazas afectan a asistente GenAI, predictivo, agente único, multiagente o desarrolladores; útil para acotar el modelo de amenazas al caso propio.
- Datos: data/threats.ts threats[].cosais y cosaisUseCases.
- Ubicación: Junto al mapa AICM.
- Interacción: estático
- Reutiliza: DotMatrix.astro compartido

### `/resources/harms`

- Fichero: `site/src/pages/resources/harms.astro`
- Propósito: Atlas de 25 daños por nivel (individual a entorno), con modo de fallo, control, capa, evidencia e incidentes reales.
- Pobreza visual: 5/5
- Visuales actuales: Filtro por nivel; Tarjetas por daño agrupadas por nivel; Existe la figura harm-levels en figures.ts pero solo se coloca en el capítulo 13, no en esta página

#### Diana de niveles de daño

- Tipo: anillos concéntricos (individual en el centro, entorno fuera) x 7 sectores de dominio MIT · impacto 5 · esfuerzo M
- Qué muestra: Cada daño como un punto en su anillo y en su sector MIT (discriminación, privacidad, desinformación, mal uso, interacción, socioeconómico, seguridad del sistema), coloreado por la capa del control que lo atrapa. Se ven concentraciones (organización 9, sociedad 6) y vacíos.
- Datos: data/harms.ts harms[] (id, level, harmType, mitTaxonomy vía mitDomainOf(), layerN); levelOrder, mitDomains.
- Ubicación: Sección 'The atlas', antes de los filtros (hero).
- Interacción: hover con tipo de daño; clic salta a #harm-<id>; tabla alternativa
- Reutiliza: Nuevo RadialRings.astro

#### Aluvial mecanismo, nivel, capa **[T3]**

- Tipo: alluvial de 3 columnas · impacto 4 · esfuerzo M
- Qué muestra: Cómo los 9 mecanismos (escala, seguridad, sesgo, mal uso...) desembocan en niveles de daño y en qué capa se controlan; muestra que la escala alimenta el daño social.
- Datos: data/harms.ts harms[].mechanism, level, layerN; mechanismLabel, levelLabel.
- Ubicación: Tras la diana, antes de las tarjetas.
- Interacción: hover en flujo; tabla alternativa
- Reutiliza: Alluvial.astro compartido

#### Incrustar la figura 'Harm at five levels'

- Tipo: infografía existente (harm-levels.svg) · impacto 3 · esfuerzo S
- Qué muestra: Un ejemplo de daño por nivel con su control y capa: la puerta de entrada didáctica al atlas.
- Datos: src/figures/harm-levels.svg y entrada 'harm-levels' de data/figures.ts (añadir pages: ['/resources/harms']).
- Ubicación: Primera banda, tras el Callout.
- Interacción: estático con <details> existente
- Reutiliza: Figure.astro + getFigure('harm-levels')

#### Cobertura de la taxonomía MIT

- Tipo: rejilla de 24 subdominios en 7 filas de dominio · impacto 3 · esfuerzo S
- Qué muestra: Qué subdominios del MIT AI Risk Repository tienen daños en el atlas (celda con recuento) y cuáles no (celda discontinua): la agenda pendiente del atlas.
- Datos: data/harms.ts mitSubdomains, mitDomains, harms[].mitTaxonomy.
- Ubicación: Sección 'Sources and attribution', junto a mitAttribution.
- Interacción: estático
- Reutiliza: HeatGrid.astro compartido

### `/resources/contracts`

- Fichero: `site/src/pages/resources/contracts.astro`
- Propósito: 18 cláusulas contractuales de IA (bandera roja, redacción alternativa, evidencia) y 6 familias de licencias de modelos y datos.
- Pobreza visual: 5/5
- Visuales actuales: Tabla de cláusulas; Tabla de familias de licencia

#### Matriz cláusula x norma **[T1]**

- Tipo: matriz de puntos (18 cláusulas x referencias agrupadas por instrumento) · impacto 5 · esfuerzo S
- Qué muestra: Qué cláusulas responden a qué artículos (AI Act 13, 25(4), 26; RGPD 28, 33, 44; NIS2 21; DORA 28; ISO 42001 A.10; NIST GOVERN 6, MANAGE 3; PLD; MCC-AI). Revela las cláusulas imprescindibles (varias normas) y cuáles son solo buena práctica.
- Datos: data/contracts.ts clauses[] (id, clause, mapsTo[]) y references (label, url).
- Ubicación: Sección 'Contract clauses', antes de la tabla (hero).
- Interacción: cada fila enlaza a la cláusula de la tabla; cada columna al artículo
- Reutiliza: DotMatrix.astro compartido

#### Regla de apertura de licencias

- Tipo: escala ordinal horizontal (permisiva a no comercial) · impacto 4 · esfuerzo S · requiere datos nuevos
- Qué muestra: Las 6 familias colocadas de menos a más restrictiva con ejemplos y qué vigilar; ayuda a leer una licencia de modelo en segundos.
- Datos: data/contracts.ts licenceTypes[] (family, examples, obligations, watch) en el orden ya definido; conviene fijar un campo `openness` ordinal explícito.
- Ubicación: Sección 'Licence families', encima de la tabla.
- Interacción: estático; cada marca enlaza a su fila
- Reutiliza: Nuevo OrdinalScale.astro

#### Carril del ciclo de vida del contrato

- Tipo: swimlane (antes de firmar, en operación, al salir) · impacto 4 · esfuerzo M · requiere datos nuevos
- Qué muestra: En qué momento importa cada cláusula: no entrenamiento y residencia al negociar; incidentes, cambios y auditoría en operación; salida y retención al final.
- Datos: data/contracts.ts clauses[]; falta un campo `phase` ('negotiate' | 'operate' | 'exit') por cláusula.
- Ubicación: Tras la matriz cláusula x norma.
- Interacción: estático
- Reutiliza: WorkflowGrid.astro existente o nuevo Swimlane.astro

### `/resources/data`

- Fichero: `site/src/pages/resources/data.astro`
- Propósito: Documentación de la API estática /api/v1 (16 datasets), el sobre, los ids de obligación, versionado, acceso, MCP y cita.
- Pobreza visual: 5/5
- Visuales actuales: Tabla de endpoints; Tabla de códigos de instrumento; Citation

#### Grafo de datasets y uniones

- Tipo: grafo de nodos (tamaño = nº de registros) con aristas por clave · impacto 5 · esfuerzo M · requiere datos nuevos
- Qué muestra: Cómo se enlazan los 16 datasets (obligations como hub: crosswalk.obligationId, threats.obligations, controls, línea temporal; harms y threats a patterns). El desarrollador ve qué join hacer antes de descargar.
- Datos: lib/api.ts datasets[] (name, build() para contar registros); aristas desde campos conocidos (crosswalk refs obligationId, threats obligations/patterns, harms controllingPattern). Hace falta una lista declarativa `joins` junto a datasets.
- Ubicación: Sección 'Endpoints', encima de la tabla (hero).
- Interacción: clic en nodo abre /api/v1/<name>.json; tabla alternativa
- Reutiliza: RadialNetwork.astro compartido

#### Anatomía de un id de obligación

- Tipo: diagrama anotado con corchetes · impacto 3 · esfuerzo S
- Qué muestra: AIGE-OBL-EUAIA-ART9 descompuesto en prefijo, tipo, código de instrumento y cláusula, con la regla de estabilidad (un id nunca se reutiliza).
- Datos: data/frameworks.ts OBLIGATION_ID_PATTERN, exampleRow de la página y el mapa codes ya calculado.
- Ubicación: Sección 'Obligation ids', antes de la lista de reglas.
- Interacción: estático
- Reutiliza: Figure.astro con SVG a mano en src/figures

#### Volumen por dataset

- Tipo: barras horizontales con insignia de schemaVersion · impacto 3 · esfuerzo S
- Qué muestra: Cuántos registros trae cada endpoint y su versión de esquema; orienta sobre tamaño de descarga y estabilidad.
- Datos: lib/api.ts datasets[].build() (longitud del array principal), schemaVersion.
- Ubicación: Sección 'Versioning and stability'.
- Interacción: estático
- Reutiliza: BarList.astro compartido

### `/resources/dpia-lists`

- Fichero: `site/src/pages/resources/dpia-lists.astro`
- Propósito: Las 18 listas nacionales de DPIA (Art. 35(4) RGPD) del registro EDPB, su cruce con el Anexo III de la AI Act y sus ítems.
- Pobreza visual: 4/5
- Visuales actuales: Tabla de listas con columnas de marca sí/no por tema; Lista de hallazgos en texto; Secciones de ítems por lista

#### Mapa de teselas del EEE

- Tipo: cartograma de teselas (UE/EEE + Reino Unido) · impacto 5 · esfuerzo M · requiere datos nuevos
- Qué muestra: Los 18 países con lista (relleno por nº de ítems o método), anillo en los que nombran la IA, y trama en los 8 con dictamen de 2018 pero sin lista en el registro (Austria, Bélgica, Malta, Países Bajos, Portugal, Rumanía, Eslovaquia, Suecia). Hero.
- Datos: data/dpia-lists.ts lists[] (country, itemCount, method, aiNamed, aiNamedInRegister); los 8 países sin lista están solo en el texto de la página, falta una constante `opinionWithoutList`.
- Ubicación: Justo antes de la sección 'The 18 lists'.
- Interacción: clic en tesela salta a #dpia-<id>; la tabla es la alternativa
- Reutiliza: TileMap.astro compartido (reutilizable en reading-list y jurisdicciones)
- **CORREGIDA**: Una única figura (TileMap) con placement en el capítulo 19 y pages ['/resources/dpia-lists']. jurisdiction-tiles no tiene rejilla de Estados miembros: hay que añadir una constante pequeña de posiciones EEE y la constante opinionWithoutList (8 países) en src/data/dpia-lists.ts; dataReady false en ambas páginas.

#### Matriz país x Anexo III **[T1]**

- Tipo: heatmap 18 listas x 8 áreas del Anexo III con marginales · impacto 4 · esfuerzo S
- Qué muestra: Qué áreas de alto riesgo de la AI Act ya eran disparador de DPIA en cada país y cuál es la superposición más frecuente.
- Datos: data/dpia-lists.ts lists[].items[].annexIII, annexIIIOrder, annexIIICounts().
- Ubicación: Sección 'What the lists show', junto al punto de superposición con el Anexo III.
- Interacción: clic en celda salta a los ítems
- Reutiliza: HeatGrid.astro compartido

#### Las listas son anteriores a la AI Act

- Tipo: línea temporal de puntos (adopción, última actualización) · impacto 4 · esfuerzo S
- Qué muestra: Adopción 2018-2019, pocas actualizaciones posteriores y la AI Act de 2024 como hito: confirma visualmente que las listas no se han puesto al día.
- Datos: data/dpia-lists.ts lists[].adopted, lastUpdate, edpbOpinion.date; adoptionRange(), updatedAfter2019().
- Ubicación: Sección 'What the lists show', en el punto 'The lists predate the AI Act'.
- Interacción: hover con país y fecha
- Reutiliza: Nuevo TimeAxis.astro compartido (también plazos del AI Act)

#### Tamaño y método de cada lista

- Tipo: barras ordenadas por nº de ítems, trama por método (enumerada, puntuada, mixta) · impacto 3 · esfuerzo S
- Qué muestra: Qué países tienen listas extensas o escuetas y cómo deciden (enumeración frente a criterios puntuados).
- Datos: data/dpia-lists.ts lists[].itemCount, method, methodCounts().
- Ubicación: Antes de 'The items, list by list'.
- Interacción: cada barra enlaza a su lista
- Reutiliza: BarList.astro compartido

### `/resources/ai-act-deadlines (+ /es/resources/ai-act-deadlines)`

- Fichero: `site/src/components/AiActDeadlines.astro`
- Propósito: Plazos de aplicación de la AI Act tras el Digital Omnibus (13 hitos), qué cambió y la situación española; cuerpo compartido EN/ES.
- Pobreza visual: 4/5
- Visuales actuales: Tarjeta 'Next' con la próxima fecha; Lista ordenada de hitos (texto) con insignias applied/upcoming; Tabla de fechas movidas; Solo enlace al póster eu-ai-act-timeline, sin incrustarlo

#### Eje temporal con marcador de hoy **[T2]**

- Tipo: línea temporal horizontal 2024-2031 (vertical en 390 px) · impacto 5 · esfuerzo M
- Qué muestra: Los 13 hitos en un solo eje, aplicados rellenos y pendientes en anillo, con la línea 'hoy' (AI_ACT_TIMELINE_AS_OF) y el Omnibus en vigor desde 2026-07-27. Generado de los datos, bilingüe por prop lang, a diferencia del póster a mano.
- Datos: data/ai-act-timeline.ts aiActMilestones[] (id, date, title[lang], status, basis, systemClasses), AI_ACT_TIMELINE_AS_OF.
- Ubicación: Sección 'timeline', encima de ol.aad-timeline (hero).
- Interacción: cada punto enlaza a #milestoneAnchor(m); la lista es la alternativa; 'As of' dentro del SVG
- Reutiliza: TimeAxis.astro compartido; alternativa barata: incrustar el póster existente eu-ai-act-timeline(-es) con Figure.astro

#### Lo que movió el Omnibus **[T1]**

- Tipo: dumbbell / flechas de fecha original a fecha nueva · impacto 4 · esfuerzo S
- Qué muestra: Cada fecha diferida (Anexo III de 2026-08-02 a 2027-12-02, Anexo I de 2027 a 2028...) como flecha con los meses de retraso; se entiende el aplazamiento sin leer la tabla.
- Datos: aiActMilestones[].changed[] (from) y date; misma selección `shifted` que ya usa la tabla.
- Ubicación: Sección 'changed', encima de la tabla aad-table.
- Interacción: estático; la tabla es la alternativa (meses calculados explicados en el texto alternativo)
- Reutiliza: Nuevo Dumbbell.astro

#### Cuenta atrás de los próximos hitos

- Tipo: tres StatTile con arco de progreso · impacto 4 · esfuerzo S
- Qué muestra: Días entre la fecha 'as of' y los tres próximos hitos, con un arco que muestra cuánto del intervalo desde el hito anterior ya ha pasado.
- Datos: nextMilestones(AI_ACT_TIMELINE_AS_OF, 3) en ai-act-timeline.ts; diferencia de días calculada en build y sellada 'As of'.
- Ubicación: Sección aad-top, junto a la tarjeta 'Next'.
- Interacción: estático (countup.js existente opcional, respetando reduced-motion)
- Reutiliza: StatTile.astro existente

#### Semáforo de España

- Tipo: tira de estado con fechas (proyecto de ley, en vigor, convocatoria, guías) · impacto 3 · esfuerzo S
- Qué muestra: Dónde está cada pieza española (AESIA, sandbox, anteproyecto de ley) sobre el mismo eje temporal.
- Datos: data/ai-act-timeline.ts spain[] (date, title[lang], status).
- Ubicación: Sección 'spain', antes de las entradas.
- Interacción: cada marca enlaza a su entrada
- Reutiliza: TimeAxis.astro compartido

### `/bok`

- Fichero: `site/src/pages/bok/index.astro`
- Propósito: Índice del Body of Knowledge: 24 capítulos en cinco partes, con rutas de lectura por perfil de lector.
- Pobreza visual: 4/5
- Visuales actuales: Chips de salto por parte (part-jump) con rango de capítulos; Tarjetas de capítulo por parte (número, minutos de lectura, resumen); Figura 'Reading paths': tres columnas de enlaces (Building this month, Assuring & advising, New to the discipline); SignNote (caja de firma de la tesis)

#### Espina del libro: 24 capítulos de un vistazo (hero) **[T3]**

- Tipo: Tira de barras horizontales agrupadas por parte (book spine), con marcas de figuras y fuentes por capítulo · impacto 5 · esfuerzo M
- Qué muestra: La forma del libro: cuánto pesa cada capítulo en minutos, qué partes son densas (Ley y normas, Ciclo de vida) y qué capítulos tienen figuras o carecen de ellas. El lector elige por dónde entrar según tiempo y profundidad.
- Datos: src/data/chapters.ts (order, part, shortTitle, slug); minutos ya calculados en la página con readingTime(entry.body) de src/lib/reading.ts; número de figuras por capítulo contando placements[].chapter en src/data/figures.ts y src/data/diagrams.ts; número de fuentes contando '(verified:' en cada bok/NN-*.md
- Ubicación: Justo debajo de .bok-head (después de part-jump) y antes de la primera sección de parte
- Interacción: Estático (SVG en build); cada barra es un <a> al capítulo con <title> nativo; en 390 px las 24 barras se apilan en vertical sin scroll horizontal; tabla en <details> como alternativa
- Reutiliza: Nuevo componente compartido BookSpine.astro (SVG generado en build); reutilizable en home (junto a BookParts), /figures y /figures/[id]. Colores de parte en tonos de tinta neutros, nunca --l1..--l5 (auditoría SL-06)
- **CORREGIDA**: Quitar las marcas de figuras (son el atlas de /figures) y las de fuentes (son la metodología); la espina codifica minutos de lectura por parte y enlaza. BookSpine es el mismo componente que el atlas de /figures con otra codificación.

#### Base de evidencia: fuentes primarias, secundarias y reportadas por capítulo

- Tipo: Barras horizontales apiladas al 100 % (o absolutas) por capítulo · impacto 4 · esfuerzo S
- Qué muestra: Que el libro se apoya casi por completo en fuentes primarias (p. ej. cap. 08: 99 primarias, 17 secundarias, 3 reportadas; cap. 10: 144/6/0; cap. 09: 133/11/1) y dónde están las pocas fuentes solo reportadas (02, 07, 08, 09, 19). Refuerza la credibilidad editorial.
- Datos: Listas '## Sources' de bok/00-preface.md a bok/23-governing-agents.md, etiqueta '(verified: primary|secondary|reported)' con el formato de src/lib/sources.ts (type Verification)
- Ubicación: Tras la última parte y antes de la figura Reading paths, como sección 'Cómo se verifica este libro'
- Interacción: Estático, con tabla de datos (kind data-viz: caption, columns, rows, source) y sello 'As of' en el SVG
- Reutiliza: Nuevo StackedBar.astro compartido (también para /cases y la plantilla de capítulo); sigue VISUAL-GUIDE §4 (eje desde cero, etiquetas directas, % en cada etiqueta)

#### Red de capítulos por vocabulario compartido

- Tipo: Diagrama de cuerdas (chord) o red circular con los 24 capítulos agrupados por parte · impacto 5 · esfuerzo L
- Qué muestra: Qué capítulos son nodos centrales del libro (la pila, patrones, EU AI Act, agentes) porque comparten más términos del glosario, y qué lecturas encadenar después de un capítulo.
- Datos: src/lib/glossary.ts getGlossary(): GlossaryEntry.chapterRefs (capítulos cruzados por término) para calcular co-ocurrencias; alternativa ligera: chapters.ts keyTerms compartidos entre capítulos
- Ubicación: Después de la espina del libro o como cierre antes de SignNote, en una banda Section tone='mesh'
- Interacción: Estático SVG generado en build; nodos enlazan al capítulo; resaltado por :hover/:focus con CSS (solo transform/stroke, sin opacidad en texto); lista de conexiones principales como alternativa textual
- Reutiliza: Nuevo generador scripts/lib/chord.mjs o componente ChordDiagram.astro; puede servir al glosario (/bok/glossary) y a /glossary

#### Rutas de lectura como mapa de metro

- Tipo: Mapa de metro: tres líneas que recorren la espina de 24 estaciones-capítulo · impacto 4 · esfuerzo M
- Qué muestra: Las tres rutas actuales (Building, Assuring, New to the discipline) como líneas que atraviesan las cinco partes, dejando ver que cada ruta toca fundamentos, ciclo de vida y ley.
- Datos: Array readingPaths ya definido en src/pages/bok/index.astro (slugs por ruta, resueltos contra chapters.ts)
- Ubicación: Sustituye el interior de la Figure 'Reading paths' manteniendo su caption y los enlaces reales
- Interacción: Estático; cada estación es un enlace; en móvil las líneas pasan a vertical (arriba a abajo, regla §1.3)
- Reutiliza: Extender Figure.astro; patrón visual cercano a PathMap.astro (se puede reutilizar su trazado de nodos)

### `/bok/[slug]`

- Fichero: `site/src/pages/bok/[slug].astro`
- Propósito: Plantilla de capítulo: renderiza cada bok/NN-*.md con AtAGlance, términos clave, figuras insertadas por rehype-diagrams y banda de cierre.
- Pobreza visual: 3/5
- Visuales actuales: AtAGlance + chips de términos clave; Tablas envueltas en región desplazable (rehype-tables); Banda de cierre mesh con enlaces a la referencia abierta; Figuras por capítulo (figures.ts + diagrams.ts): 01 definition: aige-in-the-org (archify), three-questions, five-objects; 02 why-now: regulatory-wave (archify), profession-in-numbers; 03 values: values-principles; 04 the-stack: the-stack-layers y reference-toolchain (archify), minimum-viable-stack, human-oversight, procured-ai-control; 05 patterns: pattern-map (+30 diagramas archify en /patterns/<id>); 06 the-role: role-workflows (archify); 07 maturity: maturity-levels (archify), maturity-grid; 08 regulatory-map: obligation-to-evidence (archify), eu-ai-act-timeline, art73-clock, enforcement-map; 12 governance-program: committee-gates, governance-operating-model; 13 risk-management: risk-loop-stack, risk-matrix, mitigation-ladder, harm-levels; 14 governing-development: build-chain-of-gates (archify), provenance-lineage; 15 governing-deployment: deployment-option-matrix (póster); 16 fairness: explanation-techniques; 17 incidents: incident-clocks; 18 eu-ai-act: eu-ai-act-timeline, eu-ai-act-operator-roles, eu-ai-act-risk-ladder (pósters); 21 ai-laws-worldwide: jurisdiction-tiles (data-viz); 22 principles-and-standards: instrument-lineage; 23 governing-agents: agent-control-plane; SOLO TEXTO (sin figura ni diagrama): 00 preface, 09 glossary, 10 reading-list, 11 ai-defined, 19 privacy-and-ai, 20 existing-law

#### Huella de capas del capítulo

- Tipo: Barra segmentada de 5 capas (fingerprint) en la cabecera · impacto 3 · esfuerzo M
- Qué muestra: A qué capas de la pila habla cada capítulo (p. ej. el 17 carga en capas 04 y 05, el 14 en 01 a 03), para situarlo en la pila antes de leer.
- Datos: Para cada bok/NN-*.md: filas de tablas con columna 'Layer' (presentes en caps. 12, 14 a 17, 19 a 23) más enlaces /patterns/<slug> resueltos a su capa con src/data/patterns.ts; derivado en build con helpers de src/lib/md-parse.ts
- Ubicación: Bajo AtAGlance, antes de <Content />
- Interacción: Estático; cada segmento enlaza a la sección de esa capa en /stack; texto alternativo con los recuentos
- Reutiliza: Nuevo LayerFingerprint.astro con tokens --l1..--l5 / --l1-ink..--l5-ink (aquí el color sí significa capa)

#### Perfil de fuentes del capítulo **RECHAZADA**

- Tipo: Barra apilada compacta primaria/secundaria/reportada con recuento · impacto 2 · esfuerzo S
- Qué muestra: Cuántas fuentes sostienen el capítulo y de qué calidad, justo donde empieza la lista de fuentes.
- Datos: Lista '## Sources' del propio capítulo, etiquetas '(verified: ...)' (formato src/lib/sources.ts)
- Ubicación: En la cabeza de la sección Sources (placement at:'head' vía rehype-diagrams o componente tras Content)
- Interacción: Estático
- Reutiliza: StackedBar.astro (compartido con /bok)
- Motivo del rechazo: Impacto 2 y duplica la metodología; la lista de fuentes ya muestra la etiqueta en cada entrada.

#### Capítulos vecinos por términos compartidos **RECHAZADA**

- Tipo: Mini red radial (ego-network) del capítulo actual · impacto 3 · esfuerzo M
- Qué muestra: Los 4 a 6 capítulos que más vocabulario comparten con el actual, como siguiente lectura más útil que prev/next lineal.
- Datos: src/lib/glossary.ts GlossaryEntry.chapterRefs y chapters.ts keyTerms
- Ubicación: Dentro de la banda chapter-close (slot after), encima de 'Related in the open reference'
- Interacción: Estático; nodos enlazados
- Reutiliza: Variante pequeña de ChordDiagram/BookSpine
- Motivo del rechazo: Señal débil (co-ocurrencia de chapterRefs) repetida en 24 páginas y solapada con la red de /bok; prev/next y keyTerms ya orientan.

### `/bok/preface`

- Fichero: `bok/00-preface.md`
- Propósito: Prefacio: por qué existe el libro, para quién es, cómo usarlo, citarlo y versionarlo.
- Pobreza visual: 5/5
- Visuales actuales: Ninguna figura; solo chips de términos clave

#### Mapa de lectores: perfil por capítulo (hero)

- Tipo: Matriz de puntos/heatmap perfil × capítulo (bipartito) · impacto 4 · esfuerzo M · requiere datos nuevos
- Qué muestra: Para cada perfil (leads de gobernanza, seguridad, privacidad/DPO, MLOps, riesgo/CISO, dirección, juristas que construyen, sector público, pymes) los capítulos que el prefacio le recomienda; cada lector encuentra su columna de entrada.
- Datos: Sección 'Who should read this' de bok/00-preface.md (líneas 51 a 92, enlaces /bok/<slug>#...). Añadir pequeño dataset src/data/readers.ts {persona, chapters[]} o extraer los enlaces en build
- Ubicación: Cabeza de 'Who should read this' (figures.ts, at:'head')
- Interacción: Estático; cada celda enlaza al ancla del capítulo
- Reutiliza: MatrixHeat.astro compartido (dot matrix genérica)

#### Versiones del Body of Knowledge **RECHAZADA**

- Tipo: Línea de tiempo horizontal de versiones · impacto 3 · esfuerzo S
- Qué muestra: El ritmo de publicación: 0.1 (2026-09), 0.2 (2026-09-10), 0.3 (2026-09-15), 0.3.1 y 0.4.0 (2026-09-19), 0.5.0 (2026-09-25), para entender qué cita un lector según versión.
- Datos: Cabeceras '## [x.y] - fecha' de bok/CHANGELOG.md; site.bokVersion en src/data/site.ts
- Ubicación: Cabeza de 'Versioning'
- Interacción: Estático con sello 'As of'
- Reutiliza: Nuevo Timeline.astro compartido (útil también en cap. 20 y /cases)
- Motivo del rechazo: Duplica ReleaseTimeline de /about/changelog.

### `/bok/glossary`

- Fichero: `bok/09-glossary.md`
- Propósito: Glosario A-Z de la disciplina con pares que se confunden y referencias a capítulos.
- Pobreza visual: 4/5
- Visuales actuales: GlossaryJump (salto A-Z); Sin figuras

#### Pares que se confunden, como red

- Tipo: Red de nodos (términos) con aristas de contraste, dispuesta en pares/clusters · impacto 4 · esfuerzo M
- Qué muestra: Qué términos se confunden entre sí (p. ej. FRIA y DPIA, proveedor y desplegador) y cuáles forman familias de confusión, con un clic a cada definición.
- Datos: src/lib/glossary.ts GlossaryEntry.contrast (slugs contrastados) y sección 'Commonly confused pairs' de bok/09-glossary.md
- Ubicación: Cabeza de 'Commonly confused pairs'
- Interacción: Estático SVG con disposición calculada en build; nodos enlazan a /glossary/<slug>
- Reutiliza: ContrastCards.astro para la versión móvil; nuevo NetworkGraph build-time
- **CORREGIDA**: Limitar la red a términos con 'Contrast with' (familias de confusión, 10 pares de la tabla más los contrastes por término de lib/glossary.ts contrast); no una constelación de ~145 términos con fuerzas (bola de pelo, esfuerzo L). Implementar en GlossaryIndex para que sirva a /bok/glossary y a /resources/glossary.

#### Densidad A-Z del vocabulario

- Tipo: Histograma de letras (barras) que funciona como navegación · impacto 3 · esfuerzo S
- Qué muestra: Cuántos términos hay por letra y dónde se concentra el vocabulario; sirve de índice visual.
- Datos: src/lib/glossary.ts getGlossary(): GlossaryEntry.letter
- Ubicación: Sustituye o acompaña a GlossaryJump
- Interacción: Cada barra es un enlace de salto; estático
- Reutiliza: Extender GlossaryJump.astro
- **CORREGIDA**: Implementar dentro de GlossaryJump/GlossaryIndex (compartido); es la misma propuesta que 'Espectro A-Z' de /resources/glossary.

#### Qué capítulos definen el vocabulario

- Tipo: Matriz de puntos términos (top 40 por referencias) × capítulos · impacto 3 · esfuerzo M
- Qué muestra: Qué términos atraviesan todo el libro y qué capítulos introducen más vocabulario.
- Datos: src/lib/glossary.ts GlossaryEntry.chapterRefs
- Ubicación: Tras la sección de pares, antes de la letra A
- Interacción: Estático; en móvil pasa a lista de términos con chips de capítulo
- Reutiliza: MatrixHeat.astro

### `/bok/reading-list`

- Fichero: `bok/10-reading-list.md`
- Propósito: Lista de lecturas anotada por temas, audiencias y jurisdicciones.
- Pobreza visual: 5/5
- Visuales actuales: Ninguna figura en el capítulo

#### Tema × audiencia: qué leer según quién eres (hero)

- Tipo: Heatmap de recuentos (temas en filas, audiencias en columnas) · impacto 4 · esfuerzo M
- Qué muestra: Dónde se concentran las lecturas para cada audiencia y qué temas están poco servidos, para elegir la sección adecuada.
- Datos: src/lib/reading-list.ts: ReadingGroup.group y ReadingItem.audience (parseado de bok/10-reading-list.md)
- Ubicación: Lead del capítulo (at:'lead')
- Interacción: Estático; cada celda enlaza a la sección del tema; tabla de datos como fallback
- Reutiliza: MatrixHeat.astro; reutilizable en /resources/reading-list

#### Lecturas por jurisdicción en mosaico

- Tipo: Tile map (mosaico geográfico de teselas iguales) · impacto 4 · esfuerzo M
- Qué muestra: Qué jurisdicciones tienen más fuentes (UE, global, EE. UU., Reino Unido, Corea del Sur...) y dónde faltan.
- Datos: src/lib/reading-list.ts ReadingItem.jurisdiction; posiciones de teselas reutilizadas de jurisdiction-tiles (src/figures/jurisdiction-tiles.svg / data de figures.ts)
- Ubicación: Cabeza de 'Government and regulator guidance beyond the EU'
- Interacción: Estático
- Reutiliza: Extraer la rejilla de jurisdiction-tiles a un TileMap.astro compartido (también cap. 19 y 21)

### `/bok/ai-defined`

- Fichero: `bok/11-ai-defined.md`
- Propósito: Qué es un sistema de IA para la gobernanza: cuatro definiciones, campos de registro, autonomía y tipos de IA.
- Pobreza visual: 5/5
- Visuales actuales: Ninguna figura; siete tablas de texto

#### Anatomía de la definición: cuatro textos, siete elementos (hero)

- Tipo: Matriz de puntos 7 elementos × 4 definiciones con codificación ordinal (definitorio / presente / varía / ausente) · impacto 5 · esfuerzo M · requiere datos nuevos
- Qué muestra: De un vistazo, en qué coinciden y en qué difieren OCDE 2023, AI Act art. 3(1), ISO/IEC 22989 y NIST AI 100-1 (la inferencia es definitoria solo en OCDE y AI Act; la adaptabilidad no es decisiva en ninguno).
- Datos: Tabla 'The definitions side by side' de bok/11-ai-defined.md (línea 166). Transcribir ~28 celdas a un pequeño dataset con código ordinal
- Ubicación: Cabeza de 'The definitions side by side'
- Interacción: Estático; tabla original ya presente como alternativa
- Reutiliza: MatrixHeat.astro (modo glifos)

#### Escalera de autonomía 0 a 4

- Tipo: Escalera de peldaños con modo de supervisión y posición de la puerta · impacto 4 · esfuerzo S
- Qué muestra: De 'Advisory' a 'Unsupervised': qué pasa entre la salida y el efecto en cada nivel y qué supervisión corresponde (human-in-command, in-the-loop, on-the-loop, solo kill switch).
- Datos: Tabla de niveles de autonomía de bok/11-ai-defined.md (línea 215: Level, Name, What happens, Oversight mode)
- Ubicación: Cabeza de la sección de autonomía (antes de la tabla de la línea 215)
- Interacción: Estático; revelado transform-only con prefers-reduced-motion
- Reutiliza: MaturityLadder.astro (misma gramática de peldaños); compartible con cap. 23

#### Del elemento de la definición al campo del registro

- Tipo: Diagrama de flujo en tres columnas (sankey sin cantidades): elemento, campo, decisión · impacto 3 · esfuerzo M
- Qué muestra: Cómo cada elemento de la definición se convierte en un campo del registro (substrate, autonomy_level, adapts_in_use...) y en una decisión de alcance o control.
- Datos: Tabla 'From definition element to registry field' (línea 189)
- Ubicación: Cabeza de 'From definition element to registry field'
- Interacción: Estático; vertical en móvil
- Reutiliza: FlowDiagram.astro extendido a tres columnas

#### Software convencional frente a IA

- Tipo: Tarjetas de contraste por propiedad · impacto 3 · esfuerzo S
- Qué muestra: Siete propiedades (origen del comportamiento, determinismo, qué es correcto, pruebas, cambios, fallos, explicación) y su consecuencia de gobernanza.
- Datos: Tabla 'AI versus conventional software' (línea 261)
- Ubicación: Cabeza de 'AI versus conventional software'
- Interacción: Estático
- Reutiliza: ContrastCards.astro

### `/bok/privacy-and-ai`

- Fichero: `bok/19-privacy-and-ai.md`
- Propósito: Protección de datos aplicada a la IA: bases jurídicas, minimización, PETs, roles, DPIA, transferencias y decisiones automatizadas.
- Pobreza visual: 5/5
- Visuales actuales: Ninguna figura; muchas tablas

#### El dato personal a lo largo del ciclo de la IA (hero)

- Tipo: Swimlane horizontal de 6 momentos con carriles: dato, qué pide la ley, base jurídica, registro de evidencia · impacto 5 · esfuerzo M · requiere datos nuevos
- Qué muestra: De la recogida para entrenar a la evaluación, qué dato personal circula, qué exige primero la ley y qué registro prueba el cumplimiento; la evidencia es el nodo final de cada columna.
- Datos: Tablas 'Processing moment' (línea 44) y 'Stage / Bases that usually fit' (línea 76) de bok/19-privacy-and-ai.md; transcribir a dataset
- Ubicación: Cabeza de 'How to read this chapter'
- Interacción: Estático; en 390 px pasa a vertical (un bloque por momento)
- Reutiliza: WorkflowGrid.astro o StackFlow.astro como base del swimlane

#### Listas DPIA nacionales en Europa

- Tipo: Tile map de Europa (18 listas) coloreado por si nombran la IA, con recuento de ítems relevantes y solapes con el Anexo III · impacto 5 · esfuerzo M
- Qué muestra: Qué autoridades ya nombran la IA en su lista del art. 35(4) y cuántos ítems tocan usos del Anexo III, para saber cuándo una DPIA es obligatoria por país.
- Datos: src/data/dpia-lists.ts: lists (país, aiNamed, aiNamedInRegister), items (tags, annexIII), DPIA_AS_OF 2026-09-28
- Ubicación: Dentro de 'The DPIA for AI systems', tras la tabla de criterios
- Interacción: Estático; cada tesela enlaza a /resources/dpia-lists#<país>; sello 'As of 2026-09-28'
- Reutiliza: TileMap.astro compartido (extraído de jurisdiction-tiles); reutilizable en /resources/dpia-lists si aún no tiene mapa
- **CORREGIDA**: Una única figura (TileMap) con placement en el capítulo 19 y pages ['/resources/dpia-lists']. jurisdiction-tiles no tiene rejilla de Estados miembros: hay que añadir una constante pequeña de posiciones EEE y la constante opinionWithoutList (8 países) en src/data/dpia-lists.ts; dataReady false en ambas páginas.

#### PETs: lo que hacen y lo que no

- Tipo: Gráfico divergente de dos lados (hace / no hace) por tecnología · impacto 4 · esfuerzo M
- Qué muestra: Para privacidad diferencial, aprendizaje federado, datos sintéticos, seudonimización, enclaves y filtrado de salida, la promesa frente al límite honesto, con su registro de evidencia.
- Datos: Tabla 'Privacy-enhancing technologies and their honest limits' (línea 206)
- Ubicación: Cabeza de 'Privacy-enhancing technologies and their honest limits'
- Interacción: Estático
- Reutiliza: ContrastCards.astro en variante divergente

#### Roles RGPD en la cadena de suministro de IA

- Tipo: Diagrama de red de actores (desarrollador, proveedor API, desplegador, socios) con su rol · impacto 3 · esfuerzo S
- Qué muestra: Cuándo un proveedor pasa de encargado a responsable (si entrena con tus prompts) y dónde aparecen corresponsables.
- Datos: Tabla 'Controller, processor or joint controller' (línea 239)
- Ubicación: Cabeza de 'Controller, processor or joint controller'
- Interacción: Estático
- Reutiliza: Diagram.astro / glifos de VISUAL-GUIDE §1.7 (persona, edificio)

### `/bok/existing-law`

- Fichero: `bok/20-existing-law.md`
- Propósito: El derecho que ya aplica a la IA: propiedad intelectual, no discriminación, consumo, responsabilidad por producto y medios sintéticos.
- Pobreza visual: 5/5
- Visuales actuales: Ninguna figura; tablas comparativas

#### Cinco cuerpos de ley, una pregunta cada uno (hero)

- Tipo: Rueda radial de 5 sectores con pregunta, artefacto de evidencia y chip de capa · impacto 4 · esfuerzo M
- Qué muestra: Qué pregunta hace cada rama del derecho a un sistema de IA y qué artefacto la responde (ledger de derechos, evaluación por grupo, registro de claims, FMEA/AIBOM, marcado de procedencia).
- Datos: Tabla de 'How to read this chapter' (línea 51: Body of law, question, artefact, Layer)
- Ubicación: Cabeza de 'How to read this chapter'
- Interacción: Estático; en móvil, lista de cinco tarjetas
- Reutiliza: SurfaceCards.astro para la versión móvil; nuevo RadialWheel

#### Entrenar con obras protegidas en cuatro jurisdicciones

- Tipo: Rejilla 3 preguntas × 4 jurisdicciones (UE, EE. UU., Reino Unido, Japón) con semáforo sí / condicional / no · impacto 4 · esfuerzo S · requiere datos nuevos
- Qué muestra: Dónde el entrenamiento comercial está permitido sin licencia, cómo se hace el opt-out y quién debe publicar información de entrenamiento, a 2026-09-24.
- Datos: Tabla 'Question (as of 2026-09-24)' de 'Copyright and training data' (línea 132); codificación ordinal a transcribir
- Ubicación: Cabeza de 'Copyright and training data'
- Interacción: Estático con 'As of 2026-09-24' dentro del SVG
- Reutiliza: MatrixHeat.astro

#### Casos de entrenamiento en EE. UU., fechados

- Tipo: Línea de tiempo en carriles (swimlane por tribunal) con estado decidido / pendiente · impacto 4 · esfuerzo M · requiere datos nuevos
- Qué muestra: Thomson Reuters v. ROSS, Bartz v. Anthropic (23 jun 2025), Kadrey v. Meta (25 jun 2025), NYT v. Microsoft y OpenAI, Andersen v. Stability AI y Disney v. Midjourney (presentado 11 jun 2025): qué se ha decidido y qué sigue abierto.
- Datos: Tabla 'US training cases, dated' (línea 142); fechas y estados tal como los da el capítulo
- Ubicación: Cabeza de 'US training cases, dated'
- Interacción: Estático con 'As of 2026-09-24'; reviewBy en figures.ts
- Reutiliza: Timeline.astro compartido

#### Prácticas desleales con IA por jurisdicción

- Tipo: Matriz 5 prácticas × EE. UU./UE/Reino Unido con artefacto de evidencia y capa · impacto 3 · esfuerzo S
- Qué muestra: Que reclamos no sustentados, reseñas falsas, bots no revelados, interfaces manipuladoras y datos ilícitos están cubiertos en las tres jurisdicciones con normas distintas pero la misma evidencia.
- Datos: Tabla 'Practice (as of 2026-09-24)' (línea 450)
- Ubicación: Cabeza de 'The United Kingdom: DMCC Act' o de la tabla
- Interacción: Estático
- Reutiliza: MatrixHeat.astro

### `/bok/the-role`

- Fichero: `bok/06-the-role.md`
- Propósito: El rol de AI governance engineer: flujos de trabajo, habilidades, escalera profesional, vías de entrada y mercado.
- Pobreza visual: 4/5
- Visuales actuales: role-workflows (archify, lead)

#### La escalera profesional en cinco peldaños

- Tipo: Escalera de peldaños con 'qué posee de extremo a extremo' · impacto 4 · esfuerzo S
- Qué muestra: De Associate a Head of AI governance engineering, definido por lo que la persona puede poseer, no por años.
- Datos: Sección 'The career ladder' (líneas 175 a 193)
- Ubicación: Cabeza de 'The career ladder'
- Interacción: Estático
- Reutiliza: MaturityLadder.astro

#### Bandas salariales y habilidades demandadas

- Tipo: Barras horizontales (data-viz) con fuente y 'As of' · impacto 4 · esfuerzo S
- Qué muestra: Medianas IAPP 2025-26: 221.000 USD para roles técnicos en tecnología frente a 169.700 (privacidad + IA) y 151.800 (gobernanza de IA general); más las habilidades que no muestra el cap. 02 (modelos fundacionales 25,6 %, cloud 18,2 %). La prima está en construir controles.
- Datos: Sección 'The market' de bok/06-the-role.md (fuentes [4] y [6]); no duplicar profession-in-numbers del cap. 02 (41/28/27 %)
- Ubicación: Cabeza de 'The market'
- Interacción: Estático; tabla de datos obligatoria (kind data-viz), asOf y reviewBy
- Reutiliza: StackedBar.astro / estilo de profession-in-numbers.svg

#### Tres vías de entrada **RECHAZADA**

- Tipo: Diagrama convergente (tres orígenes que confluyen en el rol) con fortaleza, carencia y punto de partida · impacto 3 · esfuerzo S
- Qué muestra: Desde Legal/privacidad, Seguridad/GRC o MLOps: qué conservas, qué te falta y por qué patrón empezar.
- Datos: Sección 'Three ways in' (líneas 195 a 210)
- Ubicación: Cabeza de 'Three ways in'
- Interacción: Estático; vertical en móvil
- Reutiliza: FlowDiagram.astro
- Motivo del rechazo: Tercer duplicado del mismo contenido (role.ts waysIn / path.ts entries). Un único FlowDiagram en /path, enlazado desde /role y el capítulo.

### `/bok/governance-program`

- Fichero: `bok/12-governance-program.md`
- Propósito: Montar el programa de gobernanza de IA: actores, RACI, comité, tres líneas, literacy, KPIs y políticas.
- Pobreza visual: 3/5
- Visuales actuales: committee-gates; governance-operating-model

#### RACI del ciclo de vida como mapa de calor **[T4]**

- Tipo: Heatmap 9 etapas × 8 roles con R/A/C/I codificados por intensidad y letra · impacto 4 · esfuerzo S
- Qué muestra: Que el product owner es A en todas las etapas, auditoría interna es I en todas, y el ingeniero de gobernanza pasa de C a R al llegar a pruebas y operación.
- Datos: Tabla 'A lifecycle RACI' (línea 110)
- Ubicación: Cabeza de 'A lifecycle RACI'
- Interacción: Estático; letras siempre visibles (no solo color)
- Reutiliza: MatrixHeat.astro en modo RACI (compartido con caps. 15 y 17)

#### Quién puede aceptar riesgo residual

- Tipo: Escalera/barras de validez máxima por nivel de riesgo residual · impacto 3 · esfuerzo S
- Qué muestra: A más riesgo residual, aceptador más alto y validez más corta, con la evidencia exigida.
- Datos: Tabla 'Risk acceptance and exceptions' (línea 171)
- Ubicación: Cabeza de 'Risk acceptance and exceptions'
- Interacción: Estático
- Reutiliza: MaturityLadder.astro

### `/bok/governing-development`

- Fichero: `bok/14-governing-development.md`
- Propósito: Gobernar el desarrollo: cadena de puertas, datos, pruebas, conformidad y expediente técnico.
- Pobreza visual: 3/5
- Visuales actuales: build-chain-of-gates (archify, lead); provenance-lineage

#### Anexo IV: lo que llena el pipeline y lo que escribe una persona

- Tipo: Waffle o barras apiladas por elemento del Anexo IV (automático / humano) · impacto 4 · esfuerzo M · requiere datos nuevos
- Qué muestra: Qué parte del expediente técnico sale sola del pipeline y dónde sigue haciendo falta redacción humana.
- Datos: Tabla 'Annex IV, element by element' (línea 585: Pipeline source, What a person must still write); codificar cada fila
- Ubicación: Cabeza de 'Annex IV, element by element'
- Interacción: Estático
- Reutiliza: StackedBar.astro

#### Evaluaciones de impacto en el ciclo de vida

- Tipo: Gantt/timeline de cuándo se realiza y se reevalúa cada evaluación (DPIA, FRIA, etc.) · impacto 3 · esfuerzo M
- Qué muestra: Quién hace cada evaluación, en qué momento del ciclo y qué la dispara de nuevo, para no duplicar trabajo.
- Datos: Tabla 'Impact assessments compared' (línea 742) y 'Re-assessment triggers'
- Ubicación: Cabeza de 'Impact assessments compared'
- Interacción: Estático
- Reutiliza: Timeline.astro

### `/bok/governing-deployment`

- Fichero: `bok/15-governing-deployment.md`
- Propósito: Gobernar el despliegue y el uso: decisión, elección de modelo, contratos, go-live, operación y retiro.
- Pobreza visual: 3/5
- Visuales actuales: deployment-option-matrix (póster)

#### Un sistema de la decisión al retiro

- Tipo: Anillo de ciclo de vida con etapas, artefacto y chip de capa · impacto 4 · esfuerzo M
- Qué muestra: El recorrido completo de un sistema desplegado y el artefacto que deja cada etapa; cierra el capítulo con una imagen memorable.
- Datos: Tablas 'The deployment lifecycle at a glance' (línea 48) y 'One system from decision to retirement' (línea 794)
- Ubicación: Cabeza de 'The deployment lifecycle at a glance'
- Interacción: Estático; en móvil pasa a lista vertical numerada
- Reutiliza: Gramática de GovernanceLoop.astro (anillo)

#### Calendario de mantenimiento

- Tipo: Reloj radial por cadencia (diaria, semanal, trimestral, anual) · impacto 3 · esfuerzo S
- Qué muestra: Qué actividad toca en cada cadencia y qué artefacto deja.
- Datos: Tabla 'Maintenance calendar and retraining governance' (línea 511)
- Ubicación: Cabeza de 'Maintenance calendar and retraining governance'
- Interacción: Estático
- Reutiliza: Nuevo RadialWheel (compartido con cap. 20)

#### Quién vigila cada señal

- Tipo: Heatmap RACI señal × rol · impacto 3 · esfuerzo S
- Qué muestra: Quién observa, quién decide y a quién se escala cada señal en producción.
- Datos: Tabla 'Who owns the signal' (línea 561)
- Ubicación: Cabeza de 'Who owns the signal'
- Interacción: Estático
- Reutiliza: MatrixHeat.astro (modo RACI)

### `/bok/fairness-and-explainability`

- Fichero: `bok/16-fairness-explainability.md`
- Propósito: Equidad y explicabilidad para practicantes: fuentes de sesgo, métricas, imposibilidad, mitigación y explicaciones.
- Pobreza visual: 4/5
- Visuales actuales: explanation-techniques

#### El teorema de imposibilidad en 2.000 personas (hero)

- Tipo: Isotipo / dot grid: dos grupos de 1.000 (1 punto = 10 personas) coloreados VP/FP/FN/VN · impacto 5 · esfuerzo M
- Qué muestra: Con las mismas tasas (TPR 0,8, FPR 0,1) y bases distintas (30 % y 10 %), la precisión cae de 240/310 = 0,77 a 80/170 = 0,47: igualdad de errores, desigualdad de significado. La elección de métrica es una decisión de gobernanza.
- Datos: Ejemplo ilustrativo de 'The impossibility results' en bok/16-fairness-explainability.md (líneas 244 a 250); todos los números los da el capítulo
- Ubicación: Cabeza de 'The impossibility results'
- Interacción: Estático (kind data-viz con tabla de datos y aritmética en el texto alternativo)
- Reutiliza: Nuevo IsotypeGrid.astro

#### Dónde entra el sesgo en el ciclo de vida

- Tipo: Anillo de ciclo de vida con 7 fuentes de sesgo situadas en su etapa y chip de capa · impacto 4 · esfuerzo M
- Qué muestra: Sesgo histórico, de representación, de medición, de agregación, de aprendizaje, de evaluación y de despliegue, cada uno con su control.
- Datos: Tabla 'Where bias enters the lifecycle' (línea 59)
- Ubicación: Cabeza de 'Where bias enters the lifecycle'
- Interacción: Estático
- Reutiliza: Anillo compartido con cap. 15

#### Sesgo de medición: 17,7 % frente a 46,5 %

- Tipo: Slope chart de dos puntos · impacto 4 · esfuerzo S
- Qué muestra: Corregir la etiqueta (coste frente a necesidad) subiría la proporción de pacientes negros señalados para ayuda del 17,7 % al 46,5 %; ninguna métrica calculada contra la etiqueta de coste lo habría detectado.
- Datos: Párrafo de 'Where bias enters the lifecycle' (fuente [4]); mismo dato en src/data/cases.ts caso health-risk-score-proxy
- Ubicación: Tras el párrafo de sesgo de medición
- Interacción: Estático; enlace a /cases/health-risk-score-proxy
- Reutiliza: StackedBar.astro / primitivas de data-viz

#### Qué iguala cada métrica de equidad

- Tipo: Matriz de puntos 5 métricas × magnitud igualada (tasa de selección, TPR, FPR, precisión, calibración) · impacto 3 · esfuerzo S
- Qué muestra: Paridad demográfica, igualdad de oportunidades, odds igualadas, paridad predictiva y calibración: qué iguala cada una y cuándo encaja.
- Datos: Tabla 'Group fairness metrics' (línea 205)
- Ubicación: Cabeza de 'Group fairness metrics'
- Interacción: Estático
- Reutiliza: MatrixHeat.astro

### `/bok/incidents`

- Fichero: `bok/17-incidents.md`
- Propósito: Incidentes, problemas y causas raíz: severidad, ciclo de respuesta, RACI, RCA, CAPA y relojes regulatorios.
- Pobreza visual: 3/5
- Visuales actuales: incident-clocks

#### De la causa al control que debió detenerla

- Tipo: Sankey/alluvial clase de causa → capa → patrón · impacto 4 · esfuerzo M
- Qué muestra: Qué clases de causa raíz desembocan en qué capa y patrón, para convertir cada RCA en un control concreto.
- Datos: Tabla 'A cause taxonomy that points at controls' (línea 330: Cause class, Control, Layer, Pattern)
- Ubicación: Cabeza de 'A cause taxonomy that points at controls'
- Interacción: Estático SVG generado en build
- Reutiliza: Nuevo generador Sankey build-time (scripts/lib/sankey.mjs), compartido con /cases y /research/[slug]

#### RACI de respuesta a incidentes

- Tipo: Heatmap 9 actividades × 7 roles · impacto 3 · esfuerzo S
- Qué muestra: Quién tira del kill switch, quién decide la notificabilidad por régimen y quién cierra el CAPA.
- Datos: Tabla de 'Playbooks, RACI and drills' (línea 221)
- Ubicación: Cabeza de 'Playbooks, RACI and drills'
- Interacción: Estático
- Reutiliza: MatrixHeat.astro (modo RACI)

#### Escala de severidad y relojes

- Tipo: Barra escalonada de niveles con clase AI Act y severidad OCDE · impacto 3 · esfuerzo S
- Qué muestra: Cómo cada nivel de severidad interno se corresponde con la clase del AI Act que puede activar y con la escala de la OCDE.
- Datos: Tabla 'A severity scale mapped to the clocks' (línea 100)
- Ubicación: Cabeza de 'A severity scale mapped to the clocks'
- Interacción: Estático
- Reutiliza: MaturityLadder.astro

### `/bok/ai-laws-worldwide`

- Fichero: `bok/21-ai-laws-worldwide.md`
- Propósito: Leyes de IA en el mundo: Corea, EE. UU. federal y estatal, Japón, China, Brasil, Canadá, India, Reino Unido, Italia, España, Singapur, Australia.
- Pobreza visual: 3/5
- Visuales actuales: jurisdiction-tiles (data-viz)

#### Comparar los regímenes en pequeños múltiplos

- Tipo: Small multiples / dot matrix régimen × dimensión (disparador, deberes, aviso y supervisión, modelos frontera, sanción, roles) · impacto 4 · esfuerzo M · requiere datos nuevos
- Qué muestra: Qué regímenes cubren qué dimensiones y cuáles dejan huecos, en una sola lámina comparativa.
- Datos: Tabla 'Comparing the regimes' (línea 635); codificar presencia/ausencia por celda
- Ubicación: Cabeza de 'Comparing the regimes'
- Interacción: Estático; 'As of 2026-09-24'
- Reutiliza: MatrixHeat.astro

#### Calendario de leyes estatales de EE. UU.

- Tipo: Gantt de fechas de efecto por ley estatal · impacto 4 · esfuerzo M
- Qué muestra: Cuándo entra en vigor cada ley estatal (Colorado, Texas, California, Nueva York, Utah, Illinois, NYC) y cómo se apilan en 2026 y 2027.
- Datos: src/data/jurisdictions.ts (fechas clave) y tabla 'state laws that bind private organisations' (línea 360); mismas fechas que la tabla de jurisdiction-tiles en figures.ts
- Ubicación: Cabeza de 'United States: state laws that bind private organisations'
- Interacción: Estático con asOf/reviewBy
- Reutiliza: Timeline.astro; patrón visual de AiActDeadlines.astro

#### Una herramienta de contratación, cuatro regímenes

- Tipo: Cuatro paneles paralelos (small multiples) con los deberes de cada régimen · impacto 3 · esfuerzo M · requiere datos nuevos
- Qué muestra: El mismo sistema de selección de personal bajo cuatro leyes: qué aviso, auditoría o evaluación exige cada una.
- Datos: Sección 'Consequential decisions: one hiring tool, four regimes' (línea 375)
- Ubicación: Cabeza de esa sección
- Interacción: Estático
- Reutiliza: ContrastCards.astro

### `/bok/principles-and-standards`

- Fichero: `bok/22-principles-and-standards.md`
- Propósito: Principios, soft law y normas: OCDE, UNESCO, Convenio del Consejo de Europa, G7, NIST AI RMF, ISO/IEC, JTC 21, IEEE.
- Pobreza visual: 3/5
- Visuales actuales: instrument-lineage

#### NIST AI RMF: las 72 subcategorías (hero)

- Tipo: Sunburst o treemap por función (GOVERN, MAP, MEASURE, MANAGE) y categoría · impacto 5 · esfuerzo M
- Qué muestra: El tamaño de cada función y qué subcategorías ya cubren los controles abiertos del sitio, para ver de un golpe dónde hay trabajo hecho y dónde huecos.
- Datos: src/data/nist-ai-rmf.ts (72 subcategorías, fn, id) cruzado con Control.mappings.nistAiRmf de src/data/controls/*.ts
- Ubicación: Cabeza de 'The Core: 19 categories'
- Interacción: Estático; segmentos enlazan a /resources/crosswalk; tabla alternativa
- Reutiliza: Nuevo Sunburst/Treemap build-time; comprobar que no duplica /resources/crosswalk

#### Programa JTC 21: en qué fase está cada norma

- Tipo: Pipeline por fases (redacción, encuesta, publicada, citada en DOUE) con cada entregable como punto · impacto 4 · esfuerzo S
- Qué muestra: Que ninguna norma armonizada está citada aún en el DOUE a 2026-09-24 y qué entregables (prEN 18228, 18229, 18282, 18283...) están más cerca.
- Datos: Tabla 'The JTC 21 programme' (línea 621, columna 'Stage as of 2026-09-24 (reported)')
- Ubicación: Cabeza de 'The JTC 21 programme'
- Interacción: Estático con 'As of 2026-09-24'
- Reutiliza: Nuevo PipelineStages; puede servir al cap. 08 ('What is not harmonised yet')

#### Un control, muchos instrumentos

- Tipo: Matriz de puntos controles × 6 instrumentos (OCDE, CETS 225, G7, NIST, ISO/IEC, JTC 21) · impacto 3 · esfuerzo S
- Qué muestra: Que un mismo control de ingeniería satisface a la vez varios instrumentos: construir una vez, citar muchas.
- Datos: Tabla 'One control, many instruments' (línea 715)
- Ubicación: Cabeza de 'One control, many instruments'
- Interacción: Estático
- Reutiliza: MatrixHeat.astro (el mismo componente puede servir al crosswalk de frontier safety)

### `/bok/governing-agents`

- Fichero: `bok/23-governing-agents.md`
- Propósito: Gobernar agentes: registro, identidad, permisos de herramientas y MCP, puntos de control humanos, guardrails, kill switch y telemetría.
- Pobreza visual: 3/5
- Visuales actuales: agent-control-plane (lead, también en /agents)

#### Radio de impacto de cada nivel de parada (hero)

- Tipo: Círculos concéntricos anidados (tarea, capacidad, agente, identidad en todas partes, segmento de flota) más modo 'degradar' aparte · impacto 5 · esfuerzo M
- Qué muestra: Cuánto se detiene con cada mecanismo y en cuánto tiempo (segundos, menos de un minuto, acotado por la vida de la credencial, minutos), para elegir la parada mínima suficiente.
- Datos: Tabla 'Kill switch and per-agent circuit breakers' (línea 450: Stop level, Mechanism, Blast radius, Target time, Evidence)
- Ubicación: Cabeza de 'Kill switch and per-agent circuit breakers'
- Interacción: Estático; tiempos marcados como ilustrativos, como en el capítulo
- Reutiliza: Nuevo ConcentricRings.astro (compartido con /research/[slug])

#### Autonomía del agente y controles mínimos acumulados

- Tipo: Escalera de 5 peldaños (Operator a Observer) con nivel IMDA, nivel ATF y controles que se suman · impacto 4 · esfuerzo M
- Qué muestra: Cada paso de autonomía añade controles ('lo anterior, más...'): de registro e identidad propia a detección de anomalías de trayectoria.
- Datos: Tabla 'Autonomy is a design decision' (línea 84)
- Ubicación: Cabeza de 'Autonomy is a design decision'
- Interacción: Estático
- Reutiliza: MaturityLadder.astro (misma escalera que la autonomía del cap. 11)

#### Amenazas agénticas mapeadas a controles **RECHAZADA**

- Tipo: Sankey amenaza → control → capa · impacto 4 · esfuerzo M
- Qué muestra: Cómo cada amenaza agéntica (con su equivalente LLM 2026 y técnicas ATLAS) acaba en un control y en una capa concreta.
- Datos: Tabla 'Threats mapped to controls' (línea 691)
- Ubicación: Cabeza de 'Threats mapped to controls'
- Interacción: Estático
- Reutiliza: Generador Sankey compartido
- Motivo del rechazo: Duplica el Sankey amenaza a patrón de /agents (threats.ts taxonomy owasp-asi). Registrar ese una vez y colocarlo también en el capítulo 23.

### `/[lang]/bok y /[lang]/bok/[slug]`

- Fichero: `site/src/pages/[lang]/bok/index.astro; D:/Documents/aige-wt/plazos/site/src/pages/[lang]/bok/[slug].astro`
- Propósito: Índice y capítulos traducidos (es, fr, de, pt); hoy ningún idioma está publicado (PUBLISHED_TRANSLATED_LOCALES vacío).
- Pobreza visual: 4/5
- Visuales actuales: Índice: lista por partes marcando capítulos aún en inglés (texto); Capítulo: TranslationNotice, AtAGlance; hereda las figuras inglesas vía rehype-diagrams; Ediciones -es de tres pósters (eu-ai-act-timeline-es, operator-roles-es, risk-ladder-es), solo en /figures

#### Cobertura de la traducción en la espina del libro **RECHAZADA**

- Tipo: Tira de 24 capítulos coloreada traducido / en inglés · impacto 2 · esfuerzo S
- Qué muestra: Qué parte del libro se puede leer ya en el idioma y qué capítulos remiten al original.
- Datos: allTranslations() de src/lib/i18n-pages.ts y chapters.ts
- Ubicación: Bajo el título del índice traducido
- Interacción: Estático; cada tesela enlaza
- Reutiliza: BookSpine.astro
- Motivo del rechazo: Ruta no publicada: PUBLISHED_TRANSLATED_LOCALES = [] en src/i18n/locales.ts:29, así que [lang] no genera páginas. Nada que ver en producción.

#### Figuras localizadas en los capítulos traducidos

- Tipo: Mecanismo: variante <id>-<lang> de las figuras generadas (values-principles, maturity-grid, pattern-map, pósters) · impacto 3 · esfuerzo M
- Qué muestra: Que el lector traducido vea figuras en su idioma y no en inglés dentro del texto traducido.
- Datos: scripts/lib/posters.mjs (patrón -es ya existente), scripts/figures-build.mjs y src/lib/rehype-diagrams.ts (elegir <id>-<lang> si existe)
- Ubicación: Todas las inserciones de figuras en /[lang]/bok/[slug]
- Interacción: Estático
- Reutiliza: posters.mjs y figures.ts (entradas -es); prioridad baja mientras los idiomas sigan ocultos

### `/research`

- Fichero: `site/src/pages/research/index.astro`
- Propósito: Índice de notas de investigación: nota escrita con su estado y temas planificados.
- Pobreza visual: 5/5
- Visuales actuales: Ninguna figura: lista de notas con StatusLine y lista de temas planificados

#### Mapa del programa de investigación (hero)

- Tipo: Red de nodos: 5 preguntas (1 escrita, 4 planificadas) conectadas a los perfiles de control y a las 5 capas · impacto 4 · esfuerzo M · requiere datos nuevos
- Qué muestra: Qué pregunta abierta alimenta qué perfil de controles (evaluation-environment, agent-runtime, assurance-and-evidence...) y cuánto del programa está escrito: la escrita en trazo sólido, las planificadas en discontinuo.
- Datos: src/data/research.ts (slug, title, question, status); frontmatter relatedControls/relatedPatterns de research/*.md; perfiles en src/data/controls/index.ts. Para temas planificados añadir un campo pequeño profiles?: string[] en research.ts
- Ubicación: Antes de 'Notes', tras el párrafo introductorio
- Interacción: Estático; nodos escritos enlazan a su nota, planificados sin enlace (regla de la página)
- Reutiliza: NetworkGraph build-time (compartido con el glosario)

#### Cobertura de controles por las notas **RECHAZADA**

- Tipo: Barras por perfil de control: controles argumentados por alguna nota frente al total · impacto 3 · esfuerzo S
- Qué muestra: Que los 9 controles EVAL ya tienen nota que los argumenta y que los demás perfiles aún no, orientando a quien quiera contribuir.
- Datos: frontmatter relatedControls de research/*.md frente a los controles de src/data/controls/*.ts (profile)
- Ubicación: Sección 'Planned themes (not yet written)', al principio
- Interacción: Estático
- Reutiliza: StackedBar.astro
- Motivo del rechazo: Con una nota el gráfico es una barra llena (EVAL) y cuatro vacías; se integra como atributo de los nodos de la red del programa.

#### Recorrido de revisión de una nota **RECHAZADA**

- Tipo: Pipeline de 3 estados (draft, review, published) con las notas como fichas · impacto 2 · esfuerzo S
- Qué muestra: En qué estado está cada nota y qué falta para publicarla (un revisor con nombre).
- Datos: frontmatter status/version/reviewers de research/*.md (vía loadResearchPages())
- Ubicación: Cabeza de 'How a note is reviewed'
- Interacción: Estático
- Reutiliza: StatusLine.astro + PipelineStages
- Motivo del rechazo: Hay una sola nota escrita: un pipeline de tres estados con una ficha es decorativo.

### `/research/[slug]`

- Fichero: `site/src/pages/research/[slug].astro`
- Propósito: Página de cada nota de investigación (hoy: 'The evaluation environment is part of the system').
- Pobreza visual: 5/5
- Visuales actuales: Ninguna figura: prosa, StatusLine, listas de controles y patrones relacionados, cita

#### El perímetro de la evaluación (hero de la nota escrita)

- Tipo: Anillos concéntricos: modelo en el centro; arnés, herramientas/MCP, credenciales e identidad, salida de red, delegación · impacto 5 · esfuerzo M · requiere datos nuevos
- Qué muestra: Los cinco elementos del entorno que forman parte del sistema evaluado, cada anillo con su control (EVAL-008, 004, 003, 002, 001/006) y marcas en los hallazgos de METR (repositorio Artifactory compartido, credenciales publicadas, acceso a internet desde un sandbox, 96 transcripciones con llamadas falsificadas).
- Datos: Sección 'Five things inside the boundary' de research/the-evaluation-environment-is-part-of-the-system.md; añadir un pequeño dataset (o campo de frontmatter) con anillo, control y hallazgo
- Ubicación: Cabeza de 'Five things inside the boundary' (requiere extender DiagramPlacement de figures.ts a notas de investigación, o insertar el componente en la página)
- Interacción: Estático; cada anillo enlaza a /controls/evaluation-environment#aige-ctl-eval-00N
- Reutiliza: ConcentricRings.astro (compartido con cap. 23)

#### De la nota a los controles y a los marcos (plantilla por nota)

- Tipo: Alluvial: nota → controles relacionados (color por capa) → marcos mapeados (NIST AI RMF, obligaciones, OWASP) · impacto 4 · esfuerzo M
- Qué muestra: Qué controles argumenta la nota y a qué marcos llegan, generado para cualquier nota futura.
- Datos: frontmatter relatedControls y relatedPatterns; Control.layer y Control.mappings (obligations, nistAiRmf, owasp) de src/data/controls/*.ts
- Ubicación: Antes de 'Related controls' (las listas quedan como alternativa textual)
- Interacción: Estático; nodos enlazan a controles y patrones
- Reutiliza: Generador Sankey compartido

#### Manifiesto del entorno como documento de evidencia

- Tipo: Infografía de documento con checklist (glifo de evidencia de VISUAL-GUIDE §1.5) · impacto 3 · esfuerzo S
- Qué muestra: Los seis elementos que debe registrar cada ejecución (manifiesto, identidad y credenciales, red, delegación, integridad de la traza, comprobaciones de validez).
- Datos: Sección 'What an evaluation must therefore record'
- Ubicación: Cabeza de 'What an evaluation must therefore record'
- Interacción: Estático
- Reutiliza: Figure.astro con SVG a mano

### `/figures`

- Fichero: `site/src/pages/figures/index.astro`
- Propósito: Galería de todas las figuras citables y diagramas interactivos, agrupadas por parte y capítulo.
- Pobreza visual: 2/5
- Visuales actuales: PageHero; Callout de licencia; Tarjetas con miniatura SVG (thumbnailSvg) y etiquetas de tipo; Tarjetas de diagramas archify con enlace al visor

#### Atlas de cobertura visual del libro **[T3]**

- Tipo: Tira de puntos por capítulo (00 a 23): un punto por figura (forma según infografía/data-viz/póster) y por diagrama archify · impacto 4 · esfuerzo S
- Qué muestra: Qué capítulos están bien ilustrados y cuáles no tienen ninguna figura (00, 09, 10, 11, 19, 20); sirve además de navegación a cada grupo.
- Datos: src/data/figures.ts (placements, kind vía figureKind) y src/data/diagrams.ts (placements) sobre chapters.ts
- Ubicación: Bajo PageHero, antes del Callout
- Interacción: Estático; cada columna enlaza al ancla del capítulo en la galería
- Reutiliza: BookSpine.astro

#### Filtro por tipo y parte

- Tipo: Chips de filtro (isla pequeña de mejora progresiva) · impacto 3 · esfuerzo M
- Qué muestra: Ver solo pósters, data-viz o diagramas interactivos, o solo una parte del libro.
- Datos: figureKind(figure) y chapter.part ya disponibles en la página
- Ubicación: Encima de la primera sección de parte
- Interacción: Filtro con script propio (defer, sin inline), estado en la URL, aria-live, sin JS muestra todo
- Reutiliza: Patrón de filtros existente en las páginas de recursos (p. ej. reading-list)

### `/figures/[id]`

- Fichero: `site/src/pages/figures/[id].astro`
- Propósito: Permalink de cada figura: la figura, texto alternativo, datos, descargas, crédito, dónde aparece y cita.
- Pobreza visual: 2/5
- Visuales actuales: La figura en línea (permalinkSvg); <picture> con vistas previas PNG/AVIF/WebP; Tabla de datos en data-viz; Lista de descargas

#### Dónde aparece, en la espina del libro **[T3]**

- Tipo: Mini book spine con el capítulo o capítulos resaltados y las páginas extra · impacto 3 · esfuerzo S
- Qué muestra: La ubicación de la figura dentro del libro de un vistazo, más clara que la lista 'Where it appears'.
- Datos: figurePlaces(figure) de src/lib/figure-reuse.ts y chapters.ts
- Ubicación: Cabeza de 'Where it appears'
- Interacción: Estático; resaltados enlazados
- Reutiliza: BookSpine.astro (variante mini)

#### Claro y oscuro lado a lado

- Tipo: Par de vistas previas (tema claro / tema oscuro) · impacto 3 · esfuerzo S
- Qué muestra: Cómo queda la figura en cada tema antes de descargar para diapositivas o impresión.
- Datos: figureDownloads(figure): exports -light y -dark ya generados por scripts/figures-build.mjs (AVIF/WebP 800)
- Ubicación: Cabeza de 'Download'
- Interacción: Estático, lazy loading
- Reutiliza: El <picture> existente de la página

#### Figuras relacionadas

- Tipo: Tira de miniaturas (filmstrip) · impacto 3 · esfuerzo S
- Qué muestra: Otras figuras del mismo capítulo o parte, para seguir explorando.
- Datos: thumbnailSvg(figure) de src/lib/figure-reuse.ts; figures.ts placements
- Ubicación: Antes de la navegación prev/next
- Interacción: Estático; en móvil rejilla de 2 columnas, sin scroll horizontal de página
- Reutiliza: Tarjetas .fg-card de figures-gallery.css

### `/cases`

- Fichero: `site/src/pages/cases/index.astro`
- Propósito: Índice de 18 incidentes públicos analizados como post-mortems de ingeniería.
- Pobreza visual: 4/5
- Visuales actuales: PageHero y Callout; Tarjetas de caso con chips (año, jurisdicción, nivel de evidencia) y controles en texto; FlowDiagram 'From incident to control' (5 pasos)

#### Qué patrón habría detenido cada incidente (hero)

- Tipo: Matriz de puntos 18 casos × patrones (columnas agrupadas por capa), forma según momento (antes, durante, después), con barra de totales por patrón · impacto 5 · esfuerzo M
- Qué muestra: Los patrones que más incidentes habrían detenido (p. ej. Eval Gate in CI, Runtime Guardrail) y que los 7 casos agénticos de 2026 se concentran en capa 04.
- Datos: src/data/cases.ts: control.controls[].patternId, preventiveControls, detectiveControls, responsiveControls (10 casos con nota de incidente); capa de cada patrón en src/data/patterns.ts
- Ubicación: Antes de la sección de tarjetas (tras el Callout)
- Interacción: Estático; filas enlazan a /cases/<id> y columnas a /patterns/<id>; en 390 px se transpone a pequeños múltiplos por caso
- Reutiliza: MatrixHeat.astro / DotMatrix compartido (también útil para el crosswalk de frontier safety)

#### Cronología de casos 2018 a 2026 **[T1]**

- Tipo: Beeswarm/timeline por año, un glifo por caso (forma según evidencia primaria, secundaria o reportada) · impacto 4 · esfuerzo S
- Qué muestra: El salto de 2026: siete incidentes de desarrollo y evaluación de agentes frente a casos anteriores de sector público, salud o crédito.
- Datos: src/data/cases.ts: year, sector, evidence, short
- Ubicación: Cabecera de la sección de casos, encima de las tarjetas
- Interacción: Estático; cada glifo enlaza al caso; color solo acento para el grupo de 2026 (regla §4.3)
- Reutiliza: Timeline.astro

#### Del daño al caso y a la capa de evidencia

- Tipo: Alluvial daño (atlas de daños) → caso → capa que produce la evidencia · impacto 5 · esfuerzo L
- Qué muestra: Qué daños aparecen más en los casos y qué capa habría dejado la evidencia (capa 01: 11 artefactos, 02: 10, 03: 17, 04: 19, 05: 16).
- Datos: src/data/cases.ts: harms[] (ids de src/data/harms.ts), evidenceArtefacts[].layerN
- Ubicación: Antes de 'From incident to control'
- Interacción: Estático; tabla alternativa
- Reutiliza: Generador Sankey compartido
- **CORREGIDA**: 18 casos en la columna central rompen el límite de 9 nodos para kind no póster. Reducir a dos columnas daño (harms.ts) a capa de evidencia (evidenceArtefacts[].layerN), con los casos en la tabla alternativa; esfuerzo baja a M.

#### Qué normas tocan los casos

- Tipo: Barras (o treemap) de obligaciones por instrumento y artículo · impacto 3 · esfuerzo S
- Qué muestra: Que el EU AI Act concentra la mayoría de obligaciones tocadas (23 filas), seguido del RGPD, y qué artículos se repiten.
- Datos: src/data/cases.ts: obligations[].instrument, ref, obligationId (enlace a /obligations/<id>)
- Ubicación: Tras la matriz de patrones
- Interacción: Estático; barras enlazan a /obligations/<id>
- Reutiliza: StackedBar.astro

### `/cases/[id]`

- Fichero: `site/src/pages/cases/[id].astro`
- Propósito: Post-mortem de un caso: qué pasó, modo de fallo, control, evidencia, obligaciones y, en 10 casos, nota de incidente con controles por momento.
- Pobreza visual: 4/5
- Visuales actuales: Lista de hechos (dl cs-facts) y TOC; Lista de evidencias con marcas de capa L1 a L5 (ticks--coded); Listas de controles por momento y controles abiertos relacionados

#### Pajarita del incidente (bow-tie) (hero por caso) **[T2]**

- Tipo: Diagrama bow-tie: controles preventivos → evento/modo de fallo → controles detectivos y de respuesta → daños → artefactos de evidencia como nodo final · impacto 5 · esfuerzo M
- Qué muestra: En una imagen, qué habría evitado el incidente, qué lo habría detectado, qué lo habría contenido y qué evidencia quedaría; generado para cada caso.
- Datos: src/data/cases.ts por caso: preventiveControls, detectiveControls, responsiveControls, failureMode, harms (títulos en src/data/harms.ts), evidenceArtefacts; para los 8 casos sin nota, lado izquierdo con control.controls
- Ubicación: Tras 'In short' y antes de 'What happened'
- Interacción: Estático SVG en build; nodos enlazan a /patterns/<id>; máximo 9 nodos (agrupar si hay más); vertical en móvil
- Reutiliza: Nuevo BowTie.astro con glifos de VISUAL-GUIDE §1.7

#### Pila de evidencia del caso

- Tipo: Mini pila de 5 capas con recuento de artefactos y capas vacías señaladas · impacto 3 · esfuerzo S
- Qué muestra: Qué capas habrían dejado evidencia y cuáles no (el hueco suele ser la lección).
- Datos: src/data/cases.ts evidenceArtefacts[].layerN
- Ubicación: Cabeza de 'The evidence that would have existed'
- Interacción: Estático
- Reutiliza: StackDiagram.astro / tokens --l1..--l5 y las marcas ticks--coded existentes

#### Cronología del incidente

- Tipo: Línea de tiempo vertical de eventos fechados · impacto 4 · esfuerzo M · requiere datos nuevos
- Qué muestra: La secuencia real (p. ej. 9 jul acceso a internet desde un sandbox, 10 jul credenciales publicadas, 26 ago 2026 informe de METR) con cada evento citado.
- Datos: Fechas presentes en la prosa de happened[] en src/data/cases.ts; añadir campo opcional timeline?: {date, label, sourceN}[] por caso
- Ubicación: Cabeza de 'What happened'
- Interacción: Estático; marcadores [n] enlazados a Sources
- Reutiliza: Timeline.astro

### `/toolkit`

- Fichero: `site/src/pages/toolkit/index.astro`
- Propósito: Índice de las 11 herramientas del navegador (registro src/data/toolkit.ts) y convenciones comunes (estado en el enlace, formatos abiertos, sin red).
- Pobreza visual: 4/5
- Visuales actuales: Rejilla de tarjetas .tc-grid (título, resumen, para quién, entradas, salidas); Ningún gráfico ni diagrama

#### Constelación de herramientas: qué alimenta a qué

- Tipo: Grafo de red dirigido (nodos = herramientas, aristas = traspasos de salida a entrada y esquemas compartidos) · impacto 5 · esfuerzo M · requiere datos nuevos
- Qué muestra: Que el toolkit es una cadena y no 11 piezas sueltas: la triaje pasa a obligations-planner (traspaso explícito en la sección tri-handoff), agent-control-profile escribe una entrada agent-register-entry.v1 que abre ai-register-entry, model-card y ai-register-entry se cruzan en la columna 'Model or system card', impact-assessment enlaza 'related_assessments' y patrones, policy-card cierra el bucle como control. El lector ve por dónde empezar y qué herramienta usar después.
- Datos: src/data/toolkit.ts (id, title, chapter, outputs). Añadir un campo pequeño `feeds?: readonly string[]` (ids destino) y `schemas?: readonly string[]` (p. ej. 'agent-register-entry.v1', 'ai-system-register-entry.v1', 'impact-assessment.v1', 'policy-card', 'obligations-plan.v1') a cada una de las 11 entradas.
- Ubicación: Hero, justo tras PageHero y los tool-notice, antes de la sección 'The tools'
- Interacción: Estático SVG generado en build; cada nodo es un enlace a /toolkit/<id>; hover/focus resalta aristas con CSS :has(); tabla alternativa 'herramienta, alimenta a, esquema' en <details>
- Reutiliza: Nuevo componente compartido ToolkitGraph.astro (patrón de generación como src/lib/aigp-heatmap.ts); colores por capa --l1..--l5

#### Las herramientas sobre el ciclo de vida y la pila

- Tipo: Swimlane: columnas = fases del ciclo (clasificar, diseñar, construir, comprar, desplegar, operar, incidente), filas = 5 capas de la pila · impacto 4 · esfuerzo M · requiere datos nuevos
- Qué muestra: Dónde cae cada herramienta: triaje y planner al clasificar (capa 01), register entry y model card en inventario (02), fairness chooser en evals (03), agent control profile y policy card en runtime/gobierno (04/01), vendor DD al comprar, incident clock en incidentes (05). Revela huecos de la pila que aún no tienen herramienta.
- Datos: src/data/toolkit.ts (chapter.label ya indica el capítulo). Añadir `stage` (una de 7 fases) y `layer` (1..5) por herramienta; las capas se nombran con layers de src/data/stack.ts.
- Ubicación: Tras la rejilla de tarjetas, antes de 'How every tool works'
- Interacción: Estático; fichas enlazadas; a 390 px las fases pasan a lista vertical con la capa como marca de color
- Reutiliza: Estilos de swatch de capa de StackDiagram y WorkflowGrid (tick de color por capa)

#### Matriz de formatos de exportación

- Tipo: Matriz de puntos (11 herramientas x formatos JSON, YAML, CSV, iCalendar, Markdown, SVG, PNG, CycloneDX, Rego/Cedar) · impacto 3 · esfuerzo S · requiere datos nuevos
- Qué muestra: Qué se puede archivar, versionar o importar de cada herramienta, reforzando la promesa 'formatos abiertos' del texto con un vistazo; también qué herramientas reimportan su propio JSON.
- Datos: src/data/toolkit.ts outputs[] (texto libre: 'JSON profile you can re-import', 'Calendar file (.ics)', 'SVG and PNG image'...). Mejor añadir `formats: readonly string[]` explícito por entrada para no parsear texto.
- Ubicación: Dentro de 'How every tool works', junto al punto 'Open formats'
- Interacción: Estático; es en sí una <table> con celdas de punto (accesible por defecto)
- Reutiliza: Estilos de ObligationMatrix (celda cuadrada con tinte) sin el JS de filtrado

#### Mini flujo entrada a salida en cada tarjeta

- Tipo: Micro diagrama de flujo de tres pasos (lo que introduces, la herramienta, lo que obtienes) con iconos de formato · impacto 3 · esfuerzo S
- Qué muestra: Convierte las filas de texto 'You enter / You get' de cada tarjeta en un esquema legible de un vistazo; el mismo componente sirve de cabecera visual en cada página de herramienta.
- Datos: src/data/toolkit.ts inputs[] y outputs[] (ya existentes)
- Ubicación: Dentro de cada .tc-card, sustituyendo las líneas tc-row de entradas y salidas; reutilizable bajo el lede de ToolShell
- Interacción: Estático, HTML/CSS
- Reutiliza: FlowDiagram.astro (2 a 7 pasos, contenedor responsive) en variante compacta

### `/toolkit/maturity-self-check`

- Fichero: `site/src/pages/toolkit/maturity-self-check.astro`
- Propósito: Autoevaluación por capa contra los criterios observables del modelo de madurez (cap. 07): perfil irregular, suelo y siguiente paso.
- Pobreza visual: 2/5
- Visuales actuales: Resultado: gráfico SVG de barras horizontales por capa con regla discontinua del suelo (public/toolkit/maturity-self-check.js chartSvg), exportable SVG/PNG; Comparación antes/después: SVG con dos perfiles superpuestos (polilíneas); Guía: listas de texto de métricas por paso y checklist por nivel

#### Pentágono de madurez (vista radar del resultado)

- Tipo: Radar de 5 ejes (una capa por eje, niveles 0 a 5) con anillo discontinuo en el suelo y superposición antes/después · impacto 5 · esfuerzo M
- Qué muestra: La forma del perfil irregular de un golpe: un pentágono abollado muestra dónde está la palanca, y el anillo del suelo enseña que la capa más débil fija el nivel global. En la comparación, dos polígonos muestran qué capas crecieron en el trimestre.
- Datos: Estado del cliente (perfil Record<MaturityLayer, LayerReading>) y maturityFloor() de src/data/maturity.ts; nombres y colores de capa de src/data/stack.ts
- Ubicación: Sección 'Your profile', como pestaña o segunda figura junto al gráfico de barras existente; también en 'Before and after'
- Interacción: Conmutador Barras/Radar (botones accesibles); SVG generado en el cliente con los mismos tokens; descarga SVG/PNG con la exportación existente; sin animación con reduced-motion
- Reutiliza: Extiende chartSvg() de public/toolkit/maturity-self-check.js (misma paleta p.tint/p.tintInk)

#### Cuadrícula de criterios clicable (5 capas x 5 niveles)

- Tipo: Heatmap/cuadrícula interactiva de 25 celdas con el criterio y el patrón de cada una · impacto 5 · esfuerzo M
- Qué muestra: El modelo entero como mapa: cada celda es el criterio observable de esa capa y nivel, con el patrón que lo construye. Al responder el formulario las celdas alcanzadas se rellenan con el color de la capa y la escalera irregular aparece sobre la rejilla, así el lector ve qué criterio exacto le falta.
- Datos: src/data/maturity.ts layerCriteria[].cells (level, text, pattern, patternSource) y levels[] (name)
- Ubicación: Arriba de la guía ('How to read the result'), o como alternativa visual al formulario
- Interacción: Estática sin JS (tabla de 5x5); con JS, clic en una celda fija la lectura de esa capa (sincronizada con los radios del formulario y el fragmento de la URL)
- Reutiliza: Figura existente maturity-grid (src/figures/maturity-grid.svg) como versión estática; MaturityLadder para las cabeceras de nivel

#### El siguiente escalón, dibujado

- Tipo: Mini escalera de dos peldaños (nivel actual del suelo a nivel siguiente) con tarjeta de patrón y métricas del paso · impacto 3 · esfuerzo S
- Qué muestra: Convierte el bloque de texto 'Next move' en un gesto visual: la capa que fija el suelo sube un peldaño, con el patrón que lo construye y las métricas del paso (stepMetrics) como chips.
- Datos: maturityFloor() y layerCriteria (pattern) de src/data/maturity.ts; stepMetrics[2..5]
- Ubicación: Bloque 'Next move' del resultado
- Interacción: Generado en el cliente al calcular el perfil; transición solo transform y desactivada con reduced-motion
- Reutiliza: Estilos de peldaño de MaturityLadder.astro

### `/toolkit/obligations-planner`

- Fichero: `site/src/pages/toolkit/obligations-planner.astro`
- Propósito: Filtra las filas del registro de obligaciones (AI Act y GPAI) por rol y clase de sistema: artefacto, capa, fecha y estado en una fecha de referencia.
- Pobreza visual: 2/5
- Visuales actuales: Resultado: línea temporal SVG de puntos por fecha (lleno = aplica en la fecha de referencia, hueco = después) con regla discontinua; Tablas de fechas y obligaciones; Guía: tabla de todas las filas del registro

#### Matriz rol x obligación de la cadena de valor

- Tipo: Matriz de puntos (7 roles en columnas x filas del planner agrupadas por capítulo del AI Act) · impacto 5 · esfuerzo M
- Qué muestra: Cómo se reparten las obligaciones entre proveedor, desplegador, importador, distribuidor, representante autorizado y proveedor GPAI (con y sin riesgo sistémico): qué filas son exclusivas de un rol y cuáles comparten varios. Hace visible por qué marcar dos roles duplica la carga.
- Datos: src/data/obligations-planner.ts plannerRoles, plannerDuties (RowDuty por id de fila), ROLE_CLASSES, plannerRows(); títulos y layerN de src/data/frameworks.ts
- Ubicación: Hero de la guía: al inicio de 'How the planner reads the register', antes de la tabla 'Every row the planner reads'
- Interacción: Estático en build; con JS, los roles marcados en el formulario resaltan sus columnas; la matriz es una <table> accesible
- Reutiliza: Estilos de ObligationMatrix.astro (celda con tinte de capa)

#### Tu carga por capa de la pila

- Tipo: Barras apiladas horizontales por capa (01 a 05) divididas en 'aplica ya' y 'aplica después' · impacto 4 · esfuerzo S
- Qué muestra: Dónde cae el trabajo de evidencia del lector: si la mayoría de filas vinculantes están en inventario y transparencia o en aseguramiento, sabe qué equipo moviliza primero.
- Datos: Filas filtradas en el cliente (layerN de cada Obligation, estado en la fecha de referencia calculado por obligations-planner-core.js)
- Ubicación: Resultado, entre la línea temporal existente y la tabla 'Obligations that bind you'
- Interacción: Cliente; clic en un segmento filtra la tabla por capa; región aria-live con el recuento
- Reutiliza: Paleta --l1..--l5 y patrón de filtro de public/matrix.js

#### Curva de obligaciones vigentes en el tiempo

- Tipo: Gráfico de escalones acumulado (eje X fechas, eje Y número de obligaciones que ya aplican) con línea de fecha de referencia · impacto 4 · esfuerzo S
- Qué muestra: El ritmo de entrada en vigor para el perfil del lector: los saltos de 2025-02-02, 2025-08-02, 2026 y 2027 como escalones, y cuántas obligaciones faltan por activarse tras la fecha elegida.
- Datos: rowTimeline(row).steps y starts de src/data/obligations-planner.ts sobre las filas filtradas
- Ubicación: Resultado, como segunda vista de la figura data-opl-chart (conmutador Puntos/Acumulado)
- Interacción: Cliente; eje con 'As of' impreso dentro del SVG; tabla de fechas existente como alternativa
- Reutiliza: Extiende el dibujo de public/toolkit/obligations-planner.js

### `/toolkit/ai-act-triage`

- Fichero: `site/src/pages/toolkit/ai-act-triage.astro`
- Propósito: Triaje indicativo del EU AI Act en 7 pasos y 20 preguntas: alcance, roles, escalera de riesgo y vía GPAI, con registro de decisión.
- Pobreza visual: 4/5
- Visuales actuales: Resultado: lista ol .tri-ladder de clases con borde grueso en las que aplican (solo texto con borde); Tablas de respuestas; guía textual de reglas

#### El recorrido del triaje, como árbol de decisión

- Tipo: Diagrama de flujo vertical (7 pasos, rombos de decisión, salidas terminales: fuera de alcance, prohibido, alto riesgo Anexo I, alto riesgo Anexo III, transparencia, mínimo, GPAI, GPAI con riesgo sistémico) · impacto 5 · esfuerzo M
- Qué muestra: Toda la lógica del Reglamento en una imagen: el orden en que se decide (objeto, alcance, rol, art. 5, alto riesgo con el filtro 6(3), art. 50, GPAI) y que transparencia se acumula sobre cualquier otra clase. En el resultado, el camino recorrido por el lector se ilumina.
- Datos: src/data/triage.ts steps[] (id, title, lede), questions[] (step, article, showIf), classRules[], scopeRules[], classOrder
- Ubicación: Hero: tras el lede y antes del primer paso del formulario; versión resaltada en 'Indicative triage'
- Interacción: SVG estático en build (flujo vertical legible a 390 px); con JS se marca el camino según las respuestas; texto alternativo = la sección 'The rules, written out'
- Reutiliza: FlowDiagram.astro para la columna de pasos más un SVG propio para las ramas; glifo de puerta (rombo) según VISUAL-GUIDE §1.7

#### Escalera de riesgo con tu sistema situado **[T1]**

- Tipo: Pirámide/escalera de 4 peldaños más carril GPAI paralelo, con los peldaños que aplican encendidos · impacto 5 · esfuerzo S
- Qué muestra: Sustituye la lista de texto por la imagen que todo el mundo reconoce del AI Act, con el matiz del sitio: un sistema puede estar en varios peldaños (alto riesgo más transparencia) y el modelo va por su propia vía.
- Datos: classOrder y classLabels de src/data/triage.ts; estado given/not/open ya calculado por public/toolkit/ai-act-triage-engine.js
- Ubicación: Resultado, columna 'Risk ladder and GPAI track' (reemplaza el ol .tri-ladder, que queda como alternativa textual)
- Interacción: Cliente; estados por color y por texto (nunca solo color); sin animación con reduced-motion
- Reutiliza: Figura existente eu-ai-act-risk-ladder (src/figures/eu-ai-act-risk-ladder.svg) como base de diseño

#### Tus roles en la cadena de valor

- Tipo: Diagrama de cadena (proveedor, importador, distribuidor, desplegador, representante autorizado, fabricante de producto) con el bucle del art. 25 y roles del lector resaltados · impacto 4 · esfuerzo M
- Qué muestra: Qué papel(es) tiene el lector y cómo el art. 25 puede convertir a un desplegador o distribuidor en proveedor; refuerza que los roles son tareas, no organizaciones.
- Datos: roleRules[] y roleLabels de src/data/triage.ts; resultado del motor en el cliente
- Ubicación: Resultado, columna 'Roles'; versión estática en 'How the triage works'
- Interacción: Estático en la guía; resaltado en el cliente
- Reutiliza: Figura existente eu-ai-act-operator-roles (src/figures/eu-ai-act-operator-roles.svg) vía Figure.astro
- **CORREGIDA**: En la guía, incrustar la figura existente eu-ai-act-operator-roles con Figure.astro (coste S) en vez de dibujar una nueva; el resaltado en cliente queda como mejora posterior.

#### Las 8 áreas del Anexo III en mosaico

- Tipo: Mosaico de 8 teselas con icono (biometría, infraestructura crítica, educación, empleo, servicios esenciales, aplicación de la ley, migración, justicia y democracia) · impacto 3 · esfuerzo S
- Qué muestra: Hace la pregunta del Anexo III visual y rápida: el lector reconoce su área en un mosaico en vez de leer una lista, y la tesela elegida queda marcada en el resultado.
- Datos: ANNEX_III_AREAS y las opciones de la pregunta 'annex3' en src/data/triage.ts
- Ubicación: Paso 'High-risk', envolviendo las casillas de la pregunta annex3
- Interacción: Las teselas son las propias casillas (label + input) con estilo; accesible por teclado; sin JS extra
- Reutiliza: Rejilla .bento de effects.css

### `/toolkit/ai-register-entry`

- Fichero: `site/src/pages/toolkit/ai-register-entry.astro`
- Propósito: Constructor de entradas del registro de sistemas y agentes (esquemas v1), registro local, importación/exportación y crosswalk a cinco regímenes.
- Pobreza visual: 4/5
- Visuales actuales: Tabla ancha 'Register field to regime field' con desplazamiento lateral; Listas de secciones del esquema; formulario generado

#### Un registro, cinco regímenes **[T5]**

- Tipo: Diagrama aluvial/abanico (campos del registro a la izquierda, 5 regímenes a la derecha: UK ATRS, Canada AIA, base de datos UE Anexo VIII, ficha de modelo, SoA ISO/IEC 42001) más barra de cobertura por régimen · impacto 5 · esfuerzo M
- Qué muestra: El mensaje de la sección en una imagen: escribes una vez y copias a cinco sitios. Las cintas muestran qué campo alimenta a cada régimen y las barras cuántos campos tiene cada régimen sin equivalente ('No direct field').
- Datos: src/data/doc-builders.ts registerCrosswalk[] (label, paths, atrs, aia, euDb, card, soa) y crosswalkColumns
- Ubicación: Hero de la sección 'One record, five regimes', encima de la tabla (que pasa a ser su alternativa)
- Interacción: Estático SVG en build; hover/focus en un campo resalta sus cintas (CSS); a 390 px se convierte en matriz de puntos vertical
- Reutiliza: Nuevo componente compartido AlluvialFlow.astro (reutilizable en vendor DD, impact assessment y methodology)

#### Completitud de la entrada por sección

- Tipo: Anillo segmentado (una porción por sección del esquema) con relleno proporcional a campos completos y marca en los obligatorios pendientes · impacto 4 · esfuerzo M
- Qué muestra: Cuánto le falta a la entrada para validar y en qué sección, mientras se escribe; motiva completar los campos que después alimentan los cinco regímenes.
- Datos: aiSystemSections y agentSections (SectionSpec, FieldSpec.required) de src/data/doc-builders.ts; estado del formulario en public/toolkit/schema-form.js
- Ubicación: Resultado 'This entry', junto al indicador de validez
- Interacción: Cliente, actualización en vivo; región aria-live con 'N de M campos obligatorios'
- Reutiliza: Nuevo CompletenessRing (compartible con model-card e impact-assessment)

#### Tu registro de un vistazo

- Tipo: Pequeños múltiplos: barras por clase de riesgo, por estado y por tipo (sistema/agente) de las entradas guardadas · impacto 3 · esfuerzo S
- Qué muestra: Cuando el lector guarda varias entradas, un mini panel responde 'qué tenemos en producción, de qué clase y en qué estado', que es la pregunta de la capa 02.
- Datos: Entradas guardadas en el navegador (localStorage vía public/toolkit/lib.js) con campos del esquema ai-system-register-entry.v1 / agent-register-entry.v1
- Ubicación: Sección 'The register', encima de la lista de entradas
- Interacción: Cliente; solo aparece con 2 o más entradas; tabla de recuentos como alternativa
- Reutiliza: StatTile.astro para los totales y barras SVG ligeras

### `/toolkit/impact-assessment`

- Fichero: `site/src/pages/toolkit/impact-assessment.astro`
- Propósito: Constructor de FRIA (art. 27), AIIA (ISO/IEC 42005) y adenda IA de la DPIA (art. 35 RGPD), con riesgos, medidas, patrones y disparadores de reapertura.
- Pobreza visual: 5/5
- Visuales actuales: Ninguno: listas de elementos y tablas de texto

#### Mapa de calor de tus riesgos

- Tipo: Matriz 5x5 probabilidad x severidad con cada riesgo como punto etiquetado y carril aparte para severidad 5 · impacto 5 · esfuerzo M
- Qué muestra: Dónde se concentran los riesgos que el lector ha descrito y cuáles caen en las bandas que exigen puerta y aceptante; convierte la tabla de riesgos en una lectura inmediata para el comité.
- Datos: Campos risks[].likelihood y risks[].severity (escala SCALE 1 a 5) de iaSections en src/data/doc-builders.ts; estado del formulario en public/toolkit/impact-assessment.js
- Ubicación: Hero del resultado 'Your assessment'
- Interacción: Cliente, en vivo; cada punto enlaza a su fila del formulario; tabla id/probabilidad/severidad como alternativa; descarga SVG
- Reutiliza: Figura existente risk-matrix (src/figures/risk-matrix.svg, cap. 13) como diseño de base

#### Riesgo, medida, patrón: el hilo de la evidencia

- Tipo: Diagrama aluvial de tres columnas (riesgos, medidas, patrones) con color por estado de la medida · impacto 5 · esfuerzo M
- Qué muestra: La regla de la sección 'Every risk linked to a measure, every measure to a pattern' hecha visible: riesgos sin medida quedan huérfanos en rojo a la izquierda y medidas sin patrón quedan sin salida.
- Datos: mitigations[].addresses (ids de riesgo), mitigations[].pattern, mitigations[].status de iaSections; títulos de patrón de patternOptions (src/data/patterns.ts)
- Ubicación: Resultado, tras el mapa de calor; versión de ejemplo en la sección 'ia-link' de la guía
- Interacción: Cliente; hover resalta la cadena completa; lista 'riesgo, medida, patrón' como alternativa
- Reutiliza: AlluvialFlow.astro (nuevo, compartido con ai-register-entry)

#### Rellenas una vez, sirve a tres evaluaciones

- Tipo: Diagrama de Euler/UpSet de los elementos de FRIA (6), AIIA (13 cláusulas) y DPIA (4 puntos) y los campos del registro que comparten · impacto 4 · esfuerzo M
- Qué muestra: Que 'risks', 'mitigations' y 'affected_categories' alimentan a la vez los tres regímenes; ayuda a decidir qué evaluación hacer primero y cuánto se reaprovecha.
- Datos: art27Elements[].paths, dpiaElements[].paths, iso42005Clauses[] e iaTypes[] de src/data/doc-builders.ts
- Ubicación: Guía, tras 'How to use it' y antes de 'FRIA: the Art. 27(1) elements'
- Interacción: Estático en build; tabla de intersecciones como alternativa
- Reutiliza: Nuevo SVG en src/figures con entrada en figures.ts (kind infographic)

#### El anillo de reapertura

- Tipo: Ciclo circular: evaluación en el centro, 10 disparadores alrededor marcados por tipo (FRIA, AIIA, DPIA) y las cláusulas de proceso 5.4 a 5.12 como arco · impacto 3 · esfuerzo S
- Qué muestra: Que la evaluación es un ciclo y no un documento: qué eventos la reabren y qué parte del proceso ISO/IEC 42005 cubre cada uno.
- Datos: reopenTriggers[] (text, for) e iso42005Process[] de src/data/doc-builders.ts
- Ubicación: Sección 're-open triggers' de la guía
- Interacción: Estático; filtro opcional por tipo de evaluación con botones
- Reutiliza: Lenguaje visual de GovernanceLoop.astro

### `/toolkit/model-card`

- Fichero: `site/src/pages/toolkit/model-card.astro`
- Propósito: Constructor de fichas de modelo con checklist de cobertura (Anexo IV, art. 13, art. 53, ISO/IEC 42001, NIST AI RMF) y exportación HF Markdown y CycloneDX ML-BOM.
- Pobreza visual: 5/5
- Visuales actuales: Tabla 'Coverage checklist' con estado por requisito; Ningún gráfico

#### Anillo de cobertura por marco **[T5]**

- Tipo: Sunburst de dos niveles (anillo interior: 5 grupos; exterior: 45 requisitos) coloreado por estado (cubierto, parcial, falta, en otro artefacto, no aplica) · impacto 5 · esfuerzo M
- Qué muestra: Qué parte del Anexo IV (16 ítems), art. 13 (12), art. 53 (4), ISO 42001 (6) y NIST (7) evidencia ya la ficha; los huecos saltan a la vista y enlazan al campo que falta.
- Datos: src/data/doc-builders.ts modelCardChecklist[] (id, group, ref, fields, applies, elsewhere) y checklistGroups[]; estado calculado por public/toolkit/model-card-core.js
- Ubicación: Hero del resultado 'Your card', encima de la tabla de cobertura
- Interacción: Cliente; clic en un segmento desplaza a la fila de la tabla; la tabla es la alternativa textual
- Reutiliza: Nuevo CoverageSunburst (compartible con AIGP)

#### Un registro, tres salidas

- Tipo: Diagrama en abanico: registro model-card.v1 (JSON) hacia ficha Hugging Face, ML-BOM CycloneDX y checklist CSV, con las obligaciones (art. 11, 13, 53) que cada salida evidencia · impacto 3 · esfuerzo S
- Qué muestra: Que el lector escribe una vez y obtiene artefactos para personas, para máquinas y para auditoría; aclara la diferencia entre las secciones 'The Hugging Face style card' y 'The CycloneDX ML-BOM'.
- Datos: Texto y constantes E11/E13/E53 de src/data/doc-builders.ts; nombres de exportación de la página
- Ubicación: Guía, al inicio de 'How to use it'
- Interacción: Estático
- Reutiliza: FlowDiagram.astro; o el diagrama archify existente public/diagrams/model-card-evidence.html vía Diagram.astro

#### Campos que sirven a varios regímenes

- Tipo: Matriz de puntos (campos de la ficha x 5 grupos del checklist) · impacto 3 · esfuerzo S
- Qué muestra: Qué campos rinden más: 'metrics', 'limitations' o 'intended_uses' cubren requisitos de varios marcos a la vez, así el lector prioriza los campos de mayor retorno.
- Datos: modelCardChecklist[].fields y group; secciones de modelCardSections en src/data/doc-builders.ts
- Ubicación: Sección 'What the checklist reads'
- Interacción: Estático como <table> con puntos; ordenada por número de grupos cubiertos
- Reutiliza: Estilo de celda de ObligationMatrix

### `/toolkit/policy-card`

- Fichero: `site/src/pages/toolkit/policy-card.astro`
- Propósito: Constructor de Policy Cards (6 plantillas más regla propia) que genera la tarjeta, módulos Rego/Cedar y pruebas.
- Pobreza visual: 4/5
- Visuales actuales: Ninguno: ficheros generados como bloques de código y guía de texto larga

#### Las seis reglas sobre la tubería de entrega **[T1]**

- Tipo: Swimlane: columnas = puntos de aplicación (pre_merge, deploy, runtime, periodic), filas = plantillas, marcadores con forma por efecto (deny, allow, require_approval, alert) · impacto 5 · esfuerzo S
- Qué muestra: Dónde muerde cada regla en el ciclo de entrega y con qué efecto: 'No unregistered agent' actúa en deploy y runtime, 'Eval score gate' antes de fusionar o desplegar, etc. Ayuda a elegir plantilla por el punto que se quiere proteger.
- Datos: src/data/policy-card.ts policyCardTemplates[] (title, effect, enforcementPoints, pattern), effectLabels, enforcementLabels
- Ubicación: Hero de 'The six rule templates' (y enlace desde el selector de plantillas del formulario)
- Interacción: Estático en build; cada fila enlaza a su plantilla; tabla alternativa
- Reutiliza: Nuevo SVG; glifos de puerta/política según VISUAL-GUIDE §1.7

#### Anatomía de tu Policy Card

- Tipo: Tarjeta ilustrada en vivo: efecto como sello, franja de puntos de aplicación iluminada, chips de obligaciones, patrón y módulo de motor · impacto 4 · esfuerzo M
- Qué muestra: La tarjeta que el lector está construyendo como objeto visual antes de los ficheros YAML/Rego: se entiende qué hará la regla, dónde y contra qué obligación, y se puede descargar como SVG para una revisión.
- Datos: Estado del formulario (policy-card-core.js); appliesStatusLabels y obligations de src/data/frameworks.ts
- Ubicación: Resultado 'Your Policy Card', antes de .pc-files
- Interacción: Cliente; exportación SVG/PNG con los helpers de lib.js
- Reutiliza: VerdictStamp.astro (sello pass/block) y RegisterMark

#### Recorrido de una tarjeta: de la cláusula al veredicto

- Tipo: Diagrama de flujo (cláusula de política, tarjeta en el repositorio, motor, puerta allow/deny, cambio que sigue o se bloquea, registro de veredicto) · impacto 4 · esfuerzo S
- Qué muestra: El mecanismo que la sección 'What a Policy Card is' explica en un párrafo, terminando en la evidencia (id de regla, decisión, hash de entrada, marca de tiempo).
- Datos: Diagrama archify existente public/diagrams/policy-card.html (brief en VISUAL-GUIDE §2.1)
- Ubicación: Sección 'What a Policy Card is'
- Interacción: El del componente Diagram (hover/focus, notas)
- Reutiliza: Diagram.astro con id 'policy-card'

#### Plantillas, obligaciones y patrones

- Tipo: Grafo bipartito (6 plantillas a obligaciones del registro, con el patrón como etiqueta) · impacto 3 · esfuerzo M
- Qué muestra: Qué obligaciones cubre cada regla (p. ej. AIGE-OBL-EUAIA-ART49-71, OWASP Agentic) y que varias reglas convergen en las mismas obligaciones.
- Datos: policyCardTemplates[].obligations y pattern; títulos de obligaciones de src/data/frameworks.ts
- Ubicación: Sección 'Where this sits'
- Interacción: Estático; nodos enlazados a /obligations/<id> y /patterns/<slug>
- Reutiliza: Nuevo; mismo generador que la constelación del toolkit

### `/toolkit/vendor-due-diligence`

- Fichero: `site/src/pages/toolkit/vendor-due-diligence.astro`
- Propósito: Genera la solicitud de diligencia debida a un proveedor de IA según un nivel (bajo a crítico) calculado en cuatro dimensiones, con 38 preguntas y cláusulas contractuales.
- Pobreza visual: 5/5
- Visuales actuales: Ninguno: listas y tablas de preguntas

#### Radar de riesgo del proveedor **[T5]**

- Tipo: Radar de 4 ejes (uso, datos, autonomía, contexto regulatorio; puntuación 1 a 3) con banda de nivel resultante · impacto 5 · esfuerzo M
- Qué muestra: Por qué el proveedor sale en su nivel: la regla 'el nivel es la lectura más alta, dos lecturas altas lo hacen crítico' se ve en el polígono; el eje que dispara el nivel se resalta.
- Datos: src/data/tool-vendor-dd.ts useTiers, dataClasses, autonomyLevels (score), sectors/jurisdictions para el contexto, vendorTierRule, tierOrder; cálculo en public/toolkit/vendor-due-diligence.js
- Ubicación: Hero del resultado 'Your request'
- Interacción: Cliente, en vivo; texto 'nivel alto por: datos personales' en aria-live; descarga SVG
- Reutiliza: Mismo generador de radar que el pentágono de madurez (nuevo helper compartido radarSvg en public/toolkit/lib.js o builders.js)

#### Cuánto crece la solicitud con el nivel

- Tipo: Barras apiladas (4 niveles x preguntas por área) o isotipo de 38 teselas que se van encendiendo · impacto 4 · esfuerzo S
- Qué muestra: Que un proveedor crítico recibe muchas más preguntas que uno bajo, y en qué áreas se concentran; justifica ante negocio el esfuerzo proporcional.
- Datos: vendorQuestions[] (id, area, when.minTier) de src/data/tool-vendor-dd.ts; las preguntas con otras condiciones (supply, autonomy, sector) se muestran como capa 'condicional'
- Ubicación: Guía, sección 'How the request is built'
- Interacción: Estático en build; tabla nivel x área como alternativa
- Reutiliza: Nuevo SVG data-viz con entrada en figures.ts (tabla data obligatoria según VISUAL-GUIDE §4.6)

#### Tu solicitud por áreas y cláusulas **RECHAZADA**

- Tipo: Treemap de las preguntas incluidas por área, con el número de cláusulas contractuales ancladas en cada una · impacto 3 · esfuerzo M
- Qué muestra: La composición de la solicitud que se va a enviar: qué bloques pesan más (datos, evaluaciones, incidentes, salida) y cuáles deben ir al contrato.
- Datos: Preguntas filtradas en el cliente; clauses[] enlazadas a src/data/contracts.ts
- Ubicación: Resultado, tras el radar
- Interacción: Cliente; clic en un área salta a su grupo de preguntas
- Reutiliza: Nuevo treemap SVG ligero (algoritmo squarified en el propio script, sin librería)
- Motivo del rechazo: Treemap squarified en el cliente para ~38 preguntas añade peso de script y poca lectura; las barras por nivel x área ya lo explican.

#### Dónde se mueve el control cuando compras

- Tipo: Infografía existente de la pila (perímetro controlable que encoge, evidencia del proveedor que crece) más el diagrama de la puerta de diligencia · impacto 3 · esfuerzo S
- Qué muestra: El contexto de por qué existe la herramienta: al comprar, el trabajo pasa de probar a acotar el sistema y reunir evidencia del proveedor.
- Datos: Figura existente procured-ai-control (src/figures/procured-ai-control.svg) y diagrama archify public/diagrams/vendor-due-diligence-gate.html
- Ubicación: Inicio de la guía
- Interacción: Estático / Diagram interactivo existente
- Reutiliza: Figure.astro y Diagram.astro

### `/toolkit/incident-clock`

- Fichero: `site/src/pages/toolkit/incident-clock.astro`
- Propósito: Desde la hora de conocimiento, rol, nivel del sistema y hechos: clase de incidente, quién informa a quién y cada plazo como fecha (AI Act, RGPD, NIS2, DORA, código GPAI).
- Pobreza visual: 4/5
- Visuales actuales: Tabla 'Clocks that run or need a decision, nearest first'; Listas de notas; ningún gráfico

#### Tus relojes en una línea de tiempo real **[T5]**

- Tipo: Gantt con carriles por régimen desde T0 (hora de conocimiento), hitos de primer informe, intermedio y final, línea 'ahora' y escala temporal comprimida (horas y días) · impacto 5 · esfuerzo M
- Qué muestra: Qué vence primero en fechas y horas concretas: DORA a las 4/24 h, NIS2 a las 24/72 h, RGPD a las 72 h, art. 73 a 2/10/15 días, informe final GPAI 60 días tras resolver. El comandante de incidentes ve el orden y la presión de un vistazo.
- Datos: src/data/tool-incident-clock.ts clockNumbers, regimes[] (label, first, followUp, to); fechas calculadas por public/toolkit/incident-clock.js
- Ubicación: Hero del resultado 'Class and clocks', encima de la tabla
- Interacción: Cliente; hover/focus en un hito muestra fecha exacta y base; la tabla existente es la alternativa; se refresca la línea 'ahora' cada minuto sin animación
- Reutiliza: Diseño de la figura existente incident-clocks (src/figures/incident-clocks.svg)

#### Los relojes superpuestos (figura del capítulo 17)

- Tipo: Infografía existente: primeros plazos de ocho regímenes en un eje desde el conocimiento · impacto 3 · esfuerzo S
- Qué muestra: La comparación general antes de rellenar el formulario, para entender por qué un solo evento puede arrancar varios relojes.
- Datos: src/figures/incident-clocks.svg y entrada 'incident-clocks' de src/data/figures.ts
- Ubicación: Inicio de la guía 'How the tool reads chapter 17'
- Interacción: Estático
- Reutiliza: Figure.astro

#### Quién informa a quién

- Tipo: Diagrama de flujo bipartito/sankey (quien informa: proveedor, desplegador, responsable del tratamiento, entidad esencial, entidad financiera, proveedor GPAI; destinatario: autoridad de vigilancia, Oficina de IA, autoridad de control, interesados, CSIRT, autoridad financiera, proveedor) · impacto 4 · esfuerzo M · requiere datos nuevos
- Qué muestra: La red de notificaciones del capítulo en una imagen; en el resultado se iluminan solo las flechas que aplican al rol del lector.
- Datos: regimes[].who y regimes[].to de src/data/tool-incident-clock.ts. Añadir ids normalizados `reporter` y `recipients[]` por régimen (7 filas) para no parsear texto.
- Ubicación: Resultado, subsección 'Who reports, and why'
- Interacción: Estático en la guía, resaltado en el cliente
- Reutiliza: AlluvialFlow.astro (nuevo, compartido)

#### Escala de severidad

- Tipo: Tira de calor de 5 escalones (SEV-1 a SEV-4 e ISSUE) con tiempo de respuesta · impacto 2 · esfuerzo S
- Qué muestra: Cómo se gradúa la respuesta interna y dónde queda la clase calculada para el incidente del lector.
- Datos: severityScale[] (id, response) de src/data/tool-incident-clock.ts
- Ubicación: Bloque tk-summary del resultado y guía
- Interacción: Estático con marcador en el cliente
- Reutiliza: Estilo de peldaños de MaturityLadder

### `/toolkit/agent-control-profile`

- Fichero: `site/src/pages/toolkit/agent-control-profile.astro`
- Propósito: Describe un agente y obtén el conjunto mínimo de controles del capítulo 23 según su autonomía, herramientas, memoria e identidad, con entrada de registro y checklist.
- Pobreza visual: 4/5
- Visuales actuales: Tabla de autonomía y lista de disparadores en la guía; Resultado en listas; ningún gráfico

#### La escalera de autonomía

- Tipo: Escalera acumulativa de 5 peldaños (Operator, Collaborator, Consultant, Approver, Observer) con controles apilados en cada peldaño y el papel de la persona · impacto 5 · esfuerzo M
- Qué muestra: Que cada nivel hereda y suma controles (4, 6, 8, 11, 14 acumulados) mientras la persona pasa de ejecutar cada acción a auditar después; con la equivalencia IMDA y ATF debajo.
- Datos: src/data/tool-agent-controls.ts autonomyLevels[] (name, person, imda, atf, adds) y agentControls[] (title)
- Ubicación: Hero de la guía 'How the profile is built' y, con el nivel elegido resaltado, en el resultado
- Interacción: Estático en build; peldaño elegido marcado por el cliente; tabla de autonomía existente como alternativa
- Reutiliza: Estructura de MaturityLadder.astro (peldaños ascendentes, pila a 390 px)

#### Anatomía de tu agente

- Tipo: Diagrama radial: hexágono del agente en el centro, radios hacia herramientas (color por clase de operación, irreversibles en acento), memoria, identidad y acciones externas; controles disparados como insignias en cada radio · impacto 5 · esfuerzo L
- Qué muestra: La superficie de ataque y de control del agente descrito: qué herramienta trae sandbox, cuál exige checkpoint, qué identidad dispara credenciales de corta vida, y los huecos pendientes en rojo.
- Datos: Estado del formulario (hasta 6 herramientas con operationClasses y serverKinds, memoryOptions, identityModels, externalActions) y reglas de disparo de la página (triggers) y public/toolkit/agent-control-profile.js
- Ubicación: Hero del resultado 'Control profile'
- Interacción: Cliente; foco en una insignia muestra la regla y la evidencia; lista de controles existente como alternativa; descarga SVG
- Reutiliza: Glifos de VISUAL-GUIDE §1.7 (agente = hexágono); figura agent-control-plane como referencia de estilo

#### Qué rasgo dispara qué control

- Tipo: Diagrama aluvial (rasgos del agente a la izquierda: clase de operación, tipo de servidor MCP, identidad, memoria, delegación; controles condicionales a la derecha) · impacto 4 · esfuerzo M · requiere datos nuevos
- Qué muestra: La lógica condicional de la página ('triggers') en una imagen: un servidor MCP remoto trae admisión MCP y autorización, una clave estática trae credenciales de corta vida, etc.
- Datos: Array `triggers` definido en src/pages/toolkit/agent-control-profile.astro (control, when) más agentControls; conviene mover `triggers` a src/data/tool-agent-controls.ts con ids de rasgo
- Ubicación: Guía, junto a la lista de disparadores
- Interacción: Estático; hover resalta cintas
- Reutiliza: AlluvialFlow.astro (nuevo, compartido)

#### Controles frente a amenazas OWASP Agentic

- Tipo: Matriz de puntos (26 controles con amenazas x ids OWASP Agentic) · impacto 3 · esfuerzo S
- Qué muestra: Qué amenazas cubre cada control y cuáles quedan cubiertas por varios; en el resultado se sombrean las amenazas que el perfil del lector deja sin control.
- Datos: agentControls[].threats de src/data/tool-agent-controls.ts
- Ubicación: Guía, antes de 'What this is not'; versión filtrada en el resultado
- Interacción: Estático como <table>; resaltado en el cliente
- Reutiliza: Estilos de CrosswalkMatrix/ObligationMatrix

### `/toolkit/fairness-metric-chooser`

- Fichero: `site/src/pages/toolkit/fairness-metric-chooser.astro`
- Propósito: Recorre las preguntas del capítulo 16 (daño, verdad de base, error más costoso, marco legal, atributo) y devuelve las familias de métricas de equidad con sus advertencias.
- Pobreza visual: 5/5
- Visuales actuales: Resultado en tarjetas y listas; Guía: árbol en texto y tabla de familias de métricas

#### El árbol de decisión de la métrica

- Tipo: Árbol ramificado (5 preguntas como nodos de decisión hacia 9 familias de métricas en las hojas) · impacto 5 · esfuerzo M · requiere datos nuevos
- Qué muestra: Que la métrica sigue al daño y el daño al caso de uso: el lector ve todas las ramas antes de responder y, en el resultado, su camino iluminado hasta las familias recomendadas.
- Datos: treeQuestions[] y metricFamilies[] de src/data/tool-fairness-chooser.ts; la tabla de decisión vive hoy en public/toolkit/fairness-metric-chooser.js y habría que exportarla a los datos (p. ej. `leadsTo` por opción) para dibujarla en build
- Ubicación: Hero de la guía 'How the tree reads chapter 16', sustituyendo visualmente 'The tree, by hand' (que queda como texto alternativo); camino resaltado en el resultado
- Interacción: Estático en build (vertical a 390 px); camino marcado en el cliente
- Reutiliza: Mismo generador de flujo vertical que el árbol del triaje

#### Qué iguala cada métrica: la matriz de confusión

- Tipo: Pequeños múltiplos: 9 glifos de matriz de confusión 2x2 con las celdas o tasas que cada familia iguala · impacto 5 · esfuerzo S · requiere datos nuevos
- Qué muestra: La diferencia real entre paridad demográfica (tasa de selección), igualdad de oportunidades (TPR), odds igualadas (TPR y FPR), paridad de FPR, paridad predictiva (PPV) y calibración, sin fórmulas.
- Datos: metricFamilies[] (holds) de src/data/tool-fairness-chooser.ts; añadir un campo `equalises: ('selection'|'tpr'|'fpr'|'ppv'|'calibration'|'worst-group'|'flip'|'floor')[]` por familia
- Ubicación: Sección 'The metric families', encima de la tabla; y en cada tarjeta primaria del resultado
- Interacción: Estático SVG
- Reutiliza: Nuevo componente MetricGlyph.astro
- **CORREGIDA**: Añadir equalises a MetricFamily (hoy solo existe el texto 'holds') y registrar la figura en el capítulo 16 'Group fairness metrics' con pages ['/toolkit/fairness-metric-chooser']; sustituye la matriz duplicada del capítulo.

#### Casos de uso frente a métricas

- Tipo: Heatmap (6 casos de uso x 9 familias; celda primaria, secundaria o vacía) · impacto 4 · esfuerzo S · requiere datos nuevos
- Qué muestra: Qué métricas usa el capítulo para CV, crédito, prestaciones, clínico, calidad de servicio y generativo; el lector encuentra un caso parecido al suyo.
- Datos: useCaseRows[] (useCase, harm, primary, secondary, legal) de src/data/tool-fairness-chooser.ts; añadir `primaryIds` y `secondaryIds` con ids de metricFamilies
- Ubicación: Guía, tras la tabla de familias
- Interacción: Estático como <table>; clic en una fila rellena el formulario con ese caso
- Reutiliza: Estilo de celda de ObligationMatrix

#### El triángulo de la imposibilidad

- Tipo: Diagrama triangular (calibración, tasas de error iguales, paridad demográfica en los vértices) · impacto 3 · esfuerzo S
- Qué muestra: Que con tasas base distintas no se pueden cumplir a la vez: elegir una métrica es elegir qué equidad se sacrifica, como dice la nota 'The metrics conflict when base rates differ'.
- Datos: fairnessNotes.impossibility y metricFamilies[].watch de src/data/tool-fairness-chooser.ts (anchor 'the-impossibility-results')
- Ubicación: En 'What the chapter says to watch' del resultado y en la guía
- Interacción: Estático
- Reutiliza: Nuevo SVG pequeño en src/figures

### `/for`

- Fichero: `site/src/pages/for/index.astro`
- Propósito: Índice de las rutas por audiencia (6 hubs más AIGP y certificaciones), con las preguntas de cada audiencia y otras entradas.
- Pobreza visual: 4/5
- Visuales actuales: Rejilla de ResourceCard con índice; Tabla de preguntas por ruta; CtaBand

#### Qué lee cada audiencia

- Tipo: Heatmap (6 audiencias x tipos de paso: capítulo, patrón, herramienta, plantilla, dataset, figura, caso, referencia) · impacto 4 · esfuerzo S
- Qué muestra: El perfil de cada ruta: ingenieros cargados de patrones y herramientas, legal de capítulos de derecho, consejos de lectura breve. Ayuda a elegir ruta por el tipo de trabajo que se hace.
- Datos: src/data/audiences.ts audiences[].route[].steps[].kind (119 pasos)
- Ubicación: Hero: entre PageHero y 'Pick your route'
- Interacción: Estático en build; filas enlazadas a /for/<slug>; <table> como base
- Reutiliza: Estilo de celda de ObligationMatrix

#### Los capítulos troncales

- Tipo: Matriz de puntos (audiencias x 20+ capítulos del BoK en orden) con barra marginal de cuántas rutas pasan por cada capítulo · impacto 4 · esfuerzo S
- Qué muestra: Qué capítulos comparten todas las rutas (the-stack, eu-ai-act, governance-program) y cuáles son específicos; el núcleo común del campo sale solo.
- Datos: Pasos kind 'chapter' (slug) de audiences[].route y chaptersOrdered de src/data/chapters.ts
- Ubicación: Tras la tabla de preguntas
- Interacción: Estático; columnas enlazadas a /bok/<slug>
- Reutiliza: Estilo de BookParts para las cabeceras de parte

#### Obligaciones compartidas entre audiencias

- Tipo: Diagrama de cuerdas o UpSet (audiencias unidas por las obligaciones del registro que comparten) · impacto 4 · esfuerzo M
- Qué muestra: Que legal, CISO y sector público se cruzan en las mismas filas (FRIA, registro, transparencia) y dónde deben coordinarse.
- Datos: audiences[].obligations (ids del registro) y obligations de src/data/frameworks.ts
- Ubicación: Sección 'Not sure which one?' o nueva sección tras 'questions'
- Interacción: Estático; alternativa en tabla de intersecciones
- Reutiliza: Nuevo; UpSet preferible a cuerdas por legibilidad a 390 px

### `/for/[slug]`

- Fichero: `site/src/components/AudienceHub.astro`
- Propósito: Plantilla de cada hub de audiencia (engineers, ciso-risk, legal-dpo, executives-board, public-sector, smes): preguntas, ruta por fases, acciones de la semana y obligaciones clave.
- Pobreza visual: 4/5
- Visuales actuales: PageHero; RegisterList por fase con swatch de capa en los patrones; Lista numerada 'Start this week'; Tabla de obligaciones

#### Tu ruta como línea de metro

- Tipo: Diagrama de metro: una línea por fase, estaciones por paso con forma según tipo (capítulo, patrón, herramienta, plantilla, dataset, figura, caso) y color de capa · impacto 5 · esfuerzo M
- Qué muestra: El recorrido completo de la audiencia de un vistazo, cuántas paradas tiene y dónde se pasa de leer a hacer; cada estación enlaza al paso.
- Datos: audiences[].route[] (title, steps[]) resuelto por src/lib/audiences.ts (kindLabel, swatch, href, index)
- Ubicación: Hero de la sección 'Your route through the site', encima de las listas por fase
- Interacción: Estático en build; horizontal en escritorio, vertical a 390 px; las RegisterList quedan como alternativa
- Reutiliza: Nuevo RouteLine.astro; espina CSS de PathMap como referencia

#### Huella de la audiencia en la pila

- Tipo: Pila de 5 barras (capas 01 a 05) con recuento de patrones de la ruta y obligaciones clave por capa · impacto 4 · esfuerzo S
- Qué muestra: En qué capas trabaja esta audiencia: el CISO en evals y runtime, legal en inventario y aseguramiento. Conecta el hub con el modelo de la pila.
- Datos: Pasos kind 'pattern' (layer de src/data/patterns.ts) y audiences[].obligations (layerN de src/data/frameworks.ts)
- Ubicación: Sección 'Who this is for', a la derecha del párrafo
- Interacción: Estático; cada barra enlaza a /stack#layer-0N
- Reutiliza: StackDiagram.astro modo static con intensidad por recuento

#### Qué se activa y cuándo para ti **[T2]**

- Tipo: Tira temporal de las obligaciones clave (appliesFrom) con marca de estado y 'hoy' · impacto 4 · esfuerzo S
- Qué muestra: El calendario propio de la audiencia en lugar de una columna de fechas: qué ya aplica, qué llega en 2026 y 2027.
- Datos: audiences[].obligations y appliesFrom/appliesStatus de src/data/frameworks.ts
- Ubicación: Sección 'The obligations that matter most', encima de la tabla
- Interacción: Estático en build con 'As of' impreso; tabla existente como alternativa
- Reutiliza: Estilos de AiActDeadlines.astro / figura eu-ai-act-timeline

#### Dónde empiezas en el camino de aprendizaje

- Tipo: Mini mapa de 4 etapas del learning path con los nodos de inicio de la audiencia resaltados · impacto 3 · esfuerzo M
- Qué muestra: El punto de entrada de la audiencia en /path y lo que viene después.
- Datos: audiences[].pathStartAt y stages/nodes de src/data/path.ts
- Ubicación: Antes de 'Other routes'
- Interacción: Estático; nodos enlazados a /path#<id>
- Reutiliza: Versión reducida de PathMap.astro sin toolbar ni JS

### `/for/aigp`

- Fichero: `site/src/pages/for/aigp.astro`
- Propósito: Mapa de cobertura del AIGP BoK v2.1 indicador a indicador (enseñado, parcialmente enseñado) con rutas de estudio.
- Pobreza visual: 2/5
- Visuales actuales: Heatmap de cobertura (src/lib/aigp-heatmap.ts) dentro de Figure; Barras de progreso nativas por dominio (ticks en localStorage); Tablas por dominio y competencia

#### Dónde pesa el examen **[T3]**

- Tipo: Treemap (dominios a competencias, área = punto medio del rango de preguntas; relleno = proporción de indicadores enseñados) · impacto 5 · esfuerzo M
- Qué muestra: Qué competencias concentran más preguntas y cuánto de cada una cubre el sitio; prioriza el estudio por peso real, algo que el heatmap de indicadores no muestra.
- Datos: src/data/aigp.ts aigpDomains[].competencies[].questions (min, max), rangeMidpoint(), indicators[].status
- Ubicación: Tras 'How to read the map' y antes de 'The heatmap'
- Interacción: Estático en build; cada tesela enlaza a #competency-x-y; tabla dominio, competencia, rango, % enseñado
- Reutiliza: Mismo patrón generador que src/lib/aigp-heatmap.ts (nuevo src/lib/aigp-treemap.ts)

#### De los dominios AIGP a los capítulos

- Tipo: Sankey (4 dominios a capítulos del BoK, ancho = número de indicadores enlazados) · impacto 4 · esfuerzo M
- Qué muestra: Qué capítulos cargan cada dominio y cuáles son multiuso; es la respuesta visual a 'qué leo para el dominio III'.
- Datos: indicators[].links (rutas /bok/<slug>#...) y aigpDomains[].chapters de src/data/aigp.ts; títulos en src/data/chapters.ts
- Ubicación: Tras 'The heatmap', antes de 'Study paths'
- Interacción: Estático; hover resalta un dominio; tabla alternativa
- Reutiliza: AlluvialFlow.astro (nuevo, compartido)

#### Tu avance en anillos

- Tipo: Cuatro anillos concéntricos (uno por dominio) que se completan con los ticks de lectura · impacto 3 · esfuerzo S
- Qué muestra: El progreso de estudio en un solo gesto visual encima de las rutas, sustituyendo las cuatro barras nativas dispersas.
- Datos: Ticks en localStorage que ya gestiona el script de la página; número de pasos de studyPath(domain)
- Ubicación: Cabecera de 'Study paths, one per domain' (solo con JS)
- Interacción: Cliente; texto 'N de M secciones' en aria-live existente; sin animación con reduced-motion
- Reutiliza: Extiende el script de progreso existente de /for/aigp

### `/for/certifications`

- Fichero: `site/src/pages/for/certifications.astro`
- Propósito: Panorama neutral de las certificaciones personales ligadas al gobierno de IA (AIGP, ISO/IEC 42001 LI y LA, AAISM, AAIA) y su relación con el BoK.
- Pobreza visual: 5/5
- Visuales actuales: Tabla 'At a glance'; Ningún gráfico

#### Dos tipos de certificado **[T1]**

- Tipo: Diagrama de dos carriles paralelos: persona (propietario del esquema, evaluación, certificado de persona, ISO/IEC 17024) frente a organización (organismo de certificación bajo ISO/IEC 42006 sobre 17021-1, auditoría del AIMS contra 42001, certificado del sistema de gestión) · impacto 5 · esfuerzo S
- Qué muestra: La confusión que la página aclara, en una imagen: quién certifica qué, bajo qué norma, y la nota de que un certificado 42001 no da presunción de conformidad con el AI Act.
- Datos: Texto de la sección 'Two kinds of certificate' y fuentes [3] a [6] de la página
- Ubicación: Hero de la sección 'Two kinds of certificate'
- Interacción: Estático SVG; alternativa textual = los dos párrafos
- Reutiliza: Glifos de VISUAL-GUIDE (persona, edificio de auditor); estilo de la figura instrument-lineage

#### Esquemas frente a la pila y el BoK

- Tipo: Matriz de puntos (5 esquemas x 5 capas de la pila más partes del BoK) · impacto 4 · esfuerzo S · requiere datos nuevos
- Qué muestra: La columna 'Closest part of this body of knowledge' convertida en mapa: AIGP recorre las cuatro partes, AAISM se concentra en capas 03 y 04, AAIA en la 05, los 42001 en el programa de gobierno. Sin ranking, solo cercanía.
- Datos: Tabla 'At a glance' de la página; añadir un pequeño array local `schemeCoverage` (esquema, capas[], capítulos[]) con lo que ya dice la tabla
- Ubicación: Justo después de la tabla 'At a glance'
- Interacción: Estático; celdas enlazadas a /bok/<slug>
- Reutiliza: Swatches --l1..--l5 de StackDiagram

#### El AIGP en cuatro dominios **RECHAZADA**

- Tipo: Barras de rango (mín. a máx. de preguntas por dominio) con porcentaje de indicadores enseñados · impacto 3 · esfuerzo S
- Qué muestra: El peso de cada dominio del examen, con enlace al mapa de cobertura, dentro de la sección AIGP que hoy es solo texto.
- Datos: aigpDomains[].questions y rangeText() de src/data/aigp.ts (ya importados en la página), aigpIndicators()
- Ubicación: Sección 'AIGP (IAPP)'
- Interacción: Estático
- Reutiliza: Mismo generador que el treemap de /for/aigp en versión barra
- Motivo del rechazo: Duplica el treemap de /for/aigp (aigpDomains.questions); enlazar con una miniatura.

### `/about`

- Fichero: `site/src/pages/about/index.astro`
- Propósito: Qué es el sitio, quién lo mantiene, preguntas abiertas, trabajo abierto, cómo contribuir, citar y licencia.
- Pobreza visual: 4/5
- Visuales actuales: Lista OpenWork con punto de estado; Lista dl de datos del autor; ningún gráfico

#### El proyecto en cifras

- Tipo: Banda de StatTiles (capítulos, patrones, obligaciones, controles, herramientas, figuras, términos del glosario, fuentes verificadas y % primarias) · impacto 4 · esfuerzo S
- Qué muestra: El tamaño y el rigor del trabajo en una línea, cada cifra calculada en build y con su línea de procedencia.
- Datos: chaptersOrdered (src/data/chapters.ts), patterns, obligations (frameworks.ts), controls (src/data/controls/index.ts), tools (toolkit.ts), figures (figures.ts), glosario (src/content), recuento de etiquetas en sources/SOURCES.md (1828 primary, 146 secondary, 10 reported a fecha de lectura)
- Ubicación: Hero: tras el párrafo inicial, antes de 'Who maintains it'
- Interacción: Estático; cada tile enlaza a su índice
- Reutiliza: StatTile.astro (source obligatorio)

#### Mapa del ecosistema

- Tipo: Diagrama de constelación: Tesis, BoK, patrones y controles, registros, toolkit, datasets/API/MCP, figuras · impacto 4 · esfuerzo M
- Qué muestra: Cómo encajan las piezas del proyecto y por dónde entrar según lo que se busca; de la idea (Tesis) a la evidencia reutilizable (datos, herramientas).
- Datos: Rutas del sitio (nav.ts) y recuentos anteriores; contenido fijo pequeño
- Ubicación: Tras 'Who maintains it'
- Interacción: Estático; nodos enlazados
- Reutiliza: FlowDiagram.astro o SVG en src/figures

#### Trabajo abierto como tablero

- Tipo: Tablero kanban de columnas por estado (planned, in-progress, draft, in-review, reviewed) con versión y fecha · impacto 3 · esfuerzo S
- Qué muestra: El estado real del trabajo: casi todo en borrador y la columna 'reviewed' vacía, que es la invitación a revisar. Más directo que la lista actual.
- Datos: src/data/work.ts work[] (status, version, updated, href) y WORK_STATUS_LABEL
- Ubicación: Sección 'Open work' (variante visual de OpenWork)
- Interacción: Estático; a 390 px las columnas se apilan; la lista actual queda como alternativa
- Reutiliza: Prop `layout='board'` en OpenWork.astro (reutilizable en home y /contribute)

#### Preguntas abiertas y dónde se trabajan **RECHAZADA**

- Tipo: Grafo bipartito (5 preguntas a las páginas de controles, frontier e investigación) · impacto 2 · esfuerzo S
- Qué muestra: Qué pregunta de investigación empuja cada artefacto del sitio.
- Datos: src/data/open-questions.ts openQuestions[] (question, href)
- Ubicación: Sección 'Current open questions'
- Interacción: Estático; enlaces
- Reutiliza: Generador bipartito compartido (el de plantillas de policy card)
- Motivo del rechazo: open-questions.ts da un href por pregunta: bipartito de aristas uno a uno, decorativo.

### `/about/methodology`

- Fichero: `site/src/pages/about/methodology.astro`
- Propósito: Cómo se eligen y etiquetan las fuentes, cómo se mantienen las fechas, cadencia de revisión, qué comprueba el build y versionado.
- Pobreza visual: 5/5
- Visuales actuales: Ninguno: listas y definiciones

#### La mezcla de verificación

- Tipo: Gofre de 100 cuadros (primary, secondary, reported) más barras apiladas al 100% por capítulo · impacto 5 · esfuerzo M
- Qué muestra: Que alrededor del 92% de las citas se verificaron en la fuente primaria, cuántas son secundarias o 'reported', y qué capítulos dependen más de fuentes secundarias. Pasa de promesa a evidencia.
- Datos: sources/SOURCES.md: columna Verified por sección '## <capítulo>' (lectura en build con un parser de tablas Markdown); a fecha de lectura 1828 primary, 146 secondary, 10 reported
- Ubicación: Hero de 'How sources are tagged', tras la lista de etiquetas
- Interacción: Estático en build; tabla capítulo x etiqueta como alternativa; 'As of' impreso
- Reutiliza: Nuevo SVG data-viz (VISUAL-GUIDE §4, tabla data obligatoria); helper nuevo src/lib/sources-stats.ts reutilizable por /about

#### De la afirmación a la publicación

- Tipo: Diagrama de tubería: afirmación, fuente (primaria primero), etiqueta, fila en SOURCES.md, sello 'as of', puertas del build (tipos, content lint, enlaces, esquemas), publicación; con bucles de vigilancia · impacto 4 · esfuerzo S
- Qué muestra: Todo el método en una imagen: qué filtro atraviesa una cifra antes de salir y qué la vigila después (enlaces semanales, monitor regulatorio diario).
- Datos: Texto de las secciones 'How sources are chosen', 'What the build checks' y 'Review cadence'
- Ubicación: Tras la introducción, antes de 'How sources are chosen'
- Interacción: Estático
- Reutiliza: FlowDiagram.astro con glifo de puerta y evidencia final

#### Cadencia de revisión

- Tipo: Anillos concéntricos de frecuencia (cada cambio: CI; diario: monitor; semanal: enlaces; por versión: repasos de datos) más línea temporal de los repasos fechados · impacto 3 · esfuerzo S
- Qué muestra: Con qué ritmo se revisa cada cosa y cuándo se hicieron los repasos (2026-09-10, 2026-09-19, 2026-09-24, 2026-09-25).
- Datos: Sección 'Review cadence' y cabecera de sources/SOURCES.md (fechas de repaso)
- Ubicación: Sección 'Review cadence'
- Interacción: Estático
- Reutiliza: Nuevo SVG en src/figures

#### Frescura de los datos

- Tipo: Beeswarm de fechas 'as of' y 'review by' de figuras y datasets, con la fecha de hoy · impacto 3 · esfuerzo M
- Qué muestra: Qué piezas están al día y cuáles se acercan a su fecha de revisión; hace tangible la regla de los sellos 'as of'.
- Datos: asOf y reviewBy de src/data/figures.ts; constantes *AsOf de los datasets (buildersAsOf, incidentClockAsOf, aigpAsOf, AI_ACT_TIMELINE_AS_OF, vendorDdVersion)
- Ubicación: Sección 'How dates are kept current'
- Interacción: Estático en build; tabla alternativa
- Reutiliza: Nuevo SVG data-viz

#### Quién publica lo que citamos

- Tipo: Barras horizontales de los 15 editores más citados y histograma de fechas de las fuentes · impacto 3 · esfuerzo S
- Qué muestra: La dependencia de fuentes oficiales (Comisión Europea, EUR-Lex, ISO, NIST...) frente a prensa o proveedores, y lo recientes que son.
- Datos: Columnas Publisher y Date de sources/SOURCES.md
- Ubicación: Sección 'How sources are chosen', tras el punto 'Primary first'
- Interacción: Estático
- Reutiliza: src/lib/sources-stats.ts (nuevo, mismo que el gofre)

### `/about/changelog`

- Fichero: `site/src/pages/about/changelog.astro`
- Propósito: Registro de cambios de la Tesis y el BoK por versión (renderiza bok/CHANGELOG.md).
- Pobreza visual: 5/5
- Visuales actuales: Ninguno: Markdown renderizado (915 líneas)

#### Versiones en el tiempo **[T4]**

- Tipo: Línea temporal de versiones (0.1 a 0.5.0 y Unreleased) con barras apiladas de entradas por categoría (Content, Reference layer, Toolkit, Figures, Data and API, Infrastructure, Fixes, Added, Changed) · impacto 5 · esfuerzo M
- Qué muestra: El ritmo del proyecto y de qué estuvo hecha cada versión: la 0.5.0 concentra unas 90 entradas repartidas entre contenido, capa de referencia y toolkit; las patch son de fact-check.
- Datos: bok/CHANGELOG.md (encabezados '## [x.y.z] - fecha' y '### categoría', recuento de viñetas) parseado en build
- Ubicación: Hero, antes del contenido Markdown
- Interacción: Estático; cada versión enlaza a su ancla; tabla versión x categoría como alternativa
- Reutiliza: Nuevo componente ReleaseTimeline.astro (Doc permite slot antes de Content)

#### Cómo ha crecido el corpus

- Tipo: Pequeños múltiplos de escalones (capítulos, patrones, obligaciones, controles, herramientas, figuras por versión) · impacto 4 · esfuerzo M · requiere datos nuevos
- Qué muestra: La curva de crecimiento del conocimiento publicado, versión a versión.
- Datos: Nuevo dataset pequeño src/data/release-metrics.ts (version, date, chapters, patterns, obligations, controls, tools, figures) rellenado con las cifras que ya declara el CHANGELOG, y la versión actual calculada de los datos vivos
- Ubicación: Tras la línea temporal
- Interacción: Estático
- Reutiliza: StatTile para el valor actual de cada serie

#### El pulso del fact-check **RECHAZADA**

- Tipo: Lollipop de correcciones de hechos por versión · impacto 2 · esfuerzo S
- Qué muestra: Que las versiones patch existen para corregir, y cuántas correcciones hubo en cada repaso; refuerza la metodología.
- Datos: Secciones 'Fixed (fact-check...)' y 'Fixes' de bok/CHANGELOG.md
- Ubicación: Junto a la línea temporal, o en /about/methodology 'Review cadence'
- Interacción: Estático
- Reutiliza: Parser de ReleaseTimeline
- Motivo del rechazo: Impacto 2; se integra como una categoría más de las barras apiladas de ReleaseTimeline.

### `/about/contributors`

- Fichero: `site/src/pages/about/contributors.astro`
- Propósito: Autoría, roles y crédito (autor, revisor, contribuidor), firmantes de la Tesis y licencia (renderiza bok/CONTRIBUTORS.md).
- Pobreza visual: 5/5
- Visuales actuales: Ninguno: Markdown renderizado

#### Cómo se gana el crédito

- Tipo: Diagrama de flujo: issue o PR aceptado, revisión frente a fuentes y STYLEGUIDE, línea en la lista con versión; carriles separados para revisor, contribuidor y firmante · impacto 4 · esfuerzo S
- Qué muestra: La diferencia entre revisar, contribuir y firmar, y qué deja cada uno como evidencia; baja la barrera para participar.
- Datos: Sección 'Roles and credit' de bok/CONTRIBUTORS.md
- Ubicación: Hero, antes de 'Roles and credit' (slot de Doc antes de Content)
- Interacción: Estático
- Reutiliza: FlowDiagram.astro

#### Muro de firmantes y contadores **RECHAZADA**

- Tipo: StatTiles (revisores, contribuidores, firmantes) más muro de firmas que crece, generado de la lista · impacto 3 · esfuerzo S
- Qué muestra: El estado honesto de la comunidad (hoy 0 revisores, 0 contribuidores, 1 firmante) con llamada a firmar; el muro se llena solo al fusionar PRs.
- Datos: Listas '### Reviewers', '## Contributors' y '### Signatories' de bok/CONTRIBUTORS.md parseadas en build (o un src/data/signatories.ts)
- Ubicación: Sección 'Signatories'
- Interacción: Estático
- Reutiliza: StatTile.astro
- Motivo del rechazo: Hoy 0 revisores, 0 contribuidores y 1 firmante: un muro de una firma es decorativo. Reconsiderar cuando haya datos.

### `/`

- Fichero: `site/src/pages/index.astro`
- Propósito: Portada: define la disciplina y reparte al lector hacia la pila, los controles, la Tesis, el BoK y los recursos.
- Pobreza visual: 1/5
- Visuales actuales: Hero a pantalla completa con el cuadro de Monet (velos wash/halo) y HeroStrip de cifras contadas desde los datos; GovernanceLoop animado (7 pasos, 4 carriles, haz que recorre las aristas); DefinitionCards de las tres preguntas con swatch de capa; StackDiagram estático + interactivo en scroll-story; SurfaceCards (capas 03, 04, 05); Bento de ValuePair (8 valores); RegisterList de 7 flujos con tick de capa + StatTile IAPP; VerdictStamp BLOCK/PASS + VerdictTicker a sangre; BookParts; ResourceTiles (12 teselas); WhatAppliesNow (tarjetas de texto con las próximas fechas); NewsletterForm + OpenWork

#### Muro de controles abiertos: con dientes o señal

- Tipo: Dot matrix / waffle agrupado por capa · impacto 5 · esfuerzo M
- Qué muestra: Cada control abierto es un punto, en cinco columnas por capa; relleno si failureResponse.effect es 'deny' (bloquea) y solo contorno si es 'alert' (señal), según el principio 'dale dientes a cada control o llámalo señal'. Convierte la frase del verdict beat en evidencia contable y deja ver cuántos controles todavía solo alertan (conviene revisar la frase 'every control can fail a build' frente a los que son alert).
- Datos: site/src/data/controls/index.ts: controls[] (id, title, profile, layer, failureResponse.effect, depth); enlace a /controls/<profile>#<id>
- Ubicación: Section tone=dark 'verdict-beat', entre la línea vb-line y el VerdictTicker
- Interacción: hover/focus con id y título, click-through al control; entrada escalonada solo con transform y nada bajo prefers-reduced-motion
- Reutiliza: Nuevo componente compartido ControlWall.astro (SVG en build) con la gramática de VerdictStamp; reutilizable en /contribute y /controls
- **CORREGIDA**: Mantener, pero con tres estados (deny/require_approval relleno, alert contorno, por especificar trama) por la nota anterior; componente con raíz .chart y CSS propio porque / está vetada para figures.css (tests/perf.spec.ts). Es la misma primitiva DotMatrix que ControlMosaic de /controls, no un componente aparte.

#### De la norma a la evidencia **RECHAZADA**

- Tipo: Sankey / alluvial de tres columnas · impacto 5 · esfuerzo L
- Qué muestra: Izquierda: familias de marco (EU AI Act, GDPR, ISO/IEC 42001, Korea AI Basic Act, NIST AI RMF, resto agrupado) con el número de obligaciones del registro; centro: las cinco capas (layerN); derecha: los patrones que las implementan. Muestra qué capas cargan el peso legal y qué patrones cubren más obligaciones. Las filas con varias capas se reparten a partes iguales y el texto alternativo lo explica; la tercera columna solo cuenta filas con patterns.
- Datos: site/src/data/frameworks.ts: obligations[] (frameworkId, layerN, patterns); frameworks[] (short); site/src/data/patterns.ts (slug, layer)
- Ubicación: Tras la sección 'A build order, from policy to proof.' y antes de 'Where AI Governance Engineering operates.'
- Interacción: hover resalta un flujo; nodos enlazan a /resources/frameworks, /bok/the-stack#layer-0N y /patterns/<slug>; tabla HTML de respaldo
- Reutiliza: Nueva librería lib/sankey-svg.ts (SVG en build, tokens --l1..--l5), compartida con /agents y, si interesa, con /resources/frontier-safety-crosswalk
- Motivo del rechazo: Duplica la ObligationMatrix de /resources/frameworks (marco x capa) y el LayerSankey propuesto para /controls; esfuerzo L en una página vetada por perf.spec (sin figures.css) que ya tiene 12 visuales. La lectura obligación a capa a patrón vive mejor en /stack (LayerMatrix) o /obligations.

#### Calendario de activación de obligaciones **RECHAZADA**

- Tipo: Beeswarm sobre eje temporal (2019 a 2029) · impacto 4 · esfuerzo M
- Qué muestra: Cada obligación con fecha (appliesFrom, unas 129 filas) es un punto en el tiempo, coloreado por appliesStatus (en vigor, periodo de gracia, aplica más tarde, aplazada) con forma distinta por estado; marca 'hoy' en la fecha de build y etiquetas en las tres próximas fechas que WhatAppliesNow ya nombra. El lector ve la ola regulatoria que viene y su densidad.
- Datos: site/src/data/frameworks.ts: obligations[] (id, clause, appliesFrom, appliesStatus, milestones); site/src/lib/applies-now.ts (nextDates, isoToday)
- Ubicación: Dentro de WhatAppliesNow, encima de las tarjetas de fechas
- Interacción: hover con id y cláusula, click a /obligations/<id>; sello 'As of' dentro del SVG
- Reutiliza: Extender WhatAppliesNow.astro con un nuevo ObligationTimeline.astro reutilizable en /ai-governance
- Motivo del rechazo: Duplica el héroe ObligationTimeline de /obligations; WhatAppliesNow ya cubre 'lo próximo' en portada. Enlazar a /obligations en vez de repetir el gráfico.

### `/[lang]`

- Fichero: `site/src/pages/[lang]/index.astro`
- Propósito: Aterrizaje breve por idioma con traducción automática: enlaza BoK, Tesis y patrones traducidos.
- Pobreza visual: 5/5
- Visuales actuales: Ninguno: listas de enlaces con nota mono

#### Cobertura de la traducción **RECHAZADA**

- Tipo: Barras de progreso (meter) por tipo de contenido · impacto 3 · esfuerzo S
- Qué muestra: Capítulos traducidos frente al total, patrones traducidos frente al total y Tesis disponible sí/no para ese idioma, para que el lector sepa de un vistazo cuánto puede leer en su lengua antes de saltar al inglés.
- Datos: site/src/lib/i18n-pages.ts allTranslations() (chapters, patterns por lang), site/src/data/chapters.ts chaptersOrdered, site/src/data/patterns.ts
- Ubicación: Encima de la lista i18n-routes, bajo el resumen
- Interacción: estática
- Reutiliza: Medidor n de N del estilo MaturityLadder, en CSS puro
- Motivo del rechazo: Ruta no publicada: PUBLISHED_TRANSLATED_LOCALES = [] en src/i18n/locales.ts:29, así que [lang] no genera páginas. Nada que ver en producción.

### `/role`

- Fichero: `site/src/pages/role.astro`
- Propósito: Landing de 'AI governance engineer': qué hace, habilidades, contraste con el analista, vías de entrada, salario y madurez.
- Pobreza visual: 2/5
- Visuales actuales: WorkflowGrid en bento (7 flujos con swatch de capa); Diagram archify role-workflows; SkillsTable con chips core/supporting; ContrastTable analista frente a ingeniero; Tarjetas de vías de entrada; NextStep; Errores del empleador con VerdictStamp BLOCK; StatTile x3 (medianas IAPP); MaturityLadder animado

#### Rueda de habilidades

- Tipo: Sunburst de dos anillos · impacto 5 · esfuerzo M
- Qué muestra: Anillo interior: los siete flujos más el transversal, coloreados por capa (regulatory translation en tinta neutra); anillo exterior: cada habilidad, sólida si es core y rayada si es supporting (no depende solo del color). Se ve que evals y runtime concentran más habilidades de carga y que Python y la lectura de normas atraviesan todo.
- Datos: site/src/data/role.ts: skills[] (area, core, supporting) y workflows[] (name, layerN)
- Ubicación: Cabeza de 'What skills does an AI governance engineer need?', antes de SkillsTable (que queda como alternativa textual)
- Interacción: hover en un segmento resalta la fila de chips de SkillsTable; estática sin JS
- Reutiliza: Nueva lib/sunburst-svg.ts en build; SkillsTable como fallback

#### Tres puertas de entrada al rol **RECHAZADA**

- Tipo: Alluvial / metro de tres líneas · impacto 4 · esfuerzo M
- Qué muestra: Origen (Legal o privacidad, Seguridad o GRC, MLOps) → nodos de arranque del camino → capa de cada nodo → flujo de esa capa. Muestra que cada perfil entra por una capa distinta (Legal por 01/02, Seguridad por 03/02, MLOps por 03/04) y qué le falta.
- Datos: site/src/data/role.ts waysIn; site/src/data/path.ts entries[].startAt y nodes[] (id, title, layerN, stage); role.workflows
- Ubicación: Sección 'How do you become an AI governance engineer?', encima de las tarjetas de vías
- Interacción: nodos enlazan a /path#<id>; hover resalta una ruta
- Reutiliza: Nuevo AlluvialSvg compartido con /path
- Motivo del rechazo: Duplica la propuesta de /path; path.ts entries tiene solo 3 entradas con 2 startAt cada una (líneas 1409-1419): 6 cintas no justifican un alluvial. Se sirve con FlowDiagram en /path.

#### Cadencia: analista frente a ingeniero

- Tipo: Tira de ritmo esquemática (barcode) + columnas espejo · impacto 4 · esfuerzo S
- Qué muestra: Un año en el eje: la fila del analista con marcas trimestrales y anual; la del ingeniero como un código de barras continuo (cada commit, despliegue y llamada). Rotulado 'esquemático, sin datos'. Debajo, las otras cinco dimensiones en espejo con un eje central.
- Datos: site/src/data/role.ts analystVsEngineer[] (dimension 'Cadence' y el resto)
- Ubicación: 'One line separates the two.', encima de ContrastTable
- Interacción: estática
- Reutiliza: ContrastTable como texto; nueva tira CSS

#### Salarios medianos y la profesión en cifras

- Tipo: Barras horizontales desde cero + figura existente · impacto 3 · esfuerzo S · requiere datos nuevos
- Qué muestra: Las tres medianas IAPP (USD 221k técnico en tecnología, 169.7k privacidad más IA, 151.8k general) como barras comparables con línea de fuente; debajo, la figura profession-in-numbers del capítulo 02 (77%, 1.5%, habilidades pedidas). La señal de demanda no primaria sigue fuera del gráfico.
- Datos: site/src/data/role.ts market[] (value, label, source, primary); añadir un campo numérico amount; site/src/data/figures.ts id 'profession-in-numbers'
- Ubicación: Sección 'How much does an AI governance engineer earn?', junto a o en lugar de los StatTile
- Interacción: estática
- Reutiliza: Figure + src/figures/profession-in-numbers.svg; reglas data-viz §4
- **CORREGIDA**: Una sola figura data-viz registrada en figures.ts con placement en el capítulo 06 'The market' y pages ['/role'] (sustituye a la propuesta gemela de /bok/the-role). Datos: medianas IAPP que ya cita bok/06-the-role.md; no hace falta campo amount en role.ts, la tabla data de figures.ts es la fuente.

### `/thesis`

- Fichero: `site/src/pages/thesis.astro`
- Propósito: La Tesis: definición, cinco problemas del gobierno heredado, ocho valores, seis principios, qué se construye y vecinos.
- Pobreza visual: 4/5
- Visuales actuales: Diagram archify aige-in-the-org; SignNote; El resto es Markdown (THESIS.md, 233 líneas) sin figuras

#### Dónde muerden los controles **RECHAZADA**

- Tipo: Beeswarm por punto de aplicación · impacto 5 · esfuerzo M
- Qué muestra: Eje de ciclo de vida pre_merge → deploy → runtime → periodic; cada control abierto es un punto coloreado por capa, sólido si deny y anillo si alert. Ilustra con los controles del propio sitio los principios 1 (lo antes que pueda bloquear) y 2 (dientes o señal): hoy la masa está en deploy y runtime, poco en pre_merge.
- Datos: site/src/data/controls/index.ts controls[] (id, title, enforcementPoints, layer, failureResponse.effect); tipo EnforcementPoint en site/src/data/policy-card.ts
- Ubicación: Cabeza de '## Principles' (insertada al pie del H2 como hace ai-governance.astro, o nueva placement 'thesis' en figures.ts)
- Interacción: hover con id y título, click-through al control
- Reutiliza: Nueva lib/beeswarm-svg.ts; helper de datos compartido con ControlWall
- Motivo del rechazo: Mismo dato y misma lectura que EnforcementLanes de /controls (enforcementPoints x effect). Además los controles derivados de agent-runtime tienen enforcementPoints por defecto ['runtime'] y effect 'alert' con texto 'To be specified.' (agent-runtime.ts:707-710), así que la tesis 'la masa está en runtime' sería en parte un artefacto de los valores por defecto. En la Tesis basta enlazar a /controls.

#### Genealogía de la disciplina

- Tipo: Árbol genealógico / río de linaje · impacto 4 · esfuerzo S · requiere datos nuevos
- Qué muestra: SRE, DevSecOps, policy-as-code y seguridad de la cadena de suministro confluyen en GRC engineering (desde 2024, única fecha que da la Tesis) y de ahí en AI governance engineering; AI security engineering como hermana. Deja claro de dónde viene la idea antes de los problemas.
- Datos: THESIS.md (párrafo 'The idea does not appear from nowhere' y 'A discipline, distinct from its neighbours'); nuevo array lineage (7 u 8 nodos) en site/src/data/values.ts
- Ubicación: Tras los párrafos de apertura, antes de 'Fundamental problems with legacy AI governance'
- Interacción: estática
- Reutiliza: figures.ts kind 'infographic' con exportaciones SVG/PNG

#### Los números del problema

- Tipo: Isotipo / barras de proporción anotadas · impacto 4 · esfuerzo S · requiere datos nuevos
- Qué muestra: Tres cifras que la Tesis ya cita: solo el 5% de la función está en seguridad [3], más del 40% de proyectos agénticos cancelados antes de fin de 2027 [4] y cerca de 1 de cada 8 brechas de IA con sistemas agénticos [8]; cada una con su línea de fuente y 'As of'.
- Datos: THESIS.md problemas 1, 2 y 5 con referencias [3][4][8]; nueva entrada data-viz en site/src/data/figures.ts con data.rows
- Ubicación: Cabeza de 'Fundamental problems with legacy AI governance'
- Interacción: estática
- Reutiliza: Pipeline figures-build.mjs (permalink /figures/<id>, tabla HTML obligatoria)

#### Nueve artefactos sobre cinco capas

- Tipo: Diagrama de bandas apiladas (heredadas frente a nuevas) · impacto 4 · esfuerzo S · requiere datos nuevos
- Qué muestra: Los nueve artefactos de 'What AI governance engineers build' colocados en su banda de capa; bandas 03 y 04 marcadas 'nuevo, lo fuerza la IA' y 01, 02 y 05 'heredado de GRC engineering', tal como concede la Tesis. Añadir también la figura existente values-principles en la cabeza de '## Values'.
- Datos: site/src/data/values.ts builds[] (añadir layer por artefacto) + site/src/data/stack.ts layers (inherited, colorVar); figures.ts 'values-principles'
- Ubicación: Pie de 'What AI governance engineers build'; values-principles en la cabeza de 'Values'
- Interacción: estática
- Reutiliza: barmark de stack.astro / StackDiagram mode=static; src/figures/values-principles.svg

### `/es/thesis`

- Fichero: `site/src/pages/es/thesis.astro`
- Propósito: Traducción manual al español de la Tesis.
- Pobreza visual: 4/5
- Visuales actuales: Diagram archify aige-in-the-org; Markdown THESIS.es.md sin figuras

#### Variantes ES de las figuras de la Tesis

- Tipo: Mismas figuras (beeswarm, genealogía, números, artefactos por capa) en español · impacto 4 · esfuerzo M · requiere datos nuevos
- Qué muestra: Los cuatro visuales de /thesis con rótulos, títulos y textos alternativos en español, para que la edición española no quede más pobre que la inglesa.
- Datos: Mismas fuentes que /thesis; ids -es en site/src/data/figures.ts siguiendo el patrón eu-ai-act-timeline-es / values-principles; THESIS.es.md
- Ubicación: Mismas secciones que en /thesis (H2 equivalentes de THESIS.es.md)
- Interacción: igual que en /thesis
- Reutiliza: figures.ts con variantes -es y la misma inserción por H2 que ai-governance.astro
- **CORREGIDA**: Solo tras publicar las versiones EN, y solo las de texto (genealogía, números); ids -es con lang="es" y sello 'A fecha de'.

### `/[lang]/thesis`

- Fichero: `site/src/pages/[lang]/thesis.astro`
- Propósito: Tesis traducida automáticamente (fr, de, pt) con aviso de traducción.
- Pobreza visual: 4/5
- Visuales actuales: Diagram aige-in-the-org; TranslationNotice

#### Figuras neutras al idioma **RECHAZADA**

- Tipo: Reutilizar el beeswarm de controles y las bandas por capa · impacto 3 · esfuerzo S
- Qué muestra: Los visuales cuyo contenido son ids, capas y números (beeswarm de puntos de aplicación, bandas de artefactos) se insertan igual que en inglés, con leyenda traducida vía translator(); los de texto largo quedan solo en EN/ES.
- Datos: Mismas que /thesis; site/src/i18n/ui.ts para las leyendas
- Ubicación: Mismos H2 (assertSameAnchors garantiza los mismos ids)
- Interacción: igual que en /thesis
- Reutiliza: Componentes de /thesis
- Motivo del rechazo: Ruta no publicada (idiomas automáticos apagados desde 2026-09-25). Retomar solo si se reactivan.

### `/stack`

- Fichero: `site/src/pages/stack.astro`
- Propósito: La pila de cinco capas como página editorial: cómo leerla, un panel por capa, heredado frente a nuevo, pila mínima y catálogo de herramientas.
- Pobreza visual: 2/5
- Visuales actuales: StackFlow interactivo (bandas + carriles de artefactos); StackDiagram estático en scroll-story + StackLayerPanel por capa; barmark heredado/nuevo; RegisterList de lectura y de pila mínima; ToolsTable

#### Qué llena cada capa **[T3]**

- Tipo: Small multiples (matriz capa × tipo de contenido) · impacto 5 · esfuerzo M
- Qué muestra: Cinco filas (capas) por seis columnas (obligaciones, patrones, controles, herramientas, nodos del camino, flujos), cada celda una barra proporcional con su número. Revela dónde se concentra el trabajo nuevo: los patrones pesan en 04 y 02, las herramientas en 03, y la capa 05 va escasa en nodos del camino.
- Datos: frameworks.ts obligations[].layerN; patterns.ts layer/secondaryLayer; controls/index.ts controls[].layer/secondaryLayers; stack.ts allTools() layers; path.ts nodes[].layerN; role.ts workflows[].layerN
- Ubicación: Tras 'Follow one artefact from policy to proof.' (StackFlow) o como columna derecha de 'Three layers established, two the AI forces.'
- Interacción: hover con recuento; celda enlaza a la vista filtrada (/controls#layer-N, /obligations, /patterns)
- Reutiliza: Nuevo LayerMatrix.astro (grid CSS o SVG en build) reutilizable en /path

#### El catálogo de herramientas como treemap **RECHAZADA**

- Tipo: Treemap anidado capa → categoría → herramienta · impacto 5 · esfuerzo M
- Qué muestra: Las 96 herramientas, cada una una tesela dentro de su categoría y capa, coloreada por modelo de acceso (open source 66, commercial 13, open standard 11, source-available 4, free service 2) con trama además del color. Se ve que el catálogo es mayoritariamente abierto y qué categorías están vacías de opciones abiertas.
- Datos: site/src/data/stack.ts toolCatalogue[] (category, layers, tools[].name/url/access/licence), toolAccessLabels, TOOLS_LAST_CHECKED
- Ubicación: Cabeza de 'Tool categories are the substance; brands are illustrative.', encima de ToolsTable
- Interacción: hover con nombre y licencia, click a la URL; chips para filtrar por acceso (script propio pequeño)
- Reutiliza: ToolsTable como alternativa; nueva lib/treemap-svg.ts (squarified en build)
- Motivo del rechazo: Duplica el isotipo capa x acceso de /resources/tools (misma fuente toolCatalogue, misma codificación por access). /stack ya tiene StackFlow, StackDiagram y ToolsTable; queda LayerMatrix como aporte nuevo.

#### La pila mínima como figura

- Tipo: Infografía existente de pasos numerados · impacto 3 · esfuerzo S
- Qué muestra: Los cinco pasos ordenados con su chip de capa y el artefacto que dejan, en lugar de solo una lista.
- Datos: site/src/data/figures.ts id 'minimum-viable-stack' (src/figures/minimum-viable-stack.svg), stack.ts minimumViableStack
- Ubicación: 'The minimum viable stack, for a team of one.', sobre la RegisterList
- Interacción: estática, enlace al permalink /figures/minimum-viable-stack
- Reutiliza: Figure + SVG existente

#### Tres preguntas, cinco capas

- Tipo: Infografía existente three-questions · impacto 3 · esfuerzo S
- Qué muestra: Qué capa responde a cada una de las tres preguntas, que la sección 'A build order' explica en texto.
- Datos: site/src/data/figures.ts id 'three-questions'
- Ubicación: Sección 'A build order, from policy to proof.' junto a la RegisterList
- Interacción: estática
- Reutiliza: Figure + src/figures/three-questions.svg

### `/map`

- Fichero: `site/src/pages/map.astro`
- Propósito: La disciplina entera como mapa mental navegable más un índice por clúster.
- Pobreza visual: 2/5
- Visuales actuales: Póster discipline-map (SVG generado, scroll lateral en móvil); Leyenda de ramas con swatch; Índice de clústeres en details

#### Vista radial del mapa para móvil

- Tipo: Árbol radial / sunburst · impacto 5 · esfuerzo L
- Qué muestra: El mismo árbol (centro, 8 ramas, hojas de segundo nivel dimensionadas por número de hijos) dispuesto en círculo, que cabe a 390 px sin scroll lateral y deja ver el peso relativo de cada rama.
- Datos: site/src/data/map.ts buildMap() (branches[].leaves[].children, color, href)
- Ubicación: Sección #the-map, como vista por defecto por debajo de 720 px o pestaña 'Radial'
- Interacción: tocar una rama la amplía (isla propia pequeña); sin JS se ve el radial completo
- Reutiliza: scripts/map-build.mjs genera un segundo SVG discipline-map-radial (kind poster, 48 KB)

#### Matriz rama × capítulo

- Tipo: Heatmap 8 × 24 · impacto 4 · esfuerzo M
- Qué muestra: Qué capítulos alimentan cada rama y con qué intensidad (nodos y secciones alcanzados). Destaca los capítulos nodo (01, 04, 05, 08) y las ramas estrechas.
- Datos: site/src/lib/map-index.ts buildClusterIndex() (clusters, chapters, headings) + map.branches[].chapters
- Ubicación: Tras la leyenda y antes de 'Content by cluster.'
- Interacción: celda enlaza al ancla del capítulo
- Reutiliza: Patrón de SVG de lib/aigp-heatmap.ts

#### El mapa en cifras

- Tipo: Barras horizontales por rama · impacto 3 · esfuerzo S
- Qué muestra: Número de nodos por rama con su color, como entrada rápida al índice.
- Datos: map.ts buildMap() branches[].leaves (recuento de descendientes)
- Ubicación: Cabeza de la sección #index
- Interacción: cada barra enlaza a #cluster-<branch>
- Reutiliza: Estilos de map-legend

### `/path`

- Fichero: `site/src/pages/path.astro`
- Propósito: Camino de aprendizaje en cuatro etapas con nodos marcables y progreso guardado en el navegador.
- Pobreza visual: 2/5
- Visuales actuales: Clave de muestras (core/alternativo/opcional, estados); PathMap (cuadrícula por etapa con aristas entre etapas) + PathDrawer; Lista por audiencia

#### Tu progreso por etapa

- Tipo: Anillos de progreso (4 etapas + total) · impacto 5 · esfuerzo M
- Qué muestra: Porcentaje hecho, en curso y omitido por etapa y en total, calculado del estado que path.js ya guarda; los omitidos salen del denominador. Sin JS muestra el total de nodos core, alternativos y opcionales por etapa.
- Datos: site/src/data/path.ts stages[], nodes[] (stage, kind); estado en localStorage que gestiona public/path.js
- Ubicación: Cabeza de 'Four stages, from foundations to proof.' encima de PathMap
- Interacción: se actualiza al marcar nodos, anuncio por aria-live polite; cambio instantáneo (sin animar dasharray)
- Reutiliza: Extender public/path.js y PathMap.astro

#### Etapa × capa

- Tipo: Heatmap 4 × 5 con glifos core/opcional · impacto 4 · esfuerzo S
- Qué muestra: Cómo el camino sube por la pila: las primeras etapas en 01/02 y las últimas en 04/05, y dónde hay capas con pocos nodos (la 05 tiene 3).
- Datos: site/src/data/path.ts nodes[] (stage, layerN, kind)
- Ubicación: Tras la sección de la clave
- Interacción: celda enlaza al primer nodo de esa combinación
- Reutiliza: LayerMatrix.astro de /stack

#### Rutas de entrada por perfil y audiencia

- Tipo: Alluvial perfil → nodo de arranque → etapa · impacto 4 · esfuerzo M
- Qué muestra: Las tres entradas (legal, seguridad, MLOps) y las audiencias con sus nodos de inicio, confluyendo en el camino. Responde 'por dónde empiezo yo'.
- Datos: path.ts entries[].startAt; audiences.ts audiences[].pathStartAt; path.ts nodes (stage, title)
- Ubicación: Cabeza de 'By audience.'
- Interacción: click abre el drawer del nodo o el hub de audiencia
- Reutiliza: AlluvialSvg compartido con /role

#### Qué lectura te espera

- Tipo: Isotipo por tipo de recurso · impacto 3 · esfuerzo S
- Qué muestra: Los 88 recursos como iconos por tipo (oficial 55, herramienta 16, artículo 13, curso 3, plantilla 1) con los 4 de pago marcados: casi todo es fuente oficial y gratuita.
- Datos: path.ts nodes[].resources[] (type, cost)
- Ubicación: Pie de la sección de las cuatro etapas
- Interacción: estática
- Reutiliza: Nueva cuadrícula isotipo en CSS

### `/ai-governance`

- Fichero: `site/src/pages/ai-governance.astro`
- Propósito: Página pilar 'What is AI governance?': definición, por qué ahora, principios, marcos comparados, jurisdicciones, responsables, madurez, medición.
- Pobreza visual: 4/5
- Visuales actuales: Diagram archify the-stack-layers al pie de 'framework includes'; Tablas Markdown (definiciones, fechas, principios, marcos, jurisdicciones, roles, madurez, retos, vecinos, indicadores); Toc lateral

#### Por qué ahora: 2019 a 2028

- Tipo: Línea temporal horizontal de dos carriles · impacto 5 · esfuerzo M · requiere datos nuevos
- Qué muestra: Los 15 hitos de la tabla de fechas en dos carriles (EU AI Act; resto del mundo y soft law), con pasado y futuro separados por 'hoy' en la fecha de build. Se ve el acelerón 2024 a 2026 y lo que aún viene (2027-12-02, 2028-08-02).
- Datos: Tabla de 'Why does AI governance matter now?' en guides/ai-governance.md; filas UE de site/src/data/ai-act-timeline.ts; parseo en build con lib/md-parse.ts o nuevo dataset tipado comprobado contra la tabla
- Ubicación: Cabeza de 'Why does AI governance matter now?' (la tabla queda como alternativa)
- Interacción: estática, cada hito enlaza a su fuente
- Reutiliza: Estilos de AiActDeadlines / eu-ai-act-timeline; ObligationTimeline de la portada

#### Fuerza legal frente a destinatario

- Tipo: Mapa de posicionamiento 2D (cuadrantes categóricos) · impacto 4 · esfuerzo M · requiere datos nuevos
- Qué muestra: Los 8 marcos de la tabla comparativa: eje x voluntario → certificable → vinculante; eje y Estados → organizaciones. Deja ver de un golpe por qué ISO/IEC 42001 no da presunción de conformidad y qué instrumentos obligan a empresas.
- Datos: Tabla 'How do the main AI governance frameworks compare?' de guides/ai-governance.md + frameworks.ts (type, issuer); pequeño mapeo de 8 filas a dos ejes ordinales
- Ubicación: Cabeza de esa sección
- Interacción: hover con fuerza legal y artefactos; enlace a /resources/frameworks
- Reutiliza: Nuevo SVG en build; la tabla existente es el texto alternativo

#### Leyes de IA por jurisdicción

- Tipo: Mosaico de teselas existente (jurisdiction-tiles) · impacto 4 · esfuerzo S
- Qué muestra: Veinte jurisdicciones sombreadas por lo vinculante de su régimen, con recuadro de estados de EE. UU., as of 2026-09-24.
- Datos: site/src/data/figures.ts id 'jurisdiction-tiles' (data-viz del cap. 21), jurisdictions.ts
- Ubicación: Cabeza de 'Which AI regulations apply by jurisdiction?'
- Interacción: estática
- Reutiliza: Generalizar renderDiagramFigure de la página a figuras de figures.ts

#### Quién responde: modelo operativo y madurez

- Tipo: Figura existente de tres líneas + MaturityLadder · impacto 3 · esfuerzo S
- Qué muestra: Consejo, comité y las tres líneas alrededor de las mismas puertas, con el ingeniero en segunda línea; y los cinco niveles de madurez como escalera en lugar de tabla.
- Datos: figures.ts id 'governance-operating-model'; site/src/data/maturity.ts levels
- Ubicación: 'Who is responsible for AI governance?' y 'What are the levels of AI governance maturity?'
- Interacción: escalera con count-up existente, sin movimiento bajo reduced-motion
- Reutiliza: Figure + governance-operating-model.svg; MaturityLadder.astro

### `/agents`

- Fichero: `site/src/pages/agents.astro`
- Propósito: Landing práctica para gobernar agentes: propiedades, plano de control, patrones, amenazas OWASP, marcos, herramientas y fallos.
- Pobreza visual: 3/5
- Visuales actuales: Figura agent-control-plane; RegisterList con swatch de capa (propiedades, plano de control, patrones, referencias, fallos); Tabla de amenazas ASI01 a ASI10; Tabla de categorías de herramientas

#### Dial de autonomía

- Tipo: Escalera acumulativa de 5 niveles · impacto 5 · esfuerzo M
- Qué muestra: Operator → Collaborator → Consultant → Approver → Observer: en cada escalón el papel humano, la analogía ATF, la banda in/on the loop y los controles que añade, apilados de forma acumulativa. Mensaje: la autonomía se compra con controles.
- Datos: site/src/data/tool-agent-controls.ts autonomyLevels[] (name, imda, atf, person, adds, schemaMode) + agentControls[] (id → title, anchor)
- Ubicación: Tras 'Four properties make an agent a different object.' y antes del plano de control
- Interacción: click en un escalón lleva al ancla del capítulo 23; teclado; estática
- Reutiliza: Extender el patrón de MaturityLadder en un AutonomyLadder.astro
- **CORREGIDA**: Componente único AutonomyLadder desde tool-agent-controls.ts autonomyLevels + agentControls, colocado en /agents, en el capítulo 23 ('Autonomy is a design decision') y con el nivel resaltado en /toolkit/agent-control-profile. Nota: el capítulo 11 usa otra escala (niveles 0 a 4); comparte la primitiva Ladder pero conviene revisar que las dos escalas no se contradigan en el texto.

#### Amenaza → control → patrón

- Tipo: Sankey · impacto 5 · esfuerzo M
- Qué muestra: Las 10 amenazas ASI fluyen a los 6 patrones, coloreados por capa; Runtime Guardrail absorbe 4 de 10. Se ve qué patrón conviene construir primero.
- Datos: Array threats de agents.astro o site/src/data/threats.ts (taxonomy 'owasp-asi', patterns[]); patterns.ts layer; opcional agentIncidentClasses como columna intermedia
- Ubicación: Cabeza de 'Ten agentic threats, and the control for each.' encima de la tabla
- Interacción: hover resalta un flujo, click a #threat-asi0N
- Reutiliza: lib/sankey-svg.ts de la portada

#### Espectro de reversibilidad

- Tipo: Escala lineal con marcadores · impacto 3 · esfuerzo S
- Qué muestra: Read → write → delete, send, execute, pay, con las operaciones irreversibles resaltadas y las cinco clases de checkpoint situadas donde exigen un humano.
- Datos: tool-agent-controls.ts operationClasses, irreversibleClasses, checkpointClasses
- Ubicación: Sección del plano de control, junto a 'Human checkpoint'
- Interacción: estática
- Reutiliza: Tokens de capa; CSS

#### Detectar y contener

- Tipo: Swimlane de 11 filas señal → contención · impacto 4 · esfuerzo S
- Qué muestra: Cada clase de incidente agéntico con su señal de detección, su primera contención y el id ASI, como runbook visual.
- Datos: tool-agent-controls.ts agentIncidentClasses[] (name, signal, containment, threat)
- Ubicación: 'When agents fail.'
- Interacción: id ASI enlaza a su fila de la tabla
- Reutiliza: FlowDiagram de dos pasos por fila

### `/frontier`

- Fichero: `site/src/pages/frontier.astro`
- Propósito: Ruta para laboratorios frontera y evaluadores: entornos de evaluación, salvaguardas, evidencia, incidentes y certificaciones.
- Pobreza visual: 3/5
- Visuales actuales: Chips de roles; FlowDiagram frontier-chain (7 pasos con swatch); RegisterList por bloque y de la pila; SourceList

#### Anatomía de un entorno de evaluación

- Tipo: Diagrama concéntrico de contención · impacto 5 · esfuerzo M
- Qué muestra: Modelo o agente en el centro; anillos de autorización, mediación de herramientas, credenciales, egress de red, monitorización y evidencia; los 9 controles AIGE-CTL-EVAL clavados en su anillo con marcas de punto de aplicación y tipo de verificación.
- Datos: site/src/data/controls/evaluation-environment.ts controles (id, title, enforcementPoints, verification[].kind, layer)
- Ubicación: Cabeza del bloque #evaluation-environments
- Interacción: click a /controls/evaluation-environment#<id>, hover con el objetivo
- Reutiliza: SVG nuevo con los glifos de VISUAL-GUIDE §1.7
- **CORREGIDA**: Convertirla en la figura única EvalBoundary (ConcentricRings) y colocarla también en /research/the-evaluation-environment-is-part-of-the-system; los hallazgos METR se anclan vía casesForControl, no con dataset nuevo.

#### Fallos públicos y el control que los habría cazado

- Tipo: Matriz de puntos fallo × control · impacto 4 · esfuerzo M · requiere datos nuevos
- Qué muestra: Filas: fallos documentados (aislamiento roto entre agentes, credenciales expuestas publicadas, llamadas a herramientas falsificadas en al menos 96 transcripciones, transcripciones incompletas tras reinicios, monitorización desactivable con una variable de entorno); columnas: los 9 controles de evaluación.
- Datos: Glosas de METR_INVESTIGATION y METR_RISK_REPORT en evaluation-environment.ts y fuentes de frontier.ts; hace falta un mapeo explícito fallo → ids de control
- Ubicación: Bloque #incidents
- Interacción: punto enlaza al control y a la fuente
- Reutiliza: Patrón de heatmap de aigp-heatmap.ts
- **CORREGIDA**: dataReady pasa a true: no hace falta mapeo nuevo. Usar casesForControl(controlId) de src/lib/cross-links.ts sobre los 9 controles de evaluation-environment.ts y los casos agénticos de 2026 de src/data/cases.ts (que ya citan los informes METR/OpenAI). Matriz caso x control EVAL con DotMatrix.

#### AIUC-1 de un vistazo

- Tipo: Waffle por dominio · impacto 4 · esfuerzo S
- Qué muestra: Los requisitos de AIUC-1 en sus 6 dominios (A a F), los retirados en contorno, con fecha de lectura del índice público.
- Datos: site/src/data/aiuc1.ts aiuc1Requirements (domain, retired, url), aiuc1Domains, AIUC1_INDEX.read
- Ubicación: Bloque #ecosystem
- Interacción: hover con id y título, click a la página pública
- Reutiliza: Waffle compartido con ControlWall

#### Huella frontera en la pila

- Tipo: Cinta de 5 bandas con recuentos · impacto 3 · esfuerzo S
- Qué muestra: Cuántos enlaces y pasos de la cadena caen en cada capa: el trabajo frontera pesa en 04 y 05.
- Datos: frontier.ts frontierBlocks[].links[].layer, frontierChain[].layer, frontierStackMap
- Ubicación: Sección 'Where it sits on the stack.' junto a la RegisterList
- Interacción: banda enlaza a /bok/the-stack#layer
- Reutiliza: StackDiagram mode=static / LayerMatrix

### `/mcp`

- Fichero: `site/src/pages/mcp.astro`
- Propósito: Servidor MCP público de solo lectura: qué responde y cómo conectarlo.
- Pobreza visual: 5/5
- Visuales actuales: Ninguno: bloques de código, tabla de herramientas y callout

#### De tu pregunta a la fuente **[T1]**

- Tipo: Diagrama de arquitectura en cadena · impacto 5 · esfuerzo S
- Qué muestra: Cliente MCP (Claude, Claude Code, otros) → endpoint HTTP de solo lectura con 12 herramientas → API abierta /api/v1 → páginas del sitio → respuesta con URL canónica, versión del BoK y licencia. Deja claro que el servidor no guarda nada propio.
- Datos: mcp.astro (ENDPOINT, tools), tools/mcp-server/src/data.ts (datasets de /api/v1), site.ts bokVersion
- Ubicación: Justo tras el hero, antes de 'The endpoint'
- Interacción: estática, nodos enlazan a /.well-known/mcp.json y /resources/data
- Reutiliza: FlowDiagram (columna en móvil, fila en ancho)

#### Una conversación real, paso a paso

- Tipo: Transcripción de chat animada · impacto 5 · esfuerzo M
- Qué muestra: Pregunta 'What applies to a deployer of a high-risk system before December 2027?' → llamada get_obligations con sus argumentos → filas reales del registro → respuesta con enlaces. Los ids se generan en build desde el registro, así que no se inventa nada.
- Datos: frameworks.ts obligations (dutyHolder, systemClass, appliesFrom, id, clause); ejemplos 'ask' del array tools
- Ubicación: Tras 'Connect it in a minute'
- Interacción: burbujas con entrada solo por transform, estática bajo reduced-motion
- Reutiliza: Nuevo ChatTranscript.astro
- **CORREGIDA**: Rotular como 'ejemplo ilustrativo' (no una sesión real), con filas del registro generadas en build; sin animación propia, usar motion-ui run() transform-only o estático.

#### Doce herramientas sobre siete conjuntos de datos

- Tipo: Grafo bipartito · impacto 4 · esfuerzo S · requiere datos nuevos
- Qué muestra: Cada herramienta unida al dataset que lee, con recuentos (obligaciones, patrones, términos, controles, plantillas, capítulos, crosswalk) calculados en build.
- Datos: Array tools de mcp.astro (añadir campo dataset); obligations.length, patterns.length, getGlossary().length, controls.length
- Ubicación: Cabeza de 'What it answers' encima de la tabla
- Interacción: hover resalta las aristas de una herramienta
- Reutiliza: SVG en build; la tabla existente es el texto alternativo

### `/contribute`

- Fichero: `site/src/pages/contribute.astro`
- Propósito: Cómo contribuir: diez vías (nueve formularios y un PR), qué contiene una buena revisión, licencia, versiones y crédito.
- Pobreza visual: 5/5
- Visuales actuales: RegisterList de vías y de partes de una revisión; CtaBand

#### Muro de revisión abierta

- Tipo: Waffle por perfil · impacto 5 · esfuerzo M
- Qué muestra: Cada control un cuadrado agrupado por perfil, relleno según reviewerStatus (abierto, en curso, revisado) y marca interior según depth (specified, derived, stub); filas extra para notas de investigación y casos. Convierte 'open for review now' en un tablero que invita a coger uno.
- Datos: controls/index.ts controls[] (profile, reviewerStatus, depth, status) y profiles; research.ts; cases.ts; work.ts
- Ubicación: Cabeza de #paths, junto al párrafo 'Open for review now'
- Interacción: cuadrado enlaza al control y al formulario control-review.yml
- Reutiliza: ControlWall.astro de la portada
- **CORREGIDA**: reviewerStatus es 'open' en todos los controles (derive() lo fija, agent-runtime.ts:702 y equivalentes): relleno por reviewerStatus sería uniforme. Codificar por depth (specified 9, derived, stub 1) y por 'respuesta por especificar', que es lo que realmente invita a contribuir.

#### De la issue a la cita

- Tipo: Flujo de ciclo de vida · impacto 4 · esfuerzo S
- Qué muestra: Contribuidor → formulario o PR → revisión en abierto → merge → versión v{bokVersion} → DOI en Zenodo → crédito en CONTRIBUTORS.md.
- Datos: Copy de contribute.astro; site.ts (bokVersion, doi, conceptDoi)
- Ubicación: Cabeza de #provenance
- Interacción: pasos enlazados (CONTRIBUTING.md, doi.org, changelog)
- Reutiliza: FlowDiagram

#### Qué cambia cada vía **RECHAZADA**

- Tipo: Matriz de puntos 10 × 7 · impacto 3 · esfuerzo S · requiere datos nuevos
- Qué muestra: Cada vía frente al artefacto que modifica (perfiles de control, mapeos, registro de obligaciones, casos, notas, fuentes, código).
- Datos: Array paths de contribute.astro (añadir campo targets)
- Ubicación: Tras la RegisterList de vías
- Interacción: estática
- Reutiliza: Grid CSS
- Motivo del rechazo: Cada vía toca casi siempre un solo artefacto: matriz casi diagonal y decorativa; requiere además un campo nuevo. La RegisterList ya lo dice.

#### Ritmo de versiones **RECHAZADA**

- Tipo: Línea temporal corta · impacto 3 · esfuerzo S
- Qué muestra: 0.1 (2026-09) → 0.2 (09-10) → 0.3 (09-15) → 0.3.1 y 0.4.0 (09-19) → 0.5.0 (09-25) → Unreleased, con el DOI de la actual.
- Datos: Encabezados de bok/CHANGELOG.md; site.ts doi
- Ubicación: #provenance
- Interacción: hito enlaza a /about/changelog#version
- Reutiliza: Estilo de ObligationTimeline
- Motivo del rechazo: Duplica ReleaseTimeline de /about/changelog (mismo parseo de bok/CHANGELOG.md). Enlazar.

### `/404`

- Fichero: `site/src/pages/404.astro`
- Propósito: Error 404 con el lenguaje de veredicto (BLOCK) y salida a portada o búsqueda.
- Pobreza visual: 4/5
- Visuales actuales: VerdictStamp BLOCK en el H1; Banda mesh

#### Registro de decisión de la política

- Tipo: Tarjeta de evidencia (JSON de veredicto) · impacto 4 · esfuerzo S
- Qué muestra: La 404 como registro de evidencia: decision deny, rule route-registered, path (rellenado en cliente por un script propio) y timestamp, con el glifo de documento con check. Refuerza la identidad 'evidencia como héroe'.
- Datos: Vocabulario de site/src/data/policy-card.ts (PolicyEffect); location.pathname en cliente
- Ubicación: Bajo el lede, antes de los CTA
- Interacción: script same-origin mínimo; sin JS muestra una ruta genérica
- Reutiliza: Estilos de pre/code y VerdictStamp

#### Rutas registradas **RECHAZADA**

- Tipo: Diagrama de puerta + registro · impacto 3 · esfuerzo S
- Qué muestra: Petición → rombo de puerta → BLOCK; al lado un cilindro de registro con las rutas principales como chips para elegir salida.
- Datos: site/src/data/nav.ts
- Ubicación: Debajo de los CTA
- Interacción: chips enlazados
- Reutiliza: FlowDiagram + chips
- Motivo del rechazo: Decorativo y redundante con los CTA y la navegación.

## Páginas sin propuesta en el primer barrido (añadidas por el crítico)

- `/bok/eu-ai-act`: Techos de sanción del art. 99 y 101: barras horizontales por tipo de infracción con doble etiqueta (importe fijo y % de facturación, 'el mayor de los dos'), y rótulo de la regla PYME 'el menor'. Figura data-viz registrada en 'Penalties'. Datos: Tabla 'Penalties' de bok/18-eu-ai-act.md (líneas ~690-700: 35M/7 %, 15M/3 %, 7,5M/1 %, GPAI 3 %/15M) transcrita a la tabla data de figures.ts.
- `/bok/regulatory-map`: (1) Colocar aquí la figura JTC 21 por fases del cap. 22 bajo 'What is NOT harmonised yet' (ninguna norma citada en el DOUE a 2026-09-24). (2) Treemap del registro de obligaciones por grupo de instrumento, reutilizando el de /resources/frameworks, porque este capítulo es la fuente del registro. Datos: bok/08-regulatory-map.md sección 'What is NOT harmonised yet' y tabla JTC 21 del cap. 22; src/data/frameworks.ts obligations[].framework/frameworkId.
- `/bok/risk-management`: Tiers de producto como escalera acumulativa (Tier 1 herramienta interna a Tier 4 agéntico con escritura): controles mínimos que se suman, puerta y cadencia de revisión (anual, semestral, mensual). Datos: Tabla 'The tailoring matrix', filas 'Products and services' de bok/13-risk-management.md (líneas ~670-698).
- `/bok/why-now`: Cinco problemas, cinco respuestas de ingeniería: flujo de tres columnas problema (1 a 5) a artefacto que lo resuelve (registro alimentado por el pipeline, eval gate y policy-as-code, assurance store, identidad y telemetría) a capa. Datos: Secciones '### 1.' a '### 5.' y 'What changes when governance is engineered' de bok/02-why-now.md (líneas 30-84 y 189-202); 5 filas a transcribir.
- `/resources/frontier-safety-crosswalk`: Excluida (otro agente trabaja en ella). Solo se señala que HeatGrid y DotMatrix sirven a su matriz si el otro agente quiere converger en primitivas. Datos: src/data/frontier-crosswalk.ts

## Rechazos (lista completa)

- `/` · De la norma a la evidencia (Sankey): Duplica la ObligationMatrix de /resources/frameworks (marco x capa) y el LayerSankey propuesto para /controls; esfuerzo L en una página vetada por perf.spec (sin figures.css) que ya tiene 12 visuales. La lectura obligación a capa a patrón vive mejor en /stack (LayerMatrix) o /obligations.
- `/` · Calendario de activación de obligaciones (beeswarm): Duplica el héroe ObligationTimeline de /obligations; WhatAppliesNow ya cubre 'lo próximo' en portada. Enlazar a /obligations en vez de repetir el gráfico.
- `/[lang]` · Cobertura de la traducción: Ruta no publicada: PUBLISHED_TRANSLATED_LOCALES = [] en src/i18n/locales.ts:29, así que [lang] no genera páginas. Nada que ver en producción.
- `/[lang]/thesis` · Figuras neutras al idioma: Ruta no publicada (idiomas automáticos apagados desde 2026-09-25). Retomar solo si se reactivan.
- `/[lang]/bok y /[lang]/bok/[slug]` · Cobertura de la traducción en la espina + figuras localizadas: Rutas no publicadas (PUBLISHED_TRANSLATED_LOCALES vacío). El mecanismo -<lang> de posters.mjs ya existe para /es.
- `/[lang]/patterns/[id]` · Vecindario y cifras del patrón traducido: Ruta no publicada; cuando se publique heredará el RelationRadial de /patterns/[id] sin propuesta aparte.
- `/thesis` · Dónde muerden los controles (beeswarm por punto de aplicación): Mismo dato y misma lectura que EnforcementLanes de /controls (enforcementPoints x effect). Además los controles derivados de agent-runtime tienen enforcementPoints por defecto ['runtime'] y effect 'alert' con texto 'To be specified.' (agent-runtime.ts:707-710), así que la tesis 'la masa está en runtime' sería en parte un artefacto de los valores por defecto. En la Tesis basta enlazar a /controls.
- `/role` · Tres puertas de entrada al rol (alluvial): Duplica la propuesta de /path; path.ts entries tiene solo 3 entradas con 2 startAt cada una (líneas 1409-1419): 6 cintas no justifican un alluvial. Se sirve con FlowDiagram en /path.
- `/bok/the-role` · Tres vías de entrada (diagrama convergente): Tercer duplicado del mismo contenido (role.ts waysIn / path.ts entries). Un único FlowDiagram en /path, enlazado desde /role y el capítulo.
- `/stack` · El catálogo de herramientas como treemap: Duplica el isotipo capa x acceso de /resources/tools (misma fuente toolCatalogue, misma codificación por access). /stack ya tiene StackFlow, StackDiagram y ToolsTable; queda LayerMatrix como aporte nuevo.
- `/resources/tools` · Nube de licencias SPDX (treemap): Poca información nueva frente a las barras apiladas de acceso por categoría; treemap de una sola dimensión con larga cola. Añadir la licencia al title de cada celda del isotipo.
- `/contribute` · Ritmo de versiones: Duplica ReleaseTimeline de /about/changelog (mismo parseo de bok/CHANGELOG.md). Enlazar.
- `/contribute` · Qué cambia cada vía (matriz 10 x 7): Cada vía toca casi siempre un solo artefacto: matriz casi diagonal y decorativa; requiere además un campo nuevo. La RegisterList ya lo dice.
- `/bok/preface` · Versiones del Body of Knowledge: Duplica ReleaseTimeline de /about/changelog.
- `/404` · Rutas registradas (puerta + registro): Decorativo y redundante con los CTA y la navegación.
- `/bok` · Base de evidencia por capítulo: Duplica el gofre y barras por capítulo de /about/methodology (misma fuente de verificación). Un solo sitio: la metodología.
- `/bok/[slug]` · Perfil de fuentes del capítulo: Impacto 2 y duplica la metodología; la lista de fuentes ya muestra la etiqueta en cada entrada.
- `/bok/[slug]` · Capítulos vecinos por términos compartidos (ego-red): Señal débil (co-ocurrencia de chapterRefs) repetida en 24 páginas y solapada con la red de /bok; prev/next y keyTerms ya orientan.
- `/bok/glossary` · Matriz términos (top 40) x capítulos: Densa, ilegible a 390 px y redundante con las barras de capítulos por vocabulario de GlossaryIndex.
- `/bok/reading-list` · Tema x audiencia y mosaico de jurisdicciones: Duplican las propuestas de /resources/reading-list (misma fuente lib/reading-list.ts). Se implementan una vez y se colocan en el capítulo 10 si se registran.
- `/resources/glossary` · Espectro A-Z, constelación y capítulos: La ruta hace 301 a /bok/glossary en producción; se implementa una sola vez dentro de GlossaryIndex/ContrastCards (compartidos), no como propuesta de ruta.
- `/research` · Recorrido de revisión de una nota (pipeline): Hay una sola nota escrita: un pipeline de tres estados con una ficha es decorativo.
- `/research` · Cobertura de controles por las notas: Con una nota el gráfico es una barra llena (EVAL) y cuatro vacías; se integra como atributo de los nodos de la red del programa.
- `/research/[slug]` · El perímetro de la evaluación (anillos): Mismo concepto y mismos controles EVAL que 'Anatomía de un entorno de evaluación' de /frontier. Una sola figura EvalBoundary generada de evaluation-environment.ts, colocada en /frontier y en la nota.
- `/resources/frameworks` · Enjambre temporal de obligaciones: Duplica el héroe ObligationTimeline de /obligations (misma fuente, mismas 129 filas). /resources/frameworks conserva ObligationMatrix y gana el treemap.
- `/resources/frameworks` · Gofre de estado de aplicación: Duplica el isotipo de estados por instrumento de /obligations, que además agrupa por instrumento.
- `/resources/frameworks` · AI Act: titular x clase de sistema: Duplica la matriz rol x obligación del obligations-planner, que ya tiene los roles normalizados (plannerRoles, plannerDuties); aquí exigiría normalizar dutyHolder de texto libre.
- `/resources/reading-list` · Verificación por tema: Duplica la lectura de verificación de /about/methodology.
- `/bok/governing-agents` · Amenazas agénticas mapeadas a controles (Sankey): Duplica el Sankey amenaza a patrón de /agents (threats.ts taxonomy owasp-asi). Registrar ese una vez y colocarlo también en el capítulo 23.
- `/bok/governing-agents` · Autonomía del agente y controles acumulados: Mismo dato (tool-agent-controls.ts autonomyLevels) que la escalera de /agents y de /toolkit/agent-control-profile: un único AutonomyLadder reutilizado en los tres sitios.
- `/bok/fairness-and-explainability` · Qué iguala cada métrica (matriz 5 x magnitud): Duplica MetricGlyph de /toolkit/fairness-metric-chooser; fusionar en una figura registrada del capítulo 16 generada desde metricFamilies con el campo nuevo equalises.
- `/about` · Preguntas abiertas y dónde se trabajan: open-questions.ts da un href por pregunta: bipartito de aristas uno a uno, decorativo.
- `/about/contributors` · Muro de firmantes y contadores: Hoy 0 revisores, 0 contribuidores y 1 firmante: un muro de una firma es decorativo. Reconsiderar cuando haya datos.
- `/about/changelog` · El pulso del fact-check: Impacto 2; se integra como una categoría más de las barras apiladas de ReleaseTimeline.
- `/toolkit/vendor-due-diligence` · Tu solicitud por áreas y cláusulas (treemap cliente): Treemap squarified en el cliente para ~38 preguntas añade peso de script y poca lectura; las barras por nivel x área ya lo explican.
- `/for/certifications` · El AIGP en cuatro dominios: Duplica el treemap de /for/aigp (aigpDomains.questions); enlazar con una miniatura.
- `/controls/[profile]/[control]` · Posición en el stack: Impacto 2 y ya contenido en la anatomía del control, que pinta capa de origen y capas de evidencia.
- `/obligations/[id]` · La fila dentro de su instrumento: Impacto 2; el pager de vecinos y el isotipo de /obligations cubren el contexto.
- `/patterns/[id]` · Dónde está en el mapa de patrones (mini pattern-map): 33 variantes SVG de una figura registrada para una lectura que ya da el RelationRadial del mismo patrón.

## Correcciones (lista completa)

- `/controls` · Mosaico, carriles, sankey y barras de verificación (todas las vistas de controles): Los controles derivados de agent-runtime heredan por defecto enforcementPoints ['runtime'] y failureResponse {effect:'alert', text:'To be specified.'} (src/data/controls/agent-runtime.ts:707-710). Cualquier gráfico por effect o punto de aplicación debe pintar un tercer estado 'por especificar' (detectado por texto 'To be specified.' o depth 'derived' sin override) y no sumarlo a 'alert' ni a 'runtime'. Las barras de verificación deben tener un segmento explícito 'sin procedimiento' (los derived no tienen verification). Los recuentos (las propuestas citan 79 y 93 controles) se calculan en build, nunca se escriben a mano.
- `/` · Muro de controles abiertos: con dientes o señal: Mantener, pero con tres estados (deny/require_approval relleno, alert contorno, por especificar trama) por la nota anterior; componente con raíz .chart y CSS propio porque / está vetada para figures.css (tests/perf.spec.ts). Es la misma primitiva DotMatrix que ControlMosaic de /controls, no un componente aparte.
- `/contribute` · Muro de revisión abierta: reviewerStatus es 'open' en todos los controles (derive() lo fija, agent-runtime.ts:702 y equivalentes): relleno por reviewerStatus sería uniforme. Codificar por depth (specified 9, derived, stub 1) y por 'respuesta por especificar', que es lo que realmente invita a contribuir.
- `/frontier` · Fallos públicos y el control que los habría cazado: dataReady pasa a true: no hace falta mapeo nuevo. Usar casesForControl(controlId) de src/lib/cross-links.ts sobre los 9 controles de evaluation-environment.ts y los casos agénticos de 2026 de src/data/cases.ts (que ya citan los informes METR/OpenAI). Matriz caso x control EVAL con DotMatrix.
- `/frontier` · Anatomía de un entorno de evaluación: Convertirla en la figura única EvalBoundary (ConcentricRings) y colocarla también en /research/the-evaluation-environment-is-part-of-the-system; los hallazgos METR se anclan vía casesForControl, no con dataset nuevo.
- `/obligations` · Quién responde ante quién (EU AI Act, Sankey): No normalizar dutyHolder de texto libre: tomar los roles de src/data/obligations-planner.ts (plannerRoles, plannerDuties por id de fila) y authority de frameworks.ts. Prioridad baja frente al héroe temporal.
- `/role` · Salarios medianos y la profesión en cifras: Una sola figura data-viz registrada en figures.ts con placement en el capítulo 06 'The market' y pages ['/role'] (sustituye a la propuesta gemela de /bok/the-role). Datos: medianas IAPP que ya cita bok/06-the-role.md; no hace falta campo amount en role.ts, la tabla data de figures.ts es la fuente.
- `/resources/reading-list` · Cartograma de jurisdicciones: readingJurisdictions() devuelve claves no geográficas (global, internacional, UE) y pocas: un tile map queda vacío y engañoso. Usar barras ordenadas (RankedBars) enlazadas al filtro de jurisdicción.
- `/toolkit/ai-act-triage` · Tus roles en la cadena de valor: En la guía, incrustar la figura existente eu-ai-act-operator-roles con Figure.astro (coste S) en vez de dibujar una nueva; el resaltado en cliente queda como mejora posterior.
- `/cases` · Del daño al caso y a la capa de evidencia (alluvial): 18 casos en la columna central rompen el límite de 9 nodos para kind no póster. Reducir a dos columnas daño (harms.ts) a capa de evidencia (evidenceArtefacts[].layerN), con los casos en la tabla alternativa; esfuerzo baja a M.
- `/mcp` · Una conversación real, paso a paso: Rotular como 'ejemplo ilustrativo' (no una sesión real), con filas del registro generadas en build; sin animación propia, usar motion-ui run() transform-only o estático.
- `/bok` · Espina del libro: 24 capítulos de un vistazo: Quitar las marcas de figuras (son el atlas de /figures) y las de fuentes (son la metodología); la espina codifica minutos de lectura por parte y enlaza. BookSpine es el mismo componente que el atlas de /figures con otra codificación.
- `/bok/glossary` · Pares que se confunden, como red: Limitar la red a términos con 'Contrast with' (familias de confusión, 10 pares de la tabla más los contrastes por término de lib/glossary.ts contrast); no una constelación de ~145 términos con fuerzas (bola de pelo, esfuerzo L). Implementar en GlossaryIndex para que sirva a /bok/glossary y a /resources/glossary.
- `/bok/glossary` · Densidad A-Z del vocabulario: Implementar dentro de GlossaryJump/GlossaryIndex (compartido); es la misma propuesta que 'Espectro A-Z' de /resources/glossary.
- `/resources/crosswalk` · Venn de las tres grandes: Página vetada por perf.spec: componente con CSS propio (raíz .chart), sin clases figc. A 390 px cambiar a barras UpSet. Si inAllThree domina, rotular las regiones pequeñas (actWithoutIso, actWithoutNist) que son la noticia.
- `/resources y /cases y /patterns` · Todos los gráficos de páginas vetadas: /, /resources, /resources/crosswalk, /cases y /patterns no pueden enlazar figures.css, prose.css ni diagrams.css (tests/perf.spec.ts:186-241): los gráficos de estas páginas usan la primitiva con hoja propia, nunca <Figure> ni clases .figc, o se cambia el test de forma consciente.
- `/controls/[profile]/[control]` · Del fallo a la evidencia: anatomía del control: Construir sobre lib/evidence-chain.ts (motor row/column ya probado) y no como ControlAnatomy independiente; hoy son 9 páginas (solo depth specified).
- `/bok/principles-and-standards` · Programa JTC 21 por fases: Registrar una sola figura con placements en el capítulo 22 ('The JTC 21 programme') y en el capítulo 08 ('What is NOT harmonised yet'), con asOf 2026-09-24 y reviewBy corto: los estados son 'reported' y cambian en Q4 2026.
- `/stack` · La pila mínima y tres preguntas como figuras: Correcto y barato; añadir '/stack' a pages de minimum-viable-stack y three-questions en figures.ts para que el permalink lo liste. /stack sí puede enlazar figures.css.
- `/es/thesis` · Variantes ES de las figuras de la Tesis: Solo tras publicar las versiones EN, y solo las de texto (genealogía, números); ids -es con lang="es" y sello 'A fecha de'.
- `/resources/dpia-lists y /bok/privacy-and-ai` · Mapa de teselas del EEE / Listas DPIA nacionales en Europa: Una única figura (TileMap) con placement en el capítulo 19 y pages ['/resources/dpia-lists']. jurisdiction-tiles no tiene rejilla de Estados miembros: hay que añadir una constante pequeña de posiciones EEE y la constante opinionWithoutList (8 países) en src/data/dpia-lists.ts; dataReady false en ambas páginas.
- `/agents` · Dial de autonomía: Componente único AutonomyLadder desde tool-agent-controls.ts autonomyLevels + agentControls, colocado en /agents, en el capítulo 23 ('Autonomy is a design decision') y con el nivel resaltado en /toolkit/agent-control-profile. Nota: el capítulo 11 usa otra escala (niveles 0 a 4); comparte la primitiva Ladder pero conviene revisar que las dos escalas no se contradigan en el texto.
- `/toolkit/fairness-metric-chooser` · Qué iguala cada métrica: la matriz de confusión: Añadir equalises a MetricFamily (hoy solo existe el texto 'holds') y registrar la figura en el capítulo 16 'Group fairness metrics' con pages ['/toolkit/fairness-metric-chooser']; sustituye la matriz duplicada del capítulo.
- `/resources/templates` · Matriz registro x instrumento: Fuente confirmada (x-evidences en public/schemas/*.v1.json: 17 a 19 marcas en los registros); normalizar prefijos de instrumento en build y generar desde getSchemas() para no leer JSON públicos a mano.
