# Design

## Context

Ver `proposal.md` (Why). El sitio es Astro 5 estático con `build.format: 'file'` y CSP
`script-src 'self'` (JS solo en `public/*.js`). La navegación sale de un único modelo
(`site/src/data/nav.ts`); los datos son módulos TS con cabecera de procedencia, interfaz, array
readonly, lookups y una función `*Problems()` (el modelo más rico es `threats.ts`). Las obligaciones
tienen ids estables `AIGE-OBL-<INSTR>-<CLAUSE>` con lista de retirados; la API estática `/api/v1`
se genera desde la lista `datasets` de `site/src/lib/api.ts`; los esquemas de registro viven a mano
en `public/schemas/*.v1.json`. La semilla del registro de controles ya existe:
`site/src/data/tool-agent-controls.ts` (31 controles de agente con ancla en el capítulo 23).

El trabajo se reparte en 19 bloques paralelos en worktrees disjuntos por fichero; eso condiciona
varias decisiones (stubs con anclas, propiedad de registros compartidos).

## Goals / Non-Goals

**Goals:**
- Un único registro tipado alimenta páginas, JSON, twin Markdown, MCP y enlaces contextuales.
- Cada control declara su nivel de madurez (`depth`) y el sitio nunca presenta un borrador como
  algo revisado.
- Cada worktree de la ola 1 construye en verde desde el primer commit.

**Non-Goals:**
- Ejecutar controles o recoger observaciones: el sitio publica definiciones y el esquema; la
  ejecución queda fuera (producto privado).
- Páginas por control, tercer perfil, `/controls/crosswalk`, locales traducidos.

## Decisions

### D1. Ids `AIGE-CTL-<PROFILE>-<NNN>`
Id de control `AIGE-CTL-EVAL-001..009` y `AIGE-CTL-AGENT-001..031`, regex
`^AIGE-CTL-[A-Z0-9]+-\d{3}$`, con lista `retiredControlIds` y regla de no reutilizar nunca un id.
**Por qué**: se alinea con la familia `AIGE-OBL-*` ya publicada (misma forma, mismo régimen de
retirada) y el sufijo de perfil permite crecer a más perfiles sin colisión.
**Alternativa descartada**: `AGE-EVAL-001` (propuesta original), que abre una segunda familia de ids
sin prefijo común con las obligaciones. El slug (`aige-ctl-eval-002`) es el id en minúsculas y sirve
de ancla y de nombre de fichero JSON.

### D2. Registro multi-perfil
`site/src/data/controls/index.ts` contiene tipos, validadores, etiquetas y lookups, y concatena los
perfiles: `controls = [...evaluationEnvironment, ...agentRuntime]`. Cada perfil vive en su fichero
(`evaluation-environment.ts`, `agent-runtime.ts`). **Por qué**: dos perfiles desde el día 1 y
ficheros disjuntos permiten que dos agentes escriban contenido en paralelo, y un perfil nuevo es un
fichero más sin tocar los demás. **Alternativa descartada**: un único `controls.ts` (conflictos
seguros entre bloques, crecimiento difícil a ~100 controles).

### D3. `depth`: `specified | derived | stub`
- `specified`: verificación ≥ 1, evidencia ≥ 1, notas de implementación ≥ 1, `observation` y
  referencias verificables.
- `derived`: promovido de una semilla de `tool-agent-controls.ts`; exige `seeds` ≥ 1, evidencia ≥ 1
  y preguntas abiertas ≥ 1; la verificación puede quedar vacía.
- `stub`: exige preguntas abiertas ≥ 1 y `reviewerStatus: 'open'`.

**Por qué**: "tres controles excelentes antes que nueve genéricos"; el nivel es un dato que la
página muestra ("Draft / requires technical review") y que los validadores hacen cumplir.

### D4. Tres controles a fondo: 002, 003 y 006
Network Egress Control, Credential Isolation y Stop Conditions. **Por qué**: los tres admiten una
verificación repetible por un tercero, tienen fuente primaria normativa ya verificada en el sitio,
una fila del capítulo 23 con evidencia, y cubren tres puntos de aplicación distintos (red,
identidad, parada). Respuesta ante fallo: `deny` en 002 y 003; `alert` más disparo de breaker en
006. Los seis restantes (001, 004, 005, 007, 008, 009) son `stub` con `openQuestions`.

