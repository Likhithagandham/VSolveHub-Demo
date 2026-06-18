import { getBookingFlow } from "@/lib/booking/archetypes";
import { Badge } from "@/components/ui/Badge";

type Props = {
  archetype: string;
  currentStatus: string;
};

export function StatusTimeline({ archetype, currentStatus }: Props) {
  const flow = getBookingFlow(archetype);
  const currentIdx = flow.statuses.findIndex((s) => s.code === currentStatus);

  return (
    <div className="card">
      <h3 className="mb-4 font-semibold text-slate-900">Booking status</h3>
      <ol className="space-y-3">
        {flow.statuses.map((status, idx) => {
          const isDone = idx < currentIdx;
          const isCurrent = idx === currentIdx;
          return (
            <li key={status.code} className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  isDone
                    ? "bg-green-500 text-white"
                    : isCurrent
                      ? "bg-brand-600 text-white"
                      : "bg-slate-200 text-slate-500"
                }`}
              >
                {isDone ? "✓" : idx + 1}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <p className={`text-sm font-medium ${isCurrent ? "text-brand-700" : "text-slate-700"}`}>
                    {status.label}
                  </p>
                  {isCurrent && <Badge variant="info">Current</Badge>}
                </div>
                {status.description && (
                  <p className="text-xs text-slate-500">{status.description}</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
