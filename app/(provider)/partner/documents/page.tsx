import { renderCaptainSecondaryPage } from "@/lib/provider/render-captain-page";
import { CaptainDocumentsScreen } from "@/components/provider/modes/captain/CaptainDocumentsScreen";

export default async function PartnerDocumentsPage() {
  return renderCaptainSecondaryPage(CaptainDocumentsScreen);
}
