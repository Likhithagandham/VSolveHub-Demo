import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/session";
import {
  getBookingByRef,
  getSimulatedStatus,
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

  const currentIndex = BOOKING_STATUSES.indexOf(status);
  const nextStatus =
    currentIndex < BOOKING_STATUSES.length - 1
      ? BOOKING_STATUSES[currentIndex + 1]
      : null;

  return NextResponse.json({
    bookingRef: booking.bookingRef,
    status,
    message: getStatusMessage(status),
    nextStatus,
    simulatedAt: new Date().toISOString(),
    progress: {
      current: currentIndex + 1,
      total: BOOKING_STATUSES.length,
    },
  });
}

export async function POST(_req: NextRequest, context: RouteContext) {
  const { ref } = await context.params;
  const session = await getServerSession();

  const booking = await getBookingByRef(ref, session?.id);
  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  const status = getSimulatedStatus(booking.createdAt, booking.status);
  await syncBookingStatus(booking.id, booking.createdAt, booking.status);

  return NextResponse.json({
    bookingRef: booking.bookingRef,
    status,
    message: getStatusMessage(status),
  });
}
