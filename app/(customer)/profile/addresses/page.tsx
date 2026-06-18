import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth/session";
import { ProfileNav } from "@/components/customer/profile/ProfileNav";
import { prisma } from "@/lib/db/client";
import { AddressManager } from "@/components/customer/profile/AddressManager";

export default async function ProfileAddressesPage() {
  const session = await getServerSession();
  if (!session) redirect("/booking/otp?redirect=/profile/addresses");

  const addresses = await prisma.address.findMany({
    where: { userId: session.id },
    orderBy: [{ isDefault: "desc" }, { createdAt: "asc" }],
  });

  return (
    <div className="page-content">
      <h1 className="page-title">Saved addresses</h1>
      <ProfileNav />
      <AddressManager initialAddresses={addresses} />
    </div>
  );
}
