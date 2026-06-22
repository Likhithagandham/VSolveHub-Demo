import { redirect } from "next/navigation";
import { requireProviderSession } from "@/lib/provider/auth";
import { getModePortalConfig } from "@/lib/provider/mode-config";
import { renderCaptainSecondaryPage } from "@/lib/provider/render-captain-page";
import { renderChromeSecondaryPage } from "@/lib/provider/render-chrome-secondary";
import { CaptainSettingsScreen } from "@/components/provider/modes/captain/CaptainSettingsScreen";
import { PortalSettingsScreen } from "@/components/provider/modes/portal/PortalSecondaryScreens";

export default async function PartnerSettingsPage() {
  const { profile } = await requireProviderSession();
  if (profile.providerType === "CAPTAIN") {
    return renderCaptainSecondaryPage(CaptainSettingsScreen);
  }
  if (getModePortalConfig(profile.providerType)) {
    return renderChromeSecondaryPage(PortalSettingsScreen);
  }
  redirect("/partner/dashboard");
}
