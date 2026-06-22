import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/session";
import {
  getBookingByRef,
  getStatusMessage,
  isMarketplaceBooking,
  parseMediaUrls,
  syncBookingStatus,
} from "@/lib/bookings/queries";
import {
  BOOKING_STATUSES,
  MARKETPLACE_TIMELINE,
  normalizeBookingStatus,
} from "@/lib/constants";
import { processExpiredOffersAndRedispatch } from "@/lib/fulfillment/push-dispatch";

type RouteContext = { params: Promise<{ ref: string }> };

function serializeProvider(booking: NonNullable<Awaited<ReturnType<typeof getBookingByRef>>>) {
  const provider = booking.assignedProvider;
  if (!provider) return null;

  const worker = provider.worker;
  const name = worker?.displayName ?? provider.user.name ?? "Provider";
  const phone = worker?.phone ?? provider.user.phone;
  const rating = worker?.rating ?? 4.8;

  const assignedLog = booking.statusLogs.find((l) => l.status === "ASSIGNED");
  const etaMinutes = assignedLog
    ? Math.max(5, 20 - Math.floor((Date.now() - assignedLog.createdAt.getTime()) / 60_000))
    : 15;

  return { id: provider.id, name, phone, rating, etaMinutes };
}

export async function GET(_req: NextRequest, context: RouteContext) {
  const { ref } = await context.params;
  const session = await getServerSession();

  let booking = await getBookingByRef(ref, session?.id);
  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  const marketplace = isMarketplaceBooking(booking);

  if (marketplace) {
    await processExpiredOffersAndRedispatch(booking.id);
    booking = (await getBookingByRef(ref, session?.id)) ?? booking;
  }

  const status = marketplace
    ? booking.status
    : await syncBookingStatus(booking.id, booking.createdAt, booking.status);

  const normalized = normalizeBookingStatus(status);
  const provider = serializeProvider(booking);

  return NextResponse.json({
    bookingRef: booking.bookingRef,
    status: normalized,
    message: getStatusMessage(normalized),
    marketplace,
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
    provider,
    baseChargePaise: booking.baseChargePaise,
    quotedAmount: booking.quotedAmount,
    finalAmountPaise: booking.finalAmountPaise ?? booking.quotedAmount,
    paymentStatus: booking.paymentStatus,
    paymentMethod: booking.paymentMethod,
    rating: booking.rating,
    review: booking.review,
    createdAt: booking.createdAt,
    statusLogs: booking.statusLogs,
    statuses: marketplace
      ? [...MARKETPLACE_TIMELINE, "CANCELLED"]
      : BOOKING_STATUSES.filter((s) => s !== "CANCELLED"),
  });
}
