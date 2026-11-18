# Design

## Context

Ver `proposal.md` (Why). Estado de partida en origin/main `6f58743`:

- `site/src/pages/for/certifications.astro` tiene los datos de sus cinco esquemas en la propia
  página, con fuentes numeradas (`Source[]`, `cite(n)`, `ol.sources`). Orden: How to read, Two kinds
  of certificate (`figure#certificate-lanes`), At a glance (tabla de 5 filas), una sección por
  esquema, What a certificate shows, Sources.
- Pruebas que fijan la página: `page-visuals-w1e.spec.ts` (`#certificate-lanes` bajo "Two kinds of
  certificate", chips `.cert-standard`, `ol.sources`), `seo-titles.spec.ts` (prefijo del título),
  `seo-links.spec.ts` y `page-visuals-t3-catalogues.spec.ts`.
- No existe una primitiva de gráfico para cajas de texto en rejilla por tema y franja (`heatGrid` y
  `lanes` llevan números o marcas, no texto).
- El patrón "panel sobre pintura" existe: `Painting.astro` y las clases `.mat`, `.paint`, `.credit`
  de `site/src/styles/effects.css`.
- `competencies.astro` muestra el patrón de comprobación de datos de la casa: una función
  `...Problems()` del módulo de datos que la página llama al compilar.
- `.github/workflows/link-rot.yml` ya pasa lychee, sin bloquear, sobre `site/src/data/*.ts`.
- Hay plantillas de issue `report-an-error.yml` y `suggest-a-source.yml`; la spec `contribute-route`
  cuenta las vías de contribución.
- Investigación y datos de partida, fuera del repo, en
  `D:/Documents/aige-wt/handoffs/competencies-visual/`: `certs.json` (89 entradas),
  `check-certs.mjs` y tres hojas con la URL de cada hecho (`research-governance-bodies.md`,
  `research-standards-security.md`, `research-vendor-ai.md`).
- Mockup aprobado (variante "columns"): `D:/Documents/aige-media/mockups/certification-map/`
  (`variant-columns.html`, `certmap.css`, `build.mjs`, `copy.md`, `shots/`).

## Goals / Non-Goals

**Goals:**

- Llevar la variante "columns" del mockup a `/for/certifications` con los tokens y componentes del
  sitio, con los datos en un único módulo que la compilación valida.
- Que ningún hecho llegue al sitio sin haber sido abierto dos veces en la fuente del emisor
  (investigación y revisión independiente).

**Non-Goals:**

- Conjunto `certifications` en la API abierta o en el servidor MCP (posible continuación).
- Vigilar las páginas de los emisores con `tools/reg-monitor`: cada fuente necesita sus ajustes y
  varias bloquean clientes automáticos. Se cubre con `link-rot`, la fecha visible y las
  correcciones.
- Reescribir las secciones por esquema, la figura "Two kinds of certificate" o la tabla "At a
  glance".
- Flechas entre credenciales: solo una del mapa exige otra del mapa; el resto exige credenciales
  que no son de IA y se nombran en texto.
- Una plantilla de issue nueva o una vía nueva en `/contribute`.
- Credenciales de organizaciones o productos (certificación ISO/IEC 42001 de una empresa, HITRUST,
  AIUC-1).
- La variante "rows" del mockup.

## Decisions

1. **Módulo de datos `site/src/data/certifications.ts`.** Un array tipado con la forma de
   `certs.json` (`id`, `issuer`, `name`, `acronym`, `type`, `typeNote`, `status`, `statusNote`,
   `lane`, `band`, `requirementText`, `requires`, `issuerLevel`, `price`, `governanceDomain`, `url`,
   `asOf`, `unverified`, `scope`) más `short` opcional (el texto de la caja cuando no hay
   acrónimo), las etiquetas de temas y franjas, y `certificationProblems(today)`.
   TypeScript y no JSON porque es el patrón del resto de `site/src/data` y `link-rot` ya lo cubre.
2. **Comprobación al compilar.** La página llama a `certificationProblems()` y falla si devuelve
   algo: ids únicos, `url` con https, `asOf` con fecha ISO no futura, valores dentro de las listas
   cerradas, `requires` no vacío cuando la franja es "credencial previa", `requirementText` de 140
   caracteres como máximo, ninguna raya (U+2014) y ninguna entrada con `status` y `name` sin
   comprobar a la vez.
3. **Segunda lectura antes de entrar al repo.** Un revisor independiente abre la URL de cada entrada
   y contrasta cada campo relleno. Lo que no coincide se corrige; lo que no se puede abrir (páginas
   que bloquean clientes automáticos, como pmi.org o eccouncil.org) queda en `unverified` o lo abre
   Jordi en su navegador. Las notas de estado solo dicen lo que dice el emisor: se quitan las frases
   que vienen de resúmenes de buscador (por ejemplo la nota de CRAGE) y la deducción de "anunciada"
   a partir de un enlace "coming-soon" (PECB EU AI Governance Professional).
4. **Sin las cinco entradas vacías.** `oracle-oci-ai-foundations`, `oracle-oci-genai-professional`,
   `ibm-watsonx-genai-engineer-associate`, `ibm-ai-v1-associate` y
   `salesforce-agentforce-specialist` no entran. Quedan 84: 51 en el mapa y 33 de proveedores.
5. **Estructura del mapa.** Una sección por tema con su encabezado y una lista por franja no vacía;
   las franjas se alinean entre temas con subgrid. El encabezado de franja se ve en el primer tema y
   queda oculto a la vista (no a los lectores de pantalla) en los demás. Por debajo de 900 px los
   temas se apilan y cada uno enseña sus encabezados de franja. Alternativa descartada: tabla de
   temas por franjas (variante "rows"), porque la franja "nada declarado" tiene 30 de 51 entradas y
   aprieta las otras tres.
6. **Caja de credencial.** Un único enlace a `#cert-<id>`: acrónimo o nombre corto, emisor, borde
   continuo o discontinuo según el tipo, etiqueta de estado, línea "requires" y etiqueta
   UNVERIFIED cuando `unverified` contiene `status` o `name`. El tipo va también en texto oculto a
   la vista, para que no dependa solo del borde.
7. **Fecha y antigüedad.** La fecha del mapa es la `asOf` más reciente. La marca de "no revisada"
   se calcula al compilar con un umbral de doce meses; la función recibe la fecha como parámetro
   para poder probarla.
8. **Orden de la página.** How to read; el mapa (`#certification-map`); proveedores
   (`#vendor-certifications`); Two kinds of certificate; At a glance; secciones por esquema; What a
   certificate shows; hechos por credencial (`#credential-facts`, una tabla por tema); Sources. Los
   hechos van casi al final porque son 84 filas y se llega a ellas desde las cajas.
9. **Correcciones.** Enlaces a la plantilla `report-an-error` y al fichero de datos en GitHub, más
   una sección en `CONTRIBUTING.md` con los campos y la regla de fuente primaria.
10. **Pintura.** La del mockup, "Morning on the Seine near Giverny" (`morning-seine-giverny`).
11. **Texto.** Todo el texto nuevo sale de `copy.md` del mockup y Jordi lo confirma en el PR. El
    resumen de la página dice hoy "facts checked on 24 Sep 2026": esa fecha vale para los cinco
    esquemas, y el mapa enseña la suya.

## Risks / Trade-offs

- [Los hechos caducan: precios, betas y retiradas cambian en semanas] → fecha por fila, marca a los
  doce meses, `link-rot` semanal y correcciones abiertas. No hay puerta que rompa CI por fecha.
- [El mapa se lee como ranking o como recomendación] → ejes tomados de hechos del emisor, frase de
  lectura junto al mapa, ningún nivel propio, proveedores sin escala común.
- [Marcas registradas de los emisores] → nota de no afiliación ampliada a todos los emisores
  nombrados; sin logotipos.
- [Páginas de emisores que bloquean la lectura automática] → el dato queda sin comprobar y a la
  vista, o lo abre Jordi; nunca se rellena desde terceros.
- [Las certificaciones de Anthropic solo están abiertas a personal de organizaciones socias] → el
  requisito lo dice en su fila; si la revisión no lo confirma en la página del emisor, salen.
- [Los PR #114 y #115 tocan `llms.txt.ts` y otras páginas] → este cambio no los edita salvo que
  describan el contenido de `/for/certifications`; si lo hacen, se rebasa sobre main.
- [Esta máquina se queda sin memoria con una compilación más Playwright] → se sube la rama y se lee
  CI; las capturas de la página real las toma la sesión principal con un solo `astro dev`.

## Open Questions

- Si la tabla "At a glance" de cinco filas sigue teniendo sentido junto al mapa. No cambia este
  cambio: se queda, y Jordi decide después de ver la página real.
