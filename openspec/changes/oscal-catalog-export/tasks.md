# Tasks

## 1. Preparación

- [x] 1.1 Declarar `ajv` en `devDependencies` de `site/package.json` con la versión ya instalada y actualizar solo el lockfile; verificar que `npm ci --dry-run` no pide cambios
- [x] 1.2 Copiar a `site/scripts/oscal/` los esquemas JSON de catálogo, perfil y mapeo de OSCAL v1.2.3 con un `README` (URL de origen, licencia CC0, SHA-256); verificar los hashes contra los ficheros de la release

## 2. Generación

- [x] 2.1 Escribir `site/src/lib/oscal.ts` (catálogo, perfil y mapeo de controles, UUID v5 y fecha deterministas) según `design.md` D2 a D6; verificar que no usa el reloj ni valores aleatorios
- [x] 2.2 Crear los endpoints `site/src/pages/oscal/catalog.json.ts`, `profiles/[slug].json.ts` y `mappings/controls.json.ts`; verificar en el build que salen los 7 ficheros

## 3. Validación

- [x] 3.1 Escribir `site/scripts/oscal-check.mjs` según D7 y añadirlo al final de `npm run build`; verificar que falla con un fichero alterado a mano y pasa con los generados
- [x] 3.2 Añadir `site/tests/oscal.spec.ts` (identificadores del catálogo y de cada perfil frente a `/api/v1/controls.json`) y sustituir en `site/tests/crosswalk-explorer.spec.ts` la lista manual de campos por la validación contra el esquema de mapeo, tras pasar la puerta de `test-audit`; verificar que la CI las ejecuta en verde

## 4. Publicación en la web

- [x] 4.1 Añadir la sección OSCAL a `site/src/pages/resources/data.astro`, el enlace en `site/src/pages/controls/index.astro` con el evento `download` y la entrada en `site/src/pages/llms.txt.ts`; verificar los enlaces en el HTML generado
- [x] 4.2 Corregir la descripción del conjunto `crosswalk` en `site/src/lib/api.ts` para que sus cifras salgan de los datos; verificar con `tests/api.spec.ts`

## 5. Revisión y entrega

- [x] 5.1 Revisión con `code-reviewer` (forma OSCAL, determinismo, pruebas); verificar que no quedan hallazgos críticos ni altos
- [ ] 5.2 Abrir el PR y esperar la CI; verificar que termina en verde
- [ ] 5.3 Tras el merge, comprobar en producción los 7 ficheros (`200`, JSON) y validar el catálogo descargado contra el esquema
