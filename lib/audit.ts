export type AuditAction =
  | "EVENT_CREATED"
  | "DECISION_RECORDED"
  | "BELEG_GENERATED"
  | "SNAPSHOT_HASHED"
  | "VERIFIED_PASS"
  | "VERIFIED_FAIL";

export type AuditEntry = {
  id: string;
  action: AuditAction;
  message: string;
  created_at: string;
};

export function createAuditEntry(
  action: AuditAction,
  message: string
): AuditEntry {
  return {
    id: `AUD-${Date.now()}-${Math.floor(Math.random() * 9999)}`,
    action,
    message,
    created_at: new Date().toISOString(),
  };
}

export function createInitialAuditLog(status: "PASS" | "FAIL"): AuditEntry[] {
  return [
    createAuditEntry("EVENT_CREATED", "Vorgang wurde erstellt."),
    createAuditEntry("DECISION_RECORDED", "Entscheidung wurde gespeichert."),
    createAuditEntry("BELEG_GENERATED", "Belegnummer wurde erzeugt."),
    createAuditEntry("SNAPSHOT_HASHED", "Snapshot wurde kanonisiert und gehasht."),
    createAuditEntry(
      status === "PASS" ? "VERIFIED_PASS" : "VERIFIED_FAIL",
      status === "PASS"
        ? "Replay stimmt mit Original überein."
        : "Replay weicht vom Original ab."
    ),
  ];
}