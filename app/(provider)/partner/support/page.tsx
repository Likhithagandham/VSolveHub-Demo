import { renderCaptainSecondaryPage } from "@/lib/provider/render-captain-page";
import { CaptainSupportScreen } from "@/components/provider/modes/captain/CaptainSupportScreen";

export default async function PartnerSupportPage() {
  return renderCaptainSecondaryPage(CaptainSupportScreen);
}
