import type { CivicEvent } from "@/types/civic";

type SnapshotViewerProps = {
  snapshot: CivicEvent;
  hash: string;
  replayHash: string;
};

export function SnapshotViewer({
  snapshot,
  hash,
  replayHash,
}: SnapshotViewerProps) {
  return (
    <div className="space-y-4">
      <div className="bg-slate-800 rounded-xl p-4 overflow-auto">
        <p className="text-sm text-slate-400 mb-2">Snapshot</p>
        <pre className="text-xs text-slate-200">
          {JSON.stringify(snapshot, null, 2)}
        </pre>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-800 rounded-xl p-4 overflow-auto">
          <p className="text-sm text-slate-400 mb-2">Original Hash</p>
          <p className="font-mono text-xs break-all">{hash}</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 overflow-auto">
          <p className="text-sm text-slate-400 mb-2">Replay Hash</p>
          <p className="font-mono text-xs break-all">{replayHash}</p>
        </div>
      </div>
    </div>
  );
}