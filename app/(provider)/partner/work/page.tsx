import Link from "next/link";
import { getProviderMode } from "@/lib/provider/modes";

export default function PartnerWorkPage() {
  const mode = getProviderMode("captain");

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">{mode.workLabel}</h1>
      <div className="grid gap-3">
        {["job-1", "job-2"].map((id) => (
          <Link key={id} href={`/partner/work/${id}`} className="card block hover:border-brand-300">
            <p className="font-medium">{mode.workLabel.slice(0, -1)} #{id}</p>
            <p className="text-sm text-slate-500">Status: assigned</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
