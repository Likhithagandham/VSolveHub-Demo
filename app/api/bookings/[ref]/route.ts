import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/session";
import {
  getBookingByRef,
  getStatusMessage,
  syncBookingStatus,
} from "@/lib/bookings/queries";
import { BOOKING_STATUSES } from "@/lib/constants";

type RouteContext = { params: Promise<{ ref: string }> };

export async function GET(_req: NextRequest, context: RouteContext) {
  const { ref } = await context.params;
  const session = await getServerSession();

  const booking = await getBookingByRef(ref, session?.id);
  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  const status = await syncBookingStatus(
    booking.id,
    booking.createdAt,
    booking.status
  );

  return NextResponse.json({
    bookingRef: booking.bookingRef,
    status,
    message: getStatusMessage(status),
    service: {
      name: booking.service.name,
      slug: booking.service.slug,
      categorySlug: booking.service.category.slug,
    },
    slot: booking.slot,
    address: booking.address.fullAddress,
    quotedAmount: booking.quotedAmount,
    createdAt: booking.createdAt,
    statusLogs: booking.statusLogs,
    statuses: BOOKING_STATUSES,
  });
}
