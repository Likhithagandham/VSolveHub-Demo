import Link from "next/link";
import { formatPriceLabel } from "@/lib/format";
import { SERVICE_SLUG_TO_PROPERTY_TYPE } from "@/lib/accommodation/constants";
import { getVehicleFlowHref } from "@/lib/vehicle/constants";
import { CategoryIcon } from "@/components/ui/CategoryIcon";

export type ServiceCardData = {
  id: string;
  name: string;
  slug: string;
  description: string;
  pricePaise: number;
  unit?: string;
  category: { slug: string; name: string; icon: string };
  subCategory?: { name: string; slug: string } | null;
};

function getAccommodationHref(service: ServiceCardData) {
  const subSlug = service.subCategory?.slug ?? service.slug;
  const type = SERVICE_SLUG_TO_PROPERTY_TYPE[subSlug] ?? SERVICE_SLUG_TO_PROPERTY_TYPE[service.slug];
  return type ? `/accommodation?type=${type}` : "/accommodation";
}

function getBookHref(service: ServiceCardData) {
  if (service.category.slug === "accommodation-services") {
    return getAccommodationHref(service);
  }
  const subSlug = service.subCategory?.slug ?? service.slug;
  const vehicleHref = getVehicleFlowHref(service.slug, subSlug);
  if (vehicleHref) return vehicleHref;
  return `/booking?serviceId=${service.id}`;
}

function getBookLabel(service: ServiceCardData) {
  if (service.category.slug === "accommodation-services") return "Browse stays";
  const subSlug = service.subCategory?.slug ?? service.slug;
  if (getVehicleFlowHref(service.slug, subSlug)) return "Start booking";
  return "Book Now";
}

export function ServiceCard({ service }: { service: ServiceCardData }) {
  const isAccommodation = service.category.slug === "accommodation-services";
  const href = `/services/${service.category.slug}/${service.slug}`;
  const bookHref = getBookHref(service);
  const bookLabel = getBookLabel(service);

  return (
    <article className="card service-card">
      <div className="service-card-header">
        <span className="service-card-icon" aria-hidden>
          <CategoryIcon
            slug={service.category.slug}
            icon={service.category.icon}
            size={28}
            color="var(--color-brand)"
          />
        </span>
        <div className="service-card-body">
          <h3 className="card-title">
            <Link href={href}>{service.name}</Link>
          </h3>
          <p className="card-text">
            {service.subCategory ? `${service.subCategory.name} · ` : ""}
            {service.description.slice(0, 60)}…
          </p>
          <p className="card-price">{formatPriceLabel(service.pricePaise, service.unit)}</p>
        </div>
      </div>
      <div className="service-card-actions">
        <Link href={href} className="btn btn-secondary btn-sm">
          Details
        </Link>
        <Link href={bookHref} className="btn btn-primary btn-sm">
          {bookLabel}
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
