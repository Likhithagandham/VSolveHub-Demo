import { PartnerNav } from "@/components/provider/PartnerNav";

// Provider shell — detects provider_type and mounts matching mode
export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: read provider_type from session; default to captain for dev
  const providerType = "captain";

  return (
    <div className="-mx-4 -mt-6">
      <div className="border-b border-slate-200 bg-slate-900 px-4 py-3 text-white">
        <p className="text-sm font-medium">Partner Portal</p>
        <p className="text-xs text-slate-400">Mode: {providerType}</p>
      </div>
      <PartnerNav />
      <div className="px-4 py-6">{children}</div>
    </div>
  );
}
