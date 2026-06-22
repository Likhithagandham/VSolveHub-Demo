import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth/session";
import { partnerLoginPath } from "@/lib/provider/login";

export default async function PartnerOnboardingLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  if (!session) redirect(partnerLoginPath("/partner/onboarding"));
  return children;
}
