import { NextRequest, NextResponse } from "next/server";
import { getBookingByRef } from "@/lib/db/queries/bookings";
import { getBookingFlow } from "@/lib/booking/archetypes";

type Props = { params: { ref: string } };

export async function GET(_req: NextRequest, { params }: Props) {
  const booking = await getBookingByRef(params.ref);
  if (!booking) {
    return NextResponse.json({
      ref: params.ref,
      status: "dispatching",
      archetype: "A",
      mock: true,
    });
  }
  const flow = getBookingFlow(booking.archetype);
  return NextResponse.json({ ...booking, statuses: flow.statuses });
}

export async function PATCH(req: NextRequest, { params }: Props) {
  const body = await req.json();
  const { action } = body;

  if (action === "cancel") {
    return NextResponse.json({ ref: params.ref, status: "cancelled" });
  }
  if (action === "rate") {
    return NextResponse.json({ ref: params.ref, rated: true, rating: body.rating });
  }
  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
