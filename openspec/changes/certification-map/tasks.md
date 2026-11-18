# Tasks

## 1. Datos

- [ ] 1.1 Segunda lectura de las 51 entradas del mapa de
      `D:/Documents/aige-wt/handoffs/competencies-visual/certs.json`: un revisor distinto del que
      investigó abre la URL de cada entrada y contrasta cada campo relleno. Verificar que el informe
      (`handoffs/competencies-visual/review-core.md`) lista cada id como conforme, corregido o no
      comprobable, con la URL abierta.
- [ ] 1.2 Segunda lectura de las 33 entradas de proveedores (sin las cinco excluidas), con el mismo
      criterio; verificar el informe `handoffs/competencies-visual/review-vendors.md`.
- [ ] 1.3 Crear `site/src/data/certifications.ts` con las 84 entradas ya corregidas, sus tipos y las
      etiquetas de temas y franjas, con las notas de estado limpias de texto que no venga del
      emisor; verificar el recuento (51 con `scope: 'core'`, 33 de proveedores) y que no está
      ninguno de los cinco ids excluidos.
- [x] 1.4 Escribir `certificationProblems(today)` con las reglas de la decisión 2 de `design.md` y
      la antigüedad de doce meses; verificar, cargando el módulo sin compilar (Vite `ssrLoadModule`,
      ver `D:/Documents/aige-wt/handoffs/oscal/gen.mjs`), que los datos reales no dan problemas y
      que una entrada sin `url`, otra sin `asOf` y otra con una franja inventada dan un problema
      que nombra su id.

## 2. Página

- [x] 2.1 Mapa de credenciales (variante "columns" del mockup): secciones por tema, listas por
      franja alineadas con subgrid, cajas enlazadas a `#cert-<id>`, leyenda, frase de lectura, panel
      sobre pintura con crédito; CSS portado de `certmap.css` solo con tokens. Verificar que no
      queda ningún color en hexadecimal y que hay 51 cajas.
- [x] 2.2 Bloque de proveedores agrupado por proveedor, con nombre, código y nivel en palabras del
      proveedor, etiqueta de retirada con fecha y marca de dominio de gobierno; verificar 33 cajas
      y que ningún nodo muestra solo un código.
- [x] 2.3 Hechos por credencial: una tabla por tema con ancla `cert-<id>` por fila, fuente con el
      nombre del host, fecha, línea de datos sin comprobar, texto para precio no publicado, marca de
      entrada antigua, fila `:target` resaltada y enlace de vuelta; verificar que los 84 ids existen
      una sola vez.
- [ ] 2.4 Vista estrecha: temas apilados con sus franjas y filas de hechos como tarjetas; verificar
      que no hay desplazamiento lateral a 390 px.
- [x] 2.5 Integrar en `site/src/pages/for/certifications.astro`: llamada a
      `certificationProblems()` al compilar, orden de secciones de la decisión 8, entradas del
      índice, fecha del mapa, enlaces de corrección y nota de no afiliación ampliada; verificar que
      `#certificate-lanes`, `.cert-standard`, `ol.sources` y el título siguen como los fijan las
      pruebas actuales.
- [ ] 2.6 Añadir en "Method and limits" de `site/src/pages/role/competencies.astro` un enlace al
      mapa; verificar que el enlace resuelve y que la frase sigue diciendo que un certificado no es
      evidencia.
- [ ] 2.7 Repasar el texto actual de la página contra los datos nuevos y listar para Jordi cualquier
      frase que quede desfasada, sin reescribirla; verificar que la lista va en el cuerpo del PR.

## 3. Documentación

- [ ] 3.1 Sección en `CONTRIBUTING.md` sobre cómo corregir o añadir una credencial (campos, fuente
      primaria obligatoria, fecha, qué no se acepta); verificar que nombra el fichero de datos y la
      plantilla `report-an-error`.
- [ ] 3.2 Revisar si `llms.txt.ts`, `llms-corpus.ts` o `astro.config.ts` describen el contenido de
      `/for/certifications` y actualizar solo lo que quede falso; verificar con una búsqueda de
      "certifications" en esos tres ficheros.

## 4. Pruebas

- [ ] 4.1 Leer `C:/Users/Jordi/.claude/skills/test-audit/SKILL.md` y pasar por su puerta las pruebas
      candidatas: cada caja enlaza a una fila que existe; sin desplazamiento lateral a 390 px; axe en
      claro y en oscuro para la página; el mapa y los hechos completos sin JavaScript. Verificar que
      solo se añaden las que pasan la puerta y que las pruebas actuales de la página no se tocan.

## 5. Verificación y revisión

- [ ] 5.1 Subir la rama `feat/certification-map` y leer CI: compilación, pruebas, accesibilidad y
      Lighthouse en verde (sin compilar en local).
- [ ] 5.2 Capturas de la página real a 1440 y 390 px, en claro y en oscuro, comparadas con
      `shots/columns-map-*.png`, `shots/rows-vendors-*.png` y `shots/facts-*.png` del mockup; las toma
      la sesión principal con un solo `astro dev`. Verificar que no hay cajas cortadas ni texto sobre
      la pintura.
- [ ] 5.3 Revisión con `code-reviewer`; resolver lo CRITICAL y lo HIGH.
- [ ] 5.4 Abrir el PR con el texto nuevo (`copy.md`), la tabla de las 84 entradas, los dos informes
      de segunda lectura y la lista de 2.7; verificar que Jordi confirma el contenido y el texto
      antes del merge.

## 6. Tras el merge

- [ ] 6.1 Comprobar producción: `/for/certifications` responde 200, tiene las 84 anclas `cert-` y el
      enlace desde `/role/competencies` resuelve.
