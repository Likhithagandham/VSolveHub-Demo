import { renderPartnerSecondaryPage } from "@/lib/provider/render-secondary-page";
import { PortalPortfolioScreen } from "@/components/provider/modes/portal/PortalSecondaryScreens";

export default async function PartnerPortfolioPage() {
  return renderPartnerSecondaryPage(["EVENT_VENDOR"], PortalPortfolioScreen);
}
