import type { VerificationStatus } from "@/types/civic";

type TrafficLightProps = {
  status: VerificationStatus | "";
};

export function TrafficLight({ status }: TrafficLightProps) {
  const color =
    status === "PASS"
      ? "bg-green-400"
      : status === "FAIL"
      ? "bg-red-500"
      : "bg-yellow-400";

  const label =
    status === "PASS"
      ? "Verifiziert"
      : status === "FAIL"
      ? "Manipulation erkannt"
      : "Wartet auf Prüfung";

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
      <p className="text-sm text-slate-400 mb-3">Ampelstatus</p>

      <div className="flex items-center gap-4">
        <div className={`h-8 w-8 rounded-full ${color} shadow-lg`} />

        <div>
          <p className="font-bold text-white">{label}</p>
          <p className="text-sm text-slate-400">
            Grün = PASS, Rot = FAIL, Gelb = Review / noch nicht geprüft
          </p>
        </div>
      </div>
    </div>
  );
}