### D5. Derivación del perfil Agent Runtime
Cada `AIGE-CTL-AGENT-0nn` reescribe un `agentControls[n]` en el mismo orden (`seeds: [id]`), con
`depth: 'derived'`, `status: 'draft'`, `reviewerStatus: 'open'`:
`rule` → `objective` (como resultado, sin cambiar el sentido); `evidence` → `evidence[]` (capa 4
salvo registro/identidad → 2, trajectory-evals → 3, telemetría/evidencia → 5); `pattern` →
`patterns`; `threats` → `mappings.owasp` (ids en minúscula de `threats.ts`) y `failureModes` desde
el resumen de esas amenazas (o un TODO en `openQuestions` si no hay amenaza); `anchor` →
`references` (capítulo 23 con ancla y las fuentes de las amenazas mapeadas);
`enforcementPoints` `['runtime']` (`['deploy']` para registry-entry, prompt-change-control y
mcp-admission; `['pre_merge']` para trajectory-evals); `verification: []`; `failureResponse`
`alert` "To be specified" salvo breakers y kill switch (`deny`); `mappings.obligations` solo las
que `threats.ts` ya asocia; al menos la pregunta "Verification procedure and evidence schema to be
specified; requires technical review". **Por qué**: amplitud sin inventar requisitos; cada fila es
trazable a su semilla y a su ancla.

### D6. Registro `control-observation.v1.json`
Esquema JSON (draft 2020-12, `additionalProperties: false`) para lo que un adaptador futuro
emitiría al comprobar un control: `control_id`, `subject`, `subject_kind`, `expected`, `observed`,
`status` (`pass | fail | not_applicable`), `timestamp`, `evidence[]` (requeridos), más opcionales
(`profile`, `control_version`, `enforcement_point`, `verification_kind`, `observer`, `run_id`,
`notes`, `signature`, `extensions`). Con ejemplo (002 en `fail`) y plantilla, validados por
`schemas-check`. **Por qué**: publicar el contrato de evidencia sin exponer el motor de ejecución.
El `observer` nombra un adaptador o un rol, nunca una persona.

### D7. Exposición por la API
Dataset `controls` en la lista `datasets` de `site/src/lib/api.ts` (endpoint, esquema, catálogo,
OpenAPI y fila en `/resources/data` salen solos) más ruta por ítem `/api/v1/controls/<slug>.json`,
clonada de la de obligaciones (`itemTemplates.control`, `indexSchema`, `openApiDocument`). Cada
opcional se emite como `null` o `[]`, nunca omitido; la envolvente lleva el aviso "not a claim of
conformity". **Alternativa descartada**: JSON escrito a mano en `public/` (se desincroniza del
registro).

### D8. Sin páginas HTML por control en v0.1
Un perfil es una página con un `<section>` y un H2 con id por control. **Por qué**: 40 páginas casi
vacías (37 borradores) diluyen la calidad y el SEO; el ancla ya da un URL estable por control. Las
páginas por control llegan cuando al menos la mitad de un perfil esté `specified`.

### D9. Solo inglés
Las rutas nuevas no tienen variantes `[lang]` ni hreflang; los locales traducidos están ocultos
desde el 2026-09-25 (`PUBLISHED_TRANSLATED_LOCALES = []`). `/es/thesis` no cambia.

### D10. Stubs con anclas para worktrees paralelos
En la ola 0, el bloque shell crea stubs (`<!-- orp-stub -->`) de cada ruta nueva con su `<title>`
y descripción definitivos y todas las anclas acordadas, y registra nav, `SOURCE_BY_PATH`, OG,
`llms.txt`, redirecciones y cabeceras. **Por qué**: `check:links`, `nav.spec` y `seo-infra` pasan
en toda worktree de la ola 1 aunque la página destino la escriba otro bloque. En la integración, la
build falla si queda algún `orp-stub` en `dist`.

### D11. Propiedad de los registros compartidos
Los registros compartidos son append-only con un bloque comentado por agente y se fusionan con
`union-merge.py`. Los agentes de página no editan `astro.config.ts`, `lib/og-cards.ts`,
`lib/llms.ts`, `pages/llms.txt.ts`, `lighthouserc.cjs`, `tests/nav.spec.ts`,
`tests/seo-basics.spec.ts`, `tests/seo-titles.spec.ts`, `public/_headers` ni `public/_redirects`:
lo piden en el handoff y el orquestador lo aplica. Excepciones explícitas: `nav.ts` (feed JSON de
controles), `lib/api.ts` (bloque `controls` y bloque `cases`), `sources/SOURCES.md` (una sección
por fichero) y `site/DESIGN.md` (primitivas; hero y bandas).

