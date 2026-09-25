# Design

## Context

Ver `proposal.md` (Why). Restricciones que condicionan el diseño:

- La clave de la API de Anthropic no está disponible en local: todo se prueba sin red (modo mock y
  clientes falsos). La primera pasada real se lanza después en GitHub Actions con el secreto
  `ANTHROPIC_API_KEY`.
- Presupuesto: unos 18 USD en la cuenta. Cada camino tiene que ser barato y tener un tope.
- Contrato compartido con el bloque del sitio (rutas, frontmatter, estructura uno a uno, `## Sources`
  en inglés, glosario, memoria, sin raya, `I18N_DIR`).
- El sitio usa CSP estricta y Astro; esta entrega no toca `site/`. El paquete no puede instalar nada
  en `site/node_modules`.
- STYLEGUIDE: Markdown de GitHub, prosa envuelta a unos 100 caracteres, nunca la raya (U+2014).

## Goals / Non-Goals

**Goals:**

- Traducir capítulos, patrones, la Tesis (fr, de, pt) y las cadenas de la interfaz sin romper la
  estructura, las citas, los enlaces ni el código.
- Gasto acotado por un tope duro y proporcional a lo que cambia en el inglés.
- Terminología legal de la UE conforme a las versiones lingüísticas oficiales.
- Un modo mock determinista para las fixtures del sitio.

**Non-Goals:**

- Traducir nada real en esta entrega (las carpetas `i18n/<lang>/` quedan vacías).
- Revisión humana automatizada o métricas de calidad de la traducción.
- Traducir la sección `## Sources`, los bloques de código o la Tesis española.
- Cambiar el sitio (lo hace el bloque del sitio).

## Decisions

### Parser de Markdown propio, sin dependencias, validado contra mdast

Un parser por líneas cubre lo que el contenido usa (títulos ATX, párrafos, listas anidadas, citas y
callouts, tablas GFM, código cercado y sangrado, HTML, separadores) y conserva las líneas originales
de cada bloque, de modo que un documento sin traducir se reconstruye byte a byte. Lo que el contenido
no usa (títulos setext, saltos de línea duros) se rechaza con el número de línea. Alternativa
descartada: construir sobre `mdast-util-from-markdown` en el paquete; obligaría a instalar
dependencias para el modo mock que el sitio usa en sus pruebas y reescribir con `mdast-util-to-markdown`
cambiaría el formato de todo el fichero. Para no fiarse solo del parser propio, las pruebas comparan
bloques, destinos de enlace y código del inglés y de una traducción mock de los 58 ficheros reales
con el parser mdast del propio sitio (cuando `site/node_modules` existe).

### Marcadores numerados `{n}`

El código en línea, las URL, los destinos de enlace, los marcadores `[n]`, el HTML, las entidades y
los escapes se sustituyen por `{1}`, `{2}`... Son baratos en tokens y cualquier `{n}` literal del
texto se protege primero, así que no hay ambigüedad. El texto de los enlaces sí se traduce: el
destino queda como `[texto]({k})` y la validación exige que siga dentro de `](...)`.

### Un prompt de sistema fijo con todo el glosario, cacheable

El mismo prompt (reglas y el bloqueo de glosario completo en los cuatro idiomas, unos 5.600 tokens)
va en todas las peticiones de todos los idiomas; el idioma destino va en el mensaje de usuario. Supera
el mínimo de 4.096 tokens que Haiku 4.5 exige para cachear un prefijo, así que la caché lo sirve a
0,1x. TTL por defecto de 5 minutos también en batch: con aciertos de caché inciertos, el punto de
equilibrio es un 22% de aciertos frente al 53% de la TTL de una hora. Alternativa descartada: un
prompt por idioma con solo su glosario (unos 2.500 tokens, por debajo del mínimo, sin caché posible).

### Salidas estructuradas

`output_config.format` con un esquema `{segments: [{id, t}]}` garantiza JSON válido; un id por
segmento permite detectar omisiones sin desalinear el resto. Peticiones de unos 3.000 tokens de
origen; un fallo afecta a pocas decenas de segmentos.

### Memoria por hash de segmento y omisión por `sourceHash`

