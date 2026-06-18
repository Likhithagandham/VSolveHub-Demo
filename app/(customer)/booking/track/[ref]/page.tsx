import { BookingTracker } from "@/components/customer/booking/BookingTracker";

type PageProps = {
  params: Promise<{ ref: string }>;
};

export default async function BookingTrackPage({ params }: PageProps) {
  const { ref } = await params;

  return (
    <div className="page-content">
      <h1 className="page-title">Track booking</h1>
      <p className="page-subtitle">Live status updates — provider matching is simulated for this MVP.</p>
      <BookingTracker ref={ref} />
    </div>
  );
}
