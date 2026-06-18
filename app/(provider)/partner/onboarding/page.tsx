import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PROVIDER_MODES } from "@/lib/provider/modes";

export default function PartnerOnboardingPage() {
  const modes = Object.values(PROVIDER_MODES);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Partner onboarding</h1>
      <p className="text-slate-600">Choose your provider type and complete KYC.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {modes.map((mode) => (
          <div key={mode.type} className="card">
            <h3 className="font-semibold">{mode.label}</h3>
            <p className="mt-1 text-sm text-slate-500">KYC: {mode.kycDocs.join(", ")}</p>
            <Link href="/partner/dashboard" className="mt-3 inline-block">
              <Button variant="secondary">Select {mode.label}</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
