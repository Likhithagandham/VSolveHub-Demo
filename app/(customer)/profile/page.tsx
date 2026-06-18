import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth/session";
import { ProfileNav, LogoutButton } from "@/components/customer/profile/ProfileNav";
import { formatPhone } from "@/lib/format";
import { getUserBookings } from "@/lib/bookings/queries";
import { prisma } from "@/lib/db/client";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await getServerSession();
  if (!session) redirect("/booking/otp?redirect=/profile");

  const [bookings, savedCount, addressCount] = await Promise.all([
    getUserBookings(session.id),
    prisma.savedService.count({ where: { userId: session.id } }),
    prisma.address.count({ where: { userId: session.id } }),
  ]);

  return (
    <div className="page-content">
      <div className="flex-between" style={{ marginBottom: "1rem" }}>
        <div>
          <h1 className="page-title">Profile</h1>
          <p className="page-subtitle">{session.name ?? "VSolveHub customer"}</p>
        </div>
        <LogoutButton />
      </div>

      <ProfileNav />

      <div className="card stack">
        <div>
          <p className="text-sm text-muted">Phone</p>
          <p>{formatPhone(session.phone)}</p>
        </div>
        <div className="grid-3">
          <div className="card text-center">
            <p className="card-title">{bookings.length}</p>
            <p className="card-text">Bookings</p>
          </div>
          <div className="card text-center">
            <p className="card-title">{savedCount}</p>
            <p className="card-text">Saved</p>
          </div>
          <div className="card text-center">
            <p className="card-title">{addressCount}</p>
            <p className="card-text">Addresses</p>
          </div>
        </div>
      </div>

      {bookings.length > 0 && (
        <section className="section">
          <div className="flex-between">
            <h2 className="section-title" style={{ margin: 0 }}>
              Recent bookings
            </h2>
            <Link href="/profile/bookings" className="text-sm" style={{ color: "var(--color-brand)" }}>
              View all
            </Link>
          </div>
          <div className="stack mt-2">
            {bookings.slice(0, 3).map((b) => (
              <Link key={b.id} href={`/booking/track/${b.bookingRef}`} className="card">
                <div className="flex-between">
                  <p className="card-title">{b.service.name}</p>
                  <span className="text-sm text-muted">{b.status}</span>
                </div>
                <p className="card-text">{b.bookingRef}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
