import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth/session";
import { RideBookingFlow } from "@/components/customer/vehicle/RideBookingFlow";

export default async function RideBookingPage() {
  const session = await getServerSession();
  if (!session) redirect("/booking/otp?redirect=/vehicle/ride");

  return (
    <div className="page-content">
      <h1 className="page-title">Book a ride</h1>
      <p className="page-subtitle">Bike, Auto, Taxi, or Premium Cab — get there fast.</p>
      <RideBookingFlow />
    </div>
  );
}
