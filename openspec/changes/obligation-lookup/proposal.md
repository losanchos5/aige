# Proposal

## Why

El mapeo por artículo ya existe (182 obligaciones de 76 instrumentos, una página por obligación con
la cadena cláusula, artefacto, capa y evidencia, "Same topic in N frameworks" y los controles que la
implementan), pero no se encuentra: ni el propio autor dio con él (ROADMAP-CRECIMIENTO.md §13,
2026-09-28). Además, de las 576 referencias del crosswalk, 203 no enlazan con ninguna página de
obligación, y 37 de ellas sí tienen fila en el registro con la misma cláusula exacta. Hacerlo
encontrable es barato y abre una serie de LinkedIn ("¿qué exige el artículo X y qué más lo cubre?")
con enlaces compartibles.

## What Changes

- Buscador "Look up an article" en `/obligations` y en `/resources/crosswalk`: el lector escribe
  "AI Act 14", "Art. 50", "GDPR 35", "rgpd 35" o "42001 A.6" y llega a la página de la obligación.
  Si la cláusula no tiene fila en el registro pero sí está en el crosswalk, lleva al tema del
  crosswalk que la archiva.
- Índice estático `/obligations/lookup.json` generado en build (obligaciones + referencias del
  crosswalk sin página), con alias de instrumento curados ("ai act", "rgpd", "42001", "nist"...).
- Enlaces compartibles: `/obligations?q=ai+act+14` rellena el buscador y muestra el resultado;
  `/obligations#lookup` pone el foco en el buscador.
- Unión automática por cláusula exacta en el crosswalk: una referencia sin `obligationId` recibe el
  de la única fila del registro con el mismo `frameworkId` y la misma cláusula normalizada. Sube la
  cobertura de 373 a 410 referencias enlazadas, sin juicios manuales ni filas nuevas.
- Tile nuevo en la portada: "Look up an article", hacia `/obligations#lookup`.
- Sin JavaScript el formulario muestra ejemplos como enlaces normales y la lista completa sigue
  debajo; el buscador de todo el sitio (Ctrl+K) no cambia.

## Capabilities

### New Capabilities
- `obligation-lookup`: buscador por artículo o cláusula, índice estático, normalización de consultas
  y alias de instrumento, enlaces compartibles con `?q=` y `#lookup`.

### Modified Capabilities
- `obligation-links`: la unión crosswalk → registro se completa por cláusula exacta cuando la
  referencia no declara `obligationId`.
- `topic-crosswalk`: la página del crosswalk monta el buscador por artículo encima de la matriz.
- `home-positioning`: un tile más en la portada hacia el buscador.

## Impact

- Nuevo: `site/src/data/obligation-aliases.ts`, `site/src/lib/obligation-lookup.ts`,
  `site/src/lib/obligation-lookup-core.js`, `site/src/pages/obligation-lookup-core.js.ts`,
  `site/src/pages/obligations/lookup.json.ts`, `site/src/components/ObligationLookup.astro`,
  `site/public/obligation-lookup.js`,
  `site/tests/obligation-lookup.spec.ts`.
- Modificado: `site/src/data/crosswalk.ts` (unión por cláusula exacta en `refs`),
  `site/src/pages/obligations/index.astro`, `site/src/pages/resources/crosswalk.astro`,
  `site/src/pages/index.astro`, estilos de recursos.
- Exportaciones del crosswalk (`crosswalk.json`, `.csv`, API) ganan `obligationId` en 37 referencias
  más; el esquema no cambia.
- CSP sin cambios: todo el JavaScript se sirve como módulos propios del sitio, sin scripts en línea.
- Capturas visuales afectadas: portada (bento de 12 tiles), crosswalk y registro de obligaciones.
