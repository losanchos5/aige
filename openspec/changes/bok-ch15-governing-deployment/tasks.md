# Tasks

Worktree `D:/Documents/aige-wt/c15-governing-deployment`, rama `wt/c15-governing-deployment`. Build
solo con `bash D:/Documents/aige-wt/build.sh`; sin tests, sin `npm install`, sin tocar ficheros
compartidos (van al handoff).

## 1. Investigación y fuentes

- [x] 1.1 Leer `STYLEGUIDE.md`, `bok/01`, `bok/04`, `bok/05`, `bok/06`, `bok/08` y `remark-callouts.ts` para usar el modelo de la casa (cinco capas, patrones, siete flujos de trabajo).
- [x] 1.2 Revisar la lista privada de temas del dominio de despliegue (solo como lista de temas, sin copiar redacción ni mencionarla en el contenido público).
- [x] 1.3 Verificar en línea las fuentes (AI Act Art. 3, 5, 13, 18, 19, 20, 25, 26, 27, 79, 86 y Anexo XI; guías y FAQ GPAI de la Comisión; MCC-AI; NIST AI RMF Playbook; licencias; DORA; NIS2; GDPR; energía; benchmarks) y marcar "(verify)" lo no confirmado.

## 2. Datos y página

- [x] 2.1 Crear `site/src/data/deployment-options.ts` (opciones por dimensión, controles por capa, matriz 5 × 6).
- [x] 2.2 Crear `site/src/data/contracts.ts` (18 cláusulas, 6 familias de licencia, referencias tipadas).
- [x] 2.3 Crear `site/src/pages/resources/contracts.astro` con el patrón de `frameworks.astro` (PageHero, Callout, tablas semánticas, tarjetas en móvil).
- [x] 2.4 Añadir `/resources/contracts` a `SOURCE_BY_PATH` en `site/astro.config.ts`.

## 3. Capítulo 15

- [x] 3.1 Escribir `bok/15-governing-deployment.md` con las secciones del alcance, recuadros "In practice" y "Example (illustrative)", "Maps to", "What you can do this week" y "Sources" numeradas.
- [x] 3.2 Generar las tablas del capítulo desde los módulos de datos para que coincidan con ellos.
- [x] 3.3 Comprobar que no hay rayas largas, palabras vetadas ni citas sin fuente.

## 4. Verificación y entrega

- [x] 4.1 Validar el cambio con `openspec validate bok-ch15-governing-deployment --strict`.
- [x] 4.2 Ejecutar `bash D:/Documents/aige-wt/build.sh` hasta que termine con código 0.
- [x] 4.3 Escribir el handoff para el orquestador (JSON válido, fuera del repo).
- [x] 4.4 Confirmar por rutas explícitas, con mensaje convencional en español y sin `--no-verify`.
