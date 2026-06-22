import { requireProviderSession } from "@/lib/provider/auth";
import { resolveMode } from "@/lib/provider/modes";
import { CaptainActiveTrip } from "@/components/provider/modes/captain/CaptainActiveTrip";
import { redirect } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function PartnerWorkDetailPage({ params }: Props) {
  const { profile } = await requireProviderSession();
  if (!profile.onboardingCompleted) redirect("/partner/onboarding");

  const { id } = await params;
  const mode = resolveMode(profile.providerType);

  if (profile.providerType === "CAPTAIN") {
    return <CaptainActiveTrip bookingId={id} />;
  }

  const Detail = mode.workDetail;
  return <Detail bookingId={id} />;
}
