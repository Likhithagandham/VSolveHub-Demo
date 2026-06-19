import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { getServiceBySlug } from "@/lib/catalog/queries";
import { buildServiceDetailContent } from "@/lib/catalog/service-detail-content";
import { ServiceDetailView } from "@/components/customer/services/ServiceDetailView";
import { TrackRecentlyViewed } from "@/components/customer/services/TrackRecentlyViewed";
import { getServerSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/client";

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export default async function ServiceDetailPage({ params }: PageProps) {
  const { category, slug } = await params;
  const service = await getServiceBySlug(category, slug);
  if (!service) notFound();

  const detail = buildServiceDetailContent(service);

  const session = await getServerSession();
  let isSaved = false;
  if (session) {
    const saved = await prisma.savedService.findUnique({
      where: {
        userId_serviceId: { userId: session.id, serviceId: service.id },
      },
    });
    isSaved = !!saved;
  }

  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") || host.startsWith("127.") ? "http" : "https";
  const shareUrl = `${protocol}://${host}/services/${category}/${slug}`;

  return (
    <>
      <TrackRecentlyViewed serviceId={service.id} />
      <ServiceDetailView
        service={service}
        detail={detail}
        shareUrl={shareUrl}
        isSaved={isSaved}
        showSave={!!session}
      />
    </>
  );
}
