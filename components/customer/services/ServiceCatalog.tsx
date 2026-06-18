import Link from "next/link";
import { SERVICE_GROUPS } from "@/lib/catalog/display-catalog";
import { ServiceIcon } from "@/components/ui/ServiceIcons";

export function ServiceCatalog() {
  return (
    <div className="service-catalog">
      <div className="catalog-header">
        <div>
          <h1 className="catalog-title">Our Services</h1>
          <p className="catalog-subtitle">All Services at your fingertips</p>
        </div>
        <Link href="/services?view=categories" className="view-categories-btn">
          <GridIcon />
          View as Categories
        </Link>
      </div>

      {SERVICE_GROUPS.map((group) => (
        <section key={group.id} className="catalog-group">
          <div className="catalog-group-header">
            <h2>
              <span className="group-icon">
                <ServiceIcon name={group.icon} size={16} color="var(--color-brand)" />
              </span>
              {group.number}. {group.title}
            </h2>
            <Link href={`/services?group=${group.id}`} className="section-link">
              View All →
            </Link>
          </div>
          <div className="catalog-service-grid">
            {group.services.map((service) => (
              <Link key={service.name} href={service.href} className="catalog-service-card">
                <span className="catalog-service-icon">
                  <ServiceIcon name={service.icon} size={28} color={service.color} />
                </span>
                <span className="catalog-service-name">{service.name}</span>
                <span className="catalog-service-sub">{service.subtitle}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}
