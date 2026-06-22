import { renderCaptainSecondaryPage } from "@/lib/provider/render-captain-page";
import { CaptainIncentivesScreen } from "@/components/provider/modes/captain/CaptainIncentivesScreen";

export default async function PartnerIncentivesPage() {
  return renderCaptainSecondaryPage(CaptainIncentivesScreen);
}
