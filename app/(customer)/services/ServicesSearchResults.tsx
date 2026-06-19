import Link from "next/link";
import { getServicesByCategory, searchServices, getCategories } from "@/lib/catalog/queries";
import { getServiceCardMeta, CATEGORY_HEADER_ICONS } from "@/lib/catalog/service-card-meta";
import { ServiceIcon } from "@/components/ui/ServiceIcons";
import { ServiceCardList } from "@/components/customer/services/ServiceCard";

type Props = {
  query?: string;
  category?: string;
};

export async function ServicesSearchResults({ query, category }: Props) {
  if (category && !query) {
    const [services, categories] = await Promise.all([
      getServicesByCategory(category),
      getCategories(),
    ]);
    const cat = categories.find((c) => c.slug === category);

    return (
      <div className="service-catalog">
        <div className="catalog-header">
          <div>
            <h1 className="catalog-title">{cat?.name ?? "Services"}</h1>
            <p className="catalog-subtitle">{cat?.tagline ?? `${services.length} services`}</p>
          </div>
          <Link href="/services" className="view-categories-btn">
            ← All Services
          </Link>
        </div>

        <section className="catalog-group">
          <div className="catalog-group-header">
            <h2>
              <span className="group-icon">
                <ServiceIcon
                  name={CATEGORY_HEADER_ICONS[category] ?? "grid-menu"}
                  size={14}
                  color="var(--color-brand)"
                />
              </span>
              {cat?.name.toUpperCase()}
            </h2>
          </div>
          <div className="catalog-service-scroll">
            {services.map((service) => {
              const meta = getServiceCardMeta(service.slug, category, service.name);
              return (
                <Link
                  key={service.id}
                  href={`/services/${service.category.slug}/${service.slug}`}
                  className="catalog-service-card"
                >
                  <span className="catalog-service-icon">
                    <ServiceIcon name={meta.icon} size={28} color={meta.color} />
                  </span>
                  <span className="catalog-service-name">{service.name}</span>
                  <span className="catalog-service-sub">{meta.subtitle}</span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  const services = query ? await searchServices(query) : [];

  return (
    <div className="page-content">
      <h1 className="catalog-title">{query ? `Results for "${query}"` : "Filtered services"}</h1>
      <p className="catalog-subtitle" style={{ marginBottom: "1rem" }}>
        {services.length} service(s) found
      </p>
      <ServiceCardList services={services} />
    </div>
  );
}
