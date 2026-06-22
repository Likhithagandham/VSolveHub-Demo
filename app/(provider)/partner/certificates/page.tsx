import { renderPartnerSecondaryPage } from "@/lib/provider/render-secondary-page";
import { PortalCertificatesScreen } from "@/components/provider/modes/portal/PortalSecondaryScreens";

export default async function PartnerCertificatesPage() {
  return renderPartnerSecondaryPage(["PROFESSIONAL"], PortalCertificatesScreen);
}
