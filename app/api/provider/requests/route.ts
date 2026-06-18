import { NextResponse } from "next/server";
import { getProviderRequests, acceptRequest } from "@/lib/fulfillment/inbox-pull";

// TODO: Phase-2 — inbox accept/confirm/quote for non-captain modes

export async function GET() {
  return NextResponse.json({
    requests: getProviderRequests("prov-prof-1"),
    phase: 2,
    stub: true,
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  if (body.action === "accept") {
    const result = acceptRequest(body.requestId);
    return NextResponse.json({ success: !!result, request: result });
  }
  return NextResponse.json({ message: "Phase-2 stub" });
}
