import { notFound } from "next/navigation";
import { getServerSession } from "@/lib/auth/session";
import { formatPrice, formatDate } from "@/lib/format";
import { getVehicleBookingByRef, parseVehicleDetails } from "@/lib/vehicle/queries";
import { VEHICLE_STATUS_MESSAGES, RIDE_TYPES, TRANSPORT_VEHICLE_TYPES, RENTAL_TYPES } from "@/lib/vehicle/constants";
import { BookingConfirmSlip } from "@/components/customer/booking/BookingConfirmSlip";
import type { RideDetails, RentalDetails, RepairDetails, TransportDetails } from "@/lib/vehicle/types";

const FLOW_TITLES: Record<string, { title: string; subtitle: string }> = {
  ride: { title: "Ride confirmed!", subtitle: "Your driver is on the way." },
  rental: { title: "Rental confirmed!", subtitle: "Pick up your vehicle at the scheduled time." },
  repair: { title: "Repair booked!", subtitle: "Your mechanic has been assigned." },
  transport: { title: "Transport booked!", subtitle: "Driver will arrive for pickup shortly." },
};

type PageProps = { searchParams: Promise<{ ref?: string; flow?: string }> };

export default async function VehicleConfirmPage({ searchParams }: PageProps) {
  const { ref, flow } = await searchParams;
  if (!ref) notFound();

  const session = await getServerSession();
  const booking = await getVehicleBookingByRef(ref, session?.id);
  if (!booking) notFound();

  const details = parseVehicleDetails(booking.detailsJson);
  const flowType = flow ?? booking.flowType;
  const meta = FLOW_TITLES[flowType] ?? FLOW_TITLES.ride;
  const status = booking.status;

  const rows: { label: string; value: string; highlight?: boolean }[] = [];

  if (flowType === "ride") {
    const d = details as RideDetails;
    const rideLabel = RIDE_TYPES.find((t) => t.id === d.rideType)?.label ?? d.rideType;
    rows.push(
      { label: "Ride type", value: rideLabel, highlight: true },
      { label: "Pickup", value: d.pickupAddress },
      { label: "Drop", value: d.dropAddress },
      { label: "Distance", value: `~${d.distanceKm} km` }
    );
    if (booking.driver) rows.push({ label: "Driver", value: `${booking.driver.name} · ${booking.driver.vehicleNumber}` });
  } else if (flowType === "rental") {
    const d = details as RentalDetails;
    const typeLabel = RENTAL_TYPES.find((t) => t.id === d.rentalType)?.label ?? d.rentalType;
    rows.push(
      { label: "Rental type", value: typeLabel, highlight: true },
      ...(booking.rentalAsset ? [{ label: "Vehicle", value: booking.rentalAsset.name }] : []),
      { label: "Pickup", value: `${formatDate(d.pickupDate)} ${d.pickupTime}` },
      { label: "Return", value: `${formatDate(d.returnDate)} ${d.returnTime}` },
      { label: "Duration", value: `${d.durationDays} day(s)` },
      ...(booking.depositPaise ? [{ label: "Deposit", value: formatPrice(booking.depositPaise) }] : [])
    );
  } else if (flowType === "repair") {
    const d = details as RepairDetails;
    rows.push(
      { label: "Issue", value: d.issue, highlight: true },
      { label: "Vehicle", value: `${d.brand} ${d.model} (${d.year})` },
      { label: "Service", value: d.pickupOption === "garage" ? "At garage" : "Doorstep" },
      { label: "Address", value: d.serviceAddress },
      { label: "Schedule", value: `${formatDate(d.scheduleDate)} ${d.scheduleTime}` },
      ...(booking.vendor ? [{ label: "Mechanic", value: `${booking.vendor.name} · ★ ${booking.vendor.rating.toFixed(1)}` }] : [])
    );
  } else if (flowType === "transport") {
    const d = details as TransportDetails;
    const vLabel = TRANSPORT_VEHICLE_TYPES.find((t) => t.id === d.vehicleType)?.label ?? d.vehicleType;
    rows.push(
      { label: "Vehicle", value: vLabel, highlight: true },
      { label: "Pickup", value: d.pickupAddress },
      { label: "Drop", value: d.dropAddress },
      { label: "Goods", value: `${d.goodsType} · ${d.weightKg} kg` },
      { label: "Distance", value: `~${d.distanceKm} km` },
      ...(booking.driver ? [{ label: "Driver", value: booking.driver.name }] : [])
    );
  }

  return (
    <div className="page-content">
      <BookingConfirmSlip
        title={meta.title}
        subtitle={meta.subtitle}
        bookingRef={booking.bookingRef}
        status={status}
        statusMessage={VEHICLE_STATUS_MESSAGES[status] ?? "Tracking your booking."}
        rows={rows}
        totalLabel="Total"
        totalValue={formatPrice(booking.quotedAmount)}
        paymentMethod={booking.paymentMethod}
        paymentStatus={booking.paymentStatus}
        trackHref={`/vehicle/track/${booking.bookingRef}`}
        trackLabel="Track booking"
        secondaryHref="/services?category=vehicle-services"
        secondaryLabel="More vehicle services"
      />
    </div>
  );
}
