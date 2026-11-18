# Design

## Context

Ver `proposal.md`. Hechos medidos el 2026-11-18 sobre `origin/main` y producción:

- Analítica: Umami propio en `admin.stocktcg.net` (sin cookies, sin cadena de consulta ni
  fragmento, con Web Vitals, navegadores automatizados excluidos por `umami-guard.js`) y la baliza
  de Cloudflare Web Analytics. Las dos están activas en producción.
- Boletín: el formulario envía solo `email` directamente a Buttondown.
- Almacenamiento: solo `localStorage` (tema, capítulos leídos, progreso de la ruta, columnas del
  crosswalk, borradores del toolkit, progreso del estudio AIGP). Ningún código pone cookies.
- Terceros que la CSP permite (`site/public/_headers`): `static.cloudflareinsights.com`,
  `cloudflareinsights.com`, `admin.stocktcg.net`, `buttondown.com`. Fuentes y búsqueda son propias.
- Alojamiento: Cloudflare Pages. Servidor MCP: VPS del autor, registro descrito en
  `tools/mcp-server/README.md` (0.6.1).
- Las páginas de About usan `layouts/Doc.astro` con `navGroup="about"`; el pie pinta todos los
  elementos del grupo y el carril omite los de `placement: 'footer'`.

## Goals / Non-Goals

**Goals:**

- Cumplir lo que piden el directorio de Claude (privacidad, documentación, soporte) y el registro
  de MCP (`server.json`, dominio verificado).
- Que la página de privacidad no pueda quedarse atrás sin que la CI lo diga.

**Non-Goals:**

- Banner de cookies o gestor de consentimiento: no hay cookies ni identificadores persistentes.
- Cambiar qué se recoge. Si algo sobra, es otro cambio.
- Traducir las páginas.
- Nombrar el producto privado. La relación entre web y producto es una decisión de Jordi (separados).

## Decisions

**D1. `/privacy` en la raíz y `/about/independence` bajo About.** `/privacy` es la ruta que buscan
los directorios y las personas. Las dos usan `Doc.astro` con `navGroup="about"`. En `nav.ts`,
Independence va después de Methodology con la colocación normal y Privacy va al final con
`placement: 'footer'`, para no alargar el menú.

**D2. La página de privacidad se escribe desde el código.** Estructura: quién responde, una tabla
(qué, quién lo recibe, para qué, cuánto dura), almacenamiento en el navegador, servidor MCP, qué no
se hace (cookies, publicidad, venta, perfiles), derechos y contacto, fecha de revisión. Cada
afirmación sobre un tercero (qué guarda Umami, qué guarda la baliza de Cloudflare, qué hace
Buttondown) se contrasta con la documentación del proveedor, y la fuente se anota en el cuerpo del
PR. Lo que solo Jordi sabe (plazos de conservación, ubicación del servidor de Umami, base jurídica)
se redacta con la opción más prudente y se lista en el PR para que lo confirme.

**D3. Una prueba ata la página a la CSP.** Cada host externo de `script-src`, `connect-src` y
`form-action` en `_headers` debe aparecer en `/privacy`. Añadir un tercero sin declararlo rompe la
CI. No se prueba la lista de claves de `localStorage`: sería copiar el código en la prueba.

**D4. La declaración de independencia dice lo que se puede sostener.** Financiación propia, sin
patrocinios, publicidad ni enlaces de afiliado; sin dinero ni apoyo de laboratorios, proveedores u
organismos de normalización; proyecto personal, no de un empleador; el autor puede hacer trabajo de
pago en este campo y cualquier producto o servicio de pago relacionado se anuncia en esa página
antes de lanzarse; cómo se corrige un error; fecha. No dice "sin intereses comerciales". Cada frase
va en una lista de comprobación del PR para que Jordi la confirme o la cambie.

**D5. Registro de MCP por fichero HTTP.** Nombre `com.aigovernanceengineer/reference`, verificado
con `https://aigovernanceengineer.com/.well-known/mcp-registry-auth` (una línea
`v=MCPv1; k=ed25519; p=<clave pública>`), servido como `text/plain` sin redirección mediante una
regla en `_headers`. Alternativa descartada: registro TXT en DNS, que obliga a entrar al panel de
Cloudflare. `server.json` vive en `tools/mcp-server/`, sigue el esquema `2025-12-11`, es solo
remoto y su versión es la de `SERVER_VERSION`. El nombre se puede cambiar antes de publicar; después
queda fijado.

**D6. La clave privada no toca el repo.** La generó la sesión principal en
`C:/Users/Jordi/.ssh/aige-mcp-registry-ed25519.pem`. Solo se commitea la línea pública.

**D7. Publicar es un paso aparte.** `mcp-publisher login http` y `publish` se ejecutan tras el
merge y con el visto bueno de Jordi. El envío al directorio de Claude lo hace él en
`claude.ai/directory/manage`; se le dejan los textos preparados fuera del repo.

## Risks / Trade-offs

- [La página afirma algo que el código deja de cumplir] → la prueba de D3 cubre los terceros; el
  resto se revisa en cada cambio que toque analítica, formulario o registro.
- [La declaración de independencia promete de más] → frases cortas y verificables, firmadas por
  Jordi; sin adjetivos.
- [El registro está en vista previa y puede reiniciar datos] → publicar es barato de repetir.
- [Cloudflare Pages sirve el fichero sin extensión con otro tipo de contenido] → regla explícita en
  `_headers` y comprobación en producción antes de publicar.
- [Texto legal escrito sin abogado] → se limita a describir hechos y a dar un contacto; no cita
  artículos que no se hayan comprobado.

## Migration Plan

Merge después de `mcp-client-logging`. Marcha atrás: revertir el PR; el fichero de verificación
puede quedarse sin efecto alguno.
