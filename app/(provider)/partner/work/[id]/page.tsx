import { JobLifecycle } from "@/components/provider/modes/captain/CaptainMode";
import { Badge } from "@/components/ui/Badge";

type Props = { params: { id: string } };

export default function PartnerWorkDetailPage({ params }: Props) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Work item</h1>
      <Badge variant="info">ID: {params.id}</Badge>
      <JobLifecycle jobId={params.id} />
    </div>
  );
}
