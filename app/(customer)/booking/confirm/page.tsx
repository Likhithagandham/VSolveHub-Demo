import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookingByRef } from "@/lib/bookings/queries";
import { getServerSession } from "@/lib/auth/session";
import { formatPrice, formatDate } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { STATUS_MESSAGES } from "@/lib/constants";

type PageProps = {
  searchParams: Promise<{ ref?: string }>;
};

export default async function BookingConfirmPage({ searchParams }: PageProps) {
  const { ref } = await searchParams;
  if (!ref) notFound();

  const session = await getServerSession();
  const booking = await getBookingByRef(ref, session?.id);
  if (!booking) notFound();

  return (
    <div className="page-content stack-lg" style={{ maxWidth: "32rem", margin: "0 auto" }}>
      <div className="text-center">
        <p style={{ fontSize: "2.5rem", margin: 0 }}>✓</p>
        <h1 className="page-title">Booking confirmed</h1>
        <p className="page-subtitle">Your request has been placed successfully.</p>
      </div>

      <div className="card stack">
        <div className="flex-between">
          <div>
            <p className="text-sm text-muted">Reference</p>
            <p className="card-title">{booking.bookingRef}</p>
          </div>
          <Badge status={booking.status}>{booking.status}</Badge>
        </div>

        <p className="alert alert-info">{STATUS_MESSAGES.SEARCHING}</p>

        <div>
          <p className="text-sm text-muted">Service</p>
          <p>{booking.service.name}</p>
        </div>
        <div>
          <p className="text-sm text-muted">Time slot</p>
          <p>
            {formatDate(booking.slot)} —{" "}
            {new Date(booking.slot).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted">Address</p>
          <p>{booking.address.fullAddress}</p>
        </div>
        <div>
          <p className="text-sm text-muted">Amount</p>
          <p className="detail-price">{formatPrice(booking.quotedAmount)}</p>
        </div>
      </div>

      <Link href={`/booking/track/${booking.bookingRef}`} className="btn btn-primary btn-block" style={{ textAlign: "center" }}>
        Track booking
      </Link>
      <Link href="/" className="btn btn-secondary btn-block" style={{ textAlign: "center" }}>
        Back to home
      </Link>
    </div>
  );
}
