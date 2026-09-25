# Tasks

Worktree `D:/Documents/aige-wt/b-nav-shell` (rama `wt/b-nav-shell`). La build solo se lanza con
`bash D:/Documents/aige-wt/build.sh`. `chapters.ts`, `Doc.astro`, `content.config.ts` y `llms.ts`
no se tocan; lo que falte fuera del bloque va al handoff.

## 1. Datos de navegación

- [x] 1.1 Crear `site/src/data/parts.ts`: cada parte de `chapterParts` con su introducción de una línea, sus capítulos y su rango de números calculado.
- [x] 1.2 Agrupar el grupo Body of Knowledge de `nav.ts` por partes (`sections`), con la descripción calculada desde los datos.
- [x] 1.3 Añadir Contracts, Harms atlas, Cases y Templates & schemas a Reference y Methodology a About.

## 2. Superficies de navegación

- [x] 2.1 Panel de escritorio de Body of Knowledge en columnas por parte, sin scroll horizontal y con altura acotada.
- [x] 2.2 Drawer móvil: un solo desplegable de capítulos con subtítulos por parte.
- [x] 2.3 Footer: bloque de partes a todo lo ancho; feeds con evento de descarga.
- [x] 2.4 Carril lateral de capítulos con un rótulo por parte.

## 3. Portada, índice y hub

- [x] 3.1 Portada: sección de capítulos por partes (título y conteos desde los datos) con Foundations, The lifecycle y Law and standards destacados.
- [x] 3.2 Portada: tarjetas de recursos con el Topic Crosswalk y el mapa; sección de newsletter.
- [x] 3.3 Índice `/bok`: capítulos por parte con introducción, saltos por parte y rutas de lectura con capítulos nuevos.
- [x] 3.4 Hub `/resources`: tarjetas de contratos, atlas de daños, casos y plantillas.

## 4. Metodología y contribución

- [x] 4.1 Crear `/about/methodology` con hechos comprobables en el repositorio y fuentes numeradas.
- [x] 4.2 Enlazar la metodología desde `/about` y añadirla a `SOURCE_BY_PATH`.
- [x] 4.3 Añadir la política de roles (autor, revisor, colaborador) a `bok/CONTRIBUTORS.md`.
- [x] 4.4 Añadir los cuatro formularios de issue nuevos.

## 5. Newsletter y analítica

- [x] 5.1 Formulario de newsletter en la portada y al final de cada capítulo.
- [x] 5.2 Atributos `data-umami-event` en descargas propias, envío de newsletter, apertura de búsqueda y botones de citar/copiar.
- [x] 5.3 Ajustar la redacción de `/role` y `/stack` a las partes nuevas.

## 6. Registros, tests y entrega

- [x] 6.1 Añadir entradas a `sources/SOURCES.md` y `bok/CHANGELOG.md` (Unreleased (v0.5.0)).
- [x] 6.2 Actualizar `nav.spec`, `home.spec`, `loop.spec`, `resources.spec` y `seo-infra.spec`, y crear `shell-parts.spec`.
- [x] 6.3 Ejecutar `bash D:/Documents/aige-wt/build.sh` hasta que salga con código 0.
- [x] 6.4 Ejecutar `openspec validate navigation-parts-methodology --strict` hasta que pase.
- [x] 6.5 Escribir `D:/Documents/aige-wt/handoffs/b-nav-shell.json`.
