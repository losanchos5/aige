# Tasks

Todas las rutas son relativas al worktree `D:\Documents\aige-china`. El texto literal de filas,
fuentes, entradas y definiciones está en `brief.md` §3 y §4; los hechos verificados en `brief.md`
§1. Bloques A, B y C son independientes y corren en paralelo (subagentes `implementador`, Opus 4.8);
el bloque D va después. Los subagentes no hacen commit.

## 1. Bloque A — capítulo 08 y fuentes

- [x] 1.1 Añadir la subsección `### China` a `bok/08-regulatory-map.md` tras `### United Kingdom` (prosa de 12–18 líneas, tabla de 7 filas con `Status (as of 2026-09-20)`, tabla de cruce TC260 App. 2 × OWASP Agentic [16] × NIST agents [29], cierre «Mappings are illustrative, not a claim of conformity»), confirmando cada nombre ASI contra la fuente [16]; verificar con `grep -c "^| China — " bok/08-regulatory-map.md` = 7
- [x] 1.2 Añadir el bullet «China's framework does not cross-reference the Western instruments» en `## What is NOT harmonised yet` citando [42]; verificar con `grep -n "cross-reference the Western" bok/08-regulatory-map.md`
- [x] 1.3 Añadir las fuentes [41]–[51] a `## Sources` del capítulo (formato §6, títulos chinos entre paréntesis, tags 10 `primary` + [51] `reported`) y comprobar que la única frase que usa [51] contiene «reported»; verificar con `grep -c "^\[4[1-9]\]\|^\[5[01]\]" bok/08-regulatory-map.md` = 11
- [x] 1.4 Añadir las filas 41–51 a la sección `### bok/08-regulatory-map.md` de `sources/SOURCES.md` (mismas columnas, «Used in» = `Reg. map (China)`), editando solo esa sección con `Edit` tras releer; verificar con `grep -c "^| 4[1-9] \|^| 5[01] " sources/SOURCES.md` ≥ 11 dentro de esa sección
- [x] 1.5 Añadir entrada en `bok/CHANGELOG.md` con fecha 2026-09-20 siguiendo el formato existente; verificar con `grep -n "China" bok/CHANGELOG.md`

## 2. Bloque B — lista de lecturas y glosario

- [x] 2.1 Añadir los 7 bullets de `brief.md` §3.3 a «Regulation and standards» en `bok/10-reading-list.md` con la gramática de `parseAnnotatedList`; si `sources/SOURCES.md` tiene filas espejo en `### bok/10-reading-list.md`, añadir las correspondientes; verificar con `node -e` o el test de reading list de `site/tests/data.spec.ts` (`npx playwright test tests/data.spec.ts --project=default`)
- [x] 2.2 Añadir `**CAC (Cyberspace Administration of China).**` y `**TC260.**` a `bok/09-glossary.md` en orden alfabético con citas `[n]` a continuación de la última del capítulo (hoy [17]) y filas espejo en `### bok/09-glossary.md` de `sources/SOURCES.md`; verificar con el test «glossary has 50+ terms» y `grep -n "^\*\*CAC\|^\*\*TC260" bok/09-glossary.md`
- [x] 2.3 Comprobar que `site/src/lib/rehype-glossary.ts` solo enlaza términos por palabra entera (buscar `\b` o equivalente); si no, usar «Cyberspace Administration of China (CAC)» como término; verificar construyendo un capítulo con «CAC» y una palabra que lo contenga, o leyendo la regex

## 3. Bloque C — catálogo del sitio y matriz

- [x] 3.1 Añadir las 6 entradas `cn-*` a `frameworks[]` en `site/src/data/frameworks.ts` (tras `sg-genai-framework`), con `issuer` terminado en «(China)» y URL https según `brief.md` §4.1; verificar con `npx astro check` (desde `site/`) sin errores
- [x] 3.2 Añadir `const CHINA_ANCHOR = 'china'` y las 7 obligaciones del grupo `China` en `obligations[]` (textos, artefactos y `layerN` de `brief.md` §3.1 punto 4 / §4.1), tras el grupo `// Other jurisdictions`; verificar con `npx playwright test tests/data.spec.ts --project=default` (anchor exige que la tarea 1.1 exista; si A aún no ha terminado, verificar al final del bloque D)
- [x] 3.3 Añadir en `site/src/components/ObligationMatrix.astro` la rama `framework === 'China'` en `resolveFwId` (orden: algorithmic recommendation → deep synthesis → `/45654/` → generative ai services → `/45438|labelling/i` → `/tc260|framework 3\.0/i`) y `issuer.endsWith('(China)')` → `'Asia-Pacific'` en `bandOf`; replicar literalmente la rama en la copia oráculo de `site/tests/v3.spec.ts`; verificar con `npx playwright test tests/v3.spec.ts --project=default` tras `npm run build`
- [x] 3.4 `npm run build` (desde `site/`) en verde; si `tests/resources.spec.ts` falla solo por el literal «25 frameworks · 61 obligations», no editarlo (lo reescribe la sesión paralela) y anotarlo en el informe; verificar con la salida del build

## 4. Bloque D — verificación, baselines y cierre

- [x] 4.1 Abrir ventana: parar el `astro preview` viejo en el puerto 4321 (PID 15604) y confirmar que el puerto queda libre (`netstat -ano | findstr :4321`); Fable avisa a la sesión paralela antes
- [x] 4.2 `npm run build` y `npm test` (proyecto default) en verde desde `site/` del worktree; verificar con la salida
- [x] 4.3 Regenerar solo las baselines `frameworks-*`, `reading-list-*` y `glossary-*` en `site/tests/__screenshots__/{E,G}/` (`npx playwright test --project=visual --update-snapshots -g "<patrón>"` según `screenshots.spec.ts`) y dejar `npm run test:visual` en verde; verificar con `git status --short site/tests/__screenshots__` (solo esos nombres)
- [x] 4.4 `npm run test:a11y` en verde (sin texto con opacidad reducida) y `npm run lhci` en verde, en ese orden; verificar con la salida
- [x] 4.5 Retirar `.github/ISSUE_DRAFTS/01-china-regulatory-rows.md` y `03-reading-list-apac-sources.md` (actualizando un índice si existe) y editar la línea 67 de `PENDIENTE.md` quitando «China (solo fuentes secundarias encontradas), »; verificar con `git status --short` y `grep -n "China" PENDIENTE.md`
- [x] 4.6 Revisión `code-reviewer` (sonnet) del diff de `site/`; verificar que no quedan hallazgos CRITICAL/HIGH
- [x] 4.7 Fable: comprobar `git diff --stat`, que `dist/resources/frameworks/index.html` contiene las 6 filas chinas en Asia-Pacific y que THESIS no cambia; commits por tipo (docs/feat/test/chore) sin atribución; avisar «window closed» a la sesión paralela y enviarle los 7 textos `obligation` finales
