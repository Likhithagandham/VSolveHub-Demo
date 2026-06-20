import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/client";
import { getProviderByUserId } from "@/lib/provider/queries";
import { resolveMode } from "@/lib/provider/modes";

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const provider = await getProviderByUserId(session.id);
  if (!provider) return NextResponse.json({ error: "Provider not found" }, { status: 404 });

  const body = (await request.json()) as { documents?: { docType: string; lastFour?: string; url?: string }[] };
  const mode = resolveMode(provider.providerType);

  for (const doc of body.documents ?? []) {
    const field = mode.kycConfig.fields.find((f) => f.id === doc.docType);
    if (!field) continue;

    const existing = await prisma.providerKycDocument.findFirst({
      where: { providerId: provider.id, docType: doc.docType },
    });

    const data = {
      status: "SUBMITTED" as const,
      lastFour: doc.lastFour ?? null,
      url: doc.url ?? `mock://${doc.docType}`,
    };

    if (existing) {
      await prisma.providerKycDocument.update({ where: { id: existing.id }, data });
    } else {
      await prisma.providerKycDocument.create({
        data: { providerId: provider.id, docType: doc.docType, ...data },
      });
    }
  }

  const required = mode.kycConfig.fields.filter((f) => f.required).map((f) => f.id);
  const submitted = await prisma.providerKycDocument.findMany({ where: { providerId: provider.id } });
  const submittedIds = new Set(submitted.filter((d) => d.status !== "PENDING").map((d) => d.docType));
  const complete = required.every((id) => submittedIds.has(id));

  if (complete) {
    await prisma.provider.update({
      where: { id: provider.id },
      data: { onboardingCompleted: true, status: "ACTIVE" },
    });
  }

  return NextResponse.json({ ok: true, onboardingCompleted: complete });
}

export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const provider = await getProviderByUserId(session.id);
  if (!provider) return NextResponse.json({ error: "Provider not found" }, { status: 404 });

  const docs = await prisma.providerKycDocument.findMany({ where: { providerId: provider.id } });
  return NextResponse.json({ documents: docs });
}
