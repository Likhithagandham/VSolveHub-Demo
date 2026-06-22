import { renderPartnerSecondaryPage } from "@/lib/provider/render-secondary-page";
import { PortalMaintenanceScreen } from "@/components/provider/modes/portal/PortalSecondaryScreens";

export default async function PartnerMaintenancePage() {
  return renderPartnerSecondaryPage(["RENTAL_VENDOR"], PortalMaintenanceScreen);
}
