import { renderPartnerSecondaryPage } from "@/lib/provider/render-secondary-page";
import { PortalPropertiesScreen } from "@/components/provider/modes/portal/PortalSecondaryScreens";

export default async function PartnerPropertiesPage() {
  return renderPartnerSecondaryPage(["PROPERTY_HOST"], PortalPropertiesScreen);
}
