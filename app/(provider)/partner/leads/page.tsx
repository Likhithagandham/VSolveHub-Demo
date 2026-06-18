import { Badge } from "@/components/ui/Badge";
import { getProviderMode } from "@/lib/provider/modes";

export default function PartnerLeadsPage() {
  const mode = getProviderMode("captain");

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
      {mode.leadType === "30s-alert" ? (
        <div className="card">
          <Badge variant="warning">30s alerts</Badge>
          <p className="mt-2 text-sm text-slate-600">Captain mode: real-time job offers appear on the dashboard when online.</p>
        </div>
      ) : (
        <div className="card">
          <Badge variant="info">Inbox — Phase 2 TODO</Badge>
          <p className="mt-2 text-sm text-slate-600">Request inbox with SLA tracking.</p>
        </div>
      )}
    </div>
  );
}
