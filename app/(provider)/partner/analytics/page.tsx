import { renderPartnerSecondaryPage } from "@/lib/provider/render-secondary-page";
import { PortalAnalyticsScreen } from "@/components/provider/modes/portal/PortalSecondaryScreens";

export default async function PartnerAnalyticsPage() {
  return renderPartnerSecondaryPage(["RENTAL_VENDOR"], PortalAnalyticsScreen);
}
