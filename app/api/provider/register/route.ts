import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/client";
import { PROVIDER_TYPES, type ProviderType } from "@/lib/provider/constants";

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as { providerType: ProviderType };
  if (!PROVIDER_TYPES.includes(body.providerType)) {
    return NextResponse.json({ error: "Invalid provider type" }, { status: 400 });
  }

  const existing = await prisma.provider.findUnique({ where: { userId: session.id } });
  if (existing) return NextResponse.json({ provider: existing });

  const provider = await prisma.provider.create({
    data: {
      userId: session.id,
      providerType: body.providerType,
      status: "PENDING",
      onboardingCompleted: false,
      worker:
        body.providerType === "CAPTAIN"
          ? {
              create: {
                displayName: session.name ?? "Captain",
                phone: session.phone,
                isOnline: false,
              },
            }
          : undefined,
    },
    include: { worker: true },
  });

  return NextResponse.json({ provider });
}
