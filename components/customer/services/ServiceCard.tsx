import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/Button";

export type ServiceCardData = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: { slug: string; name: string; icon: string };
};

export function ServiceCard({ service }: { service: ServiceCardData }) {
  const href = `/services/${service.category.slug}/${service.slug}`;
  return (
    <article className="card service-card">
      <div className="service-card-header">
        <span className="service-card-icon" aria-hidden>
          {service.category.icon}
        </span>
        <div className="service-card-body">
          <h3 className="card-title">
            <Link href={href}>{service.name}</Link>
          </h3>
          <p className="card-text">{service.description.slice(0, 80)}…</p>
          <p className="card-price">{formatPrice(service.price)}</p>
        </div>
      </div>
      <div className="service-card-actions">
        <Link href={href} className="btn btn-secondary btn-sm">
          Details
        </Link>
        <Link href={`/booking?serviceId=${service.id}`} className="btn btn-primary btn-sm">
          Book Now
        </Link>
      </div>
    </article>
  );
}

export function ServiceCardList({ services }: { services: ServiceCardData[] }) {
  if (!services.length) {
    return (
      <div className="empty-state">
        <p>No services found.</p>
      </div>
    );
  }
  return (
    <div className="grid-2">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
