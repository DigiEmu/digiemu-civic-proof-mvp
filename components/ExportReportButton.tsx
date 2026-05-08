import type { AuditEntry } from "@/lib/audit";
import type { CivicEvent, VerificationStatus } from "@/types/civic";

type ExportReportButtonProps = {
  snapshot: CivicEvent;
  hash: string;
  replayHash: string;
  status: VerificationStatus | "";
  auditLog: AuditEntry[];
};

export function ExportReportButton({
  snapshot,
  hash,
  replayHash,
  status,
  auditLog,
}: ExportReportButtonProps) {
  function exportReport() {
    const report = {
      report_type: "DigiEmu Civic Proof Audit Report",
      generated_at: new Date().toISOString(),
      verification_status: status,
      snapshot,
      original_hash: hash,
      replay_hash: replayHash,
      audit_log: auditLog,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `digiemu-civic-proof-${snapshot.belegnummer}.json`;
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={exportReport}
      className="rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-3"
    >
      Audit Report als JSON exportieren
    </button>
  );
}