import Link from "next/link";
import { ProfileSectionPlaceholder } from "@/components/customer/profile/ProfileSections";

export default function ProfileHomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">My profile</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <Link href="/profile/bookings" className="card hover:border-brand-300">
          <h3 className="font-medium">My bookings</h3>
          <p className="text-sm text-slate-500">View past and active bookings</p>
        </Link>
        <Link href="/profile/saved" className="card hover:border-brand-300">
          <h3 className="font-medium">Saved services</h3>
          <p className="text-sm text-slate-500">Your wishlist</p>
        </Link>
        <Link href="/profile/addresses" className="card hover:border-brand-300">
          <h3 className="font-medium">Addresses</h3>
          <p className="text-sm text-slate-500">Manage delivery locations</p>
        </Link>
      </div>
      <ProfileSectionPlaceholder title="Account details" />
    </div>
  );
}
