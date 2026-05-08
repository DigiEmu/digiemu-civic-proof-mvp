import type { CivicEvent } from "@/types/civic";

type DemoStatsProps = {
  events: CivicEvent[];
};

export function DemoStats({ events }: DemoStatsProps) {
  const totalCo2 = events.reduce((sum, event) => sum + event.co2_kg, 0);
  const totalBudget = events.reduce((sum, event) => sum + event.budget_chf, 0);
  const approved = events.filter((event) => event.decision === "APPROVED").length;
  const review = events.filter((event) => event.decision === "REVIEW").length;
  const rejected = events.filter((event) => event.decision === "REJECTED").length;

  return (
    <section className="grid md:grid-cols-5 gap-4">
      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">Demo-Vorgänge</p>
        <p className="mt-2 text-3xl font-bold text-white">{events.length}</p>
      </div>

      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">CO₂ gesamt</p>
        <p className="mt-2 text-3xl font-bold text-cyan-300">{totalCo2} kg</p>
      </div>

      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">Budget gesamt</p>
        <p className="mt-2 text-3xl font-bold text-cyan-300">
          {totalBudget.toLocaleString("de-CH")} CHF
        </p>
      </div>

      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">Approved</p>
        <p className="mt-2 text-3xl font-bold text-green-400">{approved}</p>
      </div>

      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">Review / Rejected</p>
        <p className="mt-2 text-3xl font-bold text-yellow-400">
          {review} / {rejected}
        </p>
      </div>
    </section>
  );
}