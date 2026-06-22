import { renderCaptainSecondaryPage } from "@/lib/provider/render-captain-page";
import { CaptainSettingsScreen } from "@/components/provider/modes/captain/CaptainSettingsScreen";

export default async function PartnerSettingsPage() {
  return renderCaptainSecondaryPage(CaptainSettingsScreen);
}
