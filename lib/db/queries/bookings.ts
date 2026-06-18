import { prisma } from "@/lib/db/client";
import { generateBookingRef } from "@/lib/format";

export async function createBooking(data: {
  userId?: string;
  serviceId: string;
  archetype: string;
  payload: Record<string, unknown>;
  totalPaise?: number;
}) {
  const ref = generateBookingRef();
  try {
    const booking = await prisma.booking.create({
      data: {
        ref,
        userId: data.userId ?? "mock-user",
        serviceId: data.serviceId,
        archetype: data.archetype,
        status: "pending",
        payload: JSON.stringify(data.payload),
        totalPaise: data.totalPaise ?? 0,
      },
    });
    return booking;
  } catch {
    return {
      id: `mock-${ref}`,
      ref,
      userId: data.userId ?? "mock-user",
      serviceId: data.serviceId,
      archetype: data.archetype,
      status: "pending",
      payload: JSON.stringify(data.payload),
      totalPaise: data.totalPaise ?? 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}

export async function getBookingByRef(ref: string) {
  try {
    return await prisma.booking.findUnique({
      where: { ref },
      include: { service: true },
    });
  } catch {
    return null;
  }
}
