import { prisma } from "@/lib/db/client";
import { generateBookingRef } from "@/lib/format";
import {
  BOOKING_STATUSES,
  type BookingStatus,
  STATUS_MESSAGES,
} from "@/lib/constants";

const STATUS_INTERVAL_MS = 15_000;

export async function createBooking(input: {
  userId: string;
  serviceId: string;
  addressId: string;
  slot: string;
  quotedAmount: number;
}) {
  const bookingRef = generateBookingRef();

  const booking = await prisma.booking.create({
    data: {
      bookingRef,
      userId: input.userId,
      serviceId: input.serviceId,
      addressId: input.addressId,
      slot: input.slot,
      quotedAmount: input.quotedAmount,
      status: "SEARCHING",
      statusLogs: {
        create: { status: "SEARCHING" },
      },
    },
    include: {
      service: { include: { category: true } },
      address: true,
    },
  });

  return booking;
}

export async function getBookingByRef(ref: string, userId?: string) {
  return prisma.booking.findFirst({
    where: {
      bookingRef: ref,
      ...(userId ? { userId } : {}),
    },
    include: {
      service: { include: { category: true } },
      address: true,
      statusLogs: { orderBy: { createdAt: "asc" } },
    },
  });
}

export async function getUserBookings(userId: string) {
  return prisma.booking.findMany({
    where: { userId },
    include: {
      service: { include: { category: true } },
      address: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export function getSimulatedStatus(
  createdAt: Date,
  currentStatus: string
): BookingStatus {
  if (currentStatus === "COMPLETED" || currentStatus === "CANCELLED") {
    return currentStatus as BookingStatus;
  }

  const elapsed = Date.now() - createdAt.getTime();
  const step = Math.min(
    Math.floor(elapsed / STATUS_INTERVAL_MS),
    BOOKING_STATUSES.length - 1
  );
  return BOOKING_STATUSES[step];
}

export async function syncBookingStatus(bookingId: string, createdAt: Date, currentStatus: string) {
  const simulated = getSimulatedStatus(createdAt, currentStatus);
  if (simulated === currentStatus) {
    return simulated;
  }

  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data: { status: simulated },
  });

  const lastLog = await prisma.bookingStatusLog.findFirst({
    where: { bookingId },
    orderBy: { createdAt: "desc" },
  });

  if (!lastLog || lastLog.status !== simulated) {
    await prisma.bookingStatusLog.create({
      data: { bookingId, status: simulated },
    });
  }

  return booking.status as BookingStatus;
}

export function getStatusMessage(status: string) {
  return STATUS_MESSAGES[status as BookingStatus] ?? "Tracking your booking.";
}
