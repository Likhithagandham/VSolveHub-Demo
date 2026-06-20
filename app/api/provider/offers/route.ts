import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/session";
import { getProviderByUserId, getPendingOffers } from "@/lib/provider/queries";
import { acceptOffer, declineOffer } from "@/lib/fulfillment/dispatch";
import { OFFER_TTL_SECONDS } from "@/lib/provider/constants";

export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const provider = await getProviderByUserId(session.id);
  if (!provider) return NextResponse.json({ error: "Provider not found" }, { status: 404 });

  const offers = await getPendingOffers(provider.id);
  return NextResponse.json({
    ttlSeconds: OFFER_TTL_SECONDS,
    offers: offers.map((o) => ({
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
      },
    })),
  });
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const provider = await getProviderByUserId(session.id);
  if (!provider) return NextResponse.json({ error: "Provider not found" }, { status: 404 });

  const body = (await request.json()) as { assignmentId: string; action: "accept" | "decline" };
  if (!body.assignmentId || !body.action) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (body.action === "decline") {
    const ok = await declineOffer(body.assignmentId, provider.id);
    return NextResponse.json({ ok });
  }

  const result = await acceptOffer(body.assignmentId, provider.id);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 409 });
  return NextResponse.json({ ok: true, bookingId: result.bookingId });
}
