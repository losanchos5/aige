# Tasks

## 1. Página de privacidad

- [x] 1.1 Crear `site/src/pages/privacy.astro` con `Doc.astro` y `navGroup="about"` según `design.md` D2 y el spec `privacy-page`; contrastar cada afirmación sobre Umami, Cloudflare Web Analytics y Buttondown con la documentación del proveedor; verificar que `content-lint` pasa y que el informe lista la fuente de cada afirmación sobre terceros
- [x] 1.2 Añadir la prueba que exige que cada host externo de `script-src`, `connect-src` y `form-action` de `site/public/_headers` aparezca en `/privacy`, tras pasar la puerta de `test-audit`; verificar que falla al quitar un host de la página y pasa al restaurarlo
- [x] 1.3 Enlazar `/privacy` desde el punto "Private by design" de `site/src/pages/mcp.astro`; verificar el enlace en el HTML generado

## 2. Declaración de independencia

- [x] 2.1 Crear `site/src/pages/about/independence.astro` según `design.md` D4 y el spec `independence-statement`, sin afirmar ausencia de intereses comerciales; verificar que cada frase de hecho figura en la lista de comprobación del informe para Jordi
- [x] 2.2 Enlazar la declaración desde `site/src/pages/about/methodology.astro` y actualizar el comentario de cabecera que la daba por pendiente; verificar el enlace en el HTML generado

## 3. Navegación

- [x] 3.1 Añadir Independence y Privacy al grupo About de `site/src/data/nav.ts` (Privacy con `placement: 'footer'`), sus entradas en `site/src/pages/llms.txt.ts` y su origen en el mapa de fechas del sitemap de `site/astro.config.ts`; verificar con las pruebas de navegación existentes y con los títulos y descripciones dentro de los límites de `seo-titles.spec.ts` y `seo-head.spec.ts`

## 4. Registro de MCP

- [x] 4.1 Crear `tools/mcp-server/server.json` según `design.md` D5 y una prueba que compare su versión con `SERVER_VERSION`, su descripción con el límite de 100 caracteres y su remoto con `site/public/.well-known/mcp.json`; verificar que `npm test` pasa en `tools/mcp-server`
- [x] 4.2 Añadir `site/public/.well-known/mcp-registry-auth` con la línea pública, la regla `text/plain` en `site/public/_headers` y la comprobación de formato sobre el build; verificar que el fichero queda en `dist` con una sola línea

## 5. Revisión y entrega

- [x] 5.1 Revisión con `code-reviewer`: cada afirmación de `/privacy` contra el código y la documentación citada; verificar que no quedan hallazgos críticos ni altos
- [x] 5.2 Abrir el PR con la lista de frases que Jordi debe confirmar y esperar la CI; verificar que termina en verde
- [x] 5.3 Jordi confirma los textos de privacidad e independencia; verificar con su visto bueno en el PR
- [ ] 5.4 Tras el merge, comprobar en producción `/privacy`, `/about/independence` y `/.well-known/mcp-registry-auth` (`200`, `text/plain`, sin redirección)
- [ ] 5.5 Con el visto bueno de Jordi, publicar en el registro de MCP (`mcp-publisher login http`, `publish`) y dejarle los textos del directorio de Claude en `D:/Documents/aige-media/outreach/2026-11-listings/`; verificar que la entrada aparece en `registry.modelcontextprotocol.io`
