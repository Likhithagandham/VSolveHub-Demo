import { StatusTimeline } from "@/components/customer/booking/StatusTimeline";

type Props = { searchParams: { ref?: string } };

export default function BookingTrackPage({ searchParams }: Props) {
  const ref = searchParams.ref ?? "VSH-DEMO";

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Track booking</h1>
      <p className="text-sm text-slate-500">Ref: <span className="font-mono font-medium">{ref}</span></p>
      <StatusTimeline archetype="A" currentStatus="dispatching" />
    </div>
  );
}
