import { redirect } from "next/navigation";
import { requireProviderSession } from "@/lib/provider/auth";
import { getModePortalConfig } from "@/lib/provider/mode-config";
import { renderCaptainSecondaryPage } from "@/lib/provider/render-captain-page";
import { renderChromeSecondaryPage } from "@/lib/provider/render-chrome-secondary";
import { CaptainWalletScreen } from "@/components/provider/modes/captain/CaptainWalletScreen";
import { PortalWalletScreen } from "@/components/provider/modes/portal/PortalSecondaryScreens";

export default async function PartnerWalletPage() {
  const { profile } = await requireProviderSession();
  if (profile.providerType === "CAPTAIN") {
    return renderCaptainSecondaryPage(CaptainWalletScreen);
  }
  if (getModePortalConfig(profile.providerType)) {
    return renderChromeSecondaryPage(PortalWalletScreen);
  }
  redirect("/partner/dashboard");
}
