import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    earnings: [
      { id: "e1", amountPaise: 249900, source: "Deep cleaning", status: "paid" },
      { id: "e2", amountPaise: 49900, source: "AC repair", status: "pending" },
    ],
    totalPaise: 299800,
  });
}
