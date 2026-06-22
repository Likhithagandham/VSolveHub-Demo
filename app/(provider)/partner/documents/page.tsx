import { redirect } from "next/navigation";
import { requireProviderSession } from "@/lib/provider/auth";
import { renderCaptainSecondaryPage } from "@/lib/provider/render-captain-page";
import { renderChromeSecondaryPage } from "@/lib/provider/render-chrome-secondary";
import { CaptainDocumentsScreen } from "@/components/provider/modes/captain/CaptainDocumentsScreen";
import { PortalHostDocumentsScreen } from "@/components/provider/modes/portal/PortalSecondaryScreens";

export default async function PartnerDocumentsPage() {
  const { profile } = await requireProviderSession();
  if (profile.providerType === "CAPTAIN") {
    return renderCaptainSecondaryPage(CaptainDocumentsScreen);
  }
  if (profile.providerType === "PROPERTY_HOST") {
    return renderChromeSecondaryPage(PortalHostDocumentsScreen, { portalTypes: ["PROPERTY_HOST"] });
  }
  redirect("/partner/dashboard");
}