La clave de la memoria es el sha256 del segmento normalizado (sin los saltos de línea del envuelto),
así que reenvolver el inglés no cuesta nada. Solo se guardan traducciones validadas. Un fichero cuyo
`sourceHash` coincide no se procesa; un fichero con segmentos pendientes (tope, error de API, batch en
curso) no se escribe, para que un `sourceHash` solo quede en ficheros completos.

### Tope duro por reserva del peor caso

Antes de enviar una petición se reserva su peor caso (todo `max_tokens` producido, el prompt entero
como escritura de caché, entrada +15%) sumado a lo gastado y a lo que está en vuelo; si pasaría del
tope no se envía. La respuesta sustituye la reserva por el coste real de su `usage`. En batch se
reservan todas las peticiones a la vez y el lote se recorta a lo que cabe antes de crearse.
`max_tokens` = salida esperada x 1,3 + 300, para no truncar y a la vez acotar el peor caso.

### Batch con persistencia y reanudación

El id del lote se guarda en `i18n/.tm/pending-batches.json` (idioma y prefijos de 12 hex de los
hashes de cada petición, no el texto) antes de esperar. Una ejecución posterior recupera el lote, lo
aplica contra el índice de segmentos actual (un segmento cuyo inglés cambió se descarta) y no reenvía
lo que ya lleva un lote pendiente. Los reintentos de un batch van por la Messages API.

### Reenvolver la prosa traducida a unos 100 caracteres

Por el STYLEGUIDE y para que los diffs se puedan revisar. El envolvedor nunca corta dentro de una
negrita, un enlace o código, ni deja una línea que empiece por algo que abra otro bloque; al terminar,
cada fichero se vuelve a parsear y se compara su firma de estructura con la del inglés.

### Variantes y registro

es-ES (tú, como la Tesis traducida a mano), fr-FR (vous), de-DE (Sie) y **pt-PT**: la terminología
de la UE que el libro usa solo existe en la versión portuguesa europea del Derecho de la Unión
("prestador", "registo", "risco sistémico"). "AI Act" se traduce por la forma corta derivada del
título oficial ("Reglamento de IA", la de la Tesis española; "règlement sur l'IA"; "KI-Verordnung";
"Regulamento da IA").

### Un solo job en el workflow

El job tiene exactamente `contents: write` y `pull-requests: write`; el checkout no deja token en
`.git/config`, la clave de la API solo llega al paso de traducción y el token de GitHub solo al paso
final que empuja la rama `i18n/auto-<run id>` y abre el pull request. Nunca se empuja a `main`, así
que un fallo aquí no afecta a `deploy.yml`.

## Risks / Trade-offs

- [La aproximación de tokens se desvía] → Es deliberadamente alta (3,5 caracteres por token,
  expansión 1,4 a 1,5) y el tope se comprueba contra el peor caso; el informe da el gasto real.
- [Aciertos de caché en batch inciertos] → TTL de 5 minutos; la estimación muestra ambos extremos.
- [Traducción literal o terminología incorrecta en textos generales] → Revisión humana del pull
  request; el glosario se corrige y la memoria permite fijar segmentos.
- [Dos pull requests de traducción abiertos a la vez] → Se documenta fusionarlos de uno en uno; como
  mucho se paga dos veces un segmento nuevo, dentro del tope.
- [Pull requests abiertos con `GITHUB_TOKEN` no lanzan `ci.yml`] → Se documenta cerrar y reabrir.
- [Un segmento inglés con estructura accidental] → `bok/patterns/continuous-assurance-telemetry.md`
  línea 41 empieza por "+ version" y se lee como lista; se conserva tal cual y se señala.

## Migration Plan

1. Fusionar esta entrega (sin traducciones).
2. El propietario añade el secreto y el permiso de pull requests.
3. Lanzar **Translations** con `mode` = `batch`, idiomas `es,fr,de,pt`, `max_usd` = `12`.
4. Revisar y fusionar el pull request; después, las ediciones del inglés disparan pasadas sync
   pequeñas.

Rollback: borrar las carpetas `i18n/<lang>/` y la memoria; el sitio sigue sirviendo el inglés.

## Open Questions

- Si el bloque del sitio quiere la etiqueta `**Maps to:**` traducida (su plugin la detecta por el
  texto inglés), basta con añadirla a `callouts.json`; el pipeline ya la localiza si aparece.
