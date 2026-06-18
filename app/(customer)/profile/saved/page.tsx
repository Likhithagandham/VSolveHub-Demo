import { ProfileSectionPlaceholder } from "@/components/customer/profile/ProfileSections";

export default function ProfileSavedPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Saved services</h1>
      <ProfileSectionPlaceholder title="Saved list" />
    </div>
  );
}
