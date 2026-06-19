import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "@/lib/auth/session";
import { ProfileSubPage } from "@/components/customer/profile/ProfileSubPage";
import { ProfileBookingsSummary } from "@/components/customer/profile/ProfileStats";
import { getUserBookings } from "@/lib/bookings/queries";
import { formatPrice, formatDate } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";

export default async function ProfileBookingsPage() {
  const session = await getServerSession();
  if (!session) redirect("/booking/otp?redirect=/profile/bookings");

  const bookings = await getUserBookings(session.id);
  const totalPaise = bookings.reduce((sum, b) => sum + b.quotedAmount, 0);

  return (
    <ProfileSubPage title="My bookings">
      <ProfileBookingsSummary count={bookings.length} totalPaise={totalPaise} />
      {bookings.length === 0 ? (
        <div className="empty-state">
          <p>No bookings yet.</p>
          <Link href="/services" className="btn btn-primary">
            Browse services
          </Link>
        </div>
      ) : (
        <div className="stack">
          {bookings.map((b) => (
            <Link key={b.id} href={`/booking/track/${b.bookingRef}`} className="card">
              <div className="flex-between">
                <p className="card-title">{b.service.name}</p>
                <Badge status={b.status}>{b.status.replace(/_/g, " ")}</Badge>
              </div>
              <p className="card-text">{b.bookingRef}</p>
              <p className="text-sm text-muted">
                {formatDate(b.slot)} · {formatPrice(b.quotedAmount)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </ProfileSubPage>
  );
}
