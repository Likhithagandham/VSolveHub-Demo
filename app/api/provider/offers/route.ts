import { NextRequest, NextResponse } from "next/server";
import { createOfferWave } from "@/lib/fulfillment/push-dispatch";

let currentOffer: ReturnType<typeof createOfferWave> | null = null;

export async function GET() {
  if (!currentOffer) {
    currentOffer = createOfferWave("VSH-MOCK-OFFER");
  }
  const expiresIn = Math.max(
    0,
    Math.floor((new Date(currentOffer.expiresAt).getTime() - Date.now()) / 1000)
  );
  return NextResponse.json({
    offer: { ...currentOffer, expiresInSeconds: expiresIn },
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action, waveId } = body;

  if (action === "accept") {
    currentOffer = null;
    return NextResponse.json({ success: true, action: "accepted", waveId });
  }
  if (action === "decline") {
    currentOffer = null;
    return NextResponse.json({ success: true, action: "declined", waveId });
  }
  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
