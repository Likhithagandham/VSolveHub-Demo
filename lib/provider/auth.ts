import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/client";
import type { ProviderType } from "./constants";
import type { ProviderProfile } from "./types";
import { partnerLoginPath } from "./login";

export async function getProviderProfile(userId: string): Promise<ProviderProfile | null> {
  const provider = await prisma.provider.findUnique({
    where: { userId },
    include: { worker: true, user: true },
  });
  if (!provider) return null;

  return {
    id: provider.id,
    userId: provider.userId,
    providerType: provider.providerType as ProviderType,
    status: provider.status,
    onboardingCompleted: provider.onboardingCompleted,
    name: provider.user.name ?? provider.worker?.displayName ?? "Partner",
    phone: provider.user.phone,
    worker: provider.worker
      ? {
          id: provider.worker.id,
          displayName: provider.worker.displayName,
          phone: provider.worker.phone,
          isOnline: provider.worker.isOnline,
          rating: provider.worker.rating,
          completedJobs: provider.worker.completedJobs,
          acceptanceRate: provider.worker.acceptanceRate,
        }
      : null,
  };
}

export async function requireProviderSession(redirectTo = partnerLoginPath("/partner/dashboard")) {
  const session = await getServerSession();
  if (!session) redirect(redirectTo);

  const profile = await getProviderProfile(session.id);
  if (!profile) redirect("/partner/onboarding");

  return { session, profile };
}
