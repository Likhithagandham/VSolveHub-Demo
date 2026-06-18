import { NextRequest, NextResponse } from "next/server";
import { buildEligiblePool, createOfferWave } from "@/lib/fulfillment/push-dispatch";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const bookingRef = body.bookingRef ?? `VSH-${Date.now()}`;

  const pool = buildEligiblePool(bookingRef);
  const wave = createOfferWave(bookingRef);

  return NextResponse.json({
    bookingRef,
    eligiblePool: pool,
    offerWave: wave,
  });
}

export async function GET() {
  return NextResponse.json({
    mechanic: "push-dispatch",
    description: "Build eligible pool and offer waves for archetypes A/B",
  });
}
