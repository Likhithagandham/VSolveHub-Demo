import { notFound } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";
import { getServiceBySlug } from "@/lib/catalog/queries";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { SaveServiceButton } from "@/components/customer/services/SaveServiceButton";
import { getServerSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/client";
import {
  buildRecentlyViewedValue,
  getRecentlyViewedIds,
  recentlyViewedCookieOptions,
} from "@/lib/recently-viewed";
import { RECENTLY_VIEWED_COOKIE } from "@/lib/constants";

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export default async function ServiceDetailPage({ params }: PageProps) {
  const { category, slug } = await params;
  const service = await getServiceBySlug(category, slug);
  if (!service) notFound();

  const recentIds = await getRecentlyViewedIds();
  const cookieStore = await cookies();
  cookieStore.set(
    RECENTLY_VIEWED_COOKIE,
    buildRecentlyViewedValue(recentIds, service.id),
    recentlyViewedCookieOptions()
  );

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

  return (
    <div className="page-content stack-lg">
      <Link href="/services" className="text-sm text-muted">
        ← Back to services
      </Link>

      <div className="card">
        <div className="service-card-header">
          <span className="service-card-icon" style={{ fontSize: "2.5rem" }}>
            {service.category.icon}
          </span>
          <div>
            <p className="text-sm text-muted">{service.category.name}</p>
            <h1 className="page-title">{service.name}</h1>
          </div>
        </div>

        <p className="detail-price">{formatPrice(service.price)}</p>

        <div className="detail-meta">
          <span>⏱ ~{service.duration} min</span>
          <span>📍 At your address</span>
        </div>

        <p style={{ margin: "1rem 0" }}>{service.description}</p>

        <ul className="tag-list">
          {service.tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>

        <div className="service-card-actions" style={{ marginTop: "1.25rem" }}>
          <Link href={`/booking?serviceId=${service.id}`} className="btn btn-primary">
            Book Now
          </Link>
          {session && <SaveServiceButton serviceId={service.id} initialSaved={isSaved} />}
        </div>
      </div>
    </div>
  );
}
