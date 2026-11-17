# Design

## Context

Ver `proposal.md`. El servidor (`tools/mcp-server`, Hono) es sin estado: crea una instancia MCP por
petición, así que el nombre del cliente solo viaja en la petición `initialize` y no hay
identificador de sesión que una esa petición con las llamadas posteriores. El registro de acceso
está en `src/app.ts` y hoy escribe método, ruta, estado, duración y las cabeceras `Mcp-Method`,
`Mcp-Name` y `Mcp-Protocol-Version` cuando el cliente las envía, pasadas por `loggable()`. En 30
días de registros esas cabeceras no aparecen: los clientes reales no las mandan. Caddy ya borra de
su propio registro la dirección y las cabeceras.

## Goals / Non-Goals

**Goals:**

- Saber qué tipos de cliente inicializan, qué herramientas se llaman y descontar el uso del autor.
- No ampliar la superficie de privacidad más allá de esos tres datos.

**Non-Goals:**

- Identificar personas o sesiones. Sin estado no se puede unir una llamada a su cliente, y no se
  añade estado para conseguirlo.
- Métricas, paneles o almacenamiento: se cuentan líneas de `docker logs`.

## Decisions

**D1. Se lee una copia del cuerpo en el middleware del registro.** Solo en `POST /mcp`, sobre un
clon de la petición, dentro de un `try` que ante cualquier fallo deja los campos sin rellenar. El
límite de cuerpo existente acota el coste. Alternativa descartada: registrar desde los manejadores
de las herramientas, que no ven `initialize` y duplicarían la línea.

**D2. Listas cerradas.** `rpc` se registra si está en la lista de métodos MCP que el servidor
atiende; `tool`, si está en la lista de herramientas registradas. En otro caso, `[other]`. Un cuerpo
que es un lote (un array) se registra como `rpc: "[batch]"` sin mirar dentro.

**D3. Nombre y versión de cliente saneados.** Aceptados si casan con
`^[A-Za-z0-9 _./:()+@-]{1,64}$`; si no, `[other]`. El espacio se admite porque hay clientes con
nombres de dos palabras. No se registra `clientInfo.title` ni ningún otro campo.

**D4. Etiqueta por URL.** `?tag=` con `[a-z0-9-]{1,24}`. El autor configura sus clientes con
`https://mcp.aigovernanceengineer.com/mcp?tag=<algo>` y su uso se filtra al contar. No es un
secreto ni un control de acceso: cualquiera puede ponerla, y solo sirve para descontar.

**D5. Los campos que ya existían se conservan.** `mcpMethod`, `mcpName` y `protocol` siguen
saliendo de las cabeceras; los nuevos se llaman `rpc`, `tool`, `client`, `clientVersion` y `tag`.

**D6. Versión 0.6.1** en `package.json`, su lock, `SERVER_VERSION`, el ejemplo de compose del README
y las pruebas que fijan la versión.

**D7. Texto de privacidad.** La página `/mcp` y el README pasan a decir que el registro guarda el
nombre que anuncia el cliente y la herramienta llamada, y nunca la dirección ni lo que se pregunta.

**D8. Despliegue.** Lo hace la sesión principal tras el merge: copiar `tools/mcp-server` al VPS en
un directorio nuevo, apuntar el compose a ese directorio con la etiqueta `aige-mcp:0.6.1`,
construir, levantar, comprobar `/healthz`, hacer un `initialize` con etiqueta y leer la línea. El
compose anterior se guarda al lado para volver atrás.

## Risks / Trade-offs

- [Inyección en el registro con el nombre del cliente] → expresión cerrada y `[other]`; la línea se
  serializa como JSON.
- [Que el registro acabe guardando lo que alguien pregunta] → solo tres campos por lista o por
  expresión; una prueba comprueba que un argumento no aparece en ninguna línea.
- [Leer el cuerpo dos veces rompe la petición] → se lee de un clon y hay una prueba de respuesta
  idéntica con cuerpo ilegible.
- [El nombre del cliente no distingue personas] → es lo buscado; el uso del autor se separa con la
  etiqueta.

## Migration Plan

Imagen nueva junto a la anterior. Marcha atrás: restaurar el compose guardado y levantar la imagen
`0.6.0`, que sigue en el servidor.
