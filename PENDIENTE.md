# Pendiente tras la v0.4.0 (actualizado 2026-09-20 tras el bloque F)

Contexto rápido: el plan aprobado está en
`C:\Users\Jordi\.claude\plans\como-podemos-mejorar-la-keen-globe.md`. Bloques 0, A, B, C, D, E, F y G
están en producción (`main` en `dde6bbc`, deploy automático con smoke). Memorias útiles:
`aige-parallel-worktree-agents`, `aige-site-test-order`, `aige-diagrams-archify-pipeline`.
Reglas de trabajo: Fable planifica, revisa figuras y verifica; subagentes `implementador`
(Opus 4.8) implementan; un build por worktree, tests una sola vez en `main`, `lhci` el último.

## 1. Acciones de Jordi (no las puede hacer Claude)
- [x] Crear el secret de repositorio `CF_BEACON_TOKEN` (token de Cloudflare Web Analytics) para
      activar la analítica sin cookies; el siguiente deploy la inyecta.
- [x] `videos/` y el texto del post movidos a `D:\Documentsige-media` (2026-09-20).
- [x] Activar GitHub Discussions en `losanchos5/aige` (ajuste del repo, ver bloque F).
- [x] Zenodo conectado al repo (2026-09-20). Falta: crear la release `v0.4.0` en GitHub, recoger
      el DOI y ponerlo en `CITATION.cff`, `Citation.astro` (BibTeX) y /about.

## 2. Bloque F: Crecimiento y rigor (hecho 2026-09-20, commits d8f642a..dde6bbc)
- [x] JSON-LD acotado: `Book` + `TechArticle` en `/bok/[slug]` (pasar `jsonLd` por `Doc.astro`),
      `Person` mínimo con `authors` de `site.ts` (sin jobTitle/worksFor), `BreadcrumbList` desde
      `chapters.ts`; `og:locale` en `Seo.astro`; `site.webmanifest`.
- [x] Firma sin fricción: `thesis.astro` de `blob/` a `edit/main/bok/CONTRIBUTORS.md`; Issue Form
      `.github/ISSUE_TEMPLATE/sign-the-thesis.yml`; extraer `SignNote.astro` y mostrarlo también en
      `/bok/index.astro`.
- [x] Comunidad con asks pequeños: issues #10, #11, #12 abiertos; plantillas `sign-the-thesis`,
      `suggest-a-source` y `config.yml` (Discussions activas).
- [x] Compartir y citar: fila LinkedIn + copiar enlace junto a `Citation`; `CITATION.cff` y bloque
      BibTeX en `Citation.astro`; DOI si Jordi abre Zenodo.
- [x] RSS con contenido: un item por capítulo modificado usando `gitDate` de `lib/reading.ts`.
- [x] PDF v0.4.0: regenerar con `build/build_pdf.py` (ya lee la versión de `site.ts`), enlazar desde
      /about o /resources; hoja `@media print` mínima en `prose.css`.
- [~] Newsletter sin backend (formulario a Buttondown o similar) junto al RSS.
      Implementado pero oculto: Jordi decidió no abrir newsletter de momento (`site.newsletter.action` vacío).
- [x] Thesis en español en `/es/thesis` (solo la Thesis, no el BoK).

## 3. Flecos de los bloques ya publicados
- [~] Mapa de la disciplina en `/map` (change `discipline-map-nav-hero`, 2026-09-21): página, leyenda,
      índice por cluster y variante web del SVG en producción. Pendiente: renderizar el PNG vertical
      para LinkedIn con el kit `aige-media/linkedin` (`sync-map --publish` → `map-export.json` + PNG en
      `public/downloads/`); hasta entonces el bloque de descarga de `/map` se omite solo.
- [ ] Riesgo como tema explícito (acordado 2026-09-21): el BoK trata el riesgo como hilo transversal (~200
      menciones, solo dos encabezados: valor 7 y «Incident and risk repositories»). Pendiente una sección
      «Where risk management sits» (identificar → evaluar → tratar → monitorizar y las funciones Govern/Map/
      Measure/Manage del NIST AI RMF proyectadas sobre las cinco capas y los siete workflows) + término de
      glosario; entonces el mapa gana un nodo Risk propio en Foundations. Mientras tanto «Risk management»
      es hoja de Obligations en `/map` y en la infografía.
