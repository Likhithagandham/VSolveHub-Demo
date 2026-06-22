import { getServerSession } from "@/lib/auth/session";
import { getProviderProfile } from "@/lib/provider/auth";
import type { ProviderType } from "@/lib/provider/constants";
import { PartnerShell } from "@/components/provider/PartnerShell";

export default async function PartnerLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  let providerType: ProviderType | null = null;

  if (session) {
    const profile = await getProviderProfile(session.id);
    if (profile) {
      providerType = profile.providerType;
    }
  }

  return <PartnerShell providerType={providerType}>{children}</PartnerShell>;
}
