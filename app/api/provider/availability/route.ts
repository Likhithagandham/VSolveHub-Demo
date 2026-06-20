import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/client";
import { getProviderByUserId } from "@/lib/provider/queries";

export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const provider = await getProviderByUserId(session.id);
  if (!provider) return NextResponse.json({ error: "Provider not found" }, { status: 404 });

  const rows = await prisma.providerAvailability.findMany({
    where: { providerId: provider.id },
    orderBy: [{ type: "asc" }, { dayOfWeek: "asc" }, { date: "asc" }],
  });

  return NextResponse.json({ availability: rows });
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const provider = await getProviderByUserId(session.id);
  if (!provider) return NextResponse.json({ error: "Provider not found" }, { status: 404 });

  const body = (await request.json()) as {
    action: "upsert_weekly" | "add_leave" | "add_block" | "remove";
    id?: string;
    dayOfWeek?: number;
    startTime?: string;
    endTime?: string;
    date?: string;
  };

  if (body.action === "remove" && body.id) {
    await prisma.providerAvailability.deleteMany({ where: { id: body.id, providerId: provider.id } });
    return NextResponse.json({ ok: true });
  }

  if (body.action === "upsert_weekly") {
    await prisma.providerAvailability.deleteMany({
      where: { providerId: provider.id, type: "WEEKLY", dayOfWeek: body.dayOfWeek },
    });
    const row = await prisma.providerAvailability.create({
      data: {
        providerId: provider.id,
        type: "WEEKLY",
        dayOfWeek: body.dayOfWeek,
        startTime: body.startTime,
        endTime: body.endTime,
      },
    });
    return NextResponse.json({ row });
  }

  if (body.action === "add_leave" || body.action === "add_block") {
    const row = await prisma.providerAvailability.create({
      data: {
        providerId: provider.id,
        type: body.action === "add_leave" ? "LEAVE" : "BLOCKED",
        date: body.date,
      },
    });
    return NextResponse.json({ row });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
