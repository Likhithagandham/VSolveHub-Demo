import { redirect } from "next/navigation";
import type { ComponentType } from "react";
import { requireProviderSession } from "@/lib/provider/auth";

export async function renderCaptainSecondaryPage(Screen: ComponentType) {
  const { profile } = await requireProviderSession();
  if (!profile.onboardingCompleted) redirect("/partner/onboarding");
  if (profile.providerType !== "CAPTAIN") redirect("/partner/dashboard");
  return <Screen />;
}
