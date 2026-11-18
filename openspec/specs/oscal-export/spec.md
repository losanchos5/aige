# oscal-export Specification

## Purpose
TBD - created by archiving change oscal-catalog-export. Update Purpose after archive.

## Requirements

### Requirement: Catálogo de controles en OSCAL

El sitio SHALL publicar `/oscal/catalog.json` como un `catalog` OSCAL 1.2.3 con todos los controles
abiertos, agrupados por perfil, generado en el build desde los mismos datos que `/controls`. Cada
control SHALL llevar su identificador, título, objetivo como `statement`, un enlace a su página y
sus fuentes. El catálogo MUST NOT contener mapeos a otros marcos ni datos que la web no publique.

#### Scenario: Importar el catálogo

- **WHEN** una herramienta descarga `/oscal/catalog.json`
- **THEN** obtiene un documento que valida contra el esquema de catálogo de OSCAL 1.2.3 y contiene
  los mismos identificadores de control que `/api/v1/controls.json`

#### Scenario: Control nuevo en los datos

- **WHEN** se añade un control a un perfil
- **THEN** aparece en el catálogo y en el perfil OSCAL de ese perfil sin tocar otro fichero

### Requirement: Perfiles en OSCAL

El sitio SHALL publicar `/oscal/profiles/<slug>.json` por cada perfil de controles, como un
`profile` OSCAL que importa el catálogo y selecciona por identificador los controles de ese perfil.
La versión del documento SHALL ser la del perfil y su DOI, cuando existe, SHALL figurar en los
metadatos.

#### Scenario: Perfil y catálogo coherentes

- **WHEN** se lee cualquier perfil publicado
- **THEN** cada identificador que selecciona existe en el catálogo, y la unión de todos los perfiles
  es el catálogo completo

### Requirement: Mapeo de controles en OSCAL

El sitio SHALL publicar `/oscal/mappings/controls.json` como un `mapping-collection` OSCAL con un
mapeo por marco del crosswalk de controles, del catálogo propio hacia ese marco. La relación SHALL
ser `intersects-with` y el documento MUST decir que significa afinidad temática y no equivalencia
ni conformidad.

#### Scenario: Par de mapeo

- **WHEN** un control cita una cláusula de un marco en sus datos
- **THEN** la colección contiene un par cuyo origen es ese control y cuyo destino es esa cláusula,
  con la referencia original como etiqueta

### Requirement: Ficheros reproducibles

Los ficheros OSCAL MUST ser deterministas: dos builds del mismo commit SHALL producir los mismos
bytes, incluidos los `uuid` y `last-modified`.

#### Scenario: Dos builds del mismo commit

- **WHEN** se construye el sitio dos veces sin cambiar los datos
- **THEN** los ficheros de `/oscal/` son idénticos

### Requirement: Validación contra el esquema de NIST

El build MUST fallar si un fichero de `/oscal/` no valida contra el esquema JSON de OSCAL 1.2.3 de
su modelo, si el catálogo repite un identificador o si un perfil o un mapeo nombra un control que el
catálogo no tiene. La exportación OSCAL del explorador del crosswalk SHALL validarse contra el
esquema de mapeo en la suite de pruebas.

#### Scenario: Fichero inválido

- **WHEN** un cambio hace que `/oscal/catalog.json` deje de cumplir el esquema
- **THEN** `npm run build` termina con error y nombra el fichero y la regla

#### Scenario: Descarga del explorador

- **WHEN** la prueba del explorador descarga una selección en OSCAL
- **THEN** el documento valida contra el esquema de mapeo de OSCAL 1.2.3

### Requirement: Ficheros OSCAL localizables

`/resources/data` SHALL describir los ficheros OSCAL, su versión, su licencia y el significado de la
relación de mapeo, `/controls` SHALL enlazar el catálogo y `llms.txt` SHALL listarlos.

#### Scenario: Buscar la descarga

- **WHEN** alguien abre `/resources/data`
- **THEN** encuentra los enlaces a `/oscal/catalog.json`, a los perfiles y a
  `/oscal/mappings/controls.json`
