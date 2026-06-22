import { renderCaptainSecondaryPage } from "@/lib/provider/render-captain-page";
import { CaptainWalletScreen } from "@/components/provider/modes/captain/CaptainWalletScreen";

export default async function PartnerWalletPage() {
  return renderCaptainSecondaryPage(CaptainWalletScreen);
}
