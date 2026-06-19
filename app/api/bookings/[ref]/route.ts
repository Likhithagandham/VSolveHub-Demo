import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/session";
import {
  getBookingByRef,
  getStatusMessage,
  parseMediaUrls,
  syncBookingStatus,
} from "@/lib/bookings/queries";
import { BOOKING_STATUSES, normalizeBookingStatus } from "@/lib/constants";

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

  const normalized = normalizeBookingStatus(status);

  return NextResponse.json({
    bookingRef: booking.bookingRef,
    status: normalized,
    message: getStatusMessage(normalized),
    service: {
      id: booking.service.id,
      name: booking.service.name,
      slug: booking.service.slug,
      categorySlug: booking.service.category.slug,
    },
    issueDescription: booking.issueDescription,
    mediaUrls: parseMediaUrls(booking.mediaUrls),
    slot: booking.slot,
    scheduleType: booking.scheduleType,
    address: booking.address.fullAddress,
    vendor: booking.vendor
      ? {
          id: booking.vendor.id,
          name: booking.vendor.name,
          phone: booking.vendor.phone,
          rating: booking.vendor.rating,
        }
      : null,
    baseChargePaise: booking.baseChargePaise,
    quotedAmount: booking.quotedAmount,
    finalAmountPaise: booking.finalAmountPaise ?? booking.quotedAmount,
    paymentStatus: booking.paymentStatus,
    paymentMethod: booking.paymentMethod,
    rating: booking.rating,
    review: booking.review,
    createdAt: booking.createdAt,
    statusLogs: booking.statusLogs,
    statuses: BOOKING_STATUSES.filter((s) => s !== "CANCELLED"),
  });
}
