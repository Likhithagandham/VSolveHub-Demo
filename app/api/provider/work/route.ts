import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/session";
import { getProviderByUserId, getActiveWork, getWorkById } from "@/lib/provider/queries";
import { prisma } from "@/lib/db/client";
import { MOCK_OTP } from "@/lib/constants";

const VALID_TRANSITIONS: Record<string, string[]> = {
  ASSIGNED: ["PROVIDER_ARRIVING"],
  ACCEPTED: ["PROVIDER_ARRIVING"],
  PROVIDER_ARRIVING: ["STARTED"],
  ARRIVED: ["STARTED"],
  ON_THE_WAY: ["STARTED"],
  STARTED: ["COMPLETED"],
};

export async function GET(request: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const provider = await getProviderByUserId(session.id);
  if (!provider) return NextResponse.json({ error: "Provider not found" }, { status: 404 });

  const { searchParams } = new URL(request.url);
  const bookingId = searchParams.get("id");

  if (bookingId) {
    const job = await getWorkById(provider.id, bookingId);
    if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });
    return NextResponse.json({ job: serializeJob(job) });
  }

  const jobs = await getActiveWork(provider.id);
  return NextResponse.json({ jobs: jobs.map(serializeJob) });
}

export async function PATCH(request: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const provider = await getProviderByUserId(session.id);
  if (!provider) return NextResponse.json({ error: "Provider not found" }, { status: 404 });

  const body = (await request.json()) as {
    bookingId: string;
    action: "arrived" | "start" | "complete";
    otp?: string;
  };
  const job = await getWorkById(provider.id, body.bookingId);
  if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });

  const nextStatus =
    body.action === "arrived"
      ? "PROVIDER_ARRIVING"
      : body.action === "start"
        ? "STARTED"
        : "COMPLETED";

  if (body.action === "start") {
    const otp = body.otp?.trim() ?? "";
    const refOtp = job.bookingRef.slice(-4);
    if (otp !== MOCK_OTP && otp !== refOtp) {
      return NextResponse.json({ error: "Invalid ride OTP" }, { status: 400 });
    }
  }

  const allowed = VALID_TRANSITIONS[job.status] ?? [];
  if (!allowed.includes(nextStatus)) {
    return NextResponse.json({ error: `Cannot transition from ${job.status} to ${nextStatus}` }, { status: 400 });
  }

  await prisma.$transaction(async (tx) => {
    await tx.booking.update({
      where: { id: job.id },
      data: { status: nextStatus, finalAmountPaise: job.quotedAmount },
    });
    await tx.bookingStatusLog.create({ data: { bookingId: job.id, status: nextStatus } });

    if (nextStatus === "COMPLETED") {
      const commission = Math.round(job.quotedAmount * 0.15);
      const net = job.quotedAmount - commission;
      await tx.jobEarning.create({
        data: {
          providerId: provider.id,
          bookingId: job.id,
          amountPaise: net,
          commissionPaise: commission,
          payoutStatus: "PENDING",
        },
      });
      if (provider.worker) {
        await tx.worker.update({
          where: { id: provider.worker.id },
          data: { completedJobs: { increment: 1 } },
        });
      }
    }
  });

  const updated = await getWorkById(provider.id, body.bookingId);
  return NextResponse.json({ job: updated ? serializeJob(updated) : null });
}

function serializeJob(
  job: {
    id: string;
    bookingRef: string;
    status: string;
    slot: string;
    quotedAmount: number;
    issueDescription: string;
    paymentMethod?: string | null;
    service: { name: string; category: { name: string } };
    address: { fullAddress: string; lat: number | null; lng: number | null };
    user: { name: string | null; phone: string };
    statusLogs?: { status: string; createdAt: Date }[];
  }
) {
  return {
    id: job.id,
    ref: job.bookingRef,
    status: job.status,
    slot: job.slot,
    quotedAmount: job.quotedAmount,
    issueDescription: job.issueDescription,
    serviceName: job.service.name,
    categoryName: job.service.category.name,
    paymentMethod: job.paymentMethod ?? "Cash",
    address: {
      full: job.address.fullAddress,
      lat: job.address.lat,
      lng: job.address.lng,
    },
    customer: {
      name: job.user.name ?? "Customer",
      phone: job.user.phone,
    },
    statusLogs: job.statusLogs?.map((l) => ({ status: l.status, at: l.createdAt.toISOString() })),
  };
}
