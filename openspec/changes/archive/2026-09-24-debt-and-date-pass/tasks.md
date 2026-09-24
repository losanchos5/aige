# Tasks

Rama `wt/w0-debt` (worktree `D:/Documents/aige-wt/w0-debt`). Ola 0 del plan v0.5.0: entra antes que
los capítulos nuevos. El build solo se lanza con `bash D:/Documents/aige-wt/build.sh`.

## 1. Deuda puntual

- [x] 1.1 Quitar el `</content>` final de `bok/08-regulatory-map.md` y comprobar que ningún otro capítulo, la Tesis, `OUTLINE.md` ni `README.md` tienen etiquetas sueltas.
- [x] 1.2 Capítulo 04: la frase de las dieciséis extensiones OSCAL cita `[12]`; revisar que cada `[n]` resuelve a su fuente.
- [x] 1.3 Concept paper del NCCoE: comprobar que la URL resuelve en NIST y dejarlo `primary` en los capítulos 02, 04, 05 y 10; retirar del 02 la frase sobre cuentas de servicio compartidas, que el documento no contiene.
- [x] 1.4 Glosario: AESIA remite al capítulo 08 (frase nueva con el Real Decreto 729/2023) y "Guardian agent" al 04 (frase nueva con la nota de Gartner de 2025-06-11).
- [x] 1.5 `site/src/data/patterns.ts`: la cabecera dice 17 patrones.
- [x] 1.6 `/resources`: la entradilla anuncia seis referencias, la meta descripción incluye el crosswalk y el mapa (también en `llms.txt`), y las keywords JSON-LD del crosswalk incluyen China y TC260.

## 2. Modelo único de capas

- [x] 2.1 Decidir el modelo (heredadas 01, 02 y 05; 02 responde "qué IA", 01 y 04 "qué se le permite", 03 y 05 "qué evidencia") y documentarlo en `proposal.md`.
- [x] 2.2 Alinear la Tesis (EN y ES), los capítulos 01 y 04, `stack.ts` (pregunta de la capa 04), `/stack` y las tarjetas de la home; la figura de las tres preguntas ya seguía el modelo.

## 3. Fuentes

- [x] 3.1 Normas armonizadas: citar la página de normalización de la Comisión y la consulta a la Oficina de Publicaciones del 2026-09-24 en la Tesis y en los capítulos 02, 04, 08, 09 y 10; el tracker de proveedor queda solo para el estado Enquiry, como `reported`.
- [x] 3.2 Kosmoy atribuido como comparativa de un competidor en la Tesis y en los capítulos 02, 03, 05, 07 y 09, junto a la nota de Gartner de 2026-02-17; corregir la cifra de mercado (USD 492 M en 2026, más de 1.000 M en 2030) en los capítulos 01 y 02.
- [x] 3.3 Magic Quadrant citado como relato de IBM (`secondary`, con la referencia de Gartner); retirar los criterios de inclusión que la fuente no contiene.
- [x] 3.4 HiddenLayer atribuido a una encuesta de proveedor, con la página del informe como `primary`, en la Tesis y en los capítulos 02, 05 y 10.
- [x] 3.5 Retirar las tres ofertas de SimplyHired y las afirmaciones que dependían de ellas en los capítulos 02 y 06; renumerar las fuentes.
- [x] 3.6 Reglamento (UE) 2024/1689 y 2026/1744 citados por ELI de EUR-Lex en los capítulos 04, 05, 08 y 09, en `frameworks.ts`, en el crosswalk y en la ruta de aprendizaje; el explorador del FLI queda como lectura `secondary`.
- [x] 3.7 Reverificar GB/T 45654-2025: la ficha oficial confirma vigencia y fechas, pero la cláusula no se puede comprobar; las tres referencias siguen `verified: false`, con la URL de la ficha.
- [x] 3.8 Añadir el International AI Safety Report 2026 a la lista de lectura con su URL oficial.
- [x] 3.9 Añadir la SB 53 de California al capítulo 02 con el texto de la ley como fuente primaria, coherente con el capítulo 08 (que también gana esa fuente) y `frameworks.ts`.
- [x] 3.10 Actualizar `sources/SOURCES.md` con todas las filas nuevas, cambiadas y renumeradas.

## 4. Pase de fechas

- [x] 4.1 Reverificar en línea y pasar a "as of 2026-09-24": normas armonizadas, EN 18286, solicitudes de información de la Oficina de IA, NIST IR 8596 y AI 800-1, periodo de gracia de Corea, OWASP LLM Top 10 2026 y edición del informe de la IAPP (sigue siendo 2025).
- [x] 4.2 Enunciar las fechas próximas desde el Reglamento (UE) 2026/1744 (2026-12-02, 2027-12-02, 2028-08-02, 2030-08-02) y mantener 2027-01-01 para RAISE y la SB 26-189 de Colorado.
- [x] 4.3 Sustituir las expresiones relativas por fechas en la Tesis (EN y ES), el prefacio y el capítulo 02.
- [x] 4.4 Dejar sin tocar los sellos no reverificados (filas de China del capítulo 08, revisión de herramientas) y anotarlos en el handoff.

## 5. Rayas

- [x] 5.1 Eliminar todas las U+2014 de los ficheros versionados (586 líneas en 157 ficheros), con escapes `\u2014` en el código que las necesita; comprobar con `git grep -I -n -P '\x{2014}'` que no queda ninguna.

## 6. Verificación

- [x] 6.1 `openspec validate debt-and-date-pass --strict` en verde.
- [x] 6.2 `bash D:/Documents/aige-wt/build.sh` con salida 0.
- [x] 6.3 Escribir `D:/Documents/aige-wt/handoffs/w0-debt.json` con lo que toca a ficheros compartidos.
