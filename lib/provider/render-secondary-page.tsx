import { redirect } from "next/navigation";
import type { ComponentType } from "react";
import { requireProviderSession } from "@/lib/provider/auth";
import type { ModePortalType } from "@/lib/provider/mode-config";

export async function renderPartnerSecondaryPage(
  allowedTypes: ModePortalType[] | "CAPTAIN" | "ALL_PORTALS",
  Screen: ComponentType
) {
  const { profile } = await requireProviderSession();
  if (!profile.onboardingCompleted) redirect("/partner/onboarding");

  if (allowedTypes === "CAPTAIN") {
    if (profile.providerType !== "CAPTAIN") redirect("/partner/dashboard");
  } else if (allowedTypes === "ALL_PORTALS") {
    const ok = ["PROFESSIONAL", "RENTAL_VENDOR", "PROPERTY_HOST", "EVENT_VENDOR", "CAPTAIN"].includes(
      profile.providerType
    );
    if (!ok) redirect("/partner/dashboard");
  } else if (!allowedTypes.includes(profile.providerType as ModePortalType)) {
    redirect("/partner/dashboard");
  }

  return <Screen />;
}
