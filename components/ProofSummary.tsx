import type { CivicEvent, VerificationStatus } from "@/types/civic";

type ProofSummaryProps = {
  snapshot: CivicEvent;
  status: VerificationStatus | "";
};

export function ProofSummary({ snapshot, status }: ProofSummaryProps) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="bg-slate-800 rounded-xl p-4">
        <p className="text-sm text-slate-400">Projekt</p>
        <p className="font-mono text-cyan-300">{snapshot.project_id}</p>
      </div>

      <div className="bg-slate-800 rounded-xl p-4">
        <p className="text-sm text-slate-400">Belegnummer</p>
        <p className="font-mono text-cyan-300">{snapshot.belegnummer}</p>
      </div>

      <div className="bg-slate-800 rounded-xl p-4">
        <p className="text-sm text-slate-400">Verification Status</p>
        <p
          className={`font-bold text-2xl ${
            status === "PASS" ? "text-green-400" : "text-red-400"
          }`}
        >
          {status || "—"}
        </p>
      </div>
    </div>
  );
}