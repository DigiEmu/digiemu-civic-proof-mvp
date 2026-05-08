export type DecisionStatus = "APPROVED" | "REVIEW" | "REJECTED";

export type VerificationStatus = "PASS" | "FAIL";

export type CivicEvent = {
  project_id: string;
  event_id: string;
  decision_id: string;
  belegnummer: string;
  title: string;
  co2_kg: number;
  budget_chf: number;
  decision: DecisionStatus;
  audit_note: string;
};