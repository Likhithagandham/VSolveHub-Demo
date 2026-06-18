import { ModeDashboard } from "@/components/provider/modes/ModeDashboard";

export default function PartnerDashboardPage() {
  const providerType = "captain";
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      <ModeDashboard providerType={providerType} />
    </div>
  );
}
