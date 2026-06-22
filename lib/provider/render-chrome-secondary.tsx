import { redirect } from "next/navigation";
import type { ComponentType } from "react";
import { requireProviderSession } from "@/lib/provider/auth";
import { getModePortalConfig, type ModePortalType } from "@/lib/provider/mode-config";

export async function renderChromeSecondaryPage(
  Screen: ComponentType,
  opts?: { captainOnly?: boolean; portalTypes?: ModePortalType[]; allowCaptain?: boolean }
) {
  const { profile } = await requireProviderSession();
  if (!profile.onboardingCompleted) redirect("/partner/onboarding");

  const isCaptain = profile.providerType === "CAPTAIN";
  const portal = getModePortalConfig(profile.providerType);

  if (opts?.captainOnly) {
    if (!isCaptain) redirect("/partner/dashboard");
    return <Screen />;
  }

  if (opts?.portalTypes) {
    if (!opts.portalTypes.includes(profile.providerType as ModePortalType)) {
      redirect("/partner/dashboard");
    }
    return <Screen />;
  }

  const allowCaptain = opts?.allowCaptain !== false;
  if (!portal && !(allowCaptain && isCaptain)) {
    redirect("/partner/dashboard");
  }

  return <Screen />;
}
