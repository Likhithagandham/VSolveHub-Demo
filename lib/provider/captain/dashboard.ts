import { OFFER_TTL_SECONDS } from "@/lib/provider/constants";
import {
  expireStaleOffers,
  getActiveWork,
  getCaptainDashboardStats,
  getPendingOffers,
  getProviderByUserId,
} from "@/lib/provider/queries";
import { prisma } from "@/lib/db/client";
import { buildCaptainBonuses, buildCaptainIncentives } from "./incentives";
import { buildDemandHeatmap, resolveCaptainZone } from "./zone";
import { estimateTripDistances } from "./distance";

export async function getCaptainDashboard(userId: string) {
  const provider = await getProviderByUserId(userId);
  if (!provider?.worker) return null;

  await expireStaleOffers();

  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  const [stats, offers, activeJobs, recentBookings, todayEarningsRows, walletAgg, offerStats] =
    await Promise.all([
    getCaptainDashboardStats(provider.id),
    getPendingOffers(provider.id),
    getActiveWork(provider.id),
    prisma.booking.findMany({
      where: { assignedProviderId: provider.id },
      include: {
        service: { include: { category: true } },
        address: true,
        user: true,
      },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
    prisma.jobEarning.findMany({
      where: { providerId: provider.id, earnedAt: { gte: startOfDay } },
      select: { bookingId: true, amountPaise: true, earnedAt: true },
    }),
    prisma.jobEarning.aggregate({
      where: { providerId: provider.id, payoutStatus: "PENDING" },
      _sum: { amountPaise: true },
    }),
    prisma.jobAssignment.groupBy({
      by: ["status"],
      where: { providerId: provider.id, status: { in: ["DECLINED", "ACCEPTED", "EXPIRED"] } },
      _count: true,
    }),
  ]);

  const completedToday = todayEarningsRows.length;

  const earningsByBooking = new Map(
    todayEarningsRows.map((e) => [e.bookingId, { amountPaise: e.amountPaise, earnedAt: e.earnedAt }])
  );
  const worker = provider.worker;
  const zone = resolveCaptainZone(worker.lat, worker.lng);

  const declined = offerStats.find((s) => s.status === "DECLINED")?._count ?? 0;
  const responded = offerStats.reduce((n, s) => n + s._count, 0);
  const cancellationRate = responded > 0 ? Math.round((declined / responded) * 100) : 0;

  const availability =
    activeJobs.length > 0 ? "on_job" : worker.isOnline ? "online" : "offline";

  const activeJob = activeJobs[0]
    ? {
        id: activeJobs[0].id,
        ref: activeJobs[0].bookingRef,
        status: activeJobs[0].status,
        serviceName: activeJobs[0].service.name,
        address: activeJobs[0].address.fullAddress,
        lat: activeJobs[0].address.lat,
        lng: activeJobs[0].address.lng,
        customerName: activeJobs[0].user.name ?? "Customer",
        customerPhone: activeJobs[0].user.phone,
        quotedAmount: activeJobs[0].quotedAmount,
      }
    : null;

  return {
    ttlSeconds: OFFER_TTL_SECONDS,
    profile: {
      name: worker.displayName || provider.user.name || "Captain",
      phone: worker.phone,
      rating: worker.rating,
      isOnline: worker.isOnline,
    },
    stats: {
      ...stats,
      completedToday,
      cancellationRate,
    },
    wallet: {
      availablePaise: walletAgg._sum.amountPaise ?? 0,
      pendingPaise: walletAgg._sum.amountPaise ?? 0,
    },
    location: {
      lat: worker.lat,
      lng: worker.lng,
      zone: zone.zone,
      label: zone.label,
      distanceKm: zone.distanceKm,
    },
    availability,
    offers: offers.map((o) => {
      const dist = estimateTripDistances(
        worker.lat,
        worker.lng,
        o.booking.address.lat,
        o.booking.address.lng,
        o.booking.quotedAmount
      );
      return {
        id: o.id,
        status: o.status,
        offeredAt: o.offeredAt.toISOString(),
        expiresAt: o.expiresAt.toISOString(),
        booking: {
          id: o.booking.id,
          ref: o.booking.bookingRef,
          serviceName: o.booking.service.name,
          categoryName: o.booking.service.category.name,
          slot: o.booking.slot,
          quotedAmount: o.booking.quotedAmount,
          address: o.booking.address.fullAddress,
          customerName: o.booking.user.name ?? "Customer",
          customerPhone: o.booking.user.phone,
          paymentMode: o.booking.paymentMethod ?? "Cash",
          pickupKm: dist.pickupKm,
          dropKm: dist.dropKm,
          lat: o.booking.address.lat,
          lng: o.booking.address.lng,
        },
      };
    }),
    activeJob,
    recentJobs: recentBookings.map((b) => ({
      id: b.id,
      ref: b.bookingRef,
      serviceName: b.service.name,
      status: b.status,
      slot: b.slot,
      quotedAmount: b.quotedAmount,
      earnedPaise: earningsByBooking.get(b.id)?.amountPaise ?? (b.status === "COMPLETED" ? null : 0),
      completedAt:
        b.status === "COMPLETED"
          ? (earningsByBooking.get(b.id)?.earnedAt.toISOString() ?? b.createdAt.toISOString())
          : null,
    })),
    incentives: buildCaptainIncentives(completedToday, worker.acceptanceRate),
    bonuses: buildCaptainBonuses(completedToday, worker.acceptanceRate),
    demandHeatmap: buildDemandHeatmap(worker.lat, worker.lng, zone.zone),
  };
}

export type CaptainDashboardData = NonNullable<Awaited<ReturnType<typeof getCaptainDashboard>>>;
