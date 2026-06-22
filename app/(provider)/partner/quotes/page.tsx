import { renderPartnerSecondaryPage } from "@/lib/provider/render-secondary-page";
import { PortalQuotesScreen } from "@/components/provider/modes/portal/PortalSecondaryScreens";

export default async function PartnerQuotesPage() {
  return renderPartnerSecondaryPage(["EVENT_VENDOR"], PortalQuotesScreen);
}
