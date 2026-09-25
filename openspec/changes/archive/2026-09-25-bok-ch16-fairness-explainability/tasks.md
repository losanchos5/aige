# Tasks

Rama `wt/c16-fairness-explainability` en el worktree `D:/Documents/aige-wt/c16-fairness-explainability`.
La integración (merge, ficheros compartidos, SOURCES.md) la hace el orquestador a partir del handoff.

## 1. Preparación

- [x] 1.1 Leer `STYLEGUIDE.md`, `bok/01-definition.md`, `bok/04-the-stack.md`, `bok/05-patterns.md`
  (anclas `#pattern-*`), `bok/06-the-role.md`, `bok/08-regulatory-map.md` y `site/src/lib/remark-callouts.ts`.
- [x] 1.2 Revisar la lista privada de temas (secciones I.A.4, III.B.3 y Dominio IV) solo como
  lista de comprobación, sin copiar su redacción.

## 2. Verificación de fuentes

- [x] 2.1 Verificar en fuente primaria los textos legales: AI Act arts. 4a, 10, 13, 15(4), 16(l),
  26(11), 86 y anexo III; Reglamento (UE) 2026/1744; RGPD arts. 15(1)(h) y 22; Directiva 2000/43/CE;
  29 CFR 1607.4(D); 12 CFR 1002.9 y su comentario oficial; Data (Use and Access) Act 2025 s. 80.
- [x] 2.2 Verificar estado a 2026-09-24: opinión OLC del DOJ (9 jun 2026), circulares CFPB retiradas
  (12 may 2025), NYC LL144 (FAQ del DCWP), guía ICO en revisión, enmiendas al RGPD no adoptadas.
- [x] 2.3 Verificar en arXiv, PMLR o PubMed los artículos citados (Kleinberg, Chouldechova, Hardt,
  Dwork, Kusner, SHAP, LIME, gradientes integrados, Wachter, Rudin, Slack, Adebayo, Turpin, Sharkey,
  Liu, Doshi-Velez, Suresh, Obermeyer, Gender Shades, Kearns, Model Cards, AIF360, Fairlearn,
  Aequitas) y los documentos NIST (AI 100-1, SP 1270, IR 8312).
- [x] 2.4 Marcar «(verify)» lo no confirmado: fecha práctica del art. 86 tras el Omnibus, estado de
  ISO/IEC TS 6254, texto vigente del RGPD si cambian las enmiendas.

## 3. Redacción del capítulo

- [x] 3.1 Escribir la mitad de equidad (ciclo de vida, proxies y art. 4a, trato e impacto dispar,
  cuatro quintos y LL144, métricas, imposibilidad, interseccionalidad, elección de métrica,
  mitigación, monitorización).
- [x] 3.2 Escribir la mitad de explicabilidad (definiciones, interpretable frente a post-hoc,
  técnicas, LLM y RAG, ganchos legales, pruebas de calidad, accesibilidad, registro de explicación).
- [x] 3.3 Escribir la sección de capas del stack con patrones existentes, condiciones de gate, caja
  «In practice (illustrative)», línea «Maps to», «What you can do this week» y `## Sources`.
- [x] 3.4 Revisar estilo: sin U+2014, inglés británico, prosa a ~100 columnas, rangos con raya corta,
  «as of 2026-09-24» en afirmaciones con fecha.

## 4. Verificación y entrega

- [x] 4.1 Ejecutar `bash D:/Documents/aige-wt/build.sh` y comprobar salida 0 (astro check, build,
  content-lint, check-links, pagefind).
- [x] 4.2 Ejecutar `openspec validate bok-ch16-fairness-explainability --strict` hasta que pase.
- [x] 4.3 Escribir `D:/Documents/aige-wt/handoffs/c16-fairness-explainability.json` (JSON válido) con
  resumen, glance, glosario, obligaciones, crosswalk, figuras, patrones pendientes, enlaces cruzados,
  lista de lectura, rutas y notas, más las filas de `sources/SOURCES.md`.
- [x] 4.4 Commit por ruta explícita con mensaje convencional en español, sin atribuciones y sin
  saltarse el hook de pre-commit.
