# Tasks

Worktree `D:/Documents/aige-wt/b-reg-monitor`, rama `wt/b-reg-monitor`. La build solo se lanza con
`bash D:/Documents/aige-wt/build.sh`. No se ejecuta el workflow ni se crean incidencias desde aquí.

## 1. Fuentes

- [x] 1.1 Extraer con `git grep` las URL citadas en `bok/*.md` y `site/src/data/*.ts` y elegir las páginas oficiales de las que depende el sitio.
- [x] 1.2 Escribir `tools/reg-monitor/sources.json` (34 fuentes) con una pista de normalización por fuente, afinada con `--preview` y comprobada con dos capturas seguidas del mismo hash.
- [x] 1.3 Sustituir por su equivalente citado lo que no se cita tal cual (calendario del Service Desk, PDF del BoK de la IAPP, página CSRC de AI 800-1) y anotarlo en el handoff.

## 2. Monitor

- [x] 2.1 `lib/fetcher.mjs`: User-Agent del sitio, una petición por segundo, tiempo límite, dos reintentos con espera y `Retry-After`, tope de tamaño, peticiones condicionales para PDF y transporte `curl` opcional.
- [x] 2.2 `lib/normalise.mjs`: tokenizador sin dependencias, selectores simples, `select`/`drop`/`attributes`/`linkPattern`/`dropLines`/`strip`/`minChars`, marcadores para horas, fechas-hora y tokens, detección de desafíos (Cloudflare, AWS WAF), hash de PDF por bytes.
- [x] 2.3 `lib/diff.mjs`: diff de Myers por líneas con recorte de prefijo y sufijo, salida unificada, recorte de líneas largas alrededor de la primera diferencia y truncado.
- [x] 2.4 `lib/cites.mjs`: ficheros y líneas que citan la URL exacta con `git grep -F` y comprobación de límites.
- [x] 2.5 `lib/issue.mjs` y `lib/github.mjs`: cuerpo de incidencia y comentario, marcador por fuente, etiqueta `regulatory-change`, búsqueda de la incidencia abierta y aviso de fuente inaccesible.
- [x] 2.6 `lib/state.mjs` y `monitor.mjs`: estado por fuente escrito tras cada aviso, inicialización y rebaseline sin incidencia, tope de 10 avisos por ejecución, `--dry-run`, `--preview`, `--check`, `--list`, `--only`, resumen en `GITHUB_STEP_SUMMARY`.

## 3. Workflow

- [x] 3.1 `.github/workflows/reg-monitor.yml`: cron `17 6 * * *`, `workflow_dispatch` con `dry_run` (marcado) y `only`, permisos vacíos por defecto y `contents`/`issues: write` en el job, concurrencia, SHA fijados, `timeout-minutes: 15`, guardia de repositorio.
- [x] 3.2 Rama huérfana `reg-monitor-state` creada si falta y escrita con el `GITHUB_TOKEN`; guardado del estado aunque el paso del monitor falle.

## 4. Pruebas y documentación

- [x] 4.1 Pruebas `node --test` en `tools/reg-monitor/test/` (83 casos) ejecutadas en local, sin red.
- [x] 4.2 Ejecución en seco local contra las páginas reales con un estado de prueba en `D:/Documents/aige-wt/tmp/b-reg-monitor/`.
- [x] 4.3 `tools/reg-monitor/README.md`: funcionamiento, estado y por qué no va en `main`, cómo añadir una fuente, límites conocidos y fuentes numeradas.
- [x] 4.4 Registros compartidos: sección en `sources/SOURCES.md` y viñeta en `bok/CHANGELOG.md` bajo "Unreleased (v0.5.0)".

## 5. Verificación y entrega

- [x] 5.1 Ejecutar `bash D:/Documents/aige-wt/build.sh` hasta que salga con código 0.
- [x] 5.2 Ejecutar `openspec validate regulatory-monitor --strict` hasta que pase.
- [x] 5.3 Escribir `D:/Documents/aige-wt/handoffs/b-reg-monitor.json` (enlace desde `/about/methodology`, notas, pruebas).
- [x] 5.4 Commits por ruta explícita con mensajes convencionales en español.
