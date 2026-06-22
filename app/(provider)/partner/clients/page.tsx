import { renderPartnerSecondaryPage } from "@/lib/provider/render-secondary-page";
import { PortalClientsScreen } from "@/components/provider/modes/portal/PortalSecondaryScreens";

export default async function PartnerClientsPage() {
  return renderPartnerSecondaryPage(["PROFESSIONAL"], PortalClientsScreen);
}
