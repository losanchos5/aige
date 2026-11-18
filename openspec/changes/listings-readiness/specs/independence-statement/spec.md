## ADDED Requirements

### Requirement: Declaración de independencia y financiación

El sitio SHALL publicar `/about/independence` con: quién paga el sitio; que no hay patrocinios,
publicidad ni enlaces de afiliado; qué relación tiene el autor con laboratorios de IA, proveedores,
organismos de normalización y esquemas de certificación; que es un proyecto personal y no de un
empleador; qué trabajo de pago hace o puede hacer el autor en este campo; y cómo se corrige un
error. La página SHALL comprometerse a anunciar en ella cualquier producto o servicio de pago del
autor relacionado con la materia antes de su lanzamiento. La página MUST NOT afirmar que el autor
carece de intereses comerciales, y SHALL llevar la fecha de su última revisión. El texto MUST
contar con la confirmación de Jordi antes de publicarse.

#### Scenario: Lector que evalúa la neutralidad

- **WHEN** alguien abre `/about/independence`
- **THEN** encuentra quién financia el sitio, las relaciones declaradas y la fecha de la declaración

#### Scenario: Compromiso sobre productos de pago

- **WHEN** alguien busca si el autor vende algo
- **THEN** la página dice qué ofrece hoy y que cualquier producto o servicio de pago relacionado se
  anunciará ahí antes de lanzarse

#### Scenario: Metodología enlaza la declaración

- **WHEN** alguien lee `/about/methodology`
- **THEN** encuentra un enlace a `/about/independence`
