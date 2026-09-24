# Tasks

Worktree `D:\Documents\aige-wt\c22-principles-and-standards` (rama `wt/c22-principles-and-standards`).
La build solo se lanza con `bash D:/Documents/aige-wt/build.sh`. No se tocan ficheros compartidos: lo
que les corresponde va al handoff `D:/Documents/aige-wt/handoffs/c22-principles-and-standards.json`.

## 1. Lectura y verificación

- [x] 1.1 Leer `STYLEGUIDE.md`, `bok/01`, `bok/04`, `bok/05`, `bok/06` y `bok/08` y anotar capas, patrones y anclas enlazables; verificar anclas con la build.
- [x] 1.2 Verificar en fuente primaria (OCDE, UNESCO, Consejo de Europa, Comisión Europea, G7, NIST, ISO, IEEE, CEN-CENELEC) cada fecha, número y estado; marcar como `secondary` lo leído en fuentes no oficiales y con «(verify)» lo no confirmado.

## 2. Capítulo 22

- [x] 2.1 Escribir las secciones de la OCDE (principios, recomendaciones, definición, ciclo de vida, marco de clasificación, OECD.AI), UNESCO, Convenio del Consejo de Europa (estado a 2026-09-24), G7 y HLEG/ALTAI, cada una con tabla artefacto → capa.
- [x] 2.2 Escribir la sección del NIST AI RMF 1.0 (daño y tolerancia, siete características, 19 categorías, Playbook, perfiles y AI 600-1, trabajo adyacente, estado de revisión, crosswalks).
- [x] 2.3 Escribir la sección ISO/IEC (fundamentos, riesgo/calidad/datos, trío de sistema de gestión, integración con 27001, 27701 y 9001) citando solo número y título corto.
- [x] 2.4 Escribir la sección de estándares armonizados (arts. 40 y 41, petición de normalización, tabla JTC 21 «last reviewed 2026-09-24», qué cambia cada entregable, cómo construir antes de la cita en el DOUE) y la serie IEEE 7000.
- [x] 2.5 Añadir la síntesis «One control, many instruments», la línea «Maps to», «What you can do this week» y «## Sources» numeradas por orden de aparición; comprobar que no hay rayas largas y que todo `[n]` tiene fuente.

## 3. Verificación y entrega

- [x] 3.1 Ejecutar `bash D:/Documents/aige-wt/build.sh` (astro check, build, content-lint, check-links, pagefind) con salida 0.
- [x] 3.2 Crear este cambio OpenSpec y pasar `openspec validate bok-ch22-principles-and-standards --strict`.
- [x] 3.3 Escribir el handoff JSON (resumen, glance, glosario, obligaciones, crosswalk, figuras, enlaces cruzados, lecturas, filas de `sources/SOURCES.md`) y validarlo como JSON.
- [x] 3.4 Commit por rutas explícitas con mensaje convencional en español, sin atribuciones.
