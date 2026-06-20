import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/session";
import { getProviderProfile } from "@/lib/provider/auth";
import { getCaptainDashboardStats } from "@/lib/provider/queries";
import { prisma } from "@/lib/db/client";

export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const profile = await getProviderProfile(session.id);
  if (!profile) return NextResponse.json({ error: "Provider not found" }, { status: 404 });

  const [stats, kyc] = await Promise.all([
    getCaptainDashboardStats(profile.id),
    prisma.providerKycDocument.findMany({ where: { providerId: profile.id } }),
  ]);

  return NextResponse.json({ profile, stats, kyc });
}

export async function PATCH(request: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const provider = await prisma.provider.findUnique({ where: { userId: session.id } });
  if (!provider) return NextResponse.json({ error: "Provider not found" }, { status: 404 });

  const body = (await request.json()) as { displayName?: string };
  if (provider.providerType === "CAPTAIN" && body.displayName) {
    await prisma.worker.updateMany({
      where: { providerId: provider.id },
      data: { displayName: body.displayName },
    });
    await prisma.user.update({ where: { id: session.id }, data: { name: body.displayName } });
  }

  return NextResponse.json({ ok: true });
}
