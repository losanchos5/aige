# Tasks

## 1. Servidor

- [x] 1.1 Añadir al registro de acceso de `tools/mcp-server/src/app.ts` los campos `rpc`, `tool`, `client`, `clientVersion` y `tag` según `design.md` D1 a D5; verificar con las pruebas nuevas de `test/http.test.ts` (cliente anunciado, nombre hostil, herramienta desconocida, argumento ausente del registro, etiqueta válida e inválida, cuerpo ilegible), escritas tras pasar la puerta de `test-audit`
- [x] 1.2 Subir la versión a 0.6.1 en `package.json`, su lock, `SERVER_VERSION`, el ejemplo de compose del README y las pruebas que la fijan; verificar que `npm test` pasa en `tools/mcp-server`

## 2. Documentación

- [x] 2.1 Actualizar la viñeta de privacidad de `tools/mcp-server/README.md` y la frase de privacidad de `site/src/pages/mcp.astro`, y buscar en el sitio cualquier otra afirmación sobre los registros del servidor; verificar que ninguna dice algo que el código ya no cumple

## 3. Revisión y entrega

- [x] 3.1 Revisión de seguridad del diff (inyección en el registro, fuga de argumentos, lectura del cuerpo); verificar que no quedan hallazgos críticos ni altos abiertos
- [ ] 3.2 Abrir el PR y esperar la CI; verificar que termina en verde
- [ ] 3.3 Desplegar la imagen `aige-mcp:0.6.1` en el VPS según D8; verificar que `/healthz` responde, que un `initialize` etiquetado deja una línea con `client` y `tag`, y que una llamada a una herramienta deja su nombre y no su argumento
- [ ] 3.4 Comprobar en producción la frase de privacidad de `/mcp`; verificar con una petición a la página
