import { NextRequest, NextResponse } from "next/server";
import { toggleProviderOnline, getProviderOnline } from "@/lib/auth/session";

export async function GET(req: NextRequest) {
  const providerId = req.nextUrl.searchParams.get("providerId") ?? "prov-captain-1";
  return NextResponse.json({ providerId, isOnline: getProviderOnline(providerId) });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const providerId = body.providerId ?? "prov-captain-1";
  const isOnline = toggleProviderOnline(providerId);
  return NextResponse.json({ providerId, isOnline });
}
