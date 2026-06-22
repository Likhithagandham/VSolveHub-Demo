import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/session";
import { getProviderByUserId } from "@/lib/provider/queries";
import { prisma } from "@/lib/db/client";

export async function PATCH(request: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const provider = await getProviderByUserId(session.id);
  if (!provider?.worker) return NextResponse.json({ error: "Captain profile required" }, { status: 404 });

  const body = (await request.json()) as { isOnline?: boolean; lat?: number; lng?: number };
  const data: { isOnline?: boolean; lat?: number; lng?: number } = {};
  if (typeof body.isOnline === "boolean") data.isOnline = body.isOnline;
  if (typeof body.lat === "number" && Number.isFinite(body.lat)) data.lat = body.lat;
  if (typeof body.lng === "number" && Number.isFinite(body.lng)) data.lng = body.lng;

  const worker = await prisma.worker.update({
    where: { id: provider.worker.id },
    data,
  });

  return NextResponse.json({
    isOnline: worker.isOnline,
    lat: worker.lat,
    lng: worker.lng,
  });
}

export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const provider = await getProviderByUserId(session.id);
  if (!provider?.worker) return NextResponse.json({ error: "Captain profile required" }, { status: 404 });

  return NextResponse.json({ isOnline: provider.worker.isOnline });
}
