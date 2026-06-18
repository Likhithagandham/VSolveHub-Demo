import { NextResponse } from "next/server";
import { expireStaleOffers } from "@/lib/fulfillment/push-dispatch";

export async function POST() {
  const result = expireStaleOffers();
  return NextResponse.json({ success: true, ...result });
}

export async function GET() {
  return NextResponse.json({ endpoint: "dispatch/tick", description: "Expire stale 30s offers" });
}
