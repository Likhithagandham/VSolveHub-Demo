import { NextResponse } from "next/server";
import { MOCK_SERVICES } from "@/lib/catalog/mock";

export async function GET() {
  const saved = MOCK_SERVICES.filter((s) => s.isPopular).slice(0, 3);
  return NextResponse.json({ saved });
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ success: true, serviceId: body.serviceId });
}

export async function DELETE(req: Request) {
  const body = await req.json();
  return NextResponse.json({ success: true, serviceId: body.serviceId });
}
