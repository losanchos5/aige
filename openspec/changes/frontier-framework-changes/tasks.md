# Tasks

## 1. Fuentes y comparación (fuera del repo, en `D:/Documents/aige-wt/handoffs/`)

- [ ] 1.1 Recalcular el SHA-256 de los 17 ficheros de `tracker-src/` y comprobar que cada URL oficial responde hoy; verificar con una tabla `tracker-versions.md` de 15 versiones cuyos hashes coinciden con `index.md`
- [ ] 1.2 Reunir del manifiesto del corpus "Silent Revision" las resubidas bajo la misma etiqueta (Anthropic 2.0 y 2.1, OpenAI v2, FSF 2.0) con hash, fecha y captura; verificar que cada fila cita la línea del manifiesto de la que sale
- [ ] 1.3 Comparar por secciones RSP 3.3 a 3.4, Preparedness Framework beta a v2 y FSF 3.0 a 3.1; verificar con un fichero `tracker-candidates-<transición>.md` por transición, con cita, página y tipo de cada cambio candidato
- [ ] 1.4 Comparar RSP 3.0 a 3.1, 3.1 a 3.2 y 3.2 a 3.3 con sus PDF de cambios marcados; verificar con sus tres ficheros de candidatos

## 2. Datos

- [ ] 2.1 Crear `site/src/data/frontier-changes.ts` con los tipos de `design.md` D2, las fuentes, las 15 versiones y sus ficheros; verificar que `astro check` pasa
- [ ] 2.2 Añadir las 12 transiciones con su estado de cobertura, sus notas de versión y los análisis ajenos; verificar que cada marco tiene una transición por cada par de versiones consecutivas
- [ ] 2.3 Añadir los cambios de las transiciones cubiertas a partir de los candidatos; verificar que cada cambio tiene sus citas según el tipo y al menos una dimensión
- [ ] 2.4 Escribir `frontierChangeProblems()` con las invariantes de D2 y la lista vetada de D4; verificar rompiendo un dato a propósito, viendo que la build falla con el id del cambio, y deshaciendo el cambio
- [ ] 2.5 Mover a una función del módulo de datos el objeto que monta `frontier-safety-crosswalk.json.ts`; verificar que el JSON generado es idéntico byte a byte al de antes

## 3. Página, exports y registros

- [ ] 3.1 Crear `site/src/pages/resources/frontier-framework-changes.astro` con los componentes del crosswalk (`Base`, `PageHero`, `SourceList`, `Citation`, `Callout`): última comprobación, versiones por marco, cambios por transición con anclas, método, límites, fuentes, descarga y cita; verificar que la página se construye y que lanza si `frontierChangeProblems()` no está vacío
- [ ] 3.2 Crear los exports `.json.ts` y `.csv.ts` con el mismo sobre que el crosswalk; verificar que los recuentos coinciden con el módulo de datos
- [ ] 3.3 Registrar la página en `SOURCE_BY_PATH`, `nav.ts`, el pie, `llms.txt.ts`, las tarjetas OG y `resources/index.astro`; verificar que pasan `nav.spec.ts`, `geo.spec.ts` y `resources.spec.ts` con la lista del índice actualizada
- [ ] 3.4 Añadir a `rss.xml.ts` una entrada por transición cubierta según D9; verificar que `/rss.xml` las contiene y que pasa `block-f-feed.spec.ts`
- [ ] 3.5 Enlazar el historial desde la sección de versiones del crosswalk y mostrar el aviso de versión superada cuando proceda; verificar que hoy no aparece aviso y que aparece al añadir en local una versión ficticia posterior, que luego se retira

## 4. API

- [ ] 4.1 Añadir `frontier-crosswalk` y `frontier-changes` a `datasets` en `site/src/lib/api.ts` con sus esquemas; verificar que `api.spec.ts` pasa y que `/api/v1/index.json` lista 18 conjuntos

## 5. Monitor

- [ ] 5.1 Añadir a `tools/reg-monitor/sources.json` las fuentes de D10, con selectores acotados y la nota de OpenAI si su página no es accesible; verificar con `node tools/reg-monitor/monitor.mjs --check`
- [ ] 5.2 Añadir las URL nuevas a la lista de URL obligatorias de `tools/reg-monitor/test/sources.test.mjs`; verificar con `node --test tools/reg-monitor/test/*.test.mjs`
- [ ] 5.3 Comprobar si la URL del PDF de RSP 3.4 que guarda el crosswalk responde y corregirla en `frontier-crosswalk.ts` si no; verificar con una petición a la URL final

## 6. Verificación

- [ ] 6.1 Verificación adversarial, por un revisor distinto del autor, de cada cambio, cita, página, hash, fecha y valor de divulgación contra los PDF; verificar con un informe `tracker-factcheck.md` sin discrepancias abiertas
- [ ] 6.2 Escribir `site/tests/frontier-changes.spec.ts` según D11, pasando antes la puerta de `test-audit`; verificar que pasa
- [ ] 6.3 Construir con `bash D:/Documents/aige-wt/build.sh` y pasar las specs afectadas (`frontier-changes`, `frontier-crosswalk`, `api`, `resources`, `nav`, `geo`, `seo-schema`, `block-f-feed`, `infra`) con un `PW_PORT` propio; verificar que todas pasan y que no queda ninguna captura regenerada en `git status`
- [ ] 6.4 Revisión de código del diff completo; verificar que no quedan hallazgos críticos ni altos abiertos

## 7. Entrega

- [ ] 7.1 Abrir el PR y esperar la CI; verificar que termina en verde
- [ ] 7.2 Tras el merge (lo hace Jordi), comprobar en producción la página, el JSON, el CSV, los dos conjuntos de la API y las entradas de `/rss.xml`; verificar con respuestas 200 y los recuentos esperados
