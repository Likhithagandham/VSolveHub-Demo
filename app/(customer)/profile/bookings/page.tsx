import { ProfileSectionPlaceholder } from "@/components/customer/profile/ProfileSections";

export default function ProfileBookingsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">My bookings</h1>
      <ProfileSectionPlaceholder title="Booking history" />
    </div>
  );
}
