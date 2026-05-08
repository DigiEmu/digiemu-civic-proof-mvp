const steps = [
  "EVENT CREATED",
  "DECISION RECORDED",
  "BELEG GENERATED",
  "SNAPSHOT HASHED",
  "VERIFIED",
];

export function ProcessSteps() {
  return (
    <div className="grid md:grid-cols-5 gap-3 pt-4">
      {steps.map((step) => (
        <div
          key={step}
          className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-center text-xs font-semibold text-cyan-300"
        >
          {step}
        </div>
      ))}
    </div>
  );
}