import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/session";
import {
  getBookingByRef,
  getSimulatedStatus,
  getStatusMessage,
  isMarketplaceBooking,
  syncBookingStatus,
} from "@/lib/bookings/queries";
import { BOOKING_STATUSES, MARKETPLACE_TIMELINE, normalizeBookingStatus } from "@/lib/constants";
import { processExpiredOffersAndRedispatch } from "@/lib/fulfillment/push-dispatch";

type RouteContext = { params: Promise<{ ref: string }> };

export async function GET(_req: NextRequest, context: RouteContext) {
  const { ref } = await context.params;
  const session = await getServerSession();

  let booking = await getBookingByRef(ref, session?.id);
  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  const marketplace = isMarketplaceBooking(booking);
  let status: string;

  if (marketplace) {
    await processExpiredOffersAndRedispatch(booking.id);
    booking = (await getBookingByRef(ref, session?.id)) ?? booking;
    status = booking.status;
  } else {
    status = await syncBookingStatus(booking.id, booking.createdAt, booking.status);
  }

  const normalized = normalizeBookingStatus(status);
  const timeline: string[] = marketplace
    ? [...MARKETPLACE_TIMELINE]
    : [...BOOKING_STATUSES.filter((s) => s !== "CANCELLED")];
  const currentIndex = timeline.indexOf(normalized);
  const nextStatus = currentIndex < timeline.length - 1 ? timeline[currentIndex + 1] : null;

  return NextResponse.json({
    bookingRef: booking.bookingRef,
    status: normalized,
    message: getStatusMessage(normalized),
    nextStatus,
    marketplace,
    simulatedAt: new Date().toISOString(),
    progress: {
      current: currentIndex + 1,
      total: timeline.length,
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

  if (isMarketplaceBooking(booking)) {
    return NextResponse.json({
      bookingRef: booking.bookingRef,
      status: booking.status,
      message: getStatusMessage(booking.status),
      marketplace: true,
    });
  }

  const status = getSimulatedStatus(booking.createdAt, booking.status);
  await syncBookingStatus(booking.id, booking.createdAt, booking.status);

  return NextResponse.json({
    bookingRef: booking.bookingRef,
    status,
    message: getStatusMessage(status),
  });
}
