import { redirect } from "next/navigation";
import { requireProviderSession } from "@/lib/provider/auth";
import { resolveMode } from "@/lib/provider/modes";

type Slot = "dashboard" | "leads" | "work" | "calendar" | "earnings" | "profile";

export async function renderPartnerModePage(slot: Slot) {
  const { profile } = await requireProviderSession();
  if (!profile.onboardingCompleted) redirect("/partner/onboarding");

  const mode = resolveMode(profile.providerType);
  const Screen = mode[slot];
  return <Screen />;
}
