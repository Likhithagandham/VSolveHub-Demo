import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "@/lib/auth/session";
import { ProfileNav } from "@/components/customer/profile/ProfileNav";
import { prisma } from "@/lib/db/client";
import { serializeService } from "@/lib/catalog/queries";
import { ServiceCard } from "@/components/customer/services/ServiceCard";

export default async function ProfileSavedPage() {
  const session = await getServerSession();
  if (!session) redirect("/booking/otp?redirect=/profile/saved");

  const saved = await prisma.savedService.findMany({
    where: { userId: session.id },
    include: { service: { include: { category: true } } },
    orderBy: { createdAt: "desc" },
  });

  const services = saved.map((s) => serializeService(s.service));

  return (
    <div className="page-content">
      <h1 className="page-title">Saved services</h1>
      <ProfileNav />

      {services.length === 0 ? (
        <div className="empty-state">
          <p>No saved services yet.</p>
          <Link href="/services" className="btn btn-primary">
            Explore services
          </Link>
        </div>
      ) : (
        <div className="grid-2">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
