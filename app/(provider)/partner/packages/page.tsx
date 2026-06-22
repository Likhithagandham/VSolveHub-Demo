import { renderPartnerSecondaryPage } from "@/lib/provider/render-secondary-page";
import { PortalPackagesScreen } from "@/components/provider/modes/portal/PortalSecondaryScreens";

export default async function PartnerPackagesPage() {
  return renderPartnerSecondaryPage(["EVENT_VENDOR"], PortalPackagesScreen);
}
