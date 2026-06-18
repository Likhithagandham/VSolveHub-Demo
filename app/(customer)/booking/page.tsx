import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth/session";
import { BookingForm } from "@/components/customer/booking/BookingForm";

type PageProps = {
  searchParams: Promise<{ serviceId?: string }>;
};

export default async function BookingPage({ searchParams }: PageProps) {
  const { serviceId } = await searchParams;
  if (!serviceId) redirect("/services");

  const session = await getServerSession();
  if (!session) {
    redirect(`/booking/otp?redirect=${encodeURIComponent(`/booking?serviceId=${serviceId}`)}`);
  }

  return (
    <div className="page-content">
      <h1 className="page-title">Book your service</h1>
      <p className="page-subtitle">Choose a time slot and confirm your address.</p>
      <BookingForm serviceId={serviceId} />
    </div>
  );
}
