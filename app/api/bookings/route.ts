import { NextRequest, NextResponse } from "next/server";
import { createBooking } from "@/lib/db/queries/bookings";
import { MOCK_SERVICES } from "@/lib/catalog/mock";
import { getMechanic } from "@/lib/fulfillment";
import { createOfferWave } from "@/lib/fulfillment/push-dispatch";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { serviceId, archetype, enquiry, ...payload } = body;

  if (!serviceId) {
    return NextResponse.json({ error: "serviceId required" }, { status: 400 });
  }

  const service = MOCK_SERVICES.find((s) => s.id === serviceId);
  const resolvedArchetype = archetype ?? service?.archetype ?? "A";
  const status = enquiry || ["C", "D", "E", "F"].includes(resolvedArchetype) ? "enquiry" : "pending";

  const booking = await createBooking({
    serviceId,
    archetype: resolvedArchetype,
    payload: { ...payload, enquiry: !!enquiry },
    totalPaise: service?.pricePaise ?? 0,
  });

  const mechanic = getMechanic(resolvedArchetype);
  let fulfillment = null;
  if (mechanic === "push-dispatch" && status === "pending") {
    fulfillment = {
      mechanic,
      wave: createOfferWave(booking.ref),
    };
  }

  return NextResponse.json({
    ref: booking.ref,
    status,
    archetype: resolvedArchetype,
    fulfillment,
  });
}

export async function GET() {
  return NextResponse.json({ bookings: [] });
}
