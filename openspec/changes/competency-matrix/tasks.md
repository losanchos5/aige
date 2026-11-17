# Tasks

## 1. Datos y contenido

- [x] 1.1 Crear `site/src/data/competencies.ts` con los tipos de `design.md` D2, los cinco peldaños y `competencyProblems()`; verificar que `astro check` pasa y que cada invariante salta con un dato malo temporal que luego se retira
- [x] 1.2 Redactar las 28 celdas (siete flujos por cuatro peldaños) y la banda de función según D4 y D9, cada una con evidencia y de uno a cuatro enlaces; verificar que `competencyProblems()` devuelve una lista vacía
- [x] 1.3 Revisión de contenido por un revisor distinto del redactor: cada celda contra la escalera del capítulo 06 y contra el recurso que enlaza, y solapes entre peldaños; verificar con un informe sin discrepancias abiertas

## 2. Página y registros

- [x] 2.1 Crear `site/src/pages/role/competencies.astro` con resumen citable, tabla flujo por peldaño, detalle por flujo con anclas, banda de función, uso, método y límites, y cita; verificar que la página se construye y que lanza si `competencyProblems()` no está vacío
- [x] 2.2 Registrar la página en `SOURCE_BY_PATH`, `nav.ts`, `llms.txt.ts` y las tarjetas OG, con datos estructurados; verificar que pasan `nav.spec.ts`, `geo.spec.ts` y `seo-infra.spec.ts`
- [x] 2.3 Enlazar la matriz desde la sección de habilidades de `/role` y desde la introducción de `/path`; verificar que pasan `stack-role.spec.ts`, `seo-role-next.spec.ts` y `path.spec.ts`

## 3. API

- [x] 3.1 Añadir el conjunto `competencies` a `datasets` en `site/src/lib/api.ts` con su esquema y el aviso de modelo del autor; verificar que `api.spec.ts` pasa y que el catálogo lista un conjunto más

## 4. Tests y verificación

- [x] 4.1 Añadir a `site/tests/data.spec.ts` la prueba que compara los peldaños con la lista de "The career ladder" del capítulo 06, pasando antes la puerta de `test-audit`; verificar que pasa y que falla al cambiar un nombre en local
- [x] 4.2 Escribir `site/tests/competencies.spec.ts` según D11, pasando antes la puerta de `test-audit`; verificar que pasa
- [x] 4.3 Construir con `bash D:/Documents/aige-wt/build.sh` y pasar las specs afectadas (`competencies`, `data`, `api`, `nav`, `geo`, `seo-infra`, `stack-role`, `seo-role-next`, `path`, `infra`), o dejarlas a la CI del PR si la máquina no tiene memoria; verificar que todas pasan y que no queda ninguna captura regenerada en `git status`
- [x] 4.4 Revisión de código del diff completo; verificar que no quedan hallazgos críticos ni altos abiertos

## 5. Entrega

- [ ] 5.1 Abrir el PR con la tabla de celdas en el cuerpo para que Jordi lea y firme el contenido; verificar que la CI termina en verde y que Jordi da su visto bueno al contenido
- [ ] 5.2 Tras el merge, comprobar en producción la página, el conjunto de la API y los enlaces desde `/role` y `/path`; verificar con respuestas 200 y 28 celdas
