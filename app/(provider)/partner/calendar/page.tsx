import { getProviderMode } from "@/lib/provider/modes";

export default function PartnerCalendarPage() {
  const mode = getProviderMode("captain");

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Availability</h1>
      <div className="card">
        <p className="text-sm text-slate-600">
          Mode: <strong>{mode.availabilityType}</strong> — toggle · schedule · stock · beds · blackout
        </p>
        <p className="mt-2 text-sm text-slate-500">Calendar UI placeholder.</p>
      </div>
    </div>
  );
}
