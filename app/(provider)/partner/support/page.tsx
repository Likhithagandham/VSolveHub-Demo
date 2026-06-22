import { redirect } from "next/navigation";
import { requireProviderSession } from "@/lib/provider/auth";
import { getModePortalConfig } from "@/lib/provider/mode-config";
import { renderCaptainSecondaryPage } from "@/lib/provider/render-captain-page";
import { renderChromeSecondaryPage } from "@/lib/provider/render-chrome-secondary";
import { CaptainSupportScreen } from "@/components/provider/modes/captain/CaptainSupportScreen";
import { PortalSupportScreen } from "@/components/provider/modes/portal/PortalSecondaryScreens";

export default async function PartnerSupportPage() {
  const { profile } = await requireProviderSession();
  if (profile.providerType === "CAPTAIN") {
    return renderCaptainSecondaryPage(CaptainSupportScreen);
  }
  if (getModePortalConfig(profile.providerType)) {
    return renderChromeSecondaryPage(PortalSupportScreen);
  }
  redirect("/partner/dashboard");
}
