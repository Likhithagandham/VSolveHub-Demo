import { prisma } from "@/lib/db/client";
import { offerExpiresAt } from "@/lib/provider/queries";

export async function dispatchBookingOffers(bookingId: string) {
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking) throw new Error("Booking not found");

  const captains = await prisma.provider.findMany({
    where: {
      providerType: "CAPTAIN",
      status: "ACTIVE",
      onboardingCompleted: true,
      worker: { isOnline: true },
    },
    select: { id: true },
    take: 5,
  });

  if (captains.length === 0) return { offersCreated: 0 };

  const expiresAt = offerExpiresAt();
  await prisma.jobAssignment.createMany({
    data: captains.map((c) => ({
      bookingId,
      providerId: c.id,
      status: "PENDING",
      expiresAt,
    })),
  });

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "REQUESTED" },
  });
  await prisma.bookingStatusLog.create({
    data: { bookingId, status: "REQUESTED" },
  });

  return { offersCreated: captains.length, expiresAt: expiresAt.toISOString() };
}

export async function acceptOffer(assignmentId: string, providerId: string) {
  const assignment = await prisma.jobAssignment.findFirst({
    where: { id: assignmentId, providerId, status: "PENDING" },
    include: { booking: true },
  });
  if (!assignment) return { ok: false as const, error: "Offer not found or expired" };
  if (assignment.expiresAt < new Date()) {
    await prisma.jobAssignment.update({
      where: { id: assignmentId },
      data: { status: "EXPIRED", respondedAt: new Date() },
    });
    return { ok: false as const, error: "Offer expired" };
  }

  const alreadyAssigned = await prisma.booking.findFirst({
    where: { id: assignment.bookingId, assignedProviderId: { not: null } },
  });
  if (alreadyAssigned?.assignedProviderId) {
    await prisma.jobAssignment.update({
      where: { id: assignmentId },
      data: { status: "EXPIRED", respondedAt: new Date() },
    });
    return { ok: false as const, error: "Job already taken" };
  }

  const now = new Date();
  await prisma.$transaction([
    prisma.jobAssignment.update({
      where: { id: assignmentId },
      data: { status: "ACCEPTED", respondedAt: now },
    }),
    prisma.jobAssignment.updateMany({
      where: {
        bookingId: assignment.bookingId,
        id: { not: assignmentId },
        status: "PENDING",
      },
      data: { status: "EXPIRED", respondedAt: now },
    }),
    prisma.booking.update({
      where: { id: assignment.bookingId },
      data: { assignedProviderId: providerId, status: "ASSIGNED" },
    }),
    prisma.bookingStatusLog.create({
      data: { bookingId: assignment.bookingId, status: "ASSIGNED" },
    }),
  ]);

  return { ok: true as const, bookingId: assignment.bookingId };
}

export async function declineOffer(assignmentId: string, providerId: string) {
  const result = await prisma.jobAssignment.updateMany({
    where: { id: assignmentId, providerId, status: "PENDING" },
    data: { status: "DECLINED", respondedAt: new Date() },
  });
  return result.count > 0;
}
