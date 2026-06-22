import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/client";
import { getProviderByUserId } from "@/lib/provider/queries";

const CAPTAIN_DOCUMENT_TYPES = new Set([
  "aadhaar",
  "selfie",
  "driving_license",
  "vehicle_rc",
  "skill_cert",
]);

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const provider = await getProviderByUserId(session.id);
  if (!provider) return NextResponse.json({ error: "Provider not found" }, { status: 404 });
  if (provider.providerType !== "CAPTAIN") {
    return NextResponse.json({ error: "Captain documents only" }, { status: 403 });
  }

  const body = (await request.json()) as {
    docType?: string;
    lastFour?: string;
    fileName?: string;
  };

  if (!body.docType || !CAPTAIN_DOCUMENT_TYPES.has(body.docType)) {
    return NextResponse.json({ error: "Invalid document type" }, { status: 400 });
  }

  const isAadhaar = body.docType === "aadhaar";
  const digits = body.lastFour?.replace(/\D/g, "") ?? "";

  if (isAadhaar) {
    if (digits.length < 4) {
      return NextResponse.json({ error: "Enter at least the last 4 digits of Aadhaar" }, { status: 400 });
    }
  } else if (!body.fileName?.trim()) {
    return NextResponse.json({ error: "Select a file to upload" }, { status: 400 });
  }

  const existing = await prisma.providerKycDocument.findFirst({
    where: { providerId: provider.id, docType: body.docType },
  });

  const data = {
    status: "SUBMITTED" as const,
    lastFour: isAadhaar ? digits.slice(-4) : null,
    ...(isAadhaar ? {} : { url: `mock://${body.docType}/${encodeURIComponent(body.fileName!.trim())}` }),
  };

  const doc = existing
    ? await prisma.providerKycDocument.update({ where: { id: existing.id }, data })
    : await prisma.providerKycDocument.create({
        data: { providerId: provider.id, docType: body.docType, ...data },
      });

  return NextResponse.json({
    ok: true,
    document: {
      docType: doc.docType,
      status: doc.status,
      lastFour: doc.lastFour,
    },
  });
}
