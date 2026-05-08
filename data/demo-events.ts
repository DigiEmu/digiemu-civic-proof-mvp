import type { CivicEvent } from "@/types/civic";

export const demoEvents: CivicEvent[] = [
  {
    project_id: "PRJ-2026-0001",
    event_id: "EVT-2026-0001",
    decision_id: "DEC-2026-0001",
    belegnummer: "BEL-2026-0001",
    title: "CO₂-Prüfung Bauprojekt A",
    co2_kg: 125,
    budget_chf: 25000,
    decision: "REVIEW",
    audit_note: "Initialer Behörden-/CO₂-Vorgang für DigiEmu Civic Proof MVP",
  },
  {
    project_id: "PRJ-2026-0002",
    event_id: "EVT-2026-0002",
    decision_id: "DEC-2026-0002",
    belegnummer: "BEL-2026-0002",
    title: "Budgetprüfung Sanierung B",
    co2_kg: 80,
    budget_chf: 48000,
    decision: "APPROVED",
    audit_note: "Sanierungsprojekt mit Budgetprüfung und Audit-Nachweis.",
  },
  {
    project_id: "PRJ-2026-0003",
    event_id: "EVT-2026-0003",
    decision_id: "DEC-2026-0003",
    belegnummer: "BEL-2026-0003",
    title: "ESG-Nachweis Sonderprojekt C",
    co2_kg: 210,
    budget_chf: 92000,
    decision: "REVIEW",
    audit_note: "Sonderprojekt mit ESG-/CO₂-Nachweis und prüfbarer Entscheidung.",
  },
];

export const demoEvent = demoEvents[0];