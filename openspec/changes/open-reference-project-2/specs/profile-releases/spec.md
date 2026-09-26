# Spec Delta

## Purpose

Hace citable cada versión de un perfil de control con su propio DOI y deja un procedimiento
reproducible para empaquetar y depositar la versión en Zenodo sin guardar credenciales.

## ADDED Requirements

### Requirement: DOI por versión de perfil
Un perfil MAY declarar `doi` (DOI de la versión) y `conceptDoi` (DOI de concepto del perfil). Cuando
existen, la cita y la procedencia de la página del perfil y de sus páginas de control, el campo
`citation` del JSON del perfil y el front matter de su twin `.md` MUST mostrarlos. Cuando no existen,
MUST citarse el DOI de concepto del proyecto, como hasta ahora. Un DOI MUST NOT inventarse ni
escribirse antes de que el depósito exista.

#### Scenario: Perfil sin DOI propio
- **WHEN** un perfil no declara `doi`
- **THEN** su cita usa el DOI de concepto del proyecto y el JSON emite `doi: null`

#### Scenario: Perfil con DOI
- **WHEN** un perfil declara `doi`
- **THEN** la página, el JSON y el twin muestran ese DOI

### Requirement: Paquete de publicación de un perfil
`site/scripts/profile-release.mjs <slug>` SHALL construir, a partir de `dist`, un paquete de
publicación en `dist/releases/<slug>-v<version>/` con el JSON del perfil de la API, el twin `.md`,
el esquema `control-observation.v1.json`, un README con la cita y un `CITATION.cff` del perfil, e
imprimir los metadatos de Zenodo: título "AIGE Control Profile: <título> v<versión>", creadores desde
`people.ts`, licencia CC BY 4.0, palabras clave, versión e identificador relacionado igual al DOI de
concepto del proyecto. Sin token SHALL funcionar en modo dry-run y MUST NOT llamar a la red. Con
token SHALL usar la API REST de Zenodo leyendo el token de una variable de entorno en tiempo de
ejecución, apuntar por defecto a `sandbox.zenodo.org` y exigir un flag explícito para producción. El
token MUST NOT escribirse en el repositorio, en registros ni en la memoria.

#### Scenario: Dry-run
- **WHEN** se ejecuta el script sin token tras una build
- **THEN** crea el paquete, imprime los metadatos y no hace ninguna petición HTTP

#### Scenario: Producción protegida
- **WHEN** se ejecuta con token pero sin el flag de producción
- **THEN** el depósito va al sandbox de Zenodo
