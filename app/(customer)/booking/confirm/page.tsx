import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

type Props = { searchParams: { ref?: string } };

export default function BookingConfirmPage({ searchParams }: Props) {
  const ref = searchParams.ref ?? "VSH-DEMO";

  return (
    <div className="mx-auto max-w-md text-center">
      <div className="card">
        <Badge variant="success">Booking confirmed</Badge>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">You&apos;re all set!</h1>
        <p className="mt-2 text-slate-600">Your booking reference:</p>
        <p className="mt-1 font-mono text-lg font-bold text-brand-600">{ref}</p>
        <div className="mt-6 flex flex-col gap-2">
          <Link href={`/booking/track?ref=${ref}`} className="btn-primary inline-block">
            Track booking
          </Link>
          <Link href="/" className="btn-secondary inline-block">Back to home</Link>
        </div>
      </div>
    </div>
  );
}
