import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/session";
import { createBooking, getUserBookings } from "@/lib/bookings/queries";
import { bookingSchema } from "@/lib/validation/schemas";
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

  const { serviceId, addressId, slot } = parsed.data;

  const [service, address] = await Promise.all([
    prisma.service.findUnique({ where: { id: serviceId } }),
    prisma.address.findFirst({ where: { id: addressId, userId: session.id } }),
  ]);

  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }
  if (!address) {
    return NextResponse.json({ error: "Address not found" }, { status: 404 });
  }

  const booking = await createBooking({
    userId: session.id,
    serviceId,
    addressId,
    slot,
    quotedAmount: service.price,
  });

  return NextResponse.json({
    bookingRef: booking.bookingRef,
    status: booking.status,
    service: booking.service.name,
    slot: booking.slot,
    address: booking.address.fullAddress,
    quotedAmount: booking.quotedAmount,
  });
}

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const bookings = await getUserBookings(session.id);
  return NextResponse.json({ bookings });
}
