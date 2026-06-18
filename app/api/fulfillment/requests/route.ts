import { NextResponse } from "next/server";
import { getProviderRequests } from "@/lib/fulfillment/inbox-pull";

// TODO: Phase-2 — full provider_requests inbox with SLA

export async function GET() {
  const requests = getProviderRequests("prov-prof-1");
  return NextResponse.json({ requests, phase: 2, stub: true });
}

export async function POST() {
  return NextResponse.json({ message: "Phase-2 stub — request routing not implemented" });
}
