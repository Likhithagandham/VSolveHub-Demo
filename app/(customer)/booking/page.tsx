import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth/session";
import { BookingFlow } from "@/components/customer/booking/BookingFlow";

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
      <p className="page-subtitle">Complete the steps below to confirm your booking.</p>
      <BookingFlow serviceId={serviceId} />
    </div>
  );
}
