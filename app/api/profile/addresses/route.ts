import { NextRequest, NextResponse } from "next/server";

const mockAddresses = [
  { id: "addr-1", label: "Home", line1: "123 MG Road", city: "Bangalore", pincode: "560001", isDefault: true },
];

export async function GET() {
  return NextResponse.json({ addresses: mockAddresses });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json({
    address: { id: `addr-${Date.now()}`, ...body },
  });
}
