# Tasks

Rama `wt/c17-incidents` en el worktree `D:/Documents/aige-wt/c17-incidents`. La build solo se lanza
con `bash D:/Documents/aige-wt/build.sh`. No se tocan ficheros compartidos: sus cambios van al
handoff `D:/Documents/aige-wt/handoffs/c17-incidents.json`.

## 1. Investigación y verificación de fuentes

- [x] 1.1 Leer STYLEGUIDE.md y los capítulos 01, 04, 05, 06 y 08 para usar el modelo de la casa (capas, patrones, flujos de trabajo, reloj del Art. 73).
- [x] 1.2 Verificar en el texto oficial el AI Act (Arts. 3(49), 3(61), 20, 26(5)-(6), 55(1)(c), 73) y el efecto del Omnibus (Art. 75(1a); plazos del Art. 73 sin cambios).
- [x] 1.3 Verificar el Compromiso 9 del Código de Buenas Prácticas GPAI (medidas 9.1-9.4) y la plantilla de la Comisión del 4 nov 2025.
- [x] 1.4 Verificar GDPR Arts. 33-34, NIS2 Arts. 4 y 23, DORA Art. 19 con los RTS 2024/1772 y 2025/301, y CRA Arts. 14 y 71.
- [x] 1.5 Verificar SB 53, RAISE Act, definiciones y marco común de la OCDE, NIST SP 800-61r3, NIST AI RMF MANAGE 4.3, IEC 61025 y el capítulo de post-mortems de Google SRE.
- [x] 1.6 Registrar como «(verify)» lo no confirmado: adopción de la guía final del Art. 73 y detalle de la propuesta de Omnibus digital sobre GDPR.

## 2. Redacción del capítulo

- [x] 2.1 Escribir definiciones, tabla de términos y separación severidad/notificabilidad.
- [x] 2.2 Escribir la escala de severidad mapeada a relojes y el ejemplo de regla como Policy Card.
- [x] 2.3 Escribir el ciclo de respuesta con la subsección «Freeze before you fix».
- [x] 2.4 Escribir playbook de ejemplo, matriz RACI y simulacros con métricas.
- [x] 2.5 Escribir la tabla de modos de fallo propios de la IA.
- [x] 2.6 Escribir el análisis de causa raíz, la taxonomía de causas con enlaces a patrones y el CAPA.
- [x] 2.7 Escribir los deberes del deployer del Art. 26(5) con su tabla de artefactos.
- [x] 2.8 Escribir la tabla de relojes superpuestos, su lectura y el ejemplo JSON de relojes.
- [x] 2.9 Escribir el registro de incidente alineado con la Comisión y la OCDE, y la sección de bases de datos públicas.
- [x] 2.10 Cerrar con «What you can do this week», «Maps to» y «Sources»; comprobar que no hay rayas largas y que cada [n] tiene fuente.

## 3. Verificación y entrega

- [x] 3.1 Validar el cambio con `openspec validate bok-ch17-incidents --strict`.
- [x] 3.2 Ejecutar `bash D:/Documents/aige-wt/build.sh` y comprobar que termina con código 0 (astro check, build, content-lint, check-links, pagefind).
- [x] 3.3 Escribir el handoff `D:/Documents/aige-wt/handoffs/c17-incidents.json` (resumen, glance, glosario, obligaciones, crosswalk, figuras, enlaces cruzados, lista de lectura, filas de SOURCES.md, notas) y comprobar que es JSON válido.
- [x] 3.4 Hacer commit de `bok/17-incidents.md` y de `openspec/changes/bok-ch17-incidents/` añadiendo ficheros por ruta explícita.
