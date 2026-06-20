import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/session";
import { getProviderByUserId } from "@/lib/provider/queries";
import { prisma } from "@/lib/db/client";

export async function PATCH(request: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const provider = await getProviderByUserId(session.id);
  if (!provider?.worker) return NextResponse.json({ error: "Captain profile required" }, { status: 404 });

  const body = (await request.json()) as { isOnline?: boolean };
  const worker = await prisma.worker.update({
    where: { id: provider.worker.id },
    data: { isOnline: Boolean(body.isOnline) },
  });

  return NextResponse.json({ isOnline: worker.isOnline });
}

export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const provider = await getProviderByUserId(session.id);
  if (!provider?.worker) return NextResponse.json({ error: "Captain profile required" }, { status: 404 });

  return NextResponse.json({ isOnline: provider.worker.isOnline });
}
