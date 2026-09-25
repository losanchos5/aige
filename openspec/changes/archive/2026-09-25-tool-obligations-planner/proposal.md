# Proposal

## Why

El registro de obligaciones ya tiene lo que un equipo necesita para planificar el AI Act después
del Digital Omnibus: cada fila de la UE lleva un id estable, el titular del deber, la fecha ISO en
que empieza a aplicarse, su estado, los hitos posteriores (Anexo I, autoridades públicas), las
clases de sistema a las que se aplica, el artefacto que la evidencia, la capa y los patrones. Pero
para saber qué le toca a una organización concreta y cuándo, el lector tiene que filtrar a mano 27
filas, cruzar su rol (proveedor, responsable del despliegue, importador, distribuidor, representante
autorizado, proveedor de GPAI) con la clase del sistema y recalcular la fecha que corresponde a su
clase (Anexo III 2027-12-02, Anexo I 2028-08-02). El `dutyHolder` es texto libre y los deberes de
importadores, distribuidores y representantes autorizados (Arts. 22, 23, 24 y 54) no son filas.

Además, la página de cada obligación enumera los datos pero no enseña la cadena que el libro
defiende: cláusula, titular, fecha, artefacto, capa y registro de evidencia; y comparte una tarjeta
Open Graph genérica. Y nada impide que una fila siga diciendo "applies later" cuando su fecha ya ha
pasado.

## What Changes

- **Herramienta** `/toolkit/obligations-planner` sobre el contrato del toolkit (entrada añadida al
  final de `site/src/data/toolkit.ts`, `ToolShell`, `public/toolkit/lib.js`): el lector marca sus
  roles (siete, con la definición del Art. 3), las clases del sistema (Anexo III, Anexo I, Art. 50)
  y una fecha de referencia opcional. Obtiene las filas del registro que le vinculan, cada una con
  su artefacto, capa, fecha para sus clases, estado en la fecha de referencia (calculado, no
  copiado), condiciones del rol, patrones (`/patterns/<slug>`) y enlace a `/obligations/<id>`; una
  línea de tiempo en SVG en línea; y cuatro exportaciones: lista de comprobación Markdown, CSV
  (RFC 4180), JSON con el mismo sobre que `/api/v1/*` (validado por
  `/toolkit/obligations-plan.v1.schema.json`, generado desde `src/lib/api.ts`) y un `.ics`
  (RFC 5545) con un evento de día completo por fecha. Estado en el fragmento de la URL.
- **Datos** `site/src/data/obligations-planner.ts`: roles, clases, la correspondencia fila → roles
  (con las condiciones del Act donde un deber solo alcanza a parte de un rol: Art. 25(1), 27(1),
  49(1) a 49(3), 50, 60(1)) y los cuatro deberes fuera del registro (Arts. 22, 23, 24, 54), cuyas
  fechas se toman de las filas del registro del mismo capítulo del Act (Art. 113(b) y (c)). La
  build falla si una fila de la UE o GPAI no tiene correspondencia. Lógica pura en
  `public/toolkit/obligations-planner-core.js` (probada en Node), cliente en
  `public/toolkit/obligations-planner.js`; cada uno por debajo de 15 KB gzip.
- **Figura de cabecera** en `site/src/pages/obligations/[id].astro`
  (`src/components/obligations/EvidenceChain.astro`, `src/lib/evidence-chain.ts`): la cadena
  cláusula → titular → fecha → artefacto → capa → registro de evidencia (los esquemas de
  `/schemas` cuyo `x-evidences` nombra la cláusula, o el registro de evidencia común), con los
  hermanos del crosswalk debajo; generada en build desde la fila, en SVG en línea con las clases
  `.figc`, horizontal desde 960 px y vertical por debajo, "As of" dentro de la imagen y
  alternativa textual.
- **Tarjetas Open Graph**: `/og/obligations/<id>.png` (una por fila, con el título de la página) y
  `/og/toolkit/<id>.png` (una por herramienta publicada), con la plantilla existente de
  `src/lib/og.ts`, sin tocar `src/pages/og/[...slug].png.ts`.
- **Prueba de fechas** `site/tests/obligation-status-dates.spec.ts`: falla cuando una fila con
  `applies-later` (o `deferred`) tiene un `appliesFrom` que ya ha pasado.
- **Pruebas** `site/tests/obligations-planner.spec.ts`: datos, núcleo en Node sobre el modelo que
  publica la página, exportaciones contra su esquema, flujo en el navegador, sin JavaScript, sin
  peticiones de red con lo introducido, impresión, 390 px, figura y tarjetas.
- **Registros compartidos**: un bloque en `SOURCE_BY_PATH`, una sección en `sources/SOURCES.md` y
  viñetas en `bok/CHANGELOG.md`. Navegación, `llms.txt`, recuentos de rutas en `seo-infra.spec.ts`
  y enlaces desde los capítulos 08 y 18 van al handoff.

## Capabilities

### New Capabilities
- `obligations-planner`: el planificador de obligaciones y plazos del AI Act y GPAI, sus datos de
  roles, sus exportaciones y su esquema.
- `obligation-evidence-chain`: la figura de cabecera y la tarjeta Open Graph de cada página de
  obligación, y la prueba que impide un estado caducado.

### Modified Capabilities
- (ninguna)

## Impact

- **Nuevos**: `site/src/data/obligations-planner.ts`, `site/src/pages/toolkit/obligations-planner.astro`,
  `site/src/pages/toolkit/obligations-plan.v1.schema.json.ts`, `site/src/lib/obligations-plan-schema.ts`,
  `site/public/toolkit/obligations-planner.js`, `site/public/toolkit/obligations-planner-core.js`,
  `site/src/lib/evidence-chain.ts`, `site/src/lib/obligation-title.ts`,
  `site/src/components/obligations/EvidenceChain.astro`, `site/src/pages/og/obligations/[id].png.ts`,
  `site/src/pages/og/toolkit/[id].png.ts`, `site/tests/obligations-planner.spec.ts`,
  `site/tests/obligation-status-dates.spec.ts`.
- **Modificados**: `site/src/pages/obligations/[id].astro` (figura, tarjeta propia, título
  compartido), `site/src/data/toolkit.ts` (una entrada al final), `site/astro.config.ts` (un
  bloque), `sources/SOURCES.md`, `bok/CHANGELOG.md`.
- Sin dependencias nuevas; la CSP no cambia (scripts externos del mismo origen, estilos en línea
  ya permitidos). `frameworks.ts` no cambia: las fechas siguen teniendo una sola fuente.
- Orientativo: no es asesoramiento jurídico ni una declaración de conformidad; no clasifica el
  sistema ni lee el derecho de los Estados miembros.