### D12. Modelo de revisión sin revisores inventados
Perfiles y notas tienen `status` y `reviewers`. Con `reviewers` vacío la línea de estado dice
"Open for technical review"; `published` exige al menos un revisor acreditado en
`bok/CONTRIBUTORS.md`. `people.ts` contiene solo a Jorge García Aibar, con el nombre tomado de
`site.ts`. El estado se muestra como línea `.meta` bajo el H1 (DESIGN.md prohíbe chips o eyebrows
sobre títulos).

### D13. Analytics declarativos
Eventos como atributos `data-umami-event` (≤ 50 caracteres) y `data-umami-event-*` sobre CTAs y
descargas (`control-download`, `control-ref-click`, `github-review-click`, `contribute`,
`schema-download`, `api-docs-click`, `mcp-docs-click`, `open-issue`). Sin JS propio; Umami ya
existe y es opt-in.

### D14. Hero: solo copy y CTAs
H1, arte, veils, layout y `HeroStrip` intactos. Se añaden un párrafo de apoyo, dos CTAs (Explore
the Stack como primario, Open controls como secundario) y dos enlaces (Read the Thesis, Frontier
labs & evaluators). **Por qué**: la hero es reciente y tiene gates de contraste
(`hero-art.spec`); el Stack sigue siendo la entrada principal y `/frontier` no se convierte en eje
del sitio.

### D15. "Incidents" como etiqueta, `/cases` como URL
La navegación rotula "Incidents" y el URL sigue siendo `/cases` (y `/cases/<id>`); `/incidents` y
`/incidents/*` responden 301 hacia `/cases`. **Por qué**: ningún URL publicado cambia y el término
del lector funciona como entrada.

### D16. Enlaces desde capítulos como mobiliario renderizado
Los enlaces desde capítulos hacia `/controls`, `/frontier` y `/cases` salen de
`site/src/data/chapter-links.ts` y se renderizan tras la prosa en `pages/bok/[slug].astro`; ningún
`bok/*.md` se edita y el módulo no entra en `SOURCE_BY_PATH` de los capítulos (`seo-infra` compara
el lastmod con el Markdown).

## Risks / Trade-offs

- [Contenido inventado en 20 bloques] → `depth` obligatorio, fuentes verificadas para
  `specified`, revisión adversarial en la ola 2, nota aprobada por Jordi, revisores vacíos por
  diseño.
- [Conflictos en registros compartidos] → un bloque comentado por agente y `union-merge.py`; los
  agentes de página piden los cambios por handoff.
- [`check:links` roto en worktrees paralelos] → stubs con anclas acordadas (D10).
- [Contraste de la hero y tira a 390×844] → el bloque home mide con `hero-art.spec` antes de tocar
  el halo; si no cabe, reduce gap o padding, nunca el arte.
- [Deriva hacia "AI safety"] → `/frontier` es una ruta de audiencia más; el Stack sigue como CTA
  primaria.
- [MCP desplegado desactualizado] → el código entra en la PR; `mcp.json` y README dicen la verdad
  del servidor desplegado hasta el redeploy.
- [Mapeos AIUC-1 no verificados] → solo se publican ids leídos en páginas públicas, con nota de no
  afiliación.

## Migration Plan

Aditivo. Ola 0 (núcleo, shell, OpenSpec, GitHub) → build verde en `orp` → ola 1 (10 bloques de
página y contenido) → build verde y ningún `orp-stub` → ola 2 (revisión, MCP, SEO, analytics, QA)
→ verificación central → PR → CI → merge y deploy → smoke en prod → `/opsx:archive`. Rollback:
revertir el merge; `/incidents` deja de redirigir y ningún URL existente se ve afectado.

## Open Questions

- ¿Qué ids AIUC-1 se mapean y a qué controles? Se decide en `orp-review-content` leyendo las
  páginas públicas; lo no verificado no se publica.
- ¿Entra en `/cases` un caso nuevo desde la investigación pública de METR sobre el incidente
  OpenAI/Hugging Face? Tarea opcional de `orp-incidents`; si no cabe con verdad, pasa a la segunda
  iteración.
- ¿Se publica el bump de `SERVER_VERSION` del MCP antes del redeploy del contenedor? Lo decide Jordi
  con el orquestador.
- ¿Qué referencias de METR se incorporan como `Source` en los controles y en la nota? Solo las
  verificadas en el plan, descritas como "METR states" y sin sugerir respaldo.
