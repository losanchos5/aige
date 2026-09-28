# Spec Delta

## ADDED Requirements

### Requirement: IMDA Agentic AI como fuente paginada de los patrones de agentes
Los patrones Agent Registry, Agent Identity & Scoped Credentials y Human-in-the-loop Gate SHALL
citar el Model AI Governance Framework for Agentic AI v1.5 del IMDA con la página del pasaje que
respalda cada afirmación. Ninguna página MUST atribuir al IMDA el término "kill switch", que el
documento no usa.

#### Scenario: Cita con página
- **WHEN** el lector abre `/patterns/agent-registry`
- **THEN** la lista de fuentes incluye el IMDA v1.5 con la página del pasaje sobre identidades de
  agente "catalogued and centrally managed"
