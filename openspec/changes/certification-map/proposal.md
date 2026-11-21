# Proposal

## Why

Jordi pidió el 2026-11-18 un mapa de certificaciones de IA y de gobierno de la IA en el espíritu del
Security Certification Roadmap de Paul Jerimy: "de ai governance y ai están sacando muchas
certificaciones aparte del AIGP". Hoy `/for/certifications` describe cinco esquemas y ya va por
detrás: ISACA tiene AAIR en vigor desde el 2026-04-15 y AAIG en beta, y la página solo nombra AAISM
y AAIA. La investigación del 2026-11-18 en fuentes de los emisores encontró 89 credenciales
personales.

La estrategia aprobada el 2026-11-17 congeló el contenido nuevo. Este cambio añade contenido porque
Jordi lo pidió de forma explícita después, y se limita a lo que pidió.

## What Changes

- `/for/certifications` gana un mapa de 51 credenciales personales de gobierno, auditoría, riesgo,
  sistemas de gestión (ISO/IEC 42001), seguridad y fundamentos de IA, colocadas por dos ejes que no
  son opinión: el tema que nombra el título y lo que el emisor exige antes del examen (nada
  declarado, formación obligatoria, experiencia, credencial previa). Va en un panel opaco sobre una
  pintura de Monet. Mockup aprobado: variante "columns" en
  `D:/Documents/aige-media/mockups/certification-map/variant-columns.html`.
- Un bloque aparte con 33 certificaciones técnicas de proveedores (AWS, Microsoft, Google Cloud,
  NVIDIA, Databricks, Anthropic, Snowflake), agrupadas por proveedor y con el nivel en palabras del
  propio proveedor, sin escala común.
- Una tabla de hechos con una fila por credencial: emisor, nombre oficial, tipo, estado, requisito,
  precio si el emisor lo publica, enlace a la fuente primaria y fecha de comprobación, y qué no se
  pudo comprobar en la página del emisor.
- Un fichero de datos único, pensado para que lo corrija cualquiera: cada entrada obliga a fuente
  primaria y fecha, la compilación rechaza la que no las traiga, y la página enlaza la vía de
  corrección y el propio fichero.
- Quedan fuera las cinco entradas sin ningún hecho comprobado (dos de Oracle, dos de IBM y una de
  Salesforce, cuyas webs bloquearon la lectura), por decisión de Jordi, hasta que alguien las
  confirme en fuente primaria.
- Las secciones actuales por esquema (AIGP, ISO/IEC 42001, AAISM, AAIA), su figura y sus fuentes
  numeradas se quedan como están.

Cómo se mantiene al día (el sitio no tiene hoy un calendario de revisión escrito): la fecha de
comprobación se ve en cada fila; una entrada con más de doce meses sin comprobar sale marcada; el
flujo semanal `link-rot` ya revisa los enlaces de `site/src/data/*.ts`; y el proyecto es abierto,
así que cualquiera puede corregir una entrada por issue o por PR.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `certifications-overview`: se añaden el mapa de credenciales, el bloque de proveedores, la tabla
  de hechos, la regla de fuente y fecha por entrada, la neutralidad de la posición y la vía de
  corrección; y se acota el requisito actual de fuentes numeradas a las secciones por esquema.

## Impact

- Nuevo `site/src/data/certifications.ts` (84 entradas, tipos, etiquetas y comprobación de datos).
- `site/src/pages/for/certifications.astro` y sus estilos: tres secciones nuevas, índice, fecha del
  resumen y nota de no afiliación. Componentes nuevos de página para el mapa y la tabla.
- `site/src/pages/role/competencies.astro`: un enlace al mapa en "Method and limits".
- `CONTRIBUTING.md`: cómo corregir o añadir una credencial.
- Pruebas de la página (`site/tests`), pasadas por la puerta de la skill `test-audit`.
- Sin dependencias nuevas. Sin conjunto nuevo en la API ni en el servidor MCP, y sin fuentes nuevas
  en `tools/reg-monitor` (ver Non-Goals en `design.md`).
- Texto nuevo que Jordi aprueba antes del merge: está en
  `D:/Documents/aige-media/mockups/certification-map/copy.md`.
