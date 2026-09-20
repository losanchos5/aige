# Pendiente tras la v0.4.0 (escrito 2026-09-20 para la próxima sesión)

Contexto rápido: el plan aprobado está en
`C:\Users\Jordi\.claude\plans\como-podemos-mejorar-la-keen-globe.md`. Bloques 0, A, B, C, D, E y G
están en producción (`main` en `20fc4ce`, deploy automático con smoke). Memorias útiles:
`aige-parallel-worktree-agents`, `aige-site-test-order`, `aige-diagrams-archify-pipeline`.
Reglas de trabajo: Fable planifica, revisa figuras y verifica; subagentes `implementador`
(Opus 4.8) implementan; un build por worktree, tests una sola vez en `main`, `lhci` el último.

## 1. Acciones de Jordi (no las puede hacer Claude)
- [ ] Crear el secret de repositorio `CF_BEACON_TOKEN` (token de Cloudflare Web Analytics) para
      activar la analítica sin cookies; el siguiente deploy la inyecta.
- [ ] Decidir sobre `videos/` y `A new role is appearing in every co.txt` en la raíz (mover fuera
      del repo o versionar; hoy siguen sin versionar).
- [ ] Activar GitHub Discussions en `losanchos5/aige` (ajuste del repo, ver bloque F).
- [ ] Cuenta Zenodo si se quiere DOI (bloque F).

## 2. Bloque F — Crecimiento y rigor (sin empezar)
- [ ] JSON-LD acotado: `Book` + `TechArticle` en `/bok/[slug]` (pasar `jsonLd` por `Doc.astro`),
      `Person` mínimo con `authors` de `site.ts` (sin jobTitle/worksFor), `BreadcrumbList` desde
      `chapters.ts`; `og:locale` en `Seo.astro`; `site.webmanifest`.
- [ ] Firma sin fricción: `thesis.astro` de `blob/` a `edit/main/bok/CONTRIBUTORS.md`; Issue Form
      `.github/ISSUE_TEMPLATE/sign-the-thesis.yml`; extraer `SignNote.astro` y mostrarlo también en
      `/bok/index.astro`.
- [ ] Comunidad con asks pequeños: 2-3 issues «help wanted» reales (filas internacionales
      pendientes, términos de glosario, fuentes) y plantilla «suggest a source».
- [ ] Compartir y citar: fila LinkedIn + copiar enlace junto a `Citation`; `CITATION.cff` y bloque
      BibTeX en `Citation.astro`; DOI si Jordi abre Zenodo.
- [ ] RSS con contenido: un item por capítulo modificado usando `gitDate` de `lib/reading.ts`.
- [ ] PDF v0.4.0: regenerar con `build/build_pdf.py` (ya lee la versión de `site.ts`), enlazar desde
      /about o /resources; hoja `@media print` mínima en `prose.css`.
- [ ] Newsletter sin backend (formulario a Buttondown o similar) junto al RSS.
- [ ] Thesis en español en `/es/thesis` (solo la Thesis, no el BoK).

## 3. Flecos de los bloques ya publicados
- [ ] `ObligationMatrix.astro`: su mapa de ids (`resolveFwId`/`shortName`/`band`) es fijo y no
      muestra los marcos nuevos de D1 (ISO 42006, ISO 23894, NIST nuevos, leyes estatales, «Other
      jurisdictions»). Sí aparecen en FrameworkTable, ObligationTable y en los exports CSV/JSON.
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
- [ ] Ramas `worktree-agent-*` (7) y worktrees bajo `.claude/worktrees/` sin borrar del todo:
      `git worktree prune` y `git branch -D worktree-agent-*` cuando no haya procesos de node.
- [ ] Capturas regeneradas en `site/tests/__screenshots__` sin commitear (decisión: no se
      commitean las de otros; si se quiere fijar la línea base nueva, regenerar y revisar).

## 4. Segunda ronda de investigación (huecos que señaló el crítico)
- [ ] Posicionamiento frente a competidores y agregadores (plataformas comerciales, IAPP, OECD.AI,
      FPF, Stanford HAI) y oportunidades de enlace/colaboración.
- [ ] Auditoría de contenido de `/path` y de la home (nunca se revisaron como páginas).
- [ ] Ámbito regulatorio: China (solo fuentes secundarias encontradas), GDPR Art. 22 con FRIA/DPIA,
      sectoriales (DORA, FDA).
- [ ] Propuestas para las otras audiencias del prefacio (security, privacy/DPO, MLOps, juristas).
- [ ] Cadencia de LinkedIn y motor de contenido corto («Field notes»); optimizar OG para LinkedIn.
- [ ] Extender diagramas a más secciones (hoy: patrones y aperturas).
- [ ] 14 propuestas brutas descartadas en la fusión del workflow sin evaluar (journal del run
      `wf_e00fdbee-4e2`).

## 5. Curación periódica
- [ ] Repetir trimestralmente el barrido de listas awesome (política en el plan, bloque E).
- [ ] Revisar el issue «Link rot report» que abrirá el workflow semanal.
- [ ] Renovar los marcadores «as of 2026-09-19» en cada pase de actualidad.
