import type { PrismaClient } from "@prisma/client";

export async function seedProvider(prisma: PrismaClient) {
  const captainUser = await prisma.user.upsert({
    where: { phone: "9876543211" },
    update: { name: "Demo Captain" },
    create: { phone: "9876543211", name: "Demo Captain" },
  });

  const provider = await prisma.provider.upsert({
    where: { userId: captainUser.id },
    update: {
      providerType: "CAPTAIN",
      status: "ACTIVE",
      onboardingCompleted: true,
    },
    create: {
      userId: captainUser.id,
      providerType: "CAPTAIN",
      status: "ACTIVE",
      onboardingCompleted: true,
      worker: {
        create: {
          displayName: "Demo Captain",
          phone: captainUser.phone,
          isOnline: true,
          rating: 4.9,
          completedJobs: 24,
          acceptanceRate: 94,
        },
      },
      kycDocuments: {
        create: [
          { docType: "aadhaar", status: "VERIFIED", lastFour: "4321", url: "mock://aadhaar" },
          { docType: "selfie", status: "VERIFIED", url: "mock://selfie" },
        ],
      },
    },
    include: { worker: true },
  });

  await prisma.worker.updateMany({
    where: { providerId: provider.id },
    data: { isOnline: true },
  });

  console.log("Provider seed — captain login phone: 9876543211 (OTP 1234)");
  return provider;
}