- [x] Seo/hreflang: la página /es/thesis usa `lang`/`locale`/`alternates` vía Doc→Base→Seo; el
      «Updated» de ChapterHeader ya se traduce (2026-09-23): `lang` llega hasta ChapterHeader y la
      línea de meta usa «Actualizado».
- [x] Feed RSS: título del feed y del `<link rel="alternate">` de Base.astro cambiados a
      «AI Governance Engineer: chapters and releases» (2026-09-23); ya no dice «Changelog».
- [x] `ObligationMatrix.astro` derivado de `frameworks.ts` (23 filas; ISO 42005 y EN 18286 quedan
      fuera porque ninguna obligación las referencia).
- [ ] Dogfooding (D8, sin hacer): publicar el AIBOM del sitio (CycloneDX en build),
      `/.well-known/security.txt` y un registro de evidencia JSON del build (versión, commit,
      resultados de a11y y lhci), enlazados desde /about.
- [ ] G3 (sin hacer): «Términos clave de este capítulo» bajo el At a glance y caja «Qué puedes hacer
      esta semana» al cierre de los capítulos 04-08.
- [ ] Figuras a mejorar si se quiere pulir: Framework Crosswalk (los radios se agrupan en un tronco;
      un re-maquetado hub-centro salió peor y se revirtió), Vendor Due-Diligence Gate (rutas
      enrevesadas), Runtime Guardrail y Kill Switch (aristas que cruzan regiones se ven tenues).
      Todas validan en `showcase` y están revisadas; es estética.
- [ ] `dist/bok/patterns.html` pesa ~470 KB con 17 SVG inline (Lighthouse pasa igualmente). Si
      baja el rendimiento, servir las figuras de patrón como `<img src="/diagrams/<id>.svg">`.
- [ ] `values-principles.svg` es una sola columna; a ≥834 px podría ir a dos columnas.
- [ ] Un `Co-Authored-By` del commit `897e6da` lleva una dirección noreply inventada para Aurélie
      (su autoría real está en su commit `8cd50c1`). No se reescribe historia; solo constancia.
- [ ] Quedan 5 carpetas `.claude/worktrees/agent-*` de sesiones anteriores (bloqueadas por procesos
      de node) y las ramas `worktree-agent-a1b64…`, `…aef56…` (ya fusionadas) y `…a429f…` (su delta se
      rehízo en main): borrar tras reiniciar o cerrar los node. Truco: quitar antes la junction `site/node_modules`
      con `cmd /c rmdir` y luego `rm -rf` de la carpeta + `git worktree prune`.
- [ ] Capturas regeneradas en `site/tests/__screenshots__` sin commitear (decisión: no se
      commitean las de otros; si se quiere fijar la línea base nueva, regenerar y revisar).

## 4. Segunda ronda de investigación (huecos que señaló el crítico)
- [ ] Posicionamiento frente a competidores y agregadores (plataformas comerciales, IAPP, OECD.AI,
      FPF, Stanford HAI) y oportunidades de enlace/colaboración.
- [ ] Auditoría de contenido de `/path` y de la home (nunca se revisaron como páginas).
- [ ] Ámbito regulatorio: GDPR Art. 22 con FRIA/DPIA, sectoriales (DORA, FDA).
- [x] China: cap. 08 (subsección + tabla + cruce agéntico TC260 3.0), catálogo del sitio, lecturas y glosario, 2026-09-20
- [ ] Propuestas para las otras audiencias del prefacio (security, privacy/DPO, MLOps, juristas).
- [ ] Cadencia de LinkedIn y motor de contenido corto («Field notes»). (OG/infografía para LinkedIn:
      resuelto vía la infografía vertical del mapa `/map`, kit `aige-media/linkedin`, 2026-09-21.)
- [ ] Extender diagramas a más secciones (hoy: patrones y aperturas).
- [ ] 14 propuestas brutas descartadas en la fusión del workflow sin evaluar (journal del run
      `wf_e00fdbee-4e2`).

## 5. Curación periódica
- [ ] Repetir trimestralmente el barrido de listas awesome (política en el plan, bloque E).
- [ ] Revisar el issue «Link rot report» que abrirá el workflow semanal.
- [ ] Renovar los marcadores «as of 2026-09-19» en cada pase de actualidad.
