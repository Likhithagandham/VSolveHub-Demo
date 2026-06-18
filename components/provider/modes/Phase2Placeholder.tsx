import { Badge } from "@/components/ui/Badge";
import type { ProviderMode } from "@/lib/provider/modes";

export function Phase2Placeholder({ mode }: { mode: ProviderMode }) {
  return (
    <div className="card text-center">
      <Badge variant="warning">Phase 2 — TODO</Badge>
      <h3 className="mt-3 font-semibold text-slate-900">{mode.dashboardTitle}</h3>
      <p className="mt-2 text-sm text-slate-500">
        {mode.label} mode: {mode.surface} management, {mode.leadType} leads, {mode.availabilityType} availability.
      </p>
    </div>
  );
}
