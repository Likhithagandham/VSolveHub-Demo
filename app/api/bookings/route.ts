import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/session";
import { createBooking } from "@/lib/bookings/queries";
import { getAllUserBookings } from "@/lib/bookings/user-bookings";
import { getVendorById } from "@/lib/bookings/vendors";
import { bookingSchema } from "@/lib/validation/schemas";
import { WALLET_BALANCE_PAISE } from "@/lib/profile/section-data";
import { prisma } from "@/lib/db/client";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const {
    serviceId,
    addressId,
    slot,
    vendorId,
    issueDescription,
    mediaUrls,
    scheduleType,
    paymentMethod,
    vendorAssignmentMode,
  } = parsed.data;

  const [service, address, vendor] = await Promise.all([
    prisma.service.findUnique({ where: { id: serviceId }, include: { category: true } }),
    prisma.address.findFirst({ where: { id: addressId, userId: session.id } }),
    getVendorById(vendorId),
  ]);

  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }
  if (!address) {
    return NextResponse.json({ error: "Address not found" }, { status: 404 });
  }
  if (!vendor) {
    return NextResponse.json({ error: "Professional not found" }, { status: 404 });
  }

  const baseChargePaise = service.pricePaise;
  const quotedAmount = baseChargePaise;

  if (paymentMethod === "wallet" && quotedAmount > WALLET_BALANCE_PAISE) {
    return NextResponse.json({ error: "Insufficient wallet balance" }, { status: 400 });
  }

  const paymentStatus = paymentMethod === "cod" ? "COD" : "PAID";

  const booking = await createBooking({
    userId: session.id,
    serviceId,
    addressId,
    slot,
    quotedAmount,
    baseChargePaise,
    archetype: service.archetype,
    vendorId,
    issueDescription,
    mediaUrls,
    paymentStatus,
    paymentMethod,
    scheduleType,
    vendorAssignmentMode,
  });

  return NextResponse.json({
    bookingRef: booking.bookingRef,
    status: booking.status,
    paymentStatus: booking.paymentStatus,
    service: booking.service.name,
    slot: booking.slot,
    address: booking.address.fullAddress,
    vendor: booking.vendor
      ? { name: booking.vendor.name, rating: booking.vendor.rating }
      : null,
    baseChargePaise: booking.baseChargePaise,
    quotedAmount: booking.quotedAmount,
  });
}

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const bookings = await getAllUserBookings(session.id);
  return NextResponse.json({ bookings });
}
