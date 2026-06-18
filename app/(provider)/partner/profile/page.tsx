import { Badge } from "@/components/ui/Badge";
import { getProviderMode } from "@/lib/provider/modes";

export default function PartnerProfilePage() {
  const mode = getProviderMode("captain");

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Partner profile</h1>
      <div className="card space-y-3">
        <p><span className="text-slate-500">Type:</span> {mode.label}</p>
        <p><span className="text-slate-500">KYC:</span> <Badge variant="warning">pending</Badge></p>
        <p className="text-sm text-slate-500">Required docs: {mode.kycDocs.join(", ")}</p>
      </div>
    </div>
  );
}